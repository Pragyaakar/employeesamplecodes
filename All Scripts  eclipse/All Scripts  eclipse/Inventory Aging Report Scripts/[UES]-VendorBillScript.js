function userEventVendorBillsAfterSubmit(type)
{
	try
	{
		//if(type=='create' || type == 'edit')
		{
			var check;
			var checkOnHandVal;
			var VBItemArr = new Array();
			var VBQtyArr = new Array();
			var VBdescriptionArr = new Array();
			
			var recID = nlapiGetRecordId();
			var recType= nlapiGetRecordType();
			
			var agingObj = nlapiLoadRecord(recType,recID);
			nlapiLogExecution('DEBUG','Inventory Aging Report',' Type : ' + recType + ' ID : ' + recID);
			
			var createdFrom = agingObj.getFieldValue('createdfrom');
			nlapiLogExecution('DEBUG','Inventory Aging Report',' createdFrom : ' + createdFrom);
			
			var VBstatus = agingObj.getFieldValue('approvalstatus');
			nlapiLogExecution('DEBUG','Inventory Aging Report',' VBstatus : ' + VBstatus);
			
			if((createdFrom == null || createdFrom == '' || createdFrom == undefined) && (VBstatus == '2'))
			{
				var VBNo = agingObj.getFieldValue('transactionnumber');
				nlapiLogExecution('DEBUG','Inventory Aging Report',' VBNo : ' + VBNo);
				
				var VBDate = agingObj.getFieldValue('trandate');
				nlapiLogExecution('DEBUG','Inventory Aging Report',' VBDate : ' + VBDate);
				
				var VBLoc = agingObj.getFieldValue('location');
				nlapiLogExecution('DEBUG','Inventory Aging Report',' VBLoc : ' + VBLoc);
				
				var VBCount = agingObj.getLineItemCount('item');
				nlapiLogExecution('DEBUG','Inventory Aging Report',' VBCount : ' + VBCount);
				
				for(var c=1;c<=VBCount;c++)
				{
					var InvNumArr = new Array();
					
					var VBItem = agingObj.getLineItemValue('item','item',c);
					VBItemArr.push(VBItem);
					
					if(VBItem != null && VBItem != '' && VBItem != undefined)
					{
						var filters=[];
						filters[0]= new nlobjSearchFilter('internalid',null,'anyof',VBItem);
						filters[1]= new nlobjSearchFilter("locationquantityonhand",null,"isnotempty","");
						filters[2]= new nlobjSearchFilter("locationaveragecost",null,"isnotempty","");
						filters[3]= new nlobjSearchFilter("internalid","inventorylocation","anyof",VBLoc);
						
						var Column=[];
						Column[0]= new nlobjSearchColumn("internalid");
						Column[1]= new nlobjSearchColumn("locationquantityonhand");
						Column[2]= new nlobjSearchColumn("locationaveragecost");
						Column[3]= new nlobjSearchColumn("name","inventoryLocation",null);
						Column[4]= new nlobjSearchColumn("internalid","inventoryLocation",null);
						Column[5]= new nlobjSearchColumn("serialnumberlocation");
						Column[6]= new nlobjSearchColumn("formulanumeric").setFormula("{locationquantityonhand}*{locationaveragecost}");
						
						var searchResults = nlapiSearchRecord('item','customsearch_inv_aging_item_search',filters,Column);
						nlapiLogExecution('DEBUG','Inventory Aging Report',' searchResults.length : ' + searchResults.length);
						
						for(var p=0;p<searchResults.length;p++)
						{
							var internalid = searchResults[p].getValue('internalid');
							var avgCost = searchResults[p].getValue('locationaveragecost');
							
							var onHand = searchResults[p].getValue('locationquantityonhand');
							//nlapiLogExecution('DEBUG','Inventory Aging Report',' onHand : ' + onHand);
							
							var INVLocation = searchResults[p].getValue("name","inventoryLocation",null);
							
							var onHandValue = searchResults[p].getValue(Column[6]);
							//nlapiLogExecution('DEBUG','Inventory Aging Report',' onHandValue : ' + onHandValue);
							
							//var SerialNum = searchResults[p].getValue("serialnumberlocation");
						}
					}
					
					var VBQty = agingObj.getLineItemValue('item','quantity',c);
					VBQtyArr.push(VBQty);
					nlapiLogExecution('DEBUG','Inventory Aging Report',' VBQty : ' + VBQty);
					
					var VBdescription = agingObj.getLineItemValue('item','description',c);
					VBdescriptionArr.push(VBdescription);
					
					 var INVDetail = agingObj.viewLineItemSubrecord('item','inventorydetail',c);
            		 var invcount = INVDetail.getLineItemCount('inventoryassignment');
            		 nlapiLogExecution('DEBUG', 'aftr submit', "  INVDetail  ==" + INVDetail+' invcount=='+invcount);
            		 for(var x = 1; x <=invcount ; x++)
            		 {
            			 var InvNum = INVDetail.getLineItemValue('inventoryassignment', 'receiptinventorynumber',x);
            			 InvNumArr.push(InvNum);
            		  }
            		 
					var customrecord_inventory_aging_reportSearch = nlapiSearchRecord("customrecord_inventory_aging_report",null,
							[
							   ["custrecord_inv_aging_location","anyof",VBLoc], 
							   "AND", 
							   ["custrecord_inv_aging_item","anyof",VBItem], 
							   "AND", 
							   ["custrecord_inv_aging_date_in","on",VBDate]
							], 
							[
							   new nlobjSearchColumn("custrecord_inv_aging_date_in"), 
							   new nlobjSearchColumn("custrecord_inv_aging_date_out"), 
							   new nlobjSearchColumn("custrecord_inv_aging_item"), 
							   new nlobjSearchColumn("custrecord_inv_aging_location"), 
							   new nlobjSearchColumn("custrecord_inv_aging_on_hand_qty"), 
							   new nlobjSearchColumn("custrecord_inv_aging_onhand_value"), 
							   new nlobjSearchColumn("custrecord_inv_aging_qty"), 
							   new nlobjSearchColumn("custrecord_inv_aging_avg_cost"), 
							   new nlobjSearchColumn("custrecord_inv_aging_serial_number"),
							   new nlobjSearchColumn("id").setSort(false)
							]
							);
					
					
					if(type == 'create')
					{
						agingObj.setLineItemValue('item','custcol_original_qty',c,VBQty);
						nlapiLogExecution('DEBUG','Inventory Aging Report',' VBQty to be set: ' + VBQty);
						
						if(customrecord_inventory_aging_reportSearch != null && customrecord_inventory_aging_reportSearch != '')
						{
							nlapiLogExecution('DEBUG','Inventory Aging Report',' in create mode if record already exit : ');
							
							var updateRecID = customrecord_inventory_aging_reportSearch[0].getValue('id');
							updateCustomRecord(updateRecID,recID,VBstatus,VBNo,VBDate,VBLoc,VBItem,VBQty,VBdescription,onHand,avgCost,onHandValue,InvNumArr);
						}
						else 
						{
							createCustomRecord(recID,VBstatus,VBNo,VBDate,VBLoc,VBItem,VBQty,VBdescription,onHand,avgCost,onHandValue,InvNumArr);
						}
					}
					if(type == 'edit')
					{
						nlapiLogExecution('DEBUG','Inventory Aging Report',' in edit mode if record already exit : ');
						
						check = agingObj.getLineItemValue('item','custcol_original_qty',c);
						
						//checkOnHandVal = agingObj.getLineItemValue('item','custrecord_inv_aging_onhand_value',c);
						
						var settoQty=VBQty;
						
						if(check > VBQty)
						{
							nlapiLogExecution('DEBUG','Inventory Aging Report',' Quantity Reduced');
							
							VBQty = parseFloat(VBQty)-parseFloat(check);
						}
						else if(check < VBQty)
						{
							
							nlapiLogExecution('DEBUG','Inventory Aging Report',' Quantity Added ');
							
							VBQty = parseFloat(VBQty)-parseFloat(check);
						}
						else 
						{
							VBQty = 0;
						}
						
						if(customrecord_inventory_aging_reportSearch != null && customrecord_inventory_aging_reportSearch != '')
						{
							var updateRecID1 = customrecord_inventory_aging_reportSearch[0].getValue('id');
							updateCustomRecord(updateRecID1,recID,VBstatus,VBNo,VBDate,VBLoc,VBItem,VBQty,VBdescription,onHand,avgCost,onHandValue,InvNumArr);
						}
						else
						{
							VBQty = agingObj.getLineItemValue('item','quantity',c);
							
							createCustomRecord(recID,VBstatus,VBNo,VBDate,VBLoc,VBItem,VBQty,VBdescription,onHand,avgCost,onHandValue,InvNumArr);
						}
						agingObj.setLineItemValue('item','custcol_original_qty',c,settoQty);
					}
					
				}
			}
			
			nlapiSubmitRecord(agingObj,true);
		}
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Log Error','Error LOG = ' + e);
	}
}

function createCustomRecord(recID,VBstatus,VBNo,VBDate,VBLoc,VBItem,VBQty,VBdescription,onHand,avgCost,onHandValue,InvNumArr)
{
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD ***********');
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** VBNo ***********' + VBNo);
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD onHand ***********' + onHand);
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD onHandValue ***********' + onHandValue);
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD InvNumArr ***********' + InvNumArr.toString());
	
	var recObj = nlapiCreateRecord('customrecord_inventory_aging_report',{recordmode: 'dynamic'});
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** recObj ***********');
	
	recObj.setFieldValue('custrecord_inv_aging_trans_number',recID);
	recObj.setFieldValue('custrecord_inv_aging_date_in',VBDate);
	recObj.setFieldValue('custrecord_inv_aging_item',VBItem);
	recObj.setFieldValue('custrecord_inv_aging_location',VBLoc);
	recObj.setFieldValue('custrecord_inv_aging_description',VBdescription);//custrecord_invntry_detail_snno
	recObj.setFieldValue('custrecord_inv_aging_qty',VBQty);
	recObj.setFieldValue('custrecord_inv_aging_original_qty',VBQty);
	recObj.setFieldValue('custrecord_inv_aging_on_hand_qty',onHand);
	recObj.setFieldValue('custrecord_inv_aging_avg_cost',avgCost);
	recObj.setFieldValue('custrecord_inv_aging_onhand_value',onHandValue);
	recObj.setFieldValue('custrecord_inv_aging_serial_number',InvNumArr.toString());
	
	var submitID = nlapiSubmitRecord(recObj,true,false);
	nlapiLogExecution('DEBUG','Inventory Aging Report','submitID = ' + submitID);
}


function updateCustomRecord(updateRecID,recID,VBstatus,VBNo,VBDate,VBLoc,VBItem,VBQty,VBdescription,onHand,avgCost,onHandValue,InvNumArr)
{
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** UPDATE RECORD ***********');
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** UPDATE RECORD VBQty ***********' + VBQty);
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** UPDATE RECORD onHand ***********' + onHand);
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** UPDATE RECORD onHandValue ***********' + onHandValue);
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** UPDATE RECORD SerialNum ***********' + InvNumArr);
	
	var getSerialNumArr = new Array();
	
	var recObj1 = nlapiLoadRecord('customrecord_inventory_aging_report',updateRecID);
	
	recObj1.setFieldValue('custrecord_inv_aging_trans_number',recID);
	recObj1.setFieldValue('custrecord_inv_aging_item',VBItem);
	recObj1.setFieldValue('custrecord_inv_aging_avg_cost',avgCost);
	
	var getQty = recObj1.getFieldValue('custrecord_inv_aging_qty');
	
	if((getQty != null && getQty != '') && (VBQty != null && VBQty != ''))
	{
		var updateQty = parseFloat(getQty) + parseFloat(VBQty);
		nlapiLogExecution('DEBUG','Inventory Aging Report','********** UPDATE RECORD updateQty***********' + updateQty);
		recObj1.setFieldValue('custrecord_inv_aging_qty',updateQty);
	}
	
	var getOnHand = recObj1.getFieldValue('custrecord_inv_aging_on_hand_qty');
	
	if((getOnHand != null && getOnHand != '') && (VBQty != null && VBQty != ''))
	{
		var updateOnHand = parseFloat(getOnHand) + parseFloat(VBQty);
		nlapiLogExecution('DEBUG','Inventory Aging Report','********** UPDATE RECORD updateOnHand***********' + updateOnHand);
		recObj1.setFieldValue('custrecord_inv_aging_on_hand_qty',updateOnHand);
	}
	
	var getSerialNum = recObj1.getFieldValue('custrecord_inv_aging_serial_number');
/*	
	var newstring=getSerialNum.toString()+','+InvNumArr.toString();///(\b\S.+\b)(?=.*\1)/g, ","
	var val =newstring.replace(/(\b\S.+\b)(?=.*\1)/g, " ").trim();
	var setString =val.toString().replace(" ",",");
	
	nlapiLogExecution('DEBUG','Inventory Aging Report','newstring==' +setString.length);*/
	recObj1.setFieldValue('custrecord_inv_aging_serial_number',InvNumArr);
	
	
	recObj1.setFieldValue('custrecord_inv_aging_onhand_value',onHandValue);
	
	//var submitID1 = nlapiSubmitRecord(recObj1,true,false);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','submitID1 = ' + submitID1);
}

function removeDuplicates(arr)
{
	var unique_array = []
	for(var i = 0;i < arr.length; i++)
	{
		if(unique_array.indexOf(arr[i]) == -1)
		{
			unique_array.push(arr[i])
		}
	}
	return unique_array;
}

/*function updateExistingCustomRecord(updateRecID1,recID,VBstatus,VBNo,VBDate,VBLoc,VBItem,VBQty,VBdescription,onHand,avgCost,onHandValue)
{
	nlapiLogExecution('DEBUG','Inventory Aging Report','**********Edit Trans UPDATE RECORD ***********');
	nlapiLogExecution('DEBUG','Inventory Aging Report','**********Edit Trans UPDATE RECORD VBQty ***********' + VBQty);
	nlapiLogExecution('DEBUG','Inventory Aging Report','**********Edit Trans UPDATE RECORD onHand ***********' + onHand);
	nlapiLogExecution('DEBUG','Inventory Aging Report','**********Edit Trans UPDATE RECORD onHandValue ***********' + onHandValue);
	
	
	var recObj2 = nlapiLoadRecord('customrecord_inventory_aging_report',updateRecID1);
	nlapiLogExecution('DEBUG','Inventory Aging Report','**********Edit Trans recObj ***********');
	
	recObj2.setFieldValue('custrecord_inv_aging_trans_number',recID);
	recObj2.setFieldValue('custrecord_inv_aging_item',VBItem);
	
	var originalQty = recObj2.getFieldValue('custrecord_inv_aging_original_qty');
	var getQty = recObj2.getFieldValue('custrecord_inv_aging_qty');
	
	var updateQty = parseFloat(getQty) + parseFloat(VBQty);
	nlapiLogExecution('DEBUG','Inventory Aging Report','**********Edit Trans UPDATE RECORD updateQty ***********' + updateQty);
		
	recObj2.setFieldValue('custrecord_inv_aging_qty',updateQty);
	
	recObj2.setFieldValue('custrecord_inv_aging_on_hand_qty',onHand);
	recObj2.setFieldValue('custrecord_inv_aging_avg_cost',avgCost);
	recObj2.setFieldValue('custrecord_inv_aging_onhand_value',onHandValue);
	
	var submitID2 = nlapiSubmitRecord(recObj2,true,false);
	nlapiLogExecution('DEBUG','Inventory Aging Report','submitID2 = ' + submitID2);

}*/
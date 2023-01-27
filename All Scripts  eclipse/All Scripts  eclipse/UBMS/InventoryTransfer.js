/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Dec 2018     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
var qtyAvailableUpdate=0;
var newquantity=0;
function newInventoryTransferSubmit(type){
  
	nlapiLogExecution('DEBUG', 'aftr submit', "inside Submit Function" );
	if(type=='create' || type=='edit')
	{
		nlapiLogExecution('DEBUG', 'aftr submit', "inside if Function" );
		var ifrec=nlapiLoadRecord('inventorytransfer',nlapiGetRecordId());
		nlapiLogExecution('DEBUG', 'aftr submit', "inside Submit Function ifrec:"+ifrec );
		
		var fromLoc1 = ifrec.getFieldValue('location');
		
		var ToLoc1 = ifrec.getFieldValue('transferlocation');
		
		var fromLoc = ifrec.getFieldText('location');
		nlapiLogExecution('DEBUG', 'aftr submit', "inside if fromLoc" +fromLoc);
		var ToLoc = ifrec.getFieldText('transferlocation');
		nlapiLogExecution('DEBUG', 'aftr submit', "inside if ToLoc" + ToLoc);
		
		var tranDate = ifrec.getFieldValue('trandate');
        nlapiLogExecution('DEBUG', 'aftr submit', "  tranDate  ==" + tranDate);
		
		var iflinecount=ifrec.getLineItemCount('inventory');
		nlapiLogExecution('DEBUG', 'aftr submit', "iflinecount:" + iflinecount);
		
		var itemArray=[];
		for(var i=1;i<=iflinecount;i++)
		{
			nlapiLogExecution('DEBUG', 'aftr submit', "inside for loop" );
			var itemid =ifrec.getLineItemValue('inventory','item',i);
			nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
			var validity =ifrec.getLineItemValue('inventory','custcol_itm_valdty',i);
			nlapiLogExecution('DEBUG', 'aftr submit', "  validity  ==" + validity);
			var type =nlapiLookupField('item',itemid,'recordType')
			if(type=='serializedinventoryitem')	
			{
              	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  == I am in serial item");
				ifrec.selectLineItem('item',i);
				var invDetail = ifrec.viewLineItemSubrecord('inventory','inventorydetail',i);
				//invDetail.selectLineItem('inventoryassignment',i);
				var invDetailCount =invDetail.getLineItemCount('inventoryassignment');
				for (var k=1; k<=invDetailCount; k++)
				{
					invDetail.selectLineItem('inventoryassignment', k);
					var serialNum=invDetail.getCurrentLineItemText('inventoryassignment', 'issueinventorynumber');
                  	nlapiLogExecution('DEBUG', 'aftr submit', "  serialNum  ==" + serialNum);
					var quantity=invDetail.getCurrentLineItemValue('inventoryassignment', 'quantity');
                  	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
					//searchcustomRecord(itemid, quantity, serialNo);
					checkandupdateCustomRecordforSerial(quantity,itemid,serialNum,qtyAvailableUpdate,fromLoc1,ToLoc1,tranDate,validity);
					
				}
			} 
			if(type=='inventoryitem')
			{
				var quantity1=ifrec.getLineItemValue('inventory','adjustqtyby',i);
				checkandupdateCustomRecordforInventory(quantity1,itemid,newquantity,fromLoc,ToLoc,tranDate,validity,ToLoc1);
			}
		}
	}


}

function checkandupdateCustomRecordforSerial(quantity,itemid,serialNum,qtyAvailableUpdate,fromLoc1,ToLoc1,tranDate,validity)
{   
 nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  quantity = " + quantity);
 nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  fromLoc = " + fromLoc1);
// var l1 = fromLoc.getValue();
// nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  fromLoc = " + l1);
var remainingQty = 0;
var filter=[];
var FieldsArray=[];
filter[0]=new nlobjSearchFilter('custrecord_invntry_detail_item', null,'anyOf',itemid); 
filter[1]=new nlobjSearchFilter('isinactive', null,'is','F'); 
var itemSearch =nlapiSearchRecord('customrecord_inventory_report_details',null,filter,null);
if(itemSearch)
{
	for(j in itemSearch)
	{
		var tempQty=0;
		var custRecID = itemSearch[j].getId();
	
	    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  custRecID = " + custRecID);
		FieldsArray[0] = "custrecord_invntry_detail_qty_avlbl";
        FieldsArray[1] = "custrecord_invntry_detail_srno";  
        FieldsArray[2] = "custrecord_invntry_detail_location"; 
		var custRecValues = nlapiLookupField('customrecord_inventory_report_details',custRecID,FieldsArray);
		var locn =custRecValues.custrecord_invntry_detail_location;
	
		 nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  location in CR= " + locn);
		var serialNo = custRecValues.custrecord_invntry_detail_srno;
	    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialNo = " + serialNo);
		var serialarray= serialNo.split(',');
		nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray = " + serialarray);
		nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray length = " + serialarray.length);
		nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray 0 = " + serialarray[0]);
		nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray 1 = " + serialarray[1]);
		if(serialarray.length > 0)
		{
			for(l in serialarray)
			{
				if(serialNum == serialarray[l] && fromLoc1 ==locn)
				{
					nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialNum == serialarray[l] && fromLoc1 ==locn MATCH " );
					var quantityinCR=custRecValues.custrecord_invntry_detail_qty_avlbl;
					nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  quantityinCR = " + quantityinCR);
					var sub= serialarray.splice(l,1);
					var newSerialNo = serialarray.toString();
					nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial - after splicing', "  sub = " + sub);
					//var newquantity=Number(quantityinCR)-Number(quantity);
					nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial - after splicing', "  newSerialNo = " + newSerialNo);
					if(remainingQty != 0)
					{
					   tempQty = quantityinCR - remainingQty;
					   qtyAvailableUpdate = tempQty;
					}
					else if(quantityinCR > quantity)
					{
					   tempQty = quantityinCR - quantity;
					   qtyAvailableUpdate = tempQty;
					}
					else if(quantityinCR < quantity)
					{
						tempQty = quantity - quantityinCR;
						qtyAvailableUpdate = 0;
						remainingQty  = tempQty;
					}  
				    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  qtyAvailableUpdate = " + qtyAvailableUpdate);
				    
				 
				   
					 if(qtyAvailableUpdate == 0)
					   {
						nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','custrecord_invntry_detail_srno','isinactive'],[qtyAvailableUpdate,newSerialNo,'T']);
					   }
						else
						{	
					      nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','custrecord_invntry_detail_srno'],[qtyAvailableUpdate,newSerialNo]);
						}	
					 
					checkandupdateCustomRecordforSerialwhichAdded(quantity,itemid,sub,qtyAvailableUpdate,fromLoc1,ToLoc1,tranDate,validity);
				}
			}
						
		}
		
 
	}
	
	  

}
}


function checkandupdateCustomRecordforSerialwhichAdded(quantity,itemid,sub,qtyAvailableUpdate,fromLoc1,ToLoc1,tranDate,validity)
{
	nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerialwhichAdded', "  quantity = " + quantity);
	 nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerialwhichAdded', "  fromLoc = " + fromLoc1);
	
	 nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerialwhichAdded', "  sub = " + sub);
	var remainingQty = 0;
	var filter=[];
	var FieldsArray=[];
	filter[0]=new nlobjSearchFilter('custrecord_invntry_detail_item', null,'anyOf',itemid); 
	filter[1]=new nlobjSearchFilter('isinactive', null,'is','F'); 
	var itemSearch =nlapiSearchRecord('customrecord_inventory_report_details',null,filter,null);
	if(itemSearch)
	{
		for(j in itemSearch)
		{
			var tempQty=0;
			var custRecID = itemSearch[j].getId();
		
		    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerialwhichAdded', "  custRecID = " + custRecID);
			FieldsArray[0] = "custrecord_invntry_detail_qty_avlbl";
	        FieldsArray[1] = "custrecord_invntry_detail_srno";  
	        FieldsArray[2] = "custrecord_invntry_detail_location"; 
			var custRecValues = nlapiLookupField('customrecord_inventory_report_details',custRecID,FieldsArray);
			var locn =custRecValues.custrecord_invntry_detail_location;
		
			 nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerialwhichAdded', "  location in CR= " + locn);
			var serialNo = custRecValues.custrecord_invntry_detail_srno;
		    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialNo = " + serialNo);
			var serialarray= serialNo.split(',');
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray = " + serialarray);
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray length = " + serialarray.length);
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray 0 = " + serialarray[0]);
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray 1 = " + serialarray[1]);
			var count = 0;
			if(serialarray.length > 0)
			{
				for(l in serialarray)
				{
					if(sub!='' && ToLoc1 ==locn)
					{
						count =parseInt(count)+parseInt(1);
						
						nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  ToLoc1 ==locn MATCH " );
						var quantityinCR=custRecValues.custrecord_invntry_detail_qty_avlbl;
						nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  quantityinCR = " + quantityinCR);
						
						var arr =serialarray+','+sub;
						
						var newSerialNo = arr.toString();
				
						nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial - after splicing', "  newSerialNo = " + newSerialNo);
						if(remainingQty != 0)
						{
						   tempQty = Math.abs(quantityinCR) + Math.abs(remainingQty);
						   qtyAvailableUpdate = tempQty;
						}
						else if(Math.abs(quantityinCR) > Math.abs(quantity))
						{
						   tempQty = Math.abs(quantityinCR) + Math.abs(quantity);
						   qtyAvailableUpdate = tempQty;
						}
						else if(Math.abs(quantityinCR) < Math.abs(quantity))
						{
							tempQty = Math.abs(quantity) + Math.abs(quantityinCR);
							qtyAvailableUpdate = 0;
							remainingQty  = tempQty;
						}  
					    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  qtyAvailableUpdate = " + qtyAvailableUpdate);
					    
					 
					   
						 if(qtyAvailableUpdate == 0)
						   {
							nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','custrecord_invntry_detail_srno','isinactive'],[qtyAvailableUpdate,newSerialNo,'T']);
						   }
							else
							{	
						      nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','custrecord_invntry_detail_srno'],[qtyAvailableUpdate,newSerialNo]);
							}	
					}
				}
							
			}
			
	 
		}
		
	}	  

	if(count == 0)
	{
		nlapiLogExecution('DEBUG', 'count == 0 if Serialise_Inve', "  Inside the condition to create toLocation = ");
		var aYearFromNow = nlapiStringToDate(tranDate);
		aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 2);
		nlapiLogExecution('DEBUG', 'count == 0 if Serialise_Inve', "  aYearFromNow = "+aYearFromNow);
	 createCustomRecord(itemid,ToLoc1,quantity,sub,validity,tranDate,aYearFromNow)
	
	}
}


function createCustomRecord(itemid,location,adjustqtyby,serialArr,valdty,tranDate,aYearFromNow)
{
	
	
		var recObj = nlapiCreateRecord('customrecord_inventory_report_details')
	var dateformat = 'DD-Mon-YYYY'
	//var date = findDateFormat(nlapiStringToDate(tranDate),dateformat);
	if(valdty != null && valdty != '')
	{
		var validityDate_CR = '24';
		nlapiLogExecution('DEBUG', 'validityDate_CR', "  validityDate_CR = " + validityDate_CR);
	}
	else
	{
		valdty='';
	}
    
   nlapiLogExecution('DEBUG', 'aftr submit', " serialArr fin 2,3==" + serialArr);//serialArr.replace(/[ ,]+/g, ","))
   var test= serialArr.replace(/[ ]+/g, ",")
   nlapiLogExecution('DEBUG', 'aftr submit', " serialArr.replace(/[ ,]+/g, ",") fin 2,3==" + test);
	//validityDate_CR = nlapiAddDays(nlapiStringToDate(date),valdty);
	recObj.setFieldValue('custrecord_invntry_detail_item',itemid);
	recObj.setFieldValue('custrecord_invntry_detail_ir_date',tranDate);
	nlapiLogExecution('DEBUG', 'validity  in CR', "  valdty = " + valdty);
	recObj.setFieldValue('custrecord_invntry_detail_item_validty','24');
	nlapiLogExecution('DEBUG', 'validity in CR', "  valdty = " + valdty);
	recObj.setFieldValue('custrecord_invntry_detail_qty_avlbl',adjustqtyby);
	recObj.setFieldValue('custrecord_invntry_detail_valid_date',aYearFromNow);//custrecord_invntry_detail_snno
	if(serialArr != null && serialArr != '')
	recObj.setFieldValue('custrecord_invntry_detail_snno',serialArr.replace(/[ ,]+/g, ","));
	recObj.setFieldValue('custrecord_invntry_detail_location',location);
	
	nlapiSubmitRecord(recObj,true,false);
}


function checkandupdateCustomRecordforInventory(quantity1,itemid,newquantity,fromLoc,ToLoc,tranDate,validity,ToLoc1)
{   
    var remainingQty = 0;
    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  itemid = " + itemid);
	nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  quantity = " + quantity1);
	var filter=[];
	filter[0]=new nlobjSearchFilter('custrecord_invntry_detail_item', null,'anyOf',itemid);
	filter[1]=new nlobjSearchFilter('isinactive', null,'is','F');
	filter[2]=new nlobjSearchFilter('custrecord_invntry_detail_location', null,'anyOf',fromLoc); 
	var columns = []; 
	columns[0] = new nlobjSearchColumn('custrecord_invntry_detail_qty_avlbl');
	columns[1] = new nlobjSearchColumn('custrecord_invntry_detail_location');
	var itemSearch =nlapiSearchRecord('customrecord_inventory_report_details',null,filter,columns);
	
	 nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  fromLoc = " + fromLoc);
	if(itemSearch)
	{
		for(var j =0;j < itemSearch.length ; j++)
		{

			var quantityinCR=itemSearch[j].getValue('custrecord_invntry_detail_qty_avlbl');	
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  quantityinCR = " + quantityinCR);
			var check_locn =itemSearch[j].getText('custrecord_invntry_detail_location');
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  check_locn = " + check_locn);
			
			if(check_locn == fromLoc)
			{
			if(remainingQty != 0)
			{
			   tempQty = Number(quantityinCR) - Number(remainingQty);
			   newquantity = tempQty;
			   nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory - remainingQty is not 0');
			}
			else if(Number(quantityinCR) > (quantity1))
			{
			   tempQty = Number(quantityinCR) - Number(quantity1);
			   newquantity = tempQty;
			   		    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory - QTYCR > qty');
			}
			else if(Number(quantityinCR) < Number(quantity1))
			{
				tempQty = Number(quantity1)- Number(quantityinCR);
				newquantity = 0;
				remainingQty  = tempQty;
                nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory - QTYCR < qty');
			}  
    		
		    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  newquantity = " + newquantity);
		    checkandupdateCustomRecordforInventorywhichAdded(quantity1,itemid,newquantity,ToLoc,tranDate,validity,ToLoc1);
		  
            if(newquantity == 0)
            {
			 nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','isinactive'],[newquantity,'T']);
			  
            }
			 else
			 {
		     	nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),'custrecord_invntry_detail_qty_avlbl',newquantity)
		     	  
			 }
          
			}
	  }
	}
}


function  checkandupdateCustomRecordforInventorywhichAdded(quantity1,itemid,newquantity,ToLoc,tranDate,validity,ToLoc1)
{   
    var remainingQty = 0;
    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventorywhichAdded', "  itemid = " + itemid);
    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventorywhichAdded', "  ToLoc = " + ToLoc);
	//nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  quantity = " + quantity);
	var filter=[];
	filter[0]=new nlobjSearchFilter('custrecord_invntry_detail_item', null,'anyOf',itemid);
	filter[1]=new nlobjSearchFilter('isinactive', null,'is','F');
	filter[2]=new nlobjSearchFilter('custrecord_invntry_detail_location', null,'anyOf',ToLoc);
	var columns = []; 
	columns[0] = new nlobjSearchColumn('custrecord_invntry_detail_qty_avlbl');
	columns[1] = new nlobjSearchColumn('custrecord_invntry_detail_location');
	var itemSearch =nlapiSearchRecord('customrecord_inventory_report_details',null,filter,columns);
	
	var count = 0;
	if(itemSearch)
	{
		for(var j =0;j < itemSearch.length ; j++)
		{

			var quantityinCR=itemSearch[j].getValue('custrecord_invntry_detail_qty_avlbl');	
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventorywhichAdded', "  quantityinCR = " + quantityinCR);
			var LocnInCR = itemSearch[j].getText('custrecord_invntry_detail_location');
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventorywhichAdded', "  LocnInCR = " + LocnInCR);
			if(LocnInCR == ToLoc)
			{
				count =parseInt(count)+parseInt(1);
				
			/*	if(remainingQty != 0)
				{
				   tempQty = Number(quantityinCR) + Number(remainingQty);
				   newquantity = tempQty;
				   nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventorywhichAdded - remainingQty is not 0');
				}
				else if(Number(quantityinCR) > (quantity1))
				{
				   tempQty = Number(quantityinCR) + Number(quantity1);
				   newquantity = tempQty;
				   		    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventorywhichAdded - QTYCR > qty');
				}
				else if(Number(quantityinCR) < Number(quantity1))
				{
					tempQty = Number(quantity1)+ Number(quantityinCR);
					newquantity = 0 ;
					remainingQty  = tempQty;
	                nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventorywhichAdded - QTYCR < qty');
				}
			*/
			
				newquantity = parseInt(quantity1) + parseInt(quantityinCR);
		
				    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventorywhichAdded', "  newquantity = " + newquantity);
		            if(newquantity == 0)
		            {
					 nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','isinactive'],[newquantity,'T']);
		            }
					 else
					 {
				     	nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),'custrecord_invntry_detail_qty_avlbl',newquantity)
					 }
			 }
	     }
		
		if(count == 0)
		{
			nlapiLogExecution('DEBUG', 'count == 0 if Inventory', "  Inside the condition to create toLocation = ");
			var aYearFromNow = nlapiStringToDate(tranDate);
			aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 2);
			nlapiLogExecution('DEBUG', 'count == 0 if Inventory', "  aYearFromNow = "+aYearFromNow);
			createCustomRecordforInvItem(itemid,ToLoc1,quantity1,validity,tranDate,aYearFromNow);
			
		
		}
	}
}

function  createCustomRecordforInvItem(itemid,location,adjustqtyby,valdty,tranDate,aYearFromNow)
{
    var recObj = nlapiCreateRecord('customrecord_inventory_report_details')
	var dateformat = 'DD-Mon-YYYY';
	//var date = findDateFormat(tranDate,dateformat);
    nlapiLogExecution('DEBUG', 'validityDate_CRin invntry', "  tranDate = " + tranDate);
    nlapiLogExecution('DEBUG', 'validityDate_CRin invntry', "  valdty = " + valdty);
    
	if(valdty != null && valdty != '')
	{
		var validityDate_CR = '24';
		nlapiLogExecution('DEBUG', 'validityDate_CRin invntry', "  validityDate_CR = " + validityDate_CR);
	}
	else
	{
		valdty='';
	}
	//validityDate_CR = nlapiAddDays(nlapiStringToDate(date),valdty);
	recObj.setFieldValue('custrecord_invntry_detail_item',itemid);
	recObj.setFieldValue('custrecord_invntry_detail_ir_date',tranDate);
	nlapiLogExecution('DEBUG', 'validity in CR', "  valdty = " + valdty);
	recObj.setFieldValue('custrecord_invntry_detail_item_validty','24');
	nlapiLogExecution('DEBUG', 'validity in CR', "  valdty = " + valdty);
	recObj.setFieldValue('custrecord_invntry_detail_qty_avlbl',adjustqtyby);
	recObj.setFieldValue('custrecord_invntry_detail_valid_date',aYearFromNow);//custrecord_invntry_detail_snno
	recObj.setFieldValue('custrecord_invntry_detail_location',location);
	nlapiSubmitRecord(recObj,true,false);
}

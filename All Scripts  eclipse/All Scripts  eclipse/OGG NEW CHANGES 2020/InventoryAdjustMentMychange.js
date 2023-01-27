function userEventInvAdjsutAfterSubmit(type)
{
	try
	{
		var item;
			var quantity
			var seriallNo;
			var location;
			var line;
			var description;
			var onHand;
			var avgCost;	
			var onHandValue;
			var department;
			var clas;
			
			var itemArray = new Array();
			var qtyArray = new Array();
			var serialArray = new Array();
			var linelocArray = new Array();
			var descripnArray = new Array();
			var onHandArray= new Array();
			var avgCostArray = new Array();
			var onHndValArray = new Array();
			var InvNumArr = new Array();
			var deptArray = new Array();
			var classArray = new Array();
			
			
			var check;
			var checkOnHandVal;
			
			var recID = nlapiGetRecordId();
			var recType= nlapiGetRecordType();
			
			var agingObj = nlapiLoadRecord(recType,recID);
			nlapiLogExecution('DEBUG','Inventory Aging Report',' Type : ' + recType + ' ID : ' + recID);
			
			
			var createdFrom = agingObj.getFieldValue('createdfrom');
			nlapiLogExecution('DEBUG','Inventory Aging Report',' createdFrom : ' + createdFrom);
			
			//var vendName = agingObj.getFieldValue('entity');
			//nlapiLogExecution('DEBUG','Inventory Aging Report',' vendName : ' + vendName);
			
			var IAstatus = agingObj.getFieldValue('approvalstatus');
			nlapiLogExecution('DEBUG','Inventory Aging Report',' IAstatus : ' + IAstatus);
			
				
						var AdjustLoc = agingObj.getFieldValue('adjlocation');
						nlapiLogExecution('DEBUG','Inventory Aging Report',' AdjustLoc : ' + AdjustLoc);
						
						var IAdocNo = agingObj.getFieldValue('transactionnumber');
						nlapiLogExecution('DEBUG','Inventory Aging Report',' IAdocNo : ' + IAdocNo);
						
						var IADate = agingObj.getFieldValue('trandate');
						nlapiLogExecution('DEBUG','Inventory Aging Report',' IADate : ' + IADate);
						
						
						var CMCount = agingObj.getLineItemCount('inventory');
						nlapiLogExecution('DEBUG','Inventory Aging Report',' CMCount : ' + CMCount);
						
						for (var l=1;l<=CMCount;l++)
						{
							var LineItem = agingObj.getLineItemValue('inventory','item',l);
							nlapiLogExecution('DEBUG','Inventory Aging Report',' LineItem : ' + LineItem);
							
							var Linelocation = agingObj.getLineItemValue('inventory','location',l);
							nlapiLogExecution('DEBUG','Inventory Aging Report',' Linelocation : ' + Linelocation);
							
							var LineQty = agingObj.getLineItemValue('inventory','adjustqtyby',l);
							nlapiLogExecution('DEBUG','Inventory Aging Report',' LineQty : ' + LineQty);
							
							var inventoryadjustmentSearch = nlapiSearchRecord("inventoryadjustment",null,
									[
									   ["type","anyof","InvAdjst"], 
									   "AND", 
									   ["internalid","anyof",recID], 
									   "AND", 
									   ["item.inventorylocation","anyof",Linelocation], 
									   "AND", 
									   ["item","anyof",LineItem]
									], 
									[
									   new nlobjSearchColumn("tranid"), 
									   new nlobjSearchColumn("item"), 
									   new nlobjSearchColumn("location"), 
									   new nlobjSearchColumn("transferlocation"), 
									   new nlobjSearchColumn("quantity"), 
									   new nlobjSearchColumn("locationaveragecost","item",null), 
									   new nlobjSearchColumn("locationquantityonhand","item",null), 
									   new nlobjSearchColumn("inventorylocation","item",null), 
									   new nlobjSearchColumn("department"), 
									   new nlobjSearchColumn("class")
									]
									);
							
							
							if(inventoryadjustmentSearch!='' && inventoryadjustmentSearch!= null && inventoryadjustmentSearch !='undefined')
							{
								var onHandVal = inventoryadjustmentSearch[0].getValue("locationquantityonhand","item");
								
								var avgCostloc =  inventoryadjustmentSearch[0].getValue("locationaveragecost","item");
								
								var depart =  inventoryadjustmentSearch[0].getValue("department");

								var clssif =  inventoryadjustmentSearch[0].getValue("class");
							}
							
							
							itemArray.push(LineItem);
							qtyArray.push(LineQty);
							onHandArray.push(onHandVal);
							avgCostArray.push(avgCostloc);
							deptArray.push(depart);
							classArray.push(clssif);
							linelocArray.push(Linelocation);
						}
						
						
						if(type == 'create')
						{
							createCustomRecordToLoca(recType,recID,AdjustLoc,IAdocNo,IADate,itemArray,
									qtyArray,onHandArray,avgCostArray,deptArray,classArray,linelocArray);
							
						}
						else if (type == 'edit')
						{
							var recID = nlapiGetRecordId();
							var recType = nlapiGetRecordType();
							nlapiLogExecution('DEBUG','Log Error','Type Delete = ' + type);
							var customrecord_inventory_aging_reportSearch = nlapiSearchRecord("customrecord_inventory_aging_report",null,
							[
							   ["custrecord_inv_aging_doc_num","anyof",recID]					  
							], 
							[
							  // new nlobjSearchColumn("custrecord_inv_aging_date_in"), 
							   new nlobjSearchColumn("internalid")
							]
							);
							if(customrecord_inventory_aging_reportSearch != null && customrecord_inventory_aging_reportSearch != '')
							{
								var updateRecID = customrecord_inventory_aging_reportSearch[0].getValue('internalid');
								updateCustomRecordDelete(updateRecID);
							}
							
							createCustomRecordToLoca(recType,recID,AdjustLoc,IAdocNo,IADate,itemArray,
									qtyArray,onHandArray,avgCostArray,deptArray,classArray,linelocArray);
							
						}//end of else
				
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Log Error','Error LOG = ' + e);
	}
}

function createCustomRecordToLoca(recType,recID,AdjustLoc,IAdocNo,IADate,itemArray,
		qtyArray,onHandArray,avgCostArray,deptArray,classArray,linelocArray)
{

	nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD ***********');
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** IAdocNo ***********' + IAdocNo);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD onHand ***********' + onHand);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD onHandValue ***********' + onHandValue);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD InvNumArr ***********' + InvNumArr.toString());
	
	var recObj = nlapiCreateRecord('customrecord_inventory_aging_report',{recordmode: 'dynamic'});
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** recObj ***********');
	
	recObj.setFieldValue('custrecord_inv_aging_doc_num',recID);
	
	if(recType == 'inventoryadjustment')
	{
		recType = '11';
		recObj.setFieldValue('custrecord_inv_aging_trans_type',recType);
	}
	
	
	//recObj.setFieldValue('custrecord_inv_aging_vendor',vendName);
	recObj.setFieldValue('custrecord_inv_aging_date_in',IADate);
	//recObj.setFieldValue('custrecord_inv_aging_item',CMItem);
	if(AdjustLoc != null && AdjustLoc != undefined && AdjustLoc !='')
	{
		recObj.setFieldValue('custrecord_inv_aging_location',AdjustLoc);
	}

    var submitID = nlapiSubmitRecord(recObj,true,false);
	nlapiLogExecution('DEBUG','Inventory Aging Report','Parent ID = ' + submitID);
	
	//Logic to create the Item Details
	for(var t=0;t<itemArray.length;t++)
	{
			
		var recObj = nlapiCreateRecord('customrecord_inventory_agng_itm_detail',{recordmode: 'dynamic'});	
		nlapiLogExecution('DEBUG','Inventory Aging Report','********** recObj ***********');
		recObj.setFieldValue('custrecord_invntry_agng_main',submitID);
		
		if(itemArray[t] != null && itemArray[t] != undefined && itemArray[t] !='')
		{
		recObj.setFieldValue('custrecord_item_invntry_age',itemArray[t]);
		}
		
		if(linelocArray[t] != null && linelocArray[t] != undefined && linelocArray[t] !='')
		{

			recObj.setFieldValue('custrecord_itm_location_dtail',linelocArray[t]);
		}
		
		recObj.setFieldValue('custrecord_date_item',IADate);
		
		if(qtyArray[t] != null && qtyArray[t] != undefined && qtyArray[t] !='')
		{

			recObj.setFieldValue('custrecord_inventoryage_qty',qtyArray[t]);
		}
		
		
		if(onHandArray[t] != null && onHandArray[t] != undefined && onHandArray[t] != '')
		{
			recObj.setFieldValue('custrecord_quantity_on_hand',onHandArray[t]);
		}
		
		if(deptArray[t] != null && deptArray[t] != undefined && deptArray[t] != '')
		{
			recObj.setFieldValue('custrecord_department_item',deptArray[t]);
		}
		
		if(classArray[t] != null && classArray[t] != undefined && classArray[t] != '')
		{
			recObj.setFieldValue('custrecord_class_item',classArray[t]);
		}
		
		if(avgCostArray[t] != null && avgCostArray[t] != undefined && avgCostArray[t] != '')
		{
			recObj.setFieldValue('custrecord_avg_cost_invntryage',parseFloat(avgCostArray[t]).toFixed(2));
		}
		
		
		var onHandValue =parseFloat(avgCostArray[t]) * parseFloat(onHandArray[t]);
		
		if(onHandValue != null && onHandValue != undefined && onHandValue != '')
		{
			recObj.setFieldValue('custrecord_on_hand_value_invntryage',parseFloat(onHandValue).toFixed(2));
		}
		
		var itemID = nlapiSubmitRecord(recObj,true,false);
		nlapiLogExecution('DEBUG','Inventory Aging Report','SubRecord id = ' + itemID);	
		
	}
	

}

function updateCustomRecordDelete(updateRecID)
{
		
	//Logic to find the line custom Record
	
	var customrecord_inventory_aging_reportSearch = nlapiSearchRecord("customrecord_inventory_agng_itm_detail",null,
					[
					   ["custrecord_invntry_agng_main","anyof",updateRecID]					  
					], 
					[
					  // new nlobjSearchColumn("custrecord_inv_aging_date_in"), 
					   new nlobjSearchColumn("internalid") 
					]
					);
					if(customrecord_inventory_aging_reportSearch != null && customrecord_inventory_aging_reportSearch != '')
					{
						for(var g=0;g<customrecord_inventory_aging_reportSearch.length;g++)
						{
							var delRecID = customrecord_inventory_aging_reportSearch[g].getValue('internalid');
							var id = nlapiDeleteRecord('customrecord_inventory_agng_itm_detail', delRecID);
						}
						
					}
	
	var id = nlapiDeleteRecord('customrecord_inventory_aging_report', updateRecID);
	
}

//==================================================== DELETE SCENARIO =============================================

function userEventINVAdjustBeforeSubmit(type)
{
	try
	{
		if(type == 'delete')
				{
					var recID = nlapiGetRecordId();
					var recType = nlapiGetRecordType();
					nlapiLogExecution('DEBUG','Log Error','Type Delete = ' + type);
					var customrecord_inventory_aging_reportSearch = nlapiSearchRecord("customrecord_inventory_aging_report",null,
					[
					   ["custrecord_inv_aging_doc_num","anyof",recID]					  
					], 
					[
					  // new nlobjSearchColumn("custrecord_inv_aging_date_in"), 
					   new nlobjSearchColumn("internalid") 
					]
					);
					if(customrecord_inventory_aging_reportSearch != null && customrecord_inventory_aging_reportSearch != '')
					{
						var updateRecID = customrecord_inventory_aging_reportSearch[0].getValue('internalid');
						updateCustomRecordDelete(updateRecID);
					}
				}
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Log Error','Error LOG = ' + e);
	}
}
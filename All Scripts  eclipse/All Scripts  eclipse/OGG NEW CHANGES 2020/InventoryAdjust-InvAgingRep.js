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
			var lineArray = new Array();
			var descripnArray = new Array();
			var onHandArray= new Array();
			var avgCostArray = new Array();
			var onHndValArray = new Array();
			var InvNumArr = new Array();
			var deptArray = new Array();
			var classArray = new Array();
			
			var toLocitemArray = new Array();
			var toLocqtyArray = new Array();
			var toLocserialArray = new Array();
			var toLoclineArray = new Array();
			var toLocdescripnArray = new Array();
			var toLoconHandArray= new Array();
			var toLocavgCostArray = new Array();
			var toLoconHndValArray = new Array();
			var toLocInvNumArr = new Array();
			var toLocdeptArray = new Array();
			var toLocclassArray = new Array();
			
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
			
			var VBstatus = agingObj.getFieldValue('approvalstatus');
			nlapiLogExecution('DEBUG','Inventory Aging Report',' VBstatus : ' + VBstatus);
			
				
						var toLoca = agingObj.getFieldValue('transferlocation');
						nlapiLogExecution('DEBUG','Inventory Aging Report',' toLoca : ' + toLoca);
						
						var CMNo = agingObj.getFieldValue('transactionnumber');
						nlapiLogExecution('DEBUG','Inventory Aging Report',' CMNo : ' + CMNo);
						
						var CMDate = agingObj.getFieldValue('trandate');
						nlapiLogExecution('DEBUG','Inventory Aging Report',' CMDate : ' + CMDate);
						
						var CMLoc = agingObj.getFieldValue('adjlocation');
						nlapiLogExecution('DEBUG','Inventory Aging Report',' CMLoc : ' + CMLoc);
						
						var CMCount = agingObj.getLineItemCount('inventory');
						nlapiLogExecution('DEBUG','Inventory Aging Report',' CMCount : ' + CMCount);
						
						
					if(CMLoc != null && CMLoc != '' && CMLoc != undefined)
					{
						var vendorbillSearch = nlapiSearchRecord("inventorytransfer",null,
						[
						   ["type","anyof","InvTrnfr"], 
						   "AND", 
						   ["item","noneof","@NONE@"], 
						   "AND", 
						   ["internalid","anyof",recID], 
						   "AND", 
						   ["item.inventorylocation","anyof",CMLoc], 
						  
						], 
						[
						   new nlobjSearchColumn("tranid"), 
						   new nlobjSearchColumn("item"), 
						   new nlobjSearchColumn("line"), 
						   new nlobjSearchColumn("location"), 
						   new nlobjSearchColumn("transferlocation"), 
						   new nlobjSearchColumn("quantity"),
						   new nlobjSearchColumn("department"), 
						   new nlobjSearchColumn("class"),				   
						   new nlobjSearchColumn("locationaveragecost","item",null), 
						   new nlobjSearchColumn("locationquantityonhand","item",null), 
						   new nlobjSearchColumn("inventorylocation","item",null), 
						   new nlobjSearchColumn("serialnumber")
						]
						);
						if(vendorbillSearch!='' && vendorbillSearch!= null && vendorbillSearch !='undefined')
						{
							nlapiLogExecution('DEBUG','ues_JV_creationFromIR','resultSet =='+vendorbillSearch.length);
							for(var i=0;i<vendorbillSearch.length;i++)//resultSet.length
							{
								//var columns = resultSet[i].getAllColumns();
								
								item = vendorbillSearch[i].getValue('item');
								if(item!= null && item != '' && item != undefined)
								{
									itemArray.push(item);
								}
								quantity = vendorbillSearch[i].getValue('quantity');
								if(quantity!= null && quantity != '' && quantity != undefined)
								{
									qtyArray.push(quantity);
								}
								department = vendorbillSearch[i].getValue('department');
								if(department!= null && department != '' && department != undefined)
								{
									deptArray.push(department);
								}
								clas = vendorbillSearch[i].getValue('class');
								if(clas!= null && clas != '' && clas != undefined)
								{
									classArray.push(clas);
								}
								seriallNo = vendorbillSearch[i].getValue('serialnumber');
								if(seriallNo!= null && seriallNo != '' && seriallNo != undefined)
								{
									InvNumArr.push(seriallNo); 
								}
								line = vendorbillSearch[i].getValue('line');
								if(line!= null && line != '' && line != undefined)
								{
									lineArray.push(line);
								}
								description = vendorbillSearch[i].getValue('description');
								if(description!= null && description != '' && description != undefined)
								{
									descripnArray.push(description);
								}
								onHand = vendorbillSearch[i].getValue("locationquantityonhand","item",null);
								if(onHand!= null && onHand != '' && onHand != undefined)
								{
									onHandArray.push(onHand);
								}
								avgCost = vendorbillSearch[i].getValue("locationaveragecost","item",null);
								if(avgCost!= null && avgCost != '' && avgCost != undefined)
								{
									avgCostArray.push(avgCost);
								}
								if(avgCost != null && avgCost != '' && avgCost != undefined && !isNaN(avgCost))
								{
									if(onHand!= null && onHand != '' && onHand != undefined && !isNaN(onHand))
									{
										onHndValArray.push(parseFloat(avgCost)* parseFloat(onHand))
									}
								}
							}//end of for
						}
					}
					if(toLoca != null && toLoca != '' && toLoca != undefined)
					{
						var vendorbillSearch = nlapiSearchRecord("inventorytransfer",null,
						[
						   ["type","anyof","InvTrnfr"], 
						   "AND", 
						   ["item","noneof","@NONE@"], 
						   "AND", 
						   ["internalid","anyof",recID], 
						   "AND", 
						   ["item.inventorylocation","anyof",toLoca], 
						   "AND", 
						    ["location","anyof",toLoca],
							"AND", 
							["quantity","greaterthan","0"]
						], 
						[
						   new nlobjSearchColumn("tranid"), 
						   new nlobjSearchColumn("item"), 
						   new nlobjSearchColumn("line"), 
						   new nlobjSearchColumn("location"), 
						   new nlobjSearchColumn("transferlocation"), 
						   new nlobjSearchColumn("quantity"),
						   new nlobjSearchColumn("department"), 
						   new nlobjSearchColumn("class"),				   
						   new nlobjSearchColumn("locationaveragecost","item",null), 
						   new nlobjSearchColumn("locationquantityonhand","item",null), 
						   new nlobjSearchColumn("inventorylocation","item",null), 
						   new nlobjSearchColumn("serialnumber")
						]
						);
						if(vendorbillSearch!='' && vendorbillSearch!= null && vendorbillSearch !='undefined')
						{
							nlapiLogExecution('DEBUG','ues_JV_creationFromIR','resultSet =='+vendorbillSearch.length);
							for(var i=0;i<vendorbillSearch.length;i++)//resultSet.length
							{
								//var columns = resultSet[i].getAllColumns();
								
								item = vendorbillSearch[i].getValue('item');
								if(item!= null && item != '' && item != undefined)
								{
									toLocitemArray.push(item);
								}
								quantity = vendorbillSearch[i].getValue('quantity');
								if(quantity!= null && quantity != '' && quantity != undefined)
								{
									toLocqtyArray.push(quantity);
								}
								department = vendorbillSearch[i].getValue('department');
								if(department!= null && department != '' && department != undefined)
								{
									toLocdeptArray.push(department);
								}
								clas = vendorbillSearch[i].getValue('class');
								if(clas!= null && clas != '' && clas != undefined)
								{
									toLocclassArray.push(clas);
								}
								seriallNo = vendorbillSearch[i].getValue('serialnumber');
								if(seriallNo!= null && seriallNo != '' && seriallNo != undefined)
								{
									toLocInvNumArr.push(seriallNo); 
								}
								line = vendorbillSearch[i].getValue('line');
								if(line!= null && line != '' && line != undefined)
								{
									toLoclineArray.push(line);
								}
								description = vendorbillSearch[i].getValue('description');
								if(description!= null && description != '' && description != undefined)
								{
									toLocdescripnArray	.push(description);
								}
								onHand = vendorbillSearch[i].getValue("locationquantityonhand","item",null);
								if(onHand!= null && onHand != '' && onHand != undefined)
								{
									toLoconHandArray.push(onHand);
								}
								avgCost = vendorbillSearch[i].getValue("locationaveragecost","item",null);
								if(avgCost!= null && avgCost != '' && avgCost != undefined)
								{
									toLocavgCostArray.push(avgCost);
								}
								if(avgCost != null && avgCost != '' && avgCost != undefined && !isNaN(avgCost))
								{
									if(onHand!= null && onHand != '' && onHand != undefined && !isNaN(onHand))
									{
										toLoconHndValArray.push(parseFloat(avgCost)* parseFloat(onHand))
									}
								}
							}//end of for
						}
					}
					if(type == 'create')
					{
							if(toLoca != null && toLoca!='' && toLoca != undefined)
							{
								createCustomRecordToLoca(recType,recID,CMNo,CMDate,CMLoc,toLocitemArray,toLocqtyArray,toLocdescripnArray,toLoconHandArray,toLocavgCostArray,toLoconHndValArray,toLocInvNumArr,toLocdeptArray,toLoclineArray,toLocclassArray);
								
							}
							if(CMLoc!= null && CMLoc !='' && CMLoc != undefined)
							{
								createCustomRecord(recType,recID,CMNo,CMDate,toLoca,itemArray,qtyArray,descripnArray,onHandArray,avgCostArray,onHndValArray,InvNumArr,deptArray,lineArray,classArray);
							}
						
					}//end of type create
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
						   new nlobjSearchColumn("custrecord_inv_aging_date_in"), 
						   new nlobjSearchColumn("internalid"), 
						]
						);
						if(customrecord_inventory_aging_reportSearch != null && customrecord_inventory_aging_reportSearch != '')
						{
							var updateRecID = customrecord_inventory_aging_reportSearch[0].getValue('internalid');
							updateCustomRecordDelete(updateRecID);
						}
						
						if(toLoca != null && toLoca!='' && toLoca != undefined)
							{
								createCustomRecordToLoca(recType,recID,CMNo,CMDate,CMLoc,toLocitemArray,toLocqtyArray,toLocdescripnArray,toLoconHandArray,toLocavgCostArray,toLoconHndValArray,toLocInvNumArr,toLocdeptArray,toLoclineArray,toLocclassArray);
								
							}
							if(CMLoc!= null && CMLoc !='' && CMLoc != undefined)
							{
								createCustomRecord(recType,recID,CMNo,CMDate,toLoca,itemArray,qtyArray,descripnArray,onHandArray,avgCostArray,onHndValArray,InvNumArr,deptArray,lineArray,classArray);
							}
					}//end of else
			
			
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Log Error','Error LOG = ' + e);
	}
}

//==================================================== DELETE SCENARIO =============================================

function userEventINVTransferBeforeSubmit(type)
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
					   new nlobjSearchColumn("custrecord_inv_aging_date_in"), 
					   new nlobjSearchColumn("internalid"), 
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
function updateCustomRecord(recType,recID,CMNo,CMDate,CMLoc,itemArray,qtyArray,descripnArray,onHandArray,avgCostArray,onHndValArray,InvNumArr,deptArray,lineArray,classArray,updateRecID)//,filteredPeople)
{
	
	//Remove the older record and update the new record
	
	var customrecord_inventory_aging_reportSearch = nlapiSearchRecord("customrecord_inventory_agng_itm_detail",null,
					[
					   ["custrecord_invntry_agng_main","anyof",updateRecID]					  
					], 
					[
					   new nlobjSearchColumn("custrecord_inv_aging_date_in"), 
					   new nlobjSearchColumn("internalid"), 
					]
					);
					if(customrecord_inventory_aging_reportSearch != null && customrecord_inventory_aging_reportSearch != '')
					{
						for(var g=0;g<customrecord_inventory_aging_reportSearch.length;g++)
						{
							var delRecID = customrecord_inventory_aging_reportSearch[0].getValue('internalid');
							var id = nlapiDeleteRecord('customrecord_inventory_agng_itm_detail', delRecID);
						}
						
					}		
		
	}	


function createCustomRecord(recType,recID,CMNo,CMDate,CMLoc,itemArray,qtyArray,descripnArray,onHandArray,avgCostArray,onHndValArray,InvNumArr,deptArray,lineArray,classArray)
{
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD ***********');
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** CMNo ***********' + CMNo);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD onHand ***********' + onHand);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD onHandValue ***********' + onHandValue);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD InvNumArr ***********' + InvNumArr.toString());
	
	var recObj = nlapiCreateRecord('customrecord_inventory_aging_report',{recordmode: 'dynamic'});
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** recObj ***********');
	
	recObj.setFieldValue('custrecord_inv_aging_doc_num',recID);
	
	if(recType == 'inventorytransfer')
	{
		recType = '12';
		recObj.setFieldValue('custrecord_inv_aging_trans_type',recType);
	}
	
	
	//recObj.setFieldValue('custrecord_inv_aging_vendor',vendName);
	recObj.setFieldValue('custrecord_inv_aging_date_in',CMDate);
	//recObj.setFieldValue('custrecord_inv_aging_item',CMItem);
	recObj.setFieldValue('custrecord_inv_aging_location',CMLoc);
    var submitID = nlapiSubmitRecord(recObj,true,false);
	nlapiLogExecution('DEBUG','Inventory Aging Report','submitID = ' + submitID);
	
	//Logic to create the Item Details
	for(var t=0;t<itemArray.length;t++)
	{
			
		var recObj = nlapiCreateRecord('customrecord_inventory_agng_itm_detail',{recordmode: 'dynamic'});	
		nlapiLogExecution('DEBUG','Inventory Aging Report','********** recObj ***********');
		recObj.setFieldValue('custrecord_invntry_agng_main',submitID);
		recObj.setFieldValue('custrecord_item_invntry_age',itemArray[t]);
		recObj.setFieldValue('custrecord_itm_location_dtail',CMLoc);
		recObj.setFieldValue('custrecord_date_item',CMDate);
		recObj.setFieldValue('custrecord_inventoryage_qty',qtyArray[t]);
		
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
		
		if(onHndValArray[t] != null && onHndValArray[t] != undefined && onHndValArray[t] != '')
		{
			recObj.setFieldValue('custrecord_on_hand_value_invntryage',parseFloat(onHndValArray[t]).toFixed(2));
		}
		if(lineArray[t] != null && lineArray[t] != undefined && lineArray[t] != '')
		{
			recObj.setFieldValue('custrecord_line_no_tran',lineArray[t]);
		}
		if(InvNumArr[t] != null && InvNumArr[t] != undefined && InvNumArr[t] != '')
		{
			recObj.setFieldValue('custrecord1',InvNumArr[t].toString());
		}
		var itemID = nlapiSubmitRecord(recObj,true,false);
		nlapiLogExecution('DEBUG','Inventory Aging Report','itemID = ' + itemID);	
		
	}
	
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
function createCustomRecordToLoca(recType,recID,CMNo,CMDate,CMLoc,itemArray,qtyArray,descripnArray,onHandArray,avgCostArray,onHndValArray,InvNumArr,deptArray,lineArray,classArray)
{
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD ***********');
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** CMNo ***********' + CMNo);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD onHand ***********' + onHand);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD onHandValue ***********' + onHandValue);
	//nlapiLogExecution('DEBUG','Inventory Aging Report','********** CREATE RECORD InvNumArr ***********' + InvNumArr.toString());
	
	var recObj = nlapiCreateRecord('customrecord_inventory_aging_report',{recordmode: 'dynamic'});
	nlapiLogExecution('DEBUG','Inventory Aging Report','********** recObj ***********');
	
	recObj.setFieldValue('custrecord_inv_aging_doc_num',recID);
	
	if(recType == 'inventorytransfer')
	{
		recType = '12';
		recObj.setFieldValue('custrecord_inv_aging_trans_type',recType);
	}
	
	
	//recObj.setFieldValue('custrecord_inv_aging_vendor',vendName);
	recObj.setFieldValue('custrecord_inv_aging_date_in',CMDate);
	//recObj.setFieldValue('custrecord_inv_aging_item',CMItem);
	recObj.setFieldValue('custrecord_inv_aging_location',CMLoc);
    var submitID = nlapiSubmitRecord(recObj,true,false);
	nlapiLogExecution('DEBUG','Inventory Aging Report','submitID = ' + submitID);
	
	//Logic to create the Item Details
	for(var t=0;t<itemArray.length;t++)
	{
			
		var recObj = nlapiCreateRecord('customrecord_inventory_agng_itm_detail',{recordmode: 'dynamic'});	
		nlapiLogExecution('DEBUG','Inventory Aging Report','********** recObj ***********');
		recObj.setFieldValue('custrecord_invntry_agng_main',submitID);
		recObj.setFieldValue('custrecord_item_invntry_age',itemArray[t]);
		recObj.setFieldValue('custrecord_itm_location_dtail',CMLoc);
		recObj.setFieldValue('custrecord_date_item',CMDate);
		recObj.setFieldValue('custrecord_inventoryage_qty',(qtyArray[t]));
		
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
		
		if(onHndValArray[t] != null && onHndValArray[t] != undefined && onHndValArray[t] != '')
		{
			recObj.setFieldValue('custrecord_on_hand_value_invntryage',parseFloat(onHndValArray[t]).toFixed(2));
		}
		if(lineArray[t] != null && lineArray[t] != undefined && lineArray[t] != '')
		{
			recObj.setFieldValue('custrecord_line_no_tran',lineArray[t]);
		}
		if(InvNumArr[t] != null && InvNumArr[t] != undefined && InvNumArr[t] != '')
		{
			recObj.setFieldValue('custrecord1',InvNumArr[t].toString());
		}
		var itemID = nlapiSubmitRecord(recObj,true,false);
		nlapiLogExecution('DEBUG','Inventory Aging Report','itemID = ' + itemID);	
		
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
					   new nlobjSearchColumn("custrecord_inv_aging_date_in"), 
					   new nlobjSearchColumn("internalid"), 
					]
					);
					if(customrecord_inventory_aging_reportSearch != null && customrecord_inventory_aging_reportSearch != '')
					{
						for(var g=0;g<customrecord_inventory_aging_reportSearch.length;g++)
						{
							var delRecID = customrecord_inventory_aging_reportSearch[0].getValue('internalid');
							var id = nlapiDeleteRecord('customrecord_inventory_agng_itm_detail', delRecID);
						}
						
					}
	
	var id = nlapiDeleteRecord('customrecord_inventory_aging_report', updateRecID);
	
}
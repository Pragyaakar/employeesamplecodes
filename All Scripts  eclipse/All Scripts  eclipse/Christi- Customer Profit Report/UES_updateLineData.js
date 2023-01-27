/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Aug 2019     Tushar More
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
function userEventAutoLineDataUpdate(type)
{
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	
	if(recordType == 'purchaseorder')
	{
		var irObj = nlapiLoadRecord(recordType,recordId);
		nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
	  
		var createFrom = irObj.getFieldValue('createdfrom');
		nlapiLogExecution('DEBUG','Serach Value','createFrom:'+createFrom);
		
		var cust_fields = ['entity','tranid'];
		
		if(createFrom !=null && createFrom !='' && createFrom != undefined)
		{
			var poObj = nlapiLookupField('salesorder',createFrom,cust_fields);
			 
			var entityName = poObj.entity;
	        
			var transNum = poObj.tranid;
			
		}
		
		
		nlapiLogExecution('DEBUG','Serach Value','entityName :'+entityName);
		nlapiLogExecution('DEBUG','Serach Value','transNum :'+transNum);
		
		var lineCount = irObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
	   
		for(i=1;i<=lineCount;i++)
	    {
			nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
			
			if(createFrom !=null && createFrom !='' && createFrom != undefined )
			{
				irObj.setLineItemValue('item','custcol_cls_bill_order',i,createFrom);
				irObj.setLineItemValue('item','custcol_entity_name',i,entityName);
				irObj.setLineItemValue('item','custcol_order_number',i,transNum);
			}
	       
		 }//End of if linecount	 
		nlapiSubmitRecord(irObj,true);
	  
	}
	/*else if(recordType == 'vendorbill')
	{
		var irObj = nlapiLoadRecord(recordType,recordId);
		nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
	  
	
		
		var vendorbillSearch = nlapiSearchRecord("vendorbill",'customsearch_venbill_with_po',
			
						[
						   ["type","anyof","VendBill"], 
						   "AND", 
						   ["createdfrom.createdfrom","noneof","@NONE@"], 
						   "AND", 
						   ["mainline","is","T"]
						], 
						[
						   new nlobjSearchColumn("createdfrom"), 
						   new nlobjSearchColumn("createdfrom","createdFrom",null),
						   new nlobjSearchColumn("internalid")
						]
						);
		
		if(vendorbillSearch !=null && vendorbillSearch != '' && vendorbillSearch != undefined)
		{
			for(var li=0;li<vendorbillSearch.length;li++)
			{
				var createFrom = vendorbillSearch[li].getValue("createdfrom","createdFrom");
				
			}
			nlapiLogExecution('DEBUG','Serach Value','createFrom:'+createFrom);
		}
		
		
		
		var cust_fields = ['entity','tranid'];
		
		if(createFrom !=null && createFrom !='' && createFrom != undefined)
		{
			var poObj = nlapiLookupField('salesorder',createFrom,cust_fields);
			 
			var entityName = poObj.entity;
	        
			var transNum = poObj.tranid;
			
		}
		
		irObj.setFieldValue('custbody_data_set','T');
		
		nlapiLogExecution('DEBUG','Serach Value','entityName :'+entityName);
		nlapiLogExecution('DEBUG','Serach Value','transNum :'+transNum);
		
		var lineCount = irObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
	   
		for(i=1;i<=lineCount;i++)
	    {
			nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
			
			if(createFrom !=null && createFrom !='' && createFrom != undefined )
			{
				irObj.setLineItemValue('item','custcol_cls_bill_order',i,createFrom);
				irObj.setLineItemValue('item','custcol_entity_name',i,entityName);
				irObj.setLineItemValue('item','custcol_order_number',i,transNum);
			}
	       
		 }//End of if linecount	 
		nlapiSubmitRecord(irObj,true);
	}
    */
}

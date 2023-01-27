
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       5 Nov 2019     Tushar
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


function userEventInvoiceLineDataUpdate(type)
{
	
	try
	{
		
	
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	

		var irObj = nlapiLoadRecord(recordType,recordId);
		nlapiLogExecution('DEBUG','Search Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
	  
		
    var cust_fields = ['entity','tranid'];
		
		var blank ='';
		
		 var createFrom = irObj.getFieldValue('createdfrom');
		 
		if((createFrom !=null && createFrom !='' && createFrom != undefined))
		{
			
				var poObj = nlapiLookupField('salesorder',createFrom,cust_fields);
				 
				var entityName = poObj.entity;
		        
				var transNum = poObj.tranid;
		
			
		}
		
		nlapiLogExecution('DEBUG','Search Value','entityName :'+entityName);
		nlapiLogExecution('DEBUG','Search Value','transNum :'+transNum);
		
		var lineCount = irObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Search Value','lineCount :'+lineCount);
	   
		for(i=1;i<=lineCount;i++)
	    {
			    nlapiLogExecution('DEBUG','Search Value','lineCount in for loop');
				// irObj.setLineItemValue('item','custcol_cls_bill_order',i,createFrom);
				
			    irObj.setLineItemValue('item','custcol_entity_name',i,entityName);
				irObj.setLineItemValue('item','custcol_order_number',i,transNum);
		
		 }//End of if linecount	 
		nlapiSubmitRecord(irObj,true);
	
	 }
	catch(e)
	{
		nlapiLogExecution('DEBUG','Search Value','Error :'+e);	
	}
	}
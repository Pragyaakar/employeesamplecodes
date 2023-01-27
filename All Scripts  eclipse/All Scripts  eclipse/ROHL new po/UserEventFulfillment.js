/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       01 Apr 2019     Tushar More
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
function userEventAfterSubmit(type)
{
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	
    var irObj = nlapiLoadRecord(recordType,recordId);
	nlapiLogExecution('DEBUG','Serach Value','Type :='+recordType+'ID :='+recordId);
  
	
	
	var lineCount = irObj.getLineItemCount('item');
	nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
    for(i=1;i<=lineCount;i++)
    {
    	var reqId = irObj.getLineItemValue('item','custcol_pr_id',i);
    	
    }
        	
    
    var rec = nlapiLoadRecord('purchaserequisition',reqId);
    
}

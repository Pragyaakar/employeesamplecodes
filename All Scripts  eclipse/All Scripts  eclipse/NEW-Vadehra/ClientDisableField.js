/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Mar 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInitFieldDisable(type)
{
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	var ffRobj = nlapiLoadRecord(recordType,recordId);
	var lineCount = ffRobj.getLineItemCount('item');
	nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
	
    for(i=1;i<=lineCount;i++)
	{
    	nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');

    	var status = ffRobj.getLineItemValue('item','custcol_vad_appstatus',i);
    	if(status == '2')
    	{
    		nlapiLogExecution('DEBUG', 'Log Parameters', 'Status is = '+ status);
    		nlapiDisableLineItemField('item', 'custcol_vad_pr_apprreq','T');
    	}
	}
}

/**
 * Module Description
 * 
 * Version     Date            Author           Remarks
 * 1.00       20 Dec 2018     Priyanka Patil
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function onclick_callClient()
{
	 var recID = nlapiGetRecordId();
     var recordType = nlapiGetRecordType();
     nlapiLogExecution('DEBUG', 'record ID', 'recID = ' + recID+'recordType ='+recordType);
    // var lineCount = getLineItemCount('locations');
	 //var loc = getLineItemValue('location');
	 
	nlapiLogExecution('DEBUG', 'Log Parameters', 'recordType'+recordType);
  	var url = nlapiResolveURL('SUITELET', 'customscript_adjustinventory', 'customdeploy_adjustinventory')+'&itemid=' + recID+'&itemtype=' +recordType;
    //'&custscript_lineid='+ lineId+'&custscript_taskid='+ ID;
    document.location=url;
}
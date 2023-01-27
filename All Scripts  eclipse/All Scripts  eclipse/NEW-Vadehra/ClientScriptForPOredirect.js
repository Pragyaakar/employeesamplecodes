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
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientScriptPOredirect(type)
 {
	 var recordId = nlapiGetRecordId();
     var recordType = nlapiGetRecordType();
     
	 var url = nlapiResolveURL('SUITELET', '', '');
	 url = url + '&type=' + recordType +'&id='+recordId;
     window.onbeforeunload = null;
}

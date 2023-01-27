/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       10 Dec 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function  closeFunctionSubmit(type)
 {
	  var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
             var url2 = nlapiResolveURL('SUITELET', 'customscript_suite_status_close', 'customdeploy_suite_status_close');
        	 url2 = url2 + '&cust_type='+recordType + '&cust_id='+recordId;
             window.onbeforeunload = null;
	       window.open(url2, '_parent', 'print')
}

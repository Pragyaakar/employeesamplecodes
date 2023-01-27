/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Sep 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function  clientScriptMIredirect(type)
 {
	  var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
             var url2 = nlapiResolveURL('SUITELET', 'customscript_suite_loc_and_acc', 'customdeploy_suite_loc_and_acc');
        	 url2 = url2 + '&cust_type='+recordType + '&cust_id='+recordId;
             window.onbeforeunload = null;
	       window.open(url2, '_parent', 'print')
}


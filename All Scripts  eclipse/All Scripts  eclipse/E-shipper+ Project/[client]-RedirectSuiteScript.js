/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       1 july 2020     ATPL
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function refresh()
{
	window.open("https://5445214.app.netsuite.com/app/site/hosting/scriptlet.nl?script=1041&deploy=1","_self");
}

/*function  CreateIFcall(type)
 {
	  var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
             var url2 = nlapiResolveURL('SUITELET', 'customscript_suite_if_page', 'customdeploy_suite_if_page');
        	 url2 = url2 + '&so_type='+recordType + '&so_id='+recordId;
             window.onbeforeunload = null;
	       window.open(url2, '_parent', 'print')
}
*/

function clientFieldChanged(type, name, linenum)
{
	if(name == 'custpage_body_customer') 
    {
		
			  var rowCount = nlapiGetFieldValue('custpage_body_customer');
			  var url = window.location.search;
			  
			if (url.indexOf('&custpage_body_customer') > 0) 
			  {
			   // Remove the previous value of the parameter: param_rowCount
			   url = url.substring(0, url.indexOf('&custpage_body_customer'));
			  }
			  // The code below refreshes the page and passes the value of the dropdown
			  // in the URL as a parameter
			  window.location.search = url + '&custpage_body_customer=' + rowCount;
			 
		
	}
	
	if(name == 'custpage_body_filtby') 
    {
		
			  var rowCount1 = nlapiGetFieldValue('custpage_body_filtby');
			  var url1 = window.location.search;
			  
			if (url1.indexOf('&custpage_body_filtby') > 0) 
			  {
			   // Remove the previous value of the parameter: param_rowCount
			   url1 = url1.substring(0, url1.indexOf('&custpage_body_filtby'));
			  }
			  // The code below refreshes the page and passes the value of the dropdown
			  // in the URL as a parameter
			  window.location.search = url1 + '&custpage_body_filtby=' + rowCount1;
			 
		
	}
}

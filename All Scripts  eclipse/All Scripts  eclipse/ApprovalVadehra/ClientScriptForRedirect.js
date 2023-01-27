/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Mar 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */

function refresh()
{
	window.location.reload();
}


function redirectSuiteForApprove()
{
	     var requi = nlapiGetFieldValue('custpage_requi');
	     var requiName = nlapiGetFieldText('custpage_requi');
	     alert('requiName  ' +requiName);
	     var prjid = nlapiGetFieldValue('custpage_project');
	      alert('prjid  ' +prjid);
             var url = nlapiResolveURL('SUITELET', '', '');
        	 url = url + '&requi=' + requi +'&idProj='+prjid+'&requiName='+requiName;
             window.onbeforeunload = null;
	       window.open(url, '_parent', 'print')
	       nlapiRequestURL(url);
	      // window.open(url);
             
}
function redirectSuiteForReject()
{
	     var requi = nlapiGetFieldValue('custpage_requi');
	     var requiName = nlapiGetFieldText('custpage_requi');
	     alert('requiName  ' +requiName);
	     var prjid = nlapiGetFieldValue('custpage_project');
	      alert('prjid  ' +prjid);
             var url = nlapiResolveURL('SUITELET', '', '');
        	 url = url + '&requi=' + requi +'&idProj='+prjid+'&requiName='+requiName;
             window.onbeforeunload = null;
	       window.open(url, '_parent', 'print')
	       nlapiRequestURL(url);
	      // window.open(url);
             
}
  

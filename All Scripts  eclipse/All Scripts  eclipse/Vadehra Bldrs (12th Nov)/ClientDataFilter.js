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
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum)
{
	if(name == 'custpage_requi') 
    {
		
			  var rowCount = nlapiGetFieldValue('custpage_requi');
			  var url = window.location.search;
			  
			if (url.indexOf('&custpage_requi') > 0) 
			  {
			   // Remove the previous value of the parameter: param_rowCount
			   url = url.substring(0, url.indexOf('&custpage_requi'));
			  }
			  // The code below refreshes the page and passes the value of the dropdown
			  // in the URL as a parameter
			  window.location.search = url + '&custpage_requi=' + rowCount;
			 
		
	}

	if(name == 'custpage_project') 
    {
		
			  var rowCount = nlapiGetFieldValue('custpage_project');
			  var url = window.location.search;
			  
			if (url.indexOf('&custpage_project') > 0) 
			  {
			   // Remove the previous value of the parameter: param_rowCount
			   url = url.substring(0, url.indexOf('&custpage_project'));
			  }
			  // The code below refreshes the page and passes the value of the dropdown
			  // in the URL as a parameter
			  window.location.search = url + '&custpage_project=' + rowCount;
			 
		
	}
	
	if(name == 'custpage_transtatus') 
    {
		
			  var rowCount = nlapiGetFieldValue('custpage_transtatus');
			  var url = window.location.search;
			  
			if (url.indexOf('&custpage_transtatus') > 0) 
			  {
			   // Remove the previous value of the parameter: param_rowCount
			   url = url.substring(0, url.indexOf('&custpage_transtatus'));
			  }
			  // The code below refreshes the page and passes the value of the dropdown
			  // in the URL as a parameter
			  window.location.search = url + '&custpage_transtatus=' + rowCount;
			 
		
	}
	
}

function redirectSuiteForReject()
{
	   //  var requi = nlapiGetFieldValue('custpage_requi');
	  //   var requiName = nlapiGetFieldText('custpage_requi');
	  //   alert('requiName  ' +requiName);
	  //   var prjid = nlapiGetFieldValue('custpage_project');
	  //    alert('prjid  ' +prjid);
	 var checkValue = new Array();
	 var requiValue = new Array();
	 var ArrofREmark = new Array();
	 var Linenum = new Array();
	 var count = nlapiGetLineItemCount('custpage_sig_req_sublist');
	// alert('count  ' +count);
	 
	 for (var num =1; num<= count ;num++)
	 {
	  var checkValue = nlapiGetLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox',num);
	//  alert('checkValue  ' +checkValue);
	  if(checkValue == 'T')
	  {
		  var numOfLine= nlapiGetLineItemValue('custpage_sig_req_sublist', 'custpage_linenum',num);
		  var reqID  = nlapiGetLineItemValue('custpage_sig_req_sublist', 'custpage_interid',num);
		  var  remrk = nlapiGetLineItemValue('custpage_sig_req_sublist', 'custpage_remark',num);
		 
		  ArrofREmark.push(remrk);
		  requiValue.push(reqID);
		  Linenum.push(numOfLine);
		 
		//  alert('ArrofREmark  ' +ArrofREmark)
		// alert('requiValue  ' +requiValue)
		// alert('Linenum  ' +Linenum)
	  }
	 
	 }     
	 
	  //   alert('ArrofREmark  ' +ArrofREmark)
		// alert('Linenum  ' +Linenum)
		// alert('requiValue  ' +requiValue)
	 
	 var url = nlapiResolveURL('SUITELET', 'customscript_reject_approval', 'customdeploy_reject_approval');
        	 url = url + '&custscript1=' + requiValue +'&checkValue='+checkValue+'&custscript2='+Linenum+'&custscript3='+ArrofREmark;
             window.onbeforeunload = null;
	       window.open(url, '_parent', 'print')
	       nlapiRequestURL(url);
	      // window.open(url);
             
}
function refresh()
{
	 location.replace("https://system.na3.netsuite.com/app/site/hosting/scriptlet.nl?script=81&deploy=1&whence=")
}
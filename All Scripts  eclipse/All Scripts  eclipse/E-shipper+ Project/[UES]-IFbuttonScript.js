/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       1 July 2020     ATPL
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */

function BeforeLoadfulfillButton(type, form, request)
{
	if(type=='view' )
	{ 
		    var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		
	       var irObj = nlapiLoadRecord(recordType,recordId); 
	       var status =irObj.getFieldValue('approvalstatus');
	   	  nlapiLogExecution('DEBUG', 'Before Load', "  status  ==" + status);
	   	  
	   	  var CustTrans =irObj.getFieldValue('custbody_custom_trans_rec');
	   	  nlapiLogExecution('DEBUG', 'Before Load', "  CustTrans  ==" + CustTrans); 
      
	   	 
	   	 form.removeButton('process');
	     form.setScript('customscript_suite_redirect_script');
	  	 form.addButton('custpage_button1','Fulfill','CreateIFcall();');
   		
	}
 
}

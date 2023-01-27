/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Feb 2019     Tushar More
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
function BeforeLoadAcceptPayMentButton(type, form, request)
{
//
	
	if(type=='view' )
	{ 
		    var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		
	       var irObj = nlapiLoadRecord(recordType,recordId); 
	       var status =irObj.getFieldValue('approvalstatus');
	   	  nlapiLogExecution('DEBUG', 'Before Load', "  status  ==" + status);
	   	  
	   	  var CustTrans =irObj.getFieldValue('custbody_custom_trans_rec');
	   	  nlapiLogExecution('DEBUG', 'Before Load', "  CustTrans  ==" + CustTrans); 
      
	   	  if(recordType =='invoice' && (CustTrans!=null && CustTrans !='' && CustTrans !=undefined))
	   	  {
	   		    form.removeButton('acceptpayment');
	  		    form.setScript('customscript_client_customer_payment');
	  			form.addButton('custpage_button1','Payment Receipt','CreateCuctomTrans();');
       
	   	  }
	   	  else  if(recordType =='customer')
	   	  {
	   	         form.removeButton('acceptpayment');
 		         form.setScript('customscript_client_customer_payment');
 			     form.addButton('custpage_button1','Accept Payment','CreateCuctomTransMultipleInvoice();');
  
	   	  }
	  	       
		
			
	}
 
}

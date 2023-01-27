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
function BeforeLoadInvoiceButton(type, form, request)
{
	    var recordId = nlapiGetRecordId();
	    var recordType = nlapiGetRecordType();
	
	    var irObj = nlapiLoadRecord(recordType,recordId); 
	    nlapiLogExecution('DEBUG', 'Before Load', "  status  ==" + status);

	     form.setScript('');
		 form.addButton('custpage_button1','Generate Invoice','InvoiceCallScript();');
	
 
}


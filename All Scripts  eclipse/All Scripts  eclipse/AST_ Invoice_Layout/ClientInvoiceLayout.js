/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       28 Feb 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function invoicePrint()
{
	
	  var PDFURL = nlapiResolveURL('SUITELET', 'customscript_invoice_layout', 'customdeploy_invoice_layout', false);
	  PDFURL += '&custscript_invid=' + nlapiGetRecordId();
	  newWindow = window.open(PDFURL);
}
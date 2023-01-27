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
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function invoiceUserEventBeforeLoad(type, form, request)
{
  if(type == 'view')
  {
	  var user = nlapiGetUser();
	  form.setScript('customscript_clt_invoice_layout');
	  form.addButton('custpage_buttonPrintinvslp', 'Invoice Print', 'invoicePrint()');  	 
  }  
}

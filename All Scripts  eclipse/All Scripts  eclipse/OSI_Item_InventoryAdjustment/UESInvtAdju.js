/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Dec 2018     Priyanka Patil
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
function userEventBeforeLoad(type, form, request)
{ 
	form.setScript('customscript_adjust_inventory_client');
    form.addButton('custpagebutton', 'Adjust Inventory', 'onclick_callClient()');
}
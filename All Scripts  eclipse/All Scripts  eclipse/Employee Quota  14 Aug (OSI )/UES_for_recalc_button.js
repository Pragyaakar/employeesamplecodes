/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Dec 2018     Tushar More
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
	if(type=='view')
	{ 
    
	form.setScript('customscriptclient_emp_quota');
    form.addButton('custpagebutton', 'Recal Quota', 'onclick_callClient();');
	}
}
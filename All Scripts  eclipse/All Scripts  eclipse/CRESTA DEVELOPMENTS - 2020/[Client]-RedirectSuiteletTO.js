
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
function refresh()
{
	window.location.reload();
}

function redirectSuite()
{
	var id =nlapiGetRecordId();

    var url = nlapiResolveURL('SUITELET', 'customscript_suite_material_issue_wo', 'customdeploy_suite_material_issue_wo');
    url = url + '&rec_id=' + id;
    window.onbeforeunload = null;
	var newwindow = window.open(url, '_parent', 'print')
	nlapiRequestURL(url);
}

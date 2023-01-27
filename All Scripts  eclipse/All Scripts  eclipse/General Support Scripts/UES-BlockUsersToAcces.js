/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Nov 2019     Tushar More
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
function userEventBeforeLoad(type)//, form, request)
{
	if(type =='view')
	{
		var Users =nlapiGetUser();
	    if((nlapiGetContext().getExecutionContext() == 'userinterface')&&(Users !='' || Users !=''))
		 {
					throw nlapiCreateError('ERROR',"Sorry..You are not permitted to access this record..!!", false); 
		 }
	}
}

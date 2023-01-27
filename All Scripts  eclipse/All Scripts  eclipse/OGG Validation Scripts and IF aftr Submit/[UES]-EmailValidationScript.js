/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Dec 2019     Tushar More
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
function BeforeSubmitEmailValidate(type, form, request)
{
//
	
	if(type=='create')
	{ 
		   
		var email = nlapiGetFieldValue('email');
		
		 nlapiLogExecution('DEBUG','BeforeSubmitEmailValidate()', "email = "+email);
		 
		 var ChkMail = checkingEmailAlreadyExist(email);
		 nlapiLogExecution('DEBUG','BeforeSubmitEmailValidate()', "ChkMail = "+ChkMail);
			 
		 if(ChkMail == 1)
		 {
				throw nlapiCreateError('ERROR'," There is already a customer with the same email address", false); 
				
		 }
	    
	}
 
}

function checkingEmailAlreadyExist(email)
{
	var filters=new Array();
	var columns = new Array();
	filters[0] = new nlobjSearchFilter('email',null,'is',email.toString());
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('email');
	
	var searchResultItem = nlapiSearchRecord('customer', null, filters, columns);
	if (searchResultItem != null)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}
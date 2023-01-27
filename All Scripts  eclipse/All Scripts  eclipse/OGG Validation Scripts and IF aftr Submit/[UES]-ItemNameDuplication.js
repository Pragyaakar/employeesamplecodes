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
function BeforeSubmitDisplayNameValidate(type, form, request)
{
//
	
	if(type=='create')
	{ 
		   
		var DisplayName = nlapiGetFieldValue('displayname');//parent
		
		var matrixName = nlapiGetFieldValue('parent');//parent
		
		 nlapiLogExecution('DEBUG','BeforeSubmitDisplayNameValidate()', "DisplayName ="+DisplayName);
		 nlapiLogExecution('DEBUG','BeforeSubmitDisplayNameValidate()', "matrixName ="+matrixName);
		 
		 var ChkDisplayName = checkingDisplayNameAlreadyExist(DisplayName);
		 nlapiLogExecution('DEBUG','BeforeSubmitDisplayNameValidate()', "ChkDisplayName = "+ChkDisplayName);
			 
		 if((ChkDisplayName == 1) &&(matrixName ==null || matrixName =='' ||matrixName ==undefined))
		 {
				throw nlapiCreateError('ERROR',"There is already an item with the same display name", false); 
				
		 }
	    
	}
 
}

function checkingDisplayNameAlreadyExist(DisplayName)
{
	var filters=new Array();
	var columns = new Array();
	filters[0] = new nlobjSearchFilter('displayname',null,'is',DisplayName.toString());
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('displayname');
	
	var searchResultItem = nlapiSearchRecord('item', null, filters, columns);
	if (searchResultItem != null)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       09 Apr 2019     Tushar More
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
function userEventBeforeLoadErrorThrow(type)//, form, request)
{
	if(type =='create')
	{
		
    if(nlapiGetContext().getExecutionContext() == 'userinterface')
	 {
	
      var Customer= nlapiGetFieldValue('customer');
	  nlapiLogExecution('DEBUG', 'b4 submit', "  Customer  ==" + Customer);
	

		if(Customer == null ||Customer =='' ||Customer== undefined)
		{
			throw nlapiCreateError('ERROR',"You can not create Customer Receipt directly...", false); 
		}
		
	 }
	}
}
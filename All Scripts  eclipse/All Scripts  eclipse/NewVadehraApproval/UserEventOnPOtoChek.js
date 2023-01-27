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
function userEventBeforeLoad(type)//, form, request)
{
	if(type =='create')
	{
		
    if(nlapiGetContext().getExecutionContext() != 'userinterface')
	 {
		// var recordId = nlapiGetRecordId();
	  //   var recordType = nlapiGetRecordType();
	
  //    var irObj = nlapiLoadRecord(recordType,recordId); 
      var PRlinecount= nlapiGetLineItemCount('item');
	  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
	
	   var number= '0';
	  
		for(var i=1;i<=PRlinecount;i++)
		{
			 
            	var approveStatline = nlapiGetLineItemValue('item','custcol_vad_appstatus',i);         
        	    nlapiLogExecution('DEBUG', 'aftr submit', "  approveStatline  ==" + approveStatline);
        	
        		if(approveStatline != '2' || approveStatline != '5')
        		{
        	    	number = parseInt(number)+parseInt(1);
        		}
		}
		
		if(number > 0)
		{
			throw nlapiCreateError('ERROR',"You have not selected all approved items.Please Go back to Order Requisition Page and Select the Approved items only...", false); 
		}
		
	 }
	}
}

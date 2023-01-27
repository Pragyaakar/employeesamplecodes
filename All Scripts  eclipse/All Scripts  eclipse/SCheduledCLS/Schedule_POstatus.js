/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       10 Jun 2019     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function scheduledPO_StatusSet(type) 
{
	 var internalId;
	 var recType = 'purchaseorder';
	// var prClose;
	// var prCloseF;
	
	var searchId='customsearch_atlas_po_lookup_rpt_2';
	resultSet = findTransaction(searchId);
	
	if(resultSet!='' && resultSet!= null && resultSet !='undefined')
	{
		nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
		for(var i=0;i<resultSet.length;i++)//resultSet.length
			{
				var columns = resultSet[i].getAllColumns();
				internalId= resultSet[i].getValue(columns[1]);
				var status= resultSet[i].getValue(columns[7]);
				nlapiLogExecution('DEBUG','internalId','internalId'+internalId);
				nlapiLogExecution('DEBUG','internalId','status'+status);
				/*internalidPR= resultSet[i].getValue(columns[1]);
				nlapiLogExecution('DEBUG','internalId','internalidPR'+internalidPR);
				*/
				if(internalId != null && internalId != undefined && internalId != '')
			    {
			    	custObj = nlapiLoadRecord(recType,internalId);
			    	
			    	if(status=='pendingReceipt' || status=='partiallyReceived' || status=='pendingBillPartReceived' || status=='pendingBill')
			    	{
			    		custObj.setFieldValue('custbody_po_status',1);
			    	}
			    	else if(status=='fullyBilled' || status=='closed' )
			    	{
			    		custObj.setFieldValue('custbody_po_status',2);
			    	}
			    	else if(status=='pendingSupApproval' || status=='rejected')
			    	{
			    		custObj.setFieldValue('custbody_po_status',3);
			    	}
			    	
			    	
			    	 nlapiSubmitRecord(custObj,true,false);
			}
	}
	

}
}// END Function

function findTransaction(searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	// filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',recordID);
	savedSearch.addFilters(filters);
	   
	    var resultset = savedSearch.runSearch();
		var returnSearchResults = [];
	    var searchid = 0;
	    do {
    	
	        var resultslice = resultset.getResults(searchid, searchid + 1000);
	        if(resultslice!= null)
	        {
	    	   for ( var rs in resultslice) 
		        {
		        	returnSearchResults.push(resultslice[rs]);
		            searchid++;
		        }
	    	   nlapiLogExecution('DEBUG','searchid','searchid'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;

} 
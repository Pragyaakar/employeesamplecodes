function schedulerIfupdation()
{
	var internalId;
	var recType = 'itemfulfillment';
	
	var searchId='customsearch871';
	resultSet = findEWDetails(searchId);
	if(resultSet!='' && resultSet!= null && resultSet !='undefined')
	{
		nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
		for(var i=0;i<1;i++)
			{
				var columns = resultSet[i].getAllColumns();
				internalId= resultSet[i].getValue(columns[0]);
				nlapiLogExecution('DEBUG','internalId','internalId'+internalId);
              nlapiLogExecution('DEBUG','current no','current no'+i);
			    if(internalId)
			    {
			    	ifObj = nlapiLoadRecord(recType,internalId);
			    	nlapiSubmitRecord(ifObj,true,false);
			    }
			}
	}
}
function findEWDetails(searchId)
{
	var resultSet = nlapiLoadSearch('transaction', searchId); 
	var filters=new Array();
	var columns = new Array();
	//filters[0] = new nlobjSearchFilter('custrecord8',null,'anyof',Month);
	//filters[1] = new nlobjSearchFilter('custrecord_year_frm_parnt_recrd',null,'is',Year.toString());
	//savedSearch.addFilters(filters);
	var resultset = resultSet.runSearch();
	nlapiLogExecution('DEBUG', 'resultset in findEmpForQuotaDetails', 'resultset: '+resultset);
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
   return returnSearchResults;
}
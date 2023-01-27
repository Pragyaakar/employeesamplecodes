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

function updateSaleReponIF(type) 
{
	
	
	
	var searchId='customsearch_script_to_update_rep';
	resultSet = getSavedSearchResult(null,searchId,null);
	
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				var ReptoSet='Nicole Balesdent';
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
				for(var i=335;i< resultSet.length;i++)//resultSet.length
					{
						var columns = resultSet[i].getAllColumns();
						 var internalID = resultSet[i].getValue(columns[0]);
						 var lineNum = resultSet[i].getValue(columns[3]);
						 
						 var objIf = nlapiLoadRecord('itemfulfillment',internalID); 
							 
							 var lineCount = objIf.getLineItemCount('item')
							 if(lineCount != null && lineCount != undefined)
							 {
								 for(var j=1 ; j<=lineCount; j++)
							     {
									 var lineId = objIf.getLineItemValue('item','line',j);
									 	
									 if(lineId === lineNum )
										 {
									 		nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  internalID ==" +internalID);
											
											 objIf.setLineItemValue('item','custcol_cust_line_rep',j,ReptoSet);
										 }
								 }
							 }
							 
							 nlapiSubmitRecord(objIf);
							 
							 
							 var remainingUsage = nlapiGetContext().getRemainingUsage();
			        			
							   if (remainingUsage < 500) {
			        				nlapiYieldScript();
			        			}
							
			         }
			 }
			
	
}// END Function
function getSavedSearchResult(recType, searchId, filters)
{
    var aSearchResults = [];
    var iRscnt = 1000, min = 0, max = 1000;
    var search = {};
    if (searchId) 
    {
        var search = nlapiLoadSearch(recType, searchId);
        if (filters) 
        {
            search.addFilters(filters);
        }
    }
    

    var rs = search.runSearch();
    try 
    {
        while (iRscnt == 1000) 
        {
            var resultSet = rs.getResults(min, max);
            aSearchResults = aSearchResults.concat(resultSet);
            min = max;
            max += 1000;
            iRscnt = resultSet.length;
        }
    }
    catch (e) 
    {
        nlapiLogExecution('DEBUG', 'getAllResults --> exception', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    }

 //   nlapiLogExecution('DEBUG', 'getAllResults --> Success', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    return aSearchResults;
}
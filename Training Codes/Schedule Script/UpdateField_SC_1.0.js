
function scheduled_QTyLvlSet(type) 
{
	 var internalId;
	var recType ='';
	var searchId='customsearch_qty_levl_update';
	resultSet = getSavedSearchResult(null, searchId, null);
	
	if(resultSet!='' && resultSet!= null && resultSet !='undefined')
	{
		nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
		for(var i=0;i<resultSet.length;i++)//resultSet.length
			{
				var columns = resultSet[i].getAllColumns();
				//var internalId1 = resultSet[i].getValue(columns[0]);

				internalId= resultSet[i].getValue(columns[0]);
				var name= resultSet[i].getValue(columns[2]);
				var status= resultSet[i].getValue(columns[3]);
				var itemType = resultSet[i].getValue(columns[4]);
				
				
				
				nlapiLogExecution('DEBUG','internalId','internalId='+internalId);
				
				nlapiLogExecution('DEBUG','internalId','itemType='+itemType);
				 try
				 {
					 if(internalId != null && internalId != undefined && internalId != '')
					    {
							if(itemType == 'InvtPart')
							{
						
							     var itemObj=nlapiLoadRecord('inventoryitem',internalId);
							      
							}
							else if(itemType =='Assembly')
							{
							 var itemObj=nlapiLoadRecord('assemblyitem',internalId);	
							 
							}
							else if(itemType=='Kit')
							{
								var itemObj=nlapiLoadRecord('kititem',internalId);
								
							}
							else if(itemType=='OthCharge')
							{
								var itemObj=nlapiLoadRecord('otherchargeitem',internalId);
								 
							}
							else if(itemType=='Markup')
							{
									var itemObj=nlapiLoadRecord('markupitem',internalId);
									 
							}
							
							var scheduleNum = itemObj.setFieldValue('schedulebnumber');
							nlapiLogExecution('DEBUG','internalId','itemObj='+itemObj);
							
							if(scheduleNum != null && scheduleNum != '')
							{
								itemObj.setFieldValue('schedulebnumber','1');
							}
					     	
					      
							nlapiSubmitRecord(itemObj);
							nlapiLogExecution('DEBUG','internalId','itemObj='+itemObj);
				     }
				 }
				catch(e)
				{
					nlapiLogExecution('DEBUG','internalId','Error='+e);
					continue;
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

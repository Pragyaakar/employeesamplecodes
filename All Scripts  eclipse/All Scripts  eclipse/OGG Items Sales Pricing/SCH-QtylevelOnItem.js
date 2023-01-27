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
function scheduled_QTyLvlSet(type) 
{
	 var internalId;
	var recType ='';
	var searchId='customsearch_qty_levl_update';
	resultSet = getSavedSearchResult(null, searchId, null);
	
	if(resultSet!='' && resultSet!= null && resultSet !='undefined')
	{
		nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
		for(var i=51;i<150;i++)//resultSet.length
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
							
							 
					     	var qtyLevel2 = itemObj.setFieldValue('price1quantity1','1');
							var qtyLevel2 =itemObj.setFieldValue('price1quantity2','10');
							var qtyLevel3 =itemObj.setFieldValue('price1quantity3','25');
							var qtyLevel4 =itemObj.setFieldValue('price1quantity4','50');
							var qtyLevel5 =itemObj.setFieldValue('price1quantity5','100');
							var qtyLevel6 =itemObj.setFieldValue('price1quantity6','250');
							var qtyLevel7 =itemObj.setFieldValue('price1quantity7','500');
							var qtyLevel8 =itemObj.setFieldValue('price1quantity8','1000');
							var qtyLevel9 =itemObj.setFieldValue('price1quantity9','2500');
							var qtyLevel10 =itemObj.setFieldValue('price1quantity10','5000');
							var qtyLevel11 =itemObj.setFieldValue('price1quantity11','10000');
					      
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

/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       31 Jan 2020     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function sched_Customer_sale_history(type) 
{
	try{
		
	var Todays = new Date();
	var searchId='customsearch_product_sales_history';
	var recType =null;
	var filters =null;
	var ClassMapReturn = getClassBCcategory();
	
	var resultSet = getSavedSearchResult(recType, searchId, filters);
	
	var CustomerMap ={}
	
	var checkID;
	
	if(resultSet!='' && resultSet!= null && resultSet !='undefined')
	{
		var prodArr =[];
		
		nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
		for(var i=0;i<30;i++)//resultSet.length
			{
			  
				var ItemId = resultSet[i].getValue("internalid","item","GROUP");
				var itemName = resultSet[i].getValue("itemid","item","GROUP");
				var ProdGrp3 = resultSet[i].getValue("custitem_product_group3","item","GROUP");
				var customerID = resultSet[i].getValue("internalid","customerMain","GROUP");
				
				CustomerMap[ProdGrp3+'-'+customerID]=customerID;				
			}
		
		nlapiLogExecution('DEBUG','resultSet length','Map ResultSet ='+JSON.Stringify(CustomerMap));	
	}
	}
	catch(e){
		nlapiLogExecution('DEBUG','BctoNS-customization','Error ='+e);
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


function filter_array(test_array) 
{
	 var index = -1,
	 arr_length = test_array ? test_array.length : 0,
	 resIndex = -1,
	 result = [];

	 while (++index < arr_length) 
	 {
		 var value = test_array[index];
		 if(value)
		 {
			result[++resIndex] = value;
		  }
	 }
return result;
}



function removeDuplicates(num) 
{
	  var x,
		  len=num.length,
		  out=[],
		  obj={};
	 
	  for (x=0; x<len; x++) 
	  {
		obj[num[x]]=0;
	  }
	  for (x in obj) 
	  {
		out.push(x);
	  }
	  return out;
	}
	
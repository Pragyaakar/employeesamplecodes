
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Sep 2019     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */

var currntDate = new Date();
var Month = currntDate.getMonth();
Month = Month+1;
var Year = currntDate.getFullYear();
var day = currntDate.getDay();
var time = currntDate.getHours() + ":" + currntDate.getMinutes();

function invoiceIssueResolve(type) {
	
	try
	{
		var searchId='customsearch3300';
		resultSet = findTransaction(searchId);
		
				if(resultSet!='' && resultSet!= null && resultSet !='undefined')
				{
					nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
					for(var i=0;i<1;i++)//resultSet.length
						{
							var columns = resultSet[i].getAllColumns();
							
							recId = resultSet[i].getValue(columns[0]);
							var CreatedFrom = resultSet[i].getValue(columns[1]);
							var tranDate = resultSet[i].getValue(columns[2]);
							var tranId = resultSet[i].getValue(columns[2]);
							var Customer = resultSet[i].getValue(columns[3]);
							
							
							var itemRateMap={};
							
							var loadSo = nlapiLoadRecord('salesorder',CreatedFrom);
							
							var count = loadSo.getLineItemCount('item');
							
							for(var m=1;m<=count;m++)
							{
								var soItem = loadSo.getLineItemValue('item','item',m);
								var soRate = loadSo.getLineItemValue('item','rate',m);
								
								itemRateMap[soItem]=soRate;
							}
						
							
							var loadInv = nlapiLoadRecord('invoice',recId);
							
	                 		var count1 = loadInv.getLineItemCount('item');
							
	                 		 var itemsINV = Object.keys(itemRateMap);
		                 		
								for(var m1=1;m1<=count;m1++)
								{
									var InvItem = loadInv.getLineItemValue('item','item',m1);
									var InvRate = loadInv.getLineItemValue('item','rate',m1);
									
									if(itemRateMap[InvItem] !=null &&  itemRateMap[InvItem] !=''  && itemRateMap[InvItem] !=undefined )
							        {
										var setRate =itemRateMap[InvItem];
										
										loadInv.setLineItemValue('item','rate',m1,parseFloat(setRate));
							        }
								}
						
							var DATA =nlapiSubmitRecord(loadInv);
							nlapiLogExecution('DEBUG','searchid','DATA=='+DATA);
						}
				}
	}
	catch(e)
	{
		
	}
}

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
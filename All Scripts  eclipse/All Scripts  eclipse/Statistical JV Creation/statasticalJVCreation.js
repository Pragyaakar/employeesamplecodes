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


var currntDate = new Date();
var Month = currntDate.getMonth();
Month = Month+1;
var Year = currntDate.getFullYear();
var day = currntDate.getDay();

if(Month == 1 || Month == 3 || Month == 5 || Month == 7 || Month == 8 || Month == 10 || Month == 12)
{
	var Day = 31;
	
}
else if(Month == 4 ||Month == 6 || Month == 9 ||Month == 11)
{
		var Day =30;
}
else if(Month == 2)
{
	if(Year % 4 == 0)
	{
		
		var Day = 29;
	}
	else
	{			
		var Day = 28;
		
	}
}

var TodayIs = Month+'/'+Day+'/'+Year;

function scheduled_to_StatJV_creation(type) 
{
	
	 var amtInlitr;
	
	var searchId='customsearch_total_litres_sold';
	resultSet = findTransaction(searchId);
	
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
				for(var i=0;i<resultSet.length;i++)//resultSet.length
					{
						var columns = resultSet[i].getAllColumns();
						amtInlitr= resultSet[i].getValue(columns[0]);
						var subsidiary= resultSet[i].getValue(columns[1]);
						
					//	var units= resultSet[i].getValue(columns[2]);
						nlapiLogExecution('DEBUG','internalId','amtInlitr'+amtInlitr);
						nlapiLogExecution('DEBUG','internalId','subsidiary'+subsidiary);
						nlapiLogExecution('DEBUG','internalId','TodayIs'+TodayIs);
			
						 CreateStatisticalJV(amtInlitr,subsidiary,TodayIs);
			         }
			 }
			
	
}// END Function


function CreateStatisticalJV(amtInlitr,subsidiary,TodayIs)
{
	var acctNum ='285';
	var unitsVal='4';
	var jeRec = nlapiCreateRecord('statisticaljournalentry',{recordmode: 'dynamic'});
	jeRec.setFieldValue('trandate',new Date(TodayIs));
	jeRec.setFieldValue('subsidiary',subsidiary);//subsidiary
	jeRec.setFieldValue('unitstype',3);
	
	    jeRec.selectNewLineItem('line');
		jeRec.setCurrentLineItemValue('line', 'account',acctNum);
		jeRec.setCurrentLineItemValue('line', 'debit', amtInlitr);  
		jeRec.setCurrentLineItemValue('line', 'lineunit',unitsVal); 
		jeRec.commitLineItem('line');
	

	var s=  nlapiSubmitRecord(jeRec);	
	 nlapiLogExecution('DEBUG','notSame','JV Created...');
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
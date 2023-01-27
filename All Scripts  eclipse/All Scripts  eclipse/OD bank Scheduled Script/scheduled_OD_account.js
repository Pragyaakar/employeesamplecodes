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

var LastDate ;

var currntDate = new Date();
var Month = currntDate.getMonth();
Month = Month+1;
var Year = currntDate.getFullYear();
var day = currntDate.getDay();
var time = currntDate.getHours() + ":" + currntDate.getMinutes();


var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

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



function scheduled_to_ODbank_JV_creation(type) 
{
	var companyInfo = nlapiLoadConfiguration('companyinformation');
	var companyname = companyInfo.getFieldValue('companyname');
	var timeZone =  companyInfo.getFieldValue('timezone');
	
	
	if(parseInt(day) === parseInt(Day) && time == '23:50')  //TIMEZONE
	{
	
	 var amtInlitr;
	
	 var searchId='customsearch_account_type_bank';
	
	 resultSet = findTransaction(searchId);
	
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
				for(var i=0;i<resultSet.length;i++)//resultSet.length
					{
						var columns = resultSet[i].getAllColumns();
						
						var subsidiary= resultSet[i].getValue(columns[6]);
						
					    var NegativAmt = resultSet[i].getValue(columns[3]);
						
					//	var units= resultSet[i].getValue(columns[2]);
						nlapiLogExecution('DEBUG','internalId','NegativAmt'+NegativAmt);
						nlapiLogExecution('DEBUG','internalId','subsidiary'+subsidiary);
						nlapiLogExecution('DEBUG','internalId','TodayIs'+TodayIs);
			                
						if(NegativAmt < 0)
						{
							CreateJVforODBankAcc(subsidiary,NegativAmt,TodayIs,tomorrow);
						}
						  
			         }
			 }
			LastDate=TodayIs;
	}
/*	else if(parseInt(day) == parseInt(1) && TodayIs > LastDate && time == '00:05')  //TIMEZONE
	{
	
	 var amtInlitr;
	
	 var searchId='customsearch_account_type_bank';
	
	 resultSet = findTransaction(searchId);
	
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
				for(var i=0;i<resultSet.length;i++)//resultSet.length
					{
						var columns = resultSet[i].getAllColumns();
						
						var subsidiary= resultSet[i].getValue(columns[6]);
						
					    var NegativAmt = resultSet[i].getValue(columns[3]);
						
					//	var units= resultSet[i].getValue(columns[2]);
						nlapiLogExecution('DEBUG','internalId','NegativAmt'+NegativAmt);
						nlapiLogExecution('DEBUG','internalId','subsidiary'+subsidiary);
						nlapiLogExecution('DEBUG','internalId','TodayIs'+TodayIs);
			                
						if(NegativAmt < 0)
						{
							CreateJVforODBankAccReversal(subsidiary,NegativAmt,TodayIs);
						}
						  
			         }
			 }
			LastDate=TodayIs;
	}*/
}// END Function


function CreateJVforODBankAcc(subsidiary,NegativAmt,TodayIs,tomorrow)
{
	var ODcontrol='1158';
	var ODbank='394';
	
	var jeRec = nlapiCreateRecord('journalentry',{recordmode: 'dynamic'});
	jeRec.setFieldValue('subsidiary',subsidiary);//subsidiary
	jeRec.setFieldValue('trandate',new Date(TodayIs));
	jeRec.setFieldValue('reversaldate',tomorrow);
	
		
	    jeRec.selectNewLineItem('line');
		jeRec.setCurrentLineItemValue('line', 'account',ODcontrol);
		jeRec.setCurrentLineItemValue('line', 'debit', parseFloat(0-NegativAmt));  
		jeRec.commitLineItem('line');
	
	    jeRec.selectNewLineItem('line');
		jeRec.setCurrentLineItemValue('line', 'account',ODbank);
		jeRec.setCurrentLineItemValue('line', 'credit', parseFloat(0-NegativAmt));  
		jeRec.commitLineItem('line');
	

	var s=  nlapiSubmitRecord(jeRec);	
	 nlapiLogExecution('DEBUG','notSame','JV Created...');
}

/*
function CreateJVforODBankAccReversal(subsidiary,NegativAmt,TodayIs)
{
	var ODcontrol='1158';
	var ODbank='394';
	
	var jeRec = nlapiCreateRecord('journalentry',{recordmode: 'dynamic'});
	jeRec.setFieldValue('subsidiary',subsidiary);//subsidiary
	jeRec.setFieldValue('reversaldate',new Date(TodayIs));
	
		
	    jeRec.selectNewLineItem('line');
		jeRec.setCurrentLineItemValue('line', 'account',ODbank);
		jeRec.setCurrentLineItemValue('line', 'debit', parseFloat(0-NegativAmt));  
		jeRec.commitLineItem('line');
	
	    jeRec.selectNewLineItem('line');
		jeRec.setCurrentLineItemValue('line', 'account',ODcontrol);
		jeRec.setCurrentLineItemValue('line', 'credit', parseFloat(0-NegativAmt));  
		jeRec.commitLineItem('line');
	

	 var s =  nlapiSubmitRecord(jeRec);	
	 nlapiLogExecution('DEBUG','notSame','Reversal JV Created...');
}
*/



function findTransaction(searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_od', null,'is',"T");
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


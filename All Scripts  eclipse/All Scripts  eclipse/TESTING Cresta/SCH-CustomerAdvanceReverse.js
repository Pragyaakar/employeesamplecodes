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


// var tomorrow = new Date();
// tomorrow.setDate(tomorrow.getDate() + 1);

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

if(parseFloat(Month+1) <=12)
{
	var tomorrow = parseFloat(Month+1)+'/'+1+'/'+Year;
}
else
{
	var tomorrow = 1+'/'+1+'/'+parseFloat(Year+1);
}



function scheduled_to_reverseCustBal(type) 
{
	var companyInfo = nlapiLoadConfiguration('companyinformation');
	var companyname = companyInfo.getFieldValue('companyname');
	var timeZone =  companyInfo.getFieldValue('timezone');
	
	
	//if(parseInt(day) === parseInt(Day) && time == '23:55')  //TIMEZONE
	{
	
		var UniquCustomer =[];
		var test_array =[];
		var test_array1 =[];
		
	 var amtInlitr;
	
	 var searchId='customsearch_cust_wit_neg_bal';
	
	 resultSet = findTransaction(searchId);
	 
	 resultSet1 = findTransaction(searchId);
	 
	 if(resultSet1 !='' && resultSet1 != null && resultSet1 !='undefined')
		{
			nlapiLogExecution('DEBUG','resultSet length',' resultSet1 length'+resultSet1.length);	    
			for(var i1=0;i1<resultSet1.length;i1++)//resultSet.length
				{
					var columns1 = resultSet1[i1].getAllColumns();
					
					var inteId1 = resultSet1[i1].getValue(columns1[0]);
					
					  var subsidiary1 = resultSet1[i1].getValue(columns1[4]);
				    
				     test_array.push(subsidiary1);
				}
		}
	 test_array1  = filter_array(test_array);
	 UniquCustomer =removeDuplicates(test_array1);
	
	
	 
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	 
				
				for(var ch=0;ch<UniquCustomer.length;ch++)
				{
					try
					{
						
					
					 var subsidiaryArr =[];
					 var custIdArr=[];
					 var CustomerArr=[];
					 var NegativAmtArr=[];
					 var receivAccArr =[];
					 
					for(var i=0;i<resultSet.length;i++)//resultSet.length
					{
						var columns = resultSet[i].getAllColumns();
						
						var custId= resultSet[i].getValue(columns[6]);
						
					    var Customer = resultSet[i].getValue(columns[1]);
					    
					    var NegativAmt = resultSet[i].getValue(columns[2]);
					    
					    var AmountForeign = resultSet[i].getValue(columns[3]);
					    
					    var subsidiary = resultSet[i].getValue(columns[4]);
					    
					    var receivAcc = resultSet[i].getValue(columns[5]);
					    
					    if(UniquCustomer[ch] == subsidiary)
						{
						    custIdArr.push(custId);
						    NegativAmtArr.push(NegativAmt);
						    subsidiaryArr.push(subsidiary);
						    receivAccArr.push(receivAcc);
						}
					   
					/*	if(UniquCustomer[ch] == custId)
						{
							CreateJVforCustomerNegative(subsidiary,NegativAmt,TodayIs,tomorrow,custId,receivAcc);
						}*/
						  
			         }
					   nlapiLogExecution('DEBUG','internalId','custIdArr='+custIdArr);
						nlapiLogExecution('DEBUG','internalId','NegativAmtArr='+NegativAmtArr);
						nlapiLogExecution('DEBUG','internalId','subsidiaryArr='+subsidiaryArr);
						nlapiLogExecution('DEBUG','internalId','TodayIs='+TodayIs);
						nlapiLogExecution('DEBUG','internalId','receivAccArr='+receivAccArr);
			                
					CreateJVforCustomerNegative(subsidiaryArr,NegativAmtArr,TodayIs,tomorrow,custIdArr,receivAccArr);
					}
					catch(e)
					{
						nlapiLogExecution('DEBUG','internalId','Error ='+e);
					}
				}
				
			 }
			LastDate=TodayIs;
	}

}// END Function


function CreateJVforCustomerNegative(subsidiaryArr,NegativAmtArr,TodayIs,tomorrow,custIdArr,receivAccArr)
{
	
	var jeRec = nlapiCreateRecord('journalentry',{recordmode: 'dynamic'});
	jeRec.setFieldValue('subsidiary',subsidiaryArr[0]);//subsidiary
	jeRec.setFieldValue('trandate',new Date(TodayIs));
	jeRec.setFieldValue('reversaldate',tomorrow);
	
		for (var s=1;s<=subsidiaryArr.length;s++)
		{
			   jeRec.selectNewLineItem('line');
				jeRec.setCurrentLineItemValue('line', 'account',receivAccArr[s-1]);
				jeRec.setCurrentLineItemValue('line', 'debit', parseFloat(0-NegativAmtArr[s-1]).toFixed(2));  
				jeRec.setCurrentLineItemValue('line', 'entity', custIdArr[s-1]);  
				jeRec.commitLineItem('line');
			
			    jeRec.selectNewLineItem('line');
				jeRec.setCurrentLineItemValue('line', 'account',766);
				jeRec.setCurrentLineItemValue('line', 'credit', parseFloat(0-NegativAmtArr[s-1]).toFixed(2));  
				jeRec.commitLineItem('line');
			
		}
	 

	var s1 =  nlapiSubmitRecord(jeRec);	
	 nlapiLogExecution('DEBUG','notSame','JV Created...');
}





function findTransaction(searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	// filters[0]=new nlobjSearchFilter('custrecord_od', null,'is',"T");
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


function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

function removeDuplicates(arr){
    var unique_array = []
    for(var i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array;
}

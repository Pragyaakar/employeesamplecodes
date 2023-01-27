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

function SCH_SalesReport(type) {
	
	var searchId='customsearch_won_opportnty_ytd';
	CurrencyResultSet = findTransaction(searchId);
	resultSet = findTransaction(searchId);
	
	var currArr=[];
	var currencyName=[];
	var UniqueCurrency=[];
	
	
	if(CurrencyResultSet !='' && CurrencyResultSet != null && CurrencyResultSet !='undefined')
	{
		nlapiLogExecution('DEBUG','resultSet length','CurrencyResultSet length'+CurrencyResultSet.length);	    
		for(var i1=0;i1<CurrencyResultSet.length;i1++)//resultSet.length
			{
				var curr =CurrencyResultSet[i1].getValue("currency",null,"GROUP");
				currArr.push(curr);
			}
	}
	
	
	currencyName = filter_array1(currArr);
	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- currencyName :-"+currencyName);
	
	UniqueCurrency = removeDuplicates1(currencyName);
	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- UniqueCurrency :-"+UniqueCurrency);
	 
	if(UniqueCurrency !='' && UniqueCurrency != null && UniqueCurrency !='undefined')
	{
		nlapiLogExecution('DEBUG','resultSet length','UniqueCurrency length'+UniqueCurrency.length);	    
		for(var j=0;j<UniqueCurrency.length;j++)//resultSet.length
		{
			var DateArr =[];
			var IntIdArr =[];
			var salesRepArr =[];
			var WeekArr =[];
			var YearArr =[];
			var FirstAmt =[];
			var SecondAmt =[];
			var ThirdAmt =[];
			var FourthAmt =[];
			
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
				for(var i=0;i<resultSet.length;i++)//resultSet.length
					{
					
				    	var currency =resultSet[i].getValue("currency",null,"GROUP"); 
				    	
				    	if(currency ==UniqueCurrency[j])
					    {
						var date =resultSet[i].getValue("trandate",null,"GROUP");
						
						DateArr.push(date);
						var findWeek = nlapiStringToDate(date);
					    var firstDate = new Date(findWeek.getFullYear(),findWeek.getMonth(),1);
						var firstDay = firstDate.getDay();
						var getFullYr = findWeek.getFullYear();
						YearArr.push(getFullYr);
						
						var weekNumber = Math.ceil((findWeek.getDate() + firstDay) / 7);
						WeekArr.push(weekNumber);
						
						var total =resultSet[i].getValue("foreignprojectedamount",null,"SUM");
						FirstAmt.push(total);
						
						var RecID =resultSet[i].getValue("internalid",null,"GROUP");
						IntIdArr.push(RecID);
						
						var salesRep = resultSet[i].getText("salesrep",null,"GROUP");
						salesRepArr.push(salesRep);
						
						
						
						var weightedPIPEAmt =findTransaction2(date,RecID,salesRep);
						
						SecondAmt.push(weightedPIPEAmt);
						
						var WonweightedPIPEAmt =findTransaction3(date,RecID,salesRep);
						ThirdAmt.push(WonweightedPIPEAmt);
						
						var fullPIPEAmt =findTransaction4(date,RecID,salesRep);
						FourthAmt.push(fullPIPEAmt);
					   }
			         }
				 
				nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- FirstAmt:-"+FirstAmt);
				nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- SecondAmt:-"+SecondAmt);
				nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- ThirdAmt :-"+ThirdAmt);
				nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- FourthAmt :-"+FourthAmt);
				
				 }
			createSalesReportingRecord(DateArr,YearArr,WeekArr,IntIdArr,FirstAmt,SecondAmt,ThirdAmt,FourthAmt);
			
       }
	}
}

function createSalesReportingRecord(DateArr,YearArr,WeekArr,IntIdArr,FirstAmt,SecondAmt,ThirdAmt,FourthAmt)
{
	var o_b2cObj = nlapiCreateRecord('customrecord354',{recordmode: 'dynamic'});
	
	var lineCount = o_b2cObj.getLineItemCount('recmachcustrecord_sale_reprt_details_head');
	//nlapiLogExecution('DEBUG','Weighted Pipeline Search','lineCount in function'+lineCount);
	
		for(var p=1;p<=IntIdArr.length;p++)
		{
			nlapiLogExecution('DEBUG','Weighted Pipeline Search','wonYTD_TotalArray.length in function'+IntIdArr.length);
			
			o_b2cObj.selectLineItem('recmachcustrecord_sale_reprt_details_head',p);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecordsales_reporting_internal_id',IntIdArr[p-1]);
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "wonYTD_InternalIDArray done ==" +wonYTD_InternalIDArray[p-1]);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_salesreporting_wonytd',FirstAmt[p-1]);
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "weighted_Total done ==" +wonYTD_TotalArray[p-1]);
			
			if(SecondAmt[p-1] !=null && SecondAmt[p-1] !='' && SecondAmt[p-1] !=undefined )
			{
				SecondAmt[p-1]=SecondAmt[p-1];
			}
			else 
			{
				SecondAmt[p-1]=0;
			}
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_salesreporting_year',SecondAmt[p-1]);
			
			if(ThirdAmt[p-1] !=null && ThirdAmt[p-1] !='' && ThirdAmt[p-1] !=undefined )
			{
				ThirdAmt[p-1]=ThirdAmt[p-1];
			}
			else 
			{
				ThirdAmt[p-1]=0;
			}
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_wet_pipe_current_year',ThirdAmt[p-1]);
			
			if(FourthAmt[p-1] !=null && FourthAmt[p-1] !='' && FourthAmt[p-1] !=undefined )
			{
				FourthAmt[p-1]=FourthAmt[p-1];
			}
			else 
			{
				FourthAmt[p-1]=0;
			}
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecordsr_fullpipeline_currentyr',FourthAmt[p-1]);
			
			
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_salesreporting_date',DateArr[p-1]);
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "won_DateArray done ==" +won_DateArray[p-1]);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_salesreporting_week',parseInt(WeekArr[p-1]));
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "weekNumber done ==" +weekNumberArray[p-1]);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_year',parseInt(YearArr[p-1]));
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "weighted_Total done ==" +getFullYrArray[p-1]);
			
			o_b2cObj.commitLineItem('recmachcustrecord_sale_reprt_details_head');
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
		}
	
	var record =  nlapiSubmitRecord(o_b2cObj,true);
	nlapiLogExecution('Debug', 'record IS Created..', "record id " + record);
	
}

function findTransaction2(date,RecID,salesRep)
{
	
	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', " := Function call:- 1 ");
	
	var filters=new Array();
	var columns = new Array();
	var recrddID1=[];
 
	// filters[0] = new nlobjSearchFilter('internalid', null,'is',RecID);
	filters[0] = new nlobjSearchFilter('trandate', null,'on',date);
	filters[1] = new nlobjSearchFilter('salesrep',null,'is',salesRep);
	
	
	columns[0] = new nlobjSearchColumn("internalid",null,"SUM");
	columns[1] = new nlobjSearchColumn("trandate",null,"GROUP");
	columns[2] = new nlobjSearchColumn("weightedtotal",null,"SUM");
	columns[3] = new nlobjSearchColumn("currency",null,"GROUP");
	
	var searchResultItem = nlapiSearchRecord('opportunity', 'customsearch_weightedpipeline_current_yr', filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			
			var reqAmt = searchResultItem[j].getValue("weightedtotal",null,"SUM");
			
		
		}
	}
	
	return reqAmt;
}


function findTransaction3(date,RecID,salesRep)
{
	
	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', " := Function call 2:-  ");
	
	var filters=new Array();
	var columns = new Array();
	var recrddID1=[];
 
	filters[0] = new nlobjSearchFilter('internalid', null,'is',RecID);
	 filters[1] = new nlobjSearchFilter('trandate', null,'on',date);
	 filters[2] = new nlobjSearchFilter('salesrep',null,'is',salesRep);
		
	
	columns[0] = new nlobjSearchColumn("internalid",null,"SUM");
	columns[1] = new nlobjSearchColumn("trandate",null,"GROUP");
	columns[2] = new nlobjSearchColumn("weightedtotal",null,"SUM");
	columns[3] = new nlobjSearchColumn("currency",null,"GROUP");
	
	var searchResultItem = nlapiSearchRecord('opportunity', 'customsearchwon_opp_close_indays', filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			
			var reqAmt = searchResultItem[j].getValue("weightedtotal",null,"SUM");
			
		
		}
	}
	
	return reqAmt;
}


function findTransaction4(date,RecID,salesRep)
{
	
	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', " Function call:- 3 ");
	
	var filters=new Array();
	var columns = new Array();
	var recrddID1=[];
 
	// filters[0] = new nlobjSearchFilter('internalid', null,'is',RecID);
    filters[0] = new nlobjSearchFilter('trandate', null,'on',date);
    filters[1] = new nlobjSearchFilter('salesrep',null,'is',salesRep);
	
	
	columns[0] = new nlobjSearchColumn("internalid",null,"GROUP");
	columns[1] = new nlobjSearchColumn("trandate",null,"GROUP");
	columns[2] = new nlobjSearchColumn("foreignprojectedamount",null,"SUM");
	columns[3] = new nlobjSearchColumn("currency",null,"GROUP");
	
	var searchResultItem = nlapiSearchRecord('opportunity', 'customsearchfullpipeline_current_year', filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			
			var reqAmt = searchResultItem[j].getValue("foreignprojectedamount",null,"SUM");
			
		
		}
	}
	
	return reqAmt;
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
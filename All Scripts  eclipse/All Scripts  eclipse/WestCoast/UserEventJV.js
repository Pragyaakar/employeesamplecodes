
var CashSaleArr =[];
function userEventCashSaleAfterSubmit(type)
{
	if(type == 'create' || type == 'copy')
	{
		var internalId = nlapiGetRecordId();
		nlapiLogExecution('DEBUG','resultSet length','internalId while creation'+internalId);
		var recType = nlapiGetRecordType();
		var amount =new Array();
		var account =new Array();
		var activityDate ;
		var transactionDate;
		var subsidiary;
		var Class =new Array();
		var Channel =new Array();
		var amount_total=0.00;
		var obj =nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId());
		var count = obj.getLineItemCount('item');
	
		var searchId='customsearch_cash_sale';
		resultSet = findCashSaleDetails(searchId,internalId);
		if(resultSet!='' && resultSet!= null && resultSet !='undefined')
		{
			nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
			for(var i=0;i<resultSet.length;i++)//resultSet.length
			{
	          	var columns = resultSet[i].getAllColumns();
	          	
	          	var dateTran = resultSet[i].getValue(columns[0]);
	          	 nlapiLogExecution('DEBUG','transactionDate','transactionDate from search'+transactionDate);
	          	
	 		   transactionDate= nlapiStringToDate(dateTran);
	 		  nlapiLogExecution('DEBUG','transactionDate','transactionDate'+transactionDate);
	 		  
	          	var actDate = resultSet[i].getValue(columns[1]);
	 		   nlapiLogExecution('DEBUG','activityDate','activityDate from search'+activityDate);
	 		   
	 		  activityDate=nlapiStringToDate(activityDate);
	 		  nlapiLogExecution('DEBUG','activityDate','activityDate'+activityDate);
	 		  
	 	      
			   var acc= resultSet[i].getValue(columns[2]);
			   account.push(acc);
			   nlapiLogExecution('DEBUG','account','account'+account);
	 		   
				var amt= resultSet[i].getValue(columns[3]);
				amount.push(amt);
			   nlapiLogExecution('DEBUG','amount','amount'+amount);
			
			   
			 var subsidiary = resultSet[i].getValue(columns[4]);
			
			   nlapiLogExecution('DEBUG','subsidiary','subsidiary'+subsidiary);
			   
			   var cls = resultSet[i].getValue(columns[6]);
			   Class.push(cls);
			   nlapiLogExecution('DEBUG','subsidiary','Class'+Class);
			   
			   var saleChn = resultSet[i].getValue(columns[7]);
			   Channel.push(saleChn);
			   nlapiLogExecution('DEBUG','subsidiary','Channel'+Channel);
			   
			   var notSame = transactionDate.getTime() !== activityDate.getTime();
			   nlapiLogExecution('DEBUG','notSame','notSame'+notSame);
			   
			   amount_total = parseFloat(amount_total)+ parseFloat(amt);
			   
			   if(notSame == true)
				{
						   nlapiLogExecution('DEBUG','notSame','generateTransaction Function Called...');
						 var SubmitID =  generateTransaction(internalId,count,amount,account,transactionDate,activityDate,subsidiary,Class,Channel,amount_total);
						 CashSaleArr.push(SubmitID);
				}
			   // if(clientId != null && clientId !='')
			    {
			    	//generateTransaction(internalId,amount);
			    }
			    
			}
		}
		
		
		  
		  nlapiLogExecution('DEBUG','notSame','CashSaleArr...'+CashSaleArr);
		
		obj.setFieldValues('custbody_journal_entrie_no',CashSaleArr);
		nlapiSubmitRecord(obj,true);
	}//end of type create
	/*else if(type == 'edit')
	{
		var internalId = nlapiGetRecordId();
		var searchId='customsearch_cash_sale';
		resultSet = findCashSaleDetails(searchId,internalId);
		if(resultSet!='' && resultSet!= null && resultSet !='undefined')
		{
			nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
			for(var i=0;i<resultSet.length;i++)//resultSet.length
			{
	          	var columns = resultSet[i].getAllColumns();
	          	
	          	transactionDate = resultSet[i].getValue(columns[0]);
	          	nlapiLogExecution('DEBUG','transactionDate','transactionDate from search'+transactionDate);
	          	
	          	transactionDate = nlapiStringToDate(transactionDate);
	          	nlapiLogExecution('DEBUG','transactionDate','transactionDate'+transactionDate);
	 		  
	          	activityDate = resultSet[i].getValue(columns[1]);
	          	nlapiLogExecution('DEBUG','activityDate','activityDate from search'+activityDate);
	 		   
	          	activityDate = nlapiStringToDate(activityDate);
	          	nlapiLogExecution('DEBUG','activityDate','activityDate'+activityDate);
	 		   
				amount= resultSet[i].getValue(columns[3]);
				nlapiLogExecution('DEBUG','amount','amount'+amount);
			      
				account= resultSet[i].getValue(columns[2]);
				nlapiLogExecution('DEBUG','account','account'+account);
			   
			   // subsidiary = resultSet[i].getValue(columns[5]);
			    //nlapiLogExecution('DEBUG','subsidiary','subsidiary'+subsidiary);
			   
			    var notSame = transactionDate.getTime() !== activityDate.getTime();
			    nlapiLogExecution('DEBUG','notSame','notSame'+notSame);
			   
			   if(notSame == true)
			   {
				  UpdateTransaction(internalId,amount,transactionDate,activityDate,account);
			   }
	         }//end of for
		}
	}
	*/
}
function findCashSaleDetails(searchId,internalId)
{
	var resultSet = nlapiLoadSearch('transaction', searchId); 
	var filters=new Array();
	var columns = new Array();
	filters[0] = new nlobjSearchFilter('internalid',null,'anyof',internalId);
	//filters[1] = new nlobjSearchFilter('custrecord_year_frm_parnt_recrd',null,'is',Year.toString());
	resultSet.addFilters(filters);
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
function generateTransaction(internalId,count,amount,account,transactionDate,activityDate,subsidiary,Class,Channel,amount_total)
{
	var jeRec = nlapiCreateRecord('journalentry');
	jeRec.setFieldValue('trandate',nlapiDateToString(transactionDate));
	jeRec.setFieldValue('reversaldate',nlapiDateToString(activityDate));
	jeRec.setFieldValue('subsidiary',subsidiary);
	jeRec.setFieldValue('custbody_cash_sale',internalId);
	
	// debit line
	var total=0.00;

	for(var z=1;z<=count;z++)
	{
		total =parseFloat(total)+parseFloat(amount[z-1]);
		
		jeRec.selectNewLineItem('line');
		jeRec.setCurrentLineItemValue('line', 'account', account[z-1]);
		jeRec.setCurrentLineItemValue('line', 'debit', amount[z-1]);  //,
		jeRec.setCurrentLineItemValue('line', 'class', Class[z-1]); 
		jeRec.setCurrentLineItemValue('line', 'cseg_sales_channel', Channel[z-1]); 
		jeRec.commitLineItem('line');
	}
	

	// credit line
	jeRec.selectNewLineItem('line');
	jeRec.setCurrentLineItemValue('line', 'account', 1816);
	jeRec.setCurrentLineItemValue('line', 'credit', total);
	jeRec.setCurrentLineItemValue('line', 'class', Class[0]); 
	jeRec.setCurrentLineItemValue('line', 'cseg_sales_channel', Channel[0]); 
	jeRec.commitLineItem('line');
	

	var s=  nlapiSubmitRecord(jeRec,true);	
	 nlapiLogExecution('DEBUG','notSame','JV Created...');
	 return s ;
}

function UpdateTransaction(internalId,amount,transactionDate,activityDate,account)
{
	nlapiLogExecution('DEBUG', 'After Submit', "  internalId in functon==" + internalId);
	var filtersItem = new Array();
	var columnsItem = new Array();
	var ID;
	var lineCount;
	var flag = 0;
	filtersItem[0] = new nlobjSearchFilter('custbody_cash_sale', null, 'anyof', internalId);
	filtersItem[1] = new nlobjSearchFilter('reversaldate', null, 'isnotempty',null);
	columnsItem[0] = new nlobjSearchColumn('internalid');
	//columnsItem[1] = new nlobjSearchColumn('type');
	var searchResultItem = nlapiSearchRecord('journalentry', null, filtersItem, columnsItem);

	if (searchResultItem != null) 
    {
		for (var i = 0; searchResultItem != null && i < searchResultItem.length; i++)
        {
			ID = searchResultItem[i].getValue('internalid');
			nlapiLogExecution('DEBUG', 'After Submit', "  ID==" + ID);
			var accountNew='1816';
			if(ID != null)
			{
				var jvObj = nlapiLoadRecord('journalentry',ID)//, {recordmode: 'dynamic'}
				var itemCount = jvObj.getLineItemCount('line');
				nlapiLogExecution('DEBUG', 'After Submit', "  itemCount==" + itemCount);
				 //for (var i = 1; i <= itemCount ; i++)
				 {
					/*var accountinJV = jvObj.getLineItemValue('line',account,i);
						nlapiLogExecution('DEBUG', 'After Submit', "  account in Update==" + accountinJV);
						
						var amountinJVDR = jvObj.getLineItemValue('line','debit',i);
						nlapiLogExecution('DEBUG', 'After Submit', "  amountinJVDR in Update==" + amountinJVDR);
						
						var amountinJV = jvObj.getLineItemValue('line','credit',i);
						nlapiLogExecution('DEBUG', 'After Submit', "  amountinJV in Update==" + amountinJV);*/
						
						//nlapiLogExecution('DEBUG', 'After Submit', "  Value of I==" + i);
					 	jvObj.selectLineItem('line',1);
					 	jvObj.setCurrentLineItemValue('line','account',account);
						jvObj.setCurrentLineItemValue('line','debit',amount);
						jvObj.commitLineItem('line');
						jvObj.selectLineItem('line',2);
						jvObj.setCurrentLineItemValue('line','account',accountNew);
						jvObj.setCurrentLineItemValue('line','credit',amount);
						jvObj.commitLineItem('line');
				 }
				/*jvObj.selectLineItem('line',1); jvObj.commitLineItem('line');
				jvObj.setLineItemValue('line', 'account',1, account);
				jvObj.setLineItemValue('line', 'debit',1, amount);
				jvObj.selectLineItem('line',2);
				jvObj.setLineItemValue('line', 'account',2, 1816);
				jvObj.setLineItemValue('line', 'credit',2, amount);
				
				jvObj.selectLineItem('line', i);
					 jvObj.setCurrentLineItemValue('line','account', account);
					 jvObj.setCurrentLineItemValue('line','debit', amount);
					 jvObj.setCurrentLineItemValue('line','account',1816);
					 jvObj.setCurrentLineItemValue('line','credit',amount);
					 jvObj.commitLineItem('line');			
				*/
				nlapiSubmitRecord(jvObj);
			}
		}
		
     
	}
}
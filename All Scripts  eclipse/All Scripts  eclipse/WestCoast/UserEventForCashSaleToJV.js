/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       05 Apr 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function userEventCashSaleAfterSubmit(type)
{
	try
	{
		if(type =='create'||type=='copy')
		{
			
		
		var tranItem;
		//var count =1;
		var recordID = nlapiGetRecordId();
		// var searchId= 'customsearch_cash_sale';
		var iarec=nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId());
		var count = iarec.getLineItemCount('item');
		var type= nlapiGetRecordType();
		
		nlapiLogExecution('DEBUG','resultSet length','internalId while creation'+recordID);
		nlapiLogExecution('DEBUG','resultSet length','internalId while count'+count);
		
		var uniqArr =[];
		var amtArr =new Array();
		var accArr =new Array();
		var ActDate=new Array() ;
		var TranDate=new Array();
		var SubSi=new Array();
		var ClassArr =new Array();
		var ChannelArr =new Array();
		var amount_total=0.00;
	    var CashSaleArr=[]; 
	    var RunArr=[]; 

		//  var transItemSearch= findTransaction(recordID,searchId);
		//  nlapiLogExecution('DEBUG','resultSet length','internalId while transItemSearch'+transItemSearch);
	    var TransnDate =iarec.getFieldValue('trandate');
	    TransnDate= nlapiStringToDate(TransnDate);
	    var subsidiary =iarec.getFieldValue('subsidiary');
	    
	    nlapiLogExecution('DEBUG','resultSet length','TransnDate'+TransnDate);
	    nlapiLogExecution('DEBUG','resultSet length','subsidiary'+subsidiary);
	    
				for(var i=1;i<=count;i++)
			    {
					
					
					var activityDate =iarec.getLineItemValue('item','custcol_activity_date',i);
					  activityDate=nlapiStringToDate(activityDate);
					ActDate.push(activityDate);
					var account =iarec.getLineItemValue('item','account',i);
					accArr.push(account);
					var amount =iarec.getLineItemValue('item','amount',i);
					amtArr.push(amount);
					var Class =iarec.getLineItemValue('item','class',i);
					ClassArr.push(Class);
					var Channel =iarec.getLineItemValue('item','cseg_sales_channel',i);
					ChannelArr.push(Channel);
					
					var d = new Date(TransnDate);
					var d1 = new Date(activityDate);
					   var notSame = d.getTime() !== d1.getTime();
					   nlapiLogExecution('DEBUG','notSame','notSame'+notSame);
					   RunArr.push(notSame) ;
					 
					   if(notSame == true)
						{	
					      var ID = generateCashSaleToJV(TransnDate,activityDate,subsidiary,amount,account,Class,Channel,recordID,RunArr);
					      CashSaleArr.push(ID);
					      nlapiLogExecution('DEBUG','resultSet length','ID'+ID);
						} 
				    	
				    	   
				}
				

			    uniqArr = removeDuplicates(ActDate);
			    nlapiLogExecution('DEBUG','resultSet length','uniqArr'+uniqArr);
			    
			//    for( var q=0; q<uniqArr.length; q++)
			//    {
			    	
		//	    }
			  
			    iarec.setFieldValues('custbody_journal_entrie_no',CashSaleArr);

			    nlapiSubmitRecord(iarec,true);
		}
		
		
		
		if(type =='edit')
		{
			
			var internalId = nlapiGetRecordId();
			var searchId='customsearch_cash_sale';
			var updateArr =[];
			var tranDateArr = [];
			var actDateArr = [];
			var amtArr = [];
			var accArr = [];
			var notSameArr = [];
			var uniqArr = [];
			
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
		 		  
		          	tranDateArr.push(transactionDate);
		          	
		          	activityDate = resultSet[i].getValue(columns[1]);
		          	nlapiLogExecution('DEBUG','activityDate','activityDate from search'+activityDate);
		 		   
		          	activityDate = nlapiStringToDate(activityDate);
		          	nlapiLogExecution('DEBUG','activityDate','activityDate'+activityDate);
		          	
		          	actDateArr.push(activityDate);
		 		   
					amount= resultSet[i].getValue(columns[3]);
					nlapiLogExecution('DEBUG','amount','amount'+amount);
				    
					amtArr.push(amount);
					
					account= resultSet[i].getValue(columns[2]);
					nlapiLogExecution('DEBUG','account','account'+account);
					
				 	accArr.push(account);
				   
				   // subsidiary = resultSet[i].getValue(columns[5]);
				    //nlapiLogExecution('DEBUG','subsidiary','subsidiary'+subsidiary);
				   
				    var notSame = transactionDate.getTime() !== activityDate.getTime();
				    nlapiLogExecution('DEBUG','notSame','notSame'+notSame);
				   
				   if(notSame == true)
				   {
					  
					   notSameArr.push(true);  
					   //
				   }
		         }//end of for
			}
			 uniqArr = removeDuplicates(actDateArr);
			 
			 for (var p=0; p < uniqArr.length ;p++ )
			 {
				if(notSameArr[p] == true)
					{
					nlapiLogExecution('DEBUG','notSame','Inside the For loops If condition...');
					UpdateTransaction(internalId,amtArr[p],tranDateArr[p],uniqArr[p],accArr[p]);
					}
			 }
		}
		
		
		
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','ErrorLOG','Error'+e);	
	}
	
}
function removeDuplicates(arr){
    var unique_array = [];
    for(var i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array;
}

function generateCashSaleToJV(TransnDate,activityDate,subsidiary,amount,account,Class,Channel,recordID,RunArr)
{
	var total=0.00;
	//for(var h=1;h<=amtArr.length;h++)
	{
		
	  var jeRec = nlapiCreateRecord('journalentry');

		jeRec.setFieldValue('trandate',nlapiDateToString(TransnDate));
		jeRec.setFieldValue('reversaldate',nlapiDateToString(activityDate));
		jeRec.setFieldValue('subsidiary',subsidiary);
		jeRec.setFieldValue('custbody_cash_sale',recordID);

    	
 	     
 			    total =parseFloat(total)+parseFloat(amount);
 			
	 			jeRec.selectNewLineItem('line');
	 			// nlapiLogExecution('DEBUG','GenerateLog','accArr[z-1]'+accArr[z-1]);	
	 			
	 			jeRec.setCurrentLineItemValue('line', 'account', 1697);
	 			
	 		  //	nlapiLogExecution('DEBUG','GenerateLog','amtArr[z-1]'+amount);	
	 			jeRec.setCurrentLineItemValue('line', 'debit', amount);  //,
	 			
	 			//nlapiLogExecution('DEBUG','GenerateLog','ClassArr[z-1]'+Class);	
	 			jeRec.setCurrentLineItemValue('line', 'class', Class); 
	 			
	 		//	nlapiLogExecution('DEBUG','GenerateLog','ChannelArr[z-1]'+Channel);	
	 			jeRec.setCurrentLineItemValue('line', 'cseg_sales_channel',Channel); 
	 			jeRec.commitLineItem('line');
         
 		// credit line
		 		jeRec.selectNewLineItem('line');
		 		jeRec.setCurrentLineItemValue('line', 'account', 1816);
		 		nlapiLogExecution('DEBUG','GenerateLog','total'+total.toFixed(2));	
		 		jeRec.setCurrentLineItemValue('line', 'credit', total.toFixed(2));
		 		//nlapiLogExecution('DEBUG','GenerateLog','ClassArr[0]'+ClassArr[0]);	
		 		jeRec.setCurrentLineItemValue('line', 'class', Class); 
		 		//nlapiLogExecution('DEBUG','GenerateLog',' ChannelArr[0]'+ ChannelArr[0]);	
		 		jeRec.setCurrentLineItemValue('line', 'cseg_sales_channel', Channel); 
		 		jeRec.commitLineItem('line');
    	

 		var s=  nlapiSubmitRecord(jeRec,true);	
 		 nlapiLogExecution('DEBUG','notSame','JV Created...');
 		 return s ;
	}
	    
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

/*function findTransaction(recordID,searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	var filters=new Array();
	filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',recordID);

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
}*/

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
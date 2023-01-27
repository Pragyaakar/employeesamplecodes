var date = new Date();
function userEventIFtoJVAfterSubmit(type)
{
	if(type == 'create' || type == 'edit')
	{
		var internalId = nlapiGetRecordId();
		var recType = nlapiGetRecordType();
		var createdFrom = nlapiLookupField('itemfulfillment',internalId,'createdfrom');
		var amount;
		var account;
		var activityDate;
		var transactionDate;
		var subsidiary;
		var amount_total=0.00;
		
		var searchId='customsearch_if_jv_create_search';
		resultSet = findIFDetails(searchId,internalId);
		if(resultSet!='' && resultSet!= null && resultSet !='undefined')
		{
			nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
			for(var i=0;i<resultSet.length;i++)//resultSet.length
			{
	          	var columns = resultSet[i].getAllColumns();
	          	
	          	/*transactionDate = resultSet[i].getValue(columns[0]);
	          	 nlapiLogExecution('DEBUG','transactionDate','transactionDate from search'+transactionDate);
	          	
	 		   transactionDate = nlapiStringToDate(transactionDate);
	 		  nlapiLogExecution('DEBUG','transactionDate','transactionDate'+transactionDate);
	 		  
	          	activityDate = resultSet[i].getValue(columns[1]);
	 		   nlapiLogExecution('DEBUG','activityDate','activityDate from search'+activityDate);
	 		   
	 		  activityDate = nlapiStringToDate(activityDate);
	 		  nlapiLogExecution('DEBUG','activityDate','activityDate'+activityDate);*/
	 		   
				amount= resultSet[i].getValue(columns[1]);
			   nlapiLogExecution('DEBUG','amount','amount'+amount);
			      
			  /* account= resultSet[i].getValue(columns[2]);
			   nlapiLogExecution('DEBUG','account','account'+account);
			   
			   subsidiary = resultSet[i].getValue(columns[5]);
			   nlapiLogExecution('DEBUG','subsidiary','subsidiary'+subsidiary);
			   
			   var notSame = transactionDate.getTime() !== activityDate.getTime();
			   nlapiLogExecution('DEBUG','notSame','notSame'+notSame);*/
			   
			  // if(notSame == true)
			   //{
				   generateTransaction(internalId,amount,date,createdFrom);
			   //}
			   // if(clientId != null && clientId !='')
			   // {
			    	//generateTransaction(internalId,amount);
			   // }
			    
			}
		}
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
	}*/
	
}
function findIFDetails(searchId,internalId)
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
function generateTransaction(internalId,amount,date,createdFrom)
{
	var jvArray = new Array();
	var jeRec = nlapiCreateRecord('journalentry');
	jeRec.setFieldValue('trandate',nlapiDateToString(date));
	//jeRec.setFieldValue('reversaldate',nlapiDateToString(activityDate));
	//jeRec.setFieldValue('subsidiary',subsidiary);
	jeRec.setFieldValue('custbody_if_num_on_je',internalId);
	// debit line

	jeRec.selectNewLineItem('line');
	jeRec.setCurrentLineItemValue('line', 'account', 58);
	jeRec.setCurrentLineItemValue('line', 'debit', amount);
	jeRec.commitLineItem('line');

	// credit line
	jeRec.selectNewLineItem('line');
	jeRec.setCurrentLineItemValue('line', 'account', 116);
	jeRec.setCurrentLineItemValue('line', 'credit', amount);
	jeRec.commitLineItem('line');

	var ID = nlapiSubmitRecord(jeRec);	
	if(ID!= null && ID != '' && ID != undefined)
	{
		//nlapiSubmitField('itemfulfillment',internalId,'custbody_journal_no',ID);
		var IFObj = nlapiLoadRecord('itemfulfillment',internalId);
		jvArray[0]=ID
		IFObj.setFieldValues('custbody_journal_no',jvArray[0]);
		
		var oldVal = record.getFieldValues('custbody_journal_no')
		//Getting the existing value of the MultiSelect Field "custitem4" is the name of my multi Value field

		var addValue = [ID]
		// defining the new value that want to add on the field you can still change it
		addValue.push(oldVal)
		// pushing the old added value to the value of the multi Select field

		var Converted = addValue.map(Number);
		// Convert the whole array to number type

		var unique = [new Set(Converted)];
		// Remove the duplicate entry in the array

		const newArray = unique.filter(function (value) {
		    return !Number.isNaN(value);
		});
		// Removing a NaN value in the array if there is so we wont get an Error if we are going to set value on the field.

		IFObj.setFieldValues('custbody_journal_no',newArray)	
		
		
		nlapiSubmitRecord(IFObj,false,false);
	}
	if(createdFrom!= null && createdFrom != '' && createdFrom != undefined)
	{
		jvArray[0]=ID
		var soObj = nlapiLoadRecord('salesorder',createdFrom);
		soObj.setFieldValues('custbody_journal_no',jvArray[0]);
		//approverRecord.setFieldValues
		nlapiSubmitRecord(soObj,false,false);
	}
}
/*function UpdateTransaction(internalId,amount,transactionDate,activityDate,account)
{
	var filtersItem = new Array();
	var columnsItem = new Array();
	var ID;
	var lineCount;
	var flag = 0;
	filtersItem[0] = new nlobjSearchFilter('custbody_cash_sale', null, 'anyof', internalId);
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
					var accountinJV = jvObj.getLineItemValue('line',account,i);
						nlapiLogExecution('DEBUG', 'After Submit', "  account in Update==" + accountinJV);
						
						var amountinJVDR = jvObj.getLineItemValue('line','debit',i);
						nlapiLogExecution('DEBUG', 'After Submit', "  amountinJVDR in Update==" + amountinJVDR);
						
						var amountinJV = jvObj.getLineItemValue('line','credit',i);
						nlapiLogExecution('DEBUG', 'After Submit', "  amountinJV in Update==" + amountinJV);
						
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
				jvObj.selectLineItem('line',1); jvObj.commitLineItem('line');
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
				
				nlapiSubmitRecord(jvObj);
			}
		}
		
     
	}
}*/
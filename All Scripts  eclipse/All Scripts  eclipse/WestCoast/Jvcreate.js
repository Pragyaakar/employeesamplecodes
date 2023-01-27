
function userEventCashSaleAfterSubmit(type)
{
	try
	{
		if(type == 'edit')
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
			var obj =nlapiLoadRecord('cashsale',nlapiGetRecordId());
			var count = obj.getLineItemCount('item');
		    var jsonArray1 =[];
			var searchId='customsearch_cash_sale';
			//resultSet = findCashSaleDetails(searchId,internalId);
            transItemSearch = findTransaction1(searchId,internalId);
            if(transItemSearch)
			{
			
			   
				nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch1 length  ==" + transItemSearch.length);
				
				for(var i=0;i<transItemSearch.length;i++)
				{
					var jsonObj = {
											'date':transItemSearch[i].getValue('trandate'),
											'act_date':transItemSearch[i].getValue('custcol_activity_date'),
											'account':transItemSearch[i].getValue('account'), 
											'amt':transItemSearch[i].getValue('fxamount'), 
											'subsi':transItemSearch[i].getValue('subsidiary'), 
											'tranid':transItemSearch[i].getValue('tranid'),
											'class1':transItemSearch[i].getValue("class"),
										//	'channel':transItemSearch[i].getValue("line.cseg_sales_channel")
											
								   };
						jsonArray1.push(jsonObj);
						
			 	}
				
				var tranArr =[];
				var actDateArr =[];
				var AccArr =[];
				var amtArr =[];
				var subsiArr= [];
				var docArr=[];
				var clsArr =[];
				var channelArr =[];
				
				 for(var l=0;l<jsonArray1.length;l++)
					{
					  tranArr.push(jsonArray1[l].date);
					  actDateArr.push(jsonArray1[l].act_date);
					  AccArr.push(jsonArray1[l].account);
					  amtArr.push(jsonArray1[l].amt);
					  subsiArr.push(jsonArray1[l].subsi);
					  docArr.push(jsonArray1[l].tranid);
					  clsArr.push(jsonArray1[l].class1);
					  channelArr.push('Online');
					 
						nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].date ==" + jsonArray1[l].date);
						nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].act_date  ==" + jsonArray1[l].act_date);
						nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].account  ==" +  jsonArray1[l].account);
						nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].amt  ==" +jsonArray1[l].amt);
						nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].subsi  ==" +jsonArray1[l].subsi);
						nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].tranid  ==" +jsonArray1[l].tranid);
						nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].class1  ==" +jsonArray1[l].class1);
					}
				 var FinTot = 0;
				 var FinTotArr = [];
				 for(var k=0;k<actDateArr.length;k++)
				 {
					 for(var s=0; s<amtArr.length; s++)
					 {
						 if(actDateArr[k] == actDateArr[s])
						 {
							 FinTot = parseFloat(amtArr[k])+parseFloat(amtArr[s]);
							
							    transactionDate = nlapiStringToDate( tranArr[s]);
					          					 		
					           activityDate = nlapiStringToDate(actDateArr[s]);
								 if(activityDate > transactionDate)
								 {
									var id = generateCashSaleToJV(transactionDate,activityDate,subsiArr[s],FinTot,AccArr[s],clsArr[s],channelArr[s],internalId)
									 CashSaleArr.push(id);
								 }
						 }
						 else
							 {
							      transactionDate = nlapiStringToDate( tranArr[s]);
    					 		
					            	activityDate = nlapiStringToDate(actDateArr[s]);
								 if(activityDate > transactionDate)
								 {
									 var id = generateCashSaleToJV(transactionDate,activityDate,subsiArr[s],amtArr[s],AccArr[s],clsArr[s],channelArr[s],internalId)
									 CashSaleArr.push(id);
								 }
							 }
					 }
				 }		
					
			}
            obj.setFieldValues('custbody_journal_entrie_no',CashSaleArr);

		    nlapiSubmitRecord(obj,true);
		}
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','ErrorLOG','Error'+e);	
	}
}



   function findTransaction1(searchId,internalId)
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

   function generateCashSaleToJV(TransnDate,activityDate,subsidiary,amount,account,Class,Channel,recordID)
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
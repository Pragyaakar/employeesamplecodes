/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Mar 2020     Tushar More
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


function ues_beforeSubmitDeleteIF(type)
{
	try{
		  
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
		if(type =='delete')
		{
			 nlapiLogExecution('DEBUG','ues_beforeSubmitDelete','Inside Delete ==');
			 
           var JEVal = nlapiGetFieldValue('custbody_journal_entry_number');
			
			var jeRec = nlapiDeleteRecord('journalentry',JEVal);
			
			
		}
	}
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","ues_beforeSubmitDelete","ERROR =="+e );
	  }
  return true;
	
}


function ues_JV_creationFromIF(type)
{
	try{
		  
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
		var iarec=nlapiLoadRecord(recordType,recordId);
		
		var searchId='customsearch_jv_for_if_trans_order';
		var recType = null;
		var  filters = [];
		filters[0] = new nlobjSearchFilter ('internalid', null, 'anyof',recordId);
		
		resultSet = getSavedSearchResult(recType, searchId, filters);
		
		if(resultSet!='' && resultSet!= null && resultSet !='undefined')
		{
			nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	 
			
			var itemArr = [];
			var qtyArr =[];
			var AmtArr =[];
			var amountCreditArr =[];
			var amountDebitArr =[];
			var AccCreditArr =[];
			var AccDebitArr =[];
			
			var totDebitAmt =0.00;
			var totCreditAmt =0.00;
			
			for(var i=0;i<resultSet.length;i++)//resultSet.length
			{
	          	var columns = resultSet[i].getAllColumns();
	          	
	          	var intID = resultSet[i].getValue(columns[0]);
	          //	 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','intID =='+intID);
	          	
	         	var date = resultSet[i].getValue(columns[1]);
	          	
	          	var docNo = resultSet[i].getValue(columns[2]);
	 		 //  nlapiLogExecution('DEBUG','ues_JV_creationFromIR','docNo =='+docNo);
	 		   
	 			
	          	var Type = resultSet[i].getValue(columns[3]);
	         // 	 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','type =='+type);
	          	
	          	var subsidiary = resultSet[i].getValue(columns[4]);
	 		 //  nlapiLogExecution('DEBUG','ues_JV_creationFromIR','subsidiary =='+subsidiary);
	 		   
	 			
	          	var location = resultSet[i].getValue(columns[5]);
	          //	 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','location =='+location);
	          	
	          	var currency = resultSet[i].getValue(columns[6]);
	 		 //  nlapiLogExecution('DEBUG','ues_JV_creationFromIR','currency =='+currency);
	 		   
	          	 var Account = resultSet[i].getValue(columns[7]);
	          	 
		        var amountCredit = resultSet[i].getValue(columns[8]);
		 		// nlapiLogExecution('DEBUG','ues_JV_creationFromIR','amountCredit =='+amountCredit);
		 		//amountCreditArr.push(amountCredit); 
		 		
		 		var amountDebit = resultSet[i].getValue(columns[9]);
		 		//nlapiLogExecution('DEBUG','ues_JV_creationFromIR','amountDebit =='+amountDebit);
		 		//amountDebitArr.push(amountDebit); 
		 		  
		 		
				
		 		 
				 
		 		if(amountCredit !=null && amountCredit != undefined && amountCredit != '')
		 		{
		 			AccDebitArr.push(Account); 
		 			amountDebitArr.push(amountCredit); 
		 		}
		 		
		 		if(amountDebit !=null && amountDebit != undefined && amountDebit != '')
		 		{
		 			AccCreditArr.push(Account);
		 			amountCreditArr.push(amountDebit);
		 		}
		 		
		 		 		  
	          	
			}
			
			 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','intID =='+intID);
	 		 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','subsidiary =='+subsidiary);
			 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','currency =='+currency);
	 		 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','docNo =='+docNo);
			 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','date =='+date);
			 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','AccDebitArr ='+AccDebitArr);
			 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','AccCreditArr =='+AccCreditArr);
			 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','amountDebitArr ='+amountDebitArr);
			 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','amountCreditArr =='+amountCreditArr);
				
			 
			if(type =='create')
			{
				 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','Inside Create ==');
				 
				var JvRecord =CreateJVforTheIF(intID,docNo,Type,subsidiary,currency,date,AccDebitArr,amountDebitArr,AccCreditArr,amountCreditArr,location);
		 		
				nlapiSubmitField(recordType,recordId,'custbody_journal_entry_number',JvRecord);
				
			}
			
			if(type =='edit')
			{
				 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','Inside edit ==');
				var JEVal = iarec.getFieldValue('custbody_journal_entry_number');
				
				var jeRec = nlapiLoadRecord('journalentry',JEVal, {recordmode: 'dynamic'});
		
				 jeRec.setFieldValue('custbody_ir_num_on_je',intID);
				
				// debit line
				 
				 var s= jeRec.getLineItemCount('line');
				 for(var h=s;h>=1;h--)
					{
					  jeRec.removeLineItem('line',h);
					}
			
					if(AccDebitArr)
					{
						for (var a=1;a<=AccDebitArr.length;a++)
						{
							jeRec.selectNewLineItem('line');
							 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','Inside edit Debit Line=='+a);
							 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','amountDebitArr[a-1]=='+amountDebitArr[a-1]);
							jeRec.setCurrentLineItemValue('line', 'account',AccDebitArr[a-1]);
							jeRec.setCurrentLineItemValue('line', 'debit', amountDebitArr[a-1]);
							jeRec.setCurrentLineItemValue('line', 'location', location);
							jeRec.commitLineItem('line');

						}
					}
					
					if(AccCreditArr)
					{
						for (var a1=1;a1<=AccCreditArr.length;a1++)
						{
							 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','Inside edit Credit Line=='+a1);
							 nlapiLogExecution('DEBUG','ues_JV_creationFromIR','amountCreditArr[a1-1]=='+amountCreditArr[a1-1]);
							jeRec.selectNewLineItem('line');
							jeRec.setCurrentLineItemValue('line', 'account',AccCreditArr[a1-1]);
							jeRec.setCurrentLineItemValue('line', 'credit', amountCreditArr[a1-1]);
							jeRec.setCurrentLineItemValue('line', 'location', location);
							jeRec.commitLineItem('line');

						}
					}

				var ID = nlapiSubmitRecord(jeRec);	
			}
		
			
			
		}
	

	  }
	
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
	
}


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


function CreateJVforTheIF(intID,docNo,Type,subsidiary,currency,date,AccDebitArr,amountDebitArr,AccCreditArr,amountCreditArr,location)
{
	var jeRec = nlapiCreateRecord('journalentry');
	jeRec.setFieldValue('trandate',new Date(date));//nlapiDateToString
	//jeRec.setFieldValue('reversaldate',nlapiDateToString(activityDate));
	jeRec.setFieldValue('subsidiary',subsidiary);
	jeRec.setFieldValue('currency',currency);
	jeRec.setFieldValue('custbody_if_num_on_je',intID);
	// debit line

	if(AccDebitArr)
	{
		for (var a=0;a<AccDebitArr.length;a++)
		{
			jeRec.selectNewLineItem('line');
			jeRec.setCurrentLineItemValue('line', 'account',AccDebitArr[a]);
			jeRec.setCurrentLineItemValue('line', 'debit', amountDebitArr[a]);
			jeRec.setCurrentLineItemValue('line', 'location', location);
			jeRec.commitLineItem('line');

		}
	}
	
	if(AccCreditArr)
	{
		for (var a1=0;a1<AccCreditArr.length;a1++)
		{
			jeRec.selectNewLineItem('line');
			jeRec.setCurrentLineItemValue('line', 'account',AccCreditArr[a1]);
			jeRec.setCurrentLineItemValue('line', 'credit', amountCreditArr[a1]);
			jeRec.setCurrentLineItemValue('line', 'location', location);
			jeRec.commitLineItem('line');

		}
	}
	
	var ID = nlapiSubmitRecord(jeRec);	
	
	return ID;
}
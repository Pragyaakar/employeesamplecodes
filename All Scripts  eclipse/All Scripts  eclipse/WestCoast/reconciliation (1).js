
function reconciliation()
{
    var amount=0;
    var balance;
    var searchresult;
    var Id;
    var record;
    var test;
    var recordamount;
    var countLineitem;
    try{
        var customrecord_agent_reconciliationSearch = nlapiSearchRecord("customrecord_agent_reconciliation",null,
        [
           ["custrecord_reconciled","is","F"]
        ], 
        [
           new nlobjSearchColumn("custrecord_agent"), 
           new nlobjSearchColumn("custrecord_date"), 
           new nlobjSearchColumn("custrecord_amount"), 
           new nlobjSearchColumn("custrecord_transaction_amt"), 
           new nlobjSearchColumn("custrecord_balance"), 
           new nlobjSearchColumn("custrecord_reconciled")
        ]
        );
        nlapiLogExecution('Error','customrecord_agent_reconciliationSearch',customrecord_agent_reconciliationSearch.length);
        if(customrecord_agent_reconciliationSearch.length >0)
	{
        for ( var k = 0; customrecord_agent_reconciliationSearch != null && k < customrecord_agent_reconciliationSearch.length; k++ )
        {
             searchresult = customrecord_agent_reconciliationSearch[ k ];
             Id=searchresult.getId();
             record=searchresult.getRecordType();
             test=nlapiLoadRecord(record,Id);
             
             var agent= customrecord_agent_reconciliationSearch[ k ].getValue('custrecord_agent');
             var agent_date= customrecord_agent_reconciliationSearch[ k ].getValue('custrecord_date');
             var agent_amt = customrecord_agent_reconciliationSearch[ k ].getValue('custrecord_amount');
             
             nlapiLogExecution('debug','checked','AgentName:'+agent);
             nlapiLogExecution('debug','checked','AgentDate:'+agent_date);
             nlapiLogExecution('debug','checked','AgentAmount:'+agent_amt);
             
             
         nlapiLogExecution('debug','checked',test.getFieldValue('custrecord_reconciled'));
     
          recordamount=test.getFieldValue('custrecord_amount');
         nlapiLogExecution('debug','recordamount',recordamount);
     
 
      countLineitem=test.getLineItemCount('recmachcustrecord_agent_name');
 
     for(var i=1;i<=countLineitem;i++)
     {
        amount=amount+parseInt(test.getLineItemValue('recmachcustrecord_agent_name','custrecord_transaction_amount',i));
     }
         nlapiLogExecution('debug','amountafter',amount);
         balance=recordamount-amount;
         nlapiLogExecution('debug','balance',balance);
  
		 var results = GetSearchResults(agent,agent_date); 
		 nlapiLogExecution('debug','recordamount','results.length='+results.length);
    
		 var total =0;
		 var Bal =0;
      for (var j = 1; j <= results.length; j++) 
		{ 
    	      test.selectNewLineItem('recmachcustrecord_agent_name');
			 test.setCurrentLineItemValue('recmachcustrecord_agent_name','custrecord_transaction',results[j-1].getValue('internalid'));
			 nlapiLogExecution('debug','recordamount','TranID='+results[j-1].getValue('tranid'));
			 test.setCurrentLineItemValue('recmachcustrecord_agent_name','custrecord_transaction_amount',results[j-1].getValue('amount'));
			 nlapiLogExecution('debug','recordamount','Amount='+results[j-1].getValue('amount'));
			 test.setCurrentLineItemValue('recmachcustrecord_agent_name','custrecord_transaction_date',results[j-1].getValue('trandate'));
			 nlapiLogExecution('debug','recordamount','Date='+results[j-1].getValue('trandate'));
			 test.commitLineItem('recmachcustrecord_agent_name');
				
			 total = parseFloat(total)+parseFloat(results[j-1].getValue('amount'));
			 
		}  
      var Bal =parseFloat(recordamount) - parseFloat(total);
      
      test.setFieldValue('custrecord_balance', Bal);
      test.setFieldValue('custrecord_transaction_amt', total);
      test.setFieldValue('custrecord_reconciled', 'T');
      
      nlapiSubmitRecord(test, true, true);
    }
    
  }
    }

    catch(e)
    {
        nlapiLogExecution('debug','reconciliation',e);

    }
}


function GetSearchResults(agent,agent_date) {
	     var columns = new Array();
         columns[0] =  new nlobjSearchColumn("internalid"); 
		 columns[1] =  new nlobjSearchColumn("amount"); 
		 columns[2] =  new nlobjSearchColumn("tranid");
		 columns[3] =  new nlobjSearchColumn("trandate");
				 
		var filters = new Array();
		 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',agent);
		 filters[1] = new nlobjSearchFilter ('trandate', null, 'on', agent_date);
		 filters[2] = new nlobjSearchFilter ('mainline', null, 'is', 'T');
	var results = nlapiSearchRecord('transaction', null, filters, columns);
	return results;
}

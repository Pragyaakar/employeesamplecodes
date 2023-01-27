var SetFlag = true;
function validatePOLineItem(type)
{
	if(type == 'line')
	{
		var location;
		var Acc;
	    var DebitAmt;
	    var CreditAmt;
	    var TranCurr;
	    
	    TranCurr = nlapiGetFieldValue('currency');
	    alert('TranCurr is'+TranCurr);
	    
	    var subsidiary = nlapiGetFieldValue('subsidiary');
		alert('subsidiary is'+subsidiary);
	    
		var subsiCurrency = nlapiLookupField('subsidiary',subsidiary,'currency');
		alert('subsiCurrency is'+subsiCurrency);
		
	    var exchangeRate = nlapiGetFieldValue('exchangerate');
		alert('exchangeRate is'+exchangeRate);
	    
	    DebitAmt = nlapiGetCurrentLineItemValue('line','debit');
		//  alert('DebitAmt is'+DebitAmt);

	    CreditAmt = nlapiGetCurrentLineItemValue('line','credit');
		// alert('CreditAmt is'+CreditAmt);
		 
	    Acc = nlapiGetCurrentLineItemValue('line','account');
		alert('Acc is'+Acc);
	    
	    var type = nlapiLookupField('account',Acc,'type');
		
	    if(type == 'Bank')
	    {
	    	var currAmtField = nlapiGetCurrentLineItemValue('line','custcol_currency_amt');
	    	/*alert('type selected is'+type);
			
	    	var accountSearch = nlapiSearchRecord("transaction","customsearch_bnkbalance",
	    	[
	    		["account","anyof",Acc]
	    	], 
	    	[
	    		 new nlobjSearchColumn("account",null,"GROUP").setSort(false), 
	    		 new nlobjSearchColumn("currency",null,"GROUP"), 
	    		 new nlobjSearchColumn("amount",null,"SUM"), 
	    		 new nlobjSearchColumn("fxamount",null,"SUM"), 
	    		 new nlobjSearchColumn("subsidiary",null,"GROUP"),
	    		 new nlobjSearchColumn("currency","subsidiary","GROUP")
	    	]
	    	);
	    	alert('accountSearch is'+accountSearch);
	    	if(accountSearch != null && accountSearch != '')
	    	{
	    		alert('accountSearch.length is'+accountSearch.length);
	    		
	    		for(var i = 0;  i < accountSearch.length ; i++) 
	    		{
	    			var Currency = accountSearch[i].getValue("currency",null,"GROUP");
	    			var BalInUSD = accountSearch[i].getValue("amount",null,"SUM");
	    	        var BalInForeign = accountSearch[i].getValue("fxamount",null,"SUM");
	    	        var subsi = accountSearch[i].getValue("subsidiary",null,"GROUP");
	    	        var subsiCurrency = accountSearch[i].getValue("currency","subsidiary","GROUP");
	    		} 
	    		
	    		alert('Currency is'+Currency)
	    		alert('BalInUSD is'+BalInUSD)
	    		alert('BalInForeign is'+BalInForeign)
	    		alert('subsi is'+subsi)
	    		alert('subsiCurrency is'+subsiCurrency)
	    		
	    		if(parseFloat(exchangeRate) < 1)
	    		{
	    			var convAmt = parseFloat(BalInForeign)/parseFloat(exchangeRate);
	    			alert('convAmt if Euro'+convAmt)
	    		}
	    		else
	    		{
	    			var convAmt = parseFloat(BalInForeign)*parseFloat(exchangeRate);
	    			alert('convAmt if not Euro'+convAmt)
	    		}
	    		
	    		*/
	    		
	    		alert('CreditAmt is'+CreditAmt);
	    		
	    		if(parseFloat(CreditAmt) > parseFloat(currAmtField))
		        {
		        	alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
		        	SetFlag= false;
		        }
	            else
	            {
	              SetFlag= true;
	            }
	    	//}
	    }
	}
	 return SetFlag;
}



function accountCurrencyAmount(type,name,linenum)
{
	alert('type='+type)
	alert('name='+name)
	
	if(type == 'line' && name == 'account')
	{
		var location;
		var Acc;
	    var DebitAmt;
	    var CreditAmt;
	    var TranCurr;
	    
	    TranCurr = nlapiGetFieldValue('currency');
	    alert('TranCurr is'+TranCurr);
	    
	    var subsidiary = nlapiGetFieldValue('subsidiary');
		alert('subsidiary is'+subsidiary);
	    
		var subsiCurrency = nlapiLookupField('subsidiary',subsidiary,'currency');
		alert('subsiCurrency is'+subsiCurrency);
		
	    var exchangeRate = nlapiGetFieldValue('exchangerate');
		alert('exchangeRate is'+exchangeRate);
	    
	    DebitAmt = nlapiGetCurrentLineItemValue('line','debit');
		//  alert('DebitAmt is'+DebitAmt);

	    CreditAmt = nlapiGetCurrentLineItemValue('line','credit');
		// alert('CreditAmt is'+CreditAmt);
		 
	    Acc = nlapiGetCurrentLineItemValue('line','account');
		alert('Acc is'+Acc);
	    
	    var type = nlapiLookupField('account',Acc,'type');
		
	    if(type == 'Bank')
	    {
	    	alert('type selected is'+type);
			
	    	var accountSearch = nlapiSearchRecord("transaction","customsearch_bnkbalance",
	    	[
	    		["account","anyof",Acc]
	    	], 
	    	[
	    		 new nlobjSearchColumn("account",null,"GROUP").setSort(false), 
	    		 new nlobjSearchColumn("currency",null,"GROUP"), 
	    		 new nlobjSearchColumn("amount",null,"SUM"), 
	    		 new nlobjSearchColumn("fxamount",null,"SUM"), 
	    		 new nlobjSearchColumn("subsidiary",null,"GROUP"),
	    		 new nlobjSearchColumn("currency","subsidiary","GROUP")
	    	]
	    	);
	    	alert('accountSearch is'+accountSearch);
	    	if(accountSearch != null && accountSearch != '')
	    	{
	    		alert('accountSearch.length is'+accountSearch.length);
	    		
	    		for(var i = 0;  i < accountSearch.length ; i++) 
	    		{
	    			var Currency = accountSearch[i].getValue("currency",null,"GROUP");
	    			var BalInUSD = accountSearch[i].getValue("amount",null,"SUM");
	    	        var BalInForeign = accountSearch[i].getValue("fxamount",null,"SUM");
	    	        var subsi = accountSearch[i].getValue("subsidiary",null,"GROUP");
	    	        var subsiCurrency = accountSearch[i].getValue("currency","subsidiary","GROUP");
	    		} 
	    		
	    		alert('Currency is'+Currency)
	    		alert('BalInUSD is'+BalInUSD)
	    		alert('BalInForeign is'+BalInForeign)
	    		alert('subsi is'+subsi)
	    		alert('subsiCurrency is'+subsiCurrency)
	    		
	    		if(parseFloat(exchangeRate) < 1)
	    		{
	    			var convAmt = parseFloat(BalInForeign)/parseFloat(exchangeRate);
	    			alert('convAmt if Euro'+convAmt)
	    		}
	    		else
	    		{
	    			var convAmt = parseFloat(BalInForeign)*parseFloat(exchangeRate);
	    			alert('convAmt if not Euro'+convAmt)
	    		}
	    		
	    		if(convAmt !=null && convAmt !=undefined && convAmt !='')
	    		{
	    			nlapiSetCurrentLineValue('line','custcol_currency_amt',convAmt);
	    		}
	    		
	    	}
	    }
	}
	 
}
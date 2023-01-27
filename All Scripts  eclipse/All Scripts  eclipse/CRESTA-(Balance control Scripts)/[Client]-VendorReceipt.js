/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Jan 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
var SetFlag = true;
var Available = true;

function clientCashAndBillControl(type, name, linenum)
{
	
	 if(name == 'account') 
     {

		 var location;
		 
		 var Acc;
	     var Bal;
	     var Amt;

		Acc = nlapiGetFieldValue('account');
		// alert('Acc is'+Acc);
		Bal = nlapiGetFieldValue('balance');
	    // alert('Bal is'+Bal);
		Amt = nlapiGetFieldValue('total');
		//  alert('Amt is'+Amt);
	   TranCurr = nlapiGetFieldValue('currency');
		  
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
		
		        if(accountSearch !=null && accountSearch != '')
				  {
					
		    			for (var i = 0;  i < accountSearch.length ; i++) 
		    			{
		    				var Currency = accountSearch[i].getValue("currency",null,"GROUP");
		    				var BalInUSD = accountSearch[i].getValue("amount",null,"SUM");
                            var BalInForeign = accountSearch[i].getValue("fxamount",null,"SUM");
		                    
		    			}
		    				
		    			if(TranCurr == '1')
				         {
				    		if(Amt > 0 && BalInUSD !=null)
				    		{
				    			var remain = parseFloat(BalInUSD)-parseFloat(Amt);
				                   
				    		}
		    				
				         }
		    			else if(TranCurr != '1')
		    			{
		    				if(Amt > 0 && BalInForeign !=null)
		    				{
		    					var remain = parseFloat(BalInForeign)-parseFloat(Amt);
					               
		    				}
		    				    
		    			}	
		    			
		    			alert('remain in credit'+remain)
		    			
		    			   if(remain >= 0)
		 		          {
		 		        	  SetFlag= true;
		 		          }  
		 		          else
		 		          {
		 		        	//  alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
		 		        	  SetFlag= false;
		 		          }
			      }
		        else
		        {
		        	  SetFlag= true;
		        }
		}
	
}



function clientSaveRecord()
{
	 var location;
	 

	 var Acc;
     var Bal;
     var Amt;
     
     if(SetFlag == false)
	 {  
    	 Acc = nlapiGetFieldValue('account');
    	//	alert('Acc is'+Acc);
    		Bal = nlapiGetFieldValue('balance');
    	 //   alert('Bal is'+Bal);
    		Amt = nlapiGetFieldValue('total');
    		//  alert('Amt is'+Amt);
    		  TranCurr = nlapiGetFieldValue('currency');
    		  
    		  
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
    		
    		        if(accountSearch !=null && accountSearch != '')
    				  {
    					
    		    			for (var i = 0;  i < accountSearch.length ; i++) 
    		    			{
    		    				var Currency = accountSearch[i].getValue("currency",null,"GROUP");
    		    				var BalInUSD = accountSearch[i].getValue("amount",null,"SUM");
                                var BalInForeign = accountSearch[i].getValue("fxamount",null,"SUM");
    		                    
    		    			}
    		    				
    		    			if(TranCurr == '1')
    				         {
    				    		if(Amt > 0 && BalInUSD !=null)
    				    		{
    				    			var remain = parseFloat(BalInUSD)-parseFloat(Amt);
    				                   
    				    		}
    		    				
    				         }
    		    			else if(TranCurr != '1')
    		    			{
    		    				if(Amt > 0 && BalInForeign !=null)
    		    				{
    		    					var remain = parseFloat(BalInForeign)-parseFloat(Amt);
    					               
    		    				}
    		    				    
    		    			}	
    		    			
    		    			alert('remain in credit'+remain)
    		    			
    		    			   if(remain >= 0)
    		 		          {
    		 		        	 // SetFlag= true;
    		 		        	 Available= true;
    		 		          }  
    		 		          else
    		 		          {
    		 		        	  alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
    		 		        	 // SetFlag= false;
    		 		        	  Available= false;
    		 		          }
    			      }
    		        else
    		        {
    		        	Available= true;
    		        }
    		        
    		        
    		    
  
	 }
	 else
	 {
		 Acc = nlapiGetFieldValue('account');
	    	//	alert('Acc is'+Acc);
	    		Bal = nlapiGetFieldValue('balance');
	    	 //   alert('Bal is'+Bal);
	    		Amt = nlapiGetFieldValue('total');
	    		//  alert('Amt is'+Amt);
	    		  
	    		  TranCurr = nlapiGetFieldValue('currency');
	    		  
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
	    		
	    		        if(accountSearch !=null && accountSearch != '')
	    				  {
	    					
	    		    			for (var i = 0;  i < accountSearch.length ; i++) 
	    		    			{
	    		    				var Currency = accountSearch[i].getValue("currency",null,"GROUP");
	    		    				var BalInUSD = accountSearch[i].getValue("amount",null,"SUM");
	                                var BalInForeign = accountSearch[i].getValue("fxamount",null,"SUM");
	    		                    
	    		    			}
	    		    				
	    		    			if(TranCurr == '1')
	    				         {
	    				    		if(Amt > 0 && BalInUSD !=null)
	    				    		{
	    				    			var remain = parseFloat(BalInUSD)-parseFloat(Amt);
	    				                   
	    				    		}
	    		    				
	    				         }
	    		    			else if(TranCurr != '1')
	    		    			{
	    		    				if(Amt > 0 && BalInForeign !=null)
	    		    				{
	    		    					var remain = parseFloat(BalInForeign)-parseFloat(Amt);
	    					               
	    		    				}
	    		    				    
	    		    			}	
	    		    			
	    		    			alert('remain in credit'+remain)
	    		    			
	    		    			   if(remain >= 0)
	    		 		          {
	    		 		        	 // SetFlag= true;
	    		 		        	 Available= true;
	    		 		          }  
	    		 		          else
	    		 		          {
	    		 		        	  alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
	    		 		        	 // SetFlag= false;
	    		 		        	  Available= false;
	    		 		          }
	    			      }
	    		        else
	    		        {
	    		        	Available= true;
	    		        }
	 }

	
         	       
	return Available;		
}
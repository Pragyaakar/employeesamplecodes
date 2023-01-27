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

function clientCashAndBalanceJvControl(type, name, linenum)
{
	
//alert('type =='+type+'  name=='+name)
	 if(type=='create' && name == 'account') 
    {

		 var location;
		 
		 var Acc;
	     var DebitAmt;
	     var CreditAmt;
	     var TranCurr;
	     
	     TranCurr = nlapiGetFieldValue('currency');
	     
	     Acc = nlapiGetCurrentLineItemValue('line','account');
		// alert('Acc is'+Acc);
	     DebitAmt = nlapiGetCurrentLineItemValue('line','debit');
		//  alert('DebitAmt is'+DebitAmt);

	     CreditAmt = nlapiGetCurrentLineItemValue('line','credit');
		//  alert('CreditAmt is'+CreditAmt);
		 
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
				    		if(CreditAmt > 0 && BalInUSD !=null)
				    		{
				    			var remain = parseFloat(BalInUSD)-parseFloat(CreditAmt);
				                   
				    		}
		    				
				         }
		    			else if(TranCurr != '1')
		    			{
		    				if(CreditAmt > 0 && BalInForeign !=null)
		    				{
		    					var remain = parseFloat(BalInForeign)-parseFloat(CreditAmt);
					               
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

function validatePOLineItem(type){
	   if(type == 'line'){

			 var location;
			 
			 var Acc;
		     var DebitAmt;
		     var CreditAmt;
		     
		     var TranCurr;
		     
		     TranCurr = nlapiGetFieldValue('currency');
		     alert('TranCurr is'+TranCurr);
		     Acc = nlapiGetCurrentLineItemValue('line','account');
			// alert('Acc is'+Acc);
		     DebitAmt = nlapiGetCurrentLineItemValue('line','debit');
			//  alert('DebitAmt is'+DebitAmt);

		     CreditAmt = nlapiGetCurrentLineItemValue('line','credit');
			 alert('CreditAmt is'+CreditAmt);
			 
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
			    				
			    			alert('BalInUSD ='+BalInUSD)
			    			alert('BalInForeign ='+BalInForeign)
			    			
			    			if(TranCurr == '1')
					         {
					    		if(CreditAmt > 0 && BalInUSD !=null)
					    		{
					    			var remain = parseFloat(BalInUSD)-parseFloat(CreditAmt);
					                   
					    		}
			    				//alert('remain in credit'+remain)
					         }
			    			else if(TranCurr != '1')
			    			{
			    				if(CreditAmt > 0 && BalInForeign !=null)
			    				{
			    					var remain = parseFloat(BalInForeign)-parseFloat(CreditAmt);
						               
			    				}
			    				    
			    			}	
			    			
			    			alert('remain in credit'+remain)
			    			
			    			   if(remain >= 0)
			 		          {
			 		        	  SetFlag= true;
			 		          }  
			 		          else
			 		          {
			 		        	  alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
			 		        	  SetFlag= false;
			 		          }
				      }
			        else
			        {
			        	  SetFlag= true;
			        }
			    

			}
	   return SetFlag;
	}



function clientSaveRecord()
{
	
     
     if(SetFlag == false)
	 {
    	 Available =false;
    	 alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
   	  
	 }
	 else
	 {
		 Available =true; 
	 }

	
         	       
	return Available;		
}
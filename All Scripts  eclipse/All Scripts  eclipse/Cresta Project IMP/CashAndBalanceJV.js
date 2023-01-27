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
	     
	     Acc = nlapiGetCurrentLineItemValue('line','account');
		// alert('Acc is'+Acc);
	     DebitAmt = nlapiGetCurrentLineItemValue('line','credit');
		//  alert('DebitAmt is'+DebitAmt);

	     CreditAmt = nlapiGetCurrentLineItemValue('line','debit');
		//  alert('CreditAmt is'+CreditAmt);
		 
		  var accountSearch = nlapiSearchRecord("account","customsearch_account_type_bank",
				  [
					  ["internalid","anyof",Acc]
				  ], 
				  [
				     new nlobjSearchColumn("name").setSort(false), 
				     new nlobjSearchColumn("type"), 
				     new nlobjSearchColumn("description"), 
				     new nlobjSearchColumn("balance"), 
				     new nlobjSearchColumn("custrecord_fam_account_showinfixedasset"),
				     new nlobjSearchColumn("custrecord_od")
				  ]
				  );
		
		        if(accountSearch !=null && accountSearch != '')
				  {
					
		    			for (var i = 0;  i < accountSearch.length ; i++) 
		    			{
		    				var AccType = accountSearch[i].getValue('type');
		    				var Bal = accountSearch[i].getValue('balance');
                            var ODchek = accountSearch[i].getValue('custrecord_od');
		                      // alert('locationquantityavailable***************' +avail_quant);
		    			 
		    			}
		    				
		    							
			      }
		    
		       // alert('AccType***************' +AccType);
		    
		    if(AccType =='Bank' && ODchek != 'T')
		    {
		    	if(CreditAmt > 0 && Bal !=null)
		         {
		    		var remain = parseFloat(Bal)-parseFloat(CreditAmt);
		         }
		    	 
		    	  else  if(DebitAmt > 0 && Bal !=null)
		    		{
		    		var remain = parseFloat(Bal)-parseFloat(DebitAmt);
		    		}
		         
		    	else
		    	{  
		    		if(DebitAmt !=null )
		    		{
		    			var remain = parseFloat(Bal)+parseFloat(DebitAmt);
		    		}
		    		else if(CreditAmt !=null)
		    		{
		    			var remain = parseFloat(Bal)+parseFloat(CreditAmt);
		    		}
		    	
		    	}
		    	
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
		    else if(AccType !='Bank')
		    {
		    	SetFlag= true;
		    }
		    else
		    {
		      //  alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
		        SetFlag= false;
		    }
		}
	
}

function validatePOLineItem(type){
	   if(type == 'line'){

			 var location;
			 
			 var Acc;
		     var DebitAmt;
		     var CreditAmt;
		     
		     Acc = nlapiGetCurrentLineItemValue('line','account');
			// alert('Acc is'+Acc);
			 CreditAmt = nlapiGetCurrentLineItemValue('line','credit');
			// alert('CreditAmt is'+CreditAmt);

			 DebitAmt = nlapiGetCurrentLineItemValue('line','debit');
			// alert('DebitAmt is'+DebitAmt);
			 
			  var accountSearch = nlapiSearchRecord("account","customsearch_account_type_bank",
					  [
						  ["internalid","anyof",Acc]
					  ], 
					  [
					     new nlobjSearchColumn("name").setSort(false), 
					     new nlobjSearchColumn("type"), 
					     new nlobjSearchColumn("description"), 
					     new nlobjSearchColumn("balance"), 
					     new nlobjSearchColumn("custrecord_fam_account_showinfixedasset"),
					     new nlobjSearchColumn("custrecord_od")
					  ]
					  );
			
			        if(accountSearch !=null && accountSearch != '')
					  {
						
			    			for (var i = 0;  i < accountSearch.length ; i++) 
			    			{
			    				var AccType = accountSearch[i].getValue('type');
			    				var Bal = accountSearch[i].getValue('balance');
			    				  var ODchek = accountSearch[i].getValue('custrecord_od');
			                      // alert('locationquantityavailable***************' +avail_quant);
			    			 
			    			}
			    				
			    							
				      }
			       // alert('AccType***************' +AccType);
			      //  alert('Bal***************' +Bal);
			    
			    if(AccType =='Bank'  && ODchek != 'T')
			    {
			    	if(CreditAmt > 0 && Bal !=null)
			         {
			    		var remain = parseFloat(Bal)-parseFloat(CreditAmt);
			         }
			    	 
			    	  else  if(DebitAmt > 0 && Bal !=null)
			    		{
			    		var remain = parseFloat(Bal)-parseFloat(DebitAmt);
			    		}
			         
			    	else
			    	{  
			    		if(DebitAmt !=null )
			    		{
			    			var remain = parseFloat(Bal)+parseFloat(DebitAmt);
			    		}
			    		else if(CreditAmt !=null)
			    		{
			    			var remain = parseFloat(Bal)+parseFloat(CreditAmt);
			    		}
			    	
			    	}
			    	
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
			    else if(AccType !='Bank')
			    {
			    	SetFlag= true;
			    }
			    else
			    {
			        alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
			        SetFlag= false;
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
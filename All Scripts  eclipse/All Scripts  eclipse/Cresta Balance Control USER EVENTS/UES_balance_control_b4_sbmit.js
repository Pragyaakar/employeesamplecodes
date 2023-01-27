/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Feb 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function userEventBeforeSubmitBalanceControl(type)
{

  if(type =='edit')
	  {
	      var SetFlag;
			var newrec = nlapiGetNewRecord();
			
			nlapiLogExecution('DEBUG', 'Befor submit', "  newrec  ==" + newrec);
			nlapiLogExecution('DEBUG', 'Befor submit', "  newrec.getRecordType()  ==" + newrec.getRecordType());
			
			   if(newrec.getRecordType() =='vendorreceipt')
				{
				nlapiLogExecution('DEBUG', 'Befor submit', "  newrec.getRecordType()  ==" + newrec.getRecordType());
				
				 var Acc;
			     var Bal;
			     var Amt;
		
				Acc = nlapiGetFieldValue('account');
				nlapiLogExecution('DEBUG', 'Befor submit', "  Acc  ==" + Acc);
				
				Bal = nlapiGetFieldValue('balance');
				nlapiLogExecution('DEBUG', 'Befor submit', "  Bal  ==" + Bal);
			
				Amt = nlapiGetFieldValue('total');
				nlapiLogExecution('DEBUG', 'Befor submit', "  Amt  ==" + Amt);
				
				  
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
		                            var ODchek = accountSearch[i].getValue('custrecord_od');
				                    
				    			 
				    			}
				    				
				    							
					      }
				    
			
				    
				    if(AccType =='Bank'  && ODchek != 'T')
				    {
				    	if(Bal > 0 && Amt !=null)
				         {
				    		var remain = parseFloat(Bal)-parseFloat(Amt);
				         }
				    	else
				    	{
				    		var remain = parseFloat(Bal)+parseFloat(Amt);
				    	}
				    	
				          if(remain >= 0)
				          {
				        	  SetFlag= true;
				          }  
				          else
				          {
				        	  SetFlag= false;
				          }
				        
				    }
				    else if(AccType !='Bank')
				    {
				    	SetFlag= true;
				    }
				    else
				    {
				        SetFlag= false;
				    }
				    
				    nlapiLogExecution('DEBUG', 'Befor submit', "  Amt  ==" + Amt);
				    
				    if( SetFlag== false)
				    {
				    	throw " You are not allowed to enter the amount more than the available balance in bank...!!!";
				    }
		         } // End OF Vendor Receipt TYPE
			   
		    	else if(newrec.getRecordType() =='journalentry')
				{
		    		  


					 var location;
					 
					 var Acc;
				     var DebitAmt;
				     var CreditAmt;
				     
				    var count = nlapiGetLineItemCount('line');
				    
				    for (var i1 =1;i1<=count;i1++)
				    {
				    	   Acc = nlapiGetCurrentLineItemValue('line','account',i1);
						     nlapiLogExecution('DEBUG', 'Befor submit', "  Acc  ==" + Acc);
					
						     DebitAmt = nlapiGetCurrentLineItemValue('line','credit',i1);
						     nlapiLogExecution('DEBUG', 'Befor submit', "  DebitAmt  ==" + DebitAmt);
							

						     CreditAmt = nlapiGetCurrentLineItemValue('line','debit',i1);
						     nlapiLogExecution('DEBUG', 'Befor submit', "  CreditAmt  ==" + CreditAmt);
							 
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
							                    
							    			}
							    				
							    							
								      }
							    
							       
							    
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
							        	  SetFlag= false;
							          }
							        
							    }
							    else if(AccType !='Bank')
							    {
							    	SetFlag= true;
							    }
							    else
							    {
							        SetFlag= false;
							    }
							    
							    setAtrr.push(SetFlag);
				    }
				    nlapiLogExecution('DEBUG', 'Befor submit', "  AccType  ==" + AccType);
				    nlapiLogExecution('DEBUG', 'Befor submit', "  Bal  ==" + Bal);
				    nlapiLogExecution('DEBUG', 'Befor submit', "  ODchek  ==" + ODchek);
				    nlapiLogExecution('DEBUG', 'Befor submit', "  remain  ==" + remain);
				    nlapiLogExecution('DEBUG', 'Befor submit', "  setAtrr  ==" + setAtrr);
				    
					 
					  //  if(setAtrr.includes(false) == true)
					    {
					    	throw " You are not allowed to enter the amount more than the available balance in bank...!!!";
					    }	
					
				} // END of JE
		    	else if(newrec.getRecordType() =='check')
		    	{


		   		 
		   		 var Acc;
		   	     var Bal;
		   	     var Amt;

		   		Acc = nlapiGetFieldValue('account');
		   		
		   		Bal = nlapiGetFieldValue('balance');
		   	  
		   		Amt = nlapiGetFieldValue('usertotal');
		   		
		   		nlapiLogExecution('DEBUG', 'Befor submit', "  Acc  ==" + Acc);
		   		nlapiLogExecution('DEBUG', 'Befor submit', "  Bal  ==" + Bal);
		   		nlapiLogExecution('DEBUG', 'Befor submit', "  Amt  ==" + Amt);
		   		
		   		  
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
		   		    				var ODchek = accountSearch[i].getValue('custrecord_od');
		   		                 
		   		    			}
		   		    				
		   		    							
		   			      }
		   		    
		   		     
		   		    if(AccType =='Bank' && ODchek != 'T')
		   		    {
		   		    	if(Bal > 0 && Amt !=null)
		   		         {
		   		    		var remain = parseFloat(Bal)-parseFloat(Amt);
		   		         }
		   		    	else
		   		    	{
		   		    		var remain = parseFloat(Bal)+parseFloat(Amt);
		   		    	}
		   		    	
		   		          if(remain >= 0)
		   		          {
		   		        	  SetFlag= true;
		   		          }  
		   		          else
		   		          {
		   		        	  SetFlag= false;
		   		          }
		   		        
		   		    }
		   		    else if(AccType !='Bank')
		   		    {
		   		    	SetFlag= true;
		   		    }
		   		    else
		   		    {
		   		        SetFlag= false;
		   		    }
		   		   nlapiLogExecution('DEBUG', 'Befor submit', "  AccType  ==" + AccType);
			   		nlapiLogExecution('DEBUG', 'Befor submit', "  ODchek  ==" + ODchek);
			   		nlapiLogExecution('DEBUG', 'Befor submit', "  remain  ==" + remain);
			   		nlapiLogExecution('DEBUG', 'Befor submit', "  SetFlag  ==" + SetFlag);
		   		 if( SetFlag== false)
				    {
				    	throw " You are not allowed to enter the amount more than the available balance in bank...!!!";
				    }	
		    	} //END of CHECK
			
			
	

  }


 }
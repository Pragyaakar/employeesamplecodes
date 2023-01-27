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
		                      // alert('locationquantityavailable***************' +avail_quant);
		    			 
		    			}
		    				
		    							
			      }
		    
		       // alert('AccType***************' +AccType);
		    
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
    		                      // alert('locationquantityavailable***************' +avail_quant);
    		    				var ODchek = accountSearch[i].getValue('custrecord_od');
    		    			}
    		    				
    		    							
    			      }
    		    
    		     //   alert('AccType***************' +AccType);
    		    
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
    		        	  Available= true;
    		          }  
    		          else
    		          {
    		        	  alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
    		        	  Available= false;
    		          }
    		        
    		    }
    		    else if(AccType !='Bank')
    		    {
    		    	Available= true;
    		    }
    		    else
    		    {
    		        alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
    		    	Available= false;
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
	    		                      // alert('locationquantityavailable***************' +avail_quant);
	    		    				 var ODchek = accountSearch[i].getValue('custrecord_od');
	    		    			 
	    		    			}
	    		    				
	    		    							
	    			      }
	    		    
	    		     //   alert('AccType***************' +AccType);
	    		    
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
	    		        	  Available= true;
	    		          }  
	    		          else
	    		          {
	    		        	  alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
	    		        	  Available= false;
	    		          }
	    		        
	    		    }
	    		    else if(AccType !='Bank')
	    		    {
	    		    	Available= true;
	    		    }
	    		    else
	    		    {
	    		        alert(' You are not allowed to enter the amount more than the available balance in bank...!!');
	    		    	Available= false;
	    		    }
	 }

	
         	       
	return Available;		
}
	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       20 May 2019     Priyanka Patil
	 *
	 */
	
	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType 
	 * 
	 * @param {String} type Access mode: create, copy, edit
	 * @returns {Void}
	 */
	
//===================================PageInit==============================================
	/*function cltPageInit(type)
	{
		//alert('type in pageInit = '+type)
		if(type == 'create' || type == 'edit' || type == 'copy')
		{ 
			var count1 = nlapiGetLineItemCount('apply');
			//alert('count =='+count1);
			
			var url = location.href;
			var urlParameter = getParameter(url);
			
			for(p=1; p <= count1; p++)
			{
				var apply1 = nlapiGetLineItemValue('apply','apply',p);
				//alert('apply =='+p);
				
				origAmount1 = nlapiGetLineItemValue('apply','total',p);
				//alert('origAmount =='+origAmount1);
				
				for(k=1; k<=count1; k++)
				{
					var apply1 = nlapiGetLineItemValue('apply','apply',k);
					//alert('apply in k=='+apply1);
					
					origAmount1 = nlapiGetLineItemValue('apply','total',k);
					alert('origAmount =='+origAmount1);
					
					var refNum = nlapiGetLineItemValue('apply','doc',k);
					alert('refNum =='+refNum);
					
					if(apply1 == 'F' || apply1 == null)
					{
						var refNum1 = nlapiGetLineItemValue('apply','refnum',k);
                        alert('refNum1 =='+refNum1);
						var n1 = refNum1.startsWith("VAP");
						alert('n1 =='+n1);
							
						var amount1 = nlapiGetLineItemValue('apply','total',k);
                      alert('origAmount =='+origAmount1);
						alert('amount =='+amount1);
							
						if((n1 == 1) &&(parseFloat(origAmount1) >= parseFloat(amount1)))//0- true
						{
							alert('condition true =')
							//alert('parseFloat(origAmount) =='+parseFloat(origAmount1)+"parseFloat(amount) ="+parseFloat(amount1))
							//nlapiSetLineItemValue('apply','apply',k,'T');
							//nlapiSetLineItemValue('apply','amount',k,amount1);
						   //nlapiSelectLineItem('apply',k)
						   nlapiSetCurrentLineItemValue('apply','apply','T',false,true);
						   //nlapiSetCurrentLineItemValue('apply','amount',amount1,false,false);
                           nlapiCommitLineItem('apply')
						}
					}
				}//end of for
			}
		}
	}
	*/

    
    function cltPageInit(type)
	{
		alert('type in pageInit = '+type)
		if(type == 'create' || type == 'edit' || type == 'copy')//type == 'create' || type == 'edit' || type == 'copy'
		{ 
			var count1 = nlapiGetLineItemCount('apply');
			//alert('count =='+count1);
			 var params = window.location.search.substr(1).split('&');
			 var p = params[1].split('=');
			    
			    var str = p[1];
			    //alert('STR is ='+str)
			  var venPay = nlapiLookupField('vendorbill',str,'custbody_custom_trans_id');
			  
			  //var ChckNum
			  alert("Payment ID="+venPay);
			
			for(var one=1;one<=count1;one++)
			{
				var apply1 = nlapiGetLineItemValue('apply','apply',one);
				var IntID = nlapiGetLineItemValue('apply','internalid',one);
				var TotApply = nlapiGetLineItemValue('apply','total',one);
				
				 alert('Internal ID :'+IntID);
				alert('apply1=='+apply1)
                  if(venPay == IntID)
                  {
                	  alert('Condition trruee')
                	  nlapiSelectLineItem('apply',one)
                	  nlapiSetLineItemValue('apply','apply','T');
                	  nlapiSetLineItemValue('apply','total',TotApply);//total
                	  nlapiCommitLineItem('apply');
                  }
			}
		}
		return true;
	}
	
	function getParameter(url) 
	{ 
		  var params = window.location.search.substr(1).split('&');
		// alert('params'+params);
		 
		  var count_num = nlapiGetLineItemCount('apply');
		  
		  for (var i = 0; i < params.length; i++) 
		  {
		    var p = params[i].split('=');
		    
		    var str = p[1];
		    //alert('str '+str)
		    
		    for(x=1;x<=count_num;x++)
		    {
			    var ref_Num = nlapiGetLineItemValue('apply','doc',x);
			    //alert('ref_Num =='+ref_Num);
				
			    origAmount1 = nlapiGetLineItemValue('apply','total',x);
			    //alert('origAmount1 ='+origAmount1);
			    
			    var amount1 = nlapiGetLineItemValue('apply','total',x);
			    //alert('amount1'+amount1);
			    
				if (str == ref_Num) 
				{
					//alert('condition true =')
					//alert('str =='+str+"ref_Num ="+ref_Num)
					//alert('parseFloat(origAmount) =='+parseFloat(origAmount1)+"parseFloat(amount) ="+parseFloat(amount1))
					nlapiSetLineItemValue('apply','apply',x,'T');
					//nlapiSetLineItemValue('apply','amount',x,amount1);
				}
		    }
		  }
		  //return false;
	 }
	

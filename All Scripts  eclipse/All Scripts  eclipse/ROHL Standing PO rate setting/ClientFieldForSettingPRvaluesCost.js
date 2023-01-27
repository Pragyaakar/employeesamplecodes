/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Mar 2019     Tushar More
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
function pageInitSetClose(type)
{
	var count=0;
	var lineCount =nlapiGetLineItemCount('item');
	  for(i=1;i<=lineCount;i++)
	  {
		  var poCreate = nlapiGetLineItemValue('item','custcol_po_created',i);
		  if(poCreate!= 'T')
			{
				count = count+1;
			}
	  }
	   if(count == 0)
		{
	    	 	for(i=1;i<=lineCount;i++)
	    	    {
	    	 		nlapiSetLineItemValue('item','isclosed',i,'T');
	    	    }
		}
	   return true;
}

function clientFieldChange(type, name, linenum)
{
	if((type == 'item' && name == 'quantity')||(type == 'item' && name == 'item')) 
    {

		 var location;
		 
		 var subsidiary =nlapiGetFieldValue('subsidiary');
		 var Date1 =nlapiGetFieldValue('trandate');
	     var lastpurchase;
	     item = nlapiGetCurrentLineItemValue('item','item');
	  //   alert('subsidiary is=='+subsidiary);
	 //    alert('item is=='+item);
	//    alert('Date is=='+Date1);
		quant = nlapiGetCurrentLineItemValue('item','quantity');
		
		var pr_type = nlapiGetFieldValue('custbody_pr_type');
		// alert('pr_type is=='+pr_type);
    
		      if(quant == null || quant == '' || quant == undefined)
		        {
		          quant=1;
		        }
			
          var val = ' ';
         var minPriceArr =[];
         var preFerVendArr =[];
         
         if(pr_type == '')
         {
        	 alert('Please Select The PR Type For Item Selection....!!');
        	// nlapiSetCurrentLineItemValue('item', 'item', null);
         }
         
         if(item != null && item != '' && pr_type != '2'  && pr_type != '')
		  {
			      var filters=new Array();
				 filters[0]=new nlobjSearchFilter('custrecord_subsidiary_pricing', null,'is',subsidiary);
				 filters[1] = new nlobjSearchFilter('custrecord_item', null, 'is', item);
				// filters[2] = new nlobjSearchFilter('custrecord_start_date', null, 'onorbefore', Date1);
				// filters[3] = new nlobjSearchFilter('custrecord_end_date', null, 'onorafter', Date1);
			 
				         var columns = new Array();
						 columns[0] = new nlobjSearchColumn('custrecord_subsidiary_pricing');
						 columns[1] = new nlobjSearchColumn("custrecord_item"); 
						 columns[2] =  new nlobjSearchColumn("custrecord_contract_price");
						 columns[3] =  new nlobjSearchColumn("custrecord_start_date");
						 columns[4] =  new nlobjSearchColumn("custrecord_end_date");
						
						 
				 var searchresults = nlapiSearchRecord('customrecord_custom_purchase_pricing_rec',null, filters, columns);
				 
				 if(searchresults != null && searchresults != '' && searchresults != undefined)//
					{
					  
	/*					for (var i = 0;  i < searchresults.length; i++) 
						{
							var custRecItem =  searchresults[i].getValue('custrecord_item');
							var custRecSubsi = searchresults[i].getValue('custrecord_subsidiary_pricing');
							var custRecStartDate = searchresults[i].getValue('custrecord_start_date');
							var custRecEndDate = searchresults[i].getValue('custrecord_end_date');
							var ContractPrice = searchresults[i].getValue('custrecord_contract_price');
						
						
						if (ContractPrice != null )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
					    	    nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',ContractPrice);
			  					 val =parseInt(quant)*parseFloat(ContractPrice);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',ContractPrice);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
				    		
					    }
						
						}
						
					}
				 else if(searchresults != null && searchresults.length > 1)
				 {

						for (var i1 = 0;  i1 < searchresults.length; i1++) 
						{
							var custRecItem1 =  searchresults[i1].getValue('custrecord_item');
							var custRecSubsi1 = searchresults[i1].getValue('custrecord_subsidiary_pricing');
							var custRecStartDate1 = searchresults[i1].getValue('custrecord_start_date');
							var custRecEndDate1 = searchresults[i1].getValue('custrecord_end_date');
							var ContractPrice1 = searchresults[i1].getValue('custrecord_contract_price');
							
							var preFerVend = searchresults[i1].getValue('custrecord_pref_vendor');
						
							minPriceArr.push(ContractPrice1);
							preFerVendArr.push(preFerVend);
						}
						 Math.min(minPriceArr);
						 var leastVal = Math.min.apply(null, minPriceArr);
						//alert('minPriceArr=='+minPriceArr)
						//alert('leastVal=='+leastVal)
						if (ContractPrice1 != null && preFerVendArr.length >= 2 )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
					    	     nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',leastVal);
			  					 val =parseInt(quant)*parseFloat(leastVal);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',leastVal);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
				    		
					    }
						
					   if (ContractPrice1 != null && preFerVendArr.length == 1 && searchresults.length > 1 )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
							
							for (var i2 = 0;  i2 < searchresults.length; i2++) 
							{
								
								var preFerVend1 = searchresults[i2].getValue('custrecord_pref_vendor');
								
								if(preFerVend1 =='T')
								{
									var Pref_ContractPrice1 = searchresults[i2].getValue('custrecord_contract_price');
					    	     nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',Pref_ContractPrice1);
			  					 val =parseInt(quant)*parseFloat(Pref_ContractPrice1);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',Pref_ContractPrice1);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
								}
							}
				    		
					    }
						*/
					 alert('Please Select Regular Item...');
					 SetFlag = false;
				 }

			      else
			    	{
			    	//  alert('Condition Fails....');
			    	 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
					 var columns = new Array();
					 columns[0] = new nlobjSearchColumn("formulanumeric",null,"GROUP");
					 columns[1] = new nlobjSearchColumn("trandate",null,"GROUP").setSort(true);
					
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('item', null, 'anyof',item);
					 filters[1] = new nlobjSearchFilter ('subsidiary', null, 'anyof',subsidiary);
		     		 var searchresults = nlapiSearchRecord('transaction','customsearch_last_purchase_price_for_pr',filters,columns);//customsearch_item_search_so_po
		     		 
		     		if(searchresults != null)
		  		    {
		  		    	for (var i = 0;  i < searchresults.length; i++) 
		  			   {
		  				var price = searchresults[i].getValue("formulanumeric",null,"GROUP");
		                  //   alert('price***************' +price);
		  			         				
		  			//	nlapiSetCurrentLineItemValue('item','custcol_avlbl_quantity',avail_quant);
		  				 if(price!=null && price != '' )
		  				  {
		  					 nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',price);
		  					 val =parseInt(quant)*parseFloat(price);
		  				
		  					 nlapiSetCurrentLineItemValue('item','estimatedamount',price);
		  					 nlapiSetCurrentLineItemValue('item','amount',val);
		  				  }
		  				
		  				 
		  				
		  			     }
		  				
			    	  }
		     		 else
	  				  {
	  					price ='0.00';
	  					 nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',price);
	  					val =parseInt(quant)*parseFloat(price);
	  					
	  					nlapiSetCurrentLineItemValue('item','estimatedamount',price);
	  					nlapiSetCurrentLineItemValue('item','amount',val); 
	  				  }
			 
  		}	
		
		  }
		  
		  
		  //-----------------------------------------------------------------------------------------------
		  
         if(item !=null && item !=undefined && item !='')
        	 {
		    var filtersN=new Array();
		    filtersN[0]=new nlobjSearchFilter('custrecord_subsidiary_pricing', null,'is',subsidiary);
		    filtersN[1] = new nlobjSearchFilter('custrecord_item', null, 'is', item);
			   var columnsN = new Array();
			   columnsN[0] = new nlobjSearchColumn('custrecord_subsidiary_pricing');
			   columnsN[1] = new nlobjSearchColumn("custrecord_item"); 
			   columnsN[2] =  new nlobjSearchColumn("custrecord_contract_price");
			   columnsN[3] =  new nlobjSearchColumn("custrecord_start_date");
			   columnsN[4] =  new nlobjSearchColumn("custrecord_end_date");
        	 }
				 var searchresultsN = nlapiSearchRecord('customrecord_custom_purchase_pricing_rec',null, filtersN, columnsN);
		  
		  if(item != null && item != '' && pr_type == '2' &&  searchresultsN != null)
		  {
			      var filters=new Array();
				 filters[0]=new nlobjSearchFilter('custrecord_subsidiary_pricing', null,'is',subsidiary);
				 filters[1] = new nlobjSearchFilter('custrecord_item', null, 'is', item);
				 filters[2] = new nlobjSearchFilter('custrecord_start_date', null, 'onorbefore', Date1);
				 filters[3] = new nlobjSearchFilter('custrecord_end_date', null, 'onorafter', Date1);
			 
				         var columns = new Array();
						 columns[0] = new nlobjSearchColumn('custrecord_subsidiary_pricing');
						 columns[1] = new nlobjSearchColumn("custrecord_item"); 
						 columns[2] =  new nlobjSearchColumn("custrecord_contract_price");
						 columns[3] =  new nlobjSearchColumn("custrecord_start_date");
						 columns[4] =  new nlobjSearchColumn("custrecord_end_date");
						 columns[5] =  new nlobjSearchColumn("custrecord_pref_vendor");
						
						 
				 var searchresults = nlapiSearchRecord('customrecord_custom_purchase_pricing_rec',null, filters, columns);
				 
				 if(searchresults != null && searchresults.length == 1)
					{
					  
						for (var i = 0;  i < searchresults.length; i++) 
						{
							var custRecItem =  searchresults[i].getValue('custrecord_item');
							var custRecSubsi = searchresults[i].getValue('custrecord_subsidiary_pricing');
							var custRecStartDate = searchresults[i].getValue('custrecord_start_date');
							var custRecEndDate = searchresults[i].getValue('custrecord_end_date');
							var ContractPrice = searchresults[i].getValue('custrecord_contract_price');
						
						
						if (ContractPrice != null )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
					    	    nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',ContractPrice);
			  					 val =parseInt(quant)*parseFloat(ContractPrice);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',ContractPrice);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
				    		
					    }
						
						}
					
					}
				 else if(searchresults != null && searchresults.length > 1)
				 {

						for (var i1 = 0;  i1 < searchresults.length; i1++) 
						{
							var custRecItem1 =  searchresults[i1].getValue('custrecord_item');
							var custRecSubsi1 = searchresults[i1].getValue('custrecord_subsidiary_pricing');
							var custRecStartDate1 = searchresults[i1].getValue('custrecord_start_date');
							var custRecEndDate1 = searchresults[i1].getValue('custrecord_end_date');
							var ContractPrice1 = searchresults[i1].getValue('custrecord_contract_price');
							
							var preFerVend = searchresults[i1].getValue('custrecord_pref_vendor');
						

							if(preFerVend =='T')
							{
								preFerVendArr.push(preFerVend);
							}
								
								//alert('preferVendor =='+preFerVend);
								
						
						minPriceArr.push(ContractPrice1);
						}
						 Math.min(minPriceArr);
						 var leastVal = Math.min.apply(null, minPriceArr);
						//alert('minPriceArr=='+minPriceArr)
						//alert('leastVal=='+leastVal)
						if (ContractPrice1 != null && preFerVendArr.length >= 2 )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
					    	     nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',leastVal);
			  					 val =parseInt(quant)*parseFloat(leastVal);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',leastVal);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
				    		
					    }
						
					   if (ContractPrice1 != null && preFerVendArr.length == 1 && searchresults.length > 1 )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
							
							for (var i2 = 0;  i2 < searchresults.length; i2++) 
							{
								
								var preFerVend1 = searchresults[i2].getValue('custrecord_pref_vendor');
								
								if(preFerVend1 =='T')
								{
									var Pref_ContractPrice1 = searchresults[i2].getValue('custrecord_contract_price');
					    	     nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',Pref_ContractPrice1);
			  					 val =parseInt(quant)*parseFloat(Pref_ContractPrice1);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',Pref_ContractPrice1);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
								}
							}
				    		
					    }
						
				 }

			      else
			    	{
			 /*   	//  alert('Condition Fails....');
			    	 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
					 var columns = new Array();
					 columns[0] = new nlobjSearchColumn("formulanumeric",null,"SUM");
				
					
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('item', null, 'anyof',item);
					 filters[1] = new nlobjSearchFilter ('subsidiary', null, 'anyof',subsidiary);
		     		 var searchresults = nlapiSearchRecord('transaction','customsearch_last_purchase_price_for_pr',filters,columns);//customsearch_item_search_so_po
		     		 
		     		if(searchresults != null)
		  		    {
		  		    	for (var i = 0;  i < searchresults.length; i++) 
		  			   {
		  				var price = searchresults[i].getValue("formulanumeric",null,"SUM");
		                  //   alert('price***************' +price);
		  			         				
		  			//	nlapiSetCurrentLineItemValue('item','custcol_avlbl_quantity',avail_quant);
		  				 if(price!=null && price != '' )
		  				  {
		  					 nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',price);
		  					 val =parseInt(quant)*parseFloat(price);
		  				
		  					 nlapiSetCurrentLineItemValue('item','estimatedamount',price);
		  					 nlapiSetCurrentLineItemValue('item','amount',val);
		  				  }
		  				
		  				 
		  				
		  			     }
		  				
			    	  }
		     		 else
	  				  {*/
	  					price ='0.00';
	  					 nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',price);
	  					val =parseInt(quant)*parseFloat(price);
	  					
	  					nlapiSetCurrentLineItemValue('item','estimatedamount',price);
	  					nlapiSetCurrentLineItemValue('item','amount',val); 
	  				 // }
			 
  		}	
		
		  }
		  if(item != null && item != '' && (pr_type == '2'||pr_type == '') &&  searchresultsN == null)
		  {
			  alert('Please Select Contracted Items..!!');
			  SetFlag = false;
		  }
	}
	      if(type == 'item' && name == 'estimatedamount')
			{
	    	var quant1 = nlapiGetCurrentLineItemValue('item','quantity');
	    	var amount = nlapiGetCurrentLineItemValue('item','estimatedamount');
	        
	          if(quant1 == null || quant1 == '' || quant1 == undefined)
	          {
	            quant1=1;
	          } 
	          
	          if(amount != null)
	          {
	        	var  value =parseInt(quant1)*parseFloat(amount);
					
					nlapiSetCurrentLineItemValue('item','amount',value);
	          }
	          
			}
}
function clientFieldChanged(type, name, linenum)
{
	if((type == 'item' && name == 'quantity')||(type == 'item' && name == 'item')) 
    {

		 var location;
		 
		 var subsidiary =nlapiGetFieldValue('subsidiary');
		 var Date1 =nlapiGetFieldValue('trandate');
	     var lastpurchase;
	     item = nlapiGetCurrentLineItemValue('item','item');
	  //   alert('subsidiary is=='+subsidiary);
	 //    alert('item is=='+item);
	//    alert('Date is=='+Date1);
		quant = nlapiGetCurrentLineItemValue('item','quantity');
		
		var pr_type = nlapiGetFieldValue('custbody_pr_type');
		// alert('pr_type is=='+pr_type);
    
		      if(quant == null || quant == '' || quant == undefined)
		        {
		          quant=1;
		        }
			
          var val = ' ';
         var minPriceArr =[];
         var preFerVendArr =[];
         
       /*  if(pr_type == '')
         {
        	 alert('Please Select The PR Type For Item Selection....!!');
        	// nlapiSetCurrentLineItemValue('item', 'item', null);
         }*/
         
         if(item != null && item != '' && pr_type != '2'  && pr_type != '')
		  {
			      var filters=new Array();
				 filters[0]=new nlobjSearchFilter('custrecord_subsidiary_pricing', null,'is',subsidiary);
				 filters[1] = new nlobjSearchFilter('custrecord_item', null, 'is', item);
				// filters[2] = new nlobjSearchFilter('custrecord_start_date', null, 'onorbefore', Date1);
				// filters[3] = new nlobjSearchFilter('custrecord_end_date', null, 'onorafter', Date1);
			 
				         var columns = new Array();
						 columns[0] = new nlobjSearchColumn('custrecord_subsidiary_pricing');
						 columns[1] = new nlobjSearchColumn("custrecord_item"); 
						 columns[2] =  new nlobjSearchColumn("custrecord_contract_price");
						 columns[3] =  new nlobjSearchColumn("custrecord_start_date");
						 columns[4] =  new nlobjSearchColumn("custrecord_end_date");
						
						 
				 var searchresults = nlapiSearchRecord('customrecord_custom_purchase_pricing_rec',null, filters, columns);
				 
				 if(searchresults != null && searchresults != '' && searchresults != undefined)//
					{
					  
	/*					for (var i = 0;  i < searchresults.length; i++) 
						{
							var custRecItem =  searchresults[i].getValue('custrecord_item');
							var custRecSubsi = searchresults[i].getValue('custrecord_subsidiary_pricing');
							var custRecStartDate = searchresults[i].getValue('custrecord_start_date');
							var custRecEndDate = searchresults[i].getValue('custrecord_end_date');
							var ContractPrice = searchresults[i].getValue('custrecord_contract_price');
						
						
						if (ContractPrice != null )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
					    	    nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',ContractPrice);
			  					 val =parseInt(quant)*parseFloat(ContractPrice);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',ContractPrice);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
				    		
					    }
						
						}
						
					}
				 else if(searchresults != null && searchresults.length > 1)
				 {

						for (var i1 = 0;  i1 < searchresults.length; i1++) 
						{
							var custRecItem1 =  searchresults[i1].getValue('custrecord_item');
							var custRecSubsi1 = searchresults[i1].getValue('custrecord_subsidiary_pricing');
							var custRecStartDate1 = searchresults[i1].getValue('custrecord_start_date');
							var custRecEndDate1 = searchresults[i1].getValue('custrecord_end_date');
							var ContractPrice1 = searchresults[i1].getValue('custrecord_contract_price');
							
							var preFerVend = searchresults[i1].getValue('custrecord_pref_vendor');
						
							minPriceArr.push(ContractPrice1);
							preFerVendArr.push(preFerVend);
						}
						 Math.min(minPriceArr);
						 var leastVal = Math.min.apply(null, minPriceArr);
						//alert('minPriceArr=='+minPriceArr)
						//alert('leastVal=='+leastVal)
						if (ContractPrice1 != null && preFerVendArr.length >= 2 )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
					    	     nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',leastVal);
			  					 val =parseInt(quant)*parseFloat(leastVal);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',leastVal);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
				    		
					    }
						
					   if (ContractPrice1 != null && preFerVendArr.length == 1 && searchresults.length > 1 )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
							
							for (var i2 = 0;  i2 < searchresults.length; i2++) 
							{
								
								var preFerVend1 = searchresults[i2].getValue('custrecord_pref_vendor');
								
								if(preFerVend1 =='T')
								{
									var Pref_ContractPrice1 = searchresults[i2].getValue('custrecord_contract_price');
					    	     nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',Pref_ContractPrice1);
			  					 val =parseInt(quant)*parseFloat(Pref_ContractPrice1);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',Pref_ContractPrice1);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
								}
							}
				    		
					    }
						*/
					 SetFlag = false;
					 alert('Please Select Regular Item...');
				 }

			      else
			    	{
			    	//  alert('Condition Fails....');
			    	 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
					 var columns = new Array();
					 columns[0] = new nlobjSearchColumn("formulanumeric",null,"GROUP");
					 columns[1] = new nlobjSearchColumn("trandate",null,"GROUP").setSort(true);
				
					
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('item', null, 'anyof',item);
					 filters[1] = new nlobjSearchFilter ('subsidiary', null, 'anyof',subsidiary);
		     		 var searchresults = nlapiSearchRecord('transaction','customsearch_last_purchase_price_for_pr',filters,columns);//customsearch_item_search_so_po
		     		 
		     		if(searchresults != null)
		  		    {
		  		    	for (var i = 0;  i < searchresults.length; i++) 
		  			   {
		  				var price = searchresults[i].getValue("formulanumeric",null,"GROUP");
		                //    alert('price***************' +price);
		  			         				
		  			//	nlapiSetCurrentLineItemValue('item','custcol_avlbl_quantity',avail_quant);
		  				 if(price!=null && price != '' )
		  				  {
		  					 nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',price);
		  					 val =parseInt(quant)*parseFloat(price);
		  				
		  					 nlapiSetCurrentLineItemValue('item','estimatedamount',price);
		  					 nlapiSetCurrentLineItemValue('item','amount',val);
		  				  }
		  				
		  				 
		  				
		  			     }
		  				
			    	  }
		     		 else
	  				  {
	  					price ='0.00';
	  					 nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',price);
	  					val =parseInt(quant)*parseFloat(price);
	  					
	  					nlapiSetCurrentLineItemValue('item','estimatedamount',price);
	  					nlapiSetCurrentLineItemValue('item','amount',val); 
	  				  }
			 
  		}	
		
		  }
		  
		  
		  //-----------------------------------------------------------------------------------------------
		  
         if(item !=null && item !=undefined && item !='')
        	 {
		    var filtersN=new Array();
		    filtersN[0]=new nlobjSearchFilter('custrecord_subsidiary_pricing', null,'is',subsidiary);
		    filtersN[1] = new nlobjSearchFilter('custrecord_item', null, 'is', item);
			   var columnsN = new Array();
			   columnsN[0] = new nlobjSearchColumn('custrecord_subsidiary_pricing');
			   columnsN[1] = new nlobjSearchColumn("custrecord_item"); 
			   columnsN[2] =  new nlobjSearchColumn("custrecord_contract_price");
			   columnsN[3] =  new nlobjSearchColumn("custrecord_start_date");
			   columnsN[4] =  new nlobjSearchColumn("custrecord_end_date");
        	 }
				 var searchresultsN = nlapiSearchRecord('customrecord_custom_purchase_pricing_rec',null, filtersN, columnsN);
		  
		  if(item != null && item != '' && pr_type == '2' &&  searchresultsN != null)
		  {
			      var filters=new Array();
				 filters[0]=new nlobjSearchFilter('custrecord_subsidiary_pricing', null,'is',subsidiary);
				 filters[1] = new nlobjSearchFilter('custrecord_item', null, 'is', item);
				 filters[2] = new nlobjSearchFilter('custrecord_start_date', null, 'onorbefore', Date1);
				 filters[3] = new nlobjSearchFilter('custrecord_end_date', null, 'onorafter', Date1);
			 
				         var columns = new Array();
						 columns[0] = new nlobjSearchColumn('custrecord_subsidiary_pricing');
						 columns[1] = new nlobjSearchColumn("custrecord_item"); 
						 columns[2] =  new nlobjSearchColumn("custrecord_contract_price");
						 columns[3] =  new nlobjSearchColumn("custrecord_start_date");
						 columns[4] =  new nlobjSearchColumn("custrecord_end_date");
						 columns[5] =  new nlobjSearchColumn("custrecord_pref_vendor");
						
						 
				 var searchresults = nlapiSearchRecord('customrecord_custom_purchase_pricing_rec',null, filters, columns);
				 
				 if(searchresults != null && searchresults.length == 1)
					{
					  
						for (var i = 0;  i < searchresults.length; i++) 
						{
							var custRecItem =  searchresults[i].getValue('custrecord_item');
							var custRecSubsi = searchresults[i].getValue('custrecord_subsidiary_pricing');
							var custRecStartDate = searchresults[i].getValue('custrecord_start_date');
							var custRecEndDate = searchresults[i].getValue('custrecord_end_date');
							var ContractPrice = searchresults[i].getValue('custrecord_contract_price');
						
						
						if (ContractPrice != null )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
					    	    nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',ContractPrice);
			  					 val =parseInt(quant)*parseFloat(ContractPrice);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',ContractPrice);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
				    		
					    }
						
						}
					
					}
				 else if(searchresults != null && searchresults.length > 1)
				 {

						for (var i1 = 0;  i1 < searchresults.length; i1++) 
						{
							var custRecItem1 =  searchresults[i1].getValue('custrecord_item');
							var custRecSubsi1 = searchresults[i1].getValue('custrecord_subsidiary_pricing');
							var custRecStartDate1 = searchresults[i1].getValue('custrecord_start_date');
							var custRecEndDate1 = searchresults[i1].getValue('custrecord_end_date');
							var ContractPrice1 = searchresults[i1].getValue('custrecord_contract_price');
							
							var preFerVend = searchresults[i1].getValue('custrecord_pref_vendor');
							
							
							
							if(preFerVend =='T')
							{
								preFerVendArr.push(preFerVend);
							}
								
								//alert('preferVendor =='+preFerVend);
								
						
						minPriceArr.push(ContractPrice1);
							
						}
						 Math.min(minPriceArr);
						 var leastVal = Math.min.apply(null, minPriceArr);
						//alert('minPriceArr=='+minPriceArr)
						//alert('leastVal=='+leastVal)
						if (ContractPrice1 != null && preFerVendArr.length >= 2 )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
					    	     nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',leastVal);
			  					 val =parseInt(quant)*parseFloat(leastVal);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',leastVal);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
				    		
					    }
						
					   if (ContractPrice1 != null && preFerVendArr.length == 1 && searchresults.length > 1 )//&& (custRecStartDate<= Date && custRecEndDate >= Date )
				    	{
				    	 
					    	//     alert('Condition Matches....');
							
							for (var i2 = 0;  i2 < searchresults.length; i2++) 
							{
								
								var preFerVend1 = searchresults[i2].getValue('custrecord_pref_vendor');
								
								if(preFerVend1 =='T')
								{
									var Pref_ContractPrice1 = searchresults[i2].getValue('custrecord_contract_price');
					    	     nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',Pref_ContractPrice1);
			  					 val =parseInt(quant)*parseFloat(Pref_ContractPrice1);
			  				
			  					 nlapiSetCurrentLineItemValue('item','estimatedamount',Pref_ContractPrice1);
			  					 nlapiSetCurrentLineItemValue('item','amount',val);
								}
							}
				    		
					    }
						
				 }

			      else
			    	{
			 /*   	//  alert('Condition Fails....');
			    	 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
					 var columns = new Array();
					 columns[0] = new nlobjSearchColumn("formulanumeric",null,"SUM");
				
					
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('item', null, 'anyof',item);
					 filters[1] = new nlobjSearchFilter ('subsidiary', null, 'anyof',subsidiary);
		     		 var searchresults = nlapiSearchRecord('transaction','customsearch_last_purchase_price_for_pr',filters,columns);//customsearch_item_search_so_po
		     		 
		     		if(searchresults != null)
		  		    {
		  		    	for (var i = 0;  i < searchresults.length; i++) 
		  			   {
		  				var price = searchresults[i].getValue("formulanumeric",null,"SUM");
		                  //   alert('price***************' +price);
		  			         				
		  			//	nlapiSetCurrentLineItemValue('item','custcol_avlbl_quantity',avail_quant);
		  				 if(price!=null && price != '' )
		  				  {
		  					 nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',price);
		  					 val =parseInt(quant)*parseFloat(price);
		  				
		  					 nlapiSetCurrentLineItemValue('item','estimatedamount',price);
		  					 nlapiSetCurrentLineItemValue('item','amount',val);
		  				  }
		  				
		  				 
		  				
		  			     }
		  				
			    	  }
		     		 else
	  				  {*/
	  					price ='0.00';
	  					 nlapiSetCurrentLineItemValue('item','custcol_last_purchase_price',price);
	  					val =parseInt(quant)*parseFloat(price);
	  					
	  					nlapiSetCurrentLineItemValue('item','estimatedamount',price);
	  					nlapiSetCurrentLineItemValue('item','amount',val); 
	  				 // }
			 
  		}	
		
		  }
		  if(item != null && item != '' && (pr_type == '2'||pr_type == '') &&  searchresultsN == null)
		  {
			  alert('Please Select Contracted Items..!!');
			  SetFlag = false;
		  }
	}
}


function clientSaveRecord()
{

	var subsidary = nlapiGetFieldValue('subsidiary');
	var lineCount =nlapiGetLineItemCount('item');
	
	var prType = nlapiGetFieldValue('custbody_pr_type');
	
	var SearchArr =[];
	  for(i=1;i<=lineCount;i++)
	  {
		  var item1 = nlapiGetLineItemValue('item','item',i);
		  SearchArr.push(item1);
	  }
	    
	     var filters=new Array();
		 filters[0]=new nlobjSearchFilter('custrecord_subsidiary_pricing', null,'is',subsidary);
		 filters[1] = new nlobjSearchFilter('custrecord_item', null, 'anyof', SearchArr); //custrecord_vendor_name
		// filters[2] = new nlobjSearchFilter('custrecord_vendor_name', null, 'is', vendor); 
	 
		         var columns = new Array();
				 columns[0] = new nlobjSearchColumn('custrecord_subsidiary_pricing');
				 columns[1] = new nlobjSearchColumn("custrecord_item"); 
				 columns[2] =  new nlobjSearchColumn("custrecord_contract_price");
				 columns[3] =  new nlobjSearchColumn("custrecord_start_date");
				 columns[4] =  new nlobjSearchColumn("custrecord_end_date");
				
				 
		 var searchresults = nlapiSearchRecord('customrecord_custom_purchase_pricing_rec',null, filters, columns);
	
		     if(prType == '2')
			 {
					 if(searchresults == null)
					 {    alert('You have to Select Appropriate Items To Save this Record...!!');
							return false;
					 }
					 else
					 {
						 return true;
					 }
			 }
		     
		     if(prType == '1')
			 {
					 if(searchresults != null)
					 {    alert('You have to Select Appropriate Items To Save this Record...!!');
							return false;
					 }
					 else
					 {
						 return true;
					 }
			 }
			
	
}




function clientFieldChange(type, name, linenum) {
	if((type == 'item' && name == 'item' ||(type == 'item' && name == 'custcol_po_rate'))) //||(type == 'item' && name == 'custcol_po_rate')
	   {
		 
		   var line= nlapiGetCurrentLineItemIndex('item');
		   var Amt= nlapiGetCurrentLineItemValue('item','amount');
		   var qty= nlapiGetCurrentLineItemValue('item','quantity');
	   	   var item = nlapiGetCurrentLineItemValue('item','item');
		    //=========================================================================
		   if(item !=null && item !='' && item !=undefined)
		    {
			   alert('FIeldChnge PORATE Quote cha')
			   
			   nlapiDisableLineItemField('item','costestimatetype',true);
		        var amt = nlapiGetCurrentLineItemValue('item','amount');
		    //	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
			 	var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
			 	var DropVal = nlapiGetCurrentLineItemValue('item','costestimatetype');
			 	 alert('DropVal of unitRate Change=='+DropVal)
			 
			 	
			 	var RecType = nlapiGetRecordType();
			 	// alert('RecType of unitRate Change=='+RecType)
			 	//alert('Currency=='+Currency);
			 	// alert('AvgCost of unitRate Change=='+AvgCost)
			 	 
			 	var searchresults = nlapiSearchRecord('item','customsearch_itemsearch_porate_currency',
			 			[
			 			
			 			   ["isinactive","is","F"], 
			 			   "AND", 
			 			   ["internalid","anyof",item]
			 			], 
			 			[
			 			   new nlobjSearchColumn("itemid").setSort(false), 
			 			   new nlobjSearchColumn("displayname"), 
			 			   new nlobjSearchColumn("salesdescription"), 
			 			   new nlobjSearchColumn("type"), 
			 			   new nlobjSearchColumn("vendorcost"), 
			 			   new nlobjSearchColumn("vendorcostentered"), 
			 			   new nlobjSearchColumn("vendorpricecurrency"), 
			 			   new nlobjSearchColumn("averagecost"),
			 			  new nlobjSearchColumn("vendor"),
			 			   new nlobjSearchColumn("lastpurchaseprice")
			 			]
			 			);
	     	//	alert('searchresults=='+searchresults);
	     		if(searchresults != null)
	  		    {
	  		    	for (var i = 0;  i < searchresults.length; i++) 
	  			   {
	  				var AvgCost = searchresults[i].getValue("averagecost");
	  				var povalue = searchresults[i].getValue("vendorcostentered");
	  			    var ItemPrice = searchresults[i].getValue("vendorcost");//
	  			    var prefVendor = searchresults[i].getValue("vendor");//
	  			    var lastPurchasePrice = searchresults[i].getValue("lastpurchaseprice");//
	  			    var Currency =searchresults[i].getText("currency","preferredVendor",null);
	  			   }
	  		    }
	     		
	     	
              if(AvgCost !=null && AvgCost !='' && AvgCost !=undefined)
              {
            	  AvgCost=AvgCost;
              }
              else 
              {
            	  AvgCost='';
              }
              
              if(prefVendor !=null && prefVendor !='' && prefVendor !=undefined)
              {
            	  prefVendor=prefVendor;
              }
              else 
              {
            	  prefVendor='';
              }
			   
			     if(povalue !=null && povalue !='' && povalue !=undefined)
	             {
				   povalue=povalue;
	             }
	             else 
	             {
	            	  povalue='';
	             }
			   
			     
			     if(lastPurchasePrice !=null && lastPurchasePrice !='' && lastPurchasePrice !=undefined)
	             {
			    	 lastPurchasePrice=lastPurchasePrice;
	             }
	             else 
	             {
	            	 lastPurchasePrice='0.00';
	             }
			     
			       alert('AvgCost=='+AvgCost)
				   alert('Currency=='+Currency)
				   alert('povalue=='+povalue)
				   alert('lastPurchasePrice=='+lastPurchasePrice)
				   
				   var cont =nlapiGetContext().getExecutionContext();
			       alert('Context =='+cont)

			    if((AvgCost !=null && AvgCost !='' && AvgCost !=undefined)&&(povalue !=null && povalue !='' && povalue !=undefined))
			    {
			    	 alert('Condition 1')
			    	  nlapiSetCurrentLineItemValue('item','averagecost',parseFloat(AvgCost).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimatetype','AVGCOST',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(povalue).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','custcolpo_vendor',prefVendor,false,true);
				 			
			    }
			    else if((AvgCost !=null && AvgCost !='' && AvgCost !=undefined)&&(povalue ==null || povalue =='' || povalue ==undefined))
			   {
			    	 alert('Condition 2')
				    	  nlapiSetCurrentLineItemValue('item','averagecost',parseFloat(AvgCost).toFixed(2),false,true);
				 		  nlapiSetCurrentLineItemValue('item','costestimatetype','AVGCOST',false,true);
				 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
				 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
				 		  nlapiSetCurrentLineItemValue('item','custcol_po_rate','0.00',false,true);
				 		 nlapiSetCurrentLineItemValue('item','custcolpo_vendor',prefVendor,false,true);	
				 }
			    else if((AvgCost ==null || AvgCost =='' || AvgCost ==undefined)&&(povalue !=null && povalue !='' && povalue !=undefined))
			 	{
			    	 alert('Condition 3')
			    	  nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(povalue * qty).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(povalue).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(povalue).toFixed(2),false,true);
			 		 nlapiSetCurrentLineItemValue('item','custcolpo_vendor',prefVendor,false,true);	
			 	}
			    else if((AvgCost ==null || AvgCost =='' || AvgCost ==undefined)&&(povalue ==null || povalue =='' || povalue ==undefined))
			 	{
			    	 alert('Condition 4')
			    	  nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimatetype','LASTPURCHPRICE',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(lastPurchasePrice * qty).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(lastPurchasePrice).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(lastPurchasePrice).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','custcolpo_vendor',prefVendor,false,true);	
			 	}
		    }
	   }
	
	//===============================================================================
	
	 if(type == 'item' && name == 'custcol_item_cost_percentage')
	   {
			 //  alert('FIeldChnge ITEM')
			
			   
			   //==================================== 

		        var amt = nlapiGetCurrentLineItemValue('item','amount');
		    	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
			 	var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
			 	var Currency = nlapiGetCurrentLineItemValue('item','custcol_pocurrency'); 
			 	var AvgCost= nlapiGetCurrentLineItemValue('item','averagecost');
				// alert('Currency=='+Currency);
				// alert('AvgCost=='+AvgCost);
				
			 	     if(AvgCost==null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00' )
			 		{
			 	    	  var poVal = nlapiGetCurrentLineItemValue('item','porate');
			 	    	  
			 	    	  if(poVal != null && poVal != undefined && poVal != '')
			 	    	  {
				 	    	   if(Currency=='USA')
					 			{
					 			//
					 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
					 				AvgCost = parseFloat(poVal * rate);
					 			}
				 	    	 else
				 	    	 {
				 	    		AvgCost = parseFloat(poVal);
				 	    	 }
			 	    	  }
			 	    	  else
			 	    	  {
			 	    		  var EstCo = nlapiGetCurrentLineItemValue('item','costestimate');
			 	    		  AvgCost =parseFloat(EstCo);
			 	    	  }
			 		
			 		}
			 	     else
			 	     {
			 	    	AvgCost = parseFloat(AvgCost);
			 	     }
			 	
			 	if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
			 	{
			 		
			 		var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
			 		 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
			 		// alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
			 		 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
			 		 nlapiSetCurrentLineItemValue('item','amount',parseFloat(NewPrice * quantity),false,true);
			 		 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * quantity).toFixed(2),false,true);
			 		 
                   //  alert('The Average Cost Is :='+NewPrice);
					 	var newSetMarge =(parseFloat(MarginRate)/100)*100;
					 	 if(newSetMarge != null && newSetMarge != '' && newSetMarge != undefined)
					 	 {
					 		 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',parseFloat(newSetMarge).toFixed(2),false,true);
					 	 }
					 	 
					 	 
			 	}

	

		   }
}
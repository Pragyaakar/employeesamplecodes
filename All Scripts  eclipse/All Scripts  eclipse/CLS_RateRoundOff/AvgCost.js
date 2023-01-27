/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Jun 2019     Tushar More
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

var first =0;

function clientPostSourcing(type, name)
{
   if(type == 'item' && name == 'item')
   {
	//   alert('POST source ITEM')
	   var line= nlapiGetCurrentLineItemIndex('item');
	   var Amt= nlapiGetCurrentLineItemValue('item','amount');
	   nlapiDisableLineItemField('item','costestimatetype',true,line);
	   
	   if(Amt !=null && Amt !='' && Amt !=undefined)
	   {
		   nlapiDisableLineItemField('item','custcol_display_items',true,line);
	   }
	   else
	   {
		   nlapiDisableLineItemField('item','custcol_display_items',false,line);
	   }
	   //============================================
	   

	   
  		/*var Currency = nlapiGetCurrentLineItemValue('item','pocurrency'); 
	   var line= nlapiGetCurrentLineItemIndex('item');
	   var Amt= nlapiGetCurrentLineItemValue('item','amount');
	   nlapiDisableLineItemField('item','costestimatetype',true,line);
	   
	   if(Amt !=null && Amt !='' && Amt !=undefined)
	   {
		   nlapiDisableLineItemField('item','custcol_display_items',true,line);
	   }
	   else
	   {
		   nlapiDisableLineItemField('item','custcol_display_items',false,line);
	   }
	//====================================   
	   
	   var item = nlapiGetCurrentLineItemValue('item','item');
	    //=========================================================================
	   if(item !=null && item !='' && item !=undefined)
	    {
	    	
	
	    
	    //=======================================================================================
	   
	        var amt = nlapiGetCurrentLineItemValue('item','amount');
		 	
		 
		 	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
		 	var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
		 	var DropVal = nlapiGetCurrentLineItemValue('item','costestimatetype');
		 	// alert('DropVal of unitRate Change=='+DropVal)
		 
		 	
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
		 			   new nlobjSearchColumn("averagecost")
		 			]
		 			);
    	//	alert('searchresults=='+searchresults);
    		if(searchresults != null)
 		    {
 		    	for (var i = 0;  i < searchresults.length; i++) 
 			   {
 				var AvgCost = searchresults[i].getValue("averagecost");
 				var povalue = searchresults[i].getValue("vendorcostentered");
 			
 			
 			   }
 		    }
		 	
    		 alert('AvgCost=='+AvgCost);
			alert('povalue=='+povalue);
		//	alert('Currency=='+Currency);
			
			var PoRate = nlapiGetCurrentLineItemValue('item','porate');
			alert('PoRate=='+PoRate);
			
			var costType = nlapiGetCurrentLineItemValue('item','costestimatetype');
			
			alert('costType=='+costType);
			// PoRate =povalue;
			
		   if((AvgCost==null || AvgCost==undefined || AvgCost=='' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate ==null|| PoRate==''||PoRate=='0.00'))
		 	{
			      alert('Both are Null')
		 		  nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
		 		  nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimate','0.00',false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimaterate','0.00',false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimatetype','CUSTOM',false,true);
		 			
		 	}
		    else   if((AvgCost==null || AvgCost==undefined || AvgCost=='' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate !=null|| PoRate!=''||PoRate!=undefined))
			 	{
		 		// alert('In AvgCost is Null or 0')
		 		 if(RecType =='salesorder')
		 		{
		 			
		 			if(PoRate != null && PoRate != ''  && costType=='PURCHORDERRATE')
		 		    {
		 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 			 nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
		 			 
		 			 //alert('In type is chnge to po 7')
		 		    }
		 	        else
		 		    {
		 			// nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 			 nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
		 			 nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
	 				  
		 			 //alert('In type is chnge to po 7')
		 		    }
		 			if(Currency=='USD' && costType=='PURCHORDERRATE' )
		 			{
		 			//	alert('Currency==2');
		 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
		 				AvgCost = PoRate * rate;
		 			//	alert('Currency==2--rate'+rate);
		 			//	alert('Currency==2---AvgCost'+AvgCost);
		 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 				   nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			}
		 			else
		 			{
		 				AvgCost = PoRate;
		 				// alert('In CostType is po for currency != 2')
		 				var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
		 				//  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 				 nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
		 			     nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			} 
		 		}
		 		else if(RecType =='estimate')
		 		{
		 			var EstRate = nlapiGetCurrentLineItemValue('item','costestimaterate');//costestimaterate
		 	        if(EstRate !=null && EstRate !='')
		 		    {
		 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 			// alert('In type is chnge to po 10')
		 		    }
		 			if(Currency=='2'  && costType=='PURCHORDERRATE')
		 			{
		 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
		 				AvgCost = EstRate * rate; 
		 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			}
		 			else
		 			{
		 				AvgCost = EstRate;
		 				//  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			} 	
		 		}
		 		
		 	}
		 	else if(AvgCost!=null && AvgCost!=undefined && AvgCost!='' )
		 	{
		 	      nlapiSetCurrentLineItemValue('item','averagecost',parseFloat(AvgCost).toFixed(2),false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimatetype','AVGCOST',false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 		
		 		  if(povalue !=null && povalue!='')
		 		  {
		 			 nlapiSetCurrentLineItemValue('item','porate',parseFloat(povalue).toFixed(2),false,true);
			 	  }
		 		  else
		 		  {
		 			 nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
				  }
		 	}
		 
		 	// alert('In margin Rate ='+MarginRate)
		 	
		 	if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
		 	{
		 		
		 		var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
		 		 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
		 		// alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
		 		 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
		 		 nlapiSetCurrentLineItemValue('item','amount',NewPrice * quantity,false,true);
		 		 

				 	var newSetMarge =(parseFloat(MarginRate) /100)*100;
				 	 if(newSetMarge != null && newSetMarge != '' && newSetMarge != undefined)
				 	 {
				 		 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
				 	 }
				
		 		
		 	}

	    }
	 	
  
	   
	   
	   */
	   //===============================================
	   
   }
  
}

function clientFieldChange(type, name, linenum) {
	   if(type == 'item' && name == 'item'){
		//   alert('FIeldChnge ITEM')
		   var line= linenum;
		   var Amt= nlapiGetCurrentLineItemValue('item','amount');
		   nlapiDisableLineItemField('item','costestimatetype',true,line);
		   
		   if(Amt !=null && Amt !='' && Amt !=undefined)
		   {
			   nlapiDisableLineItemField('item','custcol_display_items',true,line);
		   }
		   else
		   {
			   nlapiDisableLineItemField('item','custcol_display_items',false,line);
		   }
		   //==================================== 

	   
	   		var Currency = nlapiGetCurrentLineItemValue('item','pocurrency'); 
		   var line= nlapiGetCurrentLineItemIndex('item');
		   var Amt= nlapiGetCurrentLineItemValue('item','amount');
		   nlapiDisableLineItemField('item','costestimatetype',true,line);
		   
		   if(Amt !=null && Amt !='' && Amt !=undefined)
		   {
			   nlapiDisableLineItemField('item','custcol_display_items',true,line);
		   }
		   else
		   {
			   nlapiDisableLineItemField('item','custcol_display_items',false,line);
		   }
		//====================================   
		   
		   var item = nlapiGetCurrentLineItemValue('item','item');
		    //=========================================================================
		   if(item !=null && item !='' && item !=undefined)
		    {
		    	
		
		    
		    //=======================================================================================
		   
		        var amt = nlapiGetCurrentLineItemValue('item','amount');
			 	
			 
			 	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
			 	var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
			 	var DropVal = nlapiGetCurrentLineItemValue('item','costestimatetype');
			 	// alert('DropVal of unitRate Change=='+DropVal)
			 
			 	
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
			 			   new nlobjSearchColumn("averagecost")
			 			]
			 			);
	     	//	alert('searchresults=='+searchresults);
	     		if(searchresults != null)
	  		    {
	  		    	for (var i = 0;  i < searchresults.length; i++) 
	  			   {
	  				var AvgCost = searchresults[i].getValue("averagecost");
	  				var povalue = searchresults[i].getValue("vendorcostentered");
	  			
	  			
	  			   }
	  		    }
			 	
	     		// alert('AvgCost=='+AvgCost);
				// alert('povalue=='+povalue);
			//	alert('Currency=='+Currency);
				
				var PoRate = nlapiGetCurrentLineItemValue('item','porate');
			//	alert('PoRate=='+PoRate);
				
				var costType = nlapiGetCurrentLineItemValue('item','costestimatetype');
				
			//	alert('costType=='+costType);
				// PoRate =povalue;
			
				
			   if((AvgCost==null || AvgCost==undefined || AvgCost=='' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate ==null|| PoRate==''||PoRate=='0.00'))
			 	{
				   //   alert('Both are Null')
			 		  nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimate','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimaterate','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimatetype','CUSTOM',false,true);
			 			
			 	}
			    else  if((AvgCost==null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate !=null|| PoRate!=''||PoRate!=undefined))
				 	{
			 		// alert('In AvgCost is Null or 0')
			 		 if(RecType =='salesorder'  && costType=='PURCHORDERRATE')
			 		{
			 			
			 	        if(PoRate !=null && PoRate!=''  )
			 		    {
			 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 			 nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 			 
			 			 //alert('In type is chnge to po 7')
			 		    }
			 	        else
			 		    {
			 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 			 nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 			 nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
		 				  
			 			 //alert('In type is chnge to po 7')
			 		    }
			 			if(Currency=='USD' && costType=='PURCHORDERRATE')
			 			{
			 			//	alert('Currency==2');
			 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
			 				AvgCost = PoRate * rate;
			 			//	alert('Currency==2--rate'+rate);
			 			//	alert('Currency==2---AvgCost'+AvgCost);
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 				   nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			}
			 			else
			 			{
			 				AvgCost = PoRate;
			 				// alert('In CostType is po for currency != 2')
			 				var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype',EstCost,false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 				 nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
			 			     nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			} 
			 		}
			 		else if(RecType =='estimate')
			 		{
			 			var EstRate = nlapiGetCurrentLineItemValue('item','costestimaterate');//costestimaterate
			 	        if(EstRate !=null && EstRate !='')
			 		    {
			 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 			// alert('In type is chnge to po 10')
			 		    }
			 			if(Currency=='2'  && costType=='PURCHORDERRATE')
			 			{
			 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
			 				AvgCost = EstRate * rate; 
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			}
			 			else
			 			{
			 				AvgCost = EstRate;
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			} 	
			 		}
			 		
			 	}
			 	else if(AvgCost!=null && AvgCost!=undefined && AvgCost!='' )
			 	{
			 	      nlapiSetCurrentLineItemValue('item','averagecost',parseFloat(AvgCost).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimatetype','AVGCOST',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 		
			 		  if(povalue !=null && povalue!='')
			 		  {
			 			 nlapiSetCurrentLineItemValue('item','porate',parseFloat(povalue).toFixed(2),false,true);
				 	  }
			 		  else
			 		  {
			 			 nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
					  }
			 	}
			 
			 	// alert('In margin Rate ='+MarginRate)
			 	
			 	if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
			 	{
			 		
			 		var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
			 		 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
			 		// alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
			 		 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
			 		 nlapiSetCurrentLineItemValue('item','amount',NewPrice * quantity,false,true);
			 		 

					 	var newSetMarge =(parseFloat(MarginRate) /100)*100;
					 	 if(newSetMarge != null && newSetMarge != '' && newSetMarge != undefined)
					 	 {
					 		 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
					 	 }
					
			 		
			 	}

		    }
		 	
	   
		   
		   //=================================
	   }
	   
	   if(type == 'item' && name == 'porate')       //(type == 'item' && name == 'item' )||
	   {
		//   alert('FIeldChnge PORATE')
	
	   		var Currency = nlapiGetCurrentLineItemValue('item','pocurrency'); 
		   var line= nlapiGetCurrentLineItemIndex('item');
		   var Amt= nlapiGetCurrentLineItemValue('item','amount');
		   nlapiDisableLineItemField('item','costestimatetype',true,line);
		   
		   if(Amt !=null && Amt !='' && Amt !=undefined)
		   {
			   nlapiDisableLineItemField('item','custcol_display_items',true,line);
		   }
		   else
		   {
			   nlapiDisableLineItemField('item','custcol_display_items',false,line);
		   }
		//====================================   
		   
		   var item = nlapiGetCurrentLineItemValue('item','item');
		    //=========================================================================
		   if(item !=null && item !='' && item !=undefined)
		    {
		   
		        var amt = nlapiGetCurrentLineItemValue('item','amount');
			 	
			 
			 	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
			 	var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
			 	var DropVal = nlapiGetCurrentLineItemValue('item','costestimatetype');
			 	// alert('DropVal of unitRate Change=='+DropVal)
			 
			 	
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
			 			   new nlobjSearchColumn("averagecost")
			 			]
			 			);
	     	//	alert('searchresults=='+searchresults);
	     		if(searchresults != null)
	  		    {
	  		    	for (var i = 0;  i < searchresults.length; i++) 
	  			   {
	  				var AvgCost = searchresults[i].getValue("averagecost");
	  				var povalue = searchresults[i].getValue("vendorcostentered");
	  			
	  			
	  			   }
	  		    }
			 	
	     		// alert('AvgCost=='+AvgCost);
			//	alert('povalue=='+povalue);
			//	alert('Currency=='+Currency);
				
				var PoRate = nlapiGetCurrentLineItemValue('item','porate');
			//	alert('PoRate=='+PoRate);
				
				var costType = nlapiGetCurrentLineItemValue('item','costestimatetype');
				
			//	alert('costType=='+costType);
				// PoRate =povalue;

				if(costType =='LASTPURCHPRICE')
				{
					alert('PO-RATE holds the Last Purchase Price ....SO you are not allowed to Add this ITEM..');
					
				}
				
			   if((AvgCost==null || AvgCost==undefined || AvgCost=='' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate ==null|| PoRate==''||PoRate=='0.00'))
			 	{
				   //   alert('Both are Null')
			 		  nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimate','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimaterate','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimatetype','CUSTOM',false,true);
			 			
			 	}
			    else  if((AvgCost==null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00')&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate !=null|| PoRate!=''||PoRate!=undefined))
				 	{
			 		// alert('In AvgCost is Null or 0')
			 		 if(RecType =='salesorder'  )
			 		{
			 			
			 			if(PoRate !=null && PoRate!='' && costType=='PURCHORDERRATE')
			 		    {
			 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 			 nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 			 
			 			 //alert('In type is chnge to po 7')
			 		    }
			 	        else
			 		    {
			 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 			 nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 			 nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
		 				  
			 			 //alert('In type is chnge to po 7')
			 		    }
			 			if(Currency=='USD'  && costType=='PURCHORDERRATE')
			 			{
			 			//	alert('Currency==2');
			 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
			 				AvgCost = PoRate * rate;
			 			//	alert('Currency==2--rate'+rate);
			 			//	alert('Currency==2---AvgCost'+AvgCost);
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 				   nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			}
			 			else
			 			{
			 				AvgCost = PoRate;
			 				// alert('In CostType is po for currency != 2')
			 				var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype',EstCost,false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
			 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			} 
			 		}
			 		else if(RecType =='estimate')
			 		{
			 			var EstRate = nlapiGetCurrentLineItemValue('item','costestimaterate');//costestimaterate
			 	        if(EstRate !=null && EstRate !='')
			 		    {
			 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 			// alert('In type is chnge to po 10')
			 		    }
			 			if(Currency=='2'  && costType=='PURCHORDERRATE')
			 			{
			 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
			 				AvgCost = EstRate * rate; 
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			}
			 			else
			 			{
			 				AvgCost = EstRate;
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			} 	
			 		}
			 		
			 	}
			 	else if(AvgCost!=null && AvgCost!=undefined && AvgCost!='' )
			 	{
			 	      nlapiSetCurrentLineItemValue('item','averagecost',parseFloat(AvgCost).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimatetype','AVGCOST',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 		
			 		  if(povalue !=null && povalue!='')
			 		  {
			 			 nlapiSetCurrentLineItemValue('item','porate',parseFloat(povalue).toFixed(2),false,true);
				 	  }
			 		  else
			 		  {
			 			 nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
					  }
			 	}
			 
			 	// alert('In margin Rate ='+MarginRate)
			 	
			 	if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
			 	{
			 		
			 		var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
			 		 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
			 		// alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
			 		 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
			 		 nlapiSetCurrentLineItemValue('item','amount',NewPrice * quantity,false,true);
			 		 

					 	var newSetMarge =(parseFloat(MarginRate) /100)*100;
					 	 if(newSetMarge != null && newSetMarge != '' && newSetMarge != undefined)
					 	 {
					 		 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
					 	 }
					
			 		
			 	}

		    }
		   
		  
		 	
	   }
	   return true;
	}


function lineInit() {
	 
		  
		   var Amt= nlapiGetCurrentLineItemValue('item','amount');
		   nlapiDisableLineItemField('item','costestimatetype',true);
		   
		   if(Amt !=null && Amt !='' && Amt !=undefined)
		   {
			   nlapiDisableLineItemField('item','custcol_display_items',true);
		   }
		   else
		   {
			   nlapiDisableLineItemField('item','custcol_display_items',false);
		   }
	 

	}

function clientValidateLine(type)
{
	var first=0;
	  // alert('FIeldChnge PORATE')

		var Currency = nlapiGetCurrentLineItemValue('item','pocurrency'); 
	   var line= nlapiGetCurrentLineItemIndex('item');
	   var Amt= nlapiGetCurrentLineItemValue('item','amount');
	   nlapiDisableLineItemField('item','costestimatetype',true,line);
	   
	   if(Amt !=null && Amt !='' && Amt !=undefined)
	   {
		   nlapiDisableLineItemField('item','custcol_display_items',true,line);
	   }
	   else
	   {
		   nlapiDisableLineItemField('item','custcol_display_items',false,line);
	   }
	//====================================   
	   
	   var item = nlapiGetCurrentLineItemValue('item','item');
	    //=========================================================================
	   if(item !=null && item !='' && item !=undefined)
	    {
	    	
	
	    
	    //=======================================================================================
	   
	        var amt = nlapiGetCurrentLineItemValue('item','amount');
		 	
		 
		 	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
		 	var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
		 	var DropVal = nlapiGetCurrentLineItemValue('item','costestimatetype');
		 	// alert('DropVal of unitRate Change=='+DropVal)
		 
		 	
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
		 			   new nlobjSearchColumn("averagecost")
		 			]
		 			);
  	//	alert('searchresults=='+searchresults);
  		if(searchresults != null)
		    {
		    	for (var i = 0;  i < searchresults.length; i++) 
			   {
				var AvgCost = searchresults[i].getValue("averagecost");
				var povalue = searchresults[i].getValue("vendorcostentered");
			
			
			   }
		    }
		 	
  		//   alert('AvgCost=='+AvgCost);
		//	alert('povalue=='+povalue);
		//	alert('Currency=='+Currency);
			
			var PoRate = nlapiGetCurrentLineItemValue('item','porate');
		//	alert('PoRate=='+PoRate);
			
			var costType = nlapiGetCurrentLineItemValue('item','costestimatetype');
			
		//	alert('costType=='+costType);
			// PoRate =povalue;

			if(costType =='LASTPURCHPRICE')
			{
			//	alert('PO-RATE holds the Last Purchase Price ....SO you are not allowed to Add this ITEM..');
				first++;
			}
			
		   if((AvgCost==null || AvgCost==undefined || AvgCost=='' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate ==null|| PoRate==''||PoRate=='0.00'))
		 	{
			  //    alert('Both are Null')
		 		  nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
		 		  nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimate','0.00',false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimaterate','0.00',false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimatetype','CUSTOM',false,true);
		 			
		 	}
		    else   if((AvgCost==null || AvgCost==undefined || AvgCost=='' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate !=null|| PoRate!=''||PoRate!=undefined))
			 	{
		 		// alert('In AvgCost is Null or 0')
		 		 if(RecType =='salesorder'  )
		 		{
		 			
		 			if(PoRate !=null && PoRate!='' && costType=='PURCHORDERRATE')
		 		    {
		 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 			 nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
		 			 
		 			 //alert('In type is chnge to po 7')
		 		    }
		 	        else
		 		    {
		 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 			 nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
		 			 nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
	 				  
		 			 //alert('In type is chnge to po 7')
		 		    }
		 			if(Currency=='USD'  && costType=='PURCHORDERRATE')
		 			{
		 			//	alert('Currency==2');
		 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
		 				AvgCost = PoRate * rate;
		 			//	alert('Currency==2--rate'+rate);
		 			//	alert('Currency==2---AvgCost'+AvgCost);
		 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 				   nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			}
		 			else
		 			{
		 				AvgCost = PoRate;
		 				// alert('In CostType is po for currency != 2')
		 				var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
		 				  nlapiSetCurrentLineItemValue('item','costestimatetype',EstCost,false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 				  nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
		 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			} 
		 		}
		 		else if(RecType =='estimate')
		 		{
		 			var EstRate = nlapiGetCurrentLineItemValue('item','costestimaterate');//costestimaterate
		 	        if(EstRate !=null && EstRate !='')
		 		    {
		 			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 			// alert('In type is chnge to po 10')
		 		    }
		 			if(Currency=='2'  && costType=='PURCHORDERRATE')
		 			{
		 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
		 				AvgCost = EstRate * rate; 
		 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			}
		 			else
		 			{
		 				AvgCost = EstRate;
		 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			} 	
		 		}
		 		
		 	}
		 	else if(AvgCost!=null && AvgCost!=undefined && AvgCost!='' )
		 	{
		 	      nlapiSetCurrentLineItemValue('item','averagecost',parseFloat(AvgCost).toFixed(2),false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimatetype','AVGCOST',false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 		
		 		  if(povalue !=null && povalue!='')
		 		  {
		 			 nlapiSetCurrentLineItemValue('item','porate',parseFloat(povalue).toFixed(2),false,true);
			 	  }
		 		  else
		 		  {
		 			 nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
				  }
		 	}
		 
		 	// alert('In margin Rate ='+MarginRate)
		 	
		 	if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
		 	{
		 		
		 		var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
		 		 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
		 		// alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
		 		 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
		 		 nlapiSetCurrentLineItemValue('item','amount',NewPrice * quantity,false,true);
		 		 

				 	var newSetMarge =(parseFloat(MarginRate) /100)*100;
				 	 if(newSetMarge != null && newSetMarge != '' && newSetMarge != undefined)
				 	 {
				 		 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
				 	 }
				
		 		
		 	}

	    }
	   
	  
	 	

	
	if (first!=0)
	{
		alert("You are not permitted to add this item...Because This item holds the Last Purchase Price");
		return false;
	}
	return true;
  //============================================= 
}
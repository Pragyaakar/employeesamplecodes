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

	var newCh = 0;
	var newCh1 = 0;
	var count =0;
	
function clientPostSourcing(type, name)
{
   if(type == 'item' && name == 'amount')
   {
	 //  alert('POST source ITEM')
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
	   
	   
   }
  
}

function clientFieldChange(type, name, linenum) {


	   if(type == 'item' && name == 'amount'){
		 //  alert('FIeldChnge ITEM')
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

	   }
	   
	   if(type == 'item' && name == 'porate')   //(type == 'item' && name == 'item' )||
	   {
		  // alert('FIeldChnge PORATE')
		   
	   		var Currency = nlapiGetCurrentLineItemValue('item','pocurrency'); 
		   var line= nlapiGetCurrentLineItemIndex('item');
		   var Amt= nlapiGetCurrentLineItemValue('item','amount');
		   var qty= nlapiGetCurrentLineItemValue('item','quantity');
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
		    //	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
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
			 	
	     	//	 alert('AvgCost=='+AvgCost);
			//	alert('povalue=='+povalue);
			//	alert('Currency=='+Currency);
				
				var PoRate = nlapiGetCurrentLineItemValue('item','porate');
				// alert('PoRate=='+PoRate);
				
				var costType = nlapiGetCurrentLineItemValue('item','costestimatetype');
				
			//	alert('costType=='+costType);
				// PoRate =povalue;
				
			   if((AvgCost==null || AvgCost==undefined || AvgCost=='' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate ==null|| PoRate==''||PoRate=='0.00'))
			 	{
				     // alert('Both are Null')
			 		  nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimate','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimaterate','0.00',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimatetype','CUSTOM',false,true);
			 			
			 	}
			    else  if((AvgCost==null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate !=null|| PoRate!=''||PoRate!=undefined))
				 	{
			    	  // alert('Currency==USD ANd LAstPurchasePrice wali condition');
			    	
			    	if(RecType =='salesorder')
			 		{
			 			
			 	
			 			if(Currency=='USD'  && costType=='LASTPURCHPRICE')
			 			{
			 			    // alert('Currency==USD ANd LAstPurchasePrice');
			 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
			 				AvgCost = PoRate * rate;
			 				 
			 		
                           var hiddenCost = nlapiGetCurrentLineItemValue('item','custcol_hiden_costest_type');
                         //  alert('Currency==USD ANd LAstPurchasePrice  **** avgCost=='+AvgCost);
                         //  alert('Currency==USD ANd LAstPurchasePrice  **** hiddenCost=='+hiddenCost);
                           
			 				if(AvgCost == hiddenCost)
			 				{
			 					// alert('Currency==USD ANd LAstPurchasePrice'+'=='+'AvgCost==hiddenCost');
			 					
			 					
			 					
			 					   nlapiSetCurrentLineItemValue('item','costestimate',parseFloat( PoRate * rate * qty).toFixed(2),false,true);
				 				   nlapiSetCurrentLineItemValue('item','porate',parseFloat( PoRate).toFixed(2),false,true);
				 				   nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat( PoRate * rate).toFixed(2),false,true);
				 				 if(newCh >=2)
				 				 {
				 					// alert('part of LAstPurchasePrice==newch'+ newCh);
				 					  nlapiSetCurrentLineItemValue('item','custcol_hiden_costest_type',parseFloat( PoRate * rate).toFixed(2),false,true);
				 					  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
				 					  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat( PoRate * rate * qty).toFixed(2),false,true);
					 				  nlapiSetCurrentLineItemValue('item','porate',parseFloat( PoRate).toFixed(2),false,true);
					 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat( PoRate * rate).toFixed(2),false,true);
					 				     
				 				 }
				 				  
				 				newCh++;
			 				}
			 				else
			 				{
			 					// alert('Currency==USD ANd LAstPurchasePrice'+'=='+'AvgCost!=hiddenCost');
			 					nlapiSetCurrentLineItemValue('item','costestimate',parseFloat( PoRate * rate * qty).toFixed(2),false,true);
			 				   nlapiSetCurrentLineItemValue('item','porate',parseFloat( PoRate ).toFixed(2),false,true);
				 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat( PoRate * rate).toFixed(2),false,true);
				 				 if(newCh >=2)
				 				 {
				 					// alert(' part of LAstPurchasePrice==newch'+ newCh);
				 					nlapiSetCurrentLineItemValue('item','custcol_hiden_costest_type',parseFloat( PoRate * rate).toFixed(2),false,true);
				 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
				 					nlapiSetCurrentLineItemValue('item','costestimate',parseFloat( PoRate * rate * qty).toFixed(2),false,true);
					 				   nlapiSetCurrentLineItemValue('item','porate',parseFloat( PoRate ).toFixed(2),false,true);
						 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat( PoRate * rate).toFixed(2),false,true);
						 					     
				 				 }
						 			 newCh++;
			 				}
			 			//	alert('Currency==2---AvgCost'+AvgCost);
			 				
			 			}
			 			else if(Currency=='USD'  && costType=='PURCHORDERRATE')
			 			{
			 				// alert('Currency==USD  && costType==PURCHORDERRATE');
			 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
			 				AvgCost = PoRate * rate;
			 			//	alert('Currency==2--rate'+rate);
			 			//	alert('Currency==2---AvgCost'+AvgCost);
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
			 				   nlapiSetCurrentLineItemValue('item','porate',parseFloat(PoRate).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			}
			 			else
			 			{
			 				AvgCost = PoRate;
			 				// alert('In CostType is po for currency != 2')
			 				var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
			 				
			 				if(costType=='PURCHORDERRATE')
			 				{
			 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 				}
			 				
			 				var hiddenCost = nlapiGetCurrentLineItemValue('item','custcol_hiden_costest_type');
			 				
			 				if(AvgCost==hiddenCost)
			 				{
			 					// alert('else part of LAstPurchasePrice'+'=='+'AvgCost==hiddenCost');
			 					 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
				 				  nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
				 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
				 			     if(newCh >=2)
				 				 {
				 			    	// alert('else part of LAstPurchasePrice==newch'+ newCh);
				 					nlapiSetCurrentLineItemValue('item','custcol_hiden_costest_type',parseFloat( AvgCost).toFixed(2),false,true);
				 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
				 					 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
					 				  nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
					 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
					 			          
				 				 }
				 			     newCh++;
			 				}
			 				else
			 				{
			 					  // alert('else part of LAstPurchasePrice'+'=='+'AvgCost!=hiddenCost');
			 					 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
				 				  nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
				 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
				 			     if(newCh >=2)
				 				 {
				 			   	 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
				 				  nlapiSetCurrentLineItemValue('item','porate',parseFloat(AvgCost).toFixed(2),false,true);
				 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
				 			   nlapiSetCurrentLineItemValue('item','custcol_hiden_costest_type',parseFloat( AvgCost).toFixed(2),false,true);
				 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
				 				 }     
				 			   newCh++;
			 				}
			 				
			 			} 
			 		}
			 		
			    	//nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
			 	}
			    else  if((AvgCost==null || AvgCost==undefined || AvgCost==''  || AvgCost=='0.00')&&(povalue !=null || povalue !='' || povalue !=undefined))
			 	{
			    	// alert('In AvgCost is Null and  porate is available')

		 		 if(RecType =='salesorder')
		 		{
		 			
		 			if(PoRate !=null && PoRate!='')
		 		    {
		 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 			         nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
		 		    }
		 	        else
		 		    {
		 	       		 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 			   	nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
		 			     nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
	 				  
		 			 //alert('In type is chnge to po 7')
		 		    }
		 			if(Currency=='USD')
		 			{
		 			//	alert('Currency==2');
		 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
		 				AvgCost = PoRate * rate;
		 			//	alert('Currency==2--rate'+rate);
		 			//	alert('Currency==2---AvgCost'+AvgCost);
		 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
		 				  nlapiSetCurrentLineItemValue('item','porate',parseFloat(PoRate).toFixed(2),false,true);
		 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			}
		 			else
		 			{
		 				AvgCost = PoRate;
		 				// alert('In CostType is po for currency != 2')
		 				var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
		 			    nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
		 		      	nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
		 			    nlapiSetCurrentLineItemValue('item','porate',parseFloat(PoRate).toFixed(2),false,true);
		 			    nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		 				
		 			} 
		 		}
		 	
		 	}
			 	else if(AvgCost!=null && AvgCost!=undefined && AvgCost!='' )
			 	{
			 		// alert('AvgCost Not Null')
			 	      nlapiSetCurrentLineItemValue('item','averagecost',parseFloat(AvgCost).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimatetype','AVGCOST',false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
			 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 		
			 		 if(povalue !=null && povalue!='' && newCh1 <= 1)
			 		  {
			 			 nlapiSetCurrentLineItemValue('item','porate',parseFloat(povalue).toFixed(2),false,true);
			 			newCh1++;
				 	  }
			 		 else if((povalue ==null && povalue=='' )||(PoRate =='' && PoRate==null))
			 		 {
			 			povalue=0.00;
			 			nlapiSetCurrentLineItemValue('item','porate',parseFloat(povalue).toFixed(2),false,true);
					 }
			 		 else
			 		 {
			 			 if(newCh1 == 1)
			 			 {
			 				povalue=0.00;
				 			nlapiSetCurrentLineItemValue('item','porate',parseFloat(povalue).toFixed(2),false,true);
						  
			 			 }
			 			newCh1++;
			 		 }
			 		
			 	}
			 
			 	// alert('In margin Rate ='+MarginRate)
			 	
			 	if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
			 	{
			 		
			 		var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
			 		 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
			 		// alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
			 		 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
			 		 nlapiSetCurrentLineItemValue('item','amount',NewPrice * qty,false,true);
			 		 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
			 		 

					 	var newSetMarge =(parseFloat(MarginRate) /100)*100;
					 	 if(newSetMarge != null && newSetMarge != '' && newSetMarge != undefined)
					 	 {
					 		 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
					 	 }
					
			 		
			 	}

		    }
		 	
	   }
	  
	   //=================================== Start of quotes code =================
	   if(type == 'item' && name == 'custcol_po_rate')
	   {

			  // alert('FIeldChnge PORATE')
			   
		   		// var Currency = nlapiGetCurrentLineItemValue('item','pocurrency'); 
			   var line= nlapiGetCurrentLineItemIndex('item');
			   var Amt= nlapiGetCurrentLineItemValue('item','amount');
			   var qty= nlapiGetCurrentLineItemValue('item','quantity');
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
			    //	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
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
		  				var Currency= searchresults[i].getValue("currency","preferredVendor",null);
		  				var ItemPrice = searchresults[i].getValue("vendorcost");
		  			   }
		  		    }
				 	
		     	//	 alert('AvgCost=='+AvgCost);
				//	alert('povalue=='+povalue);
				//	alert('Currency=='+Currency);
					
					var PoRate = nlapiGetCurrentLineItemValue('item','custcol_po_rate');
					// alert('PoRate=='+PoRate);
					
					var costType = nlapiGetCurrentLineItemValue('item','costestimatetype');
					
				//	alert('costType=='+costType);
					// PoRate =povalue;
					
				   if((AvgCost==null || AvgCost==undefined || AvgCost=='' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate ==null|| PoRate==''||PoRate=='0.00'))
				 	{
					     // alert('Both are Null')
				 		  nlapiSetCurrentLineItemValue('item','porate','0.00',false,true);
				 		  nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
				 		  nlapiSetCurrentLineItemValue('item','costestimate','0.00',false,true);
				 		  nlapiSetCurrentLineItemValue('item','costestimaterate','0.00',false,true);
				 		  nlapiSetCurrentLineItemValue('item','costestimatetype','CUSTOM',false,true);
				 			
				 	}
				    else  if((AvgCost==null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00' )&&(povalue ==null || povalue =='' || povalue ==undefined)&&(PoRate !=null|| PoRate!=''||PoRate!=undefined))
					{
				    	  // alert('Currency==USD ANd LAstPurchasePrice wali condition');
				    	
				    	 if(RecType =='estimate')
				 		{
				 			
				 	
				 			if(Currency=='2'  && costType=='LASTPURCHPRICE')
				 			{
				 			    // alert('Currency==USD ANd LAstPurchasePrice');
				 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
				 				AvgCost = PoRate * rate;
				 				 
				 		
	                           var hiddenCost = nlapiGetCurrentLineItemValue('item','custcol_hiden_costest_type');
	                         //  alert('Currency==USD ANd LAstPurchasePrice  **** avgCost=='+AvgCost);
	                         //  alert('Currency==USD ANd LAstPurchasePrice  **** hiddenCost=='+hiddenCost);
	                           
				 				if(AvgCost == hiddenCost)
				 				{
				 					 alert('Currency==USD ANd LAstPurchasePrice'+'=='+'AvgCost==hiddenCost');
				 					
				 					
				 					
				 					   nlapiSetCurrentLineItemValue('item','costestimate',parseFloat( ItemPrice * rate * qty).toFixed(2),false,true);
					 				   nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat( ItemPrice).toFixed(2),false,true);
					 				   nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat( ItemPrice * rate).toFixed(2),false,true);
					 				//  nlapiSetCurrentLineItemValue('item','costestimatetype','LASTPURCHPRICE',false,true);
					 				 if(newCh >=1)
					 				 {
					 					// alert('part of LAstPurchasePrice==newch'+ newCh);
					 					  nlapiSetCurrentLineItemValue('item','custcol_hiden_costest_type',parseFloat( PoRate * rate).toFixed(2),false,true);
					 					  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
					 					  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat( PoRate * rate * qty).toFixed(2),false,true);
						 				  nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat( PoRate).toFixed(2),false,true);
						 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat( PoRate * rate).toFixed(2),false,true);
						 				     
					 				 }
					 				  
					 				newCh++;
				 				}
				 				else
				 				{
				 					// alert('Currency==USD ANd LAstPurchasePrice'+'=='+'AvgCost!=hiddenCost');
				 				   	  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat( ItemPrice * rate * qty).toFixed(2),false,true);
				 				      nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat( ItemPrice ).toFixed(2),false,true);
					 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat( ItemPrice * rate).toFixed(2),false,true);
					 				 // nlapiSetCurrentLineItemValue('item','costestimatetype','LASTPURCHPRICE',false,true);
					 				 if(newCh >=1)
					 				 {
					 					// alert(' part of LAstPurchasePrice==newch'+ newCh);
					 					 nlapiSetCurrentLineItemValue('item','custcol_hiden_costest_type',parseFloat( PoRate * rate).toFixed(2),false,true);
					 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
					 					 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat( PoRate * rate * qty).toFixed(2),false,true);
						 				 nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat( PoRate ).toFixed(2),false,true);
							 			 nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat( PoRate * rate).toFixed(2),false,true);
							 					     
					 				 }
							 			 newCh++;
				 				}
				 			//	alert('Currency==2---AvgCost'+AvgCost);
				 				
				 			}
				 			else if(Currency=='2'  && costType=='PURCHORDERRATE')
				 			{
				 				// alert('Currency==USD  && costType==PURCHORDERRATE');
				 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
				 				AvgCost = PoRate * rate;
				 			//	alert('Currency==2--rate'+rate);
				 			//	alert('Currency==2---AvgCost'+AvgCost);
				 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
				 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
				 				   nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(PoRate).toFixed(2),false,true);
				 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
				 				
				 			}
				 			else
				 			{
				 				AvgCost = PoRate;
				 				// alert('In CostType is po for currency != 2')
				 				var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
				 				
				 				if(costType=='PURCHORDERRATE')
				 				{
				 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
				 				}
				 				
				 				var hiddenCost = nlapiGetCurrentLineItemValue('item','custcol_hiden_costest_type');
				 				
				 				if(AvgCost==hiddenCost)
				 				{
				 					// alert('else part of LAstPurchasePrice'+'=='+'AvgCost==hiddenCost');
				 					 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
					 				  nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(AvgCost).toFixed(2),false,true);
					 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
					 			     if(newCh >=1)
					 				 {
					 			    	// alert('else part of LAstPurchasePrice==newch'+ newCh);
					 					nlapiSetCurrentLineItemValue('item','custcol_hiden_costest_type',parseFloat( AvgCost).toFixed(2),false,true);
					 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
					 					 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
						 				  nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(AvgCost).toFixed(2),false,true);
						 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
						 			          
					 				 }
					 			     newCh++;
				 				}
				 				else
				 				{
				 					  // alert('else part of LAstPurchasePrice'+'=='+'AvgCost!=hiddenCost');
				 					 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
					 				  nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(AvgCost).toFixed(2),false,true);
					 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
					 			     if(newCh >=1)
					 				 {
					 			   	 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
					 				  nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(AvgCost).toFixed(2),false,true);
					 			      nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
					 			   nlapiSetCurrentLineItemValue('item','custcol_hiden_costest_type',parseFloat( AvgCost).toFixed(2),false,true);
					 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
					 				 }     
					 			   newCh++;
				 				}
				 				
				 			} 
				 		}
				 		
				    	//nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
				 	}
				    else  if((AvgCost==null || AvgCost==undefined || AvgCost==''  || AvgCost=='0.00')&&(povalue !=null || povalue !='' || povalue !=undefined))
				 	{
				    //	 alert('In AvgCost is Null and  porate is available')

			 		 if(RecType =='estimate')
			 		{
			 			if(count==0)
			 			 {
			 				PoRate=povalue;
			 				count++;
			 			 }
			 			else
			 			{
			 				PoRate = nlapiGetCurrentLineItemValue('item','custcol_po_rate');
			 			}
			 			
			 			if(PoRate !=null && PoRate!='')
			 		    {
			 					 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 			         nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 		    }
			 	        else
			 		    {
			 	       		 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 			   	nlapiSetCurrentLineItemValue('item','averagecost','0.00',false,true);
			 			     nlapiSetCurrentLineItemValue('item','custcol_po_rate','0.00',false,true);
		 				  
			 			 //alert('In type is chnge to po 7')
			 		    }
			 			
			 			if(Currency=='2')
			 			{
			 			//	alert('Currency==2');
			 				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
			 				AvgCost = PoRate * rate;
			 			//	alert('Currency==2--PoRate'+PoRate);
			 			//	alert('Currency==2--rate'+rate);
			 			//	alert('Currency==2---AvgCost'+AvgCost);
			 				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(PoRate).toFixed(2),false,true);
			 				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			}
			 			else
			 			{
			 				AvgCost = PoRate;
			 				// alert('In CostType is po for currency != 2')
			 				var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
			 			    nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 		      	nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
			 			    nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(PoRate).toFixed(2),false,true);
			 			    nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
			 				
			 			} 
			 		}
			 		
			 		
			 	}
				 	else if(AvgCost!=null && AvgCost!=undefined && AvgCost!='' )
				 	{
				 		// alert('AvgCost Not Null')
				 	      nlapiSetCurrentLineItemValue('item','averagecost',parseFloat(AvgCost).toFixed(2),false,true);
				 		  nlapiSetCurrentLineItemValue('item','costestimatetype','AVGCOST',false,true);
				 		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
				 		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
				 		
				 		 if(povalue !=null && povalue!='' && newCh1 == 0)
				 		  {
				 			 nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(povalue).toFixed(2),false,true);
				 			 newCh1++;
					 	  }
				 		/* else if(((povalue ==null && povalue=='' )||(PoRate =='' && PoRate==null))) //&&(newCh1 == 0)
				 		 {
				 			povalue=0.00;
				 			nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(povalue).toFixed(2),false,true);
				 			
						 }
				 		 else
				 		 {
				 			 if(newCh1 == 1)
				 			 {
				 				povalue=0.00;
					 			nlapiSetCurrentLineItemValue('item','custcol_po_rate',parseFloat(povalue).toFixed(2),false,true);
							  
				 			 }
				 			newCh1++;
				 		 }*/
				 		
				 	}
				 
				 	// alert('In margin Rate ='+MarginRate)
				 	
				 	if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
				 	{
				 		
				 		var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
				 		 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
				 		// alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
				 		 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
				 		 nlapiSetCurrentLineItemValue('item','amount',NewPrice * qty,false,true);
				 		 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * qty).toFixed(2),false,true);
				 		 

						 	var newSetMarge =(parseFloat(MarginRate) /100)*100;
						 	 if(newSetMarge != null && newSetMarge != '' && newSetMarge != undefined)
						 	 {
						 		 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
						 	 }
						
				 		
				 	}

			    }
			 	
		   
	   }
	   
	   //========================= END of Quote porate ========================================
	   
 //================================== margin rate FieldChnge ==============
	   
	   if(type == 'item' && name == 'custcol_item_cost_percentage')   //(type == 'item' && name == 'item' )||
	   {
		        var amt = nlapiGetCurrentLineItemValue('item','amount');
		    	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
			 	var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
			 	var Currency = nlapiGetCurrentLineItemValue('item','pocurrency'); 
			 	var AvgCost= nlapiGetCurrentLineItemValue('item','averagecost');
				// alert('Currency=='+Currency);
				// alert('AvgCost=='+AvgCost);
				
			 	     if(AvgCost==null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00' )
			 		{
			 	    	  var poVal = nlapiGetCurrentLineItemValue('item','porate');
			 	    	  
			 	    	  if(poVal != null && poVal != undefined && poVal != '')
			 	    	  {
				 	    	   if(Currency=='USD')
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
					 		 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
					 	 }
					 	 
					 	  /*if(NewPrice !=null && NewPrice !='' && NewPrice !=undefined)
						   {
							   nlapiDisableLineItemField('item','custcol_display_items',true,line);
						   }
						   else
						   {
							   nlapiDisableLineItemField('item','custcol_display_items',false,line);
						   }*/
			 		
			 	}

	   }
	   
	   
	   //======================================= end of margin ================
	   
	   
	   
	   
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
  /*
   var poRate = nlapiGetCurrentLineItemValue('item','porate');
  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE');
  nlapiSetCurrentLineItemValue('item','costestimate',poRate);
  nlapiSetCurrentLineItemValue('item','costestimaterate',poRate);
  */

 //=============================================== 
  
  var item = nlapiGetCurrentLineItemValue('item','item');
	
	var amt = nlapiGetCurrentLineItemValue('item','amount');
	
	var AvgCost = nlapiGetCurrentLineItemValue('item','averagecost');
	var quantity = nlapiGetCurrentLineItemValue('item','quantity');
	var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
	var DropVal = nlapiGetCurrentLineItemValue('item','costestimatetype');
	// alert('DropVal of unitRate Change=='+DropVal)
	
	var Currency = nlapiGetCurrentLineItemValue('item','pocurrency');
	var RecType = nlapiGetRecordType();
	// alert('RecType of unitRate Change=='+RecType)
	//alert('Currency=='+Currency);
	// alert('AvgCost of unitRate Change=='+AvgCost)
	
/*	if(AvgCost == null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00')
	{
		// alert('In AvgCost is Null or 0')
		 if(RecType =='salesorder')
		{
			var PoRate = nlapiGetCurrentLineItemValue('item','porate');
	        if(PoRate !=null && PoRate!='' )
		    {
			 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
			 //alert('In type is chnge to po 7')
		    }
			if(Currency=='USD')
			{
				alert('Currency==2');
				var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
				AvgCost = PoRate * rate;
				alert('Currency==2--rate'+rate);
				alert('Currency==2---AvgCost'+AvgCost);
				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
				  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
				
			}
			else
			{
				AvgCost = PoRate;
				// alert('In CostType is po for currency != 2')
				var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
				  nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE',false,true);
				  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
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
			if(Currency=='2')
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
		
		  nlapiSetCurrentLineItemValue('item','costestimatetype','AVGCOST',false,true);
		  nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost).toFixed(2),false,true);
		  nlapiSetCurrentLineItemValue('item','costestimaterate',parseFloat(AvgCost).toFixed(2),false,true);
		
	}
	// alert('In margin Rate ='+MarginRate)
	
	if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
	{
		
		var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
		 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
		 alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
		 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
		 nlapiSetCurrentLineItemValue('item','amount',NewPrice * quantity,false,true);
		
	}

	var newSetMarge =(parseFloat(MarginRate) /100)*100;
	 if(newSetMarge != null )
	 {
		 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
	 }
	
  */
	if(newCh > 0)
	{
		 newCh = 0;
	}
	if(newCh1 > 0)
	{
		 newCh1 = 0;
	}
	
	 
	  return true;
  //============================================= 
}
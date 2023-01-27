/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Sep 2019     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */

function SCH_ItemsSalesPricingCalc(type) {
	 var itemDate = nlapiGetContext().getSetting('SCRIPT','custscript_date');
	 var itemNames = nlapiGetContext().getSetting('SCRIPT','custscript_items');
	 var Names = nlapiGetContext().getSetting('SCRIPT','custscript_name');
	 var categoryProduct = nlapiGetContext().getSetting('SCRIPT','custscript_product_cat');
	 
	  // findSupplierQtyBreak(itemNames);
	  // findProductGrpPricing(itemNames,categoryProduct);
	 
	 nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "itemDate :=   "+itemDate);
	 nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "itemNames :=   "+itemNames);
	// nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "Names :=   "+Names);
	 nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "categoryProduct :=   "+categoryProduct);
	 
	 findProductGrpWholesale1(itemNames,categoryProduct);
		
}





function findProductGrpWholesale1(itemNames,categoryProduct)
{
	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpWholesale1() :=Function Call  ");
	
	var filters=new Array();
	var columns = new Array();
	var recrddID1=[];
 
	filters[0] = new nlobjSearchFilter('custrecord_sv_pgd_product_grp', null,'anyof',categoryProduct);
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_sv_pgd_product_grp');
	columns[2] = new nlobjSearchColumn('custrecord_sv_pgd_price_level');
	columns[3] = new nlobjSearchColumn('custrecord_sv_pgd_markupdisc');
	
	var searchResultItem = nlapiSearchRecord('customrecord600', null, filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			var productGrp = searchResultItem[j].getValue('custrecord_sv_pgd_product_grp');
			var priceLevel = searchResultItem[j].getValue('custrecord_sv_pgd_price_level');
			var MarkUpOrDisc = searchResultItem[j].getValue('custrecord_sv_pgd_markupdisc');
			
			
			nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpWholesale1() := productGrp:-  "+productGrp);
			nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpWholesale1() := priceLevel:-  "+priceLevel);
			nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpWholesale1() := MarkUpOrDisc:-  "+MarkUpOrDisc);
			
		}
	}
	findProductGrpPricing(itemNames,categoryProduct,MarkUpOrDisc,priceLevel)
	
}


function findProductGrpPricing(itemNames,categoryProduct,MarkUpOrDisc,priceLevel)
{
	
	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpPricing() := Function Call  ");
	
	var markUpJson={};
	var filters=new Array();
	var columns = new Array();
	var markUpQtyArray=[];
    var markUpPercentArray=[];
    
	filters[0] = new nlobjSearchFilter('custrecord_sv_product_grp', null,'anyof',categoryProduct);
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_sv_pgp_supplier');
	columns[2] = new nlobjSearchColumn('custrecord1407');
	columns[3] = new nlobjSearchColumn('custrecord_sv_pgp_markup');
	columns[4] = new nlobjSearchColumn('custrecord_sv_product_grp');
	var searchResultItem = nlapiSearchRecord('customrecord_sv_product_grp_pricing', null, filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			var markUpQty = searchResultItem[j].getValue('custrecord1407');
			markUpQtyArray.push(markUpQty);
			
			var markUpPercent = searchResultItem[j].getValue('custrecord_sv_pgp_markup');
			markUpPercentArray.push(markUpPercent);
			
			markUpJson[markUpQty]=markUpPercent;
			
        }
	}
	
	 nlapiLogExecution('DEBUG', 'After Submit value of recrddID', "  JSON.stringify(markUpJson);==" + JSON.stringify(markUpJson));
		
	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpPricing() :=markUpQtyArray--  "+markUpQtyArray);
	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpPricing() :=markUpPercentArray--  "+markUpPercentArray);
	
	findSupplierQtyBreak(itemNames,categoryProduct,markUpJson,MarkUpOrDisc,priceLevel);
	
}




function  findSupplierQtyBreak(itemNames,categoryProduct,markUpJson,MarkUpOrDisc,priceLevel)
{
	nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Function Call:-  ");
	
	var filters=new Array();
	var columns = new Array();
	
	var filters1=new Array();
	var columns1 = new Array();
	
	var filter_Loc=[];
	var uniqueItems=[];
	
	var arrUniq =[];
	  var BasePrice;
 
	// nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := grsMargin:-  "+grsMargin);
	nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := MarkUpOrDisc:-  "+MarkUpOrDisc);
	
	
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_sv_supplier');
	columns[2] = new nlobjSearchColumn('custrecord_sv_item');
	columns[3] = new nlobjSearchColumn('custrecord_sv_quantity');
	columns[4] = new nlobjSearchColumn('custrecord_sv_price');
	columns[5] = new nlobjSearchColumn('custrecord_sv_est_lc_freight');
	columns[6] = new nlobjSearchColumn('custrecord_sv_est_lc_duty');
	
	var UniSearch = nlapiSearchRecord('customrecord_sv_supplier_qty_break', null, filters, columns);
	if (UniSearch != null)
	{
		for(var jk=0;jk<UniSearch.length;jk++)
		{
			var itemsInRec = UniSearch[jk].getValue('custrecord_sv_item');
			arrUniq.push(itemsInRec);
		}
	}
	
	
	
	
	filter_Loc = filter_array(arrUniq);
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','filter_Loc =='+filter_Loc);
			
	uniqueItems = removeDuplicates(filter_Loc);
	
	nlapiLogExecution('DEBUG','uniqueItems', " := uniqueItems:-  "+uniqueItems);	 
	
	if(uniqueItems !=null)
	{
		for(var  m=0;m<uniqueItems.length;m++)
		{	
		filters1[0] = new nlobjSearchFilter('custrecord_sv_item', null,'anyof',uniqueItems[m]);
	
	
	columns1[0] = new nlobjSearchColumn('internalid');
	columns1[1] = new nlobjSearchColumn('custrecord_sv_supplier');
	columns1[2] = new nlobjSearchColumn('custrecord_sv_item');
	columns1[3] = new nlobjSearchColumn('custrecord_sv_quantity');
	columns1[4] = new nlobjSearchColumn('custrecord_sv_price');
	columns1[5] = new nlobjSearchColumn('custrecord_sv_est_lc_freight');
	columns1[6] = new nlobjSearchColumn('custrecord_sv_est_lc_duty');
	columns1[7] = new nlobjSearchColumn('custrecord_item_type');
	
	
	
	
	var searchResultItem = nlapiSearchRecord('customrecord_sv_supplier_qty_break', null, filters1, columns1);
	
	nlapiLogExecution('DEBUG','uniqueItems', " := searchResultItem.length:-  "+ searchResultItem.length);	
	

   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			var intId = searchResultItem[j].getValue('internalid');
			var Qty = searchResultItem[j].getValue('custrecord_sv_quantity');
			var Price = searchResultItem[j].getValue('custrecord_sv_price');
			var LC_Freight = searchResultItem[j].getValue('custrecord_sv_est_lc_freight');
			var LC_Duty = searchResultItem[j].getValue('custrecord_sv_est_lc_duty');
			
			var itmType = searchResultItem[j].getValue('custrecord_item_type');
			
			var itmFromRec = searchResultItem[j].getValue('custrecord_sv_item');
			
			if(uniqueItems[m]==itmFromRec)
			{
		    var RRP0;
		    var AddAmt=0;
		  
		    var wholeSale1,wholeSale2;
		    var wholeSalePrice1,wholeSalePrice2;
		    
		   // wholeSale1=parseFloat(MarkUpOrDisc)/100;
		   // wholeSale2=parseFloat(grsMargin)/100;
		    
		    nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := itmType:-  "+itmType);
		    
		  
		    
		    
		    nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Qty:-  "+Qty);
		    nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Price:-  "+Price);
		    nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := LC_Freight:-  "+LC_Freight);
		    nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := LC_Duty:-  "+LC_Duty);
		    
		    if(Price !=null && Price!='' && Price!= undefined)
		    {
		    	Price=parseFloat(Price);
		    }
		    else
		    {
		    	Price =0.00;
		    }
		    
		    if(LC_Freight !=null && LC_Freight !='' && LC_Freight != undefined)
		    {
		    	LC_Freight=parseFloat(LC_Freight);
		    }
		    else
		    {
		    	LC_Freight =0.00;
		    }
		    
		    if(LC_Duty !=null && LC_Duty !='' && LC_Duty != undefined)
		    {
		    	LC_Duty =parseFloat(LC_Duty);
		    }
		    else
		    {
		    	LC_Duty =0.00;
		    }
		    
		    AddAmt= parseFloat(Price+LC_Freight+LC_Duty);
		    
		    for ( var key in markUpJson) 
		    { 
		    	    if(key == Qty)
		    		{
		    	    	  nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- AddAmt:-"+AddAmt);
		    	    	  var mrkup =parseFloat(1)+(parseFloat(markUpJson[key])/100);
		    	    	  nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', " := :- mrkup:-"+mrkup);
		    	          RRP0 = parseFloat(AddAmt)*parseFloat(mrkup);
		    	    	  nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- RRP0:-"+RRP0);
		    	    	  
		    	    	  if(Qty==0 || Qty==1 )
		    	    	  {
		    	    		  BasePrice=RRP0;
		    	    	  }
		    	    	  
		    	    	 
		    	    	  
		    	    	    wholeSalePrice1=parseFloat(MarkUpOrDisc/100)*parseFloat(BasePrice);
		    			    
		    			    wholeSalePrice2=parseFloat(MarkUpOrDisc/100)*parseFloat(BasePrice);
		    			    
		    			    
		    			    if(priceLvl == 9)
		    			    {
		    			    	if(RRP0 > wholeSalePrice1)
				    	    	  {
		    			    		RRP0 =parseFloat(wholeSalePrice1).toFixed(2);
				    	    	  }
				    	    	  else
				    	    	  {
				    	    		  RRP0 =parseFloat(RRP0).toFixed(2);
				    	    	  }
				    	    	  
		    			    }
		    			    else if(priceLvl == 10)
		    			    {
		    			    	if(RRP0 > wholeSalePrice2)
				    	    	  {
		    			    		RRP0 =parseFloat(wholeSalePrice2).toFixed(2);
				    	    	  }
				    	    	  else
				    	    	  {
				    	    		  RRP0 =parseFloat(RRP0).toFixed(2);
				    	    	  }
		    			    }
		    			    
			    	    	  
			    	    	  
		    	    	  
		    	    	 // nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- wholeSalePrice1:-"+wholeSalePrice1);
			    	    	 
		    	    	 // nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- wholeSalePrice2:-"+wholeSalePrice2);
			    	    	 
		    	    	 if(RRP0 < 0)
		    	    	 {
		    	    		 RRP0 = -parseFloat(RRP0);
		    	    	 }
		    	    	  
		    	    	/* if(wholeSalePrice1 < 0)
		    	    	 {
		    	    		 wholeSalePrice1 = -parseFloat(wholeSalePrice1);
		    	    	 }
		    	    	 if(wholeSalePrice2 < 0)
		    	    	 {
		    	    		 wholeSalePrice2 = -parseFloat(wholeSalePrice2);
		    	    	 }
*/
						
		    	    	 
		    	    	 
		    	    	 var itemObj=nlapiLoadRecord('inventoryitem',itmFromRec);
		    	    	 
		    	    	 
		    	    	 
		    	    	 
							
	      					var linecount1=itemObj.getLineItemCount('price1');
	      					//nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- linecount1:-"+linecount1);
	      					
	      					var linecount2=itemObj.getLineItemCount('price2');
	      					//nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- linecount2:-"+linecount2);
	      					
	      					var linecount3=itemObj.getLineItemCount('price3');
	      					//nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- linecount3:-"+linecount3);
	      					
	      					var linecount4=itemObj.getLineItemCount('price4');
	      					//nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- linecount4:-"+linecount4);
	      					
	      					var linecount5=itemObj.getLineItemCount('price5');
	      					//nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- linecount5:-"+linecount5);
	      					
	      					var linecount6=itemObj.getLineItemCount('price6');
	      					//nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- linecount6:-"+linecount6);
	      					
	      					
	      				
	      					
	      					
							for (var y = 1; y <= linecount1; y++)
							{
								var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
								
								 if (priceLevel == priceLvl)
									 {	
									 
					    	    	 
									 nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- priceLevel == priceLvl:-"+(priceLevel == priceLvl));
									    
										if (Qty == 1 ||Qty == 0)
										{
											itemObj.setLineItemValue('price1', 'price_1_', y,parseFloat(RRP0).toFixed(2));
												
									    }
										else if(Qty == 10)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity2');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity2',key);
					      						
					      					}
					      					
											itemObj.setLineItemValue('price1', 'price_2_', y,parseFloat(RRP0).toFixed(2));
										}
										else if (Qty == 25)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity3');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity3',key);
					      						
					      					}
					      					
											itemObj.setLineItemValue('price1', 'price_3_', y,parseFloat(RRP0).toFixed(2));
												
									    }
										else if(Qty == 50)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity4');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity4',key);
					      						
					      					}
					      					
											itemObj.setLineItemValue('price1', 'price_4_', y,parseFloat(RRP0).toFixed(2));
										}
										else if(Qty == 100)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity5');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity5',key);
					      						
					      					}
					      					
											itemObj.setLineItemValue('price1', 'price_5_', y,parseFloat(RRP0).toFixed(2));
										}
										else if (Qty == 250)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity6');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity6',key);
					      						
					      					}
					      					
											itemObj.setLineItemValue('price1', 'price_6_', y,parseFloat(RRP0).toFixed(2));
												
									    }
										else if(Qty == 500)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity7');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity7',key);
					      						
					      					}
					      					
											itemObj.setLineItemValue('price1', 'price_7_', y,parseFloat(RRP0).toFixed(2));
										}
										else if(Qty == 1000)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity8');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity8',key);
					      						
					      					}
											itemObj.setLineItemValue('price1', 'price_8_', y,parseFloat(RRP0).toFixed(2));
										}
										else if(Qty == 2500)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity9');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity9',key);
					      						
					      					}
					      					
											itemObj.setLineItemValue('price1', 'price_9_', y,parseFloat(RRP0).toFixed(2));
										}
										else if(Qty ==5000)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity10');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity10',key);
					      						
					      					}
					      					
											itemObj.setLineItemValue('price1', 'price_10_', y,parseFloat(RRP0).toFixed(2));
										}
										else if(Qty ==10000)
										{
											var qtyLevel =itemObj.getFieldValue('price1quantity11');
					      					
					      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
					      					{
					      						itemObj.setFieldValue('price1quantity11',key);
					      						
					      					}
					      					
					      					 itemObj.setLineItemValue('price1', 'price_11_', y,parseFloat(RRP0).toFixed(2));
										}
							   } // End Of Price Level
							 /* else if(priceLevel == 9)	 
							  {
								 
				    	    	  
								  if (Qty == 1 ||Qty == 0)
									{
										 itemObj.setLineItemValue('price1', 'price_1_', y,parseFloat(wholeSalePrice1).toFixed(2));
												
								    }
									else if(Qty == 10)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity2');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity2',key);
				      						
				      					}
				      					
				      					itemObj.setLineItemValue('price1', 'price_2_', y,parseFloat(wholeSalePrice1).toFixed(2));
									}
									else if (Qty == 25)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity3');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity3',key);
				      						
				      					}
				      					
				      					
										  itemObj.setLineItemValue('price1', 'price_3_', y,parseFloat(wholeSalePrice1).toFixed(2));
											
								    }
									else if(Qty == 50)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity4');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity4',key);
				      						
				      					}
				      					
				      					
										  itemObj.setLineItemValue('price1', 'price_4_', y,parseFloat(wholeSalePrice1).toFixed(2));
									}
									else if(Qty == 100)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity5');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity5',key);
				      						
				      					}
				      				
										  itemObj.setLineItemValue('price1', 'price_5_', y,parseFloat(wholeSalePrice1).toFixed(2));
									}
									else if (Qty == 250)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity6');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity6',key);
				      						
				      					}
				      					
				      				
										  itemObj.setLineItemValue('price1', 'price_6_', y,parseFloat(wholeSalePrice1).toFixed(2));	
								    }
									else if(Qty == 500)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity7');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity7',key);
				      						
				      					}
				      					
				      					
										  itemObj.setLineItemValue('price1', 'price_7_', y,parseFloat(wholeSalePrice1).toFixed(2));
									}
									else if(Qty == 1000)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity8');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity8',key);
				      						
				      					}
				      					 
										  itemObj.setLineItemValue('price1', 'price_8_', y,parseFloat(wholeSalePrice1).toFixed(2));
									}
									else if(Qty == 2500)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity9');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity9',key);
				      						
				      					}
				      					
				      					 itemObj.setLineItemValue('price1', 'price_9_', y,parseFloat(wholeSalePrice1).toFixed(2));
									}
									else if(Qty ==5000)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity10');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity10',key);
				      						
				      					}
				      					
				      					 itemObj.setLineItemValue('price1', 'price_10_', y,parseFloat(wholeSalePrice1).toFixed(2));
									}
									else if(Qty ==10000)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity11');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity11',key);
				      						
				      					}
				      					
				      					 itemObj.setLineItemValue('price1', 'price_11_', y,parseFloat(wholeSalePrice1).toFixed(2));
									}
						   
								  	
							   }
							 else if(priceLevel == 10)
								 {
						
									
							    	 if (Qty == 1 ||Qty == 0)
									{
										 itemObj.setLineItemValue('price1', 'price_1_', y,parseFloat(wholeSalePrice2).toFixed(2));
												
								    }
									else if(Qty == 10)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity2');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity2',key);
				      						
				      					}
				      					
				      					itemObj.setLineItemValue('price1', 'price_2_', y,parseFloat(wholeSalePrice2).toFixed(2));
									}
									else if (Qty == 25)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity3');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity3',key);
				      						
				      					}
				      					
				      					
										  itemObj.setLineItemValue('price1', 'price_3_', y,parseFloat(wholeSalePrice2).toFixed(2));
											
								    }
									else if(Qty == 50)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity4');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity4',key);
				      						
				      					}
				      					
				      					
										  itemObj.setLineItemValue('price1', 'price_4_', y,parseFloat(wholeSalePrice2).toFixed(2));
									}
									else if(Qty == 100)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity5');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity5',key);
				      						
				      					}
				      				
										  itemObj.setLineItemValue('price1', 'price_5_', y,parseFloat(wholeSalePrice2).toFixed(2));
									}
									else if (Qty == 250)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity6');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity6',key);
				      						
				      					}
				      					
				      				
										  itemObj.setLineItemValue('price1', 'price_6_', y,parseFloat(wholeSalePrice2).toFixed(2));	
								    }
									else if(Qty == 500)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity7');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity7',key);
				      						
				      					}
				      					
				      					
										  itemObj.setLineItemValue('price1', 'price_7_', y,parseFloat(wholeSalePrice2).toFixed(2));
									}
									else if(Qty == 1000)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity8');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity8',key);
				      						
				      					}
				      					 
										  itemObj.setLineItemValue('price1', 'price_8_', y,parseFloat(wholeSalePrice2).toFixed(2));
									}
									else if(Qty == 2500)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity9');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity9',key);
				      						
				      					}
				      					
				      					 itemObj.setLineItemValue('price1', 'price_9_', y,parseFloat(wholeSalePrice2).toFixed(2));
									}
									else if(Qty ==5000)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity10');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity10',key);
				      						
				      					}
				      					
				      					 itemObj.setLineItemValue('price1', 'price_10_', y,parseFloat(wholeSalePrice2).toFixed(2));
									}
									else if(Qty ==10000)
									{
										var qtyLevel =itemObj.getFieldValue('price1quantity11');
				      					
				      					if(qtyLevel==''||qtyLevel==undefined||qtyLevel==null)
				      					{
				      						itemObj.setFieldValue('price1quantity11',key);
				      						
				      					}
				      					
				      					 itemObj.setLineItemValue('price1', 'price_11_', y,parseFloat(wholeSalePrice2).toFixed(2));
									}
						   
								 	
								 }
								 */
			   				 }//end of for loop
		    	    	
		    		}
		    }
		
		    nlapiSubmitRecord(itemObj);
		} //End OF Items == uniqueItem
		}
	}
	 
	}// END of FOr(uniqueItems)
 }// END if(uniqueItems)
	
}


function filter_array(test_array) 
{
	 var index = -1,
	 arr_length = test_array ? test_array.length : 0,
	 resIndex = -1,
	 result = [];

	 while (++index < arr_length) 
	 {
		 var value = test_array[index];
		 if(value)
		 {
			result[++resIndex] = value;
		  }
	 }
return result;
}



function removeDuplicates(num) 
{
	  var x,
		  len=num.length,
		  out=[],
		  obj={};
	 
	  for (x=0; x<len; x++) 
	  {
		obj[num[x]]=0;
	  }
	  for (x in obj) 
	  {
		out.push(x);
	  }
	  return out;
	}
		
	
function User_AfterSubmitItemUpdate(type, form, request)
{
  try
  {
	  if(nlapiGetContext().getExecutionContext() == 'userinterface')
		 {
			
		  var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		     
		     var obj =nlapiLoadRecord(recordType,recordId);
		     
		     var productCategory = obj.getFieldValue('custrecord_sv_pgd_productgrp_itm');
		      var item =  obj.getFieldValue('custrecord_sv_item');
		      var itemType =  obj.getFieldValue('custrecord_item_type');
		
	
		      findProductGrpWholesale1(item,productCategory,itemType);
		 }
  }
  catch(e)
  {
	  nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "ERROR :="+e);
		 
  }
		    
}



function findProductGrpWholesale1(itemNames,categoryProduct,itemType)
{
	 nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpWholesale1() :=Function Call  ");
	
	var filters=new Array();
	var columns = new Array();
	var recrddID1=[];
    var DiscountMap ={};
	filters[0] = new nlobjSearchFilter('custrecord_sv_pgd_product_grp', null,'anyof',categoryProduct);
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_sv_pgd_product_grp');
	columns[2] = new nlobjSearchColumn('custrecord_sv_pgd_price_level').setSort(false);
	columns[3] = new nlobjSearchColumn('custrecord_sv_pgd_markupdisc');
	
	var searchResultItem = nlapiSearchRecord('customrecord600', null, filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			var productGrp = searchResultItem[j].getValue('custrecord_sv_pgd_product_grp');
			var priceLevel = searchResultItem[j].getValue('custrecord_sv_pgd_price_level');
			var MarkUpOrDisc = searchResultItem[j].getValue('custrecord_sv_pgd_markupdisc');
			
			DiscountMap[priceLevel]=MarkUpOrDisc;
			
		//	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpWholesale1() := productGrp:-  "+productGrp);
		//	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpWholesale1() := priceLevel:-  "+priceLevel);
		//	nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpWholesale1() := MarkUpOrDisc:-  "+MarkUpOrDisc);
			
		}
	}
	findProductGrpPricing(itemNames,categoryProduct,DiscountMap,priceLevel,itemType)
	
}



function findProductGrpPricing(itemNames,categoryProduct,DiscountMap,priceLevel,itemType)
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
	
	// nlapiLogExecution('DEBUG', 'After Submit value of recrddID', "  JSON.stringify(markUpJson);==" + JSON.stringify(markUpJson));
		
	//nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpPricing() :=markUpQtyArray--  "+markUpQtyArray);
	//nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', "findProductGrpPricing() :=markUpPercentArray--  "+markUpPercentArray);
	
	findSupplierQtyBreak(itemNames,categoryProduct,markUpJson,DiscountMap,priceLevel,itemType);
	
}




function  findSupplierQtyBreak(itemNames,categoryProduct,markUpJson,DiscountMap,priceLevel,itemType)
{
	var priceLVL;
	priceLVL =priceLevel;
	nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Function Call:-  "+priceLVL);
	
	var filters=new Array();
	var columns = new Array();
	
	var filters1=new Array();
	var columns1 = new Array();
	
	var filter_Loc={};
	var uniqueItems={};

	var newArray ;
	var newArray1;
	var arrUniq ={};
	  var BasePrice;
 
	//nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := grsMargin:-  "+grsMargin);
	//nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := MarkUpOrDisc:-  "+MarkUpOrDisc);
	var num=1;
	

	
	
		var Current =new Date();
		var month1 = Current.getMonth() + 1;
	
	var day1 = Current.getDate();
	
	var year1 = Current.getFullYear();
	
	var d1 = day1+ "/"+month1 +"/" +year1;

	// nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- d1:-"+d1);
		
	var RateNZ = nlapiExchangeRate('NZD','AUD', d1); 
	
	

	
filters1[0] = new nlobjSearchFilter('custrecord_sv_item', null,'anyof',itemNames);


columns1[0] = new nlobjSearchColumn('internalid');
columns1[1] = new nlobjSearchColumn('custrecord_sv_supplier');
columns1[2] = new nlobjSearchColumn('custrecord_sv_item');
columns1[3] = new nlobjSearchColumn('custrecord_sv_quantity').setSort(false);
columns1[4] = new nlobjSearchColumn('custrecord_sv_price');
columns1[5] = new nlobjSearchColumn('custrecord_sv_est_lc_freight');
columns1[6] = new nlobjSearchColumn('custrecord_sv_est_lc_duty');
columns1[7] = new nlobjSearchColumn('custrecord_item_type');
columns1[8] = new nlobjSearchColumn('custrecord_supplier_currency');
columns1[9] = new nlobjSearchColumn('custrecord_rec_rrp_override');





var searchResultItem = nlapiSearchRecord('customrecord_sv_supplier_qty_break', null, filters1, columns1);

nlapiLogExecution('DEBUG','uniqueItems', " := itemNames:-  "+ itemNames);

if(itemType == 'Inventory Item')
{
 var itemObj=nlapiLoadRecord('inventoryitem',itemNames);
}
else if(itemType =='Assembly/Bill of Materials')
{
 var itemObj=nlapiLoadRecord('assemblyitem',itemNames);	 
}


if (searchResultItem != null)
{
for(var j=0;j<searchResultItem.length;j++)
{
	var intId = searchResultItem[j].getValue('internalid');
	var Qty = searchResultItem[j].getValue('custrecord_sv_quantity');
	var Price = searchResultItem[j].getValue('custrecord_sv_price');
	var LC_Freight = searchResultItem[j].getValue('custrecord_sv_est_lc_freight');
	var LC_Duty = searchResultItem[j].getValue('custrecord_sv_est_lc_duty');
	
	
	
	var itmFromRec = searchResultItem[j].getValue('custrecord_sv_item');
	var RRPOverride = searchResultItem[j].getValue('custrecord_rec_rrp_override');//custrecord_rec_rrp_override
	var SupplyCurrency = searchResultItem[j].getText('custrecord_supplier_currency');
	if(itemNames==itmFromRec)
	{
    var RRP0;
    var AddAmt=0;
  
    var wholeSale1,wholeSale2;
    var wholeSalePrice1,wholeSalePrice2;
    
  /*  wholeSale1=parseFloat(MarkUpOrDisc)/100;
    wholeSale2=parseFloat(grsMargin)/100;
    */
    nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := RRPOverride:-  "+RRPOverride);
    
    if(SupplyCurrency !='AUD' && SupplyCurrency!=null)
	   {
		   var RateAUD = nlapiExchangeRate(SupplyCurrency,'AUD', d1);
	//	   nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := RateAUD:-  "+RateAUD);
		    
		   if(Price !=null && Price!='' && Price!= undefined)
		    {
		    	Price=parseFloat(Price * RateAUD);
		    }
	   }
    
    var newRRp;
   // nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Qty:-  "+Qty);
   // nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Price:-  "+Price);
   // nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := LC_Freight:-  "+LC_Freight);
   // nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := LC_Duty:-  "+LC_Duty);
    
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
    
    AddAmt=Math.round(parseFloat(Price+LC_Freight+LC_Duty) * 100) / 100;//+LC_Freight+LC_Duty
	
	
	 
	var h=0;
    for ( var key in markUpJson) 
    { 
    	    if(key == Qty)
    		{
    	    	
                   
				
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
					
				
				//nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- RateNZ:-"+RateNZ);
					
					// var RateNZ =0.927; 
					
					
			  for (var level in DiscountMap)
    	    {
            
			    	  var mrkup =(parseFloat(1)-(parseFloat(markUpJson[key])/100));
			    	
			          RRP0 = parseFloat(AddAmt)/parseFloat(mrkup);
			    	 // nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- RRP0:-"+RRP0);
			    	  
			  
			    	 
				    	
			    	   if(level  != '9' && level != '10' )
	    			    {
						   if(level  =='1' )
						   {
							   if((RRPOverride =='' ||RRPOverride ==null || RRPOverride ==undefined))
							   {
								   var disc=parseFloat(DiscountMap[level]/100)*parseFloat(RRP0);
								   if(disc < 0)
								   {
									   disc=parseFloat(-disc);
								   }
								   
								   
								   RRP0 =parseFloat(RRP0)-parseFloat(disc);
							   }
							   else
							   {
									   RRP0 =parseFloat(RRPOverride);
							   }
							   
							   if(Qty==0 || Qty==1 )
						    	  {
						    		  BasePrice=RRP0;
						    	  }
							   else
							   {
								   if(RRP0 > BasePrice)
								   {
									   RRP0 =parseFloat(BasePrice);
								   }
								   else
								   {
									   RRP0 =parseFloat(RRP0);
								   }
							   }
							  
							   
							   RRPsetM =parseFloat(RRP0).toFixed(2);
						   }
						   else
						   {

							   
							   if(Qty==0 || Qty==1 )
						    	  {   
								  
									   if(parseFloat(DiscountMap[level]) < 0)
									   {
										   var disc=(parseFloat(1)+(parseFloat(DiscountMap[level])/100))* BasePrice;
									   }
									   else
									   {
										   var disc=(parseFloat(1)-(parseFloat(DiscountMap[level])/100))* BasePrice;
									   }
									   
									   nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- disc:-"+disc+'  BasePrice='+BasePrice);
					    		    	
									     RRP0 =parseFloat(disc);
									    newRRp =parseFloat(disc);
									    nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- newRRp:-"+newRRp+'  level='+level);
					    		    	
						    	  }
							   else
							   {
								   if(RRP0 > newRRp)
								   {
									   RRP0 =parseFloat(newRRp);
								   }
								   else
								   {
									   RRP0 =parseFloat(RRP0);
								   }
								   
							   }
						   
						   }
						   
						  
					
	    			    	// nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- RRP0:-"+RRP0+'  level='+level);
	    			    		
	    			    }
					   else if(level == '9')
	    			    {
						  
							   var vl1 =parseFloat(DiscountMap[level]/100)*parseFloat(BasePrice);
				    			  
		      					 if(vl1 < 0)
								   {
		      						 vl1= - parseFloat(vl1);
								   }
		      					  
		      					wholeSalePrice1=parseFloat(BasePrice)-parseFloat(vl1);
		      					
	      					// nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- RRP0:-"+RRP0+'  wholeSalePrice1='+wholeSalePrice1);
	    		    		
		    			    	if(RRP0 > wholeSalePrice1)
				    	    	  {
		    			    		RRP0 =parseFloat(wholeSalePrice1).toFixed(2);
				    	    	  }
				    	    	  else
				    	    	  {
				    	    		  RRP0 =parseFloat(RRP0).toFixed(2);
				    	    	  }
						  
						  
	    			    	// nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- RRP0:-"+RRP0+'  level='+level);
	    		    		
	    			    }
	    			    else if(level == '10')
	    			    {
	    			    		var vl2 =parseFloat(DiscountMap[level]/100)*parseFloat(BasePrice);
					    			  
			      					 if(vl2 < 0)
									   {
			      						vl2= - parseFloat(vl2);
									   }
			      					  
			      					wholeSalePrice2=parseFloat(BasePrice)-parseFloat(vl2);
			      					
			    			    	 if(RRP0 > wholeSalePrice2)
					    	    	  {
			    			    		RRP0 =parseFloat(wholeSalePrice2).toFixed(2);
					    	    	  }
					    	    	  else
					    	    	  {
					    	    		  RRP0 =parseFloat(RRP0).toFixed(2);
					    	    	  }
							 
	    			    	// nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- RRP0:-"+RRP0+'  level='+level);
	    		    		
	    			    }
			    	   
				    	  
				
				for (var y = 1; y <= linecount1; y++)
				{
				  try{
					var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
					
					var qtyLevel1 =itemObj.getFieldValue('price1quantity1');
					var qtyLevel2 =itemObj.getFieldValue('price1quantity2');
					var qtyLevel3 =itemObj.getFieldValue('price1quantity3');
					var qtyLevel4 =itemObj.getFieldValue('price1quantity4');
					var qtyLevel5 =itemObj.getFieldValue('price1quantity5');
					var qtyLevel6 =itemObj.getFieldValue('price1quantity6');
					var qtyLevel7 =itemObj.getFieldValue('price1quantity7');
					var qtyLevel8 =itemObj.getFieldValue('price1quantity8');
					var qtyLevel9 =itemObj.getFieldValue('price1quantity9');
					var qtyLevel10 =itemObj.getFieldValue('price1quantity10');
					var qtyLevel11 =itemObj.getFieldValue('price1quantity11');
					 
      			
					
						 if (priceLevel == level)
						 {	
							// nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := AddAmt:-  "+AddAmt);
							 // nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', " := :- mrkup:-"+mrkup);
		    			   // nlapiLogExecution('DEBUG','SCH_ItemsSalesPricingCalc', ":= :- RRP0:-"+RRP0+'  level='+level);
		    		    		 
			    	  
						   if(RRP0 < 0)
			    	    	 {
			    	    		 RRP0 = -parseFloat(RRP0);
			    	    	 }
		    			  
					
		    			    
							if ((Qty == qtyLevel1||Qty ==1 ||Qty ==0)&&(qtyLevel1!=null && qtyLevel1 !='' && qtyLevel1!= undefined))
							{
								//	 
								if(Qty ==0)
								{
									itemObj.setLineItemValue('price1', 'price_1_', y,parseFloat(RRP0).toFixed(2));
									// itemObj.setLineItemValue('price5', 'price_1_', y,parseFloat(RRP0*RateNZ).toFixed(2));
									
								}
								else if(Qty ==1)
								{
									itemObj.setLineItemValue('price1', 'price_1_', y,parseFloat(RRP0).toFixed(2));
									// itemObj.setLineItemValue('price5', 'price_1_', y,parseFloat(RRP0*RateNZ).toFixed(2));
									itemObj.setLineItemValue('price1', 'price_2_', y,parseFloat(RRP0).toFixed(2));
									// itemObj.setLineItemValue('price5', 'price_2_', y,parseFloat(RRP0*RateNZ).toFixed(2));
									
								}
									
						    }
							else if((Qty == qtyLevel2)&&(qtyLevel2!=null && qtyLevel2 !='' && qtyLevel2!= undefined))
							{
								//  nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel2:-"+qtyLevel2);
									
								itemObj.setLineItemValue('price1', 'price_2_', y,parseFloat(RRP0).toFixed(2));
								// itemObj.setLineItemValue('price5', 'price_2_', y,parseFloat(RRP0*RateNZ).toFixed(2));
							}
							else if ((Qty == qtyLevel3 )&&(qtyLevel3!=null && qtyLevel3 !='' && qtyLevel3 != undefined))
							{
								// nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel3:-"+qtyLevel3);
								
								itemObj.setLineItemValue('price1', 'price_3_', y,parseFloat(RRP0).toFixed(2));
								// itemObj.setLineItemValue('price5', 'price_3_', y,parseFloat(RRP0*RateNZ).toFixed(2));
									
						    }
							else if((Qty == qtyLevel4)&&(qtyLevel4 !=null && qtyLevel4 !='' && qtyLevel4 != undefined))
							{
								// nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel4:-"+qtyLevel4);
								
								itemObj.setLineItemValue('price1', 'price_4_', y,parseFloat(RRP0).toFixed(2));
								// itemObj.setLineItemValue('price5', 'price_4_', y,parseFloat(RRP0*RateNZ).toFixed(2));
							}
							else if((Qty == qtyLevel5)&&(qtyLevel5 !=null && qtyLevel5 !='' && qtyLevel5 != undefined))
							{
								// nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel5:-"+qtyLevel5);
								
								itemObj.setLineItemValue('price1', 'price_5_', y,parseFloat(RRP0).toFixed(2));
								// itemObj.setLineItemValue('price5', 'price_5_', y,parseFloat(RRP0*RateNZ).toFixed(2));
							}
							else if ((Qty == qtyLevel6)&&(qtyLevel6 !=null && qtyLevel6 !='' && qtyLevel6 != undefined))
							{
								// nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel6:-"+qtyLevel6);
								
								itemObj.setLineItemValue('price1', 'price_6_', y,parseFloat(RRP0).toFixed(2));
								// itemObj.setLineItemValue('price5', 'price_6_', y,parseFloat(RRP0*RateNZ).toFixed(2));
									
						    }
							else if((Qty == qtyLevel7)&&(qtyLevel7!=null && qtyLevel7 !='' && qtyLevel7!= undefined))
							{
								// nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel7:-"+qtyLevel7);
								
								itemObj.setLineItemValue('price1', 'price_7_', y,parseFloat(RRP0).toFixed(2));
								// itemObj.setLineItemValue('price5', 'price_7_', y,parseFloat(RRP0*RateNZ).toFixed(2));
							}
							else if((Qty == qtyLevel8)&&(qtyLevel8!=null && qtyLevel8 !='' && qtyLevel8!= undefined))
							{
								// nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel8:-"+qtyLevel8);
								
								itemObj.setLineItemValue('price1', 'price_8_', y,parseFloat(RRP0).toFixed(2));
								// itemObj.setLineItemValue('price5', 'price_8_', y,parseFloat(RRP0*RateNZ).toFixed(2));
							}
							else if((Qty == qtyLevel9)&&(qtyLevel9!=null && qtyLevel9 !='' && qtyLevel9!= undefined))
							{
								// nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel9:-"+qtyLevel9);
								
								itemObj.setLineItemValue('price1', 'price_9_', y,parseFloat(RRP0).toFixed(2));
								// itemObj.setLineItemValue('price5', 'price_9_', y,parseFloat(RRP0*RateNZ).toFixed(2));
							}
							else if((Qty == qtyLevel10)&&(qtyLevel10!=null && qtyLevel10 !='' && qtyLevel10!= undefined))
							{
								// nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel10:-"+qtyLevel10);
								
								itemObj.setLineItemValue('price1', 'price_10_', y,parseFloat(RRP0).toFixed(2));
								// itemObj.setLineItemValue('price5', 'price_10_', y,parseFloat(RRP0*RateNZ).toFixed(2));
							}
							else if((Qty == qtyLevel11)&&(qtyLevel11!=null && qtyLevel11 !='' && qtyLevel11!= undefined))
							{
								// nlapiLogExecution('DEBUG',' priceLevel == priceLvl ', ":= :- qtyLevel11:-"+qtyLevel11);
								
		      					 itemObj.setLineItemValue('price1', 'price_11_', y,parseFloat(RRP0).toFixed(2));
		      					 // itemObj.setLineItemValue('price5', 'price_11_', y,parseFloat(RRP0*RateNZ).toFixed(2));
							}
				     }
					
					
					
				 // End Of Price Level

					// RRPset[intId]=RRP0;
				 }
				catch(e)
				{
					continue;
				}
   				 }//end of for loop
					
				
				  nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_rec_rrp',RRPsetM);
    	    }			
			
		
}
    }

   
} //End OF Items == uniqueItem
	
	var remainingUsage = nlapiGetContext().getRemainingUsage();
	if (remainingUsage < 50) {
		nlapiYieldScript();
	}
}
}
nlapiSubmitRecord(itemObj);
//nlapiLogExecution('DEBUG',' Items Done', ":= :-Unique Item -"+parseFloat(num++));


	

	
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
		

function checkDuplicateInObject(propertyName, inputArray) {
	  var seenDuplicate = false,
	      testObject = {};

	  inputArray.map(function(item) {
	    var itemPropertyName = item[propertyName];    
	    if (itemPropertyName in testObject) {
	      testObject[itemPropertyName].duplicate = true;
	      item.duplicate = true;
	      seenDuplicate = true;
	    }
	    else {
	      testObject[itemPropertyName] = item;
	      delete item.duplicate;
	    }
	  });

	  return seenDuplicate;
	}
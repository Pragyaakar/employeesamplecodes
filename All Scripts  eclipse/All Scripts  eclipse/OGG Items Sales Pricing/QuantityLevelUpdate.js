function User_BeforeSubmitItemUpdate(type, form, request)
{
  try
  {
	  var recordId = nlapiGetRecordId();
	     var recordType = nlapiGetRecordType();
	     var LC_Duty;

			var Current =new Date();
			var month1 = Current.getMonth() + 1;
		
		var day1 = Current.getDate();
		
		var year1 = Current.getFullYear();
		
		var d1 = day1+ "/"+month1 +"/" +year1;

	     
		       var itemObj=nlapiLoadRecord(recordType,recordId);
	      
	     
	     	var qtyLevel2 = itemObj.setFieldValue('price1quantity1','1');
			var qtyLevel2 =itemObj.setFieldValue('price1quantity2','10');
			var qtyLevel3 =itemObj.setFieldValue('price1quantity3','25');
			var qtyLevel4 =itemObj.setFieldValue('price1quantity4','50');
			var qtyLevel5 =itemObj.setFieldValue('price1quantity5','100');
			var qtyLevel6 =itemObj.setFieldValue('price1quantity6','250');
			var qtyLevel7 =itemObj.setFieldValue('price1quantity7','500');
			var qtyLevel8 =itemObj.setFieldValue('price1quantity8','1000');
			var qtyLevel9 =itemObj.setFieldValue('price1quantity9','2500');
			var qtyLevel10 =itemObj.setFieldValue('price1quantity10','5000');
			var qtyLevel11 =itemObj.setFieldValue('price1quantity11','10000');
			
			
			var percentDuty = itemObj.getFieldValue('custitem_duty');
			
			var prodGrp = itemObj.getFieldValue('custitem_product_group3');
			
			var value = parseFloat(percentDuty)/100;
			 nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := percentDuty:-  "+percentDuty);
			 
			 var Count =  itemObj.getLineItemCount('itemvendor');
			 nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Vendor:-  "+Count);
			 
			 for(var m=1;m<=Count;m++)
			 {
				var isPref =itemObj.getLineItemValue('itemvendor','preferredvendor',m);
				 nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := isPref:-  "+isPref);
				 if(isPref =='T')
				 {
					var VendPref =itemObj.getLineItemValue('itemvendor','vendor',m);
				 }
				 nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Vendor:-  "+VendPref);
			 }
			 
			    var qty1 = itemObj.getFieldValue('custitem_qty_1');
				var qty2 =itemObj.getFieldValue('custitem_qty_10');
				var qty3 =itemObj.getFieldValue('custitem_qty_25');
				var qty4 =itemObj.getFieldValue('custitem_qty_50');
				var qty5 =itemObj.getFieldValue('custitem_qty_100');
				var qty6 =itemObj.getFieldValue('custitem_qty_250');
				var qty7 =itemObj.getFieldValue('custitem_qty_500');
				var qty8 =itemObj.getFieldValue('custitem_qty_1000');
				var qty9 =itemObj.getFieldValue('custitem_qty_2500');
				var qty10 =itemObj.getFieldValue('custitem_qty_5000');
				var qty11 =itemObj.getFieldValue('custitem_qty_10000');
			 
				var retailOverride =itemObj.getFieldValue('custitem_retail_override_price');
			
			
			var filters1=new Array();
			var columns1 = new Array();
			
			
			filters1[0] = new nlobjSearchFilter('custrecord_sv_item', null,'anyof',recordId);


			columns1[0] = new nlobjSearchColumn('internalid');
			columns1[1] = new nlobjSearchColumn('custrecord_sv_supplier');
			columns1[2] = new nlobjSearchColumn('custrecord_sv_item');
			columns1[3] = new nlobjSearchColumn('custrecord_sv_quantity');
			columns1[4] = new nlobjSearchColumn('custrecord_sv_price');
			columns1[5] = new nlobjSearchColumn('custrecord_sv_est_lc_freight');
			columns1[6] = new nlobjSearchColumn('custrecord_sv_est_lc_duty');
			columns1[7] = new nlobjSearchColumn('custrecord_item_type');
			columns1[8] = new nlobjSearchColumn('custrecord_supplier_currency');
			columns1[9] = new nlobjSearchColumn('custrecord_rec_rrp_override');





			var searchResultItem = nlapiSearchRecord('customrecord_sv_supplier_qty_break', null, filters1, columns1);


			if (searchResultItem != null)
			{
				for(var j=0;j<searchResultItem.length;j++)
				{
					var intId = searchResultItem[j].getValue('internalid');
					var Qty = searchResultItem[j].getValue('custrecord_sv_quantity');
					var LC_Freight = searchResultItem[j].getValue('custrecord_sv_est_lc_freight');
					//var LC_Duty = searchResultItem[j].getValue('custrecord_sv_est_lc_duty');
					
					
					
					var itmFromRec = searchResultItem[j].getValue('custrecord_sv_item');
					var RRPOverride = searchResultItem[j].getValue('custrecord_rec_rrp_override');//custrecord_rec_rrp_override
					var SupplyCurrency = searchResultItem[j].getText('custrecord_supplier_currency');
					
					// nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := retailOverride :-  "+retailOverride);
					
					 
					if(Qty =='1')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty1).toFixed(2));
							
						if(retailOverride !=null && retailOverride !='' && retailOverride !=undefined)
						{
							nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := retailOverride if  :-  "+j);
							
							nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_rec_rrp_override',parseFloat(retailOverride).toFixed(2));
						}
					   else
	                    {
						   nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := retailOverride else:-  "+j);
	                        retailOverride= '';
	                        nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_rec_rrp_override',retailOverride);
							
	                    }
						 	
					}
					else if(Qty =='10')
					{
						
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty2).toFixed(2));
						nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := qty2 SET:-  "+qty2);
						
					}
					else if(Qty =='25')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty3).toFixed(2));
					}
					else if(Qty =='50')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty4).toFixed(2));
					}
					else if(Qty =='100')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty5).toFixed(2));
					}
					else if(Qty =='250')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty6).toFixed(2));
					}
					else if(Qty =='500')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty7).toFixed(2));
					}
					else if(Qty =='1000')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty8).toFixed(2));
					}
					else if(Qty =='2500')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty9).toFixed(2));
					}
					else if(Qty =='5000')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty10).toFixed(2));
					}
					else if(Qty =='10000')
					{
						nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_price',parseFloat(qty11).toFixed(2));
					}
					
					 	
					 var Price = searchResultItem[j].getValue('custrecord_sv_price');
						
					    
					if((SupplyCurrency !='AUD') && (SupplyCurrency!=null && SupplyCurrency!=undefined && SupplyCurrency!=''))
					   {
						   var RateAUD = nlapiExchangeRate(SupplyCurrency,'AUD', d1);
					//	   nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := RateAUD:-  "+RateAUD);
						    
						   if(Price !=null && Price!='' && Price!= undefined)
						    {
							   LC_Duty =parseFloat(Price * RateAUD)*parseFloat(value);
						    }
						 //  nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := RateAUD:-  "+RateAUD);
					   }
					else
					{
						 if(Price !=null && Price!='' && Price!= undefined)
						    {
							   LC_Duty =parseFloat(Price)* parseFloat(value);
						    }
					}
					
					
					nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := LC_Duty:-  "+LC_Duty);
					 
					// lc_freight='0.10';//
					 
					 nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_est_lc_duty',parseFloat(LC_Duty).toFixed(2));
                    
				}
			}
			else
			{
				var qtyArr =[1,10,25,50,100,250,500,1000,2500,5000,10000];
				for(var m=0;m<qtyArr.length;m++)
				{
				
					var record = nlapiCreateRecord('customrecord_sv_supplier_qty_break', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}
					
					record.setFieldValue('custrecord_sv_item',recordId);
					
					if(recordType=='inventoryitem')
					{
						record.setFieldValue('custrecord_item_type','Inventory Item');
					}
					else if(recordType=='assemblyitem')
					{
						record.setFieldValue('custrecord_item_type','Assembly/Bill of Materials');
						
					}
					
					record.setFieldValue('custrecord_sv_quantity',qtyArr[m]);
					record.setFieldValue('custrecord_sv_pgd_productgrp_itm',prodGrp);//VendPref
					record.setFieldValue('custrecord_sv_supplier',VendPref);//VendPref
					
					if(qtyArr[m] =='1')
					{
						record.setFieldValue('custrecord_sv_price',qty1);
						
						if(retailOverride !=null && retailOverride !='' && retailOverride !=undefined)
						{
							record.setFieldValue('custrecord_rec_rrp_override',retailOverride);
						}
                      else
                      {
                        retailOverride='';
                        record.setFieldValue('custrecord_rec_rrp_override',retailOverride);
    						
                      }
					
					}
					else if(qtyArr[m] =='10')
					{
						record.setFieldValue('custrecord_sv_price',qty2);
					}
					else if(qtyArr[m] =='25')
					{
						record.setFieldValue('custrecord_sv_price',qty3);
					}
					else if(qtyArr[m] =='50')
					{
						record.setFieldValue('custrecord_sv_price',qty4);
					}
					else if(qtyArr[m] =='100')
					{
						record.setFieldValue('custrecord_sv_price',qty5);
					}
					else if(qtyArr[m] =='250')
					{
						record.setFieldValue('custrecord_sv_price',qty6);
					}
					else if(qtyArr[m] =='500')
					{
						record.setFieldValue('custrecord_sv_price',qty7);
					}
					else if(qtyArr[m] =='1000')
					{
						record.setFieldValue('custrecord_sv_price',qty8);
					}
					else if(qtyArr[m] =='2500')
					{
						record.setFieldValue('custrecord_sv_price',qty9);
					}
					else if(qtyArr[m] =='5000')
					{
						record.setFieldValue('custrecord_sv_price',qty10);
					}
					else if(qtyArr[m] =='10000')
					{
						record.setFieldValue('custrecord_sv_price',qty11);
					}
					
					 nlapiSubmitRecord(record);
				}
				 	
			}
			
			
	      
	      nlapiSubmitRecord(itemObj);
  }
  catch(e)
  {
	  nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "ERROR :="+e);
		 
  }
		    
}
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
			
			var value = parseFloat(percentDuty)/100;
			 nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := percentDuty:-  "+percentDuty);
			
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
					var Price = searchResultItem[j].getValue('custrecord_sv_price');
					var LC_Freight = searchResultItem[j].getValue('custrecord_sv_est_lc_freight');
					//var LC_Duty = searchResultItem[j].getValue('custrecord_sv_est_lc_duty');
					
					
					
					var itmFromRec = searchResultItem[j].getValue('custrecord_sv_item');
					var RRPOverride = searchResultItem[j].getValue('custrecord_rec_rrp_override');//custrecord_rec_rrp_override
					var SupplyCurrency = searchResultItem[j].getText('custrecord_supplier_currency');
					
					// nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Price:-  "+Price);
					    
					if(SupplyCurrency !='AUD' && SupplyCurrency!=null)
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
                   //  nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_est_lc_freight',parseFloat(lc_freight).toFixed(2));
				}
			}
			
			
	      
	      nlapiSubmitRecord(itemObj);
  }
  catch(e)
  {
	  nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "ERROR :="+e);
		 
  }
		    
}
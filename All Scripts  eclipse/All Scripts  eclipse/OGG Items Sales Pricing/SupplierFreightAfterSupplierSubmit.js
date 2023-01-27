function afterSupplierSubmitFreightChargeUpdate(type, form, request)
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
		//var percentDuty = itemObj.getFieldValue('custitem_duty');
		
		var freeThreshold = itemObj.getFieldValue('custentity_free_freight_threshold');
		var minDeliDays = itemObj.getFieldValue('custentity_minimum_del_time');
		var maxDeliDays = itemObj.getFieldValue('custentity_maximum_del_time');
		var BasicCharge = itemObj.getFieldValue('custentity_basic_charge');
		var CostPerKg = itemObj.getFieldValue('custentity_cost_kg');
		var InitialCartanCost = itemObj.getFieldValue('custentity_cost_first_carton');
		var AddCartanCost = itemObj.getFieldValue('custentity_cost_additional_carton');
		var MaxKgInCarton = itemObj.getFieldValue('custentity_max_kg');
		// var productWeght = itemObj.getFieldValue('weight');
		
		if(freeThreshold !=null && freeThreshold !='' && freeThreshold !=undefined)
        {
				freeThreshold =freeThreshold;
		}
		else
		{
		     freeThreshold =0;
		}
		
			if(minDeliDays !=null && minDeliDays !='' && minDeliDays !=undefined)
        {
				minDeliDays =minDeliDays;
		}
		else
		{
		     minDeliDays =0;
		}
		
			if(maxDeliDays !=null && maxDeliDays !='' && maxDeliDays !=undefined)
        {
				maxDeliDays =maxDeliDays;
		}
		else
		{
		     maxDeliDays =0;
		}
		
		
		if(BasicCharge !=null && BasicCharge !='' && BasicCharge !=undefined)
        {
				BasicCharge =BasicCharge;
		}
		else
		{
		     BasicCharge =0;
		}
		
			if(CostPerKg !=null && CostPerKg !='' && CostPerKg !=undefined)
        {
				CostPerKg =CostPerKg;
		}
		else
		{
		     CostPerKg =0;
		}
		
		if(InitialCartanCost !=null && InitialCartanCost !='' && InitialCartanCost !=undefined)
        {
				InitialCartanCost =InitialCartanCost;
		}
		else
		{
		     maxDeliDays =0;
		}
		
		
		
		
		var filters1=new Array();
		var columns1 = new Array();
		
		
		filters1[0] = new nlobjSearchFilter('custrecord_sv_supplier', null,'anyof',recordId);


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
				var LC_Duty = searchResultItem[j].getValue('custrecord_sv_est_lc_duty');
				
				
				
				var itmFromRec = searchResultItem[j].getValue('custrecord_sv_item');
				var RRPOverride = searchResultItem[j].getValue('custrecord_rec_rrp_override');//custrecord_rec_rrp_override
				var SupplyCurrency = searchResultItem[j].getText('custrecord_supplier_currency');
				
				 nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Price:-  "+Price);
				 
					var productWeght = nlapiLookupField('inventoryitem',itmFromRec,'weight');
				 
				if(SupplyCurrency !='AUD' && SupplyCurrency!=null)
				   {
					   var RateAUD = nlapiExchangeRate(SupplyCurrency,'AUD', d1);
				//	   nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := RateAUD:-  "+RateAUD);
					    
					   if(Price !=null && Price!='' && Price!= undefined)
					    {
						   Price =parseFloat(Price * RateAUD);
					    }
					   nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := RateAUD:-  "+RateAUD);
				   }
				
				 nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := LC_Duty:-  "+LC_Duty);
				    
					//====== Freight Calculation=================================================
			
					 var ProductVolumCost =parseFloat(Price)*parseFloat(Qty);
					 
					 var volumWeight = parseFloat(productWeght)*parseFloat(Qty);
					 
					
					
					var BasicKgCharge = (parseFloat(BasicCharge)+parseFloat(CostPerKg * volumWeight));
					
				if(freeThreshold !=null && freeThreshold !='0')
				{
					if(ProductVolumCost < freeThreshold)
					{
						var totBasicCharge = parseFloat(BasicKgCharge)/parseFloat(Qty);
					}
					else
					{
						var totBasicCharge =0;
					}
				}	
				else
				{
					var totBasicCharge = parseFloat(BasicKgCharge)/parseFloat(Qty);
				}
					
					
					
					var chargeCart = Math.ceil(parseFloat(volumWeight)/ parseFloat(MaxKgInCarton));
					
					 nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "volumWeight :="+volumWeight);
					 nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "ProductVolumCost :="+ProductVolumCost);
					 nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "BasicKgCharge :="+BasicKgCharge);
					 nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "totBasicCharge :="+totBasicCharge);
					 nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "chargeCart :="+chargeCart);
					 
					 
					
					if(chargeCart < 2 )
					{
					  var NoOfCart = parseFloat(InitialCartanCost);
					}
					else 
					{
					 var NoOfCart = parseFloat(InitialCartanCost)+(parseFloat(chargeCart -1)*parseFloat(AddCartanCost));
					
					}
					
					 nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "NoOfCart :="+NoOfCart);
					
					if(NoOfCart )
					{
					     
					     var supplyfreight = parseFloat(NoOfCart).toFixed(2);
					}
				
					

					if(ProductVolumCost < freeThreshold)
					{
						var TotCartCharg = parseFloat(supplyfreight)/ parseFloat(Qty);
					}
					else
					{
						var TotCartCharg =0;
						
					}
					
					
		
					
					
					 nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "TotCartCharg :="+TotCartCharg);
					
					if( TotCartCharg > totBasicCharge)
					{
					   var LargestFreightCharge = parseFloat(TotCartCharg);
					}
					else
					{
				    	var LargestFreightCharge = parseFloat(totBasicCharge);
					}
					
					 nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "LargestFreightCharge :="+LargestFreightCharge);
					 nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "parseFloat(Price)== parseFloat(LC_Duty) :="+parseFloat(Price)+'=='+parseFloat(LC_Duty));
						
					var TotalLandCost = parseFloat(Price)+parseFloat(LC_Duty)+parseFloat(LargestFreightCharge);
					
					  nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "TotalLandCost :="+TotalLandCost);
					 
					
				 nlapiSubmitField('customrecord_sv_supplier_qty_break',intId,'custrecord_sv_est_lc_freight',parseFloat(LargestFreightCharge).toFixed(2));
			}
		}

				
  }
  catch(e)
  {
	  nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "ERROR :="+e);
		 
  }
		    
}
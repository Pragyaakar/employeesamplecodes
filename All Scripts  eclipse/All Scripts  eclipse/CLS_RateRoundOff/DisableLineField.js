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
function pageInitSetClose(type, name, linenum)
{
	if((type == 'item' && name == 'item') ||(type == 'item' && name == 'custcol_item_cost_percentage'))
    {
	     var i=linenum;
	     // alert('In fieldChange 1.0')
	   var item = nlapiGetCurrentLineItemValue('item','item');
	
		var amt = nlapiGetCurrentLineItemValue('item','amount');
		
	//if(amt!=null && amt!=undefined && amt!='')
	{
		// alert('Disable field')
		 nlapiDisableLineItemField('item','costestimatetype',i, true);
	}
		 
    }
	return true;
}

function clientFieldChange(type, name, linenum)
{
	if((type == 'item' && name == 'porate'))  //(type == 'item' && name == 'custcol_item_cost_percentage') ||(type == 'item' && name == 'item') ||
    {
		   var i=linenum;
		   
		   if(item!=null && item!=undefined && item!='')
			{
				// alert('Disable field')
				 nlapiDisableLineItemField('item','costestimatetype', true);
			}
		  //  alert('In fieldChange 1.0')
	   var item = nlapiGetCurrentLineItemValue('item','item');
	
		var amt = nlapiGetCurrentLineItemValue('item','amount');
		
		var AvgCost = nlapiGetCurrentLineItemValue('item','averagecost');
		var quantity = nlapiGetCurrentLineItemValue('item','quantity');
		var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
		
		
		var Currency = nlapiGetCurrentLineItemValue('item','pocurrency');
		var DropVal = nlapiGetCurrentLineItemValue('item','costestimatetype');
		alert('DropVal of porate Change=='+DropVal)
		var RecType = nlapiGetRecordType();
		alert('RecType of porate Change=='+RecType)
		alert('AvgCost of porate Change=='+AvgCost)
		
		if(AvgCost == null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00')
		{
			// alert('In AvgCost is Null or 0')
			 if(RecType =='salesorder')
			{
				var PoRate = nlapiGetCurrentLineItemValue('item','porate');
		        if(PoRate !=null && PoRate!='')
			    {
		        	alert('In type is chnge to po 1')
				 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE');
			    }
		        
				if(Currency=='2')
				{
					var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
					AvgCost = PoRate * rate; 
					// alert('In CostType is po for currency =2')
					alert('In type is chnge to po 2')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				}
				else
				{
					AvgCost = PoRate;
					// alert('In CostType is po for currency != 2')
					var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
					// alert('In CostType is po for EstCost='+EstCost)
					alert('In type is chnge to po 3')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				} 
			}
			else if(RecType =='estimate')
			{
				var EstRate = nlapiGetCurrentLineItemValue('item','costestimaterate');//costestimaterate
		        if(EstRate !=null && EstRate !=''  && AvgCost ==null && AvgCost =='' )
			    {
				 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE');
					alert('In type is chnge to po 4')
			    }
				if(Currency=='2')
				{
					var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
					AvgCost = EstRate * rate; 
					// alert('In CostType is po for currency =2')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
					alert('In type is chnge to po 5')
				}
				else
				{
					AvgCost = EstRate;
					// alert('In CostType is po for currency != 2')
					var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
					// alert('In CostType is po for EstCost='+EstCost)
					alert('In type is chnge to po 6')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				} 	
			}
			
		}
		else if(AvgCost!=null && AvgCost!=undefined && AvgCost!='' )
		{
			nlapiSetLineItemValue('item','costestimatetype',i,'AVGCOST');
		}
		// alert('In margin Rate ='+MarginRate)
		
		/*if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
		{
			var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
			
			 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
			// alert('In NewPrice ='+NewPrice)
			 nlapiSetCurrentLineItemValue('item','rate',NewPrice);
			// nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',parseFloat(MarginRate).toFixed(2));
			 nlapiSetCurrentLineItemValue('item','amount',NewPrice * quantity);
			// nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',MarginRate);
			 
				var newSetMarge = (parseFloat(MarginRate) /100)*100;
				 if(newSetMarge != null)
				 {
					 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
				 }
				
			
		}
	*/
	
		 
    }
	//=====================================Margin Field Change ==================================================
	if(type == 'item' && name == 'custcol_item_cost_percentage') 
    {
		   var i=linenum;
		   
		   if(item!=null && item!=undefined && item!='')
			{
				// alert('Disable field')
				 nlapiDisableLineItemField('item','costestimatetype', true);
			}
		  //  alert('In fieldChange 1.0')
	   var item = nlapiGetCurrentLineItemValue('item','item');
	
		var amt = nlapiGetCurrentLineItemValue('item','amount');
		
		var AvgCost = nlapiGetCurrentLineItemValue('item','averagecost');
		var quantity = nlapiGetCurrentLineItemValue('item','quantity');
		var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
		var DropVal = nlapiGetCurrentLineItemValue('item','costestimatetype');
		alert('DropVal of unitRate Change=='+DropVal)
		
		var Currency = nlapiGetCurrentLineItemValue('item','pocurrency');
		var RecType = nlapiGetRecordType();
		alert('RecType of unitRate Change=='+RecType)
		alert('AvgCost of unitRate Change=='+AvgCost)
		
		if(AvgCost == null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00')
		{
			// alert('In AvgCost is Null or 0')
			 if(RecType =='salesorder')
			{
				var PoRate = nlapiGetCurrentLineItemValue('item','porate');
		        if(PoRate !=null && PoRate!='' )
			    {
				 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE');
				 alert('In type is chnge to po 7')
			    }
				if(Currency=='2')
				{
					var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
					AvgCost = PoRate * rate; 
					// alert('In CostType is po for currency =2')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
					alert('In type is chnge to po 8')
				}
				else
				{
					AvgCost = PoRate;
					// alert('In CostType is po for currency != 2')
					var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
					// alert('In CostType is po for EstCost='+EstCost)
					alert('In type is chnge to po 9')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				} 
			}
			else if(RecType =='estimate')
			{
				var EstRate = nlapiGetCurrentLineItemValue('item','costestimaterate');//costestimaterate
		        if(EstRate !=null && EstRate !='')
			    {
				 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE');
				 alert('In type is chnge to po 10')
			    }
				if(Currency=='2')
				{
					var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
					AvgCost = EstRate * rate; 
					// alert('In CostType is po for currency =2')
					alert('In type is chnge to po 11')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				}
				else
				{
					AvgCost = EstRate;
					// alert('In CostType is po for currency != 2')
					var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
					// alert('In CostType is po for EstCost='+EstCost)
					alert('In type is chnge to po 12')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				} 	
			}
			
		}
		else if(AvgCost!=null && AvgCost!=undefined && AvgCost!='' )
		{
			nlapiSetLineItemValue('item','costestimatetype',i,'AVGCOST');
		}
		// alert('In margin Rate ='+MarginRate)
		
		if(MarginRate!=null && MarginRate!=undefined && MarginRate!='' )
		{
			var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
			
			 var NewPrice = parseFloat(AvgCost/ Marg).toFixed(2);
			// alert('In NewPrice ='+NewPrice)
			 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
			// nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',parseFloat(MarginRate).toFixed(2));
			 nlapiSetCurrentLineItemValue('item','amount',NewPrice * quantity,false,true);
			// nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',MarginRate);
			 
				
			
		}
	
		var newSetMarge =(parseFloat(MarginRate) /100)*100;
		 if(newSetMarge != null )
		 {
			 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge,false,true);
		 }
		
		 
    }
	//======================================End Margin chge =====================================================
	//========================================= Rate Field Chnge =========================================
	
/*	if((type == 'item' && name == 'rate'))
    {
		   var i=linenum;
		   
		   if(item!=null && item!=undefined && item!='')
			{
				// alert('Disable field')
				 nlapiDisableLineItemField('item','costestimatetype', true);
			}
		  //  alert('In fieldChange 1.0')
	   var Price = nlapiGetCurrentLineItemValue('item','rate');
	
		var amt = nlapiGetCurrentLineItemValue('item','amount');
		
		var AvgCost = nlapiGetCurrentLineItemValue('item','averagecost');
		var quantity = nlapiGetCurrentLineItemValue('item','quantity');
		var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
		
		var Currency = nlapiGetCurrentLineItemValue('item','pocurrency');
		var RecType = nlapiGetRecordType();
		alert('RecType of Rate chnge=='+RecType)
		alert('AvgCost of Rate chnge=='+AvgCost)
		
			var DropVal = nlapiGetCurrentLineItemValue('item','costestimatetype');
		alert('DropVal of unitRate Change=='+DropVal)
		if(AvgCost == null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00')
		{
			 if(RecType =='salesorder')
			{
				var PoRate = nlapiGetCurrentLineItemValue('item','porate');
		        if(PoRate !=null && PoRate!='' && AvgCost ==null && AvgCost =='')
			    {
				 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE');
			    }
				if(Currency=='2')
				{
					var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
					AvgCost = PoRate * rate; 
					// alert('In CostType is po for currency =2')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				}
				else
				{
					AvgCost = PoRate;
					// alert('In CostType is po for currency != 2')
					var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
					// alert('In CostType is po for EstCost='+EstCost)
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				} 
			}
			else if(RecType =='estimate')
			{
				var EstRate = nlapiGetCurrentLineItemValue('item','costestimaterate');//costestimaterate
		        if(EstRate !=null && EstRate !='' && AvgCost ==null && AvgCost =='')
			    {
				 nlapiSetCurrentLineItemValue('item','costestimatetype','PURCHORDERRATE');
			    }
				if(Currency=='2')
				{
					var rate = nlapiExchangeRate( 'USD','CAD', new Date()); 
					AvgCost = EstRate * rate; 
					// alert('In CostType is po for currency =2')
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				}
				else
				{
					AvgCost = EstRate;
					// alert('In CostType is po for currency != 2')
					var EstCost = nlapiGetCurrentLineItemValue('item','costestimatetype');
					// alert('In CostType is po for EstCost='+EstCost)
					nlapiSetLineItemValue('item','costestimatetype',i,'PURCHORDERRATE');
				} 	
			}
		
				
		}
		else if(AvgCost!=null && AvgCost!=undefined && AvgCost!='' )
		{
			nlapiSetLineItemValue('item','costestimatetype',i,'AVGCOST');
		}
		 
		 if(Price != null && Price != '' && AvgCost != null && AvgCost != '')
		 {
			 var MargValSet =(parseFloat(Price)- parseFloat(AvgCost)/ parseFloat(Price))*100; //(((Price - AvgCost) / Price) * 100);
				
		 }
			
			
			 if(MargValSet != null)
			 {
				 nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',MargValSet,false,true);
			 }
	
    }*/
	
	//======================================= End Rate Field Change =====================================
	return true;
}
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       6 Jun 2020      ATPL
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

function fieldChangeMarginRate(type, name, linenum) 
{
	   
	if(type == 'item' && name == 'custcol_item_cost_percentage')   //(type == 'item' && name == 'item' )||
	{
		  var amt = nlapiGetCurrentLineItemValue('item','amount');
		  var quantity = nlapiGetCurrentLineItemValue('item','quantity');
		  var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
		  var Currency = nlapiGetCurrentLineItemValue('item','pocurrency'); 
		  var AvgCost= nlapiGetCurrentLineItemValue('item','averagecost');
		  //  alert('MarginRate=='+MarginRate);
		  //alert('AvgCost=='+AvgCost);
				
		  if(AvgCost==null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00' )
		  {
			 var poVal = nlapiGetCurrentLineItemValue('item','porate');
			 if(poVal != null && poVal != undefined && poVal != '')
			 {
				 if(Currency=='USD')
				 {
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
			 //alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
			 nlapiSetCurrentLineItemValue('item','rate',NewPrice,false,true);
			 nlapiSetCurrentLineItemValue('item','amount',parseFloat(NewPrice * quantity),false,true);
			 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * quantity).toFixed(2),false,true);
			 		 
            //alert('The Average Cost Is :='+NewPrice);
			var newSetMarge =(parseFloat(MarginRate)/100)*100;
		    if(newSetMarge != null && newSetMarge != '' && newSetMarge != undefined)
			{
				nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge.toFixed(2),false,true);
			}
		}
	}
  
	if(type == 'item' && name == 'rate')   //(type == 'item' && name == 'item' )||
	{
		  var amt = nlapiGetCurrentLineItemValue('item','amount');
		  var price = nlapiGetCurrentLineItemValue('item','rate');
		  var quantity = nlapiGetCurrentLineItemValue('item','quantity');
		  var MarginRate = nlapiGetCurrentLineItemValue('item','custcol_item_cost_percentage');
		  var Currency = nlapiGetCurrentLineItemValue('item','pocurrency'); 
		  var AvgCost= nlapiGetCurrentLineItemValue('item','averagecost');
		//    alert('Unit Rate=='+price);
		  //alert('AvgCost=='+AvgCost);
				
		  if(AvgCost==null || AvgCost==undefined || AvgCost=='' || AvgCost=='0.00' )
		  {
			 var poVal = nlapiGetCurrentLineItemValue('item','porate');
			 if(poVal != null && poVal != undefined && poVal != '')
			 {
				 if(Currency=='USD')
				 {
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
			 	
		if(amt!=null && amt !=undefined && amt !='' )
		{
			
			
			//var Marg =parseFloat(1)-(parseFloat(MarginRate)/100);
			// var NewPrice =(((price - AvgCost) / price) * 100).toFixed(2);
			 //alert('AvgCost :'+AvgCost+'divide by Marg:'+Marg+'FInal ans:'+NewPrice);
			 nlapiSetCurrentLineItemValue('item','rate',price,false,true);
			 nlapiSetCurrentLineItemValue('item','amount',parseFloat(price * quantity),false,true);
			 nlapiSetCurrentLineItemValue('item','costestimate',parseFloat(AvgCost * quantity).toFixed(2),false,true);
			 		 
            //alert('The Average Cost Is :='+NewPrice);
			var newSetMarge =(((price - AvgCost) / price) * 100);
		    if(newSetMarge != null && newSetMarge != '' && newSetMarge != undefined)
			{
				nlapiSetCurrentLineItemValue('item','custcol_item_cost_percentage',newSetMarge.toFixed(2),false,true);
			}
		}
	}
	
	return true;
}


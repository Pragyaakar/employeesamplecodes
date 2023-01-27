/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Dec 2019     Priyanka
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
var flag=true;
function discountPricinglevel(type)
{
	if(type == 'item') 
    {

		 var subsidiary =nlapiGetFieldValue('subsidiary');
		 var Date1 =nlapiGetFieldValue('trandate');
		 var Customer =nlapiGetFieldValue('entity');
	     var item = nlapiGetCurrentLineItemValue('item','item');
	     var quant = nlapiGetCurrentLineItemValue('item','quantity');
	     var rate = nlapiGetCurrentLineItemValue('item','rate');
	     var amount = nlapiGetCurrentLineItemValue('item','amount');
		
	     alert('subsidiary is=='+subsidiary);
	     alert('item is=='+item);
	     alert('Date is=='+Date1);
	     alert('Customer is=='+Customer);
		
         if(item != null && item != '')
		  {
			      var filters=new Array();
				 filters[0]=new nlobjSearchFilter('custrecord_customer', null,'anyof',Customer);
				 filters[0] = new nlobjSearchFilter('custrecord_discount_item', null, 'is', item);
				// filters[2] = new nlobjSearchFilter('custrecord_startdate', null, 'onorbefore', Date1);
				// filters[3] = new nlobjSearchFilter('custrecord_enddate', null, 'onorafter', Date1);
			 
				         var columns = new Array();
						 columns[0] = new nlobjSearchColumn('custrecorddiscount_master_subsidiary');
						 columns[1] = new nlobjSearchColumn("custrecord_discount_item"); 
						 columns[2] =  new nlobjSearchColumn("custrecord_customer");
						 columns[3] =  new nlobjSearchColumn("custrecord_startdate");
						 columns[4] =  new nlobjSearchColumn("custrecord_enddate");
						 columns[5] =  new nlobjSearchColumn("custrecord_discount_rate");
						
						 
				 var searchresults = nlapiSearchRecord('customrecord_discount_master',null, filters, columns);
				 
				 if(searchresults != null && searchresults != '' && searchresults != undefined)
				 {
					 for (var i = 0;  i < searchresults.length; i++) 
						{
							var custRecItem =  searchresults[i].getValue('custrecord_discount_item');
							var custRecSubsi = searchresults[i].getValue('custrecorddiscount_master_subsidiary');
							var custRecStartDate = searchresults[i].getValue('custrecord_startdate');
							var custRecEndDate = searchresults[i].getValue('custrecord_enddate');
							var discPrice = searchresults[i].getValue('custrecord_discount_rate');
						
						
						}
				 }
                 
				 alert('amount is=='+amount);
				 alert('discPrice is=='+discPrice);
				 var discRt = parseFloat(rate)*parseFloat(discPrice/100);
				 var discAmt = parseFloat(amount)*parseFloat(discPrice/100);
				 alert('discAmt is=='+discAmt);
				 var rateToSet=parseFloat(rate)-parseFloat(discRt);
				 var amtToSet=parseFloat(amount)-parseFloat(discAmt);
				 
				 alert('rateToSet is=='+rateToSet);
				 alert('amtToSet is=='+amtToSet);
				
				 nlapiSetCurrentLineItemValue('item','rate',rateToSet);
				 nlapiSetCurrentLineItemValue('item','amount',amtToSet);
				 nlapiSetCurrentLineItemValue('item','custcol_itemrate',rate);
				 nlapiSetCurrentLineItemValue('item','custcol_discount',discPrice);
				 nlapiSetCurrentLineItemValue('item','custcol_discountamount',discRt);
				
				 var lineNo= nlapiGetCurrentLineItemIndex('item')
				 if(lineNo)
				 {
					 nlapiDisableLineItemField('item','custcol_itemrate',true);
					 nlapiDisableLineItemField('item','custcol_discount',true);
					 nlapiDisableLineItemField('item','custcol_discountamount',true);
					 nlapiDisableLineItemField('item','price',true);
				 }
				 else
				 {
					 nlapiDisableLineItemField('item','custcol_itemrate',false);
					 nlapiDisableLineItemField('item','custcol_discount',false);
					 nlapiDisableLineItemField('item','custcol_discountamount',false);
					 nlapiDisableLineItemField('item','price',false);
				 }
				 		
			
		  }
		  
		return flag; 
	}
	      
}



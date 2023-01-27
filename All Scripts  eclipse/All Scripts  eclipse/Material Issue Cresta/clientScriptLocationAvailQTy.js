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
function clientFieldChanged(type, name, linenum)
{
	if(type =='item' && name == 'location') 
    {

		 var location;
		 var avail_quant;
		 var quant;
	     var lastpurchase;
	     var item = nlapiGetCurrentLineItemValue('item','item');

		location = nlapiGetCurrentLineItemValue('item','location');
		//alert('item is'+item);
		var remQtySet = nlapiGetCurrentLineItemValue('item','quantity');
		//alert('location is'+location);
		var val = ' ';

		  if(item!=null && item != '' && location != null && location!='' )
		  {
			
			 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
			 var columns = new Array();
			 columns[0] = new nlobjSearchColumn('locationquantityavailable');
		
			
			 var filters = new Array();
			 filters[0] = new nlobjSearchFilter ('internalid', null, 'anyof',item);
			 filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
     		 var searchresults = nlapiSearchRecord('item',null,filters,columns);//customsearch_item_search_so_po
     		 
     		if(searchresults != null)
  	    	{
	  			for (var i = 0;  i < searchresults.length; i++) 
	  			{
	  			    avail_quant = searchresults[i].getValue('locationquantityavailable');
	                //     alert('locationquantityavailable***************' +avail_quant);
	  			         				
	  				nlapiSetCurrentLineItemValue('item','custcol_onlocation_available',avail_quant);
	  				
	  			 }
	  				
  		    }	
		
		  }
		  else
		  {
			  nlapiSetCurrentLineItemValue('item','custcol_onlocation_available','0.00');//custcol_remain_qty_for_pr
          }
	}
	
	if(type =='item' && name == 'quantity') 
    {
		  var item = nlapiGetCurrentLineItemValue('item','item');

			location = nlapiGetCurrentLineItemValue('item','location');
			//alert('item is'+item);
			var remQtySet = nlapiGetCurrentLineItemValue('item','quantity');
			
			var avaiIS =nlapiGetCurrentLineItemValue('item','custcol_onlocation_available');
			
			if(avaiIS=='' || avaiIS ==undefined || avaiIS ==null || avaiIS == '0.00')
			{
				nlapiSetCurrentLineItemValue('item','custcol_remain_qty_for_pr',remQtySet);//custcol_remain_qty_for_pr
				 
			}
	}
}

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
	if(name == 'quantity') 
    {

		 var location;
		 
		 var quant;
	     var lastpurchase;
	     item = nlapiGetCurrentLineItemValue('item','item');

		quant = nlapiGetCurrentLineItemValue('item','quantity');
		//alert('item is'+item);
	//	lastpurchase = nlapiGetCurrentLineItemValue('item','custcol_last_purchase_price');
		//alert('location is'+location);
		var val = ' ';

		  if(item!=null && item != '')
		  {
			
			 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
			 var columns = new Array();
			 columns[0] = new nlobjSearchColumn('lastpurchaseprice');
		
			
			 var filters = new Array();
			 filters[0] = new nlobjSearchFilter ('internalid', null, 'anyof',item);
			// filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
     		 var searchresults = nlapiSearchRecord('item',null,filters,columns);//customsearch_item_search_so_po
     		 
     		if(searchresults != null)
  		{
  			for (var i = 0;  i < searchresults.length; i++) 
  			{
  				var price = searchresults[i].getValue('lastpurchaseprice');
                     //alert('locationquantityavailable***************' +avail_quant);
  			         				
  			//	nlapiSetCurrentLineItemValue('item','custcol_avlbl_quantity',avail_quant);
  				 if(price!=null && price != '' )
  				  {
  					
  					val =parseInt(quant)*parseFloat(price);
  					nlapiSetCurrentLineItemValue('item','estimatedamount',val);
  				  }
  				 else{
  					price ='0.00';
  					val =parseInt(quant)*parseFloat(price);
  					nlapiSetCurrentLineItemValue('item','estimatedamount',val);
  					 
  				 }
  				 
  				
  			}
  				
  		}	
		
		  }
	}
}

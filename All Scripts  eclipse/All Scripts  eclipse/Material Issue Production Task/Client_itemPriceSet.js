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
	if(name == 'location') 
    {

		 var location;
		 var avail_quant;
		 var quant;
	     var lastpurchase;
	     
	     var prodID =nlapiGetFieldValue('custbody_workorder_trans_id');
	     var FromLoc =nlapiGetFieldValue('location');
	     
	     var CountLine = nlapiGetLineItemCount('item');
	    
	     if((prodID !=null && prodID!=undefined && prodID !='')&&(FromLoc!=null && FromLoc!=undefined && FromLoc !=''))
	     {
	    	 for(var len =1;len <=CountLine ;len++)
	 	    {
	 	    	  var item = nlapiGetLineItemValue('item','item',len);

	 	  		  // location = nlapiGetLineItemValue('item','location',len);
	 	  		
	 	    	 if(item!=null && item != '' && FromLoc != null && FromLoc!='' )
	 			  {
	 				
	 				 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
	 				 var columns = new Array();
	 				 columns[0] = new nlobjSearchColumn('locationaveragecost');
	 			
	 				
	 				 var filters = new Array();
	 				 filters[0] = new nlobjSearchFilter ('internalid', null, 'anyof',item);
	 				 filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',FromLoc);
	 	     		 var searchresults = nlapiSearchRecord('item','customsearch318_2',filters,columns);//customsearch_item_search_so_po
	 	     		 
	 	     		// alert('searchresults='+searchresults)
	 	     		if(searchresults != null)
	 	  	    	{
	 		  			for (var i = 0;  i < searchresults.length; i++) 
	 		  			{
	 		  			    avail_price = searchresults[i].getValue('locationaveragecost');
	 		                  //   alert('location avg Cost***************' +avail_price);
	 		  			 
	 		  			 }
	 		  				
	 	  		    }	
	 	        }
	 	    	  if(avail_price !=null && avail_price !=undefined && avail_price !='')
 			    	{
 			    	   nlapiSelectLineItem('item',len);
 			    	  nlapiSetCurrentLineItemValue('item','rate',avail_price);
 			    	 nlapiCommitLineItem('item');
 			    	}
	     }
	    
	   
	
	}
	
    }
}

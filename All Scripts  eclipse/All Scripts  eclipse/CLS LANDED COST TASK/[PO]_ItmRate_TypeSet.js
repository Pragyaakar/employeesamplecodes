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

function setItemTypeAndRate(type) 
{
	
	var item =nlapiGetCurrentLineItemValue('item','item');
	
	   var itemRate =nlapiGetCurrentLineItemValue('item','rate');
	   //alert('Item Rate-'+itemRate)
	   
	     var itemSearch = nlapiSearchRecord("item","customsearch_item_item_type",
			   [
			      ["internalid","anyof",item]
			   ], 
			   [
			      new nlobjSearchColumn("internalid"), 
			      new nlobjSearchColumn("itemid").setSort(false), 
			      new nlobjSearchColumn("type")
			   ]
			   );
	     
	     
       var itemType ='';
       
       if(itemSearch)
       {
    	   itemType=itemSearch[0].getValue('type');
       }
    	 
       //alert('Item Type-'+itemType)
 	  
     //  var TrackNum = nlapiGetCurrentLineItemValue('item','custcol_landed_cost_track_num');
		
		if(itemRate !=null && itemRate != undefined && itemRate !='')
		{
			//alert('Item Rate-'+itemRate)
			nlapiSetCurrentLineItemValue('item','custcol_cls_item_rate',itemRate);
			
		}
	
		if(itemType !=null && itemType != undefined && itemType !='')
		{
			//	alert('Item Type-'+itemType)
			nlapiSetCurrentLineItemValue('item','custcol_cls_item_type',itemType);
			
		}
	
	
	return true;
}

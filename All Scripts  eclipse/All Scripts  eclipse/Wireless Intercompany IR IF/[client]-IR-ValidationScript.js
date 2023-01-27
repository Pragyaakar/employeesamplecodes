/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 May 2020     Shivraj
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
var flag=true;
function clientPageInit(type){
   
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
var check=true;//= true;
function clientSaveRec_SUT_IF()
{
	
	
	var linecount = nlapiGetLineItemCount('custpage_item_sublist');
	/*alert('linecount '+linecount);*/
	for(var k=1;k<=linecount;k++)
	{
		var itemserchqty = nlapiGetLineItemValue('custpage_item_sublist','custpage_qtysearch',k);
		var itementerqty= nlapiGetLineItemValue('custpage_item_sublist','custpage_qty',k);
		var itemsorqty= nlapiGetLineItemValue('custpage_item_sublist','custpage_qty_po',k);
		var itemFulfill = nlapiGetLineItemValue('custpage_item_sublist','custpage_apply',k);
		
		//alert('Search qty='+itemserchqty)
		
		//alert('Enter qty='+itementerqty)
		
		//alert('PO qty='+itemsorqty)
		
		 if(itemserchqty != null && !isNaN(itemserchqty))
	         {
			 itemserchqty=itemserchqty;
	         }
	         else
	         {
	        	 itemserchqty=0.00;
	         }


		 if(itemsorqty != null && !isNaN(itemsorqty))
	         {
			    itemsorqty=itemsorqty;
	         }
	         else
	         {
	        	 itemsorqty=0.00;
	         }
		 
		if(itemFulfill=='T')
		{	
			/*var itemloc = nlapiGetLineItemValue('custpage_item_sublist','custpage_location',k);
			alert('itemloc '+itemloc);
			if(itemloc==null ||itemloc==''||itemloc==undefined)
			{
				alert('The Location is Mandatory on Item Line');
				check=false;
				alert('check ='+check)
			}	
					
			if(parseInt(itementerqty) > parseInt(itemserchqty))
			{
				alert('The number of serial numbers entered ('+itementerqty+') is not equal to the item On Hand quantity ('+itemserchqty+')');
				check=false;
				if(parseInt(itementerqty) > parseInt(itemserchqty))
			}
			else
			{
				check=true;
			}*/
			
			var itemloc = nlapiGetLineItemValue('custpage_item_sublist','custpage_location',k);
			//alert('itemloc '+itemloc);
			if(itemloc==null ||itemloc==''||itemloc==undefined)
			{
				alert('The Location is Mandatory on Item Line');
				check=false;
				//alert('check ='+check)
			}	
			
			
			
			if(parseInt(itementerqty) > parseInt(itemsorqty))
			{
				//alert('if part');
				alert('The number of serial numbers entered ('+itementerqty+') is not equal to the item quantity ('+itemsorqty+')');
				nlapiSetLineItemValue('custpage_item_sublist','custpage_qty',linenum,so_qty);
				//flag==false;
				check=false;
			}
			else if(parseFloat(itementerqty) > parseFloat(itemserchqty))
			{
				//alert('else part');
				
				alert('The number of serial numbers entered ('+itementerqty+') is not equal to the item Fulfill quantity ('+itemserchqty+')');
				check=false;
			}
			else
			{
				check = true;
			}	
			
			
			
		}	
			
	}	
	
 //alert('check ='+check)
  return check;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Boolean} True to continue changing field value, false to abort value change
 */
function clientValidateField(type, name, linenum){
   
    return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChng_SUT_IF(type, name, linenum)
{
	
	if(type=='custpage_item_sublist' && name=='custpage_qty')
	{
		
		item = nlapiGetLineItemValue('custpage_item_sublist','custpage_item',linenum);
		
		var quantity = nlapiGetLineItemValue('custpage_item_sublist','custpage_qty',linenum);
		//alert('quantity '+quantity);
		
		var so_qty = nlapiGetLineItemValue('custpage_item_sublist','custpage_qty_po',linenum);
		//alert('so_qty '+so_qty);
		
		var search_qty = nlapiGetLineItemValue('custpage_item_sublist','custpage_qtysearch',linenum);
		//alert('search_qty '+search_qty);
		
         
         if(search_qty != null && !isNaN(search_qty))
         {
        	 search_qty=search_qty;
         }
         else
         {
        	 search_qty=0.00;
         }
         
         if(so_qty != null && !isNaN(so_qty))
         {
        	 so_qty=so_qty;
         }
         else
         {
        	 so_qty=0.00;
         }
         
         // alert('quantity qty='+quantity)
         
		// alert('search_qty qty='+search_qty)
		
		if(parseFloat(quantity) > parseFloat(so_qty))
		{
			alert('The number of serial numbers entered ('+quantity+') is not equal to the item quantity ('+so_qty+')');
			nlapiSetLineItemValue('custpage_item_sublist','custpage_qty',linenum,so_qty,false,false);
			//flag==false;
			check=false;
		}
		else if(parseFloat(quantity) > parseFloat(search_qty))
		{
			
			alert('The number of serial numbers entered ('+quantity+') is not equal to the item Fulfill quantity ('+search_qty+')');
			nlapiSetLineItemValue('custpage_item_sublist','custpage_qty',linenum,so_qty,false,false);
			check=false;
		}	
		
		
	}	
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @returns {Void}
 */
function clientPostSourcing(type, name) {
   
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function clientLineInit(type) {
     
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function clientValidateLine(type){
 
    return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function clientRecalc(type){
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to continue line item insert, false to abort insert
 */
function clientValidateInsert(type){
  
    return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to continue line item delete, false to abort delete
 */
function clientValidateDelete(type){
   
    return true;
}
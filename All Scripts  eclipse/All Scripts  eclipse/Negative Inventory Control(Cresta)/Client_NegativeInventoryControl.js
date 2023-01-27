/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Jan 2019     Tushar More
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
var Available = true;

function clientNegativeInventoryControl(type, name, linenum)
{
	
	 if(type=='inventory' && name == 'adjustqtyby') 
     {

		 var location;
		 
		 var item;
	     var qty;
	     var AdjustQty;

		item = nlapiGetCurrentLineItemValue('inventory','item');
		// alert('item is'+item);
		location = nlapiGetCurrentLineItemValue('inventory','location');
		// alert('location is'+location);

		AdjustQty = nlapiGetCurrentLineItemValue('inventory','adjustqtyby');
		// alert('AdjustQty is'+AdjustQty);
		
		    if((item!=null && item != '' )&&( location!=null && location != ''))
				  {
					
					 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
					 var columns = new Array();
					 columns[0] = new nlobjSearchColumn('locationquantityavailable');
					 columns[1] = new nlobjSearchColumn('locationquantityonhand');
					
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('internalid', null, 'anyof',item);
					 filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
		       		 var searchresults = nlapiSearchRecord('item',null,filters,columns);//customsearch_item_search_so_po
		       		 
		       		if(searchresults != null)
		    		{
		    			for (var i = 0;  i < searchresults.length; i++) 
		    			{
		    				var avail_quant = searchresults[i].getValue('locationquantityavailable');
		                       //alert('locationquantityavailable***************' +avail_quant);
		    			 
		    			}
		    				
		    		}	
					
			      }
		    
		
		    
		    if(avail_quant > 0)
		    {
		    	if(AdjustQty > 0)
		         {
		    		var remain = parseFloat(avail_quant)-parseFloat(AdjustQty);
		         }
		    	else
		    	{
		    		var remain = parseFloat(avail_quant)+parseFloat(AdjustQty);
		    	}
		    	
		          if(remain >= 0)
		          {
		        	  Available= true;
		          }  
		          else
		          {
		        	  alert('You are not allowed to enter the negative quantity for the item...!!');
		        	  Available= false;
		          }
		        
		    }
		    else
		    {
		        alert('You are not allowed to enter the negative quantity for the item...!!');
		    	Available= false;
		    }
		}
	
}



function clientSaveRecord()
{

         	        if(Available == false)
					 {  
         	           alert('You are not allowed to enter the negative quantity for the item...!!');
         		        SetFlag = false;
					 }
					 else
					 {
						 SetFlag = true;
					 }
	return SetFlag;		
}
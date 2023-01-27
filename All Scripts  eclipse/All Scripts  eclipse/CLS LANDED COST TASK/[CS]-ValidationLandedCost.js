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

function postSourceValidationBill(type, name, linenum) 
{
	// alert('Post Sourced track num...type'+type+' name='+name)
	// alert('Post Sourced track num..'+name)
	if(type == 'expense' && name == 'custcol_landed_cost_track_num')   //(type == 'item' && name == 'item' )||
	{
		//  alert('Post Sourced track num..')
		var TrackNum = nlapiGetCurrentLineItemValue('expense','custcol_landed_cost_track_num');
		
		if(TrackNum !=null && TrackNum != undefined && TrackNum !='')
		{
			nlapiSetCurrentLineItemValue('expense','custcol_landed_cost_line','T',false,false);
		}
		else
		{
			nlapiSetCurrentLineItemValue('expense','custcol_landed_cost_line','F',false,false);
			
		}
	}
  
	if(type == 'expense' && name == 'custcol_landed_cost_line')   //(type == 'item' && name == 'item' )||
	{
		// alert('Post Sourced checkbox..')
		 
       var lcCheck = nlapiGetCurrentLineItemValue('expense','custcol_landed_cost_line');
       
       var TrackNum = nlapiGetCurrentLineItemValue('expense','custcol_landed_cost_track_num');
		
		if(lcCheck == 'T' && (TrackNum ==null|| TrackNum == undefined || TrackNum ==''))
		{
			alert('Please Enter the Tracking number..')
			nlapiSetCurrentLineItemValue('expense','custcol_landed_cost_line','F',false,false);
			
			
		}
	}
	
	return true;
}


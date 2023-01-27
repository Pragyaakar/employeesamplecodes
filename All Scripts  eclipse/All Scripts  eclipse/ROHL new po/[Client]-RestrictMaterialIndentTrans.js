/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       7 Apr 2020      Tushar
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function disabledFieldLineInit(type)
{
	var form = nlapiGetFieldValue('customform');
	
	if(form =='166')//form =='171' || 
	{
		 nlapiDisableLineItemField('item', 'customer', true);
		 nlapiDisableLineItemField('item', 'location', true);
	
		var LineCount = nlapiGetLineItemCount('item');
		
		if(LineCount > 0)
		{
			for(var i=1;i<=LineCount;i++)
			{
				nlapiSetLineItemDisabled('item','location',true,i);
				nlapiSetLineItemDisabled('item','customer',true,i);
			}
		}
			
	}
  return true;
}


function disabledFieldPostSource(type,name,linenum)
{
   var form = nlapiGetFieldValue('customform');
	
	if(form =='166')//form =='171' || 
	{
		if(type=='item' && name =='location')
		{
			var item =nlapiGetCurrentLineItemValue('item','item');
			
			if(item !=null)
			{
				// alert('location='+linenum)
				nlapiDisableLineItemField('item', 'location', true);
				nlapiDisableLineItemField('item', 'customer', true);
				
			}
		}
		return true;
	}
	
}

function disabledFieldOnPostSource(type,name,linenum)
{
   var form = nlapiGetFieldValue('customform');
	
	if(form =='166')//form =='171' || 
	{
		if(type=='item' && name =='location')
		{
			var item =nlapiGetCurrentLineItemValue('item','item');
			
			if(item !=null)
			{
				//alert('location='+linenum)
				nlapiDisableLineItemField('item', 'location', true);
				nlapiDisableLineItemField('item', 'customer', true);
				
			}
		}
		return true;
	}
	
}

function disabledFieldPageInit(type)
{
	var form = nlapiGetFieldValue('customform');
	
	if(form =='166')//form =='171' || 
	{
		
		nlapiDisableLineItemField('item', 'customer', true);
		nlapiDisableLineItemField('item', 'location', true);
		
		var LineCount = nlapiGetLineItemCount('item');
		
		if(LineCount > 0)
		{
			for(var i=1;i<=LineCount;i++)
			{
				nlapiSetLineItemDisabled('item','location',true,i);
				nlapiSetLineItemDisabled('item','customer',true,i);
			}
		}
		
		
		
	}
  return true;
}
/*
function validateLineLocation(type)
{
   var form = nlapiGetFieldValue('customform');
	
	if(form =='166')//form =='171' || 
	{
		var buff=0;
		var buff1=0;
		var customer=nlapiGetCurrentLineItemValue('item','customer');
		
		var location=nlapiGetCurrentLineItemValue('item','location');
		
		if(customer ==''||customer ==null ||customer ==undefined)
		{
			buff++;
		}
		
		if(location ==''||location ==null ||location ==undefined)
		{
			buff1++;
		}
		
		if(buff > 0 || buff1 > 0)
		{
			alert(' Please click on Update location button to enter values for location and customer on line level ');
			
		}
	}
	return true;
}
*/

function saveValidationBlankValue()
{
	var flag =true;
  
	var form = nlapiGetFieldValue('customform');
	
	if(form =='166')//form =='171' || 
	{
		var LineCount = nlapiGetLineItemCount('item');
		var count=0;
		var count1=0;
		for(var i=1;i<=LineCount;i++)
		{
			var customer=nlapiGetLineItemValue('item','customer',i);
			
			var location=nlapiGetLineItemValue('item','location',i);
			
			if(customer ==''||customer ==null ||customer ==undefined)
			{
				count++;
			}
			
			if(location ==''||location ==null ||location ==undefined)
			{
				count1++;
			}
		}
		
		if(count > 0 || count1 > 0)
		{
			alert(' Please click on Update location button to enter values for location and customer on line level ');
			flag = false;
		}
		
		return flag;
	}
	else 
	{
		return flag;
	}
}
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       9 Apr 2020      Tushar
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function saveValidationonItemDescription()
{
	   var flag =true;
  
		var description =nlapiGetFieldValue('custitem_bc_detailed_description');
		
		var descLength = description.toString().length;
		alert('descLength='+descLength)
		if(descLength > 1250)
		{
			alert('Please Reduced the Description length to 1250 characters..');
			flag= false;
		}
		
		return flag;
		
}

function FieldChangeValidationonItemDescription(type,name,linenum)
{
	
	
	   if(name == 'custitem_bc_detailed_description')
	   {
		   var description =nlapiGetFieldValue('custitem_bc_detailed_description');
			
			var descLength = description.toString().length;
			alert('descLength='+descLength)
			if(descLength > 1250)
			{
				alert('Please Reduced the Description length to 1250 characters..');
				
			}
			
			return true;
			 
	   }
		
		
		
}
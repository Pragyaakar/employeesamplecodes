	/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00      23 Jan 2020     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */

var checkTrue =true;
function UseLocationCustomRecordValidation(type)
{
		
	var parent = nlapiGetFieldValue('parent');
	
	
	var CurrentRecCheck = nlapiGetFieldValue('custrecord_use_location_autonumber');
	
	if(parent != null && parent != '' && parent != undefined)
	{
		var checkBoxlocation = nlapiLookupField('location',parent,'custrecord_use_location_autonumber');
		
		var sublocOf = nlapiLookupField('location',parent,'parent');
		
		if(sublocOf != null && sublocOf !='' && sublocOf != undefined)
		{
		  var sublocOfcheckBoxlocation = nlapiLookupField('location',parent,'custrecord_use_location_autonumber');
		
		 	
			var sublocOf1 = nlapiLookupField('location',sublocOf,'parent');
			
			if(sublocOf1 != null && sublocOf1 !='' && sublocOf1 != undefined)
			{
				var sublocOfcheckBoxlocation1 = nlapiLookupField('location',sublocOf1,'custrecord_use_location_autonumber');
			}
		}
		
	}
	
	if((checkBoxlocation == 'T' || sublocOfcheckBoxlocation == 'T' || sublocOfcheckBoxlocation1 == 'T') && (CurrentRecCheck == 'T'))
	{
		alert(' You can not use multiple Location from the Hierarchy for Autonumbering....');
		checkTrue = false;
	}
	
	return checkTrue;
}
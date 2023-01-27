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

//var checkTrue =true;
function UseLocationCustomRecordValidation(type)
{
		
	var parent = nlapiGetFieldText('parent');
	
	if(parent =='' || parent == undefined || parent == null)
	{
		var parent = nlapiGetFieldValue('name');
		
	}
	
	if(parent.toString().split(':'))
	{
		var substringParent =parent.toString().split(':');
		var checkString =substringParent[0];
	}
	else
	{
		var checkString =parent.toString();
	}
	
	nlapiLogExecution('DEBUG','Location Validation', "checkString :=   "+checkString);
		
		 var locationSearch = nlapiSearchRecord("location","customsearch_location_search_lookup",
			[
			   ["formulatext: SUBSTR({name}, 0,LENGTH({name}))","contains",checkString]
			], 
			[
			   new nlobjSearchColumn("internalid"), 
			   new nlobjSearchColumn("name").setSort(false), 
			   new nlobjSearchColumn("custrecord_use_location_autonumber"), 
			   new nlobjSearchColumn("phone"), 
			   new nlobjSearchColumn("city"), 
			   new nlobjSearchColumn("state"), 
			   new nlobjSearchColumn("country"), 
			   new nlobjSearchColumn("custrecord_loc_abbrevation"), 
			   new nlobjSearchColumn("custrecord1538")
			]
			);
	
	
		
	var counter =0.00;
	if (locationSearch != null)
	{
		nlapiLogExecution('DEBUG','Location Validation', "locationSearch :=   "+locationSearch.length);
		for(var j1=0;j1<locationSearch.length;j1++)
		{
			
			 var alreadyChecked = locationSearch[j1].getValue('custrecord_use_location_autonumber');
			
			     if(alreadyChecked =='T')
				 {
			    	 counter++;
				 }
		}
	}
	
	
	nlapiLogExecution('DEBUG','Location Validation', "counter :=   "+counter);
	
	if(counter > 0)
	{
		throw nlapiCreateError('ERROR'," You can not use multiple Location from the Hierarchy for Autonumbering....", false); 
		
	}
	
}
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Jan 2020     Tushar More
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


function BeforeSubmitInvoiceOnShipItem(type, form, request)
{
	try
	{
		if(type=='create')
		{ 	
	var recordId = nlapiGetRecordId();
    var recordType = nlapiGetRecordType();
    
   var LineCount = nlapiGetLineItemCount('item');
   var vehicleType = nlapiGetFieldValue('custbody_truck_type');
   var CustzipCode;
   var customer = nlapiGetFieldValue('entity');
   
   var customerRecord = nlapiLoadRecord('customer', customer);
   var custPriceLevl = customerRecord.getFieldValue('custentity_kbi_pricelevelcategory');
	
   var numberOfAddress = customerRecord.getLineItemCount('addressbook');
	   
	   for (var x = 1; x <= numberOfAddress; x++)
	   {
	          var defaultaddress = customerRecord.getLineItemValue('addressbook', 'defaultbilling', x);
	               if (defaultaddress == 'T')
	               {
	                      var CustzipCode = customerRecord.getLineItemValue('addressbook', 'zip', x);
	                      break;
	               }
	   }
  
	 
	   nlapiLogExecution('DEBUG', 'SMallest Location value','vehicleType ='+vehicleType);
	   nlapiLogExecution('DEBUG', 'SMallest Location value','customer ='+customer);
	   nlapiLogExecution('DEBUG', 'SMallest Location value','Zipcode ='+CustzipCode);
	   nlapiLogExecution('DEBUG', 'SMallest Location value','custPriceLevl ='+custPriceLevl);
	   

          var createFrom = nlapiGetFieldValue('createdfrom');
          
	   var countChek =0.00;
	
	   for (var m=1;m<=LineCount;m++)
	   {
		   var IsBulkItem = nlapiGetLineItemValue('item','custcol_is_bulk_item',m);
		    nlapiLogExecution('DEBUG', 'SMallest Location value','IsBulkItem ='+IsBulkItem);
		   if(IsBulkItem =='T' && (createFrom =='' || createFrom ==null ||createFrom ==undefined))
		   {
			   countChek++;
		   }
		  
	   }


	   
	if(countChek > 0)
	{
		 var KB_NumLoad =nlapiGetFieldValue('custbody_kb_number_load');
		   var shipIs =nlapiGetFieldValue('custbody_shipping_cost');
		   
		   var rateOn = parseFloat(shipIs)/parseFloat(KB_NumLoad);
		  
		   for(var set=0;set<1;set++){
			   nlapiSelectNewLineItem('item');
			   nlapiSetCurrentLineItemValue('item','item',2213);
			   nlapiSetCurrentLineItemValue('item','quantity',KB_NumLoad);  
			   nlapiSetCurrentLineItemValue('item','custcol_is_bulk_item','T');
			   nlapiSetCurrentLineItemValue('item','price',-1); 
			   nlapiSetCurrentLineItemValue('item','rate',parseFloat(rateOn).toFixed(2)); 
			   nlapiCommitLineItem('item'); 
		   }
	} 
  
	}
	}
	catch(e)
	{
		 nlapiLogExecution('DEBUG', 'SMallest Location value','Error ='+e);
	}
}



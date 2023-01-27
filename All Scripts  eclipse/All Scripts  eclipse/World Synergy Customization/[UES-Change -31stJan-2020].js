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

function BeforeLoadIFcreateButton(type, form, request)
{
//
	
	if(type=='view' )
	{ 
		    var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		
	       var irObj = nlapiLoadRecord(recordType,recordId); 
	    var status = irObj.getFieldValue('orderstatus');
	    nlapiLogExecution('DEBUG', 'Before Load Button','status ='+status);
	    
	    var LineCount=irObj.getLineItemCount('item');
	    
	    var count =0;
	    for (var m=1;m<=LineCount;m++)
	    {
	 	   var IsBulkItem = irObj.getLineItemValue('item','custcol_is_bulk_item',m);
	 	   
	 	   if(IsBulkItem =='T')
	 	   {
	 		  count++;
	 		  break;
	 	   }
	    }
	    
      
       var IfCheckBox = irObj.getFieldValue('custbody_if_check_box');
	    nlapiLogExecution('DEBUG', 'Before Load Button','status ='+status);
	    
      
	    if(IfCheckBox =='F' && count > 0)
	    {
	    	 form.removeButton('process');
	    	form.setScript('customscript_if_triggered_script');
		  	form.addButton('custpage_button1','IF create','IFcreateFunction();');
	       
	    }
	  	
	}
 
}
	
function BeforeSubmitSOforIF(type, form, request)
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
	   

	   var countChek =0.00;
	
	   for (var m=1;m<=LineCount;m++)
	   {
		   var IsBulkItem = nlapiGetLineItemValue('item','custcol_is_bulk_item',m);
		    nlapiLogExecution('DEBUG', 'SMallest Location value','IsBulkItem ='+IsBulkItem);
		   if(IsBulkItem =='T')
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


function MaxCapacityFind(vehicleType,productType,UnitsOfMeasure,CustzipCode)
{
	var filters=new Array();
	var columns = new Array();

	filters[0] = new nlobjSearchFilter('custrecord_kb_vehicle_type', null,'anyof',vehicleType);
	filters[1] = new nlobjSearchFilter('custrecord_product_type', null,'anyof',productType);
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_kb_vehicle_type');
	columns[2] = new nlobjSearchColumn('custrecord_product_type');
	columns[3] = new nlobjSearchColumn('custrecord_max_in_yards');
	columns[4] = new nlobjSearchColumn('custrecord_max_in_tons');
	
	var searchResultItem = nlapiSearchRecord('customrecord_kb_truck_type', null, filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			var max_in_yards = searchResultItem[j].getValue('custrecord_max_in_yards');
			var max_in_tons = searchResultItem[j].getValue('custrecord_max_in_tons');
			
			if(UnitsOfMeasure =='42')
			{
				var finMaxCapacity=max_in_yards;
			}
			else if(UnitsOfMeasure =='24')
			{
				var finMaxCapacity=max_in_tons;
			}
		
		
		}
	}
   return finMaxCapacity;
}


function AfterSubmitIFfromSO(type)
{
	 nlapiLogExecution('DEBUG', 'After Submit So ',' After Submit  Code Starts... ');
	var recordId = nlapiGetRecordId();
    var recordType = nlapiGetRecordType();

    var loadSO = nlapiLoadRecord(recordType,recordId);
    
    
    var fromLoc = loadSO.getFieldValue('custbody_order_origin');
    var relatedZone = loadSO.getFieldValue('custbody_kb_zone');
    var numberLoad = loadSO.getFieldValue('custbody_kb_number_load');
    var totalLoad = loadSO.getFieldValue('custbody_total_order_load');
     var shipCost =loadSO.getFieldValue('altshippingcost');
   
     var NoIs= parseFloat(totalLoad)/parseFloat(numberLoad);
   
     var NoOfTruck = numberLoad;
    

     nlapiLogExecution('DEBUG', 'SMallest Location value','shippCost ='+shipCost);
     
     var lineVals = loadSO.getLineItemCount('item');
     
     var bklItem;
     for (var m=1;m<=lineVals;m++)
     {
  	   var IsBulkItem = loadSO.getLineItemValue('item','custcol_is_bulk_item',m);
  	   
  	   if(IsBulkItem =='T')
  	   {
  		   var SOItem = loadSO.getLineItemValue('item','item',m);
  		break;
  	   }
     }
     
     var CreateIF =loadSO.getFieldValue('custbody_if_check_box');
     
     if(CreateIF =='T')
     {
    	 
     
	  for ( var IF =0 ; IF < NoOfTruck ; IF++)
	  {
	
		     
		    IFqty = parseFloat(totalLoad)/NoOfTruck;
		  
		    var record = nlapiTransformRecord('salesorder',recordId,'itemfulfillment');
		     record.setFieldValue('customform',119);
		     record.setFieldValue('shipstatus','A');//shipstatus
		     
		    var lineCount = record.getLineItemCount('item');
		  
			if(lineCount!= null)
			{
					for(var h=lineCount;h>=1;h--)
					{
						item = record.getLineItemValue('item','item',h);
						nlapiLogExecution('DEBUG', 'After Submit item', "  item==" + item);
						record.setLineItemValue('item','quantity',h,IFqty);
						if(item != SOItem)
						{
							record.removeLineItem('item',h);
							nlapiLogExecution('DEBUG', 'After Submit item', "  Remove line item==");
						}
					}
				
			 }
			
			 var finInvoice =nlapiSubmitRecord(record,false,false)
		   
		  
	  }
     }
}

function findSmallest(numbers) {
       var smallestNumber = numbers[0];
        for (var i = 0; i < numbers.length; i++) {
             if (parseFloat(numbers[i]) < parseFloat(smallestNumber)){
               smallestNumber = numbers[i];
             }
        }
          return smallestNumber;
      }
         
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

var flag=true;
	
function onSaveValidation(type)
{
   var LineCount = nlapiGetLineItemCount('item');
   var vehicleType = nlapiGetFieldValue('custbody_truck_type');
   var CustzipCode;
   var customer = nlapiGetFieldValue('entity');
   
   var customerRecord = nlapiLoadRecord('customer', customer);
	
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
   
  /* alert('vehicleType ='+vehicleType);
   alert('customer ='+customer);
   alert('Zipcode ='+CustzipCode);
   */
   for (var m=1;m<=LineCount;m++)
   {
	   var IsBulkItem = nlapiGetLineItemValue('item','custcol_is_bulk_item',m);
	   
	   if(IsBulkItem =='T')
	   {
		   
		   var productType = nlapiGetLineItemValue('item','custcol_product_type',m);
		   var KB_TotalOrderLoad = nlapiGetLineItemValue('item','quantity',m);
		   var UnitsOfMeasure = nlapiGetLineItemValue('item','units',m);
		   
		    nlapiLogExecution('DEBUG', 'SMallest Location value','vehicleType :='+vehicleType);
		    nlapiLogExecution('DEBUG', 'SMallest Location value','productType :='+productType);
		    nlapiLogExecution('DEBUG', 'SMallest Location value','UnitsOfMeasure :='+UnitsOfMeasure);
		    nlapiLogExecution('DEBUG', 'SMallest Location value','CustzipCode :='+CustzipCode);
		    
		    var MaxCapacityStore = MaxCapacityFind(vehicleType,productType,UnitsOfMeasure,CustzipCode);
		   
		    nlapiLogExecution('DEBUG', 'MaxCapacityStore Catch','MaxCapacityStore :='+MaxCapacityStore);
		    
		    //=========================================================
		    
		    var filters=new Array();
			var columns = new Array();
			filters[0] = new nlobjSearchFilter('custrecord_kb_zip_code', null,'is',CustzipCode);
			filters[1] = new nlobjSearchFilter('custrecord_vehicle_type', null,'anyof',vehicleType);
			
			columns[0] = new nlobjSearchColumn('internalid');
			columns[1] = new nlobjSearchColumn('custrecord_kb_zip_code');
			columns[2] = new nlobjSearchColumn('custrecord_kb_site_name');
			columns[3] = new nlobjSearchColumn('custrecord_kb_truck_price');
			columns[4] = new nlobjSearchColumn('custrecord_kb_truck_distance');
			columns[5] = new nlobjSearchColumn('custrecord_zone');//custrecord_vehicle_type
			columns[6] = new nlobjSearchColumn('custrecord_vehicle_type');//custrecord_vehicle_type
			
			var searchResultItem = nlapiSearchRecord('customrecord_kb_location_lookup', null, filters, columns);
			 var LocMap ={};
			
			var LocMap1 ={};
			var LocMap2 ={};
			
			if (searchResultItem != null)
			{
				for(var j=0;j<searchResultItem.length;j++)
				{
				
					
					var truckPrice = searchResultItem[j].getValue('custrecord_kb_truck_price');
					var truckDistance = searchResultItem[j].getValue('custrecord_kb_truck_distance');
					var orderOrigin = searchResultItem[j].getValue('custrecord_kb_site_name');
					var orderZone = searchResultItem[j].getValue('custrecord_zone');
					
					
					LocMap[truckDistance]=orderOrigin;
					LocMap1[truckDistance]=orderZone;
					LocMap2[truckDistance]=truckPrice;
				
				}
				
			}
		    

		    	var closestLocation = LocMap;
			    var closestLocation1 = LocMap1;
			    var closestLocation2 = LocMap2;
			    
			    nlapiLogExecution('DEBUG', 'closestLocation MAP','JSON.stringify(closestLocation) :='+JSON.stringify(closestLocation));
			    nlapiLogExecution('DEBUG', 'closestLocation MAP','JSON.stringify(closestLocation1) :='+JSON.stringify(closestLocation1));
			    nlapiLogExecution('DEBUG', 'closestLocation MAP','JSON.stringify(closestLocation2) :='+JSON.stringify(closestLocation2));
				
		    
		    var closeDistArr = Object.keys(closestLocation);
		    var closeDistArr1 = Object.keys(closestLocation1);
		    var closeDistArr2 = Object.keys(closestLocation2);
	/*	    if(closeDistArr)
		    {
		    	var smallest = closeDistArr[0];
		    	for (var i=0; i<closeDistArr.length; i++){
		    	    if (closeDistArr[i]<smallest)
		    	    {
		    	        smallest = closeDistArr[i];
		    	    }
		    	}
		    }*/
		    
		    var smallest= findSmallest(closeDistArr);
		    nlapiLogExecution('DEBUG', 'SMallest Location value','smallest ='+smallest);
		
		    
		 break;
	   }
	  
	   
   }
 var KB_OrderOrigin =LocMap[smallest];
   
   var KB_Zone =LocMap1[smallest];
   
   var LocationPrice =LocMap2[smallest];
   
   var num = parseFloat(KB_TotalOrderLoad)/parseFloat(MaxCapacityStore);

   var KB_NumLoad = Math.ceil(num);

   var shippCost = parseFloat(KB_Zone) * parseFloat(KB_NumLoad) * parseFloat(LocationPrice);
   
   if(KB_OrderOrigin !=null && KB_OrderOrigin !='' && KB_OrderOrigin !=undefined)
   {
	   KB_OrderOrigin=KB_OrderOrigin;
   }
   else {
	   KB_OrderOrigin='';
   }
   
   if(KB_Zone !=null && KB_Zone !='' && KB_Zone !=undefined && isNaN(KB_Zone)==false)
   {
	   KB_Zone=KB_Zone;
   }
   else {
	   KB_Zone='';
   }
   
   if(KB_NumLoad !=null && KB_NumLoad !='' && KB_NumLoad !=undefined && isNaN(KB_NumLoad)==false)
   {
	   KB_NumLoad=KB_NumLoad;
   }
   else {
	   KB_NumLoad='';
   }
   
   if(LocationPrice !=null && LocationPrice !='' && LocationPrice !=undefined && isNaN(LocationPrice)==false)
   {
	   LocationPrice=LocationPrice;
   }
   else {
	   LocationPrice='';
   }
   
   nlapiLogExecution('DEBUG', 'SMallest Location value','KB_OrderOrigin ='+KB_OrderOrigin);
   nlapiLogExecution('DEBUG', 'SMallest Location value','KB_Zone ='+KB_Zone);
   nlapiLogExecution('DEBUG', 'SMallest Location value','LocationPrice ='+LocationPrice);
   nlapiLogExecution('DEBUG', 'SMallest Location value','KB_NumLoad ='+KB_NumLoad);
   nlapiLogExecution('DEBUG', 'SMallest Location value','shippCost ='+shippCost);
   
   
   nlapiSetFieldValue('location',KB_OrderOrigin);
   nlapiSetFieldValue('custbody_order_origin',KB_OrderOrigin);
   nlapiSetFieldValue('custbody_kb_zone',KB_Zone);
   nlapiSetFieldValue('custbody_kb_number_load',KB_NumLoad);
   nlapiSetFieldValue('custbody_total_order_load',KB_TotalOrderLoad);
   //nlapiSetFieldValue('altshippingcost',shippCost);
   
  
   
   var rateOn = parseFloat(shippCost)/parseFloat(KB_TotalOrderLoad);
  
	
   var customer = nlapiGetFieldValue('entity');
	//alert('customer =='+customer);
	
	var truckType = nlapiGetFieldValue('custbody_truck_type');
	
	var shipAdd = nlapiGetFieldValue('shipaddress');
	//alert('shipAdd =='+shipAdd);
	
	var kb_loadNo = nlapiGetFieldValue('custbody_kb_number_load');
	//alert('kb_loadNo ='+kb_loadNo);
		
	var kb_Orderload = nlapiGetFieldValue('custbody_total_order_load');
	//alert('kb_Orderload ='+kb_Orderload);
		
	var kb_Order_origin = nlapiGetFieldValue('custbody_order_origin');
	//alert('kb_Order_origin ='+kb_Order_origin);
		
	var kb_zone = nlapiGetFieldValue('custbody_kb_zone');
	//alert('kb_zone ='+kb_zone);
	

	
	 if((productType == null || productType == '' || productType == undefined) && (IsBulkItem == 'T'))
	    {
	    	alert('Product Type is not Available For this Item');
	    	flag = false;
	    }
	
	
	if((shipAdd == null || shipAdd == '' || shipAdd == undefined) && (IsBulkItem == 'T'))
	{
		alert('The Ship to Address is Blank');
		flag = false;
	}
	
	else if((truckType == '' || truckType == null || truckType == undefined) && (IsBulkItem == 'T'))
	{
		alert('Please Enter a Value for Truck Type');
		flag = false;
	}
	
	else if((kb_loadNo == null || kb_loadNo == '' || kb_loadNo == undefined) && (IsBulkItem == 'T'))
	{
		alert('KB Number Load is Blank')
		flag = false;
	}
	
	else if((kb_Orderload == null || kb_Orderload == '' || kb_Orderload == undefined) && (IsBulkItem == 'T'))
	{
		alert('KB Total Oder Load is Blank')
		flag = false;
	}
	
	else if((kb_Order_origin == null || kb_Order_origin == '' || kb_Order_origin == undefined) && (IsBulkItem == 'T'))
	{
		alert('KB Order is Blank')
		flag = false;
	}
	
	else if((kb_zone == null || kb_zone == '' || kb_zone == undefined) && (isBulk == 'T'))
	{
		alert('KB Zone is Blank')
		flag = false;
	}
	
	return flag;
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
	   nlapiLogExecution('DEBUG', 'MaxCapacityFind','searchResultItem ='+searchResultItem);
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			var max_in_yards = searchResultItem[j].getValue('custrecord_max_in_yards');
			var max_in_tons = searchResultItem[j].getValue('custrecord_max_in_tons');
			
			nlapiLogExecution('DEBUG', 'MaxCapacityFind','max_in_tons ='+max_in_tons);
			
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


function cltFieldChangeValidation(type,name,linenum)
{
	/*if(name == 'entity')
	{
		var customer = nlapiGetFieldValue('entity');
		//alert('customer =='+customer);
		
		var customerRecord = nlapiLoadRecord('customer',customer);
		//alert('customerRecord =='+customerRecord);
		
		var numberOfAddress = customerRecord.getLineItemCount('addressbook');
		//alert('numberOfAddress =='+numberOfAddress);
		
		for (var x = 1; x <= numberOfAddress; x++)
		{
			var defaultaddress = customerRecord.getLineItemValue('addressbook','defaultshipping',x);
			//alert('defaultaddress =='+defaultaddress);
			
			if(defaultaddress == 'T')
			{
			    var CustzipCode = customerRecord.getLineItemValue('addressbook','zip',x);
			    //alert('CustzipCode =='+CustzipCode);
			    
			    if((CustzipCode == null || CustzipCode == '' || CustzipCode == undefined) && (isBulk == 'T'))
			    {
			    	alert('In Customer Address The Zip Code is Not Available..');
			    }
			}
		}
		if(defaultaddress == 'F')
		{
			alert('The Ship To Address is Not Available For This Customer')
		}
	}*/
	
	if(type == 'item' || name == 'item')
	{
		var customer = nlapiGetFieldValue('entity');
		
		var priceLevel = nlapiLookupField('customer',customer,'custentity_kbi_pricelevelcategory');
		//alert('priceLevel ='+priceLevel)
		
		var item = nlapiGetCurrentLineItemValue('item','item');
		//alert('item =='+item);
			
		var isBulk = nlapiGetCurrentLineItemValue('item','custcol_is_bulk_item');
		//alert('isBulk =='+isBulk);
			
		if((isBulk == 'F') && (item != null && item != '' && item != undefined) && (linenum == '1'))
		{
			//alert('condition true =')
			nlapiSetCurrentLineItemValue('item','custcol_is_bulk_item','T',true,false);
			
			if(priceLevel != null && priceLevel != '' && priceLevel != undefined && linenum == '1')
			{
				nlapiSetCurrentLineItemValue('item','custcol_cust_pricelevel_category',priceLevel,true,true);
			}
				
			if(isBulk == 'T' && linenum == '1')
			{
				nlapiDisableLineItemValue('item','custcol_is_bulk_item','T');	
			}
			else
			{
				nlapiDisableLineItemField('item','custcol_is_bulk_item','F');
			}
		}
	}
}

var flag1 = true;
function validateLinePrice(type)
{
	if(type == 'item' && name == 'item')
	{
		var customer = nlapiGetFieldValue('entity');
		
		var priceLevel = nlapiLookupField('customer',customer,'custentity_kbi_pricelevelcategory');
		
		if(priceLevel != null && priceLevel != '' && priceLevel != undefined)
		{
			alert('priceLevel ='+priceLevel)
			
			nlapiSetCurrentLineItemValue('item','custcol_cust_pricelevel_category',priceLevel,true ,true);
			flag1 = true;
		}
		else
		{
			flag1 = false;
		}
	}
	return flag1;
}

function findSmallest(numbers) {
    var smallestNumber = numbers[0];
     for (var i = 0; i < numbers.length; i++) {
          if (parseFloat(numbers[i]) < parseFloat(smallestNumber)) {
            smallestNumber = numbers[i];
          }
     }
       return smallestNumber;
   }
      
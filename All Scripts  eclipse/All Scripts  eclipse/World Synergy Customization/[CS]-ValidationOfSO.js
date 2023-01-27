var flag = true;
function onSaveValidation()
{
	
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
	
	for(var j=1; j<= nlapiGetLineItemCount('item'); j++)
	{
		//alert('lineCount '+nlapiGetLineItemCount('item'));
		
		var item = nlapiGetCurrentLineItemValue('item','item');
		//alert('item =='+item);
		
		var isBulk = nlapiGetLineItemValue('item','custcol_is_bulk_item',j);
	    //alert('isBulk =='+isBulk);
		
		var productType = nlapiGetLineItemValue('item','custcol_product_type',j);
	    //alert('productType =='+productType);
		
	    if(isBulk == 'F')
	    {
			nlapiSetLineItemValue('item','custcol_is_bulk_item',1,'T');
			//flag = true;
		}
	    
	    if((productType == null || productType == '' || productType == undefined) && (isBulk == 'T'))
	    {
	    	alert('Product Type is not Available For this Item');
	    	flag = false;
	    }
	    
	}
	
	if((shipAdd == null || shipAdd == '' || shipAdd == undefined) && (isBulk == 'T'))
	{
		alert('The Ship to Address is Blank');
		flag = false;
	}
	
	else if((truckType == '' || truckType == null || truckType == undefined) && (isBulk == 'T'))
	{
		alert('Please Enter a Value for Truck Type');
		flag = false;
	}
	
	else if((kb_loadNo == null || kb_loadNo == '' || kb_loadNo == undefined) && (isBulk == 'T'))
	{
		alert('KB Number Load is Blank')
		flag = false;
	}
	
	else if((kb_Orderload == null || kb_Orderload == '' || kb_Orderload == undefined) && (isBulk == 'T'))
	{
		alert('KB Total Oder Load is Blank')
		flag = false;
	}
	
	else if((kb_Order_origin == null || kb_Order_origin == '' || kb_Order_origin == undefined) && (isBulk == 'T'))
	{
		alert('KB Order is Blank')
		flag = false;
	}
	
	else if((kb_zone == null || kb_zone == '' || kb_zone == undefined) && (isBulk == 'T'))
	{
		alert('KB Zone is Blank')
		flag = false;
	}
		
	else if(shipAdd != null || shipAdd != '' || shipAdd != undefined)
	{	
		var customerRecord = nlapiLoadRecord('customer', customer);
		
		var numberOfAddress = customerRecord.getLineItemCount('addressbook');
			   
		for (var x = 1; x <= numberOfAddress; x++)
		{
			var defaultaddress = customerRecord.getLineItemValue('addressbook','defaultbilling',x);
			if (defaultaddress == 'T')
			{
			    var CustzipCode = customerRecord.getLineItemValue('addressbook','zip',x);
			    //alert('CustzipCode =='+CustzipCode);
			    
			    if((CustzipCode == null || CustzipCode == '' || CustzipCode == undefined) && (isBulk == 'T'))
			    {
			    	alert('In Customer Address The Zip Code is Not Available..');
			    	flag = false;
			    	//break;
			    }
			 }
		}
	}
	
	alert('flag return=='+flag);
	return flag;
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

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
	
	var finalZip;
		
	function onSaveValidation(type)
	{
		//alert('Validate Line Function....')
		var flag=true;
		
	   var LineCount = nlapiGetLineItemCount('item');
	   var vehicleType = nlapiGetFieldValue('custbody_truck_type');
	   var CustzipCode;
	   var customer = nlapiGetFieldValue('entity');
	   if (customer != null && customer !='' && customer != undefined)
	   {
		   var customerRecord = nlapiLoadRecord('customer', customer);
			var CustPriceLvl =customerRecord.getFieldValue('custentity_kbi_pricelevelcategory');
		   
			if (CustPriceLvl != null && CustPriceLvl !='' && CustPriceLvl != undefined)
			   {
				  var txtpriceLvl = nlapiLookupField('customlist213',CustPriceLvl,'name');
			   }
		  
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
	   }
	   else{
		   alert('Please Select the Customer...');
	   }
	  
	  // alert('CustPriceLvl ='+txtpriceLvl);
	  // alert('vehicleType ='+vehicleType);
	  //  alert('customer ='+customer);
	  //  alert('Zipcode ='+CustzipCode);
	   
	   
		   var IsBulkItem = nlapiGetCurrentLineItemValue('item','custcol_is_bulk_item');//,m
		  // alert('IsBulkItem ='+IsBulkItem);
		   
		   var lineValue = nlapiGetCurrentLineItemIndex('item');
		  // alert('lineValue ='+lineValue);
		   
		   if((IsBulkItem =='T') && (lineValue == '1') && (vehicleType != null && vehicleType != '' && vehicleType != undefined ))
		   {
			   
			   var productType = nlapiGetCurrentLineItemValue('item','custcol_product_type');//,m
			   var KB_TotalOrderLoad = nlapiGetCurrentLineItemValue('item','quantity');//,m
			   var UnitsOfMeasure = nlapiGetCurrentLineItemValue('item','units');//,m
			   
			   
			  // alert('productType ='+productType);
			 //  alert('KB_TotalOrderLoad ='+KB_TotalOrderLoad);
			 //  alert('UnitsOfMeasure ='+UnitsOfMeasure);
			   
			    nlapiLogExecution('DEBUG', 'SMallest Location value','vehicleType :='+vehicleType);
			    nlapiLogExecution('DEBUG', 'SMallest Location value','productType :='+productType);
			    nlapiLogExecution('DEBUG', 'SMallest Location value','UnitsOfMeasure :='+UnitsOfMeasure);
			    nlapiLogExecution('DEBUG', 'SMallest Location value','CustzipCode :='+CustzipCode);
			    
			    if(vehicleType != null && vehicleType !='' && vehicleType != undefined)
				{
			    	if(productType != null && productType !='' && productType != undefined)
					{
			    		if(UnitsOfMeasure != null && UnitsOfMeasure !='' && UnitsOfMeasure != undefined)
						{
			    			var MaxCapacityStore = MaxCapacityFind(vehicleType,productType,UnitsOfMeasure,CustzipCode);
						
			    			 nlapiLogExecution('DEBUG', 'MaxCapacityStore Catch','MaxCapacityStore :='+MaxCapacityStore);
			 			    
							  
			 				//================================Find nearest location which having stock===========================================
			 						    
			 						     
			 						    var item = nlapiGetCurrentLineItemValue('item','item');
			 							nlapiLogExecution('DEBUG', 'item Catch','item :='+item);
			 							    
			 							var filter1 = new Array();
			 							filter1[0] = new nlobjSearchFilter("internalid",null,"anyof",item);
			 							filter1[1] = new nlobjSearchFilter("locationquantityavailable",null,"greaterthanorequalto",KB_TotalOrderLoad);
			 							   
			 							var columns1 = new Array();
			 							columns1[0] = new nlobjSearchColumn("internalid",null,"GROUP");
			 							columns1[1] = new nlobjSearchColumn("name","inventoryLocation","GROUP");
			 							columns1[2] = new nlobjSearchColumn("internalid","inventoryLocation","GROUP");
			 							columns1[3] = new nlobjSearchColumn("locationquantityavailable",null,"SUM");
			 							   
			 							
			 							 var ItemSearch =getSavedSearchResult('item', 'customsearch_item_search', filter1);
			 							
			 							INVLoc = {};
			 							INVMap = {};
			 							INVMap1 = {};
			 							   
			 							if(ItemSearch != null)
			 							{
			 								nlapiLogExecution('DEBUG', 'Search Length Catch','ItemSearch.length :='+ItemSearch.length);
			 								   
			 									for(var p=0;p<ItemSearch.length;p++)
			 									{
			 										var itemID = ItemSearch[p].getValue('internalid',null,"GROUP");
			 										var InventoryLocation = ItemSearch[p].getValue("name","inventoryLocation","GROUP");
			 										var locationID = ItemSearch[p].getValue("internalid","inventoryLocation","GROUP");
			 										var Location_ONHand = ItemSearch[p].getValue('locationquantityavailable',null,"SUM");
			 										
			 										INVMap[locationID] = itemID;
			 										INVMap1[locationID] = Location_ONHand;
			 									}
			 						    }
			 							   
			 			    //=========================================================
			 			    
			 			    var zipClosestAvail = FindToNearestAvailableZip(vehicleType,CustzipCode,INVMap1,KB_TotalOrderLoad);
			 			    
			 			    nlapiLogExecution('DEBUG', 'FindToNearestAvailableZip','zipClosestAvail :='+zipClosestAvail);
			 			    
			 			    var filters=new Array();
			 				var columns = new Array();
			 				filters[0] = new nlobjSearchFilter('custrecord_kb_zip_code', null,'equalto',zipClosestAvail);
			 				
			 				if(vehicleType != null && vehicleType != '')
			 		        {
			 				 filters[1] = new nlobjSearchFilter('custrecord_vehicle_type', null,'anyof',vehicleType);
			 				}
			 				
			 				columns[0] = new nlobjSearchColumn('internalid');
			 				columns[1] = new nlobjSearchColumn('custrecord_kb_zip_code');
			 				columns[2] = new nlobjSearchColumn('custrecord_kb_site_name');
			 				columns[3] = new nlobjSearchColumn('custrecord_kb_truck_price');
			 				columns[4] = new nlobjSearchColumn('custrecord_kb_truck_distance');
			 				columns[5] = new nlobjSearchColumn('custrecord_zone');//custrecord_vehicle_type
			 				columns[6] = new nlobjSearchColumn('custrecord_vehicle_type');//custrecord_vehicle_type
			 				
			 	
			 				var searchResultItem = getSavedSearchResult('customrecord_kb_location_lookup', 'customsearch_look_location_search', filters);
			 				
			 				
			 				var LocMap ={};
			 				
			 				var LocMap1 ={};
			 				var LocMap2 ={};
			 				// alert('searchResultItem ='+searchResultItem);
			 				
			 				if (searchResultItem != null)
			 				{
			 					for(var j1=0;j1<searchResultItem.length;j1++)
			 					{
			 					
			 						
			 						var truckPrice = searchResultItem[j1].getValue('custrecord_kb_truck_price');
			 						var truckDistance = searchResultItem[j1].getValue('custrecord_kb_truck_distance');
			 						var orderOrigin = searchResultItem[j1].getValue('custrecord_kb_site_name');
			 						var orderZone = searchResultItem[j1].getValue('custrecord_zone');
			 						
			 						
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
			 	
			 	
			 			    var smallest= findSmallest(closeDistArr);
			 			    
			 			    nlapiLogExecution('DEBUG', 'SMallest Location value','smallest ='+smallest);
			 			    
			 			    closeDistArr.sort(function(a, b){return a - b});
			 				

			 				   var InventoryLoc = INVMap;
			 				   var InventoryQty = INVMap1;
			 				   
			 				   nlapiLogExecution('DEBUG', 'closestLocation MAP','JSON.stringify(InventoryLoc) :='+JSON.stringify(InventoryLoc));
			 				   nlapiLogExecution('DEBUG', 'closestLocation MAP','JSON.stringify(InventoryQty) :='+JSON.stringify(InventoryQty));
			 				     
			 				   /*nlapiLogExecution('DEBUG', 'itemID Catch','itemID :='+itemID);
			 				   nlapiLogExecution('DEBUG', 'InventoryLocation Catch','InventoryLocation :=' + InventoryLocation +'Location ID :=' + locationID);
			 				   nlapiLogExecution('DEBUG', 'Location_ONHand Catch','Location_ONHand :='+Location_ONHand);*/
			 				   
			 				   var closeInvArr = Object.keys(InventoryLoc);
			 				   nlapiLogExecution('DEBUG', 'itemID Catch','closeInvArr :='+closeInvArr);
			 				   nlapiLogExecution('DEBUG', 'itemID Catch','KB_OrderOrigin :='+KB_OrderOrigin);
			 				   
			 			   // var smallest = funToFindSMall(closeDistArr);	
			 				   nlapiLogExecution('DEBUG', 'itemID Catch','InventoryQty[KB_OrderOrigin] :='+InventoryQty[KB_OrderOrigin]);
			 				   var NearAvailable;
			 				   var NearAvailableDist;
			 			    for(var j=0;j<closeDistArr.length;j++)
			 			    {
			 			    	// nlapiLogExecution('DEBUG', 'itemID Catch','closeDistArr :='+LocMap[closeDistArr[j]]+'  InventoryQty[closeDistArr[j]] == '+InventoryQty[LocMap[closeDistArr[j]]]);
			 			    	if(InventoryQty[LocMap[closeDistArr[j]]] == null || InventoryQty[LocMap[closeDistArr[j]]] == '' || InventoryQty[LocMap[closeDistArr[j]]] == undefined)
			 				    {
			 				    	InventoryQty[LocMap[closeDistArr[j]]] = 0.00;
			 				    }
			 				    else{
			 				    	 nlapiLogExecution('DEBUG', 'itemID Catch','closeDistArr :='+LocMap[closeDistArr[j]]+'  InventoryQty[closeDistArr[j]] == '+InventoryQty[LocMap[closeDistArr[j]]]);
			 					    	
			 				    	InventoryQty[LocMap[closeDistArr[j]]]=InventoryQty[LocMap[closeDistArr[j]]];
			 				    	
			 				    	 if(parseFloat(InventoryQty[LocMap[closeDistArr[j]]]) > parseFloat(KB_TotalOrderLoad))
			 					    	{
			 				    		 nlapiLogExecution('DEBUG', 'itemID Catch','Inside to Break := Near avail='+ LocMap[closeDistArr[j]]);
			 				    		 nlapiLogExecution('DEBUG', 'itemID Catch','Inside to Break := Near Dist='+ closeDistArr[j]);
			 							    
			 						    	
			 					    		 NearAvailable = LocMap[closeDistArr[j]];
			 					    		 NearAvailableDist =closeDistArr[j];
			 					    		break;
			 					    		
			 					    	}
			 				    }
			 				    
			 				   
			 			    }
			 			    
			 			    nlapiLogExecution('DEBUG', 'SMallest Location value','NearAvailable ='+NearAvailable);
			 			    nlapiLogExecution('DEBUG', 'SMallest Location value','NearAvailableDist ='+NearAvailableDist);
			 	
			 			    //alert('NearAvailable ='+NearAvailable);
			 			    //alert('NearAvailableDist ='+NearAvailableDist);
			 	//==========================================================================================================		    
			 	            
			 				var KB_OrderOrigin =LocMap[NearAvailableDist];
			 			    
			 			    var KB_Zone =LocMap1[NearAvailableDist];
			 			    
			 			    var LocationPrice =LocMap2[NearAvailableDist];
			 			    
			 			    var num = parseFloat(KB_TotalOrderLoad)/parseFloat(MaxCapacityStore);
			 	
			 			    var KB_NumLoad = Math.ceil(num);
			 	
			 			    var shippCost =parseFloat(KB_NumLoad) * parseFloat(LocationPrice);
			 				
			 			    // alert('KB_OrderOrigin ='+KB_OrderOrigin);
			 			   // alert('KB_Zone ='+KB_Zone);
			 			   // alert('LocationPrice ='+LocationPrice);
			 			   // alert('KB_NumLoad ='+KB_NumLoad);
			 			   // alert('shippCost ='+shippCost);
			 			    
			 				if(LocationPrice !=null && LocationPrice !='' && LocationPrice !=undefined && isNaN(LocationPrice)==false)
			 			    {
			 			 	   LocationPrice=LocationPrice;
			 			    }
			 			    else 
			 				{
			 			 	   LocationPrice='';
			 			    }
			 			    
			 			    nlapiLogExecution('DEBUG', 'SMallest Location value','KB_OrderOrigin ='+KB_OrderOrigin);
			 			    nlapiLogExecution('DEBUG', 'SMallest Location value','KB_Zone ='+KB_Zone);
			 			    nlapiLogExecution('DEBUG', 'SMallest Location value','LocationPrice ='+LocationPrice);
			 			    nlapiLogExecution('DEBUG', 'SMallest Location value','KB_NumLoad ='+KB_NumLoad);
			 			    nlapiLogExecution('DEBUG', 'SMallest Location value','shippCost ='+shippCost);
			 			    
			 			    if(KB_OrderOrigin !=null && KB_OrderOrigin !='' && KB_OrderOrigin !=undefined)
			 			    {
			 			      nlapiSetFieldValue('location',KB_OrderOrigin);
			 			    }
			 			    
			 			    if(KB_OrderOrigin !=null && KB_OrderOrigin !='' && KB_OrderOrigin !=undefined)
			 			    {
			 			      nlapiSetFieldValue('custbody_order_origin',KB_OrderOrigin);
			 			    }
			 			    
			 			    if(KB_Zone !=null && KB_Zone !='' && KB_Zone !=undefined && isNaN(KB_Zone)==false)
			 			    {
			 			       nlapiSetFieldValue('custbody_kb_zone',KB_Zone);
			 			    }
			 			    
			 			    if(KB_NumLoad !=null && KB_NumLoad !='' && KB_NumLoad !=undefined && isNaN(KB_NumLoad)==false)
			 			    {
			 			      nlapiSetFieldValue('custbody_kb_number_load',KB_NumLoad);
			 			    }
			 			    
			 			    nlapiSetFieldValue('custbody_total_order_load',KB_TotalOrderLoad);
			 			    
			 			    if(shippCost !=null && shippCost !='' && shippCost !=undefined && isNaN(shippCost)==false)
			 			    {
			 			      nlapiSetFieldValue('custbody_shipping_cost',shippCost);
			 			    }
			 			   
			 			    
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
			 			 	
			 			 	  if((CustzipCode == null || CustzipCode == '' || CustzipCode == undefined) && (IsBulkItem == 'T'))
			 			 		{
			 			 			alert('Zip code for the Selected Customer is Empty...')
			 			 			flag = false;
			 			 		}
			 			 	
			 			 	 if((productType == null || productType == '' || productType == undefined) && (IsBulkItem == 'T'))
			 			 	    {
			 			 	    	alert('Product Type is not Available For this Item..');
			 			 	    	flag = false;
			 			 	    }
			 			 	
			 			 	
			 			 	if((shipAdd == null || shipAdd == '' || shipAdd == undefined) && (IsBulkItem == 'T'))
			 			 	{
			 			 		alert('The Ship to Address is Blank...');
			 			 		flag = false;
			 			 	}
			 			 	
			 			 	if((truckType == '' || truckType == null || truckType == undefined) && (IsBulkItem == 'T'))
			 			 	{
			 			 		alert('Please Enter a Value for Truck Type..');
			 			 		flag = false;
			 			 	}
			 			 	
			 			 	 if((kb_loadNo == null || kb_loadNo == '' || kb_loadNo == undefined) && (IsBulkItem == 'T'))
			 			 	{
			 			 		alert('KB Number Load is Empty...')
			 			 		flag = false;
			 			 	}
			 			 	
			 			 	 if((kb_Orderload == null || kb_Orderload == '' || kb_Orderload == undefined) && (IsBulkItem == 'T'))
			 			 	{
			 			 		alert('KB Total Oder Load is Empty...')
			 			 		flag = false;
			 			 	}
			 			 	
			 			 	else if((kb_Order_origin == null || kb_Order_origin == '' || kb_Order_origin == undefined) && (IsBulkItem == 'T'))
			 			 	{
			 			 		alert('KB Order is Empty...')
			 			 		flag = false;
			 			 	}
			 			 	
			 			    if((kb_zone == null || kb_zone == '' || kb_zone == undefined) && (IsBulkItem == 'T'))
			 			 	{
			 			 		alert('KB Zone is Empty...')
			 			 		flag = false;
			 			 	}
			 			    
			 			    var INVLocation = nlapiGetFieldValue('location');
			 				nlapiLogExecution('DEBUG', 'itemID Catch','INVLocation :='+INVLocation);
			 				 
			 			    if(INVLocation !=null && INVLocation != undefined && INVLocation !='')
			 			    {
			 			    	  var INVLocationTxt = nlapiGetFieldText('location');
			 			    	  
			 			    	  var strPrice = INVLocationTxt+'('+txtpriceLvl+')';
			 			    	  
			 			    	  var FltSet =strPrice.toString().split(": ");
			 			    	  
			 			    	  // alert('FltSet[1] ='+FltSet[1]);
			 			    	  
			 			    	  var ValueOfPriceLvl = FindPriceLvlFun(item,(FltSet[1]).toString())
			 			    	  // alert('ValueOfPriceLvl ='+ValueOfPriceLvl);
			 			    }
			 			    nlapiSetCurrentLineItemValue('item','price',ValueOfPriceLvl);
			 		  
						
			    			
						}
			    		else
			    		{
			    			alert('Please defined the Units Of measure...')
			    			 flag = false;
			    		}
			    		
					}
			    	else
		    		{
		    			alert('Please defined the Product Type...')
		    			 flag = false;
		    		}
			    
				}
		   }
 		   else if(IsBulkItem =='T' && lineValue == '1' && (vehicleType == null || vehicleType == '' || vehicleType == undefined ))
 		   {
 			   alert('Please Enter a Value for Truck Type..')
 			   flag = false;
 		   }
				//alert('MaxCapacityStore ='+MaxCapacityStore);
			    			
			   
		return flag;
	
	}
	
	
	function MaxCapacityFind(vehicleType,productType,UnitsOfMeasure,CustzipCode)
	{
		
		var filters = new Array();
		var columns = new Array();
		
		if(vehicleType != null && vehicleType != '')
		{
			nlapiLogExecution('DEBUG', 'MaxCapacityFind','Vehicle Type should not be blank =');	
			filters[0] = new nlobjSearchFilter('custrecord_kb_vehicle_type',null,'anyof',vehicleType);
		}
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
	
	
	function FindPriceLvlFun(item,Chck)
	{
		
		// alert('Levl ='+Chck)
		// alert('item ='+item)
		var filters1=new Array();
		var columns1 = new Array();
	
		filters1[0] = new nlobjSearchFilter('internalid', null,'anyof',item);
		// filters1[1] = new nlobjSearchFilter('pricelevel', 'pricing','anyof',Chck);
		
		columns1[0] = new nlobjSearchColumn('internalid');
		columns1[1] = new nlobjSearchColumn("pricelevel","pricing",null);
		columns1[2] = new nlobjSearchColumn("internalid","pricing",null);
		columns1[3] = new nlobjSearchColumn("item","pricing",null);
		
		var searchResultItem1 =getSavedSearchResult('item', 'customsearch_item_pricelevel', filters1);
		
		nlapiLogExecution('DEBUG', 'MaxCapacityFind','searchResultItem1 ='+searchResultItem1);
		
		if (searchResultItem1 != null)
		{
			for(var j1=0;j1<searchResultItem1.length;j1++)
			{
				var intIdPriceText = searchResultItem1[j1].getText("pricelevel","pricing");
				
				var intIdPrice = searchResultItem1[j1].getValue("internalid","pricing");
				
				
				//nlapiLogExecution('DEBUG', 'intIdPrice','intIdPriceText ='+intIdPriceText.toString().length +' Chck='+Chck.length);
				if((intIdPriceText).toString() === Chck.toString())
				{
					break;
				}
				//nlapiLogExecution('DEBUG', 'intIdPrice','intIdPrice ='+intIdPrice);
					
			}
		}
	   return intIdPrice;
	}
	
	
	function cltFieldChangeValidation(type,name,linenum)
	{
		//alert('FieldChange Trigger')
		
		if(type == 'item' || name == 'item')
		{
			var itemType;
			
			var customer = nlapiGetFieldValue('entity');
				
			if(customer != null && customer != '' && customer != undefined)
			{
			
			var priceLevel = nlapiLookupField('customer',customer,'custentity_kbi_pricelevelcategory');
			//alert('priceLevel ='+priceLevel)
			}
			var item = nlapiGetCurrentLineItemValue('item','item');
			
			var isBulk = nlapiGetCurrentLineItemValue('item','custcol_is_bulk_item');
			//alert('item =='+item);
			
		
			
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
				// alert('priceLevel ='+priceLevel)
				
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
	  
	function FindToNearestAvailableZip(vehicleType,CustzipCode,INVMap1,KB_TotalOrderLoad)
	{ 
	    var filters=new Array();
		var columns = new Array();
		
		if(vehicleType != null && vehicleType != '')
	    {
		 filters[0] = new nlobjSearchFilter('custrecord_vehicle_type', null,'anyof',vehicleType);
		}
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('custrecord_kb_zip_code');
		columns[2] = new nlobjSearchColumn('custrecord_kb_site_name');
		columns[3] = new nlobjSearchColumn('custrecord_kb_truck_price');
		columns[4] = new nlobjSearchColumn('custrecord_kb_truck_distance');
		columns[5] = new nlobjSearchColumn('custrecord_zone');//custrecord_vehicle_type
		columns[6] = new nlobjSearchColumn('custrecord_vehicle_type');//custrecord_vehicle_type
		
		var searchResultItem =getSavedSearchResult('customrecord_kb_location_lookup', 'customsearch_look_location_search', filters);
		
		
		var ZipSiteMap={};
		var zipArr =[];
		var LocArr=[];
			
		if (searchResultItem != null)
		{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var zip = searchResultItem[j1].getValue('custrecord_kb_zip_code');
					var SiteName = searchResultItem[j1].getValue('custrecord_kb_site_name');
					
					ZipSiteMap[zip]=SiteName;
					zipArr.push(zip);	
					LocArr.push(SiteName);	
				}
				
		}
			
			var closestTo = CustzipCode;
			
			var compareLocations = Object.keys(INVMap1);
			
			var closestZipCodee = FindAvailableLocationToZip(vehicleType,closestTo,zipArr,LocArr,compareLocations);
			
			// alert('closestZipCodee ='+closestZipCodee)
				
			 
			return closestZipCodee;
		}
	
	
	function FindAvailableLocationToZip(vehicleType,closestTo,zipArr,LocArr,compareLocations)
	{
		var uniqArr =removeDuplicates(zipArr);
		
		var closest = Math.max.apply(null, uniqArr); //Get the highest number in arr in case it match nothing.

		    for(var i = 0; i < uniqArr.length; i++)
		    { //Loop the array
		        if(uniqArr[i] >= closestTo && uniqArr[i] < closest) 
		        	{
		        	  closest = uniqArr[i];//Check if it's higher than your number, but lower than your closest value
		        	}
		     }

		   //  alert('closest ='+closest)
		  //  alert('uniqArr ='+uniqArr)
		  //  alert('Sorted Zip Arr ='+uniqArr.sort())
		  //  alert('compareLocations '+compareLocations)
		    
		    
	//==============================================================================
		    
		    var filters1z =new Array();
			var columns1z = new Array();
			
		    
		    if(vehicleType != null && vehicleType != '' && vehicleType != undefined)
		    {
			 filters1z[0] = new nlobjSearchFilter('custrecord_vehicle_type', null,'anyof',vehicleType);
			}
			
		    if(closest != null && closest != '' && closest != undefined)
		    {
		   	  filters1z[1] = new nlobjSearchFilter('custrecord_kb_zip_code', null,'equalto',closest);
			}
			
			columns1z[0] = new nlobjSearchColumn('internalid');
			columns1z[1] = new nlobjSearchColumn('custrecord_kb_zip_code');
			columns1z[2] = new nlobjSearchColumn('custrecord_kb_site_name');
			columns1z[3] = new nlobjSearchColumn('custrecord_kb_truck_price');
			columns1z[4] = new nlobjSearchColumn('custrecord_kb_truck_distance');
			columns1z[5] = new nlobjSearchColumn('custrecord_zone');//custrecord_vehicle_type
			columns1z[6] = new nlobjSearchColumn('custrecord_vehicle_type');//custrecord_vehicle_type
			
			var searchResultItem1z =getSavedSearchResult('customrecord_kb_location_lookup', 'customsearch_look_location_search', filters1z);
			var CloseSiteArr=[];
			if (searchResultItem1z != null)
			{
					for(var j1z=0;j1z<searchResultItem1z.length;j1z++)
					{
						var zipZ = searchResultItem1z[j1z].getValue('custrecord_kb_zip_code');
						var SiteNameZ = searchResultItem1z[j1z].getValue('custrecord_kb_site_name');
						CloseSiteArr.push(SiteNameZ);
					}
					
			}
				
			// alert('CloseSiteArr  ='+CloseSiteArr)
	//==============================================================================
			
			var siteTOzip =removeDuplicates(CloseSiteArr.sort());
			
		   var isAvai =0.00;
		   
		  // alert('siteTOzip  ='+siteTOzip)
		   
			for (var m=0;m<siteTOzip.length;m++)
			{
				if(compareLocations.indexOf(siteTOzip[m]) != -1 ){
					isAvai++;
					break;
				}
			}
		   // alert('isAvai  ='+isAvai)
			
		   if(isAvai > 0)
			{
			    
			   // alert('closest greater than 0 condition = '+closest)
			
			    finalZip=closest;
			   
			   
			}
		  else
			{
				const index = uniqArr.indexOf(closest);
				if (index > -1) {
					uniqArr.splice(index, 1);
				}
				 // alert('uniqArr  ='+uniqArr)
				  
				var againZipArr = uniqArr;
				var againCloseTo =closestTo;
				var againLocArr =siteTOzip;
				var againCompare =compareLocations;
				var newVehicl =vehicleType;
				  
				// alert('againZipArr ='+againZipArr)
			   //  alert('againCloseTo ='+againCloseTo)
			   //  alert('againLocArr ='+againLocArr)
			   //  alert('againCompare = '+againCompare)
			    //   alert('newVehicl = '+newVehicl)
			    
				
			      
			      var newClose = FindAvailableLocationToZip(newVehicl,againCloseTo,againZipArr,againLocArr,againCompare);
				
			}
			
		   
		  
		   return finalZip;
		
	}
	

	
	function removeDuplicates(num) 
	{
		  var x,
			  len=num.length,
			  out=[],
			  obj={};
		 
		  for (x=0; x<len; x++) 
		  {
			obj[num[x]]=0;
		  }
		  for (x in obj) 
		  {
			out.push(x);
		  }
		  return out;
		  
	}
	
	function getSavedSearchResult(recType, searchId, filters)
	{
	    var aSearchResults = [];
	    var iRscnt = 1000, min = 0, max = 1000;
	    var search = {};
	    if (searchId) 
	    {
	        var search = nlapiLoadSearch(recType, searchId);
	        if (filters) 
	        {
	            search.addFilters(filters);
	        }
	    }
	    

	    var rs = search.runSearch();
	    try 
	    {
	        while (iRscnt == 1000) 
	        {
	            var resultSet = rs.getResults(min, max);
	            aSearchResults = aSearchResults.concat(resultSet);
	            min = max;
	            max += 1000;
	            iRscnt = resultSet.length;
	        }
	    }
	    catch (e) 
	    {
	        nlapiLogExecution('DEBUG', 'getAllResults --> exception', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
	    }

	 //   nlapiLogExecution('DEBUG', 'getAllResults --> Success', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
	    return aSearchResults;
	}
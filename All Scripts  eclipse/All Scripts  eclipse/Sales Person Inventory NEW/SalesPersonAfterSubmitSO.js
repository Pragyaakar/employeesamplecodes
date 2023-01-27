	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       10 July 2019     Priyanka Patil
	 *
	 */

	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType 
	 * 
	 * @param {String} type Access mode: create, copy, edit
	 * @returns {Void}
	 */

	function uesAfterSubmit(type)
	{
		if(nlapiGetContext().getExecutionContext() == 'userinterface')
	    {

		
        var new_locationArray = new Array();
		var uniueLoc = new Array();
		var filter_Loc = new Array();
		
		var recrdId = nlapiGetRecordId();
		var recrdType = nlapiGetRecordType();	
		var InvRec = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId());
		
		var status = InvRec.getFieldValue('orderstatus');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order status =='+status);
		
		var salesOrder = InvRec.getFieldValue('tranid');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order_Number =='+salesOrder);
		
		var customer = InvRec.getFieldValue('entity');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Customer =='+customer);
		
		var subsidiary = InvRec.getFieldValue('subsidiary');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','subsidiary =='+subsidiary);
		
		var department = InvRec.getFieldValue('department');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','department =='+department);
		
		var Sales_class = InvRec.getFieldValue('class');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales_class =='+Sales_class);
		
		var aaria_Context = InvRec.getFieldValue('custbody_aarialife_context');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','aaria_Context =='+aaria_Context);
		
		var sales_emp = InvRec.getFieldValue('custbody_sales_employee');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','sales_emp =='+sales_emp);
		
		var salesApproval_Status = InvRec.getFieldValue('custbody_so_appr_status');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','salesApproval_Status =='+salesApproval_Status);
		
		
		var customer_category = InvRec.getFieldValue('custbody_sales_employee');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','customer_category =='+customer_category);
		
		var toLocation = InvRec.getFieldValue('custbody_location');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','toLocation =='+toLocation);
		

		var linecount = InvRec.getLineItemCount('item');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','linecount =='+linecount);
		
		for(var i1 = 1;i1 <= linecount;i1++)
		{
			var new_location = InvRec.getLineItemValue('item','location',i1);
			//nlapiLogExecution('DEBUG','SalesPerson Inventroy','new_location =='+new_location);
			new_locationArray.push(new_location);
		}

		
		filter_Loc = filter_array(new_locationArray);
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','filter_Loc =='+filter_Loc);
		
		uniueLoc = removeDuplicates(filter_Loc);
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','uniueLoc =='+uniueLoc);
		
	//===================================== CHange is Here ====================================================================
		
		for(var i2 = 0;i2 < uniueLoc.length;i2++)
		{
			var itemArray = new Array();
			var descriptionArray = new Array();
			var unitsArray = new Array();
			var qtyArray = new Array();
			var inventory_DetailArray = new Array();
			var litersArray = new Array();
			var locationArray = new Array();
			var typeItemArr = new Array();
			
			var IsLotItemArr = new Array();
			var useBinsArr = new Array();
			var InvNumArr = new Array();
			var InvQtyArr = new Array();
			var recordValueArray = new Array();
			
			for(var i = 1;i <= linecount;i++)
			{
				var location = InvRec.getLineItemValue('item','location',i);
				nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'location for loop of i=' + location);
				
				nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'uniueLoc[i2]  =' + uniueLoc[i2]+"location  =="+location+'status ='+status);
				
				nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'customer_category ='+customer_category);
				
				if(((status == 'A') || (status == 'B') || (status == 'C')) && (uniueLoc[i2] == location && customer_category == '5'))
				{
					var item = InvRec.getLineItemValue('item','item',i);
					itemArray.push(item);
					nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'item=' + item);
					
					var description = InvRec.getLineItemValue('item','description',i);
					descriptionArray.push(description);
					nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'description=' + description);
					
					var units = InvRec.getLineItemValue('item','item',i);
					unitsArray.push(units);
					//nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'units=' + units);
					
					var qty = InvRec.getLineItemValue('item','quantity',i);
					qtyArray.push(qty);
					nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'qty=' + qty);
					
					var liters = InvRec.getLineItemValue('item','custcol_litres',i);
					litersArray.push(liters);
					//nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'liters=' + liters);	
					
					var location = InvRec.getLineItemValue('item','location',i);
					locationArray.push(location);
					nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'location=' + location);	
					
				
					var typeItem =InvRec.getLineItemValue('item','custcol_item_type',i);  
					nlapiLogExecution('DEBUG', 'aftr submit', "  typeItem  ==" + typeItem);
					typeItemArr.push(typeItem);
					
					var IsLotItem =InvRec.getLineItemValue('item','custcol_islot_item',i);  
					//nlapiLogExecution('DEBUG', 'aftr submit', "  IsLotItem  ==" + IsLotItem);
					IsLotItemArr.push(IsLotItem);
					
					if((typeItem =='Inventory Item')||(typeItem =='Assembly/Bill of Materials') && IsLotItem =='F')
					{
						  var itemRecValues = nlapiLookupField('inventoryitem',item, ['quantityavailable','usebins']);
						   var qtyonhand = itemRecValues['quantityavailable'];
						   var useBins = itemRecValues['usebins'];
						   nlapiLogExecution('DEBUG', 'qtyonhand', 'qtyonhand = ' + qtyonhand);
						   nlapiLogExecution('DEBUG', 'useBins', 'useBins = ' + useBins);
						   useBinsArr.push(useBins);
					}
					
					else if((typeItem =='Inventory Item')||(typeItem =='Assembly/Bill of Materials') && IsLotItem =='T')
					{
						 var rec= InvRec.viewLineItemSubrecord('item', 'inventorydetail',i);
						 
						 if(rec != null && rec != '' && rec != undefined)
						{
							 invcount = rec.getLineItemCount('inventoryassignment');
							 nlapiLogExecution('DEBUG', 'aftr submit', "  rec  ==" + rec+' invcount=='+invcount);
							 
							 for(var x = 1; x <= invcount ; x++)
							 {
								  
								var InvNum = rec.getLineItemValue('inventoryassignment', 'issueinventorynumber',x);
								InvNumArr.push(InvNum);
								nlapiLogExecution('DEBUG', 'aftr submit', "  InvNum  ==" + InvNum);
								nlapiLogExecution('DEBUG', 'aftr submit', "  invNumSerch  ==" + invNumSerch);
								
								
								var InvQty = rec.getLineItemValue('inventoryassignment', 'quantity',x);
								InvQtyArr.push(InvQty);
								nlapiLogExecution('DEBUG', 'aftr submit', "  InvQty  ==" + InvQty);
							   
							 }
						}
					}
			  }
		}
	var recordValue	= createSalesOrderForPR(salesApproval_Status,customer_category,status,uniueLoc,recrdId,linecount,subsidiary,department,Sales_class,aaria_Context,toLocation,sales_emp,itemArray,descriptionArray,unitsArray,qtyArray,litersArray,units,uniueLoc[i2],typeItemArr,IsLotItemArr,InvNumArr,InvQtyArr,useBinsArr)	
	recordValueArray.push(recordValue);
		}
		
		//nlapiLogExecution("DEBUG","In Create Function","Set location and Commit");
		InvRec.setFieldValue('custbody_inv_transaction_no',recordValueArray);
		
		for(var loc = 1;loc <= linecount;loc++)
		{
			InvRec.setLineItemValue('item','location',loc,toLocation);
			InvRec.setLineItemValue('item','commitinventory',loc,'1');
			
			if(toLocation == null)
			{
				InvRec.setLineItemValue('item','location',loc,location);
				nlapiLogExecution("DEBUG","In Create Function","location will Set=="+location);
			}
			
		}
		
		nlapiSubmitRecord(InvRec,true);
		//========================================= END here =======================================================================
	}
		}

	function createSalesOrderForPR(salesApproval_Status,customer_category,status,uniueLoc,recrdId,linecount,subsidiary,department,Sales_class,aaria_Context,toLocation,sales_emp,itemArray,descriptionArray,unitsArray,qtyArray,litersArray,units,locationArray1,typeItemArr,IsLotItemArr,InvNumArr,InvQtyArr,useBinsArr)
	{
		nlapiLogExecution("DEBUG","In Create Function","recrdId=="+recrdId);
		
		nlapiLogExecution("DEBUG","In Create Function","createSalesOrderRecordFunction**************");
		nlapiLogExecution("DEBUG","In Create Function","linecount=="+linecount);
		nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)	
		nlapiLogExecution("DEBUG","In Create Function","department=="+department);
		nlapiLogExecution("DEBUG","In Create Function","Sales_class=="+Sales_class);

		nlapiLogExecution("DEBUG","In Create Function","aaria_Context=="+aaria_Context);
		nlapiLogExecution("DEBUG","In Create Function","sales_emp=="+sales_emp);
		nlapiLogExecution("DEBUG","In Create Function","itemArray=="+itemArray);
		nlapiLogExecution("DEBUG","In Create Function","descriptionArray=="+descriptionArray);//subsidiary
		
		nlapiLogExecution("DEBUG","In Create Function","unitsArray=="+unitsArray);
		nlapiLogExecution("DEBUG","In Create Function","qtyArray=="+qtyArray);
		nlapiLogExecution("DEBUG","In Create Function","litersArray=="+litersArray);
		nlapiLogExecution("DEBUG","In Create Function","InvNumArr=="+InvNumArr);
		
		
		var record = nlapiCreateRecord('inventorytransfer',{recordmode: 'dynamic'}); 
		
		record.setFieldValue('customform',241);
		
	if(((status == 'A') || (status == 'B') || (status == 'C') ||(salesApproval_Status == '10')) && customer_category == '5')
	{
		if(subsidiary != null && subsidiary != '' && subsidiary != undefined)
		{
			record.setFieldValue('subsidiary',subsidiary);
			//nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)
		}
		
		if(department != null && department != '' && department != undefined)
		{
			record.setFieldValue('department',department);
			//nlapiLogExecution("DEBUG","In Create Function","department=="+department)
		}
		
		if(Sales_class != null && Sales_class != '' && Sales_class != undefined)
		{
			record.setFieldValue('class',Sales_class);
		}
		
		if(aaria_Context != null && aaria_Context != '' && aaria_Context != undefined)
		{
			record.setFieldValue('custbody_aarialife_context',aaria_Context);
		}
		
		if(sales_emp != null && sales_emp != '' && sales_emp != undefined)
		{
			record.setFieldValue('custbody_sales_employee',sales_emp);
		}
		
		if(locationArray1 != null && locationArray1 != '' && locationArray1 != undefined)
		{
			record.setFieldValue('location',locationArray1);
			nlapiLogExecution("DEBUG","In Create Function","locationArray1=="+locationArray1)
		}
		
		if(toLocation != null && toLocation != '' && toLocation != undefined)
		{
			record.setFieldValue('transferlocation',toLocation);
			nlapiLogExecution("DEBUG","In Create Function","toLocation=="+toLocation)
		}
		
		for(x=1;x<=itemArray.length;x++)
		{
			//nlapiLogExecution("DEBUG","In Create Function","itemArray.length in inventory item=="+itemArray.length);
			
			 record.selectNewLineItem('inventory');
		
			record.setCurrentLineItemValue('inventory','item',itemArray[x-1]);   
		    nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArray[x-1]);
			
			record.setCurrentLineItemValue('inventory','description',descriptionArray[x-1]);
			//nlapiLogExecution("DEBUG","In Create Function","description done=="+descriptionArray[x-1]);
			
			record.setCurrentLineItemValue('inventory','adjustqtyby',qtyArray[x-1]);                              
			//nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+qtyArray[x-1]);
			
			record.setCurrentLineItemValue('inventory','custcol_litres',litersArray[x-1]);                                          
			//nlapiLogExecution("DEBUG","In Create Function","custcol_litres done=="+litersArray[x-1]);
			
			if(IsLotItemArr[x-1] =='T')
			{
				  var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
				  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
				  
				 
					 var s= subrec.getLineItemCount('inventoryassignment');
					 nlapiLogExecution('DEBUG', 'Acct', 'subrec for Lot Item inventory count= ' + s);
					 if(s > 0)
					 {
						 nlapiLogExecution('DEBUG', 'Acct', 'Inside the IsLotItemArr to remove subrec= ');
						   for(var i1 = 1; i1 <= s; i1++)
							 {  
								 subrec.removeLineItem('inventoryassignment', i1);
							
							  }
					 }
					if(InvNumArr.length > 1)
					  {
						  nlapiLogExecution('DEBUG', 'Acct', 'InvNumArr.length = '+InvNumArr.length );
						  for(var k=1 ;k<=InvNumArr.length;k++)
						  {
							  subrec.selectNewLineItem('inventoryassignment');
							nlapiLogExecution('DEBUG', 'Acct', 'inventoryassignment log');	
							  
							  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InvNumArr[k-1]);
							  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(InvQtyArr[k-1]));
							  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',"1");
							  subrec.commitLineItem('inventoryassignment');//	  
							  subrec.commit();
							  nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() for Lot Item done= ' + JSON.stringify());	  
						  }
					  }
					  else
					  {
					  subrec.selectNewLineItem('inventoryassignment');
					  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InvNumArr[x-1]);
					  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',"1");
					  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(InvQtyArr[x-1]));
					 
					  //nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]=='+adjQty);
					  subrec.commitLineItem('inventoryassignment');//	  
					  subrec.commit();
					  nlapiLogExecution('DEBUG', 'Acct', 'JSON.stringify() invnum less than 1 done= ' + JSON.stringify());	  
					  }	  
				 
				 
			  }
			  else if((typeItemArr[x-1] =='Inventory Item')||(typeItemArr[x-1] =='Assembly/Bill of Materials') && useBinsArr[x-1] == 'T' && IsLotItemArr[x-1] !='T')
			  {
				
				  var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
				  nlapiLogExecution('DEBUG', 'Acct', 'Inventory Item AND useBins True = ' + subrec);
				  
				 
					 var s= subrec.getLineItemCount('inventoryassignment');
					 nlapiLogExecution('DEBUG', 'Acct', 'subrec Not Lot item for inventory count= ' + s);
					 if(s > 0 )
					 {
						 nlapiLogExecution('DEBUG', 'Acct', 'Inside the else to remove subrec= ');
						   for(var i1 = 1; i1 <= s; i1++)
							 {  
								 subrec.removeLineItem('inventoryassignment', i1);
								 count++;
							  }
					 }
					 
				  subrec.selectNewLineItem('inventoryassignment');
				  subrec.setCurrentLineItemValue('inventoryassignment','quantity',qtyArray[x-1]);
				  subrec.setCurrentLineItemValue('inventoryassignment','binnumber','2');//'binnumber'
				 // nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]=='+qtyArray[x-1]);
				  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',"1");
				  subrec.commitLineItem('inventoryassignment');
				  
				  subrec.commit();
				  nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() normal inventory done= ' + JSON.stringify());	
			  }
			  else if((typeItemArr[x-1] =='Inventory Item')|| (typeItemArr[x-1] =='Assembly/Bill of Materials')&& (useBinsArr[x-1] == 'F'|| useBinsArr[x-1] ==null ) && IsLotItemArr[x-1] !='T')
			  {
				
				  var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
				  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
				  
				 
					 var s= subrec.getLineItemCount('inventoryassignment');
					 nlapiLogExecution('DEBUG', 'Acct', 'subrec Not Lot item for inventory count= ' + s);
					 if(s > 0 )
					 {
						 //nlapiLogExecution('DEBUG', 'Acct', 'Inside the else to remove subrec= ');
						   for(var i1 = 1; i1 <= s; i1++)
							 {  
								 subrec.removeLineItem('inventoryassignment', i1);
								 count++;
							  }
					 }
					
			  
				  subrec.selectNewLineItem('inventoryassignment');
				  subrec.setCurrentLineItemValue('inventoryassignment','quantity',qtyArray[x-1]);
				  //nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]=='+qtyArray[x-1]);
				  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',"1");
				  subrec.commitLineItem('inventoryassignment');
				  
				  subrec.commit();
				  nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());	
			  }
			
			record.commitLineItem('inventory');
			//nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
			
		}//End of for loop
		
	 // var SubmitIt = nlapiSubmitRecord(record,true);  
	  //nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	}
		
	//return SubmitIt;
	}
	


	function filter_array(test_array) 
	{
		 var index = -1,
		 arr_length = test_array ? test_array.length : 0,
		 resIndex = -1,
		 result = [];

		 while (++index < arr_length) 
		 {
			 var value = test_array[index];
			 if(value)
			 {
				result[++resIndex] = value;
			  }
		 }
	return result;
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
			
		
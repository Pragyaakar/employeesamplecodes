/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Nov 2018     Priyanka Patil
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
var recIDForSO ;
function uesAfterSubmit(request, response)
{
  if(type == 'create')
  {
	    var salesOrder;
		var customer;
		var subsidiary;
		var department;
		var Sales_class;
		var aaria_Context;
		var sales_emp;
		var item;
		var description;
		var units;
		var qty;
		var inventory_Detail;
		var liters;
		var location;
		
		var pushvalueInvNum;
		 var pushvalueQty;
		 var new_locationArray=[];
		 var filter_Loc=[];
		 var uniueLoc=[];
		 var arrOfIt=[];
		 

		var new_locationArray = new Array();
		var uniueLoc = new Array();
		var filter_Loc = new Array();
		
		var recrdId = nlapiGetRecordId();
		var recrdType = nlapiGetRecordType();	
		var InvRec = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId());
		
		var status = InvRec.getFieldValue('orderstatus');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order status =='+status);
		
		salesOrder = InvRec.getFieldValue('tranid');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order_Number =='+salesOrder);
		
		customer = InvRec.getFieldValue('entity');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Customer =='+customer);
		
		subsidiary = InvRec.getFieldValue('subsidiary');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','subsidiary =='+subsidiary);
		
		department = InvRec.getFieldValue('department');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','department =='+department);
		
		Sales_class = InvRec.getFieldValue('class');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales_class =='+Sales_class);
		
		aaria_Context = InvRec.getFieldValue('custbody_aarialife_context');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','aaria_Context =='+aaria_Context);
		
		sales_emp = InvRec.getFieldValue('custbody_sales_employee');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','sales_emp =='+sales_emp);
		
		var customer_category = InvRec.getFieldValue('custbody_sales_employee');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','customer_category =='+customer_category);
		
		var toLocation = InvRec.getFieldValue('custbody_location');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','toLocation =='+toLocation);
		
		if(customer_category == '5' )
		{ 
		 itemCount = InvRec.getLineItemCount('item');
		 nlapiLogExecution('DEBUG','SalesPerson in POST', "itemCount   "+itemCount);
		 
		 
		 for(var j1=1;j1<=itemCount;j1++)
		 {
			 var new_location = InvRec.getLineItemValue('item','location',j1);
			 InvRec.setLineItemValue('item','custcol_so_line_no',j1,j1);
			 
			 new_locationArray.push(new_location);
		 }
		 
		    filter_Loc = filter_array(new_locationArray);
			nlapiLogExecution('DEBUG','SalesPerson Inventroy','filter_Loc =='+filter_Loc);
			
			uniueLoc = removeDuplicates(filter_Loc);
			nlapiLogExecution('DEBUG','SalesPerson Inventroy','uniueLoc =='+uniueLoc);
			
			
		 	 var SOSearch = nlapiSearchRecord("transaction","customsearch_salesorder_for_salesperson",
	    			 [
	    			    ["mainline","is","F"], 
	    			    "AND", 
	    			    ["shipping","is","F"], 
	    			    "AND", 
	    			    ["taxline","is","F"], 
	    			    "AND", 
	    			    ["closed","is","F"],
	    			    "AND", 
	    			    ["internalid","anyof",recrdId]
	    			 ], 
	    			 [
	    			    new nlobjSearchColumn("item"), 
	    			    new nlobjSearchColumn("quantity"), 
	    			    new nlobjSearchColumn("unit"), 
	    			    new nlobjSearchColumn("amount"), 
	    			    new nlobjSearchColumn("custcol_litres"), 
	    			    new nlobjSearchColumn("porate"), 
	    			    new nlobjSearchColumn("entity"), 
	    			    new nlobjSearchColumn("salesdescription","item",null), 
	    			    new nlobjSearchColumn("location"), 
	    			    new nlobjSearchColumn("custcol_item_type"), 
	    			    new nlobjSearchColumn("fxamount"), 
	    			    new nlobjSearchColumn("internalid","inventoryDetail",null), 
	    			    new nlobjSearchColumn("line")
	    			 ]
	    			 );
	    	 
			
			
	for(var un=0;un< uniueLoc.length;un++)
	{	
		
		
        var SOlocationArray=[];
        var SOinventoryDetailIDArray=[];
        var SOlineCountArray=[];
        var SOitemArray=[];
        var SOquantityArray=[];
        var SOunitArray=[];
        var SOamountArray=[];
        var SOlitersArray=[];
        
        
		 var setLocFrom =uniueLoc[un];
					
	    //nlapiLogExecution('DEBUG', 'Acct', 'SOSearch ==' +SOSearch);
	    nlapiLogExecution('DEBUG', 'Acct', 'setLocFrom ==' +setLocFrom);
	    	 
	    for(var q= 0;q<SOSearch.length;q++)
	    {
	    	var SOlocation = SOSearch[q].getValue('location');
	    	SOlocationArray.push(SOlocation);
	    	nlapiLogExecution('DEBUG', 'Acct', 'SOlocation ==' +SOlocation);
	    		
	    
			 
	    	if(uniueLoc[un] == SOlocation)
			{

			   nlapiLogExecution('DEBUG', 'Acct', 'uniueLoc[un] == SOlocation ' + uniueLoc[un] +'=='+ SOlocation);
				 
				var SOlineCount = SOSearch[q].getValue('line');
				SOlineCountArray.push(SOlineCount)
	    		nlapiLogExecution('DEBUG', 'Acct', 'SOlineCount ==' +SOlineCount);
	    		
	    		var SOitem = SOSearch[q].getValue('item');
	    		SOitemArray.push(SOitem);
	    		nlapiLogExecution('DEBUG', 'Acct', 'SOitem ==' +SOitem);
	    		
	    		var SOquantity = SOSearch[q].getValue('quantity');
	    		SOquantityArray.push(SOquantity);
	    		nlapiLogExecution('DEBUG', 'Acct', 'SOquantity ==' +SOquantity);
	    		
	    		var SOunit = SOSearch[q].getValue('unit');
	    		SOunitArray.push(SOunit);
	    		nlapiLogExecution('DEBUG', 'Acct', 'SOunit ==' +SOunit);
	    		
	    		var SOamount = SOSearch[q].getValue('amount');
	    		SOamountArray.push(SOunit);
	    		nlapiLogExecution('DEBUG', 'Acct', 'SOamount ==' +SOamount);
	    		
	    		var SOliters = SOSearch[q].getValue('custcol_litres');
	    		SOlitersArray.push(SOliters);
	    		nlapiLogExecution('DEBUG', 'Acct', 'SOliters ==' +SOliters);
	    		
	    		var SOinventoryDetailID = SOSearch[q].getValue("internalid","inventoryDetail");
		    	SOinventoryDetailIDArray.push(SOinventoryDetailID);
		    	nlapiLogExecution('DEBUG', 'Acct', 'SOinventoryDetailID ==' +SOinventoryDetailID);
		    	
	    		
	    	}//End UniLoc
	    }//SO search length
		var idOfIT= createInventoryTransfer(setLocFrom,status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,customer_category,toLocation,SOlocationArray,SOinventoryDetailIDArray,SOlineCountArray,SOitemArray,SOquantityArray,SOunitArray,SOamountArray,SOlitersArray)
		nlapiLogExecution('DEBUG', 'Acct', 'Calling IT function ==' );
		arrOfIt.push(idOfIT);
	}//End for loop UniLoc
	
	var transferInvent = InvRec.setFieldValue('custbody_inv_transaction_no',arrOfIt)
	var submitID = nlapiSubmitRecord(InvRec);
 }
  }
  
  
}//End of function

function createInventoryTransfer(setLocFrom,status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,customer_category,toLocation,SOlocationArray,SOinventoryDetailIDArray,SOlineCountArray,SOitemArray,SOquantityArray,SOunitArray,SOamountArray,SOlitersArray)
{
	nlapiLogExecution("DEBUG","In Create Transfer Function","createSalesOrderRecordFunction**************");
	nlapiLogExecution("DEBUG","In Create Transfer Function","SOinventoryDetailIDArray=="+SOinventoryDetailIDArray);
	nlapiLogExecution("DEBUG","In Create Transfer Function","setLocFrom=="+setLocFrom)	
	nlapiLogExecution("DEBUG","In Create Transfer Function","SOitemArray=="+SOitemArray);
	
	var InventoryNumberArray=[];
	var binNumberArray=[];
	var InvstatusArray=[];
	var InvQuantityArray=[];
	var InventoryLocationArray=[];
	var InventoryitemCountArray=[];
	
	var record = nlapiCreateRecord('inventorytransfer',{recordmode: 'dynamic'}); 
	nlapiLogExecution("DEBUG","In Create Transfer Function","record=="+record);
	
	record.setFieldValue('customform',241);
	
if(((status == 'A') || (status == 'B') || (status == 'C') ||(salesApproval_Status == '10')) && customer_category == '5')
{
	if(subsidiary != null && subsidiary != '' && subsidiary != undefined)
	{
		record.setFieldValue('subsidiary',subsidiary);
		nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)
	}
	
	if(department != null && department != '' && department != undefined)
	{
		record.setFieldValue('department',department);
		nlapiLogExecution("DEBUG","In Create Function","department=="+department)
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
	
	if(setLocFrom != null && setLocFrom != '' && setLocFrom != undefined)
	{
		record.setFieldValue('location',setLocFrom);
		nlapiLogExecution("DEBUG","In Create Function","locationArray1=="+setLocFrom)
	}
	
	if(toLocation != null && toLocation != '' && toLocation != undefined)
	{
		record.setFieldValue('transferlocation',toLocation);
		nlapiLogExecution("DEBUG","In Create Function","toLocation=="+toLocation)
	}
	
	for(x=1;x<=SOitemArray.length;x++)
	{
		nlapiLogExecution("DEBUG","In Create Function","itemArray.length in inventory item=="+SOitemArray.length);
		
		record.selectNewLineItem('inventory');
	
		record.setCurrentLineItemValue('inventory','item',SOitemArray[x-1]);   
	    nlapiLogExecution("DEBUG","In Create Transfer Function","item done=="+SOitemArray[x-1]);
		
		//record.setCurrentLineItemValue('inventory','description',descriptionArray[x-1]);
		//nlapiLogExecution("DEBUG","In Create Transfer Function","description done=="+descriptionArray[x-1]);
		
		record.setCurrentLineItemValue('inventory','adjustqtyby',parseFloat(SOquantityArray[x-1]));                              
		nlapiLogExecution("DEBUG","In Create Transfer Function"," quantity done=="+parseFloat(SOquantityArray[x-1]));
		
		//record.setCurrentLineItemValue('inventory','custcol_litres',litersArray[x-1]);                                          
		//nlapiLogExecution("DEBUG","In Create Transfer Function","custcol_litres done=="+litersArray[x-1]);
		
		
//=========================== Setting Inventory Details ===============================
		var inventorydetailSearch = nlapiSearchRecord("inventorydetail","customsearch_so_to_it_for_inventorydetai",
				[
					["internalid","anyof",SOinventoryDetailIDArray[x-1]]
				], 
				[
				   new nlobjSearchColumn("inventorynumber").setSort(false), 
				   new nlobjSearchColumn("binnumber"), 
				   new nlobjSearchColumn("status"), 
				   new nlobjSearchColumn("quantity"), 
				  // new nlobjSearchColumn("itemcount"), 
				   new nlobjSearchColumn("location")
				]
				);
		
		nlapiLogExecution('DEBUG', 'Acct', 'inventorydetailSearch ==' +inventorydetailSearch.length);
		
		var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		nlapiLogExecution('DEBUG', 'Acct', 'subrec for Transfer  inventory = ' + subrec);
		  
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
		 
		
		for(var r = 0;r < inventorydetailSearch.length;r++)
	    {
			var InventoryNumber = inventorydetailSearch[r].getValue('inventorynumber');
			InventoryNumberArray.push(InventoryNumber)
			nlapiLogExecution('DEBUG', 'Acct', 'InventoryNumber ==' +InventoryNumberArray);
			
			var binNumber = inventorydetailSearch[r].getValue('binnumber');
			binNumberArray.push(binNumber)
			nlapiLogExecution('DEBUG', 'Acct', 'binNumber ==' +binNumberArray);
			
			var Invstatus = inventorydetailSearch[r].getValue('status');
			InvstatusArray.push(Invstatus);
			nlapiLogExecution('DEBUG', 'Acct', 'Invstatus ==' +InvstatusArray);
			
			var InvQuantity = inventorydetailSearch[r].getValue('quantity');
			InvQuantityArray.push(InvQuantity);
			nlapiLogExecution('DEBUG', 'Acct', 'InvQuantity ==' +InvQuantityArray);
			
			/*var InventoryLocation = inventorydetailSearch[r].getValue('location');
			InventoryLocationArray.push(InventoryLocation);
			nlapiLogExecution('DEBUG', 'Acct', 'InventoryLocation ==' +InventoryLocationArray);*/
			
			var InventoryitemCount = inventorydetailSearch[r].getValue('itemcount');
			InventoryitemCountArray.push(InventoryitemCount)
			nlapiLogExecution('DEBUG', 'Acct', 'InventoryitemCount ==' +InventoryitemCountArray);
			
			
			nlapiLogExecution("DEBUG","In Create Function","itemArray.length in inventory item=="+SOitemArray.length);
				
			subrec.selectNewLineItem('inventoryassignment');
		  	subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InventoryNumber);
			subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(InvQuantity));//count
			subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
	        subrec.commitLineItem('inventoryassignment');//	  
		  	
		   }
			subrec.commit(); 
			record.commitLineItem('inventory');
			nlapiLogExecution("DEBUG","In Create Transfer Function","commitLineItem done==");
	    }
	 var SubmitIt = nlapiSubmitRecord(record,true);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
     }
//=================== End Of Inv Details Set=========================================================

return SubmitIt;
		
}//End of for loop
	

/*
 
 //==================================== Create For Customer Location ==============================
 
 function createInventoryTransfer(setLocFrom,status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,customer_category,toLocation,SOlocationArray,SOinventoryDetailIDArray,SOlineCountArray,SOitemArray,SOquantityArray,SOunitArray,SOamountArray,SOlitersArray)
{
	nlapiLogExecution("DEBUG","In Create Transfer Function","createSalesOrderRecordFunction**************");
	nlapiLogExecution("DEBUG","In Create Transfer Function","SOinventoryDetailIDArray=="+SOinventoryDetailIDArray);
	nlapiLogExecution("DEBUG","In Create Transfer Function","setLocFrom=="+setLocFrom)	
	nlapiLogExecution("DEBUG","In Create Transfer Function","SOitemArray=="+SOitemArray);
	
	var InventoryNumberArray=[];
	var binNumberArray=[];
	var InvstatusArray=[];
	var InvQuantityArray=[];
	var InventoryLocationArray=[];
	var InventoryitemCountArray=[];
	
	var record = nlapiCreateRecord('inventorytransfer',{recordmode: 'dynamic'}); 
	nlapiLogExecution("DEBUG","In Create Transfer Function","record=="+record);
	
	record.setFieldValue('customform',241);
	
if(((status == 'A') || (status == 'B') || (status == 'C') ||(salesApproval_Status == '10')) && customer_category == '5')
{
	if(subsidiary != null && subsidiary != '' && subsidiary != undefined)
	{
		record.setFieldValue('subsidiary',subsidiary);
		nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)
	}
	
	if(department != null && department != '' && department != undefined)
	{
		record.setFieldValue('department',department);
		nlapiLogExecution("DEBUG","In Create Function","department=="+department)
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
	
	if(setLocFrom != null && setLocFrom != '' && setLocFrom != undefined)
	{
		record.setFieldValue('location',setLocFrom);
		nlapiLogExecution("DEBUG","In Create Function","locationArray1=="+setLocFrom)
	}
	
	if(toLocation != null && toLocation != '' && toLocation != undefined)
	{
		record.setFieldValue('transferlocation',toLocation);
		nlapiLogExecution("DEBUG","In Create Function","toLocation=="+toLocation)
	}
	
	for(x=1;x<=SOitemArray.length;x++)
	{
		nlapiLogExecution("DEBUG","In Create Function","itemArray.length in inventory item=="+SOitemArray.length);
		
		record.selectNewLineItem('inventory');
	
		record.setCurrentLineItemValue('inventory','item',SOitemArray[x-1]);   
	    nlapiLogExecution("DEBUG","In Create Transfer Function","item done=="+SOitemArray[x-1]);
		
		//record.setCurrentLineItemValue('inventory','description',descriptionArray[x-1]);
		//nlapiLogExecution("DEBUG","In Create Transfer Function","description done=="+descriptionArray[x-1]);
		
		record.setCurrentLineItemValue('inventory','adjustqtyby',parseFloat(SOquantityArray[x-1]));                              
		nlapiLogExecution("DEBUG","In Create Transfer Function"," quantity done=="+parseFloat(SOquantityArray[x-1]));
		
		//record.setCurrentLineItemValue('inventory','custcol_litres',litersArray[x-1]);                                          
		//nlapiLogExecution("DEBUG","In Create Transfer Function","custcol_litres done=="+litersArray[x-1]);
		
		
//=========================== Setting Inventory Details ===============================
		var inventorydetailSearch = nlapiSearchRecord("inventorydetail","customsearch_so_to_it_for_inventorydetai",
				[
					["internalid","anyof",SOinventoryDetailIDArray[x-1]]
				], 
				[
				   new nlobjSearchColumn("inventorynumber").setSort(false), 
				   new nlobjSearchColumn("binnumber"), 
				   new nlobjSearchColumn("status"), 
				   new nlobjSearchColumn("quantity"), 
				  // new nlobjSearchColumn("itemcount"), 
				   new nlobjSearchColumn("location")
				]
				);
		
		nlapiLogExecution('DEBUG', 'Acct', 'inventorydetailSearch ==' +inventorydetailSearch.length);
		
		var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		nlapiLogExecution('DEBUG', 'Acct', 'subrec for Transfer  inventory = ' + subrec);
		  
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
		 
		
		for(var r = 0;r < inventorydetailSearch.length;r++)
	    {
			var InventoryNumber = inventorydetailSearch[r].getValue('inventorynumber');
			InventoryNumberArray.push(InventoryNumber)
			nlapiLogExecution('DEBUG', 'Acct', 'InventoryNumber ==' +InventoryNumberArray);
			
			var binNumber = inventorydetailSearch[r].getValue('binnumber');
			binNumberArray.push(binNumber)
			nlapiLogExecution('DEBUG', 'Acct', 'binNumber ==' +binNumberArray);
			
			var Invstatus = inventorydetailSearch[r].getValue('status');
			InvstatusArray.push(Invstatus);
			nlapiLogExecution('DEBUG', 'Acct', 'Invstatus ==' +InvstatusArray);
			
			var InvQuantity = inventorydetailSearch[r].getValue('quantity');
			InvQuantityArray.push(InvQuantity);
			nlapiLogExecution('DEBUG', 'Acct', 'InvQuantity ==' +InvQuantityArray);
			
			
			
			var InventoryitemCount = inventorydetailSearch[r].getValue('itemcount');
			InventoryitemCountArray.push(InventoryitemCount)
			nlapiLogExecution('DEBUG', 'Acct', 'InventoryitemCount ==' +InventoryitemCountArray);
			
			
			nlapiLogExecution("DEBUG","In Create Function","itemArray.length in inventory item=="+SOitemArray.length);
				
			subrec.selectNewLineItem('inventoryassignment');
		  	subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InventoryNumber);
			subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(InvQuantity));//count
			subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
	        subrec.commitLineItem('inventoryassignment');//	  
		  	
		   }
			subrec.commit(); 
			record.commitLineItem('inventory');
			nlapiLogExecution("DEBUG","In Create Transfer Function","commitLineItem done==");
	    }
	 var SubmitIt = nlapiSubmitRecord(record,true);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
     }
//=================== End Of Inv Details Set=========================================================

return SubmitIt;
		
}//End of for loop
	
 //====================== End For Customer Location Inv Transfer ========================= 
  
 */

	

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
		
	
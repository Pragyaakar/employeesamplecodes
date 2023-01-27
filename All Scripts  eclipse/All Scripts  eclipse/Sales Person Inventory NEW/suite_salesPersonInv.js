/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       28 Aug 2019     Priyanka Patil
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
function salesPersonInventroySuitelet(request, response)
{
	if(request.getMethod() == 'GET')
	{
		try
		{
      var recId = request.getParameter('custpage_param1');
      recIDForSO = recId;
		//============== CREATE FORM ============
		//nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in GET = ");
	
      var form = nlapiCreateForm("Sales Person Inventory");
		
	  var sub = form.addField('custpage_recid', 'text', 'Record ID');
	  sub.setDefaultValue(recId);
	  sub.setDisplayType('hidden');
		
	  var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Item','custpage_sample_tab');
	  ItemSublist.addField('custpage_chechbox','checkbox'); 
	  ItemSublist.addField('custpage_lineno','integer','Line No');
	  ItemSublist.addField('custpage_item','select','Item','ITEM').setDisplayType('disabled');
	  ItemSublist.addField('custpage_qty','integer','Quantity');
	  ItemSublist.addField('custpage_unit','text','UNIT');
      ItemSublist.addField('custpage_description','text','DESCRIPTION');
      ItemSublist.addField('custpage_location','select','LOCATION','location').setDisplayType('inline');
	  ItemSublist.addField('custpage_remain_qty', 'float', 'Remaining Quantity').setDisplayType('entry');
	  ItemSublist.addField('custpage_amount','float','AMOUNT');
	  ItemSublist.addField('custpage_litres', 'float', 'LITRES');
	  ItemSublist.addField('custpage_item_type', 'text', 'ITEM TYPE');
	  ItemSublist.addField('custpage_invdetid', 'text', 'InventoryDetails ID');
	 // ItemSublist.addField('custpage_item_type', 'text', 'ITEM TYPE');
		 
	  var transactionSearch = nlapiSearchRecord("transaction","customsearch_salesorder_for_salesperson",
		[
			["internalid","anyof",recId],
			"AND",
			["mainline","is","F"], 
			"AND", 
			["shipping","is","F"], 
			"AND", 
			["taxline","is","F"], 
			"AND", 
			["closed","is","F"]
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
			new nlobjSearchColumn("custcol_so_line_no")
		]
		);
		 
	    //nlapiLogExecution('debug','Search Values','transactionSearch.length := '+transactionSearch.length);
		
		for (var i = 1; i <= transactionSearch.length; i++) 
		{ 
			 ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
			 
		    ItemSublist.setLineItemValue('custpage_lineno', i, transactionSearch[i-1].getValue('custcol_so_line_no'));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'line :'+transactionSearch[i-1].getValue('custcol_so_line_no'));
				 
			ItemSublist.setLineItemValue('custpage_item', i, transactionSearch[i-1].getValue('item'));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'item :'+transactionSearch[i-1].getValue('item'));
				 
			ItemSublist.setLineItemValue('custpage_qty', i, transactionSearch[i-1].getValue('quantity'));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'quantity :'+transactionSearch[i-1].getValue('quantity'));
				 
			ItemSublist.setLineItemValue('custpage_unit', i, transactionSearch[i-1].getValue('unit'));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'unit :'+transactionSearch[i-1].getValue('unit'));
				 
			ItemSublist.setLineItemValue('custpage_amount', i, transactionSearch[i-1].getValue('fxamount'));
		    //nlapiLogExecution('DEBUG', 'SalesPerson', 'amount :'+transactionSearch[i-1].getValue('fxamount'));
				 
			ItemSublist.setLineItemValue('custpage_litres', i, transactionSearch[i-1].getValue('custcol_litres'));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'custcol_litres :'+transactionSearch[i-1].getValue('custcol_litres'));
				 
			ItemSublist.setLineItemValue('custpage_po_rate', i, transactionSearch[i-1].getValue('porate'));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'porate :'+transactionSearch[i-1].getValue('porate'));
				 
			ItemSublist.setLineItemValue('custpage_gross_amount', i, transactionSearch[i-1].getValue('grossamount'));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'grossamount :'+transactionSearch[i-1].getValue('grossamount'));
				 
			ItemSublist.setLineItemValue('custpage_description', i, transactionSearch[i-1].getValue("salesdescription","item"));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'description :'+transactionSearch[i-1].getValue("salesdescription","item"));
				 
			ItemSublist.setLineItemValue('custpage_location',i, transactionSearch[i-1].getValue("location"));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'location :'+transactionSearch[i-1].getValue("location"));
			
			ItemSublist.setLineItemValue('custpage_invdetid',i, transactionSearch[i-1].getValue("internalid","inventoryDetail"));
			
			
			ItemSublist.setLineItemValue('custpage_item_type', i, transactionSearch[i-1].getValue("custcol_item_type"));
			//nlapiLogExecution('DEBUG', 'SalesPerson', 'item type :'+transactionSearch[i-1].getValue("custcol_item_type"));
		}
		form.setScript('customscript_clt_validation_salesperson');
		  
			 

//========================== ADD A BUTTON ======================
		form.addSubmitButton('Submit');
		form.addButton('cancel','Cancel','window.close();');
		//form.addButton('custombutton', 'Reset', 'refresh();');
		response.writePage(form);
	}
	catch(e){
		nlapiLogExecution('DEBUG','Error In Creation', "Error is :"+e);
	}
}// if(request.getMethod() == 'GET')

else if(request.getMethod() == 'POST')
{
	nlapiLogExecution('DEBUG','SalesPerson in POST', "in POST   ");
	
	var itemCount;
	var remainQty;
	var salesId;
	
	var suiteletCount = request.getLineItemCount('custpage_sig_req_sublist');
	//nlapiLogExecution('DEBUG','SalesPerson in POST', "suiteletCount   "+suiteletCount);
	
	salesId = request.getParameter('custpage_recid');
	//nlapiLogExecution('DEBUG','SalesPerson in POST', "salesId   "+salesId);
	
	var Rec = nlapiLoadRecord('salesorder',salesId);//, {recordmode: 'dynamic'}
	//nlapiLogExecution('DEBUG','SalesPerson in POST', "Rec   "+Rec);

//=========================================Sales Order Body Fields======================================
		 
	var status = Rec.getFieldValue('orderstatus');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order status =='+status);

	var salesOrder = Rec.getFieldValue('tranid');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order_Number =='+salesOrder);
			
	var customer = Rec.getFieldValue('entity');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Customer =='+customer);
			
	var subsidiary = Rec.getFieldValue('subsidiary');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','subsidiary =='+subsidiary);
			
	var department = Rec.getFieldValue('department');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','department =='+department);
			
	var Sales_class = Rec.getFieldValue('class');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales_class =='+Sales_class);
			
	var aaria_Context = Rec.getFieldValue('custbody_aarialife_context');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','aaria_Context =='+aaria_Context);
			
	var sales_emp = Rec.getFieldValue('custbody_sales_employee');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','sales_emp =='+sales_emp);
			
	var salesApproval_Status = Rec.getFieldValue('custbody_so_appr_status');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','salesApproval_Status =='+salesApproval_Status);
			
	var customer_category = Rec.getFieldValue('custbody_sales_employee');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','customer_category =='+customer_category);
	
	var toLocation = Rec.getFieldValue('custbody_location');
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','toLocation =='+toLocation);
		 
	itemCount = Rec.getLineItemCount('item');
	nlapiLogExecution('DEBUG','SalesPerson in POST', "itemCount   "+itemCount);
		 
	var pushvalueInvNum;
	var pushvalueQty;
	var new_locationArray=[];
	var filter_Loc=[];
	var uniueLoc=[];
		 
	for(var j1=1;j1<=suiteletCount;j1++)
	{
		var new_location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j1);
		new_locationArray.push(new_location);
	}
				 
	filter_Loc = filter_array(new_locationArray);
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','filter_Loc =='+filter_Loc);
			
	uniueLoc = removeDuplicates(filter_Loc);
	//nlapiLogExecution('DEBUG','SalesPerson Inventroy','uniueLoc =='+uniueLoc);
			
	for(var un=0;un< uniueLoc.length;un++)
	{	
		 var reamainingArray = new Array();
		 var SOQtyArray = new Array();
		 var SO_ItemArray = new Array();
		 var SO_LineLocationArray = new Array();
		 var descriptionArray = new Array();
		 var unitsArray = new Array();
		 var qtyArray = new Array();
		 var litersArray = new Array();
	
		 var invDetIdArray = new Array();
		 var invQtyTrans = new Array();
		 var invNumTrans = new Array();
		 var setLocFrom =uniueLoc[un];
		 var SO_lineNumArray =[];
		 var reversArrQty=[];
		 var reversArrLot=[];
					
		for(var j=1;j<=suiteletCount;j++)
		{
			var chk_location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
			
			 var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', j);
			 
			  
			  // if(checkMark == 'T')
			   {
				 
					 
			if(uniueLoc[un] == chk_location && checkMark == 'T')
			{
				//nlapiLogExecution('DEBUG', 'Acct', 'uniueLoc[un] == chk_location ' + uniueLoc[un] +'=='+ chk_location);
						 
				var reamaining = request.getLineItemValue('custpage_sig_req_sublist','custpage_remain_qty',j);
				reamainingArray.push(reamaining);
				//nlapiLogExecution('DEBUG', 'Acct', 'Remaining Qty = ' + reamaining);
					 
				var SOQty = request.getLineItemValue('custpage_sig_req_sublist','custpage_qty',j);
				SOQtyArray.push(SOQty);
				//nlapiLogExecution('DEBUG', 'Acct', 'SOQty = ' + SOQty);
					 
				var minusQty = parseFloat(SOQty) - parseFloat(reamaining);
				//nlapiLogExecution('DEBUG', 'Acct', 'minusQty = ' + minusQty);
					 
				var SO_lineNum =  request.getLineItemValue('custpage_sig_req_sublist','custpage_lineno',j);
				SO_lineNumArray.push(SO_lineNum);
					 
				var SO_Item =  request.getLineItemValue('custpage_sig_req_sublist','custpage_item',j);
				SO_ItemArray.push(SO_Item);
				//nlapiLogExecution('DEBUG', 'Acct', 'SO_Item = ' + SO_Item);
						
				var SO_LineLocation =  request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
				SO_LineLocationArray.push(SO_LineLocation);
				//nlapiLogExecution('DEBUG', 'Acct', 'SO_LineLocation = ' + SO_LineLocation);
						
				var description =  request.getLineItemValue('custpage_sig_req_sublist','custpage_description',j);
				descriptionArray.push(description);
				//nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'description=' + description);
						
				var units =  request.getLineItemValue('custpage_sig_req_sublist','custpage_unit',j);
				unitsArray.push(units);
				//nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'units=' + units);
						
				var qty = minusQty ;
				qtyArray.push(qty);
				//nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'qty=' + qty);
						
				var liters = request.getLineItemValue('custpage_sig_req_sublist','custpage_litres',j);//custpage_litres
				litersArray.push(liters);
				
				var invDetId = request.getLineItemValue('custpage_sig_req_sublist','custpage_invdetid',j);//custpage_litres
				invDetIdArray.push(invDetId);
				
			
			 }//Loc Check
		}// End of Check box check
		}//End Suitelet Count
		

	//	var idOfIT= createInventoryTransfer(status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,salesApproval_Status,customer_category,toLocation,itemCount,SO_ItemArray,SO_LineLocationArray,descriptionArray,unitsArray,qtyArray,litersArray,invDetIdArray,setLocFrom,reamainingArray)
		
		 var idOfIT1= createRevInventoryTransfer(status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,salesApproval_Status,customer_category,toLocation,itemCount,SO_ItemArray,SO_LineLocationArray,descriptionArray,unitsArray,qtyArray,reamainingArray,litersArray,setLocFrom,invDetIdArray)

	}//End UniLoction Length

	
		for(var jk=1;jk<=suiteletCount;jk++)
		{
			var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', jk);
			 
			  
			  if(checkMark == 'T')
			   {
				 
			var lineNumSuite = request.getLineItemValue('custpage_sig_req_sublist','custpage_lineno',jk);

			var reamaining1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_remain_qty',jk);
			//reamainingArray.push(reamaining);
			nlapiLogExecution('DEBUG', 'Sales Order', 'Remaining Qty1 = ' + reamaining1);
				 
			var SOQty1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_qty',jk);
			// SOQtyArray.push(SOQty);
			nlapiLogExecution('DEBUG', 'Sales Order', 'SOQty1 = ' + SOQty1);
				 
			var itmSo1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',jk);
			// SOQtyArray.push(SOQty);
			nlapiLogExecution('DEBUG', 'Sales Order', 'itmSo1 = ' + itmSo1);
				 

			var Suite_location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',jk);
							
			var minusQty1 = parseFloat(SOQty1) - parseFloat(reamaining1);
			nlapiLogExecution('DEBUG', 'Sales Order', 'minusQty1 = ' + minusQty1);
			
			var invDetId1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_invdetid',jk);
			 
			for (var ah=1; ah<=itemCount;ah++)
			{
			    
				 var soLine = Rec.getLineItemValue('item','custcol_so_line_no',ah);
                 var rateT = Rec.getLineItemValue('item','rate',ah); 
				 var OriginalLocation = Rec.getLineItemValue('item','location',ah);
				
				 nlapiLogExecution('DEBUG', 'Acct', 'soLine= '+soLine);
				 nlapiLogExecution('DEBUG', 'Acct', 'lineNumSuite= '+lineNumSuite);
				 
				if(soLine == lineNumSuite)
				{
					 nlapiLogExecution('DEBUG', 'Acct', '(soLine == lineNumSuite)= '+(soLine == lineNumSuite));
					
					Rec.removeLineItem('item', ah);
				
					
					Rec.selectNewLineItem('item');
					 
					Rec.setCurrentLineItemValue('item','item',itmSo1);
                  
                    Rec.setCurrentLineItemValue('item','rate',rateT);
					
					Rec.setCurrentLineItemValue('item','custcol_original_location',Suite_location);
					
					Rec.setCurrentLineItemValue('item','location',toLocation);
					//nlapiLogExecution('DEBUG', 'Acct', 'toLocation Value to be set = '+toLocation);
								 
					Rec.setCurrentLineItemValue('item','commitinventory','1');
					//nlapiLogExecution('DEBUG','Acct','Commited Value to be set = ');
								 
					Rec.setCurrentLineItemValue('item','custcol_remaining_qty',reamaining1);
					//nlapiLogExecution('DEBUG', 'Acct', 'reamaining on so  = ' +reamaining1);
								 
					Rec.setCurrentLineItemValue('item','quantity',minusQty1);
					//nlapiLogExecution('DEBUG', 'Acct', 'quantity set in minusQty = '+minusQty1);
								 
					Rec.setCurrentLineItemValue('item','custcol_sales_order_qty',SOQty1);
					//nlapiLogExecution('DEBUG', 'Acct', 'quantity set in SOQty1 = ' + SOQty1);
					
					//====================================== Setting Inventory Details =====================================================
					var inventorydetailSearch = nlapiSearchRecord("inventorydetail","customsearch_so_to_it_for_inventorydetai",
							[
								["internalid","anyof",invDetId1]
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
					
					
					/*var invDetailSubrecord = Rec.viewLineItemSubrecord('item','inventorydetail',ah);
					 nlapiLogExecution('DEBUG', 'aftr submit', " invDetailSubrecord ==" + invDetailSubrecord);
					    	   
					 if(invDetailSubrecord != null)
					 {
					    Rec.selectLineItem('item',ah);
					    Rec.removeCurrentLineItemSubrecord('item', 'inventorydetail');
					    Rec.commitLineItem('item');
					 }*/
					
					var subrec = Rec.createCurrentLineItemSubrecord('item','inventorydetail');
					nlapiLogExecution('DEBUG', 'Sales Order', 'subrec for Transfer  inventory = ' + subrec);
					  
		
					var tempStore =0;
					for(var r = 0;r < inventorydetailSearch.length;r++)
				    {
						var InventoryNumber = inventorydetailSearch[r].getValue('inventorynumber');
						nlapiLogExecution('DEBUG', 'Sales Order', 'InventoryNumber ==' +InventoryNumber);
						
						var binNumber = inventorydetailSearch[r].getValue('binnumber');
						
						nlapiLogExecution('DEBUG', 'Sales Order', 'binNumber ==' +binNumber);
						
						var Invstatus = inventorydetailSearch[r].getValue('status');
						//InvstatusArray.push(Invstatus);
						nlapiLogExecution('DEBUG', 'Sales Order', 'Invstatus ==' +Invstatus);
						
						var InvQuantity = inventorydetailSearch[r].getValue('quantity');
					
						nlapiLogExecution('DEBUG', 'Sales Order', 'InvQuantity ==' +InvQuantity);
						
					
						   if((parseFloat(minusQty1) <= parseFloat(InvQuantity)) && (parseFloat(tempStore) == 0))
							{
							   nlapiLogExecution('DEBUG', 'Acct', 'condition 1 ==');
							   
							   InvQuantity = parseFloat(minusQty1);
							   tempStore += parseFloat(minusQty1);
							   nlapiLogExecution('DEBUG', 'Acct', 'condition 1 =:tempStore='+tempStore);
							}
						   else  if((parseFloat(minusQty1) < parseFloat(InvQuantity)) && (parseFloat(tempStore) > 0))
							{
							   nlapiLogExecution('DEBUG', 'Acct', 'condition 1.1 ==');
							   
							   InvQuantity =parseFloat(minusQty1)-parseFloat(tempStore);
							   tempStore += parseFloat(minusQty1);
							   nlapiLogExecution('DEBUG', 'Acct', 'condition 1.1 =:tempStore='+tempStore);
							}
						   else if((parseFloat(minusQty1) > parseFloat(InvQuantity)) && (tempStore == 0))
						   {
							   nlapiLogExecution('DEBUG', 'Acct', 'condition 2 ==');
							       InvQuantity =parseFloat(InvQuantity);
							       tempStore += parseFloat(InvQuantity);
							  
							  nlapiLogExecution('DEBUG', 'Acct', 'condition 2 =:tempStore='+tempStore);
									
							}
						   else if((parseFloat(minusQty1) >= parseFloat(InvQuantity)) && (tempStore > 0))
						   {
							   nlapiLogExecution('DEBUG', 'Acct', 'condition 3 ==');
							   
							   var remQ = parseFloat(minusQty1)-parseFloat(tempStore);
							   
							    tempStore += parseFloat(InvQuantity);
							   
							       if((tempStore > minusQty1) && (remQ < InvQuantity) )
							    	{
							    	   InvQuantity =parseFloat(remQ);
							    	}
							       else if((tempStore > minusQty1) && (remQ > InvQuantity) )
							    	{
							    	   InvQuantity =parseFloat(InvQuantity);
							    	}
							       else
							       {
							    	   InvQuantity =parseFloat(InvQuantity);
							       }
							   
							  
							  nlapiLogExecution('DEBUG', 'Acct', 'condition 3 =:InvQuantity='+InvQuantity);
									
							}
							subrec.selectNewLineItem('inventoryassignment');
						  	subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InventoryNumber);
						  	nlapiLogExecution('DEBUG', 'Sales Order', 'InventoryNumber set Is==' +InventoryNumber);
						       
							subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(InvQuantity));//count
							nlapiLogExecution('DEBUG', 'Sales Order', 'InvQuantity set Is==' +InvQuantity);
							subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
							
					        subrec.commitLineItem('inventoryassignment');	 
					        nlapiLogExecution('DEBUG', 'Sales Order', 'subrecord  Is commited==');
						  	
					        nlapiLogExecution('DEBUG', 'Sales Order', 'tempStore ==' +tempStore+'&  minusQty1'+ minusQty1);
					         
					          if(tempStore == minusQty1)
					        	{
					        	  break;
					        	}
					
					   }
						subrec.commit(); 
						
						Rec.commitLineItem('item');
					 nlapiLogExecution('DEBUG', 'Sales Order', 'item  Is commited number=='+ah);
		//=================== End Of Inv Details Set=========================================================
							
				
				
			  }
		    }		
		
	    }
		
		var submitID = nlapiSubmitRecord(Rec,true);
		 nlapiLogExecution('DEBUG', 'Sales Order', 'SALES order Is submmited==');
	 response.sendRedirect('RECORD', 'salesorder', submitID, false,'view');
		}// End Checkbox
//=============================== End to Set SO ============================================
}
}// END (POST method)


function createInventoryTransfer(status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,salesApproval_Status,customer_category,toLocation,itemCount,SO_ItemArray,SO_LineLocationArray,descriptionArray,unitsArray,qtyArray,litersArray,invDetIdArray,setLocFrom,reamainingArray)
{
	nlapiLogExecution("DEBUG","In Create Function","createInventoryTransfer**************");
	
	var record = nlapiCreateRecord('inventorytransfer',{recordmode: 'dynamic'}); 
	
	var InventoryNumberArray=[];
	var binNumberArray=[];
	var InvstatusArray=[];
	var InvQuantityArray=[];
	var InventoryLocationArray=[];
	var InventoryitemCountArray=[];
	
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
		
		if(setLocFrom != null && setLocFrom != '' && setLocFrom != undefined)
		{
			record.setFieldValue('location',setLocFrom);
			//nlapiLogExecution("DEBUG","In Create Function","locationArray1=="+locationArray1)
		}
		
		if(toLocation != null && toLocation != '' && toLocation != undefined)
		{
			record.setFieldValue('transferlocation',toLocation);
			nlapiLogExecution("DEBUG","In Create Function","toLocation=="+toLocation)
		}
		
		var count =0;
		 
		for(x=1;x<=SO_ItemArray.length;x++)
		{
			//nlapiLogExecution("DEBUG","In Create Function","itemArray.length in inventory item=="+itemArray.length);
			 var Add =0;
			 var tempStore =0;
			 record.selectNewLineItem('inventory');
		
			record.setCurrentLineItemValue('inventory','item',SO_ItemArray[x-1]);   
		    nlapiLogExecution("DEBUG","In Create Function","item done=="+SO_ItemArray[x-1]);
			
			record.setCurrentLineItemValue('inventory','description',descriptionArray[x-1]);
			nlapiLogExecution("DEBUG","In Create Function","description done=="+descriptionArray[x-1]);
			
			record.setCurrentLineItemValue('inventory','adjustqtyby',parseFloat(qtyArray[x-1]));                              
			nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+parseFloat(qtyArray[x-1]));
			
			record.setCurrentLineItemValue('inventory','custcol_litres',litersArray[x-1]);                                          
			nlapiLogExecution("DEBUG","In Create Function","custcol_litres done=="+litersArray[x-1]);
	
//====================================== Setting Inventory Details =====================================================
			var inventorydetailSearch = nlapiSearchRecord("inventorydetail","customsearch_so_to_it_for_inventorydetai",
					[
						["internalid","anyof",invDetIdArray[x-1]]
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
				nlapiLogExecution('DEBUG', 'Acct', 'InventoryNumber ==' +InventoryNumber);
				
				var binNumber = inventorydetailSearch[r].getValue('binnumber');
				binNumberArray.push(binNumber)
				nlapiLogExecution('DEBUG', 'Acct', 'binNumber ==' +binNumber);
				
				var Invstatus = inventorydetailSearch[r].getValue('status');
				InvstatusArray.push(Invstatus);
				nlapiLogExecution('DEBUG', 'Acct', 'Invstatus ==' +Invstatus);
				
				var InvQuantity = inventorydetailSearch[r].getValue('quantity');
			
				nlapiLogExecution('DEBUG', 'Acct', 'InvQuantity ==' +InvQuantity);
				
			
			
				   if((parseFloat(qtyArray[x-1]) <= parseFloat(InvQuantity)) && (parseFloat(tempStore) == 0))
					{
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 1 ==');
					   
					   InvQuantity = parseFloat(qtyArray[x-1]);
					   tempStore += parseFloat(qtyArray[x-1]);
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 1 =:tempStore='+tempStore);
					}
				   else if((parseFloat(qtyArray[x-1]) > parseFloat(InvQuantity)) && (tempStore == 0))
				   {
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 2 ==');
					       InvQuantity =parseFloat(InvQuantity);
					       tempStore += parseFloat(InvQuantity);
					  
					  nlapiLogExecution('DEBUG', 'Acct', 'condition 2 =:tempStore='+tempStore);
							
					}
				   else if((parseFloat(qtyArray[x-1]) >= parseFloat(InvQuantity)) && (tempStore > 0))
				   {
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 3 ==');
					   
					   var remQ = parseFloat(qtyArray[x-1])-parseFloat(tempStore);
					   
					    tempStore += parseFloat(InvQuantity);
					   
					       if((tempStore > qtyArray[x-1]) && (remQ < InvQuantity) )
					    	{
					    	   InvQuantity =parseFloat(remQ);
					    	}
					       else if((tempStore > qtyArray[x-1]) && (remQ > InvQuantity) )
					    	{
					    	   InvQuantity =parseFloat(InvQuantity);
					    	}
					       else
					       {
					    	   InvQuantity =parseFloat(InvQuantity);
					       }
					   
					  
					  nlapiLogExecution('DEBUG', 'Acct', 'condition 3 =:InvQuantity='+InvQuantity);
							
					}
				  
				   
					subrec.selectNewLineItem('inventoryassignment');
				  	subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InventoryNumber);
				  	nlapiLogExecution('DEBUG', 'Acct', 'InventoryNumber set Is==' +InventoryNumber);
				       
					subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(InvQuantity));//count
					nlapiLogExecution('DEBUG', 'Acct', 'InvQuantity set Is==' +InvQuantity);
					subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
					
			        subrec.commitLineItem('inventoryassignment');//	 
			        nlapiLogExecution('DEBUG', 'Acct', 'subrecord  Is commited==');
				  	
			        nlapiLogExecution('DEBUG', 'Acct', 'tempStore ==' +tempStore+'&  qtyArray[x-1]'+ qtyArray[x-1]);
			         
			          if(tempStore == qtyArray[x-1])
			        	{
			        	  break;
			        	}
			
			   }
				subrec.commit(); 
				
//=================== End Of Inv Details Set=========================================================
			
	record.commitLineItem('inventory');
	nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
}//End of for loop
	
 //  var SubmitIt = nlapiSubmitRecord(record,true);  
 //  nlapiLogExecution("DEBUG","In Create Function","Submit done for Inventory Transfer=="+SubmitIt);
  

 //  return SubmitIt;
}
}	

function createRevInventoryTransfer(status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,salesApproval_Status,customer_category,toLocation,itemCount,SO_ItemArray,SO_LineLocationArray,descriptionArray,unitsArray,qtyArray,reamainingArray,litersArray,setLocFrom,invDetIdArray)
{
	nlapiLogExecution("DEBUG","In Create Function","createRevInventoryTransfer**************");
	//nlapiLogExecution("DEBUG","In Create Function","reversArrQty in Revinventory transfer=="+reversArrQty);
	//nlapiLogExecution("DEBUG","In Create Function","reversArrLot in Revinventory transfer=="+reversArrLot)	
	//nlapiLogExecution("DEBUG","In Create Function","invcountArr in Revinventory transfer=="+invcountArr);
	
	var record = nlapiCreateRecord('inventorytransfer',{recordmode: 'dynamic'}); 
	

	var InventoryNumberArray=[];
	var binNumberArray=[];
	var InvstatusArray=[];
	var InvQuantityArray=[];
	var InventoryLocationArray=[];
	var InventoryitemCountArray=[];
	
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
		
		if(toLocation != null && toLocation != '' && toLocation != undefined)
		{
			record.setFieldValue('location',toLocation);
			//nlapiLogExecution("DEBUG","In Create Function","locationArray1=="+locationArray1)
		}
		
		if(setLocFrom != null && setLocFrom != '' && setLocFrom != undefined)
		{
			record.setFieldValue('transferlocation',setLocFrom);
			nlapiLogExecution("DEBUG","In Create Function","setLocFrom in Revinventory transfer=="+setLocFrom)
		}
		
		var count =0;
		 
		for(x=1;x<=SO_ItemArray.length;x++)
		{
			//nlapiLogExecution("DEBUG","In Create Function","itemArray.length in inventory item=="+itemArray.length);
			var Add =0;
			record.selectNewLineItem('inventory');
		
			record.setCurrentLineItemValue('inventory','item',SO_ItemArray[x-1]);   
		    nlapiLogExecution("DEBUG","In Create Function","item done in Revinventory transfer=="+SO_ItemArray[x-1]);
			
			record.setCurrentLineItemValue('inventory','description',descriptionArray[x-1]);
			nlapiLogExecution("DEBUG","In Create Function","description done in Revinventory transfer=="+descriptionArray[x-1]);
			
			record.setCurrentLineItemValue('inventory','adjustqtyby',parseFloat(reamainingArray[x-1]));                              
			nlapiLogExecution("DEBUG","In Create Function"," quantity done in Revinventory transfer=="+parseFloat(reamainingArray[x-1]));
			
			record.setCurrentLineItemValue('inventory','custcol_litres',litersArray[x-1]);                                          
			nlapiLogExecution("DEBUG","In Create Function","custcol_litres done in Revinventory transfer=="+litersArray[x-1]);
	
			//====================================== Setting Inventory Details =====================================================
			var inventorydetailSearch = nlapiSearchRecord("inventorydetail","customsearch_so_to_it_for_inventorydetai",
					[
						["internalid","anyof",invDetIdArray[x-1]]
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
			 
			var tempStore =0;
			for(var r = 0;r < inventorydetailSearch.length;r++)
		    {
				var afterQTy;
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
			
				nlapiLogExecution('DEBUG', 'Acct', 'InvQuantity ==' +InvQuantity);
				
				 afterQTy = parseFloat(InvQuantity);
				var  afterQTy1 = parseFloat(InvQuantity);
				
			

				   if((parseFloat(qtyArray[x-1]) <= parseFloat(InvQuantity)) && (parseFloat(tempStore) == 0))
					{
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 1 ==');
					   
					   InvQuantity = parseFloat(qtyArray[x-1]);
					   tempStore += parseFloat(qtyArray[x-1]);
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 1 =:tempStore='+tempStore);
					}
				   else  if((parseFloat(qtyArray[x-1]) < parseFloat(InvQuantity)) && (parseFloat(tempStore) > 0))
					{
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 1.1 ==');
					   
					   InvQuantity =parseFloat(qtyArray[x-1])-parseFloat(tempStore);
					   tempStore += parseFloat(qtyArray[x-1]);
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 1.1 =:tempStore='+tempStore);
					}
				   else if((parseFloat(qtyArray[x-1]) > parseFloat(InvQuantity)) && (tempStore == 0))
				   {
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 2 ==');
					       InvQuantity =parseFloat(InvQuantity);
					       tempStore += parseFloat(InvQuantity);
					  
					  nlapiLogExecution('DEBUG', 'Acct', 'condition 2 =:tempStore='+tempStore);
							
					}
				   else if((parseFloat(qtyArray[x-1]) >= parseFloat(InvQuantity)) && (tempStore > 0))
				   {
					   nlapiLogExecution('DEBUG', 'Acct', 'condition 3 ==');
					   
					   var remQ = parseFloat(qtyArray[x-1])-parseFloat(tempStore);
					   
					    tempStore += parseFloat(InvQuantity);
					   
					       if((tempStore > qtyArray[x-1]) && (remQ < InvQuantity) )
					    	{
					    	   InvQuantity =parseFloat(remQ);
					    	}
					       else if((tempStore > qtyArray[x-1]) && (remQ > InvQuantity) )
					    	{
					    	   InvQuantity =parseFloat(InvQuantity);
					    	}
					       else
					       {
					    	   InvQuantity =parseFloat(InvQuantity);
					       }
					   
					  
					  nlapiLogExecution('DEBUG', 'Acct', 'condition 3 =:InvQuantity='+InvQuantity);
							
					}
				   
				   afterQTy= parseFloat(afterQTy1)-parseFloat(InvQuantity);
					
			        nlapiLogExecution('DEBUG', 'Reverse Trans', 'tempStore ==' +tempStore+'&  qtyArray[x-1]'+ qtyArray[x-1]);
			        nlapiLogExecution('DEBUG', 'Reverse Trans', 'afterQTy' +afterQTy);
			         
			                   if( afterQTy > 0)
			                	{
			                	   subrec.selectNewLineItem('inventoryassignment');
								  	subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InventoryNumber);
								  	nlapiLogExecution('DEBUG', 'Acct', 'InventoryNumber set Is==' +InventoryNumber);
								       
									subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(afterQTy));//count
									nlapiLogExecution('DEBUG', 'Acct', 'InvQuantity set Is==' +InvQuantity);
									subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
									
							        subrec.commitLineItem('inventoryassignment');
							        nlapiLogExecution('DEBUG', 'Acct', 'subrecord  Is commited==');
								  	
			                	}
			               
			        	
			
			   }
				subrec.commit(); 
				
//=================== End Of Inv Details Set=========================================================
			
record.commitLineItem('inventory');
nlapiLogExecution("DEBUG","In Create Function","commitLineItem done in Revinventory transfer==");

}//End of for loop
	
 //  var SubmitIt1 = nlapiSubmitRecord(record,true);  
  //  nlapiLogExecution("DEBUG","In Create Function","Submit done in Revinventory transfer=="+SubmitIt1);
  
   //  return SubmitIt1;
}
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
		
	
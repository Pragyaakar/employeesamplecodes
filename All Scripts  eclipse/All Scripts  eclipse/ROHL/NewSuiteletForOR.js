function suiteletForNewOR(request, response)
{

	if (request.getMethod() == 'GET') 
	{
		try{
	var subsidary =request.getParameter('subsidary'); 
	nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidary :'+subsidary);
	
	var subsiname =request.getParameter('subsi'); 
	nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidary :'+subsiname);
	
	var vendor=request.getParameter('vendor'); 
	nlapiLogExecution('DEBUG', 'OrderRequisition', 'vendor :'+vendor);

      
	// ======= ADD FIELDS ========

	   var form = nlapiCreateForm("ROHL Order Requisition");

	    var sub= form.addField('custpage_subsidiary', 'text', 'subsidiary');
        	sub.setDefaultValue(subsiname);
	      sub.setDisplayType('disabled');

	 
		var vendorName = form.addField('custpage_vendorname', 'select', 'Vendor');
		vendorName.addSelectOption('-1','');
		vendorName.setMandatory(true);
		
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('subsidiary', null, 'is', subsidary);
		  var searchResults = nlapiSearchRecord('vendor','customsearch_vendor_search_namewise',filters,[new nlobjSearchColumn('altname')]);

			nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);
   
			for (var result in searchResults)
		
	         	{	
				
	                 vendorName.addSelectOption(searchResults[result].getId(), searchResults[result].getValue('altname'));
	                 
			
		        // nlapiLogExecution('debug','Search Values','vendorName := '+vendorName);
		
	              	}
		
			
                
          	   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Customise','custpage_sample_tab');
		   ItemSublist.addField('custpage_chechbox','checkbox'); 
		   ItemSublist.addField('custpage_reqi', 'text', 'REQUISITION #')
		   ItemSublist.addField('custpage_item','select','Item','ITEM').setDisplayType('disabled');
		   ItemSublist.addField('custpage_unit', 'text', 'UNIT');
		   ItemSublist.addField('custpage_descrip', 'text', 'Description');
		   ItemSublist.addField('custpage_type', 'text', 'TYPE').setDisplayType('hidden');
		   ItemSublist.addField('custpage_quantity', 'text', 'QUANTITY');
		   ItemSublist.addField('custpage_rate', 'float', 'RATE').setDisplayType('entry');
		   ItemSublist.addField('custpage_subsidiary','select', 'SUBSIDIARY','subsidiary').setDisplayType('hidden');
		   ItemSublist.addField('custpage_currency','select', 'CURRENCY','currency').setDisplayType('hidden');
		   ItemSublist.addField('custpage_department','select', 'DEPARTMENT','department');
		   ItemSublist.addField('custpage_class','select', 'CLASS','classification');
		   ItemSublist.addField('custpage_location','select', 'LOCATION','location');
		   ItemSublist.addField('custpage_order_hsn_code', 'text', 'HSN code').setDisplayType('hidden');
		   ItemSublist.addField('custpage_order_amount', 'float', 'ORDER AMOUNT');

			var filters = new Array();
			filters[0] = new nlobjSearchFilter('subsidiary', null, 'is', subsidary);
		   
                      var columns = new Array();
		//	 columns[0] = new nlobjSearchColumn('internalid');
			 columns[0] = new nlobjSearchColumn("item"); 
			 columns[1] =  new nlobjSearchColumn("unit");
			 columns[2] =   new nlobjSearchColumn("type"), 
		//	 columns[4] =  new nlobjSearchColumn("altname","vendor",null);
			 columns[3] = new nlobjSearchColumn("subsidiary"); 
			 columns[4] =  new nlobjSearchColumn("name","Currency",null);
			 columns[5] = new nlobjSearchColumn("quantity"); 
			 columns[6] =  new nlobjSearchColumn("department"); 
			 columns[7] =  new nlobjSearchColumn("class"); 
			 columns[8] =  new nlobjSearchColumn("location"); 
			 columns[9] =  new nlobjSearchColumn("amount"); 
			 columns[10] =  new nlobjSearchColumn("tranid");
			 columns[11] = new nlobjSearchColumn("memo");
			 columns[12] = new nlobjSearchColumn("custitem_in_hsn_code","item",null);
			 columns[13] = new nlobjSearchColumn("lastpurchaseprice","item",null);
					 
		
	      var results = GetSearchResults(filters,columns); 
	
	
		for (var i = 1; i <= results.length; i++) 
		{ 
			 ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
			
			 ItemSublist.setLineItemValue('custpage_item', i, results[i-1].getValue('item'));
			 nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+results[i-1].getValue('item'));
			 
			 ItemSublist.setLineItemValue('custpage_quantity', i, results[i-1].getValue('quantity'));
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+results[i-1].getValue('quantity'));

			 
			 ItemSublist.setLineItemValue('custpage_subsidiary', i, results[i-1].getValue('subsidiary'));
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+results[i-1].getValue('subsidiary'));
			 
			 ItemSublist.setLineItemValue('custpage_descrip', i, results[i-1].getValue('memo'));
			 
			 var purchaseLast = results[i-1].getValue("lastpurchaseprice","item");
			 
			 if(purchaseLast != null && purchaseLast != ' ')
			 {
				 purchaseLast = results[i-1].getValue("lastpurchaseprice","item");
				 ItemSublist.setLineItemValue('custpage_rate', i,purchaseLast);
			 }
			 else{
				 var zero ='0.00';
				 ItemSublist.setLineItemValue('custpage_rate', i,zero);
			 }
			
				
			     ItemSublist.setLineItemValue('custpage_type', i, results[i-1].getValue('type'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'type :'+results[i-1].getValue('type'));

		
				 ItemSublist.setLineItemValue('custpage_class', i, results[i-1].getValue('class'));
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'class :'+results[i-1].getValue('class'));

				 
				 ItemSublist.setLineItemValue('custpage_department', i, results[i-1].getValue('department'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'department :'+results[i-1].getValue('department'));

				 
				 ItemSublist.setLineItemValue('custpage_location', i, results[i-1].getValue('location'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'location :'+results[i-1].getValue('location'));

				 
				 ItemSublist.setLineItemValue('custpage_order_amount', i, results[i-1].getValue('amount'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'amount :'+results[i-1].getValue('amount'));
			 
				 ItemSublist.setLineItemValue('custpage_unit', i, results[i-1].getValue('unit'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'unit :'+results[i-1].getValue('unit'));
				
				 
				 ItemSublist.setLineItemValue('custpage_reqi', i, results[i-1].getValue('tranid'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi_num :'+results[i-1].getValue('tranid'));
		
				 ItemSublist.setLineItemValue('custpage_order_hsn_code', i, results[i-1].getValue("custitem_in_hsn_code","item"));
		   	//	  ItemSublist.setLineItemValue('custpage_currency', i, results[i-1].getValue('name','currency',null));
			       nlapiLogExecution('DEBUG', 'OrderRequisition', 'HSNcode :'+ results[i-1].getValue("custitem_in_hsn_code","item"));
 
			
		}
		
		form.setScript('customscript_client_order_requisition');
		 
		var createPO=form.addSubmitButton('Create_PO');
		createPO.setDisabled(false);
		}
		catch(e)
		{
			throw nlapiCreateError('SUITELET_ERROR',"There is No data Available for this Subsidiary...", false); 
		}
      	response.writePage(form);
	}
	else
	{
		if (request.getMethod() == 'POST') 
		{
		 var count = request.getLineItemCount('custpage_sig_req_sublist');
		 
		 var vendorName=request.getParameter('custpage_vendorname');
		 
		  var num = 0;
           
		  var itemArr =new Array();
		  var quanArr =new Array();
		  var subsiArr =new Array();
		  var typeArr =new Array();
		  var classArr =new Array();
		  var departArr =new Array();
		  var LocArr =new Array();
		  var amtArr =new Array();
		  var unitArr =new Array();
		  var tranidArr =new Array();
          var descripArr =new Array();
          var hsncodeArr = new Array();
          var lastPurchaseArr = new Array();//lastPurchaseArr

		         var columns1 = new Array();
			//	 columns[0] = new nlobjSearchColumn('internalid');
				 columns1[0] = new nlobjSearchColumn("internalid"); 
				 columns1[1] =  new nlobjSearchColumn("pluralname");
				 var filters1 = new Array();
			
			
		  
		  var lineNum =0;
		  for(var i=1; i< count+1; i++)
		  {
		   
		   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
		 
		  
		   if(checkMark == 'T')
		   {
		   
			   lineNum = lineNum + parseInt(1);
		    var internalId = request.getLineItemValue('custpage_sig_req_sublist', 'internalid', i);
		   
		    var recordType = request.getLineItemValue('custpage_sig_req_sublist', 'recordtype', i);
           
    			
    			
    			 var item =request.getLineItemValue('custpage_sig_req_sublist','custpage_item', i);
    			 nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+item);
    			 itemArr.push(item);
    			 
    			 var quantity = request.getLineItemValue('custpage_sig_req_sublist','custpage_quantity', i);
    			 nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+quantity);
    			 quanArr.push(quantity);
    			 
    		    	var subsidiary = request.getLineItemValue('custpage_sig_req_sublist','custpage_subsidiary', i);
    		    	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+subsidiary);
    		    	 subsiArr.push(subsidiary);
    			
    		    	 var descrip = request.getLineItemValue('custpage_sig_req_sublist','custpage_descrip', i);
    		    	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+subsidiary);
    		    	 descripArr.push(descrip);
    		    	 
    		    	 var lastPurchase = request.getLineItemValue('custpage_sig_req_sublist','custpage_rate', i);
    		    	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+subsidiary);
    		    	 lastPurchaseArr.push(lastPurchase);
    				
    			   var type = request.getLineItemValue('custpage_sig_req_sublist','custpage_type', i);
    				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'type :'+type);
    				 typeArr.push(type);
    		
    				 var class1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_class', i);
    				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'class :'+class1);
    				 classArr.push(class1);
    				 
    				 var department = request.getLineItemValue('custpage_sig_req_sublist','custpage_department', i);
    				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'department :'+department);
    				 departArr.push(department);
    				 
    				 var location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location', i);
    				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'location :'+location);
    				 LocArr.push(location);
    				 
    				 var amount = request.getLineItemValue('custpage_sig_req_sublist','custpage_order_amount', i);
    				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'amount :'+amount);
    				 amtArr.push(amount);
    				 
    				 var hsncode = request.getLineItemValue('custpage_sig_req_sublist','custpage_order_hsn_code', i);
    				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'hsncode :'+hsncode);
    				 hsncodeArr.push(hsncode);
    				
    				 
    				 var unit = request.getLineItemValue('custpage_sig_req_sublist','custpage_unit', i);
    				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'unit :'+unit);
    				 
    				
    				 var results1 = GetSearchResults1(filters1,columns1); 
 					for (var j = 1; j <= results1.length; j++) 
 					{ 
 						var id = results1[j-1].getValue('internalid');
 						
 						var name = results1[j-1].getValue('pluralname');
 						
 						 // nlapiLogExecution('DEBUG', 'OrderRequisition', 'Unit ID :'+id);
 						 if( name == unit )
 						 {
 							 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Unit name :'+name+' : unit'+unit);
 							 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Unit ID :'+id);
 							 unitArr.push(id);
 						 }
 					
 						 
 					}	
    				
    				 
    				 var tranid = request.getLineItemValue('custpage_sig_req_sublist','custpage_reqi', i);
    				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi_num :'+tranid);
    				 tranidArr.push(tranid);

	
	    	   }
		 
		  }
		  createPurchaseOrderForPR(lineNum,vendorName,amtArr,subsiArr,lastPurchaseArr,descripArr,classArr,departArr,LocArr,itemArr,quanArr,unitArr,tranidArr,hsncodeArr);
		  response.writePage( form );
		 }
	}
}


function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_order_requisition_search', filters, columns);
	return results;
}


function GetSearchResults1(filters,columns) {
	var results1 = nlapiSearchRecord('unitstype', 'customsearch_units_of_msur', filters, columns);
	return results1;
}


function createPurchaseOrderForPR(lineNum,vendorName,amtArr,subsiArr,lastPurchaseArr,descripArr,classArr,departArr,LocArr,itemArr,quanArr,unitArr,tranidArr,hsncodeArr)	
{	

	
	var record = nlapiCreateRecord('purchaseorder'); //, {recordmode: 'dynamic'}); 
	var num =174;
	record.setFieldValue('customform',num);
	
	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'vendor :'+vendorName);
	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'lineNum :'+lineNum);
		
	 
	   if(vendorName != '' && vendorName != 'undefined' && vendorName != null)
		{
			// To Set vendor Name
		   nlapiLogExecution("DEBUG","In Create Function","**To Set Vendor Name**");
			record.setFieldValue('entity',vendorName);//vendor
		}

  /*		if(date != '' && date != 'undefined' && date != null)
		{
			record.setFieldValue('trandate',date);
		}

	*/   
     for(var v = 0 ; v < 1 ; v++)
	{
	
    	 if(classArr != '' && classArr != 'undefined' && classArr != null)
		{
			// To Set vendor Name
		   nlapiLogExecution("DEBUG","In Create Function","**To Set Customer Name**");
			record.setFieldValue('class',classArr[v]);//vendor
		}

		
		if(departArr != '' && departArr != 'undefined' && departArr != null)
		{
			record.setFieldValue('department',departArr[v]);
		}


	
		if(subsiArr != '' && subsiArr != 'undefined' && subsiArr != null)
		{
			// To Set Subsidiary
			record.setFieldValue('subsidiary',subsiArr[v]);
		}
	
		if(LocArr != '' && LocArr != 'undefined' && LocArr != null)
		{
			// To Set Subsidiary
			record.setFieldValue('location',LocArr[v]);
		}
	         
	}
	var price =-1;
	var rate =50;
	

	for(var l=1;l<=lineNum;l++)
	{
				nlapiLogExecution("DEBUG","In Create Function","item in for loop=="+itemArr[l-1]);
				nlapiLogExecution("DEBUG","In Create Function","qty in for loop=="+quanArr[l-1]);
				nlapiLogExecution("DEBUG","In Create Function","amount in for loop=="+amtArr[l-1]);
			      
					var rate = lastPurchaseArr[l-1];
			      record.selectNewLineItem('item');
		
			      record.setCurrentLineItemValue('item','item',itemArr[l-1]);   
			      nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArr[l-1]);    
		    
			      
			      record.setCurrentLineItemValue('item', 'quantity', quanArr[l-1]);                              
			      nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+quanArr[l-1]);
			      
			      record.setCurrentLineItemValue('item','rate',parseFloat(rate));
			      nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
			      
			      if(rate!=null)
			      {
                     record.setCurrentLineItemValue('item', 'custcol_unit_rate',parseFloat(rate)); 
			      }
			      else
			    	  {
			    	  rate ='0';
			    	  record.setCurrentLineItemValue('item', 'custcol_unit_rate',parseFloat(rate)); 
			    	  }
				  var amt = parseFloat(rate) *  parseFloat(quanArr[l-1]);
				  
				  record.setCurrentLineItemValue('item', 'custcol_amt_receipt',amt); 
				  
				  record.setCurrentLineItemValue('item', 'custcol_last_purchase_price',lastPurchaseArr[l-1]); 
      
			      record.setCurrentLineItemValue('item','amount',parseFloat(rate));
			      nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
			      
			      record.setCurrentLineItemValue('item','description',descripArr[l-1]);
			      nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
			     
			    //  record.setCurrentLineItemValue('item', 'description',descriptionArray[i-1]); 
			    //  nlapiLogExecution("DEBUG","In Create Function","description done==");
			      
			      record.setCurrentLineItemValue('item', 'location', LocArr[l-1]);
			      nlapiLogExecution("DEBUG","In Create Function","location done=="+LocArr[l-1]);
			      
			      record.setCurrentLineItemValue('item', 'department',departArr[l-1]); 
			      nlapiLogExecution("DEBUG","In Create Function","department done=="+departArr[l-1]);
			      
			      record.setCurrentLineItemValue('item', 'class', classArr[l-1]);
			      nlapiLogExecution("DEBUG","In Create Function","class done=="+classArr[l-1]);
			      
			      record.setCurrentLineItemValue('item', 'units', unitArr[l-1]);                                          
			      nlapiLogExecution("DEBUG","In Create Function","units done=="+unitArr[l-1]);
			      
			      record.setCurrentLineItemValue('item', 'custcol_requi_id', tranidArr[l-1]);                                          
			      nlapiLogExecution("DEBUG","In Create Function","tranidArr done=="+tranidArr[l-1]);   //hsncodeArr
			      
			      record.setCurrentLineItemValue('item', 'custcol_in_hsn_code', hsncodeArr[l-1]);                                          
			      nlapiLogExecution("DEBUG","In Create Function","hsncodeArr done=="+hsncodeArr[l-1]); 
			      
			      record.commitLineItem('item');
			      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
			     
			}
	  
	 var params = new Array();
	   params['entity'] = vendorName;
	   params['customform'] = num;
	 	//	var SubmitIt=nlapiSubmitRecord(record,true);  
	     //  nlapiLogExecution("DEBUG","In Create Function","Record Submit done=="+SubmitIt);
	      response.sendRedirect('RECORD', 'purchaseorder',null, false,params);
   }
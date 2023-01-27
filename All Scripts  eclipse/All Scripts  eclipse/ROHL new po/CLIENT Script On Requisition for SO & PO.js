	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       23 Jan 2019     Priyanka Patil
	 *
	 */
	
	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType 
	 * 
	 * @param {String} type Access mode: create, copy, edit
	 * @returns {Void}
	 */
	function onclick_callClientForSO(type)
	{   
		var item1;
		var quantity1;
		var class_name1;
		var customer_name1;
		var units1;
		var amount1;
		var estimatedrate1;
	    var estimatedamount1;
		var aval_qty1;
		var description1;
		var customer1;
		var hsn_code1;
		var Customer;
		var jsonObj;
		
		var customer_Name1 = new Array();
	 	var customerArray1 = new Array();
	 	var customerUniq1 = new Array();
	 	var jsonArray1 = new Array();
	 	var itemArr1 = new Array();
	 	var CustomerArr1 = new Array();
	 	var quantityArr1 = new Array();
	 	var class_nameArr1 = new Array();
	 	var customer_nameArr1 = new Array();
	 	var unitsArr1 = new Array();
	 	var amountArr1 = new Array();
	 	var estimatedrateArr1 = new Array();
	 	var estimatedamountArr1 = new Array();
	 	var aval_qtyArr1 = new Array();
	 	var descriptionArr1 = new Array();
	 	var customerArr1 = new Array();
	 	var hsn_codeArr1 = new Array();
	 	var customernameArr = new Array();
	 	
	 	
		var recordId = nlapiGetRecordId(); 
	    var recordType= nlapiGetRecordType();
	    obj = nlapiLoadRecord(recordType,recordId);
		//alert("  recObj  ==" + recordId +" type :"+recordType);
	
		
		var PRlinecount=obj.getLineItemCount('item');
		//alert('Line Count'+PRlinecount);
		
		var customer_id = obj.getFieldValue('id');
	 	//alert("customer_id  ==" + customer_id);
	 	
	 	//var requisition_No = recObj.getFieldValue('custbodycustbody_req_num');
	 	//nlapiLogExecution('DEBUG', 'aftr submit', "  Requisition No  ==" + requisition_No);
	 	
		for(var i=1;i<=PRlinecount;i++)
		{
		    /*var vendorname =recObj.getLineItemValue('item','povendor',i);
			vendorArray.push(vendorname);
			alert('vendorname'+vendorname);*/
			//alert('Enter in function');
		
		var jsonObj = {
				'item1': [obj.getLineItemValue('item','item',i)],
				'Customer': [obj.getLineItemValue('item','customer',i)],
			    'quantity1':[obj.getLineItemValue('item','quantity',i)],
				'class_name1':[obj.getLineItemValue('item','class',i)],
				//'customer_name1':[obj.getLineItemValue('item','customer',i)],
				'units1':[obj.getLineItemValue('item','units',i)],
				'amount1':[obj.getLineItemValue('item','amount',i)],
				'estimatedrate1':[obj.getLineItemValue('item','estimatedrate',i)],
		        'estimatedamount1':[obj.getLineItemValue('item','estimatedamount',i)],
				'aval_qty1':[obj.getLineItemValue('item','custcol_avlbl_quantity',i)],
				'description1':[obj.getLineItemValue('item','description',i)],
				'customer1':[obj.getLineItemValue('item','customer',i)],
				'hsn_code1':[obj.getLineItemValue('item','custcol_in_hsn_code',i)]
			};
			jsonArray1.push(jsonObj);
			//alert('jsonArray1'+jsonArray1)
		}//End for PRlinecount end
		
			for(var l=0;l<jsonArray1.length;l++)
			{
				
				//alert('Enter in for loop')
				itemArr1.push(jsonArray1[l].item1);
				//alert('item is =='+itemArr1);
				
				CustomerArr1.push(jsonArray1[l].Customer);
				//alert('customer is =='+CustomerArr1);
				
				quantityArr1.push(jsonArray1[l].quantity1);
				class_nameArr1.push(jsonArray1[l].class_name1);
				customer_nameArr1.push(jsonArray1[l].customer_name1);
				unitsArr1.push(jsonArray1[l].units1);
				amountArr1.push(jsonArray1[l].amount1);
				estimatedrateArr1.push(jsonArray1[l].rate1);
				estimatedamountArr1.push(jsonArray1[l].estimatedamount1);
				aval_qtyArr1.push(jsonArray1[l].aval_qty1);
				descriptionArr1.push(jsonArray1[l].description1);
				
				customerArr1.push(jsonArray1[l].customer1);
				//alert('customer in SO is =='+customerArr1);
				
				hsn_codeArr1.push(jsonArray1[l].hsn_code1);
				//alert('HSN Code is =='+hsn_codeArr);
		
			}
			
			customer_Name1 =filter_array1(CustomerArr1);
			//alert('customer_Name1 =='+customer_Name1);
			
			customerUniq1 =removeDuplicates1(customer_Name1);
			//alert('customerUniq1 =='+customerUniq1);
			
			for(var k=0;k <customerUniq1.length;k++)
			{
				//alert('customerUniq in for'+customerUniq1[k]);
				var name = customerUniq1[k];
				//alert('recordId'+recordId);
				var url = "https://5288045-sb1.app.netsuite.com/app/accounting/transactions/salesord.nl?whence=&entity="+name+"&custbody_req_num="+recordId+"";
				window.open(url);
			}
			//}
		}
	
		function filter_array1(test_array) 
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
	
		function removeDuplicates1(num) 
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
	
		
		
		
	function onclick_callClientForPO(type)
	{   
		var item;
		var quantity;
		var class_name;
		var customer_name;
		var units;
		var amount;
		var estimatedrate;
	    var estimatedamount;
		var aval_qty;
		var description;
		var vendor;
		var hsn_code;
		var Vendor;
		
		var vendor_Name = new Array();
	 	var vendorArray = new Array();
	 	var vendorUniq = new Array();
	 	var jsonArray1 = new Array();
	 	var itemArr = new Array();
	 	var VendorArr = new Array();
	 	var quantityArr = new Array();
	 	var class_nameArr = new Array();
	 	var customer_nameArr = new Array();
	 	var unitsArr = new Array();
	 	var amountArr = new Array();
	 	var estimatedrateArr = new Array();
	 	var estimatedamountArr = new Array();
	 	var aval_qtyArr = new Array();
	 	var descriptionArr = new Array();
	 	var vendorArr = new Array();
	 	var hsn_codeArr = new Array();
	 	var vendornameArr = new Array();
	 	
		var recId = nlapiGetRecordId(); 
	    var recType= nlapiGetRecordType();
	    recObj = nlapiLoadRecord(recType,recId);
	
	    
	    var PRlinecount=recObj.getLineItemCount('item');
		//alert('Line Count'+PRlinecount);
		
		var requisition_No = recObj.getFieldValue('custbody_req_num');
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  Requisition No  ==" + requisition_No);
	 	
		
		for(var i=1;i<=PRlinecount;i++)
		{
		    /*var vendorname =recObj.getLineItemValue('item','povendor',i);
			vendorArray.push(vendorname);
			alert('vendorname'+vendorname);*/
			//alert('Enter in function');
		
		var jsonObj = {
				'item': [recObj.getLineItemValue('item','item',i)],
				'Vendor': [recObj.getLineItemValue('item','povendor',i)],
			    'quantity':[recObj.getLineItemValue('item','quantity',i)],
				'class_name':[recObj.getLineItemValue('item','class',i)],
				'customer_name':[recObj.getLineItemValue('item','customer',i)],
				'units':[recObj.getLineItemValue('item','units',i)],
				'amount':[recObj.getLineItemValue('item','amount',i)],
				'estimatedrate':[recObj.getLineItemValue('item','estimatedrate',i)],
		        'estimatedamount':[recObj.getLineItemValue('item','estimatedamount',i)],
				'aval_qty':[recObj.getLineItemValue('item','custcol_avlbl_quantity',i)],
				'description':[recObj.getLineItemValue('item','description',i)],
				'vendor':[recObj.getLineItemValue('item','vendor',i)],
				'hsn_code':[recObj.getLineItemValue('item','custcol_in_hsn_code',i)]
			};
			jsonArray1.push(jsonObj);
		}//End for PRlinecount end
		
			for(var l=0;l<jsonArray1.length;l++)
			{
				itemArr.push(jsonArray1[l].item);
				//alert('item is =='+itemArr);
				
				VendorArr.push(jsonArray1[l].Vendor);
				//alert('PO vendor is =='+VendorArr);
				
				quantityArr.push(jsonArray1[l].quantity);
				//alert('quantity is =='+quantityArr);
				
				class_nameArr.push(jsonArray1[l].class_name);
				//alert('class name is =='+class_nameArr);
				
				customer_nameArr.push(jsonArray1[l].customer_name);
				//alert('customer is =='+customer_nameArr);
				
				unitsArr.push(jsonArray1[l].units);
				//alert('unit is =='+unitsArr);
				
				amountArr.push(jsonArray1[l].amount);
				//alert('amount is =='+amountArr);
				
				estimatedrateArr.push(jsonArray1[l].rate);
				//alert('estimated rate is =='+estimatedrateArr);
				
				estimatedamountArr.push(jsonArray1[l].estimatedamount);
				//alert('estimated amount is =='+estimatedamountArr);
				
				aval_qtyArr.push(jsonArray1[l].aval_qty);
				//alert('available quantity is =='+aval_qtyArr);
				
				descriptionArr.push(jsonArray1[l].description);
				//alert('description is =='+descriptionArr);
				
				vendorArr.push(jsonArray1[l].vendor);
				//alert('vendor is =='+VendorArr);
				
				hsn_codeArr.push(jsonArray1[l].hsn_code);
				//alert('HSN Code is =='+hsn_codeArr);
		
			}
			
			vendor_Name =filter_array(VendorArr);
			vendorUniq =removeDuplicates(vendor_Name);
			
			for(var k=0;k < vendorUniq.length;k++)
			{
				//alert('vendorUniq in for'+vendorUniq[k]);
				var name = vendorUniq[k];
			
				var url = "https://system.na3.netsuite.com/app/accounting/transactions/purchord.nl?whence=&entity="+name+"&custbody_req_num="+recId+"";
		        window.open(url);
				//setTimeout(function(){window.open(url)},5000);
			}
		//}
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
			
		

function clientScriptLoadRecordRequisi(type, name, linenum)
{
	
	 if(name == 'custpage_chechbox') 
     {

		 var location;
		 
		var subsidary = nlapiGetFieldText('custpage_subsidiary');
		//alert('subsidary  is:-'+subsidary)
		 
		var vendor=nlapiGetFieldText('custpage_vendorname');
        //alert('vendor  is:-'+vendor)
		var count = nlapiGetLineItemCount('custpage_sig_req_sublist');
		
		  
     }
	
}

function refresh()
{
	window.location.reload();
}


function redirectSuite()
{
            subsidary = nlapiGetFieldValue('custpage_subsidiary');
	    //	alert('subsidary  is:-'+subsidary)
         var subsi_name =nlapiGetFieldText('custpage_subsidiary');
		 
		var vendor=nlapiGetFieldText('custpage_vendorname');
           //     alert('vendor  is:-'+vendor)
        
            
             var url = nlapiResolveURL('SUITELET', 'customscript_newsuite_for_or', 'customdeploy_newsuite_for_or');
        	 url = url + '&subsidary=' + subsidary+ '&vendor=' + vendor+ '&location=' + location+ '&subsi=' + subsi_name;
             window.onbeforeunload = null;
	  var newwindow = window.open(url, '_parent', 'print')
	  nlapiRequestURL(url);
	         
	
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
			
			
			
				var url1 = "https://system.na3.netsuite.com/app/accounting/transactions/purchord.nl?whence=&entity="+name+"&custbody_req_num="+recId+"";
		        window.open(url1);
		
}
  
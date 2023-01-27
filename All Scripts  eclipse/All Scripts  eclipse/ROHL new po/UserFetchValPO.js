	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       14 Mar 2019     Priyanka Patil
	 *
	 */
	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType
	 * 
	 * @param {String} type Operation types: create, edit, delete, xedit
	 *                      approve, reject, cancel (SO, ER, Time Bill, PO & RMA only)
	 *                      pack, ship (IF)
	 *                      markcomplete (Call, Task)
	 *                      reassign (Case)
	 *                      editforecast (Opp, Estimate)
	 * @returns {Void}	
	 */
	function userValFetchPO(type,form,request)
	{
		try
		{
		var vendorname;
		var po_vendor;
		var vendor_name;
		
		var itemArray = new Array();
		var qtyArray = new Array();
		var unitArray = new Array();
		var rateArray = new Array();
		var lineArray = new Array();
		var descriptionArray = new Array();
		var hsn_codeArray = new Array();
		var vendor_Name = new Array();
	 	var vendorArray = new Array();
	 	var vendorUniq = new Array();
	 	var customerArray = new Array();
	 	var amountArray = new Array();
	 	var ClassArray = new Array();
	 	var aval_qtyArray = new Array();
	 	var estimatedamountArray = new Array();
	 
	  	var requisition_no = request.getParameter('custbody_req_num');
	    nlapiLogExecution('DEBUG','After Submit',"Requisition_no=="+requisition_no);
		
		vendorname = request.getParameter('entity');
		nlapiLogExecution('DEBUG', 'After Submit',"vendorname form requsition=="+vendorname);
		
		var recordId = request.getParameter('custbody_req_num'); 
		var recordType= 'purchaserequisition';
	    recObj = nlapiLoadRecord(recordType,recordId);
	    nlapiLogExecution('DEBUG', 'aftr submit', "recordId  ==" + recordId +" type :"+recordType);
			
		vendor_name = nlapiGetFieldValue('entity');
		nlapiLogExecution('DEBUG', 'aftr submit', "vendor to check==" + vendor_name);
			
	    if(recordId != null && recordId != '' && recordId != undefined)
	    {
	    	recObj = nlapiLoadRecord(recordType,recordId);
	    
		var Department =recObj.getFieldValue('department');
		nlapiLogExecution('DEBUG', 'aftr submit', "Department  ==" + Department);
		
		//vendor_name = recObj.getFieldValue('entity');
		//nlapiLogExecution('DEBUG', 'aftr submit', "vendor_name  ==" + vendor_name);
		
		var requisition_numb =recObj.getFieldValue('tranid');
		nlapiLogExecution('DEBUG', 'aftr submit', "Requisition number  ==" + requisition_numb);
		
		var Class =recObj.getFieldValue('class');
		//ClassArray.push(Class);
		nlapiLogExecution('DEBUG', 'aftr submit', "Class  ==" + Class);
		
		var Location =recObj.getFieldValue('location');
		nlapiLogExecution('DEBUG', 'aftr submit', "Location  ==" + Location);
		
		var requ_no =recObj.getFieldValue('tranid');
		nlapiLogExecution('DEBUG', 'aftr submit', "Requisition number  ==" + requ_no);
		 
		nlapiSetFieldValue('department',Department);
		nlapiSetFieldValue('class',Class);
		nlapiSetFieldValue('location',Location);
		nlapiSetFieldValue('custbody_req_num',recordId);
		nlapiSetFieldValue('entity',vendorname);
		nlapiSetFieldValue('custbody_vendor_name_pr',vendorname);
		//nlapiLogExecution('DEBUG', 'aftr submit', "  po_vendor name   ==" + po_vendor);

		//nexus  taxregoverride
			
		var PRlinecount=recObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
		
		for(var i=1;i<=PRlinecount;i++)
		{ 
	    	var itemid =recObj.getLineItemValue('item','item',i);
	    	itemArray.push(itemid);
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
	    
			var quantity =recObj.getLineItemValue('item','quantity',i);
			qtyArray.push(quantity);
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
	    	
			nlapiLogExecution('DEBUG', 'aftr submit', "  itemArray in po_chk ==" + itemArray);
						
	    	//var customer =recObj.getLineItemValue('item','customer',i);
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  qtyArray in po_chk  ==" + qtyArray);
	    	
	    	/*var vendorname =recObj.getLineItemValue('item','vendorname',i);
	    	vendorArray.push(vendorname);
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  vendorname  ==" + vendorArray);*/
	    	
	    	var Class_name =recObj.getLineItemValue('item','class',i);
	    	ClassArray.push(Class_name);
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  Class_name  ==" + Class_name);
	    	
	    	var customername =recObj.getLineItemValue('item','customer',i);
	    	customerArray.push(customername);
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  Customer Name ==" + customername);
	    	
	    	var units =recObj.getLineItemValue('item','units',i);
	    	unitArray.push(units);
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  unitArray  ==" + unitArray); //povendor
	    	
	    	var amount =recObj.getLineItemValue('item','amount',i); 
	    	amountArray.push(amount);
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  amount  ==" + amount); //povendo
	    	
	    	var rate =recObj.getLineItemValue('item','estimatedrate',i);    
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  Estimated rate  ==" + rate);
	    	rateArray.push(rate);
	    	
	    	var estimatedamount =recObj.getLineItemValue('item','estimatedamount',i);    
	    	nlapiLogExecution('DEBUG', 'aftr submit', " Estimated Amount  ==" + estimatedamount);
	    	estimatedamountArray.push(estimatedamount);
	    	
	    	var line =recObj.getLineItemValue('item','line',i);    
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  line  ==" + rate);
	    	lineArray.push(line);
	    	
	    	var aval_qty =recObj.getLineItemValue('item','custcol_avlbl_quantity',i);    
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  aval_qty  ==" + aval_qty);
	    	aval_qtyArray.push(aval_qty);
	    	
	    	var description =recObj.getLineItemValue('item','description',i);    
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  description  ==" + description);
	    	descriptionArray.push(description);
	    	
	    	var vendor =recObj.getLineItemValue('item','povendor',i);
	    	vendorArray.push(vendor);
	    	nlapiLogExecution('DEBUG', 'aftr submit', " PO vendor  ==" + vendorArray); 
	    	
	    	var hsn_code =recObj.getLineItemValue('item','custcol_in_hsn_code',i);    
	    	hsn_codeArray.push(hsn_code);
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  hsn_codeArray  ==" + hsn_codeArray); 
	    	
	    	if(vendorname == vendor)
		    {
			 nlapiSelectNewLineItem('item');
	         nlapiLogExecution("DEBUG","In Create Function","item done=="+ itemArray[i-1]);
		     nlapiSetCurrentLineItemValue('item', 'item', itemArray[i-1]);   
		     nlapiLogExecution("DEBUG","In Create Function","item done11==");    
	    
		     nlapiSetCurrentLineItemValue('item','quantity', qtyArray[i-1]);                              
		     nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+qtyArray[i-1]);
		      
		     nlapiSetCurrentLineItemValue('item','custcol_pr_quantity', qtyArray[i-1]);                              
		     nlapiLogExecution("DEBUG","In Create Function"," PR quantity done=="+qtyArray[i-1]);
		      
		     nlapiSetCurrentLineItemValue('item', 'units', unitArray[i-1]);                                          
		     nlapiLogExecution("DEBUG","In Create Function","units done=="+unitArray[i-1]);
		      
		     nlapiSetCurrentLineItemValue('item', 'description',descriptionArray[i-1]); 
		     nlapiLogExecution("DEBUG","In Create Function","description done=="+descriptionArray[i-1]);
		      
		      //nlapiSetCurrentLineItemValue('item', 'location', location);
		      //nlapiLogExecution("DEBUG","In Create Function","location done==");
		      
		      nlapiSetCurrentLineItemValue('item', 'department',Department); 
		      nlapiLogExecution("DEBUG","In Create Function","department done=="+Department);
		      
		      nlapiSetCurrentLineItemValue('item', 'class', ClassArray[i-1]);
		      nlapiLogExecution("DEBUG","In Create Function","class done=="+ClassArray[i-1]);
		      
		      nlapiSetCurrentLineItemValue('item', 'customer', customerArray[i-1]);
		      nlapiLogExecution("DEBUG","In Create Function","customer done=="+customerArray[i-1]);
		      
		      nlapiSetCurrentLineItemValue('item', 'custcol_avlbl_quantity', aval_qtyArray[i-1]);
		      nlapiLogExecution("DEBUG","In Create Function","customer done==");	      
		      
		      nlapiSetCurrentLineItemValue('item','rate', rateArray[i-1]);
		      nlapiLogExecution("DEBUG","In Create Function","rate done==");
		      
		      nlapiSetCurrentLineItemValue('item','amount', estimatedamountArray[i-1]);
		      nlapiLogExecution("DEBUG","In Create Function","amount done==");
		            
		      nlapiSetCurrentLineItemValue('item', 'custcol_in_hsn_code', hsn_codeArray[i-1]);
		      nlapiLogExecution("DEBUG","In Create Function","HSN Code done==");
		            
		      nlapiCommitLineItem('item');
		      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
			}   
	    }
	    }//end of if
	   
		return true
		}
		catch (e) 
		{
			nlapiLogExecution('DEBUG','Error Code:'+e);
		 }
	}

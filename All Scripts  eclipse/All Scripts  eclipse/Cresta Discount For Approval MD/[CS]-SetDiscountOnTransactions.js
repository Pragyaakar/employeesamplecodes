function setdiscountPostSourcing(type,name)
{
	if(type == 'item' && name == 'item') 
    {
		var createdFrom = nlapiGetFieldValue('createdfrom');
		var recType = nlapiGetRecordType();
		
		if(recType == 'estimate')
		{
			var customer = nlapiGetFieldValue('entity');
			var Transcurrency = nlapiGetFieldValue('currency');
			var date = nlapiGetFieldValue('trandate');
			
			var lineItem = nlapiGetCurrentLineItemValue('item','item');
			var lineQty = nlapiGetCurrentLineItemValue('item','quantity');
			//var lineQty = nlapiGetCurrentLineItemValue('item','quantity');
			
			if(lineItem != null && lineItem != '' && lineItem != undefined)
			{
				//alert('customer == ' + customer + 'currency == ' + Transcurrency + 'date == ' + date + 'lineItem == ' + lineItem);
				var lineAmt = nlapiGetCurrentLineItemValue('item','amount');
				//alert('lineAmt == ' + lineAmt);
				
				var itemSearch = nlapiSearchRecord("item","customsearch_setdiscount_itemserach",
				[
					["internalid","anyof",lineItem], 
					"AND",
					["pricing.currency","anyof",Transcurrency], 
					"AND", 
					["pricing.customer","anyof",customer]
				], 
				[
					new nlobjSearchColumn("internalid"), 
					new nlobjSearchColumn("itemid"), 
					new nlobjSearchColumn("currency","pricing",null), 
					new nlobjSearchColumn("unitprice","pricing",null), 
					new nlobjSearchColumn("pricelevel","pricing",null)
				]
				);
				
				if(itemSearch != null && itemSearch != '' && itemSearch != undefined)
				{
					//alert('itemSearch.length == ' + itemSearch.length)
					for(var l = 0; l < itemSearch.length; l++) 
					{
						var itemInternalid = itemSearch[l].getValue('internalid');
						var itemName = itemSearch[l].getValue('itemid');
						var PriceCurrency = itemSearch[l].getValue("currency","pricing");
						var UnitPrice = itemSearch[l].getValue("unitprice","pricing");
						var priceLevel = itemSearch[l].getValue("pricelevel","pricing");
					}
				}
				
				//alert('priceLevel == ' + priceLevel)
				var discountMaster = nlapiSearchRecord("customrecord_discount_master","customsearch_discount_master_search",
				[
					["custrecord_customer","anyof",customer], 
					"AND", 
					["custrecord_startdate","onorbefore",date], 
				    "AND", 
				    ["custrecord_enddate","onorafter",date], 
					"AND", 
				    ["custrecord_discount_header.custrecord_discount_item","anyof",lineItem]
				], 
				[
					new nlobjSearchColumn("custrecord_customer"), 
					new nlobjSearchColumn("custrecord_startdate"), 
					new nlobjSearchColumn("custrecord_enddate"), 
					new nlobjSearchColumn("custrecord_discount"), 
					new nlobjSearchColumn("custrecord_discount_item","CUSTRECORD_DISCOUNT_HEADER",null), 
					new nlobjSearchColumn("custrecord_discount_subsidiary","CUSTRECORD_DISCOUNT_HEADER",null), 
					new nlobjSearchColumn("custrecord_discount_rate","CUSTRECORD_DISCOUNT_HEADER",null)
				]
				);
				
				if(discountMaster != null && discountMaster != '' && discountMaster != undefined)
				{
					//alert('discountMaster.length == ' + discountMaster.length)
					
					for(var i = 0; i < discountMaster.length; i++) 
					{
						var custRecItem = discountMaster[i].getValue("custrecord_discount_item","CUSTRECORD_DISCOUNT_HEADER");
						var custRecSubsi = discountMaster[i].getValue("custrecord_discount_subsidiary","CUSTRECORD_DISCOUNT_HEADER");
						var discPrice = discountMaster[i].getValue("custrecord_discount_rate","CUSTRECORD_DISCOUNT_HEADER");
						var custRecStartDate = discountMaster[i].getValue('custrecord_startdate');
						var custRecEndDate = discountMaster[i].getValue('custrecord_enddate');
						var custRecCustomer = discountMaster[i].getValue('custrecord_customer');
						var bodyDiscount = discountMaster[i].getValue('custrecord_discount');
					}
				}
				
				//alert('UnitPrice == ' + UnitPrice)
				
				var linenumber = nlapiGetCurrentLineItemIndex('item');
			    
				if((discPrice != null && discPrice != '' && discPrice != undefined)||(bodyDiscount != null && bodyDiscount != '' && bodyDiscount != undefined))
				{
					if((discPrice != null && discPrice != '' && discPrice != undefined)&&(UnitPrice != null && UnitPrice != '' && UnitPrice != undefined))
					{
						//alert('UnitPrice == ' + UnitPrice + 'amount == ' +amount)
						var discRt = parseFloat(UnitPrice)*parseFloat(discPrice/100);
						var discAmt = parseFloat(amount)*parseFloat(discPrice/100);	
					}
					else if((bodyDiscount != null && bodyDiscount != '' && bodyDiscount != undefined)&&(UnitPrice != null && UnitPrice != '' && UnitPrice != undefined))
					{
						//alert('UnitPrice in else == ' + UnitPrice + 'amount in else== ' +amount)
						var discRt = parseFloat(UnitPrice)*parseFloat(bodyDiscount/100);
						var discAmt = parseFloat(amount)*parseFloat(bodyDiscount/100);	
					}
					
					if((UnitPrice != null && UnitPrice != '' && UnitPrice != undefined) && (amount != null && amount != '' && amount != undefined))
					{
						//alert('To Set Rate')
						var rateToSet = parseFloat(UnitPrice)-parseFloat(discRt);
						var amtToSet = parseFloat(amount)-parseFloat(discAmt);
					}
						 
					//alert('custRecItem == ' + custRecItem + 'itemInternalid == ' + itemInternalid + 'custRecCustomer == ' + custRecCustomer + 'customer == ' + customer)
					
					if((custRecCustomer == customer))
					{
					    nlapiSetCurrentLineItemValue('item','price','-1');
					    
					    if(rateToSet != null && rateToSet != '' && rateToSet != undefined)
					    {
					    	nlapiSetCurrentLineItemValue('item','rate',rateToSet,false,false); // item_UnitPrice
							//alert('To Set Rate'+rateToSet)
					    }
						
						if((UnitPrice != null && UnitPrice != '' && UnitPrice != undefined)&&(discRt != null && discRt != '' && discRt != undefined)&&(priceLevel != null && priceLevel != '' && priceLevel != undefined))
						{
							nlapiSetCurrentLineItemValue('item','custcol_itemrate',UnitPrice,false,false);
							//alert('To Set UnitPrice'+UnitPrice)
							nlapiSetCurrentLineItemValue('item','custcol_backup_item_rate',parseFloat(UnitPrice)-parseFloat(discRt),false,false);
							nlapiSetCurrentLineItemValue('item','custcol_item_unit_price',UnitPrice,false,false);
							nlapiSetCurrentLineItemValue('item','custcol_discountamount',discRt,false,false);
							nlapiSetCurrentLineItemValue('item','custcol_ori_disc_amt_per_item',discRt,false,false);//custcol_ori_disc_itm_rate
							nlapiSetCurrentLineItemValue('item','custcol_ori_disc_itm_rate',parseFloat(UnitPrice)-parseFloat(discRt),false,false);//custcol_ori_disc_itm_rate
							nlapiSetCurrentLineItemValue('item','custcol_backup_amount',(parseFloat(UnitPrice)-parseFloat(discRt))*parseFloat(lineQty),false,false);
							nlapiSetCurrentLineItemValue('item','custcol_discounted_item_amount',(parseFloat(UnitPrice)-parseFloat(discRt))*parseFloat(lineQty),false,false);
							nlapiSetCurrentLineItemValue('item','custcol_ori_disc_amt',(parseFloat(UnitPrice)-parseFloat(discRt))*parseFloat(lineQty),false,false);
							nlapiSetCurrentLineItemValue('item','custcol_actual_price_level',priceLevel,false,false);
						}
						
						if((bodyDiscount != null && bodyDiscount != '' && bodyDiscount != undefined)&&(UnitPrice != null && UnitPrice != '' && UnitPrice != undefined))
						{
							nlapiSetCurrentLineItemValue('item','custcol_discount',bodyDiscount,false);
							nlapiSetCurrentLineItemValue('item','custcol_original_discount',bodyDiscount,false);
						}
						
						if((discPrice != null && discPrice != '' && discPrice != undefined)&&(UnitPrice != null && UnitPrice != '' && UnitPrice != undefined))
						{
							nlapiSetCurrentLineItemValue('item','custcol_discount',discPrice,false);
							nlapiSetCurrentLineItemValue('item','custcol_original_discount',discPrice,false);
						}
						
						if(lineAmt != null && lineAmt != '' && lineAmt != undefined)
						{
							//nlapiSetCurrentLineItemValue('item','custcol_backup_amount',lineAmt,false,false);
						}
						
						if(linenumber != null)
						{
						  	 nlapiDisableLineItemField('item','price',true,true); 
						  	 
						  	 if(UnitPrice != null && UnitPrice != '' && UnitPrice != undefined)
						  	 {
						  		nlapiDisableLineItemField('item','rate',true,true); 
						  		nlapiDisableLineItemField('item','amount',true,true); 
						  	 }
						  	 else
						  	 {
						  		nlapiDisableLineItemField('item','rate',false,false); 
						  		nlapiDisableLineItemField('item','amount',false,false); 
						  	 }
						   	 
						  	 nlapiDisableLineItemField('item','custbody_sales_quotes_approval_status',true,true);
						  	 nlapiDisableLineItemField('item','custcol_itemrate',false,false);
						  	 nlapiDisableLineItemField('item','custcol_discount',false,false);
						   	 nlapiDisableLineItemField('item','custcol_discountamount',true,true);  
						   	 nlapiDisableLineItemField('item','custcol_backup_amount',true,true); 
						   	 nlapiDisableLineItemField('item','custcol_backup_item_rate',true,true); 
						   	 nlapiDisableLineItemField('item','custcol_item_unit_price',true,true); 
						   	 nlapiDisableLineItemField('item','custcol_original_discount',true,true); 
						   	 nlapiDisableLineItemField('item','custcol_actual_price_level',true,true); 
					    } 
					}
				}
				else
				{
					 nlapiDisableLineItemField('item','custbody_sales_quotes_approval_status',false,false);
					 nlapiDisableLineItemField('item','custcol_itemrate',true,true);
					 nlapiDisableLineItemField('item','custcol_discountamount',true,true); 
				   	 nlapiDisableLineItemField('item','custcol_discount',true,true); 
				   	 nlapiDisableLineItemField('item','custcol_backup_amount',true,true); 
				   	 nlapiDisableLineItemField('item','custcol_backup_item_rate',true,true); 
				   	 nlapiDisableLineItemField('item','custcol_item_unit_price',true,true); 
				   	 nlapiDisableLineItemField('item','custcol_original_discount',true,true); 
				   	 nlapiDisableLineItemField('item','custcol_actual_price_level',true,true); 
				}
			}
		}
    }
	
	
}

function setdiscountfieldChange(type,name)
{
	/*if(name == 'entity')
	{
		var entity = nlapiGetFieldValue('entity')
		var Subsidiary = nlapiGetFieldValue('subsidiary');
		var TranTotal = nlapiGetFieldValue('total');
		
		if(entity != null && entity != '' && entity != undefined)
		{
			var invoiceSearch = nlapiSearchRecord("invoice","customsearch_open_invoices_terms_exceed",
					[
					   ["type","anyof","CustInvc"], 
					   "AND", 
					   ["status","anyof","CustInvc:A"], 
					   "AND", 
					   ["mainline","is","T"], 
					   "AND", 
					   ["customer.internalid","anyof",entity]
					], 
					[
					   new nlobjSearchColumn("entity",null,"GROUP"), 
					   new nlobjSearchColumn("fxbalance","customer","SUM"), 
					   new nlobjSearchColumn("creditlimit","customer","MIN"), 
					   new nlobjSearchColumn("amount",null,"SUM"), 
					   new nlobjSearchColumn("subsidiary","customer","GROUP")
					]
					);
			
			if(invoiceSearch != null && invoiceSearch != '' && invoiceSearch != undefined)
			{
				for(var q=0;q<invoiceSearch.length;q++)
				{
					var entityName = invoiceSearch[q].getValue("entity",null,"GROUP");
					var foreignBal = invoiceSearch[q].getValue("fxbalance","customer","SUM");
					var CreditLimit = invoiceSearch[q].getValue("creditlimit","customer","MIN");
					var INVAmt = invoiceSearch[q].getValue("amount",null,"SUM");
					var subsi = invoiceSearch[q].getValue("subsidiary","customer","GROUP");
				}
			}
			
			if((foreignBal != null && foreignBal != '' && foreignBal != undefined) && (CreditLimit != null && CreditLimit != '' && CreditLimit != undefined))
			{
				nlapiSetFieldValue('custbody_invoices_amt',foreignBal);
				nlapiSetFieldValue('custbody_customer_credit_limit',CreditLimit);	
			}
			
			nlapiDisableField('custbody_invoices_amt',true);
			nlapiDisableField('custbody_customer_credit_limit',true);
			
			var INVForeignAmt = nlapiGetFieldValue('custbody_invoices_amt');
			var CustLimit = nlapiGetFieldValue('custbody_customer_credit_limit');
			
			if(parseFloat(INVForeignAmt) > parseFloat(CustLimit) && (INVForeignAmt != null && INVForeignAmt != '' && INVForeignAmt != undefined) && (CustLimit != null && CustLimit != '' && CustLimit != undefined))
			{
				nlapiSetFieldValue('custbody_sales_quotes_approval_status','9');
				alert('The Estimate is go for an MD Approval because there are some invoices whose amount is grater than the Credit Limit');
			}
			
			var termsSerach = nlapiSearchRecord("invoice","customsearch_open_so_creditterms_exceeds",
					[
					   ["type","anyof","CustInvc"], 
					   "AND", 
					   ["duedate","before","today"], 
					   "AND", 
					   ["status","anyof","CustInvc:A"], 
					   "AND", 
					   ["customer.internalid","anyof",entity]
					], 
					[
					   new nlobjSearchColumn("entity",null,"GROUP"), 
					   new nlobjSearchColumn("fxbalance","customer","SUM"), 
					   new nlobjSearchColumn("creditlimit","customer","MAX"), 
					   new nlobjSearchColumn("amount",null,"SUM"), 
					   new nlobjSearchColumn("terms","customer","GROUP")
					]
					);
			
			if(termsSerach != null && termsSerach != '' && termsSerach != undefined)
			{
				nlapiSetFieldValue('custbody_sales_quotes_approval_status','9');
				nlapiDisableField('custbody_sales_quotes_approval_status',true);
			}
		}
	}*/
	
	if(type == 'item' && name == 'quantity') 
    {
		 var TraQty= nlapiGetCurrentLineItemValue('item','quantity');
		  var trans_rate = nlapiGetCurrentLineItemValue('item','rate');//custcol_ori_disc_itm_rate
		  var oriRate = nlapiGetCurrentLineItemValue('item','custcol_ori_disc_itm_rate');//custcol_ori_disc_itm_rate
		  var qtyChngeSet = parseFloat(TraQty)*parseFloat(trans_rate);
		  var oriChngeSet = parseFloat(TraQty)*parseFloat(oriRate);
		  nlapiSetCurrentLineItemValue('item','custcol_discounted_item_amount',qtyChngeSet,false,false);//custcol_backup_item_rate
		  nlapiSetCurrentLineItemValue('item','custcol_ori_disc_amt',oriChngeSet,false,false);//custcol_backup_item_rate
		  nlapiSetCurrentLineItemValue('item','custcol_backup_amount',oriChngeSet,false,false);//custcol_backup_item_rate
					
    }
	
	if(type == 'item' && name == 'custcol_itemrate') 
    {
		var discPrice = nlapiGetCurrentLineItemValue('item','custcol_discount');
		if(discPrice != null && discPrice != '' && discPrice != undefined)
		{
			var trans_subsidiary = nlapiGetFieldValue('subsidiary');
			var trans_Date = nlapiGetFieldValue('trandate');
			var trans_Customer = nlapiGetFieldValue('entity');
			var trans_Currency = nlapiGetFieldValue('currency');
				
		    var trans_item = nlapiGetCurrentLineItemValue('item','item');
		    var trans_rate = nlapiGetCurrentLineItemValue('item','rate');
		    var trans_amount = nlapiGetCurrentLineItemValue('item','amount');
			var trans_priceLevel = nlapiGetCurrentLineItemValue('item','price');
			var trans_quant = nlapiGetCurrentLineItemValue('item','quantity');
			var item_UnitPrice = nlapiGetCurrentLineItemValue('item','custcol_itemrate');
			var ActualItemRate = nlapiGetCurrentLineItemValue('item','custcol_backup_item_rate');
			var DiscAmtGet = nlapiGetCurrentLineItemValue('item','custcol_discountamount');//custcol_discountamount
			var linenumber = nlapiGetCurrentLineItemIndex('item');
			
			 var discountPercent  = nlapiGetCurrentLineItemValue('item','custcol_discount');
		       //alert('discountPercent'+discountPercent);
		          
		       var ActualDiscount  = nlapiGetCurrentLineItemValue('item','custcol_original_discount');
		       
				
			var Discount = parseFloat(discPrice)/100;
			var discRt = parseFloat(item_UnitPrice)*parseFloat(Discount);
			var discAmt = parseFloat(trans_amount)*parseFloat(Discount);
					 		    
			var rateToSet = parseFloat(item_UnitPrice)-parseFloat(discRt);
			var amtToSet = parseFloat(trans_amount)-parseFloat(discAmt);
			
			var rateItemDisc = parseFloat(item_UnitPrice)- parseFloat(discRt);
			
			var amountItemDisc = parseFloat(trans_quant)*parseFloat(rateItemDisc);
			
			nlapiSetCurrentLineItemValue('item','rate',rateToSet,false,false); // item_UnitPrice
			nlapiSetCurrentLineItemValue('item','custcol_discount',discPrice,false,false);
			nlapiSetCurrentLineItemValue('item','custcol_discountamount',discRt,false,false);//custcol_backup_item_rate
			nlapiSetCurrentLineItemValue('item','custcol_backup_item_rate',rateItemDisc,false,false);//custcol_backup_item_rate
			nlapiSetCurrentLineItemValue('item','custcol_discounted_item_amount',amountItemDisc,false,false);//custcol_backup_item_rate
			
			var backupRate = nlapiGetCurrentLineItemValue('item','custcol_backup_item_rate');
			
			if((item_UnitPrice != ActualItemRate) || (ActualDiscount != discountPercent))
			{
				nlapiSetCurrentLineItemValue('item','custcol_approve_checkbox','T');
				nlapiDisableLineItemField('item','custcol_approve_checkbox',true);
				
				nlapiSetFieldValue('custbody_sales_quotes_approval_status','9');
				nlapiDisableField('custbody_sales_quotes_approval_status',true);
			}
			else
			{
				nlapiSetFieldValue('custbody_sales_quotes_approval_status','');
				nlapiSetCurrentLineItemValue('item','custcol_approve_checkbox','F');
			}
		}
	}
	
	if(type == 'item' && name == 'custcol_discount')
	{
		var discPrice = nlapiGetCurrentLineItemValue('item','custcol_discount');
		if(discPrice != null && discPrice != '' && discPrice != undefined)
		{
	       var amount  = nlapiGetCurrentLineItemValue('item','amount');	
	       //alert('amount'+amount);
	          
	       var discountPercent  = nlapiGetCurrentLineItemValue('item','custcol_discount');
	       //alert('discountPercent'+discountPercent);
	          
	       var ActualDiscount  = nlapiGetCurrentLineItemValue('item','custcol_original_discount');
	       
	       var originalItemRate  = nlapiGetCurrentLineItemValue('item','custcol_item_unit_price');
	       //alert('discountPercent'+discountPercent);
	          
	       var ActualItemRate = nlapiGetCurrentLineItemValue('item','custcol_itemrate');
	      
	       //alert('discountPercent'+discountPercent)
	 /*      
	  
	       if(discountPercent != null && discountPercent != '' && discountPercent != 'undefined')
	       {
	          calculateDiscount(amount,discountPercent);
	       }
	       else
	       {
	         discAmt = '';
	         nlapiSetCurrentLineItemValue('item','custcol_discountamount',discAmt);
	       }
	       */
	       
	       var discPrice = nlapiGetCurrentLineItemValue('item','custcol_discount');
			if(discPrice != null && discPrice != '' && discPrice != undefined)
			{  
				var item_UnitPrice = nlapiGetCurrentLineItemValue('item','custcol_itemrate');
				 var trans_amount = nlapiGetCurrentLineItemValue('item','amount');
				 var trans_quant = nlapiGetCurrentLineItemValue('item','quantity');
				 
				   	var Discount = parseFloat(discPrice)/100;
					var discRt = parseFloat(item_UnitPrice)*parseFloat(Discount);
					var discAmt = parseFloat(trans_amount)*parseFloat(Discount);
							 		    
					var rateToSet = parseFloat(item_UnitPrice)-parseFloat(discRt);
					var amtToSet = parseFloat(trans_amount)-parseFloat(discAmt);
					
					var rateItemDisc = parseFloat(item_UnitPrice)- parseFloat(discRt);
					
					var amountItemDisc = parseFloat(trans_quant)*parseFloat(rateItemDisc);
					
					nlapiSetCurrentLineItemValue('item','rate',rateToSet,false,false); // item_UnitPrice
					nlapiSetCurrentLineItemValue('item','custcol_discount',discPrice,false,false);
					nlapiSetCurrentLineItemValue('item','custcol_discountamount',discRt,false,false);//custcol_backup_item_rate
					nlapiSetCurrentLineItemValue('item','custcol_backup_item_rate',rateItemDisc,false,false);//custcol_backup_item_rate
					nlapiSetCurrentLineItemValue('item','custcol_discounted_item_amount',amountItemDisc,false,false);//custcol_backup_item_rate
				
		       
			}
			
	       
	       
	       if((discountPercent != ActualDiscount) && (ActualDiscount != null && ActualDiscount != '' && ActualDiscount != 'undefined') || (originalItemRate != ActualItemRate) && (ActualItemRate != null && ActualItemRate != '' && ActualItemRate != 'undefined'))
	       {
	    	   nlapiSetCurrentLineItemValue('item','custcol_approve_checkbox','T');
	    	   nlapiDisableLineItemField('item','custcol_approve_checkbox',true);
	    	   
			   nlapiSetFieldValue('custbody_sales_quotes_approval_status','9');
			   nlapiDisableField('custbody_sales_quotes_approval_status',true);
	       }
	       else
	       {
	    	   nlapiSetCurrentLineItemValue('item','custcol_approve_checkbox','F');
	    	   
			   nlapiSetFieldValue('custbody_sales_quotes_approval_status','');
			   nlapiDisableField('custbody_sales_quotes_approval_status',false);
	       }
	    }
	}
	
	if(type == 'item' && name == 'item')
	{
		var recType = nlapiGetRecordType();
		var createdFrom = nlapiGetFieldValue('createdfrom');
		
		if((recType == 'estimate') || ((recType == 'cashsale' || recType == 'invoice' || recType == 'salesorder') && (createdFrom != null ||createdFrom !='undefined' || createdFrom != ' ')))
		{
			var entity = nlapiGetFieldValue('entity')
			var Subsidiary = nlapiGetFieldValue('subsidiary');
			var TranTotal = nlapiGetFieldValue('total');
			
			var item = nlapiGetCurrentLineItemValue('item','item');
			
			if((entity != null && entity != '' && entity != undefined)&&(item != null && item != '' && item != undefined))
			{
				var invoiceSearch = nlapiSearchRecord("invoice","customsearch_open_invoices_terms_exceed",
						[
						   ["type","anyof","CustInvc"], 
						   "AND", 
						   ["status","anyof","CustInvc:A"], 
						   "AND", 
						   ["mainline","is","T"], 
						   "AND", 
						   ["customer.internalid","anyof",entity]
						], 
						[
						   new nlobjSearchColumn("entity",null,"GROUP"), 
						   new nlobjSearchColumn("fxbalance","customer","SUM"), 
						   new nlobjSearchColumn("creditlimit","customer","MIN"), 
						   new nlobjSearchColumn("amount",null,"SUM"), 
						   new nlobjSearchColumn("subsidiary","customer","GROUP")
						]
						);
				
				if(invoiceSearch != null && invoiceSearch != '' && invoiceSearch != undefined)
				{
					for(var q=0;q<invoiceSearch.length;q++)
					{
						var entityName = invoiceSearch[q].getValue("entity",null,"GROUP");
						var foreignBal = invoiceSearch[q].getValue("fxbalance","customer","SUM");
						var CreditLimit = invoiceSearch[q].getValue("creditlimit","customer","MIN");
						var INVAmt = invoiceSearch[q].getValue("amount",null,"SUM");
						var subsi = invoiceSearch[q].getValue("subsidiary","customer","GROUP");
					}
				}
				
				if((foreignBal != null && foreignBal != '' && foreignBal != undefined) && (CreditLimit != null && CreditLimit != '' && CreditLimit != undefined))
				{
					nlapiSetFieldValue('custbody_invoices_amt',foreignBal);
					nlapiSetFieldValue('custbody_customer_credit_limit',CreditLimit);	
				}
				
				nlapiDisableField('custbody_invoices_amt',true);
				nlapiDisableField('custbody_customer_credit_limit',true);
				
				var INVForeignAmt = nlapiGetFieldValue('custbody_invoices_amt');
				var CustLimit = nlapiGetFieldValue('custbody_customer_credit_limit');
				
				if(parseFloat(INVForeignAmt) > parseFloat(CustLimit) && (INVForeignAmt != null && INVForeignAmt != '' && INVForeignAmt != undefined) && (CustLimit != null && CustLimit != '' && CustLimit != undefined))
				{
					nlapiSetFieldValue('custbody_sales_quotes_approval_status','9');
					nlapiDisableField('item','custbody_sales_quotes_approval_status',true,true);
					
					nlapiSetFieldValue('custbody_so_appr_status','11');
					alert('The Transaction is go for an MD Approval because there are some invoices whose amount is grater than the Credit Limit');
				}
				else
				{
					nlapiSetFieldValue('custbody_sales_quotes_approval_status','');
					nlapiDisableField('item','custbody_sales_quotes_approval_status',false,false);
					
					nlapiSetFieldValue('custbody_so_appr_status','');
				}
				
				var termsSerach = nlapiSearchRecord("invoice","customsearch_open_so_creditterms_exceeds",
						[
						   ["type","anyof","CustInvc"], 
						   "AND", 
						   ["duedate","before","today"], 
						   "AND", 
						   ["status","anyof","CustInvc:A"], 
						   "AND", 
						   ["customer.internalid","anyof",entity]
						], 
						[
						   new nlobjSearchColumn("entity",null,"GROUP"), 
						   new nlobjSearchColumn("fxbalance","customer","SUM"), 
						   new nlobjSearchColumn("creditlimit","customer","MAX"), 
						   new nlobjSearchColumn("amount",null,"SUM"), 
						   new nlobjSearchColumn("terms","customer","GROUP")
						]
						);
				
				if(termsSerach != null && termsSerach != '' && termsSerach != undefined)
				{
					nlapiSetFieldValue('custbody_sales_quotes_approval_status','9');
					nlapiSetFieldValue('custbody_so_appr_status','11');
					nlapiDisableField('custbody_so_appr_status',true);
					nlapiDisableField('custbody_sales_quotes_approval_status',true);
				}
			}
		}
	}
}


var flag1 = true;
function onSave_SetDiscount()
{
	var discPrice = nlapiGetCurrentLineItemValue('item','custcol_discount');
	if(discPrice != null && discPrice != '' && discPrice != undefined)
	{
		var trans_subsidiary = nlapiGetFieldValue('subsidiary');
		var trans_Date = nlapiGetFieldValue('trandate');
		var trans_Customer = nlapiGetFieldValue('entity');
		var trans_Currency = nlapiGetFieldValue('currency');
		
		var finalTotal = nlapiGetFieldValue('total');
		var CustBalance = nlapiGetFieldValue('balance');
		
		var CustINVBalance = nlapiGetFieldValue('custbody_invoices_amt');
		var CustLimit = nlapiGetFieldValue('custbody_customer_credit_limit');
			
		//alert('CustINVBalance == ' + CustINVBalance + 'finalTotal == ' + finalTotal);
		
		var exceedLimit = parseFloat(CustINVBalance) + parseFloat(finalTotal);
		//alert('exceedLimit == ' + exceedLimit);
		
		if(parseFloat(exceedLimit) > parseFloat(CustLimit))
		{
			alert('The Transaction total amount plus open invoices amount is exceeds to Credit Limit so it goes for an MD approval');
			nlapiSetFieldValue('custbody_sales_quotes_approval_status','9');
			nlapiDisableField('custbody_sales_quotes_approval_status',true);
		}
	}
	return flag1;
}

function pageInitDisabled(type)
{
	if(type == 'edit')
	{
		var recType = nlapiGetRecordType();
		var createdFrom = nlapiGetFieldValue('createdfrom');
		
		//if((recType == 'estimate') || ((recType == 'cashsale' || recType == 'invoice' || recType == 'salesorder') && (createdFrom != null ||createdFrom !='undefined' || createdFrom != ' ')))
		{
			var AppStatus = nlapiGetFieldValue('custbody_sales_quotes_approval_status');
			var Status = nlapiGetFieldValue('custbody_so_appr_status');
			
			var INVAmt = nlapiGetFieldValue('custbody_invoices_amt');
			var Limit = nlapiGetFieldValue('custbody_customer_credit_limit');
			
			//nlapiSetFieldValue('custbody_so_appr_status','11');
			
		    if(AppStatus == '9' || Status == '11')
		    {
		    	nlapiDisableField('custbody_sales_quotes_approval_status',true);
		    	nlapiDisableField('custbody_so_appr_status',true);
		    	
		    	nlapiDisableField('custbody_invoices_amt',true);
		    	nlapiDisableField('custbody_customer_credit_limit',true);
		    }
		  
		    else if((AppStatus == null || AppStatus == '' || AppStatus == undefined)&&(INVAmt != null && INVAmt != '' && INVAmt != undefined)&&(Limit != null && Limit != '' && Limit != undefined))
		    {
		    	nlapiDisableField('custbody_invoices_amt',true);
		    	nlapiDisableField('custbody_customer_credit_limit',true);
		    }
		    		    
			var count = nlapiGetLineItemCount('item');
			//alert('count'+count)
				
			for(var m=1;m<=count;m++)
			{
				var discPrice = nlapiGetLineItemValue('item','custcol_discount',m);
				//alert('discPrice'+discPrice)
					
				if(discPrice != null && discPrice != '' && discPrice != undefined)
				{
					nlapiDisableLineItemField('item','price',true); 
					nlapiDisableLineItemField('item','rate',true); 
			  		nlapiDisableLineItemField('item','amount',true);
			  		nlapiDisableLineItemField('item','custcol_discountamount',true); 
			  		//nlapiDisableLineItemField('item','custcol_discount',true); 
			  		//nlapiDisableLineItemField('item','custcol_itemrate',true); 
				}	
			}
		}
	}
}
	
function calculateDiscount(amount,discountPercent)
{
	if((discountPercent !=null && discountPercent !='')&&(amount !=null && amount !='' && !isNaN(amount)))
	{
		var decimals = 2;
		discountPercent = parseFloat(discountPercent);
		
		var discAmt = parseFloat(amount) * parseFloat(discountPercent) / 100;
		discAmt = roundNumber(discAmt,decimals);
		discAmt = parseFloat(discAmt);
		//alert('discAmt in calculateDiscount'+discAmt)
		nlapiSetCurrentLineItemValue('item','custcol_discountamount',discAmt);
	}
}


function roundNumber(number, decimals)
{
    var newnumber = new Number(number + '').toFixed(parseInt(decimals));
    parseFloat(newnumber);
    //////////alert('Number is'+Number);
    if (newnumber != null && newnumber != '' && !isNaN(newnumber)) 
	{
    	//alert('newnumber'+newnumber);
       //nlapiSetFieldValue('discountrate', newnumber);
       //salesRec.setFieldValue('discountrate', newnumber)
	}
    return newnumber;
}
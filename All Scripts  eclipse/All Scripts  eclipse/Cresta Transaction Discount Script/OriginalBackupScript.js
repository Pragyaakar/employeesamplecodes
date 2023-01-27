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
			
			if(lineItem != null && lineItem != '' && lineItem != undefined)
			{
				//alert('customer == ' + customer + 'currency == ' + Transcurrency + 'date == ' + date + 'lineItem == ' + lineItem);
				var lineAmt = nlapiGetCurrentLineItemValue('item','amount');
				alert('lineAmt == ' + lineAmt);
				
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
					alert('itemSearch.length == ' + itemSearch.length)
					for(var l = 0; l < itemSearch.length; l++) 
					{
						var itemInternalid = itemSearch[l].getValue('internalid');
						var itemName = itemSearch[l].getValue('itemid');
						var PriceCurrency = itemSearch[l].getValue("currency","pricing");
						var UnitPrice = itemSearch[l].getValue("unitprice","pricing");
						var priceLevel = itemSearch[l].getValue("pricelevel","pricing");
					}
				}
				
				alert('priceLevel == ' + priceLevel)
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
				
				alert('Discount Amnt ='+discRt)
				
				if((custRecCustomer == customer))
				{
				    nlapiSetCurrentLineItemValue('item','price','-1',false,false);
				    
				    if(rateToSet != null && rateToSet != '' && rateToSet != undefined)
				    {
				    	nlapiSetCurrentLineItemValue('item','rate',rateToSet,false,false); // item_UnitPrice
						//alert('To Set Rate'+rateToSet)
				    }
					
					if((UnitPrice != null && UnitPrice != '' && UnitPrice != undefined)&&(discRt != null && discRt != '' && discRt != undefined)&&(priceLevel != null && priceLevel != '' && priceLevel != undefined))
					{
						nlapiSetCurrentLineItemValue('item','custcol_itemrate',UnitPrice,false,false);
						//alert('To Set UnitPrice'+UnitPrice)
						nlapiSetCurrentLineItemValue('item','custcol_backup_item_rate',UnitPrice,false,false);
						nlapiSetCurrentLineItemValue('item','custcol_item_unit_price',UnitPrice,false,false);
						nlapiSetCurrentLineItemValue('item','custcol_discountamount',discRt,false,false);
						nlapiSetCurrentLineItemValue('item','custcol_actual_price_level',priceLevel,false,false);
					}
					
					if((bodyDiscount != null && bodyDiscount != '' && bodyDiscount != undefined)&&(UnitPrice != null && UnitPrice != '' && UnitPrice != undefined))
					{
						nlapiSetCurrentLineItemValue('item','custcol_discount',bodyDiscount,false,false);
						nlapiSetCurrentLineItemValue('item','custcol_original_discount',bodyDiscount,false,false);
					}
					
					if((discPrice != null && discPrice != '' && discPrice != undefined)&&(UnitPrice != null && UnitPrice != '' && UnitPrice != undefined))
					{
						nlapiSetCurrentLineItemValue('item','custcol_discount',discPrice,false,false);
						nlapiSetCurrentLineItemValue('item','custcol_original_discount',discPrice,false,false);
					}
					
					if(lineAmt != null && lineAmt != '' && lineAmt != undefined)
					{
						nlapiSetCurrentLineItemValue('item','custcol_backup_amount',lineAmt,false,false);
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
					   	 
					   	 nlapiDisableLineItemField('item','custcol_discountamount',true,true); 
					   	 nlapiDisableLineItemField('item','custcol_discount',false,false); 
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
}

function setdiscountfieldChange(type,name)
{
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
			
			var linenumber = nlapiGetCurrentLineItemIndex('item');
				
			var Discount = parseFloat(discPrice)/100;
			var discRt = parseFloat(item_UnitPrice)*parseFloat(Discount);
			var discAmt = parseFloat(trans_amount)*parseFloat(Discount);
			
			var ChngeDiscount = (parseFloat(discRt)/parseFloat(item_UnitPrice))*100;
			
			var rateToSet = parseFloat(item_UnitPrice)-parseFloat(discRt);
			var amtToSet = parseFloat(trans_amount)-parseFloat(discAmt);
			
			nlapiSetCurrentLineItemValue('item','rate',rateToSet,false,false); // item_UnitPrice
			nlapiSetCurrentLineItemValue('item','custcol_discount',ChngeDiscount,false,false);
			nlapiSetCurrentLineItemValue('item','custcol_discountamount',discRt,false,false);
			
			var backupRate = nlapiGetCurrentLineItemValue('item','custcol_backup_item_rate');
			
			if(item_UnitPrice != ActualItemRate)
			{
				nlapiSetCurrentLineItemValue('item','custcol_approve_checkbox','T');
			}
			else
			{
				nlapiSetCurrentLineItemValue('item','custcol_approve_checkbox','F');
			}
		}
	}
	
	if(type == 'item' && name == 'custcol_discount')
	{
		var discPrice = nlapiGetCurrentLineItemValue('item','custcol_discount');
		if(discPrice != null && discPrice != '' && discPrice != undefined)
		{
	       var amount  = nlapiGetCurrentLineItemValue('item','custcol_itemrate');	
	       alert('amount'+amount);
	          
	       var discountPercent  = nlapiGetCurrentLineItemValue('item','custcol_discount');
	       alert('discountPercent'+discountPercent);
	          
	       if(discountPercent != null && discountPercent != '' && discountPercent != 'undefined')
	       {
	          calculateDiscount(amount,discountPercent);
	       }
	       else
	       {
	         discAmt = '';
	         nlapiSetCurrentLineItemValue('item','custcol_discountamount',discAmt);
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
		alert('discAmt in calculateDiscount'+discAmt)
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
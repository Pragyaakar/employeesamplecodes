function fieldChangeDiscount(type,name)
{
	//alert('type ' + type + 'name ' + name);
	if(type == 'recmachcustrecord_discount_header' && name == 'custrecord_discount_rate')
	{
		var custom = nlapiGetFieldValue('custrecord_customer');
		var bodyDiscount = nlapiGetFieldValue('custrecord_discount');
		
		var item = nlapiGetCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_item');
		var discountRate = nlapiGetCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate');
		
		nlapiSetFieldValue('custrecord_discount','',false,true);
		nlapiDisableField('custrecord_discount',true);
		/*if(bodyDiscount != null && bodyDiscount != '' && bodyDiscount != undefined)
		{
			alert('You are not able to set discount on line level');
			nlapiSetCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate','',false,true);
		}*/
	}
	
	if(name == 'custrecord_discount')
	{
		var custom = nlapiGetFieldValue('custrecord_customer');
		var bodyDiscount = nlapiGetFieldValue('custrecord_discount');
		
		var item = nlapiGetCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_item');
		var discountRate = nlapiGetCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate');
		
		/*if(discountRate != null && discountRate != '' && discountRate != undefined)
		{
			alert('You are not able to set discount on line level');
			nlapiSetFieldValue('custrecord_discount','',false,true);
		}
		*/
		var lineCount = nlapiGetLineItemCount('recmachcustrecord_discount_header');
		
		// alert("lineCount ="+lineCount);
		
		if(lineCount > 0)
		{
			for (var m=1;m<=lineCount;m++)
			{
				// alert("bodyDiscount Set ="+bodyDiscount);
				nlapiSelectLineItem('recmachcustrecord_discount_header',m);
				nlapiSetCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate',bodyDiscount, false, false);
				nlapiCommitLineItem('recmachcustrecord_discount_header');
				
				// nlapiSetLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate',m,bodyDiscount);
			}
		}
		
	}
}


function onSaveDiscount()
{
	var flag = true;
	var itemArr = new Array();
	var discRtArr = new Array();
	
	var custom = nlapiGetFieldValue('custrecord_customer');
	var bodyDis = nlapiGetFieldValue('custrecord_discount');
	
	var linecount = nlapiGetLineItemCount('recmachcustrecord_discount_header')
	//alert('linecount == ' + linecount)
	
	var count =0.00;
	var count1 =0.00;
	
	for(var i=1;i<=linecount;i++)
	{
		var item = nlapiGetLineItemValue('recmachcustrecord_discount_header','custrecord_discount_item',i);
		itemArr.push(item);
		
		var discRt = nlapiGetLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate',i);
		discRtArr.push(discRt);
		
		if(discRt == null || discRt == '' || discRt == undefined)
		{
			count++;
		}
		
		if(discRt != null && discRt != '' && discRt != undefined)
		{
			count1++;
		}
	}
	
	
	if((bodyDis !=null && bodyDis != undefined)&&(count ==0.00))
	{
			      var lineCount = nlapiGetLineItemCount('recmachcustrecord_discount_header');
					
					// alert("lineCount ="+lineCount);
					
					if(lineCount > 0)
					{
						for (var m=1;m<=lineCount;m++)
						{
							// alert("bodyDiscount Set ="+bodyDiscount);
							nlapiSelectLineItem('recmachcustrecord_discount_header',m);
							nlapiSetCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate',bodyDis, false, false);
							nlapiCommitLineItem('recmachcustrecord_discount_header');
							
							// nlapiSetLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate',m,bodyDiscount);
						}
					}
		}
	
	// alert('linecount == ' + linecount)
	// alert('bodyDis == ' + bodyDis)
	// alert('count == ' + count)
	
	var itemSearch = nlapiSearchRecord("item","customsearch_itemsearch_to_set_discount",
			[
			   ["type","noneof","Discount"], 
			   "AND", 
			   ["custitem_category","anyof","1","2"]
			], 
			[
			   new nlobjSearchColumn("internalid"), 
			   new nlobjSearchColumn("itemid"), 
			   new nlobjSearchColumn("baseprice"), 
			   new nlobjSearchColumn("currency","pricing",null), 
			   new nlobjSearchColumn("unitprice","pricing",null)
			]
			);
	
	if(itemSearch != null && itemSearch != '' && itemSearch != undefined)
	{
		var itemLength = itemSearch.length;
		//alert('itemLength == ' + itemLength);
		for(var p=0;p<itemLength;p++)
		{
			var itemID = itemSearch[p].getValue('internalid');
			var itemName = itemSearch[p].getValue('itemid');
		}
	}
	
	if(linecount != itemLength)
	{
	  var flag1 = getConfirmation();
	}
	
	

	if((count > 0) && (bodyDis == null || bodyDis == '' || bodyDis == undefined))
	{
		
		alert('Please Apply discount for the All Item');
		flag = false;
	}
	else if((count1 != linecount) && (bodyDis != null && bodyDis != ''&& bodyDis != undefined))
	{

		alert('Please Apply discount for the All Item');
		flag = false;
	}
	
	
	
	return flag;
}

function getConfirmation() 
{
    var retVal = confirm("Do You Want to add additional items then click on cancel ");
    if( retVal == true ) 
    {
       //alert ("User wants to continue!");
       return true;
    } else {
       //alert("User does not want to continue!");
       return false;
    }
 }
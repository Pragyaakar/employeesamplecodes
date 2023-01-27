 /**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       23 Oct 2019     Tushar
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */

var flag;
function JVnAdjustMentValidateLine(type)
{
//===============================================
	var recordType = nlapiGetRecordType();
	
	// alert('recordType ='+recordType)
	
	if(recordType == 'journalentry')
	{
        var order = nlapiGetCurrentLineItemValue('line','custcol_cls_bill_order');
		
		
		
		var cust_fields = ['entity','tranid'];
		
		// alert('Order is:='+order)
		if(order != null && order !='' && order !=undefined)
	    {
			var poObj = nlapiLookupField('salesorder',order,cust_fields);
			 
			var entityName = poObj.entity;
	        
			var transNum = poObj.tranid;
			
			 nlapiSetCurrentLineItemValue('line','custcol_entity_name',entityName);
			 nlapiSetCurrentLineItemValue('line','custcol_order_number',transNum);
			 
			   var customer = nlapiGetCurrentLineItemValue('line','custcol_entity_name');
				
				var orderNum = nlapiGetCurrentLineItemValue('line','custcol_order_number');
				
				// alert('customer is:='+customer)
			   // alert('orderNum is:='+ orderNum)
				
			 
				if((customer != null && customer !='' && customer !=undefined)&&(orderNum != null && orderNum !='' && orderNum !=undefined))
				{
					flag =true;
				}
				else
				{
					flag =false;
				}
	    }
		else
		{
			flag =true;
		}
		
		//  alert('Flag is:='+ flag)
		
	  return flag;
	} 
  //============================================= 
	else if(recordType == 'inventoryadjustment')
	{
        var order = nlapiGetCurrentLineItemValue('inventory','custcol_cls_bill_order');
		
		
		
		var cust_fields = ['entity','tranid'];
		
		// alert('Order is:='+order)
		if(order != null && order !='' && order !=undefined)
	    {
			var poObj = nlapiLookupField('salesorder',order,cust_fields);
			 
			var entityName = poObj.entity;
	        
			var transNum = poObj.tranid;
			
			 nlapiSetCurrentLineItemValue('inventory','custcol_entity_name',entityName);
			 nlapiSetCurrentLineItemValue('inventory','custcol_order_number',transNum);
			 
			   var customer = nlapiGetCurrentLineItemValue('inventory','custcol_entity_name');
				
				var orderNum = nlapiGetCurrentLineItemValue('inventory','custcol_order_number');
				
				// alert('customer is:='+customer)
			  // alert('orderNum is:='+ orderNum)
				
			 
				if((customer != null && customer !='' && customer !=undefined)&&(orderNum != null && orderNum !='' && orderNum !=undefined))
				{
					flag =true;
				}
				else
				{
					flag =false;
				}
	    }
		else
		{
			flag =true;
		}
		
		 //  alert('Flag is:='+ flag)
		
	  return flag;
	} 
}
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
function CMnInvoiceValidateLine(type)
{
//===============================================
	var recordType = nlapiGetRecordType();

	if(recordType == 'vendorbill'|| recordType =='vendorcredit')//recordType == 'invoice' || 
	{
		
		
        var order = nlapiGetCurrentLineItemValue('item','custcol_cls_bill_order');
        var order1 = nlapiGetCurrentLineItemValue('expense','custcol_cls_bill_order');
		
        var CreatedFrom = nlapiGetFieldValue('createdfrom');
        
        var myRole =nlapiGetUser();
        
       // alert('type is:='+type)
        
        var cust_fields = ['entity','tranid'];
		
		// alert('Order is:='+order)
		if((type =='item')&&(order != null && order !='' && order !=undefined) && (CreatedFrom ==null || CreatedFrom =='' || CreatedFrom ==undefined))
	    {
			var poObj = nlapiLookupField('salesorder',order,cust_fields);
			 
			var entityName = poObj.entity;
	        
			var transNum = poObj.tranid;
			
			 nlapiSetCurrentLineItemValue('item','custcol_entity_name',entityName);
			 nlapiSetCurrentLineItemValue('item','custcol_order_number',transNum);
			 
			   var customer = nlapiGetCurrentLineItemValue('item','custcol_entity_name');
				
				var orderNum = nlapiGetCurrentLineItemValue('item','custcol_order_number');
				
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
		else if((type =='expense')&&(order1 != null && order1 !='' && order1 !=undefined) && (CreatedFrom ==null || CreatedFrom =='' || CreatedFrom ==undefined))
	    {
			var poObj = nlapiLookupField('salesorder',order1,cust_fields);
			 
			var entityName = poObj.entity;
	        
			var transNum = poObj.tranid;
			
			 nlapiSetCurrentLineItemValue('expense','custcol_entity_name',entityName);
			 nlapiSetCurrentLineItemValue('expense','custcol_order_number',transNum);
			 
			   var customer = nlapiGetCurrentLineItemValue('expense','custcol_entity_name');
				
				var orderNum = nlapiGetCurrentLineItemValue('expense','custcol_order_number');
				
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
	   else if((type =='item') && (order == null || order =='' || order ==undefined))
		{
			
					  if(myRole =='12729')
						{
						  //  alert('order is:='+order)
				          //  alert('type is:='+type)
				        }
					 var blank ='';
					 nlapiSetCurrentLineItemValue('item','custcol_entity_name',blank);
					 nlapiSetCurrentLineItemValue('item','custcol_order_number',blank);
					// nlapiSetCurrentLineItemValue('expense','custcol_entity_name',blank);
					// nlapiSetCurrentLineItemValue('expense','custcol_order_number',blank);
						flag =true;
		}	
	   else if((type =='expense') && (order1 == null || order1 =='' || order1 ==undefined))
		{
			
					  if(myRole =='12729')
						{
						  //alert('order1 is:='+order1)
				           // alert('type is:='+type)
				        }
					 var blank ='';
					// nlapiSetCurrentLineItemValue('item','custcol_entity_name',blank);
					// nlapiSetCurrentLineItemValue('item','custcol_order_number',blank);
					 nlapiSetCurrentLineItemValue('expense','custcol_entity_name',blank);
					 nlapiSetCurrentLineItemValue('expense','custcol_order_number',blank);
						flag =true;
		}	
	   else{
			flag =true;
		}
		//  alert('Flag is:='+ flag)
		
	  return flag;
	} 
	else if(recordType == 'invoice' ||recordType == 'creditmemo')
	{
	
		var order = nlapiGetCurrentLineItemValue('item','custcol_cls_bill_order');
      
		var CreatedFrom = nlapiGetFieldValue('createdfrom');
        
        var myRole =nlapiGetUser();

		    if(myRole =='12729')
			{
			   // alert('order is:='+order)
	           // alert('type is:='+type)
	           // alert('CreatedFrom is:='+CreatedFrom)
	        }
        var cust_fields = ['entity','tranid'];
		
		// alert('Order is:='+order)
		if((order != null && order !='' && order !=undefined) && (CreatedFrom ==null || CreatedFrom =='' || CreatedFrom ==undefined))
	    {
			var poObj = nlapiLookupField('salesorder',order,cust_fields);
			 
			var entityName = poObj.entity;
	        
			var transNum = poObj.tranid;
			
			 nlapiSetCurrentLineItemValue('item','custcol_entity_name',entityName);
			 nlapiSetCurrentLineItemValue('item','custcol_order_number',transNum);
			 
			   var customer = nlapiGetCurrentLineItemValue('item','custcol_entity_name');
				
				var orderNum = nlapiGetCurrentLineItemValue('item','custcol_order_number');
				
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
		else if((order == null || order =='' || order ==undefined) && (CreatedFrom ==null || CreatedFrom =='' || CreatedFrom ==undefined))
		{
			    var blank ='';
			    nlapiSetCurrentLineItemValue('item','custcol_entity_name',blank);
		     	nlapiSetCurrentLineItemValue('item','custcol_order_number',blank);
			 
				flag =true;
		}
		else{
			flag =true;
		}
		return flag;
	}
  //============================================= 

}
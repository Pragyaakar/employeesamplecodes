/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Mar 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChangedSubsiChnge(type, name, linenum)
{
	if(type == 'item' && name =='item') 
    {
		 
  var subsidary = nlapiGetFieldValue('subsidiary');
  var form =   nlapiGetFieldValue('customform');
 // alert('form***************' +form);
   
  if(subsidary!=null && subsidary != '')
  {
	
	// nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
	 var columns = new Array();
	 columns[0] = new nlobjSearchColumn('custrecord_subsidiary_name');
	 columns[1] = new nlobjSearchColumn('custrecord_cust_name');
	 columns[2] = new nlobjSearchColumn('custrecord_store_indent_int_id');
	
	
	 var filters = new Array();
	 filters[0] = new nlobjSearchFilter ('custrecord_subsidiary_name', null, 'anyof',subsidary);
	// filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
		 var searchresults = nlapiSearchRecord('customrecord_store_indent_internal_cust',null,filters,columns);//customsearch_item_search_so_po
		 
		if(searchresults != null)
	   {
		for (var i = 0;  i < searchresults.length; i++) 
		{
			var custName = searchresults[i].getValue('custrecord_cust_name');
           // alert('Customer***************' +custName);
            
            var CustForm = searchresults[i].getValue('custrecord_store_indent_int_id');
           // alert('CustForm***************' +CustForm);
            
            if(CustForm == form)
		     {    				
			  nlapiSetCurrentLineItemValue('item','customer',custName);
		     }
		}
			
	   }	
	
     }
    }
	
	if(name == 'tbl_item_addmultiple')
    {
		alert('Add multiple')
		var prefCust = nlapiGetCurrentLineItemValue('item','customer');
		var form =   nlapiGetFieldValue('customform');
		
		if(prefCust != null && prefCust != undefined && prefCust != '')
			{
			var subsidiary = nlapiGetFieldValue('subsidiary'); 
			if(subsidiary == null && subsidiary == undefined && subsidiary == '')
			{
			alert('Please Enter Subsidiary');return;
			}
		     var filters1 = new Array();
			 filters1[0] = new nlobjSearchFilter ('custrecord_subsidiary_name', null, 'anyof',subsidary);
			// filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
				 var searchresults1 = nlapiSearchRecord('customrecord_store_indent_internal_cust',null,filters1,columns1);//customsearch_item_search_so_po
				 
	
				if(searchresults1 != null)
			   {
					alert('searchresults1=='+searchresults1)
				for (var i = 0;  i < searchresults1.length; i++) 
				{
					var custName = searchresults1[i].getValue('custrecord_cust_name');
		           // alert('Customer***************' +custName);
		            
		            var CustForm = searchresults1[i].getValue('custrecord_store_indent_int_id');
		           // alert('CustForm***************' +CustForm);
		            
		            if(CustForm == form)
				     {    				
					  nlapiSetCurrentLineItemValue('item','customer',custName);
				     }
				}
					
			   }	
			
		}
		
    
    }
 
}


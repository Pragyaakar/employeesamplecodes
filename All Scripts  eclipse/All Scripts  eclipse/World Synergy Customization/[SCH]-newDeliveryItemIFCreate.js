	/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       10 Jun 2019     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function scheduledIF_deliveryCreationScript(type) 
{
	 var internalId;
	 var recType = 'salesorder';

	var searchId='customsearch_if_creation_search';
	resultSet = findTransaction(searchId);
	
	if(resultSet!='' && resultSet!= null && resultSet !='undefined')
	{
		nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
		for(var i=0;i<resultSet.length;i++)//resultSet.length
			{
				var columns = resultSet[i].getAllColumns();
				internalId= resultSet[i].getValue(columns[0]);
				var status= resultSet[i].getValue(columns[1]);
				nlapiLogExecution('DEBUG','internalId','internalId'+internalId);
				nlapiLogExecution('DEBUG','internalId','status'+status);
				
				// internalId='265711';
				
				if(internalId != null && internalId != undefined && internalId != '')
			    {
			    	try
			    	{
			    		var loadSO = nlapiLoadRecord(recType,internalId);
				    	 var CreatedFrom = loadSO.getFieldValue('createdfrom');
				    	    var fromLoc = loadSO.getFieldValue('custbody_order_origin');
				    	    var relatedZone = loadSO.getFieldValue('custbody_kb_zone');
				    	    var numberLoad = loadSO.getFieldValue('custbody_kb_number_load');
                            nlapiLogExecution('DEBUG','numberLoad','numberLoad'+numberLoad);
				    	    var totalLoad = loadSO.getFieldValue('custbody_total_order_load');
                      		nlapiLogExecution('DEBUG','totalLoad','totalLoad'+totalLoad);
				    	     var shipCost =loadSO.getFieldValue('custbody_shipping_cost');
				    	     var TcsPosReg = loadSO.getFieldValue('custbody_fnxpos_register');
				    	     var NoIs= parseFloat(totalLoad)/parseFloat(numberLoad);
				    	   
				    	     var NoOfTruck = numberLoad;
				    	     var deliQty;
				    	     var SOItem1;
				    	     var SOItem;
				    	     nlapiLogExecution('DEBUG', 'SMallest Location value','shippCost ='+shipCost);
				    	     
				    	     var lineVals = loadSO.getLineItemCount('item');
				    	     nlapiLogExecution('DEBUG', 'SMallest Location value','lineVals ='+lineVals);
				    	     
				    	     var bklItem;
				    	     var count =0;
				    	     var deliCheck =0;
				    	     for (var m=1;m<=lineVals;m++)
				    	     {
				    	  	   var IsDeliveryItem = loadSO.getLineItemValue('item','custcol_kb_deliveryitem',m);
				    	  	   
				    	  	   var IsBulkItem = loadSO.getLineItemValue('item','custcol_is_bulk_item',m);
				    	  	   
				    	  	   var ValQty = loadSO.getLineItemValue('item','quantity',m);
				    	  	   
				    	  	    if(IsBulkItem =='T' && totalLoad == ValQty)
				    	  	   {
				    	  	      SOItem1 = loadSO.getLineItemValue('item','item',m);
				    	  		  count++;
				    	  	   }
				    	  	   
				    	  	   
				    	  	   if(IsDeliveryItem =='T')
				    	  	   {
				    	  		    SOItem = loadSO.getLineItemValue('item','item',m);
				    	  		    deliQty = loadSO.getLineItemValue('item','quantity',m);
				    	  		   deliCheck++;
				    	  		   break;
				    	  	   }
				    	     }
				    	     
				    	     nlapiLogExecution('DEBUG', 'checking Values','is Delivery item  ='+deliCheck+' is BUlk Item ='+count);
				    	     
				    	     
				    	     var CreateIF =loadSO.getFieldValue('custbody_if_check_box');
				    	     
				    	     if(count == 0 && deliCheck > 0)//&&(CreatedFrom !=null && CreatedFrom != undefined && CreatedFrom !='')
				    	     {
				    	    	 nlapiLogExecution('DEBUG', 'Condition ONE','Only Delivery item');
						    	 
				    	    	 
				    	    	 nlapiLogExecution('DEBUG', 'SMallest Location value','SOItem ='+SOItem);
						    	    
				    	    	 nlapiLogExecution('DEBUG', 'SMallest Location value','NoOfTruck ='+NoOfTruck);
						    	    
				    		  for ( var IF =0 ; IF < NoOfTruck ; IF++)
				    		  {
				    		
				    			     
				    			    IFqty = parseFloat(deliQty)/NoOfTruck;
				    			    nlapiLogExecution('DEBUG', 'SMallest Location value','IFqty ='+IFqty);
				    			    var record = nlapiTransformRecord('salesorder',internalId,'itemfulfillment');
				    			     record.setFieldValue('customform',168);//168,222
				    			     record.setFieldValue('shipstatus','A');//shipstatus
				    			     record.setFieldValue('custbody_rpod_export','T');
				    			    var lineCount = record.getLineItemCount('item');
				    			  
				    			    nlapiLogExecution('DEBUG', 'SMallest Location value','record ='+record);
				    			    nlapiLogExecution('DEBUG', 'SMallest Location value','lineCount ='+lineCount);
						    	    
				    			    
				    				if(lineCount!= null)
				    				{
				    						for(var h=lineCount;h>=1;h--)
				    						{
				    							item = record.getLineItemValue('item','item',h);
				    							nlapiLogExecution('DEBUG', 'After Submit item', "  item==" + item);
				    							
				    							if(item == SOItem)
			    								 {
				    								record.setLineItemValue('item','quantity',h,IFqty);
				    								record.setLineItemValue('item','itemreceive',h,'T');
			    								 }
				    							else if(item != SOItem && IF==0 && count == 0)
				    							{
				    								record.setLineItemValue('item','itemreceive',h,'T');
				    							}
				    							else if(item != SOItem && IF>0)
				    							{
				    								 record.setLineItemValue('item','itemreceive',h,'F');
						    					    nlapiLogExecution('DEBUG', 'After Submit item', "  Remove line item==");
						    							 
				    							}
				    							
				    						}
				    					
				    				 }
				    				
				    				 var finInvoice =nlapiSubmitRecord(record,false,false)
				    			   
				    			  
				    		  }
				    	     }
				    	     //-------------------------------------------------------------------
				    	     
				    	     else if(count > 0 && deliCheck == 0)
				    	     {
				    	    	 nlapiLogExecution('DEBUG', 'Condition two','Only Bulk item');
				    	    	 
				    	    	 nlapiLogExecution('DEBUG', 'SMallest Location value','SOItem ='+SOItem);
						    	    
				    	    	 nlapiLogExecution('DEBUG', 'SMallest Location value','NoOfTruck ='+NoOfTruck);
						    	    
				    		  for ( var IF =0 ; IF < NoOfTruck ; IF++)
				    		  {
				    		
				    			     
				    			    IFqty = parseFloat(totalLoad)/NoOfTruck;
				    			    nlapiLogExecution('DEBUG', 'SMallest Location value','IFqty ='+IFqty);
				    			    var record = nlapiTransformRecord('salesorder',internalId,'itemfulfillment');
				    			     record.setFieldValue('customform',168);//168,222
				    			     record.setFieldValue('shipstatus','A');//shipstatus
				    			     record.setFieldValue('custbody_rpod_export','T');
				    			    var lineCount = record.getLineItemCount('item');
				    			  
				    			    nlapiLogExecution('DEBUG', 'SMallest Location value','record ='+record);
				    			    nlapiLogExecution('DEBUG', 'SMallest Location value','lineCount ='+lineCount);
						    	    
				    			    
				    				if(lineCount!= null)
				    				{
				    						for(var h=lineCount;h>=1;h--)
				    						{
				    							item = record.getLineItemValue('item','item',h);
				    							nlapiLogExecution('DEBUG', 'After Submit item', "  item==" + item);
				    							
				    							if(item == SOItem1)
			    								 {
				    								record.setLineItemValue('item','quantity',h,IFqty);
				    								record.setLineItemValue('item','itemreceive',h,'T');
			    								 }
				    							else if(item != SOItem1 && IF==0 && count == 0)
				    							{
				    								record.setLineItemValue('item','itemreceive',h,'T');
				    							}
				    							else if(item != SOItem1 && IF>0)
				    							{
				    								 record.setLineItemValue('item','itemreceive',h,'F');
						    					    nlapiLogExecution('DEBUG', 'After Submit item', "  Remove line item==");
						    							 
				    							}
				    							
				    						}
				    					
				    				 }
				    				
				    				 var finInvoice =nlapiSubmitRecord(record,false,false)
				    			   
				    			  
				    		  }
				    	     
				    	     }
				    	     //----------------------------------------------------------------------
				    	     else if(count > 0 && deliCheck > 0)
				    	     {

				    	    	 nlapiLogExecution('DEBUG', 'Condition ONE','BOth Bulk & Delivery item');
				    	    	 
				    	    	 nlapiLogExecution('DEBUG', 'SMallest Location value','SOItem ='+SOItem);
						    	    
				    	    	 nlapiLogExecution('DEBUG', 'SMallest Location value','NoOfTruck ='+NoOfTruck);
						    	    
				    		  for ( var IF =0 ; IF < NoOfTruck ; IF++)
				    		  {
				    		
				    			     
				    			    IFqty = parseFloat(totalLoad)/NoOfTruck;
				    			    var IFqty1 = parseFloat(deliQty)/NoOfTruck;
				    			    nlapiLogExecution('DEBUG', 'SMallest Location value','IFqty ='+IFqty);
				    			    var record = nlapiTransformRecord('salesorder',internalId,'itemfulfillment');
				    			     record.setFieldValue('customform',168);//168,222
				    			     record.setFieldValue('shipstatus','A');//shipstatus
				    			     record.setFieldValue('custbody_rpod_export','T');
				    			    var lineCount = record.getLineItemCount('item');
				    			  
				    			    nlapiLogExecution('DEBUG', 'SMallest Location value','record ='+record);
				    			    nlapiLogExecution('DEBUG', 'SMallest Location value','lineCount ='+lineCount);
						    	    
				    			    
				    				if(lineCount!= null)
				    				{
				    						for(var h=lineCount;h>=1;h--)
				    						{
				    							item = record.getLineItemValue('item','item',h);
				    							nlapiLogExecution('DEBUG', 'After Submit item', "  item==" + item);
				    							
				    							if(item == SOItem1)
			    								 {
				    								record.setLineItemValue('item','quantity',h,IFqty);
				    								record.setLineItemValue('item','itemreceive',h,'T');
			    								 }
				    							else if(item == SOItem)
				    							{
				    								record.setLineItemValue('item','quantity',h,IFqty1);
				    								record.setLineItemValue('item','itemreceive',h,'T');
				    							}
				    							else if((item != SOItem1 || item != SOItem)&& IF==0 && count == 0)
				    							{
				    								record.setLineItemValue('item','itemreceive',h,'T');
				    							}
				    							else if((item != SOItem1 || item != SOItem) && IF>0)
				    							{
				    								 record.setLineItemValue('item','itemreceive',h,'F');
						    					    nlapiLogExecution('DEBUG', 'After Submit item', "  Remove line item==");
						    							 
				    							}
				    							
				    						}
				    					
				    				 }
				    				
				    				 var finInvoice =nlapiSubmitRecord(record,false,false)
				    			   
				    			  
				    		  }
				    	     
				    	     
				    	     }
						
				    	//nlapiSubmitField(recType,internalId,'custbody_if_check_box','T')
			    	}
			    	catch(e)
			    	{
			    		nlapiLogExecution('DEBUG', 'After Submit item', " Error =="+e);
						
			    	}
			}
	}
	

}
}// END Function

function findTransaction(searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	// filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',recordID);
	savedSearch.addFilters(filters);
	   
	    var resultset = savedSearch.runSearch();
		var returnSearchResults = [];
	    var searchid = 0;
	    do {
    	
	        var resultslice = resultset.getResults(searchid, searchid + 1000);
	        if(resultslice!= null)
	        {
	    	   for ( var rs in resultslice) 
		        {
		        	returnSearchResults.push(resultslice[rs]);
		            searchid++;
		        }
	    	   nlapiLogExecution('DEBUG','searchid','searchid'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;

} 
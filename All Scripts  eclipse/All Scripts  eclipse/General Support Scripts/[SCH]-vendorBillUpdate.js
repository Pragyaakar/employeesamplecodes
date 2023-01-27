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


function scheduled_to_data_bill_update(type) 
{
	try
	{
	 var amtInlitr;
	
	var searchId='customsearch_venbill_special_n_dropship';
	resultSet = findTransaction(searchId);
	
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
				for(var i=0;i<resultSet.length;i++)//resultSet.length
					{
					nlapiLogExecution('DEBUG','resultSet length','value of I'+i);
					var remainingUsage = nlapiGetContext().getRemainingUsage();
        			if (remainingUsage < 500) 
                    {
        				nlapiYieldScript();
        			}
					
					
					
						var columns = resultSet[i].getAllColumns();
						var createFrom= resultSet[i].getValue(columns[0]);
						var internalID= resultSet[i].getValue(columns[5]);
						//nlapiLogExecution('DEBUG','resultSet length','resultSet internalID'+internalID);	
						
						 var Vendbill =nlapiLoadRecord('vendorbill',internalID);
							var cust_fields = ['entity','tranid'];
							
							if(createFrom !=null && createFrom !='' && createFrom != undefined)
							{
								var poObj = nlapiLookupField('salesorder',createFrom,cust_fields);
								 
								var entityName = poObj.entity;
						        
								var transNum = poObj.tranid;
								
							}
							
							Vendbill.setFieldValue('custbody_data_set','T');
							
							// nlapiLogExecution('DEBUG','Serach Value','entityName :'+entityName);
							// nlapiLogExecution('DEBUG','Serach Value','transNum :'+transNum);
							
							var lineCount = Vendbill.getLineItemCount('item');
							// nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
						   
							for(j=1;j<=lineCount;j++)
						    {
								// nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
								var location =Vendbill.getLineItemValue('item','location',j);
								
								if((createFrom !=null && createFrom !='' && createFrom != undefined )&&(location!=null && location!=''))
								{
									Vendbill.setLineItemValue('item','custcol_cls_bill_order',j,createFrom);
									Vendbill.setLineItemValue('item','custcol_entity_name',j,entityName);
									Vendbill.setLineItemValue('item','custcol_order_number',j,transNum);
								}
						       
							 }//End of if linecount	 
							
						 nlapiSubmitRecord(Vendbill,true)
					
			         }
			 }
	}
	catch(e)
	{
      	
		 nlapiLogExecution('Debug','Serach Value','Error Is ='+e);
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
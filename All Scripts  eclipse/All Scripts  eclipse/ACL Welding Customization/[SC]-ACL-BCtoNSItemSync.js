/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       31 Jan 2020     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function sch_itemSyncBsToNs(type) 
{
	try{
		
	var Todays = new Date();
	var searchId='customsearch_item_sync_bc_ns_cust';
	var recType =null;
	var filters =null;
	var ClassMapReturn = getClassBCcategory();
	
	var resultSet = getSavedSearchResult(recType, searchId, filters);
	
	if(resultSet!='' && resultSet!= null && resultSet !='undefined')
	{
		nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
		for(var i=0;i<resultSet.length;i++)//resultSet.length
			{
			  
				var internalId = resultSet[i].getValue('internalid');
				var itmtype = resultSet[i].getValue('type');
				var clsss = resultSet[i].getValue('class');
                var serialised = resultSet[i].getValue('isserialitem');
				var OnSale = resultSet[i].getValue('custitem_on_sale_item');
             //================= Set on Item ==============
				
				var catToSet = ClassMapReturn[clsss];
				
				var newSet=[];
				//nlapiLogExecution('DEBUG','resultSet length','catToSet ='+catToSet);
				
				
				
				try{
					
					if(itmtype =='InvtPart')
					{
                       if(serialised != 'T')
                       {
                    	   if(OnSale == 'T')
                    	   {
                    		  //nlapiLogExecution('DEBUG','resultSet length','OnSale ='+OnSale);
                    		    newSet.push(catToSet);
                    		    newSet.push(115)
                             nlapiSubmitField('inventoryitem',internalId,'custitem_celigo_bigcommerce_categories',newSet);
       						
                    	   }
                    	   else
                    	   {
                    		   nlapiSubmitField('inventoryitem',internalId,'custitem_celigo_bigcommerce_categories',catToSet);
       						 
                    	   }
                        nlapiLogExecution('DEBUG','resultSet length','-- InvtPart type --'+internalId);
                       }
                      else
                      {
                       
                    	if(OnSale == 'T')
                   	   {
                    		newSet.push(catToSet);
                		    newSet.push(115)
                   		   nlapiSubmitField('serializedinventoryitem',internalId,'custitem_celigo_bigcommerce_categories',newSet);
      						
                   	   }
                   	   else
                   	   {
                   		   nlapiSubmitField('serializedinventoryitem',internalId,'custitem_celigo_bigcommerce_categories',catToSet);
                   	   }
						nlapiLogExecution('DEBUG','resultSet length','-- InvtPart type --'+internalId);
                      }
						
					}
					else if(itmtype =='OthCharge')
					{
						if(OnSale == 'T')
                 	   {
							newSet.push(catToSet);
                		    newSet.push(115)
                 		   nlapiSubmitField('otherchargeitem',internalId,'custitem_celigo_bigcommerce_categories',newSet);
    						
                 	   }
                 	   else
                 	   {
                 		   nlapiSubmitField('otherchargeitem',internalId,'custitem_celigo_bigcommerce_categories',catToSet);
                 	   }
						nlapiLogExecution('DEBUG','resultSet length','-- OthCharge type --');
					}
					else if(itmtype =='Kit')
					{
						if(OnSale == 'T')
                 	   {
							newSet.push(catToSet);
                		    newSet.push(115)
                 		   nlapiSubmitField('kititem',internalId,'custitem_celigo_bigcommerce_categories',newSet);
    						
                 	   }
                 	   else
                 	   {
                 		   nlapiSubmitField('kititem',internalId,'custitem_celigo_bigcommerce_categories',catToSet);
                 	   }
						nlapiLogExecution('DEBUG','resultSet length','-- Kit type --');
					}
					else if(itmtype =='NonInvtPart')
					{
						if(OnSale == 'T')
                 	   {
							newSet.push(catToSet);
                		    newSet.push(115)
                 		   nlapiSubmitField('noninventoryitem',internalId,'custitem_celigo_bigcommerce_categories',newSet);
    						
                 	   }
                 	   else
                 	   {
                 		   nlapiSubmitField('noninventoryitem',internalId,'custitem_celigo_bigcommerce_categories',catToSet);
                 	   }
						nlapiLogExecution('DEBUG','resultSet length','-- NonInvtPart type --');
					}
					else if(itmtype =='Service')
					{
						if(OnSale == 'T')
                 	   {
							newSet.push(catToSet);
                		    newSet.push(115)
                 		   nlapiSubmitField('serviceitem',internalId,'custitem_celigo_bigcommerce_categories',newSet);
    						
                 	   }
                 	   else
                 	   {
                 		   nlapiSubmitField('serviceitem',internalId,'custitem_celigo_bigcommerce_categories',catToSet);
                 	   }
						
						nlapiLogExecution('DEBUG','resultSet length','-- Service type --');
						
					}
					else if(itmtype =='Discount')
					{
						if(OnSale == 'T')
                 	   {
							newSet.push(catToSet);
                		    newSet.push(115)
                 		   nlapiSubmitField('discountitem',internalId,'custitem_celigo_bigcommerce_categories',newSet);
    						
                 	   }
                 	   else
                 	   {
                 		   nlapiSubmitField('discountitem',internalId,'custitem_celigo_bigcommerce_categories',catToSet);
                 	   }
						nlapiLogExecution('DEBUG','resultSet length','-- Discount type --');
					}
					else if(itmtype =='Markup')
					{
						if(OnSale == 'T')
                 	   {
							newSet.push(catToSet);
                		    newSet.push(115)
                 		   nlapiSubmitField('markupitem',internalId,'custitem_celigo_bigcommerce_categories',newSet);
    						
                 	   }
                 	   else
                 	   {
                 		   nlapiSubmitField('markupitem',internalId,'custitem_celigo_bigcommerce_categories',catToSet);
                 	   }
						nlapiLogExecution('DEBUG','resultSet length','-- Markup type --');
					}
					else
					{
						if(OnSale == 'T')
                 	   {
							newSet.push(catToSet);
                		    newSet.push(115)
                 		   nlapiSubmitField('assemblyitem',internalId,'custitem_celigo_bigcommerce_categories',newSet);
    						
                 	   }
                 	   else
                 	   {
                 		   nlapiSubmitField('assemblyitem',internalId,'custitem_celigo_bigcommerce_categories',catToSet);
                 	   }
						nlapiLogExecution('DEBUG','resultSet length','-- Assembly type --');
					}
					
										
				}
				catch(e)
				{
					 nlapiLogExecution('DEBUG','resultSet length','e ='+e);
				}
			  //====================== End Item value Set=====================	
				
				var remainingUsage = nlapiGetContext().getRemainingUsage();
				if (remainingUsage < 50) {
					nlapiYieldScript();
				}
			//=================================================================
			}
	}
	}
	catch(e){
		nlapiLogExecution('DEBUG','BctoNS-customization','Error ='+e);
	}
}// END Function




function getClassBCcategory() //==== this is for BigCommCategory
{
	var filters=new Array();
	var columns = new Array();
	
	var OrgArr =[];

	//filters[0] = new nlobjSearchFilter('internalid', null,'anyof',organis);
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_bigcommerce_category');//custrecord_bigcommerce_category
	
	
	var searchResultItem = nlapiSearchRecord('classification', 'customsearch_bc_category_on_class', filters, columns);
	
	var MapForBC ={};
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			var internID =searchResultItem[j].getValue('internalid');
			var bigCommStore =searchResultItem[j].getValue('custrecord_bigcommerce_category');
			MapForBC[internID]=bigCommStore;
		}
	}
	
	    
	return MapForBC;
}




function getSavedSearchResult(recType, searchId, filters)
{
	    var aSearchResults = [];
	    var iRscnt = 1000, min = 0, max = 1000;
	    var search = {};
	    if (searchId) 
	    {
	        var search = nlapiLoadSearch(recType, searchId);
	        if (filters) 
	        {
	            search.addFilters(filters);
	        }
	    }
	    

	    var rs = search.runSearch();
	    try 
	    {
	        while (iRscnt == 1000) 
	        {
	            var resultSet = rs.getResults(min, max);
	            aSearchResults = aSearchResults.concat(resultSet);
	            min = max;
	            max += 1000;
	            iRscnt = resultSet.length;
	        }
	    }
	    catch (e) 
	    {
	        nlapiLogExecution('DEBUG', 'getAllResults --> exception', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
	    }

	 //   nlapiLogExecution('DEBUG', 'getAllResults --> Success', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
	    return aSearchResults;
}


function filter_array(test_array) 
{
	 var index = -1,
	 arr_length = test_array ? test_array.length : 0,
	 resIndex = -1,
	 result = [];

	 while (++index < arr_length) 
	 {
		 var value = test_array[index];
		 if(value)
		 {
			result[++resIndex] = value;
		  }
	 }
return result;
}



function removeDuplicates(num) 
{
	  var x,
		  len=num.length,
		  out=[],
		  obj={};
	 
	  for (x=0; x<len; x++) 
	  {
		obj[num[x]]=0;
	  }
	  for (x in obj) 
	  {
		out.push(x);
	  }
	  return out;
	}
	
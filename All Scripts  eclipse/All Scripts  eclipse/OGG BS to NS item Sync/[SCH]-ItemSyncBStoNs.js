/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Nov 2019     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function sch_itemSyncBsToNs(type) 
{
	
	var searchId='customsearch_bc_ns_item_sync';
	var recType =null;
	var filters =null;
	var resultSet = getSavedSearchResult(recType, searchId, filters);
	
	if(resultSet!='' && resultSet!= null && resultSet !='undefined')
	{
		nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
		for(var i=0;i<10;i++)//resultSet.length
			{
			  var combinedArray =[];
			   var  arrUniq =[];
			   var  filter_Loc =[];
			   var product2Data =[];
			   var product3Data=[]; 
			   var brand2Data =[];
			   var brand3Data =[];
			   var organisData =[];
			   
				var internalId = resultSet[i].getValue('internalid');
				var itmtype = resultSet[i].getValue('type');
				var product2 = resultSet[i].getValue('custitem_product_group2');
				var product3 = resultSet[i].getValue('custitem_product_group3');
				var brand2 = resultSet[i].getValue('custitem_brand_group2');
				var brand3 = resultSet[i].getValue('custitem_brand_group3');
				var organis = resultSet[i].getValue('custitem_organisation');
		/*		
                nlapiLogExecution('DEBUG','resultSet length','internalId ='+internalId);	    
				
				nlapiLogExecution('DEBUG','resultSet length','itmtype ='+itmtype);
				
				nlapiLogExecution('DEBUG','resultSet length','product2 ='+product2);	    
				
				nlapiLogExecution('DEBUG','resultSet length','product3 ='+product3);	    
				
				nlapiLogExecution('DEBUG','resultSet length','brand2 ='+brand2);	    
				
				nlapiLogExecution('DEBUG','resultSet length','brand3 ='+brand3);	    
				
				nlapiLogExecution('DEBUG','resultSet length','organis ='+organis);	
				
			*/	
				product2 =(product2.toString()).split(',');
				product3 =(product3.toString()).split(',');
				brand2 =(brand2.toString()).split(',');
				brand3 =(brand3.toString()).split(',');
				organis =(organis.toString()).split(',');
				
				if(product2 !=null && product2 != '' && product2 != undefined)
				{
					 product2Data = getProduct2DataValues(product2);
					
					// nlapiLogExecution('DEBUG','resultSet length','product2Data ='+product2Data);	    
				}
				
				if(product3 !=null && product3 != '' && product3 != undefined)
				{
					 product3Data = getProduct3DataValues(product3);
					
					// nlapiLogExecution('DEBUG','resultSet length','product3Data ='+product3Data);
				}
				
				
				if(brand2 !=null && brand2 != '' && brand2 != undefined)
				{
				   brand2Data = getbrand2DataValues(brand2);
				  
				 //  nlapiLogExecution('DEBUG','resultSet length','brand2Data ='+brand2Data);
				}
				
				if(brand3 !=null && brand3 != '' && brand3 != undefined)
				{
				   brand3Data = getbrand3DataValues(brand3);
				  
				  // nlapiLogExecution('DEBUG','resultSet length','brand3Data ='+brand3Data);
				  
				}
				
				if(organis !=null && organis != '' && organis != undefined)
				{
				    organisData = getOrganisationDataValues(organis);
				   var organisStoreData = getOrganisationStoreValues(organis);
				   
				   //nlapiLogExecution('DEBUG','resultSet length','organisData ='+organisData);
				  // nlapiLogExecution('DEBUG','resultSet length','organisStoreData ='+organisStoreData);
				   
				   
				}
				// ============ Merge the array ================
				arrUniq = [].concat(product2Data,product3Data,brand2Data,brand3Data,organisData);
				
				 filter_Loc= filter_array(arrUniq);
				 combinedArray= removeDuplicates(filter_Loc);
				
				 
				// nlapiLogExecution('DEBUG','resultSet length','internalId ='+internalId);
				 
				 
				// nlapiLogExecution('DEBUG','resultSet length','combinedArray ='+combinedArray);
				 
				 
             //================= Set on Item ==============
				
				try{
					
					if(itmtype =='InvtPart')
					{
						var itemObj=nlapiLoadRecord('inventoryitem',internalId);
						nlapiLogExecution('DEBUG','resultSet length','-- InvtPart type --');
					}
					else if(itmtype =='OthCharge')
					{
						var itemObj=nlapiLoadRecord('otherchargeitem',internalId);
						nlapiLogExecution('DEBUG','resultSet length','-- OthCharge type --');
					}
					else if(itmtype =='Kit')
					{
						var itemObj=nlapiLoadRecord('kititem',internalId);
						nlapiLogExecution('DEBUG','resultSet length','-- Kit type --');
					}
					else if(itmtype =='NonInvtPart')
					{
						var itemObj=nlapiLoadRecord('noninventoryitem',internalId);
						nlapiLogExecution('DEBUG','resultSet length','-- NonInvtPart type --');
					}
					else if(itmtype =='Service')
					{
						var itemObj=nlapiLoadRecord('serviceitem',internalId);
						
						nlapiLogExecution('DEBUG','resultSet length','-- Service type --');
						
					}
					else if(itmtype =='Discount')
					{
						var itemObj=nlapiLoadRecord('discountitem',internalId);
						nlapiLogExecution('DEBUG','resultSet length','-- Discount type --');
					}
					else if(itmtype =='Markup')
					{
						var itemObj=nlapiLoadRecord('markupitem',internalId);
						nlapiLogExecution('DEBUG','resultSet length','-- Markup type --');
					}
					else
					{
						var itemObj=nlapiLoadRecord('assemblyitem',internalId);
						nlapiLogExecution('DEBUG','resultSet length','-- Assembly type --');
					}
					
					var BigCommCategories = (combinedArray.toString()).split(',');
					var BigCommStores = (organisStoreData.toString()).split(',');
					
					if(BigCommCategories)
					{
						BigCommCategories=BigCommCategories;
					}else
					{
						BigCommCategories='';
					} 
					
					if(BigCommStores)
					{
						BigCommStores=BigCommStores;
					}else
					{
						BigCommStores='';
					} 
					
					itemObj.setFieldValues('custitem_celigo_bigcommerce_categories',filter_array(BigCommCategories));//filter_array(BigCommCategories)
					itemObj.setFieldValues('custitem_celigo_bgc_stores',filter_array(BigCommStores));//filter_array(BigCommStores)
					
				
					  var rec= nlapiSubmitRecord(itemObj,true);
					 nlapiLogExecution('DEBUG','resultSet length','Item Done ='+rec);
					
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
	
}// END Function




function getOrganisationDataValues(organis) //==== this is for BigCommCategory
{
	var filters=new Array();
	var columns = new Array();
	
	var OrgArr =[];

	filters[0] = new nlobjSearchFilter('internalid', null,'anyof',organis);
	
	columns[0] = new nlobjSearchColumn('custrecord_bigcommerce_category');//custrecord_bigcommerce_category
	
	
	var searchResultItem = nlapiSearchRecord('customrecord_organisation', null, filters, columns);
	
	
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
		  
			var bigCommStore =searchResultItem[j].getValue('custrecord_bigcommerce_category');
			OrgArr.push(bigCommStore);
		}
	}
	
	// nlapiLogExecution('DEBUG','getOrganisationDataValues','OrgArr ='+OrgArr);	    
	return OrgArr;
}


function getOrganisationStoreValues(organis) //==== this is for BigCommStore
{
	var filters=new Array();
	var columns = new Array();
	
	var OrgArr =[];

	filters[0] = new nlobjSearchFilter('internalid', null,'anyof',organis);
	
	columns[0] = new nlobjSearchColumn('custrecord_bigcommerce_store');//custrecord_bigcommerce_category
	
	
	var searchResultItem = nlapiSearchRecord('customrecord_organisation', null, filters, columns);
	
	
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
		  
			var bigCommStore =searchResultItem[j].getValue('custrecord_bigcommerce_store');
			OrgArr.push(bigCommStore);
		}
	}
	
	// nlapiLogExecution('DEBUG','getOrganisationDataValues','OrgArr ='+OrgArr);	    
	return OrgArr;
}




function getProduct2DataValues(product2)
{
	var filters=new Array();
	var columns = new Array();

	var product2Arr =[];
	
	filters[0] = new nlobjSearchFilter('internalid', null,'anyof',product2);
	
	columns[0] = new nlobjSearchColumn('scriptid');
	columns[1] = new nlobjSearchColumn('custrecord_bigcommerce_categories');
	
	var searchResultItem = nlapiSearchRecord('customrecordproduct_group2', null, filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
		  
			var bigCommCat =searchResultItem[j].getValue('custrecord_bigcommerce_categories');
			
			product2Arr.push(bigCommCat);
		}
	}
	
	// nlapiLogExecution('DEBUG','getProduct2DataValues(product2)','product2Arr ='+product2Arr);
	return product2Arr;
}

function getProduct3DataValues(product3)
{
	var filters=new Array();
	var columns = new Array();

	var product3Arr =[];
	
	filters[0] = new nlobjSearchFilter('internalid', null,'anyof',product3);
	
	columns[0] = new nlobjSearchColumn('custrecord1408');
	
	
	var searchResultItem = nlapiSearchRecord('customrecord_product_group1', null, filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
		  
			var bigCommCat =searchResultItem[j].getValue('custrecord1408');
			product3Arr.push(bigCommCat);
		}
	}
	
	// nlapiLogExecution('DEBUG','getProduct3DataValues(product3)','product3Arr ='+product3Arr);
	return product3Arr;
}

function getbrand2DataValues(brand2)
{
	var filters=new Array();
	var columns = new Array();

	var brand2Arr =[];
	
	filters[0] = new nlobjSearchFilter('internalid', null,'anyof',brand2);
	
	columns[0] = new nlobjSearchColumn('custrecord_big_commerce_categories');
	
	
	var searchResultItem = nlapiSearchRecord('customrecord_brand_group2', null, filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
		  
			var bigCommCat =searchResultItem[j].getValue('custrecord_big_commerce_categories');
			brand2Arr.push(bigCommCat);
		}
	}
	
	//  nlapiLogExecution('DEBUG','getbrand2DataValues(brand2)','brand2Arr ='+brand2Arr);
	return brand2Arr;
}


function getbrand3DataValues(brand3)
{
	var filters=new Array();
	var columns = new Array();

	var brand3Arr =[];
	
	filters[0] = new nlobjSearchFilter('internalid', null,'anyof',brand3);
	
	columns[0] = new nlobjSearchColumn('custrecord_bigcommerce_categories_brand3');
	
	
	var searchResultItem = nlapiSearchRecord('customrecord_brand_group3', null, filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
		  
			var bigCommCat =searchResultItem[j].getValue('custrecord_bigcommerce_categories_brand3');
			brand3Arr.push(bigCommCat);
		}
	}
	
	// nlapiLogExecution('DEBUG','getbrand3DataValues(brand3)','brand3Arr ='+brand3Arr);
	return brand3Arr;
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
	
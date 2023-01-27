/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       6 Nov 2019     Tushar
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */

function PurchaseOrderLineUpdation(type, form, request)
{
	
	try
	{
		
	
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	

		var irObj = nlapiLoadRecord(recordType,recordId);
		nlapiLogExecution('DEBUG','Search Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
	  
		
		var blank ='';
		var ItemlineCount = nlapiGetLineItemCount('item');
		var CreateFrom = nlapiGetFieldValue('createdfrom');
		var ExplineCount = nlapiGetLineItemCount('expense');
		nlapiLogExecution('DEBUG','Search Value','ItemlineCount :'+ItemlineCount);
		nlapiLogExecution('DEBUG','Search Value','ExplineCount :'+ExplineCount);
		var searchId ='customsearch696';
		var itmOrderNumArr ={};
		var itmEntityArr ={};
		var expOrderArr =[];
		var ordArr=[];
		if(ItemlineCount > 0 && (CreateFrom ==null || CreateFrom ==undefined || CreateFrom ==''))//
		{
			for (var a=1; a<=ItemlineCount ;a++)
			{
				var line_order =nlapiGetLineItemValue('item','custcol_cls_bill_order',a);
				if(line_order !=null && line_order!='' && line_order !=undefined)
				{
					ordArr.push(line_order);
				}
			}
			
			nlapiLogExecution('DEBUG','Search Value','ordArr ='+ordArr);
			
			searchResultItem =findTransaction(searchId,recordId,ordArr);
			nlapiLogExecution('DEBUG','Search Value','searchResultItem ='+searchResultItem);
		
			if(searchResultItem != null)
			{
				nlapiLogExecution('DEBUG','Search Value','searchResultItem.length:'+searchResultItem.length);
				
				for(var j=0;j<searchResultItem.length;j++)
				{
					var srchOrder=searchResultItem[j].getValue("internalid");
					var srchOrderNO=searchResultItem[j].getValue("tranid");
					var srchOrderEnti=searchResultItem[j].getValue("internalid","customerMain");
					
					itmOrderNumArr[srchOrder]=srchOrderNO;
					itmEntityArr[srchOrder]=srchOrderEnti;
					
				}
				
				nlapiLogExecution('DEBUG','Search Value','JSON.stringify(itmOrderNumArr) :'+JSON.stringify(itmOrderNumArr));
				nlapiLogExecution('DEBUG','Search Value','JSON.stringify(itmEntityArr) :'+JSON.stringify(itmEntityArr));
				
				//nlapiLogExecution('DEBUG','Search Value','billMapSetArr ='+billMapSetArr);
		    	
				
				
					for (var m=1; m<=ItemlineCount; m++)
					{
						var OrdField =nlapiGetLineItemValue('item','custcol_cls_bill_order',m);
						var OrdFieldLine =nlapiGetLineItemValue('item','line',m);
						
						    if(OrdField !=null && OrdField !='' && OrdField !=undefined)
							{
						    	nlapiLogExecution('DEBUG','Search Value','OrdFieldLine ='+OrdFieldLine);
						    	nlapiLogExecution('DEBUG','Search Value','itmOrderNumArr[OrdField] ='+itmOrderNumArr[OrdField]);
						    	nlapiLogExecution('DEBUG','Search Value','itmEntityArr[OrdField] ='+itmEntityArr[OrdField]);
						    	
						    	nlapiSetLineItemValue('item','custcol_order_number',m,itmOrderNumArr[OrdField]);
						    	nlapiSetLineItemValue('item','custcol_entity_name',m,itmEntityArr[OrdField]);
							}
					}
				
			}
			
			
		}
	 }
	catch(e)
		{
			nlapiLogExecution('DEBUG','Search Value','Error :'+e);	
		}
	}

function findTransaction(searchId,recordId,ordArr)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('internalid',null,'anyOf',ordArr);
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
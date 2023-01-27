/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       30 Jun 2020      Tushar
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function autoFulfillPageInit(type)
{
	alert('type =='+type);
	
	var lineCount = nlapiGetLineItemCount('item');
	alert('lineCount =='+lineCount);
	
	for (var i=1;i<=lineCount;i++)
	{
		alert('Line Set= '+i)
		
		var item = nlapiGetLineItemValue('item','item',i);
		
		var Qty = nlapiGetLineItemValue('item','quantity',i);
		
		var resultSet = findTransaction(item);
		
		if(resultSet !=null && resultSet != undefined && resultSet !='')
		{
			// for(var j=0;j<resultSet.length;j++) 
			 {
				 var serialNum = resultSet[0].getValue("inventorynumber");
				 
				 var Bin = resultSet[0].getValue("binnumber");
				
			 }
		}
		
		
		
		nlapiSelectLineItem('item',i)
	    nlapiSetCurrentLineItemValue('item','itemreceive','T'); 
		
		if((serialNum !=null && serialNum !='')||(Bin !=null && Bin !=''))
		{
			
			  nlapiSelectNewLineItem('inventoryassignment');
			if(serialNum !=null && serialNum !='')
			{
				alert('serialNum Set= '+serialNum)
				nlapiSetCurrentLineItemValue('inventoryassignment', 'issueinventorynumber', serialNum);
			     	
			}
			nlapiSetCurrentLineItemValue('inventoryassignment', 'quantity', Qty);
		     
            if(Bin !=null && Bin !='')
            {
            	alert('Bin Set= '+Bin)
            	nlapiSetCurrentLineItemValue('inventoryassignment', 'binnumber', Bin);
   		     	
            }
		     nlapiCommitLineItem('inventoryassignment');
		    
		}
		nlapiCommitLineItem('item');
	}
}


function findTransaction(item)
{
	var searchId = 'customsearch_inventory_detail_item_imp';
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('item', null,'anyOf',item);
	
	 var recType= null;
	 
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
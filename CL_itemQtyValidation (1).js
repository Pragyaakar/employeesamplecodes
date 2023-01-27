/**
*@NApiVersion 2.x
*@NScriptType ClientScript
*/

define(["N/search", "N/runtime"], 
function (search, runtime) 
{
    //prevent sales order from being saved if on hand quantity for a selected item/s at preferred location is 0
	function saveRecord(context) 
	{
        
        var currentRecord = context.currentRecord;
		
		var recID = context.currentRecord.id;
		
        //Retrieving total number of items selected by getting the total lines in sublist
		var itemCount = currentRecord.getLineCount({
		    sublistId: "item",
		});
		
		var array_item = []; //array to keep track of all selected items
		

        //retrieve all the selected items and push then into an array if item type is inventory
		for (var j = 0; j < itemCount; j++) 
		{
		    var item_type = currentRecord.getSublistValue({
			    sublistId: "item",
			    fieldId: "itemtype",
			    line: j,
		    });

            

		    if(item_type == 'InvtPart')
		    {
		        var sublist_item_on_save = currentRecord.getSublistValue({
			        sublistId: "item",
			        fieldId: "item",
			        line: j,
		        });

                var itemName = currentRecord.getSublistText({
                    sublistId: "item",
                    fieldId: "item",
                    line: j,
                });

		        array_item.push(sublist_item_on_save);  
		    }
		}

		var callSearch = searchItem(array_item);
		
		if(callSearch != true)
		{
			alert('On hand quantity for selected item/s is 0');
		    return false;
		}
		return true;
	}

    /*Create search on selected inventory type items and check if the quantity of all these items is not 0. This function will return false
    if an item with quantity 0 is found*/
	function searchItem(array_item)
	{
		
		var inventoryitemSearchObj = search.create({
	        type: "salesorder",
	        filters: 
	        [
		        ["itemtype","is","InvtPart"], 
		      	"AND", 
		      	["type","anyof","SalesOrd"], 
		      	"AND",
		      	["mainline","is","F"], 
		      	"AND", 
		      	["taxline","is","F"], 
		      	"AND", 
		      	["shipping","is","F"],
		      	"AND", 
		      	["item.internalid","anyof",array_item]
	        ],
	        columns: 
	        [
	        	  search.createColumn({name: "internalid", label: "Internal ID"}),
			      search.createColumn({
			         name: "totalquantityonhand",
			         join: "item",
			         label: "Total Quantity On Hand"
			      }),
			      search.createColumn({
			         name: "quantityavailable",
			         join: "item",
			         label: "Available"
			      }),
			      search.createColumn({
			         name: "preferredlocation",
			         join: "item",
			         label: "Preferred Location"
			      })
	        ]
        });

		var searchResultCount = searchAll(inventoryitemSearchObj.run());
    	
    	if(searchResultCount)
    	{
    		
    		
    		var flag = true;

    		for(var i=0;i<searchResultCount.length;i++)
    		{
    			
    			var quantityavailable = searchResultCount[i].getValue({name: "quantityavailable",join: "item",label: "Available"});
    			
    			if(!quantityavailable)
    			{
    				flag = false;
                    break;
    			}

    		}
    		
    		return flag;
    	}
    }

    //Retrieve all the results obtained from created search 
    function searchAll(resultset) 
	{
		var allResults = [];
		var startIndex = 0;
		var RANGECOUNT = 1000;

		do 
		{
			var pagedResults = resultset.getRange({
				start: parseInt(startIndex),
				end: parseInt(startIndex + RANGECOUNT)
			});

			allResults = allResults.concat(pagedResults);
			

			var pagedResultsCount = pagedResults != null ? pagedResults.length : 0;
			startIndex += pagedResultsCount;

			var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
			
		}

		while (pagedResultsCount == RANGECOUNT);
		var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
		

		return allResults;
	}
	return {
	    saveRecord: saveRecord
	}
});
/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(["N/log", "N/search", "N/runtime",], function (log, search, runtime) {
  function onRequest(context) {
    try {

      
      //get item array sent from calling client script
      var requestparam = context.request.parameters;
      var array_item = requestparam.array_item;
      
      array_item = JSON.parse(array_item);


      if (context.request.method == "GET" ) {
        
        var searchResult = searchItem(array_item);

        var searchResult = JSON.stringify(searchResult);

        //return boolean value to calling script. The transaction will be saved only if the value being returned is true
        context.response.write(searchResult);
      }
    } catch (e) {
      log.debug(e);
    }
  }

  /*******************************************************searchItem**************************************/

  //search to get selected items in sales order that are of inventory type
  function searchItem(array_item) {
    var inventoryitemSearchObj = search.create({
      type: "salesorder",
      filters: [
        ["itemtype", "is", "InvtPart"],
        "AND",
        ["type", "anyof", "SalesOrd"],
        "AND",
        ["mainline", "is", "F"],
        "AND",
        ["taxline", "is", "F"],
        "AND",
        ["shipping", "is", "F"],
        "AND",
        ["item.internalid", "anyof", array_item],
      ],
      columns: [
        search.createColumn({ name: "internalid", label: "Internal ID" }),
        search.createColumn({
          name: "totalquantityonhand",
          join: "item",
          label: "Total Quantity On Hand",
        }),
        search.createColumn({
          name: "quantityavailable",
          join: "item",
          label: "Available",
        }),
        search.createColumn({
          name: "preferredlocation",
          join: "item",
          label: "Preferred Location",
        }),
      ],
    });

    var searchResultCount = searchAll(inventoryitemSearchObj.run());

    if (searchResultCount) {
      var flag = true;

      for (var i = 0; i < searchResultCount.length; i++) {
        var quantityavailable = searchResultCount[i].getValue({
          name: "quantityavailable",
          join: "item",
          label: "Available",
        });
                 

        //check if available item quantity is not zero. If quantity is found to be zero, flag will be set to false 
        if (!quantityavailable) {
          flag = false;
          break;
        }
        
      }

      return flag;
    }
  }
  /*******************************************************searchAll***********************************/

  function searchAll(resultset) {
    var allResults = [];
    var startIndex = 0;
    var RANGECOUNT = 1000;

    do {
      var pagedResults = resultset.getRange({
        start: parseInt(startIndex),
        end: parseInt(startIndex + RANGECOUNT),
      });

      allResults = allResults.concat(pagedResults);

      var pagedResultsCount = pagedResults != null ? pagedResults.length : 0;
      startIndex += pagedResultsCount;

      var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
    } while (pagedResultsCount == RANGECOUNT);
    var remainingUsage = runtime.getCurrentScript().getRemainingUsage();

    return allResults;
  }
  /***********************************************************************************************************/

  return {
    onRequest: onRequest
  };
});

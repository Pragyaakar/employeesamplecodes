/**
  *@NApiVersion 2.x
  *@NScriptType ClientScript
  */
define(['N/record', 'N/log', 'N/ui/dialog', 'N/search','N/runtime'],
  function(record, log, dialog, search,runtime) {

    var MODE;

    function pageInit(context) {

        MODE = context.mode;
    }

    function saveRecord(context) {
      
      if (MODE == 'create' || MODE == 'copy' || MODE == 'edit') {
        
        var flag = true;
        var currentRecord = context.currentRecord;
        //alert('currentRecord'+currentRecord);

        var vendor_Name = currentRecord.getValue({
          fieldId: 'entity'
        });
        //alert('entity'+vendor_Name);

        var vendorTxt = currentRecord.getText({
          fieldId: 'entity'
        });

        var numLines = currentRecord.getLineCount({
            sublistId: 'item'
        });
        //alert('numLines'+ numLines);

        var itemArr = [];
        for(var q=0;q<numLines;q++)
        {
            var item = currentRecord.getSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: q
            });
            //alert('item'+item);

            itemArr.push(item);
        }

         var itemSearchObj = search.create({
         type: "item",
         filters:
         [ 
            ["isinactive","is","F"], 
            "AND", 
            ["othervendor","noneof","@NONE@"],
            "AND", 
            ["internalid","anyof",itemArr]
         ],
         columns:
         [
            search.createColumn({
               name: "internalid",
               sort: search.Sort.ASC,
               label: "Internal ID"
            }),
            search.createColumn({name: "itemid", label: "Name"}),
            search.createColumn({name: "othervendor", label: "Vendor"})
         ]
      });
      
      var searchResult = searchAll(itemSearchObj.run());
      //alert('searchResult.length'+searchResult.length);

        var count = 0;
        var itemNameArr = [];

        for (var i = 0; i < searchResult.length; i++)
        {
            var internalid = searchResult[i].getValue({name: "internalid",sort: search.Sort.ASC,label: "Internal ID"});
            var itemName = searchResult[i].getValue({name: "itemid", label: "Name"});
            var vendName = searchResult[i].getValue({name: "othervendor", label: "Vendor"});

            if(vendor_Name != vendName)
            {
                itemNameArr.push(itemName);
                count++;
            }
        }

        if(count > 0)
        {
           alert('The following Item(s) are not associated to '+vendorTxt+' Vendor : '+itemNameArr+'.');
          // return false;
        }
        
      }
      return true;
    }

    function searchAll(resultset) {
      var allResults = [];
      var startIndex = 0;
      var RANGECOUNT = 1000;

      do {
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
      pageInit: pageInit,
      saveRecord: saveRecord
    };
  });
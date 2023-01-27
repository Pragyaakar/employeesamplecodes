/**
 *@NApiVersion 2.x
 *@NScriptType MapReduceScript
 */

define(['../Module/SOCreationLibFile','N/record','N/search','N/format','N/runtime','N/xml'],
  function(SOCreationLibFile,record,search,format,runtime,xml) {
    function getInputData(context) 
    {
      try
      {
          var currentScript = runtime.getCurrentScript();

          var id_Val = currentScript.getParameter({
            name: 'custscript_requisition_id'
          });

          var savedSearch = search.load({
              id: id_Val //'customsearch_fmt_requisition_search'
          });
           
          var resultSet = searchAll(savedSearch.run()); 

          if(resultSet)
          {
              var acceptValues = [];

              for(var i=0; i<resultSet.length; i++)
              {
                var req = resultSet[i].getValue({name: "entityid", join: "CUSTCOL_REQUESTOR", label: "Requestor"});
                var req_id = resultSet[i].getValue({name: "internalid", join: "CUSTCOL_REQUESTOR", label: "Internal ID"});
                var req_date = resultSet[i].getValue({name: "trandate", label: "Date"});
                var req_delvDate = resultSet[i].getValue({name: "formuladate",formula: "{expectedreceiptdate}",label: "Formula (Date)"});
                var req_memo = resultSet[i].getValue({name: "memo", label: "Memo"});
                var req_dep = resultSet[i].getValue({name: "department", label: "Department"});
                var req_item = resultSet[i].getValue({name: "item", label: "Item"});
                var req_qty = resultSet[i].getValue({name: "quantity", label: "Quantity"});
                var req_rate = resultSet[i].getValue({name: "rate", label: "Rate"});
                var req_email = resultSet[i].getValue({name: "email",join: "CUSTCOL_REQUESTOR",label: "Email"});
                var internalid = resultSet[i].getValue({name: "internalid", label: "PR Internal Id"});
                var req_loc = resultSet[i].getValue({name: "location",join: "CUSTCOL_REQUESTOR",label: "Location"});

                acceptValues.push({ 
                  '_req': req,
                  '_req_date': req_date,
                  '_req_delvDate': req_delvDate,
                  '_req_memo': req_memo,
                  '_req_dep': req_dep,
                  '_req_item': req_item,
                  '_req_qty': req_qty,
                  '_req_rate': req_rate,
                  '_req_id':req_id,
                  '_email':req_email,
                  '_int_id':internalid,
                  '_loc':req_loc
                });
              }

              log.audit('acceptValues',acceptValues);
              return acceptValues;
          }
      }         
      catch(e)
      {
          log.audit('ERROR IN getData() FUNCTION',e);
      }
    }
    function map(context) 
    {
      try
      {
        var searchResult = JSON.parse(context.value);//to get value from above getInput() function
        log.audit('Map context',context);

        var _req = searchResult._req;
        var _reqDate = searchResult._req_date;
        var _reqDelvDate = searchResult._req_delvDate;
        var _reqMemo = searchResult._req_memo;
        var _reqDep = searchResult._req_dep;
        var _reqItem = searchResult._req_item;
        var _reqQty = searchResult._req_qty;
        var _reqRate = searchResult._req_rate;
        var req_nameid = searchResult._req_id;
        var reqEmail = searchResult._email;
        var req_int_id = searchResult._int_id;
        var req_Loc = searchResult._loc;

        context.write({
          key: req_nameid,
          value: {
            'tranDate':_reqDate,
            'deliveryDate':_reqDelvDate,
            'memo' : _reqMemo,
            'department' : _reqDep,
            'item' : _reqItem,
            'quantity' : _reqQty,
            'rate' : _reqRate,
            'requester': _req,
            'emailID':reqEmail,
            'int_id':req_int_id,
            'tranLoc':req_Loc
          }
        });
      }
      catch(e)
      {
        log.audit('ERROR IN MAP FUNCTION', e);
      }
    }

    function reduce(context) 
    {
        SOCreationLibFile.soCreation(context);
    }
    
    function searchAll(resultset) 
    {
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
     getInputData: getInputData,
     map : map,
     reduce : reduce
     };
});
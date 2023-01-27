/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */

/**
 * DESCRIPTION: 
 * Client script is attached to Suitelet to perform validations and redirect the suitelet
 * searchForSalesOrder is executed on SEARCH button click. 
 * saveRecord is executed on PRINT SELECTED SO click
 * and all the respective validations are provided
 */

define([
  "N/currentRecord",
  "N/url"
], function (currentRecord, url) {

  

  function pageInit() {
    

  }

  function searchForSalesOrder() {

    try {

      var record = currentRecord.get();

      var from = record.getValue({                    //dateToYMD() function to change the format we have got i
        fieldId: "fromdate",                          // "Tue Aug 03 2021 00:00:00 GMT+0530 (India Standard Time)"
       })                                             //changing that to 8/2/2021 function @ line 130

      var todate = record.getValue({                        
        fieldId: "todate",                          
       })                                            

      var location = record.getValue({
        fieldId: "selectlocation",
      })

      if (from == "" || todate == "" || location == "") {
        throw "Please enter values for all the fields";
      }

      if (from > todate) {
        throw "FROM date must not be greater than TO date";
      }

      from = dateToYMD(from);
      todate = dateToYMD(todate);
      
      from = JSON.stringify(from);
      todate = JSON.stringify(todate);
      location = JSON.stringify(location);

      var suiteletURL = url.resolveScript({
        scriptId: "customscript294",
        deploymentId: "customdeploy1",
        params: {
          from: from,
          todate: todate,
          location: location,
        },
      });

      window.onbeforeunload = null;
      window.location.href = suiteletURL;

    } catch (error) {

      alert(error);

    }
  }

  function saveRecord() {

  var recordd = currentRecord.get();

  var from = recordd.getValue({                    //dateToYMD() function to change the format we have got i
    fieldId: "fromdate",                          // "Tue Aug 03 2021 00:00:00 GMT+0530 (India Standard Time)"
   })                                             //changing that to 8/2/2021 function @ line 130

  var todate = recordd.getValue({                        
    fieldId: "todate",                          
   })                                          

  var location = recordd.getValue({
    fieldId: "selectlocation",
  })

    if (from == "" || todate == "" || location == "") {
      alert( "Enter values for all fields")
      return false
    }

    var objSublist = recordd.getSublist({
      sublistId: 'custpage_selectsalesorder'
     });
    var count = 0;

    if (!objSublist.isChanged) {

      alert ('Select a sales order to print')
      return false 

    }

    var linecount = recordd.getLineCount({
      sublistId: 'custpage_selectsalesorder'
    })

    for (var i = 0; i < linecount; i++) {

    var val = recordd.getSublistValue({
    sublistId: 'custpage_selectsalesorder',
    fieldId: 'custpage_print',
    line: i
    })

    if (val == true) {
      count++
    }

    }

    if (count > 15) {
      alert('Select sales order less than 15 to print')
      return false
    }

      return true
  }


  function dateToYMD(date) {

    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return "" + (m <= 9 ? "0" + m : m) + "/" + (d <= 9 ? "0" + d : d) + "/" + y;

  }

  return {

    pageInit: pageInit,
    searchForSalesOrder: searchForSalesOrder,
    saveRecord:saveRecord

  };
});

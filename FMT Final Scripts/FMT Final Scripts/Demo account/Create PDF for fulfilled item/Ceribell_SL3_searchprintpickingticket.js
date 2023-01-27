/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

/** 
 * Description: This following script is a Suitelet that creates a form for printing picking ticket which returns
 * the result of the sales order that has line level field expected between the values set on the field FROM, 
 * TO, LOCATION and returns results that match our criteria which further on clicking the PRINT checkbox 
 * on the respective lines prints it in one PDF.
*/

define([
    "N/render",
    "N/record",
    "N/search",
    "N/ui/serverWidget",
    "N/runtime",
  ], function (render, record, search, serverWidget, runtime) {
  
    function onRequest(context) {
  
      if (context.request.method == "GET") {
  
        var requestparam = context.request.parameters; //get parameters when page is re-loaded
  
        var from = requestparam.from;                  //get values set on the fields Location, From, To
        var todate = requestparam.todate;
        var location = requestparam.location; 
       
        var form = serverWidget.createForm({           //Create our form
          title: "Print Picking Tickets",
        })
  
        /**Call to client script from Button for printing Advanced PDF***/
  
        form.clientScriptFileId = 6033;               //Attach client script with internal id 6033 to our suitelet
  
        form.addButton({                   //Adding a SEARCH button with function that is returned bu client script
          id: "custpage_searchforsalesorder",
          label: "Search",
          functionName: "searchForSalesOrder",
        });
  
        var setFrom = form.addField({
          id: "fromdate",
          label: "FROM",
          type: serverWidget.FieldType.DATE,
        });
       
  
        var setTo = form.addField({
          id: "todate",
          label: "TO",
          type: serverWidget.FieldType.DATE,
        });

        var setLocation = form.addField({              //Add fields Location, To, From 
            id: "selectlocation",
            label: "LOCATION",
            type: serverWidget.FieldType.SELECT,
            source: "location",
          });
        
  
        /**********Sublist to select SO to print**********/
  
  
        var Sublist = form.addSublist({                   //Add sublist to the form
          id: "custpage_selectsalesorder",
          label: "Select SO to print",
          type: serverWidget.SublistType.LIST,          
        });
  
  
        var print = Sublist.addField({           //for LIST type FieldDisplayType.ENTRY should be set as per documentation
        //print checkbox used for POST Section
        id: "custpage_print",
        type: serverWidget.FieldType.CHECKBOX,
        label: "PRINT",
        });
        print.updateDisplayType({                         
          displayType: serverWidget.FieldDisplayType.ENTRY,
        });
  
  
         Sublist.addField({
          id: "custpage_date",
          type: serverWidget.FieldType.DATE,
          label: "DATE",
        });

        
        Sublist.addField({
            id: "custpage_customer",
            label: "CUSTOMER",
            type: serverWidget.FieldType.TEXT,
          });

          Sublist.addField({
            id: "custpage_documentnumber",
            label: "DOCUMENT NO.",
            type: serverWidget.FieldType.TEXT,
          });
  
  
         Sublist.addField({
          id: "custpage_type",
          label: "TYPE",
          type: serverWidget.FieldType.TEXT,
        });
  
        var sublistinterid = Sublist.addField({
          id: "custpage_internalid",
          label: "internal id",
          type: serverWidget.FieldType.TEXT,
        });
        sublistinterid.updateDisplayType({
            displayType : serverWidget.FieldDisplayType.HIDDEN
           });
  
       
     
        form.addSubmitButton({
          label: "Print Selected SO",
        });
  
        Sublist.addMarkAllButtons();

         /******************************************** SEARCH FOR SALES ORDER *********************************/
  
        if (from) {        //to check if from is true to parse the value 
  
          from = JSON.parse(from);
          todate = JSON.parse(todate);
          location = JSON.parse(location);
    
          location = parseInt(location);
  
          setLocation.defaultValue = location;
          setFrom.defaultValue = from;
          setTo.defaultValue = todate;
  
          var salesorderSearchObj = search.create({
            type: "salesorder",
            filters: [
              ["type", "anyof", "SalesOrd"],
              "AND",
              ["custcol14", "within", from, todate],
              "AND",
              ["location", "anyof", location],
              "AND",
              ["mainline", "is", "F"],
              "AND",
              ["custcol1", "is", "F"]
            ],
            columns: [
              search.createColumn({
                name: "custcol14",
                label: "Expected Ship Date",
              }),
              search.createColumn({ name: "item", label: "Item" }),
              search.createColumn({ name: "type", label: "Type" }),
              search.createColumn({ name: "tranid", label: "Document Number" }),
              search.createColumn({ name: "entity", label: "Name" }),
              search.createColumn({ name: "location", label: "Location" }),
              search.createColumn({ name: "internalid", label: "Internal ID" }),
              search.createColumn({ name: "custcol1", label: "Delete (P)" }),
            ],
          });
    
          var searchResultCount = searchAll(salesorderSearchObj.run());
          log.debug("search count",searchResultCount.length); 
    
          
          var resultData = {};
    
    
          /********************** for loop to set values from saved search *****************************/
    
          for (var i = 0; i < searchResultCount.length; i++) {
    
            var expectedshipdatee = searchResultCount[i].getValue({
              name: "custcol14",
              label: "Expected Ship Date",
            });
       
            var typee = searchResultCount[i].getText({
              name: "type",
              label: "Type",
            });
    
            var docnoo = searchResultCount[i].getValue({
              name: "tranid",
              label: "Document Number",
            });
    
            var internal = searchResultCount[i].getValue({ name: "internalid", label: "Internal ID" });
    
            var namee = searchResultCount[i].getText({
              name: "entity",
              label: "Name",
            });
      
            if (docnoo in resultData) {      //checking if our docnoo is present is the object
    
              resultData[docnoo].push({
                "expectedshipdate": expectedshipdatee,
                "typee": typee,
                "internal":internal,
                "docnoo":docnoo,
                "namee": namee
                
              })
    
           //  log.debug({title: 'resultData duplicate in if', details: JSON.stringify(resultData)});
    
            } else {                    //if not then create a docno 
    
              resultData[docnoo] = [{
                "expectedshipdate": expectedshipdatee,
                "typee": typee,
                "internal":internal,
                "docnoo":docnoo,
                "namee": namee,
               
              }];
            }
        } //End of searchResultCount
  
        var count = 0;
    
        for (key in resultData)             //we are getting the object in {key:value} equivalent to {docnoo1:[{},{}],docnoo2:[{},{}],..}
        {                                   //so we access the first element from the array of docnoo and set its value
                                            //for every key once 
          Sublist.setSublistValue({
            id: "custpage_date",
            line: count,
            value: resultData[key][0].expectedshipdate,
          });
    
        
          Sublist.setSublistValue({
            id: "custpage_type",
            line: count,
            value: resultData[key][0].typee,
          });

        
          Sublist.setSublistValue({
            id: "custpage_documentnumber",
            line: count,
            value: resultData[key][0].docnoo,
          });
        
        
          Sublist.setSublistValue({
            id: "custpage_internalid",
            line: count,
            value: resultData[key][0].internal,
          });
         
        
          Sublist.setSublistValue({
            id: "custpage_customer",
            line: count,
            value: resultData[key][0].namee,
          });


          count++

        }
  
        }
  
        context.response.writePage(form);
      } 
  
      else {
  
        /***POST print the checked sales order***/
  
        var requestparam = context.request;
        var locinpost = requestparam.parameters.selectlocation;   //get location set on the location field
  
        var soLines = requestparam.getLineCount({                   //get line count of sublist on the form
          group: "custpage_selectsalesorder",
        });
  
         var pickingPdfData = {};         //JSON data object source for the Advanced PDF
         pickingPdfData.docNum = [];
  
        for (var l = 0; l < soLines; l++) {
          //iterate through lines
  
          var printSelected = requestparam.getSublistValue({
              //check if print is printSelected
              group: "custpage_selectsalesorder",
              name: "custpage_print",
              line: l
            });

  
            if (printSelected == 'T') {     //check if print is selected and if selected get other info for the same
  
            var internalidofso = requestparam.getSublistValue({
                //check if print is printSelected
                group: "custpage_selectsalesorder",
                name: "custpage_internalid",
                line: l,
              });
  
            var documentno = requestparam.getSublistValue({
                //check if print is printSelected
                group: "custpage_selectsalesorder",
                name: "custpage_documentnumber",
                line: l,
              });
  
            var custName = requestparam.getSublistValue({
                //check if print is printSelected
                group: "custpage_selectsalesorder",
                name: "custpage_customer",
                line: l,
              });
  
              var currentso = record.load({
                type: record.Type.SALES_ORDER,
                id: internalidofso
              })
               var linecount = currentso.getLineCount({
                 sublistId: 'item'
               })
  
               var lines = [];
  
               for (var index = 0; index < linecount; index++) {
  
               var todaysdate = new Date()
                
               var esd = currentso.getSublistValue({   //esd - expected ship date
                  sublistId: 'item',
                  fieldId: 'custcol14',
                  line: index
                })
  
               var loc = currentso.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'location',
                    line: index
                })
  
                if (esd) {

                if (esd.getDate() <= todaysdate.getDate() && loc == locinpost) { 
                    
                    //check if expected date is less than todays date 
    
                            currentso.setSublistValue({
                              sublistId: 'item',
                              fieldId: 'custcol1',
                              line: index,
                              value: true
                            })

                                        
                            var location = currentso.getSublistText({
                                sublistId: 'item',
                                fieldId: 'location',
                                line: index
                            })
            
                            
                            var itemname = currentso.getSublistText({
                              sublistId: 'item',
                              fieldId: 'item',
                              line: index
                            })
                        
                            
                            var fulfilled = currentso.getSublistValue({
                              sublistId: 'item',
                              fieldId: 'quantityfulfilled',
                              line: index
                            })
            
                            
                            lines.push({
                              "itemname":itemname,
                              "qtyfulfilled":fulfilled,
                              "loc":location,
                              "expecteddate":esd,
                              "type":"Sales Order",
                              "custname":custName
                            })
            
                        }
                    }
                }

                pickingPdfData.docNum.push({"itemval":lines})
                currentso.save()

        }      // End of SOLines for loop
  
        /*********************************Create a PDF for the printSelected SO************************************/   
       
        if (printSelected == 'T') {
        
       
        var renderer = render.create();               //create a renderer object
    
        renderer.setTemplateByScriptId({              //reference to the ADVANCED PDF by its id
          scriptId: "CUSTTMPL_108_T2425409_243",
        });

        renderer.addCustomDataSource({                 //data source in advanced pdf 
          format: render.DataSource.OBJECT,
          alias: "JSON",
          data: { data: pickingPdfData }
        });

        if(pickingPdfData) {

        //   log.debug('pickingPdfData',pickingPdfData); 
       
          var invoicePdf = renderer.renderAsPdf();       //generate pdf from our advanced pdf template 
          log.debug('invoicePdf',invoicePdf); 

          context.response.writeFile({ file: invoicePdf, isInline: true });

        } else {

          context.response.write("There is a problem with PDF generation");

                }
            }
        }
        }
        }
    
  
    function searchAll(resultsetCurrent) {
      var allResults = [];
      var startIndex = 0;
      var RANGECOUNT = 1000;
  
      do {
        var pagedResults = resultsetCurrent.getRange({
          start: parseInt(startIndex),
          end: parseInt(startIndex + RANGECOUNT),
        });
  
        allResults = allResults.concat(pagedResults);
        var pagedResultsCount = pagedResults != null ? pagedResults.length : 0;
        startIndex += pagedResultsCount;
  
        var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
        log.debug(remainingUsage);
      } while (pagedResultsCount == RANGECOUNT);
      var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
      return allResults;
    }
  
    return {
      onRequest: onRequest,
    }
  })
/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
/***********************************************************************
 *
 * The following javascript code is created by FMT Consultants LLC,
 * a NetSuite Partner. It is a SuiteFlex component containing custom code
 * intended for NetSuite (www.netsuite.com) and use the SuiteScript API.
 * The code is provided "as is": FMT Consultants LLC shall not be liable
 * for any damages arising out the intended use or if the code is modified
 * after delivery.
 *
 * Company:     FMT Consultants LLC, www.fmtconsultants.com
 * Author:      rkhatri@fmtconsultants.com
 * File:        FMT_OO_SUT_BomPrint.js
 * Date:        05/25/2021
 *
 ***********************************************************************/

define(['N/runtime', 'N/record', 'N/search', 'N/http', 'N/file', 'N/render', 'N/xml', 'N/format'],
    function (runtime, record, search, http, file, render, xml, format) {
        function onRequest(params) {
            try {
                if (params.request.method === 'GET') {
                    var scriptObj = runtime.getCurrentScript();
                    var request = params.request, resultData;

                    var recno = request.parameters.recno;
                    //log.debug({title: 'recno',details: recno});

                    var invDeatilSearch = scriptObj.getParameter({
                        name: 'custscript_fmt__inventory_detail_search'
                    });

                    var woLineCount, resultLine;

                    var woRec = record.load({type: record.Type.WORK_ORDER, id: recno});
                    var resultData;

                    var assemblyID = woRec.getValue({fieldId: 'assemblyitem'});
                    log.debug({title: 'assemblyID',details: assemblyID});

                    if(assemblyID != null && assemblyID != '')
                    {
                        var fieldLookUp = search.lookupFields({
                            type: search.Type.ASSEMBLY_ITEM,
                            id: assemblyID,
                            columns: ['displayname']
                        });

                        var item_DispName = fieldLookUp.displayname;
                        log.debug({title: 'item_DispName',details: item_DispName});
                    }
                    

                    resultData = {
                        "date": formatStringField(woRec.getValue({fieldId: 'trandate'})),
                      	"productionstartdate": formatStringField(woRec.getValue({fieldId: 'startdate'})),
                      	"productionenddate": formatStringField(woRec.getValue({fieldId: 'enddate'})),
                        "orderno": woRec.getValue({fieldId: 'tranid'}),
                        "assembly": woRec.getText({fieldId: 'assemblyitem'}),
                        "lotnumber": woRec.getValue({fieldId: 'custbody_fmt_generate_assemblylot_num'}),
                        "billOfMatRevi": woRec.getText({fieldId: 'billofmaterialsrevision'}),
                        "unitsmeasure": woRec.getText({fieldId: 'units'}),
                        "qtyrequired": woRec.getValue({fieldId: 'quantity'}),
                        "comments": "",
                        "displayname": item_DispName
                    };


                    fetchWorkorderIssues(woRec, resultData, scriptObj, params,invDeatilSearch);
                    log.debug({title: '43',details: JSON.stringify(resultData)});
                }
            } catch (e) {
                log.debug('Error Occured', e)
            }
        }

        function fetchWorkorderIssues(woRec, resultData, scriptObj, params,invDeatilSearch) {

            //log.debug('itemArr',itemArr)

            var itemWiseWoIssue = {};
            var item;

            resultData.lines = [];

            var itemArr = [];
            var resultLine = {};

            resultData.lines.sublines = {};

            //resultData.sublines = [];


            var itemMap = {};

            var woLineCount = woRec.getLineCount({'sublistId': 'item'});
          
            for (var i = 0; i < woLineCount; i++) {

                var itemID = woRec.getSublistValue({sublistId: 'item', fieldId: 'item', line: i});
                itemArr.push(itemID);

                resultLine.memberitemid = woRec.getSublistValue({sublistId: 'item', fieldId: 'item', line: i});
                resultLine.memberitem = woRec.getSublistText({sublistId: 'item', fieldId: 'item', line: i});
                resultLine.qtyrequired = woRec.getSublistValue({sublistId: 'item', fieldId: 'quantity', line: i});
                resultLine.um = woRec.getSublistText({sublistId: 'item', fieldId: 'units', line: i});
                resultLine.descp = woRec.getSublistValue({sublistId: 'item', fieldId: 'description', line: i});


                resultData.lines.push({
                    "item_id": resultLine.memberitemid,
                    "item_text": resultLine.memberitem,
                    "qty_required": resultLine.qtyrequired,
                    "unit": resultLine.um,
                    "description": resultLine.descp
                });

                //

            }

            var itemSearchObj = search.load({
            id: invDeatilSearch, //'customsearch_fmt_inventory_details_oh',
            type: 'InventoryBalance',
            filters:
            [
                ["internalid","item", "anyof", itemArr]
            ]
        });

        

        var searchResults = searchAll(itemSearchObj.run());
        var itemWiseInvNums = {};

        for (var s = 0; s < searchResults.length; s++) 
            {
                var sublineVal = {};

                var item = searchResults[s].getValue({name: 'internalid', join : "item", label: "Internal ID"});
                if (!itemWiseWoIssue[itemArr]) {
                    itemWiseWoIssue[itemArr] = [];
                }

                resultLine.inventorynumber = searchResults[s].getText({
                    name: "inventorynumber",
                    label: "Inventory Number"
                }),
                resultLine.expirydate = searchResults[s].getValue({
                    name: "expirationdate",
                    join: "inventoryNumber",
                    label: "Expiration Date"
                }),
                resultLine.qtyissued = searchResults[s].getValue({
                    name: "onhand",
                    label: "On Hand"
                }),
                resultLine.binnumber = searchResults[s].getText({
                   name: "binnumber",
                   label: "Bin Number"
                }),

                sublineVal = {
                    "inventorynumber": resultLine.inventorynumber,
                    "expirydate": resultLine.expirydate,
                    "qtyissued": resultLine.qtyissued,
                    "internalid": item,
                    "binnum": resultLine.binnumber
                };

                if (!itemWiseInvNums[item]) itemWiseInvNums[item] = [];
                itemWiseInvNums[item].push(sublineVal);
            }

            for (var i = 0; i < resultData.lines.length; i++) {
                resultData.lines[i]['sublines'] =  itemWiseInvNums[resultData.lines[i]['item_id']];
            }

            log.debug({title: 'resultData', details: JSON.stringify(resultData)});
			
            var renderer = render.create();
            renderer.setTemplateByScriptId({
                scriptId: scriptObj.getParameter({name: 'custscript_fmt_bomprint'})
            });

            renderer.addCustomDataSource({
                format: render.DataSource.OBJECT,
                alias: "JSON",
                data: {data: resultData}
            });

           if (!!resultData) {
                var invoicePdf = renderer.renderAsPdf();
             log.debug({title: 'invoicePdf', details: invoicePdf});
             
                params.response.writeFile({file: invoicePdf, isInline: true});
            } else {
                params.response.write('There is a problem with BOM PDF');
            }

            //return itemWiseWoIssue;
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
                //log.debug({title: '199',details: allResults});

                var pagedResultsCount = pagedResults != null ? pagedResults.length : 0;
                startIndex += pagedResultsCount;

                var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
                log.debug({title: '207', details: remainingUsage});

            }

            while (pagedResultsCount == RANGECOUNT);

            var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
            log.debug({title: '213', details: remainingUsage});

            return allResults;
        }

        function formatStringField(input) {
            return (input.getMonth() + 1) + "/" + input.getDate() + "/" + input.getFullYear();
        }

        return {
            onRequest: onRequest
        };
    });
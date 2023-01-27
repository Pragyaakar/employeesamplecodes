/**
 * @NApiVersion 2.x
 * 
 */
define(['N/search', 'N/record', 'N/email', 'N/runtime','N/render','N/file','N/format','N/xml'],
    function(search, record, email, runtime,render,file,format,xml) {
        function soCreation(context)
        {
            try
            {
                log.audit('Lib File Call');
                
                var req_Name = context.key;

                var tempmapValueData =  JSON.parse(context.values[0]);
                var trandate = tempmapValueData.tranDate;
                var department_id = tempmapValueData.department;
                var reqtxt = tempmapValueData.requester;
                //log.debug('customer Name', req_txt);

                var loc = tempmapValueData.tranLoc;

                var emailVal = tempmapValueData.emailID;
                log.debug('emailVal', emailVal);

                
                var customerName = createCustomer(emailVal,reqtxt);
                log.audit('customerName', customerName);
                
                var resultData = {};
                resultData = {
                  "custname":customerName,
                  "tran_date": new Date(),
                  "departmentName": department_id,
                  "tranLocation": loc
                };
                log.audit('resultData ====>' , resultData);

                resultData.lines = [];
                
                for(var j = 0; j < context.values.length; j++) {
                    log.audit('length ====>' , context.values.length);

                    resultLine = {};

                    var mapValueData = JSON.parse(context.values[j]);
                    resultLine.description = mapValueData.memo;
                    resultLine.quantity = mapValueData.quantity;
                    resultLine.rate = mapValueData.rate;
                    resultLine.deliveryDate = mapValueData.deliveryDate;
                    resultLine.item = mapValueData.item;
                    resultLine.requiID = mapValueData.int_id;

                    resultData.lines.push(resultLine);
                }

                log.audit('resultData====>' , JSON.stringify(resultData));
                createSalesOrder(resultData);
            }
            catch(e)
            {
                log.audit('ERROR', e.toString());
            }
        }

        function createCustomer(email,employee)
        {
            log.audit('email', email);

            var customerSearchObj = search.create({
               type: "customer",
               filters:
               [
                  ["isinactive","is","F"], "AND" ,["email","is",email]
               ],
               columns:
               [
                  search.createColumn({
                     name: "internalid",
                     sort: search.Sort.ASC,
                     label: "Internal ID"
                  }),
                  search.createColumn({name: "internalid", label: "Internal ID"})
               ]
            });

            var resultSet = searchAll(customerSearchObj.run()); 
           
            var customer_id = "";
            //firstResult.length
            if(resultSet.length<=0)
            {
                var createRec = record.create({
                  type: record.Type.CUSTOMER,
                  isDynamic: true
                });
               
                //Set values in Customer record
                createRec.setValue({
                  fieldId: 'companyname',
                  value: xml.escape(employee)
                });
                
                createRec.setValue({
                  fieldId: 'email',
                  value: email
                });
               
                customer_id = createRec.save(); 
                log.debug('customer_id', customer_id);
            }
            else 
            {
                var results = customerSearchObj.run().getRange({
                  start: 0,
                  end: 1
                });

                for(var i in results) //var i in results
                {
                    //log.debug('Found custom list record', results[i]);
                    customer_id = results[i].getValue({
                        name:'internalid'
                    });
                }
            }
            return customer_id ;
        }
        function createSalesOrder(resultData)
        {
            try
            {
                log.audit('createSalesOrder');
                log.audit(" createSalesOrder resultData", JSON.stringify(resultData));

                var createSO = record.create({
                    type: record.Type.SALES_ORDER,
                    isDynamic: true,
                });

                createSO.setValue({
                    fieldId: 'entity',
                    value: resultData.custname
                });

                resultData.tran_date = format.parse({
                    value: resultData.tran_date,
                    type: format.Type.DATE
                });
              
                createSO.setValue({
                    fieldId: 'trandate',
                    value: resultData.tran_date
                });

                createSO.setValue({
                    fieldId: 'department',
                    value: resultData.departmentName
                });

                createSO.setValue({
                    fieldId: 'location',
                    value: '1' //resultData.tranLocation
                });

                //log.debug('resultData lines',JSON.stringify(resultData.lines));
                var reqIdArr = [];
                var lineArray = resultData.lines;

                for(var count in lineArray)
                {
                    var tran_item = lineArray[count].item;
                    
                    var description_val = lineArray[count].description;
                    
                    var tran_quantity = lineArray[count].quantity;
                    
                    var tran_deliveryDate = lineArray[count].deliveryDate;
                  
                    var tran_rate = lineArray[count].rate;

                    var reqID = lineArray[count].requiID;
                    reqIdArr.push(reqID);
                    
                    //Set Sales order line level fields
                  
                    createSO.selectNewLine({
                        sublistId: 'item'
                    });

                    createSO.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'item',
                        value: tran_item
                    });

                    createSO.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'description',
                        value: description_val
                    });

                    createSO.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        value: tran_quantity
                    });

                    createSO.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'rate',
                        value: tran_rate
                    });


                    if(tran_deliveryDate)
                    {
                        createSO.setCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'expectedshipdate',
                            value: new Date(tran_deliveryDate)
                        });
                    }
                    else
                    {
                        var someDate = new Date();
                        var numberOfDaysToAdd = 2;
                        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);  

                        createSO.setCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'expectedshipdate',
                            value: new Date(someDate)
                        });    
                    }
                    createSO.commitLine('item');
                }

                log.audit('reqIdArr',reqIdArr); 

                createSO.setValue({
                    fieldId: 'custbody_fmt_requisition_reference_num',
                    value: reqIdArr
                });

                var recordId = createSO.save();     
                log.audit('SO recordId',recordId); 
                
                if(recordId)
                {   
                    log.audit('reqIdArr',reqIdArr); 
                    log.audit('Length',reqIdArr.length); 

                    for(var w=0;w<reqIdArr.length;w++)
                    {
                        var reqObj = record.load({
                            type: record.Type.PURCHASE_REQUISITION,
                            id: reqIdArr[w],
                            isDynamic: false,
                        });

                        reqObj.setValue({
                            fieldId: 'custbody_fmt_sales_order_reference',
                            value: recordId
                        }); //approvalstatus

                        var orderStatus = reqObj.getValue({
                            fieldId: 'approvalstatus'
                        });

                        if(orderStatus != 2)
                        {
                            reqObj.setValue({
                                fieldId: 'approvalstatus',
                                value: 2
                            });
                        }
                        
                        var prLineCount = reqObj.getLineCount({
                            'sublistId': 'item'
                        });
                        log.audit('prLineCount',prLineCount);

                        for(var s=0;s<prLineCount;s++)
                        {
                            reqObj.setSublistValue({
                                sublistId:'item',
                                fieldId: 'isclosed',
                                line:s,
                                value: true
                            });
                        }

                        var saveRec = reqObj.save();     
                        log.audit('saveRec',saveRec);
                    } 
                }

            }
            catch(e)
            {
                log.audit('EROR in Sales order creation',e.toString()); 
            }
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
        }//End of SeacrhAll Function

        return{
            soCreation : soCreation
        }
});
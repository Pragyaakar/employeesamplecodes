/**
 * Created by Yanan Chang.
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */
define(["N/record", "N/search", "N/currentRecord", "N/format"],
    function (record, search, currentRecord, format) {

        function fieldChanged(context) {
            var curRecord = context.currentRecord;
            var sublistName = context.sublistId;
            var fieldName = context.fieldId;
            var lineNum = context.line;
            var recordType = curRecord.type;

            //Update margin rate when unit price is input
            try {
                if (sublistName == "item" && fieldName == "rate") {
                    console.log("fieldChanged: unit price is changed", ">>>START<<<");

                    var price = curRecord.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "rate"
                    });

                    var averagecost = curRecord.getCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'averagecost'
                    });

                    if (isEmpty(averagecost) || averagecost == 0) {
                        console.log("record type: " , recordType );

                        if(recordType == record.Type.SALES_ORDER){
                            averagecost = curRecord.getCurrentSublistValue({
                                sublistId: "item",
                                fieldId: "porate"
                            });
                        }else if(recordType == record.Type.ESTIMATE){
                            averagecost = curRecord.getCurrentSublistValue({
                                sublistId: "item",
                                fieldId: "costestimaterate"
                            });
                        }

                    }
                    // console.log("costRate: ", costRate);
                    // console.log("adjusted margin rate: ", amount);
                    // log.debug('test',format.format({value:(((price - averagecost) / averagecost) * 100),type:format.Type.PERCENT}));
                    curRecord.setCurrentSublistValue({
                        sublistId: sublistName,
                        fieldId: 'custcol_item_cost_percentage',
                        value:(((price - averagecost) / price) * 100),
                        // value: format.format({value:(((price - averagecost) / averagecost) * 100),type:format.Type.PERCENT}),
                        ignoreFieldChange: true
                    });

                    console.log("fieldChanged: unit price is changed", ">>>END<<<");
                }
            }
            catch (e1) {
                log.error('ERROR in Rate', JSON.stringify(e1));
            }

            /*try {
                if (sublistName == "item" && fieldName == "amount") {
                    console.log("fieldChanged: amount is changed", ">>>START<<<");

                    var price = record.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "rate"
                    });
                    var quantity = record.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "quantity"
                    });
                    var amount = record.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "amount"
                    });
                    console.log("amount: ", amount);

                    var costRate1 = record.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "costestimate"
                    });

                    console.log("costRate1: ", costRate1);

                    if (isEmpty(costRate1) || costRate1 == 0) {
                        costRate1 = record.getCurrentSublistValue({
                            sublistId: "item",
                            fieldId: "porate"
                        });
                    }
                    console.log("amount : ", amount);

                    record.setCurrentSublistValue({
                        sublistId: sublistName,
                        fieldId: 'custcol_item_cost_percentage',
                        value: ((amount - costRate1) / costRate1) * 100,
                        ignoreFieldChange: true
                        //value: ((amount*100)/(costRate*100) - 1) *100
                    });

                    console.log("fieldChanged: amount is changed", ">>>END<<<");
                }

            } catch (e2) {
                log.error('ERROR in Amount', JSON.stringify(e2));
            }*/

            try {
                if (sublistName === "item" && fieldName == 'custcol_item_cost_percentage') {
                    console.log("fieldChanged on est. extended cost", ">>>START<<<");

                    var averagecost = curRecord.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "averagecost"
                    });
                    var qty = curRecord.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "quantity"
                    });

                    var marginRate = curRecord.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "custcol_item_cost_percentage"
                    });
                    console.log("marginRate: ", marginRate);

                    if (isEmpty(averagecost) || averagecost == 0) {
                        console.log("record type: " , recordType );

                        if(recordType == record.Type.SALES_ORDER){
                            var  averagecostVal = curRecord.getCurrentSublistValue({
                                sublistId: "item",
                                fieldId: "porate"
                            });
                         
                           var  Currency = curRecord.getCurrentSublistValue({
                               sublistId: "item",
                               fieldId: "pocurrency"
                           });
                            
                   
                            
                            	 log.debug("B4 Vencurr: ");
                            	if(Currency == 'USD')
                            	{
                            		log.debug("inside  Currency:2 =",Currency);
                            		var rateExch = currency.exchangeRate({
                                        source: 'USD',
                                        target: 'CAD',
                                        date: new Date()
                                    });
                            		averagecost = averagecostVal * raterateExch;
                            	  log.debug("averagecost in Avg Empty of USA: ", averagecost);
                            		
                            	}
                            	else
                            	{
                            		log.debug("Currency  Vencurr:!=2 ");
                            		 averagecost = curRecord.getCurrentSublistValue({
                                         sublistId: "item",
                                         fieldId: "porate"
                                     });
                            			log.debug("inside  Currency:!=2 =",Currency);
                            		 log.debug("averagecost in Avg Empty of canada: ", averagecost);
                            		 
                            		 
                            	}
                            	
                            
                        }else if(recordType == record.Type.ESTIMATE){
                            averagecost = curRecord.getCurrentSublistValue({
                                sublistId: "item",
                                fieldId: "costestimaterate"
                            });
                        }
                    }
                   
				   var NewPrice = parseFloat( averagecost / (1 - marginRate/100)).toFixed(2);

				   curRecord.setCurrentSublistValue({
                        sublistId: sublistName,
                        fieldId: 'rate',
                        value: NewPrice,
                        ignoreFieldChange: true
                    });

                    curRecord.setCurrentSublistValue({
                        sublistId: sublistName,
                        fieldId: 'amount',
                        value: NewPrice * qty,
                        ignoreFieldChange: true
                    });
                  
                   
                }
            } catch (e3) {
                log.error('ERROR in margin rate', JSON.stringify(e3));
            }
        }


        function isEmpty(stValue) {
            if ((stValue == '') || (stValue == null) || (stValue == undefined)) {
                return true;
            }
            else {
                if (stValue instanceof String) {
                    if ((stValue == '')) {
                        return true;
                    }
                }
                else if (stValue instanceof Array) {
                    if (stValue.length == 0) {
                        return true;
                    }
                }

                return false;
            }
        }


        return {
            fieldChanged: fieldChanged
        }

    });
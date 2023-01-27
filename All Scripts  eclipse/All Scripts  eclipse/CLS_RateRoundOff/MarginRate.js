/**
 * Created by Yanan Chang.
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */
define(["N/record", "N/search", "N/currentRecord", "N/format",'N/currency'],
    function (record, search, currentRecord, format,currency) {

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
                if (sublistName == "item" && fieldName == 'custcol_item_cost_percentage') {
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

                     if (isEmpty(averagecost) || averagecost =='0.00' || averagecost ==null || averagecost ==undefined) {
                         console.log("record type: " , recordType );

                         if(recordType == record.Type.SALES_ORDER)
                         {
                            var  averagecostVal = curRecord.getCurrentSublistValue({
                                 sublistId: "item",
                                 fieldId: "porate"
                             });
                          
                            var  Currency = curRecord.getCurrentSublistValue({
                                sublistId: "item",
                                fieldId: "pocurrency"
                            });
                             
                    
                             
                             	 log.debug("B4 Vencurr: ");
                             	if(Currency == '2' )
                             	{
                             		log.debug("inside  Currency:2 ");
                             		var rateExch = currency.exchangeRate({
                                         source: 'USD',
                                         target: 'CAD',
                                         date: new Date()
                                     });
                             		averagecost = averagecostVal * raterateExch;
                             		//  console.log("averagecost in Avg Empty of USA: ", marginRate);
                             		  log.debug("averagecost in Avg Empty of USA: ", averagecost);
                             		/*  
                             		  curRecord.setCurrentSublistValue({
                                           sublistId: sublistName,
                                           fieldId: 'costestimatetype',
                                           value: 'PURCHORDERRATE'
                                          // ignoreFieldChange: true
                                       });
                             		*/
                             	}
                             	else
                             	{
                             		log.debug("Currency  Vencurr:!=2 ");
                             		 averagecost = curRecord.getCurrentSublistValue({
                                          sublistId: "item",
                                          fieldId: "porate"
                                      });
                             		// console.log("averagecost in Avg Empty of canada: ", marginRate);
                             		 
                             		  log.debug("averagecost in Avg Empty of canada: ", averagecost);
                             		 
                             		 /* curRecord.setCurrentSublistValue({
                                           sublistId: sublistName,
                                           fieldId: 'costestimatetype',
                                           value: 'PURCHORDERRATE'
                                          // ignoreFieldChange: true
                                       });*/
                             	}
                             	
                             
                         }else if(recordType == record.Type.ESTIMATE){
                            var  averag = curRecord.getCurrentSublistValue({
                                 sublistId: "item",
                                 fieldId: "costestimaterate"
                             });
                             
                             
                             var  Currency = curRecord.getCurrentSublistValue({
                                 sublistId: "item",
                                 fieldId: "pocurrency"
                             });
                              
                     
                              
                              	 log.debug("B4 Vencurr: ");
                              	if(Currency == '2' )
                              	{
                              		log.debug("inside  Currency:2 ");
                              		var rateExch = currency.exchangeRate({
                                          source: 'USD',
                                          target: 'CAD',
                                          date: new Date()
                                      });
                              		averagecost = averag * rateExch;
                              		//  console.log("averagecost in Avg Empty of USA: ", marginRate);
                              		  log.debug("averagecost in Avg Empty of USA: ", averagecost);
                              		  
                              		 
                              	}
                              	else
                              	{
                              		log.debug("Currency  Vencurr:!=2 ");
                              		 averagecost = curRecord.getCurrentSublistValue({
                                           sublistId: "item",
                                           fieldId: "costestimaterate"
                                       });
                              		// console.log("averagecost in Avg Empty of canada: ", marginRate);
                              		 
                              		  log.debug("averagecost in Avg Empty of canada: ", averagecost);
                              		
                              	}
                              	
                             
                         }
                        
                     }
                     else if(averagecost !='0.00' || averagecost != null || averagecost !=undefined)
                     {
                     	 curRecord.setCurrentSublistValue({
                              sublistId: sublistName,
                              fieldId: 'costestimatetype',
                              value: 'AVGCOST'
                             // ignoreFieldChange: true
                          });
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
               
            } catch (e2) {
                log.error('ERROR in Margin', JSON.stringify(e2));
            } 
 // ================================= Item Field Change Script =======================================
               
            try {
               
            	if (sublistName == "item" && fieldName == 'item') {
                    console.log("fieldChanged on item", ">>>START<<<");

                    
                    var ItemName = curRecord.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "item"
                    });
                    
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

                    if (isEmpty(averagecost) || averagecost =='0.00' || averagecost == null || averagecost ==undefined) {
                        console.log("record type: " , recordType );

                        if(recordType == record.Type.SALES_ORDER)
                        {
                           var  averagecostVal = curRecord.getCurrentSublistValue({
                                sublistId: "item",
                                fieldId: "porate"
                            });
                         
                           var  Currency = curRecord.getCurrentSublistValue({
                               sublistId: "item",
                               fieldId: "pocurrency"
                           });
                            
                   
                            
                            	 log.debug("B4 Vencurr: ");
                            	if(Currency == '2' )
                            	{
                            		log.debug("inside  Currency:2 ");
                            		var rateExch = currency.exchangeRate({
                                        source: 'USD',
                                        target: 'CAD',
                                        date: new Date()
                                    });
                            		averagecost = averagecostVal * rateExch;
                            		//  console.log("averagecost in Avg Empty of USA: ", marginRate);
                            		  log.debug("averagecost in Avg Empty of USA: ", averagecost);
                            		 /* 
                            		  curRecord.setCurrentSublistValue({
                                          sublistId: sublistName,
                                          fieldId: 'costestimatetype',
                                          value: 'PURCHORDERRATE'
                                         // ignoreFieldChange: true
                                      });*/
                            		
                            	}
                            	else
                            	{
                            		log.debug("Currency  Vencurr:!=2 ");
                            		 averagecost = curRecord.getCurrentSublistValue({
                                         sublistId: "item",
                                         fieldId: "porate"
                                     });
                            		// console.log("averagecost in Avg Empty of canada: ", marginRate);
                            		 
                            		  log.debug("averagecost in Avg Empty of canada: ", averagecost);
                            	/*	 
                            		  curRecord.setCurrentSublistValue({
                                          sublistId: sublistName,
                                          fieldId: 'costestimatetype',
                                          value: 'PURCHORDERRATE'
                                         // ignoreFieldChange: true
                                      });*/
                            	}
                            	
                            
                        }else if(recordType == record.Type.ESTIMATE){
                           var averag = curRecord.getCurrentSublistValue({
                                sublistId: "item",
                                fieldId: "costestimaterate"
                            });
                            
                            
                            var  Currency = curRecord.getCurrentSublistValue({
                                sublistId: "item",
                                fieldId: "pocurrency"
                            });
                             
                    
                             
                             	 log.debug("B4 Vencurr: ");
                             	if(Currency == '2' )
                             	{
                             		log.debug("inside  Currency:2 ");
                             		var rateExch = currency.exchangeRate({
                                         source: 'USD',
                                         target: 'CAD',
                                         date: new Date()
                                     });
                             		averagecost = averag * rateExch;
                             		//  console.log("averagecost in Avg Empty of USA: ", marginRate);
                             		  log.debug("averagecost in Avg Empty of USA: ", averagecost);
                             		  
                             		
                             	}
                             	else
                             	{
                             		log.debug("Currency  Vencurr:!=2 ");
                             		 averagecost = curRecord.getCurrentSublistValue({
                                          sublistId: "item",
                                          fieldId: "costestimaterate"
                                      });
                             		// console.log("averagecost in Avg Empty of canada: ", marginRate);
                             		 
                             	
                             	}
                             	
                            
                        }
                    }
                    else if(averagecost !='0.00' || averagecost != null || averagecost !=undefined)
                    {
                    	 curRecord.setCurrentSublistValue({
                             sublistId: sublistName,
                             fieldId: 'costestimatetype',
                             value: 'AVGCOST'
                            // ignoreFieldChange: true
                         });
                    }
               /*    
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
                    });*/
                }
                
                
                
          //======================== End Of Item field change currency Exchange for USD =============================      
        
            } catch (e3) {
                log.error('ERROR in Item', JSON.stringify(e3));
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


      /*  return {
            fieldChanged: fieldChanged
        }*/
        
        //================================================ Start Line Init =====================================
        
/*        function pageInit(context) {
        	var Record1a = context.currentRecord;
            var sublistName = context.sublistId;
            var itemCount = Record1a.getLineCount('item');
            var line = Record1a.getCurrentSublistIndex({sublistId : 'item'});
            log.debug('line: ', line);
        
            if (itemCount > line) {
                
                var override = Record1a.getCurrentSublistValue({
                  sublistId : 'item',
                  fieldId : 'amount'
                });
              
                var profitCenter = Record1a.getSublistField({
                    sublistId : 'item',
                    fieldId : 'costestimatetype_display',
                    line : line
                  });
                
		                if(override)
		                {
		                  profitCenter.isDisabled = true;
		                 
		                }else
		                {
		                  profitCenter.isDisabled = false;
		                
		                }
                }
             
         
          }*/
          return {
            fieldChanged: fieldChanged
            // pageInit : pageInit
          };
       
       //================================================ End Line Init =====================================

    });
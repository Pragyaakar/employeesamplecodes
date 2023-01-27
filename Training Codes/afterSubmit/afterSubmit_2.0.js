/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(['N/record'],
    function(record) 
    {
        function afterSubmit(context) 
        {
            try
            {
                if(context.type !== 'create')
                {
                    var record1 = context.newRecord;

                    var recordID = context.newRecord.id;
                    log.debug('record created successfully', 'recordID: ' + recordID);

                    var soObj = record.load({
                        type: record.Type.SALES_ORDER,
                        id: recordID,
                        isDynamic: true
                    });
                    log.debug('record created successfully', 'soObj: ' + soObj);  

                    var count = soObj.getLineCount({
                        sublistId:'item'
                    }); 
                    log.debug('record created successfully', 'count: ' + count);  

                    for(var i=0;i<count-1;i++)
                    {
                        var item = soObj.getSublistValue({
                            sublistId:'item',
                            fieldId:'item',
                            line:i
                        });
                        //log.debug('record created successfully', 'item: ' + item); 

                        var asset = soObj.getSublistValue({
                            sublistId:'item',
                            fieldId:'custcol_far_trn_relatedasset',
                            line:i
                        });
                        //log.debug('record created successfully', 'item: ' + item); 
                        log.debug('record created successfully', 'i: ' + i); 

                        if((!asset) && (i%2 == 0))
                        {
                            log.debug('record created successfully', 'i%2: ' + i%2); 

                            var lineNum = soObj.selectLine({
                                sublistId: 'item',
                                line:i
                            });

                            soObj.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_far_trn_relatedasset',
                                value: 2,
                            });

                            soObj.commitLine({
                                sublistId: 'item'
                            });
                        }  
                    }
                    var callId = soObj.save();
                    log.debug('record created successfully', 'Id: ' + callId);  
                } 
            }
            catch(e)    
            {
                log.debug('record created successfully', 'ERROR: ' + e);  
            }  
        }   
        return {
            afterSubmit: afterSubmit
        };
    });

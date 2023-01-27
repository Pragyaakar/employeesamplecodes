/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/error','N/currentRecord'],
    function(error,currentRecord) 
    {
        function postSourcingVal(context) 
        {
            var currentRecord = context.currentRecord;
            var sublistName = context.sublistId;
            var sublistFieldName = context.fieldId;
            
            if(sublistName == 'item' && sublistFieldName == 'item')
            {
                var classVal = currentRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'class'
                });
                log.debug('Class Value',classVal);

                if(classVal == '3')
                {
                    var rateVal = currentRecord.getCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'rate'
                    })
                    log.debug('Rate Value',rateVal);

                    if(rateVal > 1000)
                    {
                        currentRecord.setCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'rate',
                            value: 100
                        });
                    }  
                }
            }
        }
        return{
            postSourcing:postSourcingVal
        }
    });

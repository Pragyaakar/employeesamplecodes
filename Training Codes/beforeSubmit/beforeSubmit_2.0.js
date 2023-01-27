/**
* @NApiVersion 2.0
* @NScriptType UserEventScript
*/

define(['N/log','N/record','N/ui/serverWidget'],
function(log,record,serverWidget) 
{
    function beforeSubmit(context) 
    {
        if (context.type != 'create')//context.UserEventType.CREATE
        {
            var customerRecord = context.newRecord;
            log.debug('Before Load Error',customerRecord);

            customerRecord.setValue('comments', 'Please follow up with this customer!');
        }
    }
    return{
        beforeSubmit:beforeSubmit
    };
});

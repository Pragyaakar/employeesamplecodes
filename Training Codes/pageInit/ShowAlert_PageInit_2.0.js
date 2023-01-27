/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */

define(['N/record','N/ui/dialog','N/log'],
    function(record,dialog,log) {
        function showMessage(context)
        {
            log.debug('context mode',context.mode);
            if (context.mode == 'edit')
            {
                var cust_Id = context.currentRecord.id;
                log.debug('Customer ID',cust_Id);

                var rec_type = context.currentRecord.type;
                log.debug('Record Type',rec_type);

                dialog.alert({
                    title: 'PageInit 2.0 Sample Script',
                    message: 'Record ID : '+' '+cust_Id+' '+'Record Type : '+' '+rec_type
                })
            }
        }
        return{
            pageInit: showMessage
        };
    });
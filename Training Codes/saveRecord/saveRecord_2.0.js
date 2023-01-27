/**
   *@NApiVersion 2.0
   *@NScriptType ClientScript
*/
define(['N/record','N/search','N/ui/dialog', 'N/log'], 
function (record, search, dialog, log) 
{
    function saveRecordExp(context) 
    {
        var currentRecord = context.currentRecord;

        var comments = currentRecord.getValue({
            fieldId: 'memo'
        });

        if (!comments)
        {
            dialog.alert({
                title: 'Comments Needed',
                message: 'Please enter comments for this customer'
            });
            return false;
        }else {
            return true;
        }
    }
    return{
        saveRecord:saveRecordExp
    }
});
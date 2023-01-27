/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/error'],
function(error) {
    function validateFieldValue(context) 
    {
        var currentRecord = context.currentRecord;
        
        if (context.sublistId == 'item' && context.fieldId == 'quantity')
        {
            var quantity = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });

            if (quantity < 3)
            {
                currentRecord.setValue({
                    fieldId: 'memo',
                    value: 'Quantity is less than 3'
                });
            }
            else
            {
                currentRecord.setValue({
                    fieldId: 'memo',
                    value: 'Quantity accepted'
                }); 
            }                
        }
        return true;
    }

    return{
        validateField:validateFieldValue
    };
});
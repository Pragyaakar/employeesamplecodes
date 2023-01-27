/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/error','N/currentRecord'],
 function(error,currentRecord) {
    function setVal(context) 
    {
        var currentRecord = context.currentRecord;
        var sublistName = context.sublistId;
        var sublistFieldName = context.fieldId;
        
        if(sublistName == 'item' && sublistFieldName == 'item')
        {
            var itemName = currentRecord.getCurrentSublistText({
                sublistId: 'item',
                fieldId: 'item'
            });

            currentRecord.setValue({
                fieldId: 'memo',
                value: 'Item: ' + itemName  + ' is selected'
            });

            currentRecord.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                value: '100'
            });
        }      
    }
    return{
        fieldChanged: setVal
    };
});
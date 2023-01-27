/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/error','N/currentRecord'],
 function(error,currentRecord) 
 {
    function lineInit(context) 
    {
        var currentRecord = context.currentRecord;
        var sublistName = context.sublistId;
        var sublistFieldName = context.fieldId;
            
        var department = currentRecord.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'department'
        });
        log.debug('department',department);

        currentRecord.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'department',
            value: 2
        });
    }

    function validateLine(context) 
    {
        var currentRecord = context.currentRecord;
        var sublistName = context.sublistId;
        var sublistFieldName = context.fieldId;
            
        var asset = currentRecord.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'custcol_far_trn_relatedasset'
        })
        log.debug('asset',asset);

        if(!asset)
        {
            currentRecord.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_far_trn_relatedasset',
                value: 1
            });
            return true;
        }
    }

    function validateDeleteExp(context) 
    {
        var currentRecord = context.currentRecord;
        var sublistName = context.sublistId;
        var sublistFieldName = context.fieldId;
          
        var item = currentRecord.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'item'
        })
        log.debug('item',item);

        if(item == '606')
        {
            currentRecord.setValue({
                fieldId: 'memo',
                value: 'Removing partner sublist'
            });
            return true;   
        } 
    }
    return{
        lineInit:lineInit,
        validateLine:validateLine,
        validateDelete:validateDeleteExp
    };
});

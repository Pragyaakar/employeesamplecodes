/**
 * @NApiVersion 2.x
 * @NScriptType ScheduleScript
 * @NModuleScope SameAccount
 */
 define(['N/record'],
 function(record) {
   function executeSavedSearch(scriptContext) {
        var salesOrderRecord = record.delete({
            type: record.Type.PURCHASE_ORDER,
            id: customsearch1798,
        });
   }
 });
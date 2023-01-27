
function myBeforeLoad(type, form, request) {
    var script = "alert(\'Button was clicked from \' + nlapiGetRecordType() + \' in VIEW mode\');";
    var customButton = form.addButton('custpage_mybutton','MyFirstButton',script);

    //form.setScript('customscript_asw_ss_cs_member');
}

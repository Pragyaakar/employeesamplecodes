/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       31 Mar 2020     Tushar
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */


function showROHLForm(request,response){
	 var context = nlapiGetContext();
	 var user = context.getUser();
	 nlapiLogExecution('DEBUG', 'User', user);
	 
 	var form = nlapiCreateForm('ROHL Trial Balance');
	form.setScript('customscript_rohl_client');
	form.addButton('custpage_display_report', 'Search', 'display_report()');
	form.addButton('custpage_excel_report', 'Excel', 'excel_report()');
	var today = new Date();
		var fiscalYear = new Date('1/1/'+today.getFullYear());
		fiscalYear = nlapiDateToString(fiscalYear);
		today = nlapiDateToString(today);
		
	var startDateFld = form.addField('custpage_startdate','date','Start Date')
	startDateFld.setDefaultValue(fiscalYear);
	startDateFld.setMandatory(true);
	var endDateFld = form.addField('custpage_enddate','date','End Date');
	endDateFld.setDefaultValue(today);
	endDateFld.setMandatory(true);
	
	form.addField('custpage_subsidiary', 'select', 'SUBSIDIARY', 'subsidiary').setBreakType('startrow');
	
	var inlineFLd = form.addField('custpage_inline','inlinehtml','inline','custpage_grp_1');
	
	var url = nlapiResolveURL('SUITELET', '', '');
	var parameters = '&startdate='+fiscalYear+'&enddate'+today+'&user='+user;
	url += parameters;
	inlineFLd.setDefaultValue('<div class="holds-the-iframe"><iframe id="rohl_report_view" style="width:95%; height:100%;  position:absolute;" src="'+url+'"></iframe></div>');


	

	response.writePage(form);
}
function isEmpty ( stValue ) {
    if ((stValue == '') || (stValue == null) || (stValue == undefined)) {
        return true;
    }
    else {
        if (stValue instanceof String) {
            if ((stValue == '')) {
                return true;
            }
        }
        else if (stValue instanceof Array) {
            if (stValue.length == 0) {
                return true;
            }
        }
        return false;
    }
}

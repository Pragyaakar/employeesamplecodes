/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Aug 2019     Nileshkumar
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type){
   
}
function display_report(){
	debugger;
	displayExcel_form('form');
}
function excel_report(){
	debugger;
	displayExcel_form('excel');
}
function displayExcel_form(type){

	//alert('search clicked');
	var startDate = nlapiGetFieldValue('custpage_startdate');
	var endDate = nlapiGetFieldValue('custpage_enddate');
	var salesRep = nlapiGetFieldValue('custpage_salesrep');
	var customer = nlapiGetFieldValue('custpage_customer');
	var salesOrder = nlapiGetFieldValue('custpage_salesorder');
    var AllSalesRep = nlapiGetFieldValue('custpage_allrep');
	var all_salesRep = nlapiGetFieldValue('custpage_all_salesrep');
	
	if (!isEmpty(startDate)) {
		if (!isEmpty(endDate)) {
			var startDate_obj = nlapiStringToDate(startDate)
			var enddate_obj = nlapiStringToDate(endDate)

			if (startDate_obj <= enddate_obj) {
				// Logic
				if(!isEmpty(salesRep)){
					// stdt = startDate
					//eddt = endDate
					var parameters = '&stdt='+startDate+'&eddt='+endDate+'&srep='+salesRep;//+'&allrep='+AllSalesRep;
					if(!isEmpty(customer)){
						parameters += '&cus='+customer;
					}
					if(!isEmpty(salesOrder)){
						parameters += '&so='+salesOrder;
					}
					
					if(AllSalesRep =='T')
					{
						var url = nlapiResolveURL('SUITELET','customscript_all_rep_summary_suite','customdeploy_all_rep_summary_suite');
							
					}
					else
					{
						var url = nlapiResolveURL('SUITELET','customscript_new_optimize_profit_report','customdeploy_new_optimize_profit_report');
							
					}
					if(type == 'form'){
						if(all_salesRep == 'T'){
							for_all_sales_rep(startDate,endDate);
						}
						else{
					var iframe = document.getElementById('profitability_report_view');
					iframe.src = url+parameters;
						}
					}
					else if(type == 'excel'){
						if(all_salesRep == 'T'){
							for_all_sales_rep(startDate,endDate);
						}
						else{
						window.location.href = url+parameters+'&exl=t';
						}
					}
					
					
				}
				else{
					alert('Please Select Sales Rep');
					return;
				}
				
			} else {
				alert('Please enter Start date less than end date');
			}
		}
		else{
			alert('Please Enter End Date');
		}
	}
	else{
		alert('Please Enter Start Date');
	}
	
	

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your
 * script deployment.
 * 
 * @appliedtorecord recordType
 * 
 * @param {String}
 *            type Sublist internal id
 * @param {String}
 *            name Field internal id
 * @param {Number}
 *            linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function handleFieldChanged(type, name, linenum){
 if(name == 'custpage_salesorder'){
	 var soId = nlapiGetFieldValue('custpage_salesorder');
	 if(!isEmpty(soId)){
	 var searchResult = nlapiSearchRecord("salesorder",null,
			 [
			    ["type","anyof","SalesOrd"], 
			    "AND", 
			    ["internalid","anyof",soId],"AND",
			 ["mainline","is","true"]
			 ], 
			 [
			 ]
			 );
	 if(isEmpty(searchResult)){
		alert('You can only select Sales Order'); 
		nlapiSetFieldValue('custpage_salesorder', '', false, true);
	 }
 }
 }
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
function for_all_sales_rep(startDate,endDate){
	var profitabilityReport = nlapiCreateRecord('customrecord_profitability_report');
	profitabilityReport.setFieldValue('custrecord_start_date', startDate);
	profitabilityReport.setFieldValue('custrecord_end_date', endDate);
	var context = nlapiGetContext();
	 var user = context.getUser();
	 profitabilityReport.setFieldValue('custrecord_user', user);
	 var profitabilityId = nlapiSubmitRecord(profitabilityReport);
	 var url = nlapiResolveURL('SUITELET','customscript_sl_profitability_report_dtl','customdeploy_sl_profitability_report_dtl');
	 url = url+'&profit_cust='+profitabilityId;
	 window.location.href = url;
}
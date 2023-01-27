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

function pdf_report(){
	debugger;
	displayExcel_form('pdf');
}

function displayExcel_form(type){

	//alert('search clicked');
	var startDate = nlapiGetFieldValue('custpage_startdate');
	var endDate = nlapiGetFieldValue('custpage_enddate');
	var subsi = nlapiGetFieldValue('custpage_subsidiary');
	
	if (!isEmpty(subsi)) {
	if (!isEmpty(startDate)) {
		if (!isEmpty(endDate)) {
			var startDate_obj = nlapiStringToDate(startDate)
			var enddate_obj = nlapiStringToDate(endDate)

			if (startDate_obj <= enddate_obj) {
				// Logic
				
					var parameters = '&stdt='+startDate+'&eddt'+endDate+'&subsi='+subsi;
					
					var url = nlapiResolveURL('SUITELET','','');
					if(type == 'form'){
						
					var iframe = document.getElementById('rohl_report_view');
					iframe.src = url+parameters;
						
					}
					else if(type == 'excel')
					{
						window.location.href = url+parameters+'&exl=t';
						
					}
					else if(type == 'pdf')
					{	window.location.href = url+parameters+'&pdf=t';
						
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
	else{
		alert('Please Enter Subsidiary');
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

/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       02 Aug 2019     Tushar
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
var searchResult2Map = {};
var searchResult3Map = {};
function customerProfitabilityReport_optimizeSuit(request, response){
	nlapiLogExecution('DEBUG', 'Suitelet Execution Started');
	
	var startDate =request.getParameter('stdt');
	var endDate = request.getParameter('eddt');
	var subsidiary = request.getParameter('subsi');
	var isExcel = request.getParameter('exl');
	var ispdf = request.getParameter('pdf');
	
    gatherData(startDate,endDate,subsidiary,isExcel,ispdf);
	

}
function getSavedSearchResult(recType, searchId, filters)
{
    var aSearchResults = [];
    var iRscnt = 1000, min = 0, max = 1000;
    var search = {};
    if (searchId) 
    {
        var search = nlapiLoadSearch(recType, searchId);
        if (filters) 
        {
            search.addFilters(filters);
        }
    }
    

    var rs = search.runSearch();
    try 
    {
        while (iRscnt == 1000) 
        {
            var resultSet = rs.getResults(min, max);
            aSearchResults = aSearchResults.concat(resultSet);
            min = max;
            max += 1000;
            iRscnt = resultSet.length;
        }
    }
    catch (e) 
    {
        nlapiLogExecution('DEBUG', 'getAllResults --> exception', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    }

 //   nlapiLogExecution('DEBUG', 'getAllResults --> Success', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    return aSearchResults;
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

function gatherData(startDate,endDate,subsidiary,isExcel,ispdf){
	
	if(isEmpty(isExcel) && (isEmpty(ispdf))
    {
		
	}
	else if(!isEmpty(isExcel) && (isEmpty(ispdf))
	{
		display_excel(startDate,endDate,subsidiary,isExcel,ispdf);
	}
	else if(isEmpty(isExcel) && (!isEmpty(ispdf))
	{
		display_pdf(startDate,endDate,subsidiary,isExcel,ispdf);
	}
}
function display_excel(startDate,endDate,subsidiary,isExcel,ispdf)
{
	
}
function toFixed_(number){
	if(number != null && number != undefined && number != ''){
var number1 ;
	switch(typeof number){
	case ('number') : 
	 number1 = number.toFixed(2);
						break;
	case ('string') : 
	number1 = parseFloat(number);
	 number1 = number1.toFixed(2);
						break;
	}
number1 = formatNumber (number1);
return number1; 
	}
	else {
return formatNumber (0);
		
	}
}
function formatNumber (num) {
	if(num == null || num == undefined ||num == '')
		{
		num = 0;
		}
	
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function isEmpty ( stValue ) {
    if ((stValue == '') || (stValue == null) || (stValue == undefined)|| (stValue == '- None -')) {//- None -
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
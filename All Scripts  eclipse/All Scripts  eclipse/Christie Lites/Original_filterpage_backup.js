/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       02 Aug 2019     tushar
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function CustomerProfitability_Optimizereport(request, response){
	nlapiLogExecution('DEBUG', 'Execution Started***', '');
	
	showForm(request,response);
}
function showForm(request,response){
	 var context = nlapiGetContext();
	 var user = context.getUser();
	 nlapiLogExecution('DEBUG', 'User', user);
	 
   var userRole =  nlapiGetContext().getRole();
	 
   if(user == '12729')
  {
	  user ='29';
  }
  else if(userRole =='1060' || userRole=='1041'|| userRole =='3')//user == '-5' || user == '12729' || user == '12211' ||||user == '12729'
  {
	  user ='-5';// user = '12211'; //Need to remove before go live (This is for testing)
  }
 else 
  {
    user =user;
  }
	var subordinates = getSubordinates(user);
	 nlapiLogExecution('DEBUG', 'subordinates.length:'+subordinates.length, JSON.stringify(subordinates));
	var form = nlapiCreateForm('Customer Profitability Report');
	form.setScript('customscript_profit_report_client_opti');
	form.addButton('custpage_display_report', 'Search', 'display_report()');
	form.addButton('custpage_excel_report', 'Excel', 'excel_report()');
  
  // var year1 = 2019;
	var today = new Date();
		var fiscalYear = new Date('1/1/'+today.getFullYear());
		fiscalYear = nlapiDateToString(fiscalYear);
		today = nlapiDateToString(today);
  //===========
 
  
 // var yesterday = new Date(year1, 0, 1);
  //var tpd = new Date('1/1/'+yesterday.getFullYear());


  //==============
 
		
	var startDateFld = form.addField('custpage_startdate','date','Start Date')
	startDateFld.setDefaultValue(fiscalYear);
	startDateFld.setMandatory(true);
	var endDateFld = form.addField('custpage_enddate','date','End Date');
	endDateFld.setDefaultValue(today);
	endDateFld.setMandatory(true);
	form.addFieldGroup('custpage_grp_1', 'Report');
	
	form.addField('custpage_allrep', 'checkbox', 'All Rep');
	var checkval = request.getParameter('custpage_allrep');
    var endDte = request.getParameter('custpage_enddate');
	
	 nlapiLogExecution('DEBUG','RECID', "checkval= "+checkval);
	 
	var inlineFLd = form.addField('custpage_inline','inlinehtml','inline','custpage_grp_1');
	
	var url = nlapiResolveURL('SUITELET', 'customscript_new_optimize_profit_report', 'customdeploy_new_optimize_profit_report');
	var parameters = '&stdt='+fiscalYear+'&eddt'+endDte+'&srep='+user+'&allrep='+checkval;
	url += parameters;
	inlineFLd.setDefaultValue('<div class="holds-the-iframe"><iframe id="profitability_report_view" style="width:95%; height:100%;  position:absolute;" src="'+url+'"></iframe></div>');
	
	
	var salesRepFld = form.addField('custpage_salesrep', 'select', 'SELECT SALES REP');
  salesRepFld.setDefaultValue(user);
	salesRepFld.setBreakType('startcol');
	salesRepFld.setMandatory(true);
	
	if(user ='29' || user =='-5')
	{
	   	var filters = new Array();
		//filters[filters.length] = new nlobjSearchFilter('supervisor', null, 'anyof', user);
	      var columns = new Array();
	  	
			 columns[0] = new nlobjSearchColumn("internalid"); 
			 columns[1] =  new nlobjSearchColumn("entityid");
		  var searchResults = nlapiSearchRecord('employee','customsearch_employe_supervisor',filters,columns);

			nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);

			for (result in searchResults)
		 	{	
				 salesRepFld.addSelectOption(searchResults[result].getValue("internalid"), searchResults[result].getValue("entityid"));
		    }
		
	}
	else
	{
		if(!isEmpty(subordinates)){
			for (var subordinatesIndex = 0; subordinatesIndex < subordinates.length; subordinatesIndex++) {
				// nlapiLogExecution('DEBUG', 'subordinates[subordinatesIndex]:'+subordinates[subordinatesIndex].id,'subordinates[subordinatesIndex].Name:'+subordinates[subordinatesIndex].name);		
				if(!isEmpty(subordinates[subordinatesIndex])){
					if(subordinates[subordinatesIndex].id == user)
						{salesRepFld.addSelectOption(subordinates[subordinatesIndex].id , subordinates[subordinatesIndex].name,true);}
					else{
						salesRepFld.addSelectOption(subordinates[subordinatesIndex].id , subordinates[subordinatesIndex].name);
					}
				}
			}
		}
	}
	
	form.addField('custpage_customer', 'select', 'SELECT CUSTOMER', 'customer').setBreakType('startrow');
	form.addField('custpage_salesorder', 'select', 'SELECT ORDER', 'salesorder').setBreakType('startcol');
	
	
	// Default Values
	var userRole = nlapiGetContext().getRole();
	var user = nlapiGetContext().getUser();
	nlapiLogExecution('DEBUG', 'user', user);
	//inlineFLd.setBreakType('startrow');
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
function subOrdinates(emp){
	var emps=[];
	for(var empIndex=0; empIndex<emp.length;empIndex++){
	var oneEmp  = emp[empIndex].id;
	emps=emps.concat(oneEmp);
	}
   nlapiLogExecution('DEBUG', 'emps', JSON.stringify(emps));
	var searchResult = nlapiSearchRecord("employee",null,
	[
	   ["supervisor","anyof",emps], 
	   "AND", 
	   ["isinactive","is","F"]
	], 
	[
	   new nlobjSearchColumn("entityid").setSort(false), 
	   new nlobjSearchColumn("email"), 
	   new nlobjSearchColumn("phone"), 
	   new nlobjSearchColumn("altphone"), 
	   new nlobjSearchColumn("fax"), 
	   new nlobjSearchColumn("supervisor"), 
	   new nlobjSearchColumn("title"), 
	   new nlobjSearchColumn("altemail"), 
	   new nlobjSearchColumn("custentity_commission_rate")
	]
	);
	if(searchResult != null && searchResult != undefined && searchResult != ''){
	var empArr=[];
		for(var index=0;index<searchResult.length;index++){
		var empId = searchResult[index].getId();
	 var empName = searchResult[index].getValue(new nlobjSearchColumn("entityid"));
	var idName = {};
	idName['id']=empId;
	idName['name'] = empName;
	empArr.push(idName);
	}
	return empArr.concat(subOrdinates( empArr));
	}
	else if(searchResult == null || searchResult == undefined || searchResult == '')
	return ;
	}
function getSubordinates(user){
	var subordinates =[];
	subordinates = subOrdinates([{'id':''+user,'name':userName}]);
	var userName = nlapiLookupField('employee', user, 'entityid');
	if(isEmpty(subordinates)){
		subordinates =[];
	}
	subordinates.push({'id':''+user,'name':userName});
	//Sorting Array of map by values
	return subordinates.sort(function (a, b) {
		    return a.name.localeCompare(b.name);
		});
}
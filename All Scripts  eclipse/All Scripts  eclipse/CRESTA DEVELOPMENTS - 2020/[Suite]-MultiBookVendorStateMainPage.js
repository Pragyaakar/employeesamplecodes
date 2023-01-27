function prepareVendorStatementCriteriaMultiBook(request, response)
{
	nlapiLogExecution('DEBUG','prepareVendorStatementCriteria', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','prepareVendorStatementCriteria', "in GET = ");
		
		var startdate = request.getParameter('startdate');
		var enddate = request.getParameter('enddate');
		var email_criteria = request.getParameter('email');
	//	var subsidiary_criteria = request.getParameter('subsidiary');   */
		
		var form = nlapiCreateForm("Multi Book Vendor Statement");
		
		// ======= ADD FIELDS ========
		form.addField('custpage_alphbets_one', 'radio','Primary Book Report','b'); 
		form.addField('custpage_alphbets_one', 'radio','Secondary Book Report','c'); 
		form.getField('custpage_alphbets_one', 'b').setDefaultValue('b'); 
	    
		
		var usr =nlapiGetUser();
		var role =nlapiGetRole();
		
		if(role!='3')
		{
			var userSubsi =nlapiLookupField('employee',usr,'subsidiary');
			var filter =["subsidiary","anyof",userSubsi];
		}
		else
		{
			var filter =null;
			
		}
		
	var vendorName = form.addField('custpage_vendorname_multi', 'select', 'Vendor');
		//vendorName.addSelectOption('', ' ');
		//populateVendorList(vendorName);
		  var searchResults = nlapiSearchRecord('vendor','customsearch_vendor_search_namewise',filter,[new nlobjSearchColumn('altname')]);

			nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);

			for (result in searchResults)
		
	         	{	
				
	                vendorName.addSelectOption(searchResults[result].getId(), searchResults[result].getValue('altname'));
			        vendorName.setMandatory(true);
		        }
			
			var cust_criteria = request.getParameter('custpage_vendorname_multi');
			
			var subsidiary = form.addField('cust_subsidiary_multi', 'select', 'subsidiary');
			subsidiary.addSelectOption('', ' ')
			populateSubsidaryList(subsidiary,cust_criteria)
			subsidiary.setDisplayType('inline');
			
		var startDateField = form.addField('cust_firstdate', 'date', 'Start Date');
		startDateField.setMandatory(true);
	//	startDateField.setLayoutType('normal','')
		
		if(startdate != null && startdate != '' && startdate != undefined)
		{
			startDateField.setDefaultValue(startdate);
		}
		
		startDateField.setLayoutType('normal','startcol')
		var today = new Date();
		var dd = today.getDate();
       //  var n = today.toLocaleDateString();
		var mm = today.getMonth() +parseInt(1); 
		var yyyy = today.getFullYear();
		if(dd<10) 
		{
			dd='0'+dd;
		} 

		if(mm<10) 
		{
			mm='0'+mm;
		} 
		
		today = dd+'/'+mm+'/'+yyyy;
		
	var endDateField = form.addField('cust_seconddate', 'date', 'End Date');
	endDateField.setDefaultValue(today);
	endDateField.setMandatory(true);
		
		
		if(role == '1150' || role == '1147' || role == '1124' || role == '1142' || role == '1139' || role == '1123'||role == '1122'||role == '1140'||role == '1131'||role == '1141'||role == '1130'||role == '1148'||role == '1149'||role == '1151'||role == '1152'||role=='1135'||role=='1138'||role=='1144'||role=='1136'||role=='1127'||role=='1143'||role=='1146')
		{
			throw nlapiCreateError('ERROR',"Permission Error: You are not allowed to view this record..!!", false); 
		}
		//var currency = form.addField('currency', 'select', 'Currency');
		//currency.addSelectOption('1','INR');
		//currency.addSelectOption('2','MultiCurrency');

		// ==== CALL A CLIENT SCRIPT ====
		form.setScript('customscript_multi_book_client_call_stat');
       
	    // ==== ADD A BUTTON =====
	   	form.addButton('custombutton', 'Print Statement in PDF', 'multibookstatementClient()');
		
      // 	form.addButton('custombutton', 'Print statement in Excel', 'clientScriptExcel_createrecord()');
		
           	form.addButton('custombutton', 'Cancel', 'refresh()');
		
      	response.writePage(form);

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','prepareVendorStatementCriteria', "in POST   ");
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','prepareVendorStatementCriteria', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}// END prepareVendorStatementCriteria()


function populateSubsidaryList(subsidiary,cust_criteria)
{
	var filters = new Array();
	var column = new Array();
	
	if (cust_criteria != null && cust_criteria != '' && cust_criteria != undefined && cust_criteria != '1') 
	{
		filters[0] = new nlobjSearchFilter('entity', null, 'is', cust_criteria)
	}
	column[0] = new nlobjSearchColumn('internalid')
	column[1] = new nlobjSearchColumn('name')
	
	var loc_s_searchresult = nlapiSearchRecord('subsidiary', null, filters, column)
	
	if (loc_s_searchresult != null && loc_s_searchresult != '' && loc_s_searchresult != undefined) {
	
		nlapiLogExecution('DEBUG', 'pupulate location', 'loc_s_searchresult--->' + loc_s_searchresult)
		
		for (var i = 0; i < loc_s_searchresult.length; i++) 
		{
		
			subsidiary.addSelectOption(loc_s_searchresult[i].getValue('internalid'), loc_s_searchresult[i].getValue('name'))
			
		}
	}
}


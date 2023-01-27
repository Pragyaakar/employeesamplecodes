function prepareVendorStatementNewOne(request, response)
{
	nlapiLogExecution('DEBUG','prepareVendorStatementCriteria', "Request Method = " +request.getMethod());
	
	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','prepareVendorStatementCriteria', "in GET = ");
		
		var startdate = request.getParameter('startdate');
		var enddate = request.getParameter('enddate');
		var email_criteria = request.getParameter('email');
		
		var form = nlapiCreateForm("Vendor Statement");
		
		// ======= ADD FIELDS ========
		form.setScript('customscript_client_on_call_statement1');
		
		var customerName = form.addField('custpage_vendorname','select','Vendor');
		customerName.addSelectOption('','');
		//populateVendorList(vendorName);
		
		var custName = request.getParameter('custpage_vendorname');
		nlapiLogExecution('debug','Search Values','custName := ' + custName);	
		
		var searchResults = nlapiSearchRecord('vendor','customsearch_vendor_search_namewise',null,[new nlobjSearchColumn('altname')]);
		nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);

		for(result in searchResults)
		{	
			customerName.addSelectOption(searchResults[result].getId(), searchResults[result].getValue('altname'));
		    customerName.setMandatory(true);
	        //nlapiLogExecution('debug','Search Values','vendorName := '+vendorName);
		}		
			
		var subsidiary = form.addField('custpage_subsidiary', 'select', 'subsidiary');//,'subsidiary');//.setDisplayType('disabled');;
		//subsidiary.setDisplayType('disabled');
	    
		var currency = form.addField('custpage_currency','select','currency');//,'subsidiary');//.setDisplayType('disabled');;
		//subsidiary.setDisplayType('disabled');
		
		if(custName != null && custName != '' && custName!=undefined)
		{	
			customerName.setDefaultValue(custName);
			var customerSearch  = nlapiSearchRecord("vendor",null,
        		[
        		   ["internalid","is",custName],
        		   "AND", 
        		   ["isinactive","is","F"]
        		], 
        		[
        		   new nlobjSearchColumn("entityid").setSort(false), 
        		   new nlobjSearchColumn("internalid","mseSubsidiary",null), 
        		   new nlobjSearchColumn("namenohierarchy","mseSubsidiary",null) 
        		   
        		]
        		);
		
			for (result1 in customerSearch)
			{	
				subsidiary.addSelectOption(customerSearch[result1].getValue("internalid","mseSubsidiary"), customerSearch [result1].getValue("namenohierarchy","mseSubsidiary"));
				subsidiary.setMandatory(true);
				//nlapiLogExecution('debug','Search Values','subsidiary := '+subsidiary);
			}
			 
		/*	var searchResults1 = nlapiSearchRecord('vendor','customsearch_vendor_search_currency',[new nlobjSearchFilter("internalid",null,"anyof",custName)],[new nlobjSearchColumn("currency","VendorCurrencyBalance")]);
			nlapiLogExecution('debug','Search Values','searchResults1.length := '+searchResults1.length);
	
			for(result2 in searchResults1)
			{	
			    currency.addSelectOption(searchResults1[result2].getValue("currency","VendorCurrencyBalance"),searchResults1[result2].getValue("currency","VendorCurrencyBalance"));
		        currency.setMandatory(true);
		        //nlapiLogExecution('debug','Search Values','currency := '+currency);
			}	*/
		}	    
	    
	   // var opentran = form.addField('custpage_opentran', 'checkbox','Open Transaction');
	    
		var startDateField = form.addField('startdate', 'date', 'Start Date');
		startDateField.setMandatory(true);
		//startDateField.setLayoutType('normal','')
		
		if(startdate != null && startdate != '' && startdate != undefined)
		{
			startDateField.setDefaultValue(startdate);
		}
		
		var endDateField = form.addField('enddate', 'date', 'End Date');
		endDateField.setMandatory(true);
		if(enddate != null && enddate != '' && enddate != undefined)
		{
			endDateField.setDefaultValue(enddate);
		}
		
		//var currency = form.addField('currency', 'select', 'Currency');
		//currency.addSelectOption('1','INR');
		//currency.addSelectOption('2','MultiCurrency');

		// ==== CALL A CLIENT SCRIPT ====
		
       
	    // ==== ADD A BUTTON =====
		form.addButton('custombutton', 'Print statement in PDF', 'clientScriptPDF_createrecord()');
		
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


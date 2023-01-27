=============================

function prepareVendorStatementCriteria(request, response)
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
		
		var form = nlapiCreateForm("Vendor Statement");
		
		// ======= ADD FIELDS ========
		
	    
	var vendorName = form.addField('custpage_vendorname', 'select', 'Vendor');
		vendorName.addSelectOption('-1', ' ');
		//populateVendorList(vendorName);
		  var searchResults = nlapiSearchRecord('vendor','customsearch_vendor_search_namewise',null,[new nlobjSearchColumn('altname')]);

			nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);

			for (result in searchResults)
		
	         	{	
				
	                 vendorName.addSelectOption(searchResults[result].getId(), searchResults[result].getValue('altname'));
			        vendorName.setMandatory(true);
		         nlapiLogExecution('debug','Search Values','vendorName := '+vendorName);
		
	              	}
		
		
		
		
		
		
		var startDateField = form.addField('startdate', 'date', 'Start Date');
		startDateField.setMandatory(true);
	//	startDateField.setLayoutType('normal','startcol')
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
		form.setScript('customscript_client_on_call_statement');
       
	    // ==== ADD A BUTTON =====
	   	form.addButton('custombutton', 'Print statement in PDF', 'clientScriptPDF_createrecord();');
		
           	form.addButton('custombutton', 'Print statement in Excel', 'clientScriptExcel_createrecord();');
		
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




function  HTMLDesign_Vendor_statPDF_Callschedule(request, response)
{	
	if (request.getMethod() == 'GET') 
	{
	
		nlapiLogExecution('DEBUG','HTMLDesign_Vendor_statPDF_Callschedule', "in GET  ");
		
		var params = new Array();
		var record_id = request.getParameter('venstatsubmitid');
		if (record_id != null && record_id != undefined && record_id != '') 
		{
		params['custscript_venstatid'] = record_id;
		var status = nlapiScheduleScript('customscript_sched_vendor_stmt', null, params);
		nlapiLogExecution('DEBUG', 'Script Scheduled ', ' Script Status -->' + status);
		
		nlapiSetRedirectURL('RECORD', 'customrecord_vendor_statement_detail_rec', record_id, 'VIEW');
	}
	}
	
}// END prepareVendorStatementCriteria()


// END OBJECT CALLED/INVOKING FUNCTION =====================================================

function salesPersonInventroySuitelet(request, response)
{
	nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in GET = ");
	
		
		var form = nlapiCreateForm("Quantity REmaining");
		
		form.setScript('customscript_client_order_requisition');
		// ======= ADD FIELDS ========
		var subsidiary = form.addField('custpage_subsidiary', 'select', 'subsidiary', 'subsidiary');
		subsidiary.setMandatory(true);
		
		var pr_type = form.addField('custpage_pr_type', 'select', 'PR Type','784');
		pr_type.setMandatory(true);
		
		
        var User = nlapiGetUser();
        var UserRole = nlapiGetRole();
  		if(UserRole != 3)
         {
           	var subsi = nlapiLookupField('employee',User,'subsidiary');
           if(subsi)
            {
               //  nlapiSetFieldValue('subsidiary',subsi);
                subsidiary.setDefaultValue(subsi);
                subsidiary.setDisplayType('disabled');
            }
         }
     
	
	    nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in GET below Form= ");
	    
	    
		
	
		
	/*	var locationField = form.addField('locationname', 'select', 'Location');
		locationField.addSelectOption('', ' ');
		populateLocationList(locationField);  */
		
		   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Customise','custpage_sample_tab');
		   ItemSublist.addField('custpage_chechbox','checkbox'); 
		   ItemSublist.addField('custpage_reqi', 'text', 'REQUISITION #')
		   ItemSublist.addField('custpage_item','select','Item','ITEM');
      	   ItemSublist.addField('custpage_description','text','DESCRIPTION');
		   ItemSublist.addField('custpage_unit', 'text', 'UNIT');
		   ItemSublist.addField('custpage_type', 'text', 'TYPE');
		   ItemSublist.addField('custpage_subsidiary','select', 'SUBSIDIARY','subsidiary');
		   ItemSublist.addField('custpage_currency','select', 'CURRENCY','currency');
		   ItemSublist.addField('custpage_department','select', 'DEPARTMENT','department');
		   ItemSublist.addField('custpage_class','select', 'CLASS','class');
		   ItemSublist.addField('custpage_location','select', 'LOCATION','location');
		   ItemSublist.addField('custpage_order_amount', 'float', 'ORDER AMOUNT');
		   
		// ==== CALL A CLIENT SCRIPT ====
	//	form.setScript('customscript_client_order_requisition');

	    // ==== ADD A BUTTON =====
	   	form.addButton('custombutton', 'Submit', 'redirectSuite();');
		
	
		
		form.addButton('custombutton', 'Reset', 'refresh();');
		
		//form.addButton('custombutton', 'Download CSV', 'download_csv()');*/
		
      	response.writePage(form);

      	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST   ");
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}// END orderRequisitionSuitelet()


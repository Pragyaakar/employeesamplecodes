
function orderRequisitionSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in GET = ");
	
		
		var form = nlapiCreateForm("ROHL Order Requisition");
		
		form.setScript('customscript_client_order_requisition');
		// ======= ADD FIELDS ========
		var subsidiary = form.addField('custpage_subsidiary', 'select', 'subsidiary', 'subsidiary');
		subsidiary.setMandatory(true);
		
		
	
	    nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in GET below Form= ");
	    
	    
		
	
		
	/*	var locationField = form.addField('locationname', 'select', 'Location');
		locationField.addSelectOption('', ' ');
		populateLocationList(locationField);  */
		
		   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Customise','custpage_sample_tab');
		   ItemSublist.addField('custpage_chechbox','checkbox'); 
		   ItemSublist.addField('custpage_reqi', 'text', 'REQUISITION #')
		   ItemSublist.addField('custpage_item','select','Item','ITEM');
		   ItemSublist.addField('custpage_unit', 'text', 'UNIT');
		   ItemSublist.addField('custpage_type', 'text', 'TYPE');
		   ItemSublist.addField('custpage_subsidiary','select', 'SUBSIDIARY','subsidiary');
		   ItemSublist.addField('custpage_currency','select', 'CURRENCY','currency');
		   ItemSublist.addField('custpage_department','select', 'DEPARTMENT','department');
		   ItemSublist.addField('custpage_class','select', 'CLASS','class');
		   ItemSublist.addField('custpage_location','select', 'LOCATION','location');
		   ItemSublist.addField('custpage_order_amount', 'float', 'ORDER AMOUNT');
		   
		// ==== CALL A CLIENT SCRIPT ====
		form.setScript('customscript_client_order_requisition');

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



// BEGIN OBJECT CALLED/INVOKING FUNCTION ===================================================

function populateVendorList(vendorName)
{
	var filters = new Array();
	var column = new Array();
	nlapiLogExecution('DEBUG','populateVendorList', " vendor");	
	
	filters[0] = new nlobjSearchFilter('isinactive', null, 'is', 'F')
	
	column[0] = new nlobjSearchColumn('internalid')
	// column[1] = new nlobjSearchColumn('altname')
	column[2] = new nlobjSearchColumn('entityid')
	
	
	var s_searchresult = nlapiSearchRecord('vendor', null, filters, column)
	
	if (s_searchresult != null && s_searchresult != '' && s_searchresult != undefined) {
	
		nlapiLogExecution('DEBUG', 'pupulate vendor name', 's_searchresult--->' + s_searchresult)
		
		for (var i = 0; i < s_searchresult.length; i++) 
		{
		
			vendorName.addSelectOption(s_searchresult[i].getValue('internalid'), s_searchresult[i].getValue('entityid'))  // +' '+s_searchresult[i].getValue('altname')
			
		}
	}
	
}

/*
function populateLocationList(locationField)
{
	
	nlapiLogExecution('DEBUG','populateLocationList', " locationField  ");	
	var filters = new Array();
	var column = new Array();
	
	
	column[0] = new nlobjSearchColumn('internalid')
	column[1] = new nlobjSearchColumn('name')
	
	var loc_s_searchresult = nlapiSearchRecord('location', null, filters, column)
	
	if (loc_s_searchresult != null && loc_s_searchresult != '' && loc_s_searchresult != undefined) {
	
		nlapiLogExecution('DEBUG', 'pupulate location', 'loc_s_searchresult--->' + loc_s_searchresult)
		
		for (var i = 0; i < loc_s_searchresult.length; i++) 
		{
		
			locationField.addSelectOption(loc_s_searchresult[i].getValue('internalid'), loc_s_searchresult[i].getValue('name'))
			
		}
	}
}

*/
// END OBJECT CALLED/INVOKING FUNCTION =====================================================

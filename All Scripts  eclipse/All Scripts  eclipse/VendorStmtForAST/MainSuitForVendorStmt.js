// BEGIN SCRIPT DESCRIPTION BLOCK  ==================================
{
/*
   	Script Name:Sut_Customer_Statment_updated
	Author:		Tushar
	Company:	Aarialife Tech Pvt Ltd
	Date:		
	Description:create an Customer statment Criteria form


	Script Modification Log:

	-- Date --			-- Modified By --				--Requested By--				-- Description --
	

Below is a summary of the process controls enforced by this script file.  The control logic is described
more fully, below, in the appropriate function headers and code blocks.


     SUITELET
		- suiteletFunction(request, response)


     SUB-FUNCTIONS
		- The following sub-functions are called by the above core functions in order to maintain code
            modularization:

               - NOT USED

*/
}
// END SCRIPT DESCRIPTION BLOCK  ====================================



// BEGIN GLOBAL VARIABLE BLOCK  =====================================
{
	//  Initialize any Global Variables, in particular, debugging variables...




}
// END GLOBAL VARIABLE BLOCK  =======================================





// BEGIN SUITELET ==================================================

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
		var cust_criteria = request.getParameter('custpage_vendorname');   
		
		var form = nlapiCreateForm("Print Vendor Statement");
		
		// ======= ADD FIELDS ========
		//var Type = form.addField('custpage_type', 'select', 'Type', 'customlist_cust_type_list');
	    //Type.setMandatory(true);
	
	    //nlapiLogExecution('DEBUG','prepareCustomerStatementCriteria', "in GET below Form= ");
	
		var vendorName  = form.addField('custpage_vendorname', 'select', 'Vendor','vendor');//multi
		vendorName.setMandatory(true);
		if(cust_criteria != null && cust_criteria != '' && cust_criteria != undefined)
		{
			vendorName.setDefaultValue(cust_criteria);
		}
		
		vendorName.setDisplayType('normal');
		
		var subsidiary = form.addField('subsidiary', 'select', 'subsidiary');
		subsidiary.addSelectOption('', ' ')
		populateSubsidaryList(subsidiary,cust_criteria)
	
		var startDateField = form.addField('startdate', 'date', 'Start Date');
		startDateField.setMandatory(true);
	//	startDateField.setLayoutType('normal','startcol')
		/*if(startdate != null && startdate != '' && startdate != undefined)
		{
			startDateField.setDefaultValue(startdate);
		}*/
		
		var endDateField = form.addField('enddate', 'date', 'Statement Date');
		endDateField.setMandatory(true);
	/*	if(enddate != null && enddate != '' && enddate != undefined)
		{
			endDateField.setDefaultValue(enddate);
		}*/
		
		//var currency = form.addField('currency', 'select', 'Currency');
		//currency.addSelectOption('1','INR');
		//currency.addSelectOption('2','MultiCurrency');

		// ==== CALL A CLIENT SCRIPT ====
		form.setScript('customscript208');
       
	    // ==== ADD A BUTTON =====
	   	form.addButton('custombutton', 'Print statement in PDF', 'clientScriptPDF_createrecord()');
		

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
// END OBJECT CALLED/INVOKING FUNCTION =====================================================

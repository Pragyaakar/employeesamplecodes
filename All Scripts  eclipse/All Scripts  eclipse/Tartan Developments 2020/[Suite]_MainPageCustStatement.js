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

function custStatementCriteria(request, response)
{
	
	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		//nlapiLogExecution('DEBUG','prepareCustomerStatementCriteria', "in GET = ");
		
		var user = nlapiGetUser();
		var role = nlapiGetRole();
	if(role == 3)
	{
		
		var startdate = request.getParameter('startdate');
		var enddate = request.getParameter('enddate');
		var email_criteria = request.getParameter('email');
		var cust_criteria = request.getParameter('custpage_customername');   
		
		var form = nlapiCreateForm("Print Customer Statement");
		
		var customerName  = form.addField('custpage_customername','select','Customer','customer');//multi
		customerName.setMandatory(true);
		if(cust_criteria != null && cust_criteria != '' && cust_criteria != undefined)
		{
			customerName.setDefaultValue(cust_criteria);
		}
		
		customerName.setDisplayType('normal');
		
	
		
		var subsidiary = form.addField('subsidiary', 'select', 'subsidiary');
		subsidiary.addSelectOption('', ' ')
		populateSubsidaryList(subsidiary,cust_criteria)
	
		 var opentran = form.addField('custpage_opentran','checkbox','Open Transaction');
		 var asofDate = form.addField('custpage_asofdate', 'date', 'As Of Date');//.setDisplayType('disabled');
   		
		var startDateField = form.addField('startdate', 'date', 'Statement Start Date');
		startDateField.setMandatory(true);
	//	startDateField.setLayoutType('normal','startcol')
		if(startdate != null && startdate != '' && startdate != undefined)
		{
			startDateField.setDefaultValue(startdate);
		}
		
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
			
			//today = mm+'/'+dd+'/'+yyyy;
			
			today = dd+'/'+mm+'/'+yyyy;
      
		var endDateField = form.addField('enddate', 'date', 'Statement Date');//.setDisplayType('disabled');;
		endDateField.setDefaultValue(today);
		endDateField.setMandatory(true);
		
		var bal = form.addField('custpage_bal', 'float', 'Balance').setDisplayType('disabled');
		var email = form.addField('custpage_mail', 'text', 'Customer Email').setDisplayType('hidden');
		
      //nlapiLogExecution('DEBUG', 'pupulate location', 'endDateField--->' + endDateField + 'startDateField ' +startDateField)
      
      
	/*	if(enddate != null && enddate != '' && enddate != undefined)
		{
			endDateField.setDefaultValue(enddate);
		}*/
		
		//var currency = form.addField('currency', 'select', 'Currency');
		//currency.addSelectOption('1','INR');
		//currency.addSelectOption('2','MultiCurrency');

		// ==== CALL A CLIENT SCRIPT ====
		form.setScript('customscript_cls_custstatementvalid');
       
	    // ==== ADD A BUTTON =====
		form.addButton('custombutton', 'Export in Excel', 'clientScriptExcel_createrecord()');
		form.addButton('custombutton', 'Export in PDF', 'clientScriptPDF_createrecord()');
		form.addButton('custombutton', 'Email Excel Copy', 'clientScriptExcelEmail_createrecord()');		
		form.addButton('custombutton', 'Email PDF Copy', 'clientScriptPDFEmail_createrecord()');	   	
		form.addButton('custombutton', 'Cancel', 'refresh()');
	
		
      	response.writePage(form);

    }
	
	else
	{
		var startdate = request.getParameter('startdate');
		var enddate = request.getParameter('enddate');
		var email_criteria = request.getParameter('email');
		var cust_criteria = request.getParameter('custpage_customername');   
		
		var form = nlapiCreateForm("Print Customer Statement");
		var userInfo = "In order to find the Customer please use Ctrl+F"
          		var info = form.addField('custpage_info', 'text','Note').setDisplayType('inline');
          		info.setDefaultValue(userInfo);
		var customerName  = form.addField('custpage_customername','select','Customer');//multi
		customerName.setMandatory(true);
		customerName.addSelectOption('-1','');	
		
		if(cust_criteria != null && cust_criteria != '' && cust_criteria != undefined)
		{
			customerName.setDefaultValue(cust_criteria);
		}
		
		customerName.setDisplayType('normal');
		
		var subsidiary = form.addField('subsidiary', 'select', 'subsidiary');
		subsidiary.addSelectOption('', ' ')
		populateSubsidaryList(subsidiary,cust_criteria)
	
		if(user != null && user != '' && user != undefined)
		{
			var getSubsi = nlapiLookupField('employee',user,'subsidiary');
		
			if(getSubsi != null && getSubsi != '' && getSubsi != undefined)
			{
				var searchResults = nlapiSearchRecord('customer','customsearch_customer_for_statement',[new nlobjSearchFilter("internalid","msesubsidiary","anyof",getSubsi)],[new nlobjSearchColumn('altname')]);
				nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);

				for (result in searchResults)
				{	
					customerName.addSelectOption(searchResults[result].getId(),searchResults[result].getValue('altname'));
					customerName.setMandatory(true);
					//nlapiLogExecution('debug','Search Values','customerName := '+customerName);
				}		
			}
			
		}
			
		var opentran = form.addField('custpage_opentran','checkbox','Open Transaction');
		
		var startDateField = form.addField('startdate', 'date', 'Statement Start Date');
		startDateField.setMandatory(true);
	//	startDateField.setLayoutType('normal','startcol')
		if(startdate != null && startdate != '' && startdate != undefined)
		{
			startDateField.setDefaultValue(startdate);
		}
		
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
			
			//today = mm+'/'+dd+'/'+yyyy;
			
			today = dd+'/'+mm+'/'+yyyy;
      
		var endDateField = form.addField('enddate', 'date', 'Statement End Date');//.setDisplayType('disabled');;
		endDateField.setDefaultValue(today);
		endDateField.setMandatory(true);
      
      //nlapiLogExecution('DEBUG', 'pupulate location', 'endDateField--->' + endDateField + 'startDateField ' +startDateField)
      
      
	/*	if(enddate != null && enddate != '' && enddate != undefined)
		{
			endDateField.setDefaultValue(enddate);
		}*/
		
		//var currency = form.addField('currency', 'select', 'Currency');
		//currency.addSelectOption('1','INR');
		//currency.addSelectOption('2','MultiCurrency');

		// ==== CALL A CLIENT SCRIPT ====
		form.setScript('customscript_cls_custstatementvalid');
       
	    // ==== ADD A BUTTON =====
		form.addButton('custombutton', 'Export in Excel', 'clientScriptExcel_createrecord()');
		form.addButton('custombutton', 'Export in PDF', 'clientScriptPDF_createrecord()');
		form.addButton('custombutton', 'Email Excel Copy', 'clientScriptExcelEmail_createrecord()');		
		form.addButton('custombutton', 'Email PDF Copy', 'clientScriptPDFEmail_createrecord()');	   	
		form.addButton('custombutton', 'Cancel', 'refresh()');
	
		
      	response.writePage(form);

	}
	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 //nlapiLogExecution('DEBUG','prepareCustomerStatementCriteria', "in POST   ");
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		//nlapiLogExecution('DEBUG','prepareCustomerStatementCriteria', "in POST else   ");
		
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
	
		//nlapiLogExecution('DEBUG', 'pupulate location', 'loc_s_searchresult--->' + loc_s_searchresult)
		
		for (var i = 0; i < loc_s_searchresult.length; i++) 
		{
		
			subsidiary.addSelectOption(loc_s_searchresult[i].getValue('internalid'), loc_s_searchresult[i].getValue('name'))
			
		}
	}
}
// END OBJECT CALLED/INVOKING FUNCTION =====================================================
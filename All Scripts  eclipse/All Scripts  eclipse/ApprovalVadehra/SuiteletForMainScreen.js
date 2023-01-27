function vadehraRequisitionSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in GET = ");
	
		//var requi1 =request.getParameter('recId'); 
		//nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "requi1  = "+requi1);
	   var user = nlapiGetUser();
		var form = nlapiCreateForm("Vadehra Builders Requisition");
		
		form.setScript('');
		
		// ======= ADD FIELDS ========
		var requi = form.addField('custpage_requi', 'select', 'Requisition#');
		requi.addSelectOption('-1','');
		
	
	   	var filters = new Array();
		filters[filters.length] = new nlobjSearchFilter('custentity_vad_projectdirector', 'job', 'anyof', user);
	      var columns = new Array();
	  	
			 columns[0] = new nlobjSearchColumn("internalid",null,"GROUP"); 
			 columns[1] =  new nlobjSearchColumn("tranid",null,"GROUP");
		  var searchResults = nlapiSearchRecord('transaction','customsearch_trans_requi_name',filters,columns);

			nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);

			for (result in searchResults)
		
	         	{	
				
				requi.addSelectOption(searchResults[result].getValue("internalid",null,"GROUP"), searchResults[result].getValue("transactionnumber",null,"GROUP"));
			
		         nlapiLogExecution('debug','Search Values','requi := '+searchResults[result].getValue("internalid",null,"GROUP"));
		         nlapiLogExecution('debug','Search Values','requi := '+searchResults[result].getValue("transactionnumber",null,"GROUP"));
	              	}
		
	
	    nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in GET below Form= ");
	    
	    
			var projectid = form.addField('custpage_project', 'select', 'Project#');
		projectid.addSelectOption('-1','');
		
		
	  	var filters1 = new Array();
			filters1[filters1.length] = new nlobjSearchFilter('custentity_vad_projectdirector', null, 'anyof', user);
		      var columns1 = new Array();
		  	
				 columns1[0] = new nlobjSearchColumn("internalid"); 
				 columns1[1] =  new nlobjSearchColumn("altname");
			  var searchResults1 = nlapiSearchRecord('job','customsearch_user_proj_search',filters1,columns1);

				nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults1.length);

				for (result1 in searchResults1)
			
		         	{	
					
					projectid.addSelectOption(searchResults1[result1].getId(), searchResults1[result1].getValue('altname'));
				
			       //  nlapiLogExecution('debug','Search Values','requi := '+requi);
			
		              	}
			
	
		
	/*	var locationField = form.addField('locationname', 'select', 'Location');
		locationField.addSelectOption('', ' ');
		populateLocationList(locationField);  */
		var user =nlapiGetUser();
				
		   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Customize','custpage_sample_tab');
		  // ItemSublist.addField('custpage_chechbox','checkbox'); 
	       ItemSublist.addField('custpage_reqi', 'text', 'REQUISITION #');
		   ItemSublist.addField('custpage_item','select','Item','ITEM').setDisplayType('disabled');
		   ItemSublist.addField('custpage_cust_or_projid','select', 'CUSTOMER/PROJECTID','customer').setDisplayType('disabled');
     	   ItemSublist.addField('custpage_location','select', 'LOCATION','location').setDisplayType('disabled');
		   ItemSublist.addField('custpage_qty','integer','QUANTITY').setDisplayType('disabled');
		   ItemSublist.addField('custpage_order_rate', 'float', 'Rate').setDisplayType('disabled');
		   ItemSublist.addField('custpage_order_amount', 'float', 'Amount').setDisplayType('disabled');
		   ItemSublist.addField('custpage_custrecid','integer', 'RecordID').setDisplayType('hidden');
		   ItemSublist.addField('custpage_remark','text', 'Remark').setDisplayType('entry');
		   ItemSublist.addField('custpage_linenum','integer', 'Linenum').setDisplayType('disabled');
		   ItemSublist.addField('custpage_projdirector','text', 'ProjDirector').setDisplayType('hidden');
           var columns = new Array();
       	
			 columns[0] = new nlobjSearchColumn("internalid"); 
			 columns[1] =  new nlobjSearchColumn("item");
			 columns[2] =   new nlobjSearchColumn("quantity"), 
			 columns[3] = new nlobjSearchColumn("internalid","customer",null); 
			 columns[4] =  new nlobjSearchColumn("location");
			 columns[5] = new nlobjSearchColumn("estimatedamount"); 
			 columns[6] = new nlobjSearchColumn("custcol_linenum"); 
			 columns[7] = new nlobjSearchColumn("custentity_vad_projectdirector","job",null);
			 columns[8] = new nlobjSearchColumn("transactionnumber");
					 
			var filters = new Array();
			filters[0] = new nlobjSearchFilter('custentity_vad_projectdirector', 'job', 'is', user);
		//	filters[1] = new nlobjSearchFilter('internalid', null, 'is', requi);

	var results = GetSearchResults(filters,columns); 
	
	
		for (var i = 1; i <= results.length; i++) 
		{ 
			 //ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
			
		             var userRole = nlapiGetRole();
			      //   nlapiLogExecution('DEBUG', 'OrderRequisition', 'userRole:'+userRole);
					

					 ItemSublist.setLineItemValue('custpage_reqi', i, results[i-1].getValue('transactionnumber'));
		             
					 ItemSublist.setLineItemValue('custpage_item', i, results[i-1].getValue('item'));
					// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+results[i-1].getValue('item'));
					 
					 ItemSublist.setLineItemValue('custpage_qty', i, results[i-1].getValue('quantity'));
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+results[i-1].getValue('quantity'));
		
					 var projName =results[i-1].getValue("internalid","customer",null);
					  ItemSublist.setLineItemValue('custpage_cust_or_projid', i,projName);
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Cust/proJID :'+ projName);
					 
					
				
				     ItemSublist.setLineItemValue('custpage_location', i, results[i-1].getValue('location'));
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Location :'+results[i-1].getValue('location'));
					 
					 ItemSublist.setLineItemValue('custpage_custrecid', i, results[i-1].getValue('custcol_cust_rec_id'));
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'RecordID :'+results[i-1].getValue('custcol_cust_rec_id'));
	
					
					 ItemSublist.setLineItemValue('custpage_order_amount', i, results[i-1].getValue('estimatedamount'));
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Amount :'+results[i-1].getValue('estimatedamount'));
	
					 var rate = parseFloat(results[i-1].getValue('estimatedamount'))/parseInt(results[i-1].getValue('quantity'));
						 
					 ItemSublist.setLineItemValue('custpage_order_rate', i, rate);
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Amount :'+rate);
					 ItemSublist.setLineItemValue('custpage_linenum', i,  results[i-1].getValue('custcol_linenum'));
					 ItemSublist.setLineItemValue('custpage_projdirector', i,  results[i-1].getValue("custentity_vad_projectdirector","job"));
					 
		}

		   
		// ==== CALL A CLIENT SCRIPT ====
		form.setScript('');

	    // ==== ADD A BUTTON =====
	   	form.addButton('custombutton', 'Approve', 'redirectSuiteForApprove();');
	   	
		form.addButton('custombutton', 'Reject','redirectSuiteForReject();');
	
		form.addButton('custombutton', 'Reset', 'refresh();');
		
		//form.addButton('custombutton', 'Download CSV', 'download_csv()');*/
		
      	response.writePage(form);

      	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in POST   ");
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}// END orderRequisitionSuitelet()


function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_vadehra_requisition_search', filters, columns);
	return results;
}


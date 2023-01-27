function suiteletForNewOR(request, response)
{
	nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "Request Method = " +request.getMethod());
try
{
	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in GET = ");
		var subsidary =request.getParameter('subsidary'); 
		nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidary :'+subsidary);
		
		var subsiname =request.getParameter('subsi'); 
		nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidary :'+subsiname); //
		
		var prValue =request.getParameter('cust_pr_type'); 
		
		var form = nlapiCreateForm("Select the Requisitions");
		
		form.setScript('customscript_client_order_requisition');
		// ======= ADD FIELDS ========
		//var subsidiary = form.addField('custpage_subsidiary', 'select', 'subsidiary', 'subsidiary');
		//subsidiary.setMandatory(true);
		
		
       
		
		   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Customise','custpage_sample_tab');
		   ItemSublist.addField('custpage_chechbox','checkbox'); 
		   ItemSublist.addField('custpage_reqi', 'text', 'REQUISITION #')
		
		   ItemSublist.addField('custpage_date', 'text', 'Date');
		   ItemSublist.addField('custpage_subsiid', 'text', 'subsiid').setDisplayType('hidden');
		   ItemSublist.addField('custpage_subsiname', 'text', 'subsiname').setDisplayType('hidden');
		   ItemSublist.addField('custpage_reqinternal', 'integer', 'InternalID').setDisplayType('hidden');
		   ItemSublist.addField('custpage_pr_type', 'text', 'PRTYPE').setDisplayType('hidden');
		   
		   var filters = new Array();
			filters[0] = new nlobjSearchFilter('subsidiary', null, 'is', subsidary);
            filters[1] = new nlobjSearchFilter('custbody_pr_type', null, 'anyof', prValue);
		   
                     var columns = new Array();
			
			 columns[0] = new nlobjSearchColumn("tranid",null,"GROUP"); 
			 columns[1] =  new nlobjSearchColumn("trandate",null,"GROUP");
			 columns[2] = new nlobjSearchColumn("internalid",null,"GROUP");
			
	      var results = GetSearchResults(filters,columns); 
	    //  nlapiLogExecution('DEBUG', 'OrderRequisition', 'results.length :'+results.length);
	      
	      var DocNum=[];
	      var DateArr=[];
	      var InternalID=[];
	
		for (var i = 1; i <= results.length; i++) 
		{ 
			 ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
			
			 ItemSublist.setLineItemValue('custpage_reqi', i, results[i-1].getValue("tranid",null,"GROUP"));
			 
			 ItemSublist.setLineItemValue('custpage_date', i, results[i-1].getValue("trandate",null,"GROUP"));
			 ItemSublist.setLineItemValue('custpage_subsiid', i, subsidary);
			 ItemSublist.setLineItemValue('custpage_subsiname', i, subsiname);
			 ItemSublist.setLineItemValue('custpage_pr_type', i, prValue);
			 ItemSublist.setLineItemValue('custpage_reqinternal', i, results[i-1].getValue("internalid",null,"GROUP"));
			
			DocNum.push(results[i-1].getValue("tranid",null,"GROUP"));
			DateArr.push(results[i-1].getValue("trandate",null,"GROUP"));
			InternalID.push(results[i-1].getValue("internalid",null,"GROUP"));
			
		}
		
		
		
		// ==== CALL A CLIENT SCRIPT ====
	/*	form.setScript('customscript_client_order_requisition');

	    // ==== ADD A BUTTON =====
	   	form.addButton('custombutton', 'Submit', 'redirectSuite();');
		
	
		
		form.addButton('custombutton', 'Reset', 'refresh();');*/
		
		//form.addButton('custombutton', 'Download CSV', 'download_csv()');*/
		   
		   form.addSubmitButton('Submit');
		
      	response.writePage(form);

      	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST   ");
		 
		 var count = request.getLineItemCount('custpage_sig_req_sublist');
		 
		 var DocNumArr =[];
		  var lineNum =0;
		  for(var i=1; i< count+1; i++)
		  {
		   
		   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
		 
		  
		   if(checkMark == 'T')
		   {
		   
			   lineNum = lineNum + parseInt(1);
		    var internalId = request.getLineItemValue('custpage_sig_req_sublist', 'internalid', i);
		   
		     var tranid = request.getLineItemValue('custpage_sig_req_sublist','custpage_reqinternal', i);
			 nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi_num :'+tranid);
			 
			 var SubsiID = request.getLineItemValue('custpage_sig_req_sublist','custpage_subsiid', i);
			 nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi_num :'+tranid);
			 
			 var SubsiName = request.getLineItemValue('custpage_sig_req_sublist','custpage_subsiname', i);
			 nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi_num :'+tranid);
			 
			 var pr_type = request.getLineItemValue('custpage_sig_req_sublist','custpage_pr_type', i);
			 
			 DocNumArr.push(tranid);
		   }
		  }
		  var param = new Array();
		  
		  param['custscript_sub_id'] = SubsiID;
		  param['custscript_sub_name'] = SubsiName;
		  param['custscript_doc_num'] = DocNumArr;
		  param['custscript_cust_pr_type'] = pr_type;
		  
		  response.sendRedirect("SUITELET", "customscript_update_screen_or_using_doc", "customdeploy_update_screen_or_using_doc", false, param);
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}
catch(e)
{
	throw nlapiCreateError('SUITELET_ERROR',"There is No PR Available ..."+e, false); 
}
	
}// END orderRequisitionSuitelet()

function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_new_order_requi_search_2', filters, columns);
	return results;
}


function requisitionReportSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','Requisition Status Report', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','Requisition Status Report', "in GET = ");
	
		
		var form = nlapiCreateForm("Requisition Status Report");
		
		  // form.setScript('');
		// ======= ADD FIELDS ========
		 var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Requisitions','custpage_sample_tab');
         
        
		 //  ItemSublist.addField('custpage_project', 'text', 'Project');
		   ItemSublist.addField('custpage_loc', 'select', 'Location','location').setDisplayType('inline');
		  var newVar = ItemSublist.addField('custpage_requi_open','text', 'Pending Approval');
		   ItemSublist.addField('custpage_requi_approve', 'text', 'Orders To Receive');
		   ItemSublist.addField('custpage_requi_reject', 'text', 'Partially Receive');
		  
			var filters = new Array();
		
	      var results = GetSearchResults(filters,columns); 
	
	
		for (var i = 1; i <= results.length; i++) //
		{ 
			var columns = results[i-1].getAllColumns();
			var project = results[i-1].getValue(columns[0]);
			var Location= results[i-1].getValue(columns[1]);
			var PendingApp = results[i-1].getValue(columns[4]);
			var OrderToReceiv= results[i-1].getValue(columns[6]);
			var PartReceiv= results[i-1].getValue(columns[8]);
			
			
			nlapiLogExecution('DEBUG', 'OrderRequisition', 'project :='+project);
			nlapiLogExecution('DEBUG', 'OrderRequisition', 'Location :='+Location);
			nlapiLogExecution('DEBUG', 'OrderRequisition', 'PendingApp :='+PendingApp);
			nlapiLogExecution('DEBUG', 'OrderRequisition', 'Order to receive :='+OrderToReceiv);
			//nlapiLogExecution('DEBUG', 'OrderRequisition', 'Raise :='+Raise);
			
		//	ItemSublist.setLineItemValue('custpage_project', i, project);
			ItemSublist.setLineItemValue('custpage_loc', i, Location);
		    ItemSublist.setLineItemValue('custpage_requi_approve', i, OrderToReceiv);
		    ItemSublist.setLineItemValue('custpage_requi_reject', i, PartReceiv);
		   
		   // newVar.setLinkText(PendingApp);
		    
		   
           //  var RequesistionUrl = nlapiResolveURL('EXTERNAL', '<a href="https://www.w3schools.com">'+PendingApp+'</a>');
           
             ItemSublist.setLineItemValue('custpage_requi_open', i, '<a href="https://5375453-sb1.app.netsuite.com/app/common/search/search.nl?cu=T&e=T&id=162">'+PendingApp+'</a>');
             
		}
		   
      	response.writePage(form);

      	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','Requisition Status Report', "in POST   ");
	
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','Requisition Status Report', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}// END orderRequisitionSuitelet()


function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('purchaseorder', 'customsearch_atpl_test_pr_search_2', filters, columns);
	return results;
}

// BEGIN OBJECT CALLED/INVOKING FUNCTION ===================================================

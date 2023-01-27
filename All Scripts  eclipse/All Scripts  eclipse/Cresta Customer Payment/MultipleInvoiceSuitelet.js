function multiInvoiceSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','multiInvoiceSuitelet', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','multiInvoiceSuitelet', "in GET = ");
	var customerId = request.getParameter('cust_id');
	
	nlapiLogExecution('DEBUG','multiInvoiceSuitelet', "customerId= "+customerId);
		
		var form = nlapiCreateForm("Customer Payment Screen");
		
		  var CustomerNameIs = form.addField('custpage_customername', 'text', 'CustomerName');
		  CustomerNameIs.setDefaultValue(customerId);
		  CustomerNameIs.setDisplayType('hidden');
 
		
		
		   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Invoices','custpage_sample_tab');
		   ItemSublist.addField('custpage_chechbox','checkbox'); 
		   ItemSublist.addField('custpage_invoice', 'text', 'Invoice#')
		   ItemSublist.addField('custpage_date','text','Date');
		 //  ItemSublist.addField('custpage_qty','float','Quantity');
       	//   ItemSublist.addField('custpage_description','text','DESCRIPTION');
	     ItemSublist.addField('custpage_intid', 'text', 'internalID').setDisplayType('hidden');
		   ItemSublist.addField('custpage_amt', 'float', 'Amount');
		 //  ItemSublist.addField('custpage_rate', 'float', 'Rate');
		   ItemSublist.addField('custpage_subsidiary','select', 'SUBSIDIARY','subsidiary').setDisplayType('inline');
		    ItemSublist.addField('custpage_department','select', 'DEPARTMENT','department').setDisplayType('inline');
		   ItemSublist.addField('custpage_class','select', 'CLASS','classification').setDisplayType('inline');
		   ItemSublist.addField('custpage_location','select', 'LOCATION','location').setDisplayType('inline');
		   ItemSublist.addField('custpage_type', 'text', 'Type').setDisplayType('hidden');
		   
		   
		   var filters = new Array();
			filters[0] = new nlobjSearchFilter('name', null, 'anyof', customerId);
           // filters[1] = new nlobjSearchFilter('internalid', null, 'anyof',newNum);
            filters[1] = new nlobjSearchFilter('custbody_processed_inv', null, 'is','F');
            filters[2] = new nlobjSearchFilter('fxamountremaining', null, 'greaterthan','0');
                     var columns = new Array();
			
			 columns[0] = new nlobjSearchColumn("item"); 
			 columns[1] =  new nlobjSearchColumn("unit");
			 columns[2] =   new nlobjSearchColumn("quantity"), 
			 columns[3] = new nlobjSearchColumn("subsidiary"); 
			 columns[4] =  new nlobjSearchColumn("trandate");
			 columns[5] = new nlobjSearchColumn("entity"); 
			 columns[6] =  new nlobjSearchColumn("department"); 
			 columns[7] =  new nlobjSearchColumn("class"); 
			 columns[8] =  new nlobjSearchColumn("location"); 
			 columns[9] =  new nlobjSearchColumn("fxamountremaining"); 
			 columns[10] =  new nlobjSearchColumn("tranid");
			 columns[11] = new nlobjSearchColumn("memo");
			 columns[12] = new nlobjSearchColumn('internalid');
			 columns[13] = new nlobjSearchColumn('type');
			 
			 
			 
			 var results = GetSearchResults(filters,columns); 
				
				
				for (var i = 1; i <= results.length; i++) 
				{ 
					 ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
					
					 ItemSublist.setLineItemValue('custpage_date', i, results[i-1].getValue('trandate'));
					// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+results[i-1].getValue('item'));
					 
		            
					 ItemSublist.setLineItemValue('custpage_qty', i, results[i-1].getValue('quantity'));
					// nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+results[i-1].getValue('quantity'));

					 
					 ItemSublist.setLineItemValue('custpage_subsidiary', i, results[i-1].getValue('subsidiary'));
					// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+results[i-1].getValue('subsidiary'));
					 
					 ItemSublist.setLineItemValue('custpage_descrip', i, results[i-1].getValue('memo'));
					 
					  ItemSublist.setLineItemValue('custpage_type', i, results[i-1].getValue('type'));
					//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'type :'+results[i-1].getValue('type'));

				
						 ItemSublist.setLineItemValue('custpage_class', i,results[i-1].getValue('class'));
					//	nlapiLogExecution('DEBUG', 'OrderRequisition', 'class :'+results[i-1].getValue('class'));

						 
						 ItemSublist.setLineItemValue('custpage_department', i,results[i-1].getValue('department'));
					//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'department :'+results[i-1].getValue('department'));

						 
						 ItemSublist.setLineItemValue('custpage_location', i, results[i-1].getValue('location'));
					//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'location :'+results[i-1].getValue('location'));

						 
						 ItemSublist.setLineItemValue('custpage_amt', i, results[i-1].getValue('fxamountremaining'));
					//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'amount :'+results[i-1].getValue('amount'));
					 
						 
						 ItemSublist.setLineItemValue('custpage_invoice', i, results[i-1].getValue('tranid'));
					//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi_num :'+results[i-1].getValue('tranid'));
						 ItemSublist.setLineItemValue('custpage_intid', i, results[i-1].getValue('internalid'));
						
						 ItemSublist.setLineItemValue('custpage_type', i, results[i-1].getValue('type'));
							
				}
				
		   
		   
		// ==== CALL A CLIENT SCRIPT ====
		

	    // ==== ADD A BUTTON =====
				form.addSubmitButton('SUBMIT');
		
	
			
      	response.writePage(form);

      	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST   ");
		 
         var count = request.getLineItemCount('custpage_sig_req_sublist');
         
         var nameOfcust = request.getParameter('custpage_customername');
		 
		   var num = 0;
           var lineNumArr = new Array();
		  var itemArr =new Array();
		  var quanArr =new Array();
		  var subsiArr =new Array();
		  var typeArr =new Array();
		  var classArr =new Array();
		  var departArr =new Array();
		  var LocArr =new Array();
		  var amtArr =new Array();
		  
		  var unitArr =new Array();
		  var tranidArr =new Array();
          var descripArr =new Array();
          var hsncodeArr = new Array();
          var lastPurchaseArr = new Array();//lastPurchaseArr

		  var TotAmt =0;
			
		  
		  var lineNum =0;
		  for(var i=1; i< count+1; i++)
		  {
		   
		   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
		 
		  
		   if(checkMark == 'T')
		   {
			   
				   lineNum = lineNum + parseInt(1);
			    var invoiceNum = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_intid', i);
			    tranidArr.push(invoiceNum);
			    var InvAmt = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_amt', i);
			    
			    TotAmt += parseFloat(InvAmt);
			    
			    var subsidiary = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_subsidiary', i);
			    
			    var deptmt = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_department', i);
			
			    var clss = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_class', i);
				
			    var loc = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_location', i);
			    
			    var date = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_date', i);
			    
			    var typeI = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_type', i);
			    typeArr.push(typeI);
			    
				
		   }
		   
		 
		  }  
		  
		  createCustomTransViainvoiceORCustomer(count,nameOfcust,date,loc,clss,deptmt,subsidiary,TotAmt,tranidArr,typeArr)

	     	 
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


function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_invoice_for_payment', filters, columns);
	return results;
}

function createCustomTransViainvoiceORCustomer(count,nameOfcust,date,loc,clss,deptmt,subsidiary,TotAmt,tranidArr,typeArr)
{	
	
	nlapiLogExecution("DEBUG","In Create Function","createCustomTransactionFunction**************");
	
     var record = nlapiCreateRecord('customtransaction_custom_customer_paymen', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}
		
    var fieldMemo ='RegularGLImpactTransaction';
  
	if(date != '' && date != 'undefined' && date != null)
	{
		record.setFieldValue('trandate',date);
	}

	if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
	{
		// To Set Subsidiary
		record.setFieldValue('subsidiary',subsidiary);
	}
	
	if(loc != '' && loc != 'undefined' && loc != null)
	{
		// To Set Subsidiary
		record.setFieldValue('location',loc);
	}
	
	
	if(clss != '' && clss != 'undefined' && clss != null)
	{
		// To Set Subsidiary
		record.setFieldValue('class',clss);
	}
	
	if(deptmt != '' && deptmt != 'undefined' && deptmt != null)
	{
		// To Set Subsidiary
		record.setFieldValue('department',deptmt);
	}
	
	record.setFieldValue('memo',fieldMemo);
	record.setFieldValue('custbody_invoice_num',tranidArr);
	
	var memo ='CustomTransactionCreated';
	
	record.selectNewLineItem('line');
	record.setCurrentLineItemValue('line', 'account', 1033);
	record.setCurrentLineItemValue('line', 'debit', TotAmt);
	record.setCurrentLineItemValue('line', 'entity', nameOfcust);
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');
	
	
	record.selectNewLineItem('line');
	record.setCurrentLineItemValue('line', 'account', 1034);
	record.setCurrentLineItemValue('line', 'credit', TotAmt);
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');

	
	
	
	 var SubmitIt = nlapiSubmitRecord(record);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 
	 submitProcessChckbox(tranidArr,typeArr);
	 
	 response.sendRedirect('RECORD', 'customtransaction_custom_customer_paymen', SubmitIt, false,'view');
}

function submitProcessChckbox(tranidArr,typeArr)
{
	 nlapiLogExecution("DEBUG","In Create Function","submitProcessChckbox inside =="+tranidArr);
	 nlapiLogExecution("DEBUG","In Create Function","submitProcessChckbox inside =="+typeArr);
		
	for (var m=0;m<tranidArr.length;m++)
	 {
		 if(typeArr[m] =='CustInvc')
		 {
			 var obj =nlapiLoadRecord('invoice',tranidArr[m]);
			 obj.setFieldValue('custbody_processed_inv','T');
			 
			 var valueOfcheckboc = obj.getFieldValue('custbody_processed_inv');
			 nlapiLogExecution("DEBUG","In Create Function","valueOfcheckboc  =="+valueOfcheckboc);
		       nlapiSubmitRecord(obj);
		 }
		 else if(typeArr[m] =='CustCred')
		 {
			 var obj =nlapiLoadRecord('creditmemo',tranidArr[m]);
			 obj.setFieldValue('custbody_processed_inv','T');
		       nlapiSubmitRecord(obj);
		 }
		 
	 }
}
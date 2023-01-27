function reversalGLImpactSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','multiInvoiceSuitelet', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','multiInvoiceSuitelet', "in GET = ");
	var customerId = request.getParameter('cust_id');
	
	nlapiLogExecution('DEBUG','multiInvoiceSuitelet', "customerId= "+customerId);
		
	var form = nlapiCreateForm("Customer Payment Screen");
	form.setScript('customscript_client_customer_payment');
	
		  var CustomerNameIs = form.addField('custpage_customername', 'text', 'CustomerName');
		  CustomerNameIs.setDefaultValue(customerId);
		  CustomerNameIs.setDisplayType('hidden');
 
		   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Invoices','custpage_sample_tab');
		   ItemSublist.addField('custpage_chechbox','checkbox'); 
		   ItemSublist.addField('custpage_invoice', 'text', 'Invoice#')
		   ItemSublist.addField('custpage_date','text','Date');
		   ItemSublist.addField('custpage_intid', 'text', 'internalID').setDisplayType('hidden');
	       ItemSublist.addField('custpage_amt', 'float', 'Original Amount').setDisplayType('inline');
		   ItemSublist.addField('custpage_pay_amt', 'float', 'Pay Amount').setDisplayType('entry');
		   ItemSublist.addField('custpage_subsidiary','select', 'SUBSIDIARY','subsidiary');
		   ItemSublist.addField('custpage_department','select', 'DEPARTMENT','department');
		   ItemSublist.addField('custpage_class','select', 'CLASS','classification');
		   ItemSublist.addField('custpage_location','select', 'LOCATION','location');
		   
		   
		   var filters = new Array();
			filters[0] = new nlobjSearchFilter('name', null, 'anyof', customerId);
           filters[1] = new nlobjSearchFilter('fxamountremaining', null, 'greaterthan','0');
           filters[2] = new nlobjSearchFilter('custbody_processed_inv', null, 'is','T');
           
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
							
				}
				
		   
		form.addSubmitButton('SUBMIT');
		form.addButton('custombutton', 'Reset', 'refresh();');
	
		response.writePage(form);

  
	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST  ");
		 
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
		  var invoiceArr =new Array();
          var dateArr =new Array();
          var hsncodeArr = new Array();
          var payamtArr =new Array();
          var lastPurchaseArr = new Array();//lastPurchaseArr

		  var TotAmt =0;
			
		  
		  var lineNum =0;
		  for(var i=1; i< count+1; i++)
		  {
		   
		   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
		 
		  
		   if(checkMark == 'T')
		   {
			   
			    var invoiceNum = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_intid', i);
			    tranidArr.push(invoiceNum);
			   
			    var InvAmt = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_amt', i);
			    amtArr.push(InvAmt);
			    TotAmt += parseFloat(InvAmt);
			    
			    var PayAmt = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_pay_amt', i);
			    payamtArr.push(PayAmt);
			    
			    var subsidiary = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_subsidiary', i);
			    
			    var deptmt = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_department', i);
			
			    var clss = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_class', i);
				
			    var loc = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_location', i);
			    
			    var tranid = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_invoice', i);
			    invoiceArr.push(tranid);
			    
			    var date = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_date', i);
			    dateArr.push(date);
			    
			    
			    
		   }
		   
		 
		  }  
		  
		  createCustomTransViainvoiceORCustomer(count,nameOfcust,date,loc,clss,deptmt,subsidiary,TotAmt,tranidArr)
		  createAcutalPaymentEntry(count,nameOfcust,date,dateArr,loc,clss,deptmt,subsidiary,payamtArr,invoiceArr,amtArr)

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

function createCustomTransViainvoiceORCustomer(count,nameOfcust,date,loc,clss,deptmt,subsidiary,TotAmt,tranidArr)
{	
	
	nlapiLogExecution("DEBUG","In Create Function","createCustomTransactionFunction**************");
	
     var record = nlapiCreateRecord('customtransaction_custom_customer_paymen', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}
		
    var fieldMemo='ReversalGLImapactTransaction';
  
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
	record.setCurrentLineItemValue('line', 'account', 1034);
	record.setCurrentLineItemValue('line', 'debit', TotAmt);
	record.setCurrentLineItemValue('line', 'entity', nameOfcust);
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');
	
	
	record.selectNewLineItem('line');
	record.setCurrentLineItemValue('line', 'account', 1033);
	record.setCurrentLineItemValue('line', 'credit', TotAmt);
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');

	 var SubmitIt = nlapiSubmitRecord(record);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 
	 response.sendRedirect('RECORD', 'customtransaction_custom_customer_paymen', SubmitIt, false,'view');
}

function  createAcutalPaymentEntry(count,nameOfcust,date,dateArr,loc,clss,deptmt,subsidiary,payamtArr,invoiceArr,amtArr)
{	
	
	nlapiLogExecution("DEBUG","In Create Function","createAcutalPaymentEntry**************");
	
     var record = nlapiCreateRecord('customerpayment', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}
		
    if(nameOfcust != '' && nameOfcust != 'undefined' && nameOfcust != null)
 	{
		// To Set Customer
 		record.setFieldValue('customer',nameOfcust);
 	}
    
    nlapiLogExecution("DEBUG","In Create Function","customer set="+nameOfcust);
  
	if(date != '' && date != 'undefined' && date != null)
	{
		// To Set Date
		record.setFieldValue('trandate',date);
	}
	 nlapiLogExecution("DEBUG","In Create Function","date set="+date);
   
	 record.setFieldValue('aracct',122); 
	
	 record.setFieldValue('undepfunds','T'); //undepfunds

	
	if(loc != '' && loc != 'undefined' && loc != null)
	{
		// To Set Location
		record.setFieldValue('location',loc);
	}
	 nlapiLogExecution("DEBUG","In Create Function","location set="+loc);
		
	
	if(clss != '' && clss != 'undefined' && clss != null)
	{
		// To Set Class
		record.setFieldValue('class',clss);
	}
	 nlapiLogExecution("DEBUG","In Create Function","clss set="+clss);
		
	
	if(deptmt != '' && deptmt != 'undefined' && deptmt != null)
	{
		// To Set Department
		record.setFieldValue('department',deptmt);
	}
	 nlapiLogExecution("DEBUG","In Create Function","deptmt set="+deptmt);
		
	  var count1 = record.getLineItemCount('apply');
	  nlapiLogExecution("DEBUG","In Create Function","count1 is="+count1);
	  
	 
   var paymentAgg=0;

    	for(var i=1;i<=count1;i++)
		{
			var RefIs = record.getLineItemValue('apply', 'refnum', i);   
			for(var j=0;j<invoiceArr.length;j++)
			   {
					if (RefIs == invoiceArr[j])
					{
						 nlapiLogExecution("DEBUG","In Create Function","RefIs set="+RefIs+'invoiceArr[j] =='+invoiceArr[j]);
							
						  record.setLineItemValue('apply', 'apply', i,'T'); 
						  record.setLineItemValue('apply', 'amount', i,payamtArr[j]); 
						  nlapiLogExecution("DEBUG","In Create Function","payamt done=="+payamtArr[j]);
						  paymentAgg +=parseFloat(payamtArr[j]);
					}
		        }
		   }
 
    	 nlapiLogExecution("DEBUG","In Create Function","paymentAgg is=="+paymentAgg);
	
	 record.setFieldValue('payment',paymentAgg);
	 var SubmitIt = nlapiSubmitRecord(record);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 
	 response.sendRedirect('RECORD', 'customerpayment', SubmitIt, false,'view');
}

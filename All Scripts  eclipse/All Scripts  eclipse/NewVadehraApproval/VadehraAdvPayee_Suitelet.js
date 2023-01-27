	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       16 May 2019     Shivraj		   Display all click
	 * 1.00       22 May 2019     Shivraj		   Set Tax Amount Value - add formula (Tax Basis * Tax Rate) /100   
	 * 1.00       22 May 2019     Shivraj		   Tax Details Override Checkbox will be check at time of submitting.
	 * 1.00       22 May 2019     Shivraj		   Add Column in Sublist - Cheque No and Cheque Date.
	 */
	
	function sutAdvanceToApply(request, response)
	
	{
		
		
		   if ( request.getMethod() == 'GET' )
		   {
		    try
		    {    
		    	
			   var form = nlapiCreateForm('Advance TDS Apply');
			   var entity = request.getParameter('entity_');
			   var recordId= request.getParameter('checkid_');
			   var recordType= request.getParameter('recordType_');
			   //form.addfield()
		       nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "entity_ " + entity);
		       nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "checkid_ " + recordId);
		       nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "recordType_ " + recordType);
		       
		       form.addSubTab('tab1', 'Advance TDS Apply');
			   var sublist = form.addSubList('custpage_sublist', 'list', 'Sublist','tab1');//static
			   sublist.addField('custpage_apply', 'checkbox', 'Apply');
			   //cheque no and date source from cheque
			   sublist.addField('custpage_checkno', 'text', 'Cheque No','chequeno').setDisplayType('inline');
			   sublist.addField('custpage_checkdate', 'text', 'Cheque Date','chequedate').setDisplayType('inline');
			   //END :cheque no and date source from cheque
			   sublist.addField('custpage_account', 'select', 'Account','account').setDisplayType('hidden');
			   sublist.addField('custpage_seccode', 'text', 'Section Code','seccode');
			   sublist.addField('custpage_amount', 'float', 'TDS Amount');
			   sublist.addField('custpage_advancepaid', 'float', 'Advance Paid');
			   sublist.addField('custpage_department', 'select', 'Department','department').setDisplayType('inline');
			   sublist.addField('custpage_aclass', 'text', 'Class','class').setDisplayType('inline');
			   sublist.addField('custpage_aclassid', 'text', 'ClassID','class').setDisplayType('hidden');
			   sublist.addField('custpage_location', 'select', 'Location','location').setDisplayType('inline');
			   sublist.addField('custpage_internalid', 'text', 'InternalId','InternalID')//.setDisplayType('hidden');
			   sublist.addField('custpage_ratetax', 'text', 'tax').setDisplayType('hidden');
			   sublist.addField('custpage_vendadvid', 'text', 'VendorAdvance').setDisplayType('inline');
			   sublist.addField('custpage_vendadvdebitamt', 'float', 'VendorAdvanceDebitAmount').setDisplayType('inline');
			   //.setDisplayType('inline');
			   
			   
			   var recidfld = form.addField('custpage_recordid', 'text', 'RecordID');
			   recidfld.setDisplayType('hidden');
			   recidfld.setDefaultValue(recordId);
			   var recTypeFld  = form.addField('custpage_recordtype', 'text', 'RecordType')//.setDisplayType('hidden');
			   recTypeFld.setDisplayType('hidden');
			   recTypeFld.setDefaultValue(recordType);
			   
			  	   
			   // Add Submit button
			   form.addSubmitButton('Submit');
		      
		       // Define search filters
		       var filters = new Array();
		       filters[0] = new nlobjSearchFilter( 'entity', null, 'anyof', entity );
		       //filters[1] = new nlobjSearchFilter( 'account', null, 'anyof', 1357 );
		       filters[1] = new nlobjSearchFilter( 'memo', null,'contains','Advance Paid');
		       filters[2] = new nlobjSearchFilter( 'custbodyadvance_aleredy_applied', null, 'is', 'F');
		       // Define search columns    
		       var columns = new Array();
		       columns[0] = new nlobjSearchColumn('account');    
		       columns[1] = new nlobjSearchColumn('amount');
		       columns[2] = new nlobjSearchColumn('department');  
		       columns[3] = new nlobjSearchColumn('class'); 
		       columns[4] = new nlobjSearchColumn('location'); 
		       columns[5] = new nlobjSearchColumn('custbody_cheque_id');
		       columns[6] = new nlobjSearchColumn('internalid');
		       columns[7] = new nlobjSearchColumn('custbody_section_code');
		       columns[8] = new nlobjSearchColumn('custbody_tdsamount');
		       columns[9] = new nlobjSearchColumn('tranid');
		       columns[10] = new nlobjSearchColumn('custbody_dbtamt_paymnt');
		       
		       //Search with filters and columns
		       var searchresults = nlapiSearchRecord('customtransaction102',null, filters, columns);
		      // var searchresults = nlapiSearchRecord('transaction','customtransaction102', filters, columns);
		       var length = searchresults.length;
		       nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "length" + length);
		      	       
		       // Loop through all search results.
		       for ( var i = 0; searchresults != null && i < searchresults.length; i++ )   
		       {
		    	   var account = searchresults[i].getValue('account');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "account" + account);
		    	   var amount = searchresults[i].getValue('amount');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "amount" + amount);
		    	   var department = searchresults[i].getValue('department');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "department" + department);
		    	   var aclass = searchresults[i].getText('class');
		    	   
		    	   var aclassid = searchresults[i].getValue('class');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "aClass" + aclass);
		    	   var location_ = searchresults[i].getValue('location');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "location" + location_);
		    	   var internalID = searchresults[i].getValue('internalid');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "internalID" + internalID);
		    	   var chequekid = searchresults[i].getValue('custbody_cheque_id');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "chequekid" + chequekid);
		    	   var secCode = searchresults[i].getText('custbody_section_code');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "secCodeTest" + secCode);
		    	   var vendAdvnId = searchresults[i].getValue('tranid');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "vendAdvnId" + vendAdvnId);
		    	   
		    	   var custTDSAmount = searchresults[i].getValue('custbody_tdsamount');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "custTDSAmount" + custTDSAmount);
		    	   
		    	   var vendAdvnDebitAmt = searchresults[i].getValue('custbody_dbtamt_paymnt');
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "vendAdvnDebitAmt" + vendAdvnDebitAmt);
		    	   
			      /* var advancePaid = nlapiLookupField('check',chequekid,'custbody_advance_amount');
			       nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "advancePaid" + advancePaid);
			      */ 
			       var advancePaid = nlapiLookupField('check',chequekid,'total');
			       nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "advancePaid" + advancePaid);
			      
			      		       
			       var taxRateCheque =  nlapiLookupField('check',chequekid,'custbody_section_code');
			       nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "taxRateCheque" + taxRateCheque);
			       
		    	   var secRate = nlapiLookupField('customrecord_in_tds_setup',taxRateCheque,'custrecord_in_tds_setup_rate');
			       nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "secRate" + secRate);
			       
			       //Start :cheque no and date source from cheque
			       var checkNo = nlapiLookupField('check',chequekid,'transactionnumber');
			       nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "checkNo" + checkNo);
				   
			       var checkDate = nlapiLookupField('check',chequekid,'trandate');
			       nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "checkDate" + checkDate);
				      
			       //END :cheque no and date source from cheque
			       
			       
			       //set values 
		    	   sublist.setLineItemValue('custpage_account', i+1,account);
		    	  
		    	   sublist.setLineItemValue('custpage_amount', i+1,custTDSAmount);
		    	   
		    	  /* var amountAdd = parseFloat(0-amount) + parseFloat(0-advancePaid);
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "amountAdd" + amountAdd);
		    	  */ 
		    	   var advPaid = parseFloat(custTDSAmount) + parseFloat(0-advancePaid);
		    	   nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "advPaid " + advPaid);
		    	   sublist.setLineItemValue('custpage_advancepaid',i+1,advPaid);
		    	  
		    	   // sublist.setLineItemValue('custpage_advancepaid',i+1,amountAdd);
		    	   /*sublist.setLineItemValue('custpage_advancepaid',i+1,advancePaid);*/
		    	   
		    	   sublist.setLineItemValue('custpage_department',i+1,department);
		    	   sublist.setLineItemValue('custpage_aclass',i+1,aclass);//custpage_aclassid
		    	   sublist.setLineItemValue('custpage_aclassid',i+1,aclassid);//
		    	   sublist.setLineItemValue('custpage_location',i+1,location_); 	   
		    	   sublist.setLineItemValue('custpage_recordid',i+1,recordId);
		    	   sublist.setLineItemValue('custpage_recordtype',i+1,recordType);
		    	   sublist.setLineItemValue('custpage_internalid',i+1,internalID);
		    	   sublist.setLineItemValue('custpage_ratetax',i+1,secRate);
		    	   //Start :cheque no and date source from cheque
		    	   sublist.setLineItemValue('custpage_checkno',i+1,checkNo);
		    	   sublist.setLineItemValue('custpage_checkdate',i+1,checkDate);
		    	   sublist.setLineItemValue('custpage_seccode',i+1,secCode);
		    	   sublist.setLineItemValue('custpage_vendadvid',i+1,vendAdvnId);
		    	   sublist.setLineItemValue('custpage_vendadvdebitamt',i+1,vendAdvnDebitAmt);
		    	   //END :cheque no and date source from cheque custpage_vendadvid
		    	   
		       } // for ends here...
		       
		   }// try ends here...
			catch(e)
			{
				throw nlapiCreateError('SUITELET_ERROR',"There is No records Available..."+e, false); 
			}
			response.writePage(form);
			//response.write('self.close();');
		   }
		   
		   //else part
		  
		   
		   
		  // else
			   	if (request.getMethod() == 'POST') 
				{
			   			
			   		
			   		
			   			var count = request.getLineItemCount('custpage_sublist');
			   			nlapiLogExecution('DEBUG', 'SUITELET POST check', "count " + count);
			   			
			   		   var recordId= request.getParameter('custpage_recordid');
			   		   nlapiLogExecution('DEBUG', 'SUITELET POST check', "recordIdInFun " + recordId);
					   var recordType= request.getParameter('custpage_recordtype');
					   nlapiLogExecution('DEBUG', 'SUITELET POST check', "recordTypeInFun " + recordType);
					  
			   			var taxcd = request.getParameter('custpageratetax');
				   		nlapiLogExecution('DEBUG', 'SUITELET POST check', "taxcd " + taxcd);
				   		   
			   			var accountPost = new Array();
			   			var amountPost  = new Array();
			   			var departmentPost = new Array();
			   			var classPost = new Array();
			   			var locationPost = new Array();
			   			var grossAmtPost = new Array();
			   			var internalid = new Array();
			   			var rateTaxC = new Array();
			   			//var internalid = new Array();
			   			
			   			var classPostid =[];
			   			     var columns1 = new Array();
							 columns1[0] = new nlobjSearchColumn("account"); 
							 columns1[1] =  new nlobjSearchColumn("amount");
							 columns1[2] =  new nlobjSearchColumn("department");
							 columns1[3] =  new nlobjSearchColumn("class");
							 columns1[4] =  new nlobjSearchColumn("location");
							 columns1[5] =  new nlobjSearchColumn("total");
							 columns1[6] =  new nlobjSearchColumn("internalid");
							// columns1[6] =  new nlobjSearchColumn("internalid");
							 
							// var filters1 = new Array();
			   			
			   	//	 var lineNum =0;
					  var 	debAmtVendAdv = new Array();	 
					  var countApply = new Array();
					  nlapiLogExecution('DEBUG', 'SUITELET POST check', 'Apply Length'+countApply);
					  
					  var vendorAdvid = new Array();//custpage_vendadvid
					  
					  for(var i=1; i<count+1; i++)
					  {
					   
					   var checkMark = request.getLineItemValue('custpage_sublist', 'custpage_apply', i);
					   nlapiLogExecution('DEBUG', 'SUITELET POST check', "checkMark " + checkMark);			   
					   
					  
					   if(checkMark == 'T')
					   {
						   	 var appliedCheck =request.getLineItemValue('custpage_sublist','custpage_apply', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'appliedCheck :'+appliedCheck);
			    			 countApply.push(appliedCheck);			
			    			 
						   	 var accountP =request.getLineItemValue('custpage_sublist','custpage_account', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'Account :'+accountP);
			    			 accountPost.push(accountP);
			    			
			    			 var ampuntP =request.getLineItemValue('custpage_sublist','custpage_amount', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'Amount :'+ampuntP);
			    			 amountPost.push(ampuntP);
			    			
			    			 var departmentP =request.getLineItemValue('custpage_sublist','custpage_department', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'Department :'+departmentP);
			    			 departmentPost.push(departmentP);
			    			
			    			 var classP =request.getLineItemValue('custpage_sublist','custpage_aclass', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'Class :'+classP);
			    			 classPost.push(classP);
			    			 
			    			 var classPid =request.getLineItemValue('custpage_sublist','custpage_aclassid', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'classPid :'+classPid);
			    			 classPostid.push(classPid);
			    			
			    			 var locationP =request.getLineItemValue('custpage_sublist','custpage_location', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'Location :'+locationP);
			    			 locationPost.push(locationP);
			    			 
			    			 var grossAmt =request.getLineItemValue('custpage_sublist','custpage_advancepaid', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'grossAmt :'+grossAmt);
			    			 grossAmtPost.push(grossAmt);
			    			 
			    			 var internalidP = request.getLineItemValue('custpage_sublist','custpage_internalid', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'internalidP :'+internalidP);
			    			 internalid.push(internalidP);
			    			 
			    			 var rateTaxP = request.getLineItemValue('custpage_sublist','custpage_ratetax', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'rateTaxP :'+rateTaxP);
			    			 rateTaxC.push(rateTaxP);//vendorAdvid
			    			 
			    			 var advPaidId = request.getLineItemValue('custpage_sublist','custpage_vendadvid', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'advPaidId :'+advPaidId);
			    			 vendorAdvid.push(advPaidId);
			    			 
			    			 var advPaidDebitAmnt = request.getLineItemValue('custpage_sublist','custpage_vendadvdebitamt', i);
			    			 nlapiLogExecution('DEBUG', 'SUITELET POST check', 'advPaidDebitAmnt :'+advPaidDebitAmnt);
			    			 debAmtVendAdv.push(advPaidDebitAmnt);
			    		}
					   
					  
					   
					  }// For loop ends here...
					  var cust_fields = ['custbody_vapinternalid','custbody_vendadvncnum'];
					  nlapiLogExecution('DEBUG', 'SUITELET POST check', 'Apply Length :'+countApply.length);
					  nlapiLogExecution('DEBUG', 'SUITELET POST check', 'RecordIDVAP :'+recordId);
					  nlapiLogExecution('DEBUG', 'SUITELET POST check', 'InternalIDVAP :'+internalid.join());
					 var Values= new Array()
					 Values[0]=internalid;
					 Values[1]=vendorAdvid;
					  nlapiSubmitField('vendorbill',recordId,cust_fields,Values);//.join()
					  var vendAdvnArray = new Array();
						 vendAdvnArray = internalid;
					  
					  var billId = addValuetoFuction(recordId,recordType,accountP,ampuntP,departmentP,classPid,locationP,count,grossAmt,internalid,checkMark,taxcd,rateTaxP);
					  
					 /* nlapiLogExecution("DEBUG","Apply Checkbox","Count "+count);
					  var applycheckCount=
						  //0;
					  for(k=0; k<count.length; K++)
					 {
						  var checkMark = request.getLineItemValue('custpage_sublist', 'custpage_apply', k)
						 if (checkMark == 'T')
							 {
							 	applycheckCount++;
							 	nlapiLogExecution("DEBUG","Apply Checkbox","applycheckCount "+applycheckCount);
							 }
					 }
					  
					*/  
					  
					  
					  // response.writePage('self.close();');
	              //window.close();
	              // form.close();;
					  
					  
					  var date = new Date;
					  var vendPaymntObj = nlapiCreateRecord('vendorpayment', {recordmode: 'dynamic'});
					   	vendPaymntObj.setFieldValue('trandate',nlapiDateToString(date));
					   	vendPaymntObj.setFieldValue('class',classPost[0]);
					   	vendPaymntObj.setFieldValue('department',departmentPost[0]);
					   	vendPaymntObj.setFieldValue('location',locationPost[0]);
					   	
					   	applyCnt = vendPaymntObj.getLineItemCount('apply');
					   	nlapiLogExecution("DEBUG","refnum","applyCnt "+applyCnt);
					   	nlapiLogExecution("DEBUG","refnum","Date "+nlapiDateToString(date));
					   	nlapiLogExecution("DEBUG","refnum","Class "+classPostid[0]);
					   	nlapiLogExecution("DEBUG","refnum","departmentPost[0] "+departmentPost[0]);
					   	nlapiLogExecution("DEBUG","refnum","loc "+locationPost[0]);
					   	nlapiLogExecution("DEBUG","refnum","ValuesCount "+Values[1].length);
					   	var lineNum = vendorpayment.findLineItemValue('apply', 'internalid', recordId);
					   	vendorpayment.selectLineItem('apply', lineNum);
					   	vendorpayment.setCurrentLineItemValue('apply', 'apply', 'T');
					   	vendorpayment.setCurrentLineItemValue('apply', 'amount',billamt);
					   	vendorpayment.commitLineItem('apply');			   	
					  
					   		for(var k=0;k<vendAdvnArray.length;k++)
					   		{
					   			
					   			var lineNum = vendorpayment.findLineItemValue('apply','internalid', vendAdvnArray[k]);
					   			vendorpayment.selectLineItem('apply',lineNum);
							   	vendorpayment.setCurrentLineItemValue('apply', 'apply', 'T');
							   	vendorpayment.setCurrentLineItemValue('apply', 'amount',debAmtVendAdv[k]);
							   	vendorpayment.commitLineItem('apply');
					   		}
					   		//var ret = nlapiSubmitRecord(vendorpayment, false, false);
					   		//nlapiLogExecution('DEBUG', 'Return ID:', ret);
					   //	response.write('self.close();if(window.opener && !window.opener.closed){window.opener.location.reload();};');
					  
					  
				} //END: If statement
			   	
			   /*	else 
			   	{
			   		response.writePage( form );
				}*/
			   	
	}
	
	
	
	function addValuetoFuction(recordId,recordType,accountP,ampuntP,departmentP,classPid,locationP,count,grossAmt,internalidP,checkMark,taxcd,rateTaxP)
	{
		nlapiLogExecution("DEBUG","In addValue Function","recordId "+recordId);
		nlapiLogExecution("DEBUG","In addValue Function","recordType "+recordType);
		nlapiLogExecution("DEBUG","In addValue Function","accountP "+accountP);
		nlapiLogExecution("DEBUG","In addValue Function","ampuntP "+ampuntP);
		nlapiLogExecution("DEBUG","In addValue Function","departmentP "+departmentP);
		nlapiLogExecution("DEBUG","In addValue Function","classPid "+classPid);
		nlapiLogExecution("DEBUG","In addValue Function","locationP "+locationP);
		nlapiLogExecution("DEBUG","In addValue Function","AdvancePaid "+grossAmt);
		nlapiLogExecution("DEBUG","In addValue Function","internalidP "+internalidP);
		nlapiLogExecution("DEBUG","In addValue Function","taxcd "+taxcd);
		nlapiLogExecution("DEBUG","In addValue Function","rateTaxP "+rateTaxP);
		
				var o_checkobj = nlapiLoadRecord(recordType, recordId)
				nlapiLogExecution('DEBUG', 'In addValue Function', " o_checkobj " + o_checkobj);
				
				if (o_checkobj != null && o_checkobj != '' && o_checkobj != undefined) 
				{
				
				var taxdetailoverride = o_checkobj.getFieldValue('taxdetailsoverride')
				nlapiLogExecution('DEBUG', 'In addValue Function', " taxdetailoverride " + taxdetailoverride);
				o_checkobj.setFieldValue('taxdetailsoverride','T'); 
		 		
				o_checkobj.selectNewLineItem('taxdetails');
				o_checkobj.setCurrentLineItemValue('taxdetails', 'linename', 1357);
				
				//Set Net Amount
				var netAmount = o_checkobj.getFieldValue('usertotal');
				nlapiLogExecution('DEBUG', "In addValue Function", " netAmount " +netAmount);
				//parseFloat(grossAmt); 
				
				var amountNet = parseFloat(netAmount) - parseFloat(grossAmt)
				nlapiLogExecution('DEBUG', "In addValue Function", " amountNet "+amountNet);
				o_checkobj.setCurrentLineItemValue('taxdetails', 'netamount',amountNet);
				nlapiLogExecution('DEBUG', "In addValue Function", " ampuntP in for " +ampuntP)
				
				
				//o_checkobj.setCurrentLineItemValue('taxdetails', 'grossamount', grossAmt);
				
				// Set Tax Basis Amount
				
				o_checkobj.setCurrentLineItemValue('taxdetails', 'taxbasis', amountNet);
				//Set Tax Amount
				
				var percent = (parseFloat(amountNet)* parseInt(rateTaxP)) / 100;
				nlapiLogExecution('DEBUG', "In addValue Function", " percent in for " + percent);
				o_checkobj.setCurrentLineItemValue('taxdetails', 'taxamount', +percent);
				
				//o_checkobj.setCurrentLineItemValue('taxdetails', 'taxamount',(0-ampuntP));
				//Set Tax Type
				o_checkobj.setCurrentLineItemValue('taxdetails', 'taxtype', 18);
				//Set Tax Rate
				
				o_checkobj.setCurrentLineItemValue('taxdetails', 'taxrate', rateTaxP);
				//Set Tax Code
				o_checkobj.setCurrentLineItemValue('taxdetails', 'taxcode',22);
				
				var taxdetailRef =o_checkobj.getLineItemValue('expense','taxdetailsreference',1);
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " taxdetailRef " + taxdetailRef);
			    
				
				o_checkobj.setCurrentLineItemValue('taxdetails', 'taxdetailsreference',taxdetailRef);
				
				if(checkMark=='T')
				{
				for(var j=0; j<internalidP.length; j++)
				{
					nlapiLogExecution('DEBUG', 'checkMark check', " j[] " + j);
					nlapiSubmitField('customtransaction102',internalidP[j],'custbodyadvance_aleredy_applied','T');
				}	
				}
				
	          	o_checkobj.commitLineItem('taxdetails');
	          	
	          	
	          var billid = nlapiSubmitRecord(o_checkobj,true);
				//return billid;
				} //END : if (o_checkobj != null && o_checkobj != '' && o_checkobj != undefined)
		
			
	}//END : function ends
	
	

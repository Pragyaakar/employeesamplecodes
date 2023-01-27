	function update_cm_and_payment(type)
	{
		var myCSV_data = nlapiRequestURL('https://3572894.app.netsuite.com/core/media/media.nl?id=502552&c=3572894&h=a03fc2385de2d622e313&_xt=.json',null,null);
		
		var datain = JSON.parse(myCSV_data.getBody()); // returns your csv data in a string format
		
		// nlapiLogExecution('DEBUG','postFunction',' *****string_data***** -->'+datain)
		 nlapiLogExecution('DEBUG','postFunction',' *****datain.length***** -->'+datain.length)	
		 
		 // NOTE - Deposit application code is remaining
		
		 try
		 {
			 var context = nlapiGetContext();
			 var PinCounter = '';
			 PinCounter = context.getSetting('SCRIPT', 'custscript_buff_count');
				
				if (PinCounter != null && PinCounter != '' && PinCounter != 'undefined') 
				{
					PinCounter =PinCounter;
				}
				else 
				{
					PinCounter =0;
				}
				
			for(var i=PinCounter;i<datain.length;i++)//datain.length
			{
	         	
				try
				{
					
				var checkData =datain[i];
				var type=checkData['record_type'];
				var totTranAmt=checkData['record_trans_total'];
				var DateCreated=checkData['record_datecreated'];
				var TRanDoc = checkData['record_doc_num'];
				 var OldID=checkData['record_id'];
				//nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' type In -->'+type)
				//nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' totTranAmt In -->'+totTranAmt)
				
				
				
				 if(type =='CustPymt')
				{
				    	var recId = checkData['record_id'];
					  var AccName = checkData['record_acc_name'];
					  var AR_AccName = checkData['record_ar_acc'];
					  var Payee =checkData['record_payee'];
					  var docNum =checkData['record_check_num'];
					  var TranNum= checkData['record_trans_num'];
					  var CheckNum =checkData['record_check_num'];
					  var Memo = checkData['record_memo'];
					  var Department=checkData['record_deptmt'];
					  var Location=checkData['record_location'];
					 var tranDate =checkData['record_date'];
					  var PayMent= checkData['record_payment'];
					  var refNumber= checkData['record_refnumber'];
					  var DueDateArr= checkData['record_apply_due_date'];
					  var refNumArr = checkData['record_apply_ref_num'];
					  var OrigAmtArr =checkData['record_apply_orig_amt'];
					  var AmtDueArr = checkData['record_apply_amt_due'];
							
					  var DiscDateArr =checkData['record_apply_disc_date'];
					  var DiscAvailArr =checkData['record_apply_disc_avail'];
					  var DiscTakeArr =checkData['record_apply_disc_taken'];
					  var PaymentArr = checkData['record_apply_payment'];
					  
					  var DepositLineRefArr=checkData['record_deposit_ref'];
						var DepositLineAmtArr =checkData['record_deposit_amt'];
						
						var CredLineRefArr =checkData['record_credit_ref'];
						var CredLineAmtArr =checkData['record_credit_amt'];
						
						var PayMethod=checkData['record_paymethod'];
						var pnref=checkData['record_payref'];
						var cardNumber =checkData['record_cardnum'];
						var cardExpiry = checkData['record_cardexp'];
						var cardName =checkData['record_cardname'];
						var cardProcessor=checkData['record_cardprocess'];
						
					  if(AccName !=null && AccName != undefined && AccName != '')
					  {
						  AccName = FindAccSearch(AccName.trim());
					  }
					  
					  if(AR_AccName !=null && AR_AccName != undefined && AR_AccName != '')
					  {
						  AR_AccName = FindAccSearch(AR_AccName.trim());
					  }
					  
					  if(Payee != null && Payee != '' && Payee !=undefined)
						 {
						
						  Payee = FindCustomer(Payee.trim());
					       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
						 }
					  
					  if(Department != null && Department != '' && Department !=undefined)
						 {
					   
						  Department = FindDepartment(Department.trim());
					       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
						 }
						
						if(Location != null && Location != '' && Location !=undefined)
						 {
					     
							Location = FindLocation(Location.trim());
					       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
						 }
						
	
						  createCustomerPaymentTrans(recId,AR_AccName,AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
								  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,DepositLineRefArr,DepositLineAmtArr,CredLineRefArr,CredLineAmtArr,PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor,PayMent,DateCreated,refNumber);
					  
				}
				 else if(type =='CustCred')
				{
	
	
					   var recId = checkData['record_id'];
					   var type = checkData['record_type'];
					   var tranDate =checkData['record_date'];
					  var docNum = checkData['record_doc_num'];
					  var Vendor = checkData['record_vendor'];
					var department =checkData['record_department'];
					var location = checkData['record_loc'];
					var createdFrom = checkData['record_createdfrom'];
					var InvDetailNumArr = checkData['record_line_serial_num'];
					var InvDetailQtyArr = checkData['record_line_serial_qty'];
					
					var itemArr = checkData['record_itmarr'];
					var qtyArr	= checkData['record_qtyarr'];
						
					var lineDeptArr = checkData['record_item_line_dept'];
					var lineClassArr = checkData['record_item_line_clss'];
					var lineLocArr =checkData['record_item_line_loc'];
					 var lineCustArr =checkData['record_item_line_cust'];
					 var unitsArr =checkData['record_unit_arr'];
					 var descripArr = checkData['record_descrp_arr'];
					 
					 
							
					 var vendNameArr =checkData['record_item_line_vendname'];
					 var rateArr =	checkData['record_rate_arr'];
					 var amtArr= checkData['record_amt_arr'];
						
					  var AccArr =  checkData['record_exp_line_acc'];
					  var ExpAmtArr = checkData['record_exp_line_amt'];
						
						var ExplineDeptArr = checkData['record_exp_line_dept'];
						var ExplineClassArr = checkData['record_exp_line_clss'];
						var ExplineLocArr = checkData['record_exp_line_loc'];
						var ExplineCustArr =checkData['record_exp_line_cust'];
						
						
	
						  var DueDateArr = checkData['record_apply_due_date'];
						var refNumArr = checkData['record_apply_ref_num'];
						var OrigAmtArr =checkData['record_apply_orig_amt'];
						 var AmtDueArr = checkData['record_apply_amt_due'];
								
						 var DiscDateArr =checkData['record_apply_disc_date'];
						 var DiscAvailArr =	checkData['record_apply_disc_avail'];
						 var DiscTakeArr =checkData['record_apply_disc_taken'];
						 var PaymentArr = checkData['record_apply_payment'];
						
						var AccountName=checkData['record_top_name'];
						
						if(AccountName != null && AccountName != '' && AccountName !=undefined)
						 {
							AccountName = FindAccSearch(AccountName.trim());
						 }
						
						if(Vendor != null && Vendor != '' && Vendor !=undefined)
						 {
						
							Vendor = FindCustomer(Vendor.trim());
					       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
						 }
						
						if(department != null && department != '' && department !=undefined)
						 {
					   
							department = FindDepartment(department.trim());
					       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
						 }
						
						if(location != null && location != '' && location !=undefined)
						 {
					     
							location = FindLocation(location.trim());
					       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
						 }
					     createCreditMemofunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
								   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
								   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,
								   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,InvDetailNumArr,InvDetailQtyArr,createdFrom,DateCreated);//
					   	
				
				}
				 else  if(type =='CustInvc')//type =='SalesOrd' ,CustInvc
					{
				 
				    var recId=checkData['record_id'];
					var tranDate = checkData['record_date'];
					var docNum = checkData['record_doc_num'];
					var customer= checkData['record_customer'];
					var department = checkData['record_department'];
					var location = checkData['record_loc'];
					var salesEffDate =checkData['record_sales_eff_date'];
					var shipDate = checkData['record_shipdate'];
					var shipCarrier = checkData['record_shipcarri'];
					var actulShipDate = checkData['record_ship_act_date'];
					var estGrossProfitPercent =	checkData['record_est_grs_profit_perc'];
					var createdFrom = checkData['record_createdfrom'];
					var exchRate = checkData['record_exrate'];
					var estExtCost = checkData['record_est_extcost'];
					var estGrossProfit = checkData['record_est_grs_profit'];
					var itemArr= checkData['record_itmarr'];
					var qtyArr =checkData['record_qtyarr'];
					var qtyCommitArr = checkData['record_qty_comm_arr'];
					var qtyFulfillArr =	checkData['record_qty_fulfil_arr'];
					var shipTerm =checkData['record_shipterm'];
					var InvDetailNumArr = checkData['record_line_serial_num'];
					var InvDetailQtyArr = checkData['record_line_serial_qty'];
					var shipCost=checkData['record_shipcost'];
					var qtyInvoicedArr =checkData['record_qty_inv_arr'];
					var qtyBackOrderArr= checkData['record_qty_back_arr'];
					var unitsArr=checkData['record_unit_arr'];
					
					var descripArr=checkData['record_descrp_arr'];
					
					var shipMethod=checkData['record_shipmethod'];
					var DiscItem=checkData['record_discnt_item'];
					var DiscRate =checkData['record_discnt_rate'];
					
					var priceLvlArr =checkData['record_price_arr'];
					var rateArr=checkData['record_rate_arr'];
					var amtArr=checkData['record_amt_arr'];
			        var costEstTypeArr =checkData['record_cest_type'];
		             var TaxItem = checkData['record_tax_item'];
			        
			        if(customer !=null && customer != undefined && customer != '')
			        {
			        	  customer = FindCustomer(customer.trim());
			              // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
			              
			        }
			       
			        if(department !=null && department != undefined && department != '')
			        {
			        	 department = FindDepartment(department.trim());
			             // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
			              
			        }
			        
			        if(location !=null && location != undefined && location != '')
			        {
			        	location = FindLocation(location.trim());
			            // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
			                
			        }
			       
			            createInvoiceFunction(recId,docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem,InvDetailNumArr,InvDetailQtyArr,createdFrom,shipTerm,DateCreated,shipCost,shipMethod,DiscItem,DiscRate);
					}
				
				 UsageEnd = context.getRemainingUsage();
					
				 nlapiLogExecution('DEBUG', 'schedulerFunction', 'Usage At End [' + i + '] -->' + UsageEnd);
				
				  if (UsageEnd < 1000) 
					{
						Schedulescriptafterusageexceeded(i);
						break;
					}
				
				
				}
				catch(e)
				{
					var custRec = nlapiCreateRecord('customrecord_check_new_custom',{recordmode: 'dynamic'});
				
				custRec.setFieldValue('custrecord_rec_type1',type);
				custRec.setFieldValue('custrecordrec_id1',recId);
				
				if(e !=null && e.toString().length >300)
				{
					custRec.setFieldValue('custrecord_desc','Error: Serial Number Issue');
				}
				else
				{
					custRec.setFieldValue('custrecord_desc',e);
				}
				
				custRec.setFieldValue('custrecord_doc_date',tranDate);
				custRec.setFieldValue('custrecord_doc_num1',docNum);
				custRec.setFieldValue('custrecord_amt_transcn',totTranAmt);
				var record =  nlapiSubmitRecord(custRec,true);
			    nlapiLogExecution('Debug', 'record IS Created..', "Issue record id =" + record)
			    
			     UsageEnd = context.getRemainingUsage();
					
				 nlapiLogExecution('DEBUG', 'schedulerFunction', 'Usage At End [' + i + '] -->' + UsageEnd);
				
				  if (UsageEnd < 1000) 
					{
						Schedulescriptafterusageexceeded(i);
						break;
					}
				
				
				continue;
			    }
			
				
			}
				
			
				s_result = ' Data has been successfully imported into netsuite.';
				
			return s_result;
		  }
		  catch(exception)
		  {
			nlapiLogExecution('DEBUG','ERROR',' Exception Caught -->'+exception)						
		  }
		  
	
		
	}
	
 function createInvoiceFunction(recId,docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem,InvDetailNumArr,InvDetailQtyArr,createdFrom,shipTerm,DateCreated,shipCost,shipMethod,DiscItem,DiscRate)
	{
		 var filters=new Array();
		 var columns = new Array();
			
			 filters[0] = new nlobjSearchFilter('custbody_old_transaction_int_id', null,'is',recId);
			
			 columns[0] = new nlobjSearchColumn('internalid');
			 columns[1] = new nlobjSearchColumn('custbody_old_transaction_int_id');
				
		var searchResultItem = nlapiSearchRecord('transaction', 'customsearch_old_instance_check', filters, columns);
				
		if(searchResultItem != null && searchResultItem != undefined && searchResultItem !='')
		{
		   var recordId= searchResultItem[0].getValue('internalid');
		}
		
		
		var MapShipMethod={};
		
		MapShipMethod[2]=2;
		MapShipMethod[1702]=3555;
		MapShipMethod[3]=3;
		MapShipMethod[858]=3556;
		MapShipMethod[859]=3557;
		MapShipMethod[1701]=3558;
		MapShipMethod[4]=4;
		
		
		if(recordId != null && recordId != undefined && recordId != '')
		{
			var record = nlapiLoadRecord('invoice', recordId); 
			
			if(shipCost != null && shipCost != undefined && shipCost != '')
			{
				 record.setFieldValue('shippingcost',shipCost);
			}
			
			if(shipMethod != null && shipMethod != undefined && shipMethod != '')
			{
				
							 record.setFieldValue('shipmethod',MapShipMethod[shipMethod]);
			}
			
			if(DiscItem != null && DiscItem != undefined && DiscItem != '')
			{
				
				if(DiscItem =='2354')
				{
					DiscItem = 3317;
					record.setFieldValue('discountitem',DiscItem);
				}
				 
			}
			
			if(DiscRate != null && DiscRate != undefined && DiscRate != '')
			{
				 record.setFieldValue('discountrate',DiscRate);
			}
			
			 var SubmitIt=nlapiSubmitRecord(record,true);  
				
			    nlapiLogExecution("DEBUG","In Create Function","Invoice Created ID..=="+SubmitIt);
				
		}
	}
 
	function createCreditMemofunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
			   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
			   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,
			   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,InvDetailNumArr,InvDetailQtyArr,createdFrom,DateCreated)
	{
		
		
		
		 var filters=new Array();
		 var columns = new Array();
			
			 filters[0] = new nlobjSearchFilter('custbody_old_transaction_int_id', null,'is',recId);
			
			 columns[0] = new nlobjSearchColumn('internalid');
			 columns[1] = new nlobjSearchColumn('custbody_old_transaction_int_id');
				
		var searchResultItem = nlapiSearchRecord('transaction', 'customsearch_old_instance_check', filters, columns);
				
		if(searchResultItem != null && searchResultItem != undefined && searchResultItem !='')
		{
		   var recordId= searchResultItem[0].getValue('internalid');
		}
		
		if(recordId != null && recordId != undefined && recordId != '')
		{
			var record = nlapiLoadRecord('creditmemo', recordId); 
		
			if(refNumArr != null && refNumArr != undefined && refNumArr !='')
			   {
				   var count1 = record.getLineItemCount('apply');
				   
				   
				   for(var Ab=1;Ab<=count1;Ab++)
					{
					   record.setLineItemValue('apply','apply',Ab,'F');
					}
				   
				   for(var l2=0;l2<refNumArr.length;l2++)
					{
					   for(var j=1;j<=count1;j++)
					   {
						   var RefIs = record.getLineItemValue('apply', 'refnum', j);  
							if (RefIs == refNumArr[l2])
							{	
								  record.selectLineItem('apply',j)
								  record.setCurrentLineItemValue('apply','apply','T'); 
								  record.setCurrentLineItemValue('apply','amount',PaymentArr[l2]); 
								  record.commitLineItem('apply');
							}
				        }
					}
				}
			   
			   var SubmitIt=nlapiSubmitRecord(record,true);  
				
			    nlapiLogExecution("DEBUG","In Create Function","Credit Memo Created ID..=="+SubmitIt);
				 
		}
		
	}
	

	
	function createCustomerPaymentTrans(recId,AR_AccName,AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
			  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,DepositLineRefArr,DepositLineAmtArr,CredLineRefArr,CredLineAmtArr,PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor,PayMent,DateCreated,refNumber)
	{
		
		nlapiLogExecution("DEBUG","In Create Function","Customer Payment Create Function...");
		
		
		 var filters=new Array();
		 var columns = new Array();
			
			 filters[0] = new nlobjSearchFilter('custbody_old_transaction_int_id', null,'is',recId);
			
			 columns[0] = new nlobjSearchColumn('internalid');
			 columns[1] = new nlobjSearchColumn('custbody_old_transaction_int_id');
				
		var searchResultItem = nlapiSearchRecord('transaction', 'customsearch_old_instance_check', filters, columns);
				
		if(searchResultItem != null && searchResultItem != undefined && searchResultItem !='')
		{
		   var recordId= searchResultItem[0].getValue('internalid');
		}
		
		if(recordId != null && recordId != undefined && recordId != '')
		{
			var record = nlapiLoadRecord('customerpayment',recordId);
			
			
			if(refNumber != null && refNumber != undefined && refNumber != '')
			{
				 record.setFieldValue('checknum',refNumber);
			}
			
		
			   if(DueDateArr != null && DueDateArr != undefined && DueDateArr !='')
			   {
				   var count1 = record.getLineItemCount('apply');
				   
				   for(var Ab=1;Ab<=count1;Ab++)
					{
					   record.setLineItemValue('apply','apply',Ab,'F');
					}
				   
				   for(var l2=0;l2<DueDateArr.length;l2++)
					{
					   for(var j=1;j<=count1;j++)
					   {
						   var RefIs = record.getLineItemValue('apply', 'refnum', j);  
							if (RefIs == refNumArr[l2])
							{	
								  record.selectLineItem('apply',j)
								  record.setCurrentLineItemValue('apply','apply','T'); 
								  record.setCurrentLineItemValue('apply','amount',PaymentArr[l2]); 
								  record.commitLineItem('apply');
							}
				        }
					}
				}
			   
			   
			   if(CredLineRefArr != null && CredLineRefArr != undefined && CredLineRefArr !='')
			   {
				   var count2 = record.getLineItemCount('credit');
				   
				   for(var Ab1=1;Ab1<=count2;Ab1++)
					{
					   record.setLineItemValue('credit','apply',Ab1,'F');
					}
				   
				   for(var l1=0;l1<CredLineRefArr.length;l1++)
					{
					   for(var j1=1;j1<=count2;j1++)
					   {
						   var RefIs1 = record.getLineItemValue('credit', 'refnum', j1);  
						   
						 //  nlapiLogExecution("DEBUG","In Create Function","RefIs=="+RefIs+' refNumArr[l2]== '+refNumArr[l2]);
						   
							if (RefIs1 == CredLineRefArr[l1])
							{	
							//	nlapiLogExecution("DEBUG","In Create Function","Condition true");
								   
								  record.selectLineItem('credit',j1)
								  record.setCurrentLineItemValue('credit','apply','T'); 
								  record.setCurrentLineItemValue('credit','amount',CredLineAmtArr[l1]); 
								  record.commitLineItem('credit');
								 
							}
				        }
					}
				}
			   
			   if(DepositLineRefArr != null && DepositLineRefArr != undefined && DepositLineRefArr !='')
			   {
				   var count3 = record.getLineItemCount('deposit');
				   
				 //  nlapiLogExecution("DEBUG","In Create Function","count3=="+count3);
				   
				   for(var Ab2=1;Ab2<=count3;Ab2++)
					{
					   record.setLineItemValue('deposit','apply',Ab2,'F');
					}
				   
				   for(var l3=0;l3<DepositLineRefArr.length;l3++)
					{
					   for(var j3=1;j3<=count3;j3++)
					   {
						   var RefIs2 = record.getLineItemValue('deposit', 'refnum', j3);  
						   
						 //  nlapiLogExecution("DEBUG","In Create Function","RefIs=="+RefIs+' refNumArr[l2]== '+refNumArr[l2]);
						   
							if (RefIs2 == DepositLineRefArr[l3])
							{	
								// nlapiLogExecution("DEBUG","In Create Function","Condition true");
								   
								  record.selectLineItem('deposit',j3)
								  record.setCurrentLineItemValue('deposit','apply','T'); 
								  record.setCurrentLineItemValue('deposit','amount',DepositLineAmtArr[l3]); 
								  record.commitLineItem('deposit');
								 
							}
				        }
					}
				}
			   
			   
			   var SubmitIt=nlapiSubmitRecord(record,true);  
				
			    nlapiLogExecution("DEBUG","In Create Function","Customer Payment Created ID..=="+SubmitIt);
				
		}

	}
	

	function FindAccSearch(Acc)
	{ 
		// nlapiLogExecution('DEBUG','FindCustomer Function',' FindAccSearch IS -->'+Acc)
	    var filters=new Array();
		var columns = new Array();
	  
	 
		
			// nlapiLogExecution('DEBUG','FindCustomer Function',' Inside 10600 -->'+Acc.trim())
			if(Acc != null && Acc != '' )
		    {
		      
			 filters[0] = new nlobjSearchFilter('custrecord_coa_internalid', null,'is',Acc);
			}
			
			columns[0] = new nlobjSearchColumn('internalid');
			columns[1] = new nlobjSearchColumn('custrecord_coa_internalid');
			
			var searchResultItem = nlapiSearchRecord('account', 'customsearch_integrated_acc_search', filters, columns);
			
			
				if (searchResultItem != null)
				{
					for(var j1=0;j1<searchResultItem.length;j1++)
					{
						var ID = searchResultItem[j1].getValue('internalid');
							
					}
					
				}
	
	
		//nlapiLogExecution('DEBUG','FindCustomer Function',' Account ID -->'+ID)
			return ID;
		}
	
	
	function FindVendor(Vendor)
	{ 
		// nlapiLogExecution('DEBUG','FindCustomer Function',' FindVendor IS -->'+Vendor)
	    var filters=new Array();
		var columns = new Array();
		
		if(Vendor != null && Vendor != '')
	    {
		 filters[0] = new nlobjSearchFilter('custentity_internalid', null,'is',Vendor);
		}
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('custentity_internalid');
		
		var searchResultItem = nlapiSearchRecord('vendor', 'customsearch_integrated_vendor_search', filters, columns);
		
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}
	
	
			return ID;
		}
	
	
	
	function FindClass(Class)
	{ 
		// nlapiLogExecution('DEBUG','FindCustomer Function',' FindClass IS -->'+Class)
	    var filters=new Array();
		var columns = new Array();
		
		if(Class != null && Class != '')
	    {
		 filters[0] = new nlobjSearchFilter('custrecord_class_internalid', null,'is',Class);
		}
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('custrecord_class_internalid');
		
		var searchResultItem = nlapiSearchRecord('classification', 'customsearch_integrated_class_search', filters, columns);
		
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}
	
	
			return ID;
		}
	
	
	function FindCustomer(customer)
	{ 
		// nlapiLogExecution('DEBUG','FindCustomer Function',' customer IS -->'+customer)
	    var filters=new Array();
		var columns = new Array();
		
		if(customer != null && customer != '')
	    {
		 filters[0] = new nlobjSearchFilter('custentity_internalid', null,'is',customer);
		}
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('custentity_internalid');
		
		var searchResultItem = nlapiSearchRecord('customer', 'customsearch_integrated_customer_search', filters, columns);
		
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}
	
	
			return ID;
		}
	
	function FindDepartment(department)
	{ 
	    var filters=new Array();
		var columns = new Array();
		
		// nlapiLogExecution('DEBUG','FindSubsidiary Function',' FindDepartment IS -->'+department)
		
		if(department != null && department != '')
	    {
		 filters[0] = new nlobjSearchFilter('custrecord_department_internalid', null,'is',department);
		}
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('custrecord_department_internalid');
		
		var searchResultItem = nlapiSearchRecord('department', 'customsearch_integrated_deptmnt_search', filters, columns);
		
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}
	
	
			return ID;
		}
	
	function FindLocation(location)
	{ 
	    var filters=new Array();
		var columns = new Array();
		
		// nlapiLogExecution('DEBUG','FindLocation Function',' FindLocation IS -->'+location)
		
		
		
		if(location != null && location != '')
	    {
		 filters[0] = new nlobjSearchFilter('custrecord_location_internalid', null,'is',location);
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('custrecord_location_internalid');
		
		var searchResultItem = nlapiSearchRecord('location', 'customsearch_integr_location', filters, columns);
		
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						break;
				}
				
			}
	    }
		
	
			return ID;
		}
	
	function FindItemSearch(item)
	{ 
	    var filters=new Array();
		var columns = new Array();
		
		 // nlapiLogExecution('DEBUG','FindItemSearch Function',' FindItemSearch IS -->'+item)
		
		if(item != null && item != '')
	    {
		 filters[0] = new nlobjSearchFilter('custitem_internalid', null,'is',item);
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('custitem_internalid');
		
		var searchResultItem = nlapiSearchRecord('item', 'customsearch_integrated_search', filters, columns);
		
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}
	    }
		
			// nlapiLogExecution('DEBUG','FindItemSearch Function',' New Item IS -->'+ID)
				
	
			return ID;
		}
	
	
	function FindVenPayEntitySearch(entity1)
	{ 
	    var filters=new Array();
		var columns = new Array();
		
		// nlapiLogExecution('DEBUG','FindItemSearch Function',' FindEntitySearch IS -->'+entity1)
		
		if(entity1 != null && entity1 != '')
	    {
		 filters[0] = new nlobjSearchFilter('custentity_internalid', null,'is',entity1);
		 
		// filters[1] = new nlobjSearchFilter('type', null,'anyof',"Employee","Vendor");
		
			
			columns[0] = new nlobjSearchColumn('internalid');
			columns[1] = new nlobjSearchColumn('custentity_internalid');
			
			var searchResultItem = nlapiSearchRecord('entity', 'customsearch_integrated_entity_search', filters, columns);
			
			
				if (searchResultItem != null)
				{
					for(var j1=0;j1<searchResultItem.length;j1++)
					{
						var ID = searchResultItem[j1].getValue('internalid');
							
					}
					
				}
	       }
	
	
			return ID;
		}
	
	
	function FindEntitySearch(entity)
	{ 
	    var filters=new Array();
		var columns = new Array();
		
		// nlapiLogExecution('DEBUG','FindItemSearch Function',' FindEntitySearch IS -->'+entity)
		
		if(entity != null && entity != '')
	    {
		 filters[0] = new nlobjSearchFilter('custentity_internalid', null,'is',entity);
		
		
			columns[0] = new nlobjSearchColumn('internalid');
			columns[1] = new nlobjSearchColumn('custentity_internalid');
			
			var searchResultItem = nlapiSearchRecord('entity', 'customsearch_integrated_entity_search', filters, columns);
			
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}
	
	      }
			return ID;
		}
	
	
	function FindTaxCodeSearch(code)
	{ 
	    var filters=new Array();
		var columns = new Array();
		
		// nlapiLogExecution('DEBUG','FindItemSearch Function',' FindEntitySearch IS -->'+code)
		
		if(code != null && code != '')
	    {
		 filters[0] = new nlobjSearchFilter('description', null,'is',code.trim());
		}
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('description');
		
		var searchResultItem = nlapiSearchRecord('salestaxitem', 'customsearch_tax_code', filters, columns);
		
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}
	
	
			return ID;
		}
	
	function FindCustDepositSearch(docNum)
	{ 
	    var filters=new Array();
		var columns = new Array();
		
		// nlapiLogExecution('DEBUG','FindItemSearch Function',' FindCustDepositSearch IS -->'+docNum)
		
		if(docNum != null && docNum != '')
	    {
		 filters[0] = new nlobjSearchFilter('numbertext', null,'is',docNum.trim());
		
			columns[0] = new nlobjSearchColumn('internalid');
			columns[1] = new nlobjSearchColumn('tranid');
			
			var searchResultItem = nlapiSearchRecord('customerdeposit', 'customsearch_cust_dep_search', filters, columns);
			
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}
	      }
		// nlapiLogExecution('DEBUG','FindItemSearch Function',' FindCustDepositSearch ID -->'+ID)
		
	
			return ID;
		}
	
	
	function FindTransactionNumSearch(docNum)
	{ 
	    var filters=new Array();
		var columns = new Array();
		
		// nlapiLogExecution('DEBUG','FindTransactionNumSearch Function',' FindTransactionNumSearch IS -->'+docNum)
		
		if(docNum != null && docNum != '')
	    {
		 filters[0] = new nlobjSearchFilter('numbertext', null,'is',docNum.trim());
		
			columns[0] = new nlobjSearchColumn('internalid');
			columns[1] = new nlobjSearchColumn('tranid');
			
			var searchResultItem = nlapiSearchRecord('transaction', 'customsearch_transaction_to_transform', filters, columns);
			
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}
	      }
		// nlapiLogExecution('DEBUG','FindItemSearch Function',' FindTransactionNumSearch ID -->'+ID)
		
	
			return ID;
		}
	
	function Schedulescriptafterusageexceeded(i)
	{
		//Define all parameters to schedule the script for voucher generation.
		 var params=new Array();
		 // params['status']='scheduled';
	 	 // params['runasadmin']='T';
		 params['custscript_buff_count']=i;
		 
		 var startDate = new Date();
	 	// params['startdate']=startDate.toUTCString();
		
		 var status=nlapiScheduleScript(nlapiGetContext().getScriptId(), nlapiGetContext().getDeploymentId(),params);
		 nlapiLogExecution('DEBUG','After Scheduling','Script Scheduled Status-->'+ status);
		 
		 //If Script Is Scheduled Successfuly Then Check for Status = Queued
		 if (status == 'QUEUED') 
	 	 {
			nlapiLogExecution('DEBUG', 'RESCHEDULED', '******************** Script Is Rescheduled For Record ************'+i);
	 	 }
	}//fun close
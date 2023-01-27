function schedule_GetData(type)
{
	
	var myCSV_data = nlapiRequestURL('https://432868.app.netsuite.com/core/media/media.nl?id=14504015&c=432868&h=cb1254495dbb29431f41&_xt=.json',null,null);
	var datain = JSON.parse(myCSV_data.getBody()); // returns your csv data in a string format
	
	nlapiLogExecution('DEBUG','postFunction',' *****string_data***** -->'+datain)
	 nlapiLogExecution('DEBUG','postFunction',' *****datain.length***** -->'+datain.length)	
	
	 try
	 {
		
		for(var i=0;i<datain.length;i++)
		{
         	
			try
			{
				
			
			var checkData =datain[i];
			
			var type=checkData['record_type'];
			var totTranAmt=checkData['record_trans_total'];
			
			nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' type In -->'+type)
			nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' totTranAmt In -->'+totTranAmt)
			
			
			
			if(type =='CustInvc')//SalesOrd ,CustInvc
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
			// var currency = checkData['record_currency'];
			var exchRate = checkData['record_exrate'];
			var estExtCost = checkData['record_est_extcost'];
			var estGrossProfit = checkData['record_est_grs_profit'];
			var itemArr= checkData['record_itmarr'];
			var qtyArr =checkData['record_qtyarr'];
			var qtyCommitArr = checkData['record_qty_comm_arr'];
			var qtyFulfillArr =	checkData['record_qty_fulfil_arr'];
				
			var qtyInvoicedArr =checkData['record_qty_inv_arr'];
			var qtyBackOrderArr= checkData['record_qty_back_arr'];
			var unitsArr=checkData['record_unit_arr'];
			var descripArr=checkData['record_descrp_arr'];
				
			var priceLvlArr =checkData['record_price_arr'];
			var rateArr=checkData['record_rate_arr'];
			var amtArr=checkData['record_amt_arr'];
	        var costEstTypeArr =checkData['record_cest_type'];
             var TaxItem = checkData['record_tax_item'];
	        
	        if(customer !=null && customer != undefined && customer != '')
	        {
	        	  customer = FindCustomer(customer.toString());
	              // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
	              
	        }
	       
	        if(department !=null && department != undefined && department != '')
	        {
	        	 department = FindDepartment(department.toString());
	             // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
	              
	        }
	        
	        if(location !=null && location != undefined && location != '')
	        {
	        	location = FindLocation(location.toString());
	            // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
	                
	        }
	       
	            createInvoiceFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem);
			}
			
			else if(type =='VendBill')
			{
				   var recId = checkData['record_id'];
				   var type = checkData['record_type'];
				   var tranDate =checkData['record_date'];
				  var docNum = checkData['record_doc_num'];
				  var Vendor = checkData['record_vendor'];
				var department =checkData['record_department'];
				var location = checkData['record_loc'];
					
				   
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
					
					var AccountName=checkData['record_top_name'];
					
					
					if(AccountName != null && AccountName != '' && AccountName !=undefined)
					 {
						AccountName = FindAccSearch(AccountName.toString());
					 }
					
					if(Vendor != null && Vendor != '' && Vendor !=undefined)
					 {
					
						Vendor = FindVendor(Vendor.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
					 }
					
					if(department != null && department != '' && department !=undefined)
					 {
				   
						department = FindDepartment(department.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
					 }
					
					if(location != null && location != '' && location !=undefined)
					 {
				     
						location = FindLocation(location.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
					 }
				     
				     createVendorBillfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr);
					
				      
			}
			else if(type =='Check')
			{
				   var recId = checkData['record_id'];
				   var type = checkData['record_type'];
				   var tranDate =checkData['record_date'];
				  var docNum = checkData['record_doc_num'];
				  var Payee = checkData['record_vendor'];
				var department =checkData['record_department'];
				var location = checkData['record_loc'];
					
				   
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
					
					var AccountName=checkData['record_top_name'];
					
					
					if(AccountName != null && AccountName != '' && AccountName !=undefined)
					 {
						AccountName = FindAccSearch(AccountName.toString());
					 }
					
					if(Payee != null && Payee != '' && Payee !=undefined)
					 {
					
						Payee = FindEntitySearch(Payee.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
					 }
					
					if(department != null && department != '' && department !=undefined)
					 {
				   
						department = FindDepartment(department.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
					 }
					
					if(location != null && location != '' && location !=undefined)
					 {
				     
						location = FindLocation(location.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
					 }
				     
				     createCheckfunction(AccountName,recId,type,tranDate,docNum,Payee,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr);
					
				      
			}
			
			else if(type=='VendCred')
			{

				   var recId = checkData['record_id'];
				   var type = checkData['record_type'];
				   var tranDate =checkData['record_date'];
				  var docNum = checkData['record_doc_num'];
				  var Vendor = checkData['record_vendor'];
				var department =checkData['record_department'];
				var location = checkData['record_loc'];
					
				   
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
						AccountName = FindAccSearch(AccountName.toString());
					 }
					
					if(Vendor != null && Vendor != '' && Vendor !=undefined)
					 {
					
						Vendor = FindVendor(Vendor.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
					 }
					
					if(department != null && department != '' && department !=undefined)
					 {
				   
						department = FindDepartment(department.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
					 }
					
					if(location != null && location != '' && location !=undefined)
					 {
				     
						location = FindLocation(location.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
					 }
				     createVendorCreditfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,
							   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr);
				
			}
			else if(type =='VendPymt')
			{
				  var recId = checkData['record_id'];
				  var AccName = checkData['record_acc_name'];
				  var Payee =checkData['record_payee'];
				  
				  var docNum =checkData['record_check_num'];
				  var TranNum= checkData['record_trans_num'];
				  var CheckNum =checkData['record_check_num'];
				  var Memo = checkData['record_memo'];
				  var Department=checkData['record_deptmt'];
				  var Location=checkData['record_location'];
				 var tranDate =checkData['record_date'];
				  var DueDateArr= checkData['record_apply_due_date'];
				  var refNumArr = checkData['record_apply_ref_num'];
				  var OrigAmtArr =checkData['record_apply_orig_amt'];
				  var AmtDueArr = checkData['record_apply_amt_due'];
						
				  var DiscDateArr =checkData['record_apply_disc_date'];
				  var DiscAvailArr =checkData['record_apply_disc_avail'];
				  var DiscTakeArr =checkData['record_apply_disc_taken'];
				  var PaymentArr = checkData['record_apply_payment'];
				  
				  var CredLineRefArr =checkData['record_credit_ref'];
				  var CredLineAmtArr =checkData['record_credit_amt'];
					
				  if(AccName !=null && AccName != undefined && AccName != '')
				  {
					  AccName = FindAccSearch(AccName.toString());
				  }
				  
				  nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' AccName In -->'+AccName)
				  
				  if(Payee != null && Payee != '' && Payee !=undefined)
					 {
					
					  Payee = FindVenPayEntitySearch(Payee.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
					 }
				  
				  if(Department != null && Department != '' && Department !=undefined)
					 {
				   
					  Department = FindDepartment(Department.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
					 }
					
					if(Location != null && Location != '' && Location !=undefined)
					 {
				     
						Location = FindLocation(Location.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
					 }
					

					  createBillPaymentTrans(AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
							  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,CredLineRefArr,CredLineAmtArr);
				  
			}
			else if(type =='CustPymt')
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
					
				  if(AccName !=null && AccName != undefined && AccName != '')
				  {
					  AccName = FindAccSearch(AccName.toString());
				  }
				  
				  if(AR_AccName !=null && AR_AccName != undefined && AR_AccName != '')
				  {
					  AR_AccName = FindAccSearch(AR_AccName.toString());
				  }
				  
				  if(Payee != null && Payee != '' && Payee !=undefined)
					 {
					
					  Payee = FindCustomer(Payee.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
					 }
				  
				  if(Department != null && Department != '' && Department !=undefined)
					 {
				   
					  Department = FindDepartment(Department.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
					 }
					
					if(Location != null && Location != '' && Location !=undefined)
					 {
				     
						Location = FindLocation(Location.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
					 }
					

					  createCustomerPaymentTrans(AR_AccName,AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
							  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,DepositLineRefArr,DepositLineAmtArr,CredLineRefArr,CredLineAmtArr);
				  
			}
			else if(type =='CustDep')
			{
				var recId = checkData['record_id'];
			   var AccName = checkData['record_acc_name'];
			   var Customer = checkData['record_payee'];
			    var TranNum = checkData['record_trans_num'];
			    var docNum=checkData['record_check_num'];
				var CheckNum = checkData['record_check_num'];
				var tranDate = checkData['record_date'];
			    var Memo = checkData['record_memo'];
				var Department = checkData['record_deptmt'];
				var Location = checkData['record_location'];
				var payMethod = checkData['record_pay_meethod'];
	            var CheckN =checkData['record_num_chk'];
	        	var SalesOrder =checkData['record_sales_order'];
	            var DueDateArr= checkData['record_apply_due_date'];
				  var refNumArr = checkData['record_apply_ref_num'];
				  var OrigAmtArr =checkData['record_apply_orig_amt'];
				  var AmtDueArr = checkData['record_apply_amt_due'];
						
				  var DiscDateArr =checkData['record_apply_disc_date'];
				  var DiscAvailArr =checkData['record_apply_disc_avail'];
				  var DiscTakeArr =checkData['record_apply_disc_taken'];
				  var PaymentArr = checkData['record_apply_payment'];
				  var Payment = checkData['record_payment'];
					
				  if(AccName !=null && AccName != undefined && AccName != '')
				  {
					  AccName = FindAccSearch(AccName.toString());
				  }
				  
				  if(Customer != null && Customer != '' && Customer !=undefined)
					 {
					
					  Customer = FindCustomer(Customer.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
					 }
				  
				  if(Department != null && Department != '' && Department !=undefined)
					 {
				   
					  Department = FindDepartment(Department.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
					 }
					
					if(Location != null && Location != '' && Location !=undefined)
					 {
				     
						Location = FindLocation(Location.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
					 }
					
					 createCustomerDeposit(AccName,Customer,TranNum,CheckNum,tranDate,Memo,Department,Location,payMethod,
							  CheckN,DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,SalesOrder,Payment);
			}
			else if(type =='Journal')
			{
				var recId = checkData['record_id'];
				var TranDate= checkData['record_date'];
				var tranDate= checkData['record_date'];
				var docNum=checkData['record_tranid'];
				var ReverseTranDate=checkData['record_reverse_date'];
				var ReversedocNum =checkData['record_reverse_tranid'];
				var AccArr = checkData['record_acc_line'];
				var debitArr=checkData['record_debit_line'];
				var creditArr=checkData['record_credit_line'];
			    var nameArr =checkData['record_name_line'];
				var memoArr =checkData['record_memo_line'];
				var deprtmentArr=checkData['record_department_line'];
				var locArr= checkData['record_location_line'];
				
				 createJEfunction(TranDate,docNum,AccArr,debitArr,creditArr,nameArr,memoArr,deprtmentArr,locArr,ReverseTranDate,ReversedocNum);
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
						AccountName = FindAccSearch(AccountName.toString());
					 }
					
					if(Vendor != null && Vendor != '' && Vendor !=undefined)
					 {
					
						Vendor = FindCustomer(Vendor.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
					 }
					
					if(department != null && department != '' && department !=undefined)
					 {
				   
						department = FindDepartment(department.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
					 }
					
					if(location != null && location != '' && location !=undefined)
					 {
				     
						location = FindLocation(location.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
					 }
				     createCreditMemofunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,
							   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr);
				
			
			}	
			else if(type=='deposit')
			{
				    
				   var AccName = checkData['record_acc_name'];
				   var docNum = checkData['record_doc_num'];
				   var tranDate =checkData['record_date'];
				   var Memo= checkData['record_memo'];
					var Department =checkData['record_deptmt'];
					var Location=checkData['record_location'];
					var PayDepoNumArr =checkData['record_paydepo_num'];
					var PayDepoDate =checkData['record_paydepo_date'];
					
					var otherNameArr =checkData['record_other_name'];
					var otherAccArr = checkData['record_other_acc'];
					var otherAmtArr= checkData['record_other_amt'];
					var otherRefNumArr=checkData['record_other_ref'];
					var otherDepArr=checkData['record_other_dept'];
					var otherLocArr =checkData['record_other_loc'];
					
				
					var cashBackAccArr =checkData['record_cash_acc'];
					var cashBackAmtArr =checkData['record_cash_amt'];
					var cashBackMemoArr=checkData['record_cash_ref'];
					var cashBackDepArr=checkData['record_cash_dept'];
					var cashbackLocArr=checkData['record_cash_loc'];
					
					if(AccName != null && AccName != '' && AccName !=undefined)
					 {
						AccName = FindAccSearch(AccName.toString());
					 }
				
					if(Department != null && Department != '' && Department !=undefined)
					 {
				   
						Department = FindDepartment(Department.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
					 }
					
					if(Location != null && Location != '' && Location !=undefined)
					 {
				     
						Location = FindLocation(Location.toString());
				       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
					 }
					
					createDepositFunction(AccName,Department,Location,docNum,tranDate,Memo,PayDepoNumArr,PayDepoDate,
							otherNameArr,otherAccArr,otherAmtArr,otherRefNumArr,otherDepArr,otherLocArr,
							cashBackAccArr,cashBackAmtArr,cashBackMemoArr,cashBackDepArr,cashbackLocArr);
			}
			
			}
			catch(e)
			{
				var custRec = nlapiCreateRecord('customrecord_issue_rec_integr',{recordmode: 'dynamic'});
			
				custRec.setFieldValue('custrecord_rec_type',type);
				custRec.setFieldValue('custrecord_rec_id',recId);
				custRec.setFieldValue('custrecord_issue_descr',e);
				custRec.setFieldValue('custrecord_trans_date',tranDate);
				custRec.setFieldValue('custrecord_doc_num',docNum);
				custRec.setFieldValue('custrecord_amt_trans',totTranAmt);
				var record =  nlapiSubmitRecord(custRec,true);
			    nlapiLogExecution('Debug', 'record IS Created..', "Issue record id =" + record)
				
				continue;
			}
		
			var remainingUsage = nlapiGetContext().getRemainingUsage();
						if (remainingUsage < 50) {
							nlapiYieldScript();
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


function createInvoiceFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem)
{

	var record = nlapiCreateRecord('invoice', {recordmode: 'dynamic'}); //salesorder
	
	
	if(customer != null && customer != undefined && customer != '')
	{
		   record.setFieldValue('entity',customer);
	}

	if(docNum != null && docNum != undefined && docNum != '')
	{
		record.setFieldValue('tranid',docNum);
	}
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
	}
	if(department != null && department != undefined && department != '')
	{
		record.setFieldValue('department',department);
	}
	if(location != null && location != undefined && location != '')
	{
		record.setFieldValue('location',location);
	}
	 
	if(salesEffDate != null && salesEffDate != undefined && salesEffDate != '')
	{
		record.setFieldValue('saleseffectivedate',new Date(salesEffDate));
	}
	
	if(shipDate != null && shipDate != undefined && shipDate != '')
	{
		record.setFieldValue('shipdate',new Date(shipDate));
	}
	
	if(shipCarrier != null && shipCarrier != undefined && shipCarrier != '')
	{
		record.setFieldValue('shipcarrier',shipCarrier);
	}
	  
	if(actulShipDate != null && actulShipDate != undefined && actulShipDate != '')
	{
		record.setFieldValue('actualshipdate',new Date(actulShipDate));
	}
	  // record.setFieldValue('currency',currency);
	if(exchRate != null && exchRate != undefined && exchRate != '')
	{
		record.setFieldValue('exchangerate',exchRate);
	}
	if(estExtCost != null && estExtCost != undefined && estExtCost != '')
	{
		record.setFieldValue('totalcostestimate',estExtCost);
	}
	if(estGrossProfit != null && estGrossProfit != undefined && estGrossProfit != '')
	{
		record.setFieldValue('estgrossprofit',estGrossProfit);
	}
	if(estGrossProfitPercent != null && estGrossProfitPercent != undefined && estGrossProfitPercent != '')//TaxItem
	{
		record.setFieldValue('estgrossprofitpercent',estGrossProfitPercent);
	}

 // record.setFieldValue('istaxable','F');
  
  if(TaxItem != null && TaxItem != undefined && TaxItem != '')//TaxItem
	{
	  var SetTxCode =FindTaxCodeSearch(TaxItem);
		record.setFieldValue('taxitem',SetTxCode);
	}
	  
	   record.setFieldValue('custbody1','T'); 
	   record.setFieldValue('custbody_service_status',41);   // Demo account mandatory field that is why taken
	   
	   nlapiLogExecution("DEBUG","In Create Function","itemArr =="+itemArr);
	    for( var l=0;l<itemArr.length;l++)
		{
	    	//   nlapiLogExecution("DEBUG","In Create Function","itemArr.length =="+itemArr.length);
	    	  //nlapiLogExecution("DEBUG","In Create Function","itemArr.length =="+qtyArr[l]);
	    	  
	         var itemSet  = FindItemSearch(itemArr[l]);
	    	  
	    	 record.selectNewLineItem('item');
		    
	    	 if(itemSet != null && itemSet != undefined && itemSet != '')
	    		{
	    		  record.setCurrentLineItemValue('item','item',itemSet);
	    		}
		    
	    	 if(qtyArr[l] != null && qtyArr[l] != undefined && qtyArr[l] != '')
	    		{
	    		  record.setCurrentLineItemValue('item','quantity',qtyArr[l]);
	    		}
		    
	    	 if(qtyCommitArr[l] != null && qtyCommitArr[l] != undefined && qtyCommitArr[l] != '')
	    		{
	    		   record.setCurrentLineItemValue('item','quantitycommitted',qtyCommitArr[l]);
	    		}
		    
	    	 if(qtyInvoicedArr[l] != null && qtyInvoicedArr[l] != undefined && qtyInvoicedArr[l] != '')
	    		{
	    		  record.setCurrentLineItemValue('item','quantitybilled',qtyInvoicedArr[l]);
	    		}
		   
	    	 if(qtyFulfillArr[l] != null && qtyFulfillArr[l] != undefined && qtyFulfillArr[l] != '')
	    		{
	    		 record.setCurrentLineItemValue('item','quantityfulfilled',qtyFulfillArr[l]);
	    		}
		    
	    	 if(qtyBackOrderArr[l] != null && qtyBackOrderArr[l] != undefined && qtyBackOrderArr[l] != '')
	    		{
	    		 record.setCurrentLineItemValue('item','quantitybackordered',qtyBackOrderArr[l]);
	    		}
		    
	    	 if(customer != null && customer != undefined && customer != '')
	    		{
	    		 record.setCurrentLineItemValue('item','units',unitsArr[l]);
	    		}
		    
	    	 if(descripArr[l] != null && descripArr[l] != undefined && descripArr[l] != '')
	    		{
	    		 record.setCurrentLineItemValue('item','description',descripArr[l]);
	    		}
		    
	    	 if(priceLvlArr[l] != null && priceLvlArr[l] != undefined && priceLvlArr[l] != '')
	    		{
	    		 record.setCurrentLineItemValue('item','price',priceLvlArr[l]);
	    		}
		    
	    	 if(rateArr[l] != null && rateArr[l] != undefined && rateArr[l] != '')
	    		{
	    		 record.setCurrentLineItemValue('item','rate',rateArr[l]);
	    		}
		    
	    	 if(amtArr[l] != null && amtArr[l] != undefined && amtArr[l] != '')
	    		{
	    		 record.setCurrentLineItemValue('item','amount',amtArr[l]);
	    		}
		    
		   //  record.setCurrentLineItemValue('item','costestimatetype',costEstTypeArr[l]);
		    
		     record.commitLineItem('item');
		}
	    
	    var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","SO Created ID..=="+SubmitIt);
		 
	
	
}

function createVendorBillfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr)
{
	var record = nlapiCreateRecord('vendorbill', {recordmode: 'dynamic'}); 
	
	if(Vendor != null && Vendor != undefined && Vendor != '')
	{
		record.setFieldValue('entity',Vendor);
	}
	
	if(AccountName != null && AccountName != undefined && AccountName != '')
	{
		record.setFieldValue('account',AccountName);
	}
	
	if(docNum != null && docNum != undefined && docNum != '')
	{
		record.setFieldValue('tranid',docNum);
	}
	   
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
	}
	   
	if(department != null && department != undefined && department != '')
	{
		record.setFieldValue('department',department);
	}
	   
	if(location != null && location != undefined && location != '')
	{
		record.setFieldValue('location',location);//AccountName
	}
	 //AccountName
	   
	record.setFieldValue('custbody1','T');
	 record.setFieldValue('custbody_service_status',41);
	   
	   if(itemArr != null && itemArr != undefined && itemArr !='')
	   {
		   for( var l=0;l<itemArr.length;l++)
			{
		    	  
			   if(itemArr[l] != null && itemArr[l] != undefined && itemArr[l] != '')
				{
				   var itemSet  = FindItemSearch(itemArr[l]);
				}
		        
			   if(lineDeptArr[l] != null && lineDeptArr[l] != undefined && lineDeptArr[l] != '')
				{
				   var setLineDep = FindDepartment(lineDeptArr[l].toString());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].toString());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].toString());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].toString());
				}
				    
		    	  
		    	 record.selectNewLineItem('item');
			    
		    	 if(itemSet != null && itemSet != undefined && itemSet != '')
					{
		    		 record.setCurrentLineItemValue('item','item',itemSet);
					}
			    
		    	 if(qtyArr[l] != null && qtyArr[l] != undefined && qtyArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','quantity',qtyArr[l]);
					}
		    	 
		    	 if(setLineVendor != null && setLineVendor != undefined && setLineVendor != '')
					{
		    		 record.setCurrentLineItemValue('item','vendorname',setLineVendor);
					}
			     
		    	 if(unitsArr[l] != null && unitsArr[l] != undefined && unitsArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','units',unitsArr[l]);
					}
				    
		    	 if(descripArr[l] != null && descripArr[l] != undefined && descripArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','description',descripArr[l]);
					}
			    
		    	 if(setLineLoc != null && setLineLoc != undefined && setLineLoc != '')
					{
		    		 record.setCurrentLineItemValue('item','location',setLineLoc);
					}
			     
		    	 if(setLineDep!= null && setLineDep != undefined && setLineDep != '')
					{
		    		 record.setCurrentLineItemValue('item','department',setLineDep);
					}
			    
		    	 if(setLineCust != null && setLineCust != undefined && setLineCust != '')
					{
		    		 record.setCurrentLineItemValue('item','customer',setLineCust);
					}
				    
		    	 if(rateArr[l] != null && rateArr[l] != undefined && rateArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','rate',rateArr[l]);
					}
			    
		    	 if(amtArr[l] != null && amtArr[l] != undefined && amtArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','amount',amtArr[l]);
					}
			     
			     record.commitLineItem('item');
			}
			    
	   }
	   
	   if(AccArr != null && AccArr != undefined && AccArr !='')
	   {
		   for( var l1=0;l1<AccArr.length;l1++)
			{
		    	  
			   
			   if(AccArr[l1] != null && AccArr[l1] != undefined && AccArr[l1] != '')
				{
				   var Acc  = FindAccSearch(AccArr[l1]);
				}
		        
			   if(ExplineDeptArr[l1] != null && ExplineDeptArr[l1] != undefined && ExplineDeptArr[l1] != '')
				{
				   var setLineDep = FindDepartment(ExplineDeptArr[l1].toString());
				}
			        
			   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(ExplineLocArr[l1].toString());
				}
			    
			   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
				{
				   var setLineCust = FindCustomer(ExplineCustArr[l1].toString());
				}
			      
		    	 record.selectNewLineItem('expense');
			    
		    	 if(Acc != null && Acc != undefined && Acc != '')
					{
		    		 record.setCurrentLineItemValue('expense','account',Acc);
					}
			    
		    	 if(setLineDep != null && setLineDep != undefined && setLineDep != '')
					{
		    		 record.setCurrentLineItemValue('expense','department',setLineDep);
					}
			     
		    	 if(setLineLoc != null && setLineLoc != undefined && setLineLoc != '')
					{
		    		 record.setCurrentLineItemValue('expense','location',setLineLoc);
					}
			    
		    	 if(setLineCust != null && setLineCust != undefined && setLineCust != '')
					{
		    		 record.setCurrentLineItemValue('expense','customer',setLineCust);
					}
			    
		    	 if(ExpAmtArr[l1] != null && ExpAmtArr[l1] != undefined && ExpAmtArr[l1] != '')
					{
		    		 record.setCurrentLineItemValue('expense','amount',ExpAmtArr[l1]);
					}
			     
			     record.commitLineItem('expense');
			}
	   }
	   var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","Vendor Bill Created ID..=="+SubmitIt);
		 
}


function createVendorCreditfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,
		   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr)
{
	nlapiLogExecution("DEBUG","In Create Function","Vendor Credit Function Call....");
	
	var record = nlapiCreateRecord('vendorcredit', {recordmode: 'dynamic'}); 
	
	if(Vendor != null && Vendor != undefined && Vendor != '')
	{
		record.setFieldValue('entity',Vendor);
	}
	
	if(AccountName != null && AccountName != undefined && AccountName != '')
	{
		record.setFieldValue('account',AccountName);
	}
	
	if(docNum != null && docNum != undefined && docNum != '')
	{
		record.setFieldValue('tranid',docNum);
	}
	   
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
	}
	   
	if(department != null && department != undefined && department != '')
	{
		record.setFieldValue('department',department);
	}
	   
	if(location != null && location != undefined && location != '')
	{
		record.setFieldValue('location',location);//AccountName
	}
	 //AccountName
	   
	record.setFieldValue('custbody1','T');
	 record.setFieldValue('custbody_service_status',41);
	   
	   if(itemArr != null && itemArr != undefined && itemArr !='')
	   {
		   for( var l=0;l<itemArr.length;l++)
			{
		    	  
			   if(itemArr[l] != null && itemArr[l] != undefined && itemArr[l] != '')
				{
				   var itemSet  = FindItemSearch(itemArr[l]);
				}
		        
			   if(lineDeptArr[l] != null && lineDeptArr[l] != undefined && lineDeptArr[l] != '')
				{
				   var setLineDep = FindDepartment(lineDeptArr[l].toString());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].toString());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].toString());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].toString());
				}
				    
		    	  
		    	 record.selectNewLineItem('item');
			    
		    	 if(itemSet != null && itemSet != undefined && itemSet != '')
					{
		    		 record.setCurrentLineItemValue('item','item',itemSet);
					}
			    
		    	 if(qtyArr[l] != null && qtyArr[l] != undefined && qtyArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','quantity',qtyArr[l]);
					}
		    	 
		    	 if(setLineVendor != null && setLineVendor != undefined && setLineVendor != '')
					{
		    		 record.setCurrentLineItemValue('item','vendorname',setLineVendor);
					}
			     
		    	 if(unitsArr[l] != null && unitsArr[l] != undefined && unitsArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','units',unitsArr[l]);
					}
				    
		    	 if(descripArr[l] != null && descripArr[l] != undefined && descripArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','description',descripArr[l]);
					}
			    
		    	 if(setLineLoc != null && setLineLoc != undefined && setLineLoc != '')
					{
		    		 record.setCurrentLineItemValue('item','location',setLineLoc);
					}
			     
		    	 if(setLineDep!= null && setLineDep != undefined && setLineDep != '')
					{
		    		 record.setCurrentLineItemValue('item','department',setLineDep);
					}
			    
		    	 if(setLineCust != null && setLineCust != undefined && setLineCust != '')
					{
		    		 record.setCurrentLineItemValue('item','customer',setLineCust);
					}
				    
		    	 if(rateArr[l] != null && rateArr[l] != undefined && rateArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','rate',rateArr[l]);
					}
			    
		    	 if(amtArr[l] != null && amtArr[l] != undefined && amtArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','amount',amtArr[l]);
					}
			     
			     record.commitLineItem('item');
			}
			    
	   }
	   
	   if(AccArr != null && AccArr != undefined && AccArr !='')
	   {
		   for( var l1=0;l1<AccArr.length;l1++)
			{
		    	  
			   
			   if(AccArr[l1] != null && AccArr[l1] != undefined && AccArr[l1] != '')
				{
				   var Acc  = FindAccSearch(AccArr[l1]);
				}
		        
			   if(ExplineDeptArr[l1] != null && ExplineDeptArr[l1] != undefined && ExplineDeptArr[l1] != '')
				{
				   var setLineDep = FindDepartment(ExplineDeptArr[l1].toString());
				}
			        
			   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(ExplineLocArr[l1].toString());
				}
			    
			   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
				{
				   var setLineCust = FindCustomer(ExplineCustArr[l1].toString());
				}
			      
		    	 record.selectNewLineItem('expense');
			    
		    	 if(Acc != null && Acc != undefined && Acc != '')
					{
		    		 record.setCurrentLineItemValue('expense','account',Acc);
					}
			    
		    	 if(setLineDep != null && setLineDep != undefined && setLineDep != '')
					{
		    		 record.setCurrentLineItemValue('expense','department',setLineDep);
					}
			     
		    	 if(setLineLoc != null && setLineLoc != undefined && setLineLoc != '')
					{
		    		 record.setCurrentLineItemValue('expense','location',setLineLoc);
					}
			    
		    	 if(setLineCust != null && setLineCust != undefined && setLineCust != '')
					{
		    		 record.setCurrentLineItemValue('expense','customer',setLineCust);
					}
			    
		    	 if(ExpAmtArr[l1] != null && ExpAmtArr[l1] != undefined && ExpAmtArr[l1] != '')
					{
		    		 record.setCurrentLineItemValue('expense','amount',ExpAmtArr[l1]);
					}
			     
			     record.commitLineItem('expense');
			}
	   }
	   
	   
	   if(DueDateArr != null && DueDateArr != undefined && DueDateArr !='')
	   {
		   var count1 = record.getLineItemCount('apply');
		   
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
	   
	   var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","Vendor Credit Created ID..=="+SubmitIt);
		 
}


function createCreditMemofunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,
		   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr)
{
	nlapiLogExecution("DEBUG","In Create Function","Credit Memo Function Call....");
	
	var record = nlapiCreateRecord('creditmemo', {recordmode: 'dynamic'}); 
	
	if(Vendor != null && Vendor != undefined && Vendor != '')
	{
		record.setFieldValue('entity',Vendor);
	}
	
	if(AccountName != null && AccountName != undefined && AccountName != '')
	{
		//record.setFieldValue('account',AccountName);
	}
	
	if(docNum != null && docNum != undefined && docNum != '')
	{
		record.setFieldValue('tranid',docNum);
	}
	   
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
	}
	   
	if(department != null && department != undefined && department != '')
	{
		record.setFieldValue('department',department);
	}
	   
	if(location != null && location != undefined && location != '')
	{
		record.setFieldValue('location',location);//AccountName
	}
	 //AccountName
	   
	record.setFieldValue('custbody1','T');
	record.setFieldValue('custbody_service_status',41);
	   
	   if(itemArr != null && itemArr != undefined && itemArr !='')
	   {
		   for( var l=0;l<itemArr.length;l++)
			{
		    	  
			   if(itemArr[l] != null && itemArr[l] != undefined && itemArr[l] != '')
				{
				   var itemSet  = FindItemSearch(itemArr[l]);
				}
		        
			   if(lineDeptArr[l] != null && lineDeptArr[l] != undefined && lineDeptArr[l] != '')
				{
				   var setLineDep = FindDepartment(lineDeptArr[l].toString());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].toString());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].toString());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].toString());
				}
				    
		    	  
		    	 record.selectNewLineItem('item');
			    
		    	 if(itemSet != null && itemSet != undefined && itemSet != '')
					{
		    		 record.setCurrentLineItemValue('item','item',itemSet);
					}
			    
		    	 if(qtyArr[l] != null && qtyArr[l] != undefined && qtyArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','quantity',qtyArr[l]);
					}
		    	 
		    	 if(setLineVendor != null && setLineVendor != undefined && setLineVendor != '')
					{
		    		 record.setCurrentLineItemValue('item','vendorname',setLineVendor);
					}
			     
		    	 if(unitsArr[l] != null && unitsArr[l] != undefined && unitsArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','units',unitsArr[l]);
					}
				    
		    	 if(descripArr[l] != null && descripArr[l] != undefined && descripArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','description',descripArr[l]);
					}
			    
		    	 if(setLineLoc != null && setLineLoc != undefined && setLineLoc != '')
					{
		    		 record.setCurrentLineItemValue('item','location',setLineLoc);
					}
			     
		    	 if(setLineDep!= null && setLineDep != undefined && setLineDep != '')
					{
		    		 record.setCurrentLineItemValue('item','department',setLineDep);
					}
			    
		    	 if(setLineCust != null && setLineCust != undefined && setLineCust != '')
					{
		    		 record.setCurrentLineItemValue('item','customer',setLineCust);
					}
				    
		    	 if(rateArr[l] != null && rateArr[l] != undefined && rateArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','rate',rateArr[l]);
					}
			    
		    	 if(amtArr[l] != null && amtArr[l] != undefined && amtArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','amount',amtArr[l]);
					}
			     
			     record.commitLineItem('item');
			}
			    
	   }
	   
	   if(AccArr != null && AccArr != undefined && AccArr !='')
	   {
		   for( var l1=0;l1<AccArr.length;l1++)
			{
		    	  
			   
			   if(AccArr[l1] != null && AccArr[l1] != undefined && AccArr[l1] != '')
				{
				   var Acc  = FindAccSearch(AccArr[l1]);
				}
		        
			   if(ExplineDeptArr[l1] != null && ExplineDeptArr[l1] != undefined && ExplineDeptArr[l1] != '')
				{
				   var setLineDep = FindDepartment(ExplineDeptArr[l1].toString());
				}
			        
			   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(ExplineLocArr[l1].toString());
				}
			    
			   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
				{
				   var setLineCust = FindCustomer(ExplineCustArr[l1].toString());
				}
			      
		    	 record.selectNewLineItem('expense');
			    
		    	 if(Acc != null && Acc != undefined && Acc != '')
					{
		    		 record.setCurrentLineItemValue('expense','account',Acc);
					}
			    
		    	 if(setLineDep != null && setLineDep != undefined && setLineDep != '')
					{
		    		 record.setCurrentLineItemValue('expense','department',setLineDep);
					}
			     
		    	 if(setLineLoc != null && setLineLoc != undefined && setLineLoc != '')
					{
		    		 record.setCurrentLineItemValue('expense','location',setLineLoc);
					}
			    
		    	 if(setLineCust != null && setLineCust != undefined && setLineCust != '')
					{
		    		 record.setCurrentLineItemValue('expense','customer',setLineCust);
					}
			    
		    	 if(ExpAmtArr[l1] != null && ExpAmtArr[l1] != undefined && ExpAmtArr[l1] != '')
					{
		    		 record.setCurrentLineItemValue('expense','amount',ExpAmtArr[l1]);
					}
			     
			     record.commitLineItem('expense');
			}
	   }
	   
	   
	   if(DueDateArr != null && DueDateArr != undefined && DueDateArr !='')
	   {
		   var count1 = record.getLineItemCount('apply');
		   
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
	   
	   var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","Credit Memo Created ID..=="+SubmitIt);
		 
}


function createBillPaymentTrans(AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
		  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,CredLineRefArr,CredLineAmtArr)
{
	
	nlapiLogExecution("DEBUG","In Create Function","Vendor Payment Create Function...");
	
	var record = nlapiCreateRecord('vendorpayment', {recordmode: 'dynamic'});
	
    record.setFieldValue('apacct',112);
  
	if(Payee != null && Payee != undefined && Payee != '')
	{
		record.setFieldValue('entity',Payee);
	}
	
	if(AccName != null && AccName != undefined && AccName != '')
	{
		record.setFieldValue('account',AccName);
	}
	
    
  
	if(CheckNum != null && CheckNum != undefined && CheckNum != '')
	{
		record.setFieldValue('tranid',CheckNum);
	}
	 
	record.setFieldValue('memo',Memo);
	
	record.setFieldValue('transactionnumber',TranNum);
	
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
	}
	   
	if(Department != null && Department != undefined && Department != '')
	{
		record.setFieldValue('department',Department);
	}
	   
	if(Location != null && Location != undefined && Location != '')
	{
		record.setFieldValue('location',Location);//AccountName
	}
	 //AccountName
	   
	record.setFieldValue('custbody1','T');//
	 record.setFieldValue('custbody_service_status',41);
  
 // nlapiLogExecution("DEBUG","In Create Function","DueDateArr=="+DueDateArr);
 // nlapiLogExecution("DEBUG","In Create Function","refNumArr=="+refNumArr);
	   
	   if(DueDateArr != null && DueDateArr != undefined && DueDateArr !='')
	   {
		   var count1 = record.getLineItemCount('apply');
		   
		   nlapiLogExecution("DEBUG","In Create Function","count1=="+count1);
		   
		   for(var l2=0;l2<DueDateArr.length;l2++)
			{
			   for(var j=1;j<=count1;j++)
			   {
				   var RefIs = record.getLineItemValue('apply', 'refnum', j);  
				   
				 //  nlapiLogExecution("DEBUG","In Create Function","RefIs=="+RefIs+' refNumArr[l2]== '+refNumArr[l2]);
				   
					if (RefIs == refNumArr[l2])
					{	
						nlapiLogExecution("DEBUG","In Create Function","Condition true");
						   
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
		   
		   nlapiLogExecution("DEBUG","In Create Function","count2=="+count2);
		   
		   for(var l1=0;l1<CredLineRefArr.length;l1++)
			{
			   for(var j1=1;j1<=count2;j1++)
			   {
				   var RefIs1 = record.getLineItemValue('credit', 'refnum', j1);  
				   
				 //  nlapiLogExecution("DEBUG","In Create Function","RefIs=="+RefIs+' refNumArr[l2]== '+refNumArr[l2]);
				   
					if (RefIs1 == CredLineRefArr[l1])
					{	
						nlapiLogExecution("DEBUG","In Create Function","Condition true");
						   
						  record.selectLineItem('credit',j1)
						  record.setCurrentLineItemValue('credit','apply','T'); 
						  record.setCurrentLineItemValue('credit','amount',CredLineAmtArr[l1]); 
						  record.commitLineItem('credit');
						 
					}
		        }
			}
		}
	   
	   var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","Vendor Payment Created ID..=="+SubmitIt);
		
}

function createCustomerPaymentTrans(AR_AccName,AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
		  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,DepositLineRefArr,DepositLineAmtArr,CredLineRefArr,CredLineAmtArr)
{
	
	nlapiLogExecution("DEBUG","In Create Function","Customer Payment Create Function...");
	
	var record = nlapiCreateRecord('customerpayment', {recordmode: 'dynamic'});
	
	if(Payee != null && Payee != undefined && Payee != '')
	{
		record.setFieldValue('customer',Payee);
	}
	
	if(AccName != null && AccName != undefined && AccName != '')
	{
		 record.setFieldValue('undepfunds','T');
		record.setFieldValue('account',AccName);
	}
	
	if(AR_AccName != null && AR_AccName != undefined && AR_AccName != '')
	{
		// record.setFieldValue('aracct',AR_AccName);
	}
	
	if(CheckNum != null && CheckNum != undefined && CheckNum != '')
	{
		record.setFieldValue('tranid',CheckNum);
	}
	 
	record.setFieldValue('memo',Memo);
	
	record.setFieldValue('transactionnumber',TranNum);
	
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
	}
	   
	if(Department != null && Department != undefined && Department != '')
	{
		record.setFieldValue('department',Department);
	}
	   
	if(Location != null && Location != undefined && Location != '')
	{
		record.setFieldValue('location',Location);//AccountName
	}
	 //AccountName
	   
	record.setFieldValue('custbody1','T');//
	 record.setFieldValue('custbody_service_status',41);
	   
	   if(DueDateArr != null && DueDateArr != undefined && DueDateArr !='')
	   {
		   var count1 = record.getLineItemCount('apply');
		   
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
		   
		   nlapiLogExecution("DEBUG","In Create Function","count2=="+count2);
		   
		   for(var l1=0;l1<CredLineRefArr.length;l1++)
			{
			   for(var j1=1;j1<=count2;j1++)
			   {
				   var RefIs1 = record.getLineItemValue('credit', 'refnum', j1);  
				   
				 //  nlapiLogExecution("DEBUG","In Create Function","RefIs=="+RefIs+' refNumArr[l2]== '+refNumArr[l2]);
				   
					if (RefIs1 == CredLineRefArr[l1])
					{	
						nlapiLogExecution("DEBUG","In Create Function","Condition true");
						   
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
		   
		   nlapiLogExecution("DEBUG","In Create Function","count3=="+count3);
		   
		   for(var l3=0;l3<DepositLineRefArr.length;l3++)
			{
			   for(var j3=1;j3<=count3;j3++)
			   {
				   var RefIs2 = record.getLineItemValue('deposit', 'refnum', j3);  
				   
				 //  nlapiLogExecution("DEBUG","In Create Function","RefIs=="+RefIs+' refNumArr[l2]== '+refNumArr[l2]);
				   
					if (RefIs2 == DepositLineRefArr[l3])
					{	
						nlapiLogExecution("DEBUG","In Create Function","Condition true");
						   
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

function createCheckfunction(AccountName,recId,type,tranDate,docNum,Payee,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr)
{

	nlapiLogExecution("DEBUG","In Create Function","Check Function Call....");
	
	var record = nlapiCreateRecord('check',{recordmode: 'dynamic'}); 
	
	nlapiLogExecution("DEBUG","In Create Function","Payee =="+Payee);
	
	nlapiLogExecution("DEBUG","In Create Function","AccountName =="+AccountName);
	nlapiLogExecution("DEBUG","In Create Function","docNum =="+docNum);
	nlapiLogExecution("DEBUG","In Create Function","tranDate =="+tranDate);
	nlapiLogExecution("DEBUG","In Create Function","department =="+department);
	nlapiLogExecution("DEBUG","In Create Function","itemArr Set ="+itemArr);
	nlapiLogExecution("DEBUG","In Create Function","AccArr Set ="+AccArr);
	
	if(Payee!=null && Payee!=undefined && Payee!='')
	{
		record.setFieldValue('entity',Payee);
		nlapiLogExecution("DEBUG","In Create Function","Payee Set ="+Payee);
	}
	
	if(AccountName != null && AccountName != undefined && AccountName != '')
	{
		record.setFieldValue('account',AccountName);
		nlapiLogExecution("DEBUG","In Create Function","AccountName Set ="+AccountName);
	}
	
	if(docNum != null && docNum != undefined && docNum != '')
	{
		record.setFieldValue('tranid',docNum);
	}
	   
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
		nlapiLogExecution("DEBUG","In Create Function","tranDate Set ="+tranDate);
	}
	   
	if(department != null && department != undefined && department != '')
	{
		record.setFieldValue('department',department);
		nlapiLogExecution("DEBUG","In Create Function","department Set ="+department);
	}
	   
	if(location != null && location != undefined && location != '')
	{
		record.setFieldValue('location',location);//AccountName
		
		nlapiLogExecution("DEBUG","In Create Function","location Set ="+location);
	}
	 //AccountName
	   
	record.setFieldValue('custbody1','T');
	// record.setFieldValue('custbody_service_status',41);
		
		
	   if(itemArr != null && itemArr != undefined && itemArr !='')
	   {
		   for( var l=0;l<itemArr.length;l++)
			{
		    	  
			   if(itemArr[l] != null && itemArr[l] != undefined && itemArr[l] != '')
				{
				   var itemSet  = FindItemSearch(itemArr[l]);
				}
		        
			   if(lineDeptArr[l] != null && lineDeptArr[l] != undefined && lineDeptArr[l] != '')
				{
				   var setLineDep = FindDepartment(lineDeptArr[l].toString());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].toString());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].toString());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].toString());
				}
				    
		    	  
		    	 record.selectNewLineItem('item');
			    
		    	 if(itemSet != null && itemSet != undefined && itemSet != '')
					{
		    		 record.setCurrentLineItemValue('item','item',itemSet);
					}
			    
		    	 if(qtyArr[l] != null && qtyArr[l] != undefined && qtyArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','quantity',qtyArr[l]);
					}
		    	 
		    	 if(setLineVendor != null && setLineVendor != undefined && setLineVendor != '')
					{
		    		 record.setCurrentLineItemValue('item','vendorname',setLineVendor);
					}
			     
		    	 if(unitsArr[l] != null && unitsArr[l] != undefined && unitsArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','units',unitsArr[l]);
					}
				    
		    	 if(descripArr[l] != null && descripArr[l] != undefined && descripArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','description',descripArr[l]);
					}
			    
		    	 if(setLineLoc != null && setLineLoc != undefined && setLineLoc != '')
					{
		    		 record.setCurrentLineItemValue('item','location',setLineLoc);
					}
			     
		    	 if(setLineDep!= null && setLineDep != undefined && setLineDep != '')
					{
		    		 record.setCurrentLineItemValue('item','department',setLineDep);
					}
			    
		    	 if(setLineCust != null && setLineCust != undefined && setLineCust != '')
					{
		    		 record.setCurrentLineItemValue('item','customer',setLineCust);
					}
				    
		    	 if(rateArr[l] != null && rateArr[l] != undefined && rateArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','rate',rateArr[l]);
					}
			    
		    	 if(amtArr[l] != null && amtArr[l] != undefined && amtArr[l] != '')
					{
		    		 record.setCurrentLineItemValue('item','amount',amtArr[l]);
					}
			     
			     record.commitLineItem('item');
			}
			    
	   }
	   
	   if(AccArr != null && AccArr != undefined && AccArr !='')
	   {
		   
		   var s= record.getLineItemCount('expense');
			 for(var h=s;h>=1;h--)
				{
				 record.removeLineItem('expense',h);
				}
		   
		   for( var l1=0;l1<AccArr.length;l1++)
			{
		    	  
			   nlapiLogExecution("DEBUG","In Create Function","Check Function Call....");
			   
			   if(AccArr[l1] != null && AccArr[l1] != undefined && AccArr[l1] != '')
				{
				   var Acc  = FindAccSearch(AccArr[l1]);
				}
		        
			   if(ExplineDeptArr[l1] != null && ExplineDeptArr[l1] != undefined && ExplineDeptArr[l1] != '')
				{
				   var setLineDep = FindDepartment(ExplineDeptArr[l1].toString());
				}
			        
			   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(ExplineLocArr[l1].toString());
				}
			    
			   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
				{
				   var setLineCust = FindCustomer(ExplineCustArr[l1].toString());
				}
			      
		    	 record.selectNewLineItem('expense');
			    
		    	 if(Acc != null && Acc != undefined && Acc != '')
					{
		    		 record.setCurrentLineItemValue('expense','account',Acc);
					}
			    
		    	 if(setLineDep != null && setLineDep != undefined && setLineDep != '')
					{
		    		 record.setCurrentLineItemValue('expense','department',setLineDep);
					}
			     
		    	 if(setLineLoc != null && setLineLoc != undefined && setLineLoc != '')
					{
		    		 record.setCurrentLineItemValue('expense','location',setLineLoc);
					}
			    
		    	 if(setLineCust != null && setLineCust != undefined && setLineCust != '')
					{
		    		 record.setCurrentLineItemValue('expense','customer',setLineCust);
					}
			    
		    	 if(ExpAmtArr[l1] != null && ExpAmtArr[l1] != undefined && ExpAmtArr[l1] != '')
					{
		    		 record.setCurrentLineItemValue('expense','amount',ExpAmtArr[l1]);
					}
			     
			     record.commitLineItem('expense');
			}
	   }
	   
	   
	   
	   var SubmitIt = nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","Check Created ID..=="+SubmitIt);
		 

}

function  createCustomerDeposit(AccName,Customer,TranNum,CheckNum,tranDate,Memo,Department,Location,payMethod,
		  CheckN,DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,SalesOrder,Payment)
{

	
	nlapiLogExecution("DEBUG","In Create Function","customer Deposit Create Function...");
	
	var record = nlapiCreateRecord('customerdeposit', {recordmode: 'dynamic'});
	
	if(Customer != null && Customer != undefined && Customer != '')
	{
		record.setFieldValue('customer',Customer);
	}
	
	if(AccName != null && AccName != undefined && AccName != '')
	{
		record.setFieldValue('account',AccName);
	}
	
	if(CheckNum != null && CheckNum != undefined && CheckNum != '')
	{
		record.setFieldValue('tranid',CheckNum);
	}
	
	if(Payment != null && Payment != undefined && Payment != '')
	{
		record.setFieldValue('payment',Payment);
	}
	 
	record.setFieldValue('memo',Memo);
	
	// record.setFieldValue('salesorder',SalesOrder);
	
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
	}
	   
	if(Department != null && Department != undefined && Department != '')
	{
		record.setFieldValue('department',Department);
	}
	   
	if(Location != null && Location != undefined && Location != '')
	{
		record.setFieldValue('location',Location);//AccountName
	}
	 //AccountName
	   
	record.setFieldValue('custbody1','T');//
	 record.setFieldValue('custbody_service_status',41);
	 
	   if(DueDateArr != null && DueDateArr != undefined && DueDateArr !='')
	   {
		   var count1 = record.getLineItemCount('apply');
		   
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
	   var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","Customer Deposit Created ID..=="+SubmitIt);
		

}

function createJEfunction(TranDate,docNum,AccArr,debitArr,creditArr,nameArr,memoArr,deprtmentArr,locArr,ReverseTranDate,ReversedocNum)
{
	nlapiLogExecution("DEBUG","In Create Function","JE Create Function...");
	
	var record = nlapiCreateRecord('journalentry', {recordmode: 'dynamic'});
	
	record.setFieldValue('subsidiary',35);
	
	if(TranDate != null && TranDate != undefined && TranDate != '')
	{
		record.setFieldValue('trandate',TranDate);
	}
	
	if(docNum != null && docNum != undefined && docNum != '')
	{
		record.setFieldValue('tranid',docNum);
	}
	
	if(ReversedocNum != null && ReversedocNum != undefined && ReversedocNum != '')
	{
		record.setFieldValue('reversalentry',ReversedocNum);
	}
	
	if(ReverseTranDate != null && ReverseTranDate != undefined && ReverseTranDate != '')
	{
		record.setFieldValue('reversaldate',ReverseTranDate);
	}
	record.setFieldValue('custbody1','T');
	 record.setFieldValue('custbody_service_status',41);
	
	if(AccArr != null && AccArr != undefined && AccArr !='')
	   {
		   for( var l=0;l<AccArr.length;l++)
			{
			   record.selectNewLineItem('line');
			   
			 		   
			   if(AccArr[l] != null && AccArr[l] != undefined && AccArr[l] != '')
				{
				   var AccSet  = FindAccSearch(AccArr[l]);
				   record.setCurrentLineItemValue('line', 'account',AccSet);
				}
			   
			   if(debitArr[l] != null && debitArr[l] != undefined && debitArr[l] != '')
				{
				 
				   record.setCurrentLineItemValue('line', 'debit',debitArr[l]);
				}
			   
			   if(creditArr[l] != null && creditArr[l] != undefined && creditArr[l] != '')
				{
				 
				   record.setCurrentLineItemValue('line', 'credit',creditArr[l]);
				}
			   
			   if(memoArr[l] != null && memoArr[l] != undefined && memoArr[l] != '')
				{
				 
				   record.setCurrentLineItemValue('line', 'memo',memoArr[l]);
				}
		        
			   if(deprtmentArr[l] != null && deprtmentArr[l] != undefined && deprtmentArr[l] != '')
				{
				   var setLineDep = FindDepartment(deprtmentArr[l].toString());
				   record.setCurrentLineItemValue('line', 'department', setLineDep);
				}
			        
			   if(locArr[l] != null && locArr[l] != undefined && locArr[l] != '')
				{
				   var setLineLoc = FindLocation(locArr[l].toString());
				   record.setCurrentLineItemValue('line', 'location', setLineLoc);
				}
			   
			   if(nameArr[l] != null && nameArr[l] != undefined && nameArr[l] != '')
				{
				   var setLineName = FindEntitySearch(nameArr[l].toString());
				   record.setCurrentLineItemValue('line', 'entity', setLineName);
				}
			   
			   record.commitLineItem('line');
			}
		}
	 var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","JE Created ID..=="+SubmitIt);
		
}

function FindAccSearch(Acc)
{ 
	 nlapiLogExecution('DEBUG','FindCustomer Function',' FindAccSearch IS -->'+Acc)
    var filters=new Array();
	var columns = new Array();
  
 
	if(Acc.trim() !='10600 Cash - Operating')
	{
		
		 nlapiLogExecution('DEBUG','FindCustomer Function',' Inside 10600 -->'+Acc.trim())
		if(Acc != null && Acc != '' )
	    {
	       var newStr = Acc.substring(Acc.indexOf(" "), Acc.length);
	      
		 filters[0] = new nlobjSearchFilter('name', null,'contains',newStr.trim());
		}
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('name');
		
		var searchResultItem = nlapiSearchRecord('account', 'customsearch_integrated_acc_search', filters, columns);
		
		
			if (searchResultItem != null)
			{
				for(var j1=0;j1<searchResultItem.length;j1++)
				{
					var ID = searchResultItem[j1].getValue('internalid');
						
				}
				
			}


	}
	else {
		var ID=694;
	}
	
	nlapiLogExecution('DEBUG','FindCustomer Function',' Account ID -->'+ID)
		return ID;
	}


function FindVendor(Vendor)
{ 
	 nlapiLogExecution('DEBUG','FindCustomer Function',' FindVendor IS -->'+Vendor)
    var filters=new Array();
	var columns = new Array();
	
	if(Vendor != null && Vendor != '')
    {
	 filters[0] = new nlobjSearchFilter('entityid', null,'is',Vendor.trim());
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('entityid');
	
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
	 nlapiLogExecution('DEBUG','FindCustomer Function',' FindClass IS -->'+Class)
    var filters=new Array();
	var columns = new Array();
	
	if(Class != null && Class != '')
    {
	 filters[0] = new nlobjSearchFilter('name', null,'contains',Class);
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	
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
	 nlapiLogExecution('DEBUG','FindCustomer Function',' customer IS -->'+customer)
    var filters=new Array();
	var columns = new Array();
	
	if(customer != null && customer != '')
    {
	 filters[0] = new nlobjSearchFilter('entityid', null,'contains',customer);
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('entityid');
	
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
	
	 nlapiLogExecution('DEBUG','FindSubsidiary Function',' FindDepartment IS -->'+department)
	
	if(department != null && department != '')
    {
	 filters[0] = new nlobjSearchFilter('name', null,'contains',department);
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	
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
	
	 nlapiLogExecution('DEBUG','FindLocation Function',' FindLocation IS -->'+location)
	
	
	
	if(location != null && location != '')
    {
	 filters[0] = new nlobjSearchFilter('name', null,'contains',location);
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	
	var searchResultItem = nlapiSearchRecord('location', 'customsearch_integr_location', filters, columns);
	
	
		if (searchResultItem != null)
		{
			for(var j1=0;j1<searchResultItem.length;j1++)
			{
				var ID = searchResultItem[j1].getValue('internalid');
					break;
			}
			
		}


		return ID;
	}

function FindItemSearch(item)
{ 
    var filters=new Array();
	var columns = new Array();
	
	 nlapiLogExecution('DEBUG','FindItemSearch Function',' FindItemSearch IS -->'+item)
	
	if(item != null && item != '')
    {
	 filters[0] = new nlobjSearchFilter('name', null,'contains',item);
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	
	var searchResultItem = nlapiSearchRecord('item', 'customsearch_integrated_search', filters, columns);
	
	
		if (searchResultItem != null)
		{
			for(var j1=0;j1<searchResultItem.length;j1++)
			{
				var ID = searchResultItem[j1].getValue('internalid');
					
			}
			
		}


		return ID;
	}


function FindVenPayEntitySearch(entity1)
{ 
    var filters=new Array();
	var columns = new Array();
	
	 nlapiLogExecution('DEBUG','FindItemSearch Function',' FindEntitySearch IS -->'+entity1)
	
	if(entity1 != null && entity1 != '')
    {
	 filters[0] = new nlobjSearchFilter('entityid', null,'is',entity1.trim());
	 
	 filters[1] = new nlobjSearchFilter('type', null,'anyof',"Employee","Vendor");
	}

	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('entityid');
	
	var searchResultItem = nlapiSearchRecord('entity', 'customsearch_integrated_entity_search', filters, columns);
	
	
		if (searchResultItem != null)
		{
			for(var j1=0;j1<searchResultItem.length;j1++)
			{
				var ID = searchResultItem[j1].getValue('internalid');
					
			}
			
		}


		return ID;
	}


function FindEntitySearch(entity)
{ 
    var filters=new Array();
	var columns = new Array();
	
	 nlapiLogExecution('DEBUG','FindItemSearch Function',' FindEntitySearch IS -->'+entity)
	
	if(entity != null && entity != '')
    {
	 filters[0] = new nlobjSearchFilter('entityid', null,'contains',entity.trim());
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('entityid');
	
	var searchResultItem = nlapiSearchRecord('entity', 'customsearch_integrated_entity_search', filters, columns);
	
	
		if (searchResultItem != null)
		{
			for(var j1=0;j1<searchResultItem.length;j1++)
			{
				var ID = searchResultItem[j1].getValue('internalid');
					
			}
			
		}


		return ID;
	}


function FindTaxCodeSearch(code)
{ 
    var filters=new Array();
	var columns = new Array();
	
	 nlapiLogExecution('DEBUG','FindItemSearch Function',' FindEntitySearch IS -->'+code)
	
	if(code != null && code != '')
    {
	 filters[0] = new nlobjSearchFilter('name', null,'contains',code.trim());
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	
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
function schedule_GetData(type)
{
	var myCSV_data = nlapiRequestURL('https://432868.app.netsuite.com/core/media/media.nl?id=14632114&c=432868&h=b91d5687e8b021997d18&_xt=.json',null,null);
	var datain = JSON.parse(myCSV_data.getBody()); // returns your csv data in a string format
	
	// nlapiLogExecution('DEBUG','postFunction',' *****string_data***** -->'+datain)
	 nlapiLogExecution('DEBUG','postFunction',' *****datain.length***** -->'+datain.length)	
	 
	 // NOTE - Deposit application code is remaining
	
	 try
	 {
		
		for(var i=0;i<datain.length;i++)
		{
         	
			try
			{
				
			var checkData =datain[i];
			var type=checkData['record_type'];
			var totTranAmt=checkData['record_trans_total'];
			
			//nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' type In -->'+type)
			//nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' totTranAmt In -->'+totTranAmt)
			
			
			
			if(type =='CustInvc')//type =='SalesOrd' ,CustInvc
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
			
			var InvDetailNumArr = checkData['record_line_serial_num'];
			var InvDetailQtyArr = checkData['record_line_serial_qty'];
				
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
	       
	            createInvoiceFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem,InvDetailNumArr,InvDetailQtyArr,createdFrom);
			}
			
			else if(type =='SalesOrd')
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
					
				var InvDetailNumArr = checkData['record_line_serial_num'];
				var InvDetailQtyArr = checkData['record_line_serial_qty'];
				
				
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
		       
		            createSOFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem,InvDetailNumArr,InvDetailQtyArr,createdFrom);
				
			}
			else if(type =='CashSale')
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
				var account =checkData['record_cashsale_account'];
				var qtyInvoicedArr =checkData['record_qty_inv_arr'];
				var qtyBackOrderArr= checkData['record_qty_back_arr'];
				var unitsArr=checkData['record_unit_arr'];
				var descripArr=checkData['record_descrp_arr'];
				
				var InvDetailNumArr = checkData['record_line_serial_num'];
				var InvDetailQtyArr = checkData['record_line_serial_qty'];
				
					
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
		        
		        if(account != null && account != '' && account !=undefined)
				 {
		        	account = FindAccSearch(account.trim());
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
		       
		            createCashSaleFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem,account,InvDetailNumArr,InvDetailQtyArr,createdFrom);
				
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
					
				var createdFrom = checkData['record_createdfrom'];
				var itemArr = checkData['record_itmarr'];
				var qtyArr	= checkData['record_qtyarr'];
					
				var lineDeptArr = checkData['record_item_line_dept'];
				var lineClassArr = checkData['record_item_line_clss'];
				var lineLocArr =checkData['record_item_line_loc'];
				 var lineCustArr =checkData['record_item_line_cust'];
				 var unitsArr =checkData['record_unit_arr'];
				 var descripArr = checkData['record_descrp_arr'];
				 
				 var InvDetailNumArr = checkData['record_line_serial_num'];
				 var InvDetailQtyArr = checkData['record_line_serial_qty'];
					
					
					
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
						AccountName = FindAccSearch(AccountName.trim());
					 }
					
					if(Vendor != null && Vendor != '' && Vendor !=undefined)
					 {
					
						Vendor = FindVendor(Vendor.trim());
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
				     
				     createVendorBillfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom);
					
				      
			}
			else if(type=='PurchOrd')
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
					
					var AccountName=checkData['record_top_name'];
					
					
					if(AccountName != null && AccountName != '' && AccountName !=undefined)
					 {
						AccountName = FindAccSearch(AccountName.trim());
					 }
					
					if(Vendor != null && Vendor != '' && Vendor !=undefined)
					 {
					
						Vendor = FindVendor(Vendor.trim());
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
				     
				     createPOfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom);
					
				      
			
			}
			else if(type =='CardChrg')
			{
				   var recId = checkData['record_id'];
				   var type = checkData['record_type'];
				   var tranDate =checkData['record_date'];
				  var docNum = checkData['record_doc_num'];
				  var Vendor = checkData['record_vendor'];
				var department =checkData['record_department'];
				var location = checkData['record_loc'];
				var Memo = checkData['record_memo'];
					
				   
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
						AccountName = FindAccSearch(AccountName.trim());
					 }
					
					if(Vendor != null && Vendor != '' && Vendor !=undefined)
					 {
					
						Vendor = FindVenPayEntitySearch(Vendor.trim());
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
				     
				     createCreditCardfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,Memo);
					
				      
			}
			else if(type =='CardRfnd')
			{
				   var recId = checkData['record_id'];
				   var type = checkData['record_type'];
				   var tranDate =checkData['record_date'];
				  var docNum = checkData['record_doc_num'];
				  var Vendor = checkData['record_vendor'];
				var department =checkData['record_department'];
				var location = checkData['record_loc'];
				var Memo = checkData['record_memo'];
				   
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
						AccountName = FindAccSearch(AccountName.trim());
					 }
					
					if(Vendor != null && Vendor != '' && Vendor !=undefined)
					 {
					
						Vendor = FindVenPayEntitySearch(Vendor.trim());
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
				     
				     createCreditCardRefundfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,Memo);
					
				      
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
				 
				 var InvDetailNumArr = checkData['record_line_serial_num'];
				 var InvDetailQtyArr = checkData['record_line_serial_qty'];
					
					
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
						AccountName = FindAccSearch(AccountName.trim());
					 }
					
					if(Payee != null && Payee != '' && Payee !=undefined)
					 {
					
						Payee = FindEntitySearch(Payee.trim());
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
				     
				     createCheckfunction(AccountName,recId,type,tranDate,docNum,Payee,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr);
					
				      
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
				var createdFrom = checkData['record_createdfrom'];
				   
				var itemArr = checkData['record_itmarr'];
				var qtyArr	= checkData['record_qtyarr'];
					
				var lineDeptArr = checkData['record_item_line_dept'];
				var lineClassArr = checkData['record_item_line_clss'];
				var lineLocArr =checkData['record_item_line_loc'];
				 var lineCustArr =checkData['record_item_line_cust'];
				 var unitsArr =checkData['record_unit_arr'];
				 var descripArr = checkData['record_descrp_arr'];
				 
				 var InvDetailNumArr = checkData['record_line_serial_num'];
				 var InvDetailQtyArr = checkData['record_line_serial_qty'];
					
					
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
					
						Vendor = FindVendor(Vendor.trim());
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
				     createVendorCreditfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,
							   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,InvDetailNumArr,InvDetailQtyArr,createdFrom);
				
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
				  var intIdArr =checkData['record_apply_intid'];
					
				  if(AccName !=null && AccName != undefined && AccName != '')
				  {
					  AccName = FindAccSearch(AccName.trim());
				  }
				  
				  // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' AccName In -->'+AccName)
				  
				  if(Payee != null && Payee != '' && Payee !=undefined)
					 {
					
					  Payee = FindVenPayEntitySearch(Payee.trim());
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
					

					  createBillPaymentTrans(AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
							  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,CredLineRefArr,CredLineAmtArr,intIdArr);
				  
			}
			else if(type =='ExpRept')
			{
			   var recId= checkData['record_id'];
			    
			   var AccName = checkData['record_acc_name'];
			   var employee =checkData['record_employee'];
			   var docNum =checkData['record_doc_num'];
			   var tranDate=checkData['record_date'];
			   var Memo =checkData['record_memo'];
			   var Department =checkData['record_deptmt'];
			   var Location =checkData['record_location'];
				
			   var dateArr =checkData['record_line_date'];
			   var catArr =checkData['record_line_cat'];
			   var amtArr =checkData['record_line_amt'];
			   var memoArr = checkData['record_line_memo'];
			   var deptArr =checkData['record_line_deptmt'];
			   var locArr =checkData['record_line_location'];
			   
			  
			   if(AccName !=null && AccName != undefined && AccName != '')
				  {
				   AccName = FindAccSearch(AccName.trim());
				  }
				  
				  if(employee != null && employee != '' && employee !=undefined)
					 {
					
					  employee = FindVenPayEntitySearch(employee.trim());
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
					
					createExpenseReport(AccName,employee,docNum,tranDate,Memo,Department,Location,dateArr,catArr,
							   amtArr,memoArr,deptArr,locArr);
					   
			   
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
					

					  createCustomerPaymentTrans(AR_AccName,AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
							  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,DepositLineRefArr,DepositLineAmtArr,CredLineRefArr,CredLineAmtArr,PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor);
				  
			}
			else if(type =='CustRfnd')
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
					

					  createCustomerRefundTrans(AR_AccName,AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
							  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,DepositLineRefArr,DepositLineAmtArr,CredLineRefArr,CredLineAmtArr,PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor);
				  
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
					  AccName = FindAccSearch(AccName.trim());
				  }
				  
				  if(Customer != null && Customer != '' && Customer !=undefined)
					 {
					
					  Customer = FindCustomer(Customer.trim());
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
					
					 createCustomerDeposit(AccName,Customer,TranNum,CheckNum,tranDate,Memo,Department,Location,payMethod,
							  CheckN,DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,SalesOrder,Payment);
			}
			else if(type =='DepAppl')
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
	        	
	        	var AppliOf =checkData['record_appli_of'];
	        	
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
					  AccName = FindAccSearch(AccName.trim());
				  }
				  
				  if(Customer != null && Customer != '' && Customer !=undefined)
					 {
					
					  Customer = FindCustomer(Customer.trim());
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
					
					 createDepositApplication(AccName,Customer,TranNum,CheckNum,tranDate,Memo,Department,Location,payMethod,
							  CheckN,DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,SalesOrder,Payment,AppliOf);
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
							   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,InvDetailNumArr,InvDetailQtyArr,createdFrom);//
				   	
			
			}	
			else if(type=='Deposit')
			{
				   var recId=checkData['record_id'];
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
						AccName = FindAccSearch(AccName.trim());
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
					
					createDepositFunction(AccName,Department,Location,docNum,tranDate,Memo,PayDepoNumArr,PayDepoDate,
							otherNameArr,otherAccArr,otherAmtArr,otherRefNumArr,otherDepArr,otherLocArr,
							cashBackAccArr,cashBackAmtArr,cashBackMemoArr,cashBackDepArr,cashbackLocArr);
			}
			else if(type =='ItemRcpt')
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
					
					var AccountName=checkData['record_top_name'];
					
					
					if(AccountName != null && AccountName != '' && AccountName !=undefined)
					 {
						AccountName = FindAccSearch(AccountName.trim());
					 }
					
					if(Vendor != null && Vendor != '' && Vendor !=undefined)
					 {
					
						Vendor = FindEntitySearch(Vendor.trim());
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
				     
				     createIRfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom);
					
				      
			
			
			}
			else if(type=='ItemShip')
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
					
				var shipStatus =checkData['record_shipstatus'];
				   
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
						AccountName = FindAccSearch(AccountName.trim());
					 }
					
					if(Vendor != null && Vendor != '' && Vendor !=undefined)
					 {
					
						Vendor = FindEntitySearch(Vendor.trim());
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
				     
				     createIFfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
							   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
							   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom,shipStatus);
					
				      
			
			
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



function createInvoiceFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem,InvDetailNumArr,InvDetailQtyArr,createdFrom)
{
   
	if(createdFrom != null && createdFrom != '' && createdFrom != undefined)
	{
	      var DocToCheck =createdFrom.substring(createdFrom.indexOf('#')+1, createdFrom.length);
			
			var valueCust =FindTransactionNumSearch(DocToCheck.trim());
			
			var type = createdFrom.substring(0,createdFrom.indexOf('#'));
			
			if(type.trim()=='Sales Order')
			{
				 var record = nlapiTransformRecord('salesorder', valueCust, 'invoice');
			}
		     
		      
		      var linecount =record.getLineItemCount('item');
		      
		      if(linecount > 0)
		      {
		    	  for(var h=linecount;h>=1;h--)
		    	  {
		    		  record.removeLineItem('item',h);
		    	  }
		      }
		      
		
		if(docNum != null && docNum != undefined && docNum != '')
		{
			record.setFieldValue('tranid',docNum);
		}
		if(tranDate != null && tranDate != undefined && tranDate != '')
		{
			record.setFieldValue('trandate',new Date(tranDate));
		}

		 // nlapiLogExecution("DEBUG","In Create Function","itemArr =="+itemArr);
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
		    	//---------------------- Inventory Detail -------------------------- 
		    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
		  	      {
		    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
				  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
				  	 
			    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
		  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
		  	    	  {
		  	    		  var SerialNum=InvDetailNumArr[l];
		  	    		  var SerialQty=InvDetailQtyArr[l];
		  	    		  
		  	    		  subrec.selectNewLineItem('inventoryassignment');
		  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
		  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
	                      subrec.commitLineItem('inventoryassignment');//	  
		  		  	      	  
		  	    	  }
		  	    	subrec.commit();
		  	      }
		    	 
		    	//---------------------- END Inventory Detail -------------------------- 
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
		    		 record.setCurrentLineItemValue('item','price',-1);
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
			
		    nlapiLogExecution("DEBUG","In Create Function","Invoice Created ID..=="+SubmitIt);
			 
	}
	else
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
		   
		 // nlapiLogExecution("DEBUG","In Create Function","itemArr =="+itemArr);
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
		    	//---------------------- Inventory Detail -------------------------- 
		    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
		  	      {
		    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
				  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
				  	 
			    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
		  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
		  	    	  {
		  	    		  var SerialNum=InvDetailNumArr[l];
		  	    		  var SerialQty=InvDetailQtyArr[l];
		  	    		  
		  	    		  subrec.selectNewLineItem('inventoryassignment');
		  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
		  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
	                      subrec.commitLineItem('inventoryassignment');//	  
		  		  	      	  
		  	    	  }
		  	    	subrec.commit();
		  	      }
		    	 
		    	//---------------------- END Inventory Detail -------------------------- 
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
		    		 record.setCurrentLineItemValue('item','price',-1);
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
			
		    nlapiLogExecution("DEBUG","In Create Function","Invoice Created ID..=="+SubmitIt);
			 
	}
	
	
	
}

function createSOFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem,InvDetailNumArr,InvDetailQtyArr,createdFrom)
{

	var record = nlapiCreateRecord('salesorder', {recordmode: 'dynamic'}); //salesorder
	
	
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
	   
	 // nlapiLogExecution("DEBUG","In Create Function","itemArr =="+itemArr);
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
		    
	    	//---------------------- Inventory Detail -------------------------- 
	    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
	  	      {
	    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
			  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
			  	 
		    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
	  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
	  	    	  {
	  	    		  var SerialNum=InvDetailNumArr[l];
	  	    		  var SerialQty=InvDetailQtyArr[l];
	  	    		  
	  	    		  subrec.selectNewLineItem('inventoryassignment');
	  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
	  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
	  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
                      subrec.commitLineItem('inventoryassignment');//	  
	  		  	      	  
	  	    	  }
	  	    	subrec.commit();
	  	      }
	    	 
	    	//---------------------- END Inventory Detail -------------------------- 
	    	 
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
	    		 record.setCurrentLineItemValue('item','price',-1);
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


function createCashSaleFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr,TaxItem,account,InvDetailNumArr,InvDetailQtyArr,createdFrom)
{

	var record = nlapiCreateRecord('cashsale', {recordmode: 'dynamic'}); //salesorder
	
	
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

	
	if(account != null && account != undefined && account != '')
	{
		record.setFieldValue('undepfunds','T');
		record.setFieldValue('account',account);
	}
 // record.setFieldValue('undepfunds','T');//account
  
  if(TaxItem != null && TaxItem != undefined && TaxItem != '')//TaxItem
	{
	  var SetTxCode =FindTaxCodeSearch(TaxItem);
		record.setFieldValue('taxitem',SetTxCode);
	}
	  
	   record.setFieldValue('custbody1','T'); 
	   record.setFieldValue('custbody_service_status',41);   // Demo account mandatory field that is why taken
	   
	 //  nlapiLogExecution("DEBUG","In Create Function","itemArr =="+itemArr);
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
		    
	    	//---------------------- Inventory Detail -------------------------- 
	    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
	  	      {
	    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
			  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
			  	 
		    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
	  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
	  	    	  {
	  	    		  var SerialNum=InvDetailNumArr[l];
	  	    		  var SerialQty=InvDetailQtyArr[l];
	  	    		  
	  	    		  subrec.selectNewLineItem('inventoryassignment');
	  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
	  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
	  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
                      subrec.commitLineItem('inventoryassignment');//	  
	  		  	      	  
	  	    	  }
	  	    	subrec.commit();
	  	      }
	    	 
	    	//---------------------- END Inventory Detail -------------------------- 
	    	 
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
	    		 record.setCurrentLineItemValue('item','price',-1);
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
		
	    nlapiLogExecution("DEBUG","In Create Function","Cash Sale Created ID..=="+SubmitIt);
		 
	
	
}

function createVendorBillfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom)
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
	// record.setFieldValue('custbody1',recId);
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
				   var setLineDep = FindDepartment(lineDeptArr[l].trim());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].trim());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].trim());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
		    	 
		    	//---------------------- Inventory Detail -------------------------- 
		    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
		  	      {
		    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
				  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
				  	 
			    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
		  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
		  	    	  {
		  	    		  var SerialNum=InvDetailNumArr[l];
		  	    		  var SerialQty=InvDetailQtyArr[l];
		  	    		  
		  	    		  subrec.selectNewLineItem('inventoryassignment');
		  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
		  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
	                      subrec.commitLineItem('inventoryassignment');//	  
		  		  	      	  
		  	    	  }
		  	    	subrec.commit();
		  	      }
		    	 
		    	//---------------------- END Inventory Detail -------------------------- 
				    
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
				   var setLineDep = FindDepartment(ExplineDeptArr[l1].trim());
				}
			        
			   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(ExplineLocArr[l1].trim());
				}
			    
			   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
				{
				   var setLineCust = FindCustomer(ExplineCustArr[l1].trim());
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

function createPOfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom)
{
	var record = nlapiCreateRecord('purchaseorder', {recordmode: 'dynamic'}); 
	
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
	// record.setFieldValue('custbody1',recId);
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
				   var setLineDep = FindDepartment(lineDeptArr[l].trim());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].trim());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].trim());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
				    
		    	//---------------------- Inventory Detail -------------------------- 
		    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
		  	      {
		    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
				  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
				  	 
			    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
		  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
		  	    	  {
		  	    		  var SerialNum=InvDetailNumArr[l];
		  	    		  var SerialQty=InvDetailQtyArr[l];
		  	    		  
		  	    		  subrec.selectNewLineItem('inventoryassignment');
		  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
		  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
	                      subrec.commitLineItem('inventoryassignment');//	  
		  		  	      	  
		  	    	  }
		  	    	subrec.commit();
		  	      }
		    	 
		    	//---------------------- END Inventory Detail -------------------------- 
		    	 
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
	
	   var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","PO Created ID..=="+SubmitIt);
		 
}


function createCreditCardfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,Memo)
{
	nlapiLogExecution("DEBUG","In Create Function","Credit Card Charge Create function..==");
	
	var record = nlapiCreateRecord('creditcardcharge', {recordmode: 'dynamic'}); 
	
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
	record.setFieldValue('memo',Memo);
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
				   var setLineDep = FindDepartment(lineDeptArr[l].trim());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].trim());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].trim());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
				   var setLineDep = FindDepartment(ExplineDeptArr[l1].trim());
				}
			        
			   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(ExplineLocArr[l1].trim());
				}
			    
			   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
				{
				   var setLineCust = FindCustomer(ExplineCustArr[l1].trim());
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
		
	    nlapiLogExecution("DEBUG","In Create Function","Credit Card Created ID..=="+SubmitIt);
		 
}

function createCreditCardRefundfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,Memo)
{
	 nlapiLogExecution("DEBUG","In Create Function","Credit Card Refund Create function..==");
	 
	var record = nlapiCreateRecord('creditcardrefund', {recordmode: 'dynamic'}); 
	
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
	   
	record.setFieldValue('memo',Memo); 
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
				   var setLineDep = FindDepartment(lineDeptArr[l].trim());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].trim());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].trim());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
				   var setLineDep = FindDepartment(ExplineDeptArr[l1].trim());
				}
			        
			   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(ExplineLocArr[l1].trim());
				}
			    
			   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
				{
				   var setLineCust = FindCustomer(ExplineCustArr[l1].trim());
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
		
	    nlapiLogExecution("DEBUG","In Create Function","Credit Card Refund Created ID..=="+SubmitIt);
		 
}

function createVendorCreditfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,
		   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,InvDetailNumArr,InvDetailQtyArr,createdFrom)
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
				   var setLineDep = FindDepartment(lineDeptArr[l].trim());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].trim());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].trim());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
			    
		    	//---------------------- Inventory Detail -------------------------- 
		    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
		  	      {
		    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
				  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
				  	 
			    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
		  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
		  	    	  {
		  	    		  var SerialNum=InvDetailNumArr[l];
		  	    		  var SerialQty=InvDetailQtyArr[l];
		  	    		  
		  	    		  subrec.selectNewLineItem('inventoryassignment');
		  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
		  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
	                      subrec.commitLineItem('inventoryassignment');//	  
		  		  	      	  
		  	    	  }
		  	    	subrec.commit();
		  	      }
		    	 
		    	//---------------------- END Inventory Detail -------------------------- 
		    	 
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
				   var setLineDep = FindDepartment(ExplineDeptArr[l1].trim());
				}
			        
			   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(ExplineLocArr[l1].trim());
				}
			    
			   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
				{
				   var setLineCust = FindCustomer(ExplineCustArr[l1].trim());
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
		   DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,InvDetailNumArr,InvDetailQtyArr,createdFrom)
{
	nlapiLogExecution("DEBUG","In Create Function","Credit Memo Function Call....");
	
	if(createdFrom != null && createdFrom !='' && createdFrom != undefined)
	{
		var DocToCheck =createdFrom.substring(createdFrom.indexOf('#')+1, createdFrom.length);
		
		var valueCust =FindTransactionNumSearch(DocToCheck.trim());
		
		var type = createdFrom.substring(0,createdFrom.indexOf('#'));
		
		if(type.trim()=='Invoice')
		{
			 var record = nlapiTransformRecord('invoice',valueCust,'creditmemo');
		}
		     
		      
		      var linecount =record.getLineItemCount('item');
		      
		      if(linecount > 0)
		      {
		    	  for(var h=linecount;h>=1;h--)
		    	  {
		    		  record.removeLineItem('item',h);
		    	  }
		      }
		      
		
		if(docNum != null && docNum != undefined && docNum != '')
		{
			record.setFieldValue('tranid',docNum);
		}
		   
		if(tranDate != null && tranDate != undefined && tranDate != '')
		{
			record.setFieldValue('trandate',new Date(tranDate));
		}
	
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
					   var setLineDep = FindDepartment(lineDeptArr[l].trim());
					}
				        
				   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
					{
					   var setLineLoc = FindLocation(lineLocArr[l].trim());
					}
				    
				   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
					{
					   var setLineCust = FindCustomer(lineCustArr[l].trim());
					}
				     
				   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
					{
					   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
					    
			    	 
			    	//---------------------- Inventory Detail -------------------------- 
			    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
			  	      {
			    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
					  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
					  	 
				    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
			  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
			  	    	  {
			  	    		  var SerialNum=InvDetailNumArr[l];
			  	    		  var SerialQty=InvDetailQtyArr[l];
			  	    		  
			  	    		  subrec.selectNewLineItem('inventoryassignment');
			  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
			  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
			  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
		                      subrec.commitLineItem('inventoryassignment');//	  
			  		  	      	  
			  	    	  }
			  	    	subrec.commit();
			  	      }
			    	 
			    	//---------------------- END Inventory Detail -------------------------- 
			    	 
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
					   var setLineDep = FindDepartment(ExplineDeptArr[l1].trim());
					}
				        
				   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
					{
					   var setLineLoc = FindLocation(ExplineLocArr[l1].trim());
					}
				    
				   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
					{
					   var setLineCust = FindCustomer(ExplineCustArr[l1].trim());
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
	else
	{
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
					   var setLineDep = FindDepartment(lineDeptArr[l].trim());
					}
				        
				   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
					{
					   var setLineLoc = FindLocation(lineLocArr[l].trim());
					}
				    
				   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
					{
					   var setLineCust = FindCustomer(lineCustArr[l].trim());
					}
				     
				   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
					{
					   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
					    
			    	 
			    	//---------------------- Inventory Detail -------------------------- 
			    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
			  	      {
			    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
					  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
					  	 
				    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
			  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
			  	    	  {
			  	    		  var SerialNum=InvDetailNumArr[l];
			  	    		  var SerialQty=InvDetailQtyArr[l];
			  	    		  
			  	    		  subrec.selectNewLineItem('inventoryassignment');
			  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
			  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
			  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
		                      subrec.commitLineItem('inventoryassignment');//	  
			  		  	      	  
			  	    	  }
			  	    	subrec.commit();
			  	      }
			    	 
			    	//---------------------- END Inventory Detail -------------------------- 
			    	 
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
					   var setLineDep = FindDepartment(ExplineDeptArr[l1].trim());
					}
				        
				   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
					{
					   var setLineLoc = FindLocation(ExplineLocArr[l1].trim());
					}
				    
				   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
					{
					   var setLineCust = FindCustomer(ExplineCustArr[l1].trim());
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
	
}


function createBillPaymentTrans(AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
		  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,CredLineRefArr,CredLineAmtArr,intIdArr)
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
	   
	   if(PaymentArr != null && PaymentArr != undefined && PaymentArr !='')
	   {
		   var count1 = record.getLineItemCount('apply');
		   
		  // nlapiLogExecution("DEBUG","In Create Function","count1=="+count1);
		   
		   for(var l2=0;l2<PaymentArr.length;l2++)
			{
			   for(var j=1;j<=count1;j++)
			   {
				   var RefIs = record.getLineItemValue('apply', 'refnum', j);  
				   var origAmt = record.getLineItemValue('apply', 'total', j);  
				   var dueDate = record.getLineItemValue('apply', 'applydate', j);  
				   
				   // nlapiLogExecution("DEBUG","In Create Function","RefIs=="+RefIs);
				   // nlapiLogExecution("DEBUG","In Create Function","origAmt=="+origAmt+' OrigAmtArr[l2]== '+OrigAmtArr[l2]);
				   // nlapiLogExecution("DEBUG","In Create Function","dueDate=="+dueDate+' DueDateArr[l2]== '+DueDateArr[l2]);
					   
					if ((RefIs == refNumArr[l2]))
					{	
					//	nlapiLogExecution("DEBUG","In Create Function","Condition true");
						   
						  record.selectLineItem('apply',j)
						  record.setCurrentLineItemValue('apply','apply','T'); 
						  record.setCurrentLineItemValue('apply','amount',PaymentArr[l2]); 
						  record.commitLineItem('apply');
						 
					}
					else if(((RefIs == null || RefIs == undefined || RefIs == '')&&(origAmt ==OrigAmtArr[l2]) && (dueDate == DueDateArr[l2])))
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
		   
		  // nlapiLogExecution("DEBUG","In Create Function","count2=="+count2);
		   
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
	   
	   var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","Vendor Payment Created ID..=="+SubmitIt);
		
}

function createCustomerPaymentTrans(AR_AccName,AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
		  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,DepositLineRefArr,DepositLineAmtArr,CredLineRefArr,CredLineAmtArr,PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor)
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
	   
	if(PayMethod !=null)
	{
		if(PayMethod == 9)
		{
			record.setFieldValue('paymentmethod',8);
		}
		else
		{
			record.setFieldValue('paymentmethod',PayMethod);
		}
		
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	/*	if(pnref !=null)
	{
		record.setFieldValue('pnrefnum',pnref);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	if(cardNumber !=null)
	{
		record.setFieldValue('ccnumber',cardNumber);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	if(cardExpiry !=null)
	{
		record.setFieldValue('ccexpiredate',cardExpiry);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	if(cardName !=null)
	{
		record.setFieldValue('ccname',cardName);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	if(cardProcessor !=null)
	{
		record.setFieldValue('creditcardprocessor',cardProcessor);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	*/
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
		   
		  // nlapiLogExecution("DEBUG","In Create Function","count2=="+count2);
		   
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

function createCustomerRefundTrans(AR_AccName,AccName,Payee,TranNum,CheckNum,Memo,Department,Location,DueDateArr
		  ,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,tranDate,DepositLineRefArr,DepositLineAmtArr,CredLineRefArr,CredLineAmtArr,PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor)
{
	
	nlapiLogExecution("DEBUG","In Create Function","Customer Refund Create Function...");
	
	var record = nlapiCreateRecord('customerrefund', {recordmode: 'dynamic'});
	
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
	if(PayMethod !=null)
	{
		if(PayMethod == 9)
		{
			record.setFieldValue('paymentmethod',8);
		}
		else
		{
			record.setFieldValue('paymentmethod',PayMethod);
		}
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	/*	if(pnref !=null)
	{
		record.setFieldValue('pnrefnum',pnref);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	if(cardNumber !=null)
	{
		record.setFieldValue('ccnumber',cardNumber);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	if(cardExpiry !=null)
	{
		record.setFieldValue('ccexpiredate',cardExpiry);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	if(cardName !=null)
	{
		record.setFieldValue('ccname',cardName);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
	
	if(cardProcessor !=null)
	{
		record.setFieldValue('creditcardprocessor',cardProcessor);
	}//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
*/	record.setFieldValue('custbody1','T');//
	 record.setFieldValue('custbody_service_status',41);
	   
	   if(refNumArr != null && refNumArr != undefined && refNumArr !='')
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
		   
		  // nlapiLogExecution("DEBUG","In Create Function","count2=="+count2);
		   
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
		
	    nlapiLogExecution("DEBUG","In Create Function","Customer Refund Created ID..=="+SubmitIt);
		
}


function createCheckfunction(AccountName,recId,type,tranDate,docNum,Payee,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr)
{

	nlapiLogExecution("DEBUG","In Create Function","Check Function Call....");
	
	var record = nlapiCreateRecord('check',{recordmode: 'dynamic'}); 
	
	nlapiLogExecution("DEBUG","In Create Function","Payee =="+Payee);
	
	//nlapiLogExecution("DEBUG","In Create Function","AccountName =="+AccountName);
	//nlapiLogExecution("DEBUG","In Create Function","docNum =="+docNum);
	//nlapiLogExecution("DEBUG","In Create Function","tranDate =="+tranDate);
	//nlapiLogExecution("DEBUG","In Create Function","department =="+department);
	//nlapiLogExecution("DEBUG","In Create Function","itemArr Set ="+itemArr);
	//nlapiLogExecution("DEBUG","In Create Function","AccArr Set ="+AccArr);
	
	if(Payee!=null && Payee!=undefined && Payee!='')
	{
		record.setFieldValue('entity',Payee);
		//nlapiLogExecution("DEBUG","In Create Function","Payee Set ="+Payee);
	}
	
	if(AccountName != null && AccountName != undefined && AccountName != '')
	{
		record.setFieldValue('account',AccountName);
		//nlapiLogExecution("DEBUG","In Create Function","AccountName Set ="+AccountName);
	}
	
	if(docNum != null && docNum != undefined && docNum != '')
	{
		record.setFieldValue('tranid',docNum);
	}
	   
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
		// nlapiLogExecution("DEBUG","In Create Function","tranDate Set ="+tranDate);
	}
	   
	if(department != null && department != undefined && department != '')
	{
		record.setFieldValue('department',department);
		// nlapiLogExecution("DEBUG","In Create Function","department Set ="+department);
	}
	   
	if(location != null && location != undefined && location != '')
	{
		record.setFieldValue('location',location);//AccountName
		
		// nlapiLogExecution("DEBUG","In Create Function","location Set ="+location);
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
				   var setLineDep = FindDepartment(lineDeptArr[l].trim());
				}
			        
			   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
				{
				   var setLineLoc = FindLocation(lineLocArr[l].trim());
				}
			    
			   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
				{
				   var setLineCust = FindCustomer(lineCustArr[l].trim());
				}
			     
			   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
				{
				   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
				 
		    	//---------------------- Inventory Detail -------------------------- 
		    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
		  	      {
		    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
				  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
				  	 
			    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
		  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
		  	    	  {
		  	    		  var SerialNum=InvDetailNumArr[l];
		  	    		  var SerialQty=InvDetailQtyArr[l];
		  	    		  
		  	    		  subrec.selectNewLineItem('inventoryassignment');
		  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
		  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
	                      subrec.commitLineItem('inventoryassignment');//	  
		  		  	      	  
		  	    	  }
		  	    	subrec.commit();
		  	      }
		    	 
		    	//---------------------- END Inventory Detail -------------------------- 
		    	 
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
				   var setLineDep = FindDepartment(ExplineDeptArr[l1].trim());
				}
			        
			   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(ExplineLocArr[l1].trim());
				}
			    
			   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
				{
				   var setLineCust = FindCustomer(ExplineCustArr[l1].trim());
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
		  CheckN,DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,SalesOrder,Payment)  //AppliOf
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

function  createDepositApplication(AccName,Customer,TranNum,CheckNum,tranDate,Memo,Department,Location,payMethod,
		  CheckN,DueDateArr,refNumArr,OrigAmtArr,AmtDueArr,DiscDateArr,DiscAvailArr,DiscTakeArr,PaymentArr,SalesOrder,Payment,AppliOf)  //AppliOf
{

	

	
	nlapiLogExecution("DEBUG","In Create Function","Deposit Application Create Function...");
	if(AppliOf != null && AppliOf != undefined && AppliOf != '')
	{
		var DocToCheck =AppliOf.substring(AppliOf.indexOf('#')+1, AppliOf.length);
		
		var valueCust =FindCustDepositSearch(DocToCheck.trim());
		
		
	
	var record = nlapiTransformRecord('customerdeposit', valueCust, 'depositapplication');

	if(CheckNum != null && CheckNum != undefined && CheckNum != '')
	{
		record.setFieldValue('tranid',CheckNum);
	}
	

	record.setFieldValue('memo',Memo);
	
	
	if(tranDate != null && tranDate != undefined && tranDate != '')
	{
		record.setFieldValue('trandate',new Date(tranDate));
	}
	   
	
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
		
	    nlapiLogExecution("DEBUG","In Create Function","Deposit Application Created ID..=="+SubmitIt);
	}	


}

function createDepositFunction(AccName,Department,Location,docNum,tranDate,Memo,PayDepoNumArr,PayDepoDate,
		otherNameArr,otherAccArr,otherAmtArr,otherRefNumArr,otherDepArr,otherLocArr,
		cashBackAccArr,cashBackAmtArr,cashBackMemoArr,cashBackDepArr,cashbackLocArr)
{
nlapiLogExecution("DEBUG","In Create Function"," Deposit Create Function...");
	
	var record = nlapiCreateRecord('deposit', {recordmode: 'dynamic'});
	
	if(AccName != null && AccName != undefined && AccName != '')
	{
		record.setFieldValue('account',AccName);
	}
	
	if(docNum != null && docNum != undefined && docNum != '')
	{
		record.setFieldValue('tranid',docNum);
	}
		 
	record.setFieldValue('memo',Memo);
	
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
	 
	   if(PayDepoNumArr != null && PayDepoNumArr != undefined && PayDepoNumArr !='')
	   {
		   var count1 = record.getLineItemCount('payment');
		   
		   for(var l2=0;l2<PayDepoNumArr.length;l2++)
			{
			   for(var j=1;j<=count1;j++)
			   {
				   var RefIs = record.getLineItemValue('payment', 'docnumber', j);  
					if (RefIs == PayDepoNumArr[l2])
					{	
						  record.selectLineItem('payment',j)
						  record.setCurrentLineItemValue('payment','deposit','T'); 
						  record.commitLineItem('payment');
					}
		        }
			}
		}
	   
	   if(otherAccArr != null && otherAccArr != undefined && otherAccArr !='')
	   {
		   for(var l1=0;l1<otherAccArr.length;l1++)
			{
			   record.selectNewLineItem('other');
			   if(otherAccArr[l1] != null && otherAccArr[l1] != undefined && otherAccArr[l1] != '')
				{
				   var Acc  = FindAccSearch(otherAccArr[l1]);
				   record.setCurrentLineItemValue('other','account',Acc); 
				}
		       
			   if(otherNameArr[l1] != null && otherNameArr[l1] != undefined && otherNameArr[l1] != '')
				{
				   var setLineName = FindEntitySearch(otherNameArr[l1].trim());
				   record.setCurrentLineItemValue('other','entity',setLineName); 
				}
			   
			   
			   if(otherDepArr[l1] != null && otherDepArr[l1] != undefined && otherDepArr[l1] != '')
				{
				   var setLineDep = FindDepartment(otherDepArr[l1].trim());
				   record.setCurrentLineItemValue('other','department',setLineDep); 
				}
			    
			   if(otherRefNumArr[l1] != null && otherRefNumArr[l1] != undefined && otherRefNumArr[l1] != '')
			   {
				   record.setCurrentLineItemValue('other','refnum',otherRefNumArr[l1]); 
			   }
			   
			   if(otherAmtArr[l1] != null && otherAmtArr[l1] != undefined && otherAmtArr[l1] != '')
			   {
				   record.setCurrentLineItemValue('other','amount',otherAmtArr[l1]); 
			   }
			   
			   if(otherLocArr[l1] != null && otherLocArr[l1] != undefined && otherLocArr[l1] != '')
				{
				   var setLineLoc = FindLocation(otherLocArr[l1].trim());
				   record.setCurrentLineItemValue('other','location',setLineLoc); 
				}
			    
				  record.commitLineItem('other');
			}
	   }
	   
	   if(cashBackAccArr != null && cashBackAccArr != undefined && cashBackAccArr !='')
	   {
		   for(var l3=0;l3<cashBackAccArr.length;l3++)
			{
			   record.selectNewLineItem('cashback');
			   
			   if(cashBackAccArr[l3] != null && cashBackAccArr[l3] != undefined && cashBackAccArr[l3] != '')
				{
				   var Acc1  = FindAccSearch(cashBackAccArr[l3]);
				   record.setCurrentLineItemValue('cashback','account',Acc1); 
				}
			   
			   if(cashBackAmtArr[l3] != null && cashBackAmtArr[l3] != undefined && cashBackAmtArr[l3] != '')
			   {
				   record.setCurrentLineItemValue('cashback','amount',cashBackAmtArr[l3]); 
			   }
			   
			  			   
			   if(cashBackDepArr[l3] != null && cashBackDepArr[l3] != undefined && cashBackDepArr[l3] != '')
				{
				   var setLineDep1 = FindDepartment(cashBackDepArr[l3].trim());
				   record.setCurrentLineItemValue('cashback','department',setLineDep1); 
				}
			    
			   if(cashBackMemoArr[l3] != null && cashBackMemoArr[l3] != undefined && cashBackMemoArr[l3] != '')
			   {
				   record.setCurrentLineItemValue('cashback','memo',cashBackMemoArr[l3]); 
			   }
			   
			  
			   if(cashbackLocArr[l3] != null && cashbackLocArr[l3] != undefined && cashbackLocArr[l3] != '')
				{
				   var setLineLoc1 = FindLocation(cashbackLocArr[l3].trim());
				   record.setCurrentLineItemValue('cashback','location',setLineLoc1); 
				}
			    
				  record.commitLineItem('cashback');
			}
	   }
	   
	   var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","Deposit Created ID..=="+SubmitIt);
		
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
				   var setLineDep = FindDepartment(deprtmentArr[l].trim());
				   record.setCurrentLineItemValue('line', 'department', setLineDep);
				}
			        
			   if(locArr[l] != null && locArr[l] != undefined && locArr[l] != '')
				{
				   var setLineLoc = FindLocation(locArr[l].trim());
				   record.setCurrentLineItemValue('line', 'location', setLineLoc);
				}
			   
			   if(nameArr[l] != null && nameArr[l] != undefined && nameArr[l] != '')
				{
				   var setLineName = FindEntitySearch(nameArr[l].trim());
				   record.setCurrentLineItemValue('line', 'entity', setLineName);
				}
			   
			   record.commitLineItem('line');
			}
		}
	 var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","JE Created ID..=="+SubmitIt);
		
}

function createExpenseReport(AccName,employee,docNum,tranDate,Memo,Department,Location,dateArr,catArr,
		   amtArr,memoArr,deptArr,locArr)
{
nlapiLogExecution("DEBUG","In Create Function"," Expense Report Create Function...");
	
	var record = nlapiCreateRecord('expensereport', {recordmode: 'dynamic'});
	
	if(employee != null && employee != undefined && employee != '')
	{
		record.setFieldValue('entity',employee);
	}
	
	
	if(AccName != null && AccName != undefined && AccName != '')
	{
		// record.setFieldValue('account',AccName);
	}
	
	if(docNum != null && docNum != undefined && docNum != '')
	{
		record.setFieldValue('tranid',docNum);
	}
	
	
	record.setFieldValue('memo',Memo);
	
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
	
	 record.setFieldValue('custbody1','T');
	 record.setFieldValue('supervisorapproval','T');
	 record.setFieldValue('accountingapproval','T');
	 record.setFieldValue('custbody_service_status',41);
	 
	 var CatMap={}
	 

	 CatMap['AR']=1;
	 CatMap['Advance']=2;
	 CatMap['Advertising']=3;
	 CatMap['Airline']=4;
	 CatMap['Anc Policy']=5;
	 CatMap['Auto']=6;
	 CatMap['Building Repair & Maint']=7;
	 CatMap['Cell Phone']=8;
	 CatMap['Deposit']=9;
	 CatMap['Dues & Subscriptions']=10;
	 CatMap['Health Insurance']=11;
	 CatMap['Hotel']=12;
	 CatMap['Insurance - Auto']=13;
	 CatMap['Interest']=14;
	 CatMap['Internet']=15;
	 CatMap['Life Insurance']=16;
	 CatMap['Meals']=17;
	 CatMap['Mileage']=18;
	 CatMap['Minor Equip']=19;
	 CatMap['Office Supplies']=20;
	 CatMap['Postage']=21;
	 CatMap['Repair Supplies']=22;
	 CatMap['Sales Tax']=23;


	
	if(catArr != null && catArr != undefined && catArr !='')
	   {
		   for( var l=0;l<catArr.length;l++)
			{
			   record.selectNewLineItem('expense');
			   
			   if(dateArr[l] != null && dateArr[l] != undefined && dateArr[l] != '')
				{
				 record.setCurrentLineItemValue('expense', 'expensedate',dateArr[l]);
				}
			   
			   if(catArr[l] != null && catArr[l] != undefined && catArr[l] != '')
				{
				 record.setCurrentLineItemValue('expense', 'category',CatMap[catArr[l].trim()]);
				}
			   
			   
			   if(amtArr[l] != null && amtArr[l] != undefined && amtArr[l] != '')
				{
				 record.setCurrentLineItemValue('expense', 'amount',amtArr[l]);
				}
			   
			   if(deptArr[l] != null && deptArr[l] != undefined && deptArr[l] != '')
				{
				   var setLineDep = FindDepartment(deptArr[l].trim());
				   record.setCurrentLineItemValue('expense', 'department', setLineDep);
				}
			        
			   if(locArr[l] != null && locArr[l] != undefined && locArr[l] != '')
				{
				   var setLineLoc = FindLocation(locArr[l].trim());
				   record.setCurrentLineItemValue('expense', 'location', setLineLoc);
				}
			   
			   if(memoArr[l] != null && memoArr[l] != undefined && memoArr[l] != '')
				{
				 record.setCurrentLineItemValue('expense', 'memo',memoArr[l]);
				}
			   
			   record.setCurrentLineItemValue('expense', 'currency',1);
			   
			   record.commitLineItem('expense');
			}
	   }
	 var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","Expense Report Created ID..=="+SubmitIt);
}


function createIRfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom)

{

	if(createdFrom != null && createdFrom != '' && createdFrom != undefined)
	{
	      var DocToCheck =createdFrom.substring(createdFrom.indexOf('#')+1, createdFrom.length);
			
			var valueCust =FindTransactionNumSearch(DocToCheck.trim());
			
			var type = createdFrom.substring(0,createdFrom.indexOf('#'));
			
			if(type.trim()=='Purchase Order')
			{
				 var record = nlapiTransformRecord('purchaseorder', valueCust, 'itemreceipt');
			}
		     
			if(docNum != null && docNum != undefined && docNum != '')
			{
				record.setFieldValue('tranid',docNum);
			}
			   
			if(tranDate != null && tranDate != undefined && tranDate != '')
			{
				record.setFieldValue('trandate',new Date(tranDate));
			}
			   
		      var linecount =record.getLineItemCount('item');
		      
		      if(linecount > 0)
		      {
		    	  for(var h=linecount;h>=1;h--)
		    	  {
		    		  record.removeLineItem('item',h);
		    	  }
		      }
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
						   var setLineDep = FindDepartment(lineDeptArr[l].trim());
						}
					        
					   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
						{
						   var setLineLoc = FindLocation(lineLocArr[l].trim());
						}
					    
					   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
						{
						   var setLineCust = FindCustomer(lineCustArr[l].trim());
						}
					     
					   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
						{
						   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
				    	 
				    	//---------------------- Inventory Detail -------------------------- 
				    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
				  	      {
				    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
						  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
						  	 
					    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
				  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
				  	    	  {
				  	    		  var SerialNum=InvDetailNumArr[l];
				  	    		  var SerialQty=InvDetailQtyArr[l];
				  	    		  
				  	    		  subrec.selectNewLineItem('inventoryassignment');
				  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
				  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
				  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
			                      subrec.commitLineItem('inventoryassignment');//	  
				  		  	      	  
				  	    	  }
				  	    	subrec.commit();
				  	      }
				    	 
				    	//---------------------- END Inventory Detail -------------------------- 
						    
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
						   var setLineDep = FindDepartment(ExplineDeptArr[l1].trim());
						}
					        
					   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
						{
						   var setLineLoc = FindLocation(ExplineLocArr[l1].trim());
						}
					    
					   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
						{
						   var setLineCust = FindCustomer(ExplineCustArr[l1].trim());
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
				
			    nlapiLogExecution("DEBUG","In Create Function","IR Created ID..=="+SubmitIt);
				 
	}
	
	
}

function createIFfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
		   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
		   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom,shipStatus)
{


	if(createdFrom != null && createdFrom != '' && createdFrom != undefined)
	{
	      var DocToCheck =createdFrom.substring(createdFrom.indexOf('#')+1, createdFrom.length);
			
			var valueCust =FindTransactionNumSearch(DocToCheck.trim());
			
			var type = createdFrom.substring(0,createdFrom.indexOf('#'));
			
			if(type.trim()=='Sales Order')
			{
				 var record = nlapiTransformRecord('salesorder', valueCust, 'itemfulfillment');
			}
		     
			if(docNum != null && docNum != undefined && docNum != '')
			{
				record.setFieldValue('tranid',docNum);
			}
			 
			if(shipStatus != null && shipStatus != undefined && shipStatus != '')
			{
				record.setFieldValue('shipstatus',shipStatus);
			}
			
			if(tranDate != null && tranDate != undefined && tranDate != '')
			{
				record.setFieldValue('trandate',new Date(tranDate));
			}
			   
		      var linecount =record.getLineItemCount('item');
		      
		      if(linecount > 0)
		      {
		    	  for(var h=linecount;h>=1;h--)
		    	  {
		    		  record.removeLineItem('item',h);
		    	  }
		      }
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
						   var setLineDep = FindDepartment(lineDeptArr[l].trim());
						}
					        
					   if(lineLocArr[l] != null && lineLocArr[l] != undefined && lineLocArr[l] != '')
						{
						   var setLineLoc = FindLocation(lineLocArr[l].trim());
						}
					    
					   if(lineCustArr[l] != null && lineCustArr[l] != undefined && lineCustArr[l] != '')
						{
						   var setLineCust = FindCustomer(lineCustArr[l].trim());
						}
					     
					   if(vendNameArr[l] != null && vendNameArr[l] != undefined && vendNameArr[l] != '')
						{
						   var setLineVendor =FindVendor(vendNameArr[l].trim());
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
				    	 
				    	//---------------------- Inventory Detail -------------------------- 
				    	 if(InvDetailNumArr[l] != null && InvDetailNumArr[l] != undefined)
				  	      {
				    		  var subrec = record.createCurrentLineItemSubrecord('item','inventorydetail');
						  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
						  	 
					    	  nlapiLogExecution('DEBUG', 'Acct', 'InvDetailNumArr[l].length = '+InvDetailNumArr[l].length );
				  	    	  for(var k=1 ;k<=InvDetailNumArr[l].length;k++)
				  	    	  {
				  	    		  var SerialNum=InvDetailNumArr[l];
				  	    		  var SerialQty=InvDetailQtyArr[l];
				  	    		  
				  	    		  subrec.selectNewLineItem('inventoryassignment');
				  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',SerialNum[k-1]);
				  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(SerialQty[k-1]));
				  			  	 // subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
			                      subrec.commitLineItem('inventoryassignment');//	  
				  		  	      	  
				  	    	  }
				  	    	subrec.commit();
				  	      }
				    	 
				    	//---------------------- END Inventory Detail -------------------------- 
						    
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
						   var setLineDep = FindDepartment(ExplineDeptArr[l1].trim());
						}
					        
					   if(ExplineLocArr[l1] != null && ExplineLocArr[l1] != undefined && ExplineLocArr[l1] != '')
						{
						   var setLineLoc = FindLocation(ExplineLocArr[l1].trim());
						}
					    
					   if(ExplineCustArr[l1] != null && ExplineCustArr[l1] != undefined && ExplineCustArr[l1] != '')
						{
						   var setLineCust = FindCustomer(ExplineCustArr[l1].trim());
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
				
			    nlapiLogExecution("DEBUG","In Create Function","IF Created ID..=="+SubmitIt);
				 
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
	
	 nlapiLogExecution('DEBUG','FindItemSearch Function',' FindItemSearch IS -->'+item)
	
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
	
		nlapiLogExecution('DEBUG','FindItemSearch Function',' New Item IS -->'+ID)
			

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
	
	nlapiLogExecution('DEBUG','FindItemSearch Function',' FindCustDepositSearch IS -->'+docNum)
	
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
	nlapiLogExecution('DEBUG','FindItemSearch Function',' FindCustDepositSearch ID -->'+ID)
	

		return ID;
	}


function FindTransactionNumSearch(docNum)
{ 
    var filters=new Array();
	var columns = new Array();
	
	nlapiLogExecution('DEBUG','FindTransactionNumSearch Function',' FindTransactionNumSearch IS -->'+docNum)
	
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
	nlapiLogExecution('DEBUG','FindItemSearch Function',' FindCustDepositSearch ID -->'+ID)
	

		return ID;
	}
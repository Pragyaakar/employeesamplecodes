	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       20 Feb 2020  2020     Tushar More
	 *
	 */
	
	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType
	 * 
	 * @param {String} type Sublist internal id
	 * @param {String} name Field internal id
	 * @param {Number} linenum Optional line item number, starts from 1
	 * @returns {Void}
	 */
	
	
function scheduleWirelessPushData(type) 
{	
	
	var s_JSON_Data =[];
	var searchId='customsearch_tm_trans_for_integration__3';
	//resultSet = findTransaction(searchId);
	resultSet =getSavedSearchResult(null, searchId, null)
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
				
				 for(var i=0;i<resultSet.length;i++)//resultSet.length
					{
						try
						{

							
						    var transMap={};
							var columns = resultSet[i].getAllColumns();
							recId = resultSet[i].getValue(columns[0]);
							var docNo = resultSet[i].getValue(columns[2]);
							
							//var status = resultSet[i].getValue(columns[2]);
							var type = resultSet[i].getValue(columns[4]);
							var date = resultSet[i].getValue(columns[1]);
                            var totTranAmt = resultSet[i].getValue(columns[4]);
							
					//===============================================================		
						    if(type =='SalesOrd') //CustInvc ..SalesOrd
							{
						    	
						      var itemArr =[];
						      var qtyArr =[];
						      var qtyCommitArr=[];
						      var qtyFulfillArr=[];
						      var qtyInvoicedArr=[];
						      var qtyBackOrderArr=[];
						      var unitsArr=[];
						      var descripArr=[];
						      var priceLvlArr=[];
						      var rateArr=[];
						      var amtArr=[];
						      var costEstTypeArr=[];
						    	
						      if(type =='SalesOrd')
						       {
						    	  var loadRec = nlapiLoadRecord('salesorder',recId);
						       } 
						      
							  if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
								  //nlapiLogExecution("DEBUG","In Create Function","loadRec =="+loadRec);
								  
								  var docNum = loadRec.getFieldValue('tranid');
								  var customer = loadRec.getFieldValue('entity');
								  var tranDate = loadRec.getFieldValue('trandate');
								  var department = loadRec.getFieldValue('department');
								  var location = loadRec.getFieldValue('location');
								  var CreatedFrom = loadRec.getFieldText('createdfrom');
								  var salesEffDate = loadRec.getFieldValue('saleseffectivedate');
								  var shipDate = loadRec.getFieldValue('shipdate');
								  var shipCarrier = loadRec.getFieldValue('shipcarrier');
								  var actulShipDate = loadRec.getFieldValue('actualshipdate');
								  
								  var account = loadRec.getFieldValue('account');
								  var exchRate = loadRec.getFieldValue('exchangerate');
								  var estExtCost = loadRec.getFieldValue('totalcostestimate');
								  var estGrossProfit = loadRec.getFieldValue('estgrossprofit');
								  var estGrossProfitPercent = loadRec.getFieldValue('estgrossprofitpercent');
                                
                                var isTax = loadRec.getFieldValue('istaxable');
                                
                                if(isTax =='T')
                                   {
                                    var TaxItem = loadRec.getFieldValue('taxitem');
                                   }                                
								  
								 /* nlapiLogExecution("DEBUG","In Create Function","customer =="+customer);
								    nlapiLogExecution("DEBUG","In Create Function","docNum =="+docNum);
								    nlapiLogExecution("DEBUG","In Create Function","subsi =="+subsi);
								    nlapiLogExecution("DEBUG","In Create Function","location =="+location);
								  */
								  
								  var lineCount = loadRec.getLineItemCount('item');
								  
								    for( var l=1;l<=lineCount;l++)
									{
									    var item = loadRec.getLineItemValue('item','item',l);
									 
									    var qty = loadRec.getLineItemValue('item','quantity',l);
									    
									    var qtyComm = loadRec.getLineItemValue('item','quantitycommitted',l);
									    
									    var qtyInv = loadRec.getLineItemValue('item','quantitybilled',l);
									   
									    var qtyFulfill = loadRec.getLineItemValue('item','quantityfulfilled',l);
									    
									    var qtyBckOrd= loadRec.getLineItemValue('item','quantitybackordered',l);
									    
									    var unit = loadRec.getLineItemValue('item','units',l);
									    
									    var descr = loadRec.getLineItemValue('item','description',l);
									    
					                     var priclvl = loadRec.getLineItemValue('item','price',l);
									    
									    var Rate = loadRec.getLineItemValue('item','rate',l);
									    
									    var amount = loadRec.getLineItemValue('item','amount',l);
									    
									    
									    var costEstType = loadRec.getLineItemValue('item','costestimatetype',l);
									    
									    itemArr.push(item);
									    qtyArr.push(qty);
									    qtyCommitArr.push(qtyComm);
									    qtyFulfillArr.push(qtyFulfill);
									    qtyInvoicedArr.push(qtyInv);
									    qtyBackOrderArr.push(qtyBckOrd);
									    unitsArr.push(unit);
									    descripArr.push(descr);
									    priceLvlArr.push(priclvl);
									    rateArr.push(Rate);
									    amtArr.push(amount);
									    costEstTypeArr.push(costEstType);
									    
									}
								  
								  /*  nlapiLogExecution("DEBUG","In Create Function","itemArr =="+itemArr);
								    nlapiLogExecution("DEBUG","In Create Function","qtyArr =="+qtyArr);
								    nlapiLogExecution("DEBUG","In Create Function","rateArr =="+rateArr);
								    nlapiLogExecution("DEBUG","In Create Function","costEstTypeArr =="+costEstTypeArr);
								    */
								    transMap['record_id']=recId;
									transMap['record_type']=type;
									transMap['record_date']=tranDate;
									transMap['record_doc_num']=docNum;
									transMap['record_customer']=customer;
									transMap['record_created_from']=CreatedFrom;
									transMap['record_department']=department;
									transMap['record_loc']=location;
									transMap['record_sales_eff_date']=salesEffDate;
									transMap['record_shipdate']=shipDate;
									transMap['record_shipcarri']=shipCarrier;
									transMap['record_ship_act_date']=actulShipDate;
									transMap['record_est_grs_profit_perc']=estGrossProfitPercent;
									transMap['record_tax_item']=TaxItem;
									transMap['record_exrate']=exchRate;
									transMap['record_est_extcost']=estExtCost;
									transMap['record_est_grs_profit']=estGrossProfit;
									transMap['record_itmarr']=itemArr;
									transMap['record_qtyarr']=qtyArr;
									transMap['record_qty_comm_arr']=qtyCommitArr;
									transMap['record_qty_fulfil_arr']=qtyFulfillArr;
									
									transMap['record_cashsale_account']=account;
									
									transMap['record_qty_inv_arr']=qtyInvoicedArr;
									transMap['record_qty_back_arr']=qtyBackOrderArr;
									transMap['record_unit_arr']=unitsArr;
									transMap['record_descrp_arr']=descripArr;
									
									transMap['record_price_arr']=priceLvlArr;
									transMap['record_rate_arr']=rateArr;
									transMap['record_amt_arr']=amtArr;
									transMap['record_cest_type']=costEstTypeArr;
									transMap['record_trans_total']=totTranAmt;
								
								 
							  }		
							
					//==================================================================
							
							s_JSON_Data.push(transMap);
						 }
						 else if(type =='VendBill' || type =='VendCred' || type =='Check' || type =='PurchOrd')
						 {
	                             var itemArr =[];
							      var qtyArr =[];
							      var vendNameArr=[];
								  var lineDeptArr=[];
								  var lineClassArr=[];
								  var lineLocArr=[];
								  var lineCustArr=[];
								  
								  var ExplineDeptArr=[];
								  var ExplineClassArr=[];
								  var ExplineLocArr=[];
								  var ExplineCustArr=[];
								  
							      var unitsArr=[];
							      var descripArr=[];
							      var priceLvlArr=[];
							      var rateArr=[];
							      var amtArr=[];
							      var AccArr=[];
							      var ExpAmtArr=[];
							    	
								  var DueDateArr =[];
								  var refNumArr =[];
								  var OrigAmtArr =[];
								  var AmtDueArr =[];
								  var DiscDateArr =[];
								  var DiscAvailArr =[];
								  var DiscTakeArr =[];
								  var PaymentArr =[];
								  
							      if(type =='VendBill')
							      {
							    	  var loadRec = nlapiLoadRecord('vendorbill',recId);
							      }
							      else if(type =='VendCred')
							       {
							    	  var loadRec = nlapiLoadRecord('vendorcredit',recId);
							       } 
							      else if(type =='Check')
							       {
							    	  var loadRec = nlapiLoadRecord('check',recId);
							       } 
							       else if(type =='PurchOrd')
							       {
							    	  var loadRec = nlapiLoadRecord('purchaseorder',recId);
							       }
								  
								  if(loadRec != null && loadRec != '' && loadRec !=undefined)
								  {
									 // nlapiLogExecution("DEBUG","In Create Function","loadRec =="+loadRec);
									  
									  var docNum = loadRec.getFieldValue('tranid');
									  var Vendor = loadRec.getFieldValue('entity');
									  var tranDate = loadRec.getFieldValue('trandate');
									  var department = loadRec.getFieldValue('department');
									  var location = loadRec.getFieldValue('location');
									  var AccountName = loadRec.getFieldValue('account');
									  var CreatedFrom = loadRec.getFieldText('createdfrom');
									  
										
									  var lineCount = loadRec.getLineItemCount('item');
									  
									  var lineCount1 = loadRec.getLineItemCount('expense');
									  
									  var lineCount2 = loadRec.getLineItemCount('apply ');
									  
									  if(lineCount > 0)
									  {
										  for( var l=1;l<=lineCount;l++)
											{
											    var item = loadRec.getLineItemValue('item','item',l);
											 
											    var qty = loadRec.getLineItemValue('item','quantity',l);
											    
											    var vendName = loadRec.getLineItemValue('item','vendorname',l);
											    
											    var unit = loadRec.getLineItemValue('item','units',l);
											    
											    var descr = loadRec.getLineItemValue('item','description',l);
											    
							                     
											    var Rate = loadRec.getLineItemValue('item','rate',l);
											    
											    var amount = loadRec.getLineItemValue('item','amount',l);
											    
											    var lineDept = loadRec.getLineItemValue('item','department',l);
												  
											    var lineClass = loadRec.getLineItemValue('item','class',l);
											    
											    var lineLoc = loadRec.getLineItemValue('item','location',l);
											    
											    var lineCust = loadRec.getLineItemValue('item','customer',l);
											    
											    itemArr.push(item);
											    qtyArr.push(qty);
											    vendNameArr.push(vendName);
											    lineDeptArr.push(lineDept);
											    lineClassArr.push(lineClass);
											    lineLocArr.push(lineLoc);
											    lineCustArr.push(lineCust);
											    unitsArr.push(unit);
											    descripArr.push(descr);
											    rateArr.push(Rate);
											    amtArr.push(amount);
											    
											    
											}
									  }
									   
									  if(lineCount1 > 0)
									  {
										  for( var l1=1;l1<=lineCount1;l1++)
											{
		                                        var Account = loadRec.getLineItemValue('expense','account',l1);
											    
											    var Examount = loadRec.getLineItemValue('expense','amount',l1);
											    
											    var ExlineDept = loadRec.getLineItemValue('expense','department',l1);
												  
											    var ExlineClass = loadRec.getLineItemValue('expense','class',l1);
											    
											    var ExlineLoc = loadRec.getLineItemValue('expense','location',l1);
											    
											    var ExplineCust = loadRec.getLineItemValue('expense','customer',l1);
											    
											    
											    AccArr.push(Account);
											    ExpAmtArr.push(Examount);
											    ExplineDeptArr.push(ExlineDept);
											    ExplineClassArr.push(ExlineClass);
											    ExplineLocArr.push(ExlineLoc);
											    ExplineCustArr.push(ExplineCust);
											}
									   }
									  
									  if(lineCount2 > 0)
									  {
										  for( var l2=1;l2<=lineCount2;l2++)
											{
											  
											  var ApplyIS = loadRec.getLineItemValue('apply','apply',l2);
											  
													  if(ApplyIS == 'T')
													  {
														  var DueDate = loadRec.getLineItemValue('apply','applydate',l2);
														    
														    var refNum = loadRec.getLineItemValue('apply','refnum',l2);
														    
					                                        var origAmt = loadRec.getLineItemValue('apply','total',l2);
														    
														    var AmtDue = loadRec.getLineItemValue('apply','due',l2);
														    
					                                        var DiscDate = loadRec.getLineItemValue('apply','discdate',l2);
														    
														    var DiscAvail = loadRec.getLineItemValue('apply','discamt',l2);
														    
														    var DiscTaken = loadRec.getLineItemValue('apply','disc',l2);
														    
														    var Payment = loadRec.getLineItemValue('apply','amount',l2);
														    
			
														    
														    DueDateArr.push(DueDate);
														    refNumArr.push(refNum);
														    OrigAmtArr.push(origAmt);
														    AmtDueArr.push(AmtDue);
														    DiscDateArr.push(DiscDate);
														    DiscAvailArr.push(DiscAvail);
														    DiscTakeArr.push(DiscTaken);
														    PaymentArr.push(Payment);
													  }
													   
											}
									  }
									  
									    transMap['record_id']=recId;
										transMap['record_type']=type;
										
										transMap['record_created_from']=CreatedFrom;
										transMap['record_date']=tranDate;
										transMap['record_doc_num']=docNum;
										transMap['record_vendor']=Vendor;
										transMap['record_department']=department;
										transMap['record_loc']=location;
										transMap['record_top_name']=AccountName;
										transMap['record_itmarr']=itemArr;
										transMap['record_qtyarr']=qtyArr;
										
										transMap['record_item_line_dept']=lineDeptArr;
										transMap['record_item_line_clss']=lineClassArr;
										transMap['record_item_line_loc']=lineLocArr;
										transMap['record_item_line_cust']=lineCustArr;
										transMap['record_unit_arr']=unitsArr;
										transMap['record_descrp_arr']=descripArr;
										
										transMap['record_item_line_vendname']=vendNameArr;
										transMap['record_rate_arr']=rateArr;
										transMap['record_amt_arr']=amtArr;
										
										
									    transMap['record_exp_line_acc']=AccArr;
										transMap['record_exp_line_amt']=ExpAmtArr;
										
										transMap['record_exp_line_dept']=ExplineDeptArr;
										transMap['record_exp_line_clss']=ExplineClassArr;
										transMap['record_exp_line_loc']=ExplineLocArr;
										transMap['record_exp_line_cust']=ExplineCustArr;
										
										
										transMap['record_apply_due_date']=DueDateArr;
										transMap['record_apply_ref_num']=refNumArr;
										transMap['record_apply_orig_amt']=OrigAmtArr;
										transMap['record_apply_amt_due']=AmtDueArr;
											
										transMap['record_apply_disc_date']=DiscDateArr;
										transMap['record_apply_disc_avail']=DiscAvailArr;
										transMap['record_apply_disc_taken']=DiscTakeArr;
										transMap['record_apply_payment']=PaymentArr;
										transMap['record_trans_total']=totTranAmt;
								  }		
								
						//==================================================================
								
								s_JSON_Data.push(transMap);
							
							  
							 } 
							 else if(type =='ItemRcpt' || type =='ItemShip' )
							 {

	                             var itemArr =[];
							      var qtyArr =[];
							      var vendNameArr=[];
								  var lineDeptArr=[];
								  var lineClassArr=[];
								  var lineLocArr=[];
								  var lineCustArr=[];
								  
								  var ExplineDeptArr=[];
								  var ExplineClassArr=[];
								  var ExplineLocArr=[];
								  var ExplineCustArr=[];
								  
							      var unitsArr=[];
							      var descripArr=[];
							      var priceLvlArr=[];
							      var rateArr=[];
							      var amtArr=[];
							      var AccArr=[];
							      var ExpAmtArr=[];
							    	
								  var DueDateArr =[];
								  var refNumArr =[];
								  var OrigAmtArr =[];
								  var AmtDueArr =[];
								  var DiscDateArr =[];
								  var DiscAvailArr =[];
								  var DiscTakeArr =[];
								  var PaymentArr =[];
								  
							      if(type =='ItemRcpt')
							      {
							    	  var loadRec = nlapiLoadRecord('itemreceipt',recId);
							      }
							      else if(type =='ItemShip')
							      {
							    	  var loadRec = nlapiLoadRecord('itemfulfillment',recId);
							      }
							     								  
								  if(loadRec != null && loadRec != '' && loadRec !=undefined)
								  {
									 // nlapiLogExecution("DEBUG","In Create Function","loadRec =="+loadRec);
									  
									  var docNum = loadRec.getFieldValue('tranid');
									  var Vendor = loadRec.getFieldValue('entity');
									  var tranDate = loadRec.getFieldValue('trandate');
									  var department = loadRec.getFieldValue('department');
									  var location = loadRec.getFieldValue('location');
									  var AccountName = loadRec.getFieldValue('account');
									  var CreatedFrom = loadRec.getFieldText('createdfrom');
									  var Memo = loadRec.getFieldValue('memo');
									  
									  
										
									  var lineCount = loadRec.getLineItemCount('item');
									  
									  var lineCount1 = loadRec.getLineItemCount('expense');
									  
									  var lineCount2 = loadRec.getLineItemCount('apply ');
									  
									  if(lineCount > 0)
									  {
										  for( var l=1;l<=lineCount;l++)
											{
											    var item = loadRec.getLineItemValue('item','item',l);
											 
											    var qty = loadRec.getLineItemValue('item','quantity',l);
											    
											    var vendName = loadRec.getLineItemValue('item','vendorname',l);
											    
											    var unit = loadRec.getLineItemValue('item','units',l);
											    
											    var descr = loadRec.getLineItemValue('item','description',l);
											    
							                     
											    var Rate = loadRec.getLineItemValue('item','rate',l);
											    
											    var amount = loadRec.getLineItemValue('item','amount',l);
											    
											    var lineDept = loadRec.getLineItemValue('item','department',l);
												  
											    var lineClass = loadRec.getLineItemValue('item','class',l);
											    
											    var lineLoc = loadRec.getLineItemValue('item','location',l);
											    
											    var lineCust = loadRec.getLineItemValue('item','customer',l);
											    
											    itemArr.push(item);
											    qtyArr.push(qty);
											    vendNameArr.push(vendName);
											    lineDeptArr.push(lineDept);
											    lineClassArr.push(lineClass);
											    lineLocArr.push(lineLoc);
											    lineCustArr.push(lineCust);
											    unitsArr.push(unit);
											    descripArr.push(descr);
											    rateArr.push(Rate);
											    amtArr.push(amount);
											    
											    
											}
									  }
									   
									  if(lineCount1 > 0)
									  {
										  for( var l1=1;l1<=lineCount1;l1++)
											{
		                                        var Account = loadRec.getLineItemValue('expense','account',l1);
											    
											    var Examount = loadRec.getLineItemValue('expense','amount',l1);
											    
											    var ExlineDept = loadRec.getLineItemValue('expense','department',l1);
												  
											    var ExlineClass = loadRec.getLineItemValue('expense','class',l1);
											    
											    var ExlineLoc = loadRec.getLineItemValue('expense','location',l1);
											    
											    var ExplineCust = loadRec.getLineItemValue('expense','customer',l1);
											    
											    
											    AccArr.push(Account);
											    ExpAmtArr.push(Examount);
											    ExplineDeptArr.push(ExlineDept);
											    ExplineClassArr.push(ExlineClass);
											    ExplineLocArr.push(ExlineLoc);
											    ExplineCustArr.push(ExplineCust);
											}
									   }
									  
						
									    transMap['record_id']=recId;
										transMap['record_type']=type;
										
										transMap['record_created_from']=CreatedFrom;
										transMap['record_date']=tranDate;
										transMap['record_doc_num']=docNum;
										transMap['record_vendor']=Vendor;
										transMap['record_department']=department;
										transMap['record_loc']=location;
										transMap['record_top_name']=AccountName;
										transMap['record_itmarr']=itemArr;
										transMap['record_qtyarr']=qtyArr;
										
										transMap['record_item_line_dept']=lineDeptArr;
										transMap['record_item_line_clss']=lineClassArr;
										transMap['record_item_line_loc']=lineLocArr;
										transMap['record_item_line_cust']=lineCustArr;
										transMap['record_unit_arr']=unitsArr;
										transMap['record_descrp_arr']=descripArr;
										
										transMap['record_item_line_vendname']=vendNameArr;
										transMap['record_rate_arr']=rateArr;
										transMap['record_amt_arr']=amtArr;
										
										
									    transMap['record_exp_line_acc']=AccArr;
										transMap['record_exp_line_amt']=ExpAmtArr;
										
										transMap['record_exp_line_dept']=ExplineDeptArr;
										transMap['record_exp_line_clss']=ExplineClassArr;
										transMap['record_exp_line_loc']=ExplineLocArr;
										transMap['record_exp_line_cust']=ExplineCustArr;
										
										
								  }		
								
						//==================================================================
								
								s_JSON_Data.push(transMap);
							
							  
							 
								 
							 }
						}
						catch(e)
						{
							nlapiLogExecution('DEBUG','resultSet length','Error =='+e+':RecId=='+recId);	
							
						}
					}
			}
}

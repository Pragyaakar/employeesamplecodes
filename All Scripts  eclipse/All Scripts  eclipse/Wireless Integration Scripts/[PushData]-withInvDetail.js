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
	
	

function schedulePushData(type) 
{	
    
	
	var s_JSON_Data =[];
	var searchId='customsearch1068';
	
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
							var docNo = resultSet[i].getValue(columns[1]);
							var type = resultSet[i].getValue(columns[2]);
							var date = resultSet[i].getValue(columns[3]);
                            var totTranAmt = resultSet[i].getValue(columns[4]);
							
					//===============================================================		
						    if(type =='CustInvc' || type =='CashSale'|| type =='SalesOrd') //CustInvc ..SalesOrd
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
						      var InvDetailNumArr=[];
						      var InvDetailQtyArr=[];
						    	
							  
							  if(type =='CustInvc')
						      {
						    	  var loadRec = nlapiLoadRecord('invoice',recId);
						      }
						      else if(type =='CashSale')
						       {
						    	  var loadRec = nlapiLoadRecord('cashsale',recId);
						       } 
						      else if(type =='SalesOrd')
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
								  var salesEffDate = loadRec.getFieldValue('saleseffectivedate');
								  var shipDate = loadRec.getFieldValue('shipdate');
								  var createdFrom = loadRec.getFieldText('createdfrom');
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
									    
									    var SerialInvNumArr =[];
									    var SerailInvQtyArr =[];
									   
									    var rec= loadRec.viewLineItemSubrecord('item', 'serialnumbers',l);
					            		 
									    if(rec != null && rec != undefined && rec !='')
									    {
									    	 var invcount = rec.getLineItemCount('inventoryassignment');
							            		
											    //nlapiLogExecution('DEBUG', 'aftr submit', "  rec  ==" + rec+' invcount=='+invcount);
											    
							            		 for(var x = 1; x <=invcount ; x++)
							            		 {
							                        var InvNum = rec.getLineItemValue('inventoryassignment','receiptinventorynumber',x);
							            		    
							                        var InvQty = rec.getLineItemValue('inventoryassignment','quantity',x);
							                        
							                        SerialInvNumArr.push(InvNum);
							                        SerailInvQtyArr.push(InvQty);
							            		 }
									    }
									   
									    
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
									    InvDetailNumArr.push(SerialInvNumArr);
									    InvDetailQtyArr.push(SerailInvQtyArr);
									}
								  
								  
								    transMap['record_id']=recId;
									transMap['record_type']=type;
									transMap['record_date']=tranDate;
									transMap['record_doc_num']=docNum;
									transMap['record_customer']=customer;
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
									
									transMap['record_line_serial_num']=InvDetailNumArr;
									transMap['record_line_serial_qty']=InvDetailQtyArr;
									
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
									transMap['record_createdfrom']=createdFrom;
								
								 
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
							  var InvDetailNumArr=[];
						      var InvDetailQtyArr=[];
						    	
							  
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
								  var createdFrom = loadRec.getFieldText('createdfrom');
								  var department = loadRec.getFieldValue('department');
								  var location = loadRec.getFieldValue('location');
								  var AccountName = loadRec.getFieldValue('account');
								  
								  
									
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
										    
										    var SerialInvNumArr =[];
										    var SerailInvQtyArr =[];
										   
										    var rec= loadRec.viewLineItemSubrecord('item', 'inventorydetail',l);
						            		 
										    if(rec != null && rec != undefined && rec !='')
										    {
										    	 var invcount = rec.getLineItemCount('inventoryassignment');
								            		
												    //nlapiLogExecution('DEBUG', 'aftr submit', "  rec  ==" + rec+' invcount=='+invcount);
												    
								            		 for(var x = 1; x <=invcount ; x++)
								            		 {
								                        var InvNum = rec.getLineItemValue('inventoryassignment','receiptinventorynumber',x);
								            		    
								                        var InvQty = rec.getLineItemValue('inventoryassignment','quantity',x);
								                        
								                        SerialInvNumArr.push(InvNum);
								                        SerailInvQtyArr.push(InvQty);
								            		 }
										    }
										   
										    
						            		 InvDetailNumArr.push(SerialInvNumArr);
											 InvDetailQtyArr.push(SerailInvQtyArr);
											    
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
									transMap['record_line_serial_num']=InvDetailNumArr;
									transMap['record_line_serial_qty']=InvDetailQtyArr;
									
									
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
									transMap['record_createdfrom']=createdFrom;
							  }		
							
					//==================================================================
							
							s_JSON_Data.push(transMap);
						
						  
						 }
						 else if(type=='CardChrg' ||type=='CardRfnd')
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
							  
							 // nlapiLogExecution("DEBUG","In Create Function","type =="+type);
						        if(type =='CardChrg')
						    	 {
						        	  var loadRec = nlapiLoadRecord('creditcardcharge',recId);
						    	 }
						        else if(type =='CardRfnd')
						        {
						        	  var loadRec = nlapiLoadRecord('creditcardrefund',recId);
						        }
						    	
						     
							 // nlapiLogExecution("DEBUG","In Create Function","loadRec =="+loadRec);
							  
							  if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
								//  nlapiLogExecution("DEBUG","In Create Function","loadRec =="+loadRec);
								  
								  var docNum = loadRec.getFieldValue('tranid');
								  var Vendor = loadRec.getFieldValue('entity');
								  
								 // nlapiLogExecution("DEBUG","In Create Function","Vendor =="+Vendor);
								  var tranDate = loadRec.getFieldValue('trandate');
								  var department = loadRec.getFieldValue('department');
								  var location = loadRec.getFieldValue('location');
								  
								  var createdFrom=loadRec.getFieldText('createdfrom');
								  var AccountName = loadRec.getFieldValue('account');
								//  nlapiLogExecution("DEBUG","In Create Function","AccountName =="+AccountName);
								  var Memo = loadRec.getFieldValue('memo');
								    
									
								//nlapiLogExecution("DEBUG","In Create Function","AccountName =="+AccountName);
								  	
								  var lineCount = loadRec.getLineItemCount('item');
								  
								  var lineCount1 = loadRec.getLineItemCount('expense');
								  
								  var lineCount2 = loadRec.getLineItemCount('apply');
								  
								// nlapiLogExecution("DEBUG","In Create Function","lineCount2 =="+lineCount2);
								 
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
									
									
									transMap['record_date']=tranDate;
									transMap['record_doc_num']=docNum;
									transMap['record_vendor']=Vendor;
									transMap['record_department']=department;
									transMap['record_loc']=location;
									transMap['record_top_name']=AccountName;
									transMap['record_itmarr']=itemArr;
									transMap['record_qtyarr']=qtyArr;
									transMap['record_memo']=Memo;
									
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
									transMap['record_createdfrom']=createdFrom;
									
									s_JSON_Data.push(transMap);
							  }		
							
					//==================================================================
							
							
						
						  
						 
						 }
						 else if(type =='ExpRept')
						 {
							 var loadRec = nlapiLoadRecord('expensereport',recId);
							 
							 var AccName= loadRec.getFieldValue('account');
							 
							 var employee =loadRec.getFieldValue('entity');
							 
							 var Advance = loadRec.getFieldValue('advance');
							 
							 var docNum =loadRec.getFieldValue('tranid');
							 
							 var tranDate =loadRec.getFieldValue('trandate');
							 
							 var Memo =loadRec.getFieldValue('memo');
							 
                              var Department = loadRec.getFieldValue('department');
							 
							 var Location =loadRec.getFieldValue('location');
							 
							  var lineCount = loadRec.getLineItemCount('expense');
							  
							  var dateArr =[];
							  var catArr=[];
							  var amtArr=[];
							  var memoArr=[];
							  var deptArr=[];
							  var locArr=[];
							  
							  if(lineCount > 0)
							  {
								  for( var l=1;l<=lineCount;l++)
									{
									    var Date = loadRec.getLineItemValue('expense','expensedate',l);
									 
									    var category = loadRec.getLineItemText('expense','category',l);
									    
									    var amount = loadRec.getLineItemValue('expense','amount',l);
									    
									    var memo = loadRec.getLineItemValue('expense','memo',l);
									    
									    var lineDept = loadRec.getLineItemValue('expense','department',l);
										
									    var lineLoc = loadRec.getLineItemValue('expense','location',l);
									    
									     dateArr.push(Date);
									     catArr.push(category);
										 amtArr.push(amount);
										 memoArr.push(memo);
										 deptArr.push(lineDept);
										 locArr.push(lineLoc);
									}
							  }
							    transMap['record_id']=recId;
							    transMap['record_type']=type;
							    transMap['record_acc_name']=AccName;
								transMap['record_employee']=employee;
								transMap['record_doc_num']=docNum;
								transMap['record_date']=tranDate;
							    transMap['record_memo']=Memo;
								transMap['record_deptmt']=Department;
								transMap['record_location']=Location;
								
								transMap['record_line_date']=dateArr;
								transMap['record_line_cat']=catArr;
								transMap['record_line_amt']=amtArr;
							    transMap['record_line_memo']=memoArr;
								transMap['record_line_deptmt']=deptArr;
								transMap['record_line_location']=locArr;
								transMap['record_trans_total']=totTranAmt;
								s_JSON_Data.push(transMap);
						 }
						 else if(type =='VendPymt')
						 {
							 var loadRec = nlapiLoadRecord('vendorpayment',recId);
							 
							 if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
								 
							
							 
							 var AccName= loadRec.getFieldValue('account');
							 
							 var Payee =loadRec.getFieldValue('entity');
							 
							 var TranNum = loadRec.getFieldValue('transactionnumber');
							 
							 var CheckNum =loadRec.getFieldValue('tranid');
							 
							 var TranDate =loadRec.getFieldValue('trandate');
							 
							 var Memo =loadRec.getFieldValue('memo');
							 
                              var Department = loadRec.getFieldValue('department');
							 
							 var Location =loadRec.getFieldValue('location');
							 
							 
							  var lineCount = loadRec.getLineItemCount('apply');
							  
							  var lineCount1 = loadRec.getLineItemCount('credit');
							  
							  var DueDateArr =[];
							  var refNumArr =[];
							  var intIdArr =[];
							  var OrigAmtArr =[];
							  var AmtDueArr =[];
							  var DiscDateArr =[];
							  var DiscAvailArr =[];
							  var DiscTakeArr =[];
							  var PaymentArr =[];
							  
							  if(lineCount > 0)
							  {
								  for( var l=1;l<=lineCount;l++)
									{
									    var Apply = loadRec.getLineItemValue('apply','apply',l);
									    
									    if(Apply =='T')
										{
									    var DueDate = loadRec.getLineItemValue('apply','applydate',l);
										
									    var refNum = loadRec.getLineItemValue('apply','refnum',l);
									   
									   var intid = loadRec.getLineItemValue('apply','internalid',l);
									    
                                        var origAmt = loadRec.getLineItemValue('apply','total',l);
									    
									    var AmtDue = loadRec.getLineItemValue('apply','due',l);
									    
                                        var DiscDate = loadRec.getLineItemValue('apply','discdate',l);
									    
									    var DiscAvail = loadRec.getLineItemValue('apply','discamt',l);
									    
									    var DiscTaken = loadRec.getLineItemValue('apply','disc',l);
									    
									    var Payment = loadRec.getLineItemValue('apply','amount',l);
									    

									    
									    DueDateArr.push(DueDate);
									    refNumArr.push(refNum);
										intIdArr.push(intid);
									    OrigAmtArr.push(origAmt);
									    AmtDueArr.push(AmtDue);
									    DiscDateArr.push(DiscDate);
									    DiscAvailArr.push(DiscAvail);
									    DiscTakeArr.push(DiscTaken);
									    PaymentArr.push(Payment);
										}
									    
									}
							  }
							  
							  if(lineCount1 > 0)
							  {
								  for( var l1=1;l1<=lineCount1;l1++)
									{
									    var Apply1 = loadRec.getLineItemValue('credit','apply',l1);
									    
									    if(Apply1 =='T')
										{
									    	var Credref = loadRec.getLineItemValue('credit','refnum',l1);
										    
										    var CredAmt = loadRec.getLineItemValue('credit','amount',l1);
										    
										    CredLineRefArr.push(Credref);
											CredLineAmtArr.push(CredAmt);
										}
									    
									    
									}
							  }
							  
							}
							  transMap['record_id']=recId;
								transMap['record_type']=type;
							    transMap['record_acc_name']=AccName;
								transMap['record_payee']=Payee;
								transMap['record_trans_num']=TranNum;
								transMap['record_check_num']=CheckNum;
								transMap['record_date']=TranDate;
							    transMap['record_memo']=Memo;
								transMap['record_deptmt']=Department;
								transMap['record_location']=Location;
								transMap['record_credit_ref']=CredLineRefArr;
								transMap['record_credit_amt']=CredLineAmtArr;
								
								transMap['record_apply_intid']=intIdArr;
								transMap['record_apply_due_date']=DueDateArr;
								transMap['record_apply_ref_num']=refNumArr;
								transMap['record_apply_orig_amt']=OrigAmtArr;
								transMap['record_apply_amt_due']=AmtDueArr;
									
								transMap['record_apply_disc_date']=DiscDateArr;
								transMap['record_apply_disc_avail']=DiscAvailArr;
								transMap['record_apply_disc_taken']=DiscTakeArr;
								transMap['record_apply_payment']=PaymentArr;
								transMap['record_trans_total']=totTranAmt;
								s_JSON_Data.push(transMap);
									
						 }
						 else if(type =='CustDep')
						 {

							 var loadRec = nlapiLoadRecord('customerdeposit',recId);
							 
							 if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
								 
							
							 
							 var AccName= loadRec.getFieldValue('account');
							 
							 var Customer =loadRec.getFieldValue('customer');
							 
							 var TranNum = loadRec.getFieldValue('transactionnumber');
							 
							 var CheckNum =loadRec.getFieldValue('tranid');
							 
							 var TranDate =loadRec.getFieldValue('trandate');
							 
							 var Memo =loadRec.getFieldValue('memo');
							 
                              var Department = loadRec.getFieldValue('department');
							 
							 var Location =loadRec.getFieldValue('location');
							 
							 var SalesOrder =loadRec.getFieldValue('salesorder');
							
							 var payMethod =loadRec.getFieldValue('paymentmethod');
							
							 var CheckN =loadRec.getFieldValue('checknum');
							 
							 var Payment =loadRec.getFieldValue('payment');
							 
							  var lineCount = loadRec.getLineItemCount('apply');
							  
							  var lineCount1 = loadRec.getLineItemCount('credit');
							  
							  var DueDateArr =[];
							  var refNumArr =[];
							  var OrigAmtArr =[];
							  var AmtDueArr =[];
							  var DiscDateArr =[];
							  var DiscAvailArr =[];
							  var DiscTakeArr =[];
							  var PaymentArr =[];
							  
							  if(lineCount > 0)
							  {
								  for( var l=1;l<=lineCount;l++)
									{
									    var Apply = loadRec.getLineItemValue('apply','apply',l);
									    
									    if(Apply =='T')
										{
									    	var DueDate = loadRec.getLineItemValue('apply','applydate',l);
										
									    var refNum = loadRec.getLineItemValue('apply','refnum',l);
									    
                                        var origAmt = loadRec.getLineItemValue('apply','total',l);
									    
									    var AmtDue = loadRec.getLineItemValue('apply','due',l);
									    
                                        var DiscDate = loadRec.getLineItemValue('apply','discdate',l);
									    
									    var DiscAvail = loadRec.getLineItemValue('apply','discamt',l);
									    
									    var DiscTaken = loadRec.getLineItemValue('apply','disc',l);
									    
									    var Payment = loadRec.getLineItemValue('apply','amount',l);
									    

									    
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
							
							}
							 transMap['record_id']=recId;
								transMap['record_type']=type;
							    transMap['record_acc_name']=AccName;
								transMap['record_payee']=Customer;
								transMap['record_trans_num']=TranNum;
								transMap['record_check_num']=CheckNum;
								transMap['record_date']=tranDate;
							    transMap['record_memo']=Memo;
								transMap['record_deptmt']=Department;
								transMap['record_location']=Location;
								transMap['record_pay_meethod']=payMethod;
								transMap['record_num_chk']=CheckN;
								transMap['record_sales_order']=SalesOrder;
								transMap['record_payment']=Payment;

								transMap['record_apply_due_date']=DueDateArr;
								transMap['record_apply_ref_num']=refNumArr;
								transMap['record_apply_orig_amt']=OrigAmtArr;
								transMap['record_apply_amt_due']=AmtDueArr;
									
								transMap['record_apply_disc_date']=DiscDateArr;
								transMap['record_apply_disc_avail']=DiscAvailArr;
								transMap['record_apply_disc_taken']=DiscTakeArr;
								transMap['record_apply_payment']=PaymentArr;
								transMap['record_trans_total']=totTranAmt;
								
								s_JSON_Data.push(transMap);
									
						 
						 }
				 
						 else if(type =='Journal')
						 {

							 var AccArr=[];
							 var debitArr =[];
							 var creditArr =[];
							 var nameArr =[];
							 var memoArr =[];
							 var deprtmentArr =[];
							 var locArr =[];
							 
							 var loadRec = nlapiLoadRecord('journalentry',recId);
							 
							 if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
								 var TranDate =loadRec.getFieldValue('trandate');
								  var docNum = loadRec.getFieldValue('tranid');
								  var ReverseTranDate =loadRec.getFieldValue('reversaldate');
								  var ReversedocNum = loadRec.getFieldValue('reversalentry');
								  
								  
								  var lineCount = loadRec.getLineItemCount('line');
								  
								  if(lineCount > 0)
								  {
									  for( var l=1;l<=lineCount;l++)
										{
										   var Acc = loadRec.getLineItemValue('line','account',l);
										   var debitAmt = loadRec.getLineItemValue('line','debit',l);
										   var creditAmt = loadRec.getLineItemValue('line','credit',l);
										   var entity =   loadRec.getLineItemValue('line','entity',l);
										   var Memo =   loadRec.getLineItemValue('line','memo',l);
										   var department =   loadRec.getLineItemValue('line','department',l);
										   var location =   loadRec.getLineItemValue('line','location',l);
										   
										    AccArr.push(Acc);
											debitArr.push(debitAmt);
											creditArr.push(creditAmt);
											nameArr.push(entity);
											memoArr.push(Memo);
											deprtmentArr.push(department);
											locArr.push(location);
										}
								  }
							  }
							   
							    transMap['record_id']=recId;
								transMap['record_type']=type;
								transMap['record_date']=TranDate;
								transMap['record_tranid']=docNum;
								transMap['record_reverse_date']=ReverseTranDate;
								transMap['record_reverse_tranid']=ReversedocNum;
								transMap['record_acc_line']=AccArr;
								transMap['record_debit_line']=debitArr;
								transMap['record_credit_line']=creditArr;
							    transMap['record_name_line']=nameArr;
								transMap['record_memo_line']=memoArr;
								transMap['record_department_line']=deprtmentArr;
								transMap['record_location_line']=locArr;
								transMap['record_trans_total']=totTranAmt;
								s_JSON_Data.push(transMap);
									
						 
						 }
						 else if(type =='CustCred')
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
							  
							  var InvDetailNumArr=[];
						      var InvDetailQtyArr=[];
						    	
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
							  
						       var loadRec = nlapiLoadRecord('creditmemo',recId);
						      
							  
							  
							  if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
								 // nlapiLogExecution("DEBUG","In Create Function","loadRec =="+loadRec);
								  
								  var docNum = loadRec.getFieldValue('tranid');
								  var Vendor = loadRec.getFieldValue('entity');
								  var tranDate = loadRec.getFieldValue('trandate');
								  var createdFrom = loadRec.getFieldText('createdfrom');
								  var department = loadRec.getFieldValue('department');
								  var location = loadRec.getFieldValue('location');
								  var AccountName = loadRec.getFieldValue('account');
								  
								  
									
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
										    
										    var SerialInvNumArr =[];
										    var SerailInvQtyArr =[];
										   
										    var rec= loadRec.viewLineItemSubrecord('item', 'inventorydetail',l);
						            		 
										    if(rec != null && rec != undefined && rec !='')
										    {
										    	 var invcount = rec.getLineItemCount('inventoryassignment');
								            		
												    //nlapiLogExecution('DEBUG', 'aftr submit', "  rec  ==" + rec+' invcount=='+invcount);
												    
								            		 for(var x = 1; x <=invcount ; x++)
								            		 {
								                        var InvNum = rec.getLineItemValue('inventoryassignment','receiptinventorynumber',x);
								            		    
								                        var InvQty = rec.getLineItemValue('inventoryassignment','quantity',x);
								                        
								                        SerialInvNumArr.push(InvNum);
								                        SerailInvQtyArr.push(InvQty);
								            		 }
										    }
										   
										    
						            		 InvDetailNumArr.push(SerialInvNumArr);
											 InvDetailQtyArr.push(SerailInvQtyArr);
										    
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
									transMap['record_line_serial_num']=InvDetailNumArr;
									transMap['record_line_serial_qty']=InvDetailQtyArr;
									
									
									transMap['record_apply_due_date']=DueDateArr;
									transMap['record_apply_ref_num']=refNumArr;
									transMap['record_apply_orig_amt']=OrigAmtArr;
									transMap['record_apply_amt_due']=AmtDueArr;
										
									transMap['record_apply_disc_date']=DiscDateArr;
									transMap['record_apply_disc_avail']=DiscAvailArr;
									transMap['record_apply_disc_taken']=DiscTakeArr;
									transMap['record_apply_payment']=PaymentArr;
									transMap['record_trans_total']=totTranAmt;
									transMap['record_createdfrom']=createdFrom;
							  }		
							
					//==================================================================
							
							s_JSON_Data.push(transMap);
						
						  
						 
						 }  
						 else if(type =='CustPymt'||type =='CustRfnd')
						 {

							 if(type =='CustPymt')
					    	 {
					        	  var loadRec = nlapiLoadRecord('customerpayment',recId);
					    	 }
					        else if(type =='CustRfnd')
					        {
					        	  var loadRec = nlapiLoadRecord('customerrefund',recId);
					        }
							 
							 if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
								 
							
							 
							 var AccName= loadRec.getFieldValue('account');
							 
							 var AR_AccName= loadRec.getFieldValue('aracct');
							 
							 
							 var Payee =loadRec.getFieldValue('customer');
							 
							 var TranNum = loadRec.getFieldValue('transactionnumber');
							 
							 var CheckNum =loadRec.getFieldValue('tranid');
							 
							 var TranDate =loadRec.getFieldValue('trandate');
							 
							 var Memo =loadRec.getFieldValue('memo');
							 
							 var PayMethod =loadRec.getFieldValue('paymentmethod');
							 
							
							 var pnref =loadRec.getFieldValue('pnrefnum');
							 
							 var cardNumber =loadRec.getFieldValue('ccnumber');//ccexpiredate
							 
							 var cardExpiry =loadRec.getFieldValue('ccexpiredate');//ccname
							 
							 var cardName =loadRec.getFieldValue('ccname');//creditcardprocessor
							 
							 var cardProcessor =loadRec.getFieldValue('creditcardprocessor');//creditcardprocessor
							 
                             var Department = loadRec.getFieldValue('department');
							 
							 var Location =loadRec.getFieldValue('location');
							 
							 
							  var lineCount = loadRec.getLineItemCount('apply');
							  
							  var lineCount1 = loadRec.getLineItemCount('credit');
							  
							  var lineCount2 = loadRec.getLineItemCount('deposit');
							  
							  var DueDateArr =[];
							  var refNumArr =[];
							  var OrigAmtArr =[];
							  var AmtDueArr =[];
							  var DiscDateArr =[];
							  var DiscAvailArr =[];
							  var DiscTakeArr =[];
							  var PaymentArr =[];
							  var CredLineRefArr =[];
							  var CredLineAmtArr =[];
							  
							  var DepositLineRefArr =[];
							  var DepositLineAmtArr =[];
							  
							  
							  if(lineCount > 0)
							  {
								  for( var l=1;l<=lineCount;l++)
									{
									    var Apply = loadRec.getLineItemValue('apply','apply',l);
									    
									    if(Apply =='T')
										{
									    	var DueDate = loadRec.getLineItemValue('apply','applydate',l);
										
									    var refNum = loadRec.getLineItemValue('apply','refnum',l);
									    
                                        var origAmt = loadRec.getLineItemValue('apply','total',l);
									    
									    var AmtDue = loadRec.getLineItemValue('apply','due',l);
									    
                                        var DiscDate = loadRec.getLineItemValue('apply','discdate',l);
									    
									    var DiscAvail = loadRec.getLineItemValue('apply','discamt',l);
									    
									    var DiscTaken = loadRec.getLineItemValue('apply','disc',l);
									    
									    var Payment = loadRec.getLineItemValue('apply','amount',l);
									    

									    
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
							  
							  if(lineCount1 > 0)
							  {
								  for( var l1=1;l1<=lineCount1;l1++)
									{
									    var Apply1 = loadRec.getLineItemValue('credit','apply',l1);
									    
									    if(Apply1 =='T')
										{
									    	var Credref = loadRec.getLineItemValue('credit','refnum',l1);
										    
										    var CredAmt = loadRec.getLineItemValue('credit','amount',l1);
										    
										    CredLineRefArr.push(Credref);
											CredLineAmtArr.push(CredAmt);
										}
									    
									    
									}
							  }
							  
							  
							  if(lineCount2 > 0)
							  {
								  for( var l2=1;l2<=lineCount2;l2++)
									{
									    var Apply2 = loadRec.getLineItemValue('deposit','apply',l2);
									    
									    if(Apply2 =='T')
										{
									    	var depref = loadRec.getLineItemValue('deposit','refnum',l2);
										    
										    var depAmt = loadRec.getLineItemValue('deposit','amount',l2);
										    
										    DepositLineRefArr.push(depref);
										    DepositLineAmtArr.push(depAmt);
										}
									    
									    
									}
							  }
							  
							}
							  
       							  transMap['record_id']=recId;
								transMap['record_type']=type;
							    transMap['record_acc_name']=AccName;
							    transMap['record_ar_acc']=AR_AccName;
								transMap['record_payee']=Payee;
								transMap['record_trans_num']=TranNum;
								transMap['record_check_num']=CheckNum;
								transMap['record_date']=TranDate;
							    transMap['record_memo']=Memo;
								transMap['record_deptmt']=Department;
								transMap['record_location']=Location;
								
								transMap['record_deposit_ref']=DepositLineRefArr;
								transMap['record_deposit_amt']=DepositLineAmtArr;
								
								transMap['record_credit_ref']=CredLineRefArr;
								transMap['record_credit_amt']=CredLineAmtArr;
								

								transMap['record_apply_due_date']=DueDateArr;
								transMap['record_apply_ref_num']=refNumArr;
								transMap['record_apply_orig_amt']=OrigAmtArr;
								transMap['record_apply_amt_due']=AmtDueArr;
									
								transMap['record_apply_disc_date']=DiscDateArr;
								transMap['record_apply_disc_avail']=DiscAvailArr;
								transMap['record_apply_disc_taken']=DiscTakeArr;
								transMap['record_apply_payment']=PaymentArr;
								transMap['record_trans_total']=totTranAmt;
								
								 transMap['record_paymethod']=PayMethod;
								 transMap['record_payref']=pnref;
								 transMap['record_cardnum']=cardNumber;
								 transMap['record_cardexp']=cardExpiry;
								 transMap['record_cardname']=cardName;
								 transMap['record_cardprocess']=cardProcessor;
								//PayMethod,pnref,cardNumber,cardExpiry,cardName,cardProcessor
								s_JSON_Data.push(transMap);
									
						 
						 } 
						 else if(type =='Deposit')
						 {

							 var loadRec = nlapiLoadRecord('deposit',recId);
							 
							 if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
							 
							 var AccName= loadRec.getFieldValue('account');
											 
							 var docNum =loadRec.getFieldValue('tranid');
							 
							 var tranDate =loadRec.getFieldValue('trandate');
							 
							 var Memo =loadRec.getFieldValue('memo');
							 
                              var Department = loadRec.getFieldValue('department');
							 
							 var Location =loadRec.getFieldValue('location');
							 
							 
							  var lineCount = loadRec.getLineItemCount('payment');
							  
							  var lineCount1 = loadRec.getLineItemCount('other');
							  
							  var lineCount2 = loadRec.getLineItemCount('cashback');
							  
							
							  
							  var PayDepoNumArr =[];
							  var PayDepoDate =[];
							  
							  if(lineCount > 0)
							  {
								  for( var l=1;l<=lineCount;l++)
									{
									  var paymentDeposit = loadRec.getLineItemValue('payment','deposit',l);
									  
									  if(paymentDeposit =='T')
									  {
										  var paymentDocNum = loadRec.getLineItemValue('payment','docnumber',l);
										  var paymentDocDate = loadRec.getLineItemValue('payment','docdate',l);
										  PayDepoNumArr.push(paymentDocNum);
										  PayDepoDate.push(paymentDocDate);
										  
									  }
									}
							  }
							  
							  var otherNameArr=[];
							  var otherAccArr=[];
							  var otherAmtArr=[];
							  var otherRefNumArr=[];
							  var otherDepArr=[];
							  var otherLocArr=[];
							  
							  if(lineCount1 > 0)
							  {
								  for( var l1=1;l1<=lineCount1;l1++)
									{
									   
									  var name = loadRec.getLineItemValue('other','entity',l1);
									  var number = loadRec.getLineItemValue('other','refnum',l1);
									  var acc = loadRec.getLineItemValue('other','account',l1);
									  var amt = loadRec.getLineItemValue('other','amount',l1);
									  var dept = loadRec.getLineItemValue('other','department',l1);
									  var loc = loadRec.getLineItemValue('other','location',l1);
									  
									   otherNameArr.push(name);
									   otherAccArr.push(acc);
									   otherAmtArr.push(amt);
									   otherRefNumArr.push(number);
									   otherDepArr.push(dept);
									   otherLocArr.push(loc);
									  
									}
							  }
							  
							  var cashBackAmtArr=[];
							  var cashBackAccArr=[];
							  var cashBackDepArr=[];
							  var cashbackLocArr=[];
							  var cashBackMemoArr=[];
							  
							  if(lineCount2 > 0)
							  {
								  for( var l2=1;l2<=lineCount2;l2++)
									{
									   
									    	var cashBackAcc = loadRec.getLineItemValue('cashback','account',l2);
										    
										    var cashBackAmt = loadRec.getLineItemValue('cashback','amount',l2);
										    
                                            var cashBackDept = loadRec.getLineItemValue('cashback','department',l2);
										    
										    var cashBackLoc = loadRec.getLineItemValue('cashback','location',l2);
										    
										    var cashBackmemo = loadRec.getLineItemValue('cashback','memo',l2);
										    
										    cashBackAmtArr.push(cashBackAmt);
										    cashBackAccArr.push(cashBackAcc);
										    cashBackDepArr.push(cashBackDept);
										    cashbackLocArr.push(cashBackLoc);
										    cashBackMemoArr.push(cashBackmemo);
										    
									}
							  }
							  
							}
							    transMap['record_id']=recId;
								transMap['record_type']=type;
							    transMap['record_acc_name']=AccName;
							    transMap['record_doc_num']=docNum;
								transMap['record_date']=tranDate;
							    transMap['record_memo']=Memo;
								transMap['record_deptmt']=Department;
								transMap['record_location']=Location;
								transMap['record_paydepo_num']=PayDepoNumArr;
								transMap['record_paydepo_date']=PayDepoDate;
								  
								transMap['record_other_name']=otherNameArr;
								transMap['record_other_acc']=otherAccArr;
								transMap['record_other_amt']= otherAmtArr;
								transMap['record_other_ref']= otherRefNumArr;
								transMap['record_other_dept']= otherDepArr;
								transMap['record_other_loc']= otherLocArr;
								
							
								transMap['record_cash_acc']=cashBackAccArr;
								transMap['record_cash_amt']= cashBackAmtArr;
								transMap['record_cash_ref']= cashBackMemoArr;
								transMap['record_cash_dept']= cashBackDepArr;
								transMap['record_cash_loc']= cashbackLocArr;
								transMap['record_trans_total']=totTranAmt;
								   
								s_JSON_Data.push(transMap);
									
						 
						 }   
						 else if(type=='DepAppl')
						 {


							 var loadRec = nlapiLoadRecord('depositapplication',recId);
							 
							 if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
								 
							
							 
							 var AccName= loadRec.getFieldValue('aracct');
							 
							 var Customer =loadRec.getFieldValue('customer');
							 
							 var TranNum = loadRec.getFieldValue('transactionnumber');
							 
							 var docNum =loadRec.getFieldValue('tranid');
							 
							 var TranDate =loadRec.getFieldValue('trandate');
							 
							 var Memo =loadRec.getFieldValue('memo');
							 
                              var Department = loadRec.getFieldValue('department');
							 
							 var Location =loadRec.getFieldValue('location');
							 
							 var AppliOf =loadRec.getFieldText('deposit');
								 
							 
							  var lineCount = loadRec.getLineItemCount('apply');
							  
							 var DueDateArr =[];
							  var refNumArr =[];
							  var OrigAmtArr =[];
							  var AmtDueArr =[];
							  var DiscDateArr =[];
							  var DiscAvailArr =[];
							  var DiscTakeArr =[];
							  var PaymentArr =[];
							  
							  if(lineCount > 0)
							  {
								  for( var l=1;l<=lineCount;l++)
									{
									    var Apply = loadRec.getLineItemValue('apply','apply',l);
									    
									    if(Apply =='T')
										{
									    	var DueDate = loadRec.getLineItemValue('apply','applydate',l);
										
									    var refNum = loadRec.getLineItemValue('apply','refnum',l);
									    
                                        var origAmt = loadRec.getLineItemValue('apply','total',l);
									    
									    var AmtDue = loadRec.getLineItemValue('apply','due',l);
									    
                                        var DiscDate = loadRec.getLineItemValue('apply','discdate',l);
									    
									    var DiscAvail = loadRec.getLineItemValue('apply','discamt',l);
									    
									    var DiscTaken = loadRec.getLineItemValue('apply','disc',l);
									    
									    var Payment = loadRec.getLineItemValue('apply','amount',l);
									    

									    
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
							
							}
							    transMap['record_id']=recId;
								transMap['record_type']=type;
							    transMap['record_acc_name']=AccName;
								transMap['record_payee']=Customer;
								transMap['record_trans_num']=TranNum;
								transMap['record_check_num']=docNum;
								transMap['record_date']=TranDate;
							    transMap['record_memo']=Memo;
								transMap['record_deptmt']=Department;
								transMap['record_location']=Location;
								transMap['record_appli_of']=AppliOf;
								

								transMap['record_apply_due_date']=DueDateArr;
								transMap['record_apply_ref_num']=refNumArr;
								transMap['record_apply_orig_amt']=OrigAmtArr;
								transMap['record_apply_amt_due']=AmtDueArr;
									
								transMap['record_apply_disc_date']=DiscDateArr;
								transMap['record_apply_disc_avail']=DiscAvailArr;
								transMap['record_apply_disc_taken']=DiscTakeArr;
								transMap['record_apply_payment']=PaymentArr;
								transMap['record_trans_total']=totTranAmt;
								
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
							  var InvDetailNumArr=[];
							  var InvDetailQtyArr=[]
							  
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
								  var createdFrom = loadRec.getFieldText('createdfrom');
								  var Memo = loadRec.getFieldValue('memo');
								  
								  var shipStatus =loadRec.getFieldValue('shipstatus');
									
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
										    
										    var SerialInvNumArr =[];
										    var SerailInvQtyArr =[];
										   
										    var rec= loadRec.viewLineItemSubrecord('item', 'inventorydetail',l);
						            		 
										    if(rec != null && rec != undefined && rec !='')
										    {
										    	 var invcount = rec.getLineItemCount('inventoryassignment');
								            		
												    //nlapiLogExecution('DEBUG', 'aftr submit', "  rec  ==" + rec+' invcount=='+invcount);
												    
								            		 for(var x = 1; x <=invcount ; x++)
								            		 {
								                        var InvNum = rec.getLineItemValue('inventoryassignment','receiptinventorynumber',x);
								            		    
								                        var InvQty = rec.getLineItemValue('inventoryassignment','quantity',x);
								                        
								                        SerialInvNumArr.push(InvNum);
								                        SerailInvQtyArr.push(InvQty);
								            		 }
										    }
										   
										    
						            		 InvDetailNumArr.push(SerialInvNumArr);
											 InvDetailQtyArr.push(SerailInvQtyArr);
										    
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
									transMap['record_createdfrom']=createdFrom;
									transMap['record_date']=tranDate;
									transMap['record_doc_num']=docNum;
									transMap['record_vendor']=Vendor;
									transMap['record_department']=department;
									transMap['record_loc']=location;
									transMap['record_top_name']=AccountName;
									transMap['record_shipstatus']=shipStatus;
									transMap['record_itmarr']=itemArr;
									transMap['record_qtyarr']=qtyArr;
									transMap['record_line_serial_num']=InvDetailNumArr;
									transMap['record_line_serial_qty']=InvDetailQtyArr;
									
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
									
									transMap['record_trans_total']=totTranAmt;
									
							  }		
							
					//==================================================================
							
							s_JSON_Data.push(transMap);
						
						  
						 
							 
						 }
						}
						catch(e)
						{
							nlapiLogExecution('DEBUG','resultSet length','Error =='+e+'RecId=='+recId);	
							
						}
						
						var remainingUsage = nlapiGetContext().getRemainingUsage();
						if (remainingUsage < 50) {
							nlapiYieldScript();
						}
                
					}
				nlapiLogExecution('DEBUG','resultSet length','s_JSON_Data =='+JSON.stringify(s_JSON_Data));	
			}
			
	
	var s_JSON_String = JSON.stringify(s_JSON_Data);
	
	var i_JSON_file = createFile(s_JSON_String);
	nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' JSON File ID -->'+i_JSON_file)


}

function getSavedSearchResult(recType, searchId, filters)
{
    var aSearchResults = [];
    var iRscnt = 1000, min = 0, max = 1000;
    var search = {};
    if (searchId) 
    {
        var search = nlapiLoadSearch(recType, searchId);
        if (filters) 
        {
            search.addFilters(filters);
        }
    }
    

    var rs = search.runSearch();
    try 
    {
        while (iRscnt == 1000) 
        {
            var resultSet = rs.getResults(min, max);
            aSearchResults = aSearchResults.concat(resultSet);
            min = max;
            max += 1000;
            iRscnt = resultSet.length;
        }
    }
    catch (e) 
    {
        nlapiLogExecution('DEBUG', 'getAllResults --> exception', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    }

 //   nlapiLogExecution('DEBUG', 'getAllResults --> Success', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    return aSearchResults;
}

function findTransaction(searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	// filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',recordID);
	savedSearch.addFilters(filters);
	   
	    var resultset = savedSearch.runSearch();
		var returnSearchResults = [];
	    var searchid = 0;
	    do {
    	
	        var resultslice = resultset.getResults(searchid, searchid + 1000);
	        if(resultslice!= null)
	        {
	    	   for ( var rs in resultslice) 
		        {
		        	returnSearchResults.push(resultslice[rs]);
		            searchid++;
		        }
	    	   nlapiLogExecution('DEBUG','searchid','searchid'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;

} 


function _logValidation(value)
{
  if(value!=null && value!= 'undefined' && value!=undefined && value!='' && value!='NaN' && value!=' ')
  {
	  return true;
  }	 
  else	  
  {
	  return false;
  }
}
/**
 * 
 * @param datain
 * @returns
 * 
 * Description : The script is designed to create a file with the JSON string
 */
function createFile(datain)
{	
  var s_folder_path = 'Wireless Data Mapping';
  var d_date = new Date();
  var s_timestamp = d_date.getTime();    
  
  var s_file_name = 'Wireless Netsuite'+'_'+'1-10Jan2019'+ ".json";	//s_timestamp-
  
    var o_fileOBJ = nlapiCreateFile(s_file_name,'PLAINTEXT',datain);
      // var i_folder_id = get_folderID(s_folder_path);
    o_fileOBJ.setFolder(278415);   
	var i_fileID = nlapiSubmitFile(o_fileOBJ);
	
	nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' ***** File Submit ID ***** -->'+i_fileID)
	
	return i_fileID;
}//Create File
/**
 * 
 * @param s_folder_path
 * @returns
 * 
 * Description : The script is designed to create a 
 */
function get_folderID(s_folder_path)
{
	var i_folder_id = '';
	
	var a_filters = new Array();	
	a_filters.push(new nlobjSearchFilter('name', null, 'is',s_folder_path));

	var a_columns = new Array();
	a_columns.push( new nlobjSearchColumn('internalid'));    

	var a_search_results = nlapiSearchRecord('folder', null, a_filters, a_columns);
	
	if(_logValidation(a_search_results)) 
	{
		i_folder_id = a_search_results[0].getId();		
	}
	else
	{
		var o_folder_OBJ = nlapiCreateRecord('folder')
		o_folder_OBJ.setFieldValue('name',s_folder_path)
		i_folder_id = nlapiSubmitRecord(o_folder_OBJ)		
	}
	return i_folder_id;	
}
/**
 * 
 * @param i_fileID
 * @returns
 */
function create_SXP_NS_billable_data_JSON(i_fileID)
{
  var s_result = false;	
	
  try
  {
	var o_SXP_NS_BD_OBJ = nlapiCreateRecord('customrecord_sxp_to_ns_billable_json',{recordmode: 'dynamic'});	
	
	o_SXP_NS_BD_OBJ.setFieldValue('custrecord_stnbdjm_json_data',i_fileID);
	
	var i_SXP_NS_BD_submitID = nlapiSubmitRecord(o_SXP_NS_BD_OBJ,true,true);
	nlapiLogExecution('DEBUG','create_SXP_NS_billable_data',' ********** SXP to Netsuite Billable Data Submit ID ********** -->'+i_SXP_NS_BD_submitID)		  
   
	if(_logValidation(i_SXP_NS_BD_submitID)) 
	{
		s_result = true;
	}  
  }
  catch(exc)
  {
	  nlapiLogExecution('DEBUG','ERROR',' Exception Caught While Creating SXP to NS JSON Mapping -->'+exc)  
  }
  return s_result;
}//Create Record
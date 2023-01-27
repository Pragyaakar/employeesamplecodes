	function issue_IF_ReRunScript(type)
	{
		var myCSV_data = nlapiRequestURL('https://3572894.app.netsuite.com/core/media/media.nl?id=496990&c=3572894&h=975dae2d539b9f817dfb&_xt=.json',null,null);
		var datain = JSON.parse(myCSV_data.getBody()); // returns your csv data in a string format
		
		// nlapiLogExecution('DEBUG','postFunction',' *****string_data***** -->'+datain)
		 nlapiLogExecution('DEBUG','postFunction',' *****datain.length***** -->'+datain.length)	
		 
		 // NOTE - Deposit application code is remaining
		
		 try
		 {
			 var context = nlapiGetContext();
			 var PinCounter = '';
			 PinCounter = context.getSetting('SCRIPT', 'custscript_pincounter_if');
				
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
				
				 var filters=new Array();
				 var columns = new Array();
					
					 filters[0] = new nlobjSearchFilter('custbody_old_transaction_int_id', null,'is',OldID.trim());
					
					 columns[0] = new nlobjSearchColumn('internalid');
					 columns[1] = new nlobjSearchColumn('custbody_old_transaction_int_id');
						
				var searchResultItem = nlapiSearchRecord('transaction', 'customsearch_old_instance_check', filters, columns);
						
				if(searchResultItem != null && searchResultItem != undefined && searchResultItem !='')
				{
					var custRec = nlapiCreateRecord('customrecord_check_new_custom',{recordmode: 'dynamic'});
					
					custRec.setFieldValue('custrecord_rec_type1',type);
					custRec.setFieldValue('custrecordrec_id1',OldID);
					custRec.setFieldValue('custrecord_desc','Record Already Present');
					custRec.setFieldValue('custrecord_doc_date',new Date(DateCreated));
					custRec.setFieldValue('custrecord_doc_num1',TRanDoc);
					custRec.setFieldValue('custrecord_amt_transcn',totTranAmt);
					var record =  nlapiSubmitRecord(custRec,true);
				    nlapiLogExecution('Debug', 'record IS Created..', "Issue record id =" + record)
					continue;
				}
				
		
				if(type=='ItemShip')
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
					var LineArr	= checkData['record_line_arr'];
						
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
								   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom,shipStatus,DateCreated,LineArr);
						
					      
				
				
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
				
				custRec.setFieldValue('custrecord_rec_type',type);
				custRec.setFieldValue('custrecord_rec_id',recId);
				
				if(e !=null && e.toString().length >300)
				{
					custRec.setFieldValue('custrecord_issue_descr','Error: Serial Number Issue');
				}
				else
				{
					custRec.setFieldValue('custrecord_issue_descr',e);
				}
				
				custRec.setFieldValue('custrecord_trans_date',tranDate);
				custRec.setFieldValue('custrecord_doc_num',docNum);
				custRec.setFieldValue('custrecord_amt_trans',totTranAmt);
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
	
	

	
	function createIFfunction(AccountName,recId,type,tranDate,docNum,Vendor,department,location,itemArr,qtyArr,
			   lineDeptArr,lineClassArr,lineLocArr,lineCustArr,unitsArr,descripArr,vendNameArr,
			   rateArr,amtArr,AccArr,ExpAmtArr,ExplineDeptArr,ExplineClassArr,ExplineLocArr,ExplineCustArr,InvDetailNumArr,InvDetailQtyArr,createdFrom,shipStatus,DateCreated,LineArr)
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
				else if(type.trim()=='Transfer Order')
				{
					 var record = nlapiTransformRecord('transferorder', valueCust, 'itemfulfillment');
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
				   
				record.setFieldValue('custbody_old_transaction_int_id',recId);
				
				if(DateCreated != null && DateCreated != undefined && DateCreated != '')
				{
					record.setFieldValue('custbody_custom_date_created',new Date(DateCreated));
				}
				
				record.setFieldValue('email','');
				record.setFieldValue('tobeprinted','F');
				record.setFieldValue('tobeemailed','F');
				record.setFieldValue('tobefaxed','F');
			      
				var linecount =record.getLineItemCount('item');
			    
				//==================================================================================
				var CheckItemArr=[];
				 var CheckRateArr =[];
				 
				 if(itemArr != null && itemArr != undefined && itemArr !='')
				   {
					   for( var l=0;l<itemArr.length;l++)
						{
						   if(itemArr[l] != null && itemArr[l] != undefined && itemArr[l] != '')
							{
							   var itemSet  = FindItemSearch(itemArr[l]);
							  // var rateIs =0.00;
							   var rateIs =rateArr[l];
							 
							   CheckItemArr.push(itemSet);
							   CheckRateArr.push(rateIs);
						   }
						}
			          
				   }
				 
			    
			    	 var count = record.getLineItemCount('item');
			    	 
			    	 for(var ch2=1;ch2<=count;ch2++)
			    	 {
			    		 var CheckBox = record.getLineItemValue('item','itemreceive',ch2);
			    		 
			    		 record.setLineItemValue('item','itemreceive',ch2,'F')
			    			
			    	 }
			    	 
			    	 var removArr=[];
			    	 
			    	 for (var m=0;m<CheckItemArr.length;m++)
			    	 {
			    		 
			    		 loop2 : for(var ch=1;ch<=count;ch++)
				    	 {
				    		 var ItemLine = record.getLineItemValue('item','item',ch);
				    		 
				    		 var setValue = record.getLineItemValue('item','custcol_set_value',ch);
				    		 var qtty = record.getLineItemValue('item','quantity',ch);
				    		 var ratel = record.getLineItemValue('item','quantityremaining',ch);
				    		  
				    		 //record.setLineItemValue('item','itemreceive',ch,'F');
				    		 
				    		 var CheckBox1 = record.getLineItemValue('item','itemreceive',ch);
				    		 
				    		 var lineNum = record.getLineItemValue('item','line',ch);
				           // nlapiLogExecution('DEBUG', 'After Submit item', "  lineNum==" + lineNum); 
				    		 
				    		 if(CheckItemArr.indexOf(ItemLine) != -1)
				    		  {
				    			//  nlapiLogExecution("DEBUG","Before Condition True","qtty="+qtty+' -qtyArr[m]='+qtyArr[m] +' lineNum='+lineNum+' LineArr[m] ='+LineArr[m] );
				    			//  nlapiLogExecution("DEBUG","Before Condition True","ratel="+ratel+' -Middle Condition='+(parseFloat(ratel) >= parseFloat(qtyArr[m]))+'='+(qtty == qtyArr[m]));
					    		  
				    			 if((ItemLine == CheckItemArr[m])&&(parseFloat(qtty) == parseFloat(qtyArr[m]))&& setValue != 'T')//parseFloat(ratel) >= parseFloat(qtyArr[m]) || && lineNum == LineArr[m] 
						    	 {
						    			// nlapiLogExecution("DEBUG","Condition True","ItemLine="+ItemLine+' -CheckItemArr[m]='+CheckItemArr[m]);
						    		//   nlapiLogExecution("DEBUG","Condition True loop-1","qtty="+qtty+' -qtyArr[m]='+qtyArr[m]);
						    		//   nlapiLogExecution("DEBUG","Condition True loop-1","serialLnth="+InvDetailNumArr[m].split("").length+' InvDetailNumArr[m]='+InvDetailNumArr[m]);
													
						    			 record.setLineItemValue('item','quantity',ch,qtyArr[m]);
						    			 record.setLineItemValue('item','itemreceive',ch,'T');
						    			 record.setLineItemValue('item','custcol_set_value',ch,'T');
						    			 record.setLineItemValue('item','serialnumbers',ch,InvDetailNumArr[m]);
						    			 
						    			 removArr.push(m);
						    			 
						    			 break loop2;
						    	 }
				    			 
				    		  
				    		  }
   				    		  else if(CheckItemArr.indexOf(ItemLine) == -1)
				    		 {
				    			  record.setLineItemValue('item','itemreceive',ch,'F');
				    		 }
	  			    	 }
			    	 }
			    	 
			   // 	 nlapiLogExecution('DEBUG', 'Initial --', "  CheckItemArr==" +JSON.stringify(CheckItemArr)); 
			    /*	 
			    	 if(removArr !=null && removArr != undefined)
			    	 {
			    		 for(var k=0;k<removArr.length;k++)
			    		 {
			    			 for(var p=0;p<CheckItemArr.length;p++)
			    			 {
			    				 if(p == removArr[k])
			    				 {
			    					 CheckItemArr.splice(p , 1);
			    					 qtyArr.splice(p , 1);
			    					 InvDetailNumArr.splice(p , 1);
			    				 }
			    			 }
			    		 }
			    	 }
			    	 */
			    	// nlapiLogExecution('DEBUG', 'After remove--', "  removArr==" + JSON.stringify(removArr)); 
		    		 
				//===============================================================
			    	 for (var m1=0;m1<CheckItemArr.length;m1++)
			    	 {
			    		 if(removArr !=null && removArr != undefined)
			    		 {
			    			 if(removArr.indexOf(m1) != -1)
				    		 {
				    			 continue;
				    		 }
			    		 }
			    		
			    		 loop3 : for(var ch1=1;ch1<=count;ch1++)
				    	 {
				    		 var ItemLine1 = record.getLineItemValue('item','item',ch1);
				    		 
				    		 var setValue1 = record.getLineItemValue('item','custcol_set_value',ch1);
				    		 var qtty1 = record.getLineItemValue('item','quantity',ch1);
				    		 var ratel1 = record.getLineItemValue('item','quantityremaining',ch1);
				    		  
				    		 //record.setLineItemValue('item','itemreceive',ch,'F');
				    		 
				    		 //var CheckBox1 = record.getLineItemValue('item','itemreceive',ch1);
				    		 
				    		 var lineNum1 = record.getLineItemValue('item','line',ch1);
				           // nlapiLogExecution('DEBUG', 'After Submit item', "  lineNum==" + lineNum); 
				    		 
				    		 if(CheckItemArr.indexOf(ItemLine1) != -1)
				    		  {
				    			//  nlapiLogExecution("DEBUG","Before Condition True","qtty="+qtty+' -qtyArr[m]='+qtyArr[m] +' lineNum='+lineNum+' LineArr[m] ='+LineArr[m] );
				    			//  nlapiLogExecution("DEBUG","Before Condition True","ratel="+ratel+' -Middle Condition='+(parseFloat(ratel) >= parseFloat(qtyArr[m]))+'='+(qtty == qtyArr[m]));
					    		  
				    			 if((ItemLine1 == CheckItemArr[m1])&&(parseFloat(qtty1) >= parseFloat(qtyArr[m1])) && setValue1 != 'T')//parseFloat(ratel) >= parseFloat(qtyArr[m]) || && lineNum == LineArr[m] 
						    	 {
						    			// nlapiLogExecution("DEBUG","Condition True","ItemLine="+ItemLine+' -CheckItemArr[m]='+CheckItemArr[m]);
						    		 // nlapiLogExecution("DEBUG","Condition True loop-2","qtty="+qtty1+' -qtyArr[m]='+qtyArr[m1]);
						    		//   nlapiLogExecution("DEBUG","Condition True loop-2","serialLnth="+InvDetailNumArr[m1].split("").length+' InvDetailNumArr[m]='+InvDetailNumArr[m1]);
													
						    			 record.setLineItemValue('item','quantity',ch1,qtyArr[m1]);
						    			 record.setLineItemValue('item','itemreceive',ch1,'T');
						    			 record.setLineItemValue('item','custcol_set_value',ch1,'T');
						    			 record.setLineItemValue('item','serialnumbers',ch1,InvDetailNumArr[m1]); 
						    			 break loop3;
						    	 }
				    			 
				    		  
				    		  }
   				    		  else if(CheckItemArr.indexOf(ItemLine1) == -1)
				    		 {
				    			  record.setLineItemValue('item','itemreceive',ch1,'F');
				    		 }
	  			    	 }
			    	 } 
			     
			//============================================================================    	 
			    	 
				//====================================================================
			    	 var checker=0;
					 for(var nw=1;nw<=count;nw++)
			    	 {
			    		 var Checknw = record.getLineItemValue('item','itemreceive',nw);
			    		 
			    		if(Checknw == 'T')
			    		{
			    			checker++;
			    		}
			    			
			    	 }
					 
					 if(checker == 0)
					 {
						 for (var m=0;m<CheckItemArr.length;m++)
				    	 {
				    		 
				    		  for(var ch=1;ch<=count;ch++)
					    	 {
					    		 var ItemLine = record.getLineItemValue('item','item',ch);
					    		 
					    		 var setValue = record.getLineItemValue('item','custcol_set_value',ch);
					    		 var qtty = record.getLineItemValue('item','quantity',ch);
					    		 var ratel = record.getLineItemValue('item','quantityremaining',ch);
					    		  
					    		 //record.setLineItemValue('item','itemreceive',ch,'F');
					    		 
					    		 var CheckBox1 = record.getLineItemValue('item','itemreceive',ch);
					    		 
					    		 var lineNum = record.getLineItemValue('item','line',ch);
					           // nlapiLogExecution('DEBUG', 'After Submit item', "  lineNum==" + lineNum); 
					    		 
					    		 if(CheckItemArr.indexOf(ItemLine) != -1)
					    		  {
					    			//  nlapiLogExecution("DEBUG","Before Condition True","qtty="+qtty+' -qtyArr[m]='+qtyArr[m] +' lineNum='+lineNum+' LineArr[m] ='+LineArr[m] );
					    			//  nlapiLogExecution("DEBUG","Before Condition True","ratel="+ratel+' -Middle Condition='+(parseFloat(ratel) >= parseFloat(qtyArr[m]))+'='+(qtty == qtyArr[m]));
						    		  
					    			 if((ItemLine == CheckItemArr[m]) && setValue != 'T')//parseFloat(ratel) >= parseFloat(qtyArr[m]) || && lineNum == LineArr[m] 
							    	 {
							    			
					    				// var detLen = InvDetailNumArr[m].split("").length;
					    				 
					    				 var nstr = InvDetailNumArr[m].split("");
					    				  var res = InvDetailNumArr[m].splice(0,qtty);
					    				 
							    			 record.setLineItemValue('item','quantity',ch,qtty);
							    			 record.setLineItemValue('item','itemreceive',ch,'T');
							    			 record.setLineItemValue('item','custcol_set_value',ch,'T');
							    			 record.setLineItemValue('item','serialnumbers',ch,res);
							    			 
							    			// break loop2;
							    	 }
					    			 
					    		  
					    		  }
					    	 }
				    	 }
					 }
		
				 if(docNum != null && docNum != undefined && docNum != '')
					{
						record.setFieldValue('tranid',docNum);
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
		 params['custscript_pincounter_if']=i;
		 
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
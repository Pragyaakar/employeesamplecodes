/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       10 Jun 2019     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function scheduledPO_StatusSet(type) 
{
	
	 var count = request.getLineItemCount('custpage_sig_req_sublist');
	 
	 var vendorName=request.getParameter('custpage_vendorname');
	 
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

	         var columns1 = new Array();
		//	 columns[0] = new nlobjSearchColumn('internalid');
			 columns1[0] = new nlobjSearchColumn("internalid"); 
			 columns1[1] =  new nlobjSearchColumn("pluralname");
			 var filters1 = new Array();
		
	  
	  var lineNum =0;
	  for(var i=1; i< count+1; i++)
	  {
	   
	   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
	 
	  
	   if(checkMark == 'T')
	   {
	   
		   lineNum = lineNum + parseInt(1);
	    var internalId = request.getLineItemValue('custpage_sig_req_sublist', 'internalid', i);
	   
	    var recordType = request.getLineItemValue('custpage_sig_req_sublist', 'recordtype', i);
       
	    nlapiLogExecution('DEBUG', 'OrderRequisition', 'Number :'+i);
			
			 var item =request.getLineItemValue('custpage_sig_req_sublist','custpage_item', i);
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+item);
			 itemArr.push(item);
			 
			 var quantity = request.getLineItemValue('custpage_sig_req_sublist','custpage_quantity', i);
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+quantity);
			 quanArr.push(quantity);
			 
		    	var subsidiary = request.getLineItemValue('custpage_sig_req_sublist','custpage_subsidiary', i);
		    	// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+subsidiary);
		    	 subsiArr.push(subsidiary);
			
		    	 var descrip = request.getLineItemValue('custpage_sig_req_sublist','custpage_descrip', i);
		    	// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+subsidiary);
		    	 descripArr.push(descrip);
		    	 
		    	 var lastPurchase = request.getLineItemValue('custpage_sig_req_sublist','custpage_rate', i);
		    	// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+subsidiary);
		    	 lastPurchaseArr.push(lastPurchase);
				
			   var type = request.getLineItemValue('custpage_sig_req_sublist','custpage_type', i);
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'type :'+type);
				 typeArr.push(type);
		
				 var class1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_class', i);
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'class :'+class1);
				 classArr.push(class1);
				 
				 var department = request.getLineItemValue('custpage_sig_req_sublist','custpage_department', i);
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'department :'+department);
				 departArr.push(department);
				 
				 var location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location', i);
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'location :'+location);
				 LocArr.push(location);
				 
				 var amount = request.getLineItemValue('custpage_sig_req_sublist','custpage_order_amount', i);
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'amount :'+amount);
				 amtArr.push(amount);
				 
				 var hsncode = request.getLineItemValue('custpage_sig_req_sublist','custpage_order_hsn_code', i);
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'hsncode :'+hsncode);
				 hsncodeArr.push(hsncode);
				
				 
				 var unit = request.getLineItemValue('custpage_sig_req_sublist','custpage_unit', i);
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'unit :'+unit);
				 
				
				 var results1 = GetSearchResults1(filters1,columns1); 
					for (var j = 1; j <= results1.length; j++) 
					{ 
						var id = results1[j-1].getValue('internalid');
						
						var name = results1[j-1].getValue('pluralname');
						
						 // nlapiLogExecution('DEBUG', 'OrderRequisition', 'Unit ID :'+id);
						 if( name == unit )
						 {
							// nlapiLogExecution('DEBUG', 'OrderRequisition', 'Unit name :'+name+' : unit'+unit);
							// nlapiLogExecution('DEBUG', 'OrderRequisition', 'Unit ID :'+id);
							 unitArr.push(id);
						 }
					
						 
					}	
				
				 
				 var tranid = request.getLineItemValue('custpage_sig_req_sublist','custpage_reqinternal', i);
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi_num :'+tranid);
				 tranidArr.push(tranid);
               
				 var lineNum1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_linenumber', i);
				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'lineNum1 :'+lineNum1);
				 lineNumArr.push(lineNum1);

				 var TypeOFPR = request.getLineItemValue('custpage_sig_req_sublist','custpage_cust_pr_type', i);
				 
				

    	   }
	 
	   
	  }
	  createPurchaseOrderForPR(lineNum,lineNumArr,vendorName,amtArr,subsiArr,lastPurchaseArr,descripArr,classArr,departArr,LocArr,itemArr,quanArr,unitArr,tranidArr,hsncodeArr,TypeOFPR);
	  response.writePage( form );
	
 
}// END Function
	
	function createPurchaseOrderForPR(lineNum,lineNumArr,vendorName,amtArr,subsiArr,lastPurchaseArr,descripArr,classArr,departArr,LocArr,itemArr,quanArr,unitArr,tranidArr,hsncodeArr,TypeOFPR)	
	{	

	/*	if(TypeOFPR =='2')
		{
			record.setFieldValue('customform',101);
		}
		*/
		
		var record = nlapiCreateRecord('purchaseorder'); //, {recordmode: 'dynamic'}); 
		
		 nlapiLogExecution("DEBUG","In Create Function","TypeOFPR =="+TypeOFPR);
		
		if(TypeOFPR =='1')
		{
			record.setFieldValue('customform',174);
		
		 nlapiLogExecution('DEBUG', 'OrderRequisition', 'vendor :'+vendorName);
		 nlapiLogExecution('DEBUG', 'OrderRequisition', 'lineNum :'+lineNum);
			
		 
		   if(vendorName != '' && vendorName != 'undefined' && vendorName != null)
			{
				// To Set vendor Name
			   nlapiLogExecution("DEBUG","In Create Function","**To Set Vendor Name**");
				record.setFieldValue('entity',vendorName);//vendor
			}

	  /*		if(date != '' && date != 'undefined' && date != null)
			{
				record.setFieldValue('trandate',date);
			}

		*/   
	     for(var v = 0 ; v < 1 ; v++)
		{
		
	    	 if(classArr != '' && classArr != 'undefined' && classArr != null)
			{
				// To Set vendor Name
			   nlapiLogExecution("DEBUG","In Create Function","**To Set Class Name**"+classArr);
				record.setFieldValue('class',classArr[v]);//vendor
			}

			
			if(departArr != '' && departArr != 'undefined' && departArr != null)
			{
	          nlapiLogExecution("DEBUG","In Create Function","**To Set Department Name**"+departArr);
				record.setFieldValue('department',departArr[v]);
			}


		
			if(subsiArr != '' && subsiArr != 'undefined' && subsiArr != null)
			{
				// To Set Subsidiary
			 	nlapiLogExecution("DEBUG","In Create Function","**To Set Subsidiary Name**"+subsiArr);
				record.setFieldValue('subsidiary',subsiArr[v]);
			}
		
			if(LocArr != '' && LocArr != 'undefined' && LocArr != null)
			{
				// To Set Subsidiary
				record.setFieldValue('location',LocArr[v]);
			}
		         
		}
		var price =-1;
		var rate =50;
		

		for(var l=1;l<=lineNum;l++)
		{
					nlapiLogExecution("DEBUG","In Create Function","item in for loop=="+itemArr[l-1]);
					nlapiLogExecution("DEBUG","In Create Function","qty in for loop=="+quanArr[l-1]);
					nlapiLogExecution("DEBUG","In Create Function","amount in for loop=="+amtArr[l-1]);
				      
						var rate = lastPurchaseArr[l-1];
				      record.selectNewLineItem('item');
			
				      record.setCurrentLineItemValue('item','item',itemArr[l-1]);   
				      nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArr[l-1]);    
			    
				      
				      record.setCurrentLineItemValue('item', 'quantity', quanArr[l-1]);                              
				      nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+quanArr[l-1]);
	      
	                  record.setCurrentLineItemValue('item', 'custcol_pr_quantity', parseInt(quanArr[l-1]));                              
				      nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+quanArr[l-1]);
	      
	                  record.setCurrentLineItemValue('item','location',LocArr[l-1]);
				      
				      record.setCurrentLineItemValue('item','rate',parseFloat(rate));
				      nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
				      
				      if(rate!=null)
				      {
	                     record.setCurrentLineItemValue('item', 'custcol_unit_rate',parseFloat(rate)); 
				      }
				      else
				    	  {
				    	  rate ='0';
				    	  record.setCurrentLineItemValue('item', 'custcol_unit_rate',parseFloat(rate)); 
				    	  }
					  var amt = parseFloat(rate) *  parseFloat(quanArr[l-1]);
					  
					  record.setCurrentLineItemValue('item', 'custcol_amt_receipt',amt); 
	      
	                 // record.setCurrentLineItemValue('item', 'amount',amt); 
					  
					  record.setCurrentLineItemValue('item', 'custcol_last_purchase_price',lastPurchaseArr[l-1]); 
	      
				      record.setCurrentLineItemValue('item','amount',parseFloat(amt));
				      nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
				      
				      record.setCurrentLineItemValue('item','description',descripArr[l-1]);
				      nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
				     
				    //  record.setCurrentLineItemValue('item', 'description',descriptionArray[i-1]); 
				    //  nlapiLogExecution("DEBUG","In Create Function","description done==");
				      
				      record.setCurrentLineItemValue('item', 'location', LocArr[l-1]);
				      nlapiLogExecution("DEBUG","In Create Function","location done=="+LocArr[l-1]);
				      
				      record.setCurrentLineItemValue('item', 'department',departArr[l-1]); 
				      nlapiLogExecution("DEBUG","In Create Function","department done=="+departArr[l-1]);
				      
				      record.setCurrentLineItemValue('item', 'class', classArr[l-1]);
				      nlapiLogExecution("DEBUG","In Create Function","class done=="+classArr[l-1]);
				      
				      record.setCurrentLineItemValue('item', 'units', unitArr[l-1]);                                          
				      nlapiLogExecution("DEBUG","In Create Function","units done=="+unitArr[l-1]);
				      
				      record.setCurrentLineItemValue('item', 'custcol_requi_id', tranidArr[l-1]);                                          
				      nlapiLogExecution("DEBUG","In Create Function","tranidArr done=="+tranidArr[l-1]);   //hsncodeArr
				      
				      record.setCurrentLineItemValue('item', 'custcol_in_hsn_code', hsncodeArr[l-1]);                                          
				      nlapiLogExecution("DEBUG","In Create Function","hsncodeArr done=="+hsncodeArr[l-1]); 
				      
				      record.setCurrentLineItemValue('item', 'custcol_item_line_num', lineNumArr[l-1]);        
				      
				      record.commitLineItem('item');
				      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
				     
				}
		  
				var SubmitIt=nlapiSubmitRecord(record,true);  
				
		}
		
		if(TypeOFPR =='2')
		{
			record.setFieldValue('customform',101);
		
		
		
		
		
		 nlapiLogExecution('DEBUG', 'OrderRequisition', 'vendor :'+vendorName);
		 nlapiLogExecution('DEBUG', 'OrderRequisition', 'lineNum :'+lineNum);
			
		 
		   if(vendorName != '' && vendorName != 'undefined' && vendorName != null)
			{
				// To Set vendor Name
			   nlapiLogExecution("DEBUG","In Create Function","**To Set Vendor Name**");
				record.setFieldValue('entity',vendorName);//vendor
			}

	  /*		if(date != '' && date != 'undefined' && date != null)
			{
				record.setFieldValue('trandate',date);
			}

		*/   
	     for(var v = 0 ; v < 1 ; v++)
		{
		
	    	 if(classArr != '' && classArr != 'undefined' && classArr != null)
			{
				// To Set vendor Name
			   nlapiLogExecution("DEBUG","In Create Function","**To Set Class Name**"+classArr);
				record.setFieldValue('class',classArr[v]);//vendor
			}

			
			if(departArr != '' && departArr != 'undefined' && departArr != null)
			{
	          nlapiLogExecution("DEBUG","In Create Function","**To Set Department Name**"+departArr);
				record.setFieldValue('department',departArr[v]);
			}


		
			if(subsiArr != '' && subsiArr != 'undefined' && subsiArr != null)
			{
				// To Set Subsidiary
			 	nlapiLogExecution("DEBUG","In Create Function","**To Set Subsidiary Name**"+subsiArr);
				record.setFieldValue('subsidiary',subsiArr[v]);
			}
		
			if(LocArr != '' && LocArr != 'undefined' && LocArr != null)
			{
				// To Set Subsidiary
				record.setFieldValue('location',LocArr[v]);
			}
		         
		}
		var price =-1;
		var rate =50;
		
		/*var lineField = nlapiGetLineItemField('item','rate');
		lineField.setDisplayType('disabled');
		
		var lineField1 = nlapiGetLineItemField('item', 'custcol_unit_rate');
		lineField1.setDisplayType('disabled');
		
		var lineField2 = nlapiGetLineItemField('item','amount');
		lineField2.setDisplayType('disabled');
		
		var lineField3 = nlapiGetLineItemField('item', 'custcol_last_purchase_price');
		lineField3.setDisplayType('disabled');
		*/
		/*nlapiGetLineItemField('item', 'custcol_unit_rate').setDisplayType('hidden');
		nlapiGetLineItemField('item','amount').setDisplayType('hidden'); //'item', 'custcol_unit_rate'
		nlapiGetLineItemField('item', 'custcol_last_purchase_price').setDisplayType('hidden');
	*/
		for(var l=1;l<=lineNum;l++)
		{
					nlapiLogExecution("DEBUG","In Create Function","item in for loop=="+itemArr[l-1]);
					//nlapiLogExecution("DEBUG","In Create Function","qty in for loop=="+quanArr[l-1]);
					//nlapiLogExecution("DEBUG","In Create Function","amount in for loop=="+amtArr[l-1]);
				      
			nlapiLogExecution("DEBUG","In Create Function","vendorName =="+vendorName);
			nlapiLogExecution("DEBUG","In Create Function","subsiArr =="+subsiArr[0]);
					
					  var filters=new Array();
						 filters[0]=new nlobjSearchFilter('custrecord_subsidiary_pricing', null,'is',subsiArr[0]);
						 filters[1] = new nlobjSearchFilter('custrecord_item', null, 'is', itemArr[l-1]); //custrecord_vendor_name
						 filters[2] = new nlobjSearchFilter('custrecord_vendor_name', null, 'is', vendorName); 
						 filters[3] = new nlobjSearchFilter('custrecord_start_date', null, 'onorbefore', Date1);
						 filters[4] = new nlobjSearchFilter('custrecord_end_date', null, 'onorafter', Date1);
						         var columns = new Array();
								 columns[0] = new nlobjSearchColumn('custrecord_subsidiary_pricing');
								 columns[1] = new nlobjSearchColumn("custrecord_item"); 
								 columns[2] =  new nlobjSearchColumn("custrecord_contract_price");
								 columns[3] =  new nlobjSearchColumn("custrecord_start_date");
								 columns[4] =  new nlobjSearchColumn("custrecord_end_date");
								
								 
						 var searchresults = nlapiSearchRecord('customrecord_custom_purchase_pricing_rec',null, filters, columns);
						 nlapiLogExecution("DEBUG","In Create Function","searchresults =="+searchresults);
						 
						
						 
						if(searchresults !=null)
						{
							 for (var i = 0;  i < searchresults.length; i++) 
								{
									var custRecItem =  searchresults[i].getValue('custrecord_item');
									var custRecSubsi = searchresults[i].getValue('custrecord_subsidiary_pricing');
									var custRecStartDate = searchresults[i].getValue('custrecord_start_date');
									var custRecEndDate = searchresults[i].getValue('custrecord_end_date');
									 var rate  = searchresults[i].getValue('custrecord_contract_price');
								
									
								}
							 nlapiLogExecution("DEBUG","In CustREcord price search","rate =="+rate);
						}
						else
						{
							var rate = 0;
							descripArr[l-1]='Remove this item Bcoz its not in Contract';
							
						}
						
						 nlapiLogExecution("DEBUG","In CustREcord price search","rate =="+rate);
				      record.selectNewLineItem('item');
			
				      record.setCurrentLineItemValue('item','item',itemArr[l-1]);   
				      nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArr[l-1]);    
			    
				      
				      record.setCurrentLineItemValue('item', 'quantity', quanArr[l-1]);                              
				      nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+quanArr[l-1]);
	      
	                  record.setCurrentLineItemValue('item', 'custcol_pr_quantity', parseInt(quanArr[l-1]));                              
				      nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+quanArr[l-1]);
	      
	                  record.setCurrentLineItemValue('item','location',LocArr[l-1]);
				      
				      record.setCurrentLineItemValue('item','rate',parseFloat(rate));
				      nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
				      
				      if(rate!=null)
				      {
	                     record.setCurrentLineItemValue('item', 'custcol_unit_rate',parseFloat(rate)); 
				      }
				      else
				    	  {
				    	  rate ='0';
				    	  record.setCurrentLineItemValue('item', 'custcol_unit_rate',parseFloat(rate)); 
				    	  }
					  var amt = parseFloat(rate) *  parseFloat(quanArr[l-1]);
					  
					  record.setCurrentLineItemValue('item', 'custcol_amt_receipt',amt); 
	      
	                 // record.setCurrentLineItemValue('item', 'amount',amt); 
					  
					  record.setCurrentLineItemValue('item', 'custcol_last_purchase_price',lastPurchaseArr[l-1]); 
	      
				      record.setCurrentLineItemValue('item','amount',parseFloat(amt));
				      nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
				      
				      record.setCurrentLineItemValue('item','description',descripArr[l-1]);
				      nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
				     
				    //  record.setCurrentLineItemValue('item', 'description',descriptionArray[i-1]); 
				    //  nlapiLogExecution("DEBUG","In Create Function","description done==");
				      
				      record.setCurrentLineItemValue('item', 'location', LocArr[l-1]);
				      nlapiLogExecution("DEBUG","In Create Function","location done=="+LocArr[l-1]);
				      
				      record.setCurrentLineItemValue('item', 'department',departArr[l-1]); 
				      nlapiLogExecution("DEBUG","In Create Function","department done=="+departArr[l-1]);
				      
				      record.setCurrentLineItemValue('item', 'class', classArr[l-1]);
				      nlapiLogExecution("DEBUG","In Create Function","class done=="+classArr[l-1]);
				      
				      record.setCurrentLineItemValue('item', 'units', unitArr[l-1]);                                          
				      nlapiLogExecution("DEBUG","In Create Function","units done=="+unitArr[l-1]);
				      
				      record.setCurrentLineItemValue('item', 'custcol_requi_id', tranidArr[l-1]);                                          
				      nlapiLogExecution("DEBUG","In Create Function","tranidArr done=="+tranidArr[l-1]);   //hsncodeArr
				      
				      record.setCurrentLineItemValue('item', 'custcol_in_hsn_code', hsncodeArr[l-1]);                                          
				      nlapiLogExecution("DEBUG","In Create Function","hsncodeArr done=="+hsncodeArr[l-1]); 
				      
				      record.setCurrentLineItemValue('item', 'custcol_item_line_num', lineNumArr[l-1]);        
				      
				      record.commitLineItem('item');
				      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
				     
				}
		  
		// record.setFieldValue('custbody_start_date',custRecStartDate);
		// record.setFieldValue('custbody_end_date',custRecEndDate);
		
				var SubmitIt=nlapiSubmitRecord(record,true);  
				
		}
		      nlapiLogExecution("DEBUG","In Create Function","Record Submit done=="+SubmitIt);
		      response.sendRedirect('RECORD', 'purchaseorder', SubmitIt, true,null);
	   }
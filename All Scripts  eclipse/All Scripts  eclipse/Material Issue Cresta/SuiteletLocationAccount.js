function SuiteletLocationAccount(request, response)
{
	nlapiLogExecution('DEBUG','SuiteletLocationAccount', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','SuiteletLocationAccount', "in GET = ");
		
		var RecType =request.getParameter('cust_type'); 
		nlapiLogExecution('DEBUG', 'SuiteletLocationAccount', 'RecType :'+RecType);
		
	    var RecID =request.getParameter('cust_id'); 
	    nlapiLogExecution('DEBUG', 'SuiteletLocationAccount', 'RecID :'+RecID);
		
	    var subsidiary =request.getParameter('cust_subsi'); 
	    nlapiLogExecution('DEBUG', 'SuiteletLocationAccount', 'subsidiary :'+subsidiary);
		
	  
		var form = nlapiCreateForm("Material Issue Account And Location Form");
		
	
		// ======= ADD FIELDS ========
		var recordId = form.addField('custpage_recid', 'text', 'Rec ID#');
		recordId.setDefaultValue(RecID);
		recordId.setDisplayType('hidden')
	
	    nlapiLogExecution('DEBUG','SuiteletLocationAccount', "in GET below Form= ");
	  
		var locationField = form.addField('cust_locationname', 'select', 'Location');
		locationField.addSelectOption('', '');
      locationField.setMandatory(true);
		populateLocationList(locationField,subsidiary); 
		
		var AccountField = form.addField('cust_accountname', 'select', 'Account');
		  AccountField.setDefaultValue('309');
        AccountField.addSelectOption('', ' ');
        populateAccountList(AccountField);
      
		AccountField.setDisplayType('inline')
     //  AccountField.setMandatory(true);
		
	
		   
		// ==== CALL A CLIENT SCRIPT ====
		 form.setScript('customscript_client_location_acc_redirec');
		 
	    var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Items','custpage_sample_tab');
        
        ItemSublist.addField('custpage_chechbox','checkbox');  
           
         
		   //ItemSublist.addField('custpage_reqi', 'text', 'REQUISITION #')
		   ItemSublist.addField('custpage_item','select','Item','ITEM').setDisplayType('inline');
		   ItemSublist.addField('custpage_unit', 'text', 'UNIT');
		   ItemSublist.addField('custpage_descrip', 'text', 'Description');
		   ItemSublist.addField('custpage_type', 'text', 'TYPE').setDisplayType('hidden');
		   ItemSublist.addField('custpage_quantity', 'float', 'QUANTITY');
		   ItemSublist.addField('custpage_stock', 'float', 'Stock Available');
		   ItemSublist.addField('custpage_adjustqty', 'float', 'Adjust QUANTITY').setDisplayType('entry');
		   ItemSublist.addField('custpage_rate', 'float', 'RATE').setDisplayType('inline');
		   ItemSublist.addField('custpage_subsidiary','select', 'SUBSIDIARY','subsidiary').setDisplayType('inline');
		   ItemSublist.addField('custpage_location','select', 'LOCATION','location').setDisplayType('disabled');
		   ItemSublist.addField('custpage_department','select', 'DEPARTMENT','department').setDisplayType('disabled');
		   ItemSublist.addField('custpage_class','select', 'CLASS','classification').setDisplayType('disabled');
		   ItemSublist.addField('custpage_itemtype','text', 'Item Type').setDisplayType('disabled');
		   ItemSublist.addField('custpage_islot','checkbox', 'Is Lot').setDisplayType('disabled');
		   ItemSublist.addField('custpage_linenum','integer', 'Line Num').setDisplayType('disabled');
	
			var filters = new Array();
			filters[0] = new nlobjSearchFilter('custcol_onlocation_available', null, 'greaterthan', '0');
            filters[1] = new nlobjSearchFilter('internalid', null, 'anyof',RecID);
      
		   
                    var columns = new Array();
			
			 columns[0] = new nlobjSearchColumn("item"); 
			 columns[1] =  new nlobjSearchColumn("unit");
			 columns[2] =   new nlobjSearchColumn("type"), 
		//	 columns[4] =  new nlobjSearchColumn("altname","vendor",null);
			 columns[3] = new nlobjSearchColumn("subsidiary"); 
			 columns[4] =  new nlobjSearchColumn("name","Currency",null);
			 columns[5] = new nlobjSearchColumn("quantity"); 
			 columns[6] =  new nlobjSearchColumn("department"); 
			 columns[7] =  new nlobjSearchColumn("class"); 
			 columns[8] =  new nlobjSearchColumn("location"); 
			 columns[9] =  new nlobjSearchColumn("amount"); 
			 columns[10] =  new nlobjSearchColumn("tranid");
			 columns[11] = new nlobjSearchColumn("memo");
			 columns[12] = new nlobjSearchColumn("estimatedamount");
			 columns[13] = new nlobjSearchColumn('internalid');
			 columns[14] = new nlobjSearchColumn("custcol_item_type");
			 columns[15] = new nlobjSearchColumn('custcol_islot_item');
			 columns[16] = new nlobjSearchColumn('custcol_auto_line_num');
			 columns[17] = new nlobjSearchColumn('custcol_onlocation_available');
	      var results = GetSearchResults(filters,columns); 
	
	
		for (var i = 1; i <= results.length; i++) 
		{ 
			 ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
			
			 ItemSublist.setLineItemValue('custpage_item', i, results[i-1].getValue('item'));
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+results[i-1].getValue('item'));
			 
             var newPr =parseInt(results[i-1].getValue('quantity'));
			 ItemSublist.setLineItemValue('custpage_quantity', i, newPr);
			 
			  var stockqty =parseInt(results[i-1].getValue('custcol_onlocation_available'));
				 ItemSublist.setLineItemValue('custpage_stock', i, stockqty);
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+results[i-1].getValue('quantity'));

			 
			 ItemSublist.setLineItemValue('custpage_subsidiary', i, results[i-1].getValue('subsidiary'));
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+results[i-1].getValue('subsidiary'));
			 
			 ItemSublist.setLineItemValue('custpage_descrip', i, results[i-1].getValue('memo'));
			 
			 var purchaseLast = results[i-1].getValue("estimatedamount");
			 
			 if(purchaseLast != null && purchaseLast != ' ')
			 {
				 purchaseLast = results[i-1].getValue("estimatedamount");
				 ItemSublist.setLineItemValue('custpage_rate', i,purchaseLast);
			 }
			 else{
				 var zero ='0.00';
				 ItemSublist.setLineItemValue('custpage_rate', i,zero);
			 }
			
				
		
				 ItemSublist.setLineItemValue('custpage_class', i,results[i-1].getValue('class'));
			//	nlapiLogExecution('DEBUG', 'OrderRequisition', 'class :'+results[i-1].getValue('class'));

				 
				 ItemSublist.setLineItemValue('custpage_department', i,results[i-1].getValue('department'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'department :'+results[i-1].getValue('department'));

				 
				 ItemSublist.setLineItemValue('custpage_location', i, results[i-1].getValue('location'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'location :'+results[i-1].getValue('location'));

				 
				 ItemSublist.setLineItemValue('custpage_order_amount', i, results[i-1].getValue('amount'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'amount :'+results[i-1].getValue('amount'));
			 
				 ItemSublist.setLineItemValue('custpage_unit', i, results[i-1].getValue('unit'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'unit :'+results[i-1].getValue('unit'));
				

				 ItemSublist.setLineItemValue('custpage_reqinternal', i, results[i-1].getValue('internalid'));
	
				 ItemSublist.setLineItemValue('custpage_itemtype', i, results[i-1].getValue('custcol_item_type'));
				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'item Type :'+results[i-1].getValue('custcol_item_type'));
				 ItemSublist.setLineItemValue('custpage_islot', i, results[i-1].getValue('custcol_islot_item'));
				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Is Lot :'+results[i-1].getValue('custcol_islot_item'));
				 ItemSublist.setLineItemValue('custpage_linenum', i, results[i-1].getValue('custcol_auto_line_num'));
					
		}
		
		


	    // ==== ADD A BUTTON =====
	   	//form.addButton('custombutton', 'Submit', 'redirectSuite();');
	   	form.addSubmitButton('Submit');
	
		
		form.addButton('custombutton', 'Reset', 'refresh();');
		
		//form.addButton('custombutton', 'Download CSV', 'download_csv()');*/
		
      	response.writePage(form);

      	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','SuiteletLocationAccount', "in POST   ");

		 	nlapiLogExecution('DEBUG', 'aftr submit', "  Enter in Function" );
		 	var itemArray = new Array();
		 	var rateArray = new Array();
		 	var descriptionArray = new Array();
		 	var qtyArray = new Array();
		 	var unitArray = new Array();
		 	var locationArray = new Array();
		 	var line_chkArr=new Array();
		 	var salesArr=new Array();
		 	var custArr=new Array();
		 	var vendArr=new Array();
		 	var amtArr=new Array();
		 	var custNew=new Array();
		 	var typeItemArr =new Array();
		 	var InvNumArr=new Array();
		 	var InvQtyArr=new Array();
		 	var IsLotItemArr =new Array();
		 	var typeItemArr =new Array();//custUniq
		    var useBinsArr =new Array();
		    var binnumberArr= new Array();
		    var remainQtyArr= new Array();
		    var remainQty =0;
		 	var recId = request.getParameter('custpage_recid');
		 	 recObj = nlapiLoadRecord('purchaserequisition',recId);
		 	 
		 	 var Department = recObj.getFieldValue('department');
			 	nlapiLogExecution('DEBUG', 'aftr submit', "  Department  ==" + Department);
			 	
			 var Class = recObj.getFieldValue('class');
			 	nlapiLogExecution('DEBUG', 'aftr submit', "  class  ==" + Class);
			 	
			 var date = recObj.getFieldValue('trandate');
			 	nlapiLogExecution('DEBUG', 'aftr submit', "  date  ==" + date);
			 	
			 var subsidiary = recObj.getFieldValue('subsidiary');
			 	nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiary  ==" + subsidiary);
			 	
			 	 var location = recObj.getFieldValue('location');
				 	nlapiLogExecution('DEBUG', 'aftr submit', "  location  ==" + location);
				 	
				 	var PRlinecount=recObj.getLineItemCount('item');
					  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
					  
			
		    var locForm= request.getParameter('cust_locationname');
		    var accForm= request.getParameter('cust_accountname');
		    
		    var count = request.getLineItemCount('custpage_sig_req_sublist');
		    
		    for(var i=1; i< count+1; i++)
			  {
			   
			   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
			 
			  
			   if(checkMark == 'T')
			   {
			   
				       var Availquantity =request.getLineItemValue('custpage_sig_req_sublist','custpage_quantity',i);
				       nlapiLogExecution('DEBUG', 'aftr submit', " Original quantity  ==" + Availquantity);
				   
						var itemid =request.getLineItemValue('custpage_sig_req_sublist','custpage_item',i);
		            	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
		            	itemArray.push(itemid);
						
					    	var quantity =request.getLineItemValue('custpage_sig_req_sublist','custpage_adjustqty',i);
			        	   nlapiLogExecution('DEBUG', 'aftr submit', " Adjust quantity  ==" + quantity);
			        	   
			        	    if(Availquantity > quantity)
			        	    {
			        	    
			        	    	  qtyArray.push(quantity);
			        	    	
			        	    	  remainQty = parseFloat(Availquantity)-parseFloat(quantity);
			        	    	
			        	      remainQtyArr.push(remainQty);
			        	    }
			        	    else 
			        		{
			        		   qtyArray.push(quantity);
			        		}
			        	
			            	
			            	
			            	var units =request.getLineItemValue('custpage_sig_req_sublist','custpage_unit',i);    
			            	nlapiLogExecution('DEBUG', 'aftr submit', "  units  ==" + units);
			            	
			            	/*var customer =recObj.getLineItemValue('item','customer',i);
			            	custArr.push(customer);
			            	nlapiLogExecution('DEBUG', 'aftr submit', "  customer  ==" + customer);
			            	
			            	var vendorname =recObj.getLineItemValue('item','vendorname',i);
			            	vendArr.push(vendorname);
			            	nlapiLogExecution('DEBUG', 'aftr submit', "  vendorname  ==" + vendorname);
			            	
			            	*/
			          
			            	var amount =request.getLineItemValue('custpage_sig_req_sublist','custpage_order_amount',i);    
			            	amtArr.push(amount);
			            	nlapiLogExecution('DEBUG', 'aftr submit', "  amount  ==" + amount);//estimatedamount
			            	
			            	var rate =parseFloat(amount)/parseFloat(Availquantity);
			            	
			            	//rate1 = parseFloat(amount)/parseFloat(quantity);
			            	rateArray.push(rate);
			            	
			            	var description =request.getLineItemValue('custpage_sig_req_sublist','custpage_descrip',i);    
			            	nlapiLogExecution('DEBUG', 'aftr submit', "  description  ==" + description);
			            	descriptionArray.push(description);
			            	
			            	var line_chk =request.getLineItemValue('custpage_sig_req_sublist','custpage_linenum',i);  
			            	nlapiLogExecution('DEBUG', 'aftr submit', "  line_chk  ==" + line_chk);
			            	line_chkArr.push(line_chk);
			            	
			            	
			            	var typeItem =request.getLineItemValue('custpage_sig_req_sublist','custpage_itemtype',i);  
			            	nlapiLogExecution('DEBUG', 'aftr submit', "  typeItem  ==" + typeItem);
			            	typeItemArr.push(typeItem);
			            	
			            	var IsLotItem =request.getLineItemValue('custpage_sig_req_sublist','custpage_islot',i);  
			            	nlapiLogExecution('DEBUG', 'aftr submit', "  IsLotItem  ==" + IsLotItem);
			            	IsLotItemArr.push(IsLotItem);
			            	
			           	   if(typeItem =='Inventory Item' && IsLotItem =='F')
			            	{
			            		  var itemRecValues = nlapiLookupField('inventoryitem',itemid, ['quantityavailable','usebins']);
			            		   var qtyonhand = itemRecValues['quantityavailable'];
			            		   var useBins = itemRecValues['usebins'];
			            		   nlapiLogExecution('DEBUG', 'qtyonhand', 'qtyonhand = ' + qtyonhand);
			            		   nlapiLogExecution('DEBUG', 'useBins', 'useBins = ' + useBins);
			            		   useBinsArr.push(useBins);
			            		   
			            		   
			            	}
			            
			        
					}
		        	
				}
				
				   if(itemArray !=null && itemArray !=''  && itemArray !=undefined )
					{
					 var adjustId =  createInvAdjustViaPR(recId,IsLotItemArr,date,locForm,accForm,vendArr,amtArr,line_chkArr,Class,Department,location,rateArray,recId,itemArray,qtyArray,units,descriptionArray,subsidiary,typeItemArr,useBinsArr);
					    
					 
						 for(var k=0;k<itemArray.length;k++)
						   {
							   for(var j=1;j<=PRlinecount;j++)
								{
								      var itemid =recObj.getLineItemValue('item','item',j);
								   
								      var numbOfLine =recObj.getLineItemValue('item','line',j);
								   
								      if(itemid ==itemArray[k] && numbOfLine == line_chkArr[k] ) //remainQtyArr
									   {
								    	  recObj.setLineItemValue('item','custcol_inventory_adjustment_id',j,adjustId);
								    	  
								    	  if(remainQtyArr[k] !='' && remainQtyArr[k]!=null)
								    	  {
								    		 var QtyRem =remainQtyArr[k]; 
								    	  }
								    	  else
								    	  {
								    		  var QtyRem =0; 
								    	  }
								    	  recObj.setLineItemValue('item','custcol_remain_qty_for_pr',j,QtyRem);//custcol_remain_qty_for_pr
									   }
								}
						   }
						 
					}
				   
				 var requisition =  nlapiSubmitRecord(recObj,true);   
			 
				   response.sendRedirect('RECORD', 'purchaserequisition', requisition, false,'view');

		 
		 
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','SuiteletLocationAccount', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}// END orderRequisitionSuitelet()

function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_requi_trans_search', filters, columns);
	return results;
}

// BEGIN OBJECT CALLED/INVOKING FUNCTION ===================================================
function populateAccountList(AccountField)
{
	
	nlapiLogExecution('DEBUG','populateAccountList', " populateAccountList  ");	
	var filters = new Array();
	filters[0] = new nlobjSearchFilter('type', null, 'anyof', "Expense");
	var column = new Array();
	
	
	column[0] = new nlobjSearchColumn('internalid')
	column[1] = new nlobjSearchColumn('name')
	
	var loc_s_searchresult = nlapiSearchRecord('account', null, filters, column)
	
	if (loc_s_searchresult != null && loc_s_searchresult != '' && loc_s_searchresult != undefined) {
	
		nlapiLogExecution('DEBUG', 'pupulate AccountList', 'Acc_s_searchresult--->' + loc_s_searchresult)
		
		for (var i = 0; i < loc_s_searchresult.length; i++) 
		{
		
			AccountField.addSelectOption(loc_s_searchresult[i].getValue('internalid'), loc_s_searchresult[i].getValue('name'))
			
		}
	}
}

function populateLocationList(locationField,subsidiary)
{
	
	nlapiLogExecution('DEBUG','populateLocationList', " locationField  ");	
	var filters = new Array();
	
	filters[0] = new nlobjSearchFilter('subsidiary', null, 'anyof',subsidiary);
	var column = new Array();
	
	
	column[0] = new nlobjSearchColumn('internalid')
	column[1] = new nlobjSearchColumn('name')
	
	var loc_s_searchresult = nlapiSearchRecord('location', null, filters, column)
	
	if (loc_s_searchresult != null && loc_s_searchresult != '' && loc_s_searchresult != undefined) {
	
		nlapiLogExecution('DEBUG', 'pupulate location', 'loc_s_searchresult--->' + loc_s_searchresult)
		
		for (var i = 0; i < loc_s_searchresult.length; i++) 
		{
		
			locationField.addSelectOption(loc_s_searchresult[i].getValue('internalid'), loc_s_searchresult[i].getValue('name'))
			
		}
	}
}


// END OBJECT CALLED/INVOKING FUNCTION =====================================================


function createInvAdjustViaPR(recId,IsLotItemArr,date,locForm,accForm,vendArr,amtArr,line_chkArr,Class,Department,location,rateArray,recId,itemArray,qtyArray,units,descriptionArray,subsidiary,typeItemArr,useBinsArr)
{	
	
	nlapiLogExecution("DEBUG","In Create Function","createSalesOrderRecordFunction**************");
	//nlapiLogExecution("DEBUG","In Create Function","PRlinecount=="+PRlinecount);
	nlapiLogExecution("DEBUG","In Create Function","date=="+date);
	nlapiLogExecution("DEBUG","In Create Function","location=="+location);
    nlapiLogExecution("DEBUG","In Create Function","itemid=="+itemArray);
	nlapiLogExecution("DEBUG","In Create Function","quantity=="+qtyArray);
	nlapiLogExecution("DEBUG","In Create Function","line_chkArr=="+line_chkArr);
	nlapiLogExecution("DEBUG","In Create Function","description=="+descriptionArray);
	nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)
	nlapiLogExecution("DEBUG","In Create Function","typeItemArr=="+typeItemArr)
	// nlapiLogExecution("DEBUG","In Create Function","InvNumArr=="+InvNumArr)
	// nlapiLogExecution("DEBUG","In Create Function","InvQtyArr=="+InvQtyArr)
	
	var count=0;
	var Stat =parseFloat(1);
	
     var record = nlapiCreateRecord('inventoryadjustment', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}
		
   //  record.setFieldValue('customform',176);
	
	if(date != '' && date != 'undefined' && date != null)
	{
		record.setFieldValue('trandate',date);
	}

	if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
	{
		// To Set Subsidiary
		record.setFieldValue('subsidiary',subsidiary);
	}
	
	if(locForm != '' && locForm != 'undefined' && locForm != null)
	{
		// To Set Subsidiary
		record.setFieldValue('adjlocation',locForm);
	}
                                                   
	record.setFieldValue('account',accForm);  
	record.setFieldValue('custbody_from_requisition',recId);
    var price =-1;
	
	for(var i=1;i<=itemArray.length;i++)
	{
		 var InvNumArr =[];
		 var InvNumQtyArr =[];
		  var adjQty =parseFloat(0-qtyArray[i-1]);//parseFloat(0-qtyArray[i-1]);
	                                                         
	      record.selectNewLineItem('inventory');

	      record.setCurrentLineItemValue('inventory', 'item', itemArray[i-1]);   
	      nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArray[i-1]);
	      
	      record.setCurrentLineItemValue('inventory', 'location', locForm);
	      nlapiLogExecution("DEBUG","In Create Function","location done==");
	      
	      record.setCurrentLineItemValue('inventory', 'adjustqtyby',adjQty);                              
	      nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
	      
	    
	  	  if(IsLotItemArr[i-1] =='T' && typeItemArr[i-1] =='Inventory Item')
	      {
	  		  var totQty=0;
	  		  var itmid =itemArray[i-1];
	  		  var qttty =qtyArray[i-1];
	  		  var inventorydetailSearch = findTransaction(itmid,locForm);
	  		  
	  		 nlapiLogExecution("DEBUG","In Create Function"," inventorydetailSearch done=="+inventorydetailSearch.length);
	  		  
	  	  if( inventorydetailSearch !=null)
   		   {
   			   for(var m=0;m<inventorydetailSearch.length;m++)
   			   {
	   				   var invNumSerch =inventorydetailSearch[m].getValue("internalid","inventoryNumber");
	   				   //"quantityavailable","inventoryNumber"
	   				   var AvailQty =inventorydetailSearch[m].getValue("quantityavailable","inventoryNumber");
	   				   
	   				 nlapiLogExecution("DEBUG","In Create Function"," AvailQty =="+AvailQty)
	   				   
	   				   if(parseFloat(AvailQty) <= parseFloat(qttty) && parseFloat(totQty) <= parseFloat(qttty))
	   				   {
	   					 nlapiLogExecution("DEBUG","In Create Function"," condition 1 =="+AvailQty)
	   					   totQty += parseFloat(AvailQty);
	   					 
		   					InvNumArr.push(invNumSerch);
		   					InvNumQtyArr.push(AvailQty);
		   				 
			   				 if(parseFloat(totQty) > parseFloat(qttty))
		   					 {
			   					nlapiLogExecution("DEBUG","In Create Function"," condition 1.1 ==")
			   					 
			   					InvNumArr.pop(invNumSerch);
			   					InvNumQtyArr.pop(AvailQty);
		   						var rem = parseFloat(totQty)-parseFloat(qttty);
		   					 }
			   				else if(parseFloat(totQty) == parseFloat(qttty))
			  				{
			   					nlapiLogExecution("DEBUG","In Create Function"," condition 1.2 ==")
			   					
			  						 break;
			  			    } 
		   					 
		   			   }
	   				   else if(parseFloat(AvailQty) <= parseFloat(rem) && parseFloat(totQty) <= parseFloat(qttty))
	   				   {
	   					nlapiLogExecution("DEBUG","In Create Function"," condition 2 ==")
	   					
		   					InvNumArr.push(invNumSerch);
		   					InvNumQtyArr.push(AvailQty);
	   				   }
                        else if(parseFloat(AvailQty) > parseFloat(qttty) && parseFloat(totQty)==0 )
	   				   {
                        	nlapiLogExecution("DEBUG","In Create Function"," condition 3 ==")
		   					
		   					InvNumArr.push(invNumSerch);
		   					InvNumQtyArr.push(qttty);
                      
                         break;
	   				   }
                        else if(parseFloat(AvailQty) > parseFloat(qttty) && parseFloat(totQty) > 0 )
 	   				   {
                         	nlapiLogExecution("DEBUG","In Create Function"," condition 4 ==")
 		   					
 		   					InvNumArr.push(invNumSerch);
 		   					InvNumQtyArr.push(parseFloat(qttty-totQty));
                          var newQT = parseFloat(totQty)+parseFloat(qttty-totQty);
                          totQty=parseFloat(newQT);
                          if(newQT == qttty)
                          {
                        	  break;
                          }
                         
 	   				   }
                    
                   
	  			
   			   }
   		   }
	  	 nlapiLogExecution("DEBUG","In Create Function"," InvNumArr done=="+InvNumArr);
	  	 nlapiLogExecution("DEBUG","In Create Function"," InvNumQtyArr done With Qty is=="+InvNumQtyArr+'='+totQty);
	  		
	  		  var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
		  	  
		  	 
			     var s= subrec.getLineItemCount('inventoryassignment');
			     nlapiLogExecution('DEBUG', 'Acct', 'subrec for Lot Item inventory count= ' + s);
			     if(s > 0)
			     {
			    	 nlapiLogExecution('DEBUG', 'Acct', 'Inside the IsLotItemArr to remove subrec= ');
			    	   for(var i1 = 1; i1 <= s; i1++)
					     {  
					    	 subrec.removeLineItem('inventoryassignment', i1);
					    	 count++;
				          }
			     }
			      if(InvNumArr.length > 1)
		  	      {
			    	  nlapiLogExecution('DEBUG', 'Acct', 'InvNumArr.length = '+InvNumArr.length );
		  	    	  for(var k=1 ;k<=InvNumArr.length;k++)
		  	    	  {
		  	    		  subrec.selectNewLineItem('inventoryassignment');
		  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InvNumArr[k-1]);
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(0-InvNumQtyArr[k-1]));
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
                          subrec.commitLineItem('inventoryassignment');//	  
		  		  	      nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());	  
		  	    	  }
		  	    	subrec.commit();
		  	      }
		  	      else
		  	      {
		  	    	
		  	      subrec.selectNewLineItem('inventoryassignment');
		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InvNumArr);
		  		  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(0-InvNumQtyArr));
			  	 
			  	  nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]==');
			  	  subrec.commitLineItem('inventoryassignment');//	  
		  	      subrec.commit();
		  	      nlapiLogExecution('DEBUG', 'Acct', 'JSON.stringify() done= ' + JSON.stringify());	  
		  	      }	  
	  	     
	  	     
	      }
	  	  
	  	  else if(typeItemArr[i-1] =='Inventory Item' && IsLotItemArr[i-1] !='T')
	  	  {
	  		
	  		  var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		  	  nlapiLogExecution('DEBUG', 'Acct', 'Inventory Item AND useBins True = ' + subrec);
		  	  
		  	 
			     var s= subrec.getLineItemCount('inventoryassignment');
			     nlapiLogExecution('DEBUG', 'Acct', 'subrec Not Lot item for inventory count= ' + s);
			     if(s > 0 )
			     {
			    	 nlapiLogExecution('DEBUG', 'Acct', 'Inside the else to remove subrec= ');
			    	   for(var i1 = 1; i1 <= s; i1++)
					     {  
					    	 subrec.removeLineItem('inventoryassignment', i1);
					    	 count++;
				          }
			     }
			     
			  subrec.selectNewLineItem('inventoryassignment');
	  	      subrec.setCurrentLineItemValue('inventoryassignment','quantity',adjQty);
	  	      //subrec.setCurrentLineItemValue('inventoryassignment','binnumber','2');//'binnumber'
	  	      //nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]=='+adjQty);
		  	  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
		  	  subrec.commitLineItem('inventoryassignment');
		  	  
	  	      subrec.commit();
	  	      nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());	
	  	  }
	  	 /* else if(typeItemArr[i-1] =='Inventory Item' && (useBinsArr[i-1] == 'F'|| useBinsArr[i-1] ==null ))
	  	  {
	  		
	  		  var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
		  	  
		  	 
			     var s= subrec.getLineItemCount('inventoryassignment');
			     nlapiLogExecution('DEBUG', 'Acct', 'subrec Not Lot item for inventory count= ' + s);
			     if(s > 0 )
			     {
			    	 nlapiLogExecution('DEBUG', 'Acct', 'Inside the else to remove subrec= ');
			    	   for(var i1 = 1; i1 <= s; i1++)
					     {  
					    	 subrec.removeLineItem('inventoryassignment', i1);
					    	 count++;
				          }
			     }
			     
			  
		  
	  		  subrec.selectNewLineItem('inventoryassignment');
	  	      subrec.setCurrentLineItemValue('inventoryassignment','quantity',adjQty);
	  	      nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]=='+adjQty);
		  	  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
		  	  subrec.commitLineItem('inventoryassignment');
		  	  
	  	      subrec.commit();
	  	      nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());	
	  	  }*/
	  	    
	  	      record.setCurrentLineItemValue('inventory', 'unitcost', rateArray[i-1]);                                          
	  	      nlapiLogExecution("DEBUG","In Create Function","rate done==");
	      
	  	      record.setCurrentLineItemValue('inventory', 'description',descriptionArray[i-1]); 
	  	      nlapiLogExecution("DEBUG","In Create Function","description done==");
	      
	  	      record.commitLineItem('inventory');         
		      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
	     
	}
 
	 var SubmitIt = nlapiSubmitRecord(record);  
	 
	 
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 response.sendRedirect('RECORD', 'inventoryadjustment', SubmitIt, false,'view');
	 
	 return SubmitIt;
}

function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

function removeDuplicates(arr){
    var unique_array = []
    for(var i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array;
}

function findTransaction(itmid,locForm)
{
	var searchId ='customsearch_item_lot_n_serial_num';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',itmid);
	 filters[1]=new nlobjSearchFilter('location','inventorynumber','anyOf',locForm);
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
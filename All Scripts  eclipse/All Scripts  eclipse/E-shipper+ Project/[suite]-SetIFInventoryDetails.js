	/**
	 * Module Description
	 * 
	 * Version    Date              Author           Remarks
	 * 1.00       1 July 2020       ATPL			 Suitelet create to item fullfillment record.
	 *
	 */
	
	/**
	 * @param {nlobjRequest} request Request object
	 * @param {nlobjResponse} response Response object
	 * @returns {Void} Any output is written via response object
	 */
	function sut_invDet_if(request, response)
	{
		var date = new Date();
		try
		{
			if ( request.getMethod() == 'GET' )
			{
				var form = nlapiCreateForm('Item Fulfillment Orders');
				
				
				//call client script for validation
				form.setScript('customscript_suite_redirect_script');
					
					var Customer =form.addField('custpage_body_customer','select','Customer','customer');
					
					var postPeriod =form.addField('custpage_body_postperiod','select','Posting Period','accountingperiod');
					
					var CustID = request.getParameter('custpage_body_customer');
				    //  nlapiLogExecution('DEBUG','RECID', "RECID= "+PROJID);
				     /* if(CustID == null || CustID == '')
				       {
				    	  CustID == proIntId;
				       }*/
				      
					var trantype =form.addField('custpage_body_trantype','Text','Transaction Type').setDisplayType('inline');
					trantype.setDefaultValue('Sales Order');
					
					var shipstatus =form.addField('custpage_body_status','select','Set Shipment Status To','customlist_if_status_list');
					
					var bulkLoc =form.addField('custpage_body_bulkloc','select','Bulk Fulfill From Location','location');
					bulkLoc.setMandatory(true);
					
					var FilterBy =form.addField('custpage_body_filtby','select','Filter By','customlist_if_filter_list');
					
					var filterVal =request.getParameter('custpage_body_filtby');
					
					var if_date = form.addField('custpage_date', 'date', 'date','Date');//.setDisplayType('disabled');
					//var dateConv = nlapiStringToDate(date);
					//////////nlapiLogExecution('DEBUG','sut_intercom_if','date = '+date);
					if_date.setDefaultValue(date);
					
				
					 var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Orders','custpage_sample_tab');
					   ItemSublist.addMarkAllButtons(); 
					   ItemSublist.addField('custpage_chechbox','checkbox','FULFILL'); 
					   ItemSublist.addField('custpage_reqi_link', 'url', 'Process').setLinkText('View');
					   ItemSublist.addField('custpage_trntype','text','Transaction type').setDisplayType('inline'); 
					   ItemSublist.addField('custpage_trndate','date','Date').setDisplayType('inline');
				       ItemSublist.addField('custpage_sodocno', 'text', 'Order #').setDisplayType('inline');
				       ItemSublist.addField('custpage_cust','select', 'CUSTOMER','customer').setDisplayType('inline');
				       //var rem= ItemSublist.addField('custpage_memo','text', 'Memo').setDisplayType('inline');
			           //rem.setDisplaySize( 30, 3);  
			           ItemSublist.addField('custpage_curr','select', 'Currency','currency').setDisplayType('inline');
			           ItemSublist.addField('custpage_shipto','text','Ship To').setDisplayType('inline');
			           ItemSublist.addField('custpage_shipmethod','select','Ship Method').setDisplayType('inline');
					  	         
			
			           var searchId = 'customsearch_filter_by_if_search';
			           var filters = new Array();
			           if((CustID != null && CustID != '')&&( filterVal != null && filterVal != undefined))
			            {
			        	   Customer.setDefaultValue(CustID);
			              filters[0] = new nlobjSearchFilter('name', null, 'anyof', CustID);
			              
			              if(filterVal == 1)
			              {
			            	  filters[1] = new nlobjSearchFilter("formulanumeric: Case When({quantitycommitted} > 0) then 1 else 0 end",null,"equalto","1");
				              
			              }
			              else if(filterVal == 2)
			              {
			              }
			              else if(filterVal == 3)
			              {
			            	  filters[1] = new nlobjSearchFilter("formulanumeric: Case When({quantitycommitted} = {quantity}) then 1 else 0 end",null,"equalto","1");
				          }
			              else if(filterVal ==4)
			              {
			            	 // filters[1] = new nlobjSearchFilter('name', null, 'anyof', CustID);
			              }
			            }
			           else if((CustID == null || CustID == '')&&( filterVal != null && filterVal != undefined))
			            {
			        	  
			              if(filterVal == 1)
			              {
			            	  filters[0] = new nlobjSearchFilter("formulanumeric: Case When({quantitycommitted} > 0) then 1 else 0 end",null,"equalto","1");
						         
			              }
			              else if(filterVal == 2)
			              {
			            	  
			               }
			              else if(filterVal == 3)
			              {
			            	  filters[0] = new nlobjSearchFilter("formulanumeric: Case When({quantitycommitted} = {quantity}) then 1 else 0 end",null,"equalto","1");
					                
			              }
			              else if(filterVal == 4)
			              {
			            	 // filters[1] = new nlobjSearchFilter('name', null, 'anyof', CustID);
			              }
			            }
			           
			           var results = findTransaction(searchId,filters);
			           
			           
			   		for (var i = 1; i <= results.length; i++) //results.length
					{ 
						  ItemSublist.setLineItemValue('custpage_chechbox', i,'T');
						
					             var userRole = nlapiGetRole();
						      //   nlapiLogExecution('DEBUG', 'OrderRequisition', 'userRole:'+userRole);
					             ItemSublist.setLineItemValue('custpage_interid', i, results[i-1].getValue("internalid",null,"GROUP"));
					             var reqid = results[i-1].getValue("internalid",null,"GROUP");
					             var RequesistionUrl = nlapiResolveURL('RECORD', 'salesorder', reqid, false);
					             ItemSublist.setLineItemValue('custpage_reqi_link', i, RequesistionUrl);
								 ItemSublist.setLineItemValue('custpage_trntype', i, 'Sales Order');//results[i-1].getValue('type')
					             
								 ItemSublist.setLineItemValue('custpage_trndate', i, results[i-1].getValue("trandate",null,"GROUP"));
								// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+results[i-1].getValue('item'));
								 
								 ItemSublist.setLineItemValue('custpage_sodocno', i, results[i-1].getValue("tranid",null,"GROUP"));
							//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+results[i-1].getValue('quantity'));
								 
								 ItemSublist.setLineItemValue('custpage_cust', i, results[i-1].getValue("entity",null,"GROUP"));
					
								
							//	 ItemSublist.setLineItemValue('custpage_memo', i, results[i-1].getValue('memo'));
							//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Location :'+results[i-1].getValue('location'));
								 
								 ItemSublist.setLineItemValue('custpage_curr', i, results[i-1].getValue('currency',null,"GROUP"));
							//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'RecordID :'+results[i-1].getValue('custcol_cust_rec_id'));
				
								
								 ItemSublist.setLineItemValue('custpage_shipto', i, results[i-1].getValue('shipto',null,"GROUP"));
									 
								// ItemSublist.setLineItemValue('custpage_shipmethod', i,  results[i-1].getValue('shipmethod'));
							}
				
				form.addSubmitButton('Submit');
				form.addButton('custombutton1','Reset','refresh();');
				response.writePage(form);
			}
			
			else if (request.getMethod() == 'POST') 
			{
				
			}
		}
		catch(exe)
		{
			nlapiLogExecution('DEBUG','sut_intercom_if','ERROR = '+exe);
		}
	
	}
	
	
	function findTransaction(searchId,filters)
	{
		
		//var filters=new Array();
		// filters[0]=new nlobjSearchFilter('item', null,'anyOf',item);
		
		 var recType= null;
		 
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
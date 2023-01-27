/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       9 June 2020     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */

function TransferIssueSuiteScreen(request,response)
{
	nlapiLogExecution('DEBUG','TransferIssueScreen', "Request Method = " +request.getMethod());
	  
	if(request.getMethod() == 'GET')
	{
		try
		{
			
			 var itemArray = new Array();
			 	var rateArray = new Array();
			 	var descriptionArray = new Array();
			 	var qtyArray = new Array();
			 	var unitArray = new Array();
			 	var locationArray = new Array();
			 	
			 	 var itemArray1 = new Array();
				 	var rateArray1 = new Array();
				 	var descriptionArray1 = new Array();
				 	var qtyArray1 = new Array();
				 	var unitArray1 = new Array();
				 	var locationArray1 = new Array();
			 	var line_chkArr=new Array();
			 	var line_chkArr1=new Array();
			 	var salesArr=new Array();
			 	var custArr=new Array();
			 	var vendArr=new Array();
			 	var amtArr=new Array();
			 	var custNew=new Array();
			 	var typeItemArr =new Array();
			 	var typeItemArr1 =new Array();
		    	var BackOrderQtyArray =new Array();
		    	var IsLotItemArr=[];
		    	var IsLotItemArr1=[];
		    	var useBinsArr=[];
		    	var InvNumArr=[];
		    	var InvQtyArr=[];
			
			
			var form = nlapiCreateForm("Transfer Issue Screen");
			
			form.setScript('customscript_call_material_issue_wo');
			
			var recID = request.getParameter('rec_id');
			
			nlapiLogExecution('debug','TransferIssueScreen','recID := '+ recID);
			
			
			var prodObj = nlapiLoadRecord('workorder',recID);
			
			var docNo = prodObj.getFieldValue('tranid'); 
			var assemblyItem = prodObj.getFieldValue('assemblyitem'); 
			
			var trandate = prodObj.getFieldValue('trandate'); 
			
			var subsi = prodObj.getFieldValue('subsidiary'); 
			
			var cust = prodObj.getFieldValue('entity'); 
			
			var locTo = prodObj.getFieldValue('location'); 
			
			var RecordID = form.addField('custpage_recid', 'text', 'RecID #');
			RecordID.setDefaultValue(recID);
			RecordID.setDisplayType('hidden');
			
			
			
			var DocNo = form.addField('custpage_docno', 'text', 'Order #');
			DocNo.setDefaultValue(docNo);
			DocNo.setDisplayType('inline');
			
			
			
			var Assembly = form.addField('custpage_assembly', 'select', 'Assembly','item');
			Assembly.setDefaultValue(assemblyItem);
			Assembly.setDisplayType('inline');
			
			var Date = form.addField('custpage_date','date','Date');
			Date.setDefaultValue(trandate);
			Date.setDisplayType('inline');
			
			var Entity = form.addField('custpage_customer','select','Customer','çustomer');
			Entity.setDefaultValue(cust);
			Entity.setDisplayType('inline');
			
			
			var SubsiD = form.addField('custpage_subsi','select','Subsidiary','subsidiary');
			SubsiD.setDefaultValue(subsi);
			SubsiD.setDisplayType('inline');
			
			var LOC = form.addField('custpage_loc','select','Location','location');
			LOC.setDefaultValue(locTo);
			LOC.setDisplayType('inline');
			
			 var orderstatus = prodObj.getFieldValue('orderstatus');
			 nlapiLogExecution('DEBUG', 'aftr submit', "  orderstatus  ==" +orderstatus);
			 	
	        
			
			 var PRlinecount=prodObj.getLineItemCount('item');
			 nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
			  
				var ItemSublist = form.addSubList('custpage_sig_req_sublist','list','Item','custpage_sample_tab');
				
				ItemSublist.addField('custpage_item','select','Item','item').setDisplayType('inline');
				ItemSublist.addField('custpage_qty','float','Quantity').setDisplayType('inline');
				ItemSublist.addField('custpage_clss','select', 'Class','classification').setDisplayType('inline');
				var locationField = ItemSublist.addField('custpage_fromloc', 'select', 'From Location');
				ItemSublist.addField('custpage_toloc', 'select', 'To Location','location').setDisplayType('inline');
				 
				locationField.addSelectOption('',' ');
				locationField.setDisplayType('entry')
				populateLocationList(locationField,subsi);
				
				var count =0;
		    	var n=1;
				for(var i=1;i<=PRlinecount;i++)
				{
					
					var itemid =prodObj.getLineItemValue('item','item',i);
	            	
					//nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
					
					var BackOrderQty =prodObj.getLineItemValue('item','quantitybackordered',i);
		        	
					var typeItem =prodObj.getLineItemValue('item','custcol_item_type',i);
					
					var cls =prodObj.getLineItemValue('item','class',i);
		        	
					if((BackOrderQty != null && BackOrderQty != undefined && BackOrderQty != '' && BackOrderQty > 0) && (typeItem !='Assembly'))
					{
					
						//nlapiLogExecution('DEBUG', 'aftr submit', "  i  ==" + i);
						
						
						 ItemSublist.setLineItemValue('custpage_item',n,itemid);
						 ItemSublist.setLineItemValue('custpage_qty',n,BackOrderQty);
						 ItemSublist.setLineItemValue('custpage_clss',n,cls);
						 ItemSublist.setLineItemValue('custpage_toloc',n,locTo);
						
		            	         n++;
		            	         count++;
		            	//===========================================================================
					}
					
					else if((BackOrderQty != null && BackOrderQty != undefined && BackOrderQty != '' && BackOrderQty > 0) && (typeItem =='Assembly/Bill of Materials'))
					{
						//nlapiLogExecution('DEBUG', 'aftr submit', "  i  ==" + i);
						
						//nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
						
						
					     ItemSublist.setLineItemValue('custpage_item',n,itemid);
						 ItemSublist.setLineItemValue('custpage_qty',n,BackOrderQty);
						 ItemSublist.setLineItemValue('custpage_clss',n,cls);
						 ItemSublist.setLineItemValue('custpage_toloc',n,locTo);
						
						 n++;
						 count++;
		            	//===========================================================================
					}
				} 
		    
				
		    
		    form.addButton('custombutton1','Reset','refresh();');
		    
		    if(count > 0){
		    	var createRec = form.addSubmitButton('Submit'); 
				
		    }
			
			response.writePage(form);  
		}
		catch(e)
	    {
			nlapiLogExecution('DEBUG','TransferIssueScreen', "Log Error = " +e);
	    }
	}
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST   ");
		 
		 var RecID =request.getParameter('custpage_recid');
		 
         var CustomerName =request.getParameter('custpage_customer');
		 
		 var subsidiary =request.getParameter('custpage_subsi');
			
		 var docNum =request.getParameter('custpage_docno');
		 
		 var Assemb =request.getParameter('custpage_assembly');
		 
		 var Date =request.getParameter('custpage_date');//custpage_loc
		 
		 var location =request.getParameter('custpage_loc');//custpage_loc
		 
		 var count = request.getLineItemCount('custpage_sig_req_sublist');
		 
		 var uniqFromLocArr =[];
		 var filter_Loc =[];
		 var uniueLoc=[];
		
		 for(var i=1; i< count+1; i++)
		  {
			  var fromLoc = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_fromloc', i);
		      uniqFromLocArr.push(fromLoc);
		  }
		 
		    filter_Loc = filter_array(uniqFromLocArr);
			nlapiLogExecution('DEBUG','SalesPerson Inventroy','filter_Loc =='+filter_Loc);
			
			uniueLoc = removeDuplicates(filter_Loc);
			nlapiLogExecution('DEBUG','SalesPerson Inventroy','uniueLoc =='+uniueLoc);
			
			var TOarr =[];
			
			if(uniueLoc != null & uniueLoc != undefined && uniueLoc !='')
			{
				for(var j=0;j<uniueLoc.length;j++)
				{
					 var record = nlapiCreateRecord('transferorder', {recordmode: 'dynamic'}); 
					   
					    
					 	if(Date != '' && Date != 'undefined' && Date != null)
					 	{
					 		record.setFieldValue('trandate',Date);
					 	}

					 	if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
					 	{
					 		record.setFieldValue('subsidiary',subsidiary);
					 	}
					 	
					 	if(uniueLoc[j] != '' && uniueLoc[j] != 'undefined' && uniueLoc[j] != null)
					 	{
					        record.setFieldValue('location',uniueLoc[j]);
					   
					 	}

					 	
					 	if(location != '' && location != 'undefined' && location != null)
					 	{
					        record.setFieldValue('transferlocation',location);
					   
					 	}


					 	var usr =nlapiGetUser();
					 	record.setFieldValue('employee',usr);//custbody_workorder_trans_id
					 	
					   record.setFieldValue('custbody_workorder_trans_id',RecID);
					
					   record.setFieldValue('useitemcostastransfercost','T');
					
					  for(var i1=1; i1< count+1; i1++)
					  {
						  var LineFrmloc =request.getLineItemValue('custpage_sig_req_sublist','custpage_fromloc', i1);
						  if(LineFrmloc == uniueLoc[j])
						  {
							  var avail_price = 0.00;
				 				 
							  var item = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_item', i1);
							  
							  var Qty = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_qty', i1);
							     record.selectNewLineItem('item');

							    record.setCurrentLineItemValue('item', 'item',item );   
							    nlapiLogExecution("DEBUG","In Create Function","item done=="+item);
							    
							  
							    record.setCurrentLineItemValue('item', 'quantity',Qty);                              
							    nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
							    
							    
							    if(item!=null && item != '' && LineFrmloc != null && LineFrmloc !='' )
					 			  {
					 				 
					 				 var columns = new Array();
					 				 columns[0] = new nlobjSearchColumn('locationquantityavailable');
					 			
					 				 nlapiLogExecution("DEBUG","In Create Function"," Rate Check Condition==");
					 				 
					 				 var filters = new Array();
					 				 filters[0] = new nlobjSearchFilter ('internalid', null, 'anyof',item);
					 				 filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',LineFrmloc);
					 	     		 var searchresults = nlapiSearchRecord('item','customsearch318_2',filters,columns);//customsearch_item_search_so_po
					 	     		 
					 	     		// alert('searchresults='+searchresults)
						 	     		if(searchresults != null)
						 	  	    	{
						 		  			for (var i = 0;  i < searchresults.length; i++) 
						 		  			{
						 		  			   avail_price = searchresults[i].getValue('locationaveragecost');
						 		               
						 		  			 }
						 		  				
						 	  		    }	
					 	           }
							    
							      
					 	    	  if(avail_price != null && avail_price != undefined && avail_price !='')
				 			    	{
					 	    		 nlapiLogExecution("DEBUG","In Create Function"," Rate not null done=="+avail_price);
										
					 	    		 record.setCurrentLineItemValue('item','rate',parseFloat(avail_price));
				 			    	   
				 			    	}
						            else
						             {
						            	 nlapiLogExecution("DEBUG","In Create Function"," Rate null done=="+avail_price);
						            	 avail_price=0.00;
						            	record.setCurrentLineItemValue('item','rate',parseFloat(avail_price));
						 			    	  
						             }
							    
							    
							     record.commitLineItem('item');
							    nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
						  }
					  }
					  
					     var SubmitIt = nlapiSubmitRecord(record);  
					 	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
					 	TOarr.push(SubmitIt);	 
				}
			}
		 
			nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "TOarr "+TOarr);
			 
	        nlapiSubmitField('workorder',RecID,'custbody_trans_issue_multi',TOarr);
			response.sendRedirect('RECORD', 'workorder', RecID, false,'view');
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
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


function filter_array(test_array) 
{
	 var index = -1,
	 arr_length = test_array ? test_array.length : 0,
	 resIndex = -1,
	 result = [];

	 while (++index < arr_length) 
	 {
		 var value = test_array[index];
		 if(value)
		 {
			result[++resIndex] = value;
		  }
	 }
return result;
}



function removeDuplicates(num) 
{
	  var x,
		  len=num.length,
		  out=[],
		  obj={};
	 
	  for (x=0; x<len; x++) 
	  {
		obj[num[x]]=0;
	  }
	  for (x in obj) 
	  {
		out.push(x);
	  }
	  return out;
	}
	

function populateLocationList(locationField,subsi)
{
	
	nlapiLogExecution('DEBUG','populateLocationList', " locationField  ");	
	var filters = new Array();
	var column = new Array();
	
	filters[0] = new nlobjSearchFilter('subsidiary', null, 'anyof', subsi);
	
	column[0] = new nlobjSearchColumn('internalid')
	column[1] = new nlobjSearchColumn('name')
	
	var loc_s_searchresult = nlapiSearchRecord('location', null, filters, column)
	
	if (loc_s_searchresult != null && loc_s_searchresult != '' && loc_s_searchresult != undefined) {
	
	//	nlapiLogExecution('DEBUG', 'pupulate location', 'loc_s_searchresult--->' + loc_s_searchresult)
		
		for (var i = 0; i < loc_s_searchresult.length; i++) 
		{
		
			locationField.addSelectOption(loc_s_searchresult[i].getValue('internalid'), loc_s_searchresult[i].getValue('name'))
			
		}
	}
}
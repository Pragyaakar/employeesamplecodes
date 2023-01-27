function itemScreen(request,response)
{
	nlapiLogExecution('DEBUG','crestaApprovalScreen', "Request Method = " +request.getMethod());
	  
	if(request.getMethod() == 'GET')
	{
		try
		{
			var form = nlapiCreateForm("Discount Master Items");
			
			form.setScript('customscript_mark_and_unmark');
			
			/*var recID = request.getParameter('rec_id');
			var subsi = request.getParameter('subsiID');
			var cust = request.getParameter('cust_id');
			
			var start = request.getParameter('startDate');
			 
		    var end = request.getParameter('enddate');
			 
			nlapiLogExecution('debug','Search Values','subsi := '+ subsi + 'cust := ' + cust + 'start : = ' + start + 'end := ' + end);
			*/
			 
			var subsidiary = form.addField('custpage_subsidiary1', 'select', 'SUBSIDIARY', 'subsidiary');
			//subsidiary.setMandatory(true);
			
			var startDateField = form.addField('custpage_start','date','Start Date');
			/*var startdate = nlapiStringToDate(start);
			if(startdate != null && startdate != '' && startdate != undefined)
			{
				startDateField.setDefaultValue(startdate);
			}*/
			
			var endDateField = form.addField('custpage_end','date','End Date');
			/*var enddate = nlapiStringToDate(end);
			if(enddate != null && enddate != '' && enddate != undefined)
			{
				endDateField.setDefaultValue(enddate);
			}*/
			
			var customer = form.addField('custpage_customer','multiselect','CUSTOMER');
			customer.setMandatory(true);
			
			//customer.addSelectOption('-1','');
			
			var bodyDiscount = form.addField('custpage_body_disc','text','DISCOUNT');
			
			var ItemSublist = form.addSubList('custpage_sig_req_sublist','list','Item','custpage_sample_tab');
			ItemSublist.addField('custpage_chechbox','checkbox');
			ItemSublist.addField('custpage_item','select','Item','ITEM').setDisplayType('disabled');
			ItemSublist.addField('custpage_subsidiary','select', 'SUBSIDIARY','subsidiary').setDisplayType('inline');
			ItemSublist.addField('custpage_line_disc', 'text', 'Discount').setDisplayType('entry');
			//ItemSublist.addField('custpage_price_level','select', 'PRICE LEVEL','pricelevel').setDisplayType('inline');
			//ItemSublist.addField('custpage_pricing_amount','float', 'PRICEING AMOUNT');
				
			var newSubsi = request.getParameter('custpage_subsidiary1');
			

			if(newSubsi != null && newSubsi != '' && newSubsi != undefined)
			{
				subsidiary.setDefaultValue(newSubsi);
				
				var filters=[];
				filters[0]= new nlobjSearchFilter('internalid','msesubsidiary','anyof',newSubsi);
				var Column=[];
				 Column[0]= new nlobjSearchColumn('internalid');
				 Column[1]= new nlobjSearchColumn('altname');
			
				var searchResults = nlapiSearchRecord('customer','customsearch_customersearch_disc_master',filters,Column);
				for(result in searchResults)
			    {	
					customer.addSelectOption(searchResults[result].getValue('internalid'), searchResults[result].getValue('altname'));
				
			    }
				
					
				var filters = new Array();
				filters[0] = new nlobjSearchFilter("subsidiary",null,"anyof",newSubsi);
				
				var columns = new Array();
				columns[0] = new nlobjSearchColumn("itemid"); 
				columns[1] = new nlobjSearchColumn("displayname");
				columns[2] = new nlobjSearchColumn("baseprice"); 
				columns[3] = new nlobjSearchColumn("type"); 
				columns[4] = new nlobjSearchColumn("custitem1"); 
				columns[5] = new nlobjSearchColumn("custitem_is_lot_item"); 
				columns[6] = new nlobjSearchColumn("custitem_item_category"); 
				columns[7] = new nlobjSearchColumn("subsidiary"); 
				//columns[8] = new nlobjSearchColumn("unitprice","pricing",null); 
				//columns[9] = new nlobjSearchColumn("pricelevel","pricing",null); 
				
				var results = getSavedSearchResult(null, 'customsearch_assembly_items', filters);
				nlapiLogExecution('DEBUG', 'Priority Check', 'results.length  :' + results.length );
				
				for (var i = 1; i <= results.length; i++) 
				{ 
					ItemSublist.setLineItemValue('custpage_item', i, results[i-1].getValue("internalid"));			
					ItemSublist.setLineItemValue('custpage_subsidiary', i, results[i-1].getValue('subsidiary'));
					//ItemSublist.setLineItemValue('custpage_pricing_amount', i, results[i-1].getValue("unitprice","pricing",null));
					//ItemSublist.setLineItemValue('custpage_price_level', i, results[i-1].getValue("pricelevel","pricing",null));
				}
			}
			
			//nlapiLogExecution('debug','Search Values','startDate_obj := '+ startDate_obj + 'enddate_obj := ' + enddate_obj);
			
			var list = form.getSubList("item");
		    form.addButton('custpage_markmark','Mark all','markall();');  //markall(); is function name from the client script
		    form.addButton('custpage_unmarkmark','Unmark all','unmarkall();');
		    
		    form.addButton('custombutton1','Reset','refresh();');
		    
			var createRec = form.addSubmitButton('Submit'); 
			
			response.writePage(form);  
		}
		catch(e)
	    {
			nlapiLogExecution('DEBUG','crestaApprovalScreen', "Log Error = " +e);
	    }
	}
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST   ");
		 
		 var suitItemArray = new Array();
		 var suitSubsiArray = new Array();
		 var lineDiscArray = new Array();
		 
		 var startDate = request.getParameter('custpage_start');
		 //nlapiLogExecution('DEBUG','SalesPerson Inventroy','startDate ==' + startDate);
		 
		 var EndDate = request.getParameter('custpage_end');
		 //nlapiLogExecution('DEBUG','SalesPerson Inventroy','EndDate ==' + EndDate);
		 
		 var customer = request.getParameter('custpage_customer');
		 //nlapiLogExecution('DEBUG','SalesPerson Inventroy','customer ==' + customer);
		 
		 var discount = request.getParameter('custpage_body_disc');
		 //nlapiLogExecution('DEBUG','SalesPerson Inventroy','discount ==' + discount);
		 
		 var suiteletCount = request.getLineItemCount('custpage_sig_req_sublist');
		 nlapiLogExecution('DEBUG','SalesPerson in POST', "suiteletCount   "+suiteletCount);
		 
		 for(var j=1;j<=suiteletCount;j++)//suiteletCount
		 {
			 var checkBox = request.getLineItemValue('custpage_sig_req_sublist','custpage_chechbox',j);
			// nlapiLogExecution('DEBUG', 'Acct', 'checkBox = ' + checkBox);
			 
			 if(checkBox == 'T')
			 {
				 var suitItem = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',j);
				 suitItemArray.push(suitItem);
				 //nlapiLogExecution('DEBUG', 'Acct', 'suitItem = ' + suitItem);
				 
				 var suitSubsi = request.getLineItemValue('custpage_sig_req_sublist','custpage_subsidiary',j);
				 suitSubsiArray.push(suitSubsi);
				 //nlapiLogExecution('DEBUG', 'Acct', 'suitSubsi = ' + suitSubsi);
				 
				 var lineDisc = request.getLineItemValue('custpage_sig_req_sublist','custpage_line_disc',j);
				 lineDiscArray.push(lineDisc);
				 //nlapiLogExecution('DEBUG', 'Acct', 'lineDisc = ' + lineDisc);
			 }
		 }
		 
		 var customrecord_discount_masterSearch = nlapiSearchRecord("customrecord_discount_master","customsearch506",
				 [
				    ["custrecord_customer.internalid","anyof",customer]
				 ], 
				 [
				    new nlobjSearchColumn("id").setSort(false), 
				    new nlobjSearchColumn("scriptid"), 
				    new nlobjSearchColumn("custrecord_startdate"), 
				    new nlobjSearchColumn("custrecord_enddate"), 
				    new nlobjSearchColumn("custrecord_customer"), 
				    new nlobjSearchColumn("custrecord_discount")
				 ]
				 );
		 
		 if(customrecord_discount_masterSearch != null && customrecord_discount_masterSearch != undefined)
		 {
			 var RecordID = customrecord_discount_masterSearch[0].getValue("id");
			
			 UpdateDiscountMaster(RecordID,startDate,EndDate,customer,discount,suiteletCount,checkBox,suitItemArray,suitSubsiArray,lineDiscArray);
			 
		 }
		 else
		 {
			 var setSuitVal = CreateDiscountMaster(startDate,EndDate,customer,discount,suiteletCount,checkBox,suitItemArray,suitSubsiArray,lineDiscArray);
				 
		 }
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}

function CreateDiscountMaster(startDate,EndDate,customer,discount,suiteletCount,checkBox,suitItemArray,suitSubsiArray,lineDiscArray)
{
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "New REcord Creation" );
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "startDate -- > " + startDate + 'EndDate -- > ' + EndDate + ' customer -- > ' + customer);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "checkBox -- > " + checkBox);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "suitItemArray -- > " + suitItemArray);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "suitSubsiArray -- > " + suitSubsiArray);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "lineDiscArray -- > " + lineDiscArray);
	
	var o_b2cObj = nlapiCreateRecord('customrecord_discount_master',{recordmode: 'dynamic'});
	
	var lineCount = o_b2cObj.getLineItemCount('recmachcustrecord_discount_header');
	
	o_b2cObj.setFieldValue('custrecord_startdate',startDate);
	o_b2cObj.setFieldValue('custrecord_enddate',EndDate);
	o_b2cObj.setFieldValue('custrecord_customer',customer);//subsidiary
	o_b2cObj.setFieldValue('custrecord_discount',discount);
	
	if(suitItemArray != null)
	{
		for(var t=1;t<=suitItemArray.length;t++)
		{
			o_b2cObj.selectNewLineItem('recmachcustrecord_discount_header');
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_item',suitItemArray[t-1]);
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + itemid);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_subsidiary',suitSubsiArray[t-1]);
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Date done ==" +date);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate',lineDiscArray[t-1]);
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "subsidiary done ==" +subsidiary);
			
			o_b2cObj.commitLineItem('recmachcustrecord_discount_header');
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
		}
	}
	
	//
	var record =  nlapiSubmitRecord(o_b2cObj,true);
	nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)
	nlapiSetRedirectURL('RECORD','customrecord_discount_master',record,'VIEW');
	
}

function  UpdateDiscountMaster(RecordID,startDate,EndDate,customer,discount,suiteletCount,checkBox,suitItemArray,suitSubsiArray,lineDiscArray)
{
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "New REcord Creation" );
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "startDate -- > " + startDate + 'EndDate -- > ' + EndDate + ' customer -- > ' + customer);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "checkBox -- > " + checkBox);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "suitItemArray -- > " + suitItemArray);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "suitSubsiArray -- > " + suitSubsiArray);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "lineDiscArray -- > " + lineDiscArray);
	
	var o_b2cObj = nlapiLoadRecord('customrecord_discount_master',RecordID);
	
	var lineCount = o_b2cObj.getLineItemCount('recmachcustrecord_discount_header');
	
	o_b2cObj.setFieldValue('custrecord_startdate',startDate);
	o_b2cObj.setFieldValue('custrecord_enddate',EndDate);
	//o_b2cObj.setFieldValue('custrecord_customer',customer);//subsidiary
	o_b2cObj.setFieldValue('custrecord_discount',discount);
	
	if(suitItemArray != null)
	{
		for(var t=1;t<=suitItemArray.length;t++)
		{
			o_b2cObj.selectNewLineItem('recmachcustrecord_discount_header');
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_item',suitItemArray[t-1]);
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + itemid);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_subsidiary',suitSubsiArray[t-1]);
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Date done ==" +date);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord_discount_header','custrecord_discount_rate',lineDiscArray[t-1]);
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "subsidiary done ==" +subsidiary);
			
			o_b2cObj.commitLineItem('recmachcustrecord_discount_header');
			//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
		}
	}
	
	//
	var record =  nlapiSubmitRecord(o_b2cObj,true);
	nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)
	nlapiSetRedirectURL('RECORD','customrecord_discount_master',record,'VIEW');
	
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


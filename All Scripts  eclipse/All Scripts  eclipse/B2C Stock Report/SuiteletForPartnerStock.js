/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       19 Jul 2019     Priyanka Patil
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suiteletPartnerStock(request, response)
{
	if(request.getMethod() == 'GET')
	{
		var form = nlapiCreateForm("Partner Stock Tracking");
		form.setScript('customscript_clt_validation_salesperson');
		
		var customer = form.addField('custpage_customer','select','Customer Name','customer').setDisplayType('disabled');
		var date = form.addField('custpage_date', 'date', 'Date');
		
		var user =nlapiGetUser();
		nlapiLogExecution('debug','Search Values','user := '+user);
     
		customer.setDefaultValue(user);
		
		var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Item');
		ItemSublist.addField('custpage_item','select','ITEM','item');
		ItemSublist.addField('custpage_qtysold','float','Quantity Sold').setDisplayType('entry');
	
		//form.setScript('customscript_clt_validation_salesperson');
		ItemSublist.setLineItemValue('custpage_item',1,-1);
		ItemSublist.setLineItemValue('custpage_qtysold',1,0);
		
		form.addSubmitButton('Submit');
		form.addButton('cancel','Cancel','window.close();');
		response.writePage(form);	
	 }
	
	if(request.getMethod() == 'POST')
	 {
			 nlapiLogExecution('DEBUG','SalesPerson in POST', "in POST   ");
			 
			 var suiteletCount = request.getLineItemCount('custpage_sig_req_sublist');
			 nlapiLogExecution('DEBUG','SalesPerson in POST', "suiteletCount   "+suiteletCount);
			 
			 var itemArray = new Array();
			 var soldqtyArray = new Array();
			 
			 var recCustomer = request.getParameter('custpage_customer');
			 nlapiLogExecution('DEBUG','SalesPerson in POST', "recCustomer   "+recCustomer);
			 
			 var recDate = request.getParameter('custpage_date');
			 nlapiLogExecution('DEBUG','SalesPerson in POST', "recDate   "+recDate);
			 
			
				
				for(var i=1;i<=suiteletCount;i++)
				{ 
			    	var item = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',i);
			    	itemArray.push(item);
			    	nlapiLogExecution('DEBUG','B2CStock',"item  ==" + item);
					
			    	var soldqty = request.getLineItemValue('custpage_sig_req_sublist','custpage_qtysold',i);
			    	soldqtyArray.push(soldqty);
			    	nlapiLogExecution('DEBUG','B2CStock',"Sold qty  ==" + soldqty);
			    	
			    	 var filter = new Array();
					 filter[0] = new nlobjSearchFilter('type',null,'anyof','ItemShip');
					 filter[1] = new nlobjSearchFilter('trandate',null,'on','today');
					 filter[2] = new nlobjSearchFilter('mainline',null,'is','T');
					 filter[3] = new nlobjSearchFilter('item',null,'is',item);
					 
					 var column = new Array();
					 column[0] = new nlobjSearchColumn("tranid"); 
					 column[1] = new nlobjSearchColumn("item"); 
					 column[2] = new nlobjSearchColumn("quantity"); 
					 column[3] = new nlobjSearchColumn("createdfrom"); 
					 column[4] = new nlobjSearchColumn("trandate"); 
					 column[5] = new nlobjSearchColumn("internalid");
					
					 var searchResults = nlapiSearchRecord('transaction','customsearch233',filter,column);
					 
					 for(var q=0;q<searchResults.length;q++)
					 {
						 var IF_item = searchResults[q].getValue("item");
						 IF_itemArray.push(IF_item);
						 nlapiLogExecution('DEBUG','B2CStock',"IF_item  ==" + IF_item);
						 
						 var IF_quatntity = searchResults[q].getValue("quantity");
						 IF_quatntityArray.push(IF_quatntity);
						 nlapiLogExecution('DEBUG','B2CStock',"IF_quatntity  ==" + IF_quatntity);
								
							 
					    	var transResult = findTransaction(IF_item)
					    	nlapiLogExecution('DEBUG','B2CStock',"transResult  ==" + transResult);
							
					    	if(transResult != null && transResult != '' && transResult != undefined)
					    	{
					    		for(var m=0;m<transResult.length;m++)
					    		{
					    			nlapiLogExecution('DEBUG','B2CStock',"transResult.length  ==" + transResult.length);
					    			
					    			var intId = transResult[m].getValue('id');
									nlapiLogExecution('DEBUG','B2CStock',"intId  ==" + intId);
					    		}
					    		
								creatingTheCustRecordAlready(recCustomer,recDate,IF_item,soldqty,intId)
		
					    	}
					 }
			    
			   }
	  }
}

function creatingTheCustRecordAlready(recCustomer,recDate,IF_item,soldqtyArray,intId)
{
	nlapiLogExecution('DEBUG','B2CStock',"recCustomer  ==" + recCustomer);
	nlapiLogExecution('DEBUG','B2CStock',"recDate  ==" + recDate);
	nlapiLogExecution('DEBUG','B2CStock',"IF_item  ==" + IF_item);
    nlapiLogExecution('DEBUG','B2CStock',"soldqtyArray  ==" + soldqtyArray);
    nlapiLogExecution('DEBUG','B2CStock',"intId  ==" + intId);
	
 	 
	var o_b2cObj = nlapiLoadRecord('customrecord_b2c_partner_stock_detail',intId);//,{recordmode: 'dynamic'}
		
	nlapiLogExecution('DEBUG','B2CStock',"o_b2cObj  ==" + o_b2cObj);
	
 	//o_b2cObj.setFieldValue('custrecord_b2c_partner_name',recCustomer);
 	o_b2cObj.setFieldValue('custrecord_date',recDate);
 	o_b2cObj.setFieldValue('custrecord_b2c_partner_name',recCustomer);
		
 	nlapiLogExecution('DEBUG','SalesPerson in POST', "recDate1  done "+recDate);
	 
 	var suiteletCount1 = request.getLineItemCount('custpage_sig_req_sublist');
	nlapiLogExecution('DEBUG','SalesPerson in POST', "suiteletCount1   "+suiteletCount1);
	 
 	for(k=1; k<=suiteletCount1; k++)
 	{
 		var sold_qty = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_sold',k);
 		nlapiLogExecution('DEBUG','SalesPerson in POST', "sold_qty   "+sold_qty);
 		
 		var opening_Stock = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_opening_stock',k);
 		nlapiLogExecution('DEBUG','SalesPerson in POST', "opening_Stock   "+opening_Stock);
 		
 		var alreadyQtyOn_Hand = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_on_hand',k);
 		nlapiLogExecution('DEBUG','SalesPerson in POST', "alreadyQtyOn_Hand   "+alreadyQtyOn_Hand);
 		
 		var valueBased_fulfill = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_fulfillment_price',k);
 		nlapiLogExecution('DEBUG','SalesPerson in POST', "valueBased_fulfill   "+valueBased_fulfill);
 		
 		var alreadyRemainQty = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_remain',k);
 		nlapiLogExecution('DEBUG','SalesPerson in POST', "alreadyRemainQty   "+alreadyRemainQty);
 		
 		if(alreadyRemainQty != null && alreadyRemainQty != '' && alreadyRemainQty != undefined)
 		{
 			var newRemainqty = parseFloat(alreadyQtyOn_Hand) - parseFloat(opening_Stock); 
 		}
 		else
 		{
 			alreadyRemainQty = 0;
 			var newRemainqty = parseFloat(alreadyQtyOn_Hand) - parseFloat(sold_qty); 
 		}
 		
		 o_b2cObj.selectLineItem('recmachcustrecord2',k);
		 
	     o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',IF_item);
	     nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + IF_item);
	    
	     o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_sold',soldqtyArray);
	     nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "soldqty done ==" + soldqtyArray);
	     
	     o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',opening_Stock);
	     nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "opening_Stock done ==" + opening_Stock);
	     
	     o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_on_hand',alreadyQtyOn_Hand);
	     nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "alreadyQtyOn_Hand done ==" + alreadyQtyOn_Hand);
	     
	     o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',newRemainqty);
	     nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "newRemainqty done ==" + newRemainqty);
	     
	     o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_fulfillment_price',valueBased_fulfill);
	     nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "valueBased_fulfill done ==" + valueBased_fulfill);
	    	
	     o_b2cObj.commitLineItem('recmachcustrecord2');
	     nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
 	}
     //var record =  nlapiSubmitRecord(o_b2cObj);
     //nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)
     
     //response.sendRedirect('RECORD', 'customrecord_b2c_partner_stock_detail', record, false,'view');
}




function findTransaction(itmid)
{
	var searchId ='customsearch231';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	
	// filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',createdFrom);
	 //filters[1]=new nlobjSearchFilter('location',null,'anyOf',locL);
	 filters[0]=new nlobjSearchFilter('custrecord_item','custrecord2','anyOf',itmid);
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
	    	   nlapiLogExecution('DEBUG','searchid','searchid for findTransaction'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;

} 


function findTransactionForAlready(recDate,item,recCustomer)
{
	var searchId ='customsearch233';	
	var savedSearch = nlapiLoadSearch(null,searchId); 

	var filters=new Array();
	filters[0] = new nlobjSearchFilter("trandate",null,"on",recDate);
	filters[1] = new nlobjSearchFilter("mainline",null,"is",'T');
	filters[2] = new nlobjSearchFilter("trandate",null,"on",'yesterday');
	
	savedSearch.addFilters(filters);
	   
	    var resultset = savedSearch.runSearch();
		var returnSearchResults = [];
	    var searchid = 0;
	    do {
    	
	        var resultslice = resultset.getResults(searchid, searchid + 1000);
	        if(resultslice!= null)
	        {
	    	   for (var rs in resultslice) 
		        {
		        	returnSearchResults.push(resultslice[rs]);
		            searchid++;
		        }
	    	   nlapiLogExecution('DEBUG','searchid','searchid For findTransactionForAlready'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;
} 


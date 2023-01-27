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
		form.setScript('customscript_client_to_filter_via_date');
		
		var customer = form.addField('custpage_customer','select','Customer Name','customer').setDisplayType('disabled');
		var date = form.addField('custpage_date', 'date', 'Date');
		
		var user =nlapiGetUser();
		nlapiLogExecution('debug','Search Values','user := '+user);
     
		customer.setDefaultValue(user);
		
		
		var usrDate= request.getParameter('custpage_date');
		
		
		var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Item');
		ItemSublist.addMarkAllButtons(); 
		ItemSublist.addField('custpage_chechbox','checkbox'); 
		ItemSublist.addField('custpage_item','select','ITEM','item').setDisplayType('inline');
		ItemSublist.addField('custpage_subsi','select','Subsidiary','subsidiary').setDisplayType('inline');
		ItemSublist.addField('custpage_avail','float','Quantity Available');
		ItemSublist.addField('custpage_valuecomp','float','Available').setDisplayType('hidden');
		ItemSublist.addField('custpage_qtysold','Integer','Quantity Sold').setDisplayType('entry');
	
		var searchId='customsearchbtoc_linelevel';
		var suiteletResult = findTransaction(searchId,user,usrDate);
		
		if(suiteletResult!='' && suiteletResult!= null && suiteletResult !='undefined')
		{
			nlapiLogExecution('DEBUG','suiteletResult length','suiteletResult length=='+suiteletResult.length);	    
			for(var i=1;i<=suiteletResult.length;i++)//resultSet.length
				{
					var columns = suiteletResult[i-1].getAllColumns();
				
					var itemid= suiteletResult[i-1].getValue(columns[2]);
					
					var OpeningQty= suiteletResult[i-1].getValue(columns[4]);
					var OnHandQty= suiteletResult[i-1].getValue(columns[5]);
					
					var subsidiary= suiteletResult[i-1].getValue(columns[9]);
					
				    var QtyAvailable = suiteletResult[i-1].getValue(columns[6]);
				    
				    ItemSublist.setLineItemValue('custpage_chechbox',i,'T');
				    ItemSublist.setLineItemValue('custpage_item',i,itemid);
					ItemSublist.setLineItemValue('custpage_subsi',i,subsidiary);
					ItemSublist.setLineItemValue('custpage_avail',i,QtyAvailable);
					ItemSublist.setLineItemValue('custpage_valuecomp',i,QtyAvailable);
					ItemSublist.setLineItemValue('custpage_qtysold',i,parseInt(0));
				  
		         }
		 }
		
		date.setDefaultValue(usrDate);
			
		
		form.addSubmitButton('Submit');
		form.addButton('cancel','Cancel','window.close();');
		response.writePage(form);	
	 }
	
	else if(request.getMethod() == 'POST')
	 {
			 nlapiLogExecution('DEBUG','SalesPerson in POST', "in POST   ");
			 
			 var suiteletCount = request.getLineItemCount('custpage_sig_req_sublist');
			 nlapiLogExecution('DEBUG','SalesPerson in POST', "suiteletCount   "+suiteletCount);
			 
			 var itemArray = new Array();
			 var soldqtyArray = new Array();
			 
			 var recCustomer = request.getParameter('custpage_customer');
			 nlapiLogExecution('DEBUG','b2c in POST', "recCustomer   "+recCustomer);
			 
			 var recDate = request.getParameter('custpage_date');
			 nlapiLogExecution('DEBUG','b2c in POST', "recDate   "+recDate);
			 
			
			 var lineCount=0;
				
				for(var i=1;i<=suiteletCount;i++)
				{ 
					
					 var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
					 
					 nlapiLogExecution('DEBUG','B2CStock',"checkMark  ==" + checkMark);
					  
					if(checkMark == 'T')
					{
						//lineCount++;
				    	var itemid = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',i);
				    	
				    	nlapiLogExecution('DEBUG','B2CStock',"item  ==" + itemid);
						
				    	var soldqty = request.getLineItemValue('custpage_sig_req_sublist','custpage_qtysold',i);
				    	
				    	nlapiLogExecution('DEBUG','B2CStock',"Sold qty  ==" + soldqty);
				    	
				    	var subsidiary =request.getLineItemValue('custpage_sig_req_sublist','custpage_subsi',i);
				    	
				    	
				    	var transResult = findTransactionForAlready(itemid,recCustomer,recDate)
				    	nlapiLogExecution('DEBUG','B2CStock',"transResult  ==" + transResult);
						
				    		if(transResult != null && transResult != '' && transResult != undefined)
					    	{
					    		for(var m=0;m<transResult.length;m++)
					    		{
					    			var intId =transResult[m].getValue('id');
									nlapiLogExecution('DEBUG','B2CStock',"intId  ==" + intId);
					    		}
					    		
								creatingTheCustRecordAlready(recCustomer,intId,recDate,itemid,soldqty,subsidiary)
			
					    	 }
					 }
			    	}
			    
			   }
	  
}

function creatingTheCustRecordAlready(recCustomer,intId,recDate,itemid,soldqty,subsidiary)
{
	//===================================================== START ============================
	

	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Already Rec LOAD n SET=" );
	

	
	var o_b2cObj = nlapiLoadRecord('customrecord_b2c_partner_stock_detail',intId);
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "o_b2cObj ="+o_b2cObj );
	
	var lineCount = o_b2cObj.getLineItemCount('recmachcustrecord2');
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "lineCount=="+lineCount );
	
		for(var p=1;p<=lineCount;p++)
		{
			var itmRec = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_item',p);
			
			nlapiLogExecution('DEBUG', 'set values in CustomRecord', "itmRec=="+itmRec);
			nlapiLogExecution('DEBUG', 'set values in CustomRecord', "itemid=="+itemid);
			
			if(itmRec == itemid)
			{
				var alreadyStoc = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_opening_stock',p);
				
				if(alreadyStoc != null && alreadyStoc != '' && alreadyStoc != undefined)
				{
					var openStock = parseFloat(alreadyStoc);
				}
				else
				{
					alreadyStoc = 0;
					var openStock =parseFloat(alreadyStoc);
				}	
				
		
				
				var CogsAmountCustom = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_fulfillment_price',p);
				if(CogsAmountCustom != null && CogsAmountCustom != '' && CogsAmountCustom != undefined && CogsAmountCustom > 0)
				{
					var newCogsAmountCustom = parseFloat(CogsAmountCustom);
				}
				else if(CogsAmountCustom != null && CogsAmountCustom != '' && CogsAmountCustom != undefined && CogsAmountCustom < 0)
				{
					var newCogsAmountCustom = parseFloat(-CogsAmountCustom);
				}
				else
				{
					var newCogsAmountCustom = 0;
				}
				
				var alreadyQtyOn_Hand = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_on_hand',p);
				if(alreadyQtyOn_Hand != null && alreadyQtyOn_Hand != '' && alreadyQtyOn_Hand != undefined)
				{
					var newQtyOn_Hand = parseFloat(alreadyQtyOn_Hand);
				}
				else
				{
					alreadyQtyOn_Hand = 0;
					var newQtyOn_Hand = parseFloat(alreadyQtyOn_Hand);
				}
				
				
				var QtyToSold = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_sold',p);
				if(QtyToSold != null && QtyToSold != '' && QtyToSold != undefined)
				{
					var QtyToSold = parseFloat(soldqty);
				}
				else
				{
					QtyToSold = 0;
				    parseFloat(soldqty)
				}	
				
				
	
				var alreadyRemainQty = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_remain',p);
				if(alreadyRemainQty != null && alreadyRemainQty != '' && alreadyRemainQty != undefined)
				{
					var newRemainqty = parseFloat(alreadyStoc) + parseFloat(newQtyOn_Hand) - parseFloat(QtyToSold);
					nlapiLogExecution('DEBUG','B2CStock',"newRemainqty  in if condition ==" +newRemainqty);
				}
				else
				{
					alreadyRemainQty = 0;
					var newRemainqty = parseFloat(alreadyStoc) + parseFloat(newQtyOn_Hand) - parseFloat(QtyToSold);
					nlapiLogExecution('DEBUG','B2CStock',"newRemainqty in else condition==" +newRemainqty);
				}
				
				o_b2cObj.selectLineItem('recmachcustrecord2',p);
			
				o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_line_subsidiary',subsidiary);
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "subsidiary done ==" +subsidiary);
						
				o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_sold',parseFloat(QtyToSold));
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty sold ==" + parseFloat(QtyToSold));
				
					
				
				o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',parseFloat(newRemainqty));
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty Remaining  ==" + newRemainqty);
				
				o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',parseFloat(openStock));
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "opening stock ==" + openStock);
				
				
				o_b2cObj.commitLineItem('recmachcustrecord2');
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
			 }
		}
		
	 
 //================================== END ==============================================
	
		  var record =  nlapiSubmitRecord(o_b2cObj,true);
		   nlapiLogExecution('Debug', 'record IS Created..', "record id " + record);
		   
		if(record != null && record !='' && record != undefined)
		 {
			 var html = '<html>' 

	              + '<script type="text/javascript">'

	              + 'window.location = "https://5250587-sb1.app.netsuite.com/app/center/card.nl?sc=-47&whence=";'

	              + '</script>'

	              + '</html>';

	              response.write(html);
		 }
}




function findTransactionForAlready(itemid,customer,date)
{
	var searchId ='customsearch231';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_b2c_partner_name', null,'anyOf',customer);
	 filters[1]=new nlobjSearchFilter('custrecord_item','custrecord2','anyOf',itemid);
	 filters[2]=new nlobjSearchFilter('custrecord_date_b2c','custrecord2','within',date,date);
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


function findTransaction(searchId,customer,usrDate)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	// filters[0]=new nlobjSearchFilter('custrecord_date_b2c', null,'on',date);
	 filters[0]=new nlobjSearchFilter('custrecord_b2c_partner_name_line', null,'anyof',customer);
	 
	 if(usrDate != null && usrDate !='' && usrDate !=undefined)
	 {
		
       filters[1]=new nlobjSearchFilter('custrecord_date_b2c', null,"on",usrDate);
	 }
	 
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
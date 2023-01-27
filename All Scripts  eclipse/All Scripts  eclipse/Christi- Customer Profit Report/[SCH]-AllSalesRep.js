/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       02 Aug 2019     Tushar
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
var searchResult2Map = {};
var searchResult3Map = {};
function handleAll_salesRep(type){
	nlapiLogExecution('DEBUG', 'Suitelet Execution Started');
	

	
	 var startDate = nlapiGetContext().getSetting('SCRIPT','custscript_start_date');
	 var endDate =  nlapiGetContext().getSetting('SCRIPT','custscript_end_date');
	 var allrep =  nlapiGetContext().getSetting('SCRIPT','custscript_all_rep');
	 var isExcel = nlapiGetContext().getSetting('SCRIPT','custscript_isexcel');
	var customer=null;
	var salesOrder=null;
	var user ='30';
	var salesREp = allrep.toString().replace(//g, ",");
	
	res=salesREp.split(',');
	var allrepArr =[];
	for (var ar=0;ar<res.length;ar++)
		{
		allrepArr.push(res[ar]);
		}
	
	nlapiLogExecution('DEBUG', 'allrepArr ='+allrepArr);
	//salesREp='-5';
		var dataMap = gatherData(startDate,endDate,allrepArr,customer,salesOrder);
		//	 nlapiLogExecution('DEBUG', 'dataMap', JSON.stringify(dataMap));
			
		// display_excel(dataMap,isExcel,user);
	
		
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

function isEmpty ( stValue ) {
    if ((stValue == '') || (stValue == null) || (stValue == undefined)) {
        return true;
    }
    else {
        if (stValue instanceof String) {
            if ((stValue == '')) {
                return true;
            }
        }
        else if (stValue instanceof Array) {
            if (stValue.length == 0) {
                return true;
            }
        }
        return false;
    }
}
function gatherData(startDate,endDate,salesRep,customer,salesOrder){
	var filters = [];
	filters[0] = new nlobjSearchFilter ('trandate', null, 'within', startDate,endDate);
	filters[1] = new nlobjSearchFilter ('salesteammember', 'custcol_cls_bill_order', 'anyof', salesRep);
	
	if(!isEmpty(customer)){
		
		filters.push(new nlobjSearchFilter('custcol_entity_name', null, 'anyof', customer));
	}
if(!isEmpty(salesOrder)){
	 
		filters.push(new nlobjSearchFilter('custcol_cls_bill_order', null, 'anyof', salesOrder));
	}
	
	var searchResult_2 = gatherSavedSearchData_2(filters);
	var dataMap = gatherSavedSearchData_3(filters,salesRep);
	
	//nlapiLogExecution('DEBUG','GET Value','dataMap Search 2 :'+dataMap.length);
	
	return dataMap;
	
	
}
function FillMapFromFresh(dataMap,salesRep,salesRep_txt,customer_txt,customer,orderNumber,date,documentNumber,amount,vendor_txt){

	// Order Wise
	var orderMap_ = {};
	var orderMap = {};
	var orderMap_trans = {};
	orderMap_trans['date'] = date;
	orderMap_trans['transaction'] = documentNumber;
	orderMap_trans['description'] = '';
	orderMap_trans['vendor_name'] =vendor_txt;
	if(!isEmpty(amount)){
		var tempamount = parseFloat(amount);
		if(tempamount > 0){
			orderMap_trans['income'] = tempamount;
		}
		else if(tempamount < 0){
			tempamount = 0-(tempamount); // To make positive to negative value.
			orderMap_trans['expense'] = tempamount;
		}
		else{
			orderMap_trans['expense'] = 0;
			orderMap_trans['income'] = 0;
		}
	}
	orderMap['transArr'] = [orderMap_trans];
	orderMap['orderName'] = orderNumber;
	var tempOrderTotalMap = {};
	if(!isEmpty(amount)){
		var tempamount = parseFloat(amount);
		if(tempamount > 0){
			tempOrderTotalMap['order_total_income'] = tempamount;
		}
		else if(tempamount < 0){
			tempamount = 0-(tempamount); // To make positive to negative value.
			tempOrderTotalMap['order_total_expense'] = tempamount;
		}
		else{

			tempOrderTotalMap['order_total_expense'] = 0;
			tempOrderTotalMap['order_total_income'] = 0;
		
		}
	}
	
	
	tempOrderTotalMap['order_total_gp_amount'] = (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:0) - (tempOrderTotalMap['order_total_expense']?tempOrderTotalMap['order_total_expense']:0);
	if(tempOrderTotalMap['order_total_income'] == 0 || tempOrderTotalMap['order_total_income'] == '0' || tempOrderTotalMap['order_total_income'] == null || tempOrderTotalMap['order_total_income'] == undefined || tempOrderTotalMap['order_total_income'] == '' ){
		tempOrderTotalMap['order_total_gp_percent']='';
	}
	else{
		tempOrderTotalMap['order_total_gp_percent'] = ((tempOrderTotalMap['order_total_gp_amount']?tempOrderTotalMap['order_total_gp_amount']:0) / (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:1))*100;
	}
	orderMap['order_total'] = tempOrderTotalMap;
	
	orderMap_[orderNumber] = orderMap;
	
	// Customer Wise Map
	var customerMap= {};
	
	var tempCustomerMap = {};
	tempCustomerMap['orders'] = orderMap_;
	var tempCustomerTotal = {};
	tempCustomerTotal['customer_total_income'] = tempOrderTotalMap['order_total_income'];
	tempCustomerTotal['customer_total_expense'] = tempOrderTotalMap['order_total_expense'];
	tempCustomerTotal['customer_total_gp_amount'] = (tempCustomerTotal['customer_total_income'] ? tempCustomerTotal['customer_total_income'] :0) - (tempCustomerTotal['customer_total_expense']?tempCustomerTotal['customer_total_expense']:0);
	if(tempCustomerTotal['customer_total_income'] == 0 || tempCustomerTotal['customer_total_income'] == '0' || tempCustomerTotal['customer_total_income'] == null || tempCustomerTotal['customer_total_income'] == undefined || tempCustomerTotal['customer_total_income'] == '' ){
		tempCustomerTotal['customer_total_gp_percent'] = '';
	}
	else{
	tempCustomerTotal['customer_total_gp_percent'] = (tempCustomerTotal['customer_total_gp_amount']?tempCustomerTotal['customer_total_gp_amount']:0) / (tempCustomerTotal['customer_total_income']?tempCustomerTotal['customer_total_income']:1)*100;
	}
	tempCustomerMap['customer_total'] = tempCustomerTotal;
	
	tempCustomerMap['customer_name'] = customer_txt;
	//tempVendorMap['vendor_name'] = vendor_txt;
	
	customerMap[customer] = tempCustomerMap;
	
	// Sales Rep Wise Map
	var salesRepMap = {};
	
	var tempSalesRepMap = {}
	tempSalesRepMap['salesRep_name'] = salesRep_txt;
	tempSalesRepMap['customers'] = customerMap;
	var tempSalesRepTotal= {};
	tempSalesRepTotal['salesrep_total_income'] = tempCustomerTotal['customer_total_income'];
	tempSalesRepTotal['salesrep_total_expense'] = tempCustomerTotal['customer_total_expense'];
	tempSalesRepTotal['salesrep_total_gp_amount'] = (tempSalesRepTotal['salesrep_total_income'] ? tempSalesRepTotal['salesrep_total_income'] :0) - (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0);
	
	if(tempSalesRepTotal['salesrep_total_income'] == 0 || tempSalesRepTotal['salesrep_total_income'] == '0' || tempSalesRepTotal['salesrep_total_income'] == null || tempSalesRepTotal['salesrep_total_income'] == undefined || tempSalesRepTotal['salesrep_total_income'] == '' ){
		tempSalesRepTotal['salesrep_total_gp_percent'] = '';
	}
	else{
	
	tempSalesRepTotal['salesrep_total_gp_percent'] = (tempSalesRepTotal['salesrep_total_gp_amount']?tempSalesRepTotal['salesrep_total_gp_amount']:0) / (tempSalesRepTotal['salesrep_total_income'] ?tempSalesRepTotal['salesrep_total_income']:1)*100;
	}
	tempSalesRepMap['salesRep_total'] = tempSalesRepTotal;
	
	salesRepMap[salesRep] = tempSalesRepMap;
	
	//Grand Total
	var tempGrandTotalMap = {};
	tempGrandTotalMap['grand_total_income'] = (tempSalesRepTotal['salesrep_total_income']?tempSalesRepTotal['salesrep_total_income']:0);
	tempGrandTotalMap['grand_total_expense'] = (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0);
	tempGrandTotalMap['grand_total_gp_amount'] = (tempGrandTotalMap['grand_total_income'] ? tempGrandTotalMap['grand_total_income'] :0) - (tempGrandTotalMap['grand_total_expense']?tempGrandTotalMap['grand_total_expense']:0);
	if(tempGrandTotalMap['grand_total_income'] == 0 || tempGrandTotalMap['grand_total_income'] == '0' || tempGrandTotalMap['grand_total_income'] == null || tempGrandTotalMap['grand_total_income'] == undefined || tempGrandTotalMap['grand_total_income'] == '' ){
		tempGrandTotalMap['grand_total_gp_percent'] = '';
	}
	else{
	tempGrandTotalMap['grand_total_gp_percent'] = (tempGrandTotalMap['grand_total_gp_amount']?tempGrandTotalMap['grand_total_gp_amount']:0) / (tempGrandTotalMap['grand_total_income'] ?tempGrandTotalMap['grand_total_income']:1)*100;
	}
	dataMap['salesRepMap'] = salesRepMap;
	dataMap['Grand_total'] = tempGrandTotalMap;

	return dataMap;
}
function gatherSavedSearchData_2(filters){
	
	var searchResult = getSavedSearchResult(null, 'customsearch_clstransactioncustprofit__2', filters);
	
	nlapiLogExecution('DEBUG','GET Value','searchResult Search 1:'+searchResult.length);
	var count=0;
	if(!isEmpty(searchResult)){
		
		for (var searchResultIndex = 0; searchResultIndex < searchResult.length; searchResultIndex++) {
			
			
			var customer = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("custcol_entity_name"));
			var orderNumber = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("custcol_order_number"));
			
			var date = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("trandate"));
			var transactionType = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("type"));
			var documentNumber = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("tranid"));
			var amount = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("amount"));
			
			var COGSamount = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("cogsamount"));
		
			var typeCreated = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("type","createdFrom"));
			
			var poOrder = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("purchaseorder"));
			
			var shipCost = searchResult[searchResultIndex].getValue("shippingcost");
			var tempAmount =0.00;
			// nlapiLogExecution('DEBUG', 'searchResult2Map','transactionType;='+ transactionType);
			// nlapiLogExecution('DEBUG', 'searchResult2Map','documentNumber;='+ documentNumber);
			//nlapiLogExecution('DEBUG', 'searchResult2Map','shipCost;='+ shipCost);
		
			
			if(shipCost !=null && shipCost !='')
			{
				shipCost=parseFloat(shipCost);
			}
			else
			{
				shipCost=0;
			}
			
			if(transactionType ==='VendBill' && parseFloat(amount)> 0)
			{
				amount=parseFloat(0-amount);
			
			}
			
			else if((transactionType ==='ItemShip' && typeCreated==='SalesOrd' && COGSamount > 0) &&(poOrder ==null || poOrder ==''|| poOrder ==undefined)) //SalesOrd
			{
				
				amount =parseFloat(0-COGSamount);
			}
			else if((transactionType ==='ItemShip' && typeCreated==='SalesOrd' && COGSamount < 0) &&(poOrder ==null || poOrder ==''|| poOrder ==undefined))
			{
				
				amount =parseFloat(COGSamount);
			}
			else 
			{
				amount =parseFloat(amount);
			}
			
			
			// nlapiLogExecution('DEBUG', 'searchResult2Map','searchMap[order];='+ searchResult2Map[customer+'_'+orderNumber+'_'+documentNumber]);
			
			if(searchResult2Map[customer+'_'+orderNumber+'_'+documentNumber]){
				
				   
				    	var tempAmount = searchResult2Map[customer+'_'+orderNumber+'_'+documentNumber];
						  tempAmount = tempAmount + parseFloat(amount);
						 searchResult2Map[customer+'_'+orderNumber+'_'+documentNumber] = tempAmount;
				
						 
						 // nlapiLogExecution('DEBUG', 'searchResult2Map','count;='+ count);
						// nlapiLogExecution('DEBUG', 'searchResult2Map','IF-Final tempAmount;='+ searchResult2Map[customer+'_'+orderNumber+'_'+documentNumber]);	
			}
			else{
				
				if(transactionType ==='CustInvc' )
				{
					
						amount=parseFloat(amount)+parseFloat(shipCost);
						searchResult2Map[customer+'_'+orderNumber+'_'+documentNumber] = (parseFloat(amount)?parseFloat(amount):0);
						
				}
				else 
				{
					searchResult2Map[customer+'_'+orderNumber+'_'+documentNumber] = (parseFloat(amount)?parseFloat(amount):0);
					
				}
				 // nlapiLogExecution('DEBUG', 'searchResult2Map','count;='+ count);  
				//nlapiLogExecution('DEBUG', 'searchResult2Map','ELSE- Final tempAmount;='+ searchResult2Map[customer+'_'+orderNumber+'_'+documentNumber]);	
			
			}
			
			
		}
		nlapiLogExecution('DEBUG', 'searchResult2Map','transactionType'+ transactionType);
		//nlapiLogExecution('DEBUG', 'searchResult2Map', JSON.stringify(searchResult2Map));
	}
}
function gatherSavedSearchData_3(filters,salesRep){

	if(!isEmpty(salesRep)){
		filters.push(new nlobjSearchFilter('salesrep', 'custcol_cls_bill_order', 'anyof', salesRep));
	}
	
	var AllRepArr =salesRep;
	var searchResult = getSavedSearchResult(null, 'customsearch_clstransactioncustprofit__3', filters);
	//nlapiLogExecution('DEBUG', 'searchResult2Map-3', JSON.stringify(searchResult2Map));
	if(!isEmpty(searchResult)){
		var dataMap = {};
		var AllMap ={};
		
		for(var rep=0;rep<AllRepArr.length;rep++)
		{
		
		for (var searchResultIndex = 0; searchResultIndex < searchResult.length; searchResultIndex++) {
			var date = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("trandate",null,"GROUP"));
		//	var tranType = searchResult[searchResultIndex].getText(new nlobjSearchColumn("type",null,"GROUP"));
			var documentNumber = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("tranid",null,"GROUP"));
			var salesRep = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("salesrep","CUSTCOL_CLS_BILL_ORDER","GROUP"));
			var salesRep_txt = searchResult[searchResultIndex].getText(new nlobjSearchColumn("salesrep","CUSTCOL_CLS_BILL_ORDER","GROUP"));
			var orderNumber = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("custcol_order_number",null,"GROUP"));
			var customer = searchResult[searchResultIndex].getValue(new nlobjSearchColumn("custcol_entity_name",null,"GROUP"));
			var customer_txt = searchResult[searchResultIndex].getText(new nlobjSearchColumn("custcol_entity_name",null,"GROUP"));
			var vendor_txt = searchResult[searchResultIndex].getValue( new nlobjSearchColumn("altname","vendor","GROUP"));
			
			
			var amount = searchResult2Map[customer+'_'+orderNumber+'_'+documentNumber];
			
			//nlapiLogExecution('DEBUG', 'date:'+date, 'documentNumber:'+documentNumber+',salesRep:'+salesRep+',salesRep_txt:'+salesRep_txt+',orderNumber:'+orderNumber+',customer:'+customer+',customer_txt:'+customer_txt);
			/*if(searchResultIndex == 3)
				customer='123';*/
			// ***************************************************************************************************
			
			if(salesRep==AllRepArr[rep]){
				var AllRepMap =AllMap['AllRepMap'];
			if(dataMap['salesRepMap']){
				// var salesRep = {}; // If salesRepMap exist means this is not first transaction in map
			salesRepMap = dataMap['salesRepMap'];
			
			if(salesRepMap[salesRep]){
				
				var tempSalesRepMap = {};
				tempSalesRepMap = salesRepMap[salesRep]; // Sales Rep Map
				//Customer
				var customerMap = {};
				customerMap = tempSalesRepMap['customers'];
				if(customerMap[customer]){ //Customer is present
				var tempCustomerMap = {};
				tempCustomerMap = customerMap[customer]; //Customer Map
				
				 var orderMap_ = {};
				 orderMap_ = tempCustomerMap['orders'];
				 
				 if(orderMap_[orderNumber]){ // If Order Number is present
				 var orderMap = {};
				 orderMap = orderMap_[orderNumber]; // Order Map
				 
				 var orderMap_trans_arr = [];
				 orderMap_trans_arr = orderMap['transArr'];
				 var orderMap_trans = {};
					orderMap_trans['date'] = date;
					orderMap_trans['transaction'] = documentNumber;
					orderMap_trans['description'] = '';
					orderMap_trans['vendor_name'] = vendor_txt;
					if(!isEmpty(amount)){
						var tempamount = parseFloat(amount);
						if(tempamount > 0){
							orderMap_trans['income'] = tempamount;
						}
						else if(tempamount < 0){
							tempamount = 0-(tempamount); // To make positive to negative value.
							orderMap_trans['expense'] = tempamount;
						}
						else{
							orderMap_trans['expense'] = 0;
							orderMap_trans['income'] = 0;
						}
					}
					orderMap_trans_arr.push(orderMap_trans);
					 orderMap['transArr'] = orderMap_trans_arr;
					
					 var tempOrderTotalMap = {};
					 
					 tempOrderTotalMap = orderMap['order_total'];
					 
					 if(!isEmpty(amount)){
							var tempamount = parseFloat(amount);
							if(tempamount > 0){
								tempOrderTotalMap['order_total_income'] = (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:0)+tempamount;
							}
							else if(tempamount < 0){
								tempamount = 0-(tempamount); // To make positive to negative value.
								tempOrderTotalMap['order_total_expense'] = (tempOrderTotalMap['order_total_expense']?tempOrderTotalMap['order_total_expense']:0)+tempamount;
							}
							else{

								tempOrderTotalMap['order_total_expense'] = (tempOrderTotalMap['order_total_expense']?tempOrderTotalMap['order_total_expense']:0)+0;
								tempOrderTotalMap['order_total_income'] = (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:0)+0;
							
							}
						}
						
						
						tempOrderTotalMap['order_total_gp_amount'] = (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:0) - (tempOrderTotalMap['order_total_expense']?tempOrderTotalMap['order_total_expense']:0);
						if(tempOrderTotalMap['order_total_income'] == 0 || tempOrderTotalMap['order_total_income'] == '0' || tempOrderTotalMap['order_total_income'] == null || tempOrderTotalMap['order_total_income'] == undefined || tempOrderTotalMap['order_total_income'] == '' ){
							tempOrderTotalMap['order_total_gp_percent'] ='';
						}
						else{
						tempOrderTotalMap['order_total_gp_percent'] = ((tempOrderTotalMap['order_total_gp_amount']?tempOrderTotalMap['order_total_gp_amount']:0) / (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:1))*100;
						}
						orderMap['order_total'] = tempOrderTotalMap;
						orderMap_[orderNumber] = orderMap;
						
						// handle Customer Total
						var tempCustomerTotal = {};
						tempCustomerTotal = tempCustomerMap['customer_total'];
						
						tempCustomerTotal['customer_total_income'] = (tempCustomerTotal['customer_total_income']?tempCustomerTotal['customer_total_income']:0) + (orderMap_trans['income']?orderMap_trans['income']:0);
						tempCustomerTotal['customer_total_expense'] = (tempCustomerTotal['customer_total_expense']?tempCustomerTotal['customer_total_expense']:0) + (orderMap_trans['expense']?orderMap_trans['expense']:0)
						tempCustomerTotal['customer_total_gp_amount'] = (tempCustomerTotal['customer_total_income'] ? tempCustomerTotal['customer_total_income'] :0) - (tempCustomerTotal['customer_total_expense']?tempCustomerTotal['customer_total_expense']:0);
						if(tempOrderTotalMap['order_total_income'] == 0 || tempOrderTotalMap['order_total_income'] == '0' || tempOrderTotalMap['order_total_income'] == null || tempOrderTotalMap['order_total_income'] == undefined || tempOrderTotalMap['order_total_income'] == '' ){
							tempOrderTotalMap['order_total_gp_percent'] ='';
						}
						else{
						tempCustomerTotal['customer_total_gp_percent'] = (tempCustomerTotal['customer_total_gp_amount']?tempCustomerTotal['customer_total_gp_amount']:0) / (tempCustomerTotal['customer_total_income']?tempCustomerTotal['customer_total_income']:1)*100;
						}
						tempCustomerMap['customer_total'] = tempCustomerTotal;
						// Handle Sales Rep Total
						 var tempSalesRepTotal = {};
						 tempSalesRepTotal = tempSalesRepMap['salesRep_total'];
						
						 tempSalesRepTotal['salesrep_total_income'] = (tempSalesRepTotal['salesrep_total_income']?tempSalesRepTotal['salesrep_total_income']:0) + (orderMap_trans['income']?orderMap_trans['income']:0);
							tempSalesRepTotal['salesrep_total_expense'] = (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0) + (orderMap_trans['expense']?orderMap_trans['expense']:0);
							tempSalesRepTotal['salesrep_total_gp_amount'] = (tempSalesRepTotal['salesrep_total_income'] ? tempSalesRepTotal['salesrep_total_income'] :0) - (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0);
							
							if(tempSalesRepTotal['salesrep_total_income'] == 0 || tempSalesRepTotal['salesrep_total_income'] == '0' || tempSalesRepTotal['salesrep_total_income'] == null || tempSalesRepTotal['salesrep_total_income'] == undefined || tempSalesRepTotal['salesrep_total_income'] == '' ){
								tempSalesRepTotal['salesrep_total_gp_percent'] ='';
							}
							else{
							tempSalesRepTotal['salesrep_total_gp_percent'] = (tempSalesRepTotal['salesrep_total_gp_amount']?tempSalesRepTotal['salesrep_total_gp_amount']:0) / (tempSalesRepTotal['salesrep_total_income'] ?tempSalesRepTotal['salesrep_total_income']:1)*100;
							}
							tempSalesRepMap['salesRep_total'] = tempSalesRepTotal;
							salesRepMap[salesRep] = tempSalesRepMap;
							// Handle Grand Total
							var tempGrandTotalMap = {};
							tempGrandTotalMap = dataMap['Grand_total'];
							tempGrandTotalMap['grand_total_income'] = (tempGrandTotalMap['grand_total_income']?tempGrandTotalMap['grand_total_income']:0) + (orderMap_trans['income']?orderMap_trans['income']:0);
							tempGrandTotalMap['grand_total_expense'] = (tempGrandTotalMap['grand_total_expense']?tempGrandTotalMap['grand_total_expense']:0) + (orderMap_trans['expense']?orderMap_trans['expense']:0);
							tempGrandTotalMap['grand_total_gp_amount'] = (tempGrandTotalMap['grand_total_income'] ? tempGrandTotalMap['grand_total_income'] :0) - (tempGrandTotalMap['grand_total_expense']?tempGrandTotalMap['grand_total_expense']:0);
							if(tempGrandTotalMap['grand_total_income'] == 0 || tempGrandTotalMap['grand_total_income'] == '0' || tempGrandTotalMap['grand_total_income'] == null || tempGrandTotalMap['grand_total_income'] == undefined || tempGrandTotalMap['grand_total_income']== '' ){
								tempGrandTotalMap['grand_total_gp_percent'] ='';
							}
							else{
							tempGrandTotalMap['grand_total_gp_percent'] = (tempGrandTotalMap['grand_total_gp_amount']?tempGrandTotalMap['grand_total_gp_amount']:0) / (tempGrandTotalMap['grand_total_income'] ?tempGrandTotalMap['grand_total_income']:1)*100;
							}
							dataMap['Grand_total'] = tempGrandTotalMap;
				 }
				 else{ // If Order Number is not present
					 var orderMap = {};
						var orderMap_trans = {};
						orderMap_trans['date'] = date;
						orderMap_trans['transaction'] = documentNumber;
						orderMap_trans['description'] = '';
						orderMap_trans['vendor_name'] = vendor_txt;
						if(!isEmpty(amount)){
							var tempamount = parseFloat(amount);
							if(tempamount > 0){
								orderMap_trans['income'] = tempamount;
							}
							else if(tempamount < 0){
								tempamount = 0-(tempamount); // To make positive to negative value.
								orderMap_trans['expense'] = tempamount;
							}
							else{
								orderMap_trans['expense'] = 0;
								orderMap_trans['income'] = 0;
							}
						}
						orderMap['transArr'] = [orderMap_trans];
						orderMap['orderName'] = orderNumber;
						var tempOrderTotalMap = {};
						if(!isEmpty(amount)){
							var tempamount = parseFloat(amount);
							if(tempamount > 0){
								tempOrderTotalMap['order_total_income'] = tempamount;
							}
							else if(tempamount < 0){
								tempamount = 0-(tempamount); // To make positive to negative value.
								tempOrderTotalMap['order_total_expense'] = tempamount;
							}
							else{

								tempOrderTotalMap['order_total_expense'] = 0;
								tempOrderTotalMap['order_total_income'] = 0;
							
							}
						}
						
						
						tempOrderTotalMap['order_total_gp_amount'] = (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:0) - (tempOrderTotalMap['order_total_expense']?tempOrderTotalMap['order_total_expense']:0);
						if(tempOrderTotalMap['order_total_income'] == 0 || tempOrderTotalMap['order_total_income'] == '0' || tempOrderTotalMap['order_total_income'] == null || tempOrderTotalMap['order_total_income'] == undefined || tempOrderTotalMap['order_total_income'] == '' ){
							tempOrderTotalMap['order_total_gp_percent'] ='';
						}
						else{
						tempOrderTotalMap['order_total_gp_percent'] = ((tempOrderTotalMap['order_total_gp_amount']?tempOrderTotalMap['order_total_gp_amount']:0) / (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:1))*100;
						}
						orderMap['order_total'] = tempOrderTotalMap;
						
						orderMap_[orderNumber] = orderMap;
					 
						 tempCustomerMap['orders'] = orderMap_;
						 var tempCustomerTotal = {};
						 tempCustomerTotal = tempCustomerMap['customer_total'];
						 	tempCustomerTotal['customer_total_income'] = (tempCustomerTotal['customer_total_income']?tempCustomerTotal['customer_total_income']:0) + (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:0);
							tempCustomerTotal['customer_total_expense'] = (tempCustomerTotal['customer_total_expense']?tempCustomerTotal['customer_total_expense']:0) + (tempOrderTotalMap['order_total_expense']?tempOrderTotalMap['order_total_expense']:0);
							tempCustomerTotal['customer_total_gp_amount'] = (tempCustomerTotal['customer_total_income'] ? tempCustomerTotal['customer_total_income'] :0) - (tempCustomerTotal['customer_total_expense']?tempCustomerTotal['customer_total_expense']:0);
							
							if(tempCustomerTotal['customer_total_income'] == 0 || tempCustomerTotal['customer_total_income'] == '0' || tempCustomerTotal['customer_total_income'] == null || tempCustomerTotal['customer_total_income'] == undefined || tempCustomerTotal['customer_total_income'] == '' ){
								tempCustomerTotal['customer_total_gp_percent'] ='';
							}
							else{
							tempCustomerTotal['customer_total_gp_percent'] = (tempCustomerTotal['customer_total_gp_amount']?tempCustomerTotal['customer_total_gp_amount']:0) / (tempCustomerTotal['customer_total_income']?tempCustomerTotal['customer_total_income']:1)*100;
							}
						 tempCustomerMap['customer_total'] = tempCustomerTotal;
						 
						 
						 customerMap[customer] =  tempCustomerMap;
						 
						 tempSalesRepMap['customers'] = customerMap;
						 
						 // Update Sales Rep Total
							var tempSalesRepTotal ={};
							tempSalesRepTotal = tempSalesRepMap['salesRep_total'];
							tempSalesRepTotal['salesrep_total_income'] = (tempSalesRepTotal['salesrep_total_income']?tempSalesRepTotal['salesrep_total_income']:0) + (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:0);
							tempSalesRepTotal['salesrep_total_expense'] = (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0) + (tempOrderTotalMap['order_total_expense']?tempOrderTotalMap['order_total_expense']:0);
							tempSalesRepTotal['salesrep_total_gp_amount'] = (tempSalesRepTotal['salesrep_total_income'] ? tempSalesRepTotal['salesrep_total_income'] :0) - (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0);
							if(tempSalesRepTotal['salesrep_total_income'] == 0 || tempSalesRepTotal['salesrep_total_income'] == '0' || tempSalesRepTotal['salesrep_total_income'] == null || tempSalesRepTotal['salesrep_total_income'] == undefined || tempSalesRepTotal['salesrep_total_income'] == '' ){
								tempSalesRepTotal['salesrep_total_gp_percent'] ='';
							}
							else{
							tempSalesRepTotal['salesrep_total_gp_percent'] = (tempSalesRepTotal['salesrep_total_gp_amount']?tempSalesRepTotal['salesrep_total_gp_amount']:0) / (tempSalesRepTotal['salesrep_total_income'] ?tempSalesRepTotal['salesrep_total_income']:1)*100;
							}
							tempSalesRepMap['salesRep_total'] = tempSalesRepTotal;
						  
						 
						 salesRepMap[salesRep] = tempSalesRepMap;
						 dataMap['salesRepMap'] = salesRepMap;
						 
						// Update Grand Total
							var tempGrandTotalMap = {};
							tempGrandTotalMap = dataMap['Grand_total'];
							
							
							tempGrandTotalMap['grand_total_income'] = (tempSalesRepTotal['salesrep_total_income']?tempSalesRepTotal['salesrep_total_income']:0);
							tempGrandTotalMap['grand_total_expense'] = (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0);
							tempGrandTotalMap['grand_total_gp_amount'] = (tempGrandTotalMap['grand_total_income'] ? tempGrandTotalMap['grand_total_income'] :0) - (tempGrandTotalMap['grand_total_expense']?tempGrandTotalMap['grand_total_expense']:0);
							
							if(tempGrandTotalMap['grand_total_income'] == 0 || tempGrandTotalMap['grand_total_income'] == '0' || tempGrandTotalMap['grand_total_income'] == null || tempGrandTotalMap['grand_total_income'] == undefined || tempGrandTotalMap['grand_total_income'] == '' ){
								tempGrandTotalMap['grand_total_gp_percent'] ='';
							}
							else{
							tempGrandTotalMap['grand_total_gp_percent'] = (tempGrandTotalMap['grand_total_gp_amount']?tempGrandTotalMap['grand_total_gp_amount']:0) / (tempGrandTotalMap['grand_total_income'] ?tempGrandTotalMap['grand_total_income']:1)*100;
							}
							
							dataMap['Grand_total'] = tempGrandTotalMap;
						 
				 }
				}
				else{ // Customer is not present
					//Order Wise
					
					var tempSalesRepMap = {};
					tempSalesRepMap = salesRepMap[salesRep];
					var customerMap={};
					customerMap = tempSalesRepMap['customers'];
					
					var orderMap_ = {};
					var orderMap = {};
					var orderMap_trans = {};
					orderMap_trans['date'] = date;
					orderMap_trans['transaction'] = documentNumber;
					orderMap_trans['description'] = '';
					orderMap_trans['vendor_name'] = vendor_txt;
					if(!isEmpty(amount)){
						var tempamount = parseFloat(amount);
						if(tempamount > 0){
							orderMap_trans['income'] = tempamount;
						}
						else if(tempamount < 0){
							tempamount = 0-(tempamount); // To make positive to negative value.
							orderMap_trans['expense'] = tempamount;
						}
						else{
							orderMap_trans['expense'] = 0;
							orderMap_trans['income'] = 0;
						}
					}
					orderMap['transArr'] = [orderMap_trans];
					orderMap['orderName'] = orderNumber;
					var tempOrderTotalMap = {};
					if(!isEmpty(amount)){
						var tempamount = parseFloat(amount);
						if(tempamount > 0){
							tempOrderTotalMap['order_total_income'] = tempamount;
						}
						else if(tempamount < 0){
							tempamount = 0-(tempamount); // To make positive to negative value.
							tempOrderTotalMap['order_total_expense'] = tempamount;
						}
						else{

							tempOrderTotalMap['order_total_expense'] = 0;
							tempOrderTotalMap['order_total_income'] = 0;
						
						}
					}
					
					
					tempOrderTotalMap['order_total_gp_amount'] = (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:0) - (tempOrderTotalMap['order_total_expense']?tempOrderTotalMap['order_total_expense']:0);
					
					if(tempOrderTotalMap['order_total_income'] == 0 || tempOrderTotalMap['order_total_income'] == '0' || tempOrderTotalMap['order_total_income'] == null || tempOrderTotalMap['order_total_income'] == undefined || tempOrderTotalMap['order_total_income'] == '' ){
						tempOrderTotalMap['order_total_gp_percent'] ='';
					}
					else{
					tempOrderTotalMap['order_total_gp_percent'] = ((tempOrderTotalMap['order_total_gp_amount']?tempOrderTotalMap['order_total_gp_amount']:0) / (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:1))*100;
					}
					orderMap['order_total'] = tempOrderTotalMap;
					
					orderMap_[orderNumber] = orderMap;
					
				
					// Customer Wise Map
				
					
					var tempCustomerMap = {};
					tempCustomerMap['orders'] = orderMap_;
					var tempCustomerTotal = {};
					tempCustomerTotal['customer_total_income'] = (tempOrderTotalMap['order_total_income']?tempOrderTotalMap['order_total_income']:0);
					tempCustomerTotal['customer_total_expense'] = (tempOrderTotalMap['order_total_expense']?tempOrderTotalMap['order_total_expense']:0);
					tempCustomerTotal['customer_total_gp_amount'] = (tempCustomerTotal['customer_total_income'] ? tempCustomerTotal['customer_total_income'] :0) - (tempCustomerTotal['customer_total_expense']?tempCustomerTotal['customer_total_expense']:0);
					
					if(tempCustomerTotal['customer_total_income'] == 0 || tempCustomerTotal['customer_total_income'] == '0' || tempCustomerTotal['customer_total_income'] == null || tempCustomerTotal['customer_total_income'] == undefined || tempCustomerTotal['customer_total_income'] == '' ){
						tempCustomerTotal['customer_total_gp_percent'] ='';
					}
					else{
					tempCustomerTotal['customer_total_gp_percent'] = (tempCustomerTotal['customer_total_gp_amount']?tempCustomerTotal['customer_total_gp_amount']:0) / (tempCustomerTotal['customer_total_income']?tempCustomerTotal['customer_total_income']:1)*100;
					}
					tempCustomerMap['customer_total'] = tempCustomerTotal;
					
					tempCustomerMap['customer_name'] = customer_txt;
					//tempVendorMap['vendor_name'] = vendor_txt;
					
					customerMap[customer] = tempCustomerMap;
					
					// Update in SalesRep Map
					
					tempSalesRepMap['customers'] = customerMap;
					
					var tempSalesRepTotal ={};
					tempSalesRepTotal = tempSalesRepMap['salesRep_total'];
					tempSalesRepTotal['salesrep_total_income'] = (tempSalesRepTotal['salesrep_total_income']?tempSalesRepTotal['salesrep_total_income']:0) + (tempCustomerTotal['customer_total_income']?tempCustomerTotal['customer_total_income']:0);
					tempSalesRepTotal['salesrep_total_expense'] = (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0) + (tempCustomerTotal['customer_total_expense']?tempCustomerTotal['customer_total_expense']:0);
					tempSalesRepTotal['salesrep_total_gp_amount'] = (tempSalesRepTotal['salesrep_total_income'] ? tempSalesRepTotal['salesrep_total_income'] :0) - (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0);
					
					if(tempSalesRepTotal['salesrep_total_income'] == 0 || tempSalesRepTotal['salesrep_total_income'] == '0' || tempSalesRepTotal['salesrep_total_income'] == null || tempSalesRepTotal['salesrep_total_income'] == undefined || tempSalesRepTotal['salesrep_total_income'] == '' ){
						tempSalesRepTotal['salesrep_total_gp_percent'] ='';
					}
					else{
					tempSalesRepTotal['salesrep_total_gp_percent'] = (tempSalesRepTotal['salesrep_total_gp_amount']?tempSalesRepTotal['salesrep_total_gp_amount']:0) / (tempSalesRepTotal['salesrep_total_income'] ?tempSalesRepTotal['salesrep_total_income']:1)*100;
					}
					tempSalesRepMap['salesRep_total'] = tempSalesRepTotal;
					salesRepMap[salesRep] = tempSalesRepMap;
					
					dataMap['salesRepMap'] = salesRepMap;
					
					// Update Grand Total
					var tempGrandTotalMap = {};
					tempGrandTotalMap = dataMap['Grand_total'];
					
					
					tempGrandTotalMap['grand_total_income'] = (tempSalesRepTotal['salesrep_total_income']?tempSalesRepTotal['salesrep_total_income']:0);
					tempGrandTotalMap['grand_total_expense'] = (tempSalesRepTotal['salesrep_total_expense']?tempSalesRepTotal['salesrep_total_expense']:0);
					tempGrandTotalMap['grand_total_gp_amount'] = (tempGrandTotalMap['grand_total_income'] ? tempGrandTotalMap['grand_total_income'] :0) - (tempGrandTotalMap['grand_total_expense']?tempGrandTotalMap['grand_total_expense']:0);
					
					if(tempGrandTotalMap['grand_total_income'] == 0 || tempGrandTotalMap['grand_total_income'] == '0' || tempGrandTotalMap['grand_total_income'] == null || tempGrandTotalMap['grand_total_income'] == undefined || tempGrandTotalMap['grand_total_income'] == '' ){
						tempGrandTotalMap['grand_total_gp_percent'] ='';
					}
					else{
					tempGrandTotalMap['grand_total_gp_percent'] = (tempGrandTotalMap['grand_total_gp_amount']?tempGrandTotalMap['grand_total_gp_amount']:0) / (tempGrandTotalMap['grand_total_income'] ?tempGrandTotalMap['grand_total_income']:1)*100;
					}
					
					dataMap['Grand_total'] = tempGrandTotalMap;
				}
			}
			else{
				dataMap = FillMapFromFresh(dataMap,salesRep,salesRep_txt,customer_txt,customer,orderNumber,date,documentNumber,amount,vendor_txt);
			}
			}
			
			else{
				dataMap = FillMapFromFresh(dataMap,salesRep,salesRep_txt,customer_txt,customer,orderNumber,date,documentNumber,amount,vendor_txt);
			}
			//AllMap['AllRepMap']=dataMap;
			}
			
		}
		display_excel(dataMap);
		}
		//nlapiLogExecution('DEBUG', 'dataMap', 'AllMap:'+JSON.stringify(AllMap));

		return AllMap;
	}
	
}

function display_excel(dataMap){
	var user;
	// nlapiLogExecution('DEBUG', '->dataMap', JSON.stringify(dataMap));
	var html='';
	
	
		html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns="http://www.w3.org/TR/REC-html40">'+
	  	'<head>'+
		 '<style type="text/css">'+
	'table {white-space:normal;mso-displayed-decimal-separator:"\.";'+
	 'mso-displayed-thousand-separator:"\,";}'+
	 'col{mso-width-source:auto;}'+
	 'td{font-size:12pt;font-family:Calibri;white-space:normal;}'+
	 'th{font-size:12pt;font-family:Calibri;}'+
	 '.hiddenDataField{background-color:red;}'+
	 '@Page{ '+
	 'mso-page-orientation:portrait;'+
		'margin:1.0in .75in 1.0in .75in;'+
		'mso-header-margin:.5in;'+
		'}'+
		'</style>';
		 

		html += '<!--[if gte mso 9]><xml>'+
		'<x:ExcelWorkbook>'+
		'<x:ExcelWorksheets>'+
		'<x:ExcelWorksheet>'+
		 

		'<x:Name>Profitability Report</x:Name>'+
		'<x:WorksheetOptions>'+
		'<x:PageSetup>'+
		'<x:Layout/>'+
		'<x:PageMargins/>'+


		'</x:PageSetup>'+
		'<x:FitToPage/>'+
		'<x:Print>'+
		'<x:ValidPrinterInfo/>'+
		'<x:FitHeight>100</x:FitHeight>'+
		'<x:FitWidth>1</x:FitWidth>'+
		'<x:PaperSizeIndex>9</x:PaperSizeIndex>'+
		'<x:HorizontalResolution>600</x:HorizontalResolution>'+
		'<x:VerticalResolution>600</x:VerticalResolution>'+
		'</x:Print>'+
		'<x:Selected/>'+
		'<x:ProtectContents>False</x:ProtectContents>'+
		'<x:ProtectObjects>False</x:ProtectObjects>'+
		'<x:ProtectScenarios>False</x:ProtectScenarios>'+
		'</x:WorksheetOptions>'+

		'</x:ExcelWorksheet>'+
		'</x:ExcelWorksheets>'+
		'<x:WindowHeight>12780</x:WindowHeight>'+
		'<x:WindowWidth>19035</x:WindowWidth>'+
		'<x:WindowTopX>0</x:WindowTopX>'+
		'<x:WindowTopY>15</x:WindowTopY>'+
		'<x:ProtectStructure>False</x:ProtectStructure>'+
		'<x:ProtectWindows>False</x:ProtectWindows>'+
		'</x:ExcelWorkbook>'+
		'</xml><![endif]-->'+
		'</head>';
		html += "<body margin-top=\"1pt\" header-height=\"4em\" footer=\"smallfooter\" header=\"smallheader\" footer-height=\"1em\" font-family=\"Helvetica\">";  
	
	
	
		//dataMap = null;
		    if(!isEmpty(dataMap)){
		    	nlapiLogExecution('DEBUG', 'dataMap Is not empty');
		    	
		    	
		    	   
		    	//html +=  ' <style type="text/css">* {<#if .locale == "zh_CN">font-family: NotoSans, NotoSansCJKsc, sans-serif;<#elseif .locale == "zh_TW">font-family: NotoSans, NotoSansCJKtc, sans-serif;<#elseif .locale == "ja_JP">font-family: NotoSans, NotoSansCJKjp, sans-serif;<#elseif .locale == "ko_KR">font-family: NotoSans, NotoSansCJKkr, sans-serif;<#elseif .locale == "th_TH">font-family: NotoSans, NotoSansThai, sans-serif;<#else>font-family: NotoSans, sans-serif;</#if>}table {font-size: 9pt;table-layout: fixed;}th.tableheader {font-weight: bold;font-size: 10pt;vertical-align: middle;padding: 5px 6px 3px;background-color: #607799;color: #fefefe;}td {padding: 4px 6px;}td p { align:left }b {font-weight: bold;color: #333333;}table.header td {padding: 0;font-size: 10pt;}table.footer td {padding: 0;font-size: 8pt;}table.itemtable th {padding-bottom: 10px;padding-top: 10px;}table.body td {padding-top: 2px;}.even {padding-top: 2px;background-color: #FAFAFA;}table.total {page-break-inside: avoid;}tr.totalrow {background-color: #e3e3e3;line-height: 200%;}td.totalsummary {background-color: #e3e3e3;}td.totalboxtop {font-size: 12pt;background-color: #e3e3e3;}td.addressheader {font-size: 8pt;padding-top: 6px;padding-bottom: 2px;}td.address {padding-top: 0;}td.totalboxmid {font-size: 28pt;padding-top: 20px;background-color: #e3e3e3;}span.title {font-size: 28pt;}span.number {font-size: 16pt;}hr {width: 100%;color: #d3d3d3;background-color: #d3d3d3;height: 1px;}tr.startRow{background-color: #efefa3;border-top: 2px dashed gray;border-left:2px dashed gray;border-bottom:2px dashed gray;}tr.endRow{background-color: #efefa3;border-top: 2px dashed gray;border-left: 2px dashed gray;border-bottom: 2px dashed gray;}.sales_rep_total{background-color:#f1bee8}.customer_total{background-color:#FF7F50}.order_total{background-color:#a5cbed}</style>'
		    		html +=  '<table width="100%"><tbody><tr><th class="tableheader">Sales Rep</th><th class="tableheader">Customer</th><th class="tableheader">Order</th><th class="tableheader">Date</th><th class="tableheader">Trans.</th><th class="tableheader">Description</th><th class="tableheader" align="right">Vendor</th><th class="tableheader" align="right">Income</th><th class="tableheader" align="right">Expense</th><th class="tableheader" align="right">GP$</th><th class="tableheader" align="right">GP%</th></tr>'
		    			
				    var salesRepMap = dataMap['salesRepMap'];
	var salesRepArr = Object.keys(salesRepMap);
	nlapiLogExecution('DEBUG','Object.keys', 'salesRepArr'+salesRepArr);
	for (var salesRepArrIndex = 0; salesRepArrIndex < salesRepArr.length; salesRepArrIndex++) {
		var salesRep = salesRepArr[salesRepArrIndex];
		user=salesRep;
		if(salesRepMap[salesRep]){
			var tempSalesRepMap = {};
			tempSalesRepMap = salesRepMap[salesRep];// Sales Rep Map
			
			//Customer
			var customerMap = {};
			customerMap = tempSalesRepMap['customers'];
			var salesRepName = tempSalesRepMap['salesRep_name'];
			var customerMapKeysArr = [];
			customerMapKeysArr = Object.keys(customerMap);
			
			for (var customerMapKeysArrIndex = 0; customerMapKeysArrIndex < customerMapKeysArr.length; customerMapKeysArrIndex++) {
				var customer = customerMapKeysArr[customerMapKeysArrIndex];
				if(customerMap[customer]){
					var tempCustomerMap = {};
					tempCustomerMap = customerMap[customer]; //Customer Map
					
					var orderMap_ = {};
					 orderMap_ = tempCustomerMap['orders'];
					 var customerName = tempCustomerMap['customer_name'];
					 var orderMap_keys =[];
					 orderMap_keys = Object.keys(orderMap_);
					 if(!isEmpty(orderMap_keys)){
						 for (var orderMap_keysIndex = 0; orderMap_keysIndex < orderMap_keys.length; orderMap_keysIndex++) {
							 var orderNumber = orderMap_keys[orderMap_keysIndex];
							 var orderMap = {};
							 orderMap = orderMap_[orderNumber]; // Order Map
							 
							 var orderMap_trans_arr = [];
							 orderMap_trans_arr = orderMap['transArr'];
							 
							 if(!isEmpty(orderMap_trans_arr)){
								 for (var orderMap_trans_arrIndex = 0; orderMap_trans_arrIndex < orderMap_trans_arr.length; orderMap_trans_arrIndex++) {
									var orderMap_trans = {}; 
										orderMap_trans =orderMap_trans_arr[orderMap_trans_arrIndex];
										var date = orderMap_trans['date'];
										var documentNumber = orderMap_trans['transaction'];
										var description = orderMap_trans['description'];
										var vendor = orderMap_trans['vendor_name'];
										if(!isEmpty (vendor))
										{
											vendor=vendor;
										}
										else{
											vendor='';
										}	
										var income = orderMap_trans['income'];
										var expense = orderMap_trans['expense'];
										income = (income?toFixed_(income):'');
										expense = (expense?toFixed_(expense):'');
										// nlapiLogExecution('AUDIT', 'HTML date', date);
										html += '<tr><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+salesRepName+'</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+customerName+'</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="20%">'+orderNumber+'</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%">'+date+'</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="47%">'+documentNumber+'</td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%">'+description+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+vendor+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+income+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+expense+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%"></td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" border-right="solid 1px black" width="20%"></td></tr>';
								}
								// Order Total
								 var tempOrderTotalMap = {};
								 
								 tempOrderTotalMap = orderMap['order_total'];
								 var order_total_income = tempOrderTotalMap['order_total_income'];
								 var order_total_expense = tempOrderTotalMap['order_total_expense'];
								 var gp_amt = tempOrderTotalMap['order_total_gp_amount'];
								 var gp_percent = tempOrderTotalMap['order_total_gp_percent'];
								 order_total_income = (order_total_income?toFixed_(order_total_income):0);
								 order_total_expense = (order_total_expense?toFixed_(order_total_expense):0);
								 gp_amt = (gp_amt?toFixed_(gp_amt):0);
								 gp_percent = (gp_percent?toFixed_(gp_percent):'');
								 html += '<tr class="order_total" style="font-weight: bold;"><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="20%">Order Wise Total</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="47%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%"></td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+order_total_income+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+order_total_expense+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+gp_amt+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" border-right="solid 1px black" width="20%">'+gp_percent+'</td></tr>';
								  
							 }
						}
						 
						
							
							
								
							
					 }
				}
				 // Customer Total
				var tempCustomerTotal = {};
				tempCustomerTotal = tempCustomerMap['customer_total'];
				
				var customer_total_income = tempCustomerTotal['customer_total_income'];
				var customer_total_expense = tempCustomerTotal['customer_total_expense'];
				var customer_gp_amt  = tempCustomerTotal['customer_total_gp_amount'];
				var customer_gp_percent = tempCustomerTotal['customer_total_gp_percent'];
				customer_total_income = (customer_total_income?toFixed_(customer_total_income):0);
				customer_total_expense = (customer_total_expense?toFixed_(customer_total_expense):0);
				customer_gp_amt = (customer_gp_amt?toFixed_(customer_gp_amt):0);
				customer_gp_percent = (customer_gp_percent?toFixed_(customer_gp_percent):'');
				
				html += '<tr class="customer_total" style="font-weight: bold;"><b><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">Customer Wise Total</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="20%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="47%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+customer_total_income+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+customer_total_expense+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+customer_gp_amt+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" border-right="solid 1px black" width="20%">'+customer_gp_percent+'</td></b></tr>';	
			}
			
		}
		
		// SalesRep Total
		var tempSalesRepTotal = {};
		 tempSalesRepTotal = tempSalesRepMap['salesRep_total'];
		
		 	var salesRep_Total_income = tempSalesRepTotal['salesrep_total_income'];
			var salesRep_total_expense =  tempSalesRepTotal['salesrep_total_expense'];
			var salesRep_total_gp_amt = tempSalesRepTotal['salesrep_total_gp_amount'];
			var salesRep_total_gp_percent = tempSalesRepTotal['salesrep_total_gp_percent'];
			
			salesRep_Total_income = (salesRep_Total_income?toFixed_(salesRep_Total_income):0);
			salesRep_total_expense = (salesRep_total_expense?toFixed_(salesRep_total_expense):0);
			salesRep_total_gp_amt = (salesRep_total_gp_amt?toFixed_(salesRep_total_gp_amt):0);
			salesRep_total_gp_percent = (salesRep_total_gp_percent?toFixed_(salesRep_total_gp_percent):'');
			
			html += '<tr class="sales_rep_total" style="font-weight: bold;"><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">Sales Rep Wise Total</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="20%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="47%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+salesRep_Total_income+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+salesRep_total_expense+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+salesRep_total_gp_amt+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" border-right="solid 1px black" width="20%">'+salesRep_total_gp_percent+'</td></tr>';
	}
	

	html += '</tbody></table>';
	  
	   
	
				    }
		    else{
		    	
		    	 html += '<h2>No Records found.</h2>';
		    }
		    
		    
		   
		    	//excel
		    	html += '</body>';
		    	//nlapiLogExecution('AUDIT', 'html', html);
		    	var file = nlapiCreateFile('Profitability Report'+user, 'EXCEL', nlapiEncrypt(html, 'base64'));
		    	
		    	//var file = nlapiCreateFile('Profitability Report'+user, 'PLAINTEXT', html);
		    
		    	
		    	file.setFolder(420);
		    	// set content type, file name, and content-disposition (inline means display in browser)
		    	//nlapiSetContentType('EXCEL','Profitability_Report.xls', 'inline');
		    
		    	//nlapiLogExecution('AUDIT', 'file.getValue()', file.getValue());
		    	nlapiSubmitFile(file);
		    	//response.write( file.getValue()) ;
		    	
		    
		    

}
function toFixed_(number){
	if(number != null && number != undefined && number != ''){
var number1 ;
	switch(typeof number){
	case ('number') : 
	 number1 = number.toFixed(2);
						break;
	case ('string') : 
	number1 = parseFloat(number);
	 number1 = number1.toFixed(2);
						break;
	}
number1 = formatNumber (number1);
return number1; 
	}
	else {
return formatNumber (0);
		
	}
}
function formatNumber (num) {
	if(num == null || num == undefined ||num == '')
		{
		num = 0;
		}
	
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function isEmpty ( stValue ) {
    if ((stValue == '') || (stValue == null) || (stValue == undefined)|| (stValue == '- None -')) {//- None -
        return true;
    }
    else {
        if (stValue instanceof String) {
            if ((stValue == '')) {
                return true;
            }
        }
        else if (stValue instanceof Array) {
            if (stValue.length == 0) {
                return true;
            }
        }
        return false;
    }
}
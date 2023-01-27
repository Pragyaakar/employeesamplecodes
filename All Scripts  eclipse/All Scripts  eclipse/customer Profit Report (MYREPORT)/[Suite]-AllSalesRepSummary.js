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
function AllSalesRepSummary(request, response){
	nlapiLogExecution('DEBUG', 'Suitelet Execution Started');
	
	var startDate =request.getParameter('stdt');
	var endDate = request.getParameter('eddt');
	var salesRep = request.getParameter('srep');
	var customer = request.getParameter('cus');
	var salesOrder = request.getParameter('so');
	var isExcel = request.getParameter('exl');
	
	 var context = nlapiGetContext();
	 var user = context.getUser();
	
	 if(user == '12729')
	 {
		 user='29';
	 }
	 else{
		 user=user;
	 }
	
	 var AllRep =[];
	 var AllRepName =[];
		var filters = new Array();
		// filters[filters.length] = new nlobjSearchFilter('supervisor', null, 'anyof', user);
	      var columns = new Array();
	  	
			 columns[0] = new nlobjSearchColumn("internalid"); 
			 columns[1] =  new nlobjSearchColumn("entityid");
		  var searchResults = nlapiSearchRecord('employee','customsearch_employe_supervisor',filters,columns);

		

			if(searchResults)
			{
				for (result in searchResults)
				{	
				  // AllRep.push(searchResults[result].getValue("internalid"));// new nlobjSearchColumn("entityid")
				  AllRep.push(searchResults[result].getValue("entityid"));
		        }
			}
			
	renderForm(startDate,endDate,AllRep,user,isExcel,AllRepName)
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

function renderForm(startDate,endDate,AllRep,user,isExcel,AllRepName){
	 //nlapiLogExecution('DEBUG', '->AllRep', AllRep);
	var html='';
	if(isEmpty(isExcel)){
		// form
		 html = '<html lang="en"><head>'
		    +' <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
		    +'<style>'
		    +'body {font-family:Open Sans,Helvetica,sans-serif;font-size: 8pt;}'
		    +'</style>'
		    +'</head>';
		 html += '<body bgcolor="#FFFFFF" class="body_2010 nl-pagetint " link="#000000" vlink="#000000" alink="#000000" text="#000000" style="background-image:none;margin: 5px 0px 5px 0px;">';

		
		    if(!isEmpty(AllRep)){
		    	nlapiLogExecution('DEBUG', 'dataMap Is not empty');
		    	
		    	html += '<div id="pageContainer" class="ns-vertical-container">'
		    	   
		    				    + ' <style type="text/css">* {<#if .locale == "zh_CN">font-family: NotoSans, NotoSansCJKsc, sans-serif;<#elseif .locale == "zh_TW">font-family: NotoSans, NotoSansCJKtc, sans-serif;<#elseif .locale == "ja_JP">font-family: NotoSans, NotoSansCJKjp, sans-serif;<#elseif .locale == "ko_KR">font-family: NotoSans, NotoSansCJKkr, sans-serif;<#elseif .locale == "th_TH">font-family: NotoSans, NotoSansThai, sans-serif;<#else>font-family: NotoSans, sans-serif;</#if>}table {font-size: 9pt;table-layout: fixed;}th.tableheader {font-weight: bold;font-size: 10pt;vertical-align: middle;padding: 5px 6px 3px;background-color: #607799;color: #fefefe;}td {padding: 4px 6px;}td p { align:left }b {font-weight: bold;color: #333333;}table.header td {padding: 0;font-size: 10pt;}table.footer td {padding: 0;font-size: 8pt;}table.itemtable th {padding-bottom: 10px;padding-top: 10px;}table.body td {padding-top: 2px;}.even {padding-top: 2px;background-color: #FAFAFA;}table.total {page-break-inside: avoid;}tr.totalrow {background-color: #e3e3e3;line-height: 200%;}td.totalsummary {background-color: #e3e3e3;}td.totalboxtop {font-size: 12pt;background-color: #e3e3e3;}td.addressheader {font-size: 8pt;padding-top: 6px;padding-bottom: 2px;}td.address {padding-top: 0;}td.totalboxmid {font-size: 28pt;padding-top: 20px;background-color: #e3e3e3;}span.title {font-size: 28pt;}span.number {font-size: 16pt;}hr {width: 100%;color: #d3d3d3;background-color: #d3d3d3;height: 1px;}tr.startRow{background-color: #efefa3;border-top: 2px dashed gray;border-left:2px dashed gray;border-bottom:2px dashed gray;}tr.endRow{background-color: #efefa3;border-top: 2px dashed gray;border-left: 2px dashed gray;border-bottom: 2px dashed gray;}.sales_rep_total{background-color:#f1bee8}.customer_total{background-color:#FF7F50}.order_total{background-color:#a5cbed}<head></style>'
		    				    + '<br><table width="100%"><tbody><tr><th class="tableheader">Sales Rep</th><th class="tableheader">Customer</th><th class="tableheader">Order</th><th class="tableheader">Date</th><th class="tableheader">Trans.</th><th class="tableheader">Description</th><th class="tableheader" align="right">Vendor</th><th class="tableheader" align="right">Income</th><th class="tableheader" align="right">Expense</th><th class="tableheader" align="right">GP$</th><th class="tableheader" align="right">GP%</th></tr>'
		    			
		    				    
		    				    var FinIncometotal =0.00;
   				 			    var FinExpensetotal =0.00;
		    				    	 for (var j2=0;j2<AllRep.length;j2++)
		    				    	{
		    				    		var filters1 = [];
		    				    		filters1[0] = new nlobjSearchFilter ('trandate', null, 'within', startDate,endDate);
		    				 			filters1[1] = new nlobjSearchFilter ("custcol_cust_line_rep",null,'is',AllRep[j2]);//AllRep[j2]
		    				 			
		    				 			//"salesrep","CUSTCOL_CLS_BILL_ORDER",..............'salesteammember', 'custcol_cls_bill_order',
		    				 			 var searchResultItem1 = getSavedSearchResult(null, 'customsearch_all_rep_summary_report', filters1);
		    				 			 nlapiLogExecution('DEBUG', '->searchResult1 Length',searchResultItem1.length);
		    				 			 // nlapiLogExecution('DEBUG', '->AllRep ',AllRep);
                                      
		    				    		if (searchResultItem1 != null)
				    					{
					    				    var income =0;
					    				    var expense =0;
					    				    var check=0;
					    				    var checktype='';
					    				    var ordtype='';
					    				    var ShipCostTotal=0;
					    				    var shipMap={};
					    				    var amt=0.00;
					    				    var amt1=0.00;
					    				    var amt3=0.00;
					    				    var amt4=0.00;
					    				    var amt5=0.00;
					    				    var amt6=0.00;
					    				    var amt7=0.00;
					    				    var amt8=0.00;
				    				    		for(var j1=0;j1<searchResultItem1.length;j1++)
					    						{
				    				    			var OrdNo = searchResultItem1[j1].getValue(new nlobjSearchColumn("custcol_order_number",null,"GROUP"));
						    										    				    			
					    							var Customer = searchResultItem1[j1].getValue(new nlobjSearchColumn("custcol_entity_name",null,"GROUP"));
					    						
					    							var type = searchResultItem1[j1].getValue(new nlobjSearchColumn("type",null,"GROUP"));
					    		                    
					    							var CogsAmt = searchResultItem1[j1].getValue(new nlobjSearchColumn("cogsamount",null,"SUM"));
					    		                    
					    							var Amount = searchResultItem1[j1].getValue(new nlobjSearchColumn("amount",null,"SUM"));
					    		                    
					    							var ShipCost = searchResultItem1[j1].getValue(new nlobjSearchColumn("shippingcost",null,"MAX"));
					    		                  
					    							   
					    							var docNo = searchResultItem1[j1].getValue(new nlobjSearchColumn("tranid",null,"GROUP"));
						    						
					    							var Account = searchResultItem1[j1].getValue(new nlobjSearchColumn("formulatext",null,"GROUP"));
						    						
					    							  var n = Account.indexOf(" ");
					    							  var noOfacc = Account.substring(0,n);
					    							  
					    							  if(ShipCost !=null && ShipCost!='' && ShipCost!=undefined)
					    							  {
					    								  ShipCost=ShipCost;
					    							  }
					    							  else {
					    								  ShipCost=0.00;
					    							  }
					    							
					    							
					    							if(type ==='CustInvc' ||type ==='CustCred')
					    							{
					    								if(Amount !=null && Amount!=undefined && Amount !='')
					    								{
					    									amt += parseFloat(Amount);
					    								}
					    								
					    								 if(ShipCost !=null && ShipCost!='' && ShipCost!=undefined)
						    							  {
						    								  ShipCostTotal= parseFloat(ShipCostTotal)+parseFloat(ShipCost);
						    							  }
						    							  
					    							}
					    							else if(type ==='VendBill')
					    						    {
					    								if(Amount !=null && Amount!=undefined && Amount !='')
					    								{
					    								  amt1 += parseFloat(Amount);
					    								}
					    						    }
					    							else if(type ==='ItemShip')
					    						    {
					    								if(CogsAmt !=null && CogsAmt!=undefined && CogsAmt !='')
					    								{
					    								  amt5 += parseFloat(CogsAmt);
					    								}
					    						    }
					    							else if(type ==='ItemRcpt')
					    						    {
					    								if(CogsAmt !=null && CogsAmt!=undefined && CogsAmt !='')
					    								{
					    								  amt6 += parseFloat(CogsAmt);
					    								}
					    						    }
					    							else if(type ==='Journal' && (noOfacc >=50000))
					    						    {
					    								if(Amount !=null && Amount!=undefined && Amount !='')
					    								{
					    								  amt7 += parseFloat(Amount);
					    								}
					    						    }
					    							else if(type ==='Journal' && (noOfacc >=40000 && noOfacc <= 49999))
					    						    {
					    								if(Amount !=null && Amount!=undefined && Amount !='')
					    								{
					    								  amt8 += parseFloat(Amount);
					    								}
					    						    }
					    							
					    							//amt3 = parseFloat(amt3)+parseFloat(amt);
					    							// amt4 = parseFloat(amt4)+parseFloat(amt1);
					    							
					    				        }
				    				    		
				    				    		if(amt6 < 0)
				    				    		{
				    				    			amt6= parseFloat(0-amt6);
				    				    		}
				    				    		// nlapiLogExecution('DEBUG','AllREP Report Out side For','[Amount ->'+Amount+']'+'][amt ->'+amt+']'+'[amt1 ->'+amt1+']'+'[shipTot ->'+shipTot+']');
				    				    		
				    				      		var income = parseFloat(amt)+parseFloat(amt8)+parseFloat(ShipCostTotal);
				    				    		var expense= parseFloat(amt5)+parseFloat(amt1)+parseFloat(amt7)-parseFloat(amt6);
				    				    		nlapiLogExecution('DEBUG','AllREP Report','[Income ->'+income +'][amt3 ->'+amt+']'+'][ShipCostTotal ->'+ShipCostTotal+']');
							    			   nlapiLogExecution('DEBUG','AllREP Report','[expense ->'+expense+'][amt6 ->'+amt6+']'+'][amt5 ->'+amt5+']'+'][amt1 ->'+amt1+']');
							    				   
				    				    		 nlapiLogExecution('DEBUG','AllREP Report','->AllRep='+AllRep[j2]+' income='+parseFloat(income).toFixed(2)+' expense'+parseFloat(expense).toFixed(2));
				    				    	//nlapiLogExecution('DEBUG', '->income',AllRep[j2]);
				    				 			 var GP = parseFloat(income)- parseFloat(expense);
				    				 			 
				    				 			 var gpPercent = parseFloat(GP)/parseFloat(income) *100;
				    				 			
				    				 			 
				    				 			FinIncometotal= parseFloat(FinIncometotal)+parseFloat(income);
				    				 			FinExpensetotal= parseFloat(FinExpensetotal)+parseFloat(expense);
				    				 			
				    				 			 
				    				 			 if(gpPercent!=null && isFinite(gpPercent))
				    				 			 {
				    				 				 if(isNaN(gpPercent))
				    				 				 {
				    				 					gpPercent=0;
				    				 				 }
				    				 				 else
				    				 				 {
				    				 					gpPercent=gpPercent;
				    				 				 }
				    				 			
				    				 			 }
				    				 			 else
				    				 			 {
				    				 				gpPercent=0;
				    				 			 }
				    				    		// html += '<tr class="customer_total"><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">Customer  Total</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="20%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="47%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+income+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+expense+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+income+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" border-right="solid 1px black" width="20%">'+income+'</td></tr>';
				    				    		html += '<tr class="sales_rep_total"><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+AllRep[j2]+'</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">Sales Rep Total</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="20%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="47%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+formatNumber(parseFloat(income).toFixed(2))+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+formatNumber(parseFloat(expense).toFixed(2))+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+formatNumber(parseFloat(GP).toFixed(2))+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" border-right="solid 1px black" width="20%">'+formatNumber(parseFloat(gpPercent).toFixed(2))+'</td></tr>';
	
		    				    	      }
		    						       var FinGP = parseFloat(FinIncometotal)+parseFloat(FinExpensetotal);
		    						       var FingpPercent = parseFloat(FinGP)/parseFloat(FinIncometotal) *100;
		    						  	 if(FingpPercent!=null && isFinite(FingpPercent))
		    				 			 {
		    				 				 if(isNaN(FingpPercent))
		    				 				 {
		    				 					FingpPercent=0;
		    				 				 }
		    				 				 else
		    				 				 {
		    				 					FingpPercent=FingpPercent;
		    				 				 }
		    				 			
		    				 			 }
		    				 			 else
		    				 			 {
		    				 				FingpPercent=0;
		    				 			 }
		    						  	 
		    				        	}

	
        html += '</tbody></table>'
	   +'</div>';
	   
				    }
		    else{
		    	
		    	 html += '<h2>No Records found.</h2>';
		    }
		    
		    
		    
		    	// form
		    	html += '</body> </html>';
		    	response.write(html);
		    
	}
	else{
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
		    if(!isEmpty(AllRep)){
		    	nlapiLogExecution('DEBUG', 'dataMap Is not empty');
		    	
		    	
		    	   
		    	//html +=  ' <style type="text/css">* {<#if .locale == "zh_CN">font-family: NotoSans, NotoSansCJKsc, sans-serif;<#elseif .locale == "zh_TW">font-family: NotoSans, NotoSansCJKtc, sans-serif;<#elseif .locale == "ja_JP">font-family: NotoSans, NotoSansCJKjp, sans-serif;<#elseif .locale == "ko_KR">font-family: NotoSans, NotoSansCJKkr, sans-serif;<#elseif .locale == "th_TH">font-family: NotoSans, NotoSansThai, sans-serif;<#else>font-family: NotoSans, sans-serif;</#if>}table {font-size: 9pt;table-layout: fixed;}th.tableheader {font-weight: bold;font-size: 10pt;vertical-align: middle;padding: 5px 6px 3px;background-color: #607799;color: #fefefe;}td {padding: 4px 6px;}td p { align:left }b {font-weight: bold;color: #333333;}table.header td {padding: 0;font-size: 10pt;}table.footer td {padding: 0;font-size: 8pt;}table.itemtable th {padding-bottom: 10px;padding-top: 10px;}table.body td {padding-top: 2px;}.even {padding-top: 2px;background-color: #FAFAFA;}table.total {page-break-inside: avoid;}tr.totalrow {background-color: #e3e3e3;line-height: 200%;}td.totalsummary {background-color: #e3e3e3;}td.totalboxtop {font-size: 12pt;background-color: #e3e3e3;}td.addressheader {font-size: 8pt;padding-top: 6px;padding-bottom: 2px;}td.address {padding-top: 0;}td.totalboxmid {font-size: 28pt;padding-top: 20px;background-color: #e3e3e3;}span.title {font-size: 28pt;}span.number {font-size: 16pt;}hr {width: 100%;color: #d3d3d3;background-color: #d3d3d3;height: 1px;}tr.startRow{background-color: #efefa3;border-top: 2px dashed gray;border-left:2px dashed gray;border-bottom:2px dashed gray;}tr.endRow{background-color: #efefa3;border-top: 2px dashed gray;border-left: 2px dashed gray;border-bottom: 2px dashed gray;}.sales_rep_total{background-color:#f1bee8}.customer_total{background-color:#FF7F50}.order_total{background-color:#a5cbed}</style>'
		    		html +=  '<table width="100%"><tbody><tr><th class="tableheader">Sales Rep</th><th class="tableheader">Customer</th><th class="tableheader">Order</th><th class="tableheader">Date</th><th class="tableheader">Trans.</th><th class="tableheader">Description</th><th class="tableheader" align="right">Vendor</th><th class="tableheader" align="right">Income</th><th class="tableheader" align="right">Expense</th><th class="tableheader" align="right">GP$</th><th class="tableheader" align="right">GP%</th></tr>'

		    			   
    				    var FinIncometotal =0.00;
			 			    var FinExpensetotal =0.00;
    				    	 for (var j2=0;j2<AllRep.length;j2++)
    				    	{
    				    		var filters1 = [];
    				    		filters1[0] = new nlobjSearchFilter ('trandate', null, 'within', startDate,endDate);
    				 			filters1[1] = new nlobjSearchFilter ("custcol_cust_line_rep",null,'is',AllRep[j2]);//AllRep[j2]
    				 			
    				 			//"salesrep","CUSTCOL_CLS_BILL_ORDER",..............'salesteammember', 'custcol_cls_bill_order',
    				 			 var searchResultItem1 = getSavedSearchResult(null, 'customsearch_all_rep_summary_report', filters1);
    				 			 nlapiLogExecution('DEBUG', '->searchResult1 Length',searchResultItem1.length);
    				 			 // nlapiLogExecution('DEBUG', '->AllRep ',AllRep);
                              
    				    		if (searchResultItem1 != null)
		    					{
			    				    var income =0;
			    				    var expense =0;
			    				    var check=0;
			    				    var checktype='';
			    				    var ordtype='';
			    				    var ShipCostTotal=0;
			    				    var shipMap={};
			    				    var amt=0.00;
			    				    var amt1=0.00;
			    				    var amt3=0.00;
			    				    var amt4=0.00;
			    				    var amt5=0.00;
			    				    var amt6=0.00;
			    				    var amt7=0.00;
			    				    var amt8=0.00;
		    				    		for(var j1=0;j1<searchResultItem1.length;j1++)
			    						{
		    				    			var OrdNo = searchResultItem1[j1].getValue(new nlobjSearchColumn("custcol_order_number",null,"GROUP"));
				    										    				    			
			    							var Customer = searchResultItem1[j1].getValue(new nlobjSearchColumn("custcol_entity_name",null,"GROUP"));
			    						
			    							var type = searchResultItem1[j1].getValue(new nlobjSearchColumn("type",null,"GROUP"));
			    		                    
			    							var CogsAmt = searchResultItem1[j1].getValue(new nlobjSearchColumn("cogsamount",null,"SUM"));
			    		                    
			    							var Amount = searchResultItem1[j1].getValue(new nlobjSearchColumn("amount",null,"SUM"));
			    		                    
			    							var ShipCost = searchResultItem1[j1].getValue(new nlobjSearchColumn("shippingcost",null,"MAX"));
			    		                  
			    							   
			    							var docNo = searchResultItem1[j1].getValue(new nlobjSearchColumn("tranid",null,"GROUP"));
				    						
			    							var Account = searchResultItem1[j1].getValue(new nlobjSearchColumn("formulatext",null,"GROUP"));
				    						
			    							  var n = Account.indexOf(" ");
			    							  var noOfacc = Account.substring(0,n);
			    							  
			    							  if(ShipCost !=null && ShipCost!='' && ShipCost!=undefined)
			    							  {
			    								  ShipCost=ShipCost;
			    							  }
			    							  else {
			    								  ShipCost=0.00;
			    							  }
			    							
			    							
			    							if(type ==='CustInvc' ||type ==='CustCred')
			    							{
			    								if(Amount !=null && Amount!=undefined && Amount !='')
			    								{
			    									amt += parseFloat(Amount);
			    								}
			    								
			    								 if(ShipCost !=null && ShipCost!='' && ShipCost!=undefined)
				    							  {
				    								  ShipCostTotal= parseFloat(ShipCostTotal)+parseFloat(ShipCost);
				    							  }
				    							  
			    							}
			    							else if(type ==='VendBill')
			    						    {
			    								if(Amount !=null && Amount!=undefined && Amount !='')
			    								{
			    								  amt1 += parseFloat(Amount);
			    								}
			    						    }
			    							else if(type ==='ItemShip')
			    						    {
			    								if(CogsAmt !=null && CogsAmt!=undefined && CogsAmt !='')
			    								{
			    								  amt5 += parseFloat(CogsAmt);
			    								}
			    						    }
			    							else if(type ==='ItemRcpt')
			    						    {
			    								if(CogsAmt !=null && CogsAmt!=undefined && CogsAmt !='')
			    								{
			    								  amt6 += parseFloat(CogsAmt);
			    								}
			    						    }
			    							else if(type ==='Journal' && (noOfacc >=50000))
			    						    {
			    								if(Amount !=null && Amount!=undefined && Amount !='')
			    								{
			    								  amt7 += parseFloat(Amount);
			    								}
			    						    }
			    							else if(type ==='Journal' && (noOfacc >=40000 && noOfacc <= 49999))
			    						    {
			    								if(Amount !=null && Amount!=undefined && Amount !='')
			    								{
			    								  amt8 += parseFloat(Amount);
			    								}
			    						    }
			    							
			    							//amt3 = parseFloat(amt3)+parseFloat(amt);
			    							// amt4 = parseFloat(amt4)+parseFloat(amt1);
			    							
			    				        }
		    				    		
		    				    		if(amt6 < 0)
		    				    		{
		    				    			amt6= parseFloat(0-amt6);
		    				    		}
		    				    		// nlapiLogExecution('DEBUG','AllREP Report Out side For','[Amount ->'+Amount+']'+'][amt ->'+amt+']'+'[amt1 ->'+amt1+']'+'[shipTot ->'+shipTot+']');
		    				    		
		    				      		var income = parseFloat(amt)+parseFloat(amt8)+parseFloat(ShipCostTotal);
		    				    		var expense= parseFloat(amt5)+parseFloat(amt1)+parseFloat(amt7)-parseFloat(amt6);
		    				    		nlapiLogExecution('DEBUG','AllREP Report','[Income ->'+income +'][amt3 ->'+amt+']'+'][ShipCostTotal ->'+ShipCostTotal+']');
					    			   nlapiLogExecution('DEBUG','AllREP Report','[expense ->'+expense+'][amt6 ->'+amt6+']'+'][amt5 ->'+amt5+']'+'][amt1 ->'+amt1+']');
					    				   
		    				    		 nlapiLogExecution('DEBUG','AllREP Report','->AllRep='+AllRep[j2]+' income='+parseFloat(income).toFixed(2)+' expense'+parseFloat(expense).toFixed(2));
		    				    	//nlapiLogExecution('DEBUG', '->income',AllRep[j2]);
		    				 			 var GP = parseFloat(income)- parseFloat(expense);
		    				 			 
		    				 			 var gpPercent = parseFloat(GP)/parseFloat(income) *100;
		    				 			
		    				 			 
		    				 			FinIncometotal= parseFloat(FinIncometotal)+parseFloat(income);
		    				 			FinExpensetotal= parseFloat(FinExpensetotal)+parseFloat(expense);
		    				 			
		    				 			 
		    				 			 if(gpPercent!=null && isFinite(gpPercent))
		    				 			 {
		    				 				 if(isNaN(gpPercent))
		    				 				 {
		    				 					gpPercent=0;
		    				 				 }
		    				 				 else
		    				 				 {
		    				 					gpPercent=gpPercent;
		    				 				 }
		    				 			
		    				 			 }
		    				 			 else
		    				 			 {
		    				 				gpPercent=0;
		    				 			 }
		    				    		// html += '<tr class="customer_total"><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">Customer  Total</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="20%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="47%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+income+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+expense+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+income+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" border-right="solid 1px black" width="20%">'+income+'</td></tr>';
		    				    		html += '<tr class="sales_rep_total"><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+AllRep[j2]+'</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">Sales Rep Total</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="20%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="47%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="left" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="30%"></td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+formatNumber(parseFloat(income).toFixed(2))+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+formatNumber(parseFloat(expense).toFixed(2))+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+formatNumber(parseFloat(GP).toFixed(2))+'</td><td align="right" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" border-right="solid 1px black" width="20%">'+formatNumber(parseFloat(gpPercent).toFixed(2))+'</td></tr>';

    				    	      }
    						       var FinGP = parseFloat(FinIncometotal)+parseFloat(FinExpensetotal);
    						       var FingpPercent = parseFloat(FinGP)/parseFloat(FinIncometotal) *100;
    						  	 if(FingpPercent!=null && isFinite(FingpPercent))
    				 			 {
    				 				 if(isNaN(FingpPercent))
    				 				 {
    				 					FingpPercent=0;
    				 				 }
    				 				 else
    				 				 {
    				 					FingpPercent=FingpPercent;
    				 				 }
    				 			
    				 			 }
    				 			 else
    				 			 {
    				 				FingpPercent=0;
    				 			 }
    						  	 
    				        	}
			
			html += '</tbody></table>';
	  
	   
	
				    }
		    else{
		    	
		    	 html += '<h2>No Records found.</h2>';
		    }
		    
		    
		   
		    	//excel
		    	html += '</body>';
		    	nlapiLogExecution('AUDIT', 'html', html);
		    	var file = nlapiCreateFile('Profitability Report'+user, 'EXCEL', nlapiEncrypt(html, 'base64'));
		    	
		    	//var file = nlapiCreateFile('Profitability Report'+user, 'PLAINTEXT', html);
		    
		    	
		    	file.setFolder(8900);
		    	// set content type, file name, and content-disposition (inline means display in browser)
		    	response.setContentType('EXCEL','Profitability_Report.xls', 'inline');
		    /*	var fileID = nlapiSubmitFile(file);
		    	var urlValue = nlapiLookupField('file', fileID, 'url');
		    	// write response to the client
		    	nlapiLogExecution('DEBUG', 'fileID:'+fileID,'urlValue:'+urlValue);*/
		    	nlapiLogExecution('AUDIT', 'file.getValue()', file.getValue());
		    	nlapiSubmitFile(file);
		    	response.write( file.getValue()) ;
		    	
	}
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
function requisitionReportSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','Requisition Status Report', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		
	
		 //=====================================================================================
		    var html='';
			// form
			 html = '<html lang="en"><head>'
			    +' <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
			    +'<style>'
			    +'body {font-family:Open Sans,Helvetica,sans-serif;font-size: 8pt;}'
			    +'</style>'
			    +'</head>';
			 html += '<body bgcolor="#FFFFFF" class="body_2010 nl-pagetint " link="#000000" vlink="#000000" alink="#000000" text="#000000" style="background-image:none;margin: 5px 0px 5px 0px;">';

			
			    	
			    	html += '<div id="pageContainer" class="ns-vertical-container">'
			    	   
			    				    + ' <style type="text/css">* {<#if .locale == "zh_CN">font-family: NotoSans, NotoSansCJKsc, sans-serif;<#elseif .locale == "zh_TW">font-family: NotoSans, NotoSansCJKtc, sans-serif;<#elseif .locale == "ja_JP">font-family: NotoSans, NotoSansCJKjp, sans-serif;<#elseif .locale == "ko_KR">font-family: NotoSans, NotoSansCJKkr, sans-serif;<#elseif .locale == "th_TH">font-family: NotoSans, NotoSansThai, sans-serif;<#else>font-family: NotoSans, sans-serif;</#if>}table {font-size: 9pt;table-layout: fixed;}th.tableheader {font-weight: bold;font-size: 10pt;vertical-align: middle;padding: 5px 6px 3px;background-color: #607799;color: #fefefe;}td {padding: 4px 6px;}td p { align:left }b {font-weight: bold;color: #333333;}table.header td {padding: 0;font-size: 10pt;}table.footer td {padding: 0;font-size: 8pt;}table.itemtable th {padding-bottom: 10px;padding-top: 10px;}table.body td {padding-top: 2px;}.even {padding-top: 2px;background-color: #FAFAFA;}table.total {page-break-inside: avoid;}tr.totalrow {background-color: #e3e3e3;line-height: 200%;}td.totalsummary {background-color: #e3e3e3;}td.totalboxtop {font-size: 12pt;background-color: #e3e3e3;}td.addressheader {font-size: 8pt;padding-top: 6px;padding-bottom: 2px;}td.address {padding-top: 0;}td.totalboxmid {font-size: 28pt;padding-top: 20px;background-color: #e3e3e3;}span.title {font-size: 28pt;}span.number {font-size: 16pt;}hr {width: 100%;color: #d3d3d3;background-color: #d3d3d3;height: 1px;}tr.startRow{background-color: #efefa3;border-top: 2px dashed gray;border-left:2px dashed gray;border-bottom:2px dashed gray;}tr.endRow{background-color: #efefa3;border-top: 2px dashed gray;border-left: 2px dashed gray;border-bottom: 2px dashed gray;}.sales_rep_total{background-color:#f1bee8}.customer_total{background-color:#FF7F50}.order_total{background-color:#a5cbed} h1{ width:50%, margin: auto; text-align:center; margin-top:50px;}<head></style>'
			    				    +'<h1> Purchase Order Status Report</h1>'
			    				    + '<br><table width="100%"><tbody><tr><th class="tableheader">Location</th><th class="tableheader">Pending Approval</th><th class="tableheader">Orders to Receive</th><th class="tableheader">Partially Receive</th></tr>'
			    			
			    					var filters = new Array();
			    					 var results = GetSearchResults(filters,columns);
			    					
			    					for (var i = 1; i <= results.length; i++) //
			    					{ 
			    						var columns = results[i-1].getAllColumns();
			    						var project = results[i-1].getValue(columns[0]);
			    						var Location= results[i-1].getText(columns[1]);
			    						var Location1= results[i-1].getValue(columns[1]);
			    						var PendingApp = results[i-1].getValue(columns[4]);
			    						var OrderToReceiv= results[i-1].getValue(columns[6]);
			    						var PartReceiv= results[i-1].getValue(columns[8]);
			    						
			    				    html += '<tr><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+Location+'</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%"><a href="https://5375453-sb1.app.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&CU_Entity_ENTITYID='+project+'&Transaction_LOCATION=&style=REPORT&CU_Entity_ENTITYIDtype=STARTSWITH&report=T&grid=&searchid=162&sortcol=Transaction_LOCATION_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=1000">'+PendingApp+'</a></td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="15%">'+OrderToReceiv+'</td><td align="center" font-size="9" border-bottom="solid 1px black" border-left="solid 1px black" width="20%">'+PartReceiv+'</td></tr>';
			    					}			    	      

		
	        html += '</tbody></table>'
		   +'</div>';
		 
			    	html += '</body> </html>';
			    	response.write(html);
			    
		
		 
		 
		 //=====================================================================================
		   


      	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','Requisition Status Report', "in POST   ");
	
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','Requisition Status Report', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}// END orderRequisitionSuitelet()


function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('purchaseorder', 'customsearch_atpl_test_pr_search_2', filters, columns);
	return results;
}

// BEGIN OBJECT CALLED/INVOKING FUNCTION ===================================================

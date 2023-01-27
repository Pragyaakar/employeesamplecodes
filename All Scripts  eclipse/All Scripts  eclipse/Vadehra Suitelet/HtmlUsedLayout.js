function requisitionReportSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','Requisition Status Report', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','Requisition Status Report', "in GET = ");
		
	    var html='';
	
		 html ='<html>'
		 +'<title> Purchase Order Status Report</title>'
		 +'<style>* {font-family: sans-serif;} '
		 +'table,h1{ width: 1350px; margin: auto; table-layout:fixed; text-align:center; margin-top:50px;}'
		 +'.content-table {border-collapse: collapse;margin: 25px 0;font-size: 0.9em;min-width: 400px;border-radius: 5px 5px 0 0;overflow: hidden;box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);}'

		 +'.content-table thead tr {background-color: #009879;color: #ffffff;text-align: center;font-weight: bold;}'

		 +'.content-table th,.content-table td { padding: 18px 18px;}'

		 +'.content-table tbody tr {border-bottom: 1px solid #dddddd;}.content-table tbody tr:nth-of-type(even) {background-color: #f3f3f3;}'

		 +'.content-table tbody tr:last-of-type {border-bottom: 2px solid #009879;}</style>'

		// +'.content-table tbody tr.active-row {font-weight: bold;color: #009879;}'
		 +'<body>'
		 +'<h1> Purchase Order Status Report</h1>'
		 
		 +'<table class="content-table">'
		 +'<thead>' 
		 +'<tr>'   
		 +'<th>Location</th>' 
		 +'<th>Pending Approval</th>' 
		 +'<th>Orders to Receive</th>' 
		 +'<th>Partially Receive</th>' 
		 +'</tr>'
		 +'</thead>'
		 +'<tbody>'
		   
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
			
			 
		   html+='<tr><td>'+Location+'</td><td><a href="https://5375453-sb1.app.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&CU_Entity_ENTITYID='+project+'&Transaction_LOCATION=&style=REPORT&CU_Entity_ENTITYIDtype=STARTSWITH&report=T&grid=&searchid=162&sortcol=Transaction_LOCATION_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=1000">'+PendingApp+'</a></td>'
		     +'<td>'+OrderToReceiv+'</td><td>'+PartReceiv+'</td></tr>'
			 
		}
		
		
		
		
		  
			   
		//   +' <td>Delhi : Factory </td><td><a href="https://www.google.com">50</a></td><td>15</td><td>0</td>'
	      
		 html+='</tbody>';
		 html+='</table></body></html>';
		   
		response.write(html);

      	
		

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

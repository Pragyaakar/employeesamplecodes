function requisitionReportSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','Requisition Status Report', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','Requisition Status Report', "in GET = ");
	var html='';
	
		 html ='<html lang="en"><head>'
			 + '<style type="text/css">$baseColor: #398B93;$borderRadius: 10px;$imageBig: 100px;$imageSmall: 60px;$padding: 10px;'
			+'body {background-color: lighten($baseColor, 30%);* { box-sizing: border-box; }}'
            +'.header {background-color: darken($baseColor, 5%);color: white;font-size: 1.5em;padding: 1rem; text-align: center;text-transform: uppercase;}'
			+'img {border-radius: 50%;height: $imageSmall; width: $imageSmall;}'		 
			+'.table-users {border: 1px solid darken($baseColor, 5%);border-radius: $borderRadius;box-shadow: 3px 3px 0 rgba(0,0,0,0.1);max-width: calc(100% - 2em);margin: 1em auto; overflow: hidden; width: 800px; }'
		    
		   +'table { width: 100%; td, th {  color: darken($baseColor, 10%);padding: $padding; }'
		 + 'td {text-align: center; vertical-align: middle;&:last-child { font-size: 0.95em;line-height: 1.4;  text-align: left;}}'
			+'th { background-color: lighten($baseColor, 50%);font-weight: 300;} tr {  &:nth-child(2n) { background-color: white; }&:nth-child(2n+1) { background-color: lighten($baseColor, 55%) }  }}'     
			 +'@media screen and (max-width: 700px) {table, tr, td { display: block; }td {&:first-child {position: absolute; top: 50%;transform: translateY(-50%);width: $imageBig;} '
			 +'&:not(:first-child) { clear: both;margin-left: $imageBig;padding: 4px 20px 4px 90px;position: relative; text-align: left;&:before {color: lighten($baseColor, 30%);;display: block;left: 0;position: absolute;}}'
			 +'&:nth-child(2):before { content: "Location"; }&:nth-child(3):before { content: "Pending Approval"; }&:nth-child(4):before { content: "Orders to Receive"; }&:nth-child(5):before { content: "Partially Receive"; }}'
			 +'tr {padding: $padding 0;position: relative;&:first-child { display: none; }}}'
			 +'@media screen and (max-width: 500px) {.header {background-color: transparent;color: lighten($baseColor, 60%);font-size: 2em;font-weight: 700;padding: 0;text-shadow: 2px 2px 0 rgba(0,0,0,0.1);}'
			 +'td {&:first-child {background-color: lighten($baseColor, 45%);border-bottom: 1px solid lighten($baseColor, 30%);border-radius: $borderRadius $borderRadius 0 0;position: relative;top: 0;transform: translateY(0);width: 100%; }'			       
			 +'&:not(:first-child) { margin: 0;padding: 5px 1em;width: 100%;&:before {font-size: .8em; padding-top: 0.3em; position: relative;}}&:last-child  { padding-bottom: 1rem !important; }}'
			 +'tr {background-color: white !important;border: 1px solid lighten($baseColor, 20%);border-radius: $borderRadius;box-shadow: 2px 2px 0 rgba(0,0,0,0.1);margin: 0.5rem 0;padding: 0;}'
			 +'.table-users { border: none; box-shadow: none;overflow: visible;}}'
			 +'</head></style>'
			 +'<body>'
			 +'<div class="table-users">'
		   +'<div class="header">Requisition Status Report</div>'
		  +'<table cellspacing="0">'
		   +'<tr>'   
		    +'<th>Location</th>'     
		    +'<th>Pending Approval</th>'     
		    +'<th>Orders to Receive</th>'     
		    +'<th>Partially Receive</th>'     
		    +'</tr>'
		       
	var filters = new Array();

		 var results = GetSearchResults(filters,null); 
	
	
		for (var i = 1; i <= results.length; i++) //
		{ 
			var columns = results[i-1].getAllColumns();
			var project = results[i-1].getValue(columns[0]);
			var Location= results[i-1].getValue(columns[1]);
			var PendingApp = results[i-1].getValue(columns[4]);
			var OrderToReceiv= results[i-1].getValue(columns[6]);
			var PartReceiv= results[i-1].getValue(columns[8]);
			
			+'<tr>'  
		     +'<td>'+Location+'</td>'
		     +'<td><a href="https://www.w3schools.com">'+PendingApp+'</a></td>'
		     +'<td>'+OrderToReceiv+'</td>'
		     +'<td>'+PartReceiv+'</td>'
		     +'<tr>'

			
		}
		+'</table></div>';
		
		html += '</body></html>';
		   
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

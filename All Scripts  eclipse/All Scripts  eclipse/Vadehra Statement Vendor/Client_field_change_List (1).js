/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Jan 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */

function refresh()
{
	window.location.reload();
}

function clientScriptPDF_createrecord()
{
	var vendorname = new Array();
	var customername=new Array();
	var employeename=new Array();
	var ledgername=new Array();
	
//	var type = nlapiGetFieldValue('custpage_type');
	
	vendorname = nlapiGetFieldValue('custpage_vendorname');
	// alert('vendorname'+vendorname)
	

//	var locationname = nlapiGetFieldValue('custpage_locationname'); //locationname
	var startdate = nlapiGetFieldValue('startdate');
	var enddate = nlapiGetFieldValue('enddate');
	var email = nlapiGetFieldValue('email');
	
	//if(type == '4')
    {		
	
	if (vendorname != null && vendorname != '' && vendorname != undefined)
	{
		//alert('vendorname set')
		if (startdate != null && startdate != '' && startdate != undefined)
		{
			//alert('startdate set')
			if (enddate != null && enddate != '' && enddate != undefined) 
			{
				//alert('enddate set')
				var startdate_obj = nlapiStringToDate(startdate)
						var enddate_obj = nlapiStringToDate(enddate)
						
						if (startdate_obj <= enddate_obj) 
						{
							var venstatobj = nlapiCreateRecord('customrecord_vendor_statement_detail_rec');
							venstatobj.setFieldValue('custrecord_venstat_vendor', vendorname)
							alert('vendorname set'+vendorname)
							venstatobj.setFieldValue('custrecord_venstat_startdate', startdate)
							alert('startdate set'+startdate)
								
							venstatobj.setFieldValue('custrecord_vendstat_enddate', enddate)
							//	alert('enddate set'+enddate)
								
												
								venstatobj.setFieldValue('custrecord_venstat_email', email)
							//	alert('locationname set'+email)
								
							venstatobj.setFieldValue('custrecord_venstat_status', 'In-Progress');
							//alert('Progress set')
							
							var user = nlapiGetUser();
							venstatobj.setFieldValue('custrecord_venstat_user', user);
							//alert('user set'+user)
							
							var venstatsubmitid = nlapiSubmitRecord(venstatobj);
							//alert('nlapiSubmitRecord set'+venstatsubmitid)
							
					    		var url = nlapiResolveURL('SUITELET', 'customscript_vendor_statement_pdf_print', 'customdeploy_vendor_statement_pdf_print');
					        	 url = url + '&venstatsubmitid=' + venstatsubmitid;
							
						//	nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					        //	 window.open(url, '_self', false);
							 window.onbeforeunload = null;
					    		var newwindow = window.open(url, '_parent', 'print')
						}
						else {
							alert('Please enter Start date less than end date');
						}
					
				
			}
			else {
				alert('Please enter the END Date');
			}
		}
		else {
		
			alert('Please enter the Start Date');
		}
	}
	else {
	
		alert('Please enter the Vendor Name');
	}
   } //end Type==4
	
	
}// END clientScriptPDF()

function clientScriptExcel_createrecord()
{
	var vendorname = new Array();
	var customername=new Array();
	var employeename=new Array();
	var ledgername=new Array();
	
//	var type = nlapiGetFieldValue('custpage_type');
	
	vendorname = nlapiGetFieldValue('custpage_vendorname');
	// alert('vendorname'+vendorname)
	

//	var locationname = nlapiGetFieldValue('custpage_locationname'); //locationname
	var startdate = nlapiGetFieldValue('startdate');
	var enddate = nlapiGetFieldValue('enddate');
	var email = nlapiGetFieldValue('email');
	
	//if(type == '4')
    {		
	
	if (vendorname != null && vendorname != '' && vendorname != undefined)
	{
		//alert('vendorname set')
		if (startdate != null && startdate != '' && startdate != undefined)
		{
			//alert('startdate set')
			if (enddate != null && enddate != '' && enddate != undefined) 
			{
				//alert('enddate set')
				var startdate_obj = nlapiStringToDate(startdate)
						var enddate_obj = nlapiStringToDate(enddate)
						
						if (startdate_obj <= enddate_obj) 
						{
							var venstatobj = nlapiCreateRecord('customrecord_vendor_statement_detail_rec');
							venstatobj.setFieldValue('custrecord_venstat_vendor', vendorname)
							alert('vendorname set'+vendorname)
							venstatobj.setFieldValue('custrecord_venstat_startdate', startdate)
							alert('startdate set'+startdate)
								
							venstatobj.setFieldValue('custrecord_vendstat_enddate', enddate)
							//	alert('enddate set'+enddate)
								
												
								venstatobj.setFieldValue('custrecord_venstat_email', email)
							//	alert('locationname set'+email)
								
							venstatobj.setFieldValue('custrecord_venstat_status', 'In-Progress');
							//alert('Progress set')
							
							var user = nlapiGetUser();
							venstatobj.setFieldValue('custrecord_venstat_user', user);
							//alert('user set'+user)
							
							var venstatsubmitid = nlapiSubmitRecord(venstatobj);
							//alert('nlapiSubmitRecord set'+venstatsubmitid)
							
					    		var url = nlapiResolveURL('SUITELET', 'customscript_vendor_statement_exls_print', 'customdeploy_vendor_statement_exls_print');
					        	 url = url + '&venstatsubmitid=' + venstatsubmitid;
							
						//	nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					        //	 window.open(url, '_self', false);
							 window.onbeforeunload = null;
					    		var newwindow = window.open(url, '_parent', 'print')
						}
						else {
							alert('Please enter Start date less than end date');
						}
					
				
			}
			else {
				alert('Please enter the END Date');
			}
		}
		else {
		
			alert('Please enter the Start Date');
		}
	}
	else {
	
		alert('Please enter the Vendor Name');
	}
   } //end Type==4
	
	
}// END clientScriptPDF()


function Search_last_report()
{
	var searchFilters = new Array();
	var user = nlapiGetUser();
	alert('The user is :'+user)
	searchFilters[0] = new nlobjSearchFilter('custrecord_venstat_user',null,'is',user);
	var searchColumns = new Array();
	searchColumns[0] = new nlobjSearchColumn('created');
	searchColumns[0].setSort(true);
	searchColumns[1] = new nlobjSearchColumn('internalid');

	var pdf_file = nlapiSearchRecord('customrecord_vendor_statement_detail_rec',null,searchFilters, searchColumns);
	
	if (pdf_file != null && pdf_file != '' && pdf_file != undefined) 
	{
		var internal_id = pdf_file[0].getValue('internalid')
		var url = nlapiResolveURL('RECORD', 'customrecord_vendor_statement_detail_rec',internal_id,'VIEW');
		window.onbeforeunload = null;
		var newwindow = window.open(url, '_parent', 'print')
					
	}
	else
	{
		alert('No previous generated report Found')
	}
	
}
function sendvendorstatmentmail(recordid){
	if (recordid != null && recordid != '' && recordid != undefined) {
		var fields = ['custrecord_vendorstatement', 'custrecord_venstat_email'];
		
		var vendetails = nlapiLookupField('customrecord_vendor_statement_detail_rec', recordid, fields)
		
		var i_statementID = vendetails.custrecord_vendorstatement;
		//alert('i_statementID' + i_statementID)
		
		var s_emailId = vendetails.custrecord_venstat_email;
		//alert('s_emailId' + s_emailId)
		
		if (s_emailId != null && s_emailId != '' && s_emailId != null) 
		{
			if (i_statementID != null && i_statementID != '' && i_statementID != undefined) 
			{
				//alert('fileObj 0')
				
				var url = nlapiResolveURL('SUITELET', 'customscript_send_venstatement', '1');
				
				
				url = url + '&i_statementID=' + i_statementID+ '&s_emailId=' + s_emailId;
				//alert('fileObj 0'+url)
				
				var response = nlapiRequestURL(url)
				
				var response_msg = response.getBody();

				if (response_msg != null && response_msg != '' && response_msg != undefined) {
					alert(response_msg)
					
				}
			}
			else 
			{
				alert('File Is Not Generated')
			}
		}
		else 
		{
			alert('Please Enter the Email ID')
		}
	}
	
}
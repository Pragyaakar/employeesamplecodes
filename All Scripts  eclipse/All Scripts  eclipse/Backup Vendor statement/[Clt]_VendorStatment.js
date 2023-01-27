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

function pageInt_ven(type)
{
	/*var tdate = new Date();
	var format_month_Date = (tdate.getMonth())+1;
 	var format_date_Date = tdate.getDate();
	var format_year_Date =tdate.getFullYear();			 	
	var format_eDate = format_date_Date+'/'+format_month_Date+'/'+format_year_Date;
	nlapiSetFieldValue('enddate',format_eDate);
	
	
	var firstDayMonths = new Date(tdate.getFullYear(), tdate.getMonth(), 1);
	var format_month_sDate = (firstDayMonths.getMonth());
 	var format_date_sDate = firstDayMonths.getDate();
	var format_year_sDate =firstDayMonths.getFullYear();			 	
	var format_sDate = format_date_sDate+'/'+format_month_sDate+'/'+format_year_sDate;
	//alert('format_sDate'+format_sDate);
	nlapiSetFieldValue('startdate',format_sDate);
	nlapiSetFieldValue('custpage_opentran','F');
	//window.location.reload();
*/}


function fieldChange(type, name) 
{
	if (name =='custpage_vendorname')
	{
		var vendorName = nlapiGetFieldValue('custpage_vendorname');
		var url = window.location.search;
		  
		if(url.indexOf('&custpage_vendorname') > 0) 
		{
			// Remove the previous value of the parameter: param_rowCount
			url = url.substring(0, url.indexOf('&custpage_vendorname'));
		}
		window.onbeforeunload = true;
		window.location.search = url + '&custpage_vendorname=' + vendorName;
	}
	return true
}

function refresh()
{
	window.location.reload();
}

function clientScriptPDF_createrecord()
{
	var vendorname = new Array();
	var Vendname=new Array();
	var employeename=new Array();
	var ledgername=new Array();
	
	Vendname = nlapiGetFieldValue('custpage_vendorname');
	//alert('Vendname'+Vendname);
	
	var startdate = nlapiGetFieldValue('startdate');
	var enddate = nlapiGetFieldValue('enddate');
	var email = nlapiGetFieldValue('email');
	
	var subsidiary = nlapiGetFieldValue('custpage_subsidiary');
	//alert('subsidiary'+subsidiary)
	
	var subsiCurrency = nlapiGetFieldValue('custpage_currency');
	//alert('subsiCurrency == ' + subsiCurrency)
	
	var openTran = nlapiGetFieldValue('custpage_opentran');
	
	var addressText;
	var currency
	var amtDue
			
	if(Vendname != null && Vendname != '' && Vendname != undefined)
	{
        //alert('customername'+customername);
      
		var customerRecord = nlapiLoadRecord('vendor',Vendname);
        //alert('customerRecord'+customerRecord);
      
		currency = customerRecord.getFieldValue('currency');
		//alert('currency is'+currency);
		amtDue = customerRecord.getFieldValue('balance');
		//alert('amtDue is'+amtDue)
		   
		var numberOfAddress = customerRecord.getLineItemCount('addressbook');
		var addressID;
	
		for (var x = 1; x <= numberOfAddress; x++)
		{
		    var defaultaddress = customerRecord.getLineItemValue('addressbook', 'defaultbilling', x);
		    if(defaultaddress == 'T')
		    {
		        addressID = customerRecord.getLineItemValue('addressbook', 'internalid', x);
		        addressText = customerRecord.getLineItemValue('addressbook', 'addrtext', x);
		        break;
		    }
		}
		
		//alert('customername set')
		if(startdate != null && startdate != '' && startdate != undefined)
		{
			//alert('startdate set')
			if (enddate != null && enddate != '' && enddate != undefined) 
			{
				var startdate_obj = nlapiStringToDate(startdate)
                //alert('startdate_obj = ' +startdate_obj)
              
				var enddate_obj = nlapiStringToDate(enddate)
				//alert('enddate_obj = ' +enddate_obj)
				
				if(startdate_obj <= enddate_obj) 
				{
                    //alert('Enter in loop ')
                          
					var venstatobj = nlapiCreateRecord('customrecord_vendor_statement_detail_rec');
                    //alert('venstatobj set'+venstatobj)
                          
					venstatobj.setFieldValues('custrecord_venstat_vendor', Vendname);
					//alert('Vendname set'+Vendname)
							
					venstatobj.setFieldValue('custrecord_venstat_startdate', startdate);
					//alert('startdate set'+startdate)
								
					venstatobj.setFieldValue('custrecord_venstat_enddate', enddate);
					//alert('enddate set'+enddate)   //	custrecord_custat_subsidiary
							
					venstatobj.setFieldValue('custrecord_venstat_subsidiary', subsidiary);
								
					venstatobj.setFieldValue('custrecord_vendstat_address', addressText);				
								
					//venstatobj.setFieldValue('custrecord_cust_statement_email', email);
					//alert('email set'+email)
								
					venstatobj.setFieldValue('custrecord_vendstat_currency', subsiCurrency);
								
					venstatobj.setFieldValue('custrecord_vendstat_amountdue', amtDue);
							
					//venstatobj.setFieldValue('custrecord_cust_statement_status', 'In-Progress');
					//alert('Progress set')
							
					//var user = nlapiGetUser();
					//venstatobj.setFieldValue('custrecord_cust_statement_user', user);
					//alert('user set'+user)
							
					var venstatsubmitid = nlapiSubmitRecord(venstatobj,true,true);
					//alert('nlapiSubmitRecord set'+venstatsubmitid)
							
					var url = nlapiResolveURL('SUITELET', 'customscript_vendor_statement_pdf_print1', 'customdeploy_vendor_statement_pdf_print1');
					url = url + '&venstatsubmitid=' + venstatsubmitid+'&ven_opentran='+openTran+'&ven_subsi='+subsidiary;
							
					//nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					//window.open(url, '_self', false);
					window.onbeforeunload = null;
					var newwindow = window.open(url, '_parent', 'print')
			    }
				else 
				{
					alert('Please enter Start date less than end date');
				}
			}
			else 
			{
		   		alert('Please enter the END Date');
			}
		}
		else 
		{
			alert('Please enter the Start Date');
		}
	}
	else 
	{
		alert('Please enter the Vendorname');
	}
}// END clientScriptPDF()


function clientScriptExcel_createrecord()
{
	var vendorname = new Array();
	var Vendname=new Array();
	var employeename=new Array();
	var ledgername=new Array();
	
	Vendname = nlapiGetFieldValue('custpage_vendorname');
	//alert('Vendname'+Vendname);
	
	var startdate = nlapiGetFieldValue('startdate');
	var enddate = nlapiGetFieldValue('enddate');
	var email = nlapiGetFieldValue('email');
	
	var subsidiary = nlapiGetFieldValue('custpage_subsidiary');
	//alert('subsidiary'+subsidiary)
	
	var subsiCurrency = nlapiGetFieldValue('custpage_currency');
	//alert('subsiCurrency == ' + subsiCurrency)
	
	var openTran = nlapiGetFieldValue('custpage_opentran');
	
	var addressText;
	var currency
	var amtDue
			
	if(Vendname != null && Vendname != '' && Vendname != undefined)
	{
        //alert('customername'+customername);
      
		var customerRecord = nlapiLoadRecord('vendor',Vendname);
        //alert('customerRecord'+customerRecord);
      
		currency = customerRecord.getFieldValue('currency');
		//alert('currency is'+currency);
		amtDue = customerRecord.getFieldValue('balance');
		//alert('amtDue is'+amtDue)
		   
		var numberOfAddress = customerRecord.getLineItemCount('addressbook');
		var addressID;
	
		for (var x = 1; x <= numberOfAddress; x++)
		{
		    var defaultaddress = customerRecord.getLineItemValue('addressbook', 'defaultbilling', x);
		    if(defaultaddress == 'T')
		    {
		        addressID = customerRecord.getLineItemValue('addressbook', 'internalid', x);
		        addressText = customerRecord.getLineItemValue('addressbook', 'addrtext', x);
		        break;
		    }
		}
		
		//alert('customername set')
		if(startdate != null && startdate != '' && startdate != undefined)
		{
			//alert('startdate set')
			if (enddate != null && enddate != '' && enddate != undefined) 
			{
				var startdate_obj = nlapiStringToDate(startdate)
                //alert('startdate_obj = ' +startdate_obj)
              
				var enddate_obj = nlapiStringToDate(enddate)
				//alert('enddate_obj = ' +enddate_obj)
				
				if(startdate_obj <= enddate_obj) 
				{
                    //alert('Enter in loop ')
                          
					var venstatobj = nlapiCreateRecord('customrecord_vendor_statement_detail_rec');
                    //alert('venstatobj set'+venstatobj)
                          
					venstatobj.setFieldValues('custrecord_venstat_vendor', Vendname);
					//alert('Vendname set'+Vendname)
							
					venstatobj.setFieldValue('custrecord_venstat_startdate', startdate);
					//alert('startdate set'+startdate)
								
					venstatobj.setFieldValue('custrecord_venstat_enddate', enddate);
					//alert('enddate set'+enddate)   //	custrecord_custat_subsidiary
							
					venstatobj.setFieldValue('custrecord_venstat_subsidiary', subsidiary);
								
					venstatobj.setFieldValue('custrecord_vendstat_address', addressText);				
								
					//venstatobj.setFieldValue('custrecord_cust_statement_email', email);
					//alert('email set'+email)
								
					venstatobj.setFieldValue('custrecord_vendstat_currency', subsiCurrency);
								
					venstatobj.setFieldValue('custrecord_vendstat_amountdue', amtDue);
							
					//venstatobj.setFieldValue('custrecord_cust_statement_status', 'In-Progress');
					//alert('Progress set')
							
					//var user = nlapiGetUser();
					//venstatobj.setFieldValue('custrecord_cust_statement_user', user);
					//alert('user set'+user)
							
					var venstatsubmitid = nlapiSubmitRecord(venstatobj,true,true);
					//alert('nlapiSubmitRecord set'+venstatsubmitid)
							
					var url = nlapiResolveURL('SUITELET', 'customscript_pdf_e_page_vendor_statement', 'customdeploy_pdf_e_page_vendor_statement');
					url = url + '&venstatsubmitid=' + venstatsubmitid+'&ven_opentran='+openTran+'&ven_subsi='+subsidiary;
							
					//nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					//window.open(url, '_self', false);
					window.onbeforeunload = null;
					var newwindow = window.open(url, '_parent', 'print')
			    }
				else 
				{
					alert('Please enter Start date less than end date');
				}
			}
			else 
			{
		   		alert('Please enter the END Date');
			}
		}
		else 
		{
			alert('Please enter the Start Date');
		}
	}
	else 
	{
		alert('Please enter the customername');
	}
}// END clientScriptPDF()

function Search_last_report()
{
	var searchFilters = new Array();
	var user = nlapiGetUser();
	//alert('The user is :'+user)
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
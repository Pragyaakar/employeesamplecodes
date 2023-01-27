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


function fieldChange(type, name) {
	if (name == 'custpage_vendorname')
     {
        var Vendor = nlapiGetFieldValue('custpage_vendorname');
      // alert('Vendor'+Vendor)
  		if(Vendor)
         {
          
  		  var rowCount = nlapiGetFieldValue('custpage_vendorname');
		  var url = window.location.search;
		  
			if (url.indexOf('&custpage_vendorname') > 0) 
			  {
			   // Remove the previous value of the parameter: param_rowCount
			   url = url.substring(0, url.indexOf('&custpage_vendorname'));
			  }
			  // The code below refreshes the page and passes the value of the dropdown
			  // in the URL as a parameter
			  window.location.search = url + '&custpage_vendorname=' + rowCount;
			 
          /* 
           	var subsidiary = nlapiLookupField('vendor',Vendor,'subsidiary');
           if(nlapiGetUser() == '4')
           {
            // alert('subsidiary='+subsidiary)
           }
            
           if(subsidiary)
            {
              nlapiSetFieldValue('cust_subsidiary',subsidiary);
            }*/
         }
        
        }
return true
}


function refresh()
{
	window.open('https://5250587.app.netsuite.com/app/site/hosting/scriptlet.nl?script=109&deploy=1','_self');
}

function clientScriptPDF_createrecord()
{
	var vendorname = new Array();
	var customername=new Array();
	var employeename=new Array();
	var ledgername=new Array();
	
//	var type = nlapiGetFieldValue('custpage_type');
	
	vendorname = nlapiGetFieldValue('custpage_vendorname');
	//alert('vendorname'+vendorname)
	

//	var locationname = nlapiGetFieldValue('custpage_locationname'); //locationname
	var startdate = nlapiGetFieldValue('startdate');
	var enddate = nlapiGetFieldValue('enddate');
	var email = nlapiGetFieldValue('email');
	var RadioVal = nlapiGetFieldValue('custpage_alphbets');
	var subsidiary = nlapiGetFieldValue('cust_subsidiary');
	
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
					
				//var endDate = nlapiDateToString(enddate_obj);
				//alert('endDate =='+endDate);	
						if (startdate_obj <= enddate_obj) 
						{
							var venstatobj = nlapiCreateRecord('customrecord_vendor_statement_detail_rec');
							venstatobj.setFieldValue('custrecord_venstat_vendor', vendorname)
						    //alert('vendorname set =='+vendorname)
						    
							venstatobj.setFieldValue('custrecord_venstat_startdate', startdate)
						     //alert('startdate set =='+startdate)
								
							venstatobj.setFieldValue('custrecord_venstat_enddate', enddate)
						   // alert('enddate set =='+enddate)
								
												
								venstatobj.setFieldValue('custrecord_venstat_email', email)
							//	alert('locationname set'+email)
								
							venstatobj.setFieldValue('custrecord_venstat_status', 'In-Progress');
							
							venstatobj.setFieldValue('custrecord_ven_subsidiary', subsidiary);
							//alert('Progress set')
							
							var user = nlapiGetUser();
							venstatobj.setFieldValue('custrecord_venstat_user', user);
							//alert('user set =='+user)
							
							var venstatsubmitid = nlapiSubmitRecord(venstatobj);
							//alert('nlapiSubmitRecord set =='+venstatsubmitid)
							
							//if(RadioVal == 'b')
							{
								var url = nlapiResolveURL('SUITELET', 'customscript_vendor_statement_pdf_print1', 'customdeploy_vendor_statement_pdf_print1');
					        	 url = url + '&venstatsubmitid=' + venstatsubmitid+ '&excl=' + 'F';
							
						//	nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					        //	 window.open(url, '_self', false);
							 window.onbeforeunload = null;
					    	var newwindow = window.open(url, '_parent', 'print')
							}
							/*else
							{
								var url = nlapiResolveURL('SUITELET', 'customscript_summary_vendor_statement', 'customdeploy_summary_vendor_statement');
					        	 url = url + '&venstatsubmitid=' + venstatsubmitid;
							
						//	nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					        //	 window.open(url, '_self', false);
							 window.onbeforeunload = null;
					    	var newwindow = window.open(url, '_parent', 'print')
							}*/
					    		
						}
						else 
						{
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
	//alert('vendorname'+vendorname)
	

//	var locationname = nlapiGetFieldValue('custpage_locationname'); //locationname
	var startdate = nlapiGetFieldValue('startdate');
	var enddate = nlapiGetFieldValue('enddate');
	var email = nlapiGetFieldValue('email');
	var RadioVal = nlapiGetFieldValue('custpage_alphbets');
	var subsidiary = nlapiGetFieldValue('cust_subsidiary');
	
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
					
				//var endDate = nlapiDateToString(enddate_obj);
				//alert('endDate =='+endDate);	
						if (startdate_obj <= enddate_obj) 
						{
							var venstatobj = nlapiCreateRecord('customrecord_vendor_statement_detail_rec');
							venstatobj.setFieldValue('custrecord_venstat_vendor', vendorname)
						    //alert('vendorname set =='+vendorname)
						    
							venstatobj.setFieldValue('custrecord_venstat_startdate', startdate)
						     //alert('startdate set =='+startdate)
								
							venstatobj.setFieldValue('custrecord_venstat_enddate', enddate)
						   // alert('enddate set =='+enddate)
								
												
								venstatobj.setFieldValue('custrecord_venstat_email', email)
							//	alert('locationname set'+email)
								
							venstatobj.setFieldValue('custrecord_venstat_status', 'In-Progress');
							
							venstatobj.setFieldValue('custrecord_ven_subsidiary', subsidiary);
							//alert('Progress set')
							
							var user = nlapiGetUser();
							venstatobj.setFieldValue('custrecord_venstat_user', user);
							//alert('user set =='+user)
							
							var venstatsubmitid = nlapiSubmitRecord(venstatobj);
							//alert('nlapiSubmitRecord set =='+venstatsubmitid)
							
							//if(RadioVal == 'b')
							{
								var url = nlapiResolveURL('SUITELET', 'customscript_vendor_statement_pdf_print1', 'customdeploy_vendor_statement_pdf_print1');
					        	 url = url + '&venstatsubmitid=' + venstatsubmitid+ '&excl=' + 'T';
							
						//	nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					        //	 window.open(url, '_self', false);
							 window.onbeforeunload = null;
					    	var newwindow = window.open(url, '_parent', 'print')
							}
							/*else
							{
								var url = nlapiResolveURL('SUITELET', 'customscript_summary_vendor_statement', 'customdeploy_summary_vendor_statement');
					        	 url = url + '&venstatsubmitid=' + venstatsubmitid;
							
						//	nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					        //	 window.open(url, '_self', false);
							 window.onbeforeunload = null;
					    	var newwindow = window.open(url, '_parent', 'print')
							}*/
					    		
						}
						else 
						{
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




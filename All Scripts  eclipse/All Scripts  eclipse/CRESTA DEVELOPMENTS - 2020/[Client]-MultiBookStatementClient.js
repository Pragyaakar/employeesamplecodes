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


function fieldChangeMultiBook(type, name) {
	if (name == 'custpage_vendorname_multi')
     {
        var Vendor = nlapiGetFieldValue('custpage_vendorname_multi');
      // alert('Vendor'+Vendor)
  		if(Vendor)
         {
           
           
           	var subsidiary = nlapiLookupField('vendor',Vendor,'subsidiary');
           if(nlapiGetUser() == '4')
           {
            // alert('subsidiary='+subsidiary)
           }
            
           if(subsidiary)
            {
              nlapiSetFieldValue('cust_subsidiary_multi',subsidiary);
            }
         }
        
        }
return true
}


function refresh()
{
	window.location.reload();
}

function multibookstatementClient()
{
	var vendorname = new Array();
	var customername=new Array();
	var employeename=new Array();
	var ledgername=new Array();
	
//	var type = nlapiGetFieldValue('custpage_type');
	
	vendorname = nlapiGetFieldValue('custpage_vendorname_multi');
	//alert('vendorname'+vendorname)
	

//	var locationname = nlapiGetFieldValue('custpage_locationname'); //locationname
	var startdate = nlapiGetFieldValue('cust_firstdate');
	var enddate = nlapiGetFieldValue('cust_seconddate');
	var email = nlapiGetFieldValue('email');
	var RadioVal = nlapiGetFieldValue('custpage_alphbets_one');
	var subsidiary = nlapiGetFieldValue('cust_subsidiary_multi');
	
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
							
							if(RadioVal == 'b')
							{
								var url = nlapiResolveURL('SUITELET', 'customscript_pdf_statement_multibook', 'customdeploy_pdf_statement_multibook');
					        	 url = url + '&venstatsubmitid=' + venstatsubmitid;
							
						//	nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					        //	 window.open(url, '_self', false);
							 window.onbeforeunload = null;
					    	var newwindow = window.open(url, '_parent', 'print')
							}
							else
							{
								var url = nlapiResolveURL('SUITELET', 'customscript_pdf_statement_multibook', 'customdeploy_pdf_statement_multibook');
					        	 url = url + '&venstatsubmitid=' + venstatsubmitid;
							
						//	nlapiScheduleScript('customscript_sched_vendor_stmt', 'customdeploy1', venstatsubmitid);
							
					        //	 window.open(url, '_self', false);
							 window.onbeforeunload = null;
					    	var newwindow = window.open(url, '_parent', 'print')
							}
					    		
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
	//alert('vendorname1'+vendorname)
	
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
						    //alert('vendorname set1'+vendorname)
						    
							venstatobj.setFieldValue('custrecord_venstat_startdate', startdate)
						    //alert('startdate set1'+startdate)
								
							venstatobj.setFieldValue('custrecord_venstat_enddate', enddate)
							//alert('enddate set1'+enddate)
								
												
								venstatobj.setFieldValue('custrecord_venstat_email', email)
							    //alert('locationname set1'+email)
								
							venstatobj.setFieldValue('custrecord_venstat_status', 'In-Progress');
							//alert('Progress set')
							
							var user = nlapiGetUser();
							venstatobj.setFieldValue('custrecord_venstat_user', user);
							//alert('user set1'+user)
							
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



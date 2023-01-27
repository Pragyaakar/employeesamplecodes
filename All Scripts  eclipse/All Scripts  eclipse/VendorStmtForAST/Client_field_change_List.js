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
        var vendor = nlapiGetFieldValue('custpage_vendorname');
  		if(vendor)
         {
           	var subsidiary = nlapiLookupField('vendor',vendor,'subsidiary');
           if(subsidiary)
            {
              nlapiSetFieldValue('subsidiary',subsidiary);
            }
         }
        
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
	var customername=new Array();
	var employeename=new Array();
	var ledgername=new Array();
	
	//var type = nlapiGetFieldValue('custpage_type');
	
	//vendorname = nlapiGetFieldValues('custpage_vendorname');
	//alert('vendorname'+vendorname)
	
	vendorname = nlapiGetFieldValue('custpage_vendorname');
	//alert('customername'+customername);
	
	//employeename = nlapiGetFieldValues('custpage_employeename');
	//alert('employeename'+vendorname)
	//ledgername = nlapiGetFieldValues('custpage_ledgeracc');
	
//	var locationname = nlapiGetFieldValue('custpage_locationname'); //locationname
	var startdate = nlapiGetFieldValue('startdate');
	var enddate = nlapiGetFieldValue('enddate');
	var email = nlapiGetFieldValue('email');
	var subsidiary = nlapiGetFieldValue('subsidiary');
	
	 var addressText;
	 var currency
	 var amtDue
	//if(type == '1')
    {		
	
	if (vendorname != null && vendorname != '' && vendorname != undefined)
	{
		var vendorRecord = nlapiLoadRecord('vendor', vendorname);
		currency = vendorRecord.getFieldValue('currency');
		amtDue = vendorRecord.getFieldValue('balance');
		   var numberOfAddress = vendorRecord.getLineItemCount('addressbook');
		   var addressID;
	
		   for (var x = 1; x <= numberOfAddress; x++)
		   {
		          var defaultaddress = vendorRecord.getLineItemValue('addressbook', 'defaultbilling', x);
		               if (defaultaddress == 'T')
		               {
		                      addressID = vendorRecord.getLineItemValue('addressbook', 'internalid', x);
		                      addressText = vendorRecord.getLineItemValue('addressbook', 'addrtext', x);
			      break;
		               }
		   }
		//alert('customername set')
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
							var venstatobj = nlapiCreateRecord('customrecord_cust_statement');
							venstatobj.setFieldValues('custrecord_custstat_customer', vendorname);
							//	alert('customername set'+vendorname)
							venstatobj.setFieldValue('custrecord_customerstat_startdate', startdate);
							//	alert('startdate set'+startdate)
								
							venstatobj.setFieldValue('custrecord_cust_statement_enddate', enddate);
							//	alert('enddate set'+enddate)	custrecord_custat_subsidiary
							venstatobj.setFieldValue('custrecord_custat_subsidiary', subsidiary);
								venstatobj.setFieldValue('custrecord_address', addressText);				
								venstatobj.setFieldValue('custrecord_cust_statement_email', email);
							//	alert('email set'+email)
								venstatobj.setFieldValue('custrecord_custat_currency', currency);
								venstatobj.setFieldValue('custrecord_custat_amt_due', amtDue);
							venstatobj.setFieldValue('custrecord_cust_statement_status', 'In-Progress');
							//alert('Progress set')
							
							var user = nlapiGetUser();
							venstatobj.setFieldValue('custrecord_cust_statement_user', user);
							//alert('user set'+user)
							
							var venstatsubmitid = nlapiSubmitRecord(venstatobj);
							//alert('nlapiSubmitRecord set'+venstatsubmitid)
							
					    		var url = nlapiResolveURL('SUITELET', 'customscript209', 'customdeploy1');
					        	 url = url + '&custscript_custmrecid=' + venstatsubmitid;
							
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
	
			alert('Please enter the customername');
	     }
   } //end Type==1
		
}// END clientScriptPDF()




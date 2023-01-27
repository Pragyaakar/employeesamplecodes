/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       07 Mar 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function  clientScriptMIredirect(type)
 {
	  var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
             var url2 = nlapiResolveURL('SUITELET', 'customscript_suite_loc_and_acc', 'customdeploy_suite_loc_and_acc');
        	 url2 = url2 + '&cust_type='+recordType + '&cust_id='+recordId;
             window.onbeforeunload = null;
	       window.open(url2, '_parent', 'print')
}



function  CallToCreatePO(type)
{
	  var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
		// var reqObj =nlapiLoadRecord(recordType,recordId);
		
		var sbsi =nlapiGetFieldValue('subsidiary');
		var tranid =nlapiGetFieldValue('transactionnumber');
		
		
            var url3 = nlapiResolveURL('SUITELET', 'customscript_suite_pr_to_po_create', 'customdeploy_suite_pr_to_po_create');
       	   url3 = url3 + '&cust_type='+recordType + '&cust_id='+recordId+ '&cust_subsi='+sbsi+ '&cust_tranid='+tranid;
        
       	   window.onbeforeunload = null;
	       window.open(url3, '_parent', 'print')
}





function refresh()
{
	window.location.reload();
}


function redirectSuite()
{

	var locationname = nlapiGetFieldValue('cust_locationname'); //locationname
	var accountname = nlapiGetFieldValue('cust_accountname');
	var recId = nlapiGetFieldValue('custpage_recid');
	
	          if (locationname != null && locationname != '' && locationname != undefined) 
				{
					if (accountname != null && accountname != '' && accountname != undefined) 
					{
						//	alert('URL condition')
						    		var url = nlapiResolveURL('SUITELET', 'customscript_material_issue_main', 'customdeploy_material_issue_main');
						        	 url = url + '&custscript_loc='+locationname + '&custscript_acc='+accountname + '&custscript_record='+recId;
					     		 window.onbeforeunload = null;
						    		var newwindow = window.open(url, '_parent', 'print')
							}
							else
							{
								alert('Please enter Account');
							}
		  		}
				else
				{
			   		alert('Please enter the Location');
				}
			
	}

function clientForQtyCheck(type, name, linenum)
{
	
	 if(type =='custpage_sig_req_sublist' && name == 'custpage_adjustqty') 
     {
		// alert('Inside Client Field change')
		var avblStock = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_stock',linenum);
		 var quantity = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_quantity',linenum);
		var adjustQty = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_adjustqty',linenum);
		
		//alert('avblStock ='+avblStock)
		// alert('adjustQty ='+adjustQty)
		
		if(parseFloat(adjustQty) > parseFloat(avblStock))
		{
			alert('Please Select the Available Quantity or Less than Available Quantity...!!');
			
			if(parseFloat(quantity) > parseFloat(avblStock))
			{
				 nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_adjustqty',avblStock,false,true);
					
			}
			else
			{
				 nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_adjustqty',quantity,false,true);
					
			}
	 	}	
		else if(parseFloat(quantity) < parseFloat(adjustQty))
		  {
			
				alert('Please Select the Original Quantity or Less than Original Quantity...!!');
				 nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_adjustqty',quantity,false,true);
					
			}
			else
			{
				nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_chechbox','T',false,true);
				
			}
			 	
		  
     }
	
}
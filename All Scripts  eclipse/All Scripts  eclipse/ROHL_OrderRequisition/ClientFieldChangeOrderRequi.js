function clientScriptLoadRecordRequisi(type, name, linenum)
{
	
	 if(name == 'custpage_chechbox') 
     {

		 var location;
		 
		var subsidary = nlapiGetFieldText('custpage_subsidiary');
		//alert('subsidary  is:-'+subsidary)
		 
		var vendor=nlapiGetFieldText('custpage_vendorname');
        //alert('vendor  is:-'+vendor)
		var count = nlapiGetLineItemCount('custpage_sig_req_sublist');
		
		  
     }
	
}

function refresh()
{
	window.location.reload();
}


function redirectSuite()
{
            subsidary = nlapiGetFieldValue('custpage_subsidiary');
	    //	alert('subsidary  is:-'+subsidary)
         var subsi_name =nlapiGetFieldText('custpage_subsidiary');
		 
		var PrType=nlapiGetFieldValue('custpage_pr_type');
           //     alert('vendor  is:-'+vendor)
        
            
             var url = nlapiResolveURL('SUITELET', 'customscript_newsuite_for_or', 'customdeploy_newsuite_for_or');
        	 url = url + '&subsidary=' + subsidary+ '&cust_pr_type=' + PrType+ '&location=' + location+ '&subsi=' + subsi_name;
             window.onbeforeunload = null;
	  var newwindow = window.open(url, '_parent', 'print')
	  nlapiRequestURL(url);
	         
}
  
var SaveRec =true;

function clientScriptLoadRecordRequisi(type, name, linenum)
{
	
	 if(name == 'custpage_chechbox') 
     {
		location;
		var subsidary = nlapiGetFieldText('custpage_subsidiary');
		 
		var vendor=nlapiGetFieldText('custpage_vendorname');
        //alert('vendor  in load record:-'+vendor)
		var count = nlapiGetLineItemCount('custpage_sig_req_sublist');  
     }	
	 
	 if( name == 'custpage_vendorname') 
     {
		var TypeRequi = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_cust_pr_type',1); 
		
		  if(TypeRequi=='2')
			{
			var subsidary = nlapiGetFieldValue('custpage_subsidiary');
			 
			var vendor =nlapiGetFieldValue('custpage_vendorname');
	       // alert('vendor  in load record:-'+vendor)
			//var count = nlapiGetLineItemCount('custpage_sig_req_sublist');  
			
			var count = nlapiGetLineItemCount('custpage_sig_req_sublist');  
			
			var prValues = nlapiGetFieldValue('custpage_prvalues');//custpage_prvalues
			 
			
	        var ResultArr =[];
	       
	       // alert('Count=='+count)
			  
	       // alert('TypeRequi=='+TypeRequi)
			for(var l=1;l<=count;l++)
			{
				SaveRec =true;
			var itemVal = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_item',l);
		   	var Internald ='custpage_chechbox'+l;
			    
		   	     var filters=new Array();
				 filters[0]=new nlobjSearchFilter('custrecord_subsidiary_pricing', null,'is',subsidary);
				 filters[1] = new nlobjSearchFilter('custrecord_item', null, 'is', itemVal); //custrecord_vendor_name
				 filters[2] = new nlobjSearchFilter('custrecord_vendor_name', null, 'is', vendor); 
			 
				         var columns = new Array();
						 columns[0] =  new nlobjSearchColumn('custrecord_subsidiary_pricing');
						 columns[1] =  new nlobjSearchColumn("custrecord_item"); 
						 columns[2] =  new nlobjSearchColumn("custrecord_contract_price");
						 columns[3] =  new nlobjSearchColumn("custrecord_start_date");
						 columns[4] =  new nlobjSearchColumn("custrecord_end_date");
						
						 
				 var searchresults = nlapiSearchRecord('customrecord_custom_purchase_pricing_rec',null, filters, columns);
				 
				   if(searchresults == null)
					{
						
						  nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_chechbox',l,'F');
						  nlapiDisableLineItemField('custpage_sig_req_sublist',Internald, true);
						  SaveRec = false;
					}
				   else
				   {
					  nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_chechbox',l,'T');
					  nlapiDisableLineItemField('custpage_sig_req_sublist',Internald,false); 
					   ResultArr.push(searchresults);
					
				   }
				  
				   
			  }
			
	    
			      if(ResultArr == 0)
				  {
			    	  alert('The Selected Vendor Is NOT Valid..Please Select the VALID Customer...!!')
				  }
			}
		
     }	
}

function refresh()
{
	window.location.reload();
}

function redirectSuite()
{
    subsidary = nlapiGetFieldValue('custpage_subsidiary');
	var subsi_name =nlapiGetFieldText('custpage_subsidiary');
	
	var vendor=nlapiGetFieldText('custpage_vendorname');
    //alert('vendor redirect:-'+vendor)
    //
    var PrType=nlapiGetFieldValue('custpage_pr_type');
        
    var url = nlapiResolveURL('SUITELET', 'customscript_newsuite_for_or', 'customdeploy_newsuite_for_or');
    url = url + '&subsidary=' + subsidary+ '&cust_pr_type=' + PrType+ '&location=' + location+ '&subsi=' + subsi_name;
    window.onbeforeunload = null;
	var newwindow = window.open(url, '_parent', 'print')
	nlapiRequestURL(url);
}

function clientSaveToSubmit()
{

	
			 if(SaveRec == false)
			 {    alert('You have not Permited to Submit Record because you have Selected WRONG Vendor...!!');
					return false;
			 }
			 else
			 {
				 return true;
			 }
	
}

function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_new_order_requi_search', filters, columns);
	return results;
}


/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Mar 2019     Tushar More
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
function clientFieldChanged(type, name, linenum)
{
	if(name == 'custpage_requi') 
    {

		
		var requisitionNum = nlapiGetFieldValue('custpage_requi');
		alert('requisitionNum  is:-'+requisitionNum)
		 
		  var oppItemCount = nlapiGetLineItemCount('custpage_sig_req_sublist');
		alert('oppItemCount  is:-'+oppItemCount)

	       for(var j = oppItemCount; j >= 1; j--) {
	    	   alert('oppItemCount  is:-'+j)
	             nlapiRemoveLineItem('custpage_sig_req_sublist', j);
	       }

		
        var columns = new Array();
		
		 columns[0] = new nlobjSearchColumn("internalid"); 
		 columns[1] =  new nlobjSearchColumn("item");
		 columns[2] =   new nlobjSearchColumn("quantity"), 
		 columns[3] = new nlobjSearchColumn("internalid","customer",null); 
		 columns[4] =  new nlobjSearchColumn("location");
		 columns[5] = new nlobjSearchColumn("estimatedamount"); 
		 columns[6] = new nlobjSearchColumn("custcol_linenum"); 
		 columns[7] = new nlobjSearchColumn("custentity_vad_projectdirector","job",null);
		 columns[8] = new nlobjSearchColumn("transactionnumber");
				 
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('internalid', null, 'is', requisitionNum);
	//	filters[1] = new nlobjSearchFilter('internalid', null, 'is', requi);

   var results = GetSearchResults(filters,columns); 


	for (var i = 1; i <= results.length; i++) 
	{ 
		 //ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
		
	           //  var userRole = nlapiGetRole();
		      
			//	alert('custpage_reqi'+results[i-1].getValue('transactionnumber'))
		
		
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_reqi', i, results[i-1].getValue('transactionnumber'));
	             
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_item', i, results[i-1].getValue('item'));
			
				 
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_qty', i, results[i-1].getValue('quantity'));
			
	
				 var projName =results[i-1].getValue("internalid","customer",null);
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_cust_or_projid', i,projName);
			
				 
				
			
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_location', i, results[i-1].getValue('location'));
			
				 
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_custrecid', i, results[i-1].getValue('custcol_cust_rec_id'));
			

				
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_order_amount', i, results[i-1].getValue('estimatedamount'));
		

				 var rate = parseFloat(results[i-1].getValue('estimatedamount'))/parseInt(results[i-1].getValue('quantity'));
					 
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_order_rate', i, rate);
			
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_linenum', i,  results[i-1].getValue('custcol_linenum'));
				 
				 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_projdirector', i,  results[i-1].getValue("custentity_vad_projectdirector","job"));
				
	}
	
    }
	if(name == 'custpage_project')
	{
		    var ProjectName =nlapiGetFieldValue('custpage_project');
		    alert('ProjectName  is:-'+ ProjectName)
		    
		    
		    
		    var columns = new Array();
			
			 columns[0] = new nlobjSearchColumn("internalid"); 
			 columns[1] =  new nlobjSearchColumn("item");
			 columns[2] =   new nlobjSearchColumn("quantity"), 
			 columns[3] = new nlobjSearchColumn("internalid","customer",null); 
			 columns[4] =  new nlobjSearchColumn("location");
			 columns[5] = new nlobjSearchColumn("estimatedamount"); 
			 columns[6] = new nlobjSearchColumn("custcol_linenum"); 
			 columns[7] = new nlobjSearchColumn("custentity_vad_projectdirector","job",null);
			 columns[8] = new nlobjSearchColumn("transactionnumber");
					 
			var filters = new Array();
			filters[0] = new nlobjSearchFilter("internalid","customer", 'is', ProjectName);
		//	filters[1] = new nlobjSearchFilter('internalid', null, 'is', requi);

	   var results = GetSearchResults(filters,columns); 


		for (var i = 1; i <= results.length; i++) 
		{ 
			 //ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
			
		           //  var userRole = nlapiGetRole();
			      
				//	alert('custpage_reqi'+results[i-1].getValue('transactionnumber'))

					 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_reqi', i, results[i-1].getValue('transactionnumber'));
		             
					 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_item', i, results[i-1].getValue('item'));
				
					 
					 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_qty', i, results[i-1].getValue('quantity'));
				
		
					 var projName =results[i-1].getValue("internalid","customer",null);
					 nlapiSetLineItemValue('custpage_cust_or_projid', i,projName);
				
					 
					
				
					 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_location', i, results[i-1].getValue('location'));
				
					 
					 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_custrecid', i, results[i-1].getValue('custcol_cust_rec_id'));
				

					
					 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_order_amount', i, results[i-1].getValue('estimatedamount'));
			

					 var rate = parseFloat(results[i-1].getValue('estimatedamount'))/parseInt(results[i-1].getValue('quantity'));
						 
					 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_order_rate', i, rate);
				
					 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_linenum', i,  results[i-1].getValue('custcol_linenum'));
					 
					 nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_projdirector', i,  results[i-1].getValue("custentity_vad_projectdirector","job"));
					 
		}
		 
	}
	
}

function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_vadehra_requisition_search', filters, columns);
	return results;
}

function redirectSuiteForReject()
{
	     var requi = nlapiGetFieldValue('custpage_requi');
	     var requiName = nlapiGetFieldText('custpage_requi');
	     alert('requiName  ' +requiName);
	     var prjid = nlapiGetFieldValue('custpage_project');
	      alert('prjid  ' +prjid);
	      var checkValue = nlapiGetLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox');
	      alert('checkValue  ' +checkValue);
             var url = nlapiResolveURL('SUITELET', 'customscript_reject_approval', 'customdeploy_reject_approval');
        	 url = url + '&requi=' + requi +'&idProj='+prjid+'&checkValue='+checkValue;
             window.onbeforeunload = null;
	       window.open(url, '_parent', 'print')
	       nlapiRequestURL(url);
	      // window.open(url);
             
}

function refresh()
{
	window.location.reload();
}
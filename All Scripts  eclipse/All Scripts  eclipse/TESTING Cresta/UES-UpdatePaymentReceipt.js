/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Feb 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function BeforeLoadUpdatePayMentButton(type, form, request)
{
//
	
	if(type=='view' )
	{ 
		    var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		
	       var irObj = nlapiLoadRecord(recordType,recordId); 
	       var status =irObj.getFieldValue('approvalstatus');
	   	   
	   	    var invID =irObj.getFieldValue('custbody_invoice_num');
	   	 nlapiLogExecution('DEBUG', 'Before Load', "  invID  ==" + invID);
	      
			   var filters = new Array();
				filters[0] = new nlobjSearchFilter('internalid', null, 'anyof', invID);
	          filters[1] = new nlobjSearchFilter('fxamountremaining', null, 'greaterthan','0');
	          // filters[2] = new nlobjSearchFilter('custbody_processed_inv', null, 'is','T');
	           
	                     var columns = new Array();
				
				 columns[0] = new nlobjSearchColumn("item"); 
				 columns[1] =  new nlobjSearchColumn("unit");
				 columns[2] =   new nlobjSearchColumn("quantity"), 
				 columns[3] = new nlobjSearchColumn("subsidiary"); 
				 columns[4] =  new nlobjSearchColumn("trandate");
				 columns[5] = new nlobjSearchColumn("entity"); 
				 columns[6] =  new nlobjSearchColumn("department"); 
				 columns[7] =  new nlobjSearchColumn("class"); 
				 columns[8] =  new nlobjSearchColumn("location"); 
				 columns[9] =  new nlobjSearchColumn("fxamountremaining"); 
				 columns[10] =  new nlobjSearchColumn("tranid");
				 columns[11] = new nlobjSearchColumn("memo");
				 columns[12] = new nlobjSearchColumn('internalid');
	             columns[13] = new nlobjSearchColumn('currency');
				 
				 
				 
				 var results = GetSearchResults(filters,columns);
	   	 	  
			  	 nlapiLogExecution('DEBUG', 'Before Load', "  results  ==" + results);
			  	 
				 if(results !=null && results !=undefined && results !='')
				 {
					     form.setScript('customscript_client_customer_payment');
			  		   	form.addButton('custpage_button2','Update Payment Receipt','UpdatePayReceiptCuctomTransMultipleInvoice();');
		       
				 }
	  		    
		
			
	}
 
}

function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_invoice_for_payment', filters, columns);
	return results;
}
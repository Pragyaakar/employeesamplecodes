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




function  CallToCreatePOonNext(type)
{
	// alert('create PO')
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


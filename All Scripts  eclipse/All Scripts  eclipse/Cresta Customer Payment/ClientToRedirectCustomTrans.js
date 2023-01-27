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
function refresh()
{
	window.location.reload();
}

function  CreateCuctomTrans(type)
 {
	  var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
             var url2 = nlapiResolveURL('SUITELET', 'customscript_cutomer_payment_custom_trns', 'customdeploy_cutomer_payment_custom_trns');
        	 url2 = url2 + '&cust_type='+recordType + '&cust_id='+recordId;
             window.onbeforeunload = null;
	       window.open(url2, '_parent', 'print')
}



function  CreateCuctomTransMultipleInvoice(type)
 {
	    var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
		var obj =nlapiLoadRecord(recordType,recordId);
		
		//var custId = obj.getFieldValue('internalid');
		
             var url2 = nlapiResolveURL('SUITELET', 'customscript_multiple_invoice_suitelet', 'customdeploy_multiple_invoice_suitelet');
        	 url2 = url2 + '&cust_type='+recordType + '&cust_id='+recordId;
             window.onbeforeunload = null;
	       window.open(url2, '_parent', 'print')
}

function  UpdatePayReceiptCuctomTransMultipleInvoice(type)
{
	    var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
		var obj =nlapiLoadRecord(recordType,recordId);
		
		var count =obj.getLineItemCount('line');
		
		for(var p=1;p<=count;p++)
		{
			var CustName =obj.getLineItemValue('line','entity',p);
			
			if(CustName!=null && CustName!=undefined && CustName!='')
			{
				var idCust =CustName;
				break;
			}
		}
		
            var url2 = nlapiResolveURL('SUITELET', 'customscript_reversal_gl_impact_cust_tra', 'customdeploy_reversal_gl_impact_cust_tra');
       	 url2 = url2 + '&cust_type='+recordType + '&cust_id='+idCust;
            window.onbeforeunload = null;
	       window.open(url2, '_parent', 'print')
}

function clientScriptForAmtValidation(type, name, linenum)
{
	
	 if(type == 'custpage_sig_req_sublist' && name == 'custpage_pay_amt') 
     {

		 var lineNum = linenum;
		 
		var Amt = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_amt',lineNum);
		 
		var PayAmt = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_pay_amt',lineNum);
		
		if(parseFloat(PayAmt) > parseFloat(Amt))
		{
			alert('The Payment Amount should be Less Than Original Amount..!!');
			nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_pay_amt',lineNum,'',false,true);
		}
		  
     }
	
}

/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Feb 2019     Priyanka Patil
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
function cltFieldChange(type, name, linenum)
{
	if(type == 'custpage_sig_req_sublist' && name == 'custpage_apply' || 'custpage_payment')
	{
		/*var recordId = nlapiGetRecordId(); 
	    var recordType= 'customerpayment';
	    
	    recObj = nlapiLoadRecord(recordType,recordId);*/
	   
		var i = linenum;
		
				var date = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_date',i);
				//alert("date  ==" +date);
				
				var type = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_type',i);
				//alert("type  ==" +type);
				
				var ref_No = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_ref_no',i);
				alert("ref_No  ==" +ref_No);
				//ref_NoArray.push(ref_No);
				
				var orig_amt = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_org_amt',i);
				//alert("orig_amt  ==" +orig_amt);
				
				var amt_due = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_amt_due',i);
				//alert("amt_due  ==" +Number(amt_due.toString()));
				//amt_dueArray.push(amt_due);
				var dueVal =(amt_due);
				var currency = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_currency',i);
				//alert("currency  ==" +currency);
				
				var payment = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_payment',i);
				//alert("payment  ==" +payment);
				
				
				if(parseFloat(payment) > parseFloat(amt_due))
				{
					alert("parseFloat(payment)  ==" +parseFloat(payment)+"parseFloat(amt_due) ="+parseFloat(amt_due));
					alert('Payment Amount should be less than or equal to amount due..');
					nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_payment',i,amt_due);
				}
				
				var payment1 = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_payment',i);
				alert("payment1  ==" +payment1);
				
				//paymentArray.push(payment);
				
				var count = nlapiGetLineItemCount('apply');
				alert("count  ==" +count);
				
				for(j=1;j<=count;j++)
				{
					var ref_No1 = nlapiGetLineItemValue('apply','refnum',j);
					//alert("ref_No1  && ref_No ==" +ref_No1 +';;'+ref_No);
					
					var amt_due1 = nlapiGetLineItemValue('apply','due',j);
					var val1 = parseFloat(amt_due); 
					var val2 = parseFloat(amt_due1); 
					
					
					//alert("amt_due1  && amt_due ==" +amt_due1 +';;'+amt_due);		
					
						if((ref_No1 === ref_No) && (parseFloat(amt_due1)<=parseFloat(amt_due)))//&&(dueVal == amt_due1)
						{
							alert("ref_No  ==" +ref_No);
							alert("COndition MAtches");
							nlapiSetLineItemValue('apply','apply',j,'T');
							nlapiSetLineItemValue('apply','amount',j,payment1);
						}
					
				}
		
	}
}
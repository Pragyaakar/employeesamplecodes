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

function  redirectSuit(type)
 {
	  var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
             var url2 = nlapiResolveURL('SUITELET', 'customscript_suite_pr_to_po_create', 'customdeploy_suite_pr_to_po_create');
        	 url2 = url2 + '&type='+recordType + '&id='+recordId;
             window.onbeforeunload = null;
	       window.open(url2, '_parent', 'print')
}


function clientScriptPOredirect(type)
{
	 var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
			vendor_Name =filter_array(VendorArr);
			vendorUniq =removeDuplicates(vendor_Name);
			
		//	for(var k=0;k < vendorUniq.length;k++)
			{
				//alert('vendorUniq in for'+vendorUniq[k]);
			//	var name = vendorUniq[k];
				var name = '412';
				var url = "https://system.na3.netsuite.com/app/accounting/transactions/purchord.nl?whence=&entity="+name+"&custbody_req_num="+recordId+"";
		        window.open(url);
				//setTimeout(function(){window.open(url)},5000);
			}
		//}
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

function ReSubmitApproval()
{
	 var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
             var url1 = nlapiResolveURL('SUITELET', 'customscript_update_screen_requi', 'customdeploy_update_screen_requi');
        	 url1 = url1 + '&type='+recordType + '&id='+recordId;
             window.onbeforeunload = null;
	       window.open(url1, '_parent', 'print')
	       nlapiRequestURL(url1);
	      // window.open(url);
             
}

function filter_array(test_array) 
{
	 var index = -1,
	 arr_length = test_array ? test_array.length : 0,
	 resIndex = -1,
	 result = [];

	 while (++index < arr_length) 
	 {
	     var value = test_array[index];
	     if(value)
	     {
	        result[++resIndex] = value;
	      }
	 }
return result;
}

function removeDuplicates(num) 
{
	  var x,
	      len=num.length,
	      out=[],
	      obj={};
	 
	  for (x=0; x<len; x++) 
	  {
	    obj[num[x]]=0;
	  }
	  for (x in obj) 
	  {
	    out.push(x);
	  }
	  return out;
	}
		
	
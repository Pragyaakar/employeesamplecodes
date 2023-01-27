/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       10 Dec 2019     Tushar More
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
function BeforeLoadCloseTransButton(type, form, request)
{
	if(type=='view')
	{ 
		      var recordId = nlapiGetRecordId();
		      var recordType = nlapiGetRecordType();
		      var ReqObj = nlapiLoadRecord(RecordType,RecordId);
				 
			 var closeStatus= ReqObj.getFieldValue('entitystatus');
			  
			  if(closeStatus != 16)
			  {
					form.setScript('customscript_redirect_trans_close_suite');
					form.addButton('custpage_close','Close','closeFunctionSubmit();');
					 
			  }
		
	}
 
}
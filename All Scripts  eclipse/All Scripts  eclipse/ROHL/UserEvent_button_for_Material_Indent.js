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
function BeforeLoadMaterialSOButton(type, form, request)
{
//
	
	if(type=='view' )
	{ 
	 
		
		var chk = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId(), {recordmode: 'dynamic'});
		
		var form1 = chk.getFieldValue('customform');
	    nlapiLogExecution('DEBUG', 'Log Parameters', 'form is = '+ form1);
	    
	    var StoreIndent = chk.getFieldValue('custbody_store_ind_status');
	    nlapiLogExecution('DEBUG', 'Log Parameters', 'StoreIndent is = '+ StoreIndent);//
	    
	    var ApproveStatus = chk.getFieldValue('approvalstatus');
	    nlapiLogExecution('DEBUG', 'Log Parameters', 'ApproveStatus is = '+ ApproveStatus);//
	    
	    if(form1 == '166' && StoreIndent =='1' && ApproveStatus=='2' )
	    {
	    	form.setScript('customscript_client_script_for_button_mi');
            form.removeButton('createpo');
	        form.addButton('custpagebutton', 'Create Transfer Order', 'onclick_SOcreateCall();');

	    }
    	
	}
 
}

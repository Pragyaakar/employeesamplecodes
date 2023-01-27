/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       9 June 2020     Tushar More
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
function BeforeLoadMaterialIssueButton(type, form, request)
{
//
	
	if(type=='view' )
	{ 
		try
		{
			
		
		    var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		
	       var irObj = nlapiLoadRecord(recordType,recordId); 
	      
	       var status =irObj.getFieldValue('approvalstatus');
	 	   nlapiLogExecution('DEBUG', 'Before Load', "  status  ==" + status);
      
	 	   var materialIssue =irObj.getFieldValue('custbody_material_issue_for_workorder');
	 	   nlapiLogExecution('DEBUG', 'Before Load', "  materialIssue  ==" + materialIssue);
	 	
	 	 if(materialIssue == null || materialIssue == undefined || materialIssue == '')
	 	 {
	 		 form.setScript('customscript_call_material_issue_wo');
		 	 form.addButton('custpage_createto','Material Issue','CallToCreateMaterialIssue();');
		
	 	 }
                 
	}
	catch(e)
	{
		nlapiLogExecution('Error','B4 Load Button','Erroorrr :'+e )
	}
			
	}
 
}

 
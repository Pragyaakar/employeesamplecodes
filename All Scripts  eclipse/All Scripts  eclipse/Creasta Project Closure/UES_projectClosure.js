/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       05 Aug 2019     AMOL ATPL
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmit(type)
{
  var rectype = nlapiGetRecordType();
  var recid = nlapiGetRecordId();
  var jobObj;
  var status;
  var searchObj;
  var searchRec;
  var resultLength;
  //load the Project Record and clear the object
  jobObj = nlapiLoadRecord(rectype,recid);
  
  var ProjName =jobObj.getFieldValue('id');
  
  status = jobObj.getFieldValue('entitystatus');
  nlapiLogExecution('DEBUG', 'aftr submit', "  status  ==" + status);
  if(status == '1')
  {
	  var params = new Array();
		params['custscript_project_id_close']=ProjName;
	  nlapiScheduleScript('customscript_sche_after_project_close', 'customdeploy_sche_after_project_close', params);
	  //nlapiScheduleScript('customscript_updt_emp_recalc', 'customdeploy1', params);
	  
  }
}

function userEventBeforStatus(type, form, request)
{
	if(type=='view' || type=='edit')
	{
		  var rectype = nlapiGetRecordType();
		  var recid = nlapiGetRecordId();
		  var jobObj;
		  var status;
		  var searchObj;
		  var searchRec;
		  var resultLength;
		  //load the Project Record and clear the object
		  jobObj = nlapiLoadRecord(rectype,recid);
		  
		  var ProjName =jobObj.getFieldValue('id');
		  
		  status = jobObj.getFieldValue('entitystatus');
		  nlapiLogExecution('DEBUG', 'aftr submit', "  status  ==" + status);
		  if(status == '1')
		  {
			 var statField = form.getField('entitystatus');
			 statField.setDisplayType('disabled');
		  }
	}
}
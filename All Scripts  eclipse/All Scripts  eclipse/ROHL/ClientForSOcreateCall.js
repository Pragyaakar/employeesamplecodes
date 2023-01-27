/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Dec 2018     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function onclick_SOcreateCall(type)
{
/*	var recID = nlapiGetRecordId();
    var recordType = nlapiGetRecordType();
	nlapiLogExecution('DEBUG', 'Log Parameters', 'recordType'+recordType);
	if(type=='view'){
  	var url = nlapiResolveURL('SUITELET', 'customscript_emp_quota_suite', 'customdeploy1')+'&itemid=' + recID+'&itemtype=' +recordType;
    //'&custscript_lineid='+ lineId+'&custscript_taskid='+ ID;
    document.location=url;
	}*/
	var chk = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId());
	
	var value = nlapiResolveURL('SUITELET', 'customscript_material_suite_so_create', 'customdeploy_material_suite_so_create', false);
	  value += '&id=' + nlapiGetRecordId()+'&type='+nlapiGetRecordType();
	  nlapiLogExecution('DEBUG', 'Log Parameters', 'recordid'+ nlapiGetRecordId());
      // window.open(value);
      nlapiRequestURL(value);
     location.reload();
	//  document.location=value;
}
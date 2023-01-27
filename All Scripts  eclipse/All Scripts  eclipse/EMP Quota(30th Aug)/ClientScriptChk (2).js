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

function onclick_callClient(type)
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
	
	var salesrep=chk.getFieldValue('custrecord_employee');	
	var start_mon=chk.getFieldValue('custrecord_osi_emp_qta_strt_mnth');
	var start_year=chk.getFieldValue('custrecord_year_text');
    var quotaPar =chk.getFieldValue('custrecord_quota');
	
     nlapiLogExecution('DEBUG', 'Log Parameters', 'salesrep:'+salesrep);
     nlapiLogExecution('DEBUG', 'Log Parameters', 'start_mon:'+start_mon);
     nlapiLogExecution('DEBUG', 'Log Parameters', 'start_year:'+start_year);
   nlapiLogExecution('DEBUG', 'Log Parameters', 'quotaPar:'+quotaPar);
     
	var value = nlapiResolveURL('SUITELET', 'customscript_emp_quota_suite', 'customdeploy1', false);
	  value += '&id=' + nlapiGetRecordId()+'&custscript1='+salesrep+'&strt_mnth='+start_mon+'&strt_year='+start_year+'&pre_qota='+quotaPar;
	  nlapiLogExecution('DEBUG', 'Log Parameters', 'recordid'+ nlapiGetRecordId());
      // window.open(value);
      nlapiRequestURL(value);
     location.reload();
	//  document.location=value;
}
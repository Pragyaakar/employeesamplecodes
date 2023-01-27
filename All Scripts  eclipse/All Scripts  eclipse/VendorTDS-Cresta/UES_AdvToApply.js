/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 May 2019     Shivraj
 *
 */


function userEventBeforeLoadAdvanceToapply(type, form, request)
{		
		/*var checkid = nlapiGetRecordId()
		nlapiLogExecution('DEBUG', 'BeforeLoadRecord check ', " checkid " + checkid)
	
		var recordType = nlapiGetRecordType()
		nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', " recordType " + recordType)
	
		var o_checkobj = nlapiLoadRecord(recordType, checkid)
		nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', " recordType " + recordType)
	*/	
		// Getting Vendor Id		
		
	   if (type == 'view')
	  {
		   var checkid = nlapiGetRecordId()
			nlapiLogExecution('DEBUG', 'BeforeLoadRecord check ', " checkid " + checkid)
		
			var recordType = nlapiGetRecordType()
			nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', " recordType " + recordType)
		
			var o_checkobj = nlapiLoadRecord(recordType, checkid)
			nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', " o_checkobj " + o_checkobj)
		   
		   
		var entity = o_checkobj.getFieldValue('entity');
		nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "entity" + entity);
		
		var advance_TDSApplied = o_checkobj.getFieldValue('custbody_advance_tds_applied');
		nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "advance_TDSApplied" + advance_TDSApplied);
		
		if(advance_TDSApplied == 'F')
{
		var params = 'width='+900+', height='+500; 
			 params += ', top='+75+', left='+300; 
			 params += ', directories=no'; 
			 params += ', location=yes'; 
			 params += ', menubar=no'; 
			 params += ', resizable=yes'; 
			 params += ', scrollbars=yes'; 
			 params += ', status=no'; 
			 params += ', toolbar=no'; 
			 
		var url = nlapiResolveURL('SUITELET', 'customscript_sut_advancetoapply', 'customdeploy_sut_advancetoap')+'&entity_=' + entity+'&checkid_=' + checkid+'&recordType_=' + recordType;		
		form.addButton('custpage_advance','Advance TDS Apply',"window.open('" + url + "','Advance to Apply','"+params+"');");
       
}		

	  }
		
	 
}


function userEventBeforeSubmit(type){
 
}


function userEventAfterSubmit(type){
  
}

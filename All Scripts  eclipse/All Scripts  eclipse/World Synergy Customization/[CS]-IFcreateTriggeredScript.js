/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Jan 2020     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */


	
function IFcreateFunction()
{

	 var recordId = nlapiGetRecordId();
     var recordType = nlapiGetRecordType();

   var irObj = nlapiLoadRecord(recordType,recordId); 

   irObj.setFieldValue('custbody_if_check_box','T');
   nlapiSubmitRecord(irObj);
}
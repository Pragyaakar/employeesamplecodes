/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Mar 2019     Tushar More
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
	var chk = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId());
	
	chk.getFieldValue('orderstatus');
	 nlapiLogExecution('DEBUG', 'Log Parameters', 'form is = '+ form1);
	
}

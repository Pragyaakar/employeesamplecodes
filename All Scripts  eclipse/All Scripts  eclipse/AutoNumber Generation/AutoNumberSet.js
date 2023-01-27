/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00      23 Jan 2020     Tushar
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
function autoNumberingAfterSubmit(type){
	nlapiLogExecution('DEBUG', 'Type', type);
	if(type == 'create'){
		
	var recordType = nlapiGetRecordType();
	var recordId = nlapiGetRecordId();
	var transObj = nlapiLoadRecord(recordType, recordId,  {recordmode: 'dynamic'});
	if(transObj != null && transObj != undefined && transObj != '')
	{
	 var customer = transObj.getFieldValue('parent');
    var abbreviation  = transObj.getFieldValue('custentity_abbreviation');
  
  var autoNumber_digitNo = nlapiLookupField('customrecord_auto_number_record', 1, ['custrecord1537','custrecord_number','custrecord_transaction_is']);
  var autoNumber = autoNumber_digitNo['custrecord1537'];
 var minDigit = autoNumber_digitNo['custrecord_number'];
 var abbreviation  = autoNumber_digitNo['custrecord_transaction_is'];
 var digitLength='';
 minDigit = parseInt(minDigit,10)

	  if(minDigit){
		   for (var index = 0; index < minDigit; index++) {
		 	 digitLength = digitLength+'0';
		  }
	 }
 
  if(abbreviation != null && abbreviation != undefined && abbreviation != ''){
	  var value = abbreviation + autoNumber;
	  nlapiLogExecution('DEBUG', 'value', value);
	  nlapiSubmitField('vendor', recordId, 'entityid', value);
	  var incrementvalue = (+autoNumber) + 1;

		// insert leading zeroes with a negative slice
		incrementvalue = (digitLength + incrementvalue).slice(minDigit-(minDigit*2));
	 
	  nlapiLogExecution('DEBUG', 'autoNumber', incrementvalue);
	  nlapiSubmitField('customrecord_auto_number_record', 1, 'custrecord1537', incrementvalue)
  }
  
	}
	}
}
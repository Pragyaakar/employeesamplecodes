	/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00      23 Jan 2020     Tushar More
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
	function CustomAutoNumberingValidate(type)
	{
		
		 var TransType = nlapiGetFieldValue('custrecord_tran_type');
			
		 nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','TransType =='+ TransType);
			
		var location = nlapiGetFieldValue('custrecord_rec_location');
	
		nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','location =='+ location);
			
		var Class =nlapiGetFieldValue('custrecord_rec_class');

		nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','Class =='+ Class);
		
		var StartDate = nlapiGetFieldValue('custrecord_start_date');

		nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','StartDate =='+ StartDate);
		
		var EndDate = nlapiGetFieldValue('custrecord_end_date');

		nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','EndDate =='+ EndDate);
		
		var NewNameField = TransType+location+Class+StartDate+EndDate;
		
		nlapiSetFieldValue('name',NewNameField);
		  
 	
	}

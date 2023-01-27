	/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00      11 Feb 2020     Tushar More
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

function CustomRecordautoNumberingAfterSubmit(type)
{
	if(type == 'create' || type == 'edit')
	{
		var recType = nlapiGetRecordType();
		var recID = nlapiGetRecordId();
		
		var transObj = nlapiLoadRecord(recType,recID);
		 nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','recType =='+ recType + 'recID =='+ recID);
		
		 var TransType = transObj.getFieldValue('custrecord_tran_type');
			
			nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','TransType =='+ TransType);
			
		var location = transObj.getFieldValue('custrecord_rec_location');
	
		nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','location =='+ location);
			
		var Class = transObj.getFieldValue('custrecord_rec_class');

		nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','Class =='+ Class);
		
		var StartDate = transObj.getFieldValue('custrecord_start_date');

		nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','StartDate =='+ StartDate);
		
		var EndDate = transObj.getFieldValue('custrecord_end_date');

		nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','EndDate =='+ EndDate);
		
		var NewNameField = TransType+'/'+location+Class+'/'+StartDate+'/'+EndDate;
		
		var filters=new Array();
	    var columns=new Array();
		
		filters[0]=new nlobjSearchFilter('custrecord_duplicate_record_check', null, 'is',NewNameField);
		// columns[0]= new nlobjSearchColumn('internalid');
		
		var searchresults = nlapiSearchRecord('customrecord_auto_number_record','customsearch_autonumber_searc', filters, columns);
		nlapiLogExecution('DEBUG','CustomRecord AutoNumbering','searchresults =='+ searchresults);
		
		if(searchresults != null)
		{
			if (searchresults.length > 0) 
			{
				throw nlapiCreateError('ERROR',"There already a Record is available for the Selected Fields..", false); 
				

			}		
		}
		else
		{
			nlapiSubmitField(recType,recID,'custrecord_duplicate_record_check',NewNameField);
			
		}
		
		  
 	}
}
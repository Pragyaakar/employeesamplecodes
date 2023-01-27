/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Jan 2019     Tushar More
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


	// BEGIN AFTER SUBMIT =============================================

	function userEventBeforeSubmitVendorStateWise(type)
	{



		//  LOCAL VARIABLES
		if (type == 'create' || type == 'copy'||type == 'edit') 
		{
				
	
				var recordtype = nlapiGetRecordType();
				var recordObj = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
			    
				var State = recordObj.getFieldValue('custentity_abbreviationcus');
				 nlapiLogExecution('DEBUG', 'afterSubmitRecord', ' state =' + State);
				
				 var Abbrevan = recordObj.getFieldValue('custentity_abbreviationcus');
				 nlapiLogExecution('DEBUG', 'afterSubmitRecord', ' Abbrevan =' + Abbrevan);
				 
				if(Abbrevan)
				{
					var autonumber = GenerateAutoNumber(recordtype,Abbrevan,State);
					nlapiLogExecution('DEBUG', 'afterSubmitRecord', ' autonumber =' + autonumber);
					autonumber = autonumber + Abbrevan;
					nlapiLogExecution('DEBUG', 'afterSubmitRecord', ' autonumber =' + autonumber);
					if (autonumber != '') 
					{
						nlapiLogExecution('DEBUG', 'afterSubmitRecord', ' Setting Number');
						recordObj.setFieldValue('entityid', autonumber);
						
						nlapiSubmitRecord(recordObj, true, false);
					}
				}
				
				
			//}
		}
	}

	// END AFTER SUBMIT ===============================================

	// BEGIN FUNCTION ==================================================

	function GenerateAutoNumber(recordtype,Abbrevan,State)
	{
		var filters=new Array();
	    var columns=new Array();
		var Duplicate = 'F';
		//var subsidryCode;
		var locCode;
		var year;
		var autoNum;
		var tranprefix;
		
		filters[0]=new nlobjSearchFilter('customrecord_state', null, 'anyof', State);
	    columns[0]= new nlobjSearchColumn('custrecord_transaction_is');
		columns[1]= new nlobjSearchColumn('custrecord2');
		columns[2]= new nlobjSearchColumn('custrecord3');
		columns[3]= new nlobjSearchColumn('custrecord4');
		columns[4]= new nlobjSearchColumn('internalid');

		var searchresults = nlapiSearchRecord('customrecord_for_vendor', null,filters,columns);
		
		if(searchresults != null)
		{
			for (var i = 0;  i < searchresults.length; i++) 
			{
							
				tranprefix = searchresults[i].getValue('custrecord1');
				nlapiLogExecution('DEBUG', 'tranprefix', 'tranprefix***************' +tranprefix);
			
				var prefix = tranprefix;
				var number = searchresults[i].getValue('custrecord3');
				nlapiLogExecution('DEBUG', 'number', 'number***************' +number);
				var internalid = searchresults[i].getValue('internalid');
				nlapiLogExecution('DEBUG', 'internalid', 'internalid***************' +internalid);
				
				var incrementvalue = (+number) + 1;

				// insert leading zeroes with a negative slice
				incrementvalue = ("0000" + incrementvalue).slice(-4);
				
				
				
				var autoNumber = prefix + incrementvalue;
				nlapiLogExecution('DEBUG', 'autoNumber Below number', 'autoNumber***************:' +autoNumber);
				
				 
				
					nlapiLogExecution('DEBUG', 'autoNumber Below number', 'Duplicate***************:' +Duplicate)
					Duplicate = SearchDupicate(autoNumber,recordtype);
					nlapiLogExecution('DEBUG', 'autoNumber Below number', 'Duplicate***************:' +Duplicate)
					if(Duplicate=='T')
					{
						 incrementvalue = (+number) + 1;

						// insert leading zeroes with a negative slice
						incrementvalue = ("0000" + incrementvalue).slice(-4);
						
						
						
						var autoNumber = prefix + incrementvalue;
					}
				
				//while(Duplicate == 'T');
				
				
				
				nlapiLogExecution('DEBUG', 'autoNumber Below do_while :', 'autoNumber***************:' +autoNumber);
				nlapiLogExecution('DEBUG', 'autoNumber Below do_while :', 'internalid***************:' +internalid);
				// update the custom record.
				var customObj = nlapiLoadRecord('customrecord_for_vendor',internalid);
				customObj.setFieldValue('custrecord3',incrementvalue);
				nlapiSubmitRecord(customObj,true,true);
				
				return autoNumber;
			}
		}
		return '';
	}
	

	
	
	function SearchDupicate(autoNumber,recordtype)
	{
		var filters=new Array();
	    var columns=new Array();
		
		filters[0]=new nlobjSearchFilter('entityid', null, 'is', autoNumber);
		columns[0]= new nlobjSearchColumn('internalid');
		
		var searchresults = nlapiSearchRecord(recordtype, null, filters, columns);
		
		if(searchresults != null)
		{
			for (var j = 0;  j < searchresults.length; j++) 
			{
				if (searchresults[j].getValue('internalid') != nlapiGetRecordId()) 
				{
					return 'T';
				}
			}		
		}
		return 'F';
	}
	
	

	// END FUNCTION =====================================================

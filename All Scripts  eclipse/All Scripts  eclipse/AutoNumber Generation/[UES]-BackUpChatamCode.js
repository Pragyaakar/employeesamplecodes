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
	function autoNumberingAfterSubmit(type)
	{
		//nlapiLogExecution('DEBUG', 'Type', type);
		if(type == 'create' || type == 'edit')
		{
			var checkType;
			
			var recType = nlapiGetRecordType();
			var recID = nlapiGetRecordId();
			
			var transObj = nlapiLoadRecord(recType,recID);
			 nlapiLogExecution('DEBUG','AutoNumbering','recType =='+ recType + 'recID =='+ recID);
			 
			if(transObj != null && transObj != undefined && transObj != '')
			{
			   var loc = nlapiGetFieldValue('location');
			   nlapiLogExecution('DEBUG','AutoNumbering','loc =='+ loc);
				
			   var location = nlapiGetFieldText('location');
			   nlapiLogExecution('DEBUG','AutoNumbering','Location =='+ location);
			
			   if(loc != null && loc != undefined && loc != '')
			   {
				   var lookupLoc = nlapiLoadRecord('location',loc);
				   nlapiLogExecution('DEBUG','AutoNumbering','lookupLoc =='+ lookupLoc);
				   
				   var locParent = lookupLoc.getFieldValue('parent');
				   nlapiLogExecution('DEBUG','AutoNumbering','locParent =='+ locParent);

				   
				   if(locParent == null || locParent == '' || locParent == undefined)
				   {
					   locParent = location;
				   }
				   	   
				   var locPrefix = acronym(locParent);
				   nlapiLogExecution('DEBUG','AutoNumbering','locPrefix =='+ locPrefix);
				   
				   if(locPrefix == null || locPrefix == '' || locPrefix == undefined || isNaN(locPrefix) == true)
				   {
					   locPrefix = '';
				   }
				   
			   }
			 
			   var tranClass = nlapiGetFieldValue('class');
			   nlapiLogExecution('DEBUG','AutoNumbering','tranClass =='+ tranClass);
				
			   var Class = nlapiGetFieldText('class');
			   nlapiLogExecution('DEBUG','AutoNumbering','Class =='+ Class);
			
			   if(tranClass != null && tranClass != '' && tranClass != undefined)
			   {
				   var lookupClass = nlapiLoadRecord('classification',tranClass);
				   nlapiLogExecution('DEBUG','AutoNumbering','lookupClass =='+ lookupClass);
				   
				   var classParent = lookupLoc.getFieldText('parent');
				   nlapiLogExecution('DEBUG','AutoNumbering','classParent =='+ classParent);
				   
				   if(classParent == null || classParent == '' || classParent == undefined)
				   {
					   classParent = Class;
				   }
				   
				   var classPrefix = acronym(classParent);
				   nlapiLogExecution('DEBUG','AutoNumbering','classPrefix =='+ classPrefix);
				   
				   if(classPrefix == null || classPrefix == '' || classPrefix == undefined || isNaN(classPrefix) == true)
				   {
					   classPrefix = '';
				   }
				   
			   }
			   
			   var tranDate = nlapiGetFieldValue('trandate');
			   nlapiLogExecution('DEBUG','AutoNumbering','tranDate =='+ tranDate);
			   
			   var DateCurrent = new Date();
			   var nextYear = DateCurrent.getFullYear()+1;
			   
			   var startDate ='01/04/'+DateCurrent.getFullYear();
			   var endDate ='31/03/'+parseInt(nextYear);
			   
			   var dateRange = startDate+'-'+endDate;
			   
			   
			   if(recType =='purchaseorder')
				{
					checkType='Purchase Order';
				}
				else if(recType =='salesorder')
				{
					checkType='Sales Order';
				}
				else if(recType =='invoice')
				{
					nlapiLogExecution('DEBUG','AutoNumbering','Enter in INV ==');
					checkType='Invoice';
				}
				else if(recType =='vendorbill')
				{
					checkType='Bill';
				}
				
			   var filters=new Array();
			   filters[0] = new nlobjSearchFilter("custrecord_tran_type",null,"contains",checkType);
				
			    var columns=new Array();
			    columns[0]= new nlobjSearchColumn('id');
				columns[1]= new nlobjSearchColumn('custrecord_tran_type');
				columns[2]= new nlobjSearchColumn('custrecord_transaction_is');
				columns[3]= new nlobjSearchColumn('custrecord_number');
				columns[4]= new nlobjSearchColumn('custrecord1537');
			
				var searchresults = nlapiSearchRecord('customrecord_auto_number_record','customsearch_autonumber_searc',filters,columns);
				nlapiLogExecution('DEBUG','AutoNumbering','searchresults =='+searchresults);
				
				if(searchresults != null)
				{
					nlapiLogExecution('DEBUG','AutoNumbering','searchresults.length =='+searchresults.length);
					for (var i = 0;  i < searchresults.length; i++) 
					{
						var TransType = searchresults[i].getValue('custrecord_tran_type');
						nlapiLogExecution('DEBUG', 'tranprefix', 'TransType***************' +TransType);
					
						var abbreviation = searchresults[i].getValue('custrecord_transaction_is');
						nlapiLogExecution('DEBUG', 'abbreviation', 'abbreviation***************' +abbreviation);
					
						var prefix = abbreviation;
						var minDigit = searchresults[i].getValue('custrecord_number');
						nlapiLogExecution('DEBUG', 'minDigit', 'minDigit***************' +minDigit);
						
						var internalid = searchresults[i].getValue('id');
						nlapiLogExecution('DEBUG', 'internalid', 'internalid***************' +internalid);
						
						var autoNumber = searchresults[i].getValue('custrecord1537');
						nlapiLogExecution('DEBUG', 'autoNumber', 'autoNumber***************' +autoNumber);
						
						var tranYear = searchresults[i].getValue('custrecord_autonum_year');
						nlapiLogExecution('DEBUG', 'autoNumber', 'tranYear***************' +tranYear);
					}
				}
				
				var digitLength='';
			    minDigit = parseInt(minDigit,10)
			
			   if(minDigit)
			   {
				   for (var index = 0; index < minDigit; index++) 
				   {
					   digitLength = digitLength+'0';
				   }
			   }
			 
			  if(abbreviation != null && abbreviation != undefined && abbreviation != '')
			  {
				  nlapiLogExecution('DEBUG', 'locPrefix', locPrefix);
				  
				  var merge =locPrefix + classPrefix +'-';
				  
				  if(merge != null && merge != undefined && merge != '' && isNaN(classPrefix) == false)
				  {
					  merge =merge;
				  }
				  else{
					  merge = '';
				  }
				  var value = merge+dateRange+'-'+autoNumber+'-'+abbreviation ;
				  nlapiLogExecution('DEBUG', 'value', value);
				  
				  nlapiSubmitField(recType, recID, 'tranid', value);
				  var incrementvalue = (+autoNumber) + 1;
			
				  // insert leading zeroes with a negative slice
				  incrementvalue = (digitLength + incrementvalue).slice(minDigit-(minDigit*2));
				 
				  nlapiLogExecution('DEBUG', 'autoNumber', incrementvalue);
				  nlapiSubmitField('customrecord_auto_number_record', internalid,'custrecord1537', incrementvalue)
			  }
		   }
		}
	}

	function acronym(text) {
		  return text
		    .split(/\s/)
		    .reduce(function(accumulator, word) {
		      return accumulator + word.charAt(0);
		    }, '');
		}
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
		nlapiLogExecution('DEBUG', 'Type', type);
		if(type == 'create' || type == 'edit')
		{
			var checkType;
			
			var recType = nlapiGetRecordType();
			var recID = nlapiGetRecordId();
			
			var transObj = nlapiLoadRecord(recType,recID);
			 nlapiLogExecution('DEBUG','AutoNumbering','recType =='+ recType + 'recID =='+ recID);
			 var locPrefix;
			 var classPrefix;
			 
			if(transObj != null && transObj != undefined && transObj != '')
			{
			   var location = nlapiGetFieldValue('location');
			   nlapiLogExecution('DEBUG','AutoNumbering','location =='+ location);
				
			   if(location !=null && location !='' && location != undefined)
			   {
				   locPrefix = nlapiLookupField('location',location,'custrecord_loc_abbrevation');
			   }
			   
			   var Adjlocation = nlapiGetFieldValue('adjlocation');
			   nlapiLogExecution('DEBUG','AutoNumbering','Adjlocation =='+ Adjlocation);
				
			   if(Adjlocation !=null && Adjlocation !='' && Adjlocation != undefined)
			   {
				   locPrefix = nlapiLookupField('location',Adjlocation,'custrecord_loc_abbrevation');
			   }
			   
			   nlapiLogExecution('DEBUG','AutoNumbering','locPrefix =='+ locPrefix);
			   
			   var Class = nlapiGetFieldValue('class');
			   nlapiLogExecution('DEBUG','AutoNumbering','Class =='+ Class);
			 
			   if(Class !=null && Class !='' && Class != undefined)
			   {
				   classPrefix=nlapiLookupField('classification',Class,'custrecord_class_abbrevation');
			   }
			  
			   nlapiLogExecution('DEBUG','AutoNumbering','classPrefix =='+ classPrefix);
			   
			   var tranDate = nlapiGetFieldValue('trandate');
			   nlapiLogExecution('DEBUG','AutoNumbering','tranDate =='+ tranDate);
			   
			   var dateCheck =nlapiStringToDate(tranDate);
			   
			   var applyYear = dateCheck.getFullYear();
			   nlapiLogExecution('DEBUG','AutoNumbering','applyYear =='+ applyYear.toString());
			   
			   var beforeYear = dateCheck.getFullYear()-1;
			   nlapiLogExecution('DEBUG','AutoNumbering','beforeYear =='+ beforeYear.toString());
			   
			   var nextYear = dateCheck.getFullYear()+1;
			   nlapiLogExecution('DEBUG','AutoNumbering','beforeYear =='+ beforeYear.toString());
			   
			   
			   var applyMonth = dateCheck.getMonth()+1;
			   nlapiLogExecution('DEBUG','AutoNumbering','applyMonth =='+ applyMonth.toString());


			  /* var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
				   "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
				 ];

				 var date1 = new Date(tranDate)
				// date.setDate(date.getDate() - 1)
				 date1 = date1.getDate()+"-"+monthNames[date1.getMonth()]+"-"+date1.getFullYear()
				 */
			   if(applyMonth < 4)
			   {
				   var startDate1 ='01-APR-'+beforeYear;
				   var endDate1 ='31-MAR-'+applyYear;
			   }
			   else if(applyMonth >= 4)
			   {
				   var startDate1 ='01-APR-'+applyYear;
				   var endDate1 ='31-MAR-'+nextYear;
			   }
			   
			  
			   nlapiLogExecution('DEBUG','AutoNumbering','STrtDate my =='+nlapiStringToDate(startDate1.toString()));
			   nlapiLogExecution('DEBUG','AutoNumbering','EndDate my =='+ nlapiStringToDate(endDate1.toString()));
			   
			    if(recType =='purchaseorder')
				{
					
					checkType=1;
				}
				else if(recType =='salesorder')
				{
					checkType=2;
				}
				else if(recType =='invoice')
				{
					checkType=3;
				}
				else if(recType =='vendorbill')
				{
					checkType=4;
				}
				else if(recType =='itemreceipt')
				{
					checkType=5;
				}
				else if(recType =='itemfulfillment')
				{
					checkType=6;
				}
				else if(recType =='inventoryadjustment')
				{
					checkType=7;
				}
				else if(recType =='journalentry')
				{
					checkType=8;
				}
				else if(recType =='creditmemo')
				{
					checkType=10;
				}
				else if(recType =='inventorytransfer')
				{
					checkType=11;
				}
				
			   var filters=new Array();
			   nlapiLogExecution('DEBUG','AutoNumbering','checkType =='+ checkType);
			   filters[0] = new nlobjSearchFilter("custrecord_tran_type",null,"anyof",checkType);
			   
			   if(location != null && location != '' && location != undefined)
			   {
				  nlapiLogExecution('DEBUG','AutoNumbering','location =='+ location);
				 filters[1] = new nlobjSearchFilter("custrecord_rec_location",null,"anyof",location);
			   }
			   
			   if(Adjlocation != null && Adjlocation != '' && Adjlocation != undefined)
			   {
				 nlapiLogExecution('DEBUG','AutoNumbering','Adjlocation =='+ Adjlocation);
				 filters[1] = new nlobjSearchFilter("custrecord_rec_location",null,"anyof",Adjlocation);
			   }
			   
			   if(Class != null && Class != '' && Class != undefined)
			   {
				   nlapiLogExecution('DEBUG','AutoNumbering','Class =='+ Class);
			     filters[2] = new nlobjSearchFilter("custrecord_rec_class",null,"anyof",Class);
			   } 
			   
			      nlapiLogExecution('DEBUG','AutoNumbering','nlapiStringToDate(startDate1) =='+ startDate1);
			   filters[3] = new nlobjSearchFilter('custrecord_start_date', null, 'onorafter',startDate1);
			   
			      nlapiLogExecution('DEBUG','AutoNumbering','nlapiStringToDate(endDate1) =='+ endDate1);
			   filters[4] = new nlobjSearchFilter('custrecord_end_date', null, 'onorbefore', endDate1);
				
			    var columns = new Array();
			    columns[0]= new nlobjSearchColumn('id');
				columns[1]= new nlobjSearchColumn('custrecord_tran_type');
				columns[2]= new nlobjSearchColumn('custrecord_transaction_is');
				columns[3]= new nlobjSearchColumn('custrecord_number');
				columns[4]= new nlobjSearchColumn('custrecord_auto_number');
				columns[5]= new nlobjSearchColumn('custrecord_start_date');
				columns[6]= new nlobjSearchColumn('custrecord_end_date');
			
				
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
						
						var autoNumber = searchresults[i].getValue('custrecord_auto_number');
						nlapiLogExecution('DEBUG', 'autoNumber', 'autoNumber***************' +autoNumber);
						
						var tranYear = searchresults[i].getValue('custrecord_autonum_year');
						nlapiLogExecution('DEBUG', 'autoNumber', 'tranYear***************' +tranYear);
						
						var startDate = searchresults[i].getValue('custrecord_start_date');
						nlapiLogExecution('DEBUG', 'autoNumber', 'startDate***************' +startDate);
						
						var endDate = searchresults[i].getValue('custrecord_end_date');
						nlapiLogExecution('DEBUG', 'autoNumber', 'endDate***************' +endDate);
						
					    //var dateRange = startDate+'/'+endDate;
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
				 
				  
				  if(classPrefix !=null && classPrefix != undefined){
					  classPrefix =classPrefix+'/';
				  }
				  else{
					  classPrefix='';
				  } 
				  
				  if(locPrefix !=null && locPrefix != undefined){
					  locPrefix =locPrefix+'/';
				  }
				  else{
					  locPrefix='';
				  }
				  
				  
				  nlapiLogExecution('DEBUG', 'locPrefix', locPrefix);
				  nlapiLogExecution('DEBUG', 'classPrefix', classPrefix);
				  
				  var merge =(tranYear+'/')+(locPrefix)+(classPrefix);
				  nlapiLogExecution('DEBUG', 'merge', merge);
				  
				  if(merge != null && merge != undefined && merge != '')
				  {
					  merge =merge;
				  }
				  else{
					  merge = '';
				  }
				  var value = merge+autoNumber+'/'+abbreviation;
				  nlapiLogExecution('DEBUG', 'value', value);
				  
				  var d = new Date();
				  var n = d.valueOf();
				  if(n)
				  {
					  nlapiSubmitField(recType, recID,'tranid',value);
					  
					  nlapiSetFieldValue('tranid',value);
					  var incrementvalue = (+autoNumber) + 1;
				  }
				  
				  // insert leading zeroes with a negative slice
				  incrementvalue = (digitLength + incrementvalue).slice(minDigit-(minDigit*2));
				 
				  nlapiLogExecution('DEBUG', 'autoNumber', incrementvalue);
				  nlapiSubmitField('customrecord_auto_number_record', internalid,'custrecord_auto_number', incrementvalue)
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
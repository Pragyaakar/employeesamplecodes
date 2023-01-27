				/**
			 * Module Description
			 * 
			 * Version    Date            Author           Remarks
			 * 1.00      9 July 2020     ATPL
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
					if(type == 'create') //|| type == 'edit'
					{
						try
						{
			
							var checkType;
							
							var recType = nlapiGetRecordType();
							var recID = nlapiGetRecordId();
							
							var transObj = nlapiLoadRecord(recType,recID);
							 nlapiLogExecution('DEBUG','AutoNumbering','recType =='+ recType + 'recID =='+ recID);
							 
							if(transObj != null && transObj != undefined && transObj != '')
							{
							  
								var subsi = nlapiGetFieldValue('subsidiary');
								   nlapiLogExecution('DEBUG','AutoNumbering','subsi =='+ subsi);
									
								
								 
							   var tranDate = nlapiGetFieldValue('trandate');
							   nlapiLogExecution('DEBUG','AutoNumbering','tranDate =='+ tranDate);
							
							  
							    if(recType =='vendorbill')
								{
									checkType=1;
								}
								else if(recType =='itemreceipt')
								{
									checkType=2;
								}
								else if(recType =='itemfulfillment')
								{
									checkType=3;
								}
								else if(recType =='vendorpayment')
								{
									checkType=4;
								}
					
								var searchresults;
								
								if((subsi != null && subsi != undefined && subsi !='') )
								{
									searchresults = nlapiSearchRecord("customrecord_auto_number_record",null,
											[
											  /* ["formuladate: {custrecord_start_date}","onorbefore",tranDate], 
											   "AND", 
											   ["formuladate: {custrecord_end_date}","onorafter",tranDate], 
											   "AND", */
											   ["custrecord_rec_subsi","anyof",subsi], 
											   "AND", 
											   ["custrecord_tran_type","anyof",checkType]
											], 
											[
											   new nlobjSearchColumn("id").setSort(false), 
											   new nlobjSearchColumn("custrecord_tran_type"), 
											   new nlobjSearchColumn("custrecord_prefix"), 
											   new nlobjSearchColumn("custrecord_number"), 
											   new nlobjSearchColumn("custrecord_auto_number"), 
											   new nlobjSearchColumn("custrecord_autonum_year"), 
											   /*new nlobjSearchColumn("custrecord_rec_class")
											   new nlobjSearchColumn("custrecord_rec_location"), ,*/ 
											   new nlobjSearchColumn("custrecord_start_date"), 
											   new nlobjSearchColumn("custrecord_end_date"), 
											   new nlobjSearchColumn("custrecord_suffix") 
											   /*new nlobjSearchColumn("custrecord_duplicate_record_check")*/
											]
											);			
									
									
									
									
								}
								nlapiLogExecution('DEBUG','AutoNumbering','searchresults =='+searchresults);	      
						//=======================================================		
								if(searchresults != null)
								{
									nlapiLogExecution('DEBUG','AutoNumbering','searchresults.length =='+searchresults.length);
									for (var i = 0;  i < searchresults.length; i++) 
									{
										var TransType = searchresults[i].getValue('custrecord_tran_type');
										nlapiLogExecution('DEBUG', 'tranprefix', 'TransType***************' +TransType);
									
										var abbreviation = searchresults[i].getValue('custrecord_prefix');
										nlapiLogExecution('DEBUG', 'abbreviation', 'abbreviation***************' +abbreviation);
									
										var prefix = abbreviation;
										
										var Suffix = searchresults[i].getValue('custrecord_suffix');
										nlapiLogExecution('DEBUG', 'abbreviation', 'abbreviation***************' +abbreviation);
									
										
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
										
									    
									}
								}
								
								var digitLength='';
								
							    minDigit = parseInt(minDigit,10)
							    nlapiLogExecution('DEBUG', 'autoNumber', 'minDigit***************' +minDigit);
							   if(minDigit)
							   {
								   for (var index = 0; index < minDigit; index++) 
								   {
									   
									   digitLength = digitLength+'0';
									   
								   }
								   nlapiLogExecution('DEBUG', 'autoNumber', 'digitLength***************' +digitLength);   
							   }
							   nlapiLogExecution('DEBUG', 'autoNumber', 'prefix***************' +prefix);
							   nlapiLogExecution('DEBUG', 'autoNumber', 'autoNumber***************' +autoNumber);
							  if(prefix != null && prefix != undefined && prefix != '')
							  {
								
								  
								  
								  var value = prefix+'-'+autoNumber;//+'/'+Suffix;
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
						catch(e)
						{
							 nlapiLogExecution('DEBUG','AutoNumbering','ERROR =='+ e);
								
						}
						
					   
					}
				}
			
				
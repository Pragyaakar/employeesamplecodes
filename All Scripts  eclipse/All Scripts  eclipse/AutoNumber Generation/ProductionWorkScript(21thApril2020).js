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
			if(type == 'create' )//|| type == 'edit'
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
					  /* var location = nlapiGetFieldText('location');
					   nlapiLogExecution('DEBUG','AutoNumbering','location =='+ location);
						
					
					   var Adjlocation = nlapiGetFieldText('adjlocation');
					   nlapiLogExecution('DEBUG','AutoNumbering','Adjlocation =='+ Adjlocation);
					   
					   if((location == null || location == '' || location == undefined) && (Adjlocation != null && Adjlocation !=undefined))
						{
						   location =Adjlocation;
						}
					   
					   //=========================== Location Find ===================
					   
						if(location.toString().split(':'))
						{
							var substringParent =location.toString().split(':');
							var checkString =substringParent[0];
						}
						else
						{
							var checkString =location.toString();
						}
						
						nlapiLogExecution('DEBUG','Location Validation', "checkString :=   "+checkString);
							
							 var locationSearch = nlapiSearchRecord("location","customsearch_location_search_lookup",
								[
								   ["formulatext: SUBSTR({name}, 0,LENGTH({name}))","contains",checkString],
								   "AND", 
								   ["custrecord_use_location_autonumber","is","T"]
								], 
								[
								   new nlobjSearchColumn("internalid"), 
								   new nlobjSearchColumn("name").setSort(false), 
								   new nlobjSearchColumn("custrecord_use_location_autonumber"), 
								   new nlobjSearchColumn("phone"), 
								   new nlobjSearchColumn("city"), 
								   new nlobjSearchColumn("state"), 
								   new nlobjSearchColumn("country"), 
								   new nlobjSearchColumn("custrecord_loc_abbrevation"), 
								   new nlobjSearchColumn("custrecord1538")
								]
								);
						
						
							
						var counter =0.00;
						if (locationSearch != null)
						{
							nlapiLogExecution('DEBUG','Location Validation', "locationSearch :=   "+locationSearch.length);
							for(var j1=0;j1<locationSearch.length;j1++)
							{
								
								  location = locationSearch[j1].getValue('internalid');
								
	 						}
						}
						else
						{
							location = null;
						}
					   //==============================================
						
						 nlapiLogExecution('DEBUG','AutoNumbering','location=='+ location);
						
					    var Class = nlapiGetFieldText('class');
					   nlapiLogExecution('DEBUG','AutoNumbering','Class =='+ Class);
					   
					 //====================== Class Finding ========================
					   
						if(Class.toString().split(':'))
						{
							var substringParent1 =Class.toString().split(':');
							var checkString1 =substringParent1[0];
						}
						else
						{
							var checkString1 =Class.toString();
						}
						
						nlapiLogExecution('DEBUG','Location Validation', "Class checkString1 :=   "+checkString1);
				
						var classificationSearch = nlapiSearchRecord("classification","customsearch_class_lookup",
									 [
										 ["formulatext: SUBSTR({name}, 0,LENGTH({name}))","contains",checkString1],
										   "AND", 
										   ["custrecord_auto_num_clss","is","T"]
									 ], 
									 [
										new nlobjSearchColumn("internalid"),
									    new nlobjSearchColumn("name").setSort(false), 
									    new nlobjSearchColumn("custrecord_class_abbrevation"), 
									    new nlobjSearchColumn("custrecord_auto_num_clss")
									 ]
									 );
							 
							
						var counter =0.00;
						if (classificationSearch != null)
						{
							nlapiLogExecution('DEBUG','Location Validation', "locationSearch :=   "+locationSearch.length);
							for(var j2=0;j2<classificationSearch.length;j2++)
							{
								
								  Class = classificationSearch[j2].getValue('internalid');
								
	 						}
						}
						else {
							Class = null;
						}*/
					   //==============================================
						
						var location = nlapiGetFieldValue('location');
						   nlapiLogExecution('DEBUG','AutoNumbering','location =='+ location);
							
						
						   var Adjlocation = nlapiGetFieldValue('adjlocation');
						   nlapiLogExecution('DEBUG','AutoNumbering','Adjlocation =='+ Adjlocation);
						   
						   if((location == null || location == '' || location == undefined) && (Adjlocation != null && Adjlocation !=undefined))
							{
							   location =Adjlocation;
							}
						   
						   var Class = nlapiGetFieldValue('class');
						   nlapiLogExecution('DEBUG','AutoNumbering','Class =='+ Class);
						   
					   
					   var tranDate = nlapiGetFieldValue('trandate');
					   nlapiLogExecution('DEBUG','AutoNumbering','tranDate =='+ tranDate);
					
					   var dateCheck =nlapiStringToDate(tranDate);
					  
					   var StringDate= dateCheck.getDate()+'-'+(dateCheck.getMonth()+1)+'-'+dateCheck.getFullYear();
					   
					   nlapiLogExecution('DEBUG','AutoNumbering','StringDate =='+ StringDate.toString());
						
					   var chkDat =""+tranDate+"";
					    
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
						else if(recType =='estimate')
						{
							checkType=9;
						}
						else if(recType =='creditmemo')
						{
							checkType=10;
						}
						else if(recType =='inventorytransfer')
						{
							checkType=11;
						}
                      	else if(recType =='transferorder')
						{
							checkType=12;
						}
						else if(recType =='vendorcredit')
						{
							checkType=13;
						}
						else if(recType =='vendorpayment')
						{
							checkType=14;
						}
						else if(recType =='vendorprepayment')
						{
							checkType=15;
						}
						else if(recType =='check')
						{
							checkType=16;
						}
						else if(recType =='expensereport')
						{
							checkType=17;
						}
					    else if(recType =='deposit')
						{
							checkType=18;
						}
						else if(recType =='customerrefund')
						{
							checkType=19;
						}
                        else if(recType =='customtransaction_atpl_tds_cust_receivab')
						{
							checkType=20;
						}
                      
						else if(recType =='customerpayment') 
						{
							checkType=21;
						}
						else if(recType =='bintransfer')
						{
							checkType=22;
						}
						else if(recType =='vendorreturnauthorization')
						{
							checkType=23;
						}
						else if(recType =='workorder')
						{
							checkType=24;
						}
						else if(recType =='assemblyunbuild')
						{
							checkType=25;
						}
						else if(recType =='assemblybuild')
						{
							checkType=26;
						}
						
						var searchresults;
						
						if((location != null && location != undefined && location !='') && (Class != null && Class != undefined && Class != ''))
						{
							searchresults = nlapiSearchRecord("customrecord_auto_number_record","customsearch_autonumber_searc",
									[
									   ["formuladate: {custrecord_start_date}","onorbefore",tranDate], 
									   "AND", 
									   ["formuladate: {custrecord_end_date}","onorafter",tranDate], 
									   "AND", 
									   ["custrecord_rec_class","anyof",Class], 
									   "AND", 
									   ["custrecord_rec_location","anyof",location], 
									   "AND", 
									   ["custrecord_tran_type","anyof",checkType]
									], 
									[
									   new nlobjSearchColumn("id").setSort(false), 
									   new nlobjSearchColumn("custrecord_tran_type"), 
									   new nlobjSearchColumn("custrecord_transaction_is"), 
									   new nlobjSearchColumn("custrecord_number"), 
									   new nlobjSearchColumn("custrecord_auto_number"), 
									   new nlobjSearchColumn("custrecord_autonum_year"), 
									   new nlobjSearchColumn("custrecord_rec_class"), 
									   new nlobjSearchColumn("custrecord_rec_location"), 
									   new nlobjSearchColumn("custrecord_start_date"), 
									   new nlobjSearchColumn("custrecord_end_date"), 
									   new nlobjSearchColumn("custrecord_suffix"), 
									   new nlobjSearchColumn("custrecord_duplicate_record_check")
									]
									);			
							
							
							
							
						}
					      
				//=======================================================		
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
					
					   if(minDigit)
					   {
						   for (var index = 0; index < minDigit; index++) 
						   {
							   digitLength = digitLength+'0';
						   }
					   }
					 
					  if((prefix != null && prefix != undefined && prefix != '') && (Suffix != null && Suffix != undefined && Suffix != '') )
					  {
						
						  var value = prefix+'/'+autoNumber+'/'+Suffix;
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
					  else 
					  {

						  if((prefix != null && prefix != undefined && prefix != '') && (Suffix == null || Suffix == undefined || Suffix == '') )
						  {
							  var value = prefix+'/'+autoNumber;
							  nlapiLogExecution('DEBUG', 'value', value);
						  }
						  else if((Suffix != null && Suffix != undefined && Suffix != '') && (prefix == null || prefix == undefined || prefix == ''))
						  {
							  var value = autoNumber+'/'+Suffix;
							  nlapiLogExecution('DEBUG', 'value', value);
						  }
						  else 
						  {
							  var value =autoNumber;
						  }
						  
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
	
		function acronym(text) {
			  return text
			    .split(/\s/)
			    .reduce(function(accumulator, word) {
			      return accumulator + word.charAt(0);
			    }, '');
			}
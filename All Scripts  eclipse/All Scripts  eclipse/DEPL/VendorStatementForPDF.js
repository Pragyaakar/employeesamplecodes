// BEGIN SCHEDULED FUNCTION =============================================
function suiteletTestLayout(request, response)
{

 try{
	
	var strName ="";
	
	venstatid =request.getParameter('venstatsubmitid'); 
	
	nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'Searching Vendor Transactions');
	
	var venstatobj = nlapiLoadRecord('customrecord_vendor_statement_detail_rec', venstatid)
	
	var vendor_a = venstatobj.getFieldValues('custrecord_venstat_vendor')
	
	var venText = venstatobj.getFieldText('custrecord_venstat_vendor')
	
	var locationname = venstatobj.getFieldValue('custrecord_venstat_loc')
	
	var start = venstatobj.getFieldValue('custrecord_venstat_startdate')
	
	var end = venstatobj.getFieldValue('custrecord_vendstat_enddate')
	
	var recepient = venstatobj.getFieldValue('custrecord_venstat_email')
	nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'end date = ' + end);
	

	
	

	var startdate = nlapiStringToDate(start);
	var enddate = nlapiStringToDate(end);
	
	nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'Vendor Name = ' + vendor_a);
	nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'Location Name = ' + locationname);
	nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'Start date = ' + startdate);
	nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'End date = ' + enddate);
	
	
	
	
	
	var companyinfo = nlapiLoadConfiguration('companyinformation');
					nlapiLogExecution('DEBUG','before submit','companyinfo =='+companyinfo);
					
					var companyName = companyinfo.getFieldValue('companyname');
					nlapiLogExecution('DEBUG','before submit','companyName =='+companyName);
					if(companyName == null || companyName == undefined)
					{
						companyName = "";
					}
					
					var companyAdd = companyinfo.getFieldValue('mainaddress_text');
					nlapiLogExecution('DEBUG','before submit','companyAdd =='+companyAdd);
					if(companyAdd == null || companyAdd == undefined)
					{
						companyAdd = "";
					}
	
	
	
	        var url = 'https://system.netsuite.com/core/media/media.nl?id=11&c=5288045_SB1&h=aa54a558ce48064a6509'; 
				    
				    strName += "<table  width=\"100\%\">";
					strName += "<tr>";
					strName += "<td>";
					strName +="<img height='50' width='50'  src=\""+nlapiEscapeXML(url)+"\"></img>";
					strName += "</td>";
					strName += "<td colspan =\"6\" width = \"100\%\"   align=\"right\"><br/><b>"+companyName+"</b><br/>"+companyAdd+"<br/>GST No-27AACCD3117C1Z9</td>";	
					strName += "</tr>";
					strName += "</table>";

	
	/*
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td  width = \"100\%\"  align=\"center\"><b>CAPITAL CARS PVT LTD (G2015-16) (Audited)</b></td>";	
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td  width = \"100\%\"  align=\"center\">Head Office Ansal Plaza, Main Link Road,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vaishali,Opp. Dabur Factory,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Distt, Ghaziabad, UP-201010</td>";	
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td  width = \"100\%\"  align=\"center\">&nbsp;&nbsp;Regd Office: Plot No.1, Patparganj Industrial Complex<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Near Mother Dairy,Delhi-92</td>";	
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td  width = \"100\%\"  align=\"center\">Www.Primehonda.com, Mail@primhonda.com<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;011-40888888, 01142141515<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CIN-U74899DL1996PTCO83825<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;011-40888888, 01142141515<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>UP TIN No:09990700953</u></td>";	
	strName += "</tr>";
	strName += "</table>";
	*/
	
	for (var z = 0; z < vendor_a.length; z++) 
	{
		var vendor = vendor_a[z];
		if (vendor != null && vendor != '' && vendor != undefined) 
		{
			if (z != 0) 
			{
				strName += "<pbr/>";
			}
			
			var custFilters = new Array();
			var custColumns = new Array();
			
			custFilters.push(new nlobjSearchFilter('internalid', null, 'is', vendor));
			custColumns.push(new nlobjSearchColumn('datecreated'));
			custColumns.push(new nlobjSearchColumn('entityid'));
			custColumns.push(new nlobjSearchColumn('address'));

			var custSearchResults = nlapiSearchRecord('vendor', null, custFilters, custColumns);
			
			if (custSearchResults != null) 
			{
				var custCreatedDate = custSearchResults[0].getValue('datecreated');
				custCreatedDate = nlapiStringToDate(custCreatedDate);
				var custNameID = custSearchResults[0].getValue('entityid');
				var custAddr = custSearchResults[0].getValue('address');
			
				//==============================function to get the first transaction date===================//
				var firstTranDate = getFirstTransactionDate(vendor);
				
				if (firstTranDate != null && firstTranDate != '' && firstTranDate != undefined) 
				{
					custCreatedDate = nlapiStringToDate(firstTranDate);
				}
				
				var custCurrency ='INR';
				
				nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'custCreatedDate = ' + custCreatedDate);
				nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'custName = ' + custNameID);
				nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'custAddr = ' + custAddr);
			//	nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'custCurrency = ' + custCurrency);
				
				if (custNameID != null && custNameID != '' && custNameID != undefined) 
				{
				
				}
				else 
				{
				 var custName = custNameID;
				}
				
				custAddr = nlapiEscapeXML(custAddr);
				custAddr = afterReplaceCR(custAddr);
 
				
				var opBalanceEndDatems = new Date(startdate.getTime());
				nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'opBalanceEndDatems = ' + opBalanceEndDatems);
				
				opBalanceEndDatems = opBalanceEndDatems - 86400000;
				nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'opBalanceEndDatems = ' + opBalanceEndDatems);
				
				var opBalanceEndDate = new Date(opBalanceEndDatems);
				nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'opBalanceEndDate = ' + opBalanceEndDate);
				
				var openingBalanceDate = start;
				nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'openingBalanceDate = ' + openingBalanceDate);
				
				
				var openingBalance = getOpeningBalance(vendor, locationname, custCreatedDate, opBalanceEndDate);
	
	
	//strName += "</br>";
	
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td  width = \"100\%\"  align=\"center\"><b>"+venText+"</b></td>";	
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td  width = \"100\%\" colspan=\"15\"  align=\"center\">&nbsp;&nbsp;"+custAddr+"</td>";	
	strName += "</tr>";
    strName += "<tr>";
	strName += "<td  width = \"100\%\" colspan=\"6\" align=\"left\"><b>Start Date : </b>&nbsp;"+start+"</td><td  width = \"100\%\"  colspan=\"6\" align=\"center\"><b>End Date:</b>&nbsp;"+end+"</td>";
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td  width = \"100\%\"  align=\"center\"><b>Vendor Statement</b></td>";	
	strName += "</tr>";
	strName += "</table>";
	
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"center\"><b>Date</b></td>";	
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"center\"><b>Particulars</b></td>";	
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"center\"><b>Trans Type</b></td>";	
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"center\"><b>Trans No</b></td>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"center\"><b>Debit</b></td>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"center\"><b>Credit</b></td>";	
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"center\"><b>Balance</b></td>";
	strName += "</tr>";
	
	
	strName += "<tr>";
	strName += "<td  width = \"100\%\"  align=\"center\"><b>On:"+start+"</b></td>";	
	strName += "<td  width = \"100\%\"  align=\"right\"><b></b></td>";
	strName += "<td  width = \"100\%\"  align=\"center\"><b>Start Balance:</b></td>";	
	strName += "<td  width = \"100\%\"  align=\"right\"><b></b></td>";
	strName += "<td  width = \"100\%\"  align=\"center\"><b></b></td>";	
	strName += "<td  width = \"100\%\"  align=\"center\"><b></b></td>";	
	strName += "<td  width = \"100\%\"  align=\"center\"><b>"+openingBalance+"</b></td>";
	strName += "</tr>";
	
	 var columns = new Array();
	 columns[0] = new nlobjSearchColumn('internalid');
	 columns[1] = new nlobjSearchColumn('total');
	 columns[1] = new nlobjSearchColumn('account').setSort(false);
	 
	var filters = new Array();
	//filters.push(new nlobjSearchFilter('internalidnumber', null, 'greaterthan', lastInternalID));
	filters.push(new nlobjSearchFilter('entity', null, 'is', vendor));
	filters.push(new nlobjSearchFilter ('trandate', null, 'onorafter',startdate));
	filters.push(new nlobjSearchFilter ('trandate', null, 'onorbefore', enddate));
	

	var searchResults = nlapiSearchRecord('transaction', 'customsearch_depl_vendorstatement', filters, columns);
	
	nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'openingBalance = end ');
	
	var breakFlag = 0;
	if (searchResults != null && searchResults != '')
	{
		var length = searchResults.length;
		nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result length = ' + length);
		
              
			
			
			var internalID = '';
			var amount = '';
			var type = '';
			var date = '';
			var number = '';
			var typenumber = '';
			var memo = '';
			var previousInternalID = '';
			var exchangerate = '';
			var currency = '';
			var location = '';
			var account = '';
			var createddate = '';
			var total_creditamount = 0;
			var total_debitamount=0;
			var particulars;
		    var col_Bal = 0;
			var EndColBal=0;
			var recordCount=0;
			
			for (var i = 0;  i < searchResults.length; i++) 
			{
				 recordCount = recordCount + 1;
			
				var value8 = searchResults[i].getText('account');
				particulars = value8;
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'custbody_cust_particulars = ' + particulars);
				
				
			
				var value = searchResults[i].getValue('internalid');
				internalID = value;
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'internalID = ' + internalID);
				previousInternalID = internalID;
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'previousInternalID = ' + previousInternalID);
			
		
				
				var value1 = searchResults[i].getValue('total');
				amount = parseFloat(value1);
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'Amount = ' + amount);
				amount = parseFloat(amount);
				
				var value2 = searchResults[i].getValue('transactionnumber');
				transactionnumber =  value2;
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'transactionnumber = ' + transactionnumber);
				
				
				var value3 = searchResults[i].getValue('trandate');
				date = value3;
				nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'date = ' + date);
				
				var value4 = searchResults[i].getValue('memo');
				memo = value4;
				nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'memo = ' + memo);
				
				var value5 = searchResults[i].getValue('debitamount');
				if( value5 == '')
				{
					value5 =0;
				
				}
				
				
				
				
				debitamount = value5;
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'debitamount = ' + debitamount);
			
				
				
				var value6 = searchResults[i].getValue('creditamount');
				if(value6 == '')
				{
					value6 =0;
				}
				
				if(particulars !='TDS on Purchase')
				{
					var newParti =searchResults[recordCount].getText('account');
					if(newParti == 'TDS on Purchase')
					{
						var prk = searchResults[recordCount].getValue('creditamount');
						creditamount = parseFloat(value6)+parseFloat(prk);
					}
					else
					{
						creditamount = parseFloat(value6);
						nlapiLogExecution('DEBUG', 'ScheduleTest', 'creditamount = ' + creditamount);
						
					}
				}
				
				
				
				if(particulars == 'TDS on Purchase')
				{
					debitamount = value6;
					creditamount = parseFloat(value5);
				}
				
				total_debitamount += parseFloat(debitamount);
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_debitamount = ' + total_debitamount);
				
				total_creditamount +=parseFloat(creditamount)
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_creditamount = ' + total_creditamount);
				
				var value7 = searchResults[i].getValue('type');
				type = value7;
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'type = ' + type);
				
			
				col_Bal =parseFloat(debitamount)+parseFloat(-creditamount);
				
				if ( i >= 900) {
					if (previousInternalID != internalID)
					{
						breakFlag = 1;
					} // END if(previousInternalID != internalID)
				}
				
			
					
				 strName += "<tr>";
					
					if (date != null && date != '' && date != undefined) 
					{
						strName += "<td  width = \"100\%\"  align=\"center\">"+date+"</td>";
					}
					else 
					{
						date =' ';
						strName += "<td  width = \"100\%\"  align=\"center\">"+date+"</td>";
					}
					
					if (particulars != null && particulars != '' && particulars != undefined ) 
					{
						strName += "<td  width = \"100\%\"  align=\"center\">"+particulars+"</td>";
					}
					else 
					{
						particulars =' ';
						strName += "<td  width = \"100\%\"  align=\"center\">"+particulars+"</td>";
					}
					
					if (type != null && type != '' && type != undefined) 
					{
						strName += "<td  width = \"100\%\"  align=\"center\">"+type+"</td>";
					}
					else 
					{
						type =' ';
						strName += "<td  width = \"100\%\"  align=\"center\">"+type+"</td>";
					}
						

					if (transactionnumber != null && transactionnumber != '' && transactionnumber != undefined) 
					{
						strName += "<td  width = \"100\%\"  align=\"center\">"+transactionnumber+"</td>";
					}
					else 
					{
						transactionnumber =' ';
						strName += "<td  width = \"100\%\"  align=\"center\">"+transactionnumber+"</td>";
					}
					

					if (debitamount == null && debitamount == '' && debitamount == undefined && debitamount == 'NaN' ) 
					{
						
							debitamount ='0';
							strName += "<td  width = \"100\%\"  align=\"center\">"+debitamount+"</td>";
				
					}
					else 
					{
						
						strName += "<td  width = \"100\%\"  align=\"center\">"+debitamount+"</td>";
					}
					
					if (creditamount == null && creditamount == '' && creditamount == undefined && creditamount == 'NaN') 
					{
				
							creditamount =' ';
							strName += "<td  width = \"100\%\"  align=\"center\">"+creditamount+"</td>";
			
					}
					else 
					{
						strName += "<td  width = \"100\%\"  align=\"center\">"+creditamount+"</td>";
					}
					
					if (col_Bal == null && col_Bal == '' && col_Bal == undefined && col_Bal == 'NaN') 
					{
				
							col_Bal =' ';
							strName += "<td  width = \"100\%\"  align=\"center\">"+col_Bal+"</td>";
			
					}
					else 
					{
						strName += "<td  width = \"100\%\"  align=\"center\">"+col_Bal+"</td>";
					}
					var EndColBal = parseFloat(EndColBal) +parseFloat(col_Bal);
					 strName += "</tr>";
						
				
					 
				}  //END FOR(var i = 0;  i < searchResults.length; i++) 
	            
			var fin_debit=parseFloat(total_debitamount)+parseFloat(openingBalance);
			var fin_credit=parseFloat(total_creditamount)+parseFloat(openingBalance);
			
		var s = parseFloat(openingBalance)+parseFloat(total_debitamount)-parseFloat(total_creditamount);
			
     var last_bal= Math.round(s * 100) / 100;
	 var last_debit=Math.round(fin_debit * 100) / 100;
	  var last_credit=Math.round(fin_credit * 100) / 100;
	  var bal = Math.round(EndColBal * 100) / 100;
	  
	 	var DebitAmount= formatNumber(last_debit);
			var CreditAmount= formatNumber(last_credit);
             
      var closing_bal=formatNumber(last_bal);
	  var EndBal = formatNumber(bal);
	   
      /*
		    strName += "<tr>";
			strName += "<td  width = \"100\%\"  align=\"center\"><b>On:"+end+"</b></td>";	
			strName += "<td  width = \"100\%\"  align=\"right\"><b></b></td>";
			strName += "<td  width = \"100\%\"  align=\"center\"><b>End Balance:</b></td>";	
			strName += "<td  width = \"100\%\"  align=\"right\"><b></b></td>";
			strName += "<td  width = \"100\%\"  align=\"center\"><b></b></td>";	
			strName += "<td  width = \"100\%\"  align=\"center\"><b></b></td>";	
			strName += "<td  width = \"100\%\"  align=\"center\"><b>"+closing_bal+"</b></td>";
			strName += "</tr>";
			*/
			strName += "<tr>";
			strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\"  width = \"100\%\"  align=\"center\"><b>On :"+end+"</b></td>";	
			strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\"  width = \"100\%\"  align=\"right\"><b></b></td>";
			strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\"  width = \"100\%\"  align=\"center\"><b>Total:</b></td>";	
			strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"right\"><b></b></td>";
			if (DebitAmount == null && DebitAmount == '' && DebitAmount == undefined && DebitAmount == 'NaN' ) 
			{
				
				DebitAmount ='0';
					strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"center\"><b>"+DebitAmount+"</b></td>";
		
			}
			else 
			{
				
				strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"100\%\"  align=\"center\"><b>"+DebitAmount+"</b></td>";
			}
			
			if (CreditAmount == null && CreditAmount == '' && CreditAmount == undefined && CreditAmount == 'NaN') 
			{
		
				CreditAmount ='0';
					strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\"  width = \"100\%\"  align=\"center\"><b>"+CreditAmount+"</b></td>";
	
			}
			else 
			{
				strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\"  width = \"100\%\"  align=\"center\"><b>"+CreditAmount+"</b></td>";
			}
		    
			if (EndBal == null && EndBal == '' && EndBal == undefined && EndBal == 'NaN') 
			{
		
				EndBal ='0';
					strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\"  width = \"100\%\"  align=\"center\"><b>"+EndBal+"</b></td>";
	
			}
			else 
			{
				strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\"  width = \"100\%\"  align=\"center\"><b>"+EndBal+"</b></td>";
			}
		
			strName += "</tr>";
			
			
			
	
				strName += "</table>";
				
				}

	  
			}  // END if (custSearchResults != null) 
		}// END if (vendor != null && vendor != '' && vendor != undefined) 
	}//END for (var z = 0; z < vendor_a.length; z++) 
	
	var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
	xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n";
	//xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n<h3>Packing Print</h3>\n";
	//xml += "<p></p>";
	xml += strName;
	xml += "</body>\n</pdf>";

	// run the BFO library to convert the xml document to a PDF 
	var file = nlapiXMLToPDF( xml );

	// set content type, file name, and content-disposition (inline means display in browser)
	response.setContentType('PDF','vendor_statement.pdf', 'inline');

	// write response to the client
	response.write( file.getValue() ); 
	}
   
   catch(e){throw nlapiCreateError('SUITELET_ERROR',"There is No data Available for this Transaction..."+e, false);  }

	
	
}

function formatNumber (num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	}
			
function getOpeningBalance(vendor, locationname, openingBalanceDate, opBalanceEndDate)
{
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'vendor = ' + vendor);
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'locationname = ' + locationname);
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'openingBalanceDate = ' + openingBalanceDate);
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'opBalanceEndDate = ' + opBalanceEndDate);
				
				
				var lastInternalID = 0;
				var totalAmount = 0;
				//var totalfxamount = 0;
				totalAmount = parseFloat(totalAmount);
				
				 var columns = new Array();
				 columns[0] = new nlobjSearchColumn('internalid');
				 columns[1] = new nlobjSearchColumn('amount');
				
				 var filters = new Array();
				 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',vendor);
				 filters[1] = new nlobjSearchFilter ('trandate', null, 'onorbefore', opBalanceEndDate);
				// filters[2] = new nlobjSearchFilter ('trandate', null, 'onorafter',openingBalanceDate);
					 var searchresults = nlapiSearchRecord('transaction','customsearch_depl_vendorstatement',filters,columns)
				
					 if(searchresults != null)
			    		{
						   var amount = '';
						   var internalID = '';
							
							//var fxamount = '';
							var type = '';
							var previousInternalID = '';
							
			    			for (var i = 0;  i < searchresults.length; i++) 
			    			{
			    				
		                		var value = searchresults[i].getValue('internalid');
			    				previousInternalID = lastInternalID;
			    				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'previousInternalID = ' + previousInternalID);
			    				internalID = value;
								nlapiLogExecution('DEBUG', 'getOpeningBalance', 'internalID = ' + internalID);
			    				
			    				var value1 = searchresults[i].getValue('amount');
			    				amount += parseFloat(value1);
								nlapiLogExecution('DEBUG', 'getOpeningBalance', 'Amount = ' + amount);
								amount = parseFloat(amount);				
			    				}
			    			lastInternalID = internalID;
			    			
			    			totalAmount =  parseFloat(amount);
			    		}	
					 

				totalAmount = parseFloat(totalAmount);
				//totalAmount = Math.round(totalAmount * 100) / 100;
				
				var getOpeningBalancefunction = parseFloat(totalAmount);
				
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction = ' + getOpeningBalancefunction);
				
				//totalfxamount = parseFloat(totalfxamount);
				//totalfxamount = Math.round(totalfxamount*100)/100;
				
				//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction fx amount = ' +totalfxamount);
				
				//return_amount = totalAmount+'#'+totalfxamount
				
				return getOpeningBalancefunction;
}
	
function afterReplaceCR(custAddr)
{
    //======= CODE TO REPLACE SPECIAL SYMBOL ===
	var custAddrString = custAddr.toString();

    custAddrString = custAddrString.replace(/\r/g, '<BR/>');/// /g

    return custAddrString;

} // END afterReplaceCR(custAddr)

function afterReplaceCRaddcomma(custAddr)
{
    //======= CODE TO REPLACE SPECIAL SYMBOL ===
	var custAddrString = custAddr.toString();

    custAddrString = custAddrString.replace(/\r/g, ',');/// /g

    return custAddrString;

} // END afterReplaceCR(custAddr)

function XMLConversion(strName,recepient,display_date)
{
    //var set_date = new Date();
	//var offset =  (3600000*(+5.50+7));
	//var current_date_time =  new Date(set_date.getTime() + offset)
	//var o_current_date_time_obj = current_date_time.toString();
	//var display_date = o_current_date_time_obj.substring(0, 25)
	//nlapiLogExecution('DEBUG', 'Script Scheduled ', ' Script Status 2-->' + new Date(set_date.getTime() + offset));
	
	//==== CODE FOR HTML TO XML CONVERSION =====
	
    var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
    xml += "<pdf lang=\"ru-RU\" xml:lang=\"ru-RU\">\n";
	xml += "<head>";
    xml += "  <style>";
	xml +=".textLargeBold { font-family:Arial, Helvetica; font-size: 10.5pt; font-weight: bold; text-align:center;}" +
    ".textGoodBold { font-family:Arial, Helvetica; font-size: 9.5pt; font-weight: bold;}" +
    ".textGoodThin { font-family:Arial, Helvetica; font-size: 9pt;}" +
    ".textVeryLargeBold { font-family:Arial, Helvetica; font-size: 18pt; font-weight: bold;}" 
   
    xml += "  <\/style>";
    xml += "  <macrolist>";  
    xml += " <macro id=\"myfooter\">";
    xml += "      <p align=\"right\" font-size=\"12\">";
	xml += display_date;
    xml += "<br/><pagenumber\/> of <totalpages\/>"
    xml += "      <\/p>";
    xml += "    <\/macro>"; 
    xml += "  <\/macrolist>";
    xml += "<\/head>";
	xml += "<body margin-top=\"0pt\" footer=\"myfooter\" footer-height=\"2em\" size=\"A4-landscape\">";
   	xml += strName;
	xml += "</body>\n</pdf>";
	var file = nlapiXMLToPDF(xml);

	nlapiEscapeXML(file);
	file.setName('Vendor Statement'+display_date+'.pdf')
	var folder_id = get_folderID();
	file.setFolder(folder_id);
	file.setIsOnline(true);
	var file_id = nlapiSubmitFile(file);

	var user = nlapiGetUser();
	//var mail = nlapiSendEmail(user,recepient, 'Vendor Statement', 'Vendor statement', null, null, null, file, null, null)
	//nlapiLogExecution('DEBUG', 'Script Scheduled ', ' mail Status -->' + mail);
	//response.write( file.getValue());
	return file_id;
} // END XMLConversion(html)

function get_folderID()
{
			var folder_filters = new Array();
			folder_filters.push(new nlobjSearchFilter('name', null, 'is', 'Vendor Statment'));
	
			var folder_column = new Array();
			folder_column.push( new nlobjSearchColumn('internalid'));    
	
			var folder_results = nlapiSearchRecord('folder', null, folder_filters, folder_column);
			if (folder_results != null && folder_results != '' && folder_results != undefined) 
			{
				var folderId = folder_results[0].getId();
				
			}
			else
			{
				var o_folder_obj = nlapiCreateRecord('folder')
				o_folder_obj.setFieldValue('name','Vendor Statment')
				var folderId = nlapiSubmitRecord(o_folder_obj)
				
			}
			return folderId;
		
	
}

function getFirstTransactionDate(vendor)
{
	var first_trandate = '';
	var date_filters = new Array();
	date_filters.push(new nlobjSearchFilter('internalid', null, 'is', vendor));
	
	var date_column = new Array();
	date_column[0] = new nlobjSearchColumn('trandate','transaction');
	date_column[0].setSort(false);
	var date_results = nlapiSearchRecord('vendor', null, date_filters, date_column);
	if (date_results != null && date_results != '' && date_results != undefined) 
	{
		first_trandate = date_results[0].getValue(date_column[0]);
		
	}
	return first_trandate;
}

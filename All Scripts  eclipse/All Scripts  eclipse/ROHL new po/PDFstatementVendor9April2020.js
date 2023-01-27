	function suiteletPdfVendorStatement(request,response)
	{
	  	try
	  	{
		var recId = request.getParameter('venstatsubmitid');
		var billAddress;
		var subsidiaryAddress;
		var currency;
		var amountDue;
		var startdate;
		var enddate;
		var subsidiary;
		
		if(recId)
		{
			var recObj = nlapiLoadRecord('customrecord_vendor_statement_detail_rec',recId);
		  
			var vendor= recObj.getFieldValue('custrecord_venstat_vendor'); 
			var vendorName= recObj.getFieldText('custrecord_venstat_vendor');
			nlapiLogExecution('DEBUG', 'aftr submit', "  vendor==" + vendorName);

			startdate= recObj.getFieldValue('custrecord_venstat_startdate');
			nlapiLogExecution('DEBUG', 'aftr submit', "  startdate  ==" + startdate);

			enddate= recObj.getFieldValue('custrecord_venstat_enddate');
			//enddate= new Date();
			nlapiLogExecution('DEBUG', 'aftr submit', "  enddate  ==" + enddate);
			
			var locationname = recObj.getFieldValue('custrecord_venstat_loc')

		}
		
		var venRecord = nlapiLoadRecord('vendor', vendor);
		var currency = venRecord.getFieldText('currency');
		// alert('currency is'+currency);
		var amtDue = venRecord.getFieldValue('balance');
		
		 var numberOfAddress = venRecord.getLineItemCount('addressbook');
		   var addressID;
	
		   for (var x = 1; x <= numberOfAddress; x++)
		   {
		          var defaultaddress = venRecord.getLineItemValue('addressbook', 'defaultbilling', x);
		               if (defaultaddress == 'T')
		               {
		                      addressID = venRecord.getLineItemValue('addressbook', 'internalid', x);
		                      addressText = venRecord.getLineItemValue('addressbook', 'addrtext', x);
			      break;
		               }
		   }
		
		
		
		
		
		

		   var firstTranDate = getFirstTransactionDate(vendor);
		   if (firstTranDate != null && firstTranDate != '' && firstTranDate != undefined) 
			{
				custCreatedDate = nlapiStringToDate(firstTranDate);
			}
		   
		   var openingBalance = getOpeningBalance(vendor, locationname, startdate);
		   
			
		   
		   
		   
		   
		   
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
		   
		   
		   
		   
		   
		   
		   
		   
			var strName = " "; 
		   
		   
			var url = 'https://system.na2.netsuite.com/core/media/media.nl?id=4678&c=5250730&h=46c40034857ab3c025fa&whence='; 
		strName += "<table width=\"100\%\">";
		strName += "<tr>";
		strName += "<td>";
		strName +="<img height='50' width='100' src=\""+nlapiEscapeXML(url)+"\"></img>";
		strName += "</td>";
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"20\"><b>Vendor Statement</b></td>";
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td>";
		//strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
		strName += "</td>";
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
	  strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"13\"><b>"+nlapiEscapeXML(vendorName)+"</b></td>";
		strName += "</tr>";
		strName += "</table>";
		
		strName += "<table width=\"100\%\">";
		strName += "<tr>";
		strName += "<td></td>";
		strName += "</tr>";
		strName += "</table>";
		
		strName += "<table width=\"100\%\">";
		strName += "<tr>";
		
		strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"><b>Address</b><br/>"+companyAdd+"</td>";
		strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"></td>";
		strName += "<td width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		//strName += "<td width =\"50\%\"><table width=\"100\%\"><tr><td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Date</b>&nbsp;"+enddate+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Amount Due</b>&nbsp;"+amountDue+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Currency</b>&nbsp;"+currency+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary</b>&nbsp;"+subsidiaryTx+"</td></tr></table></td>";
		strName += "<td width =\"25\%\"><table width=\"100\%\"><tr><td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Date</b></td><td colspan =\"5\" width = \"20\%\"  align=\"left\" font-size=\"10\">"+enddate+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Amount Due</b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;"+amtDue+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Currency</b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;"+currency+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b></b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;</td></tr></table></td>";
		//strName += "<td width = \"20\%\"  align=\"left\"></td>";
		strName += "</tr>";	
		
		/*strName += "<tr>";
		strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";	
		strName += "<td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Date</b>&nbsp;"+enddate+"</td>";
		strName += "<td colspan =\"9\" width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";	
		strName += "</tr>";
		
		strName += "<tr>";
		strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";7
		strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Amount Due</b>&nbsp;"+amountDue+"</td>";
		strName += "<td colspan =\"9\" width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";
		
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td colspan =\"9\" width = \"30\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td colspan =\"9\" width = \"30\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td colspan =\"9\" width = \"30\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td colspan =\"9\" width = \"30\%\"  align=\"left\"><b>Amount Encl.</b></td>";
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Currency</b>&nbsp;"+currency+"</td>";
		strName += "<td colspan =\"9\" width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";
		
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary</b>&nbsp;"+subsidiaryTx+"</td>";
		strName += "<td colspan =\"9\" width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";	
		//strName += "<td colspan =\"9\" width = \"20\%\"  align=\"left\" font-size=\"12\"></td>";
		
		strName += "</tr>";*/
		
		strName += "<tr>";
		if(addressText != null && addressText != '')
		{
		nlapiLogExecution('DEBUG', 'aftr submit', "  addressText "+addressText);
		strName += "<td width = \"30\%\"  align=\"left\" font-size=\"10\"><b>Bill To</b><br/>"+addressText+",</td>";
		}
		strName += "</tr>";
		strName += "<tr>";
		
		strName += "<td  width = \"30\%\"  align=\"left\" font-size=\"10\"><b></b></td>";
		
		strName += "</tr>";
		strName += "<tr>";
		
		strName += "<td  width = \"30\%\"  align=\"left\" font-size=\"10\"><b></b></td>";
		
		strName += "</tr>";
		strName += "<tr>";
		
		strName += "<td  width = \"30\%\"  align=\"left\" font-size=\"10\"><b></b></td>";
		
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td  width = \"30\%\"  align=\"left\" font-size=\"10\"><b></b></td>";
		strName += "</tr>";

		strName += "</table>";
		/*strName += "<table width=\"100\%\">";
		strName += "<tr>";
		strName += "<td colspan =\"6\" width = \"100\%\"  align=\"center\"><b>Date</b></td>";	
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td colspan =\"6\" width = \"100\%\"  align=\"center\"><b>Amount Due</b></td>";	
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td colspan =\"6\" width = \"100\%\"  align=\"center\"><b>Amount Encl.</b></td>";	
		strName += "</tr>";
		strName += "<tr>";	
		strName += "<td colspan =\"6\" width = \"100\%\"  align=\"center\"><b>Currency</b></td>";	
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td colspan =\"6\" width = \"100\%\"  align=\"center\"><b>Subsidiary</b></td>";	
		strName += "</tr>";
		strName += "</table>";
		strName += "</td>";
		strName += "</tr>";
		
		strName += "<tr>";
		strName += "<td colspan =\"6\" width = \"100\%\"  align=\"left\">ASTL LLC<br/>1755 Park Street, Suite 100,<br/>Naperville IL 60563<br/>United State</td>";	
		strName += "</tr>";
		
		strName += "<tr>";
		strName += "<td colspan =\"6\" width = \"100\%\"  align=\"left\"><b>Bill To</b><br/>Rocco Passareette<br/>Altice USA<br/>1111 Stewart Avenue<br/>Bethpage NY 11741<br/> United State</td>";	
		strName += "</tr>";
		strName += "</table>";*/
						
		
		//------------------------------------------Line Level Values------------------------------------------------
		
		//var lineCount = ffReqObj.getLineItemCount('item');
		strName += "<br/>";
		strName += "<table width=\"100\%\" >";
		strName += "<tr>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>Date</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\"><b>Particulars</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>Trans type</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\"><b>Trans No.</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>Debit</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>Credit</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>Balance</b></td>";
		strName += "</tr>";
		
		
		strName += "<tr>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"27\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
		strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"40\%\"><b>Opening Balance</b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(openingBalance)+"</b></td>";
		strName += "</tr>";
		
		
		
		 var columns = new Array();
		 columns[0] = new nlobjSearchColumn('internalid');
		 columns[1] = new nlobjSearchColumn('total');
		 
		var filters = new Array();
		//filters.push(new nlobjSearchFilter('internalidnumber', null, 'greaterthan', lastInternalID));
		filters.push(new nlobjSearchFilter('entity', null, 'is', vendor));
		filters.push(new nlobjSearchFilter ('trandate', null, 'onorafter',startdate));
		filters.push(new nlobjSearchFilter ('trandate', null, 'onorbefore', enddate));
		

		var searchResults = nlapiSearchRecord('transaction', 'customsearch_rohl_vendorstatement', filters, columns);
		
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
				
				for (var i = 0;  i < searchResults.length; i++) 
				{
					var recordCount = recordCount + 1;
				
				
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
				
					total_debitamount += parseFloat(debitamount);
					nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_debitamount = ' + total_debitamount);
					
					var value6 = searchResults[i].getValue('creditamount');
					if(value6 == '')
					{
						value6 =0;
					}
					creditamount = parseFloat(value6);
					nlapiLogExecution('DEBUG', 'ScheduleTest', 'creditamount = ' + creditamount);
					
					
					
					total_creditamount +=parseFloat(creditamount)
					nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_creditamount = ' + total_creditamount);
					
					var value7 = searchResults[i].getValue('type');
					type = value7;
					nlapiLogExecution('DEBUG', 'ScheduleTest', 'type = ' + type);
					
					var value8 = searchResults[i].getText('account');
					particulars = value8;
					nlapiLogExecution('DEBUG', 'ScheduleTest', 'custbody_cust_particulars = ' + particulars);
					
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
							strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+date+"</td>";
						}
						else 
						{
							date =' ';
							strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+date+"</td>";
						}
						
						if (particulars != null && particulars != '' && particulars != undefined ) 
						{
							strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+particulars+"</td>";
						}
						else 
						{
							particulars =' ';
							strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+particulars+"</td>";
						}
						
						if (type != null && type != '' && type != undefined) 
						{
							strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+type+"</td>";
						}
						else 
						{
							type =' ';
							strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+type+"</td>";
						}
							

						if (transactionnumber != null && transactionnumber != '' && transactionnumber != undefined) 
						{
							strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\">"+transactionnumber+"</td>";
						}
						else 
						{
							transactionnumber =' ';
							strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\">"+transactionnumber+"</td>";
						}
						

						if (debitamount == null && debitamount == '' && debitamount == undefined && debitamount == 'NaN' ) 
						{
							
								debitamount ='0';
								strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(debitamount)+"</td>";
					
						}
						else 
						{
							
							strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(debitamount)+"</td>";
						}
						
						if (creditamount == null && creditamount == '' && creditamount == undefined && creditamount == 'NaN') 
						{
					
								creditamount =' ';
								strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(creditamount)+"</td>";
				
						}
						else 
						{
							strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(creditamount)+"</td>";
						}
						
						if (col_Bal == null && col_Bal == '' && col_Bal == undefined && col_Bal == 'NaN') 
						{
					
								col_Bal =' ';
								strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(col_Bal)+"</td>";
				
						}
						else 
						{
							strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(col_Bal)+"</td>";
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
		

		//-----------------------------Fetch Values-------------------------------------------
		
			
			strName += "<tr>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\"><b>Total</b></td>";
	     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>"+DebitAmount+"</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>"+CreditAmount+"</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+EndBal+"</b></td>";
			strName += "</tr>";
		
		
			
		strName += "</table>";
		}
		else
		{
			strName += "<tr>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\"><b>Total</b></td>";
	     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>0.00</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>0.00</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>0.00</b></td>";
			strName += "</tr>";
		
		
			
		  strName += "</table>";
		}
		 /*	
		strName += "<table width=\"100\%\" >";
		strName += "<tr>";
		strName += "<td background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>Current</b></td>";
		strName += "<td background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>1-30 Days</b></td>";
		strName += "<td background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>31-60 Days</b></td>";
		strName += "<td background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>61-90 Days</b></td>";
		strName += "<td background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>Over 90 Days</b></td>";
		strName += "<td background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>Amount Due</b></td>";
		strName += "</tr>";
		
		//------------------------------------------------Fetch Values----------------------------------------------------
		
		strName += "<tr>";
		strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
		strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
		strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
		strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
		strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
		strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"></td>";
		strName += "</tr>";
		strName += "</table>";
		*/
		// build up BFO-compliant XML using well-formed HTML
		var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
		xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n";
		//xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><b>Country of Orgin:</b>China.<br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n<h3>Packing Print</h3>\n";
		xml += "<p></p>";
		xml += strName;
		xml += "</body>\n</pdf>";

		// run the BFO library to convert the xml document to a PDF 
		var file = nlapiXMLToPDF(xml);

		// set content type, file name, and content-disposition (inline means display in browser)
		response.setContentType('PDF','CustomerStatementAST.pdf', 'inline');

		// write response to the client
		response.write( file.getValue());  
		}
		catch(e)
		{
			throw nlapiCreateError('SUITELET_ERROR',"There is No Available for this Customer..."+e, false); 
		}
		
		
	}



	function mergeArrays() 
	{
		return [].concat.apply([], arguments);
		
	}

	function squash(arr){
		var tmp = [];
		for(var i = 0; i < arr.length; i++){
			if(tmp.indexOf(arr[i]) == -1){
			tmp.push(arr[i]);
			}
		}
		return tmp;
	}


	function formatNumber (num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
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

	
	function getAllTransactionDates(customer)
	{
		var All_trandate = new Array();
		var date_filters = new Array();
		date_filters.push(new nlobjSearchFilter('internalid', null, 'is', customer));
		
		var date_column = new Array();
		date_column[0] = new nlobjSearchColumn('trandate','transaction');
		date_column[0].setSort(false);
		var date_results = nlapiSearchRecord('customer', null, date_filters, date_column);
		if (date_results != null && date_results != '' && date_results != undefined) 
		{
			for(var s=0;s<date_results.length;s++)
			{
				All_trandate.push(date_results[s].getValue(date_column[s]))
			}
			
			
		}
		return All_trandate;
	}

	function getOpeningBalance(vendor, locationname, start)
	{
					nlapiLogExecution('DEBUG', 'getOpeningBalance', 'vendor = ' + vendor);
					nlapiLogExecution('DEBUG', 'getOpeningBalance', 'locationname = ' + locationname);
					//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'create = ' + create);
					nlapiLogExecution('DEBUG', 'getOpeningBalance', 'start = ' + start);
					
					
					var lastInternalID = 0;
					var totalAmount = 0;
					//var totalfxamount = 0;
					totalAmount = parseFloat(totalAmount);
					
					 var columns = new Array();
					 columns[0] = new nlobjSearchColumn('internalid');
					 columns[1] = new nlobjSearchColumn('amount');
					
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',vendor);
					 filters[1] = new nlobjSearchFilter ('trandate', null, 'onorbefore', start);
					// filters[2] = new nlobjSearchFilter ('trandate', null, 'onorafter',openingBalanceDate);
						 var searchresults = nlapiSearchRecord('transaction','customsearch_rohl_vendorstatement',filters,columns)
					
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
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
		var subsidiary=request.getParameter('ven_subsi');
		////nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiaryId==" + subsidiary);
		
		var subsidiaryId=request.getParameter('ven_subsi');
		//nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiaryId==" + subsidiaryId);
		
		var opentran =request.getParameter('ven_opentran');
		////////nlapiLogExecution('DEBUG', 'aftr submit', "  opentran==" + opentran);
			if(recId)
			{
				var recObj = nlapiLoadRecord('customrecord_vendor_statement_detail_rec',recId);
			  
				var vendor = recObj.getFieldValue('custrecord_venstat_vendor'); 
				nlapiLogExecution('DEBUG', 'aftr submit', "  vendor==" + vendor);
				
				var customerName= recObj.getFieldText('custrecord_venstat_vendor');
				var removeNum = customerName.replace(/\d+/g,'');
				//nlapiLogExecution('DEBUG', 'aftr submit', "  customerName==" + customerName);

				startdate= recObj.getFieldValue('custrecord_venstat_startdate');
				//nlapiLogExecution('DEBUG', 'aftr submit', "  startdate  ==" + startdate);

				enddate= recObj.getFieldValue('custrecord_venstat_enddate');
				//enddate= new Date();
				//nlapiLogExecution('DEBUG', 'aftr submit', "  enddate  ==" + enddate);
				
				currency = recObj.getFieldValue('custrecord_vendstat_currency');
				nlapiLogExecution('DEBUG', 'aftr submit', "  currency  ==" + currency);
				
				var subsidiaryTx = recObj.getFieldText('custrecord_venstat_subsidiary');
				nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiaryTx == " + subsidiaryTx);
				
				var locationname = recObj.getFieldValue('custrecord_venstat_loc')
				
				amountDue = recObj.getFieldValue('custrecord_vendstat_amountdue');
				// var tp = amountDue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
				
				var billAddress = recObj.getFieldValue('custrecord_vendstat_address');
				//nlapiLogExecution('DEBUG', 'aftr submit', "  billAddress  ==" + billAddress);
				if(billAddress == null)
				{
					billAddress =" ";
				}
				
				var subsidiary = recObj.getFieldValue('custrecord_venstat_subsidiary');
				nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiary ==" + subsidiary);
				
				var subsidiaryText = recObj.getFieldText('custrecord_venstat_subsidiary');
				nlapiLogExecution('DEBUG','GET Value','subsidiaryText :'+subsidiaryText);
				
				if(subsidiaryText.toString().indexOf(':') != -1)
				{
					var substringParent = subsidiaryText.split(':');
					nlapiLogExecution('DEBUG','GET Value','substringParent:'+substringParent);
					
					checkString = substringParent[substringParent.length-1];
				    nlapiLogExecution('DEBUG','GET Value','checkString:'+checkString);
				}
				else
				{
					checkString = subsidiaryText;
					nlapiLogExecution('DEBUG','GET Value','checkString in else:'+checkString);
				}
				
				var subsdryAddrs;

			   if(subsidiary)
				{
					var s = nlapiLoadRecord("subsidiary",subsidiary);//,{recordmode: "dynamic"});
					nlapiLogExecution('DEBUG', 'aftr submit', "  s ==" + s);
					
					subsdryAddrs = s.viewSubrecord("mainaddress").getFieldValue('addrtext');
					
					if(subsdryAddrs == null && subsdryAddrs == '' && subsdryAddrs == undefined)
					{
						subsdryAddrs ="";
					}
                  
					var SubsiGST = s.getFieldValue('custrecord_sub_gst');
                    if(SubsiGST == null || SubsiGST == '' || SubsiGST == undefined)
                    {
                        SubsiGST = '';
                    }
                    
                    var subsiLogo = s.getFieldValue('logo');
        			
        			var file = nlapiLoadFile(subsiLogo);
        	        //nlapiLogExecution('DEBUG','before submit','file =='+file);
        	        
        	        var URL = file.getURL();
        	        //nlapiLogExecution('DEBUG','before submit','URL =='+URL);
        	        
				}
			}//end recId	  
			
				var CurrencyListArr1 =[];
				var customerRecord = nlapiLoadRecord('vendor', vendor);
				//nlapiLogExecution('DEBUG','GET Value','customerRecord:'+customerRecord);
				
				var custCurrency = customerRecord.getFieldValue('currency');
				var custCurrency1 = customerRecord.getFieldText('currency');
				//nlapiLogExecution('DEBUG','GET Value','custCurrency:'+custCurrency);
				
							
				var numberOfAddress = customerRecord.getLineItemCount('addressbook');
				var addressID;
				var addressText;
				for (var x = 1; x <= numberOfAddress; x++)
				{
				     var defaultaddress = customerRecord.getLineItemValue('addressbook', 'defaultbilling', x);
				     if (defaultaddress == 'T')
				     {
				          addressID = customerRecord.getLineItemValue('addressbook', 'internalid', x);
				          addressText = customerRecord.getLineItemValue('addressbook', 'addrtext', x);
					      break;
		              }
				}
				
				var numberOfAddress = customerRecord.getLineItemCount('addressbook');
				
				var subMachine = customerRecord.getLineItemCount('submachine');
				//nlapiLogExecution('DEBUG','GET Value','subMachine:'+subMachine);
				
				var CurrencyList = customerRecord.getLineItemCount('currency');
				
				var CurrencyListArr=[];
				var lineCurArr = [];
				for (var x1 = 1; x1 <= subMachine; x1++)
				{
					var Linesubsi =customerRecord.getLineItemValue('submachine', 'subsidiary', x1);
					//nlapiLogExecution('DEBUG','GET Value','Linesubsi:'+Linesubsi);
					
					var Linebalance = customerRecord.getLineItemValue('submachine','balance', x1);
					//nlapiLogExecution('DEBUG','GET Value','Linebalance:'+Linebalance);
					
					var tp = Linebalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
					//nlapiLogExecution('DEBUG','GET Value','subMachine tp:'+ tp);
				 }
				
				var filterCurr;

				   for (var x2 = 1; x2 <= CurrencyList; x2++)
				   {
					var lineCur =customerRecord.getLineItemValue('currency', 'currency', x2);
					//lineCurArr.push(lineCur);
					
					var lineCur1 =customerRecord.getLineItemText('currency', 'currency', x2);
					
					if(lineCur1 == currency)
					{
						//nlapiLogExecution('DEBUG','GET Value','CurrencyListArr lineCur1: ' + lineCur1  + ' currency = ' + currency);
						
						filterCurr = lineCur;
						
						var balance = customerRecord.getLineItemValue('currency','balance',x2);
						var tp = balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
					}
					
					//nlapiLogExecution('DEBUG','GET Value','custCurrency : '+ custCurrency + ' currency = ' + lineCur1);
					
					CurrencyListArr.push(lineCur);
					
					CurrencyListArr1.push(lineCur1);
				
					
				   }
				   //nlapiLogExecution('DEBUG','GET Value','filterCurr : ' + filterCurr);
					
				   
					
				if(opentran!='T')
				{	 
				   var openingBalance = getOpeningBalance(vendor, filterCurr, startdate,subsidiaryId,opentran);
				   nlapiLogExecution('DEBUG','before submit','openingBalance !T =='+openingBalance);
				}
				 else
				{
					// var openingBalance ='0.00'; 
					 var openingBalance = getOpeningBalanceT(vendor, filterCurr, startdate,subsidiaryId,opentran);
					 nlapiLogExecution('DEBUG','before submit','openingBalance_Else =='+openingBalance);
				}	   
	//============================================ TAX REGISTRASTION NUM ==============================================
				   
					var gstList = customerRecord.getLineItemCount('taxregistration');
					
					var gstListArr=[];
					
					   for (var x3 = 1; x3 <= gstList; x3++)
					   {
							var registVal =customerRecord.getLineItemValue('taxregistration','taxregistrationnumber',x3);
							//nlapiLogExecution('DEBUG','GET Value','registVal:'+registVal);
							
							var gstText =customerRecord.getLineItemText('taxregistration','taxregistrationnumber',x3);
							//nlapiLogExecution('DEBUG','GET Value','gstText:'+gstText);
							
							break;
						//CurrencyListArr1.push(lineCur1);
					   }
						//nlapiLogExecution('DEBUG','GET Value','CurrencyListArr:'+CurrencyListArr);
					   if(registVal == '' || registVal == null || registVal == undefined)
						{
						   registVal = '';
						}
		//===================================================================================================================
				var city ='';
				var addressText2 = '';
				var addressText1 = '';
				var country ='';
				var addressID ='';
				var zip ='';
				
				   for (var x = 1; x <= numberOfAddress; x++)
				   {
				          var defaultaddress = customerRecord.getLineItemValue('addressbook', 'defaultbilling', x);
				               if (defaultaddress == 'T')
				               {
				                      addressID = customerRecord.getLineItemValue('addressbook', 'internalid', x);
				                      if(addressID == null && addressID == '' && addressID == undefined)
				                      {
				                    	  addressID = '';
				                      }
				                      addressText1 = customerRecord.getLineItemValue('addressbook', 'addrtext', x);
				                      if(addressText1 == null && addressText1 == '' && addressText1 == undefined)
				                      {
				                    	  addressText1 = '';
				                      }
				                      addressText2 = customerRecord.getLineItemValue('addressbook', 'addr2', x);
				                      if(addressText2 == null && addressText2 == '' && addressText2 == undefined)
				                      {
				                    	  addressText2 = '';
				                      }
				                      city = customerRecord.getLineItemValue('addressbook', 'city', x);
				                      if(city == null && city == '' && city == undefined)
				                      {
				                    	  city = '';
				                      }
				                      country = customerRecord.getLineItemValue('addressbook', 'country', x);
				                      if(country == null && country == '' && country == undefined)
				                      {
				                    	  country = '';
				                      }
				                      zip = customerRecord.getLineItemValue('addressbook', 'zip', x);
				                      if(zip == null && zip == '' && zip == undefined)
				                      {
				                    	  zip = '';
				                      }
					            break;
				               }
				   }
				   var strName = '';
						strName += "<table width=\"100\%\" >";
						strName += "<tr>";
						strName += "<td>";
						strName +="<img height='100%' width='100%' src=\""+nlapiEscapeXML(URL)+"\"></img>";//(SubsiLogo)
						strName += "</td>";
						strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
						strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"16\"><b>VENDOR STATEMENT</b></td>";
						strName += "</tr>";
						strName += "<tr>";
						strName += "<td>";
						//strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
						strName += "</td>";
						strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
						strName += "</tr>";
						strName += "</table>";
						
					
						strName += "<table width=\"100\%\" border=\"solid 1px black\">";
						strName += "<tr>";
						/*strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";*/
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Vendor Name</b></td>";
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(removeNum)+"</td>";
						strName += "</tr>";
						
						strName += "<tr>";
						/*strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";*/
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>TRN Number</b></td>";
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(registVal)+"</td>";
						strName += "</tr>";
						
						strName += "<tr>";
						/*strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";*/
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Statement Start Date</b></td>";
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+startdate+"</td>";
						strName += "</tr>";
						
						strName += "<tr>";
						/*strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";*/
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Statement End Date</b></td>";
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+enddate+"</td>";
						strName += "</tr>";
						
						strName += "<tr>";
						/*strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";*/
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Closing Balance</b></td>";
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+tp+"</td>";
						strName += "</tr>";
						
						strName += "<tr>";
						/*strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";*/
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Currency</b></td>";
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+currency+"</td>";
						strName += "</tr>";
						
						strName += "<tr>";
						/*strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";*/
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary</b></td>";
						strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+checkString+"</td>";
						strName += "</tr>";
						
                        if(subsdryAddrs != null && subsdryAddrs != '' && subsdryAddrs != undefined)
                        {
                            strName += "<tr>";
                            strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary Address</b></td>";
                            strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(subsdryAddrs)+"</td>";
                            strName += "</tr>";
                        }
                        
                        strName += "<tr>";
                        strName += "<td width = \"25\%\" align=\"left\" font-size=\"10\"><b>Subsidiary&nbsp;TRN&nbsp;Number</b></td>";
                        if(SubsiGST != null && SubsiGST != '' && SubsiGST != undefined)
                        {
                        	 strName += "<td width = \"25\%\" align=\"left\" font-size=\"10\">"+SubsiGST+"</td>";
                        }
                        else
                        {
                        	SubsiGST = '';
                        	strName += "<td width = \"25\%\" align=\"left\" font-size=\"10\">"+SubsiGST+"</td>";
                        }
                        strName += "</tr>";  
                          
                          
						if(addressText != null && addressText != '')
						{	
							strName += "<tr>";
							/*strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";*/
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Bill To</b></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(addressText)+"</td>";
							strName += "</tr>";
						}
						

						strName += "</table>";
		//------------------------------------------Line Level Values------------------------------------------------
		//var lineCount = ffReqObj.getLineItemCount('item');
		strName += "<br/>";
		strName += "<table width=\"100\%\" >";
		if(opentran =='T')
		{
			strName += "<tr>";
			strName += "<td colspan =\"7\" align = \"center\" font-size=\"12\"  border-right=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"100\%\"><b>Open Transaction</b></td>";
			strName += "</tr>";
		}	
		strName += "<tr>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>Transaction <br/>Date</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>Trans Type</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\"><b>Transaction No.</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\"><b>Memo</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>Debit</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>Credit</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\"><b>Balance</b></td>";
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
		strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"35\%\"><b>Opening Balance</b></td>";
		strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"35\%\"></td>";
		
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
		strName += "<td   align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\"><b>"+formatNumber(parseFloat(openingBalance).toFixed(2))+"</b></td>";
		strName += "</tr>";
		
		if(opentran !='T')
		{	
			nlapiLogExecution('DEBUG', 'aftr submit', "  IN opentran subsidiary ==");
			
			var columns = new Array();
			columns[0] = new nlobjSearchColumn('internalid');
			columns[1] = new nlobjSearchColumn('total');
			
			var filters = new Array();
			//filters.push(new nlobjSearchFilter('subsidiary', null, 'anyof', subsidiary));
			filters.push(new nlobjSearchFilter('entity', null, 'is', vendor));
			filters.push(new nlobjSearchFilter ('trandate', null, 'onorafter',startdate));
			filters.push(new nlobjSearchFilter ('trandate', null, 'onorbefore', enddate));
			filters.push(new nlobjSearchFilter ('currency', null, 'anyof', filterCurr));
			//filters.push(new nlobjSearchFilter ('subsidiary', null, 'anyof', subsidiaryId));
			
			var searchResults = nlapiSearchRecord('transaction', 'customsearch_tartan_vendorstatement', filters, columns);
			//////////nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'openingBalance = end ');
			var breakFlag = 0;
			if(searchResults != null && searchResults != '')
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
				var cr_col_bal=0.00;
				var Balshow = 0;
				
				for (var i = 0;  i < searchResults.length; i++) 
				{
					var recordCount = recordCount + 1;
					var value = searchResults[i].getValue('internalid');
					internalID = value;
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'internalID = ' + internalID);
					previousInternalID = internalID;
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'previousInternalID = ' + previousInternalID);
					var value1 = searchResults[i].getValue('amount');
					amount = parseFloat(value1);
					nlapiLogExecution('DEBUG', 'ScheduleTest', 'Amount = ' + amount);
					
					amount = parseFloat(amount);
					
					var value2 = searchResults[i].getValue('transactionnumber');
					transactionnumber =  value2;
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'transactionnumber = ' + transactionnumber);
					var value3 = searchResults[i].getValue('trandate');
					date = value3;
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'date = ' + date);
					var value4 = searchResults[i].getValue('memo');
					memo = value4;
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'memo = ' + memo);
					var value5 = searchResults[i].getValue('debitfxamount');
					if( value5 == '')
					{
						value5 =0;
					}
					debitamount = value5;
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'debitamount = ' + debitamount);
					total_debitamount += parseFloat(debitamount);
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_debitamount = ' + total_debitamount);
					var value6 = searchResults[i].getValue('creditfxamount');
					if(value6 == '')
					{
						value6 =0;
					}
					creditamount = parseFloat(value6);
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'creditamount = ' + creditamount);
					total_creditamount +=parseFloat(creditamount)
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_creditamount = ' + total_creditamount);
					var value7 = searchResults[i].getValue('type');
					type = value7;
					//////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'type = ' + type);
				
					
					if(debitamount!=null && debitamount!=''&& debitamount!=undefined&& debitamount !=0)
					{
						debitamount=debitamount;
					}
					else
					{
						debitamount=0.00;
					}	
					if(creditamount!=null && creditamount!=''&& creditamount!=undefined&& creditamount !=0)
					{
						creditamount=creditamount;
					}
					else
					{
						creditamount=0.00;
					}	
					if( i ==0)
					{	
						col_Bal =parseFloat(openingBalance) + parseFloat(debitamount) -parseFloat(creditamount);
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'col_Bal-debit = ' + col_Bal);
						cr_col_bal =col_Bal;
					}
					else if(i > 0)
					{
						col_Bal =parseFloat(cr_col_bal)+parseFloat(debitamount)-parseFloat(creditamount);
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'col_Bal-credit = ' + col_Bal);
						cr_col_bal =col_Bal;
					}
					if(debitamount>creditamount && cr_col_bal < 0)
					{
						Balshow = (cr_col_bal);
					}
					else if(debitamount<creditamount && cr_col_bal > 0)
					{
						Balshow = (cr_col_bal);
					}	
					else
					{
						Balshow = (cr_col_bal);
					}	
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
					
					if (type != null && type != '' && type != undefined) 
					{
						strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+type+"</td>";
					}
					else 
					{
						type =' ';//memo
						strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+type+"</td>";
					}
					if (transactionnumber != null && transactionnumber != '' && transactionnumber != undefined) 
					{
						strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+transactionnumber+"</td>";
					}
					else 
					{
						transactionnumber =' ';
						strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+transactionnumber+"</td>";
					}
					if (memo != null && memo != '' && memo != undefined) 
					{
						strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+nlapiEscapeXML(memo)+"</td>";
					}
					else 
					{
						memo =' ';
						strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+nlapiEscapeXML(memo)+"</td>";
					}
					//memo
					if (debitamount == null && debitamount == '' && debitamount == undefined && isNaN(debitamount)) 
					{
						debitamount ='0';
						strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(debitamount)+"</td>";
					}
					else 
					{
						strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(debitamount)+"</td>";
					}
					if (creditamount == null && creditamount == '' && creditamount == undefined && isNaN(creditamount)) 
					{
						creditamount =' ';
						strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(creditamount)+"</td>";
					}
					else 
					{
						strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(creditamount)+"</td>";
					}
					if (Balshow == null && Balshow == '' && Balshow == undefined && isNaN(Balshow)) 
					{
						Balshow =' ';
						strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\">"+formatNumber(Balshow)+"</td>";
					}
					else 
					{
						strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\">"+formatNumber(Balshow.toFixed(2))+"</td>";
					}
					var EndColBal = parseFloat(EndColBal) +parseFloat(col_Bal);
					strName += "</tr>";
				}  //END FOR(var i = 0;  i < searchResults.length; i++) 
				
		        var fin_debit=parseFloat(total_debitamount);//+parseFloat(openingBalance);
				var fin_credit=parseFloat(total_creditamount);//+parseFloat(openingBalance);
				var s = parseFloat(openingBalance)+ parseFloat(fin_debit)-parseFloat(fin_credit);
				var last_bal= Math.round(s * 100) / 100;
				////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'last_bal = ' + last_bal);
				var last_debit=Math.round(fin_debit * 100) / 100;
				////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'last_debit = ' + last_debit);
				var last_credit=Math.round(fin_credit * 100) / 100;
				////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'last_credit = ' + last_credit);
				var bal = Math.round(EndColBal * 100) / 100;
				////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'bal = ' + bal);
		  	 	var DebitAmount= formatNumber(fin_debit.toFixed(2));
				var CreditAmount= formatNumber(fin_credit.toFixed(2));
				var closing_bal=formatNumber(last_bal);
				var EndBal = formatNumber(s.toFixed(2));
				////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'EndBal = ' + EndBal);
		//-----------------------------Fetch Values-------------------------------------------
				strName += "<tr>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"42\%\"><b>Total</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"42\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>"+DebitAmount+"</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>"+CreditAmount+"</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\"><b>"+EndBal+"</b></td>";
				strName += "</tr>";
				
				strName += "<tr>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
				strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"35\%\"><b>Closing Balance</b></td>";
				strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"35\%\"></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
				strName += "<td   align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\"><b>"+EndBal+"</b></td>";
				strName += "</tr>";
				strName += "</table>";
			}
			else
			{
				strName += "<tr>";
				var FinBal = parseFloat(openingBalance).toFixed(2);
				if(FinBal !=null && FinBal != undefined)
				{
					FinBal=formatNumber(FinBal);
				}
				else
				{
					FinBal='';
				}
					strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"42\%\"><b>Total</b></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"42\%\"></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>0.00</b></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>0.00</b></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\"><b>"+FinBal+"</b></td>";
					strName += "</tr>";
					strName += "</table>";
			}
		}//Normal transaction check ends here....
				
		else if(opentran =='T')
		{
			//nlapiLogExecution('DEBUG', 'aftr submit', "  IN ELSE opentran subsidiary==" + subsidiary);
			var columns = new Array();
			columns[0] = new nlobjSearchColumn('internalid');
			columns[1] = new nlobjSearchColumn('total');
			 
			var filters = new Array();
			//filters.push(new nlobjSearchFilter('subsidiary', null, 'anyof', subsidiary));
			filters.push(new nlobjSearchFilter('entity', null, 'is', vendor));
			filters.push(new nlobjSearchFilter ('trandate', null, 'onorafter',startdate));
			filters.push(new nlobjSearchFilter ('trandate', null, 'onorbefore', enddate));
			filters.push(new nlobjSearchFilter ('currency', null, 'anyof', filterCurr));
			
			var searchResults = nlapiSearchRecord('transaction', 'customsearch_tartan_vendorstatement_2_2', filters, columns);
			var breakFlag = 0;
			if (searchResults != null && searchResults != '')
			{
					var length = searchResults.length;
					////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result length = ' + length);
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
					var cr_col_bal=0;					
					var amtRemain='';
					var debitamount;
					var creditamount;
					
					for (var i = 0;  i < searchResults.length; i++) 
					{
						var recordCount = recordCount + 1;
						var value = searchResults[i].getValue('internalid');
						internalID = value;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'internalID = ' + internalID);
						previousInternalID = internalID;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'previousInternalID = ' + previousInternalID);
						var value1 = searchResults[i].getValue('total');
						amount = parseFloat(value1);
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'Amount = ' + amount);
						amount = parseFloat(amount);
						var value2 = searchResults[i].getValue('transactionnumber');
						transactionnumber =  value2;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'transactionnumber = ' + transactionnumber);
						var value3 = searchResults[i].getValue('trandate');
						date = value3;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'date = ' + date);
						var value4 = searchResults[i].getValue('memo');
						memo = value4;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'memo = ' + memo);
						
						var value5 = searchResults[i].getValue('debitfxamount');
						if( value5 == '')
						{
							value5 =0;
						}
						debitamount = value5;
						nlapiLogExecution('DEBUG', 'ScheduleTest', 'debitamount = ' + debitamount);
						total_debitamount += parseFloat(debitamount);
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_debitamount = ' + total_debitamount);
						var value6 = searchResults[i].getValue('creditfxamount');
						if(value6 == '')
						{
							value6 =0;
						}
						creditamount = parseFloat(value6);
						nlapiLogExecution('DEBUG', 'ScheduleTest', 'creditamount = ' + creditamount);
						amtRemain = searchResults[i].getValue('formulanumeric');
						if(amtRemain == '')
						{
							amtRemain =0;
						}
						amtRemain = parseFloat(amtRemain);
						
						if(amtRemain >0)
						{
							debitamount =amtRemain;
						}	
						else
						{
							creditamount= -(amtRemain);
						}	
						
						total_creditamount +=parseFloat(creditamount)
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_creditamount = ' + total_creditamount);
						
						var value7 = searchResults[i].getValue('type');
						type = value7;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'type = ' + type);
						
						
						
						if(debitamount!=null && debitamount!=''&& debitamount!=undefined&& debitamount !=0)
						{
							debitamount=debitamount;
						}
						else
						{
							debitamount=0.00;
						}	
						
						if(creditamount!=null && creditamount!=''&& creditamount!=undefined&& creditamount !=0)
						{
							creditamount=creditamount;
						}
						else
						{
							creditamount=0.00;
						}	
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'i = ' + i);
						if( i ==0)
						{	
							col_Bal =parseFloat(openingBalance) + parseFloat(debitamount) -parseFloat(creditamount);
							//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'col_Bal-debit = ' + col_Bal);
							cr_col_bal =col_Bal;
						}
						else if(i > 0)
						{
							col_Bal =parseFloat(cr_col_bal)+parseFloat(debitamount)-parseFloat(creditamount);
							//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'col_Bal-credit = ' + col_Bal);
							cr_col_bal =col_Bal;
						}
						
						if(debitamount>creditamount && cr_col_bal < 0)
						{
							var Balshow = (cr_col_bal);
						}
						else if(debitamount<creditamount && cr_col_bal > 0)
						{
							var Balshow = (cr_col_bal);
						}	
						else
						{
							var Balshow = (cr_col_bal);
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
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+transactionnumber+"</td>";
							}
							else 
							{
								transactionnumber =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+transactionnumber+"</td>";
							}
							
							if (memo != null && memo != '' && memo != undefined) 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+nlapiEscapeXML(memo)+"</td>";
							}
							else 
							{
								memo =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+nlapiEscapeXML(memo)+"</td>";
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
							
							if (Balshow == null && Balshow == '' && Balshow == undefined && Balshow == 'NaN') 
							{
						
									Balshow =' ';
									strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\">"+formatNumber(Balshow)+"</td>";
					
							}
							else 
							{
								strName += "<td align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\">"+formatNumber(Balshow.toFixed(2))+"</td>";
							}
							var EndColBal = parseFloat(EndColBal) +parseFloat(col_Bal);
							 strName += "</tr>";
								
						
							 
						}  //END FOR(var i = 0;  i < searchResults.length; i++) 
			            /*var fin_debit=parseFloat(total_debitamount);//+parseFloat(openingBalance);
						var fin_credit=parseFloat(total_creditamount);//+parseFloat(openingBalance);
						var s = parseFloat(openingBalance)- parseFloat(fin_debit)+parseFloat(fin_credit);
					    var last_bal= Math.round(s * 100) / 100;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'last_bal = ' + last_bal);
						var last_debit=Math.round(fin_debit * 100) / 100;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'last_debit = ' + last_debit);
						var last_credit=Math.round(fin_credit * 100) / 100;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'last_credit = ' + last_credit);
						var bal = Math.round(EndColBal * 100) / 100;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'bal = ' + bal);
			  		 	var DebitAmount= formatNumber(fin_debit.toFixed(2));
						var CreditAmount= formatNumber(fin_credit.toFixed(2));
		                var closing_bal=formatNumber(last_bal);
						var EndBal = formatNumber(s.toFixed(2));*/
						var fin_debit=parseFloat(total_debitamount);//+parseFloat(openingBalance);
						var fin_credit=parseFloat(total_creditamount);//+parseFloat(openingBalance);
						var s = parseFloat(openingBalance)+ parseFloat(fin_debit)-parseFloat(fin_credit);
						var last_bal= Math.round(s * 100) / 100;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'last_bal = ' + last_bal);
						var last_debit=Math.round(fin_debit * 100) / 100;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'last_debit = ' + last_debit);
						var last_credit=Math.round(fin_credit * 100) / 100;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'last_credit = ' + last_credit);
						var bal = Math.round(EndColBal * 100) / 100;
						////////nlapiLogExecution('DEBUG', 'ScheduleTest', 'bal = ' + bal);
						var DebitAmount= formatNumber(fin_debit.toFixed(2));
						var CreditAmount= formatNumber(fin_credit.toFixed(2));
						var closing_bal=formatNumber(last_bal);
						var EndBal = formatNumber(s.toFixed(2));
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'EndBal = ' + EndBal);
	//-----------------------------Fetch Values-------------------------------------------
				strName += "<tr>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\"><b>Total</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\"></td>";
		     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>"+DebitAmount+"</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>"+CreditAmount+"</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\"><b>"+EndBal+"</b></td>";
				strName += "</tr>";
				
				strName += "<tr>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
				strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"35\%\"><b>Closing Balance</b></td>";
				strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"35\%\"></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
				strName += "<td   align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\"><b>"+EndBal+"</b></td>";
				strName += "</tr>";
	
				strName += "</table>";
			}
			else
			{
				strName += "<tr>";
				
				var FinBal = parseFloat(openingBalance).toFixed(2);
				
				if(FinBal !=null && FinBal != undefined)
				{
					FinBal=formatNumber(FinBal);
				}
				else{
					FinBal='';
				}
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\"><b>Total</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\"></td>";
		     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>0.00</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>0.00</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"30\%\"><b>"+FinBal+"</b></td>";
				strName += "</tr>";
						
				strName += "</table>";
			}
		}	
				
		// build up BFO-compliant XML using well-formed HTML
		var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
		xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.2in\" font-size=\"10\">\n";
		//xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><b>Country of Orgin:</b>China.<br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n<h3>Packing Print</h3>\n";
		xml += "<p></p>";
		xml += strName;
		xml += "</body>\n</pdf>";
		// run the BFO library to convert the xml document to a PDF 
		var file = nlapiXMLToPDF(xml);
		// set content type, file name, and content-disposition (inline means display in browser)
		response.setContentType('PDF','VendorStatement.pdf', 'inline');
		// write response to the client
		response.write( file.getValue());  
		}
		catch(e)
		{
			//throw nlapiCreateError('SUITELET_ERROR',"There is No Available for this Customer..."+e, false); 
			nlapiLogExecution('DEBUG', 'ScheduleTest', 'Error = ' +e);
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
	
	function  getSubsidiaryamountdueOpen(vendor,subsidiaryId)
	{


		nlapiLogExecution('DEBUG', 'getSubsidiaryamountdueNormal', 'vendor = ' +vendor);
		nlapiLogExecution('DEBUG', 'getSubsidiaryamountdueNormal', 'subsidiaryId =' +subsidiaryId);
		var amount='0.00'; 
		 var columns = new Array();
		 columns[0] = new nlobjSearchColumn("entity",null,"GROUP");
		 //columns[1] = new nlobjSearchColumn("formulanumeric",null,"SUM").setFormula("CASE WHEN {creditamount}>0 THEN 0-{amountremaining}WHEN {debitamount}>0 THEN {debitamount} END")
		// columns[1] = new nlobjSearchColumn("amountremaining",null,"SUM");
		// columns[2] = new nlobjSearchColumn("formulanumeric").setFormula("CASE WHEN ( {creditamount} > 0) THEN (0-{amount})ELSE {amount} END");
		 columns[1] = new nlobjSearchColumn("debitamount",null,"SUM");
		 columns[2] = new nlobjSearchColumn("creditamount",null,"SUM")
		 
		 var filters = new Array();
		 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',vendor);
		 filters[1] = new nlobjSearchFilter ('subsidiary', null, 'anyof', subsidiaryId);
		 
		 var searchresults = nlapiSearchRecord('transaction','customsearch_tarta_vendorstatement_2_2_2',filters,columns)
		//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'searchresults.length =' +searchresults.length);	 
		 if(searchresults != null &&searchresults != undefined &&searchresults != '')
		    {
				for (var i = 0;  i < searchresults.length; i++) 
		    	{
					 var debitamt = searchresults[i].getValue("debitfxamount",null,"SUM");
					 var creditamt = searchresults[i].getValue("creditfxamount",null,"SUM");
					
					amount =parseFloat(debitamt) - parseFloat(creditamt);
					nlapiLogExecution('DEBUG', 'getSubsidiaryamountdueNormal', 'amount-h =' +amount);
		    	}	
		    }
			 else
				{
				 	amount='0.00'; 			 	
				 	nlapiLogExecution('DEBUG', 'getSubsidiaryamountdueNormal', 'amount- =' +amount);
				} 
		return amount;
	}
	
	/*function getSubsidiaryamountdueNormal(vendor,subsidiaryId)
	{
		nlapiLogExecution('DEBUG', 'getSubsidiaryamountdueNormal', 'vendor = ' +vendor);
		nlapiLogExecution('DEBUG', 'getSubsidiaryamountdueNormal', 'subsidiaryId =' +subsidiaryId);
		var amount='0.00'; 
		
		 var columns = new Array();
		 columns[0] = new nlobjSearchColumn("entity",null,"GROUP");
		  columns[1] = new nlobjSearchColumn("debitfxamount",null,"SUM");
		 columns[2] = new nlobjSearchColumn("creditfxamount",null,"SUM")
		 
		 var filters = new Array();
		 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',vendor);
		 filters[1] = new nlobjSearchFilter ('subsidiary', null, 'anyof', subsidiaryId);
		 
		 var searchresults = nlapiSearchRecord('transaction','customsearch_tartan_vendorstatement_3',filters,columns)
		//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'searchresults.length =' +searchresults.length);	 
		 if(searchresults != null &&searchresults != undefined &&searchresults != '')
	    {
			for (var i = 0;  i < searchresults.length; i++) 
	    	{
				 var debitamt = searchresults[i].getValue("debitfxamount",null,"SUM");
				 var creditamt = searchresults[i].getValue("creditfxamount",null,"SUM");
				if(debitamt == null || debitamt == '' || debitamt == undefined)
                {
                  debitamt = 0.00;
                }
              if(creditamt == null || creditamt == '' || creditamt == undefined)
                {
                  creditamt = 0.00;
                }
				amount =parseFloat(debitamt) - parseFloat(creditamt);
				nlapiLogExecution('DEBUG', 'getSubsidiaryamountdueNormal', 'amount-h =' +amount);
	    	}	
	    }
		 else
			{
			 	amount='0.00'; 			 	
			 	nlapiLogExecution('DEBUG', 'getSubsidiaryamountdueNormal', 'amount- =' +amount);
			} 
	return amount;

			
		}*/

	function getOpeningBalance(vendor, filterCurr, start,subsidiaryId,opentran)
	{
		nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalance = ');
		
					var lastInternalID = 0;
					var totalAmount = 0;
					//var totalfxamount = 0;
					totalAmount = parseFloat(totalAmount);
					 
					 var columns = new Array();
					 columns[0] = new nlobjSearchColumn('internalid');
					 columns[1] = new nlobjSearchColumn('amount');
					// columns[2] = new nlobjSearchColumn("formulanumeric").setFormula("CASE WHEN ( {creditamount} > 0) THEN (0-{amount})ELSE {amount} END");
					 
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',vendor);
					 filters[1] = new nlobjSearchFilter ('trandate', null, 'before', start);
					 //filters[2] = new nlobjSearchFilter ('subsidiary', null, 'anyof', subsidiaryId);
					 filters[2] = new nlobjSearchFilter ('currency', null, 'anyof', filterCurr);
					 
					 var searchresults = nlapiSearchRecord('transaction','customsearch_tartan_vendorstatement',filters,columns)
						 
					 if(searchresults != null)
				    		{
							  ////////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'searchresults.length = ' + searchresults.length);
							   var amount = '';
							   var internalID = '';
								//var fxamount = '';
								var type = '';
								var previousInternalID = '';
								for (var i = 0;  i < searchresults.length; i++) 
				    			{
				    				
			                		var value = searchresults[i].getValue('internalid');
				    				previousInternalID = lastInternalID;
				    				////////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'previousInternalID = ' + previousInternalID);
				    				internalID = value;
									////////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'internalID = ' + internalID);
				    				
									
				    				//var value1 = searchresults[i].getValue(formulanumeric' ');
									var value1 = searchresults[i].getValue('formulanumeric');
				    				amount += parseFloat(value1);
									////////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'Amount = ' + amount);
									amount = parseFloat(amount);				
				    				}
				    			lastInternalID = internalID;
				    			
				    			totalAmount =  parseFloat(amount);
				    		}	
					totalAmount = parseFloat(totalAmount);
					var getOpeningBalancefunction = parseFloat(totalAmount);
					return getOpeningBalancefunction;
					nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction = ' + getOpeningBalancefunction);
	}
	
function getOpeningBalanceT(vendor, filterCurr, start,subsidiaryId,opentran)
{
		var lastInternalID = 0;
		var totalAmount = 0;
		//var totalfxamount = 0;
		totalAmount = parseFloat(totalAmount);
		nlapiLogExecution('DEBUG', 'getOpeningBalance', 'startDate = ' + start);
		nlapiLogExecution('DEBUG', 'getOpeningBalance', 'vendor = ' + vendor);
		nlapiLogExecution('DEBUG', 'getOpeningBalance', 'subsidiaryId = ' + subsidiaryId);
		
		var columns = new Array();
		columns[0] = new nlobjSearchColumn("entity",null,"GROUP");
		columns[1] = new nlobjSearchColumn("formulanumeric",null,"SUM");
		
		
		var filters = new Array();
		filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',vendor);
		filters[1] = new nlobjSearchFilter ('trandate', null, 'before', start);
		filters[2] = new nlobjSearchFilter ('subsidiary', null, 'anyof', subsidiaryId);
		filters[2] = new nlobjSearchFilter ('currency', null, 'anyof', filterCurr);
		
		var searchresults = nlapiSearchRecord('transaction','customsearch_tartan_vendorstatement_2_23',filters,columns)
		//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'searchresults.length = ' + searchresults.length);	 
		if(searchresults != null)
		{
			nlapiLogExecution('DEBUG', 'getOpeningBalance', 'searchresults.length = ' + searchresults.length);
			var amount = '';
			var internalID = '';
			//var fxamount = '';
			var type = '';
			var previousInternalID = '';
			for (var i = 0;  i < searchresults.length; i++) 
			{
				//var value = searchresults[i].getValue('internalid');
				//previousInternalID = lastInternalID;
				////////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'previousInternalID = ' + previousInternalID);
				//internalID = value;
				////////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'internalID = ' + internalID);
				//var value1 = searchresults[i].getValue('amount');
				var value1 = searchresults[i].getValue("formulanumeric",null,"SUM");
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
		////////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction = ' + getOpeningBalancefunction);
		//totalfxamount = parseFloat(totalfxamount);
		//totalfxamount = Math.round(totalfxamount*100)/100;
		////////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction fx amount = ' +totalfxamount);
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
      			nlapiLogExecution('DEBUG', 'folder_results', 'folder_results = ' + folder_results);
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
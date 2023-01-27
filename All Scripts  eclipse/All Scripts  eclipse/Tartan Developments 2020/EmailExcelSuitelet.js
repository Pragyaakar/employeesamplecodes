		function suiteletStatementExcelEmail(request,response)
		{
		  	try
		  	{
		  		var recId = request.getParameter('custscript_custmrecid');
				var billAddress;
				var subsidiaryAddress;
				var currency;
				var amountDue;
				var startdate;
				var enddate;
				var subsidiary;
				var opentran =request.getParameter('cust_opentran');
				var AsDateof =request.getParameter('cust_asdate');//cust_asdate
				
				
				if(recId)
				{
					
					var recObj = nlapiLoadRecord('customrecord_cust_statement',recId);
				  
					var customer= recObj.getFieldValue('custrecord_custstat_customer'); 
					////nlapiLogExecution('DEBUG', 'aftr submit', "  customer==" + customer);
					
					var name= recObj.getFieldText('custrecord_custstat_customer');
					////nlapiLogExecution('DEBUG', 'aftr submit', "  customerName==" + customerName);
	
					var customerName = name.substr(name.indexOf(' ')+1);
					
					startdate= recObj.getFieldValue('custrecord_customerstat_startdate');
					////nlapiLogExecution('DEBUG', 'aftr submit', "  startdate  ==" + startdate);
	
					enddate= recObj.getFieldValue('custrecord_cust_statement_enddate');
					//enddate= new Date();
					//////nlapiLogExecution('DEBUG', 'aftr submit', "  enddate  ==" + enddate);
					
					currency = recObj.getFieldText('custrecord_custstat_currency');
					//nlapiLogExecution('DEBUG', 'aftr submit', "  currency  ==" + currency);
					
					var subsidiaryTx = recObj.getFieldText('custrecord_custstat_subsidiary');
					
					amountDue = recObj.getFieldValue('custrecord_custat_amt_due');
					// var tp = amountDue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
					//return amountDue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
					//////nlapiLogExecution('DEBUG', 'aftr submit', "  amountDue  ==" + amountDue);
					
					var billAddress = recObj.getFieldValue('custrecord_cust_address');
					//////nlapiLogExecution('DEBUG', 'aftr submit', "  billAddress  ==" + billAddress);
					if(billAddress == null)
					{
						billAddress =" ";
					}
					var subsidiary = recObj.getFieldValue('custrecord_custstat_subsidiary');
					//nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiary  ==" + subsidiary);
					var subnamenohirarchey;
					if(subsidiary!=null&&subsidiary!=''&&subsidiary!=undefined)
					{	
					var subsidiarySearch = nlapiSearchRecord("subsidiary",null,
							[
							   ["internalid","anyof",subsidiary]
							], 
							[
							   new nlobjSearchColumn("namenohierarchy")
							]
							);
						
					 subnamenohirarchey= subsidiarySearch[0].getValue( new nlobjSearchColumn("namenohierarchy"));
					//nlapiLogExecution('DEBUG', 'aftr submit', "  subnamenohirarchey  ==" + subnamenohirarchey);
					}
					
					//nlapiLogExecution('DEBUG', 'aftr submit', "  subnamenohirarchey  N==" + subnamenohirarchey);
					
					var subsidiaryText = recObj.getFieldText('custrecord_custstat_subsidiary');
					
					var subsdryAddrs;
	
				   if(subsidiary)
					{
						var s = nlapiLoadRecord("subsidiary", subsidiary,{recordmode: "dynamic"});
						subsdryAddrs = s.viewSubrecord("mainaddress").getFieldValue('addrtext');
						if(subsdryAddrs == null && subsdryAddrs == '' && subsdryAddrs == undefined)
						{
							subsdryAddrs ="";
						}
	                   SubsiGST = s.getFieldValue('custrecord_sub_gst');
	                    if(SubsiGST == null || SubsiGST == '' || SubsiGST == undefined)
	                    {
	                        SubsiGST = '';
	                    }
					}
				 
				 	var sub_addressID;
					var sub_city ;
					var sub_addressText2 ;
					var sub_addressText1 ;
					var sub_country ;
					var sub_addressID ;
					var sub_zip ;
					var sub_address;
					   
					sub_addressID = s.viewSubrecord("mainaddress").getFieldValue('internalid');
					if(sub_addressID == null && sub_addressID == '' && sub_addressID == undefined)
					{
					    sub_addressID = ' ';
					}
					//////nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressID);
					                      
					sub_addressText1 = s.viewSubrecord("mainaddress").getFieldValue('addressee');
					if(sub_addressText1 == null && sub_addressText1 == '' && sub_addressText1 == undefined)
					{
						sub_addressText1 = ' ';
					}
					//////nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressText1);
					 
					sub_addressText1 = s.viewSubrecord("mainaddress").getFieldValue('addr1');
					if(sub_addressText1 == null && sub_addressText1 == '' && sub_addressText1 == undefined)
					{
						sub_addressText1 = ' ';
					}
					//////nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressText1);
					  
					sub_addressText2 = s.viewSubrecord("mainaddress").getFieldValue('addr2');
					if(sub_addressText2 == null && sub_addressText2 == '' && sub_addressText2 == undefined)
					{
						sub_addressText2 = ' ';
					}
					//////nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressText2);
					 
					sub_city = s.viewSubrecord("mainaddress").getFieldValue('city');
					if(sub_city == null && sub_city == '' && sub_city == undefined)
					{
						sub_city = ' ';
					}
					//////nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_city);
					  
					sub_country = s.viewSubrecord("mainaddress").getFieldValue('country');
					if(sub_country == null && sub_country == '' && sub_country == undefined)
					{
						sub_country = ' ';
					}
					//////nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_country);
					 
					sub_zip = s.viewSubrecord("mainaddress").getFieldValue('zip');
					if(sub_zip == null && sub_zip == '' && sub_zip == undefined)
					{
						sub_zip = ' ';
					}
					//////nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_zip);
				}//end recId	  
				
					var CurrencyListArr1 =[];
					var customerRecord = nlapiLoadRecord('customer', customer);
					//////nlapiLogExecution('DEBUG','GET Value','customerRecord:'+customerRecord);
					var terms =customerRecord.getFieldText('terms');
					
					var numberOfAddress = customerRecord.getLineItemCount('addressbook');
					
					var subMachine = customerRecord.getLineItemCount('submachine');
					//////nlapiLogExecution('DEBUG','GET Value','subMachine:'+subMachine);
					
					var CurrencyList = customerRecord.getLineItemCount('currency');
					
					var CurrencyListArr=[];
					for (var x1 = 1; x1 <= subMachine; x1++)
					{
						var Linesubsi =customerRecord.getLineItemValue('submachine', 'subsidiary', x1);
						//////nlapiLogExecution('DEBUG','GET Value','Linesubsi:'+Linesubsi);
						
						var Linebalance = customerRecord.getLineItemValue('submachine','balance', x1);
						//////nlapiLogExecution('DEBUG','GET Value','Linebalance:'+Linebalance);
						
						var tp = Linebalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						
					 }
				
	
					   for (var x2 = 1; x2 <= CurrencyList; x2++)
					   {
						var lineCur =customerRecord.getLineItemValue('currency', 'currency', x2);
						
						var lineCur1 =customerRecord.getLineItemText('currency', 'currency', x2);
						nlapiLogExecution('DEBUG','GET Value','lineCur1:'+lineCur1);
						var balance = customerRecord.getLineItemValue('currency','balance',x2);
						var tp = balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						
						//////nlapiLogExecution('DEBUG','GET Value','lineCur:'+lineCur);
						
						CurrencyListArr.push(lineCur);
						
						CurrencyListArr1.push(lineCur1);
					   }
						//////nlapiLogExecution('DEBUG','GET Value','CurrencyListArr:'+CurrencyListArr);
						
					   
		//============================================ TAX REGISTRASTION NUM ==============================================
					   
						var gstList = customerRecord.getLineItemCount('taxregistration');
						
						var gstListArr=[];
						
						   for (var x3 = 1; x3 <= gstList; x3++)
						   {
								var registVal =customerRecord.getLineItemValue('taxregistration','taxregistrationnumber',x3);
								////nlapiLogExecution('DEBUG','GET Value','registVal:'+registVal);
								
								var gstText =customerRecord.getLineItemText('taxregistration','taxregistrationnumber',x3);
								////nlapiLogExecution('DEBUG','GET Value','gstText:'+gstText);
								
								break;
							//CurrencyListArr1.push(lineCur1);
						   }
							//////nlapiLogExecution('DEBUG','GET Value','CurrencyListArr:'+CurrencyListArr);
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
					   
					   var strName = " ";
					   //nlapiLogExecution('DEBUG','GET Value','CurrencyListArr :'+CurrencyListArr);
					   for (var z = 0; z < CurrencyListArr.length; z++) 
					   {
							//nlapiLogExecution('DEBUG','GET Value','CurrencyListArr.length :'+CurrencyListArr.length);
							var currency_a = CurrencyListArr[z];
							var linecurr = CurrencyListArr1[z];
							nlapiLogExecution('DEBUG','GET Value','linecurr :'+linecurr);
							if (currency_a != null && currency_a != '' && currency_a != undefined) 
							{
								if (z > 0) 
								{
								   
				                       strName += "<pbr/>";	
								}
								
								/*if(opentran != "T")
								{
									var openingBalance =  getOpeningBalance(customer, startdate, enddate,subsidiary,currency_a)
								}
								else
								{
									var openingBalance = 0.00;
								}*/
								
								var openingBalance =  getOpeningBalance(customer, startdate, enddate,subsidiary,currency_a,opentran)
								//nlapiLogExecution('DEBUG','GET Value','openingBalance Main Log= :'+openingBalance);
							////nlapiLogExecution('DEBUG','GET Value','subsidiary= :'+subsidiary);	
							if(subsidiary==18 || subsidiary==17 ||subsidiary==19)
							{	
								var url = 'https://6124671.app.netsuite.com/core/media/media.nl?id=439&c=6124671&h=bdd7e3bfde6cab145a2f'; 
							}
								
							else if(subsidiary==15)
							{
								var url = 'https://6124671.app.netsuite.com/core/media/media.nl?id=528&c=6124671&h=fac556c6354424379ad4';
							}	
							strName += "<br/><br/><br/><br/>";
							
							strName += "<table width=\"100\%\">";
							strName += "<tr>";
							strName += "<td>";
							strName +="<img height='100%' width='100%' src=\""+nlapiEscapeXML(url)+"\"></img>";//(SubsiLogo)
							strName += "</td>";
							strName += "<td colspan =\"5\" align=\"center\" font-size=\"16\"><b>CUSTOMER STATEMENT</b></td>";
							strName += "</tr>";
							strName += "</table><br/><br/><br/>";
							
							
							/*strName += "<table width=\"100\%\">";
							strName += "<tr>";
							strName += "<td width = \"6\%\" align=\"left\" font-size=\"10\" style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;background-color:#CCCCCC;\" ><b>Subsidiary Details</b></td>";
							strName += "<td width = \"30\%\" style=\"border-bottom:0px;border-top:0px;\"></td>";
							
							strName += "<td width = \"64\%\" rowspan=\"4\" align=\"left\" font-size=\"10\" style=\"border-left:0px;border-top:0px;border-bottom:0px;border-right:0px;\">" ;
							
							strName += "<table width=\"100\%\" cellpadding=\"0\" cellspacing=\"0\">";
						
							strName += "<tr>";
							strName += "<td font-size=\"10\" style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;background-color:#CCCCCC;text-align:left;\"><b>Statement Date</b></td>";	
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td font-size=\"10\" align=\"right\"  style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;text-align:right;\">"+enddate+"</td>";	
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td font-size=\"10\" align=\"right\"  style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;text-align:right;\"></td>";	
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td font-size=\"10\" style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;background-color:#CCCCCC;text-align:left;\"><b>Amount Due</b></td>";	
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td font-size=\"10\" align=\"right\"  style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;text-align:right;\">"+formatNumber(parseFloat(openingBalance).toFixed(2))+"</td>";	
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td font-size=\"10\" align=\"right\"  style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;text-align:right;\"></td>";	
							strName += "</tr>";
							
							
							strName += "<tr>";
							strName += "<td font-size=\"10\" style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;background-color:#CCCCCC;text-align:left;\"><b>Currency</b></td>";	
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td font-size=\"10\" align=\"right\"  style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;text-align:right;\">"+linecurr+"</td>";	
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td font-size=\"10\" style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;background-color:#CCCCCC;text-align:left;\"><b>Payment Terms</b></td>";	
							strName += "</tr>";
							strName += "<tr>";
							strName += "<td font-size=\"10\" align=\"right\"  style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;text-align:right;\">"+terms+"</td>";	
							strName += "</tr>";
							
							strName += "</table>";
							
							strName += "</td>";
							strName += "</tr>";
							  
							strName += "<tr>";
							strName += "<td style=\"border-left:1px;border-bottom:1px;border-right:1px;\" width = \"6\%\"  align=\"left\" font-size=\"10\"><b>"+nlapiEscapeXML(subnamenohirarchey)+"</b><br/>"+nlapiEscapeXML(subsdryAddrs)+"</td>";
							strName += "<td></td>";
							strName += "</tr>";
							    
							strName += "<tr>";
							strName += "<td align=\"left\" font-size=\"10\" style=\"border-left:1px;border-bottom:1px;border-right:1px;background-color:#CCCCCC;\"><b>Bill To</b></td>";
							strName += "<td></td>";
							strName += "</tr>";
							    
							strName += "<tr>";
							strName += "<td style=\"border-left:1px;border-bottom:1px;border-right:1px;\" width = \"6\%\"  align=\"left\" font-size=\"10\"><b>"+nlapiEscapeXML(customerName)+"</b><br/>"+nlapiEscapeXML(addressText1)+"</td>";
							strName += "<td></td>";
							strName += "</tr>";
							strName += "</table>";*/
							
							strName += "<table width = \"53%\" font-size=\"9.5\">";
							strName += "<tr>";
							strName += "<td>";
							
							
							strName += "<table width = \"50%\" font-size=\"9.5\" border = \"1\" style=\"float: left;\">";
							strName += "<tr>";
							strName += "<td width = \"10%\" align=\"left\" style=\"border-bottom:1px; background-color:#CCCCCC;\" colspan=\"2\"><span>&nbsp;<b>Subsidiary Details</b></span></td>";
							strName += "</tr>";
							
							strName += "<tr>";
						    strName += "<td width = \"20%\" align=\"left\" style=\"border-bottom:1px;\" colspan=\"2\"><span><b>"+nlapiEscapeXML(subnamenohirarchey)+"</b><br/>"+nlapiEscapeXML(subsdryAddrs)+"</span></td>";
							strName += "</tr>";
							   
							strName += "<tr>";
						    strName += "<td style=\"border-right:0px; border-bottom:0px;\"></td>";
							strName += "</tr>";
							
							strName += "<tr>";
						    strName += "<td style=\"border-right:0px; border-top:0px;\"></td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td width = \"10%\" align=\"left\" style=\"border-bottom:1px; background-color:#CCCCCC;\" colspan=\"2\"><span>&nbsp;<b>Bill To</b></span></td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td width = \"20%\" align=\"left\" colspan=\"2\"><span><b>"+nlapiEscapeXML(customerName)+"</b><br/>"+nlapiEscapeXML(addressText1)+"</span></td>";
							strName += "</tr>";
							strName += "</table>";
								
							strName += "</td>";		
							strName += "<td colspan=\"2\"></td>";	
							
							strName += "<td>";	
							strName += "<table width = \"50%\" font-size=\"9.5\" border = \"1\" style=\"float: left;\">";
							strName += "<tr>";
							strName += "<td align=\"left\" style=\"border-bottom:1px; background-color:#CCCCCC;\" colspan=\"3\"><span>&nbsp;<b>Statment Date</b></span></td>";
							strName += "</tr>";
							
							strName += "<tr>";
						    strName += "<td align=\"left\" style=\"border-bottom:1px;\" colspan=\"3\"><span>"+enddate+"</span></td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td align=\"left\" style=\"border-bottom:1px; background-color:#CCCCCC;\" line-height=\"12px\" colspan=\"3\"><span>&nbsp;<b>Amount Due</b></span></td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td align=\"left\" style=\"border-bottom:1px;\" colspan=\"3\"><span>"+formatNumber(parseFloat(openingBalance).toFixed(2))+"</span>&nbsp;&nbsp;</td>";
							strName += "</tr>";
				  
					        strName += "<tr>";
						    strName += "<td align=\"left\" style=\"border-bottom:1px; background-color:#CCCCCC;\" colspan=\"3\"><span>&nbsp;<b>Currency</b></span></td>";
						    strName += "</tr>";
						    
						    strName += "<tr>";
							strName += "<td align=\"left\" style=\"border-bottom:1px;\" colspan=\"3\"><span>"+linecurr+"</span></td>";
							strName += "</tr>";
				  
							strName += "<tr>";
							strName += "<td align=\"left\" style=\"border-bottom:1px; background-color:#CCCCCC;\" colspan=\"3\"><span>&nbsp;<b>Payment Terms</b></span></td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td align=\"left\" colspan=\"3\"><span>"+terms+"</span></td>";
							strName += "</tr>";
							strName += "</table>";
							
							strName += "</td>";	
							strName += "</tr>";	
							strName += "</table>";	
							
							/*strName += "<table width=\"100\%\">";
							strName += "<tr>";
							strName += "<td width = \"6\%\"  align=\"left\" font-size=\"10\" style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;\"><b>Subsidiary Details</b></td>";
							strName += "<td width = \"44\%\"  align=\"left\" font-size=\"10\" style=\"border-bottom:0px\"></td>";
							strName += "<td rowspan=\"1\" width = \"50\%\"  align=\"left\" font-size=\"10\" style=\"border-bottom:0px\">";
							
							strName += "<table width=\"100\%\">";
							strName += "<tr>";
							strName += "<td style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;background-color:#CCCCCC;text-align:left;\" >Statement</td>";	
							strName += "</tr>"	;
							strName += "<tr>";
							strName += "<td style=\"border-left:1px;border-top:1px;border-bottom:1px;border-right:1px;background-color:#CCCCCC;text-align:left;\">Date</td>";	
							strName += "</tr>"	;
							strName += "<tr>";
							strName += "<td>"+enddate+"</td>";	
							strName += "</tr>"	;
							
							strName += "</table>";
							strName += "</td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td style=\"border-left:1px;border-bottom:1px;border-right:1px;\" width = \"6\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(subsidiaryText)+"<br/>"+nlapiEscapeXML(subsdryAddrs)+"</td>";
							strName += "<td width = \"44\%\"  align=\"left\" font-size=\"10\" style=\"border-bottom:0px\"></td>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\" style=\"border-bottom:0px\"></td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td width = \"6\%\"  align=\"left\" font-size=\"10\" style=\"border-left:1px;border-bottom:1px;border-right:1px;background-color:#CCCCCC;\"></td>";
							strName += "<td width = \"44\%\"  align=\"left\" font-size=\"10\" style=\"border-bottom:0px\"></td>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\" style=\"border-bottom:0px\"></td>";
							strName += "</tr>";
							strName += "<tr>";
							strName += "<td style=\"border-left:1px;border-bottom:1px;border-right:1px;\" width = \"6\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(customerName)+"<br/>"+nlapiEscapeXML(addressText1)+"</td>";
							strName += "<td width = \"44\%\"  align=\"left\" font-size=\"10\" style=\"border-bottom:0px\"></td>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\" style=\"border-bottom:0px\"></td>";
							strName += "</tr>";*/
							
							
							/*strName += "<tr>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Customer Name</b></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(customerName)+"</td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>GSTN Number</b></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(registVal)+"</td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Statement Start Date</b></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+startdate+"</td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Statement End Date</b></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+enddate+"</td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Closing Balance</b></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+tp+"</td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Currency</b></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+lineCur1+"</td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary</b></td>";
							strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(subsidiaryText)+"</td>";
							strName += "</tr>";
							
	                        if(subsdryAddrs != null && subsdryAddrs != '' && subsdryAddrs != undefined)
	                        {
	                            strName += "<tr>";
	                            strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary Address</b></td>";
	                            strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(subsdryAddrs)+"</td>";
	                            strName += "</tr>";
	                        }
	                        strName += "<tr>";
	                        strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary&nbsp;GSTIN&nbsp;Number</b></td>";
	                        strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+SubsiGST+"</td>";
	                        strName += "</tr>";  
	                          
	                          
							if(addressText1 != null && addressText1 != '')
							{	
								strName += "<tr>";
								strName += "<td width = \"50\%\"  align=\"left\" font-size=\"10\"></td>";
								strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\"><b>Bill To</b></td>";
								strName += "<td width = \"25\%\"  align=\"left\" font-size=\"10\">"+nlapiEscapeXML(addressText1)+"</td>";
								strName += "</tr>";
							}
							*/
	
							/*strName += "</table>";*/
			
			//------------------------------------------Line Level Values------------------------------------------------
			
			//var lineCount = ffReqObj.getLineItemCount('item');
			strName += "<br/>";
			strName += "<table width=\"100\%\" border=\"solid 1px black\">";
			if((opentran =='T' ) && (AsDateof == null || AsDateof == '' || AsDateof == undefined))
			{
				strName += "<tr>";
				strName += "<td colspan =\"8\" align = \"center\" font-size=\"9.5\" border-right=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"100\%\"><b>Open Transaction</b></td>";
				strName += "</tr>";
			}	
			else if(AsDateof != null && AsDateof != '' && AsDateof != undefined)
			{
				strName += "<tr>";
				strName += "<td colspan =\"8\" align = \"center\" font-size=\"9.5\" border-right=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"100\%\"><b>As of Date Open Transaction</b></td>";
				strName += "</tr>";
			}
			
			strName += "<tr>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"18\%\"><p style=\"text-align: center;\"><b>Document No</b></p></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\"><b>Memo</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\"><b>Description</b></td>";
			//strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\"><b>Document<br/>Type</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25\%\"><b>Document<br/>Date</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"17\%\"><b>Due Date</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>Debit</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>Credit</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>Balance</b></td>";
			strName += "</tr>";
			
			if((opentran =='T' ) && (AsDateof == null || AsDateof == '' || AsDateof == undefined))
			{
			strName += "<tr>";
			strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"18\%\"><b></b></td>";
			strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"35\%\"><b></b></td>";
			strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"27\%\"><b></b></td>";
			//strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"28\%\"><b></b></td>";
			strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"25\%\"><b></b></td>";
			strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"17\%\"><p style=\"text-align: center;\"><b>Opening Balance</b></p></td>";
			strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
			strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
			strName += "<td   align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(parseFloat(openingBalance).toFixed(2))+"</b></td>";
			strName += "</tr>";
			}
			
			if((opentran !='T') && (AsDateof == null || AsDateof == '' || AsDateof == undefined))
			{	
				////nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'opentran is not TRUE== ' + opentran);
				var updateOpeningBal = parseFloat(openingBalance);
				var columns = new Array();
				columns[0] = new nlobjSearchColumn('internalid');
				columns[1] = new nlobjSearchColumn('total');
			 	var filters = new Array();
			 	//filters.push(new nlobjSearchFilter('subsidiary', null, 'anyof', subsidiary));
			 	filters.push(new nlobjSearchFilter('entity', null, 'is', customer));
			 	filters.push(new nlobjSearchFilter ('trandate', null, 'onorafter',startdate));
			 	filters.push(new nlobjSearchFilter ('trandate', null, 'onorbefore', enddate));
			 	filters.push(new nlobjSearchFilter ('currency', null, 'anyof', currency_a));
				//var searchResults = nlapiSearchRecord('transaction', 'customsearch_customer_statment_search', filters, columns);
			 	var searchResults = nlapiSearchRecord('transaction', 'customsearch_statement_search_wop', filters, columns);
				//////nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'openingBalance = end ');
			 	////nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'searchResults= '+searchResults);
			 	var breakFlag = 0;
			 	if (searchResults != null && searchResults != '')
			 	{
			 		var length = searchResults.length;
			 		//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result length = ' + length);
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
					
					for (var i = 0;  i < searchResults.length; i++) 
					{
						var recordCount = recordCount + 1;
						var val_docid = searchResults[i].getValue('tranid');
						var val_desc;
						var val_docdate = searchResults[i].getValue('trandate');
						var val_duedate = searchResults[i].getValue('duedate');
						
						
						var value = searchResults[i].getValue('internalid');
						internalID = value;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'internalID = ' + internalID);
						previousInternalID = internalID;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'previousInternalID = ' + previousInternalID);
						var value1 = searchResults[i].getValue('total');
						//var value1 = searchResults[i].getValue('fxamount');
						amount = parseFloat(value1);
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'Amount = ' + amount);
						amount = parseFloat(amount);
						
						var value2 = searchResults[i].getValue('tranid');
						transactionnumber =  value2;
						////nlapiLogExecution('DEBUG', 'ScheduleTest', 'transactionnumber = ' + transactionnumber);
						
						
						var value3 = searchResults[i].getValue('trandate');
						date = value3;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'date = ' + date);
						
						var value4 = searchResults[i].getValue('memo');
						memo = value4;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'memo = ' + memo);
						
						
						//var value5 = searchResults[i].getValue('debitamount');
						var value5 = searchResults[i].getValue('debitfxamount');					
						if( value5 == '')
						{
							value5 =0;
						}
						
						debitamount = value5;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'debitamount = ' + debitamount);
					
						total_debitamount += parseFloat(debitamount);
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_debitamount = ' + total_debitamount);
						
						//var value6 = searchResults[i].getValue('creditamount');
						var value6 = searchResults[i].getValue('creditfxamount');
						if(value6 == '')
						{
							value6 =0;
						}
						creditamount = parseFloat(value6);
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'creditamount = ' + creditamount);
						
						
						
						total_creditamount +=parseFloat(creditamount)
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_creditamount = ' + total_creditamount);
						
						var value7 = searchResults[i].getValue('type');
						type = value7;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'type = ' + type);
						
						var value8 = searchResults[i].getValue('custcolbnumber');
						var BillNo = value8;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'BillNo = ' + BillNo);
						
						var value9 = searchResults[i].getValue("custcolbdate");
						var billDate = value9;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'billDate = ' + billDate);
						
						
						if(debitamount!=null && debitamount!=''&& debitamount!=undefined&& debitamount !=0)
						{
							updateOpeningBal=parseFloat(updateOpeningBal) + parseFloat(debitamount);
							////nlapiLogExecution('DEBUG', 'ScheduleTest', 'if debit is not null= ' + updateOpeningBal);
						}
						else
						{
							debitamount=0.00;
							updateOpeningBal=parseFloat(updateOpeningBal) + parseFloat(debitamount);
							////nlapiLogExecution('DEBUG', 'ScheduleTest', 'if debit is null= ' + updateOpeningBal);
						}	
						
						if(creditamount!=null && creditamount!=''&& creditamount!=undefined&& creditamount !=0)
						{
							updateOpeningBal=parseFloat(updateOpeningBal)-parseFloat(creditamount);
							////nlapiLogExecution('DEBUG', 'ScheduleTest', 'if crdeit is not null= ' + updateOpeningBal);
						}
						else
						{
							creditamount=0.00;
							updateOpeningBal=parseFloat(updateOpeningBal)-parseFloat(creditamount);
							////nlapiLogExecution('DEBUG', 'ScheduleTest', 'if crdeit is null= ' + updateOpeningBal);
						}	
						
						/*if(i == 0)
						{	
							col_Bal =parseFloat(openingBalance) - parseFloat(debitamount) +parseFloat(creditamount);
							//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'col_Bal-debit = ' + col_Bal);
							cr_col_bal =col_Bal;
						}
						else if(i > 0)
						{
							col_Bal =parseFloat(cr_col_bal)-parseFloat(debitamount)+parseFloat(creditamount);
							//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'col_Bal-credit = ' + col_Bal);
							cr_col_bal =col_Bal;
						}
						
						
						if (i >= 900) {
							if (previousInternalID != internalID)
							{
								breakFlag = 1;
							} // END if(previousInternalID != internalID)
						}*/
						
	
						strName += "<tr>";
							
							/*if (date != null && date != '' && date != undefined) 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+date+"</td>";
							}
							else 
							{
								date =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+date+"</td>";
							}*/
						
						
						if (val_docid != null && val_docid != '' && val_docid != undefined) 
						{
							strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"18\%\">"+val_docid+"</td>";
						}
						else 
						{
							val_docid =' ';
							strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"18\%\">"+val_docid+"</td>";
						}
							
							/*if (BillNo != null && BillNo != '' && BillNo != undefined ) 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+BillNo+"</td>";
							}
							else 
							{
								BillNo =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+BillNo+"</td>";
							}*/
						if (memo != null && memo != '' && memo != undefined ) 
						{
							strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+memo+"</td>";
						}
						else 
						{
							memo =' ';
							strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+memo+"</td>";
						}	
							if (type != null && type != '' && type != undefined ) 
							{
								strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+type+"</td>";
							}
							else 
							{
								type =' ';
								strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+type+"</td>";
							}
							
							/*if (type != null && type != '' && type != undefined) 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\">"+type+"</td>";
							}
							else 
							{
								type =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\">"+type+"</td>";
							}
								*/
	
							/*if (transactionnumber != null && transactionnumber != '' && transactionnumber != undefined) 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+transactionnumber+"</td>";
							}
							else 
							{
								transactionnumber =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+transactionnumber+"</td>";
							}*/
							if (val_docdate != null && val_docdate != '' && val_docdate != undefined) 
							{
								strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25\%\">"+val_docdate+"</td>";
							}
							else 
							{
								val_docdate =' ';
								strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25\%\">"+val_docdate+"</td>";
							}
							if (val_duedate != null && val_duedate != '' && val_duedate != undefined) 
							{
								strName += "<td padding = \"1\" align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"17\%\" style=\"word-break: break-all; white-space: normal;\">"+val_duedate+"</td>";
							}
							else 
							{
								val_duedate =' ';
								strName += "<td padding = \"1\" align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"17\%\" style=\"word-break: break-all; white-space: normal;\">"+val_duedate+"</td>";
							}
							
	
							if (debitamount == null && debitamount == '' && debitamount == undefined && debitamount == 'NaN' ) 
							{
								
									debitamount ='0';
									strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(debitamount)+"</td>";
						
							}
							else 
							{
								
								strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(debitamount)+"</td>";
							}
							
							if (creditamount == null && creditamount == '' && creditamount == undefined && creditamount == 'NaN') 
							{
						
									creditamount =' ';
									strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(creditamount)+"</td>";
					
							}
							else 
							{
								strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(creditamount)+"</td>";
							}
							
							if (updateOpeningBal == null && updateOpeningBal == '' && updateOpeningBal == undefined && updateOpeningBal == 'NaN') 
							{
						
								updateOpeningBal =' ';
									strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(updateOpeningBal)+"</td>";
					
							}
							else 
							{
								strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(updateOpeningBal.toFixed(2))+"</td>";
							}
							var EndColBal = parseFloat(EndColBal) +parseFloat(col_Bal);
							 strName += "</tr>";
								
						
							 
							 
						}  //END FOR(var i = 0;  i < searchResults.length; i++) 
			            
	
					var fin_debit=parseFloat(total_debitamount);//+parseFloat(openingBalance);
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
			  var EndBal = formatNumber(s.toFixed(2));
			  //////nlapiLogExecution('DEBUG', 'ScheduleTest', 'EndBal = ' + EndBal);
			   
			  //var newEndBal = -(EndBal);
			  
			//-----------------------------Fetch Values-------------------------------------------
			
			  	
				
				strName += "<tr>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
				/*strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\"></td>";*/
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\"><b>Total</b></td>";
		     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>"+DebitAmount+"</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>"+CreditAmount+"</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(updateOpeningBal.toFixed(2))+"</b></td>";
				strName += "</tr>";
				
			
				strName += "<tr>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"27\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"27\%\"><b></b></td>";
				/*strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"28\%\"><b></b></td>";*/
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
				strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"40\%\"><b>Closing Balance</b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
				strName += "<td   align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(updateOpeningBal.toFixed(2))+"</b></td>";
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
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
				/*strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\"></td>";*/
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\"><b>Total</b></td>";
		     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>0.00</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>0.00</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+FinBal+"</b></td>";
				strName += "</tr>";
			
			
				
			  strName += "</table>";
			}
		}//Open transaction check ends here....
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			else if((opentran =='T') && (AsDateof == null || AsDateof == '' || AsDateof == undefined))
			{
				
				////nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'opentran is not TRUE== ' + opentran);
				var updateOpeningBal = parseFloat(openingBalance);
				var columns = new Array();
				columns[0] = new nlobjSearchColumn('internalid');
				columns[1] = new nlobjSearchColumn('total');
			 	var filters = new Array();
			 	//filters.push(new nlobjSearchFilter('subsidiary', null, 'anyof', subsidiary));
			 	filters.push(new nlobjSearchFilter('entity', null, 'is', customer));
			 	filters.push(new nlobjSearchFilter ('trandate', null, 'onorafter',startdate));
			 	filters.push(new nlobjSearchFilter ('trandate', null, 'onorbefore', enddate));
			 	filters.push(new nlobjSearchFilter ('currency', null, 'anyof', currency_a));
				//var searchResults = nlapiSearchRecord('transaction', 'customsearch_customer_statment_search', filters, columns);
			 	var searchResults = nlapiSearchRecord('transaction', 'customsearch_customer_statement_op', filters, columns);
				//////nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'openingBalance = end ');
			 	////nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'searchResults= '+searchResults);
			 	var breakFlag = 0;
			 	if (searchResults != null && searchResults != '')
			 	{
			 		var length = searchResults.length;
			 		//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result length = ' + length);
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
					
					for (var i = 0;  i < searchResults.length; i++) 
					{
						var recordCount = recordCount + 1;
						var val_docid = searchResults[i].getValue('tranid');
						var val_desc;
						var val_docdate = searchResults[i].getValue('trandate');
						var val_duedate = searchResults[i].getValue('duedate');
						
						
						var value = searchResults[i].getValue('internalid');
						internalID = value;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'internalID = ' + internalID);
						previousInternalID = internalID;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'previousInternalID = ' + previousInternalID);
						var value1 = searchResults[i].getValue('total');
						//var value1 = searchResults[i].getValue('fxamount');
						amount = parseFloat(value1);
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'Amount = ' + amount);
						amount = parseFloat(amount);
						
						var value2 = searchResults[i].getValue('tranid');
						transactionnumber =  value2;
						////nlapiLogExecution('DEBUG', 'ScheduleTest', 'transactionnumber = ' + transactionnumber);
						
						
						var value3 = searchResults[i].getValue('trandate');
						date = value3;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'date = ' + date);
						
						var value4 = searchResults[i].getValue('memo');
						memo = value4;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest Date', 'memo = ' + memo);
						
						
						//var value5 = searchResults[i].getValue('debitamount');
						var value5 = searchResults[i].getValue('debitfxamount');					
						if( value5 == '')
						{
							value5 =0;
						}
						
						debitamount = value5;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'debitamount = ' + debitamount);
					
						total_debitamount += parseFloat(debitamount);
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_debitamount = ' + total_debitamount);
						
						//var value6 = searchResults[i].getValue('creditamount');
						var value6 = searchResults[i].getValue('creditfxamount');
						if(value6 == '')
						{
							value6 =0;
						}
						creditamount = parseFloat(value6);
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'creditamount = ' + creditamount);
						
						
						
						total_creditamount +=parseFloat(creditamount)
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'total_creditamount = ' + total_creditamount);
						
						var value7 = searchResults[i].getValue('type');
						type = value7;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'type = ' + type);
						
						var value8 = searchResults[i].getValue('custcolbnumber');
						var BillNo = value8;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'BillNo = ' + BillNo);
						
						var value9 = searchResults[i].getValue("custcolbdate");
						var billDate = value9;
						//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'billDate = ' + billDate);
						
						
						if(debitamount!=null && debitamount!=''&& debitamount!=undefined&& debitamount !=0)
						{
							updateOpeningBal=parseFloat(updateOpeningBal) + parseFloat(debitamount);
							////nlapiLogExecution('DEBUG', 'ScheduleTest', 'if debit is not null= ' + updateOpeningBal);
						}
						else
						{
							debitamount=0.00;
							updateOpeningBal=parseFloat(updateOpeningBal) + parseFloat(debitamount);
							////nlapiLogExecution('DEBUG', 'ScheduleTest', 'if debit is null= ' + updateOpeningBal);
						}	
						
						if(creditamount!=null && creditamount!=''&& creditamount!=undefined&& creditamount !=0)
						{
							updateOpeningBal=parseFloat(updateOpeningBal)-parseFloat(creditamount);
							////nlapiLogExecution('DEBUG', 'ScheduleTest', 'if crdeit is not null= ' + updateOpeningBal);
						}
						else
						{
							creditamount=0.00;
							updateOpeningBal=parseFloat(updateOpeningBal)-parseFloat(creditamount);
							////nlapiLogExecution('DEBUG', 'ScheduleTest', 'if crdeit is null= ' + updateOpeningBal);
						}	
						
						/*if(i == 0)
						{	
							col_Bal =parseFloat(openingBalance) - parseFloat(debitamount) +parseFloat(creditamount);
							//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'col_Bal-debit = ' + col_Bal);
							cr_col_bal =col_Bal;
						}
						else if(i > 0)
						{
							col_Bal =parseFloat(cr_col_bal)-parseFloat(debitamount)+parseFloat(creditamount);
							//////nlapiLogExecution('DEBUG', 'ScheduleTest', 'col_Bal-credit = ' + col_Bal);
							cr_col_bal =col_Bal;
						}
						
						
						if (i >= 900) {
							if (previousInternalID != internalID)
							{
								breakFlag = 1;
							} // END if(previousInternalID != internalID)
						}*/
						
	
						strName += "<tr>";
							
							/*if (date != null && date != '' && date != undefined) 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+date+"</td>";
							}
							else 
							{
								date =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+date+"</td>";
							}*/
						
						
						if (val_docid != null && val_docid != '' && val_docid != undefined) 
						{
							strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"18\%\">"+val_docid+"</td>";
						}
						else 
						{
							val_docid =' ';
							strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"18\%\">"+val_docid+"</td>";
						}
							
							/*if (BillNo != null && BillNo != '' && BillNo != undefined ) 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+BillNo+"</td>";
							}
							else 
							{
								BillNo =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+BillNo+"</td>";
							}*/
						if (memo != null && memo != '' && memo != undefined ) 
						{
							strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+memo+"</td>";
						}
						else 
						{
							memo =' ';
							strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+memo+"</td>";
						}	
							if (billDate != null && billDate != '' && billDate != undefined ) 
							{
								strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+billDate+"</td>";
							}
							else 
							{
								billDate =' ';
								strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+billDate+"</td>";
							}
							
							/*if (type != null && type != '' && type != undefined) 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\">"+type+"</td>";
							}
							else 
							{
								type =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\">"+type+"</td>";
							}
								*/
	
							/*if (transactionnumber != null && transactionnumber != '' && transactionnumber != undefined) 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+transactionnumber+"</td>";
							}
							else 
							{
								transactionnumber =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+transactionnumber+"</td>";
							}*/
							if (val_docdate != null && val_docdate != '' && val_docdate != undefined) 
							{
								strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25\%\">"+val_docdate+"</td>";
							}
							else 
							{
								val_docdate =' ';
								strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25\%\">"+val_docdate+"</td>";
							}
							if (val_duedate != null && val_duedate != '' && val_duedate != undefined) 
							{
								strName += "<td padding = \"1\" align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"17\%\" style=\"word-break: break-all; white-space: normal;\">"+val_duedate+"</td>";
							}
							else 
							{
								val_duedate =' ';
								strName += "<td padding = \"1\" align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"17\%\" style=\"word-break: break-all; white-space: normal;\">"+val_duedate+"</td>";
							}
							
	
							if (debitamount == null && debitamount == '' && debitamount == undefined && debitamount == 'NaN' ) 
							{
								
									debitamount ='0';
									strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(debitamount)+"</td>";
						
							}
							else 
							{
								
								strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(debitamount)+"</td>";
							}
							
							if (creditamount == null && creditamount == '' && creditamount == undefined && creditamount == 'NaN') 
							{
						
									creditamount =' ';
									strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(creditamount)+"</td>";
					
							}
							else 
							{
								strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(creditamount)+"</td>";
							}
							
							if (updateOpeningBal == null && updateOpeningBal == '' && updateOpeningBal == undefined && updateOpeningBal == 'NaN') 
							{
						
								updateOpeningBal =' ';
									strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(updateOpeningBal)+"</td>";
					
							}
							else 
							{
								strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(updateOpeningBal.toFixed(2))+"</td>";
							}
							var EndColBal = parseFloat(EndColBal) +parseFloat(col_Bal);
							 strName += "</tr>";
								
						
							 
							 
						}  //END FOR(var i = 0;  i < searchResults.length; i++) 
			            
	
					var fin_debit=parseFloat(total_debitamount);//+parseFloat(openingBalance);
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
			  var EndBal = formatNumber(s.toFixed(2));
			  //////nlapiLogExecution('DEBUG', 'ScheduleTest', 'EndBal = ' + EndBal);
			   
			  //var newEndBal = -(EndBal);
			  
			//-----------------------------Fetch Values-------------------------------------------
			
			  	
				
				strName += "<tr>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
				/*strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\"></td>";*/
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\"><b>Total</b></td>";
		     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>"+DebitAmount+"</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>"+CreditAmount+"</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(updateOpeningBal.toFixed(2))+"</b></td>";
				strName += "</tr>";
				
			
				strName += "<tr>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"27\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"27\%\"><b></b></td>";
				/*strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"28\%\"><b></b></td>";*/
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
				strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"40\%\"><b>Closing Balance</b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
				strName += "<td   align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(updateOpeningBal.toFixed(2))+"</b></td>";
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
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
				/*strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\"></td>";*/
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\"><b>Total</b></td>";
		     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>0.00</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>0.00</b></td>";
				strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+FinBal+"</b></td>";
				strName += "</tr>";
			
			
				
			  strName += "</table>";
			}
		
			}	
			else if(AsDateof != null && AsDateof != '' && AsDateof != undefined)
			{


				
				////nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'opentran is not TRUE== ' + opentran);
				var columns = new Array();
				columns[0] = new nlobjSearchColumn('internalid');
				columns[1] = new nlobjSearchColumn("fxamount");
			 	var filters = new Array();
			 	//filters.push(new nlobjSearchFilter('subsidiary', null, 'anyof', subsidiary));
			 	filters.push(new nlobjSearchFilter('name', null, 'anyof', customer));
			 	// filters.push(new nlobjSearchFilter ('trandate', null, 'onorafter',startdate));
			 	filters.push(new nlobjSearchFilter ('trandate', null, 'onorbefore', AsDateof));
			 	filters.push(new nlobjSearchFilter ('currency', null, 'anyof', currency_a));
				var searchResults = nlapiSearchRecord('transaction', 'customsearch_ar_report', filters, columns);
				////nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'searchResults= '+searchResults);
			 	var breakFlag = 0;
			 	
			 	var ReportMap={};
			 	var ReportMap1={};
			 	if (searchResults != null && searchResults != '')
			 	{
			 		var Length = searchResults.length;
			 		
			 		for(var y=0;y<Length;y++)
			 		{
			 		      var InterId = searchResults[y].getValue("internalid");
			 			  var Name = searchResults[y].getValue("entity");
						  var DocNum = searchResults[y].getValue("tranid");
						  var tranDate = searchResults[y].getValue("trandate");
						  var Memo = searchResults[y].getValue("memo");
						  var Type = searchResults[y].getValue("type");
						  var tranAmt =searchResults[y].getValue("fxamount");
						  var Balance = searchResults[y].getValue("fxamountremaining");
						  var DebitAmt = searchResults[y].getValue("debitfxamount");
						  var CreditAmt = searchResults[y].getValue("creditfxamount");
						  var PayDate = searchResults[y].getValue("trandate","applyingTransaction");
						  var DueDate = searchResults[y].getValue("duedate");
						  
						  var PayAmt =searchResults[y].getValue("fxamount","applyingTransaction");
						  
						  if((PayAmt != null && PayAmt != undefined && PayAmt != '') && (PayDate != null && PayDate !=''))
						  {
							  PayAmt= parseFloat(PayAmt);
						  }
						  else
						  {
							  PayAmt =0.00;
						  }
						  
						  if(DebitAmt != null && DebitAmt != undefined && DebitAmt != '')
						  {
							  DebitAmt= parseFloat(DebitAmt);
						  }
						  else
						  {
							  DebitAmt =0.00;
						  }
						  
						  if(CreditAmt != null && CreditAmt != undefined && CreditAmt != '')
						  {
							  CreditAmt= parseFloat(CreditAmt);
						  }
						  else
						  {
							  CreditAmt =0.00;
						  }
						  
						  nlapiLogExecution('DEBUG', 'getOpeningBalance', 'ReportMap = ' + searchResults.length);
							
						  
						  if(ReportMap[InterId])
						  {
							  ReportMap[InterId]=InterId;
							  ReportMap1[InterId]=InterId;
							  
							  ReportMap['docno-'+InterId]=DocNum;
							  ReportMap['date-'+InterId]=tranDate;
							  ReportMap['memo-'+InterId]=Memo;
							  ReportMap['type-'+InterId]=Type;
							  ReportMap['debamt-'+InterId]=DebitAmt;
							  ReportMap['credamt-'+InterId]=CreditAmt;
							  
							  if(nlapiStringToDate(PayDate) <= nlapiStringToDate(AsDateof))
							  {
								  ReportMap['payamt-'+InterId]=parseFloat(ReportMap['payamt-'+InterId])+parseFloat(PayAmt);
							  }
							  ReportMap['duedate-'+InterId]=DueDate;
							  
						  }else
						  {
							  ReportMap[InterId]=InterId;
							  ReportMap1[InterId]=InterId;
							  ReportMap['docno-'+InterId]=DocNum;
							  ReportMap['date-'+InterId]=tranDate;
							  ReportMap['memo-'+InterId]=Memo;
							  ReportMap['type-'+InterId]=Type;
							  ReportMap['debamt-'+InterId]=DebitAmt;
							  ReportMap['credamt-'+InterId]=CreditAmt;
							  if(nlapiStringToDate(PayDate) <= nlapiStringToDate(AsDateof))
							  {
							    ReportMap['payamt-'+InterId]=PayAmt;
							  }
							  else
							  {
								  ReportMap['payamt-'+InterId]=0.00;
							  }
							  ReportMap['duedate-'+InterId]=DueDate;
						  }
			 		}
			 nlapiLogExecution('DEBUG', 'getOpeningBalance', 'ReportMap = ' + JSON.stringify(ReportMap));
			 		
			 		var MapKey = Object.keys(ReportMap1);
				var totDeb =0.00;
				var totCred =0.00;
				var totBal =0.00;
				 var Balance=0.00;
				 
				 var typeMap={};
				 typeMap['CashSale']='Cash Sale';
				 typeMap['CashRfnd']='Cash Refund';
				 typeMap['Check']='Check';
				 typeMap['CardChrg']='Credit Card';
				 typeMap['CustCred']='Credit Memo';
				 typeMap['Journal']='Journal';
				 typeMap['CustInvc']='Invoice';
				 typeMap['CustPymt']='Payment';
			//	nlapiLogExecution('DEBUG', 'getOpeningBalance', 'ReportMap = ' + searchResults.length);
						for(var j=0;j<MapKey.length;j++)
							{
							 
							  var CustDocNum = ReportMap['docno-'+MapKey[j]];
							  var CusttranDate =ReportMap['date-'+MapKey[j]];
							  var CustMemo = ReportMap['memo-'+MapKey[j]];
							  var CustCredit = ReportMap['credamt-'+MapKey[j]];
							  var CustDebit =ReportMap['debamt-'+MapKey[j]];
							  var CustPayAmt = ReportMap['payamt-'+MapKey[j]];
							  var DueDate=ReportMap['duedate-'+MapKey[j]];//DueDate
							
							  var Type=ReportMap['type-'+MapKey[j]];//DueDate
								
							  
							 	if(CustPayAmt < 0)
							 	{
							 		CustPayAmt = -(CustPayAmt);
							 	}
							  
							  
							  if((CustDebit !=null && CustDebit != undefined && CustDebit !=''))
							  {
								  CustDebit =parseFloat(CustDebit)-parseFloat(CustPayAmt);
							  }
							  else
							  {
								  CustDebit =0.00;
							  }
							  
							  if((CustCredit !=null && CustCredit != undefined && CustCredit !=''))
							  {
								  CustCredit =parseFloat(CustCredit)-parseFloat(CustPayAmt);
							  }
							  else
							  {
								  CustCredit =0.00;
							  }
							  
							  Balance = parseFloat(Balance)+parseFloat(CustDebit)-parseFloat(CustCredit);
							  
							  totDeb +=parseFloat(CustDebit);
							  totCred +=parseFloat(CustCredit);
							  
							  strName += "<tr>";
								
								
								if (CustDocNum != null && CustDocNum != '' && CustDocNum != undefined) 
								{
									strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"18\%\">"+CustDocNum+"</td>";
								}
								else 
								{
									CustDocNum =' ';
									strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"18\%\">"+CustDocNum+"</td>";
								}
									
						
								if (CustMemo != null && CustMemo != '' && CustMemo != undefined ) 
								{
									strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+CustMemo+"</td>";
								}
								else 
								{
									CustMemo =' ';
									strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\">"+CustMemo+"</td>";
								
								}	
								
								if(typeMap[Type] != null && typeMap[Type] != undefined && typeMap[Type] !='')
								{
									
									strName += "<td padding = \"1\" align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"17\%\" style=\"word-break: break-all; white-space: normal;\">"+typeMap[Type]+"</td>";
										
								}
								else
								{
									strName += "<td padding = \"1\" align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"17\%\" style=\"word-break: break-all; white-space: normal;\"></td>";
									
								}
								
								
									if (CusttranDate != null && CusttranDate != '' && CusttranDate != undefined ) 
									{
										strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+CusttranDate+"</td>";
									}
									else 
									{
										CusttranDate =' ';
										strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"27\%\">"+CusttranDate+"</td>";
									}
									
						
									if (DueDate != null && DueDate != '' && DueDate != undefined) 
									{
										strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25\%\">"+DueDate+"</td>";
									}
									else 
									{
										DueDate =' ';
										strName += "<td align = \"center\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25\%\">"+DueDate+"</td>";
									}
									
									if ((CustDebit == null && CustDebit == '' && CustDebit == undefined && CustDebit == 'NaN')||(CustDebit != null && CustDebit ==0.00) ) 
									{
										
										CustDebit =' ';
											strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(CustDebit)+"</td>";
								
									}
									else 
									{
										
										strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(parseFloat(CustDebit).toFixed(2))+"</td>";
									}
									
									if ((CustCredit == null && CustCredit == '' && CustCredit == undefined && CustCredit == 'NaN')||(CustCredit != null && CustCredit ==0.00)) 
									{
								
										CustCredit =' ';
											strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(CustCredit)+"</td>";
							
									}
									else 
									{
										strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">" +formatNumber(parseFloat(CustCredit).toFixed(2))+"</td>";
									}
									
									if (Balance == null && Balance == '' && Balance == undefined && Balance == 'NaN') 
									{
								
										Balance =' ';
											strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(Balance)+"</td>";
							
									}
									else 
									{
										strName += "<td align = \"right\" font-size=\"7\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(parseFloat(Balance).toFixed(2))+"</td>";
									}
									
									strName += "</tr>";
										
							  
							}
					  	
						totBal =parseFloat(totDeb)-parseFloat(totCred);
						  
						strName += "<tr>";
						strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
						strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
						strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
						strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\"></td>";
						//strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
						strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\"><b>Total</b></td>";
				     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(totDeb.toFixed(2))+"</b></td>";
						strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(totCred.toFixed(2))+"</b></td>";
						strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(totBal.toFixed(2))+"</b></td>";
						strName += "</tr>";
						
					
						strName += "<tr>";
						strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
						strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"27\%\"><b></b></td>";
						strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"27\%\"><b></b></td>";
						strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"28\%\"><b></b></td>";
						//strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
						strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"40\%\"><b>Closing Balance</b></td>";
						strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
						strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
						strName += "<td   align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(totBal.toFixed(2))+"</b></td>";
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
					strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
					/*strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"28\%\"></td>";*/
					strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\"><b>Total</b></td>";
			     	strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>0.00</b></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>0.00</b></td>";
					strName += "<td  background-color = \"#DEDBDB\" align = \"right\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+FinBal+"</b></td>";
					strName += "</tr>";
				
				
					
				  strName += "</table>";
				}
			
			
			}
		}//if (currency_a != null && currency_a != '' && currency_a != undefined)
			
		
					   
		}//end else for loop
			
			
					   var xml = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns="http://www.w3.org/TR/REC-html40">'+
					  	'<head>'+
						 '<style type="text/css">'+
					 'table {white-space:normal;mso-displayed-decimal-separator:"\.";'+
					 'mso-displayed-thousand-separator:"\,";}'+
					 'col{mso-width-source:auto;}'+
					 'td{font-size:12pt;font-family:Calibri;white-space:normal;}'+
					 'th{font-size:12pt;font-family:Calibri;}'+
					 '.hiddenDataField{background-color:red;}'+
					 '@Page{ '+
					 'mso-page-orientation:portrait;'+
					// xml += "mso-header-data:'s_fooeraddress';"+
					
					//'mso-header-data:"STARLINK LOGO";'+
					 //'mso-footer-data:"starlink address";'+
				'margin:1.0in .75in 1.0in .75in;'+
				'mso-header-margin:.5in;'+
				//'mso-footer-margin:.5in;'+
				'}'+
				'</style>';
				 
	
				xml += '<!--[if gte mso 9]><xml>'+
				'<x:ExcelWorkbook>'+
				'<x:ExcelWorksheets>'+
				'<x:ExcelWorksheet>'+
				 
	
				'<x:Name>Delivery Advice</x:Name>'+
				'<x:WorksheetOptions>'+
				'<x:PageSetup>'+
				'<x:Layout/>'+
				'<x:PageMargins/>'+
	
	
				'</x:PageSetup>'+
				'<x:FitToPage/>'+
				'<x:Print>'+
				'<x:ValidPrinterInfo/>'+
				'<x:FitHeight>100</x:FitHeight>'+
				'<x:FitWidth>1</x:FitWidth>'+
				'<x:PaperSizeIndex>9</x:PaperSizeIndex>'+
				'<x:HorizontalResolution>600</x:HorizontalResolution>'+
				'<x:VerticalResolution>600</x:VerticalResolution>'+
				'</x:Print>'+
				'<x:Selected/>'+
				'<x:ProtectContents>False</x:ProtectContents>'+
				'<x:ProtectObjects>False</x:ProtectObjects>'+
				'<x:ProtectScenarios>False</x:ProtectScenarios>'+
				'</x:WorksheetOptions>'+
	
				'</x:ExcelWorksheet>'+
				'</x:ExcelWorksheets>'+
				'<x:WindowHeight>12780</x:WindowHeight>'+
				'<x:WindowWidth>19035</x:WindowWidth>'+
				'<x:WindowTopX>0</x:WindowTopX>'+
				'<x:WindowTopY>15</x:WindowTopY>'+
				'<x:ProtectStructure>False</x:ProtectStructure>'+
				'<x:ProtectWindows>False</x:ProtectWindows>'+
				'</x:ExcelWorkbook>'+
				'</xml><![endif]-->'+
				'</head>';
						  xml += "<body size= \"A4\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">";
						  //xml += "<body margin-top=\"1pt\" header-height=\"4em\" footer=\"smallfooter\" header=\"smallheader\" footer-height=\"1em\" font-family=\"Helvetica\">";
						  
						  xml += strName;
						  xml += "</body>";   
							
						 // nlapiLogExecution('DEBUG', 'PrintXmlToPDF', 'xml=' + xml);
							
							
					
					var xlsFile = nlapiCreateFile('Customer Statement.xls', 'EXCEL', nlapiEncrypt(xml, 'base64'));
	

					/*xlsFile.setFolder(97);
					var fileID = nlapiSubmitFile(xlsFile);		
					var file = nlapiLoadFile(fileID);
					//nlapiLogExecution('DEBUG', 'suiteletGenerateDeliveryAdvice', 'file = '+file );
					var pdfName =  'Customer Statement.xls';         
				 response.setContentType('EXCEL', pdfName,'inline');   

					// write response to the client
					response.write( file.getValue());  */
					
					var emailMsg='Hello,<br>Greetings..!!<br><br><p>Please find the attached Customer Statement Report file.</p><br><br>Thanks,'
						//}
						
						var custemail = customerRecord.getFieldValue('email');	
						nlapiLogExecution('DEBUG', 'email', 'custemail = ' + custemail);
						nlapiSendEmail(nlapiGetUser(),'tm@aarialife.com','Customer statement',emailMsg,null,null,null,xlsFile);
						/*var url = nlapiResolveURL('SUITELET', 'customscript_sut_custstatementmain', 'customdeploy_sut_custstatement_main');*/
						
						/*nlapiSendRedirect*/
						 response.sendRedirect('SUITELET', 'customscript_sut_custstatementmain', 'customdeploy_sut_custstatement_main');
					 
		
		  	}
			catch(e)
			{
				throw nlapiCreateError('SUITELET_ERROR',"There is No Available for this Customer..."+e, false); 
			}
			
		}//end fun
	
	
	
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
		
		
		function getOpeningBalance(customer,startdate,enddate,subsidiary,currency_a,opentran)
		{
			var lastInternalID = 0;
			var totalAmount = 0;
			//var totalfxamount = 0;
			totalAmount = parseFloat(totalAmount);
			
			 ////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'startDate = ' + startdate);
			 ////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'vendor = ' + customer);
			 ////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'currency_a = ' + currency_a);
			 
			 var columns = new Array();
			 columns[0] = new nlobjSearchColumn('internalid');
			 columns[1] = new nlobjSearchColumn('amount');
			// columns[2] = new nlobjSearchColumn("formulanumeric").setFormula("CASE WHEN ( {creditamount} > 0) THEN (0-{amount})ELSE {amount} END");
			 
			 var filters = new Array();
			 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',customer);
			 filters[1] = new nlobjSearchFilter ('trandate', null, 'before', startdate);
			 filters[2] = new nlobjSearchFilter ('currency', null, 'anyof', currency_a);				 
			if(opentran!='T')
			{	 
				var searchresults = nlapiSearchRecord('transaction','customsearch_statement_search_wop',filters,columns)
			}
			else
			{
				 var searchresults = nlapiSearchRecord('transaction','customsearch_customer_statement_op',filters,columns)
			}	 
			if(searchresults != null)
		    {
					  //nlapiLogExecution('DEBUG', 'getOpeningBalance', 'searchresults.length = ' + searchresults.length);
					   var amount = '';
					   var internalID = '';
						//var fxamount = '';
						var type = '';
						var previousInternalID = '';
						for (var i = 0;  i < searchresults.length; i++) 
		    			{
		    				
	                		var value = searchresults[i].getValue('internalid');
		    				previousInternalID = lastInternalID;
		    				//////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'previousInternalID = ' + previousInternalID);
		    				internalID = value;
							//////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'internalID = ' + internalID);
		    				
		    				if(opentran!='T')
		    				{
		    					//var value1 = searchresults[i].getValue('amount');
		    					var value1 = searchresults[i].getValue('fxamount');
			    				amount += parseFloat(value1);
								//////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'Amount = ' + amount);
			    				amount = parseFloat(amount);		
		    				}
		    				else
		    				{
		    					var value1 = searchresults[i].getValue('formulanumeric');
			    				amount += parseFloat(value1);
								//////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'Amount = ' + amount);
			    				amount = parseFloat(amount);		
		    				}
		    				
									
		    				}
		    			lastInternalID = internalID;
		    			
		    			totalAmount =  parseFloat(amount);
		    		}	
				 
	
			totalAmount = parseFloat(totalAmount);
			//totalAmount = Math.round(totalAmount * 100) / 100;
			
			var getOpeningBalancefunction = parseFloat(totalAmount);
			//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction = ' + getOpeningBalancefunction);
			
			//////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction = ' + getOpeningBalancefunction);
			
			//totalfxamount = parseFloat(totalfxamount);
			//totalfxamount = Math.round(totalfxamount*100)/100;
			
			////////nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction fx amount = ' +totalfxamount);
			
			//return_amount = totalAmount+'#'+totalfxamount
			
			return getOpeningBalancefunction;
			
		}
		
		function formatAndReplaceSpacesofMessage(messgaeToBeSendPara)
		{
			if(messgaeToBeSendPara!= null && messgaeToBeSendPara!=''&& messgaeToBeSendPara!=undefined)
			{
				messgaeToBeSendPara = nlapiEscapeXML(messgaeToBeSendPara);
				messgaeToBeSendPara = messgaeToBeSendPara.toString();   
				messgaeToBeSendPara = messgaeToBeSendPara.replace(/\n/g,"<br/>");/// /g  
				return messgaeToBeSendPara;
				//////nlapiLogExecution('DEBUG','GET Value','messgaeToBeSendPara :'+messgaeToBeSendPara);
			}
	
		}
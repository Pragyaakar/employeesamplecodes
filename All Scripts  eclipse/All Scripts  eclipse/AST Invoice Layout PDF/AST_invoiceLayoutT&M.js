					/**
					 * Module Description
					 * 
					 * Version    Date            Author           Remarks
					 * 1.00       28 Feb 2019     Priyanka Patil
					 *
					 */
					
					/**
					 * @param {nlobjRequest} request Request object
					 * @param {nlobjResponse} response Response object
					 * @returns {Void} Any output is written via response object
					 */
					function suiteletInvoiceLayout(request, response)
					{
						
						var strName = ' ';
						var url = 'https://3751164-sb1.app.netsuite.com/core/media/media.nl?id=126&c=3751164_SB1&h=96839b238d72202fb0c9&whence='; 
						var url1 = 'https://system.na2.netsuite.com/core/media/media.nl?id=7809&c=3751164&h=a3b8690a6af00705c51c';
						
						var Invoice_no;
						var Time_period;
						var terms;
						var due;
						var project;
						var billto;
						var shipto;
						var po_no;
						var customer;
						
						var recrdId = request.getParameter('custscript_invid');
						var recrdType = 'invoice';	
						var ffReqObj = nlapiLoadRecord(recrdType,recrdId);
						
						var subsidiary = ffReqObj.getFieldValue('subsidiary');
						//nlapiLogExecution('DEBUG','GET Value','subsidiary :'+subsidiary);
						var subsdryAddrs;
				
						var email = nlapiLookupField('subsidiary',subsidiary,'email');
						//nlapiLogExecution('DEBUG','GET Value','email :'+email);
						
						var fax = nlapiLookupField('subsidiary',subsidiary,'fax');
						//nlapiLogExecution('DEBUG','GET Value','fax :'+fax);
						
						var openAirField = ffReqObj.getFieldValue('custbody_oa_inv_layout');
						//nlapiLogExecution('DEBUG','GET Value','openAirField :'+openAirField);
						
						//var phone = nlapiLookupField('subsidiary',subsidiary,'phone');
						//nlapiLogExecution('DEBUG','GET Value','phone :'+phone);
						
						if(subsidiary)
						{
						var s = nlapiLoadRecord("subsidiary", subsidiary,{recordmode: "dynamic"});
						
						subsdryAddrs = s.viewSubrecord("mainaddress").getFieldValue('addrtext');
						
						nlapiLogExecution('DEBUG','GET Value','subsidiary :'+subsidiary);
						
						nlapiLogExecution('DEBUG','GET Value','s :'+s);
						
						if(subsdryAddrs == null)
						{	
						subsdryAddrs ="";
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
						if(sub_addressID == null)
						{
							sub_addressID = ' ';
						}
						nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressID);
											  
						sub_address = s.viewSubrecord("mainaddress").getFieldValue('addressee');
						if(sub_addressText1 == null)
						{
							sub_addressText1 = ' ';
						}
						//nlapiLogExecution('DEBUG','GET Value','sub_addressText1 :'+sub_addressText1);
						 
						sub_addressText1 = s.viewSubrecord("mainaddress").getFieldValue('addr1');
						if(sub_addressText1 == null)
						{
							sub_addressText1 = ' ';
						}
						nlapiLogExecution('DEBUG','GET Value','sub_addressText1 :'+sub_addressText1);
						  
						sub_addressText2 = s.viewSubrecord("mainaddress").getFieldValue('addr2');
						if(sub_addressText2 == null)
						{
							sub_addressText2 = ' ';
						}
						nlapiLogExecution('DEBUG','GET Value','sub_addressText2 :'+sub_addressText2);
						 
						sub_city = s.viewSubrecord("mainaddress").getFieldValue('city');
						if(sub_city == null)
						{
							sub_city = ' ';
						}
						nlapiLogExecution('DEBUG','GET Value','sub_city :'+sub_city);
						  
						sub_country = s.viewSubrecord("mainaddress").getFieldValue('country');
						if(sub_country == null)
						{
							sub_country = ' ';
						}
						nlapiLogExecution('DEBUG','GET Value','sub_country :'+sub_country);
						 
						sub_state = s.viewSubrecord("mainaddress").getFieldValue('state');
						if(sub_state == null)
						{
							sub_state = ' ';
						}
						nlapiLogExecution('DEBUG','GET Value','sub_country :'+sub_country);
						
						sub_zip = s.viewSubrecord("mainaddress").getFieldValue('zip');
						if(sub_zip == null)
						{
							sub_zip = ' ';
						}
						nlapiLogExecution('DEBUG','GET Value','sub_zip :'+sub_zip);
			  
					}
						
						customer = ffReqObj.getFieldValue('entity');
						//nlapiLogExecution('DEBUG','GET Value','customer :'+customer);
						if(customer == null)
						{
							customer = ' ';
						}
						
						Invoice_no = ffReqObj.getFieldValue('tranid');
						//nlapiLogExecution('DEBUG','GET Value','Invoice No :'+Invoice_no);
						if(Invoice_no == null)
						{
							Invoice_no = ' ';
						}
						
						Time_period = ffReqObj.getFieldValue('trandate');
						//nlapiLogExecution('DEBUG','GET Value','Time_period :'+Time_period);
						if(Time_period == null)
						{
							Time_period = ' ';
						}
						
						date1 = ffReqObj.getFieldValue('trandate');
						//nlapiLogExecution('DEBUG','GET Value','Time_period :'+Time_period);
						if(date1 == null)
						{
							date1 = ' ';
						}
						
						terms = ffReqObj.getFieldText('terms');
						//nlapiLogExecution('DEBUG','GET Value','terms :'+terms);
						if(terms == null)
						{
							terms = ' ';
						}
						
						due = ffReqObj.getFieldValue('duedate');
						//nlapiLogExecution('DEBUG','GET Value','due :'+due);
						if(due == null)
						{
							due = ' ';
						}
						
						project = ffReqObj.getFieldValue('custbody_projectname');
						//nlapiLogExecution('DEBUG','GET Value','project :'+project);
						if(project == null)
						{
							project = ' ';
						}
						
						billto = ffReqObj.getFieldValue('billaddress');
						//nlapiLogExecution('DEBUG','GET Value','billto :'+billto);
						if(billto == null)
						{
							billto = ' ';
						}
						
						var invoiceAdd = nlapiLoadRecord('customer', customer);
						var numberOfAddress = invoiceAdd.getLineItemCount('addressbook');
						  
						var city ;
						var addressText2 ;
						var addressText1 ;
						var country ;
						var addressID ;
						var zip ;
						var address;
						   for (var x = 1; x <= numberOfAddress; x++)
						   {
								  var defaultaddress = invoiceAdd.getLineItemValue('addressbook', 'defaultbilling', x);
									   if (defaultaddress == 'T')
									   {
											  addressID = invoiceAdd.getLineItemValue('addressbook', 'internalid', x);
											  if(addressID == null)
											  {
												  addressID = ' ';
											  }
											  //nlapiLogExecution('DEBUG','GET Value','addressID :'+addressID);
											  
											  address = invoiceAdd.getLineItemValue('addressbook', 'addressee', x);
											  if(address == null)
											  {
												  address = ' ';
											  }
											  //nlapiLogExecution('DEBUG','GET Value','address :'+address);
											  
											  addressText1 = invoiceAdd.getLineItemValue('addressbook', 'addr1', x);
											  if(addressText1 == null)
											  {
												  addressText1 = ' ';
											  }
											  //nlapiLogExecution('DEBUG','GET Value','addressText1 :'+addressText1);
											  
											  addressText2 = invoiceAdd.getLineItemValue('addressbook', 'addr2', x);
											  if(addressText2 == null)
											  {
												  addressText2 = ' ';
											  }
											  
											  city = invoiceAdd.getLineItemValue('addressbook', 'city', x);
											  if(city == null)
											  {
												  city = ' ';
											  }
											  
											  country = invoiceAdd.getLineItemValue('addressbook', 'country', x);
											  if(country == null)
											  {
												  country = ' ';
											  }
											  
											  var state = invoiceAdd.getLineItemValue('addressbook', 'state', x);
											  if(state == null)
											  {
												  state = ' ';
											  }
											  
											  zip = invoiceAdd.getLineItemValue('addressbook', 'zip', x);
											  if(zip == null)
											  {
												  zip = ' ';
											  }
										break;
									   }
						   }
						
						po_no = ffReqObj.getFieldValue('otherrefnum');
						//nlapiLogExecution('DEBUG','GET Value','po_no :'+po_no);
						if(po_no == null)
						{
							po_no = ' ';
						}
						
						var count =ffReqObj.getLineItemCount('item');
						//nlapiLogExecution('DEBUG','GET Value','count :'+count);
						
						var count1 =ffReqObj.getLineItemCount('expcost');
						//nlapiLogExecution('DEBUG','GET Value','Expense count1 :'+count1);
	
						var proj1 =new Array();
						if(count >=1)
						{
							for (var z=1;z<=count;z++)
							{
								var proj = ffReqObj.getLineItemValue('item','job',z);
								//nlapiLogExecution('DEBUG','GET Value','proj :'+proj);
								proj1.push(proj);
								break;
							}	
						}
						
						if(count1 >=1)
						{
							for (var z1=1;z1<=count1;z1++)
							{
								var apply = ffReqObj.getLineItemValue('expcost','apply',z1);
								if( apply == "T")
									{
									var proj = ffReqObj.getLineItemValue('expcost','job',z1);
									//nlapiLogExecution('DEBUG','GET Value','exp proj :'+proj);
									proj1.push(proj);
									break;
									}
							
							}
						}
						
						if(proj != null)
						{
								var projName =nlapiLookupField('job',proj,'altname');
						
								var name =projName.toString();
								var n = name.lastIndexOf(":");
								var n1 = parseInt(n)+parseInt(1);
								var res_Proj = name.substr(n1,name.length);
						}	
						else
						{
							res_Proj ='';
						}
								var tax_Subsidiary = ffReqObj.getFieldText('subsidiary');
								nlapiLogExecution('DEBUG','GET Value','tax_Subsidiary :'+tax_Subsidiary);
								
								var billcontName = nlapiLookupField('job',proj,'custentity_project_billing_contact')
								nlapiLogExecution('DEBUG','GET Value','billcontName :'+billcontName);
								
								if(tax_Subsidiary == 'Serene AST LLC')
								{
									strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
									strName += "<tr>";
									strName += "<td><img height='40' width='60' src=\""+nlapiEscapeXML(url1)+"\"></img></td>";
									strName += "<td colspan =\"8\" align=\"right\" font-size=\"20\" margin-top=\"20px\"><b>INVOICE</b></td>";
									strName += "</tr>";
									strName += "</table>";
								}
								else
								{
									strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
									strName += "<tr>";
									strName += "<td><img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img></td>";
									strName += "<td colspan =\"8\" width = \"100\%\"  align=\"right\" font-size=\"20\" margin-top=\"10px\"><b>INVOICE</b></td>";
									strName += "</tr>";
									strName += "</table>";
								}
								
								if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
								{
									if(billcontName == '')
									{
										strName += "<table width=\"100\%\" style='table-layout:fixed;'  font-family=\"Helvetica\" border-bottom=\"0.2\">";
										strName += "<tr>";
										strName += "<td style='  word-wrap: normal' border-top=\"0.2\" width = \"57\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b><p>"+nlapiEscapeXML(res_Proj)+"</p><br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
										strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td style='word-wrap:normal' border-top=\"0.2\" width = \"50\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"<br/>"+nlapiEscapeXML(country)+"</td>";
										strName += "<td  border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td style='word-wrap: normal' border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+nlapiEscapeXML(sub_zip)+"<br/>"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
										strName += "</tr>";	
										strName += "</table ><br/>";
									}
									else
									{
										strName += "<table width=\"100\%\" style='table-layout:fixed;'  font-family=\"Helvetica\" border-bottom=\"0.2\">";
										strName += "<tr>";
										strName += "<td style='word-wrap: normal' border-top=\"0.2\" width = \"57\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
										strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td style='word-wrap:normal' border-top=\"0.2\" width = \"50\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"<br/>"+nlapiEscapeXML(country)+"</td>";
										strName += "<td  border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td style='word-wrap: normal' border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"<br/>"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
										strName += "</tr>";	
										strName += "</table ><br/>";
									}
								}
								else
								{
									if(billcontName == '')	
									{
										strName += "<table width=\"100\%\"  style='table-layout:fixed;' font-family=\"Helvetica\" border-bottom=\"0.2\">";
										strName += "<tr>";
										strName += "<td style='word-wrap:normal' border-top=\"0.2\" width = \"53\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
										strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td style='word-wrap:normal' border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"<br/>"+nlapiEscapeXML(country)+"</td>";
										strName += "<td  border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td style='word-wrap:normal' border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"<br/>"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
										strName += "</tr>";	
										strName += "</table ><br/>";
									}
									else
									{
										strName += "<table width=\"100\%\" style='table-layout:fixed;'  font-family=\"Helvetica\" border-bottom=\"0.2\">";
										strName += "<tr>";
										strName += "<td style='word-wrap:normal' border-top=\"0.2\" width = \"53\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
										strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td style='word-wrap:normal' border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"<br/>"+nlapiEscapeXML(country)+"</td>";
										strName += "<td  border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
										strName += "<td style='word-wrap: normal' border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"<br/>"+nlapiEscapeXML(sub_country)+"<br/>Phone: 647-478-0177 <br/>Email: ar@astcorporation.com<br/>GST/HST #: 741870323RT0001</td>";
										strName += "</tr>";	
										strName += "</table ><br/>";
									}
								}	
						
						//***************************Time Entries Table************************************
								var counsaltant;
								var timePeriod;
								var task;
								var hours;
								var rate;
								var total;
								var currency;
								var taxtotal;
								
								var hourSum = '0';
								var resourceTotal = '0';
								var date;
								var dollar_sign = '$';
								var can_dollar = 'C$';
								var total_dollar1;
								var oaMinutes;
								
								var tax_taxSub_tot =0;
								var startDay = 0; //0=sunday, 1=monday etc.
								var week = 0;
								var result = "";
								var total_hours = 0;
								var total_rate = 0;
								var total_dollar = 0;
								var final_tot_fin123 =0;
								var fin_total_dollar1=0;
								
								var counsaltantArr = new Array();
								var counsaltantUniq1 = new Array();
								var taskArr = new Array();
								var hoursArr = new Array();
								var myTruncArr = new Array();
								var currencyArr = new Array();
								var totalAmountArr = new Array();
								var dateArr = new Array(); 
									
								var taskArr1 = new Array();
								var hoursArr1 = new Array();
								var myTruncArr1 = new Array();
								var currencyArr1 = new Array();
								var hourSumArr1 = new Array();
								var amountArr1 = new Array();
								var resourceTotalArr1 = new Array();
								var oaHoursArr1 = new Array();
								var oaMinutesArr1 = new Array();
								var Total_fn =0;
								var filter = new Array();
								filter[0] = new nlobjSearchFilter('internalid',null,'is',recrdId);
									
								var columns = new Array();
								columns[0] = new nlobjSearchColumn("tranid",null,"GROUP");
								columns[1] = new nlobjSearchColumn("companyname","job","GROUP");
								columns[2] = new nlobjSearchColumn("custcol_oa_user_description",null,"GROUP");
								columns[3] = new nlobjSearchColumn("quantity",null,"SUM");
								columns[4] = new nlobjSearchColumn("custcol_oa_rate_description",null,"GROUP");
								columns[5] = new nlobjSearchColumn("currency",null,"GROUP");
								columns[6] = new nlobjSearchColumn("amount",null,"SUM");
								columns[7] = new nlobjSearchColumn("formulanumeric",null,"SUM").setFormula("TO_NUMBER({custcol_oa_hours_description})");
								columns[8] = new nlobjSearchColumn("formulanumeric",null,"SUM").setFormula("TO_NUMBER({custcol_oa_minutes_description})");
									
								var searchResults = nlapiSearchRecord('invoice','customsearch_inv_print_time_summ_2',filter,columns);
								
								strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\">";
								if(searchResults)
								{
								    strName += "<tr>";
									strName += "<td table-layout = \"fixed\" width = \"25\%\" font-size=\"11\" align=\"left\"><b>Timesheet Summary </b></td>";
									strName += "</tr>";
									strName += "</table>";
									
									strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\"  >";
									strName += "<tr>";
									strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"50\%\" font-size=\"10\"><b>Resource Name</b></td>";
									strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
									strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"8\%\"></td>";        
									strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>"; 
									strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"8\%\"></td>";
									strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>";
									strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"24\%\"><b>Total Hours</b></td>";
									strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"12\%\"></td>";
									strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\"><b>Hourly Rate</b></td>";
									strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"14\%\"></td>";
									strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"20\%\"> <b>Total Dollars</b></td>";
									strName += "</tr>";
										
									
									if (searchResults != null && searchResults != '')
									{
										var length = searchResults.length;
										
										for (var i = 0;  i < searchResults.length; i++) 
										{
											counsaltant = searchResults[i].getValue("custcol_oa_user_description",null,"GROUP");
											counsaltantArr.push(counsaltant);
									
											counsaltantUniq1 = removeDuplicates(counsaltantArr);
											
											var a =counsaltantUniq1.toString();
											var counsult = a.replace(/(^,)|(,$)/g, "");
											
										}//End of for(i < searchResults.length)
										
										for (var m = 0;  m < counsaltantUniq1.length; m++) 
										{
											for (var k = 0;  k < searchResults.length; k++) 
											{
												var counsaltant1 = searchResults[k].getValue("custcol_oa_user_description",null,"GROUP");
												if(counsaltantUniq1[m] == counsaltant1)
												{
													var hours1 = searchResults[k].getValue("quantity",null,"SUM");
													
													var rate1 = searchResults[k].getValue("custcol_oa_rate_description",null,"GROUP");
													var myTrunc1 = Math.round(rate1);
													var newS =rate1.toString();
													var fin_rate = parseFloat(newS).toFixed(2);
													myTruncArr1.push(fin_rate);
													
													var currency1 = searchResults[k].getText("currency",null,"GROUP");
													currencyArr1.push(currency1);
													
													var amount = searchResults[k].getValue("amount",null,"SUM");
													var am = parseFloat(amount).toFixed(1);
													amountArr1.push(amount);
													
													var oaHours = searchResults[k].getValue(columns[7]);
													//var oaMinutes = searchResults[k].getValue(columns[8]);
													
													var convert = oaMinutes / 60;
													//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','convert ='+convert);
													
													var twoDecimal = convert.toFixed(2);
													//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','twoDecimal ='+parseInt(twoDecimal));
													
													var conv_split = twoDecimal.substr('.',2);
													
													var name =twoDecimal.toString();
													var n = name.lastIndexOf(".");
													var n1 = parseInt(n)+parseInt(1);
													var res = twoDecimal.substr(n1,twoDecimal.length);
													nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','res ='+res);
													
													var newVal = parseInt(oaHours) + parseInt(oaHours);
													nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','newVal ='+newVal);
													
													var Concathr_min = newVal +'.'+res;
													var final_Concathr_min = parseFloat(Concathr_min).toFixed(1);
													
													var new_Totdollar = parseFloat(oaHours) * parseFloat(rate1);
													var tot_DOll = parseFloat(new_Totdollar).toFixed(2);
													var fin_new_Totdollar = tot_DOll.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
													
													total_hours = parseFloat(total_hours) + parseFloat(oaHours);
													var total_hours1 = parseFloat(total_hours).toFixed(1);
													
													total_rate = parseFloat(total_rate) + parseFloat(myTrunc1);
													var total_rate1 = parseFloat(total_rate).toFixed(1);
													
													total_dollar = parseFloat(total_dollar) + parseFloat(new_Totdollar);
													total_dollar1 = parseFloat(total_dollar).toFixed(2);
													var fin_total_dollar1 = total_dollar1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
													//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','fin_total_dollar1 ='+fin_total_dollar1);
	
												    if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
													{
														strName += "<tr>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"47\%\" font-size=\"10\">"+nlapiEscapeXML(counsaltantUniq1[m])+"</td>";
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>";
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"8\%\"></td>";        
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>"; 
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"15\%\"></td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"20\%\">"+parseFloat(oaHours).toFixed(1)+"</td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\">"+dollar_sign+"</td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\">"+fin_rate+"</td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"14\%\">"+dollar_sign+"</td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"26\%\">"+fin_new_Totdollar+"</td>";
														strName += "</tr>";
													}
												    else
												    {
												    	strName += "<tr>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"47\%\" font-size=\"10\">"+nlapiEscapeXML(counsaltantUniq1[m])+"</td>";
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>";
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"8\%\"></td>";        
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>"; 
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
														strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"15\%\"></td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"20\%\">"+parseFloat(oaHours).toFixed(1)+"</td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\">"+can_dollar+"</td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\">"+fin_rate+"</td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"14\%\">"+can_dollar+"</td>";
														strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"20\%\">"+fin_new_Totdollar+"</td>";
														strName += "</tr>";
												    }
													
												}//End of if(counsaltantUniq1[m] == counsaltant1)
							                }//End of for(k < searchResults.length)
										}// End of for( m < counsaltantUniq1.length)
										
										if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
										{
											strName += "<tr>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"47\%\" font-size=\"10\"><b>Time SubTotal</b></td>";
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>";
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"8\%\"></td>";        
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>"; 
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"15\%\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"20\%\">"+total_hours1+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"12\%\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"14\%\"><b>"+dollar_sign+"</b></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"26\%\"><b>"+fin_total_dollar1+"</b></td>";
											strName += "</tr>";
										}
										else
										{
											strName += "<tr>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"47\%\" font-size=\"10\"><b>Time SubTotal</b></td>";
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>";
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"8\%\"></td>";        
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"8\%\"></td>"; 
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
											strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"15\%\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"20\%\">"+total_hours1+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"12\%\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"14\%\"><b>"+can_dollar+"</b></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"20\%\"><b>"+fin_total_dollar1+"</b></td>";
											strName += "</tr>";
										}
									}//End of if looop
								}//End of if(searchResults)
								
							  
							    strName += "</table><br/>";
								
							    if(total_dollar1 != null && total_dollar1 != undefined && total_dollar1 != '')
							    {
							    Total_fn = (total_dollar1);
							    }
							    else
							    {
							    	Total_fn =0;
							    }
		
					
					//**********************************Expense Table*********************************
					var resourceTotal1 = '0';	
					
					
					var filters = new Array();
					filters[0] = new nlobjSearchFilter('internalid','applyingTransaction','anyof',recrdId);
											
					var column = new Array();
					column[0] = new nlobjSearchColumn("tranid","applyingTransaction","GROUP");
					column[1] = new nlobjSearchColumn("companyname","job","GROUP");
					column[2] = new nlobjSearchColumn("entityid","employee","GROUP");
					column[3] = new nlobjSearchColumn("formulacurrency",null,"SUM").setFormula("CASE WHEN {expensecategory} = 'Air Fare' THEN {applyingtransaction.fxamount}ELSE 0 END");
					column[4] = new nlobjSearchColumn("formulacurrency",null,"SUM").setFormula("CASE WHEN {expensecategory} = 'Hotel' THEN {applyingtransaction.fxamount} ELSE 0 END");
					column[5] = new nlobjSearchColumn("formulacurrency",null,"SUM").setFormula("CASE WHEN {expensecategory} = 'Meals' THEN {applyingtransaction.fxamount} ELSE 0 END");
					column[6] = new nlobjSearchColumn("formulacurrency",null,"SUM").setFormula("CASE WHEN {expensecategory} not in ('Air Fare', 'Meals', 'Hotel') THEN {applyingtransaction.fxamount} ELSE 0 END");
					column[7] = new nlobjSearchColumn("currency","applyingTransaction","GROUP");
					
					var expSearchResults = nlapiSearchRecord('expensereport','customsearch_inv_oa_exp_print_search_sum',filters,column);
					
					var tax = ffReqObj.getFieldValue('taxtotal');
					
					if(taxtotal == null)
					{
						taxtotal = '';
						var taxtotal = ffReqObj.getFieldValue('tax2total');
						//nlapiLogExecution('DEBUG','SaveSearch','taxtotal ='+taxtotal);
					}
					
					if(tax != null && taxtotal != null)
					{
						var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
						var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2);
						var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
					}
	
					var fin123 = parseFloat(Total_fn) + parseFloat(tax_taxSub_tot);
					var final_tot_fin123 =parseFloat(fin123).toFixed(2);
					var tot_fin123 = final_tot_fin123.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
					//nlapiLogExecution('DEBUG','SaveSearch','tot_fin123 ='+tot_fin123);
					
					var exp_tot = Total_fn;
					//nlapiLogExecution('DEBUG','SAVESEARCH','Expense TOTAL ='+exp_tot);
					
					if(expSearchResults)
					{
										    	
					}
					
					else if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
					{
						//------Fetch value IF only timesheet entry are there------
					    
						strName += "<table width=\"100\%\" font-family=\"Helvetica\" border-top=\"0.2\">";
						strName += "<tr>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"><b>Total</b></td>";
						strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" width = \"20\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\"></td>";        
						strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" width = \"25\%\" align=\"right\"></td>"; 
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" width = \"10\%\" align=\"right\"><b>"+tot_fin123+"</b></td>";
						strName += "</tr>";
						strName += "</table>";
					}
					else 
					{
						
					    strName += "<table width=\"100\%\" font-family=\"Helvetica\" border-top=\"0.2\">";
						strName += "<tr>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"><b>SubTotal</b></td>";
						strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" width = \"20\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\"></td>";        
						strName += "<td  table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" width = \"25\%\" align=\"right\"></td>"; 
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" width = \"10\%\" align=\"right\"><b>"+fin_total_dollar1+"</b></td>";
						strName += "</tr>";
						
						strName += "<tr>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"><b>GST/HST Tax</b></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"20\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\"></td>";        
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" width = \"25\%\" align=\"right\"></td>"; 
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" width = \"10\%\" align=\"right\"><b>"+final_tax_taxSub_tot+"</b></td>";
						strName += "</tr>";
										
						strName += "<tr>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"><b>Total</b></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"20\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\"></td>";        
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" width = \"25\%\" align=\"right\"></td>"; 
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" width = \"10\%\" align=\"right\"><b>"+tot_fin123+"</b></td>";
						strName += "</tr>";
						strName += "</table>";
					}
					
					
					
				//**********************************Expense Table*********************************
							
					var ExpCounsultant;
					var ExptimePeriod;
					var ExpenseType;
					var ExpenseTotal;
					var ExpCurrency;
					var ExpDate;
					var amount;
					//var total_dollar1;
					var taxtotal;
					
					var dollar_sign = '$';
					var can_dollar = 'C$';
					var expTotal = 0;
					var totalPayment = 0;
					var expresourceTotal1=0;
					var grand_total = 0;
					var tax_taxSub_tot=0;
					var subTOtal = 0;
					var subAirfair = 0;
					var submeals = 0;
					var subhotel =0;
					var submisc = 0;
					var final_fin;
					var fin = 0;
					var tot_fin1;
					
					var ExpCounsultantArray = new Array();
					var ExptimePeriodArray = new Array();
					var ExpenseTypeArray = new Array();
					var ExpenseTotalArray = new Array();
					var ExpCurrencyArray = new Array();
					var expCounsaltantUniq = new Array();
					var ExpDateArray = new Array();
					var amountArray = new Array();
					var ExpenseAirFairArray = new Array();
					var ExpenseHotelArray = new Array();
					var ExpenseMealsArray = new Array();
					var ExpenseMiscellaneousArray = new Array();
					var ExpAmountArray = new Array();
					var currencyArray1 = new Array();
										
					strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\"  >";
					if(expSearchResults)
					{
						strName += "<tr>";
						strName += "<td table-layout = \"fixed\" width = \"25\%\" font-size=\"11\" align=\"left\"><b>Expense Summary</b></td>";
						strName += "</tr>";
						strName += "</table>";
										
						
						strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\"  >";
						strName += "<tr>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"><b>Resource Name</b></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"><b>Airfare</b></td>";        
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>"; 
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"><b>Hotel</b></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"><b>Meals</b></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"10\%\"></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\"><b>Miscellaneous</b></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" font-size=\"10\" align=\"right\" width = \"12\%\"></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-top=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\"><b>Expense SubTotal</b></td>";
						strName += "</tr>";
										
								
						if(expSearchResults != null && expSearchResults != '')
						{
							var length = expSearchResults.length;
							for (var p = 0;  p < expSearchResults.length; p++) 
							{
								ExpCounsultant = expSearchResults[p].getValue("entityid","employee","GROUP");
								ExpCounsultantArray.push(ExpCounsultant);
											
								expCounsaltantUniq = removeDuplicates(ExpCounsultantArray);
											
								var a = expCounsaltantUniq.toString();
								var counsult1 = a.replace(/(^,)|(,$)/g, "");						
							}//End of for (var p = 0;  p < expSearchResults.length; p++) 
										
							for (var x = 0;  x < expCounsaltantUniq.length; x++) 
							{
								for (var q = 0;  q < expSearchResults.length; q++) 
								{
									var counsaltantName = expSearchResults[q].getValue('entityid','employee','GROUP');
							        if(expCounsaltantUniq[x] == counsaltantName)
							        {
							            ExpenseAirFair = expSearchResults[q].getValue(column[3]);
							   			var airFair = parseFloat(ExpenseAirFair).toFixed(2);
							   			ExpenseAirFairArray.push(ExpenseAirFair);
							   					
							   			ExpenseHotel = expSearchResults[q].getValue(column[4]);
							   			var hotel = parseFloat(ExpenseHotel).toFixed(2);
							   			ExpenseHotelArray.push(ExpenseHotel);
							   					
							   			ExpenseMeals = expSearchResults[q].getValue(column[5]);
							   			var meals = parseFloat(ExpenseMeals).toFixed(2);
							   			ExpenseMealsArray.push(ExpenseMeals);
							   					
							   			ExpenseMiscellaneous = expSearchResults[q].getValue(column[6]);
							   			var miscellaneous = parseFloat(ExpenseMiscellaneous).toFixed(2);
							   			ExpenseMiscellaneousArray.push(ExpenseMiscellaneous);
							   					
							   			amount = expSearchResults[q].getValue("amount","applyingTransaction","SUM");
							   			amountArray.push(amount);
							   					
							   			ExpCurrency = expSearchResults[q].getText("currency","applyingTransaction","GROUP");
							   			ExpCurrencyArray.push(ExpCurrency);
							   					
							   			ExpAmount = expSearchResults[q].getText("currency","applyingTransaction","GROUP");
							   			ExpAmountArray.push(ExpAmount);
							   					
							   			var ExpType_total = parseFloat(ExpenseAirFair) + parseFloat(ExpenseMeals) + parseFloat(ExpenseHotel) + parseFloat(ExpenseMiscellaneous);
										//nlapiLogExecution('DEBUG','SaveSearch','ExpType_total = '+ExpType_total);
		
							   			var tot_ExpType_total = parseFloat(ExpType_total).toFixed(2);
										var final_ExpType_total = tot_ExpType_total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
										
							   			subTOtal = parseFloat(subTOtal) + parseFloat(ExpType_total);
							   			var sub = parseFloat(subTOtal).toFixed(2);
							   			var final_sub = sub.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
							   			//nlapiLogExecution('DEBUG','SaveSearch','Expense SubTotal = '+final_sub);			
							   			
							   			subAirfair = parseFloat(subAirfair) + parseFloat(ExpenseAirFair);
							   			var subAirfair1 = subAirfair.toFixed(2);
							   					
							   			submeals = parseFloat(submeals) + parseFloat(ExpenseMeals);
							   			var submeals1 = submeals.toFixed(2);
							   					
							   			subhotel = parseFloat(subhotel) + parseFloat(ExpenseHotel);
							   			var subhotel1 = subhotel.toFixed(2);
							   					
							   			submisc = parseFloat(submisc) + parseFloat(ExpenseMiscellaneous);
							   			var submisc1 = submisc.toFixed(2);
							   					
							   			var tax = ffReqObj.getFieldValue('taxtotal');
										var taxtotal = ffReqObj.getFieldValue('tax2total');
												
										nlapiLogExecution('DEBUG','SaveSearch','Total_fn = '+Total_fn);
										var time_exp_total = parseFloat(subTOtal) + parseFloat(Total_fn);
										//nlapiLogExecution('DEBUG','SaveSearch','v = '+time_exp_total);
										
										var fin = parseFloat(time_exp_total).toFixed(2);
										final_fin = fin.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
										
										var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
										var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2); 
										var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
										
										var final = parseFloat(time_exp_total) + parseFloat(tax_taxSub_tot);
										//nlapiLogExecution('DEBUG','SaveSearch','final = '+final);
										var fin1 = final.toFixed(2); 
						                   
										expTotal += parseFloat(amount);
										//nlapiLogExecution('DEBUG','LOG for summary total','SUB TOTAL ='+expTotal);
										
										totalPayment = parseFloat(resourceTotal1)+parseFloat(expTotal);
										
										
										if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
										{
											strName += "<tr>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" align=\"left\" font-size=\"10\">"+nlapiEscapeXML(expCounsaltantUniq[x])+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+dollar_sign+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+airFair+"</td>";         //"+fin_rate+"
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+dollar_sign+"</td>"; 
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+hotel+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+dollar_sign+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+meals+" </td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+dollar_sign+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\">"+miscellaneous+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\">"+dollar_sign+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\">"+final_ExpType_total+"</td>";
											strName += "</tr>";
										}
										else
										{
											strName += "<tr>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" align=\"left\" font-size=\"10\" >"+nlapiEscapeXML(expCounsaltantUniq[x])+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+can_dollar+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+airFair+"</td>";         //"+fin_rate+"
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+can_dollar+"</td>"; 
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+hotel+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+can_dollar+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+meals+" </td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+can_dollar+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\">"+miscellaneous+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\">"+can_dollar+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\">"+final_ExpType_total+"</td>";
											strName += "</tr>";
										}
										
							        }//End of if(expCounsaltantUniq[x] == counsaltantName)
								}//End of for (var q = 0;  q < expSearchResults.length; q++)	
							}//End of for (var x = 0;  x < expCounsaltantUniq.length; x++) 
					    	
						}//End of if(expSearchResults != null && expSearchResults != '')
							
					
						if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
						{
							strName += "<tr>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"><b>Expense SubTotal</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+dollar_sign+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+subAirfair1+"</td>";         //"+fin_rate+"
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+dollar_sign+"</td>"; 
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+subhotel1+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+dollar_sign+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+submeals1+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+dollar_sign+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\">"+submisc1+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\"><b>"+dollar_sign+"</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\"><b>"+final_sub+"</b></td>";
							strName += "</tr>";
						}
						else
						{
							strName += "<tr>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"><b>Expense SubTotal</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+can_dollar+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+subAirfair1+"</td>";         //"+fin_rate+"
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+can_dollar+"</td>"; 
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+subhotel1+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+can_dollar+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+submeals1+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+can_dollar+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\">"+submisc1+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\"><b>"+can_dollar+"</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\"><b>"+final_sub+"</b></td>";
							strName += "</tr>";
						}
						
						var tax = ffReqObj.getFieldValue('taxtotal');	
						var taxtotal = ffReqObj.getFieldValue('tax2total');
										
						if(tax != null &&  taxtotal !=null)
						{
							var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
						}
						if(tax != null &&  taxtotal !=null)
						{
							var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
						}
						if(tax == null &&  taxtotal !=null)
						{
							tax=0;
							var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
						}
						if(tax != null &&  taxtotal ==null)
						{
						    taxtotal=0;
						    var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
						}
						if(tax_taxSub_tot != null &&  time_exp_total !=null)
						{
						    var final = parseFloat(time_exp_total) + parseFloat(tax_taxSub_tot);
							var fin1 = final.toFixed(2);
							tot_fin1 = fin1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						}
						
						if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
						{
							strName += "<tr margin-top=\"25px\">";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"><b>Total</b></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";        
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>"; 
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\"></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\"><b>"+tot_fin1+"</b></td>";
							strName += "</tr>";
						}
						else
						{
							
							strName += "<tr margin-top=\"25px\">";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"><b>SubTotal</b></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";         
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>"; 
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\"></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\"><b>"+final_fin+"</b></td>";
							strName += "</tr>";
							
							
							strName += "<tr>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"><b>GST/HST Tax</b></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";        
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>"; 
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\"></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\"><b>"+final_tax_taxSub_tot+"</b></td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"><b>Total</b></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";        
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>"; 
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\"></td>";
							strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\"></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\"><b>"+tot_fin1+"</b></td>";
							strName += "</tr>";
						
						}
					}
					strName += "</table><br/>";
									
			//**********************Footer Part*****************************
										
				/*if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
				{
						strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" width = \"40\%\" font-size=\"10\"><b>For ACH and Wire Payments:</b></td>";
						strName += "</tr>";
									
						strName += "<tr>";
						strName += "<td width = \"40\%\" font-size=\"10\">Bank: &nbsp;JP Morgan Chase NA, Naperville, IL 60540</td>";
						strName += "</tr>";
									
						strName += "<tr>";
						strName += "<td width = \"40\%\" font-size=\"10\">ABA: &nbsp;071000013 | Account: 707783601</td>";
						strName += "</tr>";
						strName += "</table>";
									
						strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
						strName += "<tr>";
						strName += "<td  border-bottom=\"0.2\" width = \"40\%\" font-size=\"10\"><b>Checks should be payable to</b> &nbsp;Application Software Technology, LLC and mailed to 4343 Commerce Court, Suite 701, Lisle, IL 60532</td>";
						strName += "</tr>";
						strName += "</table>";
				}	*/				
						strName += "<pbr/>";
						
		//*************************************Page Break*****************************************		    
									    
									    
									    
									    
									    
						
		
		
		
		
		
		
		
	
						
						
						
						
					
		
		
		//*******************************DETAIL TIME AND EXPENCE TABLE ENTRY*************************************
			
						if(tax_Subsidiary == 'Serene AST LLC')
						{
							strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
							strName += "<tr>";
							strName += "<td><img height='40' width='60' src=\""+nlapiEscapeXML(url1)+"\"></img></td>";
							strName += "<td colspan =\"8\" align=\"right\" font-size=\"20\" margin-top=\"20px\"><b>INVOICE</b></td>";
							strName += "</tr>";
							strName += "</table>";
						}
						else
						{
							strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
							strName += "<tr>";
							strName += "<td><img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img></td>";
							strName += "<td colspan =\"8\" width = \"100\%\"  align=\"right\" font-size=\"20\"  margin-top=\"10px\"><b>INVOICE</b></td>";
							strName += "</tr>";
							strName += "</table>";
						}
											
						if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
						{
							if(billcontName == '')
							{
								strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
								strName += "<tr>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"57\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"50\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"<br/>"+nlapiEscapeXML(country)+"</td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+nlapiEscapeXML(sub_zip)+"<br/>"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
								strName += "</tr>";	
								strName += "</table ><br/>";
							}
							else
							{
								strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
								strName += "<tr>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"57\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td style='word-wrap: break-word'  border-top=\"0.2\" width = \"50\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"<br/>"+nlapiEscapeXML(country)+"</td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"<br/>"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
								strName += "</tr>";	
								strName += "</table ><br/>";
							}
						}
						else
						{
							if(billcontName == '')	
							{
								strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
								strName += "<tr>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"53\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td  border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"<br/>"+nlapiEscapeXML(country)+"</td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"<br/>"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
								strName += "</tr>";	
								strName += "</table ><br/>";
							}
							else
							{
								strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
								strName += "<tr>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"53\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"<br/>"+nlapiEscapeXML(country)+"</td>";
								strName += "<td  border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"<br/>"+nlapiEscapeXML(sub_country)+"<br/>Phone: 647-478-0177 <br/>Email: ar@astcorporation.com<br/>GST/HST #: 741870323RT0001</td>";
								strName += "</tr>";	
								strName += "</table ><br/>";
							}
						}	
						
						var counsaltant;    
						var timePeriod;
						var task;
						var hours;
						var rate;
						var total;
						var currency;
						var date;
						var subhourSum1 =0;
						
						var result = "";
						var totalAmount1 ;
						var dollar = '$';
						var can_dollar='C$';
						
						var hourSum = '0';
						var resourceTotal = '0';
						var startDay = 0; //0=sunday, 1=monday etc.
						var week = 0;
						var subresourceTotal1 =0;				
						var counsaltantArr = new Array();
						var counsaltantUniq1 = new Array();
						var taskArr = new Array();
						var hoursArr = new Array();
						var myTruncArr = new Array();
						var currencyArr = new Array();
						var totalAmountArr = new Array();
						var dateArr = new Array(); 
										
						var taskArr1 = new Array();
						var hoursArr1 = new Array();
						var myTruncArr1 = new Array();
						var currencyArr1 = new Array();
						var hourSumArr1 = new Array();
						var totalAmountArr1 = new Array();
					    var resourceTotalArr1 = new Array();
						var amountArr1 = new Array();
						var oaMinArr1 = new Array();
						
						
						var filter = new Array();
						filter[0] = new nlobjSearchFilter('internalid',null,'is',recrdId);
										
						var columns = new Array();
						columns[1] = new nlobjSearchColumn("formuladate",null,"GROUP");
						columns[2] = new nlobjSearchColumn("tranid",null,"GROUP");
						columns[0] = new nlobjSearchColumn("formuladatetime",null,"GROUP");
						columns[3] = new nlobjSearchColumn("companyname","job","GROUP");
						columns[4] = new nlobjSearchColumn("custcol_oa_user_description",null,"GROUP");
						columns[5] = new nlobjSearchColumn("trandate",null,"GROUP");
						columns[6] = new nlobjSearchColumn("custcol_oa_task_description",null,"GROUP");
						columns[7] = new nlobjSearchColumn("custcol_oa_credit_charge_type",null,"GROUP");
						columns[8] = new nlobjSearchColumn("formulacurrency",null,"SUM");
						columns[9] = new nlobjSearchColumn("custcol_oa_rate_description",null,"GROUP");
						columns[10] = new nlobjSearchColumn("amount",null,"SUM");
						columns[11] = new nlobjSearchColumn("currency",null,"GROUP");
						columns[12] = new nlobjSearchColumn("formulanumeric",null,"SUM").setFormula("TO_NUMBER({custcol_oa_minutes_description})");
						columns[13] = new nlobjSearchColumn("formulanumeric",null,"SUM").setFormula("TO_NUMBER({custcol_oa_hours_description})");
										
						var searchResults = nlapiSearchRecord('invoice','customsearch419_2',filter,columns);
						nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','searchResults ='+searchResults);
								
						strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\">";
						if(searchResults)
						{
							strName += "<tr>";
							strName += "<td table-layout = \"fixed\" width = \"25\%\" font-size=\"11\" align=\"left\"><b>Timesheet Detail </b></td>";
							strName += "</tr>";
							strName += "</table>";
									
							if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
							{
								strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\"  >";
								strName += "<tr>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"22\%\" font-size=\"10\"><b>Consultant</b></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\" align=\"left\"><b>Time Period</b></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"27\%\" font-size=\"10\" align=\"left\"><b>Task</b></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"11\%\" font-size=\"10\" align=\"right\"><b>Hours</b></td>";
								strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"center\"><b>Rate</b></td>";
								strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"13.7\%\" font-size=\"10\" align=\"center\"><b>Total</b></td>";
								strName += "</tr>";
							}
							else
							{
								strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\"  >";
								strName += "<tr>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"21\%\" font-size=\"10\"><b>Consultant</b></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"27\%\" font-size=\"10\" align=\"left\"><b>Time Period</b></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\" align=\"left\"><b>Task</b></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"10\%\" font-size=\"10\" align=\"right\"><b>Hours</b></td>";
								strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"center\"><b>Rate</b></td>";
								strName += "<td table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
								strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"center\"><b>Total</b></td>";
								strName += "</tr>";
							}
									
							if (searchResults != null && searchResults != '')
							{
								var length = searchResults.length;
								
								for(var i = 0;  i < searchResults.length; i++) 
								{
									counsaltant = searchResults[i].getValue("custcol_oa_user_description",null,"GROUP");
									counsaltantArr.push(counsaltant);
												
									counsaltantUniq1 = removeDuplicates(counsaltantArr);
												
									var a =counsaltantUniq1.toString();
									var counsult = a.replace(/(^,)|(,$)/g, "");
												
									task = searchResults[i].getValue("custcol_oa_task_description",null,"GROUP");
									taskArr.push(task);
								}//End of for(var i = 0;  i < searchResults.length; i++) 
									
								for (var m = 0;  m < counsaltantUniq1.length; m++) 
								{
									if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
									{
										strName += "<tr>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"22\%\" font-size=\"10\" align=\"left\">"+nlapiEscapeXML(counsaltantUniq1[m])+"</td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"27\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"11\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" width = \"13\%\" border-bottom=\"0.2\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13.7\%\" font-size=\"10\"></td>";
										strName += "</tr>";
									}
									else
									{
										strName += "<tr>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"21\%\" font-size=\"10\" align=\"left\">"+nlapiEscapeXML(counsaltantUniq1[m])+"</td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"27\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"10\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" width = \"13\%\" border-bottom=\"0.2\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\"></td>";
										strName += "</tr>";
									}
									var hourSumGlob = '0';
									var resourceTotal1 = '0';
									
									for (var k = 0;  k < searchResults.length; k++) 
									{
										var hourSum1 = '0';
										var counsaltant1 = searchResults[k].getValue("custcol_oa_user_description",null,"GROUP");
										
										if(counsaltantUniq1[m] == counsaltant1)
								        {
											var task1 = searchResults[k].getValue("custcol_oa_task_description",null,"GROUP");
											
											var hours1 = searchResults[k].getValue(columns[13]);
											//nlapiLogExecution('DEBUG','Log in TimeSheet','hours1 TimeSheet ='+hours1);
												
											hourSum1 =  parseFloat(hourSum1) + parseFloat(hours1);
											//nlapiLogExecution('DEBUG','Log in TimeSheet','hourSum1 TimeSheet ='+hourSum1);
											
											var rate1 = searchResults[k].getValue("custcol_oa_rate_description",null,"GROUP");
											var myTrunc1 = Math.round(rate1);
											var NewS = rate1.toString();
											var final_rate = parseFloat(NewS).toFixed(2);
											myTruncArr1.push(final_rate);
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','rate1 ='+rate1);
											
											var currency1 = searchResults[k].getText("currency",null,"GROUP");
											currencyArr1.push(currency1);
												
											var oaMin = searchResults[k].getValue(columns[12]);
											
											var convert = oaMin / 60;
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','convert ='+convert);
											
											var twoDecimal = convert.toFixed(2);
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','twoDecimal ='+twoDecimal);
											
											var conv_split = twoDecimal.substr('.',2);
											
											var name =twoDecimal.toString();
											var n = name.lastIndexOf(".");
											var n1 = parseInt(n)+parseInt(1);
											var res = twoDecimal.substr(n1,twoDecimal.length);
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','res ='+res);
											
											var newVal = parseInt(hourSum1) + parseInt(twoDecimal);
											
											var Concathr_min = newVal +'.'+res;
											var tot_Concathr_min = parseFloat(Concathr_min).toFixed(1);
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','tot_Concathr_min in detail='+tot_Concathr_min);
												
											totalAmount1 = parseFloat(hourSum1) * parseFloat(rate1);
											var tot_totalAmount1 = parseFloat(totalAmount1).toFixed(2);
											var final_totalAmount1 = tot_totalAmount1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','totalAmount1 ='+totalAmount1);
											
											var resourceTotal1 = parseFloat(resourceTotal1) + parseFloat(totalAmount1);
											var tot_resourceTotal1 = parseFloat(resourceTotal1).toFixed(2);
											var final_resourceTotal1 = tot_resourceTotal1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
											
											hourSumGlob =  parseFloat(hourSumGlob) + parseFloat(hourSum1);
									       // nlapiLogExecution('DEBUG','Log in TimeSheet','hourSumGlob TimeSheet ='+hourSumGlob);
									        
											var date1 = new Date(searchResults[k].getValue("formuladate",null,"GROUP"));
											date1.setDate( date1.getDate() - 6 );
											         
											var date2 =  new Date(searchResults[k].getValue("formuladate",null,"GROUP"));
													
											var GetMonth =  searchResults[k].getValue("formuladatetime",null,"GROUP");
							                		
											var str = GetMonth;
							                var res = str.substr(5, 6);
											var res1 =str.substr(6, 6);
											if(res1 < 10)
											{
												res1 = '0' + res1;		
											}
											else
											{
												res1 = res1;
											}	
											if(date1 !=null && date1 !='' && date2 !=undefined)
								            {
												var firstDay = new Date(date1.getFullYear(), date1.getMonth() , 1);
												var lastDay = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);
												
												
												var month1 = date2.getMonth() + 1;
												
												var day1 = date2.getDate();
												
												var year1 = date2.getFullYear();
												if(month1 < 10)
												{
													month1 = '0' + month1;					
												}
												else
												{
													month1 = month1;
												}
												//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','month1 ='+month1);
												if(day1 < 10)
												{
													day1 = '0' + day1;	
												}
												else
												{
													day1 = day1;
												}
												var d1 = month1 +"-" + day1+ "-" + year1;
												//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','day1 ='+day1);
												
												var month2 = date1.getMonth() + 1;
												var day2 = date1.getDate();
												var year2 = date1.getFullYear();
												if(month2 < 10)
												{
													month2 = '0' + month2;												
												}
												else
												{
													month2 = month2;
												}
												//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','month2 ='+month2);
												if(day2 < 10)
												{
													day2 = '0' + day2;				
												}
												else
												{
													day2 = day2;
												}
												var d2 = month2 +"-" + day2+ "-" + year2;
												//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','day2 ='+day2);
												
												var month3 = lastDay.getMonth() + 1;
												var day3 = lastDay.getDate();
												var year3 = lastDay.getFullYear();
												if(month3 < 10)
												{
													month3 = '0' + month3;						
												}
												else
												{
													month3 = month3;
												}
												//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','month3 ='+month3);
												if(day3 < 10)
												{
													day3 = '0' + day3;			
												}
												else
												{
													day3 = day3;
												}
												var d3 = month3+"-" + day3+ "-" + year3;
												//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','day3 ='+day3);
												
												var month4 = firstDay.getMonth() + 1;
												var day4 = firstDay.getDate();
												var year4 = firstDay.getFullYear();
												if(month4 < 10)
												{
													month4 = '0' + month4;									
												}
												else
												{
													month4 = month4;
												}
												//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','month4 ='+month4);
												if(day4 < 10)
												{
													day4 = '0' + day4;													
												}
												else
												{
													day4 = day4;
												}
												var d4 = res1 +"-" + day4+ "-" + year4;
												//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','day4 ='+day4);
												
																    						    	 
												if(date1.getMonth() == date2.getMonth())
												{
													var value1= d2+'  -  '+d1;
													//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','value1 (date1.getMonth() == date2.getMonth()) ='+value1);	
												}
																		   
												else if(date1.getMonth() != date2.getMonth() && date2.getMonth() != res )
												{
													var value1= d4+'  -  '+d1;
													//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','(date1.getMonth() != date2.getMonth() && date2.getMonth() != res) ='+value1);	
												}
												else 
												{
													var value1= d2+'  -  '+d3;
													//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','value1 else ='+value1);
												}
											}		
											
											if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
											{
											    strName += "<tr>";
												strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"22\%\" font-size=\"10\"></td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\" align=\"left\">"+value1+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"27\%\" font-size=\"10\" align=\"left\">"+nlapiEscapeXML(task1)+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"11\%\" font-size=\"10\" align=\"center\">"+parseFloat(hourSum1).toFixed(1)+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\" align=\"right\">"+dollar+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"right\" text-align=\"justify\">"+final_rate+"/hr</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\" align=\"right\">"+dollar+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13.7\%\" font-size=\"10\" align=\"right\">"+final_totalAmount1+"</td>";
												strName += "</tr>";	
											}
											else
											{
												strName += "<tr>";
												strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"21\%\" font-size=\"10\"></td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"27\%\" font-size=\"10\" align=\"left\">"+value1+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\" align=\"left\">"+nlapiEscapeXML(task1)+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"10\%\" font-size=\"10\" align=\"center\">"+parseFloat(hourSum1).toFixed(1)+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\" align=\"left\">"+can_dollar+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"right\">"+final_rate+"/hr</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\" align=\"left\">"+can_dollar+"</td>";
												strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"right\">"+final_totalAmount1+"</td>";
												strName += "</tr>";	
											}
											
										}	
								        
									}//End of for
									subhourSum1 = parseFloat(subhourSum1 ) + parseFloat(hourSumGlob);
									
									subresourceTotal1 = parseFloat(subresourceTotal1) +parseFloat(resourceTotal1);
									var tot_subresourceTotal1 = parseFloat(subresourceTotal1).toFixed(2);
									var final_subresourceTotal1 = tot_subresourceTotal1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
									
									if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
									{
										strName += "<tr>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"22\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\"></td>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"27\%\" font-size=\"10\"><b>Resource Time SubTotal</b></td>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"11\%\" font-size=\"10\" align=\"center\"><b>"+parseFloat(hourSumGlob).toFixed(1)+"</b></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\"></td>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\" align=\"right\"><b>"+dollar+"</b></td>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13.7\%\" font-size=\"10\" align=\"right\"><b>"+final_resourceTotal1+"</b></td>";
										strName += "</tr>";
									}
									else
									{
										strName += "<tr>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"21\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"27\%\" font-size=\"10\"></td>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\"><b>Resource Time SubTotal</b></td>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"10\%\" font-size=\"10\" align=\"center\"><b>"+parseFloat(hourSumGlob).toFixed(1)+"</b></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\"></td>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\" align=\"left\"><b>"+can_dollar+"</b></td>";
										strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"right\"><b>"+final_resourceTotal1+"</b></td>";
										strName += "</tr>";
									}
								}//End of if(counsaltantUniq1[m] == counsaltant1)
					         }//End of for(k < searchResults.length)
						if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
						{
							strName += "<tr>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"22\%\" font-size=\"10\"></td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\"></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"><b>Time SubTotal</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"11\%\" font-size=\"10\" align=\"center\"><b>"+parseFloat(subhourSum1).toFixed(1)+"</b></td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\"></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\" align=\"right\"><b>"+dollar+"</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13.7\%\" font-size=\"10\" align=\"right\"><b>"+final_subresourceTotal1+"</b></td>";
							strName += "</tr>";	
						}
						else
						{
							strName += "<tr>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"21\%\" font-size=\"10\"></td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"27\%\" font-size=\"10\"></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\"><b>Time SubTotal</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"10\%\" font-size=\"10\" align=\"center\"><b>"+parseFloat(subhourSum1).toFixed(1)+"</b></td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\"></td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\"></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"7\%\" font-size=\"10\" align=\"left\"><b>"+can_dollar+"</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"right\"><b>"+final_subresourceTotal1+"</b></td>";
							strName += "</tr>";	
						}
					}
					strName += "</table><br/>";
				
								
							
		
		//*************************************DETAIL EXPENSE DETAIL**********************************
				//var subresourceTotal1;
				var resourceTotal1 = '0';	
									    
				var filters = new Array();
				filters[0] = new nlobjSearchFilter('internalid','applyingTransaction','anyof',recrdId);
										
				var column = new Array();
				column[0] = new nlobjSearchColumn("tranid","applyingTransaction","GROUP");
				column[1] = new nlobjSearchColumn("internalid","applyingTransaction","GROUP");
				column[2] = new nlobjSearchColumn("companyname","job","GROUP");
				column[3] = new nlobjSearchColumn("entityid","employee","GROUP");
				column[4] = new nlobjSearchColumn("expensecategory",null,"GROUP");
				column[5] = new nlobjSearchColumn("formuladatetime",null,"GROUP");//.setFormula("{expensedate}");
				column[6] = new nlobjSearchColumn("formuladate",null,"GROUP");//.setFormula("{expensedate}+6").setSort(false);
				columns[7] = new nlobjSearchColumn("currency","applyingTransaction","GROUP");
				columns[8] = new nlobjSearchColumn("grossamount","applyingTransaction","SUM");
				columns[9] = new nlobjSearchColumn("amount","applyingTransaction","SUM");
				columns[10] = new nlobjSearchColumn("amount",null,"SUM");
				columns[11] = new nlobjSearchColumn("fxamount",null,"SUM");
				columns[12] = new nlobjSearchColumn("fxamount","applyingTransaction","SUM");
																
				var expSearchResults = nlapiSearchRecord('expensereport', 'customsearch_inv_oa_exp_print_search_2',filters,column);
				
				var tax = ffReqObj.getFieldValue('taxtotal');
				//nlapiLogExecution('DEBUG','Search Result','tax is :='+tax);
					
				if(taxtotal == null)
				{
					taxtotal = '';
					taxtotal = ffReqObj.getFieldValue('tax2total');
				}
					
				if(taxtotal != null)
				{
					var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
					var tax_fin = parseFloat(tax_taxSub_tot).toFixed(2);
					var taxamount = tax_fin.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
				}
					
				var fin32 = parseFloat(tax_taxSub_tot) + parseFloat(subresourceTotal1);
				
				var tot_fin32 = parseFloat(fin32).toFixed(2);
				
				var final_fin32 = tot_fin32.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
				
				//-----Fetch detail timesheet total,tax,and subtotal------					
				if(expSearchResults)
				{
									    	
				}
				else if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
				{
					
						strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"32\%\" font-size=\"10\"></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\" align=\"center\"><b>Total</b></td>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+final_fin32+"</b></td>";
						strName += "</tr>";									
						strName += "</table>";
					
				}
				else
				{
					
						strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"28\%\" font-size=\"10\"></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\" align=\"left\"><b>SubTotal</b></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+final_subresourceTotal1+"</b></td>";
						strName += "</tr>";
									    
						strName += "<tr>";
						strName += "<td border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"></td>";
						strName += "<td border-bottom=\"0.2\" width = \"32\%\" font-size=\"10\"></td>";
						strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\" align=\"letf\"><b>GST/HST Tax</b></td>";
						strName += "<td border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
						strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+taxamount+"</b></td>";
						strName += "</tr>";
											
						strName += "<tr>";
						strName += "<td border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"></td>";
						strName += "<td border-bottom=\"0.2\" width = \"32\%\" font-size=\"10\"></td>";
						strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\" align=\"left\"><b>Total</b></td>";
						strName += "<td border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.2\"  width = \"5\%\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
						strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+final_fin32+"</b></td>";
						strName += "</tr>";								
						strName += "</table>";
					
				}
					
				//**********************************Expense Table*********************************
							
					var ExpCounsultant;
					var ExptimePeriod;
					var ExpenseType;
					var ExpenseTotal;
					var ExpCurrency;
					var ExpDate;
					var amount;
					var final_grand_total;
					
					var expTotal = 0;
					var totalPayment = 0;
					var expresourceTotal1=0;
					var grand_total = 0;
					var tax_taxSub_tot;
					var dollar = '$';
					var can_dollar='C$';
					
					var ExpCounsultantArray = new Array();
					var ExptimePeriodArray = new Array();
					var ExpenseTypeArray = new Array();
					var ExpenseTotalArray = new Array();
					var ExpCurrencyArray = new Array();
					var expCounsaltantUniq = new Array();
					var ExpDateArray = new Array();
					var amountArray = new Array();
										
					var currencyArray1 = new Array();
										
					strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\"  >";
					if(expSearchResults)
					{
						strName += "<tr>";
						strName += "<td table-layout = \"fixed\" width = \"25\%\" font-size=\"11\" align=\"left\"><b>Expense Detail </b></td>";
						strName += "</tr>";
						strName += "</table>";
										
					
						strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\"  >";
						strName += "<tr>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" table-layout = \"fixed\" width = \"30\%\" font-size=\"10\"><b>Consultant</b></td>";
						strName += "<td  border-top=\"0.2\" table-layout = \"fixed\" width = \"35\%\" font-size=\"10\" align=\"left\"><b>Time Period</b></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" table-layout = \"fixed\" width = \"36\%\" font-size=\"10\" align=\"left\"><b>Expense Type</b></td>";
						strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>Total</b></td>";
						strName += "</tr>";
										
								
						if(expSearchResults != null && expSearchResults != '')
						{
							var length = expSearchResults.length;
							
							for (var p = 0;  p < expSearchResults.length; p++) 
							{
								ExpCounsultant = expSearchResults[p].getValue("entityid","employee","GROUP");
								ExpCounsultantArray.push(ExpCounsultant);
											
								expCounsaltantUniq = removeDuplicates(ExpCounsultantArray);
											
								var a = expCounsaltantUniq.toString();
								var counsult1 = a.replace(/(^,)|(,$)/g, "");
											
								ExpenseType = expSearchResults[p].getText("expensecategory",null,"GROUP");
								ExpenseTypeArray.push(ExpenseType);					
							}//End of for (var p = 0;  p < expSearchResults.length; p++) 
										
							for (var x = 0;  x < expCounsaltantUniq.length; x++) 
							{
								strName += "<tr>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" table-layout = \"fixed\" width = \"30\%\" font-size=\"10\">"+nlapiEscapeXML(expCounsaltantUniq[x])+"</td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"35\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"36\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\"></td>";
								strName += "</tr>";
								
								expTotal =0;
								for (var q = 0;  q < expSearchResults.length; q++) 
								{
									var counsaltantName = expSearchResults[q].getValue('entityid','employee','GROUP');
							        if(expCounsaltantUniq[x] == counsaltantName)
							        {
							            currency11 = expSearchResults[q].getText('currency','applyingTransaction','GROUP');
										currencyArray1.push(currency11);
										
										ExpenseType = expSearchResults[q].getText("expensecategory",null,"GROUP");
										ExpenseTypeArray.push(ExpenseType);
										
										amount = expSearchResults[q].getValue("fxamount","applyingTransaction","SUM");
										amountArray.push(amount);
										var tot_amount = parseFloat(amount).toFixed(2);
										var final_amount = tot_amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
												
										ExpCurrency = expSearchResults[q].getText("currency","applyingTransaction","GROUP");
										ExpCurrencyArray.push(ExpCurrency);
										
										expTotal += parseFloat(amount);
										var tot_expTotal = parseFloat(expTotal).toFixed(2);
										//nlapiLogExecution('DEBUG','SaveSarch','ExpenseTotal =='+tot_expTotal)
										var final_expTotal = tot_expTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");x	
										
										
										var date1 = new Date(expSearchResults[q].getValue("formuladate",null,"GROUP"));
										date1.setDate( date1.getDate() - 6 );
												 
										var date2 =  new Date(expSearchResults[q].getValue("formuladate",null,"GROUP"));
										
										var GetMonth =  expSearchResults[q].getValue("formuladatetime",null,"GROUP");
										//nlapiLogExecution('DEBUG','Search Result','GetMonth is :='+GetMonth);
											
										var str = GetMonth;
										var res = str.substr(5, 6);
										var res1 =str.substr(6, 6);
										if(res1 < 10)
										{
											res1 = '0' + res1;
											
										}
										else
										{
											res1 = res1;
										}	
										if(date1 !=null && date1 !='' && date2 !=undefined)
							            {
											var firstDay = new Date(date1.getFullYear(), date1.getMonth() , 1);
											var lastDay = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);
											
											
											var month1 = date2.getMonth() + 1;
											
											var day1 = date2.getDate();
											
											var year1 = date2.getFullYear();
											if(month1 < 10)
											{
												month1 = '0' + month1;
												
											}
											else
											{
												month1 = month1;
											}
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','month1 ='+month1);
											if(day1 < 10)
											{
												day1 = '0' + day1;
												
											}
											else
											{
												day1 = day1;
											}
											var d1 = month1 +"-" + day1+ "-" + year1;
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','day1 ='+day1);
											
											var month2 = date1.getMonth() + 1;
											var day2 = date1.getDate();
											var year2 = date1.getFullYear();
											if(month2 < 10)
											{
												month2 = '0' + month2;
												
											}
											else
											{
												month2 = month2;
											}
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','month2 ='+month2);
											if(day2 < 10)
											{
												day2 = '0' + day2;
												
											}
											else
											{
												day2 = day2;
											}
											var d2 = month2 +"-" + day2+ "-" + year2;
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','day2 ='+day2);
											
											var month3 = lastDay.getMonth() + 1;
											var day3 = lastDay.getDate();
											var year3 = lastDay.getFullYear();
											if(month3 < 10)
											{
												month3 = '0' + month3;
												
											}
											else
											{
												month3 = month3;
											}
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','month3 ='+month3);
											if(day3 < 10)
											{
												day3 = '0' + day3;
												
											}
											else
											{
												day3 = day3;
											}
											var d3 = month3+"-" + day3+ "-" + year3;
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','day3 ='+day3);
											
											var month4 = firstDay.getMonth() + 1;
											var day4 = firstDay.getDate();
											var year4 = firstDay.getFullYear();
											if(month4 < 10)
											{
												month4 = '0' + month4;
												
											}
											else
											{
												month4 = month4;
											}
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','month4 ='+month4);
											if(day4 < 10)
											{
												day4 = '0' + day4;
												
											}
											else
											{
												day4 = day4;
											}
											var d4 = res1 +"-" + day4+ "-" + year4;
											//nlapiLogExecution('DEBUG','SaveSarch For Summary TimeSheet','day4 ='+day4);
											
															    					
																			 
											if(date1.getMonth() == date2.getMonth())
											{
												var value1= d2+'  -  '+d1;
											}
																	   
											else if(date1.getMonth() != date2.getMonth() && date2.getMonth() != res )
											{
												var value1= d4+'  -  '+d1;
											}
											else 
											{
												var value1= d2+'  -   '+d3;
											}
										}
											
										
										totalPayment = parseFloat(resourceTotal1)+parseFloat(expTotal);
										if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
										{
											strName += "<tr>";
											strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"35\%\" font-size=\"10\" align=\"left\">"+value1+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"36\%\" font-size=\"10\" align=\"left\">"+ExpenseType+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\">"+dollar+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\">"+final_amount+"</td>";
											strName += "</tr>";
										}
										else
										{
											strName += "<tr>";
											strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"35\%\" font-size=\"10\" align=\"left\">"+value1+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"36\%\" font-size=\"10\" align=\"left\">"+ExpenseType+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"left\">"+can_dollar+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\">"+final_amount+"</td>";
											strName += "</tr>";
										}
							        }//End of if(expCounsaltantUniq[x] == counsaltantName)
								}//End of for (var q = 0;  q < expSearchResults.length; q++)
								
								var expresourceTotal1 = parseFloat(expresourceTotal1) + parseFloat(expTotal);
								var tot_expresourceTotal1 = parseFloat(expresourceTotal1).toFixed(2);
								var final_expresourceTotal1 = tot_expresourceTotal1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
								if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
								{
									strName += "<tr>";
									strName += "<td border-top=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
									strName += "<td border-top=\"0.2\" width = \"35\%\" font-size=\"10\"></td>";
									strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Resource Expense SubTotal</b></td>";
									strName += "<td border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
									strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+dollar+"</b></td>";
									strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expTotal+"</b></td>";
									strName += "</tr>";	
								}
								else
								{
									strName += "<tr>";
									strName += "<td border-top=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
									strName += "<td border-top=\"0.2\" width = \"35\%\" font-size=\"10\"></td>";
									strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Resource Expense SubTotal</b></td>";
									strName += "<td border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
									strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"left\"><b>"+can_dollar+"</b></td>";
									strName += "<td style='word-wrap: break-word' border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expTotal+"</b></td>";
									strName += "</tr>";	
								}
							}//End of for (var x = 0;  x < expCounsaltantUniq.length; x++) 
							
					if(subresourceTotal1 != null &&  expresourceTotal1 !=null)
					{
					   var tot = parseFloat(subresourceTotal1)+parseFloat(expresourceTotal1);
					   var total_tot = parseFloat(tot).toFixed(2);
					   var final_total_tot = total_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						
					}
					if(subresourceTotal1 == null &&  expresourceTotal1 !=null)
					{
						subresourceTotal1=0;
						var tot = parseFloat(subresourceTotal1)+parseFloat(expresourceTotal1);
						var total_tot = parseFloat(tot).toFixed(2);
						var final_total_tot = total_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
							
				    }
					if(subresourceTotal1 != null &&  expresourceTotal1 ==null)
					{
						expresourceTotal1=0;
						var tot = parseFloat(subresourceTotal1)+parseFloat(expresourceTotal1); 
						var total_tot = parseFloat(tot).toFixed(2);
						var final_total_tot = total_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
							
					}
					
					if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
					{
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"35\%\" font-size=\"10\"></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Expense SubTotal</b></td>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+dollar+"</b></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expresourceTotal1+"</b></td>";
						strName += "</tr>";
					}
					else
					{
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"35\%\" font-size=\"10\"></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Expense SubTotal</b></td>";
						strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\"><b>"+can_dollar+"</b></td>";
						strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expresourceTotal1+"</b></td>";
						strName += "</tr>";
					}
					
					}
						var tax = ffReqObj.getFieldValue('taxtotal');
						var taxtotal = ffReqObj.getFieldValue('tax2total');
										
							
						if(tax != null &&  taxtotal !=null)
						{
							tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
							var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2);
							var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						}
						if(tax == null &&  taxtotal !=null)
						{
							tax=0;
							tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
							var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2);
							var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						}
						if(tax != null &&  taxtotal ==null)
						{
						    taxtotal=0;
						    tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
						    var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2);
							var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						}
						if(tax_taxSub_tot != null &&  tot !=null)
						{
						    grand_total = parseFloat(tax_taxSub_tot) + parseFloat(tot);
						    //nlapiLogExecution('DEBUG','SAVESARCH','grand_total ='+grand_total);
						    
							var tot_grand_total = parseFloat(grand_total).toFixed(2);
							final_grand_total = tot_grand_total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
							//nlapiLogExecution('DEBUG','SAVESEARCH','Final Grand Total ='+final_grand_total);
						}    
					
						if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
						{
							
								strName += "<tr margin-top=\"25px\">";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"26\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"28\%\" font-size=\"10\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"25\%\" font-size=\"10\" align=\"center\"><b>Total</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_grand_total+"</b></td>";
								strName += "</tr>";
							
						}
						else
						{
								strName += "<tr margin-top=\"25px\">";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"28\%\" font-size=\"10\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\" align=\"left\"><b>SubTotal</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"left\"></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
								strName += "<td style='word-wrap: break-word' border-top=\"0.2\" border-bottom=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_total_tot+"</b></td>";
								strName += "</tr>";
													
								strName += "<tr>";
								strName += "<td border-bottom=\"0.2\"  table-layout = \"fixed\" width = \"26\%\" font-size=\"10\"></td>";
								strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"28\%\" font-size=\"10\"></td>";
								strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" table-layout = \"fixed\" width = \"25\%\" font-size=\"10\"><b>GST/HST Tax</b></td>";
								strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
								strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_tax_taxSub_tot+"</b></td>";
								strName += "</tr>";
											
								strName += "<tr>";
								strName += "<td border-bottom=\"0.2\"  table-layout = \"fixed\" width = \"26\%\" font-size=\"10\"></td>";
								strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"28\%\" font-size=\"10\"></td>";
								strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" table-layout = \"fixed\" width = \"25\%\" font-size=\"10\"><b>Total</b></td>";
								strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
								strName += "<td style='word-wrap: break-word' border-bottom=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_grand_total+"</b></td>";
								strName += "</tr>";	
						}
					}
					strName += "</table><br/>";
						
							
									
									
									
//************************************Footer Part*****************************************
					
					//*****************************For Wire Payment Details****************************
				if(tax_Subsidiary == 'AST LLC')
				{
					strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
					strName += "<tr>";
					strName += "<td border-top=\"0.2\" width = \"40\%\" font-size=\"10\"><b>For ACH and Wire Payments:</b></td>";
					strName += "</tr>";
									
					strName += "<tr>";
					strName += "<td width = \"40\%\" font-size=\"10\">Bank: &nbsp;JP Morgan Chase NA, Naperville, IL 60540</td>";
					strName += "</tr>";
									
					strName += "<tr>";
					strName += "<td width = \"40\%\" font-size=\"10\">ABA: &nbsp;071000013 | Account: 707783601</td>";
					strName += "</tr>";
					strName += "</table>";
									
					strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
					strName += "<tr>";
					strName += "<td  border-bottom=\"0.2\" width = \"40\%\" font-size=\"10\"><b>Checks should be payable to</b> &nbsp;Application Software Technology, LLC and mailed to 4343 Commerce Court, Suite 701, Lisle, IL 60532</td>";
					strName += "</tr>";
					strName += "</table><br/>";
				}		
				
				if(tax_Subsidiary == 'Serene AST LLC')
				{
					strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
					strName += "<tr>";
					strName += "<td border-top=\"0.2\" width = \"40\%\" font-size=\"10\"><b>For ACH and Wire Payments:</b></td>";
					strName += "</tr>";
									
					strName += "<tr>";
					strName += "<td width = \"40\%\" font-size=\"10\">Bank: &nbsp;JP Morgan Chase NA, Naperville, IL 60540</td>";
					strName += "</tr>";
									
					strName += "<tr>";
					strName += "<td width = \"40\%\" font-size=\"10\">ABA: 071000013 | Account: 780161787</td>";
					strName += "</tr>";
					strName += "</table>";
									
					strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
					strName += "<tr>";
					strName += "<td  border-bottom=\"0.2\" width = \"40\%\" font-size=\"10\"><b>Checks should be payable to</b> &nbsp;Serene AST, LLC and mailed to 4343 Commerce Court, Suite 701, Lisle, IL 60532</td>";
					strName += "</tr>";
					strName += "</table><br/>";
				}
				
				if(tax_Subsidiary == 'AST Canada')
				{
					strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
					
					strName += "<tr margin-top=\"15px\">";
					strName += "<td width = \"40\%\" font-size=\"10\" align=\"left\"><b>For Wire Payments:</b><br/><b>Receiving Bank:</b><br/>Bank of Montreal<br/>International Banking, Head Office<br/>Montreal<br/>S.W.I.F.T BIC Code: BOFMCAM2</td>";
					strName += "</tr>";
					
					
					strName += "<tr margin-top=\"15px\">";
					strName += "<td width = \"40\%\" font-size=\"10\" align=\"left\"><b>Beneficiary’s Bank:</b><br/>Bank of Montreal<br/>100 King St. West<br/>Toronto, ON M5X 1A3</td>";
					strName += "</tr>";
					
					strName += "<tr margin-top=\"15px\">";
					strName += "<td width = \"40\%\" font-size=\"10\" align=\"left\"><b>Beneficiary’s Account #:</b>00021804657**<br/><b>Branch Address:</b><br/>AST Canada Corporation<br/>115 Matheson BLVD W., Unit 116<br/>Mississauga, ON<br/>L5R 3L1</td>";
					strName += "</tr>";
					
					strName += "<tr margin-top=\"15px\">";
					strName += "<td width = \"40\%\" font-size=\"10\" align=\"left\">**Represents the beneficiary’s account number ID (11-digits) at Bank of Montreal- including a four (4) digits branch transit number followed by a seven (7) digits account number. Do not add any spaces or other symbols.<br/>Note: you may be required to include zeros (0) at the beginning of the transit number to ensure it has four (4) digits.</td>";
					strName += "</tr>";
					
					strName += "<tr margin-top=\"15px\">";
					strName += "<td width = \"40\%\" font-size=\"10\" align=\"left\"><b>For EFT Payments:</b><br/><b>Account Name: </b>AST Canada Corporation<br/><b>Transit &amp; Inst. #:</b> 00022-001<br/><b>Account #:</b> 1804657</td>";
					strName += "</tr>";
					
					strName += "<tr margin-top=\"15px\">";
					strName += "<td width = \"40\%\" font-size=\"10\" align=\"left\"><b>Branch Address:</b><br/>Bank of Montreal<br/>100 King Street West<br/>Toronto ON<br/>M5X1A3</td>";
					strName += "</tr>";
					
					strName += "<tr margin-top=\"15px\">";
					strName += "<td border-bottom=\"0.2\" width = \"40\%\" font-size=\"10\" align=\"left\"><b>Checks should be made payable to </b>AST Canada Corporation &amp; mailed to 4343 Commerce Court, Suite 701,<br/>Lisle, IL 60532</td>";
					strName += "</tr>";
					strName += "</table>";	
					}
						
						
						
						
						
						var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
						xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n";
						//xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><b>Country of Orgin:</b>China.<br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n<h3>Packing Print</h3>\n";
						xml += "<p></p>";
						xml += strName;
						xml += "</body>\n</pdf>";
					
						// run the BFO library to convert the xml document to a PDF 
						var file = nlapiXMLToPDF(xml);
					
						// set content type, file name, and content-disposition (inline means display in browser)
						response.setContentType('PDF','ASTInvoiceLayout.pdf', 'inline');
					
						// write response to the client
						response.write( file.getValue()); 
						}
					
					function removeDuplicates(arr)
					{
						var unique_array = []
						for(var i = 0;i < arr.length; i++)
						{
							if(unique_array.indexOf(arr[i]) == -1)
							{
								unique_array.push(arr[i])
							}
						}
						return unique_array;
					}
				
					function getWeekOfMonth(s) 
					{
						var startWeekDayIndex = 1; 
						// 1 MonthDay 0 Sundays
						var firstDate = new Date(s.getFullYear(),s.getMonth(),1);
						var firstDay = firstDate.getDay(); 
						var weekNumber = Math.ceil((s.getDate() + firstDay) / 7);
						//nlapiLogExecution('DEBUG','Search Result','weekNumber is :='+weekNumber);
						if (startWeekDayIndex == 1) 
						{ 
							if (s.getDay() == 0 && s.getDate() > 1) 
							{ 
								weekNumber -= 1;
							} 
							if (firstDate.getDate() == 1 && firstDay == 0 && s.getDate() > 1) 
							{ 
								weekNumber += 1; 
							}
						}
						return weekNumber;
					}
		
					
					 var weekMap = [6, 0, 1, 2, 3, 4, 5];
		
					  function startAndEndOfWeek(date) {
						var now = new Date(date);
						now.setHours(0, 0, 0, 0);
						var monday = new Date(now);
						monday.setDate(monday.getDate() - weekMap[monday.getDay()]);
						var sunday = new Date(now);
						sunday.setDate(sunday.getDate() - weekMap[sunday.getDay()] + 6);
						sunday.setHours(23, 59, 59, 999);
						
						var firstDay = new Date(date.getFullYear(), date.getMonth() , 1);
						var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
						//nlapiLogExecution('DEBUG','Search Result','lastDay is :='+lastDay);
						
						var month = monday.getMonth() + 1;
						var day = monday.getDate();
						var year = monday.getFullYear();
						 var d = month +"-" + day+ "-" + year;
						 
						 var month1 = sunday.getMonth() + 1;
							var day1 = sunday.getDate();
							var year1 = sunday.getFullYear();
							 var d1 = month1 +"-" + day1+ "-" + year1;
							 
							 var month2 = firstDay.getMonth() + 1;
								var day2 = firstDay.getDate();
								var year2 = firstDay.getFullYear();
								 var d2 = month2 +"-" + day2+ "-" + year2;
						
								 
								 var month3 = lastDay.getMonth() + 1;
									var day3 = lastDay.getDate();
									var year3 = lastDay.getFullYear();
									 var d3 = month3+"-" + day3+ "-" + year3;
							
								 
						if(monday.getMonth() == sunday.getMonth())
						{
							 return [d +' - '+ d1];
						}
					   
						else if(monday.getMonth() != sunday.getMonth() && monday.getMonth() == lastDay.getMonth())
						{
							 return [d +' - '+ d3];
						}
						else
						{
							 return [d2 +' - '+ d1];
						}	
					  }
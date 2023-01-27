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
			function suiteletInvoiceFixedFeeLayout(request, response)
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
				var AmtDue = ffReqObj.getFieldValue('amountremainingtotalbox');
				var AmtPaid = parseFloat(ffReqObj.getFieldValue('total'))-parseFloat(ffReqObj.getFieldValue('amountremainingtotalbox'));//total
				
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
							strName += "<td>";
							strName +="<img height='40' width='60' src=\""+nlapiEscapeXML(url1)+"\"></img>";
							strName += "</td>";
							strName += "<td colspan =\"8\" width = \"100\%\" font-size=\"10\"></td>";
							strName += "<td colspan =\"8\" font-size=\"10\"></td>";
							strName += "<td colspan =\"8\" font-size=\"10\"></td>";
							strName += "<td colspan =\"8\" width = \"100\%\"  align=\"right\" font-size=\"20\"><b>INVOICE</b></td>";
							strName += "</tr>";
							strName += "</table>";
						}
						else
						{
							strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
							strName += "<tr>";
							strName += "<td>";
							strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
							strName += "</td>";
							strName += "<td colspan =\"8\" width = \"100\%\" font-size=\"10\"></td>";
							strName += "<td colspan =\"8\" font-size=\"10\"></td>";
							strName += "<td colspan =\"8\" font-size=\"10\"></td>";
							strName += "<td colspan =\"8\" width = \"100\%\"  align=\"right\" font-size=\"20\"><b>INVOICE</b></td>";
							strName += "</tr>";
							strName += "</table>";
						}
						
						if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
						{
							if(billcontName == '')
							{
								strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
								strName += "<tr>";
								strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"<br/>"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+nlapiEscapeXML(sub_zip)+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
								strName += "</tr>";	
								strName += "</table ><br/>";
							}
							else
							{
								strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
								strName += "<tr>";
								strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
								strName += "</tr>";	
								strName += "</table ><br/>";
							}
						}
						else if(tax_Subsidiary == 'Serene AST Australia' )
						{
							if(billcontName == '')	
							{
								strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
								strName += "<tr>";
								strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"50.9\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(city)+"&nbsp;"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_city)+"&nbsp;"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +61 (0) 3 9225 5050 <br/>Phone: +61 (0) 3 9225 5441 </td>";
								strName += "</tr>";	
								strName += "</table ><br/>";
							}
							else
							{
								strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
								strName += "<tr>";
								strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(city)+"&nbsp;"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_city)+"&nbsp;"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Phone: 647-478-0177 <br/>Email: ar@astcorporation.com<br/>GST/HST #: 741870323RT0001</td>";
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
								strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
								strName += "</tr>";	
								strName += "</table ><br/>";
							}
							else
							{
								strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
								strName += "<tr>";
								strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
								strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
								strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Phone: 647-478-0177 <br/>Email: ar@astcorporation.com<br/>GST/HST #: 741870323RT0001</td>";
								strName += "</tr>";	
								strName += "</table ><br/>";
							}
						}	
					
				//***************************Time Entries Table************************************
				var service;
				var timePeriod;
				var total;
				var currency;
				var hourSum = '0';
				var resourceTotal = '0';
				var date;
				var subhourSum1;
				var subresourceTotal1;
				var description;
				var can_currency = 'C$';
				var AUD_currency = 'A$';
				var USD_currency = '$';
				
				var currencyArr = new Array();
				var totalAmountArr = new Array();
				var dateArr = new Array(); 
				var descriptionArr = new Array();
				
				var serviceArr = new Array();
				var currencyArr1 = new Array();
				var hourSumArr1 = new Array();
				var totalAmountArr1 = new Array();
				var resourceTotalArr1 = new Array();
				
				var filter = new Array();
				filter[0] = new nlobjSearchFilter('internalid',null,'is',recrdId);
				
				var columns = new Array();
				columns[0] = new nlobjSearchColumn('custcol_oa_date_description');
				columns[1] = new nlobjSearchColumn('item');
				columns[2] = new nlobjSearchColumn('custcol_oa_amount_description');
				columns[3] = new nlobjSearchColumn('amount');
				columns[4] = new nlobjSearchColumn('currency');
				columns[5] = new nlobjSearchColumn('custcol_oa_description_description');
				columns[6] = new nlobjSearchColumn('custcol_oa_service_description');
				
			    var fixedFeeSearchResults = nlapiSearchRecord('invoice','customsearch_inv_oa_fixed_print_search',filter,columns);
				nlapiLogExecution('DEBUG', 'InvoiceSearch', 'Invoice Search :=');	
				
				strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\">";
				strName += "<tr>";
				strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\"><b>Service Milestone</b></td>";
				strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"50\%\" font-size=\"10\"><b>Description</b></td>";
				strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"5\%\" font-size=\"10\"></td>";
				strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\"><b>Total</b></td>";
				strName += "</tr>";
				
				
				if (fixedFeeSearchResults != null && fixedFeeSearchResults != '')
				{
					var length = fixedFeeSearchResults.length;
					nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result length = ' + length);
					
					for (var i = 0;  i < fixedFeeSearchResults.length; i++) 
					{
						service = fixedFeeSearchResults[i].getValue('custcol_oa_service_description');
						if(service == 'Consulting Fee - POC')
						{
						  service ='Consulting Fee - Milestone';
						}
						if(service == 'Consulting Fee - Recurring')
						{
							service = "Monthly Recurring Support Fee";
						}
					
						//nlapiLogExecution('DEBUG','Search Result','service_name is :='+service_name); 
						
						date = fixedFeeSearchResults[i].getValue('custcol_oa_date_description');
						dateArr.push(date);
						nlapiLogExecution('DEBUG','Search Result','date is :='+date);
						
						description = fixedFeeSearchResults[i].getValue('custcol_oa_description_description');
						descriptionArr.push(description);
						nlapiLogExecution('DEBUG','Search Result','description is :='+description);
						
						currency = fixedFeeSearchResults[i].getText('currency');
						currencyArr.push(currency);
						nlapiLogExecution('DEBUG','Search Result','currency is :='+currencyArr);
						
					/*	var col_service = fixedFeeSearchResults[i].getValue('custcol_oa_service_description');
						nlapiLogExecution('DEBUG','Search Result','col_service is :='+col_service);
						if(col_service!=null && col_service=='Consulting Fee - POC')
						{
							col_service ='Consulting Fee - Milestone';
						}
						else
						{
							col_service =col_service;
						}*/
						
						
						var totalAmount = fixedFeeSearchResults[i].getValue('custcol_oa_amount_description');
						totalAmountArr.push(totalAmount);
						
						var tot_totalAmount = parseFloat(totalAmount).toFixed(2);
						var fin_totalAmount = tot_totalAmount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						//nlapiLogExecution('DEBUG','Search Result','totalAmount is :='+totalAmountArr);
						
						resourceTotal = parseFloat(resourceTotal) + parseFloat(totalAmount);
						var tot_resourceTotal = parseFloat(resourceTotal).toFixed(2);
						var fin_new_Totdollar = tot_resourceTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						//nlapiLogExecution('DEBUG','Search Result','resourceTotal is :='+resourceTotal);	
					
						if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
						{		
							strName += "<tr>";
							
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\">"+service+"</td>";	
							
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"50\%\" font-size=\"10\">"+description+"</td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" font-size=\"10\" align=\"center\">"+USD_currency+"</td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\">"+fin_totalAmount+"</td>";
							strName += "</tr>";
						}
						else if(tax_Subsidiary == 'Serene AST Australia')
						{		
							strName += "<tr>";
							
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\">"+service+"</td>";	
							
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"50\%\" font-size=\"10\">"+description+"</td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" font-size=\"10\" align=\"center\">"+AUD_currency+"</td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\">"+fin_totalAmount+"</td>";
							strName += "</tr>";
						}
						else
						{
							strName += "<tr>";
							
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\">"+service+"</td>";	
							
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"50\%\" font-size=\"10\">"+description+"</td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" font-size=\"10\" align=\"center\">"+can_currency+"</td>";
							strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\">"+fin_totalAmount+"</td>";
							strName += "</tr>";
						}
						
						//================= For Expense Line Change by Tushar =====================================================
					
					}//End of for
					
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
					column[8] = new nlobjSearchColumn("fxamount","applyingTransaction","SUM");
					
					var expSearchResults = nlapiSearchRecord('expensereport','customsearch_inv_oa_exp_print_search_sum',filters,column);
					var FinFxAmt=0;
					
					if(expSearchResults !=null )
					{
						for(var ac=0 ; ac<expSearchResults.length;ac++)
						{
							var fxAmt =expSearchResults[ac].getValue("fxamount","applyingTransaction","SUM");
							FinFxAmt+=parseFloat(fxAmt);
						}
						 if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
						 {
							    strName += "<tr>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\">Expenses</td>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"50\%\" font-size=\"10\">Expenses</td>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" font-size=\"10\" align=\"center\">"+USD_currency+"</td>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\">"+formatNumber(parseFloat(FinFxAmt).toFixed(2))+"</td>";
								strName += "</tr>";
						 }
						 else if(tax_Subsidiary == 'Serene AST Australia')
						 {
							    strName += "<tr>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\">Expenses</td>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"50\%\" font-size=\"10\">Expenses</td>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" font-size=\"10\" align=\"center\">"+AUD_currency+"</td>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\">"+formatNumber(parseFloat(FinFxAmt).toFixed(2))+"</td>";
								strName += "</tr>";
						 }
						 else
						 {
							 //can_currency
							    strName += "<tr>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\">Expenses</td>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"50\%\" font-size=\"10\">Expenses</td>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" font-size=\"10\" align=\"center\">"+can_currency+"</td>";
								strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\">"+formatNumber(parseFloat(FinFxAmt).toFixed(2))+"</td>";
								strName += "</tr>";
						 }
						
					}
					
				    strName += "</table><br/><br/>";
				    
					var tax = ffReqObj.getFieldValue('taxtotal');	
					var taxtotal = ffReqObj.getFieldValue('tax2total');
					
				    if(tax == null &&  taxtotal !=null)
					{
						tax=0;
						var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
						var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2); 
						var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						
					}
				    
				    
				    var EndTot = parseFloat(FinFxAmt)+parseFloat(resourceTotal);
				    if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
					{
					    strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"27\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\"><b>Total</b></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"25\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\"><b>"+currency+"</b></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(EndTot).toFixed(2))+"</b></td>";
						strName += "</tr>";
					}
				    else
				    {
				    	/*
						strName += "<tr>";
						strName += "<td border-top=\"0.5\"  width = \"30\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.5\"  width = \"5\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"center\"><b>Sub-Total</b></td>";
						strName += "<td border-top=\"0.5\"  width = \"14\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.5\"  width = \"35\%\" font-size=\"10\" align=\"left\"></td>";
						strName += "<td border-top=\"0.5\"  width = \"17\%\" font-size=\"10\" align=\"right\"><b>"+currency+"</b></td>";
						strName += "<td border-top=\"0.5\"  width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(EndTot).toFixed(2))+"</b></td>";
						strName += "</tr>";
						
				
						strName += "<tr>";
						strName += "<td border-top=\"0.5\"  width = \"30\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.5\"  width = \"5\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.5\"  width = \"30\%\" font-size=\"10\" align=\"center\"><b>Tax</b></td>";
						strName += "<td border-top=\"0.5\"  width = \"14\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.5\"  width = \"35\%\" font-size=\"10\" align=\"left\"></td>";
						strName += "<td border-top=\"0.5\"  width = \"17\%\" font-size=\"10\" align=\"right\"><b>"+currency+"</b></td>";
						strName += "<td border-top=\"0.5\"  width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(tax).toFixed(2))+"</b></td>";
						strName += "</tr>";
						*/
						
						
				    	strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"5\%\" font-size=\"10\"></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"center\"><b>Sub-Total</b></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"14\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"35\%\" font-size=\"10\" align=\"left\"></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"17\%\" font-size=\"10\" align=\"right\"><b>"+currency+"</b></td>";
						strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(EndTot).toFixed(2))+"</b></td>";
						strName += "</tr>";
				    }
				}
					strName += "</table>";
				
					
					var WithTax =parseFloat(EndTot)+parseFloat(tax);
					
					
					//============================================ Tushar Changes ===================================
					strName += "<br/>";
					var Total_fn=0;
					Total_fn = fin_totalAmount;
					
					//**********************************Expense Table*********************************
					
					if(expSearchResults !=null )	
					{
					var resourceTotal1 = '0';	
					
					
					
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
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency11)+"</b></td>";
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
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency11)+"</b></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" width = \"10\%\" align=\"right\"><b>"+fin_total_dollar1+"</b></td>";
						strName += "</tr>";
						
						strName += "<tr>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"><b> Tax</b></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"20\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\"></td>";        
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" width = \"25\%\" align=\"right\"></td>"; 
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency11)+"</b></td>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" width = \"10\%\" align=\"right\"><b>"+final_tax_taxSub_tot+"</b></td>";
						strName += "</tr>";
										
						strName += "<tr>";
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"><b>Total</b></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" width = \"20\%\" font-size=\"10\" align=\"right\"></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\"></td>";        
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" width = \"25\%\" align=\"right\"></td>"; 
						strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" width = \"13\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency11)+"</b></td>";
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
					var aus_dollar = 'A$';
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
							   					
							   			amount = expSearchResults[q].getValue("fxamount","applyingTransaction","SUM");
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
							   			nlapiLogExecution('DEBUG','SaveSearch','tax = '+tax);
										
										
										var taxtotal = ffReqObj.getFieldValue('tax2total');
										nlapiLogExecution('DEBUG','SaveSearch','taxtotal = '+taxtotal);
										
										
												
										nlapiLogExecution('DEBUG','SaveSearch','Total_fn = '+Total_fn);
										var time_exp_total = parseFloat(subTOtal) + parseFloat(Total_fn);
										//nlapiLogExecution('DEBUG','SaveSearch','v = '+time_exp_total);
										
										var fin = parseFloat(time_exp_total).toFixed(2);
										final_fin = fin.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
										
										/*var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
										var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2); 
										var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
										*/
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
										else if(tax_Subsidiary == 'Serene AST Australia')
										{
											strName += "<tr>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" align=\"left\" font-size=\"10\">"+nlapiEscapeXML(expCounsaltantUniq[x])+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+aus_dollar+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+airFair+"</td>";         //"+fin_rate+"
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+aus_dollar+"</td>"; 
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+hotel+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+aus_dollar+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+meals+" </td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+aus_dollar+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\">"+miscellaneous+"</td>";
											strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\">"+aus_dollar+"</td>";
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
						else if(tax_Subsidiary == 'Serene AST Australia')
						{
							strName += "<tr>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"><b>Expense SubTotal</b></td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+aus_dollar+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+subAirfair1+"</td>";         //"+fin_rate+"
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+aus_dollar+"</td>"; 
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+subhotel1+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+aus_dollar+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"15\%\">"+submeals1+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"10\%\">"+aus_dollar+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"21\%\">"+submisc1+"</td>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\" width = \"12\%\"><b>"+aus_dollar+"</b></td>";
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
						
					
										
						if(tax != null &&  taxtotal !=null)
						{
							var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
							var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2); 
							var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
							
						}
						if(tax != null &&  taxtotal !=null)
						{
							var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
							var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2); 
							var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
							
						}
						if(tax == null &&  taxtotal !=null)
						{
							tax=0;
							var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
							var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2); 
							var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
							
						}
						if(tax != null &&  taxtotal ==null)
						{
						    taxtotal=0;
						    var tax_taxSub_tot = parseFloat(tax) + parseFloat(taxtotal);
						    var tot_tax_taxSub_tot = parseFloat(tax_taxSub_tot).toFixed(2); 
							var final_tax_taxSub_tot = tot_tax_taxSub_tot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
							
						}
						if(tax_taxSub_tot != null &&  final_sub !=null)
						{
						    var final = parseFloat(final_sub) + parseFloat(tax_taxSub_tot);
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
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\"><b>"+formatNumber(parseFloat(EndTot).toFixed(2))+"</b></td>";
							strName += "</tr>";
							
							
							strName += "<tr>";
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-right=\"0.2\" border-left=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"><b>Tax</b></td>";
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
							
							var newValue = parseFloat(EndTot)+parseFloat(tax_taxSub_tot);
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
							strName += "<td style='word-wrap: break-word' table-layout = \"fixed\" border-top=\"0.2\" border-bottom=\"0.2\" border-right=\"0.2\" font-size=\"10\" align=\"right\" width = \"25\%\"><b>"+formatNumber(parseFloat(newValue).toFixed(2))+"</b></td>";
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
									    
									    
									    
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				
				
				//**********************Footer Part*****************************
				/*strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
				strName += "<tr>";
				strName += "<td width = \"40\%\" font-size=\"10\"><b>For ACH and Wire Payments:</b></td>";
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
				strName += "<td  border-bottom=\"0.5\" width = \"40\%\" font-size=\"10\"><b>Checks should be payable to</b> &nbsp; Application Software Technology, LLC and mailed to 4343 Commerce Court, Suite 701, Lisle, IL 60532</td>";
				strName += "</tr>";
				strName += "</table>";*/
	
				//strName += "<pbr/>";
				
	
				
				
				
				
				
				
				
				
				
				
				
	//=================================Expense Details======================================
				strName += "<br/>";
				
				if(tax_Subsidiary == 'Serene AST LLC')
				{
					strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
					strName += "<tr>";
					strName += "<td>";
					strName +="<img height='40' width='60' src=\""+nlapiEscapeXML(url1)+"\"></img>";
					strName += "</td>";
					strName += "<td colspan =\"8\" width = \"100\%\" font-size=\"10\"></td>";
					strName += "<td colspan =\"8\" font-size=\"10\"></td>";
					strName += "<td colspan =\"8\" font-size=\"10\"></td>";
					strName += "<td colspan =\"8\" width = \"100\%\"  align=\"right\" font-size=\"20\"><b>INVOICE</b></td>";
					strName += "</tr>";
					strName += "</table>";
				}
				else
				{
					strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
					strName += "<tr>";
					strName += "<td>";
					strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
					strName += "</td>";
					strName += "<td colspan =\"8\" width = \"100\%\" font-size=\"10\"></td>";
					strName += "<td colspan =\"8\" font-size=\"10\"></td>";
					strName += "<td colspan =\"8\" font-size=\"10\"></td>";
					strName += "<td colspan =\"8\" width = \"100\%\"  align=\"right\" font-size=\"20\"><b>INVOICE</b></td>";
					strName += "</tr>";
					strName += "</table>";
				}
									
				if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
				{
					if(billcontName == '')
					{
						strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
						strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"<br/>"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+nlapiEscapeXML(sub_zip)+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
						strName += "</tr>";	
						strName += "</table ><br/>";
					}
					else
					{
						strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
						strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
						strName += "</tr>";	
						strName += "</table ><br/>";
					}
				}
				else if(tax_Subsidiary == 'Serene AST Australia' )
				{
					if(billcontName == '')	
					{
						strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
						strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"50.9\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(city)+"&nbsp;"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_city)+"&nbsp;"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +61 (0) 3 9225 5050 <br/>Phone: +61 (0) 3 9225 5441 </td>";
						strName += "</tr>";	
						strName += "</table ><br/>";
					}
					else
					{
						strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
						strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(city)+"&nbsp;"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_city)+"&nbsp;"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Phone: 647-478-0177 <br/>Email: ar@astcorporation.com<br/>GST/HST #: 741870323RT0001</td>";
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
						strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
						strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Email: ar@astcorporation.com<br/>Fax: +1 (630) 778-1179 <br/>Phone: +1 (630) 778-1180 </td>";
						strName += "</tr>";	
						strName += "</table ><br/>";
					}
					else
					{
						strName += "<table width=\"100\%\"  font-family=\"Helvetica\" border-bottom=\"0.2\">";
						strName += "<tr>";
						strName += "<td border-top=\"0.2\" width = \"60\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"><b>Invoice&nbsp;</b>#:&nbsp;"+Invoice_no+"<br/><b>Date:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:</b>"+nlapiEscapeXML(res_Proj)+"<br/><b>Customer PO#:&nbsp;</b>"+nlapiEscapeXML(po_no)+"<br/></td>";
						strName += "<td border-top=\"0.2\" width = \"10\%\" align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"50\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>To</b><br/>"+nlapiEscapeXML(billcontName)+"<br/>"+nlapiEscapeXML(address)+"<br/>"+nlapiEscapeXML(addressText1)+"&nbsp;"+nlapiEscapeXML(addressText2)+"<br/>"+nlapiEscapeXML(state)+"&nbsp;"+zip+"&nbsp;"+nlapiEscapeXML(country)+"</td>";
						strName += "<td border-top=\"0.2\" width = \"5\%\"  align=\"left\" font-size=\"10\" table-layout = \"fixed\"></td>";
						strName += "<td border-top=\"0.2\" width = \"65\%\" align=\"right\" font-size=\"10\" table-layout = \"fixed\" style=\"word-break:break-all;\"><b>From</b><br/>"+nlapiEscapeXML(sub_address)+"<br/>"+nlapiEscapeXML(sub_addressText1)+"&nbsp;"+nlapiEscapeXML(sub_addressText2)+"<br/>"+nlapiEscapeXML(sub_state)+"&nbsp;"+sub_zip+"&nbsp;"+nlapiEscapeXML(sub_country)+"<br/>Phone: 647-478-0177 <br/>Email: ar@astcorporation.com<br/>GST/HST #: 741870323RT0001</td>";
						strName += "</tr>";	
						strName += "</table ><br/>";
					}
				}	
				
				
				
	
				
				
				
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
						/*else if(tax_Subsidiary == 'AST LLC' || tax_Subsidiary == 'Serene AST LLC')
						{
							
								strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
								strName += "<tr>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"32\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\" align=\"left\"><b>Total</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+final_fin32+"</b></td>";
								strName += "</tr>";									
								strName += "</table>";
							
						}
						else
						{
							
								strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
								strName += "<tr>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"28\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\" align=\"left\"><b>SubTotal</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+final_subresourceTotal1+"</b></td>";
								strName += "</tr>";
											    
								strName += "<tr>";
								strName += "<td border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"></td>";
								strName += "<td border-bottom=\"0.2\" width = \"32\%\" font-size=\"10\"></td>";
								strName += "<td border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\" align=\"letf\"><b>GST/HST Tax</b></td>";
								strName += "<td border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-bottom=\"0.2\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
								strName += "<td border-bottom=\"0.2\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+taxamount+"</b></td>";
								strName += "</tr>";
													
								strName += "<tr>";
								strName += "<td border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\"></td>";
								strName += "<td border-bottom=\"0.2\" width = \"32\%\" font-size=\"10\"></td>";
								strName += "<td border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\" align=\"left\"><b>Total</b></td>";
								strName += "<td border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" width = \"5\%\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\"  width = \"5\%\" border-bottom=\"0.2\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-bottom=\"0.2\" font-size=\"10\" align=\"left\"><b>"+nlapiEscapeXML(currency1)+"</b></td>";
								strName += "<td border-bottom=\"0.2\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+final_fin32+"</b></td>";
								strName += "</tr>";								
								strName += "</table>";
							
						}*/
							
						//**********************************Expense Table*********************************
									
							var ExpCounsultant;
							var ExptimePeriod;
							var ExpenseType;
							var ExpenseTotal;
							var ExpCurrency;
							var ExpDate;
							var amount;
							var final_grand_total;
							var currency11;
							
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
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"30\%\" font-size=\"10\"><b>Consultant</b></td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"35\%\" font-size=\"10\" align=\"left\"><b>Time Period</b></td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"36\%\" font-size=\"10\" align=\"left\"><b>Expense Type</b></td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>Total</b></td>";
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
										strName += "<td border-top=\"0.2\" table-layout = \"fixed\" width = \"30\%\" font-size=\"10\">"+nlapiEscapeXML(expCounsaltantUniq[x])+"</td>";
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
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"35\%\" font-size=\"10\" align=\"left\">"+value1+"</td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"36\%\" font-size=\"10\" align=\"left\">"+ExpenseType+"</td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\">"+dollar+"</td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\">"+final_amount+"</td>";
													strName += "</tr>";
												}
												else if(tax_Subsidiary == 'Serene AST Australia')
												{
													strName += "<tr>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"35\%\" font-size=\"10\" align=\"left\">"+value1+"</td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"36\%\" font-size=\"10\" align=\"left\">"+ExpenseType+"</td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\">"+aus_dollar+"</td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\">"+final_amount+"</td>";
													strName += "</tr>";
												}
												else
												{
													strName += "<tr>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"35\%\" font-size=\"10\" align=\"left\">"+value1+"</td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"36\%\" font-size=\"10\" align=\"left\">"+ExpenseType+"</td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"left\">"+can_dollar+"</td>";
													strName += "<td table-layout = \"fixed\" border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\">"+final_amount+"</td>";
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
											strName += "<td border-top=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Resource Expense SubTotal</b></td>";
											strName += "<td border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
											strName += "<td border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+dollar+"</b></td>";
											strName += "<td border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expTotal+"</b></td>";
											strName += "</tr>";	
										}
										else if(tax_Subsidiary == 'Serene AST Australia')
										{
											strName += "<tr>";
											strName += "<td border-top=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
											strName += "<td border-top=\"0.2\" width = \"35\%\" font-size=\"10\"></td>";
											strName += "<td border-top=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Resource Expense SubTotal</b></td>";
											strName += "<td border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
											strName += "<td border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+aus_dollar+"</b></td>";
											strName += "<td border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expTotal+"</b></td>";
											strName += "</tr>";	
										}
										else
										{
											strName += "<tr>";
											strName += "<td border-top=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
											strName += "<td border-top=\"0.2\" width = \"35\%\" font-size=\"10\"></td>";
											strName += "<td border-top=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Resource Expense SubTotal</b></td>";
											strName += "<td border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
											strName += "<td border-top=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+can_dollar+"</b></td>";
											strName += "<td border-top=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expTotal+"</b></td>";
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
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Expense SubTotal</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+dollar+"</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expresourceTotal1+"</b></td>";
								strName += "</tr>";
							}
							else if(tax_Subsidiary == 'Serene AST Australia' )
							{
								strName += "<tr>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"35\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Expense SubTotal</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+aus_dollar+"</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expresourceTotal1+"</b></td>";
								strName += "</tr>";
							}
							else
							{
								strName += "<tr>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"30\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"35\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"36\%\" font-size=\"10\"><b>Expense SubTotal</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\"></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+can_dollar+"</b></td>";
								strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_expresourceTotal1+"</b></td>";
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
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"25\%\" font-size=\"10\"><b>Expense Total</b></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+final_grand_total+"</b></td>";
										strName += "</tr>";
										
										var finTotalForBoth =parseFloat(final_grand_total)+parseFloat(resourceTotal);
										strName += "<tr>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"26\%\" font-size=\"10\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"28\%\" font-size=\"10\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"25\%\" font-size=\"10\"><b>Total</b></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(finTotalForBoth).toFixed(2))+"</b></td>";
										strName += "</tr>";
										
										strName += "<tr>";
										strName += "<td table-layout = \"fixed\" width = \"26\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" width = \"28\%\" font-size=\"10\"></td>";
										strName += "<td table-layout = \"fixed\" width = \"25\%\" font-size=\"10\"><b>Total payments to date</b></td>";
										strName += "<td table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
										strName += "<td table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
										strName += "<td table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(AmtPaid).toFixed(2))+"</b></td>";
										strName += "</tr>";
										
										strName += "<tr>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"26\%\" font-size=\"10\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"28\%\" font-size=\"10\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"25\%\" font-size=\"10\"><b>Balance Due</b></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(AmtDue).toFixed(2))+"</b></td>";
										strName += "</tr>";
									
								}
								else
								{
										strName += "<tr margin-top=\"25px\">";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"26\%\" font-size=\"10\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"28\%\" font-size=\"10\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"25\%\" font-size=\"10\" align=\"left\"><b>SubTotal</b></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"left\"></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
										strName += "<td border-top=\"0.2\" border-bottom=\"0.2\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(EndTot).toFixed(2))+"</b></td>";
										strName += "</tr>";
															
										strName += "<tr>";
										strName += "<td border-bottom=\"0.2\"  table-layout = \"fixed\" width = \"26\%\" font-size=\"10\"></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"28\%\" font-size=\"10\"></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"25\%\" font-size=\"10\"><b>Tax</b></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(tax).toFixed(2))+"</b></td>";
										strName += "</tr>";
													
										var secPage = parseFloat(EndTot)+ parseFloat(tax);
										strName += "<tr>";
										strName += "<td border-bottom=\"0.2\"  table-layout = \"fixed\" width = \"26\%\" font-size=\"10\"></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"28\%\" font-size=\"10\"></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"25\%\" font-size=\"10\"><b>Total</b></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+nlapiEscapeXML(ExpCurrency)+"</b></td>";
										strName += "<td border-bottom=\"0.2\" table-layout = \"fixed\" width = \"23\%\" font-size=\"10\" align=\"right\"><b>"+formatNumber(parseFloat(secPage).toFixed(2))+"</b></td>";
										strName += "</tr>";	
								}
							}
							strName += "</table><br/>";
								
								
									
											
					}						
					else
					{
						strName += "<br/><br/><br/><br/><br/>";
						
					}						
							
				
				
				
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
				strName += "<td width = \"40\%\" font-size=\"10\" align=\"left\">**Represents the beneficiary’s account number ID (11-digits) at Bank of Montreal- including a four (4) digits branch transit<br/>number followed by a seven (7) digits account number. Do not add any spaces or other symbols.<br/>Note: you may be required to include zeros (0) at the beginning of the transit number to ensure it has four (4) digits.</td>";
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
					
			if(tax_Subsidiary == 'Serene AST Australia')
			{
				strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
				strName += "<tr>";
				strName += "<td border-top=\"0.2\" width = \"40\%\" font-size=\"10\"><b>For ACH and Wire Payments:</b></td>";
				strName += "<td border-top=\"0.2\" ></td>";
				strName += "</tr>";
								
				strName += "<tr>";
				strName += "<td width = \"40\%\" font-size=\"10\">Bank: &nbsp;Westpac Banking Corporation</td>";
				strName += "</tr>";
								
				strName += "<tr>";
				strName += "<td width = \"40\%\" font-size=\"10\">BSB: &nbsp;032-289 </td>";
				strName += "</tr>";
				
				strName += "<tr>";
				strName += "<td width = \"40\%\" font-size=\"10\">Account Number: &nbsp;401046</td>";
				strName += "</tr>";
				
				strName += "<tr>";
				strName += "<td width = \"40\%\" font-size=\"10\">SWIFT: &nbsp;WPACAU2S</td>";
				strName += "</tr>";
				
				strName += "<tr>";
				strName += "<td width = \"40\%\" font-size=\"10\">ABN number: &nbsp;38141039107</td>";
				strName += "</tr>";
				strName += "</table>";
								
				strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
				strName += "<tr>";
				strName += "<td  border-bottom=\"0.2\" width = \"40\%\" font-size=\"10\"><b>Checks should be payable to</b> &nbsp;AST Corporation Pty. Ltd. and mailed to 4343 Commerce Court, Suite 701, Lisle, IL 60532</td>";
				strName += "</tr>";
				strName += "</table><br/>";	
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
				response.setContentType('PDF','ASTInvoiceLayout.pdf','inline');
			
				// write response to the client
				response.write( file.getValue()); 
				}
			
			
			
	
	//=========================Use function to remove duplication,get month and start and end date of week=================
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
			  
			  function formatNumber (num) {
					return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
				}
				
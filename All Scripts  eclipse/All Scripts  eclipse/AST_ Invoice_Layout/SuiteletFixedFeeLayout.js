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
			
			var Invoice_no;
			var Time_period;
			var terms;
			var due;
			var project;
			var billto;
			var shipto;
			var po_no;
			
			var recrdId = request.getParameter('custscript_invid');
			var recrdType = 'invoice';	
			var ffReqObj = nlapiLoadRecord(recrdType,recrdId);
			
			var subsidiary = ffReqObj.getFieldValue('subsidiary');
			var subsdryAddrs;

			if(subsidiary)
			{
			var s = nlapiLoadRecord("subsidiary", subsidiary,{recordmode: "dynamic"});
			
			subsdryAddrs = s.viewSubrecord("mainaddress").getFieldValue('addrtext');
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
			nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressText1);
			 
			sub_addressText1 = s.viewSubrecord("mainaddress").getFieldValue('addr1');
			if(sub_addressText1 == null)
			{
				sub_addressText1 = ' ';
			}
			nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressText1);
			  
			sub_addressText2 = s.viewSubrecord("mainaddress").getFieldValue('addr2');
			if(sub_addressText2 == null)
			{
				sub_addressText2 = ' ';
			}
			nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressText2);
			 
			sub_city = s.viewSubrecord("mainaddress").getFieldValue('city');
			if(sub_city == null)
			{
				sub_city = ' ';
			}
			nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_city);
			  
			sub_country = s.viewSubrecord("mainaddress").getFieldValue('country');
			if(sub_country == null)
			{
				sub_country = ' ';
			}
			nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_country);
			 
			sub_zip = s.viewSubrecord("mainaddress").getFieldValue('zip');
			if(sub_zip == null)
			{
				sub_zip = ' ';
			}
			nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_zip);
		}
			
			customer = ffReqObj.getFieldValue('entity');
			nlapiLogExecution('DEBUG','GET Value','customer :'+customer);
			if(customer == null)
			{
				customer = ' ';
			}
			
			Invoice_no = ffReqObj.getFieldValue('tranid');
			nlapiLogExecution('DEBUG','GET Value','Invoice No :'+Invoice_no);
			if(Invoice_no == null)
			{
				Invoice_no = ' ';
			}
			
			Time_period = ffReqObj.getFieldValue('asofdate');
			nlapiLogExecution('DEBUG','GET Value','Time_period :'+Time_period);
			if(Time_period == null)
			{
				Time_period = ' ';
			}
			
			terms = ffReqObj.getFieldText('terms');
			nlapiLogExecution('DEBUG','GET Value','terms :'+terms);
			if(terms == null)
			{
				terms = ' ';
			}
			
			due = ffReqObj.getFieldValue('duedate');
			nlapiLogExecution('DEBUG','GET Value','due :'+due);
			if(due == null)
			{
				due = ' ';
			}
			
			project = ffReqObj.getFieldValue('custbody_projectname');
			nlapiLogExecution('DEBUG','GET Value','project :'+project);
			if(project == null)
			{
				project = ' ';
			}
			
			billto = ffReqObj.getFieldValue('billaddress');
			nlapiLogExecution('DEBUG','GET Value','billto :'+billto);
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
			                      nlapiLogExecution('DEBUG','GET Value','addressID :'+addressID);
			                      
			                      address = invoiceAdd.getLineItemValue('addressbook', 'addressee', x);
			                      if(address == null)
			              		  {
			                    	  address = ' ';
			              		  }
			                      nlapiLogExecution('DEBUG','GET Value','address :'+address);
			                      
			                      addressText1 = invoiceAdd.getLineItemValue('addressbook', 'addr1', x);
			                      if(addressText1 == null)
			              		  {
			                    	  addressText1 = ' ';
			              		  }
			                      nlapiLogExecution('DEBUG','GET Value','addressText1 :'+addressText1);
			                      
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
			                      
			                      zip = invoiceAdd.getLineItemValue('addressbook', 'zip', x);
			                      if(zip == null)
			              		  {
			                    	  zip = ' ';
			              		  }
				            break;
			               }
			   }
			
			po_no = ffReqObj.getFieldValue('otherrefnum');
			nlapiLogExecution('DEBUG','GET Value','po_no :'+po_no);
			if(po_no == null)
			{
				po_no = ' ';
			}
			
			var count =ffReqObj.getLineItemCount('item');
			var proj1 =new Array();
			for (var z=1;z<=count;z++)
			{
				var proj = ffReqObj.getLineItemText('item','job',z);
				proj1.push(proj);
				break;
			}
			
			strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
			strName += "<tr>";
			strName += "<td>";
			strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
			strName += "</td>";
			strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"10\"></td>";
			strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"20\"><b>INVOICE</b></td>";
			strName += "</tr>";
			strName += "</table>";
			
			strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
			strName += "<tr>";
			strName += "<td border-top=\"0.5\" width = \"10\%\"  align=\"left\" font-size=\"10\"><b>Invoice&nbsp;</b>#&nbsp;"+Invoice_no+"<br/><b>Time Period:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project:&nbsp;</b>"+proj1+"<br/><b>Customer PO#:&nbsp;</b>"+po_no+"<br/></td>";
			strName += "<td border-top=\"0.5\" width = \"40\%\"  align=\"center\" font-size=\"10\"><b>To</b><br/>"+address+"<br/>"+addressText1+"&nbsp;"+addressText2+"<br/>"+city+"<br/>"+country+"&nbsp;"+zip+"</td>";
			strName += "<td border-top=\"0.5\" width = \"30\%\"  align=\"left\" font-size=\"10\"><b>From</b><br/>"+sub_address+"<br/>"+sub_addressText1+""+sub_addressText2+"<br/>"+sub_city+"<br/>"+sub_country+"&nbsp;"+sub_zip+"</td>";
			strName += "</tr>";	
			strName += "</table><br/>";
			
			
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
			
		    var fixedFeeSearchResults = nlapiSearchRecord('invoice','customsearch_inv_oa_fixed_print_search',filter,columns);
			nlapiLogExecution('DEBUG', 'InvoiceSearch', 'Invoice Search :=');	
			
			strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\">";
			strName += "<tr>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"15\%\" font-size=\"10\"><b>Date</b></td>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\"><b>Service/Expense Type</b></td>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\"><b>Description</b></td>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>Total</b></td>";
			strName += "</tr>";
			
			
			if (fixedFeeSearchResults != null && fixedFeeSearchResults != '')
			{
				var length = fixedFeeSearchResults.length;
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result length = ' + length);
				
				for (var i = 0;  i < fixedFeeSearchResults.length; i++) 
				{
					service = fixedFeeSearchResults[i].getText('item');
					serviceArr.push(service);
					nlapiLogExecution('DEBUG','Search Result','service is :='+service); 
					
					
					date = fixedFeeSearchResults[i].getValue('custcol_oa_date_description');
					dateArr.push(date);
					nlapiLogExecution('DEBUG','Search Result','date is :='+date);
					
					description = fixedFeeSearchResults[i].getValue('custcol_oa_description_description');
					descriptionArr.push(description);
					nlapiLogExecution('DEBUG','Search Result','description is :='+description);
					
					currency = fixedFeeSearchResults[i].getText('currency');
					currencyArr.push(currency);
					nlapiLogExecution('DEBUG','Search Result','currency is :='+currencyArr);
					
					var totalAmount = fixedFeeSearchResults[i].getValue('amount');
					totalAmountArr.push(totalAmount);
					nlapiLogExecution('DEBUG','Search Result','totalAmount is :='+totalAmountArr);
					
					resourceTotal = parseFloat(resourceTotal) + parseFloat(totalAmount);
					nlapiLogExecution('DEBUG','Search Result','resourceTotal is :='+resourceTotal);	
				}//End of for
						
				strName += "<tr>";
				strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"15\%\" font-size=\"10\">"+date+"</td>";
				strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"left\">"+service+"</td>";
				strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\">"+description+"</td>";
				strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\" align=\"right\">"+currency+"$&nbsp;"+totalAmount+"</td>";
				strName += "</tr>";
				
			    strName += "</table><br/><br/>";
			    
			    strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
				strName += "<tr>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\" align=\"center\"><b>Total</b></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"14\%\" font-size=\"10\" align=\"right\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+currency+"$&nbsp;"+resourceTotal.toFixed(2)+"</b></td>";
				strName += "</tr>";
			}
				strName += "</table>";
					
			/*
			strName += "<tr>";
				strName += "<td border-bottom=\"1px\" width = \"50\%\" font-size=\"11\"></td>";
				strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"></td>";
				strName += "<td border-bottom=\"1px\" width = \"48\%\" font-size=\"11\"><b>Time Sub-total</b></td>";
				strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>24</b></td>";
				strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
				strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
				strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
				strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>US$1,240.00</b></td>";
				strName += "</tr>";
				 
			*/
			
			
			//**********************Footer Part*****************************
			strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
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
			strName += "</table>";
			
			
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
		
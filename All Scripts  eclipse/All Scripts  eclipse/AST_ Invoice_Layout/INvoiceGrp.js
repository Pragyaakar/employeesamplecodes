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
			//nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressID);
			                      
			sub_address = s.viewSubrecord("mainaddress").getFieldValue('addressee');
			if(sub_addressText1 == null)
			{
				sub_addressText1 = ' ';
			}
			//nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressText1);
			 
			sub_addressText1 = s.viewSubrecord("mainaddress").getFieldValue('addr1');
			if(sub_addressText1 == null)
			{
				sub_addressText1 = ' ';
			}
			//nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressText1);
			  
			sub_addressText2 = s.viewSubrecord("mainaddress").getFieldValue('addr2');
			if(sub_addressText2 == null)
			{
				sub_addressText2 = ' ';
			}
			//nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_addressText2);
			 
			sub_city = s.viewSubrecord("mainaddress").getFieldValue('city');
			if(sub_city == null)
			{
				sub_city = ' ';
			}
			//nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_city);
			  
			sub_country = s.viewSubrecord("mainaddress").getFieldValue('country');
			if(sub_country == null)
			{
				sub_country = ' ';
			}
			//nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_country);
			 
			sub_zip = s.viewSubrecord("mainaddress").getFieldValue('zip');
			if(sub_zip == null)
			{
				sub_zip = ' ';
			}
			//nlapiLogExecution('DEBUG','GET Value','sub_addressID :'+sub_zip);
			              
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
			
			Time_period = ffReqObj.getFieldValue('asofdate');
			//nlapiLogExecution('DEBUG','GET Value','Time_period :'+Time_period);
			if(Time_period == null)
			{
				Time_period = ' ';
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
			var proj1 =new Array();
			for (var z=1;z<=count;z++)
			{
				var proj = ffReqObj.getLineItemValue('item','job',z);
				proj1.push(proj);
				break;
			}
			
			var projName =nlapiLookupField('job',proj,'companyname');
			
			var name =projName.toString();
			var n = name.lastIndexOf(":");
			var n1 = parseInt(n)+parseInt(1);
			var res = name.substr(n1,name.length);
			nlapiLogExecution('DEBUG','GET Value','projName :'+res);
			strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
			strName += "<tr>";
			strName += "<td>";
			strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
			strName += "</td>";
			strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"10\"></td>";
			strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"20\"><b>INVOICE</b></td>";
			strName += "</tr>";
			strName += "</table>";
			
			strName += "<table width=\"100\%\"  font-family=\"Helvetica\">";
			strName += "<tr>";
			strName += "<td border-top=\"0.5\" width = \"30\%\"  align=\"left\" font-size=\"10\"><b>Invoice&nbsp;</b>#&nbsp;"+Invoice_no+"<br/><b>Time Period:&nbsp;</b>"+Time_period+"<br/><b>Terms:&nbsp;</b>"+terms+"<br/><b>Due:&nbsp;</b>"+due+"<br/><b>Project: </b>"+res+"<br/><b>Customer PO#:&nbsp;</b>"+po_no+"<br/></td>";
			strName += "<td border-top=\"0.5\" width = \"40\%\"  align=\"center\" font-size=\"10\"><b>To</b><br/>"+address+"<br/>"+addressText1+"&nbsp;"+addressText2+"<br/>"+city+"<br/>"+country+"&nbsp;"+zip+"</td>";
			strName += "<td border-top=\"0.5\" width = \"30\%\"  margin-bottom= \"20px\"   align=\"left\" font-size=\"10\"><b>From</b><br/>"+sub_address+"<br/>"+sub_addressText1+""+sub_addressText2+"<br/>"+sub_city+"<br/>"+sub_country+"&nbsp;"+sub_zip+"</td>";
			strName += "</tr>";	
			strName += "</table  >";
			
			/*strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
			strName += "<tr>";
			strName += "<td border-top=\"1px\" align=\"left\" font-size=\"11\" width = \"50\%\"><b>To</b></td>";
			strName += "<td border-top=\"1px\" font-size=\"11\"></td>";
			strName += "<td border-top=\"1px\" font-size=\"11\"></td>";
			strName += "<td border-top=\"1px\" width = \"40\%\" font-size=\"11\"></td>";	
			strName += "<td border-top=\"1px\" font-size=\"11\" ><b>From</b></td>";
			strName += "</tr>";
			
			strName += "<tr>";
			strName += "<td align=\"left\" font-size=\"10\" width = \"50\%\">"+address+"<br/>"+addressText1+"&nbsp;"+addressText2+"<br/>"+city+"<br/>"+country+"&nbsp;"+zip+"</td>";
			strName += "<td font-size=\"11\"></td>";
			strName += "<td font-size=\"11\"></td>";
			strName += "<td font-size=\"11\"></td>";
			strName += "<td align=\"right\" font-size=\"10\" width = \"50\%\">"+sub_address+"<br/>"+sub_addressText1+""+sub_addressText2+"<br/>"+sub_city+"<br/>"+sub_country+"&nbsp;"+sub_zip+"</td>";
			strName += "</tr>";
			strName += "</table><br/>";
			*/
			
			
			//***************************Time Entries Table************************************
			var counsaltant;
			var timePeriod;
			var task;
			var hours;
			var rate;
			var total;
			var currency;
			var hourSum = '0';
			var resourceTotal = '0';
			var date;
			
			var startDay = 0; //0=sunday, 1=monday etc.
			var week = 0;
			var result = "";
			
			var counsaltantArr = new Array();
			var counsaltantUniq1 = new Array();
			var taskArr = new Array();
			var hoursArr = new Array();
			var myTruncArr = new Array();
			var currencyArr = new Array();
			var totalAmountArr = new Array();
			var dateArr = new Array(); 
			
			//var counsaltantUniq1 = new Array();
			var taskArr1 = new Array();
			var hoursArr1 = new Array();
			var myTruncArr1 = new Array();
			var currencyArr1 = new Array();
			var hourSumArr1 = new Array();
			var totalAmountArr1 = new Array();
			var resourceTotalArr1 = new Array();
		    
			var filter = new Array();
			filter[0] = new nlobjSearchFilter('internalid',null,'is',recrdId);
			
			var columns = new Array();
			columns[0] = new nlobjSearchColumn("formuladatetime",null,"GROUP");
			columns[1] = new nlobjSearchColumn("formuladate",null,"GROUP");
			columns[2] = new nlobjSearchColumn("tranid",null,"GROUP");
			columns[3] = new nlobjSearchColumn("companyname","job","GROUP");
			columns[4] = new nlobjSearchColumn("custcol_oa_user_description",null,"GROUP");
			columns[5] = new nlobjSearchColumn("trandate",null,"GROUP");
			columns[6] = new nlobjSearchColumn("custcol_oa_task_description",null,"GROUP");
			columns[7] = new nlobjSearchColumn("custcol_oa_credit_charge_type",null,"GROUP");
			columns[8] = new nlobjSearchColumn("formulacurrency",null,"SUM");
			columns[9] = new nlobjSearchColumn("custcol_oa_rate_description",null,"GROUP");
			columns[10] = new nlobjSearchColumn("amount",null,"SUM");
			columns[11] = new nlobjSearchColumn("currency",null,"GROUP");
			
		    var searchResults = nlapiSearchRecord('invoice', 'customsearch419',filter,columns);
			//nlapiLogExecution('DEBUG', 'InvoiceSearch', 'Invoice Search :=');	
			
			strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\"  >";
			if(searchResults)
			{
			strName += "<tr>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"25\%\" font-size=\"10\"><b>Consultant</b></td>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"28\%\" font-size=\"10\" align=\"left\"><b>Time Period</b></td>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"32\%\" font-size=\"10\"><b>Task</b></td>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>Hours</b></td>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\" align=\"right\"><b>Rate</b></td>";
			strName += "<td table-layout = \"fixed\" border-top=\"0.5\" border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>Total</b></td>";
			strName += "</tr>";
			
			
			if (searchResults != null && searchResults != '')
			{
				var length = searchResults.length;
				//nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result length = ' + length);
				
				for (var i = 0;  i < searchResults.length; i++) 
				{
					counsaltant = searchResults[i].getValue("custcol_oa_user_description",null,"GROUP");
					counsaltantArr.push(counsaltant);
					//nlapiLogExecution('DEBUG','Search Result','Counsaltant is :='+counsaltant);
					
					counsaltantUniq1 = removeDuplicates(counsaltantArr);
					
					var a =counsaltantUniq1.toString();
					var counsult = a.replace(/(^,)|(,$)/g, "");
					//nlapiLogExecution('DEBUG','Search Result','counsult Value :='+counsult);
	
					task = searchResults[i].getValue("custcol_oa_task_description",null,"GROUP");
					taskArr.push(task);
					//nlapiLogExecution('DEBUG','Search Result','Task is :='+task);

					}//End of for
			var subhourSum1=0;
			var subresourceTotal1=0;
				
				for (var m = 0;  m < counsaltantUniq1.length; m++) 
				{
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"25\%\" font-size=\"10\">"+counsaltantUniq1[m]+"</td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"28\%\" font-size=\"10\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"32\%\" font-size=\"10\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"15\%\" font-size=\"10\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\"></td>";
					strName += "</tr>";
					
					var hourSumGlob = '0';
					var resourceTotal1 = '0';
					
					for (var k = 0;  k < searchResults.length; k++) 
					{
						var hourSum1 = '0';
						var counsaltant1 = searchResults[k].getValue("custcol_oa_user_description",null,"GROUP");
						//counsaltantArr1.push(counsaltant1);
						//nlapiLogExecution('DEBUG','Search Result','Counsaltant is :='+counsaltant1);
						
						//nlapiLogExecution('DEBUG','Search Result','counsaltantUniq1[m] == counsaltant1:='+counsaltantUniq1[m]+ "==" +counsaltant1);
					//	nlapiLogExecution('DEBUG','Search Result','counsult Value :='+counsult);
	                 if(counsaltantUniq1[m] == counsaltant1)
	                   {
	                	
						var task1 = searchResults[k].getValue("custcol_oa_task_description",null,"GROUP");
						
						var hours1 = searchResults[k].getValue("formulanumeric",null,"SUM");
						
						
					
						hourSum1 =  parseFloat(hourSum1) + parseFloat(hours1);
						//nlapiLogExecution('DEBUG','Search Result','hourSum1 is :='+hourSum1);
						
						var rate1 = searchResults[k].getValue("custcol_oa_rate_description",null,"GROUP");
						var myTrunc1 = Math.round(rate1);
						myTruncArr1.push(myTrunc1)
						//nlapiLogExecution('DEBUG','Search Result','myTrunc1 is :='+myTruncArr1);
						
						var currency1 = searchResults[k].getText("currency",null,"GROUP");
						currencyArr1.push(currency1);
						//nlapiLogExecution('DEBUG','Search Result','currency1 is :='+currencyArr1);
						
						
						
						var totalAmount1 = parseInt(hours1) * parseFloat(rate1);
						totalAmountArr1.push(totalAmount1);
						//nlapiLogExecution('DEBUG','Search Result','totalAmount1 is :='+totalAmountArr1);
						
						var resourceTotal1 = parseFloat(resourceTotal1) + parseFloat(totalAmount1);
					//	nlapiLogExecution('DEBUG','Search Result','resourceTotal1 is :='+resourceTotal1);
						
						
						
						 var date1 = new Date(searchResults[k].getValue("formuladate",null,"GROUP"));
						 date1.setDate( date1.getDate() - 6 );
				         
						var date2 =  new Date(searchResults[k].getValue("formuladate",null,"GROUP"));
						
						//nlapiLogExecution('DEBUG','Search Result','date1 is :='+date1);
					//	nlapiLogExecution('DEBUG','Search Result','date2 is :='+date2);
					
					var GetMonth =  searchResults[k].getValue("formuladatetime",null,"GROUP");
                    nlapiLogExecution('DEBUG','Search Result','GetMonth is :='+GetMonth);
					
					var str = GetMonth;
                   var res = str.substr(5, 6);
				   var res1 =str.substr(6, 6);
						
						if(date1 !=null && date1 !='' && date2 !=undefined)
	                    {
									  var firstDay = new Date(date1.getFullYear(), date1.getMonth() , 1);
									    var lastDay = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);
									    
									       var month2 = date1.getMonth() + 1;
									       var day2 = date1.getDate();
									       var year2 = date1.getFullYear();
								    	   var d2 = month2 +"-" + day2+ "-" + year2;
							    
								    	   var month1 = date2.getMonth() + 1;
										    var day1 = date2.getDate();
										    var year1 = date2.getFullYear();
									    	 var d1 = month1 +"-" + day1+ "-" + year1;
									    	 
									    	 var month4 = firstDay.getMonth() + 1;
											    var day4 = firstDay.getDate();
											    var year4 = firstDay.getFullYear();
										    	 var d4 = res1 +"-" + day4+ "-" + year4;
									    
										    	 
										    	 var month3 = lastDay.getMonth() + 1;
												    var day3 = lastDay.getDate();
												    var year3 = lastDay.getFullYear();
											    	 var d3 = month3+"-" + day3+ "-" + year3;
											    	 
									    	 
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
											    	
											    		
														var value1= d2+'  -  '+d3;
											    }
						    
						
						
						//var value1= d2+'-'+d1;
					//	nlapiLogExecution('DEBUG','Search value for startNend','value for startEnd is :='+value1); 
	                    }
					
						
						strName += "<tr>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"25\%\" font-size=\"10\"></td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"28\%\" font-size=\"10\" align=\"left\">"+value1+"</td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"32\%\" font-size=\"10\">"+task1+"</td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"15\%\" font-size=\"10\" align=\"right\">"+hourSum1+"</td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\" align=\"right\">"+currency1+"$&nbsp;"+myTrunc1+"/hr</td>";
						strName += "<td table-layout = \"fixed\" border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\" align=\"right\">"+currency1+"$&nbsp;"+totalAmount1+"</td>";
						strName += "</tr>";
						}	
	                 hourSumGlob =  parseInt(hourSumGlob )+parseInt(hourSum1);
					}//End of for
					
					subhourSum1 = parseInt(subhourSum1 )+parseInt(hourSumGlob);
					subresourceTotal1 = parseFloat(subresourceTotal1) +parseFloat(resourceTotal1);
					 strName += "<tr>";
					 strName += "<td border-bottom=\"0.5\" width = \"25\%\" font-size=\"10\"></td>";
					 strName += "<td border-bottom=\"0.5\" width = \"28\%\" font-size=\"10\"></td>";
					 strName += "<td border-bottom=\"0.5\" width = \"32\%\" font-size=\"10\"><b>Resource Time Sub-total</b></td>";
					 strName += "<td border-bottom=\"0.5\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+hourSumGlob+"</b></td>";
					 strName += "<td border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\"></td>";
					 strName += "<td border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+currency1+"$&nbsp;"+resourceTotal1+"</b></td>";
					 strName += "</tr>";	
				}
			}//End of if loop
			
			    strName += "<tr>";
				strName += "<td border-bottom=\"0.5\" width = \"25\%\" font-size=\"10\"></td>";
				strName += "<td border-bottom=\"0.5\" width = \"28\%\" font-size=\"10\"></td>";
				strName += "<td border-bottom=\"0.5\" width = \"32\%\" font-size=\"10\"><b>Time Total</b></td>";
				strName += "<td border-bottom=\"0.5\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+subhourSum1+"</b></td>";
				strName += "<td border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\"></td>";
				strName += "<td border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+currency1+"$&nbsp;"+subresourceTotal1+"</b></td>";
				strName += "</tr>";
				}
			    strName += "</table><br/>";
		
			    
	//---------------------------------Expense Time Entry-------------------------------    
			    
			    var filters = new Array();
				filters[0] = new nlobjSearchFilter('internalid','applyingTransaction','anyof',recrdId);
				
				var column = new Array();
				column[0] = new nlobjSearchColumn("tranid","applyingTransaction","GROUP");
				column[1] = new nlobjSearchColumn("internalid","applyingTransaction","GROUP");
				column[2] = new nlobjSearchColumn("companyname","job","GROUP");
				column[3] = new nlobjSearchColumn("entityid","employee","GROUP");
				column[4] = new nlobjSearchColumn("expensecategory",null,"GROUP");
				column[5] = new nlobjSearchColumn("formuladatetime",null,"GROUP");
				column[6] = new nlobjSearchColumn("formuladate",null,"GROUP");
				columns[7] = new nlobjSearchColumn("currency","applyingTransaction","GROUP");
				columns[8] = new nlobjSearchColumn("grossamount","applyingTransaction","SUM");
				columns[9] = new nlobjSearchColumn("amount","applyingTransaction","SUM");
				columns[10] = new nlobjSearchColumn("amount",null,"SUM");
				columns[11] = new nlobjSearchColumn("fxamount",null,"SUM");
				columns[12] = new nlobjSearchColumn("fxamount","applyingTransaction","SUM");
				
			    var expSearchResults = nlapiSearchRecord('expensereport', 'customsearch_inv_oa_exp_print_search_2',filters,column);
				//nlapiLogExecution('DEBUG', 'InvoiceSearch', 'Invoice Expense Search :=');
				
			    
			    if(expSearchResults)
			    {
			    	
			    }
			    else
			    {
			    strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
				strName += "<tr>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"25\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"30\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"35\%\" font-size=\"10\" align=\"center\"><b>Total</b></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"15\%\" font-size=\"10\" align=\"right\"><b>"+subhourSum1+"</b></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"19\%\" font-size=\"10\" align=\"right\"><b>"+currency1+"$&nbsp;"+subresourceTotal1+"</b></td>";
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
				var expTotal = 0;
				var totalPayment = 0;
				var expresourceTotal1=0;
				var ExpCounsultantArray = new Array();
				var ExptimePeriodArray = new Array();
				var ExpenseTypeArray = new Array();
				var ExpenseTotalArray = new Array();
				var ExpCurrencyArray = new Array();
				var expCounsaltantUniq = new Array();
				var ExpDateArray = new Array();
				var amountArray = new Array();
				
				var currencyArray1 = new Array();
				//nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result recrdId = ' + recrdId);
				
			strName += "<table width=\"100\%\" table-layout = \"fixed\" font-family=\"Helvetica\">";
			if(expSearchResults)
			{	
			strName += "<tr>";
			strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"17\%\" font-size=\"10\"><b>Consultant</b></td>";
			strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"20\%\" font-size=\"10\" align=\"left\"><b>Time Period</b></td>";
			strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"27\%\" font-size=\"10\"><b>Expense Type</b></td>";
			strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"13\%\" font-size=\"10\" align=\"right\"><b>Total</b></td>";
			strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"10\%\" font-size=\"10\" align=\"right\"></td>";
			strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"10\%\" font-size=\"10\" align=\"right\"></td>";
			strName += "</tr>";
			
			//nlapiLogExecution('DEBUG','InvoiceSearch','expSearchResults.length :='+expSearchResults.length);
			
			if (expSearchResults != null && expSearchResults != '')
			{
				var length = expSearchResults.length;
				//nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result length = ' + length);
				
				for (var p = 0;  p < expSearchResults.length; p++) 
				{
					ExpCounsultant = expSearchResults[p].getValue("entityid","employee","GROUP");
					ExpCounsultantArray.push(ExpCounsultant);
					//nlapiLogExecution('DEBUG','Search Result','Expense Counsaltant is :='+ExpCounsultant);
					
					expCounsaltantUniq = removeDuplicates(ExpCounsultantArray);
					
					var a = expCounsaltantUniq.toString();
					var counsult1 = a.replace(/(^,)|(,$)/g, "");
					//nlapiLogExecution('DEBUG','Search Result','Expense counsult Value :='+counsult1);
					
					ExpenseType = expSearchResults[p].getText("expensecategory",null,"GROUP");
					ExpenseTypeArray.push(ExpenseType);
					//nlapiLogExecution('DEBUG','Search Result','Expence Type is :='+ExpenseTypeArray);	
					
				}//End of for
				
			//nlapiLogExecution('DEBUG','Search Result','expCounsaltantUniq.length is :='+expCounsaltantUniq.length);
			for (var x = 0;  x < expCounsaltantUniq.length; x++) 
			{
				strName += "<tr>";
				strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"17\%\" font-size=\"10\">"+expCounsaltantUniq[x]+"</td>";
				strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"20\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"27\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"13\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"10\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" table-layout = \"fixed\" width = \"10\%\" font-size=\"10\"></td>";
				strName += "</tr>";
				
				expTotal=0;
				for (var q = 0;  q < expSearchResults.length; q++) 
				{
					var counsaltantName = expSearchResults[q].getValue('entityid','employee','GROUP');
					//counsaltantArr1.push(counsaltant1);
					//nlapiLogExecution('DEBUG','Search Result','Expense counsaltantName is :='+counsaltantName);
					
					//nlapiLogExecution('DEBUG','Search Result','expCounsaltantUniq[x] == expCounsaltantUniq[x]:='+expCounsaltantUniq[x]+ "==" +expCounsaltantUniq[x]);
				//	nlapiLogExecution('DEBUG','Search Result','counsult Value :='+counsult);
	               if(expCounsaltantUniq[x] == counsaltantName)
	               {
	            	
	            	   
					currency11 = expSearchResults[q].getText('currency','applyingTransaction','GROUP');
					currencyArray1.push(currency11);
					//nlapiLogExecution('DEBUG','Search Result','currency11 is :='+currencyArray1);
					
					ExpenseType = expSearchResults[q].getText("expensecategory",null,"GROUP");
					ExpenseTypeArray.push(ExpenseType);
					//nlapiLogExecution('DEBUG','Search Result','Expence Type1 is :='+ExpenseType);	
					
					
					amount = expSearchResults[q].getValue("amount","applyingTransaction","SUM");
					amountArray.push(amount);
					//nlapiLogExecution('DEBUG','Search Result','Expence Amount1 is :='+amount);	
					
					ExpCurrency = expSearchResults[q].getText("currency","applyingTransaction","GROUP");
					ExpCurrencyArray.push(ExpCurrency);
					//nlapiLogExecution('DEBUG','Search Result','Expence currency1 is :='+ExpCurrency);
					
					
					
					var date1 = new Date(expSearchResults[q].getValue("formuladate",null,"GROUP"));
					 date1.setDate( date1.getDate() - 6 );
			         
					var date2 =  new Date(expSearchResults[q].getValue("formuladate",null,"GROUP"));
					
					//nlapiLogExecution('DEBUG','Search Result','date1 is :='+date1);
				//	nlapiLogExecution('DEBUG','Search Result','date2 is :='+date2);
				
				var GetMonth =  expSearchResults[q].getValue("formuladatetime",null,"GROUP");
               nlapiLogExecution('DEBUG','Search Result','GetMonth is :='+GetMonth);
				
				var str = GetMonth;
              var res = str.substr(5, 6);
			   var res1 =str.substr(6, 6);
					
					if(date1 !=null && date1 !='' && date2 !=undefined)
                   {
								  var firstDay = new Date(date1.getFullYear(), date1.getMonth() , 1);
								    var lastDay = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);
								    
								       var month2 = date1.getMonth() + 1;
								       var day2 = date1.getDate();
								       var year2 = date1.getFullYear();
							    	   var d2 = month2 +"-" + day2+ "-" + year2;
						    
							    	   var month1 = date2.getMonth() + 1;
									    var day1 = date2.getDate();
									    var year1 = date2.getFullYear();
								    	 var d1 = month1 +"-" + day1+ "-" + year1;
								    	 
								    	 var month4 = firstDay.getMonth() + 1;
										    var day4 = firstDay.getDate();
										    var year4 = firstDay.getFullYear();
									    	 var d4 = res1 +"-" + day4+ "-" + year4;
								    
									    	 
									    	 var month3 = lastDay.getMonth() + 1;
											    var day3 = lastDay.getDate();
											    var year3 = lastDay.getFullYear();
										    	 var d3 = month3+"-" + day3+ "-" + year3;
										    	 
								    	 
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
					    
					
					
					//var value1= d2+'-'+d1;
				//	nlapiLogExecution('DEBUG','Search value for startNend','value for startEnd is :='+value1); 
                   }
					
					
					expTotal += parseFloat(amount);
					//nlapiLogExecution('DEBUG','Search Result','expTotal is :='+expTotal);
					
					totalPayment = parseFloat(resourceTotal1)+parseFloat(expTotal);
					//nlapiLogExecution('DEBUG','Search Result','totalPayment is :='+totalPayment);
					
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-top=\"0.5\" width = \"17\%\" font-size=\"10\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"0.5\" width = \"20\%\" font-size=\"10\" align=\"left\">"+value1+"</td>";
					strName += "<td table-layout = \"fixed\" border-top=\"0.5\" width = \"27\%\" font-size=\"10\">"+ExpenseType+"</td>";
					strName += "<td table-layout = \"fixed\" border-top=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\">"+ExpCurrency+"$"+amount+"</td>";
					strName += "<td table-layout = \"fixed\" border-top=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\"></td>";
					strName += "</tr>";
					
					}	
				  }//End of for
				var expresourceTotal1 = parseFloat(expresourceTotal1) + parseFloat(expTotal);
				//nlapiLogExecution('DEBUG','Search Result','Expense Total is :='+expresourceTotal1);
				
         
				
				strName += "<tr>";
				strName += "<td border-top=\"0.5\" width = \"17\%\" font-size=\"10\"></td>";
			    strName += "<td border-top=\"0.5\" width = \"20\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" width = \"27\%\" font-size=\"10\"><b>Resource Expense Sub-total</b></td>";
				strName += "<td border-top=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\"><b>"+ExpCurrency+"$&nbsp;"+expTotal.toFixed(2)+"</b></td>";
				strName += "<td border-top=\"0.5\" width = \"10\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\"></td>";
				strName += "</tr>";	
			    }
			
		     if(subresourceTotal1 != null &&  expresourceTotal1 !=null)
             {
               var tot = parseFloat(subresourceTotal1)+parseFloat(expresourceTotal1);
             }
            if(subresourceTotal1 == null &&  expresourceTotal1 !=null)
             {
                 subresourceTotal1=0;
                 var tot = parseFloat(subresourceTotal1)+parseFloat(expresourceTotal1);    
               }
             if(subresourceTotal1 != null &&  expresourceTotal1 ==null)
             {
                 expresourceTotal1=0;
                 var tot = parseFloat(subresourceTotal1)+parseFloat(expresourceTotal1);    
               }
			
				strName += "<tr>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"17\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"27\%\" font-size=\"10\"><b>Expense Total</b></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"13\%\" font-size=\"10\" align=\"right\"><b>"+ExpCurrency+"$&nbsp;"+expresourceTotal1.toFixed(2)+"</b></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\"></td>";
				strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"right\"></td>";
				strName += "</tr>";
				}
				strName += "</table><br/><br/>";
			
			//	var tot = parseFloat(subresourceTotal1)+parseFloat(expresourceTotal1);
			strName += "<table width=\"100\%\" font-family=\"Helvetica\">";
			strName += "<tr>";
			strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"17\%\" font-size=\"10\"></td>";
			strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"20\%\" font-size=\"10\"></td>";
			strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"27\%\" font-size=\"10\" align=\"left\"><b>Total</b></td>";
			strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"left\"></td>";
			strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\"></td>";
			strName += "<td border-top=\"0.5\" border-bottom=\"0.5\" width = \"10\%\" font-size=\"10\" align=\"left\"><b>"+ExpCurrency+"$&nbsp;"+tot.toFixed(2)+"</b></td>";
			strName += "</tr>";
			}
			strName += "</table>";
			
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
	
		function getWeekOfMonth(s) 
		{
			var startWeekDayIndex = 1; 
			// 1 MonthDay 0 Sundays
			var firstDate = new Date(s.getFullYear(),s.getMonth(),1);
			var firstDay = firstDate.getDay(); 
			var weekNumber = Math.ceil((s.getDate() + firstDay) / 7);
			nlapiLogExecution('DEBUG','Search Result','weekNumber is :='+weekNumber);
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
		    
		    
	/*	    if(monday.getMonth() == sunday.getMonth())
		    {
		    	 return [monday.toISOString().split('T')[0] +' - '+ sunday.toISOString().split('T')[0]];
		    }
		   
		    else if(monday.getMonth() != sunday.getMonth() && monday.getMonth() == lastDay.getMonth())
		    {
		    	 return [monday.toISOString().split('T')[0] +' - '+ lastDay.toISOString().split('T')[0]];
		    }
		    else
		    {
		    	 return [firstDay.toISOString().split('T')[0] +' - '+ sunday.toISOString().split('T')[0]];
		    }
		    */
		    
		  }
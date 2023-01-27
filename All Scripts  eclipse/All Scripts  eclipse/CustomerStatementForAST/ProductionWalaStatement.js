	function suiteletStatement(request,response)
	{
		try{
		var recId = request.getParameter('custscript_custmrecid');
		var billAddress;
		var subsidiaryAddress;
		var currency;
		var amountDue;
		var startdate;
		var enddate;
		var subsidiary;
		
		if(recId)
		{
			var recObj = nlapiLoadRecord('customrecord_cust_statement',recId);
		  
			var customer= recObj.getFieldValue('custrecord_custstat_customer'); 
			var customerName= recObj.getFieldText('custrecord_custstat_customer');
			nlapiLogExecution('DEBUG', 'aftr submit', "  customer==" + customerName);

			startdate= recObj.getFieldValue('custrecord_customerstat_startdate');
			nlapiLogExecution('DEBUG', 'aftr submit', "  startdate  ==" + startdate);

			enddate= recObj.getFieldValue('custrecord_cust_statement_enddate');
			//enddate= new Date();
			nlapiLogExecution('DEBUG', 'aftr submit', "  enddate  ==" + enddate);
			
			currency = recObj.getFieldText('custrecord_custstat_currency');
			nlapiLogExecution('DEBUG', 'aftr submit', "  currency  ==" + currency);
			
			var subsidiaryTx = recObj.getFieldText('custrecord_custstat_subsidiary');
			
			amountDue = recObj.getFieldValue('custrecord_custat_amt_due');
			nlapiLogExecution('DEBUG', 'aftr submit', "  amountDue  ==" + amountDue);
			
			var billAddress = recObj.getFieldValue('custrecord_address');
			nlapiLogExecution('DEBUG', 'aftr submit', "  billAddress  ==" + billAddress);
			if(billAddress == null)
			{
				billAddress =" ";
			}
			var subsidiary = recObj.getFieldValue('custrecord_custstat_subsidiary');
			var subsdryAddrs;

		 if(subsidiary)
			{
				var s = nlapiLoadRecord("subsidiary", subsidiary,{recordmode: "dynamic"});
				subsdryAddrs = s.viewSubrecord("mainaddress").getFieldValue('addrtext');
				if(subsdryAddrs == null)
				{
					subsdryAddrs ="";
				}
			}
		}
		
		
		var customerRecord = nlapiLoadRecord('customer', customer);
		var numberOfAddress = customerRecord.getLineItemCount('addressbook');
		  
		var city ;
		var addressText2 ;
		var addressText1 ;
		var country ;
		var addressID ;
		var zip ;
		   for (var x = 1; x <= numberOfAddress; x++)
		   {
		          var defaultaddress = customerRecord.getLineItemValue('addressbook', 'defaultbilling', x);
		               if (defaultaddress == 'T')
		               {
		                      addressID = customerRecord.getLineItemValue('addressbook', 'internalid', x);
		                      addressText1 = customerRecord.getLineItemValue('addressbook', 'addr1', x);
		                      addressText2 = customerRecord.getLineItemValue('addressbook', 'addr2', x);
		                      city = customerRecord.getLineItemValue('addressbook', 'city', x);
		                      country = customerRecord.getLineItemValue('addressbook', 'country', x);
		                      zip = customerRecord.getLineItemValue('addressbook', 'zip', x);
			            break;
		               }
		   }
		    var custCreatedDate;
		   var firstTranDate = getFirstTransactionDate(customer);
		   if (firstTranDate != null && firstTranDate != '' && firstTranDate != undefined) 
			{
				custCreatedDate = nlapiStringToDate(firstTranDate);
			}
		   
		   var openingBalance = getOpeningBalance(customer, custCreatedDate, startdate);
		   
		 var payWithinRange =  getOpeningBalancePaymentWithin(customer, startdate, enddate)
		   
			var searchId1 = 'customsearch348';
			var searchId2 = 'customsearch_pay_search';
	        var searchId3 = 'customsearch_inv_search';
		
	        var transItemSearch1;
		
	        var transItemSearch2;
			var transItemSearch3;
	
			var jsonArray1=[];
			var jsonArray2=[];
		    var jsonArray3=[];  
		    var jsonArray4=[];
		    var jsonArray5 =[];
		   

			transItemSearch1 = findTransaction1(searchId1,customer,startdate,enddate);
			transItemSearch2 = findTransaction2(searchId2,customer,startdate,enddate);
		    transItemSearch3 = findTransaction3(searchId3,customer,startdate,enddate);
		
		
			
			if(transItemSearch1)
			{
			
			   
				nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch1 length  ==" + transItemSearch1.length);
				
				for(var i=0;i<transItemSearch1.length;i++)
				{
					var jsonObj = {
											'date':transItemSearch1[i].getValue('trandate'),
											'entity':transItemSearch1[i].getValue('entity'),
											'type':transItemSearch1[i].getValue('type'), 
											'projName':transItemSearch1[i].getValue("companyname","CUSTBODY_PROJECTNAME"), 
											'tranid':transItemSearch1[i].getValue('tranid'),
											'inv_amount':transItemSearch1[i].getValue("formulacurrency"),
											'duedate':transItemSearch1[i].getValue("duedate"),//new nlobjSearchColumn("daysopen")
											
								   };
						jsonArray1.push(jsonObj);
						
				}
				
				var DateArr = new Array();
				var EntityArr = new Array();
				var tranIdArr = new Array();
				var TypeArr = new Array();
				var AmtArr = new Array();
				var DueDayArr = new Array();
			/*    for(var l=0;l<jsonArray1.length;l++)
				{
			       
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].date ==" + jsonArray1[l].date);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].entity  ==" + jsonArray1[l].entity);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].tranid  ==" +  jsonArray1[l].tranid);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].recType  ==" +jsonArray1[l].type);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].formulacurrency  ==" +jsonArray1[l].formulacurrency);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].formulacurrency  ==" +jsonArray1[l].duedate);
					
					DateArr.push(jsonArray1[l].date);
					EntityArr.push(jsonArray1[l].entity);
					tranIdArr.push(jsonArray1[l].tranid);
					TypeArr.push(jsonArray1[l].type);
					AmtArr.push(jsonArray1[l].formulacurrency);
					DueDayArr.push(jsonArray1[l].duedate);
				}
				*/
			}//end of transitemsearch1
		 
			if(transItemSearch2)
			{
			
			   
				nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch2 length  ==" + transItemSearch2.length);
				
				for(var i=0;i<transItemSearch2.length;i++)
				{
					var jsonObj = {
											'entity':transItemSearch2[i].getValue("entity",null,"GROUP"),
											'type':transItemSearch2[i].getValue("applyinglinktype",null,"GROUP"),
											'date':transItemSearch2[i].getValue("trandate","applyingTransaction","GROUP"),
										   'tranid':transItemSearch2[i].getValue("tranid",null,"GROUP"),
										   'status':transItemSearch2[i].getValue("statusref",null,"GROUP"),
										   'pay_amount':transItemSearch2[i].getValue("applyingforeignamount",null,"SUM"),
										   'projName':transItemSearch2[i].getText("companyname","CUSTBODY_PROJECTNAME","GROUP"),
										   'currency':transItemSearch2[i].getValue("currency",null,"GROUP")
										};
						jsonArray2.push(jsonObj);
						
				}
				 var curr =new Array();
				 var newUniqCurr =new Array();
			/*   for(var l=0;l<jsonArray2.length;l++)
				{
				   nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].entity  ==" + jsonArray2[l].entity);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].type  ==" + jsonArray2[l].type);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].date  ==" + jsonArray2[l].date);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].tranid  ==" +jsonArray2[l].tranid );
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].status  ==" + jsonArray2[l].status);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].amount  ==" + jsonArray2[l].amount);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].applytranid ==" + jsonArray2[l].applytranid);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].applyType  ==" +jsonArray2[l].applyType );
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].applyingforeignamount ==" + jsonArray2[l].applyingforeignamount);  
				   	nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].projName  ==" +jsonArray2[l].projName  );
				
				  curr.push(jsonArray2[l].currency);
				 
				}*/
			 }//end of transitemsearch2

			uniqueArray=squash(curr);
			nlapiLogExecution('DEBUG', 'aftr submit', " newUniqCurr  ==" +uniqueArray);
			
			    if(transItemSearch3)
			    {
			
			   
				nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch3 length  ==" + transItemSearch3.length);
				
				for(var i=0;i<transItemSearch3.length;i++)
				{
					var jsonObj = {
							'entity':transItemSearch3[i].getValue("entity",null,"GROUP"),
							'type':transItemSearch3[i].getValue("type",null,"GROUP"),
							'date':transItemSearch3[i].getValue("trandate",null,"GROUP"),
						    'tranid':transItemSearch3[i].getValue("tranid",null,"GROUP"),
						    'status':transItemSearch3[i].getValue("statusref",null,"GROUP"),
						    'inv_amount':transItemSearch3[i].getValue("fxamount",null,"MAX"),
						    'invpay_amount':transItemSearch3[i].getValue("applyingforeignamount",null,"SUM"),
						    'projName':transItemSearch3[i].getText("companyname","CUSTBODY_PROJECTNAME","GROUP"),
						    'currency':transItemSearch3[i].getValue("currency",null,"GROUP")
						};
						jsonArray3.push(jsonObj);
						
				}
				
				/*for(var l=0;l<jsonArray3.length;l++)
				{
					
					//nlapiLogExecution('DEBUG', 'aftr submit', "  sorted_arr  ==" + sorted_arr);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].entity  ==" + jsonArray3[l].entity);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].type  ==" + jsonArray3[l].type);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].date  ==" + jsonArray3[l].date);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].tranid  ==" +jsonArray3[l].tranid );
					  nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].amount ==" +jsonArray3[l].amount );
				
				}*/
				
			  }////end of transitemsearch3  
			    
			  
      jsonArray4=mergeArrays(jsonArray1,jsonArray2); 
      
      jsonArray5=mergeArrays(jsonArray4,jsonArray3); 
			    
      jsonArray5.sort(function compare(a, b) {
					  var dateA = new Date(a.date);
					  var dateB = new Date(b.date);
					  return dateA - dateB;
					});
		
			
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      var BalTotal1=0;
      
      for(var l=0;l<jsonArray5.length;l++)
		 {
			 
			     
			 
			                 var zero ='0';
					 
						  
				             if(jsonArray5[l].inv_amount != null && jsonArray5[l].inv_amount != undefined && jsonArray5[l].inv_amount != ' ')
							{
				             // strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].inv_amount)+"</td>";
							}
				             else
				             {
				            	 jsonArray5[l].inv_amount ='0';
				            	// strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].inv_amount)+"</td>"; 
				             }
				             
				                if(jsonArray5[l].pay_amount != null && jsonArray5[l].pay_amount != undefined && jsonArray5[l].pay_amount != ' ')
								{
					            //  strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].pay_amount)+"</td>";
								}
					             else
					             {
					            	 jsonArray5[l].pay_amount ='0';
					            	// strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].pay_amount)+"</td>"; 
					             }
				             
				                if(jsonArray5[l].inv_amount!=null && jsonArray5[l].invpay_amount !=null)
				                {
				                	 var balance1 = parseFloat(jsonArray5[l].inv_amount) - parseFloat( jsonArray5[l].invpay_amount );
				                }
				                else
				                {
				               	 var balance1 =  parseFloat(jsonArray5[l].inv_amount) - parseFloat( jsonArray5[l].pay_amount );
				                }
					
						 
						  BalTotal1 = parseFloat(BalTotal1) + parseFloat( balance1 );
						
		 }	
      
      
      
     
      
      
      
      
      var openBalanceWithPayMent = parseFloat(payWithinRange) + parseFloat( openingBalance );
      
      var BalTotal2 = parseFloat(BalTotal1) + parseFloat( openBalanceWithPayMent );
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
	
      
			    
	    var strName = " ";
		var url = 'https://3751164-sb1.app.netsuite.com/core/media/media.nl?id=126&c=3751164_SB1&h=96839b238d72202fb0c9&whence='; 
		strName += "<table width=\"100\%\">";
		strName += "<tr>";
		strName += "<td>";
		strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
		strName += "</td>";
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"20\"><b>Customer Statement</b></td>";
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td>";
		//strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
		strName += "</td>";
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"15\"><b>"+nlapiEscapeXML(customerName)+"</b></td>";
		strName += "</tr>";
		strName += "</table>";
		
		strName += "<table width=\"100\%\">";
		strName += "<tr>";
		strName += "<td></td>";
		strName += "</tr>";
		strName += "</table>";
		
		strName += "<table width=\"100\%\">";
		strName += "<tr>";
		
		strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"><b>Address</b><br/>"+subsdryAddrs+"</td>";
		strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"></td>";
		strName += "<td width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		//strName += "<td width =\"50\%\"><table width=\"100\%\"><tr><td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Date</b>&nbsp;"+enddate+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Amount Due</b>&nbsp;"+amountDue+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Currency</b>&nbsp;"+currency+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary</b>&nbsp;"+subsidiaryTx+"</td></tr></table></td>";
		strName += "<td width =\"25\%\"><table width=\"100\%\"><tr><td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Date</b></td><td colspan =\"5\" width = \"20\%\"  align=\"left\" font-size=\"10\">"+enddate+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Amount Due</b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;"+formatNumber(BalTotal2.toFixed(2))+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Currency</b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;"+currency+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b></b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;</td></tr></table></td>";
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
		if(addressText1 != null && addressText1 != '')
		{
		nlapiLogExecution('DEBUG', 'aftr submit', "  addressText1 "+addressText1);
		strName += "<td width = \"30\%\"  align=\"left\" font-size=\"10\"><b>Bill To</b><br/>"+addressText1+",</td>";
		}
		strName += "</tr>";
		strName += "<tr>";
		if(addressText2 != null && addressText2!= '')
		{
		nlapiLogExecution('DEBUG', 'aftr submit', "  addressText2 "+addressText2);
		strName += "<td  width = \"30\%\"  align=\"left\" font-size=\"10\"><b></b>"+addressText2+",</td>";
		}
		strName += "</tr>";
		strName += "<tr>";
		if(city != null && city!= '')
		{
		nlapiLogExecution('DEBUG', 'aftr submit', "  city "+city);
		strName += "<td  width = \"30\%\"  align=\"left\" font-size=\"10\"><b></b>"+city+",</td>";
		}
		strName += "</tr>";
		strName += "<tr>";
		if(country != null || country != ' ' && zip!= ' ' || zip!= null)
		{
		nlapiLogExecution('DEBUG', 'aftr submit', "  country: zip --"+country+':-'+zip);
		strName += "<td  width = \"30\%\"  align=\"left\" font-size=\"10\"><b></b>"+country+" "+zip+".</td>";
		}
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
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>Transaction Type</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>Project Name</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\"><b>Description</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>Invoice Amount</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>Payment</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>Balance</b></td>";
		strName += "</tr>";
		
		
		strName += "<tr>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
		strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"47\%\"><b>Opening Balance</b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\"  border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(openBalanceWithPayMent.toFixed(2))+"</b></td>";
		strName += "</tr>";
		
		
		 var InvTotal = 0;
		 var PayTotal = 0;
		 var BalTotal = 0;
		

		//-----------------------------Fetch Values-------------------------------------------
		 for(var l=0;l<jsonArray5.length;l++)
		 {
			 
			     
			 
			                 var zero ='0';
					 
						     strName += "<tr>";
						 
						     if(jsonArray5[l].date != null || jsonArray5[l].date != '' || jsonArray5[l].date != undefined)
						     {
							 strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+jsonArray5[l].date+"</td>";
						     }
						 
							if(jsonArray5[l].type == 'CustInvc')
							{
								jsonArray5[l].type ='Invoice';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray5[l].type+"</td>";
							}
							else if(jsonArray5[l].type == 'Payment')
							{
								jsonArray5[l].type ='Payment';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray5[l].type+"</td>";
							}
							else if(jsonArray5[l].type == 'Journal')
							{
								jsonArray5[l].type ='Journal';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray5[l].type+"</td>";
							}
							else if(jsonArray5[l].type == 'CustCred')
							{
								jsonArray5[l].type ='Credit Memo';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray5[l].type+"</td>";
							}
							else 
							{
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray5[l].type+"</td>";
							}
							
							if(jsonArray5[l].projName == '- None -' && jsonArray5[l].projName != null)
							{
								jsonArray5[l].projName =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+nlapiEscapeXML(jsonArray5[l].projName)+"</td>";
							}
							else if(jsonArray5[l].projName != null && jsonArray5[l].projName != undefined && jsonArray5[l].projName != ' ')
							{
								var str = jsonArray5[l].projName;
								var name =str.toString();
								var n = name.lastIndexOf(":");
								var n1 = parseInt(n)+parseInt(1);
								var res = str.substr(n1,str.length);

								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+nlapiEscapeXML(res)+"</td>";
							}
							else 
							{
								
								jsonArray5[l].projName =' ';
								strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+nlapiEscapeXML(jsonArray5[l].projName)+"</td>";
							}
							
				         strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\">"+jsonArray5[l].tranid+"</td>";
				         
				         if(jsonArray5[l].inv_amount != null && jsonArray5[l].inv_amount != undefined && jsonArray5[l].inv_amount != ' ')
							{
				            	 if(jsonArray5[l].inv_amount == 0)
				                	{
				                		jsonArray5[l].inv_amount ='NA';
				                		strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+jsonArray5[l].inv_amount+"</td>";
				                		jsonArray5[l].inv_amount = 0;
				                	}
				                	else
				                	{
				                		strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].inv_amount)+"</td>";
				                	}
				            	 
				            	// strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].inv_amount)+"</td>";
							}
				             else
				             {
				            	 jsonArray5[l].inv_amount ='NA';
				            	 strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+jsonArray5[l].inv_amount+"</td>"; 
				            	 jsonArray5[l].inv_amount ='0';
				             }
				             
				                if(jsonArray5[l].invpay_amount != null && jsonArray5[l].invpay_amount != undefined && jsonArray5[l].invpay_amount != ' ')
								{
					              strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].invpay_amount)+"</td>";
								}
				                else  if(jsonArray5[l].pay_amount != null && jsonArray5[l].pay_amount != undefined && jsonArray5[l].pay_amount != ' ')
								{
					              strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].pay_amount)+"</td>";
								}
					             else
					             {
					            	 jsonArray5[l].invpay_amount ='0';
					            	 strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].invpay_amount)+"</td>"; 
					             }
				                 
				                
				                if(jsonArray5[l].inv_amount!=null && jsonArray5[l].invpay_amount !=null)
				                {
				                	 var balance = parseFloat(jsonArray5[l].inv_amount) - parseFloat( jsonArray5[l].invpay_amount );
				                }
				                else
				                {
				               	 var balance =  parseFloat(jsonArray5[l].inv_amount) - parseFloat( jsonArray5[l].pay_amount );
				                }
				               
				             // strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray5[l].pay_amount)+"</td>";
				             strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(balance.toFixed(2))+"</td>";
						     strName += "</tr>";
						 
					
						    InvTotal = parseFloat(InvTotal) + parseFloat( jsonArray5[l].inv_amount );
						     if(jsonArray5[l].invpay_amount !=null && jsonArray5[l].pay_amount !=null)
			                {
						     PayTotal = parseFloat(PayTotal) + parseFloat(jsonArray5[l].invpay_amount) + parseFloat(jsonArray5[l].pay_amount);
			                } 
						   BalTotal = parseFloat(BalTotal) + parseFloat( balance );
						
		 }	
	     var FinTotal = parseFloat(BalTotal) + parseFloat(openBalanceWithPayMent);
		
			nlapiLogExecution('DEBUG', 'aftr submit', "  PayTotal ==" +PayTotal );
			strName += "<tr>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\"><b>Total</b></td>";
	     	strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>"+formatNumber(InvTotal.toFixed(2))+"</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>"+formatNumber(PayTotal.toFixed(2))+"</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(FinTotal.toFixed(2))+"</b></td>";
			strName += "</tr>";
		
		
			 
		strName += "</table>";
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

	function findTransaction1(searchId1,customer,startdate,enddate)
	{
		var savedSearch = nlapiLoadSearch(null,searchId1); 
		
		
		
		 nlapiLogExecution('DEBUG','searchid','startDate:'+startdate);
		 nlapiLogExecution('DEBUG','searchid','EndDate:'+enddate);
			
			var filters=new Array();
			filters[0]=new nlobjSearchFilter('entity', null,'anyof',customer);
			 nlapiLogExecution('DEBUG','searchid','customer:'+customer);
			filters[1] = new nlobjSearchFilter('trandate', null, 'onorbefore', enddate);
			filters[2] = new nlobjSearchFilter('trandate', null, 'onorafter',startdate);
			savedSearch.addFilters(filters);
			   
				var resultset = savedSearch.runSearch();
				var returnSearchResults = [];
				var searchid = 0;
				do {
				
					var resultslice = resultset.getResults(searchid, searchid + 1000);
					if(resultslice!= null)
					{
					   for ( var rs in resultslice) 
						{
							returnSearchResults.push(resultslice[rs]);
							searchid++;
						}
					   nlapiLogExecution('DEBUG','searchid','searchid:'+searchid);
					}
					
				} while (resultslice!=null && resultslice>0);
				//nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
			  
				return returnSearchResults;
	}

	function findTransaction2(searchId2,customer,startdate,enddate)
	{
		var savedSearch = nlapiLoadSearch(null,searchId2); 
		
		
		
		 nlapiLogExecution('DEBUG','searchid','startDate:'+startdate);
		 nlapiLogExecution('DEBUG','searchid','EndDate:'+enddate);
			
			var filters=new Array();
			filters[0]=new nlobjSearchFilter('entity', null,'anyof',customer);
			 nlapiLogExecution('DEBUG','searchid','customer:'+customer);
			// filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',customer);
			 filters[1] = new nlobjSearchFilter ('trandate', null, 'onorbefore', startdate);
			 filters[2] = new nlobjSearchFilter ('trandate','applyingtransaction','within',startdate,enddate);
			savedSearch.addFilters(filters);
			   
				var resultset = savedSearch.runSearch();
				var returnSearchResults = [];
				var searchid = 0;
				do {
				
					var resultslice = resultset.getResults(searchid, searchid + 1000);
					if(resultslice!= null)
					{
					   for ( var rs in resultslice) 
						{
							returnSearchResults.push(resultslice[rs]);
							searchid++;
						}
					   nlapiLogExecution('DEBUG','searchid','searchid:'+searchid);
					}
					
				} while (resultslice!=null && resultslice>0);
				//nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
			  
				return returnSearchResults;
	}

	function findTransaction3(searchId3,customer,startdate,enddate)
	{
		var savedSearch = nlapiLoadSearch(null,searchId3); 
		
		
		
		 nlapiLogExecution('DEBUG','searchid','startDate:'+startdate);
		 nlapiLogExecution('DEBUG','searchid','EndDate:'+enddate);
			
			var filters=new Array();
			filters[0]=new nlobjSearchFilter('entity', null,'anyof',customer);
			 nlapiLogExecution('DEBUG','searchid','customer:'+customer);
			 filters[1] = new nlobjSearchFilter('trandate', null, 'onorbefore', enddate);
			 filters[2] = new nlobjSearchFilter('trandate', null, 'onorafter',startdate);
			savedSearch.addFilters(filters);
			   
				var resultset = savedSearch.runSearch();
				var returnSearchResults = [];
				var searchid = 0;
				do {
				
					var resultslice = resultset.getResults(searchid, searchid + 1000);
					if(resultslice!= null)
					{
					   for ( var rs in resultslice) 
						{
							returnSearchResults.push(resultslice[rs]);
							searchid++;
						}
					   nlapiLogExecution('DEBUG','searchid','searchid:'+searchid);
					}
					
				} while (resultslice!=null && resultslice>0);
				//nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
			  
				return returnSearchResults;
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
	

	function getFirstTransactionDate(customer)
	{
		var first_trandate = '';
		var date_filters = new Array();
		date_filters.push(new nlobjSearchFilter('internalid', null, 'is', customer));
		
		var date_column = new Array();
		date_column[0] = new nlobjSearchColumn('trandate','transaction');
		date_column[0].setSort(false);
		var date_results = nlapiSearchRecord('customer', null, date_filters, date_column);
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

	function getOpeningBalance(customer, openingBalanceDate, opBalanceEndDate)
	{
					nlapiLogExecution('DEBUG', 'getOpeningBalance', 'vendor = ' + customer);
					//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'locationname = ' + locationname);
					nlapiLogExecution('DEBUG', 'getOpeningBalance', 'openingBalanceDate = ' + openingBalanceDate);
					nlapiLogExecution('DEBUG', 'getOpeningBalance', 'opBalanceEndDate = ' + opBalanceEndDate);
					
					
					var lastInternalID = 0;
					var totalAmount = 0;
					//var totalfxamount = 0;
					totalAmount = parseFloat(totalAmount);
					
					 var columns = new Array();
					 columns[0] = new nlobjSearchColumn('internalid');
					 columns[1] = new nlobjSearchColumn('formulacurrency');
					
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',customer);
					 filters[1] = new nlobjSearchFilter ('trandate', null, 'onorbefore', opBalanceEndDate);
					// filters[2] = new nlobjSearchFilter ('trandate', null, 'onorafter',openingBalanceDate);
						 var searchresults = nlapiSearchRecord('transaction','customsearch348',filters,columns)
					
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
				    				
				    				var value1 = searchresults[i].getValue('formulacurrency');
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
					
				
					return getOpeningBalancefunction;
	}
	
	function getOpeningBalancePaymentWithin(customer, startdate, enddate)
	{
					nlapiLogExecution('DEBUG', 'getOpeningBalancePaymentWithin', 'vendor = ' + customer);
					//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'locationname = ' + locationname);
					nlapiLogExecution('DEBUG', 'getOpeningBalancePaymentWithin', 'startdate = ' + startdate);
					nlapiLogExecution('DEBUG', 'getOpeningBalancePaymentWithin', 'enddate = ' + enddate);
					
					
					var lastInternalID = 0;
					var totalAmount = 0;
					//var totalfxamount = 0;
					totalAmount = parseFloat(totalAmount);
					
					 var columns = new Array();
					 columns[0] = new nlobjSearchColumn('internalid');
					 columns[1] = new nlobjSearchColumn("fxamount");
					
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',customer);
					 filters[1] = new nlobjSearchFilter ('trandate', null, 'onorbefore', startdate);
					 filters[2] = new nlobjSearchFilter ('trandate','applyingtransaction','within',startdate,enddate);
						 var searchresults = nlapiSearchRecord('transaction','customsearch_openingbal_report_2',filters,columns)//customsearch_openingbal_report
					
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
				    				nlapiLogExecution('DEBUG', 'getOpeningBalancePaymentWithin', 'previousInternalID = ' + previousInternalID);
				    				internalID = value;
									nlapiLogExecution('DEBUG', 'getOpeningBalancePaymentWithin', 'internalID = ' + internalID);
				    				
				    				var value1 = searchresults[i].getValue("fxamount");	
				    				amount += parseFloat(value1);
									nlapiLogExecution('DEBUG', 'getOpeningBalancePaymentWithin', 'Amount = ' + amount);
									amount = parseFloat(amount);				
				    				}
				    			lastInternalID = internalID;
				    			
				    			totalAmount =  parseFloat(amount);
				    		}	
						 

					totalAmount = parseFloat(totalAmount);
					//totalAmount = Math.round(totalAmount * 100) / 100;
					
					var getOpeningBalancePaymentWithin = parseFloat(totalAmount);
					
					nlapiLogExecution('DEBUG', 'getOpeningBalancePaymentWithin', 'getOpeningBalancePaymentWithin = ' + getOpeningBalancePaymentWithin);
					
				
					return getOpeningBalancePaymentWithin;
	}
	
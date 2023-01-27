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
			
			currency = recObj.getFieldText('custrecord_custat_currency');
			nlapiLogExecution('DEBUG', 'aftr submit', "  currency  ==" + currency);
			
			var subsidiaryTx = recObj.getFieldText('custrecord_custat_subsidiary');
			
			amountDue = recObj.getFieldValue('custrecord_custat_amt_due');
			nlapiLogExecution('DEBUG', 'aftr submit', "  amountDue  ==" + amountDue);
			
			var billAddress = recObj.getFieldValue('custrecord_address');
			nlapiLogExecution('DEBUG', 'aftr submit', "  billAddress  ==" + billAddress);
			if(billAddress == null)
			{
				billAddress =" ";
			}
			var subsidiary = recObj.getFieldValue('custrecord_custat_subsidiary');
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
		
		   var firstTranDate = getFirstTransactionDate(customer);
		   if (firstTranDate != null && firstTranDate != '' && firstTranDate != undefined) 
			{
				custCreatedDate = nlapiStringToDate(firstTranDate);
			}
		   
		   var openingBalance = getOpeningBalance(customer, custCreatedDate, startdate);
		   
			var searchId1 = 'customsearch348';
			var searchId2 = 'customsearch347';
		//    var searchId3 = 'customsearch345';
		var transItemSearch1;
		var transItemSearch2;
			var transItemSearch3;
		var jsonArray1=[];
			var jsonArray2=[];
		   var jsonArray3=[];  
		   

			transItemSearch1 = findTransaction1(searchId1,customer,startdate,enddate);
			transItemSearch2 = findTransaction2(searchId2,customer,startdate,enddate);
		  //  transItemSearch3 = findTransaction3(searchId3,customer,startdate,enddate);
		
		
			
			if(transItemSearch1)
			{
			
			   
				nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch1 length  ==" + transItemSearch1.length);
				
				for(var i=0;i<transItemSearch1.length;i++)
				{
					var jsonObj = {
											'date':transItemSearch1[i].getValue('trandate'),
											'entity':transItemSearch1[i].getValue('entity'),
											'type':transItemSearch1[i].getValue('type'), 
											'tranid':transItemSearch1[i].getValue('tranid'),
											'formulacurrency':transItemSearch1[i].getValue("formulacurrency"),
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
			    for(var l=0;l<jsonArray1.length;l++)
				{
			       /*
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].date ==" + jsonArray1[l].date);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].entity  ==" + jsonArray1[l].entity);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].tranid  ==" +  jsonArray1[l].tranid);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].recType  ==" +jsonArray1[l].type);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].formulacurrency  ==" +jsonArray1[l].formulacurrency);*/
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].formulacurrency  ==" +jsonArray1[l].duedate);
					
					DateArr.push(jsonArray1[l].date);
					EntityArr.push(jsonArray1[l].entity);
					tranIdArr.push(jsonArray1[l].tranid);
					TypeArr.push(jsonArray1[l].type);
					AmtArr.push(jsonArray1[l].formulacurrency);
					DueDayArr.push(jsonArray1[l].duedate);
				}
				
			}//end of transitemsearch1
		 
			if(transItemSearch2)
			{
			
			   
				nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch2 length  ==" + transItemSearch2.length);
				
				for(var i=0;i<transItemSearch2.length;i++)
				{
					var jsonObj = {
											'entity':transItemSearch2[i].getValue("entity",null,"GROUP"),
											'type':transItemSearch2[i].getValue("type",null,"GROUP"),
											'date':transItemSearch2[i].getValue("trandate",null,"GROUP"),
										   'tranid':transItemSearch2[i].getValue("tranid",null,"GROUP"),
										   'status':transItemSearch2[i].getValue("statusref",null,"GROUP"),
										   'amount':transItemSearch2[i].getValue("fxamount",null,"MAX"),
										   'projName':transItemSearch2[i].getText("custbody_projectname",null,"GROUP"),
										   'applyingforeignamount':transItemSearch2[i].getValue("applyingforeignamount",null,"SUM"),
											'currency':transItemSearch2[i].getValue("currency",null,"GROUP")
										};
						jsonArray2.push(jsonObj);
						
				}
				 var curr =new Array();
				 var newUniqCurr =new Array();
			   for(var l=0;l<jsonArray2.length;l++)
				{
				  /* nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].entity  ==" + jsonArray2[l].entity);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].type  ==" + jsonArray2[l].type);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].date  ==" + jsonArray2[l].date);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].tranid  ==" +jsonArray2[l].tranid );
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].status  ==" + jsonArray2[l].status);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].amount  ==" + jsonArray2[l].amount);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].applytranid ==" + jsonArray2[l].applytranid);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].applyType  ==" +jsonArray2[l].applyType );
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].applyingforeignamount ==" + jsonArray2[l].applyingforeignamount);  
				   */	nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray2[l].projName  ==" +jsonArray2[l].projName  );
				
				  curr.push(jsonArray2[l].currency);
				 
				}
			 }//end of transitemsearch2

			uniqueArray=squash(curr);
			nlapiLogExecution('DEBUG', 'aftr submit', " newUniqCurr  ==" +uniqueArray);
			
			/*    if(transItemSearch3)
			{
			
			   
				nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch3 length  ==" + transItemSearch3.length);
				
				for(var i=0;i<transItemSearch3.length;i++)
				{
					var jsonObj = {
							'entity':transItemSearch3[i].getValue("entity"),
							'type':transItemSearch3[i].getValue("type"),
							'date':transItemSearch3[i].getValue("trandate"),
							'tranid':transItemSearch3[i].getValue("tranid"), 
							'amount':transItemSearch3[i].getValue("fxamountremaining")
						};
						jsonArray3.push(jsonObj);
						
				}
				
				for(var l=0;l<jsonArray3.length;l++)
				{
					
					//nlapiLogExecution('DEBUG', 'aftr submit', "  sorted_arr  ==" + sorted_arr);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].entity  ==" + jsonArray3[l].entity);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].type  ==" + jsonArray3[l].type);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].date  ==" + jsonArray3[l].date);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].tranid  ==" +jsonArray3[l].tranid );
				
				  nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].amount ==" +jsonArray3[l].amount );
				}
				
			  }////end of transitemsearch3  */
		
			
			jsonArray3=mergeArrays(jsonArray1,jsonArray2); 
			
			jsonArray2.sort(function compare(a, b) {
			  var dateA = new Date(a.date);
			  var dateB = new Date(b.date);
			  return dateA - dateB;
			});
			
			jsonArray3.sort(function compare(a, b) {
				  var dateA = new Date(a.date);
				  var dateB = new Date(b.date);
				  return dateA - dateB;
				});
			
			var balance=0;
			var FinTotal=0;
			
			
			 var FinInvAmt=0;
			 var FinPayAmt=0;
			 var totInvAmt=0;
			 var totInvAmt1=0;
			 var totPayAmt=0;
			 var totPayAmt1=0;
			 
			for(var l=0;l<jsonArray3.length;l++)
			{
			 if(jsonArray3[l].amount != null && jsonArray3[l].applyingforeignamount != null)
			 {
			  balance = parseFloat(jsonArray3[l].amount)+ parseFloat(-jsonArray3[l].applyingforeignamount);
			 }
			 else{
				 balance =jsonArray3[l].formulacurrency;
			 }
			 FinTotal =parseFloat( FinTotal) +parseFloat( balance);
			 
			  if(jsonArray3[l].amount != null)
			 {
				 totInvAmt += parseFloat(jsonArray3[l].amount);
			 }
			
			 if(jsonArray3[l].formulacurrency != null)
			 {
				 totInvAmt1 += parseFloat(jsonArray3[l].formulacurrency);
			 }
			 
			 if(jsonArray3[l].applyingforeignamount != null)
			 {
				 totPayAmt1 += parseFloat(jsonArray3[l].applyingforeignamount);
			 }
			 var q =parseFloat(totInvAmt)+parseFloat(totInvAmt1);
			 var r =parseFloat(0)+parseFloat(-totPayAmt1);
			
		/*   // nlapiLogExecution('DEBUG', 'aftr submit', "  sorted_arr  ==" + sorted_arr);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].entity  ==" + jsonArray3[l].entity);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].type  ==" + jsonArray3[l].type);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].date  ==" + jsonArray3[l].date);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].tranid  ==" +jsonArray3[l].tranid );
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].amount ==" + jsonArray3[l].amount);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].applyingforeignamount ==" + jsonArray3[l].applyingforeignamount);
			  nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].formulacurrency ==" +jsonArray3[l].formulacurrency );
			  nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].currency ==" +jsonArray3[l].currency );*/
			}
			 var z =parseFloat(q)+parseFloat(openingBalance);
			
			var newS = parseFloat( FinTotal)+parseFloat( openingBalance)
			
			 var FinTotal1 = formatNumber (newS.toFixed(2));
			
			FinInvAmt= formatNumber (z.toFixed(2));
			nlapiLogExecution('DEBUG', 'aftr submit', "   FinInvAmt  "+FinInvAmt);
		 
			FinPayAmt= formatNumber (r.toFixed(2));
			nlapiLogExecution('DEBUG', 'aftr submit', "  FinPayAmt "+FinPayAmt);
			
			
			
		var strName = " ";
		 
		 
		/* var subsidiary = ffReqObj.getFieldValue('subsidiary');
		 var subsdryAddrs;

		 if(subsidiary)
			{
				var s = nlapiLoadRecord("subsidiary", subsidiary,{recordmode: "dynamic"});
				subsdryAddrs = s.viewSubrecord("mainaddress").getFieldValue('addrtext');
				if(subsdryAddrs == null)
				{
					subsdryAddrs ="";
				}
			}*/
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
		strName += "<td width =\"25\%\"><table width=\"100\%\"><tr><td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Date</b></td><td colspan =\"5\" width = \"20\%\"  align=\"left\" font-size=\"10\">"+enddate+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Amount Due</b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;"+FinTotal1+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Currency</b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;"+currency+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b></b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;</td></tr></table></td>";
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
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
		strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\"><b>Opening Balance</b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
		strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+formatNumber(openingBalance)+"</b></td>";
		strName += "</tr>";
		

		//-----------------------------Fetch Values-------------------------------------------
		 for(var l=0;l<jsonArray3.length;l++)
		 {
			 if(jsonArray3[l].amount != null && jsonArray3[l].applyingforeignamount != null)
			 {
			  balance =parseFloat(jsonArray3[l].amount)+parseFloat(-jsonArray3[l].applyingforeignamount);
			 }
			 else{
				 balance =jsonArray3[l].formulacurrency;
			 }
			 
			 
				 strName += "<tr>";
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+jsonArray3[l].date+"</td>";
				if(jsonArray3[l].type == 'CustInvc')
				{
					jsonArray3[l].type ='Invoice';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray3[l].type+"</td>";
				}
				else if(jsonArray3[l].type == 'Payment')
				{
					jsonArray3[l].type ='Payment';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray3[l].type+"</td>";
				}
				else if(jsonArray3[l].type == 'Journal')
				{
					jsonArray3[l].type ='Journal';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray3[l].type+"</td>";
				}
				else if(jsonArray3[l].type == 'CustCred')
				{
					jsonArray3[l].type ='Credit Memo';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray3[l].type+"</td>";
				}
				else 
				{
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+jsonArray3[l].type+"</td>";
				}
				
				
				if(jsonArray3[l].projName == '- None -' && jsonArray3[l].projName != null)
				{
					jsonArray3[l].projName =' ';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+jsonArray3[l].projName+"</td>";
				}
				else if(jsonArray3[l].projName != null && jsonArray3[l].projName != undefined && jsonArray3[l].projName != ' ')
				{
					
					
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+jsonArray3[l].projName+"</td>";
				}
				else 
				{
					
					jsonArray3[l].projName =' ';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+jsonArray3[l].projName+"</td>";
				}
				
				//strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\">"+jsonArray3[l].tranid+"</td>";
			
				if(jsonArray3[l].formulacurrency > 0 && jsonArray3[l].formulacurrency != null && jsonArray3[l].amount ==null)
				{
					nlapiLogExecution('DEBUG', 'aftr submit', "  Inside COndition  > 0 jsonArray3[l].formulacurrency  ==" + jsonArray3[l].formulacurrency);
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(jsonArray3[l].formulacurrency)+"</td>";
				}
				else if(jsonArray3[l].amount != null && jsonArray3[l].formulacurrency == null){
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray3[l].amount)+"</td>";
				}
				else
				{
					nlapiLogExecution('DEBUG', 'aftr submit', "  Inside COndition > 0 jsonArray3[l].formulacurrency  ==" + jsonArray3[l].formulacurrency);
					 jsonArray3[l].formulacurrency ='0';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+ formatNumber(jsonArray3[l].formulacurrency)+"</td>";
					}
			
				
				if(jsonArray3[l].formulacurrency < 0 && jsonArray3[l].formulacurrency != null && jsonArray3[l].applyingforeignamount ==undefined && jsonArray3[l].amount ==undefined)
				{
					nlapiLogExecution('DEBUG', 'aftr submit', " Inside COndition  < 0jsonArray3[l].formulacurrency  ==" + jsonArray3[l].formulacurrency);
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(jsonArray3[l].formulacurrency)+"</td>";
				}
				else if(jsonArray3[l].applyingforeignamount  != null && jsonArray3[l].formulacurrency == null)
				{
					
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+formatNumber(parseFloat(0-jsonArray3[l].applyingforeignamount))+"</td>";
				}
				else
				{
					nlapiLogExecution('DEBUG', 'aftr submit', " Inside COndition  jsonArray3[l].formulacurrency  ==" + jsonArray3[l].formulacurrency);
					jsonArray3[l].formulacurrency ='0';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray3[l].formulacurrency)+"</td>";
				}
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\">"+formatNumber(balance)+"</td>";
				strName += "</tr>";
		 }	
	
			
			strName += "<tr>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\"><b>Total</b></td>";
	     	strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>"+FinInvAmt+"</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>"+FinPayAmt+"</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>"+FinTotal1+"</b></td>";
			strName += "</tr>";
		
			
			strName += "<tr>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"15\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"20\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"30\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"47\%\">&nbsp;</td>";
	     	strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"30\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"15\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"20\%\">&nbsp;</td>";
			strName += "</tr>";
			
			strName += "<tr>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"15\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"20\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"30\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"47\%\">&nbsp;</td>";
	     	strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"30\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"15\%\">&nbsp;</td>";
			strName += "<td  background-color = \"#FFFFFF\" align = \"center\" font-size=\"9\" width=\"20\%\">&nbsp;</td>";
			strName += "</tr>";		
			
			strName += "<tr>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>Current</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>1-30 Days</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>31-60 Days</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\"><b>61-90 Days</b></td>";
	     	strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>Over 90 Days</b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b>Amt. Due</b></td>";
			strName += "</tr>";
			
			var newDateArr = new Array();
			newDateArr =  getAllTransactionDates(customer);
			var date1 = new Date(enddate);//startdate
			var current = 0;
			var over0  = 0 ;
			var over30 = 0;
			var over60 = 0;
			var over90 = 0;
			var totaldue = 0;
		//	var diffDays = 0;
			/* var DateArr = new Array();
				var EntityArr = new Array();
				var tranIdArr = new Array();
				var TypeArr = new Array();
				var AmtArr = new Array();*/
		
			   for(var p=0;p<TypeArr.length;p++)
				{
				   if(DueDayArr[p] != null && DueDayArr[p] != undefined && DueDayArr[p] !='')
				   {
					   var date2 =  new Date(DueDayArr[p]);
					 //  var date2 =  new Date(custCreatedDate);//custCreatedDate
				   }
				   else
				   {
					   var date2 =  new Date(DateArr[p]); 
				   }
				  
					
					diffDays = (date2.getTime() - date1.getTime()); 
					diffDays = Math.round(diffDays/(3600*1000*24));
				/*	
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].date ==" + DateArr[p]);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].entity  ==" + EntityArr[p]);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].tranid  ==" +  tranIdArr[p]);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].recType  ==" +TypeArr[p]);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].formulacurrency  ==" +AmtArr[p]);
					//nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].formulacurrency  ==" +AmtArr[p]);
					//diffDays = DueDayArr[p];
					*/
					
					nlapiLogExecution('DEBUG', 'aftr submit', "  diffDays  ==" + Math.abs(diffDays));
					
					if((TypeArr[p] == 'CustInvc' || TypeArr[p] ==  'CustCred'|| TypeArr[p] == 'CustDep' ||  TypeArr[p] =='Journal') ) //&&  jsonArray2[p].status == 'CustInvc:B'
					{
						if(Math.abs(diffDays) <= 0)
						{	
							current =parseFloat(current)+ parseFloat(AmtArr[p]);
							totaldue=parseFloat(totaldue)+ parseFloat(AmtArr[p]);
						}	
						if(Math.abs(diffDays) > 0 && Math.abs(diffDays) <= 30)
						{	
							over0 = parseFloat(over0)+ parseFloat( AmtArr[p]);
							totaldue=parseFloat(totaldue)+ parseFloat(AmtArr[p]);
						}	
						if(Math.abs(diffDays) > 30 && Math.abs(diffDays) <= 60)
						{					
							over30 = parseFloat(over30)+ parseFloat( AmtArr[p]);
							totaldue=parseFloat(totaldue)+ parseFloat( AmtArr[p]);
						}			
						else if(Math.abs(diffDays) > 60 && Math.abs(diffDays) <= 90)
						{
							over60 = parseFloat(over60)+ parseFloat( AmtArr[p]);
							totaldue=parseFloat(totaldue)+ parseFloat(AmtArr[p]);
						}
						else if(Math.abs(diffDays) > 90)
						{
							over90 = parseFloat(over90)+ parseFloat( AmtArr[p]);
							totaldue=parseFloat(totaldue)+ parseFloat( AmtArr[p]);
						}
					}
					if((jsonArray1[p].type == 'Credit Memo') ) 
					{
						if(diffDays <= 0)
						{	
							current = parseFloat(current)+ parseFloat(jsonArray1[p].formulacurrency);
							totaldue=parseFloat(totaldue)+ parseFloat(jsonArray1[p].formulacurrency);
						}	
						if(diffDays > 0 && diffDays <= 30)
						{	
							over0 = parseFloat(over0)+ parseFloat(jsonArray1[p].formulacurrency);
							totaldue=parseFloat(totaldue)+ parseFloat(jsonArray1[p].formulacurrency);
						}	
						if(diffDays > 30 && diffDays <= 60)
						{	
							over30 = parseFloat(over30)+ parseFloat(jsonArray1[p].formulacurrency);
							totaldue=parseFloat(totaldue)+ parseFloat(jsonArray1[p].formulacurrency);
						}			
						else if(diffDays > 60 && diffDays <= 90)
						{
							over60 = parseFloat(over60)+ parseFloat(jsonArray1[p].formulacurrency);
							totaldue=parseFloat(totaldue)+ parseFloat(jsonArray1[p].formulacurrency);
						}
						else if(diffDays > 90)
						{
							over90  = parseFloat(over90)+ parseFloat(jsonArray1[p].amount);
							totaldue=parseFloat(totaldue)+ parseFloat(jsonArray1[p].amount);
						}
					}	
					
					
					
			  /*		if(jsonArray1[p].type == 'Journal') // && jsonArray2[p].applytranid == ''
					{
						if(diffDays <= 0)
						{	
							if(parseFloat(jsonArray1[p].formulacurrency) > 0)
							{
								current = parseFloat(current)+ parseFloat(jsonArray1[p].formulacurrency);
								totaldue=parseFloat(totaldue)+ parseFloat(jsonArray1[p].formulacurrency);
							}	
						}	
						if(diffDays > 0 && diffDays <= 30)
						{	
							if(parseFloat(jsonArray1[p].formulacurrency) > 0)
							{
								over0 = parseFloat(over0)+ parseFloat(jsonArray1[p].formulacurrency);
								totaldue=parseFloat(totaldue)+ parseFloat(jsonArray1[p].formulacurrency);

							}	
						}	
						if(diffDays > 30 && diffDays <= 60)
						{	
							if(parseFloat(jsonArray1[p].formulacurrency) > 0)
							{
								over30 = parseFloat(over30)+ parseFloat(jsonArray1[p].formulacurrency);
								totaldue=parseFloat(totaldue)+ parseFloat(jsonArray1[p].formulacurrency);

							}	
						}			
						else if(diffDays > 60 && diffDays <= 90)
						{
							if(parseFloat(jsonArray1[p].formulacurrency) > 0)
							{
								over60 = parseFloat(over60)+ parseFloat(jsonArray1[p].formulacurrency);
								totaldue=parseFloat(totaldue)+ parseFloat(jsonArray1[p].formulacurrency);
							}	
						}
						else if(diffDays > 90)
						{
							if(parseFloat(jsonArray1[p].formulacurrency) > 0)
							{
								over90  = parseFloat(over90)+ parseFloat(jsonArray1[p].formulacurrency);
								totaldue =parseFloat(totaldue)+ parseFloat(jsonArray1[p].formulacurrency);

							}	
						}
					}	
				   */
				
				}
				var date3 =new Date(custCreatedDate);
				
				var openDiff = (date3.getTime() - date1.getTime());
				openDiff = Math.round(openDiff/(3600*1000*24));
				
				
				
				if(Math.abs(openDiff) <= 0)
				{	
					current =parseFloat(current)+ parseFloat(openingBalance);
					totaldue=parseFloat(totaldue)+ parseFloat(openingBalance);
				}	
				if(Math.abs(openDiff) > 0 && Math.abs(openDiff) <= 30)
				{	
					over0 = parseFloat(over0)+ parseFloat(openingBalance);
					totaldue=parseFloat(totaldue)+ parseFloat(openingBalance);
				}	
				if(Math.abs(openDiff) > 30 && Math.abs(openDiff) <= 60)
				{					
					over30 = parseFloat(over30)+ parseFloat(openingBalance);
					totaldue=parseFloat(totaldue)+ parseFloat(openingBalance);
				}			
				else if(Math.abs(openDiff) > 60 && Math.abs(openDiff) <= 90)
				{
					over60 = parseFloat(over60)+ parseFloat(openingBalance);
					totaldue=parseFloat(totaldue)+ parseFloat(openingBalance);
				}
				else if(Math.abs(openDiff) > 90)
				{
					over90 = parseFloat(over90)+ parseFloat( openingBalance);
					totaldue=parseFloat(totaldue)+ parseFloat(openingBalance);
				}
				
				
				
				
				
				
				
				strName += "<tr>";
				strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><br/><b>"+formatNumber(parseFloat(current).toFixed(2))+"</b></td>";
				strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><br/><b>"+formatNumber(parseFloat(over0).toFixed(2))+"</b></td>";
				strName += "<td  align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><br/><b>"+formatNumber(parseFloat(over30).toFixed(2))+"</b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\"><br/><b>"+formatNumber(parseFloat(over60).toFixed(2))+"</b></td>";
		     	strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><br/><b>"+formatNumber(parseFloat(over90).toFixed(2))+"</b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b></b></td>";
				strName += "<td   align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"20\%\"><b><br/>"+formatNumber(parseFloat(totaldue).toFixed(2))+"</b></td>";
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
			throw nlapiCreateError('SUITELET_ERROR',"There is No Data Available for this Customer...", false); 
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
	
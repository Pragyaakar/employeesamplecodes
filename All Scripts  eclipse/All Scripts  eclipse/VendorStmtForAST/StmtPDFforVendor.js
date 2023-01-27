	function suiteletStatement(request,response)
	{
		
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
		  
			var vendor= recObj.getFieldValue('custrecord_custstat_customer'); 
			var vendorName= recObj.getFieldText('custrecord_custstat_customer');
			nlapiLogExecution('DEBUG', 'aftr submit', "  vendorName==" + vendorName);

			startdate= recObj.getFieldValue('custrecord_customerstat_startdate');
			nlapiLogExecution('DEBUG', 'aftr submit', "  startdate  ==" + startdate);

			enddate= recObj.getFieldValue('custrecord_cust_statement_enddate');
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
		
		
		
			var searchId1 = 'customsearch348';
			var searchId2 = 'customsearch347';
		//  var searchId3 = 'customsearch345';
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
											'formulacurrency':transItemSearch1[i].getValue("formulacurrency")
											
								   };
						jsonArray1.push(jsonObj);
						
				}
				
			  /*  for(var l=0;l<jsonArray1.length;l++)
				{
			   
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].date ==" + jsonArray1[l].date);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].entity  ==" + jsonArray1[l].entity);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].tranid  ==" +  jsonArray1[l].tranid);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].recType  ==" +jsonArray1[l].recType);
					nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray1[l].formulacurrency  ==" +jsonArray1[l].formulacurrency);
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
											'type':transItemSearch2[i].getValue("type",null,"GROUP"),
											'date':transItemSearch2[i].getValue("trandate",null,"GROUP"),
										   'tranid':transItemSearch2[i].getValue("tranid",null,"GROUP"),
										   'status':transItemSearch2[i].getValue("statusref",null,"GROUP"),
										   'amount':transItemSearch2[i].getValue("fxamount",null,"MAX"),
										   'projName':transItemSearch2[i].getValue("custbody_projectname",null,"GROUP"),
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
		 /*   	
		   // nlapiLogExecution('DEBUG', 'aftr submit', "  sorted_arr  ==" + sorted_arr);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].entity  ==" + jsonArray3[l].entity);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].type  ==" + jsonArray3[l].type);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].date  ==" + jsonArray3[l].date);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].tranid  ==" +jsonArray3[l].tranid );
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].amount ==" + jsonArray3[l].amount);
			nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].applyingforeignamount ==" + jsonArray3[l].applyingforeignamount);
			  nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].formulacurrency ==" +jsonArray3[l].formulacurrency );
			  nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3[l].currency ==" +jsonArray3[l].currency ); */
			}
			
			
			 var FinTotal1 = formatNumber (FinTotal);
			
			FinInvAmt= formatNumber (q);
			nlapiLogExecution('DEBUG', 'aftr submit', "   FinInvAmt  "+FinInvAmt);
		 
			FinPayAmt= formatNumber (r);
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
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"20\"><b>Vendor Statement</b></td>";
		strName += "</tr>";
		strName += "<tr>";
		strName += "<td>";
		//strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
		strName += "</td>";
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		//strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
		strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"15\"><b>"+nlapiEscapeXML(vendorName)+"</b></td>";
		strName += "</tr>";
		strName += "</table>";
		
		strName += "<table width=\"100\%\">";
		strName += "<tr>";
		strName += "<td></td>";
		strName += "</tr>";
		strName += "</table>";
		
		strName += "<table width=\"100\%\">";
		strName += "<tr>";
		
		strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary</b><br/>"+subsdryAddrs+"</td>";
		strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"></td>";
		strName += "<td width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td width = \"10\%\"  align=\"left\" font-size=\"12\"></td>";
		//strName += "<td width =\"50\%\"><table width=\"100\%\"><tr><td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Date</b>&nbsp;"+enddate+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Amount Due</b>&nbsp;"+amountDue+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Currency</b>&nbsp;"+currency+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary</b>&nbsp;"+subsidiaryTx+"</td></tr></table></td>";
		strName += "<td width =\"25\%\"><table width=\"100\%\"><tr><td colspan =\"9\" width = \"50\%\"  align=\"left\" font-size=\"10\"><b>Date</b></td><td colspan =\"5\" width = \"20\%\"  align=\"left\" font-size=\"10\">"+enddate+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Amount Due</b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;"+FinTotal1+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Currency</b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;"+currency+"</td></tr><tr><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\"><b>Subsidiary</b></td><td colspan =\"9\" width = \"70\%\"  align=\"left\" font-size=\"10\">&nbsp;"+subsidiaryTx+"</td></tr></table></td>";
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
		strName += "<td width = \"2\%\"  align=\"left\" font-size=\"10\"><b>Bill To</b><br/>"+billAddress+"</td>";
		strName += "<td width = \"2\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td width = \"2\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td width = \"2\%\"  align=\"left\" font-size=\"12\"></td>";
		strName += "<td width = \"2\%\"  align=\"left\"></td>";
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
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"15\%\"><b>Balance</b></td>";
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
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(jsonArray3[l].formulacurrency)+"</td>";
				}
				else if(jsonArray3[l].amount != null && jsonArray3[l].formulacurrency == null){
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray3[l].amount)+"</td>";
				}
				else{
					 jsonArray3[l].formulacurrency ='0';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+ formatNumber(jsonArray3[l].formulacurrency)+"</td>";
					}
				if(jsonArray3[l].formulacurrency < 0 && jsonArray3[l].formulacurrency != null && jsonArray3[l].applyingforeignamount ==null)
				{
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">" +formatNumber(jsonArray3[l].formulacurrency)+"</td>";
				}
				else if(jsonArray3[l].applyingforeignamount  != null && jsonArray3[l].formulacurrency == null){
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\">"+formatNumber(parseFloat(0-jsonArray3[l].applyingforeignamount))+"</td>";
				}
				else{
					jsonArray3[l].formulacurrency ='0';
					strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\">"+formatNumber(jsonArray3[l].formulacurrency)+"</td>";
				}
				strName += "<td align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"15\%\">"+formatNumber(balance)+"</td>";
				strName += "</tr>";
		 }	
	
			
			strName += "<tr>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"></td>";
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"47\%\"><b>Total</b></td>";
			
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30\%\"><b>"+FinInvAmt+"</b></td>";
			
			
			
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>"+FinPayAmt+"</b></td>";
			
			strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" width=\"15\%\"><b>"+FinTotal1+"</b></td>";
			strName += "</tr>";
		
		

		/*strName += "</table>";
	   
		strName += "<table width=\"100\%\" >";
		strName += "<tr>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" colspan =\"6\" width=\"18\%\"><b></b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" colspan =\"6\" width=\"20.8\%\"><b></b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" colspan =\"6\" width=\"25\%\"><b></b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" colspan =\"8\" width=\"42\%\"><b>Total</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" colspan =\"6\" width=\"22\%\"><b>"+FinInvAmt+"</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" colspan =\"6\" width=\"20.5\%\"><b>"+FinPayAmt+"</b></td>";
		strName += "<td  background-color = \"#DEDBDB\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" colspan =\"6\"  border-right=\"solid 1px black\" width=\"12\%\"><b>"+FinTotal1+"</b></td>";
		strName += "</tr>";*/
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

	function findTransaction1(searchId1,vendor,startdate,enddate)
	{
		var savedSearch = nlapiLoadSearch(null,searchId1); 
		
		
		
		 nlapiLogExecution('DEBUG','searchid','startDate:'+startdate);
		 nlapiLogExecution('DEBUG','searchid','EndDate:'+enddate);
			
			var filters=new Array();
			filters[0]=new nlobjSearchFilter('entity', null,'anyof',vendor);
			 nlapiLogExecution('DEBUG','searchid','vendor:'+vendor);
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

	function findTransaction2(searchId2,vendor,startdate,enddate)
	{
		var savedSearch = nlapiLoadSearch(null,searchId2); 
		
		
		
		 nlapiLogExecution('DEBUG','searchid','startDate:'+startdate);
		 nlapiLogExecution('DEBUG','searchid','EndDate:'+enddate);
			
			var filters=new Array();
			filters[0]=new nlobjSearchFilter('entity', null,'anyof',vendor);
			 nlapiLogExecution('DEBUG','searchid','vendor:'+vendor);
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

	function findTransaction3(searchId3,vendor,startdate,enddate)
	{
		var savedSearch = nlapiLoadSearch(null,searchId3); 
		
		
		
		 nlapiLogExecution('DEBUG','searchid','startDate:'+startdate);
		 nlapiLogExecution('DEBUG','searchid','EndDate:'+enddate);
			
			var filters=new Array();
			filters[0]=new nlobjSearchFilter('entity', null,'anyof',vendor);
			 nlapiLogExecution('DEBUG','searchid','vendor:'+vendor);
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
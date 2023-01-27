	/**
	* Module Description
	* 
	* Version    Date            Author           Remarks
	* 1.00       25 Jan 2019     Priyanka Patil
	*
	*/
				
	/**
	* @param {nlobjRequest} request Request object
	* @param {nlobjResponse} response Response object
	* @returns {Void} Any output is written via response object
	*/
	
	
	
	function suiteletforINV(request, response)
	{
		try
		{
			
					
			var recrdId = request.getParameter('custscript_invid');
			var recrdType = 'invoice';	
			
			var ffReqObj = nlapiLoadRecord(recrdType,recrdId);
			
			var url = 'https://5309025-sb1.app.netsuite.com/core/media/media.nl?id=845&c=5309025_SB1&h=cb7473e4ee21187ff3c5'; 
			
	//============================== Capture Invoice Values ===================================
			
			var subsidiary = ffReqObj.getFieldValue('subsidiary');
			//nlapiLogExecution('DEBUG','before submit','subsidiary =='+subsidiary);
			
			var customer = ffReqObj.getFieldValue('entity');
			//nlapiLogExecution('DEBUG','before submit','customer =='+customer);
			
			var customerTxt = ffReqObj.getFieldText('entity');
			//nlapiLogExecution('DEBUG','before submit','customerTxt =='+customerTxt);
			
			var invoiceNo = ffReqObj.getFieldValue('tranid');
			//nlapiLogExecution('DEBUG','before submit','invoiceNo =='+invoiceNo);
			
			var invoiceDate = ffReqObj.getFieldValue('trandate');
			//nlapiLogExecution('DEBUG','before submit','invoiceNo =='+invoiceNo);
			
			var payDueDate = new Date(invoiceDate);
			nlapiLogExecution('DEBUG','before submit','payDueDate =='+payDueDate);
			
			payDueDate.setDate(payDueDate.getDate() + 30)
			//nlapiLogExecution('DEBUG','before submit','add30Days =='+add30Days);
			
			 var dd = payDueDate.getDate();
			 var mm = payDueDate.getMonth() + 1;
			 var y = payDueDate.getFullYear();
	
			var someFormattedDate = mm + '/' + dd + '/' + y;
			
			var setNewFor = new Date(someFormattedDate);
			var finDate = setNewFor.toDateString();
			
			var Datefor_PayDue = finDate.substr(finDate.indexOf(' ') + 1)
			nlapiLogExecution('DEBUG','before submit','finDate =='+finDate);
			
			var invTot = ffReqObj.getFieldValue('total');
			//nlapiLogExecution('DEBUG','before submit','invTot =='+invTot);
			
			var vatRegNo = ffReqObj.getFieldValue('vatregnumber');
			//nlapiLogExecution('DEBUG','before submit','vatRegNo =='+vatRegNo);
			if(vatRegNo == null)
			{
				vatRegNo = '';
			}
			
			var savingAmt = ffReqObj.getFieldValue('custbody_yde_savings_amount');
			//nlapiLogExecution('DEBUG','before submit','savingAmt =='+savingAmt);
			if(savingAmt == null)
			{
				savingAmt = '';
			}
			
			var treesPlant = ffReqObj.getFieldValue('custbody_yde_trees_planted_total');
			//nlapiLogExecution('DEBUG','before submit','treesPlant =='+treesPlant);
			if(treesPlant == null)
			{
				treesPlant = '';
			}
			
			var carbaonOffset = ffReqObj.getFieldValue('custbody_yde_carbon_offset_total');
			//nlapiLogExecution('DEBUG','before submit','carbaonOffset =='+carbaonOffset);
			if(carbaonOffset == null)
			{
				carbaonOffset = '';
			}
			
			
			var carRemove = ffReqObj.getFieldValue('custbody_yde_cars_removed_total');
			//nlapiLogExecution('DEBUG','before submit','carRemove =='+carRemove);
			if(carRemove == null)
			{
				carRemove = '';
			}
			
			var INV_StartDate = ffReqObj.getFieldValue('startdate');
			//nlapiLogExecution('DEBUG','before submit','INV_StartDate =='+INV_StartDate);
			if(INV_StartDate == null)
			{
				INV_StartDate = '';
			}
			
			var INV_EndDate = ffReqObj.getFieldValue('enddate');
			//nlapiLogExecution('DEBUG','before submit','INV_EndDate =='+INV_EndDate);
			if(INV_EndDate == null)
			{
				INV_EndDate = '';
			}
			
			if(subsidiary != null && subsidiary != undefined)
			{
				nlapiLogExecution('DEBUG','before submit','subsidiary =='+subsidiary);
				
				var subsiObj = nlapiLoadRecord('subsidiary',subsidiary);
				nlapiLogExecution('DEBUG','before submit','subsiObj =='+subsiObj);
				
				/*SubsiAdd = subsiObj.getFieldValue('custrecord_sub_addr');*/
				var SubsiLogo = subsiObj.getFieldValue('logo'); 
				nlapiLogExecution('DEBUG','before submit','SubsiLogo =='+SubsiLogo);
				
				var subsidiaryName = subsiObj.getFieldValue('name');
				//nlapiLogExecution('DEBUG','before submit','subsidiaryName =='+subsidiaryName);
			}
			
			if(customer != null && customer != '')
			{
				var custObj = nlapiLoadRecord('customer',customer);
				
				var custLogo_url = custObj.getFieldValue('custentity_yde_cust_logo_url');
				
				var custRegNo = custObj.getFieldValue('vatregnumber');
				if(custRegNo == null)
				{
					custRegNo = '';
				}
				
				var custAddress = custObj.getFieldValue('defaultaddress');
				
				var numberOfAddress = custObj.getLineItemCount('addressbook');
				  
				var city ;
				var addressText2 ;
				var addressText1 ;
				var addressText3;
				var country ;
				var addressID ;
				var zip ;
				var state;
				var address;
	
				for (var x = 1; x <= numberOfAddress; x++)
				{
					var defaultaddress = custObj.getLineItemValue('addressbook', 'defaultbilling', x);
					if (defaultaddress == 'T')
					{
						addressID = custObj.getLineItemValue('addressbook', 'internalid', x);
						
						address = custObj.getLineItemValue('addressbook', 'addressee', x);
						
						addressText1 = custObj.getLineItemValue('addressbook', 'addr1', x);
						
						addressText2 = custObj.getLineItemValue('addressbook', 'addr2', x);
						
						addressText3 = custObj.getLineItemValue('addressbook','addr3',x);
									 
						city = custObj.getLineItemValue('addressbook','city', x);
									 
						country = custObj.getLineItemValue('addressbook','country', x);
									  
						state = custObj.getLineItemValue('addressbook','state', x);
									  
						zip = custObj.getLineItemValue('addressbook','zip', x);
						break;
					 }
				}
				//var custLogo_url = "https://5309025-sb1.app.netsuite.com/core/media/media.nl?id=9482&c=5309025_SB1&h=edd1309053ad3ae4fcff&fcts=20200505060359&whence=";
			}
			
			
			var recObj = nlapiLoadRecord('customrecord_yde_global_parameters',3);
			nlapiLogExecution('DEBUG','Inventory Aging Report','********** recObj ***********');
			
			var getTelgrpUrl = recObj.getFieldValue('custrecord_yde_telegraphic_transfer_url');
			var BackImgUrl = recObj.getFieldValue('custrecord_yde_gp_background_url');
			
			
			var getLineCount = ffReqObj.getLineItemCount('item');
		 	nlapiLogExecution('DEBUG','GET Value','getLineCount == : ' + getLineCount);
		 	
		 	
	//=========================================== FIRST PAGE ============================================================
			var subsiLogo = '';
			var strName = " ";
			
			var image_URL_B = 'https://5309025-sb1.app.netsuite.com/core/media/media.nl?id=9506&amp;c=5309025_SB1&amp;h=b55aa0afeb502bf9eee4&amp;fcts=20200510223913&amp;whence=';
			
			strName = "<body id='pageFirst' style='background-image: url("+image_URL_B+");'>";
			
			strName += "<div width=\"100\%\">";
			strName += "<div width=\"100\%\" id='firstPage'>";
			strName += "<table width=\"100\%\" style=\"width:50%; float:left\">";
				strName += "<tr>";
				strName += "<td><img height='80' width='80' src=\""+nlapiEscapeXML(url)+"\"></img></td>\n";
				strName += "</tr>";
				
				strName += "<tr>";
				strName += "<td font-size=\"17px\" width=\"100\%\" margin-top = \"70px\" font-family=\"sans-serif\"><b>By Going Solar, You are</b></td>";
				strName += "</tr>";
				strName += "<tr>";
				strName += "<td font-size=\"13px\" margin-top=\"5px\" width=\"20\%\" font-family=\"sans-serif\">Saving your company money</td>";
				strName += "</tr>";
				strName += "<tr>";
				strName += "<td font-size=\"13px\" margin-top=\"5px\" width=\"20\%\" font-family=\"sans-serif\">Reducing your company&rsquo;s carbon footprint</td>";
				strName += "</tr>";
				strName += "<tr>";
				strName += "<td font-size=\"13px\" margin-top=\"5px\" width=\"20\%\" font-family=\"sans-serif\">Leading the renewable energy transition</td>";
				strName += "</tr>";
				strName += "<tr>";
				strName += "<td font-size=\"13px\" margin-top=\"5px\" width=\"20\%\" font-family=\"sans-serif\">Contributing to the UAE Energy Strategy 2050</td>";
				strName += "</tr>";
			strName += "</table>";
			
			
	//================================== CUSTOMER LOGO PART =============================================
			var filter = new Array();
			//filter[0] = new nlobjSearchFilter('internalid',null,'is',recrdId);
				
			var columns = new Array();
			columns[0] = new nlobjSearchColumn("custbody_yde_cars_removed_total",null,"SUM");
			columns[1] = new nlobjSearchColumn("custbody_yde_trees_planted_total",null,"SUM");
			columns[2] = new nlobjSearchColumn("custbody_yde_carbon_offset_total",null,"SUM");
			columns[3] = new nlobjSearchColumn("custbody_yde_savings_amount",null,"SUM");
			columns[4] = new nlobjSearchColumn("amount",null,"SUM");
			
			var searchResults = nlapiSearchRecord('invoice','customsearch_yde_invoice_amount_till_dat',filter,columns);
			nlapiLogExecution('DEBUG','GET Value','Get Footer Values == : ' + searchResults.length);
			
			var custLogo = '';
			
			strName += "<table style=\"float:left\" margin-top=\"50px\">";
			
			if(searchResults != null && searchResults != '' && searchResults != undefined)
			{
				
				for(var i = 0;  i < searchResults.length; i++)
				{
					//nlapiLogExecution('DEBUG','GET Value','Inside loop == : ' + searchResults.length);
					var lease_savingAmt = searchResults[i].getValue("custbody_yde_savings_amount",null,"SUM");
					
					var lease_solarProd = searchResults[i].getValue("amount",null,"SUM");
					//var lease_solarProd_fix = lease_solarProd.toFixed(2);
					
					var lease_CarOff = searchResults[i].getValue("custbody_yde_carbon_offset_total",null,"SUM");
					//nlapiLogExecution('DEBUG','GET Value','lease_CarOff == : ' + lease_CarOff);
					//var lease_CarOff_fix = lease_CarOff.toFixed(2);
					
					var lease_TreePlant = searchResults[i].getValue("custbody_yde_trees_planted_total",null,"SUM");
					//nlapiLogExecution('DEBUG','GET Value','lease_TreePlant == : ' + lease_TreePlant);
					//var lease_TreePlant_fix = lease_TreePlant.toFixed(2);
					
					var lease_CarRem = searchResults[i].getValue("custbody_yde_cars_removed_total",null,"SUM");
					//nlapiLogExecution('DEBUG','GET Value','lease_CarRem == : ' + lease_CarRem);
					//var lease_CarRem_fix = lease_CarRem.toFixed(2);
					
						strName += "<div background-color = \"#FFCF28\" margin-left = \"70px\" width=\"300px\">";
						strName += "<div margin=\"3px 4px 2px 2px\">";
						strName += "<img height='120' width='190' src=\""+nlapiEscapeXML(custLogo_url)+"\"></img>";
						
						strName += "</div>";
						
						strName += "<div>";
						strName += "<table width=\"100\%\" background-color = \"#FFCF28\">";
							
						
						strName += "<tr>";
						strName += "<td font-size=\"15px\" align=\"center\" font-weight=\"bold\" font-family=\"sans-serif\" margin-top=\"15px\">YOUR SOLAR SAVINGS</td>";
						strName += "</tr>";
						
						strName += "<tr>";
						strName += "<td font-size=\"14px\" align=\"center\" font-family=\"sans-serif\" margin-top=\"10px\">This Month</td>";
						strName += "</tr>";
						
						strName += "<tr>";
						if(savingAmt != null && savingAmt != '' && savingAmt != undefined)
						{
							strName += "<td font-size=\"17px\" align=\"center\" font-family=\"sans-serif\" margin-top=\"10px\"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+formatNumber(parseFloat(savingAmt).toFixed(2))+" &nbsp;&nbsp;&nbsp;&nbsp;AED</b></td>";
						}
						else
						{
							savingAmt = '';
							strName += "<td font-size=\"17px\" align=\"center\" font-family=\"sans-serif\" margin-top=\"10px\"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+savingAmt+" &nbsp;&nbsp;&nbsp;&nbsp;AED</b></td>";
						}
						
						strName += "</tr>";
						strName += "<tr>";
						strName += "<td font-size=\"14px\" align=\"center\" font-family=\"sans-serif\" margin-top=\"10px\">Lease-To-Date</td>";
						strName += "</tr>";
						
						strName += "<tr>";
						if(lease_savingAmt != null && lease_savingAmt != '' && lease_savingAmt != undefined)
						{
							strName += "<td font-size=\"17px\" align=\"center\" font-family=\"sans-serif\" margin-top=\"10px\"><b>&nbsp;&nbsp;"+formatNumber(parseFloat(lease_savingAmt).toFixed(2))+" &nbsp;AED</b></td>";
						}
						else
						{
							lease_savingAmt = '';
							strName += "<td font-size=\"17px\" align=\"center\" font-family=\"sans-serif\" margin-top=\"10px\"><b>&nbsp;&nbsp;"+lease_savingAmt+" &nbsp;AED</b></td>";
						}
						strName += "</tr>";
						
						strName += "<tr>";
						strName += "<td font-size=\"14px\" align=\"center\" font-family=\"sans-serif\" margin-bottom=\"20px\"></td>";
						strName += "</tr>";
						
						strName += "</table>";
					    strName += "</div>";
					
			            strName += "</div>";
			
			            strName += "</table>";
			
	//=========================================== FOOTER PART =====================================================
			
		
			strName += "<div background-color = \"#023a6c\" width=\"100\%\">";
				strName += "<table width=\"100\%\">";
				strName += "<thead>";
				strName += "<tr>";
				strName += "<td color=\"#FFFFFF\" font-family=\"sans-serif\" padding-left=\"25px\" margin-top=\"15px\"><b>YOUR ENVIORMENTAL CONTRIBUTION</b></td>";
				strName += "</tr>";
				strName += "</thead>";
				strName += "</table>";
			strName += "</div>";
				
			strName += "<div background-color = \"#023a6c\" width=\"100\%\">";
				strName += "<table width=\"100\%\">";
				strName += "<thead>";
				strName += "<tr>";
				strName += "<td color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" font-size=\"12px\" width=\"15%\"></td>";
				strName += "<td color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"20%\"><b>Solar Production</b></td>"; //padding-left=\"200px\" 
				strName += "<td color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"25%\"><b>Carbon Offset</b></td>";
				strName += "<td color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"25%\"><b>Trees Planted</b></td>";
				strName += "<td color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"20%\"><b>Cars Removed</b></td>";
				strName += "</tr>";
				strName += "</thead>";
				strName += "</table>";
			    strName += "</div>";
				
			    strName += "<div background-color = \"#023a6c\" width=\"100\%\">";
				strName += "<table width=\"100\%\">";
				strName += "<thead>";
				strName += "<tr>";
                strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"15%\">This Month</td>";
				
				if(invTot != null && invTot != '' && invTot != undefined)
				{
					strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"20%\">"+formatNumber(parseFloat(invTot).toFixed(2))+" &nbsp;kWh</td>";
				}
				else
				{
					invTot = '';
					strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"20%\">"+invTot+" &nbsp;kWh</td>";
				}
				
				if(carbaonOffset != null && carbaonOffset != '' && carbaonOffset != undefined)
				{
					strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"25%\">"+formatNumber(parseFloat(carbaonOffset).toFixed(2))+"</td>";
				}
				else
				{
					carbaonOffset = '';
					strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"25%\">"+carbaonOffset+"</td>";
				}
				
				if(treesPlant != null && treesPlant != '' && treesPlant != undefined)
				{
					strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"25%\">"+formatNumber(parseFloat(treesPlant).toFixed(2))+"</td>";
				}
				else
				{
					treesPlant = '';
					strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"25%\">"+treesPlant+"</td>";
				}
				
				if(carRemove != null && carRemove != '' && carRemove != undefined)
				{
					strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"20%\">"+formatNumber(parseFloat(carRemove).toFixed(2))+"</td>";  //padding-right=\"20px\" 
				}
				else
				{
					carRemove = '';
					strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"10px\" width=\"20%\">"+carRemove+"</td>";  //padding-right=\"
				}
				strName += "</tr>";
				strName += "</thead>";
				strName += "</table>";
		    	strName += "</div>";
			
		    	strName += "<div background-color = \"#023a6c\" width=\"100\%\">";
				strName += "<table width=\"100\%\">";
				strName += "<thead>";
				
					strName += "<tr>";
					strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"5px\" margin-bottom=\"25px\" width=\"15%\">Lease-To-Date</td>";
					if(lease_solarProd != null && lease_solarProd != '' && lease_solarProd != undefined)
					{
						strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"5px\" margin-bottom=\"25px\" width=\"20%\">"+formatNumber(parseFloat(lease_solarProd).toFixed(2))+" &nbsp;&nbsp;kWh</td>";
					}
					else
					{
						lease_solarProd = '';
						strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"5px\" margin-bottom=\"25px\" width=\"20%\">"+lease_solarProd+" &nbsp;&nbsp;kWh</td>";
					}
					
					if(lease_CarOff != null && lease_CarOff != '' && lease_CarOff != undefined)
					{
						strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"5px\" margin-bottom=\"25px\" width=\"25%\">"+formatNumber(parseFloat(lease_CarOff).toFixed(2))+" &nbsp;tonnes</td>";
					}
					else
					{
						lease_CarOff = '';
						strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"5px\" margin-bottom=\"25px\" width=\"25%\">"+lease_CarOff+" &nbsp;tonnes</td>";
					}
					
					if(lease_TreePlant != null && lease_TreePlant != '')
					{
						strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"5px\" margin-bottom=\"25px\" width=\"25%\">"+formatNumber(parseFloat(lease_TreePlant).toFixed(2))+"</td>";
					}
					else
					{
						lease_TreePlant = '';
						strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"5px\" margin-bottom=\"25px\" width=\"25%\">"+lease_TreePlant+"</td>";
					}
					
					if(lease_CarRem != null && lease_CarRem != '')
					{
						strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"5px\" margin-bottom=\"25px\" width=\"20%\">"+formatNumber(parseFloat(lease_CarRem).toFixed(2))+"</td>";  //padding-right=\"20px\" 
					}
					else
					{
						lease_CarRem = '';
						strName += "<td font-size=\"12px\" color=\"#FFFFFF\" font-family=\"sans-serif\" margin-top=\"5px\" margin-bottom=\"25px\" width=\"20%\">"+lease_CarRem+"</td>";  //padding-right=\"20px\" 
					}
					strName += "</tr>";
					}
				}
					
				strName += "</thead>";
				strName += "</table>";
			    strName += "</div>";
			
		        strName += "</div>";
		        strName += "</div>";
		        
		    strName += "</body>";
	//================================================ SECOND PAGE ========================================
		 	strName += "<pbr/>";
		    
		 	strName = "<body class='pageSecond'>";
	 	 	var discriptionArr = new Array();
	 	 	var previousRedArr = new Array();
	 	 	var currentRedArr = new Array();
	 	 	
		 	
		 	strName += "<div width=\"100\%\">";
			strName += "<table width=\"100\%\" style=\"width:50%; float:left\">";
			strName += "<tr>";
			strName += "<td><img height='80' width='80' src=\""+nlapiEscapeXML(url)+"\"></img></td>\n";
			strName += "</tr>";
			
			strName += "<tr>";
			strName += "<td margin-top=\"10px\" font-size=\"12px\" font-family=\"sans-serif\" align=\"left\" style=\"word-break: break-all; white-space: normal;\"><b>YELLOW DOOR ENERGY EQUIPMENT LEASING LLC</b></td>";
			strName += "</tr>";
			strName += "<tr>";
			strName += "<td margin-top=\"10px\" font-size=\"11px\" font-family=\"sans-serif\"><b>Invoice No.:</b><span margin-left = \"5px\">"+nlapiEscapeXML(invoiceNo)+"</span></td>";
			strName += "</tr>";
			strName += "<tr>";
			strName += "<td margin-top=\"10px\"  font-size=\"11px\" font-family=\"sans-serif\"><b>Invoice Date.:</b><span margin-left = \"5px\">"+nlapiEscapeXML(invoiceDate)+"</span></td>";
			strName += "</tr>";
			strName += "<tr>";
			strName += "<td margin-top=\"10px\"  font-size=\"11px\" font-family=\"sans-serif\"><b>VAT Registration No.:</b><span margin-left = \"5px\">"+nlapiEscapeXML(vatRegNo)+"</span></td>";
			strName += "</tr>";
			strName += "<tr>";
			strName += "<td margin-top=\"10px\"  font-size=\"13px\" font-family=\"sans-serif\"><b>CUSTOMER INFORMATION</b></td>";
			strName += "</tr>";
			strName += "<tr>";
			strName += "<td margin-top=\"10px\"  font-size=\"11px\" font-family=\"sans-serif\"><b>Name:</b><span margin-left = \"5px\">"+nlapiEscapeXML(customerTxt)+"</span></td>";
			strName += "</tr>";
			
			var customerAdd = '';
		 	
			if(address != null && address != '' && address != undefined)
			{
				customerAdd += address+'\n';
			}
			
			if(addressText1 != null && addressText1 != '' && addressText1 != undefined)
			{
				customerAdd += addressText1+'\n';
			}
			
			if(addressText2 != null && addressText2 != '' && addressText2 != undefined)
			{
				customerAdd += addressText2+'\n';
			}
			
			if(addressText3 != null && addressText3 != '' && addressText3 != undefined)
			{
				customerAdd += addressText3+'\n';
			}
			
			if(city != null && city != '' && city != undefined)
			{
				customerAdd += city+'\n';
			}
			
			if(state != null && state != '' && state != undefined)
			{
				customerAdd += state+' ';
			}
			
			if(zip != null && zip != '' && zip != undefined)
			{
				customerAdd += zip+'\n';
			}
			
			if(country != null && country != '' && country != undefined)
			{
				customerAdd += country;
			}
			
			var setAdd = formatAndReplaceSpacesofMessage(customerAdd);
			strName += "<tr>";
			strName += "<td margin-top=\"10px\"  font-size=\"11px\" font-family=\"sans-serif\"><b>Address:</b><span margin-left = \"5px\">"+nlapiEscapeXML(custAddress)+"</span></td>";
			strName += "</tr>";
			strName += "<tr>";
			strName += "<td margin-top=\"10px\"  font-size=\"11px\" font-family=\"sans-serif\"><b>VAT Registration No.:</b><span margin-left = \"5px\">"+nlapiEscapeXML(custRegNo)+"</span></td>";
			strName += "</tr>";
			
			strName += "<tr>";
			strName += "<td margin-top=\"10px\"  font-size=\"11px\" font-family=\"sans-serif\"><b>Supplier Registration No.:</b><span margin-left = \"5px\"></span></td>";
			strName += "</tr>";
			strName += "</table>";
			
			var custLogo = '';
			
			strName += "<table style=\"float:left\" margin-top=\"50px\">";
				strName += "<div margin-left = \"70px\" width=\"330px\">";
					strName += "<div>";
					
					strName += "</div>";
					strName += "<div>";
					
					
						strName += "<table width=\"100\%\" background-color = \"#FFCF28\">";
							strName += "<thead>";
							strName += "<tr>";
							strName += "<td font-size=\"30px\" align=\"center\" font-weight=\"bold\" font-family=\"sans-serif\" margin-top=\"15px\">Tax Invoice</td>";
							strName += "</tr>";
							
							strName += "<tr>";
							strName += "<td font-size=\"14px\" align=\"center\" font-family=\"sans-serif\" margin-top=\"10px\"></td>";
							strName += "</tr>";
							strName += "</thead>";
						strName += "</table>";
						
	
		//========================BILL SUMMARY ==================================
						strName += "<div>"
							strName += "<table width=\"100\%\" style=\"border: 2px solid #FFCF28;\">";
									strName += "<tr>";
									strName += "<td margin-top=\"17px\" margin-right=\"5px\" font-size=\"13px\" font-family=\"sans-serif\"><b>BILL SUMMARY</b></td>";
									strName += "</tr>";
										
									strName += "<tr>";
									strName += "<td margin-top=\"5px\" font-size=\"11px\" font-family=\"sans-serif\" style=\"text-align: justify; text-align-last: right; align: right\">Previous Balance</td>";
									strName += "<td margin-right=\"5px\" margin-left=\"5px\" background-color = \"#DCDDDE\" align=\"right\"></td>";
									strName += "</tr>";
											
									strName += "<tr>";
									strName += "<td font-size=\"11px\" font-family=\"sans-serif\" style=\"text-align: justify; text-align-last: right; align: right\">Previous Payment</td>";
									strName += "<td margin-right=\"5px\" margin-left=\"5px\" margin-top=\"3px\" background-color = \"#DCDDDE\" align=\"right\"></td>";
									strName += "</tr>";
											
									strName += "<tr>";
									strName += "<td font-size=\"11px\" font-family=\"sans-serif\" style=\"text-align: justify; text-align-last: right; align: right\">Current Invoice</td>";
									strName += "<td margin-right=\"5px\" margin-left=\"5px\" margin-top=\"3px\" background-color = \"#DCDDDE\" align=\"right\">"+formatNumber(invTot)+" AED</td>";
									strName += "</tr>";
											
									strName += "<tr>";
									strName += "<td font-size=\"11px\" font-family=\"sans-serif\" style=\"text-align: justify; text-align-last: right; align: right\">Total Balance</td>";
									strName += "<td margin-right=\"5px\" margin-left=\"5px\" margin-top=\"3px\" background-color = \"#FFCF28\" align=\"right\"></td>";
									strName += "</tr>";
	
	//==================================================== CURRENT INVOICE ===================================================
											
									strName += "<tr>";
									strName += "<td margin-top=\"10px\" margin-right=\"5px\" font-size=\"13px\" font-family=\"sans-serif\"><b>CURRENT INVOICE</b></td>";
									strName += "</tr>";
											
									strName += "<tr>";
									strName += "<td margin-top=\"5px\" font-size=\"11px\" font-family=\"sans-serif\" style=\"text-align: justify; text-align-last: right; align: right\">Billing Cycle Start</td>";
									strName += "<td margin-right=\"5px\" margin-left=\"5px\" margin-top=\"3px\" background-color = \"#DCDDDE\" align=\"right\">"+nlapiEscapeXML(INV_StartDate)+"</td>";
									strName += "</tr>";
											
									strName += "<tr>";
									strName += "<td font-size=\"11px\" font-family=\"sans-serif\" style=\"text-align: justify; text-align-last: right; align: right\">Billing Cycle End</td>";
									strName += "<td margin-right=\"5px\" margin-left=\"5px\" margin-top=\"3px\" background-color = \"#DCDDDE\" align=\"right\">"+nlapiEscapeXML(INV_EndDate)+"</td>";
									strName += "</tr>";
											
									strName += "<tr>";
									strName += "<td font-size=\"11px\" font-family=\"sans-serif\" style=\"text-align: justify; text-align-last: right; align: right\">Payment Amount</td>";
									strName += "<td margin-right=\"5px\" margin-left=\"5px\" margin-top=\"3px\" background-color = \"#DCDDDE\" align=\"right\"></td>";
									strName += "</tr>";
											
									strName += "<tr>";
									strName += "<td font-size=\"11px\" font-family=\"sans-serif\" style=\"text-align: justify; text-align-last: right; align: right\">Payment Due Date</td>";
									strName += "<td margin-right=\"5px\" margin-left=\"5px\" margin-bottom=\"14px\" margin-top=\"3px\" background-color = \"#FFCF28\" align=\"right\">"+Datefor_PayDue+"</td>";
									strName += "</tr>";
							strName += "</table>";
						strName += "</div>";
							
		//========================== End of Bill Summary and customer invoice ========================
					strName += "</div>";
					
			    strName += "</div>";
			strName += "</table>";
			strName += "</div>";
			
			
	//========================================== SOLAR SYSTEM METER READING ==============================================	
			var currentBill = 0;
			
			strName += "<div width=\"100\%\">";
				strName += "<table width=\"100\%\" margin-top=\"15px\">";
				
				strName += "<tr>";
				strName += "<td font-family=\"sans-serif\" font-size=\"15px\"><b>SOLAR SYSTEM METER READINGS</b></td>";
				strName += "</tr>";
				strName += "</table>";
			strName += "</div>";
			
			strName += "<div width=\"100\%\">";
				strName += "<table width=\"100\%\" margin-top=\"5px\">";
				strName += "<tr>";
				//strName += "<td margin-top=\"10px\"></td>";
				strName += "<td font-family=\"sans-serif\" margin-top=\"10px\" align=\"center\"><b>Meter Name</b></td>"; 
				strName += "<td font-family=\"sans-serif\" margin-top=\"10px\" align=\"center\"><b>Previous Reading</b></td>";
				strName += "<td font-family=\"sans-serif\" margin-top=\"10px\" align=\"center\"><b>Current Reading</b></td>";
				strName += "<td font-family=\"sans-serif\" margin-top=\"10px\" align=\"center\"><b>Current Production</b></td>";
				strName += "</tr>";
				strName += "</table>";
			strName += "</div>";
			
	
			for(var p=1;p<=getLineCount;p++)
		 	{
		 		var discription = ffReqObj.getLineItemValue('item','description',p);
		 		//discriptionArr.push(discription);
		 		//nlapiLogExecution('DEBUG','GET Value','discription == : ' + discription);
		 		
		 		var previousRed = ffReqObj.getLineItemValue('item','custcol_yde_previous_reading',p);
		 		//nlapiLogExecution('DEBUG','GET Value','previousRed == : ' + previousRed);
		 		if(previousRed != null && previousRed != '' && previousRed != undefined)
		 		{
		 			previousRed = previousRed;
		 		}
		 		else
		 		{
		 			previousRed = 0;
		 		}
		 		
		 		var currentRed = ffReqObj.getLineItemValue('item','custcol_yde_current_reading',p);
		 		//nlapiLogExecution('DEBUG','GET Value','currentRed == : ' + currentRed);
		 		if(currentRed != null && currentRed != '' && currentRed != undefined)
		 		{
		 			currentRed = currentRed;
		 		}
		 		else
		 		{
		 			currentRed = 0;
		 		}
		 		
		 		if((currentRed != null && currentRed != '') && (previousRed != null && previousRed != ''))
		 		{
		 			var currentProdu = parseFloat(currentRed) - parseFloat(previousRed);
			 		//nlapiLogExecution('DEBUG','GET Value','currentProdu == : ' + currentProdu);
		 		}
		 		else
		 		{
		 			currentProdu = 0;
		 		}
		 		
		 		strName += "<div width=\"100\%\">";
				strName += "<table width=\"100\%\">";
				strName += "<tr>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\">"+discription+"</td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\"><span>"+previousRed+" </span><span>kWh</span></td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\"><span>"+currentRed+" </span><span>kWh</span></td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\"><span>"+currentProdu+" </span><span>kWh</span></td>";  
				strName += "</tr>";
				strName += "</table>";
			strName += "</div>";
		 	}
			
			if(currentProdu != null && currentProdu != '')
			{
				currentBill = parseFloat(currentBill) + parseFloat(currentProdu);
			}
			else
			{
				currentBill = 0;
			}
			
			
			strName += "<div background-color = \"#FFCF28\" width=\"100\%\" margin-top=\"10px\">";
				strName += "<table width=\"100\%\">";
				strName += "<tr>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"right\" width=\"30\%\"><span>Total Solar System Production for Current Billing Cycle</span></td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"right\"></td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\"></td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\"></td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"left\"><span>"+currentBill+"</span><span> kWh</span></td>"; 
				strName += "</tr>";
				strName += "</table>";
			strName += "</div>";
		
	//======================================= SOLAR SYSTEM STATEMENT ==========================================
			
			var INVBeforeVat = 0;
			
			strName += "<div width=\"100\%\">";
				strName += "<table width=\"100\%\" margin-top=\"25px\">";
				strName += "<tr>";
				strName += "<td font-family=\"sans-serif\" font-size=\"15px\"><b>SOLAR SYSTEM STATEMENT</b></td>";
				strName += "</tr>";
				strName += "</table>";
			strName += "</div>";
			
			strName += "<div width=\"100\%\">";
				strName += "<table width=\"100\%\" margin-top=\"7px\">";
				strName += "<tr>";
				strName += "<td font-family=\"sans-serif\" margin-top=\"10px\" align=\"center\" width=\"20%\"><b>Solar System <br/>&nbsp;&nbsp;Production</b></td>"; //padding-left=\"200px\" 
				strName += "<td font-family=\"sans-serif\" margin-top=\"10px\" align=\"center\" width=\"20%\"></td>"; 
				strName += "<td font-family=\"sans-serif\" margin-top=\"10px\" align=\"center\" width=\"20%\"><b>Solar Unit<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rate</b></td>"; //padding-left=\"200px\" 
				strName += "<td font-family=\"sans-serif\" margin-top=\"10px\" align=\"center\" width=\"20%\"></td>";
				strName += "<td font-family=\"sans-serif\" margin-top=\"10px\" align=\"center\" width=\"20%\"><b>Current Invoice <br/>&nbsp;&nbsp;&nbsp; Before VAT</b></td>";
				strName += "</tr>";
				strName += "</table>";
			strName += "</div>";
			
			
			for(var t=1;t<=getLineCount;t++)
			{
				var INVQty = ffReqObj.getLineItemValue('item','quantity',t);
				//nlapiLogExecution('DEBUG','GET Value','INVQty == : ' + INVQty);
				
				var INVRate = ffReqObj.getLineItemValue('item','rate',t);
				//nlapiLogExecution('DEBUG','GET Value','INVRate == : ' + INVRate);
				
				var beforeVAT = parseFloat(INVQty) * parseFloat(INVRate);
				//nlapiLogExecution('DEBUG','GET Value','beforeVAT == : ' + beforeVAT);
				
				var taxRate = ffReqObj.getLineItemValue('item','taxrate1',t);
				//nlapiLogExecution('DEBUG','GET Value','taxRate == : ' + taxRate);
				
				INVBeforeVat = parseFloat(INVBeforeVat)+parseFloat(beforeVAT);
				
				strName += "<div width=\"100\%\">";
				strName += "<table width=\"100\%\">";
				strName += "<tr>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\"  align=\"center\" width=\"20%\">"+formatNumber(INVQty)+" <span>&nbsp; kWh</span></td>";
				strName += "<td font-size=\"20px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\">*</td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\">"+formatNumber(INVRate)+"<span>&nbsp; kWh/AED</span></td>";
				strName += "<td font-size=\"14px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\">=</td>";  
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\">"+formatNumber(beforeVAT.toFixed(2))+"<span>&nbsp; AED</span></td>"; 
				strName += "</tr>";
				strName += "</table>";
				strName += "</div>";
			}
			
			//nlapiLogExecution('DEBUG','GET Value','INVBeforeVat == : ' + INVBeforeVat);
			
			var totalVAT = parseFloat(INVBeforeVat)*parseFloat(taxRate)/100;
			
				strName += "<div width=\"100\%\">";
				strName += "<table width=\"100\%\">";
				strName += "<tr>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\"></td>";
				strName += "<td font-size=\"14px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\"></td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\">VAT "+taxRate+"</td>";
				strName += "<td font-size=\"14px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\"></td>";  
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\">"+formatNumber(totalVAT.toFixed(2))+"<span>&nbsp; AED</span></td>"; 
				strName += "</tr>";
				strName += "</table>";
				strName += "</div>";
			
			var currentINV = parseFloat(INVBeforeVat) + parseFloat(totalVAT);
			
			    strName += "<div width=\"100\%\">";
				strName += "<table width=\"100\%\">";
				strName += "<tr>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\"></td>";
				strName += "<td font-size=\"14px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\"></td>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\" background-color = \"#FFCF28\">Current Invoice</td>";
				strName += "<td font-size=\"14px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\" background-color = \"#FFCF28\"></td>";  
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\" width=\"20%\" background-color = \"#FFCF28\"><span>"+formatNumber(currentINV.toFixed(2))+"</span><span>&nbsp; AED</span></td>"; 
				strName += "</tr>";
				strName += "</table>";
				strName += "</div>";
		 	
				strName += "<div width=\"100\%\" margin-top=\"20px\">";
				strName += "<table width=\"100\%\">";
				strName += "<tr>";
				strName += "<td font-size=\"12px\" font-family=\"sans-serif\" align=\"center\">We appreciate your prompt payment!</td>";
				strName += "</tr>";
				strName += "</table>";
				strName += "</div>";
		    
				strName += "</body>";
	//=========================================================XML PART==========================================
		//	var image_URL_B = 'https://5309025-sb1.app.netsuite.com/core/media/media.nl?id=9506&amp;c=5309025_SB1&amp;h=b55aa0afeb502bf9eee4&amp;fcts=20200510223913&amp;whence=';
			
			var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
			xml += "<pdf>";
			xml += "<head>";
			xml += "<macrolist>";
			xml += "<macro id=\"myfooter\">";
			xml += "<p align=\"center\"><br/><br/></p>";
			xml += "</macro>";
			xml += "</macrolist>";
			
			/*xml += "<style>";
			xml += "body #pageFirst {";
			xml += "  background-image: "+image_URL_B;
			xml += "}";
		    xml += "<\/style>";
			*/
		
			
			xml += "</head>\n";
	
			xml += "<body size= \"A4\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n";
			xml += "<p></p>";
			xml += strName;
			
			xml += "</body>\n</pdf>";
			
			// run the BFO library to convert the xml document to a PDF 
			var file = nlapiXMLToPDF(xml);
		
			// set content type, file name, and content-disposition (inline means display in browser)
			response.setContentType('PDF','InvoiceLayout.pdf', 'inline');
		
			// write response to the client
			response.write(file.getValue()); 
		}
		catch(e)
		{
			nlapiLogExecution('DEBUG','before submit','Intended By =='+e);
		}
	}
					
			
	function formatAndReplaceSpacesofMessage(messgaeToBeSendPara)
	{
		if(messgaeToBeSendPara!= null && messgaeToBeSendPara!=''&& messgaeToBeSendPara!=undefined)
		{
			messgaeToBeSendPara = nlapiEscapeXML(messgaeToBeSendPara);
			messgaeToBeSendPara = messgaeToBeSendPara.toString();   
			messgaeToBeSendPara = messgaeToBeSendPara.replace(/\n/g,"<br/>");/// /g  
			return messgaeToBeSendPara;
			//nlapiLogExecution('DEBUG','GET Value','messgaeToBeSendPara :'+messgaeToBeSendPara);
		}
	
	}
	
	
	function formatNumber(num) 
	{
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	}

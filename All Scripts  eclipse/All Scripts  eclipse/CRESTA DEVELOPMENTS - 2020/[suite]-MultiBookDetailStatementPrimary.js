// BEGIN SCHEDULED FUNCTION =============================================
function suiteletPDFmultiBook(request, response)
{

 try
 {
	
	var strName ="";
	
	venstatid =request.getParameter('venstatsubmitid'); 
	
	// nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'Searching Vendor Transactions');
	
	var venstatobj = nlapiLoadRecord('customrecord_vendor_statement_detail_rec', venstatid)
	
	var vendor_a = venstatobj.getFieldValue('custrecord_venstat_vendor')
	
	var venText = venstatobj.getFieldText('custrecord_venstat_vendor')
	
	var locationname = venstatobj.getFieldValue('custrecord_venstat_loc')
	
	var start = venstatobj.getFieldValue('custrecord_venstat_startdate')
	
	var end = venstatobj.getFieldValue('custrecord_venstat_enddate')
	// nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'end = ' + end);
	
	var User = venstatobj.getFieldValue('custrecord_venstat_user')
	// nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'recepient Email= ' + recepient);
	
	var UseSubsi = nlapiLookupField('employee',User,'subsidiary');
	var UseCurr = nlapiLookupField('subsidiary',UseSubsi,'currency');
	 nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'UseCurr= ' + UseCurr);
	
	var dateformat;
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	} 
	if (mm < 10) {
	  mm = '0' + mm;
	} 
	var today1 = dd + '/' + mm + '/' + yyyy;
	// nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'today1 = ' + today1);
	
	var startdate = nlapiStringToDate(start);
	var enddate = nlapiStringToDate(end);
	
	// nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'Vendor Name = ' + vendor_a);
	// nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'Location Name = ' + locationname);
	// nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'Start date = ' + startdate);
	// nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'End date = ' + enddate);
	
	
	var companyinfo = nlapiLoadConfiguration('companyinformation');
	// nlapiLogExecution('DEBUG','before submit','companyinfo =='+companyinfo);
					
	var companyName = companyinfo.getFieldValue('companyname');
	// nlapiLogExecution('DEBUG','before submit','companyName =='+companyName);
	if(companyName == null || companyName == undefined || companyName == '')
	{
		companyName = "";
	}
					
	var companyAdd = companyinfo.getFieldValue('mainaddress_text');
	// nlapiLogExecution('DEBUG','before submit','companyAdd =='+companyAdd);
	if(companyAdd == null || companyAdd == undefined || companyAdd == '')
	{
		companyAdd = "";
	}
	
//================================Subsidiary Address==================================					
	var subsidiary =  venstatobj.getFieldValue('custrecord_ven_subsidiary')
	nlapiLogExecution('DEBUG','before submit','subsidiary =='+subsidiary);
	
	var subsdryAddrs;
	
    if(subsidiary)
	{
		var s = nlapiLoadRecord("subsidiary", subsidiary,{recordmode: "dynamic"});
		
		var dateformat = s.getFieldValue('DATEFORMAT');
		nlapiLogExecution('DEBUG','before submit','dateformat =='+dateformat);
	
		subsdryAddrs = s.viewSubrecord("mainaddress").getFieldValue('addrtext');
					
		if(subsdryAddrs == null || subsdryAddrs == '' ||subsdryAddrs == undefined)
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
		if(sub_addressID == null||sub_addressID == ''||sub_addressID == undefined)
		{
			sub_addressID = ' ';
		}
		
	    sub_address = s.viewSubrecord("mainaddress").getFieldValue('addressee');
	    nlapiLogExecution('DEBUG','before submit','sub_address =='+sub_address);
		if(sub_addressText1 == null ||sub_addressText1 == ''||sub_addressText1 == undefined)
		{
			sub_addressText1 = ' ';
		}
			
		sub_addressText1 = s.viewSubrecord("mainaddress").getFieldValue('addr1');
		nlapiLogExecution('DEBUG','before submit','sub_addressText1 =='+sub_addressText1);
		if(sub_addressText1 == null ||sub_addressText1 == ''||sub_addressText1 == undefined )
		{
			sub_addressText1 = ' ';
		}
					  
		sub_addressText2 = s.viewSubrecord("mainaddress").getFieldValue('addr2');
		nlapiLogExecution('DEBUG','before submit','sub_addressText2 =='+sub_addressText2);
		if(sub_addressText2 == null ||sub_addressText2 == '' ||sub_addressText2 == undefined)
		{
			sub_addressText2 = ' ';
		}
			
		sub_city = s.viewSubrecord("mainaddress").getFieldValue('city');
		nlapiLogExecution('DEBUG','before submit','sub_city =='+sub_city);
		if(sub_city == null ||sub_city == '' ||sub_city == undefined)
		{
			sub_city = ' ';
		}
					  
		sub_country = s.viewSubrecord("mainaddress").getFieldValue('country');
		nlapiLogExecution('DEBUG','before submit','sub_country =='+sub_country);
		if(sub_country == null ||sub_country == ''||sub_country == undefined)
		{
			sub_country = ' ';
		}
		
		sub_state = s.viewSubrecord("mainaddress").getFieldValue('state');
		nlapiLogExecution('DEBUG','before submit','sub_state =='+sub_state);
		if(sub_state == null ||sub_state == ''||sub_state == undefined)
		{
			sub_state = ' ';
		}
					
		sub_zip = s.viewSubrecord("mainaddress").getFieldValue('zip');
		nlapiLogExecution('DEBUG','before submit','sub_zip =='+sub_zip);
		if(sub_zip == null||sub_zip == ''||sub_zip == undefined)
		{
			sub_zip = ' ';
		}
	}
	
    
 //=========================================Vendor Address=====================================
  //  var vendor_deatil = nlapiLookupField('vendor',vendor_a,'entityid');
  
    
	  var s1 = nlapiLoadRecord("vendor", vendor_a);
	
	  var vendor_deatil = s1.getFieldValue('entityid');
	  nlapiLogExecution('DEBUG','before submit','vendor_deatil =='+vendor_deatil);
	  
	  var vendor_currency = s1.getFieldText('currency');
	  nlapiLogExecution('DEBUG','before submit','vendor_currency =='+vendor_currency);
	  
	  var vendor_terms = s1.getFieldText('terms');
	  nlapiLogExecution('DEBUG','before submit','vendor_terms =='+vendor_terms);
	
      var numberOfAddress = s1.getLineItemCount('addressbook');
      nlapiLogExecution('DEBUG','before submit','numberOfAddress =='+numberOfAddress);
    
	var city ;
	var addressText2 ;
	var addressText1 ;
	var country ;
	var addressID ;
	var zip ;
	var address;
	
	for (var x = 1; x <= numberOfAddress; x++)
	{
		var defaultaddress = s1.getLineItemValue('addressbook', 'defaultbilling', x);
		if (defaultaddress == 'T')
		{
			addressID = s1.getLineItemValue('addressbook', 'internalid', x);
		    if(addressID == null||addressID == '' ||addressID == undefined)
			{
				addressID = ' ';
			}
			
		    address = s1.getLineItemValue('addressbook', 'addressee', x);
		    nlapiLogExecution('DEBUG','before submit','address =='+address);
			if(address == null ||address == ''||address == undefined)
			{
				address = ' ';
			}
			
			addressText1 = s1.getLineItemValue('addressbook', 'addr1', x);
			
			if(addressText1 != null && addressText1 != undefined && addressText1 !=''){
				addressText1 =addressText1.replace("&", "&amp;");
				nlapiLogExecution('DEBUG','before submit','addressText1 =='+addressText1);
			}
			
			if(addressText1 == null||addressText1 == ''||addressText1 == undefined)
		    {
				addressText1 = ' ';
			}
										  
			addressText2 = s1.getLineItemValue('addressbook', 'addr2', x);
			nlapiLogExecution('DEBUG','before submit','addressText2 =='+addressText2);
			
			if(addressText2 == null||addressText2 == ''||addressText2 == undefined)
			{
				addressText2 = ' ';
			}
										  
			city = s1.getLineItemValue('addressbook', 'city', x);
			nlapiLogExecution('DEBUG','before submit','city =='+city);
			
			if(city == null||city == ''||city == undefined)
			{
				city = ' ';
			}
										  
			country = s1.getLineItemValue('addressbook', 'country', x);
			nlapiLogExecution('DEBUG','before submit','country =='+country);
			
			if(country == null||country == undefined ||country == '' )
			{
				country = ' ';
			}
										  
			var state = s1.getLineItemValue('addressbook', 'state', x);
			nlapiLogExecution('DEBUG','before submit','state =='+state);
			
			if(state == null ||state == ''||state == undefined)
			{
				state = ' ';
			}
										  
			zip = s1.getLineItemValue('addressbook', 'zip', x);
			nlapiLogExecution('DEBUG','before submit','zip =='+zip);
			
			if(zip == null || zip == ''||zip == undefined)
			{
				zip = ' ';
			}
			break;
			}
		else
		{
			var city ='';
			var addressText2='' ;
			var addressText1='' ;
			var country='' ;
			var addressID='' ;
			var zip='' ;
			var address='';
		}
		}

	
    
   // for (var z = 0; z < vendor_a.length; z++) 
					{
						var vendor = vendor_a;
						//if (vendor != null && vendor != '' && vendor != undefined) 
						{
						//	if (z != 0) 
							{
								
							}
							
							var custFilters = new Array();
							var custColumns = new Array();
							
							custFilters.push(new nlobjSearchFilter('internalid', null, 'is', vendor));
							custColumns.push(new nlobjSearchColumn('datecreated'));
							custColumns.push(new nlobjSearchColumn('entityid'));
							custColumns.push(new nlobjSearchColumn('address'));

							var custSearchResults = nlapiSearchRecord('vendor', null, custFilters, custColumns);
							
							if (custSearchResults != null) 
							{
								var custCreatedDate = custSearchResults[0].getValue('datecreated');
								custCreatedDate = nlapiStringToDate(custCreatedDate);
								var custNameID = custSearchResults[0].getValue('entityid');
								var custAddr = custSearchResults[0].getValue('address');
							
								//==============================function to get the first transaction date===================//
								var firstTranDate = getFirstTransactionDate(vendor);
								
								if (firstTranDate != null && firstTranDate != '' && firstTranDate != undefined) 
								{
									custCreatedDate = nlapiStringToDate(firstTranDate);
								}
								
								//var custCurrency ='INR';
								
								nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'custCreatedDate = ' + custCreatedDate);
								nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'custName = ' + custNameID);
								nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'custAddr = ' + custAddr);
							//	nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'custCurrency = ' + custCurrency);
								
								if (custNameID != null && custNameID != '' && custNameID != undefined) 
								{
								
								}
								else 
								{
								 var custName = custNameID;
								}
								
								custAddr = nlapiEscapeXML(custAddr);
								
								if(custAddr !=null && custAddr != undefined && custAddr != '')
								{
									custAddr = afterReplaceCR(custAddr);
								}
								
				 
								
								var opBalanceEndDatems = new Date(startdate.getTime());
								nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'opBalanceEndDatems = ' + opBalanceEndDatems);
								
								opBalanceEndDatems = opBalanceEndDatems - 86400000;
								nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'opBalanceEndDatems = ' + opBalanceEndDatems);
								
								var opBalanceEndDate = new Date(opBalanceEndDatems);
								nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'opBalanceEndDate = ' + opBalanceEndDate);
								
								var openingBalanceDate = start;
								nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'openingBalanceDate = ' + openingBalanceDate);
								
								var openingBalance = getOpeningBalance(vendor, locationname, custCreatedDate, opBalanceEndDate);
								var openingBalanceFx = getOpeningBalance1(vendor, locationname, custCreatedDate, opBalanceEndDate);
							/*	
								strName += "<table  width=\"100\%\">";
						        strName += "<tr>";
						    	strName += "<td  width = \"100\%\"  align=\"right\"></td>";	
						    	strName += "</tr>";
								strName += "</table>";*/
								
	       // 'https://5250587-sb1.app.netsuite.com/core/media/media.nl?id=11&c=5250587_SB1&h=26ed5665b8c23cd266f5'; 
	        var url = 'https://5250587-sb1.app.netsuite.com/core/media/media.nl?id=1523&c=5250587_SB1&h=de9099859c6993da3c70&fcts=20200216205909&whence=';
	    /*    strName += "<table  width=\"100\%\">";
	        strName += "<tr>";
	        strName += "<td>";
			strName +="<img width = \"40\%\"  style=\"float: left; margin: 0.8px\"   src=\""+nlapiEscapeXML(url)+"\" align=\"left\"></img>";
			strName += "</td>";
	    	strName += "<td  width = \"100\%\"  align=\"right\" font-size = \"17\"><b>Vendor Statement</b></td>";	
	    	strName += "</tr>";
			strName += "</table>";
			
			*/
	        
			strName += "<table style=\"margin:0;\" width=\"100\%\">";
			strName += "<tr>";
			strName += "<td width = \"40\%\"   align=\"left\" font-size=\"10\"><br/><img width = \"100\%\"  style=\"float: left; margin: 0.8px\"   src=\""+nlapiEscapeXML(url)+"\" align=\"left\"></img></td>";
			strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"><br/></td>";
			strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"><br/></td>";
			strName += "<td width = \"34\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"17.5\"><br/><b>Vendor Statement</b></td>";
			strName += "</tr>";	
			strName += "</table>";
			
				    
		    /*strName += "<table  width=\"100\%\">";
			strName += "<tr>";
			strName += "<td width=\"75\%\" align=\"left\"><br/><b>"+sub_address+"</b><br/><b>"+sub_addressText1+"</b><br/><b>"+sub_addressText2+"</b><br/><b>"+sub_state+"</b><br/><b>"+sub_zip+"</b><br/><b>"+sub_country+"</b></td>";
			strName += "<td width=\"40\%\" align=\"right\"><b>"+vendor_deatil+"</b></td>";	
			strName += "</tr>";
			strName += "</table>";*/
			
			
			strName += "<table style=\"table-layout: fixed;\" align=\"left\" colspan=\"2\" width=\"100\%\">";
			strName += "<tr>";
			strName += "<td width = \"45\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"10\"><b>"+nlapiEscapeXML(sub_address)+"</b></td>";
			strName += "<td width = \"40\%\"  align=\"left\" font-size=\"10\"></td>";
			strName += "<td width = \"30\%\"  align=\"left\" font-size=\"10\"></td>";
			strName += "<td width = \"45\%\"  align=\"left\"  font-size=\"10\"><b>"+nlapiEscapeXML(venText)+"</b></td>";//
			strName += "</tr>";
			
			strName += "<tr>";
			strName += "<td width = \"20\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"10\"><b>"+nlapiEscapeXML(sub_addressText1)+"</b></td>";
			strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"></td>";
			strName += "<td width = \"30\%\"  align=\"left\" font-size=\"10\"></td>";
			if(addressText1 == null || addressText1 == ''||addressText1 == undefined)
			{
				addressText1 = ' ';
				strName += "<td width = \"20\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"10\"><b>"+nlapiEscapeXML(addressText1)+"</b></td>";
		           
			}
			else
			{
				strName += "<td width = \"20\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"10\"><b>"+nlapiEscapeXML(addressText1)+"</b></td>";
			      	
			}
			
			strName += "</tr>";
			
			strName += "<tr>";
			strName += "<td width = \"20\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"10\"><b>"+nlapiEscapeXML(sub_addressText2)+"</b></td>";
			strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"></td>";
			strName += "<td width = \"30\%\"  align=\"left\" font-size=\"10\"></td>";
			
			if(addressText2 == null || addressText2 == ''||addressText2 == undefined)
			{
				addressText2 = ' ';
			strName += "<td width = \"20\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"10\"><b>"+nlapiEscapeXML(addressText2)+"</b></td>";
			}
			else
			{
				strName += "<td width = \"20\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"10\"><b>"+nlapiEscapeXML(addressText2)+"</b></td>";
			}
			strName += "</tr>";
			
			strName += "<tr>";
			strName += "<td width = \"20\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"10\"><b>"+nlapiEscapeXML(sub_city)+' '+nlapiEscapeXML(sub_state)+' '+nlapiEscapeXML(sub_country)+"</b></td>";
			strName += "<td width = \"20\%\"  align=\"left\" font-size=\"10\"></td>";
			strName += "<td width = \"30\%\"  align=\"left\" font-size=\"10\"></td>";
			
			if(state == null ||state == ''||state == undefined)
			{
				state = ' ';
			}
			
			if(city == null||city == ''||city == undefined)
			{
				city = ' ';
			}
			
			if(country == null||country == undefined ||country == '' )
			{
				country = ' ';
			}
							
			strName += "<td width = \"20\%\"  align=\"left\" style=\" white-space: nowrap;\" font-size=\"10\"><b>"+nlapiEscapeXML(city)+' '+nlapiEscapeXML(state)+' '+nlapiEscapeXML(country)+"</b></td>";
			strName += "</tr>";
			strName += "</table>";
			
			
			


	strName += "<table width=\"100\%\">";
    strName += "<tr>";
	strName += "<td  width = \"50\%\" colspan=\"6\" align=\"left\" margin-top=\"10px\"><b>Start Date :</b>&nbsp;"+convertDate1(start,dateformat)+"</td>";
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td  width = \"50\%\" colspan=\"6\" align=\"left\"><b>End Date :</b>&nbsp;"+convertDate1(end,dateformat)+"</td>";//convertDate1(date,dateformat)
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td  width = \"50\%\" colspan=\"6\" align=\"left\"><b>Payment Terms :</b>&nbsp;"+vendor_terms+"</td>";	
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td  width = \"50\%\" colspan=\"6\" align=\"left\" margin-bottom=\"10px\"><b>Currency :</b>&nbsp;"+vendor_currency+"</td>";	
	strName += "</tr>";
	strName += "</table>";
	
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\" padding-left=\"2em\" padding-right=\"2em\"><b>Date</b></td>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"30\%\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\" padding-left=\"2em\" padding-right=\"2em\"><b>Doc No</b></td>";	
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\" padding-left=\"2em\" padding-right=\"2em\"><b>Currency</b></td>";	
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\" padding-left=\"2em\" padding-right=\"2em\"><b>Amount</b></td>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\" padding-left=\"2em\" padding-right=\"2em\" style=\" white-space: nowrap;\"><b>Primary Currency</b></td>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\" padding-left=\"2em\" padding-right=\"2em\" style=\" white-space: nowrap;\"><b>Amount</b></td>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\" padding-left=\"2em\" padding-right=\"2em\" style=\" white-space: nowrap;\"><b>Exchange Rate</b></td>";	
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\" padding-left=\"2em\" padding-right=\"2em\"><b>Revaluation<br/>Rate</b></td>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"25\%\" border-left=\"solid 1px black\"   padding-left=\"2em\" padding-right=\"2em\" align=\"center\" border-collapse=\"collapse\"><b>Unrealized<br/>Exchange Loss</b></td>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"25\%\" border-left=\"solid 1px black\"  padding-left=\"2em\" padding-right=\"2em\" align=\"center\" border-collapse=\"collapse\"><b>Realized<br/>Loss</b></td>";
	strName += "<td border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width = \"25\%\" border-left=\"solid 1px black\" border-right=\"solid 1px black\" padding-left=\"2em\" padding-right=\"2em\" align=\"center\" border-collapse=\"collapse\"><b>Balance</b></td>";
	strName += "</tr>";
	
	/*
    strName += "<tr>";
	strName += "<td  width = \"30\%\"  padding-left=\"2em\" padding-right=\"2em\" style=\" white-space: nowrap;\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" align=\"center\" border-collapse=\"collapse\"><b>On:"+start+"</b></td>";	//convertDate1(start,dateformat)
	strName += "<td  width = \"20\%\"  padding-left=\"2em\" padding-right=\"2em\"  border-bottom=\"solid 1px black\"   align=\"right\" border-left=\"solid 1px black\"><b></b></td>";
	strName += "<td  width = \"20\%\"  padding-left=\"2em\" padding-right=\"2em\" style=\" white-space: nowrap;\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\"><b>Open Balance:</b></td>";	
	strName += "<td  width = \"20\%\"  padding-left=\"2em\" padding-right=\"2em\" style=\" white-space: nowrap;\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  align=\"center\" border-collapse=\"collapse\"><b>"+parseFloat(openingBalance).toFixed(2)+"</b></td>";
	strName += "<td  width = \"20\%\"  padding-left=\"2em\" padding-right=\"2em\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  align=\"center\"><b></b></td>";	
	strName += "<td  width = \"20\%\"  padding-left=\"2em\" padding-right=\"2em\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" style=\" white-space: nowrap;\"  align=\"center\" border-collapse=\"collapse\"><b>"+parseFloat(openingBalanceFx).toFixed(2)+"</b></td>";
	strName += "<td  width = \"20\%\"  padding-left=\"2em\" padding-right=\"2em\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  align=\"center\"><b></b></td>";	
	strName += "<td  width = \"20\%\"  padding-left=\"2em\" padding-right=\"2em\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  align=\"center\"><b></b></td>";	
	strName += "<td  width = \"20\%\"  padding-left=\"2em\" padding-right=\"2em\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" border-right=\"solid 1px black\"  align=\"center\"><b></b></td>";	
	
	strName += "</tr>";*/
	

	
	 var columns1 = new Array();
		// columns[0] = new nlobjSearchColumn('internalid');
		// columns[1] = new nlobjSearchColumn('total');
		 
		var filters1 = new Array();
		filters1.push(new nlobjSearchFilter('accountingbook', null, 'anyof', '1'));
		filters1.push(new nlobjSearchFilter('name','transaction', 'anyof', vendor));
		//filters.push(new nlobjSearchFilter('trandate', null, 'onorafter',startdate));
		//filters.push(new nlobjSearchFilter('trandate', null, 'onorbefore', enddate));
		

		var searchResults1 = nlapiSearchRecord('accountingtransaction', 'customsearch_multi_book_vendor_stateme_2', filters, columns);
		
	
	var RevalMap={};
	if (searchResults1 != null && searchResults1 != '')
	{
		for (var i1 = 0;  i1 < searchResults1.length; i1++) 
		{
			
			var DocNo1 = searchResults1[i1].getValue("tranid","transaction");
			
			var TranCurr1 = searchResults1[i1].getText("currency","transaction");
			
			var TranAmt1 = searchResults1[i1].getValue("amount");
			
			var PrimCurr1 = searchResults1[i1].getValue("type","transaction");//"basecurrency"
			
			var createdFrom1 = searchResults1[i1].getValue("createdfrom","transaction");
			
			var ExchRate1 = searchResults1[i1].getValue("exchangerate");
			
	
			if(createdFrom1 != null && createdFrom1 != undefined && createdFrom1 !='' )
			{
				// var createDoc = createdFrom1.substring(createdFrom1.indexOf('#')+1, createdFrom1.length);
				
				if(RevalMap[createdFrom1] !=null && RevalMap[createdFrom1] !=undefined)
				{
					RevalMap[createdFrom1]=parseFloat(RevalMap[createdFrom1])+parseFloat(TranAmt1);
				}
				else
				{
					RevalMap[createdFrom1]=parseFloat(TranAmt1);
				}
					
				
			}
			
		}  //END FOR(var i = 0;  i < searchResults.length; i++) 
	}
	
	nlapiLogExecution('DEBUG', 'searchVendorTransactions12', 'RevalMap ='+JSON.stringify(RevalMap));
	
	 var columns = new Array();
	// columns[0] = new nlobjSearchColumn('internalid');
	// columns[1] = new nlobjSearchColumn('total');
	 
	var filters = new Array();
	filters.push(new nlobjSearchFilter('accountingbook', null, 'anyof', '1'));
	filters.push(new nlobjSearchFilter('name','transaction', 'anyof', vendor));
	//filters.push(new nlobjSearchFilter('trandate', null, 'onorafter',startdate));
	//filters.push(new nlobjSearchFilter('trandate', null, 'onorbefore', enddate));
	

	var searchResults = nlapiSearchRecord('accountingtransaction', 'customsearch_multi_book_vendor_statement', filters, columns);
	
	//nlapiLogExecution('DEBUG', 'searchVendorTransactions', 'searchResults = end '+searchResults.length);
	
	var breakFlag = 0;
	if (searchResults != null && searchResults != '')
	{
		var length = searchResults.length;
		// nlapiLogExecution('DEBUG', 'ScheduleTest', 'search result length = ' + length);
		var intID='';
			var DocNo='';
			var TranDate='';
			var TranCurr='';
			var TranAmt='';
			var PrimCurr='';
			var PrimAmt='';
			var ExchRate='';
			var RevolRate='';
			var UnrealLoss='';
			var RealLoss='';
			var Balance=0.00;
			
			var TotTranAmt=0.00;
			var primAmtTot =0.00;
			var UnrealTot=0.00;
			var RealTot=0.00;
			var finBalTot=0.00;
			
			for (var i = 0;  i < length; i++) 
			{
				intID= searchResults[i].getValue("internalid");
				
				TranDate= searchResults[i].getValue("trandate","transaction");
				
				DocNo = searchResults[i].getValue("tranid","transaction");
				
				TranCurr = searchResults[i].getText("currency","transaction");
				
				TranAmt = searchResults[i].getValue("amount");
				
				PrimCurr = searchResults[i].getValue("basecurrency");//"basecurrency"
				
				
				ExchRate = searchResults[i].getValue("exchangerate");
				
				PrimAmt = parseFloat(TranAmt) * parseFloat(ExchRate);
				
				RevolRate = parseFloat(RevalMap[intID]);
				
				nlapiLogExecution('DEBUG', 'ScheduleTest', 'RevalMap['+intID+'] = ' + RevolRate);
				
				if(!isNaN(RevolRate) && RevolRate != null && RevolRate !='' && RevolRate != undefined)
				{
					RevolRate =RevolRate;
				}
				else
				{
					RevolRate =0.00;
				}
				
				UnrealLoss = (parseFloat(RevolRate)-parseFloat(ExchRate))* parseFloat(TranAmt);
				
				RealLoss = (parseFloat(ExchRate)-parseFloat(ExchRate))*parseFloat(TranAmt);
				
				Balance = parseFloat(TranAmt)+ parseFloat(UnrealLoss)+ parseFloat(RealLoss);
				
				TotTranAmt += parseFloat(TranAmt);
				primAmtTot += parseFloat(PrimAmt);
				UnrealTot += parseFloat(UnrealLoss);
				RealTot += parseFloat(RealLoss);
				finBalTot += parseFloat(Balance);
				
				
				strName += "<tr>";
				strName += "<td  border-bottom=\"solid 1px black\"  width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" style=\" white-space: nowrap;\" padding-left=\"2em\" padding-right=\"2em\">"+TranDate+"</td>";	//convertDate1(today1,dateformat)
				
				strName += "<td  border-bottom=\"solid 1px black\"  width = \"30\%\" border-left=\"solid 1px black\"  align=\"center\" style=\" white-space: nowrap;\" padding-left=\"2em\" padding-right=\"2em\">"+DocNo+"</td>";	//convertDate1(today1,dateformat)
				strName += "<td  border-bottom=\"solid 1px black\"  width = \"20\%\" border-left=\"solid 1px black\"  align=\"right\" padding-left=\"2em\"  style=\" white-space: nowrap;\" padding-right=\"2em\">"+TranCurr+"</td>";
				strName += "<td  border-bottom=\"solid 1px black\"  width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\">"+parseFloat(TranAmt).toFixed(2)+"</td>";	
				strName += "<td  border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\">"+PrimCurr+"</td>";
				strName += "<td  border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\">"+parseFloat(PrimAmt).toFixed(2)+"</td>";
				strName += "<td  border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\">"+ExchRate+"</td>";
				strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"   width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\">"+parseFloat(RevolRate).toFixed(2)+"</td>";
				strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"   width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\">"+parseFloat(UnrealLoss).toFixed(2)+"</td>";
				strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\">"+parseFloat(RealLoss).toFixed(2)+"</td>";
				strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  border-right=\"solid 1px black\" width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\">"+parseFloat(Balance).toFixed(2)+"</td>";
				strName += "</tr>";
			}  //END FOR(var i = 0;  i < searchResults.length; i++) 
			
		
			strName += "<tr>";
			strName += "<td  border-bottom=\"solid 1px black\"  width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" style=\" white-space: nowrap;\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";	//convertDate1(today1,dateformat)
			strName += "<td  border-bottom=\"solid 1px black\"  width = \"30\%\" border-left=\"solid 1px black\"  align=\"center\" style=\" white-space: nowrap;\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";	//convertDate1(today1,dateformat)
			strName += "<td  border-bottom=\"solid 1px black\"  width = \"20\%\" border-left=\"solid 1px black\"  align=\"right\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
			strName += "<td  border-bottom=\"solid 1px black\"  width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\">"+parseFloat(TotTranAmt).toFixed(2)+"</td>";	
			strName += "<td  border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
			strName += "<td  border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"right\" padding-left=\"2em\" padding-right=\"2em\"><b>"+parseFloat(primAmtTot).toFixed(2)+"</b></td>";
			strName += "<td  border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
			strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"   width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
			strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"   width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b>"+parseFloat(UnrealTot).toFixed(2)+"</td>";
			strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"   width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b>"+parseFloat(RealTot).toFixed(2)+"</b></td>";
			strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  border-right=\"solid 1px black\" width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b>"+parseFloat(finBalTot).toFixed(2)+"</b></td>";
			
			strName += "</tr>";
			
			strName += "</table>";
	 }
	 else if(searchResults == null || searchResults == '' || searchResults ==undefined)
	 {
					strName += "<tr>";
					strName += "<td  border-bottom=\"solid 1px black\"  width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" style=\" white-space: nowrap;\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";	//convertDate1(today1,dateformat)
					
					strName += "<td  border-bottom=\"solid 1px black\"  width = \"30\%\" border-left=\"solid 1px black\"  align=\"center\" style=\" white-space: nowrap;\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";	//convertDate1(today1,dateformat)
					strName += "<td  border-bottom=\"solid 1px black\"  width = \"20\%\" border-left=\"solid 1px black\"  align=\"right\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
					strName += "<td  border-bottom=\"solid 1px black\"  width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"></td>";	
					strName += "<td  border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
					strName += "<td  border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"right\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
					strName += "<td  border-bottom=\"solid 1px black\" width = \"20\%\" border-left=\"solid 1px black\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
					strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"   width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
					strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"   width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
					strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  border-right=\"solid 1px black\" width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
					strName += "<td  border-bottom=\"solid 1px black\" border-left=\"solid 1px black\"  border-right=\"solid 1px black\" width = \"20\%\"  align=\"center\" padding-left=\"2em\" padding-right=\"2em\"><b></b></td>";
					
					strName += "</tr>";
					
		    		strName += "</table>";
	}
	
			}  // END if (custSearchResults != null) 
							
							
		}// END if (vendor != null && vendor != '' && vendor != undefined) 
	}//END for (var z = 0; z < vendor_a.length; z++) 
	
	var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
	xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A2\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n";
	//xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n<h3>Packing Print</h3>\n";
	//xml += "<p></p>";
	xml += strName;
	xml += "</body>\n</pdf>";
  
	// run the BFO library to convert the xml document to a PDF 
	var file = nlapiXMLToPDF( xml );
	nlapiLogExecution('DEBUG', 'ScheduleTest', 'table close line print ');
	// set content type, file name, and content-disposition (inline means display in browser)
	response.setContentType('PDF','vendor_statement.pdf', 'inline');

	// write response to the client
	response.write( file.getValue() ); 

	}
   
   catch(e){throw nlapiCreateError('SUITELET_ERROR',"There is No data Available for this Transaction..."+e, false);  }

	
	
}

function formatNumber (num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	}

function getOpeningBalance(vendor, locationname, openingBalanceDate, opBalanceEndDate)
{
		/*		nlapiLogExecution('DEBUG', 'getOpeningBalance', 'vendor = ' + vendor);
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'locationname = ' + locationname);
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'openingBalanceDate = ' + openingBalanceDate);
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'opBalanceEndDate = ' + opBalanceEndDate);
				
			*/	
				var lastInternalID = 0;
				var totalAmount = 0;
				//var totalfxamount = 0;
				totalAmount = parseFloat(totalAmount);
				
				 var columns = new Array();
				 columns[0] = new nlobjSearchColumn('internalid');
				 columns[1] = new nlobjSearchColumn('amount');
				
				 var filters = new Array();
				 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',vendor);
				 filters[1] = new nlobjSearchFilter ('trandate', null, 'onorbefore', opBalanceEndDate);
				// filters[2] = new nlobjSearchFilter ('trandate', null, 'onorafter',openingBalanceDate);
				var searchresults = nlapiSearchRecord('transaction','customsearch_cresta_vendorstatement',filters,columns)
				
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
			    				// nlapiLogExecution('DEBUG', 'getOpeningBalance', 'previousInternalID = ' + previousInternalID);
			    				internalID = value;
								// nlapiLogExecution('DEBUG', 'getOpeningBalance', 'internalID = ' + internalID);
			    				
			    				var value1 = searchresults[i].getValue('amount');
			    				amount += parseFloat(value1);
								// nlapiLogExecution('DEBUG', 'getOpeningBalance', 'Amount = ' + amount);
								amount = parseFloat(amount);				
			    				}
			    			lastInternalID = internalID;
			    			
			    			totalAmount =  parseFloat(amount);
			    		}	
					 

				totalAmount = parseFloat(totalAmount);
				//totalAmount = Math.round(totalAmount * 100) / 100;
				
				var getOpeningBalancefunction = parseFloat(totalAmount);
				
				// nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction = ' + getOpeningBalancefunction);
				
				//totalfxamount = parseFloat(totalfxamount);
				//totalfxamount = Math.round(totalfxamount*100)/100;
				
				//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction fx amount = ' +totalfxamount);
				
				//return_amount = totalAmount+'#'+totalfxamount
				
				return getOpeningBalancefunction;
}
			
function getOpeningBalance1(vendor, locationname, openingBalanceDate, opBalanceEndDate)
{
		/*		nlapiLogExecution('DEBUG', 'getOpeningBalance', 'vendor = ' + vendor);
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'locationname = ' + locationname);
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'openingBalanceDate = ' + openingBalanceDate);
				nlapiLogExecution('DEBUG', 'getOpeningBalance', 'opBalanceEndDate = ' + opBalanceEndDate);
				
			*/	
				var lastInternalID = 0;
				var totalAmount = 0;
				//var totalfxamount = 0;
				totalAmount = parseFloat(totalAmount);
				
				 var columns = new Array();
				 columns[0] = new nlobjSearchColumn('internalid');
				 columns[1] = new nlobjSearchColumn('amount');
				
				 var filters = new Array();
				 filters[0] = new nlobjSearchFilter ('entity', null, 'anyof',vendor);
				 filters[1] = new nlobjSearchFilter ('trandate', null, 'onorbefore', opBalanceEndDate);
				// filters[2] = new nlobjSearchFilter ('trandate', null, 'onorafter',openingBalanceDate);
				var searchresults = nlapiSearchRecord('transaction','customsearch_cresta_vendorstatement',filters,columns)
				
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
			    				// nlapiLogExecution('DEBUG', 'getOpeningBalance', 'previousInternalID = ' + previousInternalID);
			    				internalID = value;
								// nlapiLogExecution('DEBUG', 'getOpeningBalance', 'internalID = ' + internalID);
			    				
			    				var value1 = searchresults[i].getValue('fxamount');
			    				amount += parseFloat(value1);
								// nlapiLogExecution('DEBUG', 'getOpeningBalance', 'Amount = ' + amount);
								amount = parseFloat(amount);				
			    				}
			    			lastInternalID = internalID;
			    			
			    			totalAmount =  parseFloat(amount);
			    		}	
					 

				totalAmount = parseFloat(totalAmount);
				//totalAmount = Math.round(totalAmount * 100) / 100;
				
				var getOpeningBalancefunction1 = parseFloat(totalAmount);
				
				// nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction = ' + getOpeningBalancefunction);
				
				//totalfxamount = parseFloat(totalfxamount);
				//totalfxamount = Math.round(totalfxamount*100)/100;
				
				//nlapiLogExecution('DEBUG', 'getOpeningBalance', 'getOpeningBalancefunction fx amount = ' +totalfxamount);
				
				//return_amount = totalAmount+'#'+totalfxamount
				
				return getOpeningBalancefunction1;
}
	
function afterReplaceCR(custAddr)
{
    //======= CODE TO REPLACE SPECIAL SYMBOL ===
	var custAddrString = custAddr.toString();

    custAddrString = custAddrString.replace(/\r/g, '<BR/>');/// /g

    return custAddrString;

} // END afterReplaceCR(custAddr)

function afterReplaceCRaddcomma(custAddr)
{
    //======= CODE TO REPLACE SPECIAL SYMBOL ===
	var custAddrString = custAddr.toString();

    custAddrString = custAddrString.replace(/\r/g, ',');/// /g

    return custAddrString;

} // END afterReplaceCR(custAddr)

function XMLConversion(strName,recepient,display_date)
{
    //var set_date = new Date();
	//var offset =  (3600000*(+5.50+7));
	//var current_date_time =  new Date(set_date.getTime() + offset)
	//var o_current_date_time_obj = current_date_time.toString();
	//var display_date = o_current_date_time_obj.substring(0, 25)
	//nlapiLogExecution('DEBUG', 'Script Scheduled ', ' Script Status 2-->' + new Date(set_date.getTime() + offset));
	
	//==== CODE FOR HTML TO XML CONVERSION =====
	
    var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
    xml += "<pdf lang=\"ru-RU\" xml:lang=\"ru-RU\">\n";
	xml += "<head>";
    xml += "  <style>";
	xml +=".textLargeBold { font-family:Arial, Helvetica; font-size: 10.5pt; font-weight: bold; text-align:center;}" +
    ".textGoodBold { font-family:Arial, Helvetica; font-size: 9.5pt; font-weight: bold;}" +
    ".textGoodThin { font-family:Arial, Helvetica; font-size: 9pt;}" +
    ".textVeryLargeBold { font-family:Arial, Helvetica; font-size: 18pt; font-weight: bold;}" 
   
    xml += "  <\/style>";
    xml += "  <macrolist>";  
    xml += " <macro id=\"myfooter\">";
    xml += "      <p align=\"right\" font-size=\"12\">";
	xml += display_date;
    xml += "<br/><pagenumber\/> of <totalpages\/>"
    xml += "      <\/p>";
    xml += "    <\/macro>"; 
    xml += "  <\/macrolist>";
    xml += "<\/head>";
	xml += "<body margin-top=\"0pt\" footer=\"myfooter\" footer-height=\"2em\" size=\"A4-landscape\">";
   	xml += strName;
	xml += "</body>\n</pdf>";
	var file = nlapiXMLToPDF(xml);

	nlapiEscapeXML(file);
	file.setName('Vendor Statement'+display_date+'.pdf')
	var folder_id = get_folderID();
	file.setFolder(folder_id);
	file.setIsOnline(true);
	var file_id = nlapiSubmitFile(file);

	var user = nlapiGetUser();
	//var mail = nlapiSendEmail(user,recepient, 'Vendor Statement', 'Vendor statement', null, null, null, file, null, null)
	//nlapiLogExecution('DEBUG', 'Script Scheduled ', ' mail Status -->' + mail);
	//response.write( file.getValue());
	return file_id;
} // END XMLConversion(html)

function get_folderID()
{
			var folder_filters = new Array();
			folder_filters.push(new nlobjSearchFilter('name', null, 'is', 'Vendor Statment'));
	
			var folder_column = new Array();
			folder_column.push( new nlobjSearchColumn('internalid'));    
	
			var folder_results = nlapiSearchRecord('folder', null, folder_filters, folder_column);
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


function convertDate1(date,dateformat) // Format MM/DD/YYYY
{
	var scdatearr = null;
	var modDate = null;
	var context = nlapiGetContext();
	//var dateformat = context.getPreference('DATEFORMAT');
	var year = '';
	
	if(dateformat =='YYYY-MM-DD')
	{
		scdatearr = date.split('-');	
      	nlapiLogExecution('DEBUG', 'scdatearr in function ****  ',scdatearr);
		if(scdatearr[1] <= 9)
			scdatearr[1] = scdatearr[1];
		
		if(scdatearr[2] <= 9)
			scdatearr[2] = scdatearr[2];
				
		modDate = scdatearr[1]+'/'+scdatearr[2]+'/'+scdatearr[0];
      //nlapiLogExecution('DEBUG', 'modDate in function ****  ',modDate);
	}
	else if(dateformat =='YYYY/MM/DD')
	{
		scdatearr = date.split('/');
		
		if(scdatearr[1] <= 9)
			scdatearr[1] = scdatearr[1];
		
		if(scdatearr[2] <= 9)
			scdatearr[2] = scdatearr[2];
		
		
		modDate = scdatearr[1]+'/'+scdatearr[2]+'/'+scdatearr[0];		
	}
	else if(dateformat =='MM/DD/YYYY')
	{
		scdatearr = date.split('/');
		
		if(scdatearr[0] <= 9)
			scdatearr[0] = '0'+scdatearr[0];
		
		if(scdatearr[1] <= 9)
			scdatearr[1] = '0'+scdatearr[1];
		modDate = scdatearr[0]+'/'+scdatearr[1]+'/'+scdatearr[2];	
	}
	else if(dateformat =='DD.MM.YYYY')
	{
		scdatearr = date.split('.');	
		
		if(scdatearr[0] <= 9)
			scdatearr[0] = scdatearr[0];
		
		if(scdatearr[1] <= 9)
			scdatearr[1] = scdatearr[1];
		modDate = scdatearr[1]+'/'+scdatearr[0]+'/'+scdatearr[2];
	}
	else if(dateformat=='DD/MM/YYYY')
	{
		scdatearr = date.split('/');	
		
		if(scdatearr[0] <= 9)
			scdatearr[0] = scdatearr[0];
		
		if(scdatearr[1] <= 9)
			scdatearr[1] = scdatearr[1];

		modDate = scdatearr[1]+'/'+scdatearr[0]+'/'+scdatearr[2];
	}
	else if(dateformat== 'DD MONTH, YYYY')
	{
		scdatearr = date.split(' ');
		var month1 = scdatearr[1];
		var month = month1.split(',')[0];
		var year = scdatearr[2];
		
		
		if(month=='January' || month=='Jan' || month=='JANUARY'){
			month='01';
		}
		if(month=='February' || month=='Feb' || month=='FEBRUARY'){
			month='02';
		}
		if(month=='March' || month=='Mar' || month=='MARCH'){
			month='03';
		}
		if(month=='April' || month=='Apr' || month=='APRIL'){
			month='04';
		}
		if(month=='May' || month=='May' || month=='MAY'){
			month='05';
		}
		if(month=='June' || month=='Jun' || month=='JUNE'){
			month='06';
		}
		if(month=='July' || month=='Jul' || month=='JULY'){
			month='07';
		}
		if(month=='August' || month=='Aug' || month=='AUGUST'){
			month='08';
		}
		if(month=='September' || month=='Sep' || month=='SEPTEMBER'){
			month='09';
		}
		if(month=='October' || month=='Oct' || month=='OCTOBER'){
			month='10';
		}
		if(month=='November' || month=='Nov' || month=='NOVEMBER'){
			month='11';
		}
		if(month=='December' || month=='Dec' || month=='DECEMBER'){
			month='12';
		}
		
		modDate = month+'/'+scdatearr[0]+'/'+year;
	}	
	else if(dateformat == 'DD-MONTH-YYYY' || dateformat == 'DD-Mon-YYYY')
	{
		scdatearr = date.split("-");
		if(scdatearr[1]=='January' || scdatearr[1]=='Jan' || scdatearr[1]=='JANUARY'){
			scdatearr[1]='01';
		}
		if(scdatearr[1]=='February' || scdatearr[1]=='Feb' || scdatearr[1]=='FEBRUARY'){
			scdatearr[1]='02';
		}
		if(scdatearr[1]=='March' || scdatearr[1]=='Mar' || scdatearr[1]=='MARCH'){
			scdatearr[1]='03';
		}
		if(scdatearr[1]=='April' || scdatearr[1]=='Apr' || scdatearr[1]=='APRIL'){
			scdatearr[1]='04';
		}
		if(scdatearr[1]=='May' || scdatearr[1]=='May' || scdatearr[1]=='MAY'){
			scdatearr[1]='05';
		}
		if(scdatearr[1]=='June' || scdatearr[1]=='Jun' || scdatearr[1]=='JUNE'){
			scdatearr[1]='06';
		}
		if(scdatearr[1]=='July' || scdatearr[1]=='Jul' || scdatearr[1]=='JULY'){
			scdatearr[1]='07';
		}
		if(scdatearr[1]=='August' || scdatearr[1]=='Aug' || scdatearr[1]=='AUGUST'){
			scdatearr[1]='08';
		}
		if(scdatearr[1]=='September' || scdatearr[1]=='Sep' || scdatearr[1]=='SEPTEMBER'){
			scdatearr[1]='09';
		}
		if(scdatearr[1]=='October' || scdatearr[1]=='Oct' || scdatearr[1]=='OCTOBER'){
			scdatearr[1]='10';
		}
		if(scdatearr[1]=='November' || scdatearr[1]=='Nov' || scdatearr[1]=='NOVEMBER'){
			scdatearr[1]='11';
		}
		if(scdatearr[1]=='December' || scdatearr[1]=='Dec' || scdatearr[1]=='DECEMBER'){
			scdatearr[1]='12';
		}
		
		if(scdatearr[0] <= 9)
			scdatearr[0] = scdatearr[0];
		
		modDate = scdatearr[1]+'/'+scdatearr[0]+'/'+scdatearr[2];
	}
	return modDate;
}
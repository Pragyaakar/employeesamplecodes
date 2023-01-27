		/**
		 * Module Description
		 * 
		 * Version    Date            Author           Remarks
		 * 1.00       04 Mar 2019     Priyanka Patil
		 *
		 */
		
		/**
		 * @param {nlobjRequest} request Request object
		 * @param {nlobjResponse} response Response object
		 * @returns {Void} Any output is written via response object
		 */
		function suiteletVendorBillLayout(request, response)
		{
		    
		    var companyinfo = nlapiLoadConfiguration('companyinformation');
			nlapiLogExecution('DEBUG','before submit','companyinfo =='+companyinfo);
	
				
			var recrdId = request.getParameter('id');
			var recrdType = 'vendorbill';	
			var ffReqObj = nlapiLoadRecord(recrdType,recrdId);
			
			var strName = '';
			
			var vendor = ffReqObj.getFieldValue('entity');
			nlapiLogExecution('DEBUG','before submit','Vendor Name =='+vendor);
			if(vendor == null || vendor == undefined)
			{
				vendor = "";
			}
	
			var invoice_num = ffReqObj.getFieldValue('tranid');
			nlapiLogExecution('DEBUG','before submit','Invoice number =='+invoice_num);
			if(invoice_num == null || invoice_num == undefined)
			{
				invoice_num = "";
			}
			
			var tran_number = ffReqObj.getFieldValue('transactionnumber');
			nlapiLogExecution('DEBUG','before submit','tran_number =='+tran_number);
			if(tran_number == null || tran_number == undefined)
			{
				tran_number = "";
			}
			
			var invoice_date = ffReqObj.getFieldValue('trandate');
			nlapiLogExecution('DEBUG','before submit','Invoice date =='+invoice_date);
			if(invoice_date == null || invoice_date == undefined)
			{
				invoice_date = "";
			}
			
			var tableamount =ffReqObj.getFieldValue('usertaxtotal');
	    	nlapiLogExecution('DEBUG', 'aftr submit', "tableamount  ==" + tableamount);
	    	if(tableamount == null || tableamount == undefined)
			{
	    		tableamount = "";
			
			}
	    	
	    	var total =ffReqObj.getFieldValue('usertotal');
	    	nlapiLogExecution('DEBUG', 'aftr submit', "total  ==" + total);
	    	if(total == null || total == undefined)
			{
	    		total = "";
			
			}
	    	
			var po_rec=nlapiLoadRecord('vendor',vendor);
			incoTerms = po_rec.getFieldText('incoterm');
			nlapiLogExecution('DEBUG','before submit','Incoterms =='+incoTerms);
			if(incoTerms == null || incoTerms == undefined)
			{
				incoTerms = "";
			}
			
			var vendName = po_rec.getFieldValue('altname');
			nlapiLogExecution('DEBUG','before submit','vendName =='+vendName);
			if(vendName == null || vendName == undefined)
			{
				vendName = " ";
			}
			
			var venAddress = po_rec.getFieldValue('defaultaddress');
			nlapiLogExecution('DEBUG','before submit','vendor Address =='+venAddress);
			if(venAddress == null || venAddress == undefined)
			{
				venAddress = " ";
			}
			
			var gstinNo = po_rec.getFieldText('defaulttaxreg');
			nlapiLogExecution('DEBUG','before submit','GSTIN Number =='+gstinNo);
			if(gstinNo == null || gstinNo == undefined)
			{
				gstinNo = " ";
			}
			
			var panNo = po_rec.getFieldValue('custentity_permanent_account_number');
			nlapiLogExecution('DEBUG','before submit','PAN Number =='+panNo);
			if(panNo == null || panNo == undefined)
			{
				panNo = " ";
			}
			
			
			var url = 'https://system.netsuite.com/core/media/media.nl?id=11&c=5288045_SB1&h=aa54a558ce48064a6509'; 
		    
		    strName += "<table width=\"100\%\">";
			strName += "<tr>";
			strName += "<td>";
			strName +="<img height='50' width='50' src=\""+nlapiEscapeXML(url)+"\"></img>";
			strName += "</td>";
			strName += "<td colspan =\"6\" width = \"100\%\"  align=\"right\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>ORIGINAL FOR RECIPIENT/BUYER</b></td>";	
			strName += "</tr>";
			strName += "</table>";
			
			strName += "<table width=\"100\%\" table-layout = \"fixed\">";
			strName += "<tr>";
			strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>TAX INVOICE</b></td>";
			strName += "</tr>";
			strName += "<tr>";
			strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">(Under Section 31 of CGST/SGST Act 2017 read with Rule 46 of CGST Rules,2017)<br/><br/></td>";
			strName += "</tr>";
			strName += "</table>";
			
			strName += "<table width=\"100\%\" table-layout = \"fixed\">";
			strName += "<tr>";
			strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>"+nlapiEscapeXML(vendName)+"</b></td>";
			strName += "</tr>";
			strName += "<tr>";
			strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+nlapiEscapeXML(venAddress)+"</td>";
			strName += "</tr>";
			strName += "<tr>";
			strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">GSTIN :&nbsp;"+gstinNo+", PAN :&nbsp;"+panNo+"<br/></td>";
			strName += "</tr>";
			strName += "</table>";
			
			strName += "<table width=\"100\%\" table-layout = \"fixed\">";
			strName += "<tr>";
			//strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"11\" align=\"right\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"30\%\" font-size=\"9\" align=\"right\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Transaction Number.:</b>&nbsp;"+tran_number+"</td>";
			//strName += "<td table-layout = \"fixed\" width=\"5\%\" font-size=\"11\" align=\"right\"></td>";
			strName += "</tr>";
			strName += "<tr>";
			//strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"11\" align=\"right\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"30\%\" font-size=\"9\" align=\"right\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Invoice No.:</b>&nbsp;"+invoice_num+"</td>";
			//strName += "<td table-layout = \"fixed\" width=\"5\%\" font-size=\"11\" align=\"right\"></td>";
			strName += "</tr>";
			strName += "<tr>";
			//strName += "<td table-layout = \"fixed\" width=\"5\%\" font-size=\"11\" align=\"right\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"15\%\" font-size=\"9\" align=\"right\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Invoice Date:</b>&nbsp;"+invoice_date+"</td>";
			//strName += "<td table-layout = \"fixed\" width=\"5\%\" font-size=\"11\" align=\"right\"></td>";
			strName += "</tr>";
			strName += "</table>";
			
	
			
			//------------------------------------Line Item Section-------------------------------
			
			var lineCount = ffReqObj.getLineItemCount('item');
			nlapiLogExecution('DEBUG','before submit','lineCount =='+lineCount);
			
			var lineCountexpence = ffReqObj.getLineItemCount('expense');
			nlapiLogExecution('DEBUG','before submit','lineCountexpence =='+lineCountexpence); 
			
			var lineCountTax = ffReqObj.getLineItemCount('taxdetails');
			nlapiLogExecution('DEBUG','before submit','lineCount For Tax=='+lineCountTax);
			
			strName += "<table width=\"100\%\">";
			strName += "<tr>";
			strName += "<td width=\"51\%\" font-size=\"9\" align=\"left\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\" border-left = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Items/Services</b></td>";
			strName += "<td width=\"69\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Description</b></td>";
			strName += "<td width=\"40\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>HSN<br/>Code</b></td>";
			strName += "<td width=\"45\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Quantity</b></td>";
			strName += "<td width=\"53\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Rate</b></td>";
			strName += "<td width=\"43\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Unit</b></td>";
			strName += "<td width=\"45\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\" border-right = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Amount</b></td>";
			strName += "</tr>";
			
			for (var i = 1; i <= lineCount; i++)
			{
				nlapiLogExecution('DEBUG','before submit','var i for loop =='+i);
					
				var itemName = ffReqObj.getLineItemValue('item','custcol_itemid_bill',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "  itemName  ==" + itemName);
		 
		    	
				var item = ffReqObj.getLineItemText('item','item',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "  Items  ==" + item);
		    	if(item == null || item == undefined)
				{
		    		item = "";
				}
		    
				var description =ffReqObj.getLineItemValue('item','description',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "  description  ==" + description);
		    	if(description == null || description == undefined)
				{
		    		description = "";
				}
		    	
		    	var concat = item.concat(":").concat(description);//item.concat(description);
	        	nlapiLogExecution('DEBUG', 'aftr submit', "  concat  ==" + concat);
	        	if(concat == null || concat == undefined) 
	        	{
	        		concat = "";
	        	}
	        	
				var hsn =ffReqObj.getLineItemText('item','custcol_in_hsn_code',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "  hsn  ==" + hsn);
		    	
		    	var ID1 = hsn.split(/[ ,.:]+/,1);
	    	    nlapiLogExecution('DEBUG', 'after Submit', 'ID1 =' + ID1);
		    	/*var ID = hsn.match(/\d/g)
				ID1 = ID.join(" ");
				nlapiLogExecution('DEBUG','before submit','ID =='+ID1);
				
		    	if(hsn == null || hsn == undefined)
				{
		    		hsn = "";
				}*/
		    	
		    	var qty =ffReqObj.getLineItemValue('item','quantity',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "  qty  ==" + qty);
		    	if(qty == null || qty == undefined)
				{
		    		qty = "";
				
				}
		    	
		    	var rate =ffReqObj.getLineItemValue('item','rate',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "  Rate  ==" + rate);
		    	if(rate == null || rate == undefined)
				{
		    		rate = "";
				
				}
		    	
		    	var unit =ffReqObj.getLineItemText('item','units',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "unit  ==" + unit);
		    	if(unit == null || unit == undefined)
				{
		    		unit = "";
				
				}
		    	
		    	var amount =ffReqObj.getLineItemValue('item','amount',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "amount  ==" + amount);
		    	if(amount == null || amount == undefined)
				{
		    		amount = "";
				
				}
		    	
		    	
		    	strName += "<tr>";
			    strName += "<td width=\"51\%\" font-size=\"9\" align=\"left\" border-left = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+nlapiEscapeXML(itemName)+"</td>";
			    strName += "<td width=\"69\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+nlapiEscapeXML(concat)+"</td>";
			    strName += "<td width=\"40\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+ID1+"</td>";
			    strName += "<td width=\"45\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+qty+"</td>";
			    strName += "<td width=\"53\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+rate+"</td>";
			    strName += "<td width=\"43\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+unit+"</td>";
			    strName += "<td width=\"45\%\" font-size=\"9\" align=\"center\" border-right = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+amount+"</td>";
			    strName += "</tr>";
			
			}
			
			for (var x = 1; x <= lineCountexpence; x++)
			{
				nlapiLogExecution('DEBUG','before submit','var i for loop =='+x);
				
				var item1 = ffReqObj.getLineItemText('expense','account',x);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "  Items in Expence ==" + item1);
		    	if(item1 == null || item1 == undefined)
				{
		    		item1 = "";
				}
		    	
				var description1 =ffReqObj.getLineItemText('expense','category',x);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "  description in expence ==" + description1);
		    	if(description1 == null || description1 == undefined)
				{
		    		description1 = "";
				}
		    	
		    	var concat1 = item1.concat(":").concat(description1);//item.concat(description);
	        	nlapiLogExecution('DEBUG', 'aftr submit', "  concat  ==" + concat1);
	        	if(concat1 == null || concat1 == undefined) 
	        	{
	        		concat1 = "";
	        	}
	        	
				var hsn1 =ffReqObj.getLineItemText('expense','custcol_in_hsn_code',x);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "  hsn  ==" + hsn1);
		    	
		    	var ID2 = hsn1.split(/[ ,.:]+/,1);
	    	    nlapiLogExecution('DEBUG', 'after Submit', 'ID1 =' + ID2);
		    	/*var ID = hsn.match(/\d/g)
				ID1 = ID.join(" ");
				nlapiLogExecution('DEBUG','before submit','ID =='+ID1);
				
		    	if(hsn == null || hsn == undefined)
				{
		    		hsn = "";
				}*/
		    	
		    	var amount1 =ffReqObj.getLineItemValue('expense','amount',x);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "amount  in expence==" + amount1);
		    	if(amount1 == null || amount1 == undefined)
				{
		    		amount1 = "";
				
				}
		    	
		    	strName += "<tr>";
			    strName += "<td width=\"45\%\" font-size=\"9\" align=\"left\" border-left = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+nlapiEscapeXML(item1)+"</td>";
			    strName += "<td width=\"67\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+nlapiEscapeXML(concat1)+"</td>";
			    strName += "<td width=\"40\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+ID2+"</td>";
			    strName += "<td width=\"45\%\" font-size=\"9\" align=\"center\"></td>";
			    strName += "<td width=\"53\%\" font-size=\"9\" align=\"center\"></td>";
			    strName += "<td width=\"43\%\" font-size=\"9\" align=\"center\"></td>";
			    strName += "<td width=\"45\%\" font-size=\"9\" align=\"center\" border-right = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+amount1+"</td>";
			    strName += "</tr>";
			
			}
			
			
			
			//---------------------Tax Details------------------------------------
			for (var i = 1; i <= lineCountTax; i++)
			{
		    	var taxcode =ffReqObj.getLineItemText('taxdetails','taxcode',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "Tax Code  ==" + taxcode);
		    	if(taxcode == null || taxcode == undefined)
				{
		    		taxcode = "";
				
				}
		    	
		    	var taxrate =ffReqObj.getLineItemValue('taxdetails','taxrate',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "Tax Rate  ==" + taxrate);
		    	if(taxrate == null || taxrate == undefined)
				{
		    		taxrate = "";
				
				}
		    	
		    	var taxamount =ffReqObj.getLineItemValue('taxdetails','taxamount',i);
		    	nlapiLogExecution('DEBUG', 'aftr submit', "Tax Amount ==" + taxamount);
		    	if(taxamount == null || taxamount == undefined)
				{
		    		taxamount = "";
				
				}
		    	
			strName += "<tr>";
			strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"9\" align=\"center\" border-left = \"solid 1px black\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"10\%\" font-size=\"9\" align=\"center\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"10\%\" font-size=\"9\" align=\"center\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"10\%\" font-size=\"9\" align=\"center\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"60\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+taxcode+"</td>";
			strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+taxrate+"%</td>";
			strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"center\" border-right = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+taxamount+"</td>";
			strName += "</tr>";
			
			}
			strName += "<tr>";
			
			strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"9\" align=\"center\" border-left = \"solid 1px black\" ></td>";
			strName += "<td table-layout = \"fixed\" width=\"30\%\" font-size=\"9\" align=\"center\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"25\%\" font-size=\"9\" align=\"center\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"9\" align=\"center\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"center\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">Taxable Amount</td>";
			strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"center\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"center\" border-right = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+tableamount+"</td>";
			strName += "</tr>";
			
			strName += "</table>";
			
			//***********************Total Part***************************************
			
			strName += "<table width=\"100\%\">";
			strName += "<tr>";
			strName += "<td table-layout = \"fixed\" width=\"45\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-left = \"solid 1px black\"  border-bottom = \"solid 1px black\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"30\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"25\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"35\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\"><b>Total</b></td>";
			strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"center\" border-top = \"solid 1px black\" border-bottom = \"solid 1px black\"></td>";
			strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"right\" border-top = \"solid 1px black\" border-right = \"solid 1px black\" border-bottom = \"solid 1px black\" font-family=\" NotoSans, NotoSansCJKsc, sans-serif\">"+total+"</td>";
			strName += "</tr>";
			strName += "</table>";
			
			// build up BFO-compliant XML using well-formed HTML
			var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
			xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n";
			xml += strName;
			xml += "</body>\n</pdf>";
		
			// run the BFO library to convert the xml document to a PDF 
			var file = nlapiXMLToPDF( xml );
		
			// set content type, file name, and content-disposition (inline means display in browser)
			response.setContentType('PDF','PO_Item_Barcode.pdf', 'inline');
		
			// write response to the client
			response.write( file.getValue() ); 
		
		}

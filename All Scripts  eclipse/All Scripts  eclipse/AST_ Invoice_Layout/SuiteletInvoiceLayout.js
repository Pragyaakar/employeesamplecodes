/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       28 Feb 2019     Tushar More
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
	
	var recrdId = request.getParameter('custscript_invid');
	var recrdType = 'invoice';	
	var ffReqObj = nlapiLoadRecord(recrdType,recrdId);
	
	Invoice_no = ffReqObj.getFieldValue('tranid');
	nlapiLogExecution('DEBUG','GET Value','Invoice No :'+Invoice_no);
	
	Time_period = ffReqObj.getFieldValue('asofdate');
	nlapiLogExecution('DEBUG','GET Value','Time_period :'+Time_period);
	
	terms = ffReqObj.getFieldText('terms');
	nlapiLogExecution('DEBUG','GET Value','terms :'+terms);
	
	due = ffReqObj.getFieldValue('duedate');
	nlapiLogExecution('DEBUG','GET Value','due :'+due);
	
	project = ffReqObj.getFieldValue('custbody_projectname');
	nlapiLogExecution('DEBUG','GET Value','project :'+project);
	
	billto = ffReqObj.getFieldValue('billaddress');
	nlapiLogExecution('DEBUG','GET Value','billto :'+billto);
	
	po_no = ffReqObj.getFieldValue('otherrefnum');
	nlapiLogExecution('DEBUG','GET Value','po_no :'+po_no);
	if(po_no == null)
	{
		po_no = ' ';
	}
	
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td>";
	strName +="<img height='30' width='60' src=\""+nlapiEscapeXML(url)+"\"></img>";
	strName += "</td>";
	strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"12\"></td>";
	strName += "<td colspan =\"8\" width = \"100\%\"  align=\"center\" font-size=\"20\"><b>INVOICE</b></td>";
	strName += "</tr>";
	strName += "</table><br/>";
	
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td border-top=\"1px\" width = \"20\%\"  align=\"left\" font-size=\"11\"><b>Invoice&nbsp;</b>#&nbsp;"+Invoice_no+"</td>";
	strName += "<td border-top=\"1px\" width = \"2\%\"  align=\"left\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" width = \"2\%\"  align=\"left\" font-size=\"11\"></td>";
	strName += "</tr>";	
	
	strName += "<tr>";
	strName += "<td width = \"20\%\"  align=\"left\" font-size=\"11\"><b>Time Period:&nbsp;</b>"+Time_period+"</td>";
	strName += "</tr>";	
	
	strName += "<tr>";
	strName += "<td width = \"20\%\"  align=\"left\" font-size=\"11\"><b>Terms:&nbsp;</b>"+terms+"</td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td width = \"20\%\"  align=\"left\" font-size=\"11\"><b>Due:&nbsp;</b>"+due+"</td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td width = \"20\%\"  align=\"left\" font-size=\"11\"><b>Project:&nbsp;</b>"+project+"<br/></td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td width = \"20\%\"  align=\"left\" font-size=\"11\"><b>Customer PO#:&nbsp;</b>"+po_no+"<br/><br/></td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td border-top=\"1px\" width = \"2\%\"  align=\"left\" font-size=\"11\"><b>To</b><br/></td>";
	//strName += "<td border-top=\"1px\" width = \"2\%\"  align=\"left\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" width = \"2\%\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" width = \"10\%\" font-size=\"11\"><b>From</b><br/></td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td width = \"2\%\"  align=\"left\" font-size=\"10\">Drop Tank LLC<br/>Tim Miller<br/>215 83rd Street<br/>Suite B<br/>Burr Ridge, Illinois 60527<br/>US</td>";
	strName += "<td width = \"2\%\" font-size=\"11\"></td>";
	strName += "<td width = \"2\%\"  align=\"left\" font-size=\"10\">Application Software Technology, LLC<br/>4343 Commerce Court, Suite 701,<br/>Lisle, IL 60532<br/>Phone : +1 (630) 778-1180<br/>Fax : +1 (630) 778-1179<br/>Email : ar@astcorporation.com</td>";
	strName += "</tr>";
	strName += "</table><br/>";
	
	
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"50\%\" font-size=\"11\"><b>Consultant</b></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"><b>Time Period</b></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"><b>Task</b></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>Hours</b></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"><b>Rate</b></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>Total</b></td>";
	strName += "</tr>";
	
	
	
	strName += "<tr>";
	strName += "<td border-bottom=\"1px\" width = \"50\%\" font-size=\"11\">Grampurohit, Mitali</td>";
	strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td border-bottom=\"1px\" width = \"50\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\">1/2/2019</td>";
	strName += "<td border-bottom=\"1px\" width = \"48\%\" font-size=\"11\">functional support</td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\">8</td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"20\%\" font-size=\"11\">US$50/hr</td>";
	strName += "<td border-bottom=\"1px\" width = \"20\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\">US$400.00</td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td border-bottom=\"1px\" width = \"50\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\">2/2/2019</td>";
	strName += "<td border-bottom=\"1px\" width = \"48\%\" font-size=\"11\">functional support</td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\">8</td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"20\%\" font-size=\"11\">US$50/hr</td>";
	strName += "<td border-bottom=\"1px\" width = \"20\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\">US$400.00</td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td border-bottom=\"1px\" width = \"50\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"48\%\" font-size=\"11\"><b>Time Sub-total</b></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>16</b></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>US$800.00</b></td>";
	strName += "</tr>";
	
	
	
	strName += "<tr>";
	strName += "<td border-bottom=\"1px\" width = \"50\%\" font-size=\"11\">Gandhi , Mehul</td>";
	strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td border-bottom=\"1px\" width = \"50\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\">1/2/2019</td>";
	strName += "<td border-bottom=\"1px\" width = \"48\%\" font-size=\"11\">functional support</td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\">8</td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"20\%\" font-size=\"11\">US$55/hr</td>";
	strName += "<td border-bottom=\"1px\" width = \"20\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\">US$440.00</td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td border-bottom=\"1px\" width = \"50\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"48\%\" font-size=\"11\"><b>Time Sub-total</b></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>8</b></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>US$440.00</b></td>";
	strName += "</tr>";
	
	
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
	strName += "</table><br/><br/><br/><br/><br/><br/>";
	
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"48\%\" font-size=\"11\"><b>Time Sub-total</b></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>24</b></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"5\%\" font-size=\"11\"></td>";
	strName += "<td border-top=\"1px\" border-bottom=\"1px\" width = \"30\%\" font-size=\"11\"><b>US$1,240.00</b></td>";
	strName += "</tr>";
	strName += "</table>";
	
	
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td width = \"40\%\" font-size=\"11\"><b>For ACH and Wire Payments:</b></td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td width = \"40\%\" font-size=\"11\">Bank: &nbsp;JP Morgan Chase NA, Naperville, IL 60540</td>";
	strName += "</tr>";
	
	strName += "<tr>";
	strName += "<td width = \"40\%\" font-size=\"11\">ABA: &nbsp;071000013 | Account: 707783601</td>";
	strName += "</tr>";
	strName += "</table><br/>";
	
	
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td  border-bottom=\"1px\" width = \"40\%\" font-size=\"11\"><b>Checks should be payable to</b> &nbsp; Application Software Technology, LLC and mailed to 4343 Commerce Court, Suite 701, Lisle, IL 60532</td>";
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

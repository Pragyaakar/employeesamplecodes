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
function suiteletItemRcpt(request, response)
{
	try{
	var strName="";
	var rmrk = new Array();

	var recrdId = request.getParameter('custscript_itmrcptid');
	var recrdType = 'itemreceipt';	
	var ffReqObj = nlapiLoadRecord(recrdType,recrdId);

	var companyinfo = nlapiLoadConfiguration('companyinformation');
	nlapiLogExecution('DEBUG','before submit','companyinfo =='+companyinfo);

	var companyName = companyinfo.getFieldValue('companyname');
	nlapiLogExecution('DEBUG','before submit','companyName =='+companyName);
	if(companyName == null || companyName == undefined)
	{
	companyName = "";
	}

	var companyAdd = companyinfo.getFieldValue('mainaddress_text');
	nlapiLogExecution('DEBUG','before submit','companyAdd =='+companyAdd);
	if(companyAdd == null || companyAdd == undefined)
	{
	companyAdd = "";
	}

	var chal_no = ffReqObj.getFieldValue('tranid');
	nlapiLogExecution('DEBUG','before submit','Request Chal Num =='+chal_no);
	if(chal_no == null || chal_no == undefined)
	{
	chal_no = "";
	}

	var lrNo = ffReqObj.getFieldValue('custbody_lr_number');
	nlapiLogExecution('DEBUG','before submit','lrNo =='+lrNo);
	if(lrNo == null || lrNo == undefined)
	{
		lrNo = "";
	}
	var date = ffReqObj.getFieldValue('trandate');
	nlapiLogExecution('DEBUG','before submit','Request Date =='+date);
	if(date == null || date == undefined)
	{
	date = "";
	}

	var location = ffReqObj.getFieldText('custbody_warehouse_location');
	nlapiLogExecution('DEBUG','before submit','location =='+location);
	if(location == null || location == undefined)
	{
	location = "";
	}

	var contactor_name = ffReqObj.getFieldValue('custbody_contractor_name');
	nlapiLogExecution('DEBUG','before submit','contractor name =='+contactor_name);
	if(contactor_name == null || contactor_name == undefined)
	{
	contactor_name = "";
	}

	var rutby = ffReqObj.getFieldValue('custbody_return_by');
	nlapiLogExecution('DEBUG','before submit','rutby =='+rutby);
	if(rutby == null || rutby == undefined)
	{
	rutby = "";
	}

	var contPer = ffReqObj.getFieldValue('custbody_contact_person');
	nlapiLogExecution('DEBUG','before submit','Contact Person =='+contPer);
	if(contPer == null || contPer == undefined)
	{
	contPer = "";
	}

	var contNo = ffReqObj.getFieldValue('custbody_contact_number');
	nlapiLogExecution('DEBUG','before submit','contNo =='+contNo);
	if(contNo == null || contNo == undefined)
	{
	contNo = "";
	}

	var vehicalNo = ffReqObj.getFieldValue('custbody_vehicle_number');
	nlapiLogExecution('DEBUG','before submit','vehicalNo =='+vehicalNo);
	if(vehicalNo == null || vehicalNo == undefined)
	{
	vehicalNo = "";
	}

	var proId = ffReqObj.getFieldText('custbody_project_id');
	nlapiLogExecution('DEBUG','before submit','proId =='+proId);

	var res = proId.toString();
	var ID =  res.split(" ", 1);
	if(proId == null || proId == undefined)
	{
	proId = "";
	}

	var secname = ffReqObj.getFieldText('cseg1');
	nlapiLogExecution('DEBUG','before submit','proId =='+secname);
	if(secname == null || secname == undefined)
	{
	secname = "";
	}

	var workNo = ffReqObj.getFieldText('createdfrom');
	nlapiLogExecution('DEBUG','before submit','Purchase Order Number =='+workNo);
	if(workNo == null || workNo == undefined)
	{
	workNo = "";
	}


	/*var createfromtxt = ffReqObj.getFieldText('createdfrom');
	var requiId = ffReqObj.getFieldValue('custbody_req_num');
	var createdFrom=ffReqObj.getFieldValue('createdfrom');
	
	if(createdFrom != null || createdFrom != undefined)  
	{
		nlapiLogExecution('DEBUG', 'aftr submit', "  createdFrom  ==" + createdFrom);
		nlapiLogExecution('DEBUG', 'before substring if', "createfromtxt  ==" + createfromtxt);
		if (createfromtxt.substr(0,14)== 'Purchase Order')
		{
			nlapiLogExecution('DEBUG', 'after substring if', "createfromtxt in if loop ==" + createfromtxt);
			
			var po_rec=nlapiLoadRecord('purchaseorder',createdFrom);

			var workDate = po_rec.getFieldValue('trandate');
			nlapiLogExecution('DEBUG','before submit','workDate =='+workDate);
			if(workDate == null || workDate == undefined)
			{
				workDate = ""
			}
			
		}
	}*/

	var project_name = ffReqObj.getFieldValue('custbody_project_name');
	nlapiLogExecution('DEBUG','before submit','project_name =='+project_name);
	if(project_name == null || project_name == undefined)
	{
	project_name = "";
	}

	var recBy = ffReqObj.getFieldValue('custbody12');
	nlapiLogExecution('DEBUG','before submit','recBy =='+recBy);
	if(recBy == null || recBy == undefined)
	{
	recBy = "";
	}

	var recFrom = ffReqObj.getFieldValue('custbody_received_from');
	nlapiLogExecution('DEBUG','before submit','recFrom =='+recFrom);
	if(recFrom == null || recFrom == undefined)
	{
	recFrom = "";
	}
	
	var receivedBy = ffReqObj.getFieldText('custbody7');
	var x = receivedBy.replace(/[0-9]/g, '');
	nlapiLogExecution('DEBUG','before submit','s =='+x);
	

	//var lineCount = ffReqObj.getLineItemCount('item');
	//var strName;

	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td border-top=\"solid 1px black\" border-right=\"solid 1px black\" border-left=\"solid 1px black\" font-size=\"10\" colspan =\"6\" width = \"100\%\" align=\"center\"><b>Goods Receipt Note</b></td>";	
	strName += "</tr>";
	strName += "</table>";

	//-------------------------------------GST NO-----------------------------------------

	var url = 'https://system.netsuite.com/core/media/media.nl?id=11&c=5288045_SB1&h=aa54a558ce48064a6509';

	//var url1= 'https://system.netsuite.com/core/media/media.nl?id=3284&c=5288045_SB1&h=82a448b34c01dca73135';

	strName += "<table border=\"solid 1px black\" width=\"100\%\">";
	strName += "<tr>";
	strName += "<td>";
	strName +="<img height='50' width='50' src=\""+nlapiEscapeXML(url)+"\"></img>";
	strName += "</td>";
	strName += "<td colspan =\"5\" width = \"70\%\" align=\"right\"><br/><b>"+companyName+"</b><br/>"+companyAdd+"<br/>GST No-27AACCD3117C1Z9</td>";	
	strName += "</tr>";
	strName += "</table>";

	//---------------------------------------Challan Detail-------------------------------

	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25\%\" font-size=\"9\" align=\"left\"> Challan No:&nbsp;&nbsp;"+chal_no+"</td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\">&nbsp;</td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\"  width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25\%\" font-size=\"9\" align=\"left\">Date:&nbsp;&nbsp;"+date+"</td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"15\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "</tr>";

	/*strName += "<tr>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"50\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\">&nbsp;</td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\"  width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "</tr>";*/

	var createfromtxt = ffReqObj.getFieldText('createdfrom');
	var requiId = ffReqObj.getFieldValue('custbody_req_num');
	var createdFrom=ffReqObj.getFieldValue('createdfrom');
	
	if(createdFrom != null || createdFrom != undefined)  
	{
		nlapiLogExecution('DEBUG', 'aftr submit', "  createdFrom  ==" + createdFrom);
		nlapiLogExecution('DEBUG', 'before substring if', "createfromtxt  ==" + createfromtxt);
		if (createfromtxt.substr(0,14)== 'Purchase Order')
		{
			nlapiLogExecution('DEBUG', 'after substring if', "createfromtxt in if loop ==" + createfromtxt);
			
			var po_rec=nlapiLoadRecord('purchaseorder',createdFrom);

			var workDate = po_rec.getFieldValue('trandate');
			nlapiLogExecution('DEBUG','before submit','workDate =='+workDate);
			if(workDate == null || workDate == undefined)
			{
				workDate = ""
			}
			
		
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"> Contractor Name:&nbsp;&nbsp;"+contactor_name+"<br/><br/> Return By:<br/>"+rutby+"<br/>LR No:&nbsp;"+lrNo+"</td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\"  width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"48\%\" font-size=\"9\" align=\"left\">"+workNo+"<br/><br/>Date:&nbsp;&nbsp;"+workDate+"<br/><br/> Vehicle No :&nbsp;&nbsp;"+vehicalNo+"</td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "</tr>";
		}
	}
	
	else if(createfromtxt.substr(0,11)== 'Requisition')
	{
		nlapiLogExecution('DEBUG', 'after substring if', "createfromtxt in if loop ==" + createfromtxt);
		
		var po_rec=nlapiLoadRecord('purchaserequisition',createdFrom);

		var workDate = po_rec.getFieldValue('trandate');
		nlapiLogExecution('DEBUG','before submit','workDate =='+workDate);
		if(workDate == null || workDate == undefined)
		{
			workDate = ""
		}
		
		strName += "<tr>";
		strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"> Contractor Name:&nbsp;&nbsp;"+contactor_name+"<br/><br/> Return By:<br/>"+rutby+"<br/>LR No:&nbsp;"+lrNo+"</td>";
		strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
		strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
		strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\"  width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
		strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"48\%\" font-size=\"9\" align=\"left\">"+workNo+"<br/><br/>Date:&nbsp;&nbsp;"+workDate+"</td>";
		strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
		strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
		strName += "</tr>";
	}//End of else 


	
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\" border-left=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\">Project Name:<br/>"+project_name+"</td>";
	strName += "<td table-layout = \"fixed\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-left=\"solid 1px black\" width=\"55\%\" font-size=\"9\" align=\"left\">Contact Person:&nbsp;"+contPer+"<br/><br/>Contact No :&nbsp;&nbsp;"+contNo+" </td>";
	strName += "<td table-layout = \"fixed\" colspan =\"3\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"38\%\" font-size=\"9\" align=\"left\"> Project ID:&nbsp;&nbsp;"+ID+"</td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\" border-left=\"solid 1px black\" width=\"55\%\" font-size=\"9\" align=\"left\">	Route/Section/Span:<br/>"+secname+"</td>";
	strName += "<td table-layout = \"fixed\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" width=\"16\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "</tr>";
	strName += "</table>";

	/*strName += "<table width=\"100\%\" >";
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" font-size=\"9\" width=\"17\%\" align=\"left\"> Purpose :&nbsp;Other</td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"3\%\" font-size=\"9\" align=\"left\"><img align=\"left\" height='60%' width='60%' src=\""+nlapiEscapeXML(url1)+"\"></img></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"6\%\" font-size=\"9\">Project</td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"3\%\" font-size=\"9\"><img height='60%' width='60%' src=\""+nlapiEscapeXML(url1)+"\"></img></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"22.3\%\" font-size=\"9\">Maintenance(O and M)</td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"2\%\" font-size=\"9\"><img height='60%' width='60%' src=\""+nlapiEscapeXML(url1)+"\"></img></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"20.8\%\" font-size=\"9\">Stock Transfer</td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"36.9\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "</tr>";
	strName += "</table>";*/

	strName += "<table width=\"100\%\" >";
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"30.7\%\" font-size=\"9\" align=\"left\">Received by:<br/>"+recBy+"<br/><br/></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"32\%\" font-size=\"9\" align=\"left\"> Received From :<br/>"+recFrom+"<br/><br/></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" colspan =\"3\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
	strName += "</tr>";
	strName += "</table>";

	//---------------------------------------Item Table---------------------------------

	var lineCount = ffReqObj.getLineItemCount('item');//table-layout = \"fixed\"
	strName += "<table width=\"100\%\" table-layout = \"fixed\">";
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"10\%\"><b>Sr.<br/>No.</b></td>";
	strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"13\%\"><b>Item<br/>Code</b></td>";
	strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\"><b>Description</b></td>";
	strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>HSN<br/>Code</b></td>";
	strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"13\%\"><b>UOM</b></td>";
	strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"13.3\%\"><b>Qty</b></td>";
	strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"15\%\"><b>Order<br/>Qty</b></td>";
	strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>Location</b></td>";
	strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-right=\"solid 1px black\" border-left=\"solid 1px black\" width=\"17.3\%\"><b>Remarks</b></td>";
	strName += "</tr>";
	
	var rmrk = new Array();
	nlapiLogExecution('DEBUG','before submit','lineCount =='+lineCount);
	var srno = 0;
	for (var j = 1; j <= lineCount; j++)
	{
		nlapiLogExecution('DEBUG','before submit','var k for loop =='+j);
		var srNo = srno + j;

		var remarks = ffReqObj.getLineItemValue('item','custcol_remarks',j);
		nlapiLogExecution('DEBUG','before submit','remarks =='+remarks);
		if(remarks!=null)
		{
		rmrk.push(remarks);
		}
		else
		{
		remarks = " ";
		rmrk.push(remarks);
		}

		var qty = ffReqObj.getLineItemValue('item','quantity',j);
		nlapiLogExecution('DEBUG', 'aftr submit', "  qty  ==" + qty);
		if(qty == null || qty == undefined)  
		{
		qty = "";
		}
		
		var createfromtxt = ffReqObj.getFieldText('createdfrom');
		var requiId = ffReqObj.getFieldValue('custbody_req_num');
		var createdFrom=ffReqObj.getFieldValue('createdfrom');
		
		if(createdFrom != null || createdFrom != undefined)  
		{
			nlapiLogExecution('DEBUG', 'aftr submit', "  createdFrom  ==" + createdFrom);
			nlapiLogExecution('DEBUG', 'before substring if', "createfromtxt  ==" + createfromtxt);
			if (createfromtxt.substr(0,14)== 'Purchase Order')
			{
				nlapiLogExecution('DEBUG', 'after substring if', "createfromtxt in if loop ==" + createfromtxt);
				
				var po_rec=nlapiLoadRecord('purchaseorder',createdFrom);

				var orderQty = po_rec.getLineItemValue('item','quantity',j);
				nlapiLogExecution('DEBUG', 'aftr submit', "  Order Quantity  ==" + orderQty);
				if(orderQty == null || orderQty == undefined)  
				{
					orderQty = "";
				}
			}
		}
		
		var location = ffReqObj.getLineItemText('item','location',j);
		nlapiLogExecution('DEBUG', 'aftr submit', "  location  ==" + location);
		if(location == null || location == undefined)  
		{
			location = "";
		}
		
		var item = ffReqObj.getLineItemText('item','item',j);
		nlapiLogExecution('DEBUG', 'aftr submit', "  item  ==" + item);

		var res = item.toString();
		var ID =  res.split(" ", 1);
		nlapiLogExecution('DEBUG', 'aftr submit', "  ID  ==" + ID);
		if(item == null || item == undefined) 
		{
		item = "";
		}
		
		var description = ffReqObj.getLineItemValue('item','description',j);
		nlapiLogExecution('DEBUG', 'aftr submit', "description  ==" + description);
		if(description == null || description == undefined)  
		{
		description = "";
		}

		var concat = item.concat(" : ").concat(description);//item.concat(description);
		nlapiLogExecution('DEBUG', 'aftr submit', "  concat  ==" + concat);
		if(concat == null || concat == undefined) 
		{
		concat = "";
		}

		var hsn = ffReqObj.getLineItemText('item','custcol_in_hsn_code',j);
		nlapiLogExecution('DEBUG', 'aftr submit', "  hsn  ==" + hsn);

		var ID1 = hsn.split(/[ ,.:]+/,1);
	    nlapiLogExecution('DEBUG', 'after Submit', 'ID1 =' + ID1);
	 
		var s = ffReqObj.getLineItemValue('item','units',j);
		
		var uom;
		var filters1= new Array();
		var columns1= new Array();
		columns1[0] =	new nlobjSearchColumn("internalid"), 
		columns1[1] =   new nlobjSearchColumn("abbreviation")
		 var results1 = GetSearchResults1(filters1,columns1); 
			for (var p = 1; p < results1.length; p++) 
			{ 
				var id = results1[p].getValue('internalid');
				
				var name = results1[p].getValue('abbreviation');
				
				
				 if( id == s )
				 {
					 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Unit name :'+name);
					 uom = name;
				 }
			
				 
			}	
			
		//var unit = nlapiLookupField('item',units,cust_fields);
   
		nlapiLogExecution('DEBUG', 'aftr submit', "uom  ==" + uom);
		if(uom == null || uom == undefined)
		{
		uom = "";
		}
	
		strName += "<tr>";
		strName += "<td table-layout = \"fixed\" align = \"right\" font-size=\"9\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"10\%\">"+srNo+"</td>";
		strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"13\%\">"+ID+"</td>";
		strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"40\%\">"+concat+"</td>";
		strName += "<td table-layout = \"fixed\" align = \"right\" font-size=\"9\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"18\%\">"+ID1+"</td>";
		strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"13\%\">"+uom+"</td>";
		strName += "<td table-layout = \"fixed\" align = \"right\" font-size=\"9\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"13.3\%\">"+qty+"</td>";
		strName += "<td table-layout = \"fixed\" align = \"right\" font-size=\"9\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"15\%\">"+orderQty+"</td>";
		strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"20\%\">"+location+"</td>";
		strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-right=\"solid 1px black\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"17.3\%\">"+rmrk[j-1]+"</td>";
		strName += "</tr>";
		
	//}
	}//end of for loop
	
	strName += "</table>";

	//---------------------------------------------------Signature part-------------------------------------
	strName += "<table width=\"100\%\">";
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\" border-left=\"solid 1px black\" width=\"25\%\" colspan =\"5\" font-size=\"9\" align=\"left\">Prepared and Received By</td>";
	//strName += "<td width=\"4\%\" colspan =\"3\" font-size=\"9\" align=\"left\"></td>";
	strName += "<td table-layout = \"fixed\"  width=\"20\%\" colspan =\"7\" font-size=\"9\" align=\"left\">Store Incharge</td>";
	strName += "<td table-layout = \"fixed\"  width=\"25\%\" colspan =\"7\" font-size=\"9\" align=\"left\">Contractor Represent</td>";
	strName += "<td table-layout = \"fixed\"  border-right=\"solid 1px black\" width=\"30\%\" colspan =\"7\" font-size=\"9\" align=\"left\">Site Engineer/Supervisor</td>";
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\"  border-left=\"solid 1px black\" width=\"25\%\" colspan =\"5\" font-size=\"9\" align=\"left\">Name:<br/>"+x+"</td>";
	strName += "<td table-layout = \"fixed\"  width=\"25\%\" colspan =\"7\" font-size=\"9\" align=\"left\">Name:</td>";
	strName += "<td table-layout = \"fixed\"  width=\"25\%\" colspan =\"7\" font-size=\"9\" align=\"left\">Name:</td>";
	strName += "<td table-layout = \"fixed\"  border-right=\"solid 1px black\" width=\"25\%\" colspan =\"7\" font-size=\"9\" align=\"left\">Name:</td>";
	strName += "</tr>";
	strName += "<tr>";
	strName += "<td table-layout = \"fixed\"  border-left=\"solid 1px black\" border-bottom =\"solid 1px black\" width=\"25\%\" colspan =\"5\" font-size=\"9\" align=\"left\"><br/><br/><br/>Signature</td>";
	strName += "<td table-layout = \"fixed\"  width=\"25\%\" colspan =\"7\" border-bottom =\"solid 1px black\" font-size=\"9\" align=\"left\"><br/><br/><br/>Signature</td>";
	strName += "<td table-layout = \"fixed\"  width=\"25\%\" colspan =\"7\" border-bottom =\"solid 1px black\" font-size=\"9\" align=\"left\"><br/><br/><br/>Signature</td>";
	strName += "<td table-layout = \"fixed\"  border-right=\"solid 1px black\" border-bottom =\"solid 1px black\" width=\"30\%\" colspan =\"7\" font-size=\"9\" align=\"left\"><br/><br/><br/>Signature</td>";
	strName += "</tr>";
	strName += "</table>";

	// build up BFO-compliant XML using well-formed HTML
	var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
	//xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n";
	xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">";
	xml += "<p></p>";
	xml += strName;
	xml += "</body></pdf>";

	// run the BFO library to convert the xml document to a PDF 
	var file = nlapiXMLToPDF( xml );

	// set content type, file name, and content-disposition (inline means display in browser)
	response.setContentType('PDF','PO_Item_Barcode.pdf', 'inline');

	// write response to the client
	response.write( file.getValue() ); 
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Error :='+e);
	}
}


function GetSearchResults1(filters1,columns1) {
	
	var results1 = nlapiSearchRecord('unitstype', 'customsearch723', filters1, columns1);
	return results1;
}
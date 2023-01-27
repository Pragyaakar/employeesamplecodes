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
				function suiteletChallan(request, response)
				{
				    var chal_no;
				    var date;
				    var location;
				    var order_no;
				    var cont_no;
				    var contactor_name;
				    var intby;
				    var rutname;
				    var secname;
				    var proId;
				    var contPer;
				    var contNo;
				    var lrNo;
				    var typeIss;
				    var vehicalNo;
				    var congIss_from;
				    var congDeli_to;
				    var itemCode;
				    var description;
				    var hsn;
				    var uom;
				    var qty;
				    var remarks;
				    var srno = 0;
				    var srNo = 1;
				    var strName = ""; 
				    
					var recrdId = request.getParameter('custscript_delchalptid');
					var recrdType = 'itemfulfillment';	
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
					
					chal_no = ffReqObj.getFieldValue('tranid');
					nlapiLogExecution('DEBUG','before submit','Request Chal Num =='+chal_no);
					if(chal_no == null || chal_no == undefined)
					{
						chal_no = "";
					}
					
					date = ffReqObj.getFieldValue('trandate');
					nlapiLogExecution('DEBUG','before submit','Request Date =='+date);
					if(date == null || date == undefined)
					{
						date = "";
					}
					
					order_no = ffReqObj.getFieldText('custbody_work_order_number');
					nlapiLogExecution('DEBUG','before submit','Work Order Number =='+order_no);
					if(order_no == null || order_no == undefined)
					{
						order_no = "";
					}
					
					contactor_name = ffReqObj.getFieldValue('custbody_contractor_name');
					nlapiLogExecution('DEBUG','before submit','contractor name =='+contactor_name);
					if(contactor_name == null || contactor_name == undefined)
					{
						contactor_name = "";
					}
					
					intby = ffReqObj.getFieldValue('custbody_intended_by');
					nlapiLogExecution('DEBUG','before submit','Intended Raised By =='+intby);
					if(intby == null || intby == undefined)
					{
						intby = "";
					}
					
					rutname = ffReqObj.getFieldText('cseg1');
					nlapiLogExecution('DEBUG','before submit','Route Name =='+rutname);
					if(rutname == null || rutname == undefined)
					{
						rutname = "";
					}
					
					contPer = ffReqObj.getFieldValue('custbody_contact_person');
					nlapiLogExecution('DEBUG','before submit','Contact Person =='+contPer);
					if(contPer == null || contPer == undefined)
					{
						contPer = "";
					}
					
					contNo = ffReqObj.getFieldValue('custbody_contact_number');
					nlapiLogExecution('DEBUG','before submit','contNo =='+contNo);
					if(contNo == null || contNo == undefined)
					{
						contNo = "";
					}
					
					lrNo = ffReqObj.getFieldValue('custbody_lr_number');
					nlapiLogExecution('DEBUG','before submit','lrNo =='+lrNo);
					if(lrNo == null || lrNo == undefined)
					{
						lrNo = "";
					}
					
					vehicalNo = ffReqObj.getFieldValue('custbody_vehicle_number');
					nlapiLogExecution('DEBUG','before submit','vehicalNo =='+vehicalNo);
					if(vehicalNo == null || vehicalNo == undefined)
					{
						vehicalNo = "";
					}
						
					congIss_from = ffReqObj.getFieldValue('custbody_issue_from');
					nlapiLogExecution('DEBUG','before submit','Issue From =='+congIss_from);
					if(congIss_from == null || congIss_from == undefined)
					{
						congIss_from = "";
					}
					
					congDeli_to = ffReqObj.getFieldValue('shipaddress');
					nlapiLogExecution('DEBUG','before submit','Delivery to =='+congDeli_to);
					if(congDeli_to == null || congDeli_to == undefined)
					{
						congDeli_to = "";
					}
					
					proId = ffReqObj.getFieldText('custbody_project_id');
					nlapiLogExecution('DEBUG','before submit','proId =='+proId);
					var res = proId.toString();
					var ID =  res.split(" ", 1);
					if(proId == null || proId == undefined)
					{
						proId = "";
					}
					
					secname = ffReqObj.getFieldText('cseg1');
					nlapiLogExecution('DEBUG','before submit','Section Name =='+secname);
					if(secname == null || secname == undefined)
					{
						secname = "";
					}
					
					typeIss = ffReqObj.getFieldValue('custbody_type_of_issue');
					nlapiLogExecution('DEBUG','before submit','typeIss =='+typeIss);
					if(typeIss == null || typeIss == undefined)
					{
						typeIss = "";
					}
					
					var note = ffReqObj.getFieldValue('memo');
					nlapiLogExecution('DEBUG','before submit','note =='+note);
					if(note == null || note == undefined)
					{
						note = "";
					}
					
					var intendedby = ffReqObj.getFieldText('custbody7');
					nlapiLogExecution('DEBUG','before submit','Intended By =='+intendedby);
					if(intendedby == null || intendedby == undefined)
					{
						intendedby = "";
					}
					
				    var url = 'https://system.netsuite.com/core/media/media.nl?id=11&c=5288045_SB1&h=aa54a558ce48064a6509'; 
				    
				    strName += "<table border=\"solid 1px black\" width=\"100\%\">";
					strName += "<tr>";
					strName += "<td>";
					strName +="<img height='50' width='50' src=\""+nlapiEscapeXML(url)+"\"></img>";
					strName += "</td>";
					strName += "<td colspan =\"6\" width = \"100\%\"  align=\"right\"><br/><b>"+companyName+"</b><br/>"+companyAdd+"<br/>GST No-27AACCD3117C1Z9</td>";	
					strName += "</tr>";
					strName += "</table>";
					
					//-------------------------------------GST NO-----------------------------------------
					
					
					strName += "<table width=\"100\%\">";
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-right=\"solid 1px black\" border-left=\"solid 1px black\" colspan =\"6\" width = \"100\%\" align=\"center\"><b>DELIVERY CHALLAN</b></td>";	
					strName += "</tr>";
					strName += "</table>";
					
					//---------------------------------------Challan Detail-------------------------------
					
					strName += "<table width=\"100\%\">";
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\" font-size=\"9\" align=\"left\"> Challan No:&nbsp;&nbsp;"+chal_no+" </td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\">&nbsp;</td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-bottom=\"solid 1px black\"  width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\">Date:&nbsp;&nbsp;"+date+"</td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "</tr>";
					strName += "</table>";
					
					strName += "<table width=\"100\%\">";
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\" font-size=\"9\" align=\"left\"> Contractor Name :<br/><br/>Indent Raised By:&nbsp;</td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"55\%\" font-size=\"9\" align=\"left\">"+contactor_name+"<br/><br/>"+intby+"</td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\"  width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"53\%\" font-size=\"9\" align=\"left\"> Work Order No.:&nbsp;&nbsp;"+order_no+"<br/><br/>Contact No:&nbsp;&nbsp;"+contNo+"</td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "</tr>";
					strName += "</table>";
					
					strName += "<table width=\"100\%\">";
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"35\%\" font-size=\"9\" align=\"left\">Project ID :<br/>"+ID+"<br/><br/>LR No:&nbsp;"+lrNo+"</td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"55\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\"  width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-left=\"solid 1px black\" width=\"53\%\" font-size=\"9\" align=\"left\">Contact Person:&nbsp;"+contPer+"<br/><br/>Contact No :&nbsp;"+contNo+"</td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "</tr>";
					strName += "</table>";
					
					strName += "<table width=\"100\%\">";
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-left=\"solid 1px black\" width=\"60\%\" font-size=\"9\" align=\"left\">Route/Section/Span:<br/>"+secname+"</td>";
					strName += "<td table-layout = \"fixed\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" width=\"4\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" colspan =\"3\" width=\"30\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-right=\"solid 1px black\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "</tr>";
					strName += "</table>";
					
					strName += "<table width=\"100\%\">";
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"52\%\" font-size=\"9\" align=\"left\"> Type Of Issue:&nbsp;&nbsp;"+typeIss+"</td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"37\%\" font-size=\"9\" align=\"left\"> Vehicle No:&nbsp;"+vehicalNo+"</td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" colspan =\"3\" width=\"40\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "</tr>";
					
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"42\%\" font-size=\"9\" align=\"left\"> Consigned(Issue From):<br/><br/></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"55\%\" font-size=\"9\" align=\"left\"> Consignee(Delivery To):<br/>"+congDeli_to+"<br/><br/></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" colspan =\"3\" width=\"10\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-right=\"solid 1px black\" colspan =\"3\" width=\"20\%\" font-size=\"9\" align=\"left\"></td>";
					strName += "</tr>";
					strName += "</table>";
					
					//---------------------------------------Item Table---------------------------------
					
					var lineCount = ffReqObj.getLineItemCount('item');
					
					strName += "<table width=\"100\%\" >";
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"13\%\"><b>Sr. No.</b></td>";
					strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"10\%\"><b>Item<br/>Code</b></td>";
					strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"48\%\"><b>Description</b></td>";
					strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"13.6\%\"><b>HSN<br/>Code</b></td>";
					strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"10\%\"><b>UOM</b></td>";
					strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"8\%\"><b>QTY</b></td>";
					strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-left=\"solid 1px black\" width=\"25.5\%\"><b>Location</b></td>";
					strName += "<td table-layout = \"fixed\" align = \"center\" font-size=\"9\" border-bottom=\"solid 1px black\" border-top=\"solid 1px black\" border-right=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\"><b>Remarks</b></td>";
					strName += "</tr>";
					
					var rmrk = new Array();
					nlapiLogExecution('DEBUG','before submit','lineCount =='+lineCount);
					var srno = 0;
					for (var i = 1; i <= lineCount; i++)
					{
						var srNo = srno + i;
						
						nlapiLogExecution('DEBUG','before submit','var k for loop =='+i);
						
						remarks = ffReqObj.getLineItemValue('item','custcol_remarks',i);
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
					
			 			location = ffReqObj.getLineItemText('item','location',i);
			 			nlapiLogExecution('DEBUG','before submit','location =='+location);
			 			if(location == null || location == undefined) 
	    	        	{
			 				location = "";
	    	        	}
					
			 			/*var locationAdd;
			 			if(location)
			 			{
			 				var s = nlapiLoadRecord("location", location,{recordmode: "dynamic"});
			 				locationAdd = s.viewSubrecord("mainaddress").getFieldValue('addrtext');
			 				nlapiLogExecution('DEBUG','before submit','locationAdd =='+locationAdd);
							if(locationAdd == null)
							{
								locationAdd ="";
							}
			 			}*/
			 			
			 			var item =ffReqObj.getLineItemText('item','item',i);
	    	        	nlapiLogExecution('DEBUG', 'aftr submit', "  item  ==" + item);
	    	        	
	    	        	var res = item.toString();
	    				var ID =  res.split(" ", 1);
	    				nlapiLogExecution('DEBUG', 'aftr submit', "  ID  ==" + ID);
	    	        	if(item == null || item == undefined) 
	    	        	{
	    	        		item = "";
	    	        	}
	    	        	
	    	        	description =ffReqObj.getLineItemValue('item','description',i);
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
	    	        	
	    	        	var hsn = ffReqObj.getLineItemText('item','custcol_in_hsn_code',i);
	    				nlapiLogExecution('DEBUG', 'aftr submit', "  hsn  ==" + hsn);	
	    				
	    				var ID1 = hsn.split(/[ ,.:]+/,1);
	    				nlapiLogExecution('DEBUG', 'aftr submit', "  ID1  ==" + ID1);
	    	        	if(ID1 == null || ID1 == undefined) 
	    	        	{
	    	        		ID1 = "";
	    	        	} 
	    				
	    	        	
	    	        	var s = ffReqObj.getLineItemValue('item','units',i);
	    	    		
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
	    	        	//uom =ffReqObj.getLineItemText('item','units',i);
	    	        	nlapiLogExecution('DEBUG', 'aftr submit', "  uom  ==" + uom);
	    	        	if(uom == null || uom == undefined) 
	    	        	{
	    	        		uom = "";
	    	        	}
	    	        	
	    	        	qty =ffReqObj.getLineItemValue('item','quantity',i);
	    	        	nlapiLogExecution('DEBUG', 'aftr submit', "  qty  ==" + qty);
	    	        	if(qty == null || qty == undefined) 
	    	        	{
	    	        		qty = "";
	    	        	}
				         	
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" align = \"right\" font-size=\"9\" border-left=\"solid 1px black\" width=\"13\%\">"+srNo+"</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-left=\"solid 1px black\" width=\"10\%\">"+ID+"</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-left=\"solid 1px black\" width=\"48\%\">"+concat+"</td>";
					strName += "<td table-layout = \"fixed\" align = \"right\" font-size=\"9\" border-left=\"solid 1px black\" width=\"13.6\%\">"+ID1+"</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-left=\"solid 1px black\" width=\"8\%\">"+uom+"</td>";
					strName += "<td table-layout = \"fixed\" align = \"right\" font-size=\"9\" border-left=\"solid 1px black\" width=\"9\%\">"+qty+"</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-left=\"solid 1px black\" width=\"25.5\%\">"+location+"</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-right=\"solid 1px black\" border-left=\"solid 1px black\" width=\"20\%\">"+remarks+"</td>";
					strName += "</tr>";
				    }//end of for loop
				   //}
				 //}
					strName += "</table>";
					
					//--------------------------------- Note Part
					strName += "<table width=\"100\%\"  height=\"90\%\">";
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" border-top=\"solid 1px black\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" border-left=\"solid 1px black\" font-size=\"9\" colspan =\"5\" width=\"20\%\"  align=\"left\">Note:-&nbsp;&nbsp;"+note+"</td>";
					strName += "</tr>";
					strName += "</table>";
					
					//---------------------------------------------------Signature part-------------------------------------
					strName += "<table width=\"100\%\" >";
					
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" align = \"left\" border-left=\"solid 1px black\" font-size=\"9\" width=\"30\%\">Prepared and Issued By</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"10\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"30\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"30\%\">Received and Accepted By</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"10\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"10\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-right=\"solid 1px black\" width=\"10\%\"></td>";
					strName += "</tr>";
					
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" align = \"left\" border-left=\"solid 1px black\" font-size=\"9\" width=\"30\%\">Name:&nbsp;&nbsp;"+intendedby+"</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"10\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"30\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"30\%\">Name:</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"10\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" width=\"10\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-right=\"solid 1px black\" width=\"10\%\"></td>";
					strName += "</tr>";
					
					
					strName += "<tr>";
					strName += "<td table-layout = \"fixed\" align = \"left\" border-left=\"solid 1px black\" border-bottom=\"solid 1px black\" font-size=\"9\" width=\"30\%\">Signature</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-bottom=\"solid 1px black\" width=\"10\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-bottom=\"solid 1px black\" width=\"30\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-bottom=\"solid 1px black\" width=\"30\%\">Signature</td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-bottom=\"solid 1px black\" width=\"10\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-bottom=\"solid 1px black\" width=\"10\%\"></td>";
					strName += "<td table-layout = \"fixed\" align = \"left\" font-size=\"9\" border-bottom=\"solid 1px black\" border-right=\"solid 1px black\" width=\"10\%\"></td>";
					strName += "</tr>";
					strName += "</table>";
					
					// build up BFO-compliant XML using well-formed HTML
					var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
					xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" header=\"nlheader\" header-height=\"10%\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n";
					//xml += "<pdf><head><macrolist><macro id=\"myfooter\"><p align=\"center\"><br/><pagenumber /></p></macro></macrolist></head>\n<body size= \"A4\" footer=\"myfooter\" footer-height=\"0.5in\" font-size=\"10\">\n<h3>Packing Print</h3>\n";
					//xml += "<p></p>";
					xml += strName;
					xml += "</body>\n</pdf>";
				
					// run the BFO library to convert the xml document to a PDF 
					var file = nlapiXMLToPDF( xml );
				
					// set content type, file name, and content-disposition (inline means display in browser)
					response.setContentType('PDF','PO_Item_Barcode.pdf', 'inline');
				
					// write response to the client
					response.write( file.getValue() ); 
					
				}

				function GetSearchResults1(filters1,columns1) {
					
					var results1 = nlapiSearchRecord('unitstype', 'customsearch723', filters1, columns1);
					return results1;
				}
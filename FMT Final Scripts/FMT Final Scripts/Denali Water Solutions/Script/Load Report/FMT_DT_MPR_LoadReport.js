/**
  * @NApiVersion 2.0
  * @NScriptType MapReduceScript
 */
define(['N/search', 'N/record', 'N/format', 'N/render', 'N/email', 'N/error', 'N/runtime', 'N/file', 'N/xml'],
function(search, record, format, render, email, error, runtime, file, xml) {
  	var CSVFileID;
  	var CSV_counter = 0;
  	const REDUCEID = 'Reduce';

  	function getInputData(context) {
  	try {
			//Daily Save Search Parameters
		    var currentScriptDaily = runtime.getCurrentScript()

		    // Load search to set data on the custom record
		    var dailyID = currentScriptDaily.getParameter({
		   		name: 'custscript_fmt_dt_loadreport'
		    });

		    var emailTempID = runtime.getCurrentScript(); // Get Email Template ID from Parameter
		    var emailTemplate = emailTempID.getParameter({
		   		name: 'custscript_fmt_dt_email_template'
		   	});
	   
	   		var author = runtime.getCurrentScript(); // Get Author ID from Parameter - current user ID
		    var emailAuthor = author.getParameter({
		   		name: 'custscript_fmt_load_report_author'
		   	});
	   
	   		var pdf = runtime.getCurrentScript(); // Get PDF Folder ID from Parameter - From file cabinate
			var pdfVal = pdf.getParameter({
	   			name: 'custscript_fmt_load_report_pdf'
	   		});
	   
	   		var csv = runtime.getCurrentScript(); // Get CSV Folder ID from Parameter - From file cabinate
				var csvVal = csv.getParameter({
	   			name: 'custscript_fmt_load_report_csv'
	   		});

	   		if ((dailyID == 'customsearch_fmt_monthly_load_report_sea')) {
		   		var savedSearch = search.load({
		   			id: dailyID
		   		});
	   		}

		   	if ((dailyID == 'customsearch_fmt_daily_load_report_sear')) {
		   		var savedSearch = search.load({
		   			id: dailyID
		   		});
		   	}

	   		if ((dailyID == 'customsearch_fmt_weekly_load_report_sea')) {
	   			var savedSearch = search.load({
	   				id: dailyID
	   			});
	   		}

	  		var firstResult = searchAll(savedSearch.run());

	  		if (firstResult) {

	  			var cogsLineJSON = [];
	  			for (var k = 0; k < firstResult.length; k++) {

				   	var tranID = firstResult[k].getValue(firstResult[k].columns[0]); // SO Internal ID
				   //	var date = firstResult[k].getValue(firstResult[k].columns[1]);
				   	//var LastModifyDte = firstResult[k].getValue(firstResult[k].columns[2]);
				  	var DocNum = firstResult[k].getText(firstResult[k].columns[1]);
				   	var NumDocNum = firstResult[k].getValue(firstResult[k].columns[1]);
				   	var Name = firstResult[k].getValue(firstResult[k].columns[2]);
				   	var CustName = firstResult[k].getText(firstResult[k].columns[2]);
				   	var SumAmt = firstResult[k].getValue(firstResult[k].columns[3]);
				   	var TickCont = firstResult[k].getValue(firstResult[k].columns[4]);
				   	var loadReportstartdate = '';
				   	var loadReportenddate = '';

				   	if(dailyID != 'customsearch_fmt_daily_load_report_sear'){
					   	loadReportstartdate = firstResult[k].getValue(firstResult[k].columns[5]);
					   	loadReportenddate = firstResult[k].getValue(firstResult[k].columns[6]);
				   	}
		   			cogsLineJSON.push({
					   	'id': tranID,
					   //	'begiDate': date,
					   	//'EndDte': LastModifyDte,
					   	'docNum': DocNum,
					   	'custName': Name,
					   	'amt': SumAmt,
					   	'ticketCount': TickCont,
					   	'searchid': dailyID,
					   	'template': emailTemplate,
					   	'author': emailAuthor,
							'pdf_val': pdfVal, // PDF folder ID
							'csv_val': csvVal,
							'customer_id': Name,
							'startdate': loadReportstartdate,
							'enddate':loadReportenddate,
							'customerName':CustName
					});
				}// End of firstResult.length
			}// End of firstResult If condition
			return cogsLineJSON;
		} catch (e) {
			log.error('Error Occures', e);
		}
	}

	function map(context) {
	try {
	   		var searchResult = JSON.parse(context.value); // Capture all values from getInputData function
	   
		    var id = searchResult.id;
		    var docNum = searchResult.docNum;
		    var amt = searchResult.amt;
		    var custName = searchResult.custName;
		    var tktNum = searchResult.ticketCount;
		   // var begDate = searchResult.begiDate;
		    //var EndDate = searchResult.EndDte;
		    var search_id = searchResult.searchid;
		    var loadTemp = searchResult.template;
		    var authVal = searchResult.author;
	   		var pdfId = searchResult.pdf_val;
	   		var csvId = searchResult.csv_val;
	   		var customerId = searchResult.customer_id;
	   		var loadReportstartdate= searchResult.startdate;
	   		var loadReportenddate =  searchResult.enddate;
	   		var custNametxt = searchResult.customerName

	   		log.debug('customerId', customerId);

	   		context.write({
	   		key: customerId,
	   		value: {
		   		'tranID': id,
		   		'tranDocNum': docNum,
		   		'tranAmt': amt,
		   		'tranCustName': custName,
		   		'numTck': tktNum,
		   		//'strDate': begDate,
		   		//'endDate': EndDate,
		   		'searchval': search_id,
		   		'templateVal': loadTemp,
		   		'authVal': authVal,
		   		'pdfId': pdfId,
		   		'csvId': csvId,
		   		'startdate': loadReportstartdate,
		   		'enddate': loadReportenddate,
		   		'customerName':custNametxt
		   		}
	   		});
		}catch (e) {
			log.debug('ERROR N MAP FUNCTION', e);
		}
	}

	function reduce(context) {
	try {
				var mapKeyData = context.key;
				log.debug('mapKeyData', mapKeyData);

			   	var loadCust = record.load({ // Load customer record to capture required values             
					type: record.Type.CUSTOMER, //from customer record
					id: mapKeyData,
					isDynamic: true
				});
	   		
	   		var tempmapValueData =  JSON.parse(context.values[0]);
	   		var tranCustName = tempmapValueData.customerName;
	   		var startdate = tempmapValueData.startdate;
	   		var enddate = tempmapValueData.enddate;
	   		var loaddate = '';

	   		if(startdate && enddate){
	   			loaddate = startdate + ' - ' + enddate;
	   		}else{
	   			loaddate = new Date();
	   			loaddate = (loaddate.getMonth() + 1) + '/' + loaddate.getDate() + '/' + loaddate.getFullYear();
	   		}

	   		tranCustName = xml.escape({
	   			xmlText : tranCustName
	   		});

	   		var resultData;
	   		resultData = {
	   			"custname":tranCustName,
	   			"tran_date": loaddate
	   		};

	   		resultData.lines = [];
	   		var content = new Array();
	   		var lineOne = '';
	   		var items = [];
	   		var idArr = [];

	   		var InclLoadReport = loadCust.getValue({
	   			fieldId: 'custentity_fmt_included_load_report'
	   		});
	   		var LoadReptPref = loadCust.getValue({
	   			fieldId: 'custentity_fmt_entity_load_report_prefe'
	   		});
	   		
	   		var LoadReptFreq = loadCust.getValue({
	   			fieldId: 'custentity_fmt_load_report_frequency'
	   		});
	   		var CustEmail_ID = loadCust.getValue({
	   			fieldId: 'custentity_fmt_daily_load_report_recipi'
	   		});
	   		var CustEmail_Weekly_ID = loadCust.getValue({
	   			fieldId: 'custentity_fmt_weekly_load_repo_recipie'
	   		});
	   		var CustEmail_Monthly_ID = loadCust.getValue({
	   			fieldId: 'custentity_fmt_monthly_load_report_reci'
	   		});

	   		for (var j = 0; j < context.values.length; j++) { // this will call based on sales order records
	   		
	   		var temp = '';
		 		var mapValueData = JSON.parse(context.values[j]); // Capture all values from Map function
				var tranID = mapValueData.tranID;
				var tranDocNum = mapValueData.tranDocNum;
				var tranAmt = mapValueData.tranAmt;
				var tranCustName = mapValueData.tranCustName;
				var numTck = mapValueData.numTck;
				//var strDate = mapValueData.strDate;
				//var endDate = mapValueData.endDate;
				var searchVal = mapValueData.searchval;
				var tempID = mapValueData.templateVal;
				var Auth_ID = mapValueData.authVal;
				var PDFID = mapValueData.pdfId;
				var CSVID = mapValueData.csvId;

				idArr.push(tranID);

		 		var pdf_SalesOrder = [];
		 		if (InclLoadReport == true) // Include in load report checkbox condition from customer record
		 		{	
		 			var soRec = record.load({
		 				type: record.Type.SALES_ORDER,
		 				id: tranID
		 			});

		 			items.push(tranID);

					if (LoadReptPref == '1') // check Customer load report prefernce from customer record  1 ID is for CSV
		   			{
		   				var csvColumns = new Array();
		   				var soLineCount = soRec.getLineCount({
		   					'sublistId': 'item'
		   				});
					   	var tran_Name = soRec.getValue({
					   		fieldId: 'entity'
					   	});
					   	tran_Name = tran_Name.toString().trim();
					   	var nameText = soRec.getText({
					   		fieldId: 'entity'
					   	});
		   				try {

		   					var flag = false;
		   					for (var i2 = 0; i2 < soLineCount; i2++) {

									var lineid = getlinkID(searchVal);
									var Tckdate = soRec.getSublistValue({
					   					sublistId: 'item',
					   					fieldId: 'custcol11',
					   					line: i2
							 		});
					   			var newDate = (Tckdate.getMonth() + 1) + '/' + Tckdate.getDate() + '/' + Tckdate.getFullYear();

									if(searchVal == 'customsearch_fmt_monthly_load_report_sea' ){
											flag = date_compare(startdate,enddate,newDate);
									}
									if(searchVal == 'customsearch_fmt_daily_load_report_sear' || searchVal == 'customsearch_fmt_weekly_load_report_sea'){
											flag = true;
									}
									var loadReportLink = soRec.getSublistValue({
										sublistId: 'item', 
										fieldId: lineid,   
										line: i2
									});
 									
 								if(!loadReportLink && flag != false)
 								{
					   			var myItems = soRec.getSublistValue({
					   				sublistId: 'item',
					   				fieldId: 'item',
					   				line: i2
					   			});
		   						if(myItems != 1529 && myItems != 1550){
					   				
					   				
					   				var memo = soRec.getSublistValue({
					   					sublistId: 'item',
					   					fieldId: 'description',
					   					line: i2
					   				});
					   				Tckdate = newDate;
					   				var TckNum = soRec.getSublistText({
					   					sublistId: 'item',
					   					fieldId: 'custcol_ticket_number',
					   					line: i2
							 		}); //firstResult[i2].getValue({name: "custcol_ticket_number",label: "Ticket #"});
					   				var driver = soRec.getSublistText({
					   					sublistId: 'item',
					   					fieldId: 'custcol_oms_sales_order_driver',
					   					line: i2
					   				}); 
					   				var scaleNum = soRec.getSublistValue({
					   					sublistId: 'item',
					   					fieldId: 'custcol_fmt_scale_number',
					   					line: i2
							 		}); //firstResult[i2].getValue({name: "custcol_fmt_scale_number",label: "Scale Tkt#"});
					   				var GrossWtg = soRec.getSublistValue({
					   					sublistId: 'item',
					   					fieldId: 'custcol_fmt_gross_weight',
					   					line: i2
							 		}); //firstResult[i2].getValue({name: "custcol_fmt_gross_weight",label: "Gross Wt"});
					   				var tareWtg = soRec.getSublistValue({
					   					sublistId: 'item',
					   					fieldId: 'custcol_tare_weight',
					   					line: i2
							 		}); //firstResult[i2].getValue({name: "custcol_tare_weight", label: "Tare Wt"});
					   				var netWtg = soRec.getSublistValue({
					   					sublistId: 'item',
					   					fieldId: 'custcol_fmt_net_weight',
					   					line: i2
							 		}) //firstResult[i2].getValue({name: "custcol_fmt_net_weight", label: "Net Wt"});
					   				var numLoads = soRec.getSublistValue({
					   					sublistId: 'item',
					   					fieldId: 'custcol_fmt_so_lds',
					   					line: i2
							 		}) //firstResult[i2].getValue({name: "custcol_fmt_so_lds", label: "#Lds"});
																		
 										temp += Tckdate + ',' + TckNum + ',' + driver + ',' + memo + ',' + scaleNum + ',' + GrossWtg + ',' + tareWtg + ',' + netWtg + ',' + numLoads + '\n';
 									}
		   						}// End of If Item condition
			   				} // for loop end for main data push 
			   				content.push(temp);
			   			} catch (e) {
							log.audit({
								title: 'ERROR====> ',
								details: e.toString()
							});
						}
		   			} //End of LoadReptPref CSV Condition

		   			if (LoadReptPref == '2') {
					   	var soLineCount = soRec.getLineCount({
					   		'sublistId': 'item'
					   	});
					   	var date_Val = soRec.getValue({
					   		fieldId: 'trandate'
					   	});
					   	var newDate = (date_Val.getMonth() + 1) + '/' + date_Val.getDate() + '/' + date_Val.getFullYear();
					   	var flag = false;
		   				for (var i = 0; i < soLineCount; i++) {
								
								resultLine = {}; 
								var lineid = getlinkID(searchVal);
								var loadReportLink = soRec.getSublistValue({
									sublistId: 'item', 
									fieldId: lineid, 
									line: i
								});
								
 							if(!loadReportLink){

							var myItems = soRec.getSublistValue({
								sublistId: 'item',
							 	fieldId: 'item',
							 	line: i
							});
				 			if(myItems != 1529 && myItems != 1550){
							 				
								var line_date = soRec.getSublistValue({
							 		sublistId: 'item',
							 		fieldId: 'custcol11',
							 		line: i
							 	});
				 				var new_line_date = (line_date.getMonth() + 1) + '/' + line_date.getDate() + '/' + line_date.getFullYear();
								if(searchVal == 'customsearch_fmt_monthly_load_report_sea' ){
											flag = date_compare(startdate,enddate,new_line_date);
									}
									if(searchVal == 'customsearch_fmt_daily_load_report_sear' || searchVal == 'customsearch_fmt_weekly_load_report_sea'){
											flag = true;
									}
									log.debug('flag====>' , flag);
									log.debug('searchVal====>' , searchVal);
									if(flag != false){

									resultLine.date = new_line_date; 
			   					resultLine.ticketNum = soRec.getSublistText({
			   						sublistId: 'item',
			   						fieldId: 'custcol_ticket_number',
			   						line: i
			   					});
							   	resultLine.ticketNum  = xml.escape({
							   	xmlText : resultLine.ticketNum
							   	});

			   					resultLine.driver = soRec.getSublistText({
			   						sublistId: 'item',
			   						fieldId: 'custcol_oms_sales_order_driver',
			   						line: i
			   					});
			   					resultLine.driver = xml.escape({
			   						xmlText : resultLine.driver
			   					});

			   					resultLine.description = soRec.getSublistValue({
			   						sublistId: 'item',
			   						fieldId: 'description',
			   						line: i
			   					});
			   					resultLine.description = xml.escape({
			   						xmlText : resultLine.description
			   					});

			   					resultLine.scaleNum = soRec.getSublistValue({
								   	sublistId: 'item',
								   	fieldId: 'custcol_fmt_scale_number',
								   	line: i
			   					});
							   	resultLine.grossWgt = soRec.getSublistValue({
								   	sublistId: 'item',
								   	fieldId: 'custcol_fmt_gross_weight',
								   	line: i
							   	});
							   	resultLine.tareWtg = soRec.getSublistValue({
								   	sublistId: 'item',
								   	fieldId: 'custcol_tare_weight',
								   	line: i
							   	});
							   	resultLine.NetWgt = soRec.getSublistValue({
								   	sublistId: 'item',
								   	fieldId: 'custcol_fmt_net_weight',
								   	line: i
							   	});
						   						   	
							   	resultData.lines.push(resultLine);

									}

			   					
							   	}
							}// End of If Item condition
						}//End of For loop of soLineCount
					}// End of LoadReptPref PDF Condition
				} // End checkbox condition
			}// End of context.values.length for loop
			
			log.debug('resultData====>' , JSON.stringify(resultData));
			if (LoadReptPref == '2') {
				createCustomRecordSO(idArr,tranCustName, tranAmt, numTck, LoadReptPref, lineOne, searchVal, Auth_ID, PDFID, CSVID, resultData, CustEmail_ID, CustEmail_Weekly_ID, CustEmail_Monthly_ID, tempID, items,startdate,enddate);
			}

			if (LoadReptPref == '1') {
			try {
					nameText = nameText.toString().trim();
					lineOne += nameText + '\n';
			   		lineOne += 'Date' + ',' + 'Ticket' + ',' + '# Driver' + ',' + 'Description' + ',' + 'Scale Tkt #' + ',' + 'Gross Wt' + ',' + 'Tare Wt' + ',' + 'Net Wt' + ',' + '#Lds' //splitValue[i] + ',';

			   		// Looping through the content array and assigning it to the contents string variable.
			   		lineOne = lineOne + '\n';
			   		for (var j = 0; j < content.length; j++) {
			   			lineOne += content[j].toString();
			   		}

			   		createCustomRecordSO(idArr,tranCustName, tranAmt, numTck, LoadReptPref, lineOne, searchVal, Auth_ID, PDFID, CSVID, resultData, CustEmail_ID, CustEmail_Weekly_ID, CustEmail_Monthly_ID, tempID, items,startdate,enddate);
				} catch (e) {
					log.audit('ERROR======> ', e.toString());
				}	
			}
		} catch (e) {
			log.debug('Error in Reduce Function', e.toString());
		}
	}

	function summarize(summary) {
	
		log.debug('Summary Time', 'Total Seconds: ' + summary.seconds);
		log.debug('Summary Usage', 'Total Usage: ' + summary.usage);
		log.debug('Summary Yields', 'Total Yields: ' + summary.yields);

		log.debug('Input Summary: ', JSON.stringify(summary.inputSummary));
		log.debug('Map Summary: ', JSON.stringify(summary.mapSummary));
		log.debug('Reduce Summary: ', JSON.stringify(summary.reduceSummary));

		//Grab Map errors
		summary.mapSummary.errors.iterator().each(function(key, value) {
		log.error(key, 'ERROR String: ' + value);
		 	return true;
		});
	}
function date_compare(Date_1,Date_2,Date_to_check){
		
		var flag = false;
		var Date_1 = format.parse({
       value: Date_1,
       type: format.Type.DATE
		});
		var Date_2 = format.parse({
       value: Date_2,
       type: format.Type.DATE
		});
		var Date_to_check = format.parse({
       value: Date_to_check,
       type: format.Type.DATE
		});

	 if (Date_to_check.getTime() <= Date_2.getTime() && Date_to_check.getTime() >= Date_1.getTime()) {
        flag = true;
    } else {
        flag = false;
    }
 		
		return flag;
}
function getlinkID(searchVal){
	
	var column_linkid = '';
	if(searchVal == 'customsearch_fmt_daily_load_report_sear'){

		column_linkid = 'custcol_fmt_load_report_link_line';
	}
	if(searchVal == 'customsearch_fmt_weekly_load_report_sea'){

		column_linkid = 'custcol_fmt_weekly_line_load_report_';
	}
	if(searchVal == 'customsearch_fmt_monthly_load_report_sea'){

		column_linkid = 'custcol_fmt_monthly_line_load_report';
	}
	return column_linkid;
}
	function createCustomRecordSO(idArr,tranCustName, tranAmt, numTck, LoadReptPref, lineOne, searchVal, Auth_ID, PDFID, CSVID, resultData, CustEmail_ID, CustEmail_Weekly_ID, CustEmail_Monthly_ID, tempID, items,startdate,enddate) {
	try {
			if (LoadReptPref == '1') {
				var csvFile = file.create({
					name: 'Denali Terra Load Report-' + new Date().getTime() + '.csv',
					fileType: file.Type.CSV,
					contents: lineOne,
		   			folder: CSVID // Folder ID where the file should be saved in the File Cabinet for CSV
				});

				var csvFileID = csvFile.save();
			}
			if (LoadReptPref == '2') {
				var renderer = render.create();
				renderer.setTemplateByScriptId({
					scriptId: 'CUSTTMPL_FMT_LOAD_REPORT'
				});

				renderer.addCustomDataSource({
					format: render.DataSource.OBJECT,
					alias: "JSON",
					data: {
						data: resultData
					}
				});

				if (resultData) {
					var invoicePdf = renderer.renderAsPdf();
				}

				invoicePdf.name = 'Denali Terra Load Report-' + new Date().getTime() + '.pdf';
		 		invoicePdf.folder = PDFID; // Folder ID where the file should be saved in the File Cabinet for PDF
				var fileId = invoicePdf.save();
			}

			for(var q =0; q<items.length; q++){ // loop for sales order 
				var tranID = parseInt(items[q]);

				//Create Custom Record 
				var createRec = record.create({
					type: 'customrecord_fmt_dt_load_report',
					isDynamic: true
				});

			    //Set values in custom record
			    createRec.setValue({
			   		fieldId: 'custrecord_fmt_load_report_customer',
			   		value: xml.escape(tranCustName)
			    });

			   	createRec.setValue({
				   	fieldId: 'custrecord_fmt_total_amount_load_report',
				   	value: tranAmt
			   	});

			   	createRec.setValue({
				   	fieldId: 'custrecord_fmt_parent_sales_o',
				   	value: tranID
			   	});

			    createRec.setValue({
				   	fieldId: 'custrecord_fmt_number_tickets',
				   	value: numTck
			    });

			    if(startdate)
			    {
			    	startdate = format.parse({
				   	value: startdate,
				   	type: format.Type.DATE
				    })

				    createRec.setValue({
					   	fieldId: 'custrecord_fmt_beg_date_load_report',
					   	value: startdate
				    });

			    }
			    
			    if(enddate)
			    {
			    	enddate = format.parse({
				   	value: enddate,
				   	type: format.Type.DATE
				    })

				    createRec.setValue({
					   	fieldId: 'custrecord_fmt_end_date_load_report',
					   	value: enddate
				    });
			    }
			    

			   	if(csvFileID){
				   	createRec.setValue({
				   		fieldId: 'custrecord_fmt_load_report_documentatio',
				   		value: csvFileID
				   	});
	   			}
	   			if(fileId){
				   	createRec.setValue({
				   		fieldId: 'custrecord_fmt_load_report_documentatio',
				   		value: fileId
				   	});
	   			}
	   			var recordId = createRec.save(); // Save custom record
	  			updateSaleOrders(idArr,tranID, tranCustName, LoadReptPref, lineOne, tempID, Auth_ID, CSVID, csvFileID, items, recordId, fileId, CustEmail_ID, CustEmail_Weekly_ID, CustEmail_Monthly_ID, searchVal,startdate,enddate)
			}// End of For loop of items.length

			SendEmailtoCustomer(tranID, tranCustName, LoadReptPref, lineOne, tempID, Auth_ID, CSVID, csvFileID, fileId, CustEmail_ID, CustEmail_Weekly_ID, CustEmail_Monthly_ID, searchVal);
		} catch (e){
			log.debug('ERROR IN Custom Record Creation', e.toString());
		}
	}

	function updateSaleOrders(idArr,tranID, tranCustName, LoadReptPref, lineOne, tempID, Auth_ID, CSVID, csvFileID, items, recordId, fileId, CustEmail_ID, CustEmail_Weekly_ID, CustEmail_Monthly_ID, searchVal,startdate,enddate) {
	try {
		if ((searchVal == 'customsearch_fmt_daily_load_report_sear')){
			if(recordId){
				for(var daily=0; daily < idArr.length; daily++)
				{
					var IDVal = idArr[daily];
					var soObj = record.load({
		 				type: record.Type.SALES_ORDER,
		 				id: IDVal
		 			});

					var lineCount = soObj.getLineCount({
					   		'sublistId': 'item'
					});

					for(var dailyCnt=0;dailyCnt<lineCount;dailyCnt++)
					{
						var loadReportLink = soObj.getSublistValue({sublistId: 'item', fieldId: 'custcol_fmt_load_report_link_line', line: dailyCnt});
	 					
	 					if(!loadReportLink)
	 					{
	 						var myItems = soObj.getSublistValue({
								sublistId: 'item',
							 	fieldId: 'item',
							 	line: dailyCnt
							});

				 			if(myItems != 1529 && myItems != 1550){
				 				soObj.setSublistValue({
								    sublistId: 'item',
								    fieldId: 'custcol_fmt_load_report_link_line',
								    line: dailyCnt,
								    value: recordId
								});
				 			}	
	 					}	
					}
					soObj.save({
						enableSourcing: true,
						ignoreMandatoryFields: true
					});
				}
			}		
		}

	   	if ((searchVal == 'customsearch_fmt_weekly_load_report_sea')) // Weekly email send out for customer 
	   	{
	   		if(recordId){
	   			for(var week=0; week < idArr.length; week++)
				{
					var idVal = idArr[week];
					var soObj = record.load({
		 				type: record.Type.SALES_ORDER,
		 				id: idVal
		 			});

					var lineCount = soObj.getLineCount({
					   		'sublistId': 'item'
					});

					for(var weekCnt=0; weekCnt < lineCount; weekCnt++)
	   				{
		   				var loadReportLinkWeek = soObj.getSublistValue({sublistId: 'item', fieldId: 'custcol_fmt_weekly_line_load_report_', line: weekCnt});
	 					if(!loadReportLinkWeek)
	 					{
	 						var myItems = soObj.getSublistValue({
								sublistId: 'item',
							 	fieldId: 'item',
							 	line: weekCnt
							});
							
				 			if(myItems != 1529 && myItems != 1550){
				 				soObj.setSublistValue({
								    sublistId: 'item',
								    fieldId: 'custcol_fmt_weekly_line_load_report_',
								    line: weekCnt,
								    value: recordId
								});
				 			}
	 					}
	   				}
		   			soObj.save({
						enableSourcing: true,
						ignoreMandatoryFields: true
					});
				}
	   		}
	   	}
	   	if ((searchVal == 'customsearch_fmt_monthly_load_report_sea')) // Monthly email send out for customer
	   	{
	   		if(recordId){
	   		var flag = false;
	   		for(var month=0; month < idArr.length; month++)
				{
					var idVal = idArr[month];
					var soObj = record.load({
		 				type: record.Type.SALES_ORDER,
		 				id: idVal
		 			});
					var lineCount = soObj.getLineCount({
					   		'sublistId': 'item'
					});
					
					log.debug('lineCount ====>',lineCount);

					for(var monthCnt=0; monthCnt <lineCount; monthCnt++)
	   				{
		   				var loadReportLinkMonth = soObj.getSublistValue({sublistId: 'item', fieldId: 'custcol_fmt_monthly_line_load_report', line: monthCnt});
		   							
	 					if(!loadReportLinkMonth)
	 					{
	 						var myItems = soObj.getSublistValue({
								sublistId: 'item',
							 	fieldId: 'item',
							 	line: monthCnt
							});
							log.debug('myItems ====>',myItems);
				 			if(myItems != 1529 && myItems != 1550){

				 				var line_date = soObj.getSublistValue({
							 		sublistId: 'item',
							 		fieldId: 'custcol11',
							 		line: monthCnt
							 	});
				 				var new_line_date = (line_date.getMonth() + 1) + '/' + line_date.getDate() + '/' + line_date.getFullYear();
								flag = date_compare(startdate,enddate,new_line_date);
								log.debug('flag ====>',flag);
								if(flag != false){

										soObj.setSublistValue({
									    sublistId: 'item',
									    fieldId: 'custcol_fmt_monthly_line_load_report',
									    line: monthCnt,
									    value: recordId
									});
									}
				 				
				 				}
	 						}
	   				}
		   			soObj.save({
						enableSourcing: true,
						ignoreMandatoryFields: true
					});
				}
	   		}
		}

		} catch (ex) {
			log.debug('ERROR IN Sales order record Update', ex.toString());
		}
	}
	
	function searchAll(resultset) {
		var allResults = [];
		var startIndex = 0;
		var RANGECOUNT = 1000;

		do {
			var pagedResults = resultset.getRange({
				start: parseInt(startIndex),
				end: parseInt(startIndex + RANGECOUNT)
			});

			allResults = allResults.concat(pagedResults);
	            var pagedResultsCount = pagedResults != null ? pagedResults.length : 0;
	            startIndex += pagedResultsCount;

	            var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
	    }
		while (pagedResultsCount == RANGECOUNT);
			var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
	        return allResults;
    }

	function SendEmailtoCustomer(tranID, tranCustName, LoadReptPref, lineOne, tempID, Auth_ID, CSVID, csvFileID, fileId, CustEmail_ID, CustEmail_Weekly_ID, CustEmail_Monthly_ID, searchVal) {
    try {
			var transactionId = parseInt(tranID);
	   	
	   		var mergeResult = render.mergeEmail({
		   		templateId: tempID,
		   		entity: null,
		   		recipient: null,
		   		supportCaseId: null,
		   		transactionId: transactionId,
		   		customRecord: null
	   		});

	   		var emailSubject = mergeResult.subject;
	   		var emailBody = mergeResult.body;
	   		var entity = tranCustName;

	   		emailBody = emailBody.replace("NLCUSTOMERNAME", entity);

	   		if (LoadReptPref == '1') // CSV email send code 
	   		{
				var csvFile = file.load({
	   				id: csvFileID
	   			});

				if ((searchVal == 'customsearch_fmt_daily_load_report_sear') && (CustEmail_ID)) {
					email.send({
					   	author: Auth_ID,
					   	recipients: CustEmail_ID,
					   	subject: emailSubject,
					   	body: emailBody,
					   	attachments: [csvFile],
					   	relatedRecords: {
					   		entityId: tranCustName
				   		}
				   });
				}
				if ((searchVal == 'customsearch_fmt_weekly_load_report_sea') && (CustEmail_Weekly_ID)) {
				    email.send({
					   	author: Auth_ID,
					   	recipients: CustEmail_Weekly_ID,
					   	subject: emailSubject,
					   	body: emailBody,
					   	attachments: [csvFile],
					   	relatedRecords: {
					   		entityId: tranCustName
					   	}
				    });
				}
				if ((searchVal == 'customsearch_fmt_monthly_load_report_sea') && (CustEmail_Monthly_ID)) {
					email.send({
					   	author: Auth_ID,
					   	recipients: CustEmail_Monthly_ID,
					   	subject: emailSubject,
					   	body: emailBody,
					   	attachments: [csvFile],
					   	relatedRecords: {
					   		entityId: tranCustName
					   	}
				   	});
				}
			}

	  		if (LoadReptPref == '2') // PDF email send code 
	   		{
			   	var fileObj = file.load({
			   		id: fileId
			   	});
			   	var transactionFile = fileObj;

	   			if ((searchVal == 'customsearch_fmt_daily_load_report_sear') && (CustEmail_ID)) {
					email.send({
			   			author: Auth_ID,
			   			recipients: CustEmail_ID,
			   			subject: emailSubject,
			   			body: emailBody,
			   			attachments: [transactionFile],
			   			relatedRecords: {
			   				entityId: tranCustName
			   			}
			   		});
	   			}
	   			if ((searchVal == 'customsearch_fmt_weekly_load_report_sea') && (CustEmail_Weekly_ID)) {
					email.send({
			   			author: Auth_ID,
			   			recipients: CustEmail_Weekly_ID,
			   			subject: emailSubject,
			   			body: emailBody,
			   			attachments: [transactionFile],
			   			relatedRecords: {
			   				entityId: tranCustName
			   			}
		   			});
				}
	   			if ((searchVal == 'customsearch_fmt_monthly_load_report_sea') && (CustEmail_Monthly_ID)) {
					email.send({
					   	author: Auth_ID,
					   	recipients: CustEmail_Monthly_ID,
					   	subject: emailSubject,
					   	body: emailBody,
					   	attachments: [transactionFile],
					   	relatedRecords: {
					   		entityId: tranCustName
					   	}
				   	});
				}
			}
		} catch (monthlyError) {
			log.debug('ERROR IN SendEmailtoCustomer ====> ', monthlyError);
		}
	}
	return {
		getInputData: getInputData,
		map: map,
		reduce: reduce,
		summarize: summarize
	}
});
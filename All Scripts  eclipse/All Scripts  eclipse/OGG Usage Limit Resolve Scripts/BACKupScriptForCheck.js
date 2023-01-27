function PATIntegration(type)
{
	var context = nlapiGetContext();
	var PinCounter = '';
	var UsageEnd = '';
	
	
	  var currentDate = new Date()
	  var offsetIST = 5.5;
	  
	  //To convert to UTC datetime by subtracting the current Timezone offset
	  var utcdate = new Date(currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000));
	 // nlapiLogExecution('DEBUG', 'context', 'utcdate' + utcdate);
	  
	  //Then cinver the UTS date to the required time zone offset like back to 5.5 for IST
	  var istdate = new Date(utcdate.getTime() - ((-offsetIST * 60) * 60000));
	 //nlapiLogExecution('DEBUG', 'context', 'istdate' + istdate);
	  
	  var day = istdate.getDate()
	  var month = istdate.getMonth() + 1
	  var year = istdate.getFullYear()
	  var hr = istdate.getHours()
	 // hr = hr - 1;  
	  var min = istdate.getMinutes() 
	  var sec = istdate.getSeconds();
	 			
	  
	  var dateToday = year + "-" + month + "-" + day + ' ' +hr+':'+min+':'+sec;
	  nlapiLogExecution('DEBUG', 'context', 'dateToday' + dateToday);
	  
	  //Format Space with %20
	  dateToday = formatAndReplaceSpaces(dateToday);	
	  nlapiLogExecution('DEBUG', 'context', 'dateToday' + dateToday);
	  
	var UserPassword = 'NetSuiteService1';
	var WebUrl = 'https://www.maxaid.org/netsuitefeed/netsuitefeed.asmx/CustomerMaster?Password='+UserPassword+'&ReferenceDate='+dateToday;
	var sendSMSResponse = '';
	var sendSMSResponseCode = '';
	var sendSMSResponseBody = '';
	var UserName = '';
	
	var ScheduleTime = '2013-5-28%2016:00:00';// "2013-2-20T00:13:00"
	
	var smsresposnetostring = '';
	var smsresp = '';
	var allNodes = '';
	var papCd = new Array();
	var Pin = new Array();
	var Name = new Array();
	var Street1 = new Array();
	var Street2 = new Array(); 
	var PostalCode = new Array();
	var City = new Array();
	var StateProvince = new Array();
	var Phone = new Array();
	var Mobile = new Array();
	var Physician = new Array();
	var FLName = '';
	var FirstName = '';
	var LastName = '';
	
	// Call URL by api nlapiRequestURL.		
	sendSMSResponse = nlapiRequestURL(WebUrl,null,null,null,'GET');
	//nlapiLogExecution('DEBUG','After Submit', "  sendSMSResponse =====" + sendSMSResponse);
	
	
	// Get the HTTP code number
	sendSMSResponseCode = sendSMSResponse.getCode();
	nlapiLogExecution('DEBUG','After Submit', "  sendSMSResponseCode =====" + sendSMSResponseCode);
	
	
	// Get the Server response
	//sendSMSResponseBody = sendSMSResponse.getBody();
	//nlapiLogExecution('DEBUG','After Submit', "  sendSMSResponseBody =====" + sendSMSResponseBody);
	
	// Check the HTTP server response
	if (sendSMSResponseCode == '200') 
	{
			// Get the Server response
			sendSMSResponseBody = sendSMSResponse.getBody();
			nlapiLogExecution('DEBUG', 'After Submit', "  sendSMSResponseBody =====" + sendSMSResponseBody);
			nlapiLogExecution('DEBUG', 'After Submit', "  sendSMSResponseBody length =====" + sendSMSResponseBody.length);
			
			// Converts the Get Body Content into String
			smsresposnetostring = new String(sendSMSResponseBody);
			nlapiLogExecution('DEBUG', 'After Submit', "  sendSMSResponseBody content=== =====" + smsresposnetostring);
			
			nlapiEscapeXML(smsresposnetostring)
			nlapiLogExecution('DEBUG', 'After Submit', "  smsresp replace get sms respons=====" + nlapiEscapeXML(smsresposnetostring));
			
			// Converts the getBody String into XML Document
			smsresp = nlapiStringToXML(smsresposnetostring);
			nlapiLogExecution('DEBUG', 'After Submit', "  smsresp =====" + smsresp);
			
			// Selects the Perticular Node From where we need to fetch the content
			allNodes = nlapiSelectNodes(smsresp, "//Table1");
			nlapiLogExecution('DEBUG', 'After Submit', "  allNodes =====" + allNodes);
			nlapiLogExecution('DEBUG', 'After Submit', "  allNodes length =====" + allNodes.length);
			
			for(var i=0;i<allNodes.length;i++)
			{
				// To Fetch Content From Node
				papCd[i] = nlapiSelectValue(allNodes[i], "papCd");
				nlapiLogExecution('DEBUG', 'After Submit', "  papCd[i] =====" + nlapiEscapeXML(new String(papCd[i])));
				
				// To Fetch Content From Node
				Pin[i] = nlapiSelectValue(allNodes[i], "Pin");
				nlapiLogExecution('DEBUG', 'After Submit', "  Pin[i] =====" + nlapiEscapeXML(new String(Pin[i])));
				
				// To Fetch Content From Node
				Name[i] = nlapiSelectValue(allNodes[i], "Name");
				nlapiLogExecution('DEBUG', 'After Submit', "  Name[i] =====" + nlapiEscapeXML(new String(Name[i])));
				
				if(Name[i] != '' && Name[i] != 'undefined' && Name[i] != null)
				{
					FLName = Name[i].split(" ");
				
					FirstName = FLName[0];
					
					if(FLName.length > 1)
					{
						for(var s=1; s<FLName.length;s++)
						{
							LastName = LastName + FLName[s];
						}
					}
					else
					{
						LastName = '.';
					}
				} //End of Customer Name Not Empty
				
				// To Fetch Content From Node
				Street1[i] = nlapiSelectValue(allNodes[i], "Street1");
				nlapiLogExecution('DEBUG', 'After Submit', "  Street1[i] =====" + nlapiEscapeXML(new String(Street1[i])));
				
				// To Fetch Content From Node
				Street2[i] = nlapiSelectValue(allNodes[i], "Street2");
				nlapiLogExecution('DEBUG', 'After Submit', "  Street2[i] =====" + nlapiEscapeXML(new String(Street2[i])));
				
				// To Fetch Content From Node
				PostalCode[i] = nlapiSelectValue(allNodes[i], "PostalCode");
				nlapiLogExecution('DEBUG', 'After Submit', "  PostalCode[i] =====" + nlapiEscapeXML(new String(PostalCode[i])));
				
				// To Fetch Content From Node
				City[i] = nlapiSelectValue(allNodes[i], "City");
				nlapiLogExecution('DEBUG', 'After Submit', "  City[i] =====" + nlapiEscapeXML(new String(City[i])));
				
				// To Fetch Content From Node
				StateProvince[i] = nlapiSelectValue(allNodes[i], "StateProvince");
				nlapiLogExecution('DEBUG', 'After Submit', "  StateProvince[i] =====" + nlapiEscapeXML(new String(StateProvince[i])));
				
				// To Fetch Content From Node
				Phone[i] = nlapiSelectValue(allNodes[i], "Phone");
				nlapiLogExecution('DEBUG', 'After Submit', "  Phone[i] =====" + nlapiEscapeXML(new String(Phone[i])));
				
				// To Fetch Content From Node
				Mobile[i] = nlapiSelectValue(allNodes[i], "Mobile");
				nlapiLogExecution('DEBUG', 'After Submit', "  Mobile[i] =====" + nlapiEscapeXML(new String(Mobile[i])));
				
				// To Fetch Content From Node
				Physician[i] = nlapiSelectValue(allNodes[i], "Physician");
				nlapiLogExecution('DEBUG', 'After Submit', "  Physician[i] =====" + nlapiEscapeXML(new String(Physician[i])));
				
				//To Recheck The PIN Number If Script is ReScheduled.
				PinCounter = context.getSetting('SCRIPT', 'custscript_pincounter');
				if (PinCounter != null && PinCounter != '' && PinCounter != 'undefined') 
				{
					if(Pin[i] == PinCounter)
					{
						var filters = new Array();
					    var columns = new Array();
					    var InternalId;
					    filters[0] = new nlobjSearchFilter('custentity_customerpin', null, 'is', Pin[i]);
					    columns[0] = new nlobjSearchColumn('internalid'); 
					    columns[1] = new nlobjSearchColumn('custentity_customerpin'); 
						 
					    var searchResultItem = nlapiSearchRecord('customer', null, filters, columns);
					 
					    if (searchResultItem != null) 
					    {
						   for (var j = 0; searchResultItem != null && j < searchResultItem.length; j++)
						   {
						    	InternalId = searchResultItem[j].getValue('internalid');
						    
						    	if(InternalId != '' && InternalId != 'undefined' && InternalId != null)
								{
									CustRecordObj = nlapiLoadRecord('customer',InternalId);
									
									if(Pin[i] != '' && Pin[i] != 'undefined' && Pin[i] != null)
									{
										CustRecordObj.setFieldValue('custentity_customerpin',Pin[i]);
									}
									if(Name[i] != '' && Name[i] != 'undefined' && Name[i] != null)
									{
										CustRecordObj.setFieldValue('firstname',FirstName);
										CustRecordObj.setFieldValue('lastname',LastName);
									}
									if(Street1[i] != '' && Street1[i] != 'undefined' && Street1[i] != null)
									{
										CustRecordObj.setFieldValue('addr1',Street1[i]);
									}
									if(Street2[i] != '' && Street2[i] != 'undefined' && Street2[i] != null)
									{
										CustRecordObj.setFieldValue('addr2',Street2[i]);
									}
									if(PostalCode[i] != '' && PostalCode[i] != 'undefined' && PostalCode[i] != null)
									{
										CustRecordObj.setFieldValue('zip',PostalCode[i]);
									}
									if(City[i] != '' && City[i] != 'undefined' && City[i] != null)
									{
										CustRecordObj.setFieldValue('city',City[i]);
									}
									if(StateProvince[i] != '' && StateProvince[i] != 'undefined' && StateProvince[i] != null)
									{
										CustRecordObj.setFieldValue('state',StateProvince[i]);
									}
									if(Phone[i] != '' && Phone[i] != 'undefined' && Phone[i] != null)
									{
										CustRecordObj.setFieldValue('phone',Phone[i]);
									}
									if(Mobile[i] != '' && Mobile[i] != 'undefined' && Mobile[i] != null)
									{
										CustRecordObj.setFieldValue('mobilephone',Mobile[i]);
									}
									if(Physician[i] != '' && Physician[i] != 'undefined' && Physician[i] != null)
									{
										CustRecordObj.setFieldValue('custentity_doctorname',Physician[i]);
									}
									
									nlapiSubmitRecord(CustRecordObj,true,true);//submit record
									
								}//End of if(internalid of customer not NULL)
						   }//End of for loop of the customer record search
					    }//End if Search Result != Null (i.e Record exist in Netsuite for updation)
						else
						{
							//To Create New Customer Record Entry
							CustRecordObj = nlapiCreateRecord('customer');
							
							if(Pin[i] != '' && Pin[i] != 'undefined' && Pin[i] != null)
							{
								CustRecordObj.setFieldValue('custentity_customerpin',Pin[i]);
							}
							if(Name[i] != '' && Name[i] != 'undefined' && Name[i] != null)
							{
								CustRecordObj.setFieldValue('firstname',FirstName);
								CustRecordObj.setFieldValue('lastname',LastName);
							}
							if(Street1[i] != '' && Street1[i] != 'undefined' && Street1[i] != null)
							{
								CustRecordObj.setFieldValue('addr1',Street1[i]);
							}
							if(Street2[i] != '' && Street2[i] != 'undefined' && Street2[i] != null)
							{
								CustRecordObj.setFieldValue('addr2',Street2[i]);
							}
							if(PostalCode[i] != '' && PostalCode[i] != 'undefined' && PostalCode[i] != null)
							{
								CustRecordObj.setFieldValue('zip',PostalCode[i]);
							}
							if(City[i] != '' && City[i] != 'undefined' && City[i] != null)
							{
								CustRecordObj.setFieldValue('city',City[i]);
							}
							if(StateProvince[i] != '' && StateProvince[i] != 'undefined' && StateProvince[i] != null)
							{
								CustRecordObj.setFieldValue('state',StateProvince[i]);
							}
							if(Phone[i] != '' && Phone[i] != 'undefined' && Phone[i] != null)
							{
								CustRecordObj.setFieldValue('phone',Phone[i]);
							}
							if(Mobile[i] != '' && Mobile[i] != 'undefined' && Mobile[i] != null)
							{
								CustRecordObj.setFieldValue('mobilephone',Mobile[i]);
							}
							if(Physician[i] != '' && Physician[i] != 'undefined' && Physician[i] != null)
							{
								CustRecordObj.setFieldValue('custentity_doctorname',Physician[i]);
							}
							
							nlapiSubmitRecord(CustRecordObj,true,true);//submit record
							
						}//End of Else Part (To Create New Customer) 
					}//End of if(PIN[i]==PinCounter)
				}//End of if(pincounter != null)
				
				//Code When Script Runs Normally i.e Script is not scheduled.
				else
				{
					var filters = new Array();
				    var columns = new Array();
				    var InternalId;
				    filters[0] = new nlobjSearchFilter('custentity_customerpin', null, 'is', Pin[i]);
				    columns[0] = new nlobjSearchColumn('internalid'); 
				    columns[1] = new nlobjSearchColumn('custentity_customerpin'); 
					 
				    var searchResultItem = nlapiSearchRecord('customer', null, filters, columns);
				 
				    if (searchResultItem != null) 
				    {
					   for (var j = 0; searchResultItem != null && j < searchResultItem.length; j++)
					   {
					    	InternalId = searchResultItem[j].getValue('internalid');
					    
					    	if(InternalId != '' && InternalId != 'undefined' && InternalId != null)
							{
								CustRecordObj = nlapiLoadRecord('customer',InternalId);
								
								if(Pin[i] != '' && Pin[i] != 'undefined' && Pin[i] != null)
								{
									CustRecordObj.setFieldValue('custentity_customerpin',Pin[i]);
								}
								if(Name[i] != '' && Name[i] != 'undefined' && Name[i] != null)
								{
									CustRecordObj.setFieldValue('firstname',FirstName);
									CustRecordObj.setFieldValue('lastname',LastName);
								}
								if(Street1[i] != '' && Street1[i] != 'undefined' && Street1[i] != null)
								{
									CustRecordObj.setFieldValue('addr1',Street1[i]);
								}
								if(Street2[i] != '' && Street2[i] != 'undefined' && Street2[i] != null)
								{
									CustRecordObj.setFieldValue('addr2',Street2[i]);
								}
								if(PostalCode[i] != '' && PostalCode[i] != 'undefined' && PostalCode[i] != null)
								{
									CustRecordObj.setFieldValue('zip',PostalCode[i]);
								}
								if(City[i] != '' && City[i] != 'undefined' && City[i] != null)
								{
									CustRecordObj.setFieldValue('city',City[i]);
								}
								if(StateProvince[i] != '' && StateProvince[i] != 'undefined' && StateProvince[i] != null)
								{
									CustRecordObj.setFieldValue('state',StateProvince[i]);
								}
								if(Phone[i] != '' && Phone[i] != 'undefined' && Phone[i] != null)
								{
									CustRecordObj.setFieldValue('phone',Phone[i]);
								}
								if(Mobile[i] != '' && Mobile[i] != 'undefined' && Mobile[i] != null)
								{
									CustRecordObj.setFieldValue('mobilephone',Mobile[i]);
								}
								if(Physician[i] != '' && Physician[i] != 'undefined' && Physician[i] != null)
								{
									CustRecordObj.setFieldValue('custentity_doctorname',Physician[i]);
								}
								
								
								nlapiSubmitRecord(CustRecordObj,true,true);//submit record
							}
					   }
				    }
					else
					{
						//To Create New Customer Record Entry
						CustRecordObj = nlapiCreateRecord('customer');
						
						if(Pin[i] != '' && Pin[i] != 'undefined' && Pin[i] != null)
						{
							CustRecordObj.setFieldValue('custentity_customerpin',Pin[i]);
						}
						if(Name[i] != '' && Name[i] != 'undefined' && Name[i] != null)
						{
							CustRecordObj.setFieldValue('firstname',FirstName);
							CustRecordObj.setFieldValue('lastname',LastName);
						}
						if(Street1[i] != '' && Street1[i] != 'undefined' && Street1[i] != null)
						{
							CustRecordObj.setFieldValue('addr1',Street1[i]);
						}
						if(Street2[i] != '' && Street2[i] != 'undefined' && Street2[i] != null)
						{
							CustRecordObj.setFieldValue('addr2',Street2[i]);
						}
						if(PostalCode[i] != '' && PostalCode[i] != 'undefined' && PostalCode[i] != null)
						{
							CustRecordObj.setFieldValue('zip',PostalCode[i]);
						}
						if(City[i] != '' && City[i] != 'undefined' && City[i] != null)
						{
							CustRecordObj.setFieldValue('city',City[i]);
						}
						if(StateProvince[i] != '' && StateProvince[i] != 'undefined' && StateProvince[i] != null)
						{
							CustRecordObj.setFieldValue('state',StateProvince[i]);
						}
						if(Phone[i] != '' && Phone[i] != 'undefined' && Phone[i] != null)
						{
							CustRecordObj.setFieldValue('phone',Phone[i]);
						}
						if(Mobile[i] != '' && Mobile[i] != 'undefined' && Mobile[i] != null)
						{
							CustRecordObj.setFieldValue('mobilephone',Mobile[i]);
						}
						if(Physician[i] != '' && Physician[i] != 'undefined' && Physician[i] != null)
						{
							CustRecordObj.setFieldValue('custentity_doctorname',Physician[i]);
						}
						
						
						nlapiSubmitRecord(CustRecordObj,true,true);//submit record
					}
				}
			    
				UsageEnd = context.getRemainingUsage();
				nlapiLogExecution('DEBUG', 'schedulerFunction', 'Usage At End [' + i + '] -->' + UsageEnd);
				if (UsageEnd < 100) 
				{
					Schedulescriptafterusageexceeded(Pin[i]);
					break;
				}
			}//End of Main For Loop 
	}//End of Send SMSResponse Code
	else 
	{
		nlapiLogExecution('DEBUG', 'After Submit', "  Login Failed -- Incorrect Password Or Date/Time Format =====");
	}
						
}//main function ends here

// --------------------- Function written for getting the salutation for customer ------------------------ //
function nullFieldValidation(fieldBalnk)
{
	var blankAdd='';
	if(fieldBalnk==null || fieldBalnk=='undefined')
	{
		blankAdd='';
	}
	else
	{
		blankAdd=fieldBalnk;
	}
	
	return blankAdd;
}
// ---------------------- End of Function written for getting the salutation for customer ---------------- //

// BEGIN Schedulescriptafterusageexceeded FUNCTION ==================================================
function Schedulescriptafterusageexceeded(i)
{
	//Define all parameters to schedule the script for voucher generation.
	 var params=new Array();
	 params['status']='scheduled';
 	 params['runasadmin']='T';
	 params['custscript_pincounter']=i;
	 
	 var startDate = new Date();
 	 params['startdate']=startDate.toUTCString();
	
	 var status=nlapiScheduleScript(nlapiGetContext().getScriptId(), nlapiGetContext().getDeploymentId(),params);
	 nlapiLogExecution('DEBUG','After Scheduling','Script Scheduled Status-->'+ status);
	 
	 //If Script Is Scheduled Successfuly Then Check for Status = Queued
	 if (status == 'QUEUED') 
 	 {
		nlapiLogExecution('DEBUG', 'RESCHEDULED', '******************** Script Is Rescheduled For Record ************'+i);
 	 }
}//fun close

// ====================================== Formatting string as request URL want =========================================================//
function formatAndReplaceSpaces(content)
{
	// Convert into string
	content = content.toString();
	nlapiLogExecution('DEBUG','After Submit', "  content.toString() =====" + content);
	
	// Replace all spaces by %20 as requiremnt of URL 
	content = content.replace(/ /g,'%20');/// /g
	nlapiLogExecution('DEBUG','After Submit', " Replcing spaces with % =====" + content);
	
	// Return the formatted string
	return content;
}
// ====================================== End of Formatting string as request URL want ==================================================//

/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Apr 2020     Shivraj
 *
 */

function userEventBeforeLoad(type, form, request)
{ 
}
function userEvent_ir_delete(type)
{
	try
	{
		
		var recID = nlapiGetRecordId();
		var recType = nlapiGetRecordType();
		var ir_ItemArr = new Array();
		var ir_ItemLocArr = new Array();
		
		var itemRcptObj = nlapiLoadRecord(recType,recID);
		//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' Type : ' + recType + ' ID : ' + recID);
		
		var forIntercompany = itemRcptObj.getFieldValue('custbody_for_intercompany');
		//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' forIntercompany : ' + forIntercompany);// + ' ID : ' + recID);
		
		var context = nlapiGetContext().getExecutionContext();
		nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','context = '+context);
		
		if((forIntercompany =='T') && (context =='userinterface')&& (type =='delete'))
		{
			var createdfrm = itemRcptObj.getFieldValue('createdfrom');
			//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' createdfrm : ' + createdfrm);
		
			var itemLineCount = itemRcptObj.getLineItemCount('item');
			//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' itemLineCount : ' + itemLineCount);
					
				var myParams = new Array();					
				myParams['custscript_ir_save_rec_id'] = recID;
				myParams['custscript_type'] = type;
					
			nlapiScheduleScript("customscript_ir_save_custom_rec_create","customdeploy_ir_save_custom_rec_create", myParams);
				
				
		}
	
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','usEBeforeSubmit_Itercompany',' exe : ' + e);
	}


}


function usEAfterSubmit_Itercompany(type)
{
	try
	{
		var userId = nlapiGetUser();
		//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' userId : ' + userId);
				
		//if(userId==24 || userId==11770 || userId==-5)
		{
			var recID = nlapiGetRecordId();
			var recType = nlapiGetRecordType();
			var ir_ItemArr = new Array();
			var ir_ItemLocArr = new Array();
			
			var itemRcptObj = nlapiLoadRecord(recType,recID);
			//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' Type : ' + recType + ' ID : ' + recID);
			
			var forIntercompany = itemRcptObj.getFieldValue('custbody_for_intercompany');
			//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' forIntercompany : ' + forIntercompany);// + ' ID : ' + recID);
			
			var context = nlapiGetContext().getExecutionContext();
			nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','context = '+context);
			
			if((forIntercompany =='T') && (context =='userinterface'))
			{
				var createdfrm = itemRcptObj.getFieldValue('createdfrom');
				//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' createdfrm : ' + createdfrm);
			
				var itemLineCount = itemRcptObj.getLineItemCount('item');
				//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' itemLineCount : ' + itemLineCount);
						
				var InvDetArr = new Array();
				var custRecArr= new Array();
				var new_ir_srNoArr = new Array();
				//for(var i=1;i<=itemLineCount;i++)
				{
				
				/*	var ir_item = itemRcptObj.getLineItemValue('item','item',i);
					//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' ir_item : ' + ir_item);
					ir_ItemArr.push(ir_item);
					var ir_Loc = itemRcptObj.getLineItemValue('item','location',i);
					//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' ir_Loc : ' + ir_Loc);
					ir_ItemLocArr.push(ir_Loc);
					
					var ir_srNo = itemRcptObj.getLineItemValue('item','serialnumbers',i);
					nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' ir_srNo : ' + ir_srNo);
										
					var res = ir_srNo.split(/\s+/);
					//nlapiLogExecution('DEBUG','updateCustRecDetails-SearchResult','res = '+res);
					
					var acctId = res.toString();
					nlapiLogExecution('DEBUG','updateCustRecDetails-SearchResult','acctId = '+acctId);
					var a_TT_array_values = new Array();
					if(acctId != null && acctId != '' && acctId != undefined)
					{
						for(var dt=0;dt<acctId.length;dt++)
							{
								a_TT_array_values = acctId.split(',');
								break;				
							}
					}*/
					
				//	nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' a_TT_array_values.length : ' + a_TT_array_values.length);
				//	nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' a_TT_array_values : ' + a_TT_array_values);
					
					var intercom_rec_created  = itemRcptObj.getFieldValue('custbody_itercomp_cust_rec');
					
					
				/*	nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' ir_item : ' + ir_item);
					nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' ir_Loc : ' + ir_Loc);
					nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' createdfrm : ' + createdfrm);
					nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' a_TT_array_values : ' + a_TT_array_values);
					
					nlapiLogExecution('DEBUG','getSerizedInternalid','intercom_rec_created =' +intercom_rec_created);
					*/
					//if(intercom_rec_created == 'F')
					{	
						/*var params = new Array();					
						params['item'] = ir_item;
						params['location'] = ir_Loc;
						params['serialno'] = a_TT_array_values;
						params['createdfrom'] = createdfrm;
												
						
						var url = 'https://5898528.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=86&deploy=1&compid=5898528&h=df28f7da1f2be32e5200'
						nlapiRequestURL(url, params, null, null, 'POST');*/
						
						var myParams = new Array();					
						myParams['custscript_ir_save_rec_id'] = recID;
						myParams['custscript_type'] = type;
						
						nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' Scheduled triggered : ');
						
						nlapiScheduleScript("customscript_ir_save_custom_rec_create","customdeploy_ir_save_custom_rec_create", myParams);
					}
					
					
				
			}//END: for(var i=1;i<=IFCount;i++)
				
			//itemRcptObj.setFieldValue('custbody_itercomp_cust_rec','T');
			//nlapiLogExecution('DEBUG','getSerizedInternalid','intercom_rec_created =' +intercom_rec_created);	
			var submt = nlapiSubmitRecord(itemRcptObj,true,false);
			nlapiLogExecution('DEBUG','createCustomRecord','IRsubmt = ' + submt);			
							
		}//END: if(forIntercompany =='T')	
		
		
	}	//user cheque ends..
	}
	catch(exe)
	{
		nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' exe : ' + exe);
	}
  
}

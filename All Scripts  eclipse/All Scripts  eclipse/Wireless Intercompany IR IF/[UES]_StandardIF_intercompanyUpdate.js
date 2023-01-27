/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 May 2020     Shivraj		Update Intercompany Custom Record for Standard Item Fullfillment...
 *
 */

function userEvent_mnualif_delete(type)
{
	try
	{
		var context = nlapiGetContext().getExecutionContext();
		nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','context = '+context);
		
		if( (context =='userinterface') && (type =='delete'))
		{
			var recID = nlapiGetRecordId();
			var recType = nlapiGetRecordType();
			var ir_ItemArr = new Array();
			var ir_ItemLocArr = new Array();
			
			var itemRcptObj = nlapiLoadRecord(recType,recID);
			//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' Type : ' + recType + ' ID : ' + recID);
			
			var forIntercompany = itemRcptObj.getFieldValue('custbody_for_intercompany');
			//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' forIntercompany : ' + forIntercompany);// + ' ID : ' + recID);
			
			var createdfrm = itemRcptObj.getFieldValue('createdfrom');
			//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' createdfrm : ' + createdfrm);
		
			var itemLineCount = itemRcptObj.getLineItemCount('item');
			//nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' itemLineCount : ' + itemLineCount);
			if(createdfrm!=null && createdfrm!='' && createdfrm!=undefined)
			{	
				var interComTran = nlapiLookupField('salesorder',createdfrm,'intercotransaction');//recObj.getFieldValue('intercotransaction');
				nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','interComTran = '+interComTran);
			
				if(interComTran!=null && interComTran!='' && interComTran!=undefined)
				{
					var recIdif = nlapiGetRecordId();	
					var myParams = [];
					
			     	myParams['custscript_if_rec_id'] = recIdif;
			     	myParams['custscript_type1'] = type;
					
					nlapiScheduleScript("customscript_sch_updateifcustrec","customdeploy_sch_updateifcustrec", myParams);
					
				}
			}
				
		}
	
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','usEBeforeSubmit_Itercompany',' exe : ' + e);
	}


}



function useAftSub_IF_CustRecUpdate(type)
{
	try
	{
		var userId = nlapiGetUser();
		nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' userId : ' + userId);
		
		//if(userId==24)
		{
			var recordType = nlapiGetRecordType();
			var recordId = nlapiGetRecordId();
			var recObj = nlapiLoadRecord(recordType,recordId);
			//nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','recObj = '+recObj);
			var createdfrm = recObj.getFieldValue('createdfrom');
			//nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','createdfrm = '+createdfrm);
			var status = recObj.getFieldValue('shipstatus');
			//nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','status = '+status);
			var context = nlapiGetContext().getExecutionContext();
			nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','context = '+context);
			if((context =='userinterface'))//(status=='C') &&
			{
				if(createdfrm!=null && createdfrm!='' && createdfrm!=undefined)
				{	
					var interComTran = nlapiLookupField('salesorder',createdfrm,'intercotransaction');//recObj.getFieldValue('intercotransaction');
					nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','interComTran = '+interComTran);
				
					if(interComTran!=null && interComTran!='' && interComTran!=undefined)
					{
						var recIdif = nlapiGetRecordId();
						nlapiLogExecution('DEBUG','sut_intercom_if','recIdif = '+recIdif);
						
						var myParams = [];
						
				     	myParams['custscript_if_rec_id'] = recIdif;
				     	myParams['custscript_type1'] = type;
						
						nlapiScheduleScript("customscript_sch_updateifcustrec","customdeploy_sch_updateifcustrec", myParams);
						
						
												
					 }//end : if(interComTran!=null || interComTran!='' || interComTran!=undefined)
												
			   }//end : if(createdfrm!=null || createdfrm!='' || createdfrm!=undefined)
					
		   }//end:if(status=='C')
		}//end:if(userId==24)...
	}
	catch(exc)
	{
		nlapiLogExecution('DEBUG','ERROR','exc = '+exc);
	}
  
}
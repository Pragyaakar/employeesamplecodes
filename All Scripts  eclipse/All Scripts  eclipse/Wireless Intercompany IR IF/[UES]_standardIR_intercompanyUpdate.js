/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       11 Jun 2020     Shivraj
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function userEventBeforeLoad(type, form, request){
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit
 *                      approve, reject, cancel (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF)
 *                      markcomplete (Call, Task)
 *                      reassign (Case)
 *                      editforecast (Opp, Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmit(type){
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function useAfterSubmit_IR(type)
{
	var context = nlapiGetContext().getExecutionContext();
	nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','context = '+context);
	
	if((context =='userinterface'))
	{
		try
		{
			var userId = nlapiGetUser();
			nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' userId : ' + userId);
			
			//if(userId==24 || userId==11770|| userId==-5)
			{
				var recordType = nlapiGetRecordType();
				var recordId = nlapiGetRecordId();
				var recObj = nlapiLoadRecord(recordType,recordId);
				nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','recObj = '+recObj);
				var createdfrm = recObj.getFieldValue('createdfrom');
				nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','createdfrm = '+createdfrm);
				if(createdfrm!=null && createdfrm!='' && createdfrm!=undefined)
				{	
					var interComTran = nlapiLookupField('purchaseorder',createdfrm,'intercotransaction');//recObj.getFieldValue('intercotransaction');
					nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','interComTran = '+interComTran);
					
					if(interComTran!=null && interComTran!='' && interComTran!=undefined)
					{
						var recIdir = nlapiGetRecordId();	
						var myParams = [];
						
				     	myParams['custscript_ir_rec_id'] = recIdir;
				     	myParams['custscript_type2'] = type;
						
						nlapiScheduleScript("customscript_manual_ir_update","customdeploy_manual_ir_update", myParams);
						
					}
				}
			}
			
		}
		catch(exp)
		{
			nlapiLogExecution('DEBUG','updateCustRecDetails','exp = '+exp);
		}
	}
}


function usebeforSubmit_IR_delete(type)
{
	var context = nlapiGetContext().getExecutionContext();
	nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','context = '+context);
	
	if( (context =='userinterface') && (type =='delete'))
	{
		try
		{
			var userId = nlapiGetUser();
			nlapiLogExecution('DEBUG','usEAfterSubmit_Itercompany',' userId : ' + userId);
			
			//if(userId==24 || userId==11770|| userId==-5)
			{
				var recordType = nlapiGetRecordType();
				var recordId = nlapiGetRecordId();
				var recObj = nlapiLoadRecord(recordType,recordId);
				nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','recObj = '+recObj);
				var createdfrm = recObj.getFieldValue('createdfrom');
				nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','createdfrm = '+createdfrm);
				if(createdfrm!=null && createdfrm!='' && createdfrm!=undefined)
				{	
					var interComTran = nlapiLookupField('purchaseorder',createdfrm,'intercotransaction');//recObj.getFieldValue('intercotransaction');
					nlapiLogExecution('DEBUG','useAftSub_CustRecUpdate','interComTran = '+interComTran);
					
					if(interComTran!=null && interComTran!='' && interComTran!=undefined)
					{
						var recIdir = nlapiGetRecordId();	
						var myParams = [];
						
				     	myParams['custscript_ir_rec_id'] = recIdir;
				     	myParams['custscript_type2'] = type;
						
						nlapiScheduleScript("customscript_manual_ir_update","customdeploy_manual_ir_update", myParams);
						
					}
				}
			}
			
		}
		catch(exp)
		{
			nlapiLogExecution('DEBUG','updateCustRecDetails','exp = '+exp);
		}
	}
}

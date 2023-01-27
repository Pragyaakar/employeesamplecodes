/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       5 Feb 2020     Priyanka Patil
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function UES_AfterSubmitUpdateQty(type)
{
	try
	{
		if(type == 'create' || type == 'edit')
		{
			var itemArr = new Array();
			var qty_OnHandArr = new Array();
			var qty_TransferArr = new Array();
			var balance_StoreQtyArr = new Array();
			var balance_AssemQtyArr = new Array();
			var refNoArr = new Array();
			
			var recordId = nlapiGetRecordId();
			var recordType = nlapiGetRecordType();
			
		
			
			var recObj = nlapiLoadRecord(recordType,recordId);
			nlapiLogExecution('DEBUG','Transfer Quantity','recordType ='+ recordType + ' recordId ='+ recordId);
			
			
			var lineCount =recObj.getLineItemCount('item');
	
			for(var i=1;i<=lineCount;i++)
			{
				var item = recObj.getLineItemValue('item','item',i);
				itemArr.push(item);
				nlapiLogExecution('DEBUG','Transfer Quantity','item ='+ item);
				
				var qty_OnHand = recObj.getLineItemValue('item','quantity',i);
				qty_OnHandArr.push(qty_OnHand);
				nlapiLogExecution('DEBUG','Transfer Quantity','qty_OnHand ='+ qty_OnHand);
				
			}
			
			var JobOrder = recObj.getFieldValue('custbody_jobw_to');
			nlapiLogExecution('DEBUG','Transfer Quantity','subsidiary ='+ subsidiary);
	
			if(JobOrder != null && JobOrder !=undefined && JobOrder !="")
			{
				var OldRec = nlapiLoadRecord(recordType,JobOrder);
				
				var lineCount1 =OldRec.getLineItemCount('item');
				
				for(var m=0;m<itemArr.length;m++)
				{
					for(var i1=1;i1<=lineCount1;i1++)
					{
						var item1 = OldRec.getLineItemValue('item','item',i1);
						
						var UpdatedField = OldRec.getLineItemValue('item','custcol_transfer_order_balance_qty',i1);
						
						
						if(itemArr[m] ==item1)
						{
							var SetQty = parseFloat(UpdatedField)-parseFloat(qty_OnHandArr[m]);
							OldRec.setLineItemValue('item','custcol_transfer_order_balance_qty',i1,SetQty);
						}
						
					}
				}
				nlapiSubmitRecord(OldRec);
			}
			
			nlapiSubmitRecord(recObj);
		}
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Transfer Quantity','Exception ='+e)
	}
}


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
		if(type == 'edit')
		{
			var itemArr = new Array();
			var qty_OnHandArr = new Array();
			var qty_TransferArr = new Array();
			var balance_StoreQtyArr = new Array();
			var balance_AssemQtyArr = new Array();
			
			var recordId = nlapiGetRecordId();
			var recordType = nlapiGetRecordType();
			
			var recObj = nlapiLoadRecord(recordType,recordId);
			nlapiLogExecution('DEBUG','Transfer Quantity','recordType ='+ recordType + ' recordId ='+ recordId);
			
			var subsidiary = recObj.getFieldValue('subsidiary');
			nlapiLogExecution('DEBUG','Transfer Quantity','subsidiary ='+ subsidiary);
			
			var fromLocation = recObj.getFieldValue('location');
			nlapiLogExecution('DEBUG','Transfer Quantity','fromLocation ='+ fromLocation);
			
			var toLocation = recObj.getFieldValue('transferlocation');
			nlapiLogExecution('DEBUG','Transfer Quantity','toLocation ='+ toLocation);
			
			var woNumber = recObj.getFieldValue('custbody_wo_number');
			nlapiLogExecution('DEBUG','Transfer Quantity','woNumber ='+ woNumber);
			
			var INVCount = recObj.getLineItemCount('inventory');
			nlapiLogExecution('DEBUG','Transfer Quantity','INVCount ='+ INVCount);
			
			for(var i=1;i<=INVCount;i++)
			{
				var item = recObj.getLineItemValue('inventory','item',i);
				itemArr.push(item);
				nlapiLogExecution('DEBUG','Transfer Quantity','item ='+ item);
				
				var qty_OnHand = recObj.getLineItemValue('inventory','quantityonhand',i);
				qty_OnHandArr.push(qty_OnHand);
				nlapiLogExecution('DEBUG','Transfer Quantity','qty_OnHand ='+ qty_OnHand);
				
				var qty_Transfer = recObj.getLineItemValue('inventory','adjustqtyby',i);
				qty_TransferArr.push(qty_Transfer);
				nlapiLogExecution('DEBUG','Transfer Quantity','qty_Transfer ='+ qty_Transfer);
				
				var balance_StoreQty = recObj.getLineItemValue('inventory','custcol_wo_balnce_store_qty',i);
				balance_StoreQtyArr.push(balance_StoreQty);
				nlapiLogExecution('DEBUG','Transfer Quantity','balance_StoreQty ='+ balance_StoreQty);
				
				var balance_AssemQty = recObj.getLineItemValue('inventory','custcol_wo_balance_assembly_qty',i);
				balance_AssemQtyArr.push(balance_AssemQty)
				nlapiLogExecution('DEBUG','Transfer Quantity','balance_AssemQty ='+ balance_AssemQty);
			}
			
			UpdateQtyOnWOStoreToAssembly(recordId,subsidiary,fromLocation,toLocation,woNumber,itemArr,qty_OnHandArr,qty_TransferArr,balance_StoreQtyArr,balance_AssemQtyArr)
			
			/*else if(fromLocation =='516' && toLocation == '517')
			{
				UpdateQtyOnWOAssemblyToStore(subsidiary,fromLocation,toLocation,woNumber,itemArr,qty_OnHandArr,qty_TransferArr,balance_StoreQtyArr,balance_AssemQtyArr)
				
			}*/
			
		}
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Transfer Quantity','Exception ='+e)
	}
}


function UpdateQtyOnWOStoreToAssembly(recordId,subsidiary,fromLocation,toLocation,woNumber,itemArr,qty_OnHandArr,qty_TransferArr,balance_StoreQtyArr,balance_AssemQtyArr)
{
	try
	{
		var update_balanceStoreQty = 0;
		var update_balanceAssemQty = 0;
		
		var o_b2cObj = nlapiLoadRecord('workorder',woNumber);
		
		var WOCount = o_b2cObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Update Quantity WO','WOCount ='+WOCount)
		
		for(var p=1;p<=WOCount;p++)
		{
			var WOItem = o_b2cObj.getLineItemValue('item','item',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WOItem ='+WOItem)
			
			var WO_Qty = o_b2cObj.getLineItemValue('item','quantity',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WO_Qty ='+WO_Qty)
			
			var WO_balanceStore = o_b2cObj.getLineItemValue('item','custcol_wo_balnce_store_qty',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WO_balanceStore ='+WO_balanceStore)
			
			var WO_blanceAss = o_b2cObj.getLineItemValue('item','custcol_wo_balance_assembly_qty',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WO_blanceAss ='+WO_blanceAss)
			
			var WO_OriginalQty = o_b2cObj.getLineItemValue('item','custcol_wo_original_quantity',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WO_OriginalQty ='+WO_OriginalQty)
			
			if(itemArr[p-1] == WOItem)
			{
				if(WO_balanceStore == '' || WO_balanceStore == undefined || WO_balanceStore == null)
				{
					WO_balanceStore=0.00;
					
				}
				else
				{
					WO_balanceStore = parseFloat(WO_balanceStore);
				}
				
				update_balanceStoreQty = parseFloat(WO_balanceStore) - parseFloat(qty_TransferArr[p-1]);
				nlapiLogExecution('DEBUG','Update Quantity WO','update balance Store Qty ='+update_balanceStoreQty);
				
				if(update_balanceStoreQty != null && update_balanceStoreQty != '' && update_balanceStoreQty != undefined)
				{
					o_b2cObj.setLineItemValue('item','custcol_wo_balnce_store_qty',p,parseFloat(update_balanceStoreQty))
				}
				else
				{
					update_balanceStoreQty = '0';
					o_b2cObj.setLineItemValue('item','custcol_wo_balnce_store_qty',p,parseFloat(update_balanceStoreQty))
				}
				
				if(WO_blanceAss == '' || WO_blanceAss == undefined || WO_blanceAss == null){
					WO_blanceAss=0.00;
					
				}
				else{
					WO_blanceAss = parseFloat(WO_blanceAss);
				}
				update_balanceAssemQty = parseFloat(WO_blanceAss) + parseFloat(qty_TransferArr[p-1]);
				nlapiLogExecution('DEBUG','Update Quantity WO','Update Balance Assembly Qty ='+update_balanceAssemQty)
				
				if(update_balanceAssemQty != null && update_balanceAssemQty != '' && update_balanceAssemQty != undefined)
				{
					o_b2cObj.setLineItemValue('item','custcol_wo_balance_assembly_qty',p,parseFloat(update_balanceAssemQty))
				}
				else
				{
					update_balanceAssemQty = '0';
					o_b2cObj.setLineItemValue('item','custcol_wo_balance_assembly_qty',p,parseFloat(update_balanceAssemQty))
				}
			}
			
		}
		var transferInvent = o_b2cObj.setFieldValue('custbody_inv_trans_num',recordId)
		var record =  nlapiSubmitRecord(o_b2cObj,true);
		nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Update Quantity WO','Exception ='+e)
	}
}

/*
function UpdateQtyOnWOAssemblyToStore(subsidiary,fromLocation,toLocation,woNumber,itemArr,qty_OnHandArr,qty_TransferArr,balance_StoreQtyArr,balance_AssemQtyArr)
{
	try
	{
		var update_balanceStoreQty = 0;
		var update_balanceAssemQty = 0;
		
		var o_b2cObj = nlapiLoadRecord('workorder',woNumber);
		
		var WOCount = o_b2cObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Update Quantity WO','WOCount ='+WOCount)
		
		for(var p=1;p<=WOCount;p++)
		{
			var WOItem = o_b2cObj.getLineItemValue('item','item',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WOItem ='+WOItem)
			
			var WO_Qty = o_b2cObj.getLineItemValue('item','quantity',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WO_Qty ='+WO_Qty)
			
			var WO_balanceStore = o_b2cObj.getLineItemValue('item','custcol_wo_balnce_store_qty',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WO_balanceStore ='+WO_balanceStore)
			
			var WO_blanceAss = o_b2cObj.getLineItemValue('item','custcol_wo_balance_assembly_qty',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WO_blanceAss ='+WO_blanceAss)
			
			var WO_OriginalQty = o_b2cObj.getLineItemValue('item','custcol_wo_original_quantity',p);
			nlapiLogExecution('DEBUG','Update Quantity WO','WO_OriginalQty ='+WO_OriginalQty)
			
			if(itemArr[p-1] == WOItem)
			{
				if(WO_balanceStore == '' || WO_balanceStore == undefined || WO_balanceStore == null)
				{
					WO_balanceStore=0.00;
					
				}
				else
				{
					WO_balanceStore = parseFloat(WO_balanceStore);
				}
				
				update_balanceStoreQty = parseFloat(WO_balanceStore) + parseFloat(qty_TransferArr[p-1]);
				nlapiLogExecution('DEBUG','Update Quantity WO','update balance Store Qty ='+update_balanceStoreQty);
				
				if(update_balanceStoreQty != null && update_balanceStoreQty != '' && update_balanceStoreQty != undefined)
				{
					o_b2cObj.setLineItemValue('item','custcol_wo_balnce_store_qty',p,parseFloat(update_balanceStoreQty))
				}
				else
				{
					update_balanceStoreQty = '0';
					o_b2cObj.setLineItemValue('item','custcol_wo_balnce_store_qty',p,parseFloat(update_balanceStoreQty))
				}
				
				if(WO_blanceAss == '' || WO_blanceAss == undefined || WO_blanceAss == null){
					WO_blanceAss=0.00;
					
				}
				else{
					WO_blanceAss = parseFloat(WO_blanceAss);
				}
				update_balanceAssemQty = parseFloat(WO_blanceAss) - parseFloat(qty_TransferArr[p-1]);
				nlapiLogExecution('DEBUG','Update Quantity WO','Update Balance Assembly Qty ='+update_balanceAssemQty)
				
				if(update_balanceAssemQty != null && update_balanceAssemQty != '' && update_balanceAssemQty != undefined)
				{
					o_b2cObj.setLineItemValue('item','custcol_wo_balance_assembly_qty',p,parseFloat(update_balanceAssemQty))
				}
				else
				{
					update_balanceAssemQty = '0';
					o_b2cObj.setLineItemValue('item','custcol_wo_balance_assembly_qty',p,parseFloat(update_balanceAssemQty))
				}
			}
			
		}
		
		var record =  nlapiSubmitRecord(o_b2cObj,true);
		nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Update Quantity WO','Exception ='+e)
	}
}*/
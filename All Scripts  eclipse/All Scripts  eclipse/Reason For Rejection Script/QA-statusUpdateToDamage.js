/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       09 Aug 2019     AMOL ATPL
 *
 */

/**
 * @returns {Void} Any or no return value
 */
function QAStatusworkflowAction() 
{
	var recId= nlapiGetRecordId();
	var recType = nlapiGetRecordType();
	var InspecObj = nlapiLoadRecord(recType,recId);
	
	//----------Code to get the details for the Item Receipt---
	//custrecord_qm_queue_transaction_inv
	//custrecord_qm_queue_item,custrecord_qm_queue_inv_tran,custrecord_qm_queue_qty,
	//custrecord_qm_quality_data_transaction
	
	var inspItem;
	var irNum;
	var qty;
	
	//------------Get the IR record and update the inventory Status.
	inspItem = InspecObj.getFieldValue('custrecord_qm_queue_item');
	nlapiLogExecution('DEBUG', 'aftr submit', "  inspItem ==" + inspItem);
	qty = InspecObj.getFieldValue('custrecord_qm_queue_qty');
	nlapiLogExecution('DEBUG', 'aftr submit', "  qty ==" + qty);
	irNum = InspecObj.getFieldValue('custrecord_qm_queue_transaction_inv');
	
	var lineCountQD = InspecObj.getLineItemCount('recmachcustrecord_qm_quality_data_queue');
	nlapiLogExecution('DEBUG', 'aftr submit', "  lineCountQD ==" + lineCountQD);
	
	if(irNum!=null && irNum != '' && irNum != undefined)
	{
		if(lineCountQD != null && lineCountQD != undefined)
		{
		
		for (var m=1;m<=lineCountQD;m++)
		{
			var transID= InspecObj.getLineItemValue('recmachcustrecord_qm_quality_data_queue','custrecord_qm_quality_data_transaction',m);
			var transStatus= InspecObj.getLineItemValue('recmachcustrecord_qm_quality_data_queue','custrecord_qm_quality_data_status',m);
			var transItem= InspecObj.getLineItemValue('recmachcustrecord_qm_quality_data_queue','custrecord_qm_quality_data_item',m);
			
			nlapiLogExecution('DEBUG', 'aftr submit', "  transID ==" + transID);
			nlapiLogExecution('DEBUG', 'aftr submit', "  transStatus ==" + transStatus);
			nlapiLogExecution('DEBUG', 'aftr submit', "  transItem ==" + transItem);
			
			if(transStatus=='4' && (transID !=null && transID!='' && transID!= undefined))
					{
						var irObj = nlapiLoadRecord('itemreceipt',transID ,{recordmode: 'dynamic'});
						var lineCount = irObj.getLineItemCount('item');
						if(lineCount != null && lineCount != undefined)
						{
							for(var i=1;i<=lineCount;i++)
							{
								var item= irObj.getLineItemValue('item','item',i);
								irObj.selectLineItem('item', i);
								if(item == transItem)
								{
									var status = '2';
									 rec= irObj.viewLineItemSubrecord('item', 'inventorydetail',i);
				            		 invcount = rec.getLineItemCount('inventoryassignment');
				            		 nlapiLogExecution('DEBUG', 'aftr submit', " nvcount=="+invcount);
				            		 for(var x = 1; x <=invcount ; x++)            		 
				            		 {
				            			 var subrecord2= irObj.editCurrentLineItemSubrecord('item','inventorydetail');
				            			 subrecord2.selectLineItem('inventoryassignment', x);
				            			 //subrecord2.setCurrentLineItemValue('inventoryassignment', 'issueinventorynumber', 'working123');
				            			 subrecord2.setCurrentLineItemValue('inventoryassignment', 'inventorystatus', status);
				            			 subrecord2.commitLineItem('inventoryassignment');
				            			 subrecord2.commit();
				            			 
				            			
				            		 }
								}
								irObj.commitLineItem('item');
							}
						}
						 var id = nlapiSubmitRecord(irObj);
					}
		
	}
	}
	}
}

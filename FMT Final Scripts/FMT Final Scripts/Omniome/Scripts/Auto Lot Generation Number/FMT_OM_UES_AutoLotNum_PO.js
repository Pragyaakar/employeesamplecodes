/**
* @NApiVersion 2.0
* @NScriptType UserEventScript
*/

define(['N/log','N/record','N/ui/serverWidget', 'N/currentRecord', 'N/search','N/runtime'],
function(log,record,serverWidget, currentRecord, search,runtime) 
{
	function afterSubmit(context) 
	{
		try
		{	
			if(context.type == 'edit')
			{
				var currentScriptDaily = runtime.getCurrentScript()

                var serialPrefix = currentScriptDaily.getParameter({
                    name: 'custscript_fmt_po_auto_lot_num'
                });

                log.debug({title: 'serialPrefix',details: serialPrefix});

				var recID = context.newRecord.id;
				log.debug({title: 'Record ID',details: recID});

				var recObj = record.load({
				    type: record.Type.PURCHASE_ORDER,
				    id: recID,
				    isDynamic: true,
				});

				var trandate = recObj.getValue({fieldId: 'trandate'});
				//log.debug({title: 'Transaction Date',details: trandate});
          
          		var filterDate = (trandate.getMonth()+1)+'/' + trandate.getDate() + '/'+ trandate.getFullYear();
                //log.debug({title: 'filterDate',details: filterDate});

        		var IRLineCount = recObj.getLineCount({'sublistId': 'item'});
       			//log.debug({title: 'Line Count',details: IRLineCount});

				var dateVal = new Date();
                
                var getYr = dateVal.getFullYear().toString().substr(-2);
                //log.debug({title: 'getYr',details: getYr});

                var Month = ((dateVal.getMonth() + 1) < 10 ? '0' : '') + (dateVal.getMonth() + 1);
                //log.debug({title: 'Month',details: Month});

                var genNum = '';

       			for(var q = 0; q < IRLineCount; q++)
				{	
					var flag = false;
					var Receive_item = recObj.getSublistValue({sublistId: 'item', fieldId: 'itemreceive', line: q});
					
					var item = recObj.getSublistValue({sublistId: 'item', fieldId: 'item', line: q});
					//itemArr.push(item);

					var fieldLookUp = search.lookupFields({
		                type: search.Type.ITEM,
		                id: item,
		               	columns: ['recordtype']
		            });

		            var itemType = fieldLookUp.recordtype;
		            log.debug({title: 'fieldLookUp',details: fieldLookUp.recordtype});

					var quantity = recObj.getSublistValue({sublistId: 'item', fieldId: 'quantity', line: q});
					//qtyArr.push(quantity);
						
	                recObj.selectLine({sublistId: 'item',line: q});

					var subrec = recObj.getCurrentSublistSubrecord({
				        sublistId: 'item',
				        fieldId: 'inventorydetail'
				    });
					//log.debug({title: 'subrec',details: subrec});

					var existingLineCount = subrec.getLineCount({sublistId: 'inventoryassignment'});
					log.debug({title: 'existingLineCount',details: existingLineCount});
					
					if(existingLineCount == 0)
					{
						if(itemType == 'serializedinventoryitem' || itemType == 'lotnumberedinventoryitem' || itemType == 'lotnumberedassemblyitem')
                		{
				        	var AutoSerialNum = createLotNum();

				        	var autoNumSet = serialPrefix; 
				        	log.debug({title: 'autoNumSet',details: autoNumSet});

							genNum = autoNumSet+''+AutoSerialNum;
							log.debug({title: '121',details: genNum});

			                //Add a line to the subrecord's inventory assignment sublist.

						    subrec.selectNewLine({
						        sublistId: 'inventoryassignment'
						    });

						    subrec.setCurrentSublistValue({
						        sublistId: 'inventoryassignment',
						        fieldId: 'quantity',
						        value: quantity
						    });

						    subrec.setCurrentSublistValue({
						        sublistId: 'inventoryassignment',
						        fieldId: 'receiptinventorynumber',
						        value: genNum
						    });
							log.debug({title: 'genNum 139',details: genNum});

						    // Save the line in the subrecord's sublist.
						   	subrec.commitLine({
						        sublistId: 'inventoryassignment'
						    });
                		}
						
						// Save the line in the record's sublist
				        recObj.commitLine({
				            sublistId: 'item'
				        });
					}
				}
				
                var recordId = recObj.save({enableSourcing: true,ignoreMandatoryFields: true});
			}	
		}
		catch(e)
		{
			log.debug({title: 'Error',details: e});
		}
	}

    function createLotNum()
    {
        try
        {
            var serialObj = record.create({type: 'customrecord_fmt_purchase_order_num',isDynamic: true});

            var submitSerialRec = serialObj.save({enableSourcing: true,ignoreMandatoryFields: true});
                
            return submitSerialRec;
            log.debug({title: 'submitSerialRec',details: submitSerialRec});
        }
        catch(e)
        {
            log.debug({title: 'Error',details: e});
        }
    }

	return {
		afterSubmit: afterSubmit
	};
});
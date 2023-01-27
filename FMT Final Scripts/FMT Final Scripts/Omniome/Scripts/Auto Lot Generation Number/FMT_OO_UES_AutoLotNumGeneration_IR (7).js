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
			if(context.type == 'create')
			{
				var currentScriptDaily = runtime.getCurrentScript()

                var serialPrefix = currentScriptDaily.getParameter({
                    name: 'custscript_fmt_ir_serial_num_prefix'
                });
                log.debug({title: 'serialPrefix',details: serialPrefix});

				var recID = context.newRecord.id;
				log.debug({title: 'Record ID',details: recID});

				var recObj = record.load({
				    type: record.Type.ITEM_RECEIPT,
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
					
					if(Receive_item == true)
					{
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

						var existingLineCount = subrec.getLineCount({sublistId: 'inventoryassignment'});
						log.debug({title: 'existingLineCount',details: existingLineCount});

						for(var i1 = 0; i1 < existingLineCount; i1++)//(var i1 = existingLineCount; i1 >= 1; i1--) 
						{
							subrec.selectLine({
		                        sublistId: "inventoryassignment",
		                        line: i1
		                    });

			                var lotnumber = subrec.getCurrentSublistValue({
					            sublistId: 'inventoryassignment',
					            fieldId: 'receiptinventorynumber',
					            value: genNum
					        });

			                var str = lotnumber.replace(/[0-9]/g, '');
			                log.debug({title: 'str',details: str});

			                if(str == 'OMNIO')
			                {
								subrec.removeLine({
			                        sublistId: "inventoryassignment",
			                        line: i1
			                    });

			                    flag = true;

			                 }
		                }

						if(flag != false)
						{
							if(itemType == 'serializedinventoryitem' )
                			{
				        		var AutoSerialNum = createSerialLotNum();

				        		var autoNumSet = serialPrefix+''+getYr+''+Month; 
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

                			if(itemType == 'lotnumberedinventoryitem' || itemType == 'lotnumberedassemblyitem' )
                			{
                				var AutoNum = createAutoLotNum();

				        		var digitLength = '';
		                        var minDigit = parseInt(10,10);
		                    
		                        if(minDigit)
		                        {
		                            for (var index = 0; index < minDigit; index++) 
		                            {
		                                digitLength = digitLength+'0';
		                            }
		                        }

		                        var Inv_Detail = (digitLength+AutoNum).slice(minDigit-(minDigit*2));
		                        log.debug({title: 'Inv_Detail',details: Inv_Detail});

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
						            value: Inv_Detail
						        });

						        log.debug({title: 'Inv_Detail 182',details: Inv_Detail});

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
				}
				
                var recordId = recObj.save({enableSourcing: true,ignoreMandatoryFields: true});
			}	
		}
		catch(e)
		{
			log.debug({title: 'Error',details: e});
		}
	}

	function createAutoLotNum()
    {
        try
        {
            var custRecObj = record.create({type: 'customrecord_fmt_ir_lot_numbering',isDynamic: true});

            var submitRec = custRecObj.save({enableSourcing: true,ignoreMandatoryFields: true});
                
            return submitRec;
            log.debug({title: 'submitRec',details: submitRec});
        }
        catch(e)
        {
            log.debug({title: 'Error',details: e});
        }
    }

    function createSerialLotNum()
    {
        try
        {
            var serialObj = record.create({type: 'customrecord_fmt_ir_serial_autonumbering',isDynamic: true});

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
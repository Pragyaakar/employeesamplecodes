/**
* @NApiVersion 2.0
* @NScriptType UserEventScript
*/

define(['N/log','N/record','N/ui/serverWidget', 'N/currentRecord', 'N/search', 'N/runtime'],
function(log,record,serverWidget, currentRecord, search,runtime) 
{
	function afterSubmit(context) 
	{
		try
		{	
            log.debug({title: 'Type',details: context.type});

			if(context.type == 'create')
			{
                var currentScriptDaily = runtime.getCurrentScript()

                var serialPrefix = currentScriptDaily.getParameter({
                    name: 'custscript_fmt_serial_lot_prefix'
                });
                //log.debug({title: 'serialPrefix',details: serialPrefix});

				var recID = context.newRecord.id;
                //log.debug({title: 'Record ID',details: recID});

                var recObj = record.load({
                    type: record.Type.WORK_ORDER,
                    id: recID,
                    isDynamic: true,
                });

                var trandate = recObj.getValue({fieldId: 'trandate'});
                //log.debug({title: 'Transaction Date',details: trandate});

                var assembly_item = recObj.getValue({fieldId: 'assemblyitem'});
                //log.debug({title: 'Transaction Item',details: assembly_item});

                var generated_Lot = recObj.getValue({fieldId: 'custbody_fmt_generate_assemblylot_num'});
                //log.debug({title: 'Transaction Item',details: assembly_item});

                var fieldLookUp = search.lookupFields({
                    type: search.Type.ASSEMBLY_ITEM,
                    id: assembly_item,
                    columns: ['recordtype']
                });

                var itemType = fieldLookUp.recordtype;
                //log.debug({title: 'fieldLookUp',details: fieldLookUp.recordtype});
                
                var tran_qty = recObj.getValue({fieldId: 'quantity'});
                //log.debug({title: 'Transaction Quantity',details: tran_qty});

                var filterDate = (trandate.getMonth()+1)+'/' + trandate.getDate() + '/'+ trandate.getFullYear();
                //log.debug({title: 'filterDate',details: filterDate});

                var dateVal = new Date();
                
                var getYr = dateVal.getFullYear().toString().substr(-2);
                //log.debug({title: 'getYr',details: getYr});

                var Month = ((dateVal.getMonth() + 1) < 10 ? '0' : '') + (dateVal.getMonth() + 1);
                //log.debug({title: 'Month',details: Month});

                if(itemType == 'lotnumberedassemblyitem')
                {
                    var custRe = createAutoLotNum();
                    log.debug({title: 'custRe',details: custRe});

                    if(custRe)
                    {
                        var digitLength = '';
                        var minDigit = parseInt(10,10);
                    
                        if(minDigit)
                        {
                            for (var index = 0; index < minDigit; index++) 
                            {
                                digitLength = digitLength+'0';
                            }
                        }

                        var Inv_Detail = (digitLength+custRe).slice(minDigit-(minDigit*2));
                        //log.debug({title: 'Inv_Detail',details: Inv_Detail});

                        if(!generated_Lot)
                        {
                            recObj.setValue({
                                fieldId: 'custbody_fmt_generate_assemblylot_num',
                                value: Inv_Detail
                            });
                        }
                    }
                }

                if(itemType == 'serializedassemblyitem')
                {   
                    var invArr = [];
                    var SerialInv_Detail = '';
                    for(var i=0; i<tran_qty; i++)
                    {
                        var custReSerialLot = createSerialLotNum();
                        //log.debug({title: 'custReSerialLot',details: custReSerialLot});

                        if(custReSerialLot)
                        {
                            //log.debug({title: 'tran_qty',details: tran_qty});
                            if(!SerialInv_Detail){
                                SerialInv_Detail = serialPrefix+''+getYr+''+Month+''+custReSerialLot;
                                //
                            } else{
                                SerialInv_Detail = SerialInv_Detail+ ', '+serialPrefix+''+getYr+''+Month+''+custReSerialLot; //+ ' ';
                            }   
                            

                           // invArr.push(SerialInv_Detail);
                        }
                        log.debug({title: 'SerialInv_Detail',details: SerialInv_Detail});
                    }
                    
                    if(!generated_Lot)
                    {
                        recObj.setValue({
                            fieldId: 'custbody_fmt_generate_assemblylot_num',
                            value: SerialInv_Detail//invArr.toString()
                        });
                    }
                }

                recObj.save({enableSourcing: true,ignoreMandatoryFields: true});
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
            var custRecObj = record.create({type: 'customrecord_fmt_wo_lot_item_numbering',isDynamic: true});

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
            var serialObj = record.create({type: 'customrecord_fmt_work_order_num',isDynamic: true});

            var submitSerialRec = serialObj.save({enableSourcing: true,ignoreMandatoryFields: true});
                
            return submitSerialRec;
            log.debug({title: 'submitSerialRec',details: submitSerialRec});
        }
        catch(e)
        {
            log.debug({title: 'Error',details: e});
        }
    }

    function beforeLoad(context,record)
    {
        try
        {
            if (context.type == 'copy')
            {
                var customerRecord = context.newRecord;
                //log.debug({title: 'customerRecord',details: customerRecord});

                customerRecord.setValue('custbody_fmt_generate_assemblylot_num', '');
            }   
        }
        catch(e)
        {
            log.debug({title: 'Error',details: e});
        }
    }
	return {
	afterSubmit: afterSubmit,
    beforeLoad: beforeLoad
	};
});
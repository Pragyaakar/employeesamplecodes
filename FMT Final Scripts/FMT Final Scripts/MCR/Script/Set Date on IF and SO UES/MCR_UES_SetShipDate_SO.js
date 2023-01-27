/**
* @NApiVersion 2.0
* @NScriptType UserEventScript
*/

define(['N/log','N/record','N/ui/serverWidget', 'N/currentRecord','N/runtime'],
function(log,record,serverWidget, currentRecord,runtime) 
{
	function afterSubmit(context) 
	{
		try
		{	
			//if((runtime.executionContext == runtime.ContextType.MAP_REDUCE) || (runtime.executionContext == runtime.ContextType.USER_INTERFACE)) 
			{
				var tranID = context.newRecord.id;

				var tranObj = record.load({
				    type: record.Type.ITEM_FULFILLMENT,
				    id: tranID,
				    isDynamic: false,
				});

				var createdFrom = tranObj.getValue({fieldId: 'createdfrom'});
				log.debug('createdFrom == ',createdFrom);

				var IF_status = tranObj.getValue({fieldId: 'shipstatus'});
				log.debug('IF_status == ',IF_status);

				var lineArr = [];

				if(IF_status == 'C')
				{
					var IF_LineCount = tranObj.getLineCount({'sublistId': 'item'});
					log.debug('IF_LineCount == ',IF_LineCount);

					var iF_setDate = new Date();
					log.debug('iF_setDate ',iF_setDate);

					
					for(var i=0; i<IF_LineCount; i++)
					{
						var IF_Line = tranObj.getSublistValue({sublistId: 'item', fieldId: 'custcol_line_num', line: i});
						
						var IF_check = tranObj.getSublistValue({sublistId: 'item', fieldId: 'itemreceive', line: i});
						log.debug('IF_check ',IF_check);
	                  
						if(IF_check == true)
						{
							lineArr.push(IF_Line);

							tranObj.setSublistValue({
							    sublistId: 'item',
							    fieldId: 'custcol_actual_ship_date',
							    line: i,
							    value: iF_setDate
							});
							
						}
					}
				}
	          
	          tranObj.setValue({
	            fieldId: 'custbody_mcr_if_updated',
	            value: true
	          });
          
				tranObj.save();
				setDateonSO(createdFrom,lineArr);
			}
			
			
		}
		catch(e)
		{
			log.debug('Before Load Error',e.toString());
		}
	}

	function setDateonSO(createdFrom,lineArr)
	{
		try
		{
			var soObj = record.load({
			    type: record.Type.SALES_ORDER,
			    id: createdFrom,
			    isDynamic: false,
			});

			var SO_LineCount = soObj.getLineCount({'sublistId': 'item'});
			log.debug('SO_LineCount',SO_LineCount);

			for(var q=0;q<SO_LineCount;q++)
			{
				var SO_Line = soObj.getSublistValue({sublistId: 'item', fieldId: 'custcol_line_num', line: q});
				//log.debug('SO_Line ',SO_Line);

				var setDate = new Date();
				//log.debug('setDate ',setDate);

				if(lineArr.indexOf(SO_Line) != -1)
				{
					log.debug('Set Line ',SO_Line);

					soObj.setSublistValue({
					    sublistId: 'item',
					    fieldId: 'custcol_actual_ship_date',
					    line: q,
					    value: setDate
					});
					
				}
			}
			soObj.save();

			return true;
		}
		catch(e)
		{
			log.debug('Error ',e);
		}
	}
	return {
		afterSubmit: afterSubmit
	};
});
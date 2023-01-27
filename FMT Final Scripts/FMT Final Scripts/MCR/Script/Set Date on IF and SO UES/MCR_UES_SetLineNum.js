/**
* @NApiVersion 2.0
* @NScriptType UserEventScript
*/

define(['N/log','N/record','N/ui/serverWidget', 'N/currentRecord'],
function(log,record,serverWidget, currentRecord) 
{
	function afterSubmit(context) 
	{
		try
		{	
			var tranObj = context.newRecord.id;
			log.debug('tranObj == ',tranObj);

			var soObj = record.load({
			    type: record.Type.SALES_ORDER,
			    id: tranObj,
			    isDynamic: false,
			});


			var SO_LineCount = soObj.getLineCount({'sublistId': 'item'});
			log.debug('SO_LineCount',SO_LineCount);

			for(var q=0;q<SO_LineCount;q++)
			{
				soObj.setSublistValue({
					    sublistId: 'item',
					    fieldId: 'custcol_line_num',
					    line: q,
					    value: parseInt(q+1)
					});
              	
				
			}
			soObj.save();
		}
		catch(e)
		{
			log.debug('Before Load Error',e)
		}
	}

	return {
		afterSubmit: afterSubmit
	};
});
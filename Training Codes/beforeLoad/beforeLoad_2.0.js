/**
* @NApiVersion 2.0
* @NScriptType UserEventScript
*/

define(['N/log','N/record','N/ui/serverWidget'],
function(log,record,serverWidget) 
{
	function beforeLoad(context) 
	{
		try
		{
			//context.form.clientScriptFileId = 22048;

			var button = context.form.addButton({
			id: 'custpage_bom_print_button',
			label: 'Custom Button',
			functionName: 'callSuitelet()'
			});

			var Removebutton = context.form.removeButton({
	            id :'return'
	        });
		}
		catch(e)
		{
			log.debug('Before Load Error',e)
		}
	}
	return {
	beforeLoad: beforeLoad
	};
});
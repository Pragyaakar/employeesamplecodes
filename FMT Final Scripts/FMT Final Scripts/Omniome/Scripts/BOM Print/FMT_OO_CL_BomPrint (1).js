/**
* @NApiVersion 2.0
* @NScriptType ClientScript
*/
var TranId;
define(['N/url','N/record','N/ui/dialog','N/runtime', 'N/currentRecord'],
function(url,record,dialog,runtime,currentRecord) 
{
	
	function pageInit(context,record,currentRecord) {
            var CorObj = context.currentRecord;
           return;
        }

	function callSuitelet()
	{
       var recno = currentRecord.get().id;


        var optionsRec = {
            title: 'Hello!',
            message: recno
         };

		var output = url.resolveScript({
		    scriptId: 'customscript_fmt_oo_sut_bomprint_pdf',
		    deploymentId: 'customdeploy_fmt_oo_sut_bomprint_pdf',
		    returnExternalUrl: true
		});

		output = output + '&recno=' + recno;

		window.open(output,'_blank');

		//dialog.alert(optionsRec);

	}

	return {
	pageInit : pageInit,
	callSuitelet: callSuitelet
	};
});
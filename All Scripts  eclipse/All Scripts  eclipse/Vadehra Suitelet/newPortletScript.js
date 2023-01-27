function htmlportlet(portlet, column)
{
	portlet.setTitle('Purchase Order Status Report');
	//var ent = entityid;
	var strVar="";
strVar += "<!DOCTYPE html>";
strVar += "<html>";
strVar += "<body>";
strVar += "";
strVar += "<iframe src=\'https://5375453-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=175&deploy=1'>";
strVar += " ";
strVar += "<\/iframe>";
strVar += "";
strVar += "<\/body>";
strVar += "<\/html>";
strVar += "";


	nlapiLogExecution('DEBUG','strVar after',strVar);

	portlet.setHtml(strVar);
	return;
}
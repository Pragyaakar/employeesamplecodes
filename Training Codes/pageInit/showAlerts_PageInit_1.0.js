function showAlertMessg(type)
{	
	if(type == 'edit')
	{
		var cust_Id = nlapiGetRecordId();
		nlapiLogExecution('DEBUG','Customer ID',cust_Id);
		
		var rec_Type = nlapiGetRecordType();
		nlapiLogExecution('DEBUG','Customer ID',cust_Id);
		
		alert('Record ID : '+' '+cust_Id+' '+'Record Type : '+' '+rec_Type);
	}
}
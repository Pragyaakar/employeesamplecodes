
function userEventAutoDateSet(type)
{
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	
    var irObj = nlapiLoadRecord(recordType,recordId);
	nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
  
	var lineCount = irObj.getLineItemCount('item');
	nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
	
    for(i=1;i<=lineCount;i++)
    {
		nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');

		var assetVal = irObj.getLineItemValue('item','custcol_far_trn_relatedasset',i);	
		
		if(!assetVal)
		{
			irObj.setLineItemValue('item','custcol_far_trn_relatedasset',i,1);
		}  
	}//End of if linecount	 

	nlapiSubmitRecord(irObj,true);
}

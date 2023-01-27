/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       6 Jan 2020     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */

function updateSaleRepOnJournal(type) 
{

	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();

	var irObj = nlapiLoadRecord(recordType,recordId);
	nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
  
	
	
	var lineCount = irObj.getLineItemCount('line');
	nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
   
	for(i=1;i<=lineCount;i++)
    {
		nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
		
		var lineOrder = irObj.getLineItemValue('line','custcol_cls_bill_order',i);
		
		if(lineOrder !=null && lineOrder !='' && lineOrder != undefined )
		{
			var soLoad = nlapiLoadRecord('salesorder',lineOrder);
			linerepSet = soLoad.getFieldText('salesrep');
			nlapiLogExecution('DEBUG','Serach Value','linerepSet ='+linerepSet+'Line num ='+i);
			irObj.setLineItemValue('line','custcol_cust_line_rep',i,linerepSet);
		}
       
	 }//End of if linecount	 
	nlapiSubmitRecord(irObj,true);
  

}// END Function

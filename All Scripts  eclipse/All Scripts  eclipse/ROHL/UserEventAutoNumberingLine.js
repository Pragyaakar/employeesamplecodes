/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Mar 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function userEventAutoLineNumberingPR(type)
{
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	
    var irObj = nlapiLoadRecord(recordType,recordId);
	nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
  
	var req_id = irObj.getFieldValue('custbody_req_num');
	nlapiLogExecution('DEBUG','Serach Value','lineCount req_id:'+req_id);
	
	var lineCount = irObj.getLineItemCount('item');
	
	var lineCount1 = irObj.getLineItemCount('expense');
	
	nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
	
	if(lineCount > 0 )
	{
		for(i=1;i<=lineCount;i++)
	    {
			nlapiLogExecution('DEBUG','Serach Value','item lineCount in for loop');
				
			irObj.setLineItemValue('item','custcol_uniq_id',i,i);
	       
		 }//End of if linecount	 
	    
	}
    
    
	if(lineCount1 > 0 )
	{
		 for(i1=1;i1<=lineCount1;i1++)
		    {
				nlapiLogExecution('DEBUG','Serach Value','Expense lineCount in for loop');
					
				irObj.setLineItemValue('expense','custcol_uniq_id',i1,i1);
		       
			 }//End of if linecount	 
		    
	}
   
    
    
	nlapiSubmitRecord(irObj,true);
  
}

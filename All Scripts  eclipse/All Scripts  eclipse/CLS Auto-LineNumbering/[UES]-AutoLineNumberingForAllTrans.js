/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       17 Mar 2020     Tushar More
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
function userEventAutoLineNumbering(type)
{
	try
	{
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var irObj = nlapiLoadRecord(recordType,recordId);
		//nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
	  
		var lineCount = irObj.getLineItemCount('item');
		
		var lineCount1 = irObj.getLineItemCount('expense');
		
		nlapiLogExecution('DEBUG','Serach Value','Item :'+lineCount);
		nlapiLogExecution('DEBUG','Serach Value','Expense :'+lineCount1);
		
		if(lineCount > 0 )
		{
			nlapiLogExecution('DEBUG','Serach Value','item lineCount in for loop');
			for(i=1;i<=lineCount;i++)
		    {
				
					
				irObj.setLineItemValue('item','custcol_auto_num',i,i);
		       
			 }//End of if linecount	 
		    
		}
	    
	    
		if(lineCount1 > 0 )
		{
			nlapiLogExecution('DEBUG','Serach Value','Expense lineCount in for loop');
			 for(i1=1;i1<=lineCount1;i1++)
			    {
						
					irObj.setLineItemValue('expense','custcol_auto_num',i1,i1);
			       
				 }//End of if linecount1 
			    
		}
	   
	    
	    
		nlapiSubmitRecord(irObj,true);
	}
    catch(e)
    {
    	nlapiLogExecution('DEBUG','Error In Line AutoNumbering','Error =='+e);
    }
  
}

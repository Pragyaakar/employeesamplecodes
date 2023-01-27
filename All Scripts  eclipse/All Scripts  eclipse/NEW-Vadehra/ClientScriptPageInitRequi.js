/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       29 Mar 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type)
{
	if(type == 'view')
		{
	    var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var irObj = nlapiLoadRecord(recordType,recordId); 
	    
	    var PRlinecount=irObj.getLineItemCount('item');
		  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
		  
		  var number= '0';
		  var number1= '0';
		
			for(var i=1;i<=PRlinecount;i++)
			{
	        	
				var ISrequire = irObj.getLineItemValue('item','custcol_vad_pr_apprreq',i);
				 nlapiLogExecution('DEBUG', 'aftr submit', "  ISrequire  ==" + ISrequire);
				 if(ISrequire == 'T')
	        		{
	        	    	number1=parseInt(number1)+parseInt(1);
	        		}
				 
			}
			var stat ='2';
			if(number1 == '0')
			{
				// irObj.setFieldValue('approvalstatus',2);
				nlapiSubmitField(recordType,recordId,'approvalstatus',stat)
			}
		}
}

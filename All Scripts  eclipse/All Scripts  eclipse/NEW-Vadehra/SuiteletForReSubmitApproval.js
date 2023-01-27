/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       22 Mar 2019     Tushar More
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suiteletForReSubmitApproval(request, response)
{
var recId = request.getParameter('id'); 
	
    var recType= request.getParameter('type');
    
  //  var searchId= 'item_location_search';
    
    recObj = nlapiLoadRecord(recType,recId);
	 
 	nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + recId +" type :"+recType+" Record :"+recObj);
	
	
		 	var approveStat = recObj.getFieldValue('approvalstatus');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  approveStat  ==" + approveStat);
	 	
      var PRlinecount=recObj.getLineItemCount('item');
	  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
	  
	
		for(var i=1;i<=PRlinecount;i++)
		{
        	
        	
        	var approveStatline = recObj.getLineItemValue('item','custcol_vad_appstatus',i);
        	
        	if(approveStatline == '3')
        		{
        		 recObj.setLineItemValue('item','custcol_vad_appstatus',i,'1');
        		}
        	
		}	
		nlapiSubmitRecord(recObj,true);
		  response.sendRedirect('RECORD', 'purchaserequisition', recId, false,'view');
}

/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       10 Dec 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function CloseTransactionStatusSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','CloseTransactionStatus', "Request Method = " +request.getMethod());
  try{
		 
		 var RecordId=request.getParameter('cust_id');//
		 var RecordType=request.getParameter('cust_type');
		 
		 nlapiLogExecution('DEBUG','CloseTransactionStatus', "RecordType = " +RecordType);
		/* if(RecordType =='opportunity')
	    {
			 var ReqObj = nlapiLoadRecord(RecordType,RecordId);
			 
			  ReqObj.setFieldValue('entitystatus',16);
			  
			 var submitRec= nlapiSubmitRecord(ReqObj);
			  
			  response.sendRedirect('RECORD', 'opportunity', submitRec, false,'view');
	    }
		else if(RecordType =='estimate')
        {
			 var ReqObj = nlapiLoadRecord(RecordType,RecordId);
			 var projName =ReqObj.getFieldValue('opportunity');
			 
			 projCloseFirst(projName);
			
			  ReqObj.setFieldValue('entitystatus',16);
			  
			  var submitRec= nlapiSubmitRecord(ReqObj);
			  
			  response.sendRedirect('RECORD', 'estimate', submitRec, false,'view');
        }*/
	}
  catch(e)
  {
	  nlapiLogExecution('DEBUG','CloseTransactionStatus', "Error = " +e);
   }
	
}

function projCloseFirst(projName)
{

	 var ReqObj1 = nlapiLoadRecord('opportunity',projName);
	 
	  ReqObj1.setFieldValue('entitystatus',16);
	  
	  nlapiSubmitRecord(ReqObj1);
}
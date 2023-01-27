/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00      9 Jan 2020       TM
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
function afterSubmitIFtoInvoiceCreation(type)
{
	 try
	  {
		if(type == 'edit') 
		{ 		
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var recObj = nlapiLoadRecord(recordType,recordId);
		//nlapiLogExecution('DEBUG','Serach Value','irObj :'+recObj +'Type :'+recordType+'ID :'+recordId);
		
		var customer = recObj.getFieldValue('entity');
		   
		  var customerRecord = nlapiLoadRecord('customer',customer);
		  
		  var CustomerName = customerRecord.getFieldValue('firstname');
			
		var ifDocNo = recObj.getFieldValue('tranid');
		
		var departMent = recObj.getFieldValue('department');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " departMent= " + departMent);
	
	    var emailRecipient = recObj.getFieldValue('email');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " emailRecipient= " + emailRecipient);
	 
		 var file = nlapiPrintRecord('TRANSACTION',recordId, 'PDF', null); //internal id of transaction (e.g IInvoice)
		// Send email
		 
	   var TrackNoArr = recObj.getFieldValue('custbody_if_track_numbers');
		 
		 if((emailRecipient !=null && emailRecipient !='' && emailRecipient!=undefined) && (TrackNoArr !=null && TrackNoArr !='' && TrackNoArr !=undefined))
		 {
			 var deptmLoad = nlapiLoadRecord('department',departMent);
			 
			 var Logo =deptmLoad.getFieldValue('custrecord_branch_logo');
			 
			 var Name =deptmLoad.getFieldValue('name');
			 
	         var sender = deptmLoad.getFieldValue('custrecord_from_email_addr'); // nlapiGetUser();
	         
             var recipient = emailRecipient;   //simon.ede@oggsolutions.com,emailRecipient
	        
		     var subject = "Brandnet Invoice Email";
	         
	         if(CustomerName !=null && CustomerName !=undefined && CustomerName !='')
	     	  {
	        	 CustomerName=CustomerName;
	     	  }
	         else{
	        	 CustomerName ='';
	         }
	         
	         if(Name !=null && Name !=undefined && Name !='')
	    	  {
	        	 Name=Name;
	    	  }
	        else{
	        	Name ='';
	        }
	         
	         var trckingNoLink ='https://auspost.com.au/mypost/track/#/';
	         var body ="<!DOCTYPE html><html><body><img src='"+Logo+"' width='180' height='120'><br>"+" Dear "+CustomerName+", <br><br>"+"Your order has been processed and is on its way to you. <br><br> Please track the progress of your order here "+trckingNoLink+".<br><br>Tracking # "+TrackNoArr+" <br><br>Thank you for shopping with "+Name+".<br><br><br> Best Regards,<br>"+Name+" Team.<br></body></html>";
	         var records=[];
	         records['transaction'] = recordId;
	         //var records =null;
	       	var checkEmail=nlapiSendEmail(sender, recipient, subject, body, null, null,records, file);
	      	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " checkEmail " + checkEmail);
		 }
		
      	var IfSubmitID =nlapiSubmitRecord(recObj,true);  
	  }
	} 
	    
			

	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e);
	  }
}



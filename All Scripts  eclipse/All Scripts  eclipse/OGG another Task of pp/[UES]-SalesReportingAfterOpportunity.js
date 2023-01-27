function User_AfterSubmitItemUpdate(type, form, request)
{
  try
  {
	     var recordId = nlapiGetRecordId();
	     var recordType = nlapiGetRecordType();
	     
	     var obj =nlapiLoadRecord(recordType,recordId);
	     
	     var productCategory = obj.getFieldValue('custrecord_sv_pgd_productgrp_itm');
	      var item =  obj.getFieldValue('custrecord_sv_item');
	      var itemType =  obj.getFieldValue('custrecord_item_type');
	

	      findProductGrpWholesale1(item,productCategory,itemType);
  }
  catch(e)
  {
	  nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "ERROR :="+e);
		 
  }
		    
}

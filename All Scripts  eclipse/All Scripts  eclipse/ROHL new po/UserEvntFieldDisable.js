function BeforeLoadFieldDisable(type, form, request)
{
//
	
	if(type=='edit')
	{ 
		 
			 var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		
	       var irObj = nlapiLoadRecord(recordType,recordId); 
	       var FormID =irObj.getFieldValue('customform');
	    
	       nlapiLogExecution('DEBUG', 'b4 Load ', "  irObjID  ==" + irObj);
	       nlapiLogExecution('DEBUG', 'b4 Load ', "  FormID  ==" + FormID);
	       
	      if(FormID == 174)
	       {
	    	  // var FieLD =  irObj.getLineItemField('item','rate');//
	    	 //  FieLD.setDisplayType('disabled');
	    	  // irObj.disableLineItemField('item','rate', true);
	    	   var sublist = form.getSubList('item');
	    	   var field = sublist.getField('rate');
	    	   field.setDisplayType('hidden');

	    	 //  nlapiLogExecution('DEBUG', 'b4 Load ', "  FieLD  ==" + FieLD);
	       }
	      
           
		// nlapiSubmitRecord(irObj,true);
	}
 
}


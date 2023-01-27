function User_BeforeSubmitItemUpdate(type, form, request)
{
  try
  {
	       var recordId = nlapiGetRecordId();
	       var recordType = nlapiGetRecordType();
	     
	       var itemObj=nlapiLoadRecord(recordType,recordId);
	       var Count =  itemObj.getLineItemCount('item');
			
	       var linNoArr =[1,2,3,4,5];
	       
	          var LineMandatoryField = nlapiGetLineItemField('item','location');
	     
	          if (LineMandatoryField)
	           {
	           	LineMandatoryField.setMandatory(false);
	           }
	       
	       nlapiLogExecution('DEBUG','findSupplierQtyBreak()', " := Count:-  "+Count);
			 
	       for (var j=0;j<linNoArr.length;j++)
	       {
	    	   for(var m=1;m<=Count;m++)
				 {
					var lineid =itemObj.getLineItemValue('item','line',m);
					
					if(linNoArr[j]== lineid)
					{
						itemObj.setLineItemValue('item','custcol_cust_line_rep',m);
					}
				 }
	       }
			 
			
	      
	      nlapiSubmitRecord(itemObj);
  }
  catch(e)
  {
	  nlapiLogExecution('DEBUG','User_AfterSubmitItemUpdate', "ERROR :="+e);
		 
  }
		    
}
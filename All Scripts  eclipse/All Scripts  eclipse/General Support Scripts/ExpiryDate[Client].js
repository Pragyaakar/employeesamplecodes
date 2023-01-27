var flag = true;
function validateLine_ExpDate(type) 
{
	//alert('type'+type);
    if(type == 'inventory')
    {
    	var rectype = nlapiGetRecordType();
        alert('rectype '+ rectype);
        
        if(rectype == 'inventoryadjustment')
        {
        	var subRec = nlapiViewCurrentLineItemSubrecord('inventory','inventorydetail');
            alert('subRec '+ subRec);
            
        	 if(subRec != null && subRec != '' && subRec != undefined )
             {
            var inventoryAssignmentCount = subRec.getLineItemCount('inventoryassignment');
            alert('inventoryAssignmentCount '+ inventoryAssignmentCount);
            
            var count =0;
            if(inventoryAssignmentCount != null && inventoryAssignmentCount != '' && inventoryAssignmentCount != undefined)
            {
            	for (j=1; j<=inventoryAssignmentCount; j++) 
                {
                	subRec.selectLineItem('inventoryassignment',j);
                    var expirationDate = subRec.getCurrentLineItemValue('inventoryassignment', 'expirationdate');
                    //alert('expirationDate '+ expirationDate);
                    //subre.commitLineItemValue('inventoryassignment');
                    
                    var date = new Date;
                    //alert('date '+ date);
                    
                    var dd = date.getDate();
                    var mm = date.getMonth() + 1; //January is 0!

                    var yyyy = date.getFullYear();
                    if (dd < 10) 
                    {
                      dd = '0' + dd;
                    } 
                    if (mm < 10) 
                    {
                      mm = '0' + mm;
                    } 
                    var today = dd + '/' + mm + '/' + yyyy;
                    //alert(" today " + today);
                    expirationDate = nlapiStringToDate(expirationDate);
                    today = nlapiStringToDate(today);
                    
                    alert("expirationDate "+ expirationDate +" today " + today);
                    
                    if (expirationDate != null && expirationDate < today)
                    {
                    	  count++;
                    	// return flag;
                    }   
                 
                }//end of For loop
            }//end of line count check

          if(count > 0)
            {
        	  alert('Expiration Date Should be greater than the todays date');
          	
            	flag = false;
            	//return flag;
            	// alert(" flag 1st flag" + flag);
            }
          }//end of subrec
        	
        }
    }//end of item check
    return flag;
}
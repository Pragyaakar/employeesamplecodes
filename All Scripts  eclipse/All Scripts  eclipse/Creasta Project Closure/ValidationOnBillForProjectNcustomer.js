function clientFieldChange(type, name, linenum) 
{
    var recType=nlapiGetRecordType();
    
        if(recType == 'vendorbill')
    	{
        	 if(type == 'item' && name == 'customer')
      	   {
      			
      			   var Project = nlapiGetCurrentLineItemValue('item','customer');
      			
      	           if(Project !=null && Project!='' && Project !=undefined)
      			   {
      				  var status = nlapiLookupField('job',Project,'entitystatus')

                       if(status ==1)
                       {
                      	 alert("You cannot select this Project..Because it is already closed.")
                      	  nlapiSetCurrentLineItemValue('item','customer','',false,true);
                       }
      			   }
      	          
             }
           
             if(type == 'item' && name == 'custcol_far_trn_relatedasset')
      	   {
      			
      			   var Project = nlapiGetCurrentLineItemValue('item','customer');
      			   var relatedAsset= nlapiGetCurrentLineItemValue('item','custcol_far_trn_relatedasset');
      			   
      			
      	           if(relatedAsset !=null && relatedAsset!='' && relatedAsset !=undefined)
      			   {
      	        	   var relatedProj =nlapiLookupField('customrecord_ncfar_asset',relatedAsset,'custrecord_assetproject')
      				  var status = nlapiLookupField('job',relatedProj,'entitystatus')

      	               if(status ==1)
      	               {
      	              	 alert("You cannot select this Related Asset..Because it is already closed.")
      	              	 
      	              	  nlapiSetCurrentLineItemValue('item','custcol_far_trn_relatedasset','',false,true);
      	 				 
      	               }
      					  

      			   }
      	          
           }
    	}
        else if(recType == 'journalentry')
        {
       	 if(type == 'line' && name == 'entity')
    	   {
    			
    			   var Project = nlapiGetCurrentLineItemValue('line','entity');
    			
    	           if(Project !=null && Project!='' && Project !=undefined)
    			   {
    				  var status = nlapiLookupField('job',Project,'entitystatus')

                     if(status ==1)
                     {
                    	 alert("You cannot select this Project..Because it is already closed.")
                    	  nlapiSetCurrentLineItemValue('line','entity','',false,true);
                     }
    			   }
    	          
           }
         
           if(type == 'line' && name == 'custcol_far_trn_relatedasset')
    	   {
    			
    			   var Project = nlapiGetCurrentLineItemValue('line','entity');
    			   var relatedAsset= nlapiGetCurrentLineItemValue('line','custcol_far_trn_relatedasset');
    			   
    			
    	           if(relatedAsset !=null && relatedAsset!='' && relatedAsset !=undefined)
    			   {
    	        	   var relatedProj =nlapiLookupField('customrecord_ncfar_asset',relatedAsset,'custrecord_assetproject')
    				  var status = nlapiLookupField('job',relatedProj,'entitystatus')

    	               if(status ==1)
    	               {
    	              	 alert("You cannot select this Related Asset..Because it is already closed.")
    	              	 
    	              	  nlapiSetCurrentLineItemValue('line','custcol_far_trn_relatedasset','',false,true);
    	 				 
    	               }
    					  

    			   }
    	          
         }
        }
        else if(recType == 'customrecord_ncfar_asset')
        {
       	 if(name == 'custrecord_assetproject')
    	   {
    			
    			   var Project = nlapiGetFieldValue('custrecord_assetproject');
    			
    	           if(Project !=null && Project!='' && Project !=undefined)
    			   {
    				  var status = nlapiLookupField('job',Project,'entitystatus')

                     if(status ==1)
                     {
                    	 alert("You cannot select this Project..Because it is already closed.")
                    	  nlapiSetFieldValue('custrecord_assetproject','',false,true);
                     }
    			   }
    	          
           }
         
           if(name == 'custrecord_assetparent')
    	   {
    			
    			  // var Project = nlapiGetCurrentLineItemValue('line','entity');
    			   var relatedAsset= nlapiGetFieldValue('custrecord_assetparent');
    			   
    			
    	           if(relatedAsset !=null && relatedAsset!='' && relatedAsset !=undefined)
    			   {
    	        	   
    	        	   var relatedProj =nlapiLookupField('customrecord_ncfar_asset',relatedAsset,'custrecord_assetproject')
      				 
    				  var status = nlapiLookupField('job',relatedProj,'entitystatus')

    	               if(status ==1)
    	               {
    	              	  alert("You cannot select this Related Asset..Because it is already closed.")
    	              	  nlapiSetFieldValue('custrecord_assetparent','',false,true);
    	 				 
    	               }
    					  

    			   }
    	          
         }
        }
    
}
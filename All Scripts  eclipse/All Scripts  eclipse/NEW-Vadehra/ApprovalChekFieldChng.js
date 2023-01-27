/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Mar 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function approvalChkForPostSource(type,name)
{

	 if(type == 'item' && name == 'item') 
    {

		 var location;
		 
		 var item;
	     var qty;

		item = nlapiGetCurrentLineItemValue('item','item');
		//alert('item is'+item);
		//location = nlapiGetFieldValue('location');
		//alert('location is'+location);

		  if(item!=null && item != '')
		  {
			
			 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
			 var columns = new Array();
			 columns[0] = new nlobjSearchColumn('custitem_in_hsn_code');
			// columns[1] = new nlobjSearchColumn('locationquantityonhand');
			
			 var filters = new Array();
			 filters[0] = new nlobjSearchFilter ('internalid', null, 'anyof',item);
			// filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
      		 var searchresults = nlapiSearchRecord('item',null,filters,columns);//customsearch_item_search_so_po
      		 
      		if(searchresults != null)
   		{
   			for (var i = 0;  i < searchresults.length; i++) 
   			{
   				var hsnCode = searchresults[i].getValue('custitem_in_hsn_code');
                      //alert('locationquantityavailable***************' +avail_quant);
   			         				
   				nlapiSetCurrentLineItemValue('item','custcol_in_hsn_code',hsnCode);
   				
   			}
   				
   		}	
           // alert('role  =='+nlapiGetRole())
      	 nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq','T');
              
	      }
		}
	 if(type == 'item' &&  name == 'customer') 
     {
		 
    
	  var item = nlapiGetCurrentLineItemValue('item','item');

	  var projName = nlapiGetCurrentLineItemValue('item','customer');
	  
	  var quantity = nlapiGetCurrentLineItemValue('item','quantity');

	  var amount = nlapiGetCurrentLineItemValue('item','estimatedamount');
       
      var approval = nlapiGetCurrentLineItemValue('item','custcol_vad_appstatus');
      
      var approvalFreq = nlapiGetCurrentLineItemValue('item','custcol_vad_freappr');
      
      var lineNum = nlapiGetCurrentLineItemValue('item','line');
	  
     //  alert('ProjectName==' +projName);
     // alert('item ==' +item);
     // alert('quantity==' +quantity);
     // alert('amount ==' +amount);
     //   alert('approval==' +approval);
     //   alert('approvalFreq==' +approvalFreq);
        
      if(projName != null && projName != undefined && projName != '')
      {
      
	var filters=new Array();
	filters[0]=new nlobjSearchFilter('custrecord_vad_proj_id', null,'anyof',projName);
	// nlapiLogExecution('DEBUG','searchid','projName : '+projName);
	 filters[1] = new nlobjSearchFilter('custrecord_vad_item', null, 'anyof', item);
	 
	      var columns = new Array();
			 columns[0] = new nlobjSearchColumn('custrecord_vad_approvalrequired');
			 columns[1] = new nlobjSearchColumn("custrecordvad_thresholdlimitqty"); 
			 columns[2] =  new nlobjSearchColumn("custrecord_vad_thresholdlimitamt");
			 columns[3] =  new nlobjSearchColumn("custrecord_freqofapprove");
			 columns[4] =  new nlobjSearchColumn("internalid");
			 columns[5] =  new nlobjSearchColumn("custrecord_vad_proj_id");
			 
	 var searchresults = nlapiSearchRecord('customrecord_vad_proj_item_wise_apprval',null, filters, columns);
	 
	 if(searchresults != null)
		{
		  
			for (var i = 0;  i < searchresults.length; i++) 
			{
				var id =  searchresults[i].getValue('internalid');
				var projId = searchresults[i].getValue('custrecord_vad_proj_id');
				var approvRequi = searchresults[i].getValue('custrecord_vad_approvalrequired');
				var thrsldLimQty = searchresults[i].getValue('custrecordvad_thresholdlimitqty');
				var thrsldLimAmt = searchresults[i].getValue('custrecord_vad_thresholdlimitamt');
				var approvFrequency = searchresults[i].getValue('custrecord_freqofapprove');  
				var oneTimeApprvd = searchresults[i].getValue('custrecord_one_time_approved');//custrecord_one_time_approved
				
			    // alert('approvRequi ==' +approvRequi);
			    //	alert('thrsldLimQty ==' +thrsldLimQty);
			    //	alert('thrsldLimAmt ==' +thrsldLimAmt);
			    //	alert('approvFrequency ==' +approvFrequency);
			    //	alert('oneTimeApprvd ==' +oneTimeApprvd);
			    //	alert('id ==' +id);
			        
			    	if(projId == projName )
			    	{
				    	if((approvFrequency == '1'&& oneTimeApprvd !='T')|| (approvFrequency == '2' ))//||)
				    	{
				    		nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq',approvRequi);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresqty',thrsldLimQty);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresamt',thrsldLimAmt);
							nlapiSetCurrentLineItemValue('item','custcol_vad_freappr',approvFrequency);
							nlapiSetCurrentLineItemValue('item','custcol_cust_rec_id',id);
							//nlapiSetCurrentLineItemValue('item','custcol_linenum',lineNum);
				     	}
                      else if (approvFrequency == '3' && parseInt(thrsldLimQty) < parseInt(quantity))
                      {
                        
				    		nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq',approvRequi);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresqty',thrsldLimQty);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresamt',thrsldLimAmt);
							nlapiSetCurrentLineItemValue('item','custcol_vad_freappr',approvFrequency);
							nlapiSetCurrentLineItemValue('item','custcol_cust_rec_id',id);
                      }
                      else if (approvFrequency == '3' && parseFloat(thrsldLimAmt) < parseFloat(amount))
                      {
                        
				    		nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq',approvRequi);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresqty',thrsldLimQty);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresamt',thrsldLimAmt);
							nlapiSetCurrentLineItemValue('item','custcol_vad_freappr',approvFrequency);
							nlapiSetCurrentLineItemValue('item','custcol_cust_rec_id',id);
                      }
                      else
                      {
                            nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq','F');
                            nlapiSetCurrentLineItemValue('item','custcol_vad_appstatus','5');
                      }
                      
				    	if(approvRequi == 'F')
				    	{
				    		nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq',approvRequi);
                            nlapiSetCurrentLineItemValue('item','custcol_vad_appstatus','5');
				    	}
			           
			    	}
			    

			}
		
			 var venstatobj = nlapiLoadRecord('customrecord_vad_proj_item_wise_apprval',id);
			 if(oneTimeApprvd != 'T' && approvFrequency =='1')
	    		{
				 venstatobj.setFieldValue('custrecord_one_time_approved','T');
	    		}
			 venstatobj.setFieldValue('custrecord_rec_id',id);
			 nlapiSubmitRecord(venstatobj,true,false);  
		}
      	else
			        	{
			    		 nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq','T');
					     nlapiSetCurrentLineItemValue('item','custcol_vad_appstatus','1');	
			    	  }
      }
     }
	 
	 
	 
	 if(type == 'item' && name == 'estimatedrate') 
     {
		 
    
	  var item = nlapiGetCurrentLineItemValue('item','item');

	  var projName = nlapiGetCurrentLineItemValue('item','customer');
	  
	  var quantity = nlapiGetCurrentLineItemValue('item','quantity');

	  var amount = nlapiGetCurrentLineItemValue('item','estimatedamount');
       
      var approval = nlapiGetCurrentLineItemValue('item','custcol_vad_appstatus');
      
      var approvalFreq = nlapiGetCurrentLineItemValue('item','custcol_vad_freappr');
      
      var lineNum = nlapiGetCurrentLineItemValue('item','line');
	  
     //  
     // alert('item ==' +item);
     // alert('quantity==' +quantity);
     // alert('amount ==' +amount);
     //   alert('approval==' +approval);
     //   alert('approvalFreq==' +approvalFreq);
   if(projName != null && projName != undefined && projName != '')
   {
	   
	   alert('ProjectName==' +projName);
	var filters=new Array();
	filters[0]=new nlobjSearchFilter('custrecord_vad_proj_id', null,'anyof',projName);
	// nlapiLogExecution('DEBUG','searchid','projName : '+projName);
	 filters[1] = new nlobjSearchFilter('custrecord_vad_item', null, 'anyof', item);
	 
	      var columns = new Array();
			 columns[0] = new nlobjSearchColumn('custrecord_vad_approvalrequired');
			 columns[1] = new nlobjSearchColumn("custrecordvad_thresholdlimitqty"); 
			 columns[2] =  new nlobjSearchColumn("custrecord_vad_thresholdlimitamt");
			 columns[3] =  new nlobjSearchColumn("custrecord_freqofapprove");
			 columns[4] =  new nlobjSearchColumn("internalid");
			 columns[5] =  new nlobjSearchColumn("custrecord_vad_proj_id");
			 
	 var searchresults = nlapiSearchRecord('customrecord_vad_proj_item_wise_apprval',null, filters, columns);
	 
	 if(searchresults != null)
		{
		  
			for (var i = 0;  i < searchresults.length; i++) 
			{
				var id =  searchresults[i].getValue('internalid');
				var projId = searchresults[i].getValue('custrecord_vad_proj_id');
				var approvRequi = searchresults[i].getValue('custrecord_vad_approvalrequired');
				var thrsldLimQty = searchresults[i].getValue('custrecordvad_thresholdlimitqty');
				var thrsldLimAmt = searchresults[i].getValue('custrecord_vad_thresholdlimitamt');
				var approvFrequency = searchresults[i].getValue('custrecord_freqofapprove');  
				var oneTimeApprvd = searchresults[i].getValue('custrecord_one_time_approved');//custrecord_one_time_approved
				
			    // alert('approvRequi ==' +approvRequi);
			    //	alert('thrsldLimQty ==' +thrsldLimQty);
			    //	alert('thrsldLimAmt ==' +thrsldLimAmt);
			    //	alert('approvFrequency ==' +approvFrequency);
			    //	alert('oneTimeApprvd ==' +oneTimeApprvd);
			    //	alert('id ==' +id);
			        
			    	if(projId == projName )
			    	{
				    	if((approvFrequency == '1'&& oneTimeApprvd !='T')|| (approvFrequency == '2' ))//||)
				    	{
				    		nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq',approvRequi);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresqty',thrsldLimQty);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresamt',thrsldLimAmt);
							nlapiSetCurrentLineItemValue('item','custcol_vad_freappr',approvFrequency);
							nlapiSetCurrentLineItemValue('item','custcol_cust_rec_id',id);
							//nlapiSetCurrentLineItemValue('item','custcol_linenum',lineNum);
				     	}
                      else if (approvFrequency == '3' && parseInt(thrsldLimQty) < parseInt(quantity))
                      {
                        
				    		nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq',approvRequi);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresqty',thrsldLimQty);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresamt',thrsldLimAmt);
							nlapiSetCurrentLineItemValue('item','custcol_vad_freappr',approvFrequency);
							nlapiSetCurrentLineItemValue('item','custcol_cust_rec_id',id);
                      }
                      else if (approvFrequency == '3' && parseFloat(thrsldLimAmt) < parseFloat(amount))
                      {
                        
				    		nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq',approvRequi);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresqty',thrsldLimQty);
							nlapiSetCurrentLineItemValue('item','custcol_vad_thresamt',thrsldLimAmt);
							nlapiSetCurrentLineItemValue('item','custcol_vad_freappr',approvFrequency);
							nlapiSetCurrentLineItemValue('item','custcol_cust_rec_id',id);
                      }
                      else
                      {
                            nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq','F');
                            nlapiSetCurrentLineItemValue('item','custcol_vad_appstatus','5');
                      }
                      
				    	if(approvRequi == 'F')
				    	{
				    		nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq',approvRequi);
                            nlapiSetCurrentLineItemValue('item','custcol_vad_appstatus','5');
				    	}
			           
			    	}
			    

			}
		
			 var venstatobj = nlapiLoadRecord('customrecord_vad_proj_item_wise_apprval',id);
			 if(oneTimeApprvd != 'T' && approvFrequency =='1')
	    		{
				 venstatobj.setFieldValue('custrecord_one_time_approved','T');
	    		}
			 venstatobj.setFieldValue('custrecord_rec_id',id);
			 nlapiSubmitRecord(venstatobj,true,false);  
		}
      	else
			        	{
			    		 nlapiSetCurrentLineItemValue('item','custcol_vad_pr_apprreq','T');
					     nlapiSetCurrentLineItemValue('item','custcol_vad_appstatus','1');	
			    	  }
   }
     }
	 
	 
	 
  if(type == 'item' && name == 'custcol_vad_pr_apprreq')
	{
		 var apprRequd;
		 var appStatus ='1';
		 apprRequd = nlapiGetCurrentLineItemValue('item','custcol_vad_pr_apprreq')
		 if(apprRequd == 'T')
		 {
			 nlapiSetCurrentLineItemValue('item','custcol_vad_appstatus',appStatus);
		 }
	}
	 if(type == 'item' && name == 'customer')
	{
		 var project;
		 var projbj;
		 var location;
		 project = nlapiGetCurrentLineItemValue('item','customer')
		 if(project != null && project != '')
		 {
			 projbj = nlapiLoadRecord('job',project);
			 location = projbj.getFieldValue('custentity_cust_vad_prjlocation')
			 if(location != null && location != '')
			 {
				 nlapiSetCurrentLineItemValue('item','location',location);
			 }
		 }
	}
}
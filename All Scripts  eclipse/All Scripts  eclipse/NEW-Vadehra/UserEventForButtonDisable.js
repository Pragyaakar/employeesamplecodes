/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Feb 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function BeforeLoadMaterialSOButton(type, form, request)
{
//
	
	if(type=='view' )
	{ 
		 
		     form.removeButton('createpo');
		     form.setScript('customscript_client_suite_requi_redirect');
	        	form.addButton('custpage_button1','Generate Purchase Order','clientScriptPOredirect();');
			
		 
		 
			 var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		
	       var irObj = nlapiLoadRecord(recordType,recordId); 
	       var status =irObj.getFieldValue('approvalstatus');
	    
      
	  	if(status != '2')
           {
	  	  form.removeButton('createpo');
           }
         
		 var PRlinecount=irObj.getLineItemCount('item');
		  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
		  
		  var number= '0';
		  var number1= '0';
		
			for(var i=1;i<=PRlinecount;i++)
			{
	        	
				var ISrequire = irObj.getLineItemValue('item','custcol_vad_pr_apprreq',i);
				 nlapiLogExecution('DEBUG', 'aftr submit', "  ISrequire  ==" + ISrequire);
				 
	        	var approveStatline = irObj.getLineItemValue('item','custcol_vad_appstatus',i);          //custcol_vad_pr_apprreq
	        	  nlapiLogExecution('DEBUG', 'aftr submit', "  approveStatline  ==" + approveStatline);
	        	
	            	if(approveStatline == '3')
	        		{
	        	    	number=parseInt(number)+parseInt(1);
	        		}
	            	
	            	if(ISrequire == 'T')
	        		{
	        	    	number1=parseInt(number1)+parseInt(1);
	        		}
	            	 
	            	if(nlapiGetRole() != '3')
	            	{
	            	     irObj.getLineItemField('item','custcol_vad_pr_apprreq').setDisplayType('disabled');
	            	}
			}	
			if(number >= 1)
			{
				   form.setScript('customscript_client_suite_requi_redirect');   
	               form.addButton('custpage_button','Re-Submit For Approval','ReSubmitApproval();');
			}
			var stat ='2';
			if(number1 == '0')
			{
				// irObj.setFieldValue('approvalstatus',2);
				nlapiSubmitField(recordType,recordId,'approvalstatus',stat)
			}
			
			
	}
 
}
function AfterSubmit(type, form, request)
{
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	
    var irObj = nlapiLoadRecord(recordType,recordId);
	nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
  
	var lineCount = irObj.getLineItemCount('item');
	nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
  var val='0';
  var number1 ='0';
    for(i=1;i<=lineCount;i++)
    {
		nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
		
		var ISrequire = irObj.getLineItemValue('item','custcol_vad_pr_apprreq',i);
		 nlapiLogExecution('DEBUG', 'aftr submit', "  ISrequire  ==" + ISrequire);
		 
			if(ISrequire == 'T')
    		{
    	    	number1=parseInt(number1)+parseInt(1);
    		}
		
		irObj.setLineItemValue('item','custcol_linenum',i,i);
       var lineStat= irObj.getLineItemValue('item','custcol_vad_appstatus',i);
      nlapiLogExecution('DEBUG','Serach Value','lineStat :'+lineStat );
          if(lineStat =='2')
          {
            val= parseInt(val)+ parseInt(1);
            nlapiLogExecution('DEBUG','Serach Value','lineStat :'+val );
          //  nlapiDisableLineItemField('item','custcol_vad_pr_apprreq',true);
           
        	 var lineField = irObj.getLineItemField('item','custcol_vad_pr_apprreq');
             lineField.setDisplayType('disabled');
    		
          }
	 }//End of if linecount	 
  if(lineCount == val || number1 == '0')
  {
      irObj.setFieldValue('approvalstatus',2);
  }
  
 
	nlapiSubmitRecord(irObj,true);
  
}

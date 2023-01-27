/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       04 Sep 2019     AMOL ATPL
 *
 */

function beforeLoad_RejectButton_so(type, form) 
{
  try
  {
	  var url = nlapiResolveURL('SUITELET','customscript_sut_rejectionreason_quote','customdeploy_sut_rejectionreason_quote')+'&custscript_record_id=' + nlapiGetRecordId() +  '&custscript_record_type=' + nlapiGetRecordType();
	  var script = "win = window.open('" + url + "', 'win', 'resizable=0,scrollbars=0,width=450,height=300');";
	  if(nlapiGetRecordId()!=null && nlapiGetRecordId() != '' && nlapiGetRecordId()!= undefined)
	  {
		  var filters = new Array();
		  var columns = new Array();
    
		  filters[0] = new nlobjSearchFilter('internalid', null, 'is', nlapiGetRecordId());
		  columns[0] = new nlobjSearchColumn('internalid');
    
		  var record = nlapiLoadRecord('salesorder',nlapiGetRecordId())
    
		  var status = record.getFieldValue('custbody_so_appr_status')
		  nlapiLogExecution('DEBUG', 'After Submit', "  status==" +status);
    
		 // if(status==8 || status=='')
		  {	
			  var searchResultItem = nlapiSearchRecord ('salesorder','customsearch268',filters,columns);
			  var searchResultItem1 = nlapiSearchRecord ('estimate','customsearch269',filters,columns);
			  if (searchResultItem != null && searchResultItem != '' && searchResultItem != undefined) 
			  {
				 /* for (var i = 0;i < searchResultItem.length; i++) 
				  {
					  var ID = searchResultItem[i].getValue('internalid');
					  nlapiLogExecution('DEBUG', 'After Submit', "  ID==" + ID);
				  }*/
			     // }
			//  if(ID != null && ID != '' && ID != undefined)
			 // {
				  form.addButton('custpage_buttonalert', 'Reason for Rejection', script);
			  }
			  
			  else if (searchResultItem1 != null && searchResultItem1 != '' && searchResultItem1 !=  undefined) 
			  {
				  form.addButton('custpage_buttonalert', 'Reason for Rejection', script);
			  }
		  }//end of internal id check
    
		 // else if(status==7)
		  {	
			
		/*	  if (searchResultItem != null) 
			  {
				  for (var i = 0;i < searchResultItem.length; i++) 
				  {
					  var ID = searchResultItem[i].getValue('internalid');
					  nlapiLogExecution('DEBUG', 'After Submit', "  ID==" + ID);

				  }
			  }
			  if(ID != null && ID != '' && ID != undefined)
			  {
				  form.addButton('custpage_buttonalert', 'Reason for Rejection', script);
			  }*/
		  }
    
	  }//END : if(nlapiGetRecordId()!=null && nlapiGetRecordId() != '' && nlapiGetRecordId()!= undefined)	
    //form.addButton('custpage_buttonalert', 'Add Memo', script);

    var ids = ['custpageworkflow877','custpageworkflow558'];
    var script1 = '';

    script1 += '<script>';

    ids.forEach(function(entry) {
            script1 += 'jQuery("#' + entry + '").click(function() {'+ script +'});';
    });

    script1 += '</script>'


    var newInlineHtmlField = form.addField('custpage_myinline','inlinehtml','',null,null);
        newInlineHtmlField.setDefaultValue(script1);
}
  catch(e)
	 {
			
    	throw nlapiCreateError('UE_Error',"Error is ..."+e, false); 
	 }
}
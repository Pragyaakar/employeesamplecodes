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
function BeforeLoadMaterialIssueButton(type, form, request)
{
//
	
	if(type=='view' )
	{ 
		try
		{
			
		
		    var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		
	       var irObj = nlapiLoadRecord(recordType,recordId); 
	       var status =irObj.getFieldValue('approvalstatus');
	 	  nlapiLogExecution('DEBUG', 'Before Load', "  status  ==" + status);
      
	 	
	 	  form.removeButton('createpo');
	 	  
	 	  
	  	 var PRlinecount=irObj.getLineItemCount('item');
		  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
		var ISrequireQtyArr=[];
		var remQtyArr=[];
		var remPoArr=[];
		
			for(var i=1;i<=PRlinecount;i++)
			{
	        	
				var remQty = irObj.getLineItemValue('item','custcol_remain_qty_for_pr',i);
				// nlapiLogExecution('DEBUG', 'aftr submit', "  ISrequireQty  ==" + ISrequireQty);
				
				if(remQty!=null && remQty!='' && remQty!=undefined )
				 {
				   remQtyArr.push(remQty);
				   
				   if(remQty =='0')
				   {
					   remPoArr.push(remQty);
				   }
				 }
				var ISrequireQty;// = irObj.getLineItemValue('item','custcol_onlocation_available',i);
				// nlapiLogExecution('DEBUG', 'aftr submit', "  ISrequireQty  ==" + ISrequireQty);
				
				var item = irObj.getLineItemValue('item','item',i);
				// nlapiLogExecution('DEBUG', 'aftr submit', "  ISrequireQty  ==" + ISrequireQty);
				
				var location = irObj.getLineItemValue('item','location',i);
				// nlapiLogExecution('DEBUG', 'aftr submit', "  ISrequireQty  ==" + ISrequireQty);
				
				var searchresults = findTransaction(item,location);
					
					 nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
				/*	 var columns = new Array();
					 columns[0] = new nlobjSearchColumn('locationquantityavailable');
				
					
					 var filters = new Array();
					 filters[0] = new nlobjSearchFilter ('internalid', null, 'anyof',item);
					 filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
		     		 var searchresults = nlapiSearchRecord('item',null,filters,columns);//customsearch_item_search_so_po
		     		 */
		     		if(searchresults != '' && searchresults != undefined && searchresults != null && searchresults.length > 0)
		  	    	{
			  			for (var p = 0;  p < searchresults.length; p++) 
			  			{
			  				ISrequireQty = searchresults[p].getValue('locationquantityavailable');
			                //     alert('locationquantityavailable***************' +avail_quant);
			  			    
			  			 }
			  				
		  		    }	
				
				 
				 
				 
				    if(ISrequireQty!=null && ISrequireQty!='' && ISrequireQty!=undefined )
					 {
				    	 ISrequireQtyArr.push(ISrequireQty);
					 }
				
			}	
			 nlapiLogExecution('DEBUG', 'aftr submit', "  ISrequireQtyArr  ==" + ISrequireQtyArr);
			 nlapiLogExecution('DEBUG', 'aftr submit', "  ISrequireQtyArr.length  ==" + ISrequireQtyArr.length);
             nlapiLogExecution('DEBUG', 'aftr submit', "  remPoArr  ==" + remPoArr);
			 nlapiLogExecution('DEBUG', 'aftr submit', "  remPoArr.length  ==" + remPoArr.length);
			 
			  if(remQtyArr.length >=1 && remPoArr.length !=PRlinecount)
			 {
				
                  form.setScript('customscript_client_location_acc_redirec');
			 	  form.addButton('custpage_createpo','Create PO','CallToCreatePOonNext();');
			  	  
			 }
			  else if(remPoArr.length ==PRlinecount)
			  {
				  form.removeButton('custpage_createpo');
			  }
			 
			 if( ISrequireQtyArr.length >=1 ) //status == '2' &&  commented for pradnyas testing
	         {
		  		    form.setScript('customscript_client_location_acc_redirec');
		  			form.addButton('custpage_button1','Material Issue','clientScriptMIredirect();');
	         }
	}
	catch(e)
	{
		nlapiLogExecution('Error',' Error in script','Erroorrr :'+e )
	}
			
	}
 
}

function userEventAutoLineNumberingPR(type)
{
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	
    var irObj = nlapiLoadRecord(recordType,recordId);
	nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
  
	var req_id = irObj.getFieldValue('custbody_req_num');
	nlapiLogExecution('DEBUG','Serach Value','lineCount req_id:'+req_id);
	
	var lineCount = irObj.getLineItemCount('item');
	nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
    for(i=1;i<=lineCount;i++)
    {
		nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
		
      var qty =irObj.getLineItemValue('item','quantity',i);
      
      var qtyStock =irObj.getLineItemValue('item','custcol_onlocation_available',i);
      
      if(qtyStock =='' || qtyStock ==undefined || qtyStock == null)
        {
          irObj.setLineItemValue('item','custcol_remain_qty_for_pr',i,qty);
        }
		irObj.setLineItemValue('item','custcol_auto_line_num',i,i);
      //  irObj.setLineItemValue('item','custcol_remain_qty_for_pr',i,'0');
       
	 }//End of if linecount	 
	nlapiSubmitRecord(irObj,true);
  
}


function findTransaction(itmid,locForm)
{
	var searchId ='customsearch_item_avlble_search';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',itmid);
	 filters[1]=new nlobjSearchFilter('inventorylocation',null,'anyOf',locForm);
	savedSearch.addFilters(filters);
	   
	    var resultset = savedSearch.runSearch();
		var returnSearchResults = [];
	    var searchid = 0;
	    do {
    	
	        var resultslice = resultset.getResults(searchid, searchid + 1000);
	        if(resultslice!= null)
	        {
	    	   for ( var rs in resultslice) 
		        {
		        	returnSearchResults.push(resultslice[rs]);
		            searchid++;
		        }
	    	   nlapiLogExecution('DEBUG','searchid','searchid'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;

} 
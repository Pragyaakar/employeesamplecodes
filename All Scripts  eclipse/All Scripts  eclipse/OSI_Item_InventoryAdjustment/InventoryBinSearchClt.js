/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Dec 2018     Priyanka Patil
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
function clientFieldChanged(type, name, linenum)
{
	
	 if(name == 'custpage_location')//&& type =='custpage_location' 
     {
		 //alert(' In location change');
		 var lineCount;
		 var location;
		 var i=0;
		 var item;
		 var InvNumber = new Array();
		 var serialNum;
		 var binNum;
		 var qty;
		 var subsidiary;
		
		 
		item = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_item',1);
		//alert(' item = ' + item);
			 	
		location = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_location',1);
		alert('location = ' + location);
			 	
		binNum =nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_binnum',1);
		alert('binNum = ' + binNum);
			 	
   
		/*nlapiRemoveLineItemOption('custpage_sig_req_sublist', 'custpage_binnum');	//remove all existing select options	
		nlapiInsertLineItemOption('custpage_sig_req_sublist', 'custpage_binnum', '', '', true);	//Insert null value and default it to selected	
		location = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_location',1);
		
		var binSelect;
	 	var filters =[];
		filters[0]= new nlobjSearchFilter('inactive', null, 'is', 'F');
		filters[1]= new nlobjSearchFilter('location', null, 'anyof', location);
		
		var columns = [];
		columns[0] = new nlobjSearchColumn('binnumber');
			
		var binSearch = nlapiCreateSearch('bin', filters,columns);
		var binSearchResults = binSearch.runSearch();
		var binResultIndex = 0; 
		var binResultStep = 1000; 
		var binResultSet; 
	    var binOption = new Array();
		do 
		{
			binResultSet = binSearchResults.getResults(binResultIndex, binResultIndex + binResultStep);
			
			binResultIndex = binResultIndex + binResultStep;
			//alert('binResultIndex = ' + binResultIndex);
	        if(binResultSet.length>0)
	        {
	        	alert('binResultSet length in if= ' +binResultSet);
	            binOption = binOption.concat(binResultSet);
	            //alert('binOption length in if= ' +binOption);
	        }
	    } 
		while (binResultSet.length < 0); 
		alert('binResultSet length in while loop= ' +binResultSet.length);
		
		binSelect.addSelectOption('','');
		for(var i=0; i<binOption.length; i++)
	    {
			alert('binOption.length= ' +binOption.length);
			var id = binOption[i].getId();
	        var name = binOption[i].getValue('binnumber');
	       binSelect.addSelectOption(id,name);

			nlapiInsertLineItemOption('custpage_sig_req_sublist','custpage_binnum',id,name); 
		}*/
	   
//--------------------------------------------

		if(item!=null && item != '')
		{
			alert('item '+item);
			 
			 /*var columns = new Array();
			 columns[0] = new nlobjSearchColumn('locationquantityavailable');
			 columns[1] = new nlobjSearchColumn('locationquantityonhand');
			 columns[2] = new nlobjSearchColumn('serialnumber');
			 columns[3] = new nlobjSearchColumn("binnumber","inventoryDetail",null).setSort(false);
			 columns[4] = new nlobjSearchColumn("location","inventoryDetail",null);
			 
			 var filters = new Array();
			 filters[0] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
			 filters[1] = new nlobjSearchFilter ('internalid', null, 'anyof',item);
             filters[2] = new nlobjSearchFilter("location","inventoryDetail",'anyof',location);
			//filters[2] = new nlobjSearchFilter ('binnumber',null,'anyof',binNum);*/			 
			
			var searchresults = nlapiSearchRecord("item",null,
					[
					   ["isspecialorderitem","is","F"], 
					   "AND", 
					   ["isinactive","is","F"], 
					   "AND", 
					   ["type","anyof","InvtPart","Group","Kit"], 
					   "AND", 
					   ["inventorydetail.location","anyof",location]
					], 
					[
					   new nlobjSearchColumn("itemid"), 
					   new nlobjSearchColumn("type"), 
					   new nlobjSearchColumn("binnumber","inventoryDetail",null).setSort(false), 
					   new nlobjSearchColumn("quantity","inventoryDetail",null), 
					   new nlobjSearchColumn("inventorynumber","inventoryDetail",null), 
					   new nlobjSearchColumn("location","inventoryDetail",null).setSort(false)
					]
					);
			
			var binArray = new Array();
			 
			// var searchresults = nlapiSearchRecord('item','customsearch_wmsse_inv_report',null,null);
			 if (searchresults != null)
				{
					for(var k=0;k<searchresults.length;k++)
					{	
						
						serialNum = searchresults[k].getValue("inventorynumber","inventoryDetail",null);
						InvNumber.push(serialNum);
						var s = InvNumber.toString();
						
						binNum = searchresults[k].getValue("binnumber","inventoryDetail",null);
						binArray.push(binNum);
						nlapiLogExecution('DEBUG','binNum',binNum);
						//alert('binNum in for loop = ' + binNum);
						//nlapiAddSelectOption(searchresults[k].getId(),searchresults[k].getValue('binnumber'));
						//nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNum);
						//nlapiInsertLineItemOption('custpage_sig_req_sublist', 'custpage_binnum',searchresults[k].getId(),searchresults[k].getValue('binnumber'));

					}
				}
			 alert('binArray:'+binArray);
				if(InvNumber)
				{
					 chk = nlapiGetFieldValue('custpage_checkbox');
					 
					 if(chk =='T')
						 {
						 	nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_serialinvt',s.replace(/(\r\n|\n|\r)/gm,","));
						 	nlapiSetFieldValue('custpage_serialinvt',s.replace(/(\r\n|\n|\r)/gm,","));
						 	nlapiSetFieldValues('custpage_binnum',binArray);
						 }
				}
		     }
		}
	 if(name == 'custpage_req_adjustqty')
		{
		 qty = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_req_adjustqty',1);
		 chk = nlapiGetFieldValue('custpage_checkbox');
		 
			 if(chk =='T')
				 {
				 	if(qty >0)
				 	{
				 			alert('Please Enter a Negative value');
						 nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_req_adjustqty','');
						 nlapiDisableLineItemField('custpage_sig_req_sublist','custpage_location',true);
				 	}
				 	else{
				 		nlapiDisableLineItemField('custpage_sig_req_sublist','custpage_location',false);
				 	}
				 }
			 else
				 {
					 if(qty < 0)
					 {
					 alert('Please Enter a Positive value');
					 nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_req_adjustqty','');
					
					 }
			 }
		}
}

function serialSaveRecord()
{
	var chk = nlapiGetFieldValue('custpage_checkbox');
	var qty = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_req_adjustqty',1);
	 if(chk =='T')
	 {
		 if(qty == null || qty == '')
			 {
               
			 alert('Quantity cannot be zero or positive.Select the location again');
			 }
			 
		 var serialNo = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_serialinvt',1);
        // var val = serialNo.toString();
         var q =  serialNo.split(',');
		 if(q.length > (0-qty) || q.length < (0-qty))
		 {
             alert('serialNo length'+q.length);
			 alert('Serial number entered should match the quantity entered');
             return false;
		 }
		 else
    	{
      		return true;
   	 	}
	 }
  else
    {
      return true;
    }
	
}
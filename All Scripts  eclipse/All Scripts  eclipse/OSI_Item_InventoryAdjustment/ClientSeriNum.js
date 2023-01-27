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
			 	

	    var type =nlapiGetFieldValue('custpage_itemtype');
	    alert('type = ' + type);
	    
//--------------------------------------------

		if(item!=null && item != '' && type == 'serializedinventoryitem')
		{
			alert('item '+item);
			 
			/* var columns = new Array();
			 columns[0] = new nlobjSearchColumn('locationquantityavailable');
			 columns[1] = new nlobjSearchColumn('locationquantityonhand');
			 columns[2] = new nlobjSearchColumn('serialnumber');
			 columns[3] = new nlobjSearchColumn("binnumber","inventoryDetail",null);
			 
			 var filters = new Array();
			 filters[0] = new nlobjSearchFilter ('inventorydetail.location', null, 'anyof',location);
			 filters[1] = new nlobjSearchFilter ('internalid', null, 'anyof',item);
             //filters[2] = new nlobjSearchFilter( 'internalid', null, 'anyOf', nlapiGetFieldValue('custpage_binnum'));
			//filters[2] = new nlobjSearchFilter ('binnumber',null,'anyof',binNum);
*/			 
			 
			 var searchresults = nlapiSearchRecord("item",'customsearch_item_serial_num_search',
					 [
					    ["isspecialorderitem","is","F"], 
					    "AND", 
					    ["isinactive","is","F"], 
					    "AND", 
					    ["type","anyof","Group","Kit","InvtPart"], 
					    "AND", 
					    ["internalid","anyof",item], 
					    "AND", 
					    ["inventorydetail.location","anyof",location]
					 ], 
					 [
					    new nlobjSearchColumn("itemid",null,"GROUP").setSort(false), 
					    new nlobjSearchColumn("type",null,"GROUP"), 
					    new nlobjSearchColumn("binnumber","inventoryDetail","MAX"), 
					    new nlobjSearchColumn("inventorynumber","inventoryDetail","GROUP"), 
					    new nlobjSearchColumn("quantity","inventoryDetail","GROUP"), 
					    new nlobjSearchColumn("location","inventoryDetail","GROUP")
					 ]
					 );
			 
			 
			 
			 
			// var searchresults = nlapiSearchRecord('item','customsearch_wmsse_inv_report',filters,columns);
			 alert('searchresults length'+searchresults.length);
			 if (searchresults != null)
				{
					for(var k=0;k<searchresults.length;k++)
					{	
						//alert('searchresults length'+searchresults.length);
						//var serialNum;
						serialNum = searchresults[k].getValue("inventorynumber","inventoryDetail","GROUP");
						//alert('serialNum in for loop = ' + serialNum);
						InvNumber.push(serialNum);
						var s = InvNumber.toString();
						
						binNum = searchresults[k].getValue("binnumber","inventoryDetail","MAX");
						// alert('binNum in for loop = ' + binNum);
						//nlapiAddSelectOption('custpage_sig_req_sublist', 'custpage_binnum',searchresults[k].getId(),searchresults[k].getValue("binnumber","inventoryDetail","GROUP"));
						//nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNum);
						// binSelect.addSelectOption(searchresults[k].getValue('internalid'), searchresults[k].getValue("binnumber","inventoryDetail","GROUP")) 
						nlapiInsertLineItemOption('custpage_sig_req_sublist', 'custpage_binnum',searchresults[k].getValue('internalid'),searchresults[k].getValue("binnumber","inventoryDetail","MAX"));

					}
				}
				if(InvNumber)
				{
					 chk = nlapiGetFieldValue('custpage_checkbox');
					 
					 if(chk =='T')
						 {
						 	nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_serialinvt',s.replace(/(\r\n|\n|\r)/gm,","));
						 	nlapiSetFieldValue('custpage_serialinvt',s.replace(/(\r\n|\n|\r)/gm,","));
						 	//nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNum);
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
	 // alert('Quantity will be== '+qty);
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
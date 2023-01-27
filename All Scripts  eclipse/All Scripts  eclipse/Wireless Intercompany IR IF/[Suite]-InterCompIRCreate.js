/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       08 May 2020     Shivraj
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */

function sut_intercom_ir(request, response)
{
	var date = new Date();
	try
	{
		if ( request.getMethod() == 'GET' )
		{
			//var emaiID= nlapiLookupField('employee',nlapiGetUser(),'email');
			var recId = request.getParameter('poId');
			//////nlapiLogExecution('DEBUG','sut_intercom_ir','recId = '+recId);
			//nlapiLogExecution('DEBUG','sut_intercom_ir','emaiID = '+emaiID);
			var form = nlapiCreateForm('Intercompany Item Receipt',true);
			form.addSubTab('tab1', 'Intercompany Item Receipt');
						
			var recIdform = form.addField('custpage_recid','text','PO Internal Id').setDisplayType('hidden');
			recIdform.setDefaultValue(recId);
			
			//call client script for validation
			form.setScript('customscript_cls_sut_ir_validation');
		
			if(recId!=null && recId!='' && recId!=undefined)
			{
				var recObj = nlapiLoadRecord('purchaseorder',recId);
				var tranDate = recObj.getFieldValue('trandate');
				var tranno = recObj.getFieldValue('tranid');
				var reclocation = recObj.getFieldValue('location');
				var subsidiary = recObj.getFieldValue('subsidiary');
				
				//////nlapiLogExecution('DEBUG','sut_intercom_if','reclocation = '+reclocation);
				
				var soref = form.addField('custpage_soref','text','Created From').setDisplayType('hidden');
				soref.setDefaultValue(tranno);
				
				/*var shipstatus =form.addField('custpage_status','text','Status').setDisplayType('disabled');
				shipstatus.setDefaultValue('Shipped');*/
				
				var if_date = form.addField('custpage_date', 'date', 'date','Date').setDisplayType('disabled');
				//var dateConv = nlapiStringToDate(date);
				//////nlapiLogExecution('DEBUG','sut_intercom_if','date = '+date);
				if_date.setDefaultValue(date);
				
				 // Get current Posting Period
			    var postingTransaction = nlapiCreateRecord('itemfulfillment'); //Transaction should be a posting transaction
			    var currentPostingPeriod = postingTransaction.getFieldValue('postingperiod');
			    //////nlapiLogExecution('DEBUG','sut_intercom_if','currentPostingPeriod = '+currentPostingPeriod);
				var getpostingprText =nlapiLookupField('accountingperiod',currentPostingPeriod,'periodname');
				//////nlapiLogExecution('DEBUG','sut_intercom_if','getpostingprText = '+getpostingprText);
			    var postingpr =form.addField('custpage_postingpr','text','Posting Period').setDisplayType('disabled');//,'postingperiod');//;
				postingpr.setDefaultValue(getpostingprText);
				
				var itemSublist = form.addSubList('custpage_item_sublist','list', 'Item','custpage_item_tab');
				itemSublist.addMarkAllButtons(); 
				itemSublist.addField('custpage_apply', 'checkbox', 'RECEIVE');
				itemSublist.addField('custpage_item', 'text','Item').setDisplayType('disabled');//.setDisplayType('entry');
				itemSublist.addField('custpage_item_id', 'text','Item_ID_DEV').setDisplayType('hidden');//.setDisplayType('entry');
				itemSublist.addField('custpage_srno', 'textarea', 'Serial Number').setDisplayType('hidden');
				itemSublist.addField('custpage_srnoid', 'textarea', 'Serial Number Id').setDisplayType('hidden');
				
				var subloction = itemSublist.addField('custpage_location', 'select', 'Location');//.setDisplayType('disabled');
				subloction.addSelectOption('','');
				//subloction.setDefaultValue(reclocation);
				
				itemSublist.addField('custpage_qty', 'float', 'Quantity').setDisplayType('entry');//.setDisplayType('disabled');
				itemSublist.addField('custpage_qty_po', 'float', 'PO_Quantity_DEV').setDisplayType('hidden');
				itemSublist.addField('custpage_qtysearch', 'float', 'Search Quantity_DEV').setDisplayType('hidden');
				
				if(subsidiary!=null&&subsidiary!=''&&subsidiary!=undefined)
				{	
					var locationSearch = nlapiSearchRecord("location",null,
						[
						   ["subsidiary","is",subsidiary]
						], 
						[
						   new nlobjSearchColumn("internalid"), 
						   new nlobjSearchColumn("name").setSort(false), 
						   new nlobjSearchColumn("phone"), 
						   new nlobjSearchColumn("city"), 
						   new nlobjSearchColumn("state"), 
						   new nlobjSearchColumn("country"), 
						   new nlobjSearchColumn("custrecord_location_internalid")
						]
						);
					for(var i = 0; i<locationSearch.length;i++)
				    {
						subloction.addSelectOption(locationSearch[i].getId(),locationSearch[i].getValue('name'));
				    }
				}
				
				
				
				//Get item details from transaction..........
				var reclinecount =recObj.getLineItemCount('item');
				//////nlapiLogExecution('DEBUG','sut_intercom_if','reclinecount = '+reclinecount);
				
				var reclocation= recObj.getFieldValue('location');
				//////nlapiLogExecution('DEBUG','sut_intercom_if','reclocation = '+reclocation);
				
				var so_ref=recObj.getFieldValue('intercotransaction');
				/*nlapiLogExecution('DEBUG','sut_intercom_if','so_ref = '+so_ref);*/
				
				var recitemArr = new Array();
				var recqtyArr = new Array();
				var seritemArr = new Array();
				var seritemidArr = new Array();
				var serchserArr = new Array();
				
				var recitemTextArr =new Array();
				var serchseridMainArr = new Array();
				var resSearchLengthArr= new Array();
				
				for(var k=1;k<=reclinecount;k++)
				{
					var recqty= recObj.getLineItemValue('item','quantity',k);
					
					var receiveQty= recObj.getLineItemValue('item','quantityreceived',k);//quantityfulfilled
					
					var setQty = parseFloat(recqty)-parseFloat(receiveQty);
					
					if(setQty != null && setQty > 0)
					{
						var recitem = recObj.getLineItemValue('item','item',k);
						recitemArr.push(recitem);
						//////nlapiLogExecution('DEBUG','sut_intercom_if','recitem = '+recitem);
						
						var recitemText = recObj.getLineItemText('item','item',k);
						////nlapiLogExecution('DEBUG','sut_intercom_if','recitem = '+recitem);
						recitemTextArr.push(recitemText);
						
						
						recqtyArr.push(setQty);
					//////nlapiLogExecution('DEBUG','sut_intercom_if','recqty = '+recqty);
					}
				}	
				/*nlapiLogExecution('DEBUG','sut_intercom_if','recitemArr = '+recitemArr);*/
				for(var j=0;j<recitemArr.length;j++)
				{
					var recitemsearch = recitemArr[j];
					var so_refsearch = so_ref;
					var searchId='customsearch_wireless_interc_custom_su_2';
					
					
					var customrecord_intercompanySearch =findTransaction(searchId,recitemsearch,so_refsearch);
				
					
					if(customrecord_intercompanySearch!=null && customrecord_intercompanySearch!=''&&customrecord_intercompanySearch!=undefined)
					{ 
						resSearchLengthArr.push(customrecord_intercompanySearch[0].getValue("internalid",null,"COUNT"));
				
					}
					else
                    {
                        var zero =0.00;
                        resSearchLengthArr.push(zero);
                     }
					
				}//END: for	
				
				//nlapiLogExecution('DEBUG','sut_intercom_if','serchseridMainArr = '+serchseridMainArr)
				//nlapiLogExecution('DEBUG','sut_intercom_if','serchseridMainArr.length = '+serchseridMainArr.length)
				
				if(recitemArr!=null && recitemArr!=''&&recitemArr!=undefined)
				{	
					for(var i = 1; i<=recitemArr.length;i++)
				    {
						/*nlapiLogExecution('DEBUG','sut_intercom_if','recitemArr.length = '+recitemArr.length);
						nlapiLogExecution('DEBUG','sut_intercom_if','serchseridMainArr = '+serchseridMainArr[i-1]);
						nlapiLogExecution('DEBUG','sut_intercom_if','recitemTextArr = '+recitemTextArr[i-1]);
						nlapiLogExecution('DEBUG','sut_intercom_if','recitemArr = '+recitemArr[i-1]);
						nlapiLogExecution('DEBUG','sut_intercom_if','recqtyArr = '+recqtyArr[i-1]);*/
						
						
						
						itemSublist.setLineItemValue('custpage_apply', i, 'T');
				    	itemSublist.setLineItemValue('custpage_item', i, recitemTextArr[i-1]);//customrecord_intercompanySearch[i-1].getText('custrecord_itercomp_item'));
				    	itemSublist.setLineItemValue('custpage_item_id', i, recitemArr[i-1]);//customrecord_intercompanySearch[i-1].getText('custrecord_itercomp_item'));
				     	//itemSublist.setLineItemValue('custpage_srno', i,serchseridMainArr[i-1]);//customrecord_intercompanySearch[i-1].getValue('custrecord_sr_no_id'));
					 	//itemSublist.setLineItemValue('custpage_srnoid', i,serchseridArr[i-1]);//customrecord_intercompanySearch[i-1].getValue('custrecord_sr_no_id'));
					 	itemSublist.setLineItemValue('custpage_qty', i,recqtyArr[i-1]);
					 	itemSublist.setLineItemValue('custpage_qty_po', i,recqtyArr[i-1]);
					 	
					 	var serchqty = parseInt(resSearchLengthArr[i-1]);
					 	if(serchqty!=0)
					 	{	
					 		//nlapiLogExecution('DEBUG','sut_intercom_if','serchqty = '+serchqty);
					 		itemSublist.setLineItemValue('custpage_qtysearch', i,serchqty);
					 	}
					 	else
					 	{
					 		itemSublist.setLineItemValue('custpage_qtysearch', i,parseFloat(0));
					 	}	

				    }
				}
				
							
				
			}	
			form.addSubmitButton('Submit');
			
			response.writePage(form);
		}
		
		
		
		
		else if (request.getMethod() == 'POST') 
		{
			
			var recId = request.getParameter('custpage_recid');
			nlapiLogExecution('DEBUG','sut_intercom_if','recId = '+recId);
			
			if(recId!=null&&recId!=''&&recId!=undefined)
			{	
				var so_ref_main =nlapiLookupField('purchaseorder',recId,'intercotransaction');
				nlapiLogExecution('DEBUG','sut_intercom_if','so_ref_main = '+so_ref_main);
			}
			
			var itempostArr = new  Array();
			var itemidpostArr= new  Array();
			var locpostArr = new  Array();
			var serpostArr = new  Array();
			var serpostidArr = new  Array();
			var qtypostArr = new  Array();
			
			//var fulfillRecord = nlapiTransformRecord('salesorder', recId, 'itemfulfillment');
			var sublinecount = request.getLineItemCount('custpage_item_sublist');
			//////nlapiLogExecution('DEBUG','sut_intercom_Post','sublinecount = '+sublinecount);
			for(var s=1;s<=sublinecount;s++)
			{
				var itemful = request.getLineItemValue('custpage_item_sublist','custpage_apply',s);
				//////nlapiLogExecution('DEBUG','sut_intercom_Post','itemful = '+itemful);
				if(itemful=='T')
				{
					var itempost = request.getLineItemValue('custpage_item_sublist','custpage_item',s);
					//////nlapiLogExecution('DEBUG','sut_intercom_Post','itempost = '+itempost);
					itempostArr.push(itempost);
					
					var itemidpost = request.getLineItemValue('custpage_item_sublist','custpage_item_id',s);
					//////nlapiLogExecution('DEBUG','sut_intercom_Post','itemidpost = '+itemidpost);
					itemidpostArr.push(itemidpost);
					
					var locpost = request.getLineItemValue('custpage_item_sublist','custpage_location',s);
					//////nlapiLogExecution('DEBUG','sut_intercom_Post','locpost = '+locpost);
					locpostArr.push(locpost);
					
					var qtypost = request.getLineItemValue('custpage_item_sublist','custpage_qty',s);
					//////nlapiLogExecution('DEBUG','sut_intercom_Post','qtypost = '+qtypost);
					qtypostArr.push(qtypost);
					
			
					
				}
			}	
			
			nlapiLogExecution('DEBUG','sut_intercom_Post','recId = '+recId);
			nlapiLogExecution('DEBUG','sut_intercom_Post','itemidpostArr = '+itemidpostArr);
			nlapiLogExecution('DEBUG','sut_intercom_Post','locpostArr = '+locpostArr);
			nlapiLogExecution('DEBUG','sut_intercom_Post','qtypostArr = '+qtypostArr);
			//nlapiLogExecution('DEBUG','sut_intercom_Post','JSON = '+JSON.stringify(IFMap));
			
					
			var myParams = [];
			//myParams.custscript_jsonmap= IFMap;
	     	myParams['custscript_recid_po'] = recId;
			myParams['custscript_item_po'] = itemidpostArr;
			myParams['custscript_loc_po'] = locpostArr;
			myParams['custscript_qty_po'] = qtypostArr;
			//myParams['custscript_serial'] = sermainArr;
			
			nlapiScheduleScript("customscript_inter_company_ir_create","customdeploy_inter_company_ir_create", myParams);
			response.sendRedirect('RECORD', 'purchaseorder', recId, false,'view');
			
		}	
		
		
	}
	catch(exe)
	{
		nlapiLogExecution('DEBUG','sut_intercom_ir','ERROR = '+exe);
	}
	

}

function findTransaction(searchId,item,loc)
{
	
	var filters=new Array();
	filters[0]=new nlobjSearchFilter('custrecord_itercomp_item', null,'anyOf',item);
	 filters[1]=new nlobjSearchFilter('internalidnumber','custrecord_intcom_so_ref','equalto',loc);
	/* filters[2]=new nlobjSearchFilter('isinactive', null,'is','F');
	 filters[3]=new nlobjSearchFilter('custrecord_ir_done', null,'is','F');
	 filters[4]=new nlobjSearchFilter('mainline', 'custrecord_intcom_so_ref','is','T');
	*/ 
	 var recType= null;
	 
    var aSearchResults = [];
    var iRscnt = 1000, min = 0, max = 1000;
    var search = {};
    if (searchId) 
    {
        var search = nlapiLoadSearch(recType, searchId);
        if (filters) 
        {
            search.addFilters(filters);
        }
    }
    

    var rs = search.runSearch();
    try 
    {
        while (iRscnt == 1000) 
        {
            var resultSet = rs.getResults(min, max);
            aSearchResults = aSearchResults.concat(resultSet);
            min = max;
            max += 1000;
            iRscnt = resultSet.length;
        }
    }
    catch (e) 
    {
        nlapiLogExecution('DEBUG', 'getAllResults --> exception', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    }

 //   nlapiLogExecution('DEBUG', 'getAllResults --> Success', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    return aSearchResults;
}
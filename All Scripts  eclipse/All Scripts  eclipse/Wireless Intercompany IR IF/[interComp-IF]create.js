/**
 * Module Description
 * 
 * Version    Date              Author           Remarks
 * 1.00       30 Apr 2020       Shivraj			 Suitelet create to item fullfillment record.
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function sut_intercom_if(request, response)
{
	var date = new Date();
	try
	{
		if ( request.getMethod() == 'GET' )
		{
			var form = nlapiCreateForm('Intercompany Item Fulfillment',true);
			form.addSubTab('tab1', 'Intercompany Item Fulfillment');
			var recId = request.getParameter('soid');
			////nlapiLogExecution('DEBUG','sut_intercom_if','recId = '+recId);
			var recIdform = form.addField('custpage_recid','text','SO Internal Id_DEV').setDisplayType('hidden');
			recIdform.setDefaultValue(recId);
			
			//call client script for validation
			form.setScript('customscript_cls_sut_if_validation');
			
			if(recId!=null && recId!='' && recId!=undefined)
			{
				var recObj = nlapiLoadRecord('salesorder',recId);
				var tranDate = recObj.getFieldValue('trandate');
				var tranno = recObj.getFieldValue('tranid');
				var reclocation = recObj.getFieldValue('location');
				var subsidiary = recObj.getFieldValue('subsidiary');
				//////////nlapiLogExecution('DEBUG','sut_intercom_if','reclocation = '+reclocation);
				var soref = form.addField('custpage_soref','text','Created From_DEV').setDisplayType('hidden');
				soref.setDefaultValue(tranno);
				var shipstatus =form.addField('custpage_status','text','Status').setDisplayType('disabled');
				shipstatus.setDefaultValue('Shipped');
				
				var if_date = form.addField('custpage_date', 'date', 'date','Date');//.setDisplayType('disabled');
				//var dateConv = nlapiStringToDate(date);
				//////////nlapiLogExecution('DEBUG','sut_intercom_if','date = '+date);
				if_date.setDefaultValue(date);
				
				 // Get current Posting Period
			    var postingTransaction = nlapiCreateRecord('itemfulfillment'); //Transaction should be a posting transaction
			    var currentPostingPeriod = postingTransaction.getFieldValue('postingperiod');
			    //////////nlapiLogExecution('DEBUG','sut_intercom_if','currentPostingPeriod = '+currentPostingPeriod);
				var getpostingprText =nlapiLookupField('accountingperiod',currentPostingPeriod,'periodname');
				//////////nlapiLogExecution('DEBUG','sut_intercom_if','getpostingprText = '+getpostingprText);
			    var postingpr =form.addField('custpage_postingpr','text','Posting Period').setDisplayType('disabled');//,'postingperiod');//;
				postingpr.setDefaultValue(getpostingprText);
				
				var itemSublist = form.addSubList('custpage_item_sublist','list', 'Item','custpage_item_tab');
				itemSublist.addMarkAllButtons(); 
				itemSublist.addField('custpage_apply', 'checkbox', 'FULFILL');
				itemSublist.addField('custpage_item', 'text','Item').setDisplayType('disabled');//.setDisplayType('entry');
				itemSublist.addField('custpage_item_id', 'text','Item_ID_DEV').setDisplayType('hidden');//.setDisplayType('entry');
				itemSublist.addField('custpage_srno', 'textarea', 'Serial Number').setDisplayType('hidden');
				//itemSublist.addField('custpage_srnoid', 'textarea', 'Serial Number Id_DEV');//.setDisplayType('hidden');
				var subloction = itemSublist.addField('custpage_location', 'select', 'Location');//.setDisplayType('disabled');
				subloction.addSelectOption('','');
				//subloction.setDefaultValue(reclocation);
				/*subloction.setMandatory =true;*/
				
				itemSublist.addField('custpage_qty', 'float', 'Quantity').setDisplayType('entry');//.setDisplayType('disabled');
				itemSublist.addField('custpage_qty_so', 'float', 'SO Quantity_DEV').setDisplayType('hidden');
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
				if(recObj!=null && recObj!=''&&recObj!=undefined)
				{	
					var reclinecount =recObj.getLineItemCount('item');
					////////nlapiLogExecution('DEBUG','sut_intercom_if','reclinecount = '+reclinecount);
					
					var recitemArr = new Array();
					var reclocArr = new Array();
					var recqtyArr = new Array();
					var recitemTextArr = new Array();
					
					var seritemArr = new Array();
					
					var serchseridArr = new Array();
					var seritemidArr = new Array();
					
					var custRecIntIdArr = new Array();
					var serchserMainArr =new Array();
					var resSearchLengthArr = new Array();
					
					var concateArr = new Array();
					
					for(var k=1;k<=reclinecount;k++)
					{
						
						var fulQty= recObj.getLineItemValue('item','quantityfulfilled',k);//quantityfulfilled
						
						var recqty= recObj.getLineItemValue('item','quantity',k);//quantityfulfilled
						
						var setQty = parseFloat(recqty)-parseFloat(fulQty);
						
						if(setQty != null && setQty > 0)
						{
							var recitem = recObj.getLineItemValue('item','item',k);
							//////nlapiLogExecution('DEBUG','sut_intercom_if','recitem = '+recitem);
							recitemArr.push(recitem);
							
							var recitemText = recObj.getLineItemText('item','item',k);
							//////nlapiLogExecution('DEBUG','sut_intercom_if','recitem = '+recitem);
							recitemTextArr.push(recitemText);
							
							recqtyArr.push(setQty);
						}
						
					}
					
					
					
					for(var j=0;j<recitemArr.length;j++)
					{
						/*//nlapiLogExecution('DEBUG','sut_intercom_if','recitemArr[j] = '+recitemArr[j]);
						//nlapiLogExecution('DEBUG','sut_intercom_if','recqtyArr[j] = '+recqtyArr[j]);
						//nlapiLogExecution('DEBUG','sut_intercom_if','reclocation = '+reclocation);*/
						var serchserArr = new Array();
						var searchId='customsearch_wireless_interc_custom_suit';
						var recitemsearch = recitemArr[j];
						var recqtylist = recqtyArr[j];
						var reclocsearch = reclocation;
				
						
						var customrecord_intercompanySearch  = findTransaction(searchId,recitemsearch,reclocation);
						
						if(customrecord_intercompanySearch != null && customrecord_intercompanySearch !='')
						{
							resSearchLengthArr.push(customrecord_intercompanySearch[0].getValue("internalid",null,"COUNT"));
						}
						else
						{
							
							resSearchLengthArr.push(parseFloat(0.00));
						}
			
						
					}//END: for	
					
					for(var v=1;v<=recitemArr.length;v++)
					{
						//nlapiLogExecution('DEBUG','sut_intercom_if','recitemArr.length = '+recitemArr.length);
						//nlapiLogExecution('DEBUG','sut_intercom_if','recitemTextArr[v-1] = '+recitemTextArr[v-1]);
						//nlapiLogExecution('DEBUG','sut_intercom_if','serchserMainArr[v-1].toString() = '+serchserMainArr[v-1].toString());
						//nlapiLogExecution('DEBUG','sut_intercom_if','recqtyArr[v-1] = '+recqtyArr[v-1]);
						//nlapiLogExecution('DEBUG','sut_intercom_if','serchserMainArr[v-1]= '+serchserMainArr[v-1]);
						
						itemSublist.setLineItemValue('custpage_apply', v, 'T');
						itemSublist.setLineItemValue('custpage_item', v, recitemTextArr[v-1]);
						itemSublist.setLineItemValue('custpage_item_id', v, recitemArr[v-1]);
						
						//itemSublist.setLineItemValue('custpage_srno', v,serchserMainArr[v-1].toString());
						
						itemSublist.setLineItemValue('custpage_qty', v,recqtyArr[v-1]);
					 	itemSublist.setLineItemValue('custpage_qty_so', v,recqtyArr[v-1]);
					 	var serchqty = parseInt(resSearchLengthArr[v-1]);
					 	if(serchqty!=0)
					 	{	
					 		//nlapiLogExecution('DEBUG','sut_intercom_if','serchqty = '+serchqty);
					 		itemSublist.setLineItemValue('custpage_qtysearch', v,serchqty);
					 	}
					 	else
					 	{
					 		itemSublist.setLineItemValue('custpage_qtysearch', v,parseFloat(0));
					 	}	

						
					}	
					
							
				}//END:If
			}	
			
			
			form.addSubmitButton('Submit');
			response.writePage(form);
		}
		
		else if (request.getMethod() == 'POST') 
		{
			
			var recId = request.getParameter('custpage_recid');
			//nlapiLogExecution('DEBUG','sut_intercom_if','recId = '+recId);
			
			
			var itempostArr = new  Array();
			var itemidpostArr = new Array();
			var locpostArr = new  Array();
			
			var serpostidArr = new  Array();
			var qtypostArr = new  Array();
			
			var sermainArr = new Array();
			
			var IFMap={};
			var sublinecount = request.getLineItemCount('custpage_item_sublist');
			////////nlapiLogExecution('DEBUG','sut_intercom_Post','sublinecount = '+sublinecount);
			for(var s=1;s<=sublinecount;s++)
			{
				var serpostArr = new  Array();
				
				var itemful = request.getLineItemValue('custpage_item_sublist','custpage_apply',s);
				//////nlapiLogExecution('DEBUG','sut_intercom_Post','itemful = '+itemful);
				if(itemful=='T')
				{	
					
				
					var itempost = request.getLineItemValue('custpage_item_sublist','custpage_item',s);
					////////nlapiLogExecution('DEBUG','sut_intercom_Post','itempost = '+itempost);
					itempostArr.push(itempost);
					
					var itemidpost = request.getLineItemValue('custpage_item_sublist','custpage_item_id',s);
					//////nlapiLogExecution('DEBUG','sut_intercom_Post','itemidpost = '+itemidpost);
					itemidpostArr.push(itemidpost);
					
					var locpost = request.getLineItemValue('custpage_item_sublist','custpage_location',s);
					////////nlapiLogExecution('DEBUG','sut_intercom_Post','locpost = '+locpost);
					locpostArr.push(locpost);
					
					var qtypost = request.getLineItemValue('custpage_item_sublist','custpage_qty',s);
					// nlapiLogExecution('DEBUG','sut_intercom_Post','qtypost = '+qtypost);
					qtypostArr.push(qtypost);
					
					
				}
			}
			
			
			IFMap['rec_id']=recId;
			IFMap['item_arr']=itemidpostArr;
			IFMap['loc_arr']=locpostArr;
			IFMap['qty_arr']=qtypostArr;
			IFMap['serial_arr']=sermainArr;
			
			nlapiLogExecution('DEBUG','sut_intercom_Post','recId = '+recId);
			nlapiLogExecution('DEBUG','sut_intercom_Post','itemidpostArr = '+itemidpostArr);
			nlapiLogExecution('DEBUG','sut_intercom_Post','locpostArr = '+locpostArr);
			nlapiLogExecution('DEBUG','sut_intercom_Post','qtypostArr = '+qtypostArr);
			nlapiLogExecution('DEBUG','sut_intercom_Post','JSON = '+JSON.stringify(IFMap));
			
					
			var myParams = [];
			//myParams.custscript_jsonmap= IFMap;
	     	myParams['custscript_recid'] = recId;
			myParams['custscript_item'] = itemidpostArr;
			myParams['custscript_loc'] = locpostArr;
			myParams['custscript_qty'] = qtypostArr;
			//myParams['custscript_serial'] = sermainArr;
			
			nlapiScheduleScript("customscript_inter_company_if_create","customdeploy_inter_company_if_create", myParams);
			response.sendRedirect('RECORD', 'salesorder', recId, false,'view');
		}
	}
	catch(exe)
	{
		nlapiLogExecution('DEBUG','sut_intercom_if','ERROR = '+exe);
	}

}


function findTransaction(searchId,item,loc)
{
	
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_itercomp_item', null,'anyOf',item);
	 filters[1]=new nlobjSearchFilter('custrecord_itercomp_loc', null,'anyOf',loc);
	// filters[2]=new nlobjSearchFilter('isinactive', null,'is','F');
	// filters[3]=new nlobjSearchFilter('custrecord_if_done', null,'is','F');
	// filters[4]=new nlobjSearchFilter('custrecord_itercomp_ref', null,'anyOf','301874');
	
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
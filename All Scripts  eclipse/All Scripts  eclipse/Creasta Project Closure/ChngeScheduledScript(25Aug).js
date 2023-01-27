/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       08 Aug 2019     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function scheduledAfterProjectClose(type) 
{
	var billId;
	//var billArray=new Array();
	
	projId = nlapiGetContext().getSetting('SCRIPT', 'custscript_project_id_close');
	nlapiLogExecution('DEBUG', 'aftr submit', "  projId ==" + projId);
	
	
	  var parntAsst = findParentAsset(projId);
	  
	  nlapiLogExecution('DEBUG', 'aftr submit', "  parntAsst ==" + parntAsst);
	  

 	  var asset = findCR(parntAsst);
		
	  nlapiLogExecution('DEBUG', 'aftr submit', "  asset ==" + asset);
	  
	  var tranResultSet = findTransaction(projId);
	  nlapiLogExecution('DEBUG', 'aftr submit', "  tranResultSet ==" + tranResultSet);
	  
		 
	  var AccArray=[];
	 	
	 	var totAmt =0;
	 	
	 	if(tranResultSet!=null)
	 	{
	 		
	 		for (var m1=0;m1<tranResultSet.length;m1++)
	 		{
		 		var Acc = tranResultSet[m1].getValue("account",null,"GROUP");
		 		AccArray.push(Acc);
	 		}
	 		
		 	jsonArray3 = removeDuplicate(AccArray, 'account');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray3  ==" + jsonArray3);
		
	 		
	 		//for (var m=0;m<jsonArray3.length;m++)
	 		{
	 			for(var i=0;i<tranResultSet.length;i++)
				{
		 			var subsidiary = tranResultSet[i].getValue("subsidiary",null,"GROUP");
		 			nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiary  ==" + subsidiary);
		 			
		 			var currency = tranResultSet[i].getValue("currency",null,"GROUP");
		 			nlapiLogExecution('DEBUG', 'aftr submit', "  currency  ==" + currency);
		 			
		 			var AssetAcc = tranResultSet[i].getValue("custcol_cwip_line_acc",null,"GROUP");
		 			nlapiLogExecution('DEBUG', 'aftr submit', "  CWIP_Acc  ==" + CWIP_Acc);
		 			
		 			var CWIP_Acc = tranResultSet[i].getValue("account",null,"GROUP");
		 			nlapiLogExecution('DEBUG', 'aftr submit', "  AssetAcc  ==" + AssetAcc);
		 			
		 			
		 			var ParentTransaction =tranResultSet[i].getValue("internalid","CUSTBODY_FROM_TRANSACTION","GROUP");
		 			
		 			var AmtFor = tranResultSet[i].getValue("fxamount",null,"GROUP");
		 			nlapiLogExecution('DEBUG', 'aftr submit', "  AmtFor  ==" + AmtFor);
		 			
		 			//if(CWIP_Acc ==jsonArray3[m])
	 				{
	 		    		totAmt = parseFloat(AmtFor);
	 				}
	 		
		 			var date  = tranResultSet[i].getValue("trandate",null,"GROUP");
		 			nlapiLogExecution('DEBUG', 'aftr submit', "  date  ==" + date);
		 			
                  createCustTransFromAsset(parntAsst,projId,ParentTransaction,date,subsidiary,currency,CWIP_Acc,AssetAcc,totAmt)
		 		    
				} 
	 			nlapiLogExecution('DEBUG', 'aftr submit', "  totAmt  ==" + totAmt);
	 			
	 			
	 		}
	 		
	 	}
		

		  
	  
}


function createCustTransFromAsset(ParentAsset,AssetProject,ParentTransaction,date,subsidiary,currency,CWIP_Acc,AssetAcc,totAmt)
{	
	
	nlapiLogExecution("DEBUG","In Create Function","createCustomTransactionFunction**************");
	
     var record = nlapiCreateRecord('customtransaction_asset_with_cwip', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}
		
  
	if(date != '' && date != 'undefined' && date != null)
	{
		
		record.setFieldValue('trandate',date);
	}

	if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
	{
		// To Set Subsidiary
		record.setFieldValue('subsidiary',subsidiary);
	}
	
	
	record.setFieldValue('custbody_cust_asset',ParentAsset);
	
	record.setFieldValue('custbody_from_transaction',ParentTransaction);
	
	
	
	var memo ='REVERSECustomTransactionCreated';
	
	record.selectNewLineItem('line');
	record.setCurrentLineItemValue('line', 'account',AssetAcc);
	record.setCurrentLineItemValue('line', 'debit', totAmt);
	record.setCurrentLineItemValue('line', 'entity', AssetProject);
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');
	
	
	record.selectNewLineItem('line');
	record.setCurrentLineItemValue('line', 'account',CWIP_Acc);
	record.setCurrentLineItemValue('line', 'credit', totAmt);
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');

	
	 var SubmitIt = nlapiSubmitRecord(record);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 
	 
}






function findDataOnVendorBill(recid)
{ 		
	   var searchId = 'customsearch_vendor_bill';
		var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	var filters=new Array();
	filters[0]=new nlobjSearchFilter('customer', null,'anyOf',recid);
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

function findCR(parntAsst)
{
	var parentAsset;
	var childAssetTotal=0;
	var assetTotal=0;
	var parentAssetArray = new Array();
	var amtAfterExchnge;
	nlapiLogExecution('DEBUG', 'findCR', 'INSIDE findCR fun');
	var filters=new Array();
	var columns = new Array();
	var recrddID;//custrecord_assetparent

	filters[0] = new nlobjSearchFilter('custrecord_assetparent',null,'anyof',parntAsst);
	//filters[1] = new nlobjSearchFilter('custrecord_assetparent',null,'noneof','@NONE@');
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_assetcost');
	columns[2] = new nlobjSearchColumn('custrecord_assetparent');
	
	var searchResultItem = nlapiSearchRecord('customrecord_ncfar_asset', 'customsearchfam_linked_project', filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			recrddID = searchResultItem[j].getValue('internalid');
			assetTotal = searchResultItem[j].getValue('custrecord_assetcost');
			parentAsset = searchResultItem[j].getValue('custrecord_assetparent');
			
			var subsiCurrency =searchResultItem[j].getValue("currency","CUSTRECORD_ASSETSUBSIDIARY");
			
			var transCurr =  searchResultItem[j].getValue('custrecord_assetcurrency');
			
			var transDate =  searchResultItem[j].getValue('custrecord_assetpurchasedate');
			
			if(subsiCurrency == transCurr)
			{
				childAssetTotal = parseFloat(childAssetTotal) + parseFloat(assetTotal);
				nlapiLogExecution('DEBUG', 'After Submit value of childAssetTotal', "  value of childAssetTotal ==" + childAssetTotal);
				
			}
			else
			{
				var rate = nlapiExchangeRate( transCurr,subsiCurrency, new Date(transDate)); 
 				amtAfterExchnge = parseFloat(assetTotal) * parseFloat(rate);
 				
 				childAssetTotal = parseFloat(childAssetTotal)+parseFloat(amtAfterExchnge)
				
			}
			
		   //   nlapiLogExecution('DEBUG', 'After Submit value of recrddID', "  value of recrddID ==" + recrddID);
         /*
           var remainingUsage = nlapiGetContext().getRemainingUsage();
		  		if (remainingUsage < 500) 
		  		{
		  			nlapiYieldScript();
		  		}
		 */
		}
		 nlapiSubmitField('customrecord_ncfar_asset',parentAsset,'custrecord_assetcost',childAssetTotal);
        nlapiSubmitField('customrecord_ncfar_asset',parentAsset,'custrecord_assetcurrentcost',childAssetTotal);
          nlapiSubmitField('customrecord_ncfar_asset',parentAsset,'custrecord_assetbookvalue',childAssetTotal);
		 nlapiSubmitField('customrecord_ncfar_asset',parentAsset,'custrecord_assetdepractive','1');
	         
	}
	return recrddID;
}
function findParentAsset(projId)
{
	var filters=new Array();
	var columns = new Array();
	var recrddID = new Array();//custrecord_assetparent
	var parntAssetArry = new Array()
	filters[0] = new nlobjSearchFilter('custrecord_assetproject',null,'anyof',projId);
	//filters[1] = new nlobjSearchFilter('custrecord_assetparent',null,'noneof','@NONE@');
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_assetcost');
	columns[2] = new nlobjSearchColumn('custrecord_assetparent');
	
	var searchResultItem = nlapiSearchRecord('customrecord_ncfar_asset', 'customsearchfam_linked_project', filters, columns);
	
	nlapiLogExecution('DEBUG', 'After Submit value of parentAssetArray', "  value of searchResultItem ==" + searchResultItem);
	
	
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			recrddID = searchResultItem[j].getValue('internalid');
			prntasst = searchResultItem[j].getValue('custrecord_assetparent');
			parntAssetArry.push(prntasst);
			if(prntasst!= null && prntasst !='' && prntasst!= undefined)
			{
				var newParentValue =prntasst;
				break;
			}
	
			//   nlapiLogExecution('DEBUG', 'After Submit value of recrddID', "  value of recrddID ==" + recrddID);
         /*
           var remainingUsage = nlapiGetContext().getRemainingUsage();
		  		if (remainingUsage < 500) 
		  		{
		  			nlapiYieldScript();
		  		}
		 */
		}
		nlapiLogExecution('DEBUG', 'After Submit value of parentAssetArray', "  value of recrddID ==" + recrddID);
		nlapiLogExecution('DEBUG', 'After Submit value of parentAssetArray', "  value of newParentValue ==" + newParentValue);
		
	}
	return newParentValue;
}

function findTransaction(projId)
{
	var searchId='customsearch_assetwithcwip_custom_trans';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('entity', null,'anyOf',projId);
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

function removeDuplicate(jsonArray3, prop)
{
	var new_arr = [];
	var lookup = {};
	for (var i in jsonArray3) {
	    lookup[jsonArray3[i][prop]] = jsonArray3[i];
	}
	for (i in lookup) {
	    new_arr.push(lookup[i]);
	}
	return new_arr;
	}
	
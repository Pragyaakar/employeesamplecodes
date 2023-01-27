/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       04 Apr 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */

var CashSaleArr =[];
function userEventCashRefundAfterSubmit(type)
{
	if(type == 'edit' || type == 'copy')
	{
		var internalId = nlapiGetRecordId();
		nlapiLogExecution('DEBUG','resultSet length','internalId while creation'+internalId);
		var recType = nlapiGetRecordType();
		var amount;
		var account;
		var activityDate;
		var transactionDate;
		var subsidiary;
		var amount_total=0.00;
		
	
		var searchId='customsearch_cash_refund';
		resultSet = findCashRefundDetails(searchId,internalId);
		if(resultSet!='' && resultSet!= null && resultSet !='undefined')
		{
			nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
			for(var i=0;i<resultSet.length;i++)//resultSet.length
			{
	          	var columns = resultSet[i].getAllColumns();
	          	
	          	transactionDate = resultSet[i].getValue(columns[0]);
	          	 nlapiLogExecution('DEBUG','transactionDate','transactionDate from search'+transactionDate);
	          	
	 		   transactionDate = nlapiStringToDate(transactionDate);
	 		  nlapiLogExecution('DEBUG','transactionDate','transactionDate'+transactionDate);
	 		  
	          	activityDate = resultSet[i].getValue(columns[1]);
	 		   nlapiLogExecution('DEBUG','activityDate','activityDate from search'+activityDate);
	 		   
	 		  activityDate = nlapiStringToDate(activityDate);
	 		  nlapiLogExecution('DEBUG','activityDate','activityDate'+activityDate);
	 		   
				amount= resultSet[i].getValue(columns[3]);
			   nlapiLogExecution('DEBUG','amount','amount'+amount);
			      
			   account= resultSet[i].getValue(columns[2]);
			   nlapiLogExecution('DEBUG','account','account'+account);
			   
			   subsidiary = resultSet[i].getValue(columns[4]);
			   nlapiLogExecution('DEBUG','subsidiary','subsidiary'+subsidiary);
			   
			   var notSame = transactionDate.getTime() !== activityDate.getTime();
			   nlapiLogExecution('DEBUG','notSame','notSame'+notSame);
			   
			   if(notSame == true)
			   {
				   nlapiLogExecution('DEBUG','notSame','generateTransaction Function Called...');
				 var SubmitID =  generateTransaction(internalId,amount,account,transactionDate,activityDate,subsidiary);
				 CashSaleArr.push(SubmitID);
			   }
			   
			    
			}
		}
		  nlapiLogExecution('DEBUG','notSame','CashSaleArr...'+CashSaleArr);
		var obj =nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId());
		obj.setFieldValues('custbody_journal_entrie_no',CashSaleArr);
		nlapiSubmitRecord(obj,true);
	}//end of type create
	
}
function findCashRefundDetails(searchId,internalId)
{
	var resultSet = nlapiLoadSearch('transaction', searchId); 
	var filters=new Array();
	var columns = new Array();
	filters[0] = new nlobjSearchFilter('internalid',null,'anyof',internalId);
	//filters[1] = new nlobjSearchFilter('custrecord_year_frm_parnt_recrd',null,'is',Year.toString());
	resultSet.addFilters(filters);
	var resultset = resultSet.runSearch();
	nlapiLogExecution('DEBUG', 'resultset in findEmpForQuotaDetails', 'resultset: '+resultset);
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
   return returnSearchResults;
}
function generateTransaction(internalId,amount,account,transactionDate,activityDate,subsidiary)
{
	var jeRec = nlapiCreateRecord('journalentry');
	jeRec.setFieldValue('trandate',nlapiDateToString(transactionDate));
  //	jeRec.setFieldValue('reversaldate',nlapiDateToString(activityDate));
	jeRec.setFieldValue('subsidiary',subsidiary);
	jeRec.setFieldValue('custbody_cash_refund',internalId);
	
	
	// credit line
	jeRec.selectNewLineItem('line');
	jeRec.setCurrentLineItemValue('line', 'account',1816);
	jeRec.setCurrentLineItemValue('line', 'credit', amount);
	jeRec.commitLineItem('line');

	// debit line
	jeRec.selectNewLineItem('line');
	jeRec.setCurrentLineItemValue('line', 'account',account);
	jeRec.setCurrentLineItemValue('line', 'debit', amount);
	jeRec.commitLineItem('line');
	

	var s= nlapiSubmitRecord(jeRec,true);	
	 nlapiLogExecution('DEBUG','notSame','JV Created...');
	 return s ;
}

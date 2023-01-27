/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       13 Oct 2019     AMOL ATPL
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
function userEventExpenAfterSubmit(type)
{
  //to reverse the expense
	var recType = nlapiGetRecordType();
	var recId = nlapiGetRecordId();
	
	var billObj = nlapiLoadRecord(recType,recId);
			
			
	  var expLineCount = billObj.getLineItemCount('expense');
	  var itmLineCnt = billObj.getLineItemCount('item');
	  
	  var expAcct;
	  var expAcctArray = new Array();
	  var nhilAmt;
	  var GetFundAmt;
	  var nhilAmtTotal=0.00;
	  var getFundAmtTotal=0.00;
      var nhilAmtArray = new Array();
      var getFndAmtArray = new Array();
	  var Subsidiary = billObj.getFieldValue('subsidiary');
	  nlapiLogExecution('DEBUG', 'After Submit value of Subsidiary', "  Subsidiary ==" + Subsidiary);
	  var currency = billObj.getFieldValue('currency');
	  nlapiLogExecution('DEBUG', 'After Submit value of currency', "  currency ==" + currency);
	  var exchangeRate = billObj.getFieldValue('exchangerate');
	  var date = billObj.getFieldValue('trandate');
	  
	if(Subsidiary == 34)
	{
		
		 if(expLineCount != null && expLineCount != '' && expLineCount != undefined)
		    {
		    	for(var expcnt= 1 ; expcnt <= expLineCount; expcnt++)
		    	{
		    		expAcct = billObj.getLineItemValue('expense','account',expcnt);
		    		nlapiLogExecution('DEBUG', 'After Submit value of expAcct', "  expAcct ==" + expAcct);
		    		expAcctArray.push(expAcct);
		    		
		    		nhilAmt = billObj.getLineItemValue('expense','custcol_levyone_sales',expcnt);
		    		if(!isNaN(nhilAmt) && nhilAmt != null && nhilAmt != '' && nhilAmt != undefined)
		    		{
		    			if(exchangeRate != 1)
			    		{
		    				nhilAmt = nhilAmt *exchangeRate;
			    		}
			    		else
			    		{
			    			nhilAmtArray.push(nhilAmt);
			    		}
		    			
		    			nhilAmtTotal = parseFloat(nhilAmtTotal)+ parseFloat(nhilAmt)
		    		}
		    		GetFundAmt = billObj.getLineItemValue('expense','custcol_levytwo_sales',expcnt);
		    		if(!isNaN(GetFundAmt) && GetFundAmt != null && GetFundAmt != '' && GetFundAmt != undefined)
		    		{
		    			if(exchangeRate != 1)
			    		{
		    				GetFundAmt = GetFundAmt *exchangeRate;
			    		}
			    		else
			    		{
			    			getFndAmtArray.push(GetFundAmt);
			    		}
		    			
		    			getFundAmtTotal = parseFloat(getFundAmtTotal)+ parseFloat(GetFundAmt)
		    		}
		    	}
		    }
		 nlapiLogExecution('DEBUG', 'After Submit value of expAcctArray.count', "  expAcctArray.count ==" + expAcctArray.length);
		 if(expAcctArray.length != null)
			{
				var taxRevID = createExpenseReversalentry(expAcctArray,nhilAmtTotal,getFundAmtTotal,nhilAmtArray,getFndAmtArray,Subsidiary,currency,recId);
				if(taxRevID != null && taxRevID != '' && taxRevID != undefined)
				{
					billObj.setFieldValue('custbody_expense_reversal_id',taxRevID)
				}
				nlapiSubmitRecord(billObj,false,false);
			}
	}//end of Subsidiary check
   
	
}
function createExpenseReversalentry(expAcctArray,nhilAmtTotal,getFundAmtTotal,nhilAmtArray,getFndAmtArray,Subsidiary,currency,recId)
{
	nlapiLogExecution('DEBUG', 'After Submit value of nhilAmtTotal', "  nhilAmtTotal ==" + nhilAmtTotal);
	nlapiLogExecution('DEBUG', 'After Submit value of getFundAmtTotal', "  getFundAmtTotal ==" + getFundAmtTotal);
	
	
	var taxEntyObj = nlapiCreateRecord('customtransaction_tax_reversal_entry');
	taxEntyObj.setFieldValue('subsidiary',Subsidiary);
	taxEntyObj.setFieldValue('currency',currency);
	taxEntyObj.setFieldValue('custbody_bill_id',recId);
	if(expAcctArray.length != null)
	{
		//Credit line entry
		taxEntyObj.selectNewLineItem('line');
		taxEntyObj.setCurrentLineItemValue('line', 'account', '1568');
		taxEntyObj.setCurrentLineItemValue('line', 'credit', parseFloat(nhilAmtTotal).toFixed(2));
		taxEntyObj.commitLineItem('line');
		taxEntyObj.selectNewLineItem('line');
		taxEntyObj.setCurrentLineItemValue('line', 'account', '1569');
		taxEntyObj.setCurrentLineItemValue('line', 'credit', parseFloat(getFundAmtTotal).toFixed(2));
		taxEntyObj.commitLineItem('line');
		
		//Debit line entry
		
		for(nwLineCnt =0 ; nwLineCnt<expAcctArray.length;nwLineCnt++)
		{
			var amt = parseFloat(nhilAmtArray[nwLineCnt]) + parseFloat(getFndAmtArray[nwLineCnt])
			taxEntyObj.selectNewLineItem('line');
			taxEntyObj.setCurrentLineItemValue('line', 'account', expAcctArray[nwLineCnt]);
			taxEntyObj.setCurrentLineItemValue('line', 'debit', amt);
			taxEntyObj.commitLineItem('line');
		}
    	//o_cstmTran_obj.setCurrentLineItemValue('line', 'credit', amtTot);
    	//o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
	}
	 var taxrevId = nlapiSubmitRecord(taxEntyObj,false,false);
	 return taxrevId;
}
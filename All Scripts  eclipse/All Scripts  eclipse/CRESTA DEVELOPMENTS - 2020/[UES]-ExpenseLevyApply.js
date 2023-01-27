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
	try{
		
	
  //to reverse the expense
	var recType = nlapiGetRecordType();
	var recId = nlapiGetRecordId();
	
	var billObj = nlapiLoadRecord(recType,recId);
			
			
	  var expLineCount = billObj.getLineItemCount('expense');
	  var itmLineCnt = billObj.getLineItemCount('item');
	  
	  var accBookCount =billObj.getLineItemCount('accountingbookdetail');
	  var expAcct;
	  var expAcctArray = new Array();
	  var nhilAmt;
	  var vatAmt;
	  var vatAmtArr=[];
	  var GetFundAmt;
	  var nhilAmtTotal=0.00;
	  var getFundAmtTotal=0.00;
      var nhilAmtArray = new Array();
      var getFndAmtArray = new Array();
      
      var Name = billObj.getFieldValue('entity');
      
      var TranDate = billObj.getFieldValue('trandate');
	  var Subsidiary = billObj.getFieldValue('subsidiary');
	  nlapiLogExecution('DEBUG', 'After Submit value of Subsidiary', "  Subsidiary ==" + Subsidiary);
	  var currency = billObj.getFieldValue('currency');
	  nlapiLogExecution('DEBUG', 'After Submit value of currency', "  currency ==" + currency);
	  var exchangeRate = billObj.getFieldValue('exchangerate');
	  var date = billObj.getFieldValue('trandate');
	  var ApprStatus = billObj.getFieldValue('approvalstatus');
	  var Revtrans = billObj.getFieldValue('custbody_expense_reversal_id');
	  //custbody_expense_reversal_id
	  var accBookEx;
	  
	if(Subsidiary == 30 && ApprStatus =='2')
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
		    				nhilAmtArray.push(nhilAmt);
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
		    				getFndAmtArray.push(GetFundAmt);
			    		}
			    		else
			    		{
			    			getFndAmtArray.push(GetFundAmt);
			    		}
		    			
		    			getFundAmtTotal = parseFloat(getFundAmtTotal)+ parseFloat(GetFundAmt)
		    		}
		    	}
		    }
		 
		 if(accBookCount != null && accBookCount != '' && accBookCount != undefined)
		    {
			 for(var m= 1 ; m <= accBookCount; m++)
		    	{
				  accBookEx = billObj.getLineItemValue('accountingbookdetail','exchangerate',m);
		    	}
		    }
		 
		 nlapiLogExecution('DEBUG', 'After Submit value of expAcctArray.count', "  expAcctArray.count ==" + expAcctArray.length);
		 if((expAcctArray.length != null )&&(Revtrans ==null || Revtrans =='' || Revtrans == undefined))
			{
				var taxRevID = createExpenseReversalentry(expAcctArray,nhilAmtTotal,getFundAmtTotal,nhilAmtArray,getFndAmtArray,Subsidiary,currency,recId,TranDate,Name,accBookEx);
				if(taxRevID != null && taxRevID != '' && taxRevID != undefined)
				{
					billObj.setFieldValue('custbody_expense_reversal_id',taxRevID)
				}
				nlapiSubmitRecord(billObj,false,false);
			}
	}//end of Subsidiary check
	else if(Subsidiary == 31 && ApprStatus =='2')
	{

		
		 if(expLineCount != null && expLineCount != '' && expLineCount != undefined)
		    {
		    	for(var expcnt= 1 ; expcnt <= expLineCount; expcnt++)
		    	{
		    		expAcct = billObj.getLineItemValue('expense','account',expcnt);
		    		nlapiLogExecution('DEBUG', 'After Submit value of expAcct', "  expAcct ==" + expAcct);
		    		expAcctArray.push(expAcct);
		    		
		    		 vatAmt = billObj.getLineItemValue('expense','tax1amt',expcnt);
		    		if(!isNaN(vatAmt) && vatAmt != null && vatAmt != '' && vatAmt != undefined)
		    		{
		    			
			    			vatAmtArr.push(vatAmt);
			    		
		    		}
		    		
		    	}
		    }
		 
		 if(accBookCount != null && accBookCount != '' && accBookCount != undefined)
		    {
			 for(var m= 1 ; m <= accBookCount; m++)
		    	{
				  accBookEx = billObj.getLineItemValue('accountingbookdetail','exchangerate',m);
		    	}
		    }
		 
		 nlapiLogExecution('DEBUG', 'After Submit value of expAcctArray.count', "  expAcctArray.count ==" + expAcctArray.length);
		 if((expAcctArray.length != null )&&(Revtrans ==null || Revtrans =='' || Revtrans == undefined))
			{
				var taxRevID = createExpenseReversalentryVat(expAcctArray,vatAmtArr,Subsidiary,currency,recId,TranDate,Name,accBookEx);
				if(taxRevID != null && taxRevID != '' && taxRevID != undefined)
				{
					billObj.setFieldValue('custbody_expense_reversal_id',taxRevID)
				}
				nlapiSubmitRecord(billObj,false,false);
			}
	
	}
	
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG', 'After Submit Error', "  Error ==" + e);
		
	}
}
function createExpenseReversalentry(expAcctArray,nhilAmtTotal,getFundAmtTotal,nhilAmtArray,getFndAmtArray,Subsidiary,currency,recId,TranDate,Name,accBookEx)
{
	nlapiLogExecution('DEBUG', 'After Submit value of nhilAmtTotal', "  nhilAmtTotal ==" + nhilAmtTotal);
	nlapiLogExecution('DEBUG', 'After Submit value of getFundAmtTotal', "  getFundAmtTotal ==" + getFundAmtTotal);
	
	
	var taxEntyObj = nlapiCreateRecord('customtransaction116');
	taxEntyObj.setFieldValue('subsidiary',Subsidiary);
	taxEntyObj.setFieldValue('currency',currency);
	taxEntyObj.setFieldValue('trandate',TranDate);
	taxEntyObj.setFieldValue('custbody_bill_id',recId);
	if(expAcctArray.length != null)
	{
		//Credit line entry
		
		for(var i=0 ; i<nhilAmtArray.length;i++)
		{
		
		taxEntyObj.selectNewLineItem('line');
		taxEntyObj.setCurrentLineItemValue('line', 'account', '1057');//1568
		taxEntyObj.setCurrentLineItemValue('line', 'credit', parseFloat(nhilAmtArray[i]).toFixed(2));
		taxEntyObj.setCurrentLineItemValue('line', 'entity', Name);//1568
		taxEntyObj.commitLineItem('line');
		}
		
		for(var j=0 ; j<getFndAmtArray.length;j++)
		{
		taxEntyObj.selectNewLineItem('line');
		taxEntyObj.setCurrentLineItemValue('line', 'account', '1060');//1569
		taxEntyObj.setCurrentLineItemValue('line', 'credit', parseFloat(getFndAmtArray[j]).toFixed(2));
		taxEntyObj.setCurrentLineItemValue('line', 'entity', Name);//1568
		taxEntyObj.commitLineItem('line');
		}
		//Debit line entry
		
		for(nwLineCnt =0 ; nwLineCnt<expAcctArray.length;nwLineCnt++)
		{
			var amt = parseFloat(nhilAmtArray[nwLineCnt]) + parseFloat(getFndAmtArray[nwLineCnt]);
			taxEntyObj.selectNewLineItem('line');
			taxEntyObj.setCurrentLineItemValue('line', 'account', expAcctArray[nwLineCnt]);
			taxEntyObj.setCurrentLineItemValue('line', 'debit', amt);
			taxEntyObj.commitLineItem('line');
		}
    	//o_cstmTran_obj.setCurrentLineItemValue('line', 'credit', amtTot);
    	//o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
	/*	
		taxEntyObj.selectLineItem('accountingbookdetail',1);
		taxEntyObj.setCurrentLineItemValue('accountingbookdetail', 'exchangerate', accBookEx);//1568
		taxEntyObj.commitLineItem('accountingbookdetail');*/
	}
	 var taxrevId = nlapiSubmitRecord(taxEntyObj,false,false);
	 return taxrevId;
}

function createExpenseReversalentryVat(expAcctArray,vatAmtArr,Subsidiary,currency,recId,TranDate,Name,accBookEx)
{

	var taxEntyObj = nlapiCreateRecord('customtransaction116');
	taxEntyObj.setFieldValue('subsidiary',Subsidiary);
	taxEntyObj.setFieldValue('currency',currency);
	taxEntyObj.setFieldValue('trandate',TranDate);
	taxEntyObj.setFieldValue('custbody_bill_id',recId);
	if(expAcctArray.length != null)
	{
		
		for(nwLineCnt =0 ; nwLineCnt<expAcctArray.length;nwLineCnt++)
		{
			
			taxEntyObj.selectNewLineItem('line');
			taxEntyObj.setCurrentLineItemValue('line', 'account', expAcctArray[nwLineCnt]);
			taxEntyObj.setCurrentLineItemValue('line', 'debit', parseFloat(vatAmtArr[nwLineCnt]).toFixed(2));
			taxEntyObj.commitLineItem('line');
			
			taxEntyObj.selectNewLineItem('line');
			taxEntyObj.setCurrentLineItemValue('line', 'account', '934');//1569
			taxEntyObj.setCurrentLineItemValue('line', 'credit', parseFloat(vatAmtArr[nwLineCnt]).toFixed(2));
			taxEntyObj.setCurrentLineItemValue('line', 'entity', Name);//1568
			taxEntyObj.commitLineItem('line');
		}
    	//o_cstmTran_obj.setCurrentLineItemValue('line', 'credit', amtTot);
    	//o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
		nlapiLogExecution('DEBUG', 'After Submit value of nhilAmtTotal', "  accBookEx ==" + accBookEx);
		
		/*taxEntyObj.selectLineItem('accountingbookdetail',1);
		taxEntyObj.setCurrentLineItemValue('accountingbookdetail','exchangerate',accBookEx);//1568
		taxEntyObj.commitLineItem('accountingbookdetail');*/
	}
	 var taxrevId = nlapiSubmitRecord(taxEntyObj,false,false);
	 return taxrevId;
}
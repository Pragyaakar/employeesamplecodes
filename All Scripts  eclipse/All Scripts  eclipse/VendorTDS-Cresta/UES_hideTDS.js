/**
 * @author Amol
 */
// BEGIN SCRIPT DESCRIPTION BLOCK  ==================================
{
/*
   	Script Name:UES Check Advance pay to Vendor
	Author:
	Company:
	Date:
	Description:Create a bill credit record for advance pay to vendor


	Script Modification Log:

	-- Date --			-- Modified By --				--Requested By--				-- Description --

Below is a summary of the process controls enforced by this script file.  The control logic is described
more fully, below, in the appropriate function headers and code blocks.


     BEFORE LOAD
		- beforeLoadRecord(type)



     BEFORE SUBMIT
		- beforeSubmitRecord(type)


     AFTER SUBMIT
		- afterSubmitRecord(type)



     SUB-FUNCTIONS
		- The following sub-functions are called by the above core functions in order to maintain code
            modularization:

               - NOT USED

*/
}
// END SCRIPT DESCRIPTION BLOCK  ====================================



// BEGIN GLOBAL VARIABLE BLOCK  =====================================
{
	//  Initialize any Global Variables, in particular, debugging variables...




}
// END GLOBAL VARIABLE BLOCK  =======================================





// BEGIN BEFORE LOAD ==================================================


function beforeLoadRecord_hideTDStype(type){

	/*  On before load:
	 - EXPLAIN THE PURPOSE OF THIS FUNCTION
	 -
	 FIELDS USED:
	 --Field Name--				--ID--
	 */
	//  LOCAL VARIABLES
	
	//  BEFORE LOAD CODE BODY
	
	if (type == 'edit')
	{
		
		var checkid = nlapiGetRecordId()
		nlapiLogExecution('DEBUG', 'afterSubmitRecord check ', " checkid " + checkid)
		
		var recordType = nlapiGetRecordType()
		nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " recordType " + recordType)
		
		//var o_checkobj = nlapiLoadRecord(recordType, checkid)
		
		
		var o_checkobj = nlapiCreateRecord(recordType, {recordmode: 'dynamic'});
		
			var blcrdt;
			var itemArrayItm = new Array();
			var qtyArrayItm =  new Array();
			var rateArrayItm = new Array();
			var taxArrayItm =  new Array();
			var item;
			var qty;
			var rate;
			var acct;
			var tax;
			var date;
            var dept;
            var clas;
            var project;
			var acctArrayExp = new Array();
            var deptArrayExp = new Array();
          	var classArrayExp = new Array();
          	var projectArrayExp = new Array();
          	
          	 var deptArrayItm = new Array();
           	var classArrayItm = new Array();
           	var locationArrayExp = new Array();
        	var locationArrayItem = new Array();
           	var projectArrayItm = new Array();
           	
			var rateArrayExp = new Array();
			var taxArrayExp =  new Array();
			var Account;
			var subsidiary;
			var date;
			var payee;
			var totalAmount= 0.00;
			var expAmt = 0.00;
			var itemAmt = 0.00;
			var amtTot ;
			var tdsPayAcc;
			var sectionCode;
      
      		
			
			if (o_checkobj != null && o_checkobj != '' && o_checkobj != undefined) 
			{
				var exp_linecount = o_checkobj.getLineItemCount('expense');
				var itm_LineCount = o_checkobj.getLineItemCount('item');
			
				var b_Adavncetoved = o_checkobj.getFieldValue('custbody_advancepay')
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " advance to vendor " + b_Adavncetoved)
				
				if (b_Adavncetoved == 'T') 
				{
						/*date = o_checkobj.getFieldValue('trandate');
						payee = o_checkobj.getFieldValue('entity');
						subsidiary = o_checkobj.getFieldValue('subsidiary');
						var nexus =o_checkobj.getFieldValue('custbody_nexus');//custbody_nexus
						
						if(exp_linecount != null && !isNaN(exp_linecount))		
						{
							for (var i = 1; i <= exp_linecount; i++) 
							{
								
								acct = o_checkobj.getLineItemValue('expense', 'account', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "acct" + acct)
								acctArrayExp.push(acct);
								
                              	dept = o_checkobj.getLineItemValue('expense', 'department', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "dept" + dept)
								deptArrayItm.push(dept);
                              
                              	clas = o_checkobj.getLineItemValue('expense', 'class', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "clas" + clas)
								classArrayItm.push(clas);//locationArray
                              
                              	var loc = o_checkobj.getLineItemValue('expense', 'location', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "loc" + loc)
								locationArrayExp.push(loc);
                              	
                              	project = o_checkobj.getLineItemValue('expense', 'customer', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "acct" + acct)
								projectArrayItm.push(acct);
                              
								var tax = o_checkobj.getLineItemValue('expense', 'taxcode', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "tax" + tax)
								taxArrayExp.push(tax);
								
								var rate = o_checkobj.getLineItemValue('expense', 'amount', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "rate" + rate)
								rateArrayExp.push(rate);
								expAmt = parseFloat(expAmt) + parseFloat(rate);
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "expAmt" + expAmt)
								
							}
						}
						

						
						if(itm_LineCount != null && !isNaN(itm_LineCount))
						{
							for (var j = 1; j <= itm_LineCount; j++) 
							{
								
								item = o_checkobj.getLineItemValue('item', 'item', j)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "item" + item)
								itemArrayItm .push(item);
								
								qty = o_checkobj.getLineItemValue('item','quantity', j)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "qty" + qty)
								qtyArrayItm  .push(qty);
								
								dept = o_checkobj.getLineItemValue('item', 'department', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "dept" + dept)
								deptArrayExp.push(dept);
                              
                              	clas = o_checkobj.getLineItemValue('item', 'class', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "acct" + acct)
								classArrayExp.push(clas);
                              
                              	var loc = o_checkobj.getLineItemValue('expense', 'location', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "loc" + loc)
								locationArrayItem.push(loc);
                              	
                              	project = o_checkobj.getLineItemValue('item', 'customer', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "acct" + acct)
								projectArrayExp.push(acct);
								
								
								var rate = o_checkobj.getLineItemValue('item', 'amount', j)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "rate" + rate);
								rateArrayItm .push(rate);
								
								itemAmt = parseFloat(itemAmt) + parseFloat(rate);
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemAmt" + itemAmt)
								
								var tax = o_checkobj.getLineItemValue('item', 'taxcode', j)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "tax" + tax)
								taxArrayExp.push(tax);								
								
								
								
								
							}
						}
						 
					*/
					 for(var k = exp_linecount; k >= 1; k--)
					  {
							var rate = o_checkobj.getLineItemValue('expense', 'amount', k)
							nlapiLogExecution('DEBUG', 'RemoveLineItems ', "rate---:" + rate)
							
							if(rate>=0)
							{
								nlapiLogExecution('DEBUG', 'RemoveLineItems ', "rate---:" + rate)
							}
							else
							{
								nlapiLogExecution('DEBUG', 'RemoveLineItems ', "InsideRemoveItem" )
						     //nlapiRemoveLineItem('expense',k);
							  o_checkobj.removeLineItem('expense',k);
							//	 o_checkobj..commitLineItem('expense');
							}
							// nlapiSubmitRecord(o_checkobj, true, true);
			       }	
					
				}//end of advance check
			}
				
	}
	if(type == 'copy'){
		// To remove all (Advanced payment Related)related values from Check Record.
		nlapiSetFieldValue('custbody_custom_trans_id', null, false, null);
		nlapiSetFieldValue('custbody_advancepay', 'F', false, null);
		nlapiSetFieldValue('custbody_section_code', null, false, null);
		
	}
	
}

// END BEFORE LOAD ====================================================





// BEGIN BEFORE SUBMIT ================================================

function beforeSubmitRecord(type)
{
    /*  On before submit:

          - PURPOSE
		-

          FIELDS USED:

          --Field Name--				--ID--


    */


    //  LOCAL VARIABLES


    //  BEFORE SUBMIT CODE BODY


	return true;

}

// END BEFORE SUBMIT ==================================================





// BEGIN AFTER SUBMIT =============================================
var vendorAdvancedPaymentCustRec;
function afterSubmitRecord_advancepay(type)
{
    /*  On after submit:

          - PURPOSE
		-

	FIELDS USED:

          --Field Name--				--ID--


    */


	//  LOCAL VARIABLES



	//  AFTER SUBMIT CODE BODY
		
	try
	{
		
	
	
		//if (type == 'create' || type =='edit') //create
			if (type == 'create' || type =='edit')
		{
			var checkid = nlapiGetRecordId()
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check ', " checkid " + checkid)
			
			var recordType = nlapiGetRecordType()
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " recordType " + recordType)
			
			var o_checkobj = nlapiLoadRecord(recordType, checkid)
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " recordType " + recordType)
			var blcrdt;
			var itemArrayItm = new Array();
			var qtyArrayItm =  new Array();
			var rateArrayItm = new Array();
			var taxArrayItm =  new Array();
			var item;
			var qty;
			var rate;
			var acct;
			var tax;
			var date;
            var dept;
            var clas;
            var project;
			var acctArrayExp = new Array();
            var deptArrayExp = new Array();
          	var classArrayExp = new Array();
          	var projectArrayExp = new Array();
          	
          	 var deptArrayItm = new Array();
           	var classArrayItm = new Array();
           	var locationArrayExp = new Array();
        	var locationArrayItem = new Array();
           	var projectArrayItm = new Array();
           	
			var rateArrayExp = new Array();
			var taxArrayExp =  new Array();
			var Account;
			var subsidiary;
			var date;
			var payee;
			var totalAmount= 0.00;
			var expAmt = 0.00;
			var itemAmt = 0.00;
			var amtTot ;
			var tdsPayAcc;
			var sectionCode;
			var setID
			
			
			if (o_checkobj != null && o_checkobj != '' && o_checkobj != undefined) 
			{
				var exp_linecount = o_checkobj.getLineItemCount('expense');
				var itm_LineCount = o_checkobj.getLineItemCount('item');
				
				var b_Adavncetoved = o_checkobj.getFieldValue('custbody_advancepay');
				var section_code_ = o_checkobj.getFieldValue('custbody_section_code');
				 vendorAdvancedPaymentCustRec =  o_checkobj.getFieldValue('custbody_custom_trans_id');
				
				
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " advance to vendor " + b_Adavncetoved)
				
				if (b_Adavncetoved == 'T' ) 
				{
						date = o_checkobj.getFieldValue('trandate');
						payee = o_checkobj.getFieldValue('entity');
						subsidiary = o_checkobj.getFieldValue('subsidiary');
						var nexus =o_checkobj.getFieldValue('custbody_nexus');//custbody_nexus
						
						if(exp_linecount != null && !isNaN(exp_linecount))		
						{
							for (var i = 1; i <= exp_linecount; i++) 
							{
								
								acct = o_checkobj.getLineItemValue('expense', 'account', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "acct" + acct)
								acctArrayExp.push(acct);
								
                              	dept = o_checkobj.getLineItemValue('expense', 'department', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "dept" + dept)
								deptArrayItm.push(dept);
                              
                              	clas = o_checkobj.getLineItemValue('expense', 'class', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "clas" + clas)
								classArrayItm.push(clas);//locationArray
                              
                              	var loc = o_checkobj.getLineItemValue('expense', 'location', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "loc" + loc)
								locationArrayExp.push(loc);
                              	
                              	project = o_checkobj.getLineItemValue('expense', 'customer', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "acct" + acct)
								projectArrayItm.push(acct);
                              
								var tax = o_checkobj.getLineItemValue('expense', 'taxcode', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "tax" + tax)
								taxArrayExp.push(tax);
								
								var rate = o_checkobj.getLineItemValue('expense', 'amount', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "rate" + rate)
								rateArrayExp.push(rate);
								expAmt = parseFloat(expAmt) + parseFloat(rate);
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "expAmt" + expAmt)
							}
						}
						if(itm_LineCount != null && !isNaN(itm_LineCount))
						{
							for (var j = 1; j <= itm_LineCount; j++) 
							{
								
								item = o_checkobj.getLineItemValue('item', 'item', j)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "item" + item)
								itemArrayItm .push(item);
								
								qty = o_checkobj.getLineItemValue('item','quantity', j)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "qty" + qty)
								qtyArrayItm  .push(qty);
								
								dept = o_checkobj.getLineItemValue('item', 'department', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "dept" + dept)
								deptArrayExp.push(dept);
                              
                              	clas = o_checkobj.getLineItemValue('item', 'class', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "acct" + acct)
								classArrayExp.push(clas);
                              
                              	var loc = o_checkobj.getLineItemValue('expense', 'location', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "loc" + loc)
								locationArrayItem.push(loc);
                              	
                              	project = o_checkobj.getLineItemValue('item', 'customer', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "acct" + acct)
								projectArrayExp.push(acct);
								
								
								var rate = o_checkobj.getLineItemValue('item', 'amount', j)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "rate" + rate);
								rateArrayItm .push(rate);
								
								itemAmt = parseFloat(itemAmt) + parseFloat(rate);
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemAmt" + itemAmt)
								
								var tax = o_checkobj.getLineItemValue('item', 'taxcode', j)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "tax" + tax)
								taxArrayExp.push(tax);								
								
							}
						}
						totalAmount= parseFloat(expAmt) + parseFloat(itemAmt);
						nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "totalAmount" + totalAmount);
						
						amtTot = o_checkobj.getFieldValue('usertotal');
						nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "amtTot" + amtTot);
						
						tdsPayAcc = o_checkobj.getFieldValue('custbody_tds_payable_acct');
						nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "tdsPayAcc" + tdsPayAcc);
						
						sectionCode = o_checkobj.getFieldValue('custbody_section_code');
						nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "sectionCode" + sectionCode);
						var secRate;
						if(sectionCode != null && sectionCode != undefined && sectionCode != ''){
							 secRate = nlapiLookupField('customrecord_in_tds_setup',sectionCode,'custrecord_in_tds_setup_rate');
							nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "secRate" + secRate);
						}
						else{
							secRate = 0;
						}
						 
						var tdsValue = parseFloat(secRate) / 100 * parseFloat(amtTot);
						nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "tdsValue" + tdsValue);
						
						var creditAmt = parseFloat(amtTot) - parseFloat(tdsValue);
						nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "creditAmt" + creditAmt);
						
						var entity = o_checkobj.getFieldValue('entity');
						nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "entity" + entity);
						
						var defaccount =nlapiLookupField('vendor',entity,'payablesaccount');
						nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "defaccount" + defaccount);
						
						setID =	createBillCreditRecord(date,payee,acctArrayExp,rateArrayExp,taxArrayExp,itemArrayItm,qtyArrayItm,rateArrayItm,taxArrayItm,o_checkobj,checkid,
								deptArrayExp,classArrayExp,projectArrayExp,deptArrayItm,classArrayItm,projectArrayItm,subsidiary,totalAmount,locationArrayItem,locationArrayExp,tdsValue,creditAmt,amtTot,nexus,defaccount,sectionCode);
				}
				
				
				if((exp_linecount != null && !isNaN(exp_linecount)) && (section_code_ != null && section_code_ != undefined && section_code_ != ''))		
				{
					for (var m = 1 ; m <= exp_linecount  ; m++) 
					{
						
						o_checkobj.selectNewLineItem('expense');
				         
						o_checkobj.setCurrentLineItemValue('expense', 'account', 1357);
						
						o_checkobj.setCurrentLineItemValue('expense', 'amount',(0-tdsValue));
					    //o_checkobj.setCurrentLineItemValue('expense', 'amount',tdsValue);
					  
                      	o_checkobj.setCurrentLineItemValue('expense', 'department', deptArrayItm[m-1]);
						                              
                      	 o_checkobj.setCurrentLineItemValue('expense', 'class', classArrayItm[m-1]);
						
                      	 o_checkobj.setCurrentLineItemValue('expense', 'location', locationArrayExp[m-1]);
					
                     
						  o_checkobj.commitLineItem('expense');
						
					}
				}
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "setID Value " + setID);
				o_checkobj.setFieldValue('custbody_custom_trans_id',setID);
				var chkRecId = nlapiSubmitRecord(o_checkobj,true);
				
				var vendAdvncPayObj = nlapiSubmitField('',setID,'custbody_cheque_id',chkRecId);
				
				 //o_checkobj.setFieldValue('custbody_billcredit_ref',blcrdt);custbody_dbtamt_paymnt
				//nlapiSubmitField(recType, recId, fields, values);
			}//end-if(Advance to vendor=='T')
		}//End if(o_checkobj != null)
		/*
		// START : Cheque edit and change.
		   var checkid = nlapiGetRecordId()
		   nlapiLogExecution('DEBUG', 'afterSubmitRecord check ', " checkid " + checkid)
			
		   nlapiLogExecution('DEBUG', 'afterSubmitRecord ', "checkid Value " + checkid);
		   var previousApplied;
		   var filters = new Array(); 
	       filters[0] = new nlobjSearchFilter( 'internalid','custbody_cheque_id','anyof', checkid);
	       
	       var columns = new Array();
	       columns[0] = new nlobjSearchColumn('custbodyadvance_aleredy_applied');   
	       //Search with filters and columns
	       var searchresults = nlapiSearchRecord('customtransaction102',null, filters, columns);
	       		
	       		for ( var i = 0; searchresults != null && i < searchresults.length; i++ )   
	       			{
	       				previousApplied = searchresults[i].getValue('custbodyadvance_aleredy_applied');
	       				nlapiLogExecution('DEBUG', 'BeforeLoadRecord check', "previousApplied" + previousApplied);
	       			}
		  
	       		if (type =='edit'&& previousApplied == 'F')
	       			{
	       				nlapiLogExecution('DEBUG', 'afterSubmitRecord ', "In IF Function");
	       				
	       			
	       			
	       			
	       			
	       			
	       			}
		
		// END : Cheque edit and change.
		
		*/
		
		
		
		
	}
	
	
	
	
	
	
	catch(e)
	{
		nlapiLogExecution('ERROR', 'ERROR IS', "DESCRIPTION " + e)
	}
}

// END AFTER SUBMIT ===============================================





// BEGIN FUNCTION ===================================================
{
 // == FUNCTION FOR SEARCHING SUBSIDIARY GOLBAL PARAMETER ==
  
    function createBillCreditRecord(date,payee,acctArrayExp,rateArrayExp,taxArrayExp,itemArrayItm,qtyArrayItm,rateArrayItm,taxArrayItm,o_checkobj,checkid,
    		deptArrayExp,classArrayExp,projectArrayExp,deptArrayItm,classArrayItm,projectArrayItm,subsidiary,totalAmount,locationArrayItem,locationArrayExp,tdsValue,creditAmt,amtTot,nexus,defaccount,sectionCode)
    {	
    	nlapiLogExecution('DEBUG', 'date;'+date+' ,payee:'+payee, 'acctArrayExp:'+acctArrayExp+' ,rateArrayExp:'+rateArrayExp+' ,taxArrayExp:'+taxArrayExp+' ,itemArrayItm:'+itemArrayItm+' ,qtyArrayItm:'+qtyArrayItm+' ,rateArrayItm:'+rateArrayItm+' ,taxArrayItm:'+taxArrayItm+' ,o_checkobj:'+o_checkobj
    			+' ,checkid:'+checkid+' ,deptArrayExp:'+deptArrayExp+' ,classArrayExp:'+classArrayExp+' ,projectArrayExp:'+projectArrayExp+' ,deptArrayItm:'+deptArrayItm+' ,classArrayItm:'+classArrayItm
    			+' ,projectArrayItm:'+projectArrayItm+' ,subsidiary:'+subsidiary+' ,totalAmount:'+totalAmount+' ,locationArrayItem:'+locationArrayItem+' ,locationArrayExp:'+locationArrayExp+' ,tdsValue:'+tdsValue
    			+' ,creditAmt:'+creditAmt+' ,amtTot:'+amtTot+' ,nexus:'+nexus+' ,defaccount:'+defaccount+',sectionCode:'+sectionCode);
    	
    	var tdsPayable = 0.00;
    	var payableAmt = 0.00;
    	
    	//TDS payable calculation
    	//classArrayExpF
    	
    	var exp_linecount = acctArrayExp.length;
    	var item_LineCount = itemArrayItm.length;
    	var location = '2';
    	var memo = 'createdFromChequeEntry';
    	var o_cstmTran_obj;
    	if(vendorAdvancedPaymentCustRec == null || vendorAdvancedPaymentCustRec == undefined || vendorAdvancedPaymentCustRec == '')
    	{
    		 o_cstmTran_obj = nlapiCreateRecord('customtransaction102'); // create new record
    	     //vendorAdvancedPaymentCustRec = o_cstmTran_obj; 
    	     
    	     	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "before");
    	    	o_cstmTran_obj.selectNewLineItem('line');	
    	    	
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'account', defaccount);
    	    	var drbAmount = parseFloat(creditAmt)+parseFloat(tdsValue);
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'debit', drbAmount);
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'memo', 'Advance Paid');
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'department', deptArrayItm[0]);
    	    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Department Done debit" + deptArrayItm[0]);
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'class', classArrayItm[0]);
    	    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Class Done debit" + classArrayItm[0]);
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'location', locationArrayExp[0]);
    	    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Location Done debit" + locationArrayExp[0]);
    	    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "check1");
    	    	
    	    	
    	    	
    	    	o_cstmTran_obj.commitLineItem('line');
    	    	//for (var acctArrayExpIndex = 0; acctArrayExpIndex < acctArrayExp.length; acctArrayExpIndex++) {
    	    	o_cstmTran_obj.selectNewLineItem('line');
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'account', acctArrayExp[0]);
    	    	var creAmount = parseFloat(creditAmt)+parseFloat(tdsValue);    	
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'credit', creAmount);
    	    	//o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'department', deptArrayItm[0]);
    	    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Department Done Credit" + deptArrayItm[0]);
    	    	o_cstmTran_obj.setCurrentLineItemValue('line','class', classArrayItm[0]);
    	    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Class Done Credit" + classArrayItm[0]);
    	    	o_cstmTran_obj.setCurrentLineItemValue('line', 'location', locationArrayExp[0]);
    	    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Location Done Credit" + locationArrayExp[0]);
    	    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "check2");
    	    	o_cstmTran_obj.commitLineItem('line');
    	    	
    	     
    	}
    	else{
    		o_cstmTran_obj = nlapiLoadRecord('customtransaction102',vendorAdvancedPaymentCustRec); // update record
    		//o_cstmTran_obj = vendorAdvancedPaymentCustRec; 
    		
    		nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "before");
        	o_cstmTran_obj.selectLineItem('line',1);	
        	
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'account', defaccount);
        	var drbAmount = parseFloat(creditAmt)+parseFloat(tdsValue);
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'debit', drbAmount);
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'memo', 'Advance Paid');
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'department', deptArrayItm[0]);
        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Department Done debit" + deptArrayItm[0]);
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'class', classArrayItm[0]);
        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Class Done debit" + classArrayItm[0]);
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'location', locationArrayExp[0]);
        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Location Done debit" + locationArrayExp[0]);
        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "check1");
        	o_cstmTran_obj.commitLineItem('line');
        	//for (var acctArrayExpIndex = 0; acctArrayExpIndex < acctArrayExp.length; acctArrayExpIndex++) {
        	
        	o_cstmTran_obj.selectLineItem('line',2);
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'account', acctArrayExp[0]);
        	var creAmount = parseFloat(creditAmt)+parseFloat(tdsValue);    	
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'credit', creAmount);
        	//o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'department', deptArrayItm[0]);
        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Department Done Credit" + deptArrayItm[0]);
        	o_cstmTran_obj.setCurrentLineItemValue('line','class', classArrayItm[0]);
        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Class Done Credit" + classArrayItm[0]);
        	o_cstmTran_obj.setCurrentLineItemValue('line', 'location', locationArrayExp[0]);
        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Location Done Credit" + locationArrayExp[0]);
        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "check2");
        	o_cstmTran_obj.commitLineItem('line');
        	
    	}
    	
    	/*o_cstmTran_obj.setFieldValue('custbody_cheque_id',checkid);custbody_dbtamt_paymnt
    	o_cstmTran_obj.setFieldValue('trandate',date);
    	o_cstmTran_obj.setFieldValue('subsidiary',subsidiary);
    	o_cstmTran_obj.setFieldValue('memo',memo);
    	o_cstmTran_obj.setFieldValue('custbody_advance_checkdate',date);
    	o_cstmTran_obj.setFieldValue('custbody_nexus',nexus);*/
    	
    	
    	
    	/*nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "before");
    	o_cstmTran_obj.selectNewLineItem('line');	
    	
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'account', defaccount);
    	var drbAmount = parseFloat(creditAmt)+parseFloat(tdsValue);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'debit', drbAmount);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'memo', 'Advance Paid');
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'department', deptArrayItm[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Department Done debit" + deptArrayItm[0]);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'class', classArrayItm[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Class Done debit" + classArrayItm[0]);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'location', locationArrayExp[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Location Done debit" + locationArrayExp[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "check1");
    	
    	
    	
    	o_cstmTran_obj.commitLineItem('line');
    	//for (var acctArrayExpIndex = 0; acctArrayExpIndex < acctArrayExp.length; acctArrayExpIndex++) {
    	o_cstmTran_obj.selectNewLineItem('line');
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'account', acctArrayExp[0]);
    	var creAmount = parseFloat(creditAmt)+parseFloat(tdsValue);    	
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'credit', creAmount);
    	//o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'department', deptArrayItm[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Department Done Credit" + deptArrayItm[0]);
    	o_cstmTran_obj.setCurrentLineItemValue('line','class', classArrayItm[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Class Done Credit" + classArrayItm[0]);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'location', locationArrayExp[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Location Done Credit" + locationArrayExp[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "check2");
    	o_cstmTran_obj.commitLineItem('line');
    	*/
    	/*
    	o_cstmTran_obj.selectNewLineItem('line');
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'account', 1357);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'debit',tdsValue);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'entity', payee);
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'memo', 'TDS Value');
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'department', deptArrayItm[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Department Done TDS" + deptArrayItm);
    	
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'class', classArrayItm[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Class Done TDS" + classArrayItm);
    	
    	o_cstmTran_obj.setCurrentLineItemValue('line', 'location', locationArrayExp[0]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Location Done TDS" + locationArrayExp);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "check3");
    	o_cstmTran_obj.commitLineItem('line');
    	*/
	
	
    	o_cstmTran_obj.setFieldValue('custbody_section_code',sectionCode);
    	
    	var roundTDSamount = parseFloat(tdsValue).toFixed(2);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "roundTDSamount" +roundTDSamount);
    	//o_cstmTran_obj.setFieldValue('custbody_tdsamount',tdsValue);
    	o_cstmTran_obj.setFieldValue('custbody_tdsamount',roundTDSamount);
      o_cstmTran_obj.setFieldValue('custbody_dbtamt_paymnt',drbAmount);
      var record =  nlapiSubmitRecord(o_cstmTran_obj);
      vendorAdvancedPaymentCustRec = record;
        
    		
    	nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)
    	 return record;
    }
   
    
}
// END FUNCTION =====================================================


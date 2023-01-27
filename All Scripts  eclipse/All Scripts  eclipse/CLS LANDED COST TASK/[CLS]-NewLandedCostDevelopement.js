/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       4 Jun 2020      ATPL
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
function uesLandedCost(type)
{
	try
	{
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var vbObj = nlapiLoadRecord(recordType,recordId);
		//nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
	  
	   
	    var tranNumber =vbObj.getFieldValue('transactionnumber');
	    
	    var refNumber =vbObj.getFieldValue('tranid');
	    
	    var Vendor =vbObj.getFieldValue('entity');
	    
	    var Account =vbObj.getFieldValue('account');
	    
	    var currency =vbObj.getFieldValue('currency');
	    
	    
	    var BillDate =vbObj.getFieldValue('trandate');
	    
	    var subsidiary =vbObj.getFieldValue('subsidiary');
	    
	    var memo =vbObj.getFieldValue('memo');
	    
	  
	    
		var lineCount = vbObj.getLineItemCount('item');
		
		var lineCount1 = vbObj.getLineItemCount('expense');
		
		nlapiLogExecution('DEBUG','Search  Value','Item :'+lineCount);
		
		nlapiLogExecution('DEBUG','Search Value','Expense :'+lineCount1);
		
		var itemArr=[];
		var QtyArr =[];
		var unitArr =[];
		var RateArr=[];
		var AmtArr =[];
		var LandedCostArr=[];
		var LandedCostCatArr =[];
		var DeptArr=[];
		var ClssArr =[];
		var LocArr=[];
		
		
		if(lineCount > 0 )
		{
			nlapiLogExecution('DEBUG','Search Value','item lineCount in for loop');
			for(i=1;i<=lineCount;i++)
		    {
				
				var item =	vbObj.getLineItemValue('item','item',i);
				itemArr.push(item);
				
				var Qty =	vbObj.getLineItemValue('item','quantity',i);
				QtyArr.push(Qty);
				
				var units =	vbObj.getLineItemValue('item','units',i);
				unitArr.push(units);
				
				var Rate =	vbObj.getLineItemValue('item','rate',i);
				RateArr.push(Rate);
				
				var Amt =	vbObj.getLineItemValue('item','amount',i);
				AmtArr.push(Amt);
				
				var LandedCost = vbObj.getLineItemValue('item','landedcost',i);
				LandedCostArr.push(LandedCost);
								
				var LandedCostCategory = vbObj.getLineItemValue('item','landedcostcategory',i);
				LandedCostCatArr.push(LandedCostCategory);
				
                var Department = vbObj.getLineItemValue('item','department',i);
                DeptArr.push(Department);
                
				var Class =	vbObj.getLineItemValue('item','class',i);
				ClssArr.push(Class);
				
				var location =	vbObj.getLineItemValue('item','location',i);
				LocArr.push(location);
			 }//End of if linecount	 
		    
		}
	    
	    var AccArr=[];
	    var ExpAmtArr=[];
	    var ExpDeptArr=[];
	    var ExpClssArr=[];
	    var ExpLocArr=[];
	    var ExpTrackNumArr=[];
	    
		if(lineCount1 > 0 )
		{
			nlapiLogExecution('DEBUG','Search Value','Expense lineCount in for loop');
			 for(i1=1;i1<=lineCount1;i1++)
			    {
					 var LCcheck =	vbObj.getLineItemValue('expense','custcol_landed_cost_line',i1);
				     
				       if(LCcheck == 'T')
				    	{
					    	var Acc =	vbObj.getLineItemValue('expense','account',i1);
					    	AccArr.push(Acc);
						     
							 var ExpAmt =	vbObj.getLineItemValue('expense','amount',i1);
							 ExpAmtArr.push(ExpAmt);
							 
							 var ExpTrackNum =vbObj.getLineItemValue('expense','custcol_landed_cost_track_num',i1);
							 ExpTrackNumArr.push(ExpTrackNum);
							 
							 var ExpDepartment =vbObj.getLineItemValue('expense','department',i1);
							 ExpDeptArr.push(ExpDepartment);
							 
							 var ExpClass =	vbObj.getLineItemValue('expense','class',i1);
							 ExpClssArr.push(ExpClass);
							 
							 var Explocation =	vbObj.getLineItemValue('expense','location',i1);
							 ExpLocArr.push(Explocation);
				    	}
				     
				 }//End of if linecount1 
			    
		}
	   
		var CustRecordDel =vbObj.getFieldValue('custbody_landed_bill_cust_rec');
		
		if(CustRecordDel !=null && CustRecordDel !='')
		{
			 nlapiSubmitField('customrecord_vendor_bill_cust_rec', CustRecordDel,'isinactive','T');
			   
		}
	   
		var retIR =createCustomRecord(recordId,tranNumber,refNumber,Vendor,Account,currency,BillDate,subsidiary,memo,
				 itemArr,QtyArr,unitArr,RateArr,AmtArr,LandedCostArr,LandedCostCatArr,DeptArr,ClssArr,
				 LocArr,AccArr,ExpAmtArr,ExpDeptArr,ExpClssArr,ExpLocArr,ExpTrackNumArr);
	   
		if(retIR)
		{
			vbObj.setFieldValue('custbody_landed_bill_cust_rec',retIR);
				
		}
		
		nlapiSubmitRecord(vbObj,true);
	}
    catch(e)
    {
    	nlapiLogExecution('DEBUG','Error In Line Landed Cost','Error =='+e);
    }
  
    
    
}

function createCustomRecord(recordId,tranNumber,refNumber,Vendor,Account,currency,BillDate,subsidiary,memo,
		 itemArr,QtyArr,unitArr,RateArr,AmtArr,LandedCostArr,LandedCostCatArr,DeptArr,ClssArr,
		 LocArr,AccArr,ExpAmtArr,ExpDeptArr,ExpClssArr,ExpLocArr,ExpTrackNumArr)
{
	
    nlapiLogExecution('Debug', 'Custom Record', "Custom record Creation ...")
    
	var custRec = nlapiCreateRecord('customrecord_vendor_bill_cust_rec',{recordmode: 'dynamic'});
	
	custRec.setFieldValue('custrecord_tran_num',tranNumber);
	custRec.setFieldValue('custrecord_ref_num',refNumber);
	custRec.setFieldValue('custrecord_vendor',Vendor);
	custRec.setFieldValue('custrecord_account_num',Account);
	
	custRec.setFieldValue('custrecord_subsidiary',subsidiary);
	custRec.setFieldValue('custrecord_currency',currency);
	custRec.setFieldValue('custrecord_memo',memo);
	custRec.setFieldValue('	custrecord_bill_ref_on_rec',recordId);
	custRec.setFieldValue('custrecord_bill_date',BillDate);
	
	if(AccArr != null && AccArr != undefined && AccArr != '')
	{
		for ( var i=0;i<AccArr.length;i++)
		{
			custRec.selectNewLineItem('recmachcustrecord_bill_line_header');
			
			custRec.setCurrentLineItemValue('recmachcustrecord_bill_line_header','custrecord_bill_account',AccArr[i]);
			
			custRec.setCurrentLineItemValue('recmachcustrecord_bill_line_header','custrecord_tracking_number',ExpTrackNumArr[i]);
			
			custRec.setCurrentLineItemValue('recmachcustrecord_bill_line_header','custrecord_bill_expense_amount',ExpAmtArr[i]);
			
			custRec.setCurrentLineItemValue('recmachcustrecord_bill_line_header','custrecord_exp_depart',ExpDeptArr[i]);
			
			custRec.setCurrentLineItemValue('recmachcustrecord_bill_line_header','custrecord_exp_class',ExpClssArr[i]);
			
			custRec.setCurrentLineItemValue('recmachcustrecord_bill_line_header','custrecord_exp_location',ExpLocArr[i]);
			
			custRec.commitLineItem('recmachcustrecord_bill_line_header');
		}
		
	}
	var record =  nlapiSubmitRecord(custRec,true);
    nlapiLogExecution('Debug', 'record IS Created..', "Custom record id =" + record)
    
    return record;
	
}
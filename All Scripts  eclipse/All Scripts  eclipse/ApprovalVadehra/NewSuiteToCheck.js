/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Mar 2019     Tushar More
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suiteletForApprove(request, response)
{
	var ID =request.getParameter('requi'); 
	nlapiLogExecution('DEBUG', 'IN the Post Method', 'Post'+ID);
 var count = request.getLineItemCount('custpage_sig_req_sublist');
 
 nlapiLogExecution('DEBUG', 'suiteletForApprove', 'count :'+count);
 var user = nlapiGetUser();
  var num = 0;
   
  var itemArr =new Array();
  var quanArr =new Array();
  var projNameArr =new Array();
  var LocArr =new Array();
  var amtArr =new Array();
  var rateArr =new Array(); 
  var lineArr =new Array();
  var aproveReqArr =new Array();
  var thrLimQtyArr =new Array(); 
  var thrLimAmtArr =new Array();
  var customProjArr =new Array();
  var customItemArr =new Array(); 
  var remarkArr =new Array(); 
  var cust_idArr = new Array();
  var directArr = new Array();//
  var tranidArr =new Array();
  var lineNum =0;
  for(var i=1; i< count+1; i++)
  {
	  	
		   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);

   if(checkMark == 'T')
   {
     
           var internalId = request.getLineItemValue('custpage_sig_req_sublist', 'internalid', i);
   
             var recordType = request.getLineItemValue('custpage_sig_req_sublist', 'recordtype', i);
   
			 var item =request.getLineItemValue('custpage_sig_req_sublist','custpage_item', i);
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+item);
			 itemArr.push(item);
			 
			 var quantity = request.getLineItemValue('custpage_sig_req_sublist','custpage_qty', i);
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+quantity);
			 quanArr.push(quantity);
		 
	    	var projName = request.getLineItemValue('custpage_sig_req_sublist','custpage_cust_or_projid', i);
	    //	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'projName :'+projName);
	    	 projNameArr.push(projName);
		
	
			 var location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location', i);
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'location :'+location);
			 LocArr.push(location);
			 
			 var amount = request.getLineItemValue('custpage_sig_req_sublist','custpage_order_amount', i);
		//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'amount :'+amount);
				 amtArr.push(amount);
				 
				 var rate = request.getLineItemValue('custpage_sig_req_sublist','custpage_order_rate', i);
		//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Rate :'+rate);
			     rateArr.push(rate);
			    var lineNum = request.getLineItemValue('custpage_sig_req_sublist','custpage_linenum', i);
 			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Rate :'+rate);
			   lineArr.push(lineNum);
			  var director = request.getLineItemValue('custpage_sig_req_sublist','custpage_projdirector', i);
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Rate :'+rate);
			 directArr.push(director);
			 
			 var tranid = request.getLineItemValue('custpage_sig_req_sublist','custpage_reqi', i);
		 nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi_num :'+tranid);
		 tranidArr.push(tranid);
           
		 var remark = request.getLineItemValue('custpage_sig_req_sublist','custpage_remark', i);
		 nlapiLogExecution('DEBUG', 'OrderRequisition', 'remark :'+remark);
		 remarkArr.push(remark);

			 
  	   }
	
 
  }

     ID;
     var line
     var lineNum
     var reqObj = nlapiLoadRecord('purchaserequisition',ID);
     var reqLineCount = reqObj.getLineItemCount('item');
     nlapiLogExecution('DEBUG', 'OrderRequisition', 'reqLineCount :'+reqLineCount);
     if(reqLineCount)
     {
    	 for(var k=0;k<lineArr.length;k++)
    	 {
          for(var j=1;j<=reqLineCount;j++)
         	{
        	 line = reqObj.getLineItemValue('item','custcol_linenum',j);
        	
       		
       	     nlapiLogExecution('DEBUG', 'OrderRequisition', 'line ==  :'+line +'lineArr[j-1] --'+ lineArr[k] );
   		     nlapiLogExecution('DEBUG', 'OrderRequisition', 'user ==   :'+user +'directArr[j-1]--'+directArr[k] );
       		 if(line == lineArr[k])  // && 
       		 {
       			nlapiLogExecution('DEBUG', 'OrderRequisition', 'Inside IF condition :');
       			reqObj.setLineItemValue('item','custcol_vad_appstatus',j,'2');
       			reqObj.setLineItemValue('item','custcol_vad_apprby',j,user);
       			reqObj.setLineItemValue('item','custcol_vat_apprdate',j,new Date());
       		 }
         }
       	}
     }
     
     nlapiSubmitRecord(reqObj,true);
//	  ApprovalCheckFunction(ID,lineArr,itemArr,quanArr,projNameArr,LocArr,amtArr,rateArr,directArr);
 // response.writePage( form );
  response.sendRedirect('RECORD', 'purchaserequisition', ID, false,'view');
 }
}

}



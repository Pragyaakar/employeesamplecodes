function suiteletForReject(request, response)
{
	if (request.getMethod() == 'GET')
	{
		var ID = new Array();
		 var count= new Array();
		 var Line= new Array();
		 var remark1= new Array();
		 
		ID.push(request.getParameter('custscript1')); 
	nlapiLogExecution('DEBUG', 'IN the Post Method', 'Post'+ID);
	count.push(request.getParameter('checkValue'));
    Line.push(request.getParameter('custscript2'));
    remark1.push(request.getParameter('custscript3'));
    nlapiLogExecution('DEBUG', 'suiteletForReject', 'remark1 :'+remark1);
 nlapiLogExecution('DEBUG', 'suiteletForReject', 'count :'+count);
 nlapiLogExecution('DEBUG', 'suiteletForReject', 'Line :'+Line);
 nlapiLogExecution('DEBUG', 'suiteletForReject', 'Role :'+nlapiGetRole()); 
   var user = nlapiGetUser();
   var num = 0;
   var IDVal = ID.toString();
   var idChec = IDVal.split(',');
  
   var LineNumVal = Line.toString();
   var LineNumValChec = LineNumVal.split(',');
   
   var remark1Val = remark1.toString();
   var remark1Chec = remark1Val.split(',');
   
  for(var rec=0; rec<idChec.length;rec++)
  {
	  nlapiLogExecution('DEBUG', 'suiteletForReject', 'Inside For OF requisition  idChec[rec] :'+ idChec[rec]+' idChec --'+idChec );
  var reqObj = nlapiLoadRecord('purchaserequisition',idChec[rec]);
  var reqLineCount = reqObj.getLineItemCount('item');
  for(var j=1;j<=reqLineCount;j++)
	{
	 line = reqObj.getLineItemValue('item','custcol_linenum',j);
	
	
		 if(line == LineNumValChec[rec] )  
		 {
			nlapiLogExecution('DEBUG', 'OrderRequisition', 'Inside IF condition :');
			reqObj.setLineItemValue('item','custcol_vad_appstatus',j,'3');
			reqObj.setLineItemValue('item','custcol_vad_apprby',j,user);
			reqObj.setLineItemValue('item','custcol_vat_apprdate',j,new Date());
			reqObj.setLineItemValue('item','custcol_line_remark',j,remark1Chec[rec]);
		 }
     }
  
  nlapiSubmitRecord(reqObj,true);
  
  response.sendRedirect('RECORD', 'purchaserequisition', idChec[rec], false,'view');
  }
  
  
  
  /*
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
			 nlapiLogExecution('DEBUG', 'suiteletForReject', 'item :'+item);
			 itemArr.push(item);
			 
			 var quantity = request.getLineItemValue('custpage_sig_req_sublist','custpage_qty', i);
			 nlapiLogExecution('DEBUG', 'suiteletForReject', 'quantity :'+quantity);
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
*/
 /*    ID;
     var line
     var lineNum
     
  //   nlapiLogExecution('DEBUG', 'OrderRequisition', 'reqLineCount :'+reqLineCount);
    // if(reqLineCount)
     {
    	 for(var k=0;k<Line.length;k++)
    	 {
    		 var reqObj = nlapiLoadRecord('purchaserequisition',ID[k]);
    	     var reqLineCount = reqObj.getLineItemCount('item');
          for(var j=1;j<=reqLineCount;j++)
         	{
        	 line = reqObj.getLineItemValue('item','custcol_linenum',j);
        	
       		
       	     nlapiLogExecution('DEBUG', 'OrderRequisition', 'line ==  :'+line +'lineArr[j-1] --'+ lineArr[k] );
   		     nlapiLogExecution('DEBUG', 'OrderRequisition', 'user ==   :'+user +'directArr[j-1]--'+directArr[k] );
       		 if(line == lineArr[k])  // && 
       		 {
       			nlapiLogExecution('DEBUG', 'OrderRequisition', 'Inside IF condition :');
       			reqObj.setLineItemValue('item','custcol_vad_appstatus',j,'4');
       			reqObj.setLineItemValue('item','custcol_vad_apprby',j,user);
       			reqObj.setLineItemValue('item','custcol_vat_apprdate',j,new Date());
       		 }
         }
       	}

         nlapiSubmitRecord(reqObj,true);
//    	  ApprovalCheckFunction(ID,lineArr,itemArr,quanArr,projNameArr,LocArr,amtArr,rateArr,directArr);
     // response.writePage( form );
      response.sendRedirect('RECORD', 'purchaserequisition', ID[k], false,'view');
     }
     */
 }
}


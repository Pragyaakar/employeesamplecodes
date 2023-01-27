function updatedScreenForRequi(request, response)
{
 try{
	if (request.getMethod() == 'GET') 
	{
		var pro =request.getParameter('idProj'); 
		nlapiLogExecution('DEBUG', 'OrderRequisition', 'pro :'+pro);
		
	var requi =request.getParameter('requi'); 
	nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi :'+requi);
	
	var textname=request.getParameter('requiName');
	nlapiLogExecution('DEBUG', 'OrderRequisition', 'textname :'+textname);
	
	
	var user1 =nlapiGetUser();
	// ======= ADD FIELDS ========

	   var form = nlapiCreateForm("Vadehra Builders Requisition");
	   
	   form.setScript('customscript_client_change_filter_requi');
	   var requisit= form.addField('custpage_requi', 'select', 'Requisition#');
	   requisit.addSelectOption('-1','');
	   requisit.setDefaultValue(requi);
	 //  requisit.setDisplayType('disabled');

	   	var filters = new Array();
		filters[filters.length] = new nlobjSearchFilter('custentity_vad_projectdirector', 'job', 'anyof', user1);
	      var columns = new Array();
	  	
			 columns[0] = new nlobjSearchColumn("internalid",null,"GROUP"); 
			 columns[1] =  new nlobjSearchColumn("tranid",null,"GROUP");
		  var searchResults = nlapiSearchRecord('transaction','customsearch_trans_requi_name',filters,columns);

			nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);

			for (result in searchResults)
		
	         	{	
				
				requisit.addSelectOption(searchResults[result].getValue("internalid",null,"GROUP"), searchResults[result].getValue("transactionnumber",null,"GROUP"));
			
		         nlapiLogExecution('debug','Search Values','requi := '+searchResults[result].getValue("internalid",null,"GROUP"));
		         nlapiLogExecution('debug','Search Values','requi := '+searchResults[result].getValue("transactionnumber",null,"GROUP"));
	              	}
		

	   var project = form.addField('custpage_project', 'select', 'Project#');
	   project.addSelectOption('-1','');
	   project.setDefaultValue(pro);
	//   project.setDisplayType('disabled');
	 	var filters1 = new Array();
		filters1[filters1.length] = new nlobjSearchFilter('custentity_vad_projectdirector', null, 'anyof', user1);
	      var columns1 = new Array();
	  	
			 columns1[0] = new nlobjSearchColumn("internalid"); 
			 columns1[1] =  new nlobjSearchColumn("altname");
		  var searchResults1 = nlapiSearchRecord('job','customsearch_user_proj_search',filters1,columns1);

			nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults1.length);

			for (result1 in searchResults1)
		
	         	{	
				
				project.addSelectOption(searchResults1[result1].getId(), searchResults1[result1].getValue('altname'));
			
		       //  nlapiLogExecution('debug','Search Values','requi := '+requi);
		
	              	}
               
			 var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Items','custpage_sample_tab');
			       ItemSublist.addMarkAllButtons(); 
				   ItemSublist.addField('custpage_chechbox','checkbox'); 
			       ItemSublist.addField('custpage_reqi', 'text', 'REQUISITION #');
				   ItemSublist.addField('custpage_item','select','Item','ITEM').setDisplayType('inline');
				   ItemSublist.addField('custpage_cust_or_projid','select', 'CUSTOMER/PROJECTID','customer').setDisplayType('inline');
		     	   ItemSublist.addField('custpage_location','select', 'LOCATION','location').setDisplayType('inline');
				   ItemSublist.addField('custpage_qty','integer','QUANTITY').setDisplayType('disabled');
				   ItemSublist.addField('custpage_units','text','Units of Measure').setDisplayType('disabled');
				   ItemSublist.addField('custpage_order_rate', 'float', 'Rate').setDisplayType('disabled');
				   ItemSublist.addField('custpage_order_amount', 'float', 'Amount').setDisplayType('disabled');
				   ItemSublist.addField('custpage_custrecid','integer', 'RecordID').setDisplayType('hidden');
				   var rem= ItemSublist.addField('custpage_remark','text', 'Remark').setDisplayType('entry');
		            rem.setDisplaySize( 30, 3);
				   ItemSublist.addField('custpage_linenum','integer', 'Linenum').setDisplayType('disabled');
				   ItemSublist.addField('custpage_projdirector','text', 'ProjDirector').setDisplayType('hidden');
			   	     
					//     ItemSublist.addField('custpage_department','select', 'DEPARTMENT','department');
				   //      ItemSublist.addField('custpage_class','select', 'CLASS','class');
				   
                      var columns = new Array();
	
			 columns[0] = new nlobjSearchColumn("internalid"); 
			 columns[1] =  new nlobjSearchColumn("item");
			 columns[2] =   new nlobjSearchColumn("quantity"), 
			 columns[3] = new nlobjSearchColumn("internalid","customer",null); 
			 columns[4] =  new nlobjSearchColumn("location");
			 columns[5] = new nlobjSearchColumn("estimatedamount"); 
			 columns[6] = new nlobjSearchColumn("custcol_linenum"); 
			 columns[7] = new nlobjSearchColumn("custentity_vad_projectdirector","job",null);
			 columns[8] = new nlobjSearchColumn("transactionnumber");
			 columns[9] = new nlobjSearchColumn("unit");
					 
			var filters = new Array();
			filters[0] = new nlobjSearchFilter('internalid', null, 'is', requi);
			//filters[1] = new nlobjSearchFilter("internalid","customer", 'anyof', user1);

	var results = GetSearchResults(filters,columns); 
	
	
		for (var i = 1; i <= results.length; i++) 
		{ 
			 ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
			
		             var userRole = nlapiGetRole();
			      //   nlapiLogExecution('DEBUG', 'OrderRequisition', 'userRole:'+userRole);
					

					 ItemSublist.setLineItemValue('custpage_reqi', i, results[i-1].getValue('transactionnumber'));
		             
					 ItemSublist.setLineItemValue('custpage_item', i, results[i-1].getValue('item'));
					// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+results[i-1].getValue('item'));
					 
					 ItemSublist.setLineItemValue('custpage_qty', i, results[i-1].getValue('quantity'));
					 
					 ItemSublist.setLineItemValue('custpage_units', i, results[i-1].getValue('unit'));
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+results[i-1].getValue('quantity'));
		
					 var projName =results[i-1].getValue("internalid","customer",null);
					  ItemSublist.setLineItemValue('custpage_cust_or_projid', i,projName);
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Cust/proJID :'+ projName);
					 
					
				
				     ItemSublist.setLineItemValue('custpage_location', i, results[i-1].getValue('location'));
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Location :'+results[i-1].getValue('location'));
					 
					 ItemSublist.setLineItemValue('custpage_custrecid', i, results[i-1].getValue('custcol_cust_rec_id'));
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'RecordID :'+results[i-1].getValue('custcol_cust_rec_id'));
	
					
					 ItemSublist.setLineItemValue('custpage_order_amount', i, results[i-1].getValue('estimatedamount'));
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Amount :'+results[i-1].getValue('estimatedamount'));
	
					 var rate = parseFloat(results[i-1].getValue('estimatedamount'))/parseInt(results[i-1].getValue('quantity'));
						 
					 ItemSublist.setLineItemValue('custpage_order_rate', i, rate);
				//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Amount :'+rate);
					 ItemSublist.setLineItemValue('custpage_linenum', i,  results[i-1].getValue('custcol_linenum'));
					 ItemSublist.setLineItemValue('custpage_projdirector', i,  results[i-1].getValue("custentity_vad_projectdirector","job"));
					 
		}
		 
		 
		//if(user == )
		var createPO=form.addSubmitButton('Approve'); 
		
		form.setScript('customscript_client_change_filter_requi');
	 //	form.addButton('custombutton', 'Approve', '');
	 	form.addButton('custombutton', 'Reject', 'redirectSuiteForReject();' );
	
      	response.writePage(form);
	}
	else
	{
		if (request.getMethod() == 'POST') 
		{
			var ID =request.getParameter('custpage_requi'); 
			nlapiLogExecution('DEBUG', 'IN the Post Method', 'Post'+ID);
		 var count = request.getLineItemCount('custpage_sig_req_sublist');
		 
		 nlapiLogExecution('DEBUG', 'IN the Post Method', 'count :'+count);
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
		  var untArr =[];
		  var lineNum =0;
		  for(var i=1; i< count+1; i++)
		  {
			  	
				   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
				//   var lineNum = request.getLineItemValue('custpage_sig_req_sublist','custpage_linenum', i);
	    			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Rate :'+rate);
				//   lineArr.push(lineNum);
				/*	var cust_id =request.getLineItemValue('custpage_sig_req_sublist','custpage_custrecid',i); 
					cust_idArr.push(cust_id);
					nlapiLogExecution('DEBUG', 'searchCustomTransactions', 'Searching Custom Transactions');
					
			
					    var venstatobj = nlapiLoadRecord('customrecord_vad_proj_item_wise_apprval',cust_id);
						
						var customProj =venstatobj.getFieldValue('custrecord_vad_proj_id');
						customProjArr.push(customProj);
						nlapiLogExecution('DEBUG', 'searchCustomTransactions', 'customProj:'+customProj);
						
						var customItem =venstatobj.getFieldValue('custrecord_vad_item');
						customItemArr.push(customItem);
						nlapiLogExecution('DEBUG', 'searchCustomTransactions', 'customItem:'+customItem);
						
						var apprRequi = venstatobj.getFieldValue('custrecord_vad_approvalrequired');
						aproveReqArr.push(apprRequi);
						nlapiLogExecution('DEBUG', 'searchCustomTransactions', 'apprRequi:'+apprRequi);
					
						var thrLimQty = venstatobj.getFieldValue('custrecordvad_thresholdlimitqty');
						thrLimQtyArr.push(thrLimQty);
						nlapiLogExecution('DEBUG', 'searchCustomTransactions', 'thrLimQty:'+thrLimQty);
						
						var thrLimAmt = venstatobj.getFieldValue('custrecord_vad_thresholdlimitamt');
						thrLimAmtArr.push(thrLimAmt);
						nlapiLogExecution('DEBUG', 'searchCustomTransactions', 'thrLimAmt:'+thrLimAmt);
						
						var oneTimeAppr = venstatobj.getFieldValue('custrecord_one_time_approved');
						oneTimeApprArr.push(oneTimeAppr);
						nlapiLogExecution('DEBUG', 'searchCustomTransactions', 'oneTimeAppr:'+oneTimeAppr);
			     	*/
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

				 
				 var unt = request.getLineItemValue('custpage_sig_req_sublist','custpage_units', i);
				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'remark :'+unt);
				 untArr.push(unt);
 				 
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
		       			reqObj.setLineItemValue('item','custcol_line_remark',j,remarkArr[k]); //custcol_line_remark
		       		 }
		         }
		       	}
	         }
	         
	         nlapiSubmitRecord(reqObj,true);
	//	  ApprovalCheckFunction(ID,lineArr,itemArr,quanArr,projNameArr,LocArr,amtArr,rateArr,directArr);
		  response.writePage( form );
		  response.sendRedirect('RECORD', 'purchaserequisition', ID, false,'view');
		 }
	}
 }
 catch(e)
 {
	 throw nlapiCreateError('SUITELET_ERROR',"There is No data Available for this Record..."+e, false); 
 }
}


function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_vadehra_requisition_search', filters, columns);
	return results;
}


function   ApprovalCheckFunction(ID,lineArr,itemArr,quanArr,projNameArr,LocArr,amtArr,rateArr,directArr)
{
	nlapiLogExecution('DEBUG', 'aftr submit', "  ApprovalCheckFunction  =="+ID);
	 var recType ='purchaserequisition';

	 var recObj = nlapiLoadRecord(recType,ID);
	 
	 var PRlinecount=recObj.getLineItemCount('item');
	  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);

	  var item1 =new Array();
	  var customer1 =new Array();

	  var lineck1 =new Array();

	  
	  
	    var user = nlapiGetUser();
		for(var i=1;i<=PRlinecount;i++)
		{
      
       	    var itemid =recObj.getLineItemValue('item','item',i);
       	    item1.push(itemid);
           	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
           	
           	var quantity =recObj.getLineItemValue('item','quantity',i);
           	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
           	
        	var amount =recObj.getLineItemValue('item','amount',i);
           	nlapiLogExecution('DEBUG', 'aftr submit', "  amount  ==" + amount);
           
          	var customer =recObj.getLineItemValue('item','customer',i);
          	customer1.push(customer);
           	nlapiLogExecution('DEBUG', 'aftr submit', "  customer  ==" + customer);
           	
           	var line_chk =recObj.getLineItemValue('item','line',i);  
           	lineck1.push(line_chk);
           	nlapiLogExecution('DEBUG', 'aftr submit', "  line_chk  ==" + line_chk);
           	
        
         
            nlapiLogExecution('DEBUG', 'aftr submit', "  line_chk  ==" + line_chk+'--lineArr[i-1] '+lineArr[i-1]);
            nlapiLogExecution('DEBUG', 'aftr submit', "  User ==" + user+'--directArr[i-1] '+directArr[i-1]);
            
            for (var k=1;k<=lineArr.length;k++)
            {

       	        if( line_chk == lineArr[k-1] && user == directArr[k-1])
       		    {
       	     	nlapiLogExecution('DEBUG', 'aftr submit', "  IN the If condition to set values  ==");
       	 	    nlapiLogExecution('DEBUG', 'aftr submit', "  line_chk  ==" + line_chk+'--lineArr[i-1] '+lineArr[k-1]);
       	    
       	    		recObj.setLineItemValue('item','custcol_vad_appstatus',line_chk,'2');
                    recObj.setLineItemValue('item','custcol_vbpl_status_approved',line_chk,'1');
           	    	recObj.setLineItemValue('item','custcol_vad_apprby',line_chk,user);
           	    	recObj.setLineItemValue('item','custcol_vat_apprdate',line_chk,new Date());
       	    	}
       	    
       	    	
            }
           		
		}	
		nlapiSubmitRecord(recObj,true);
}
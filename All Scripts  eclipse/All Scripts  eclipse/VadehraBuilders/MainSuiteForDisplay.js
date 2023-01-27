function vadehraRequisitionSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "Request Method = " +request.getMethod());
  
	if(request.getMethod() == 'GET')
	{
		try{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in GET = ");
		var reqIntId;
		//var requi1 =request.getParameter('recId'); 
		//nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "requi1  = "+requi1);
		var Role =nlapiGetRole();
		
		
		if(Role == '3')
		{
			
			
			
				var form = nlapiCreateForm("Vadehra Builders Requisition");
				
				form.setScript('customscript_client_change_filter_requi');
				// ======= ADD FIELDS ========
				var requi = form.addField('custpage_requi', 'select', 'Requisition#');
				requi.addSelectOption('-1','');
				
			
			   	var filters = new Array();
			//	filters[filters.length] = new nlobjSearchFilter('custentity_vad_projectdirector', 'job', 'anyof', user);
			      var columns = new Array();
			  	
					 columns[0] = new nlobjSearchColumn("internalid",null,"GROUP"); 
					 columns[1] =  new nlobjSearchColumn("tranid",null,"GROUP");
				  var searchResults = nlapiSearchRecord('transaction','customsearch_trans_requi_name',filters,columns);

					nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);

					for (result in searchResults)
				
			         	{	
						
						requi.addSelectOption(searchResults[result].getValue("internalid",null,"GROUP"), searchResults[result].getValue("transactionnumber",null,"GROUP"));
						reqIntId =searchResults[result].getValue("internalid",null,"GROUP")
				         nlapiLogExecution('debug','Search Values','requi := '+searchResults[result].getValue("internalid",null,"GROUP"));
				         nlapiLogExecution('debug','Search Values','requi := '+searchResults[result].getValue("transactionnumber",null,"GROUP"));
			              	}
				
					var RECID = request.getParameter('custpage_requi');
		      nlapiLogExecution('DEBUG','RECID', "RECID= "+RECID);
		      if(RECID == null || RECID == '')
		       {
		         RECID == reqIntId
		       }
		      nlapiLogExecution('DEBUG','RECID after null check', "RECID aftr null check= "+RECID);
			    nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in GET below Form= ");
			    
			    
					var projectid = form.addField('custpage_project', 'select', 'Project#');
				projectid.addSelectOption('-1','');
				
				
			  	var filters1 = new Array();
				//	filters1[filters1.length] = new nlobjSearchFilter('custentity_vad_projectdirector', null, 'anyof', user);
				      var columns1 = new Array();
				  	
						 columns1[0] = new nlobjSearchColumn("internalid"); 
						 columns1[1] =  new nlobjSearchColumn("altname");
					  var searchResults1 = nlapiSearchRecord('job','customsearch_user_proj_search',filters1,columns1);

						nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults1.length);

						for (result1 in searchResults1)
					
				         	{	
							
							projectid.addSelectOption(searchResults1[result1].getId(), searchResults1[result1].getValue('altname'));
							var proIntId =searchResults1[result1].getValue("internalid");
					       //  nlapiLogExecution('debug','Search Values','requi := '+requi);
					
				              	}
					
						var PROJID = request.getParameter('custpage_project');
					      nlapiLogExecution('DEBUG','RECID', "RECID= "+PROJID);
					      if(PROJID == null || PROJID == '')
					       {
					    	  PROJID == proIntId
					       }
					      nlapiLogExecution('DEBUG','RECID after null check', "RECID aftr null check= "+PROJID);
						    nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in GET below Form= ");
				
		
				var user =nlapiGetUser();
						
				   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Items','custpage_sample_tab');
				   ItemSublist.addMarkAllButtons(); 
				   ItemSublist.addField('custpage_chechbox','checkbox'); 
			       ItemSublist.addField('custpage_reqi', 'text', 'REQUISITION #');
				   ItemSublist.addField('custpage_item','select','Item','ITEM').setDisplayType('inline');
				   ItemSublist.addField('custpage_cust_or_projid','select', 'CUSTOMER/PROJECTID','customer').setDisplayType('inline');
		     	   ItemSublist.addField('custpage_location','select', 'LOCATION','location').setDisplayType('inline');
				   ItemSublist.addField('custpage_qty','float','QUANTITY').setDisplayType('disabled');//integer
				   ItemSublist.addField('custpage_units','text','Units of Measure').setDisplayType('disabled');
				   ItemSublist.addField('custpage_order_rate', 'float', 'Rate').setDisplayType('disabled');
				   ItemSublist.addField('custpage_order_amount', 'float', 'Amount').setDisplayType('disabled');
				   ItemSublist.addField('custpage_custrecid','integer', 'RecordID').setDisplayType('hidden');
				   var rem= ItemSublist.addField('custpage_remark','text', 'Remark').setDisplayType('entry');
		           rem.setDisplaySize( 30, 3);
				   ItemSublist.addField('custpage_linenum','integer', 'Linenum').setDisplayType('disabled');
				   ItemSublist.addField('custpage_projdirector','text', 'ProjDirector').setDisplayType('hidden');
				   ItemSublist.addField('custpage_interid','integer', 'InternalID').setDisplayType('hidden');
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
							 
					var filters = new Array();//RECID
					//filters[0] = new nlobjSearchFilter('custentity_vad_projectdirector', 'job', 'is', user);
		      		if(RECID != null && RECID != '')
		            {
		              filters[0] = new nlobjSearchFilter('internalid', null, 'is', RECID);
		            }
		      		 if(PROJID != null && PROJID != '')
		            {
		              filters[0] = new nlobjSearchFilter('internalid', "customer", 'is', PROJID);
		            }
				//	filters[1] = new nlobjSearchFilter('internalid', null, 'is', requi);

			var results = GetSearchResults(filters,columns); 
			
			
				for (var i = 1; i <= results.length; i++) 
				{ 
					 //ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
					
				             var userRole = nlapiGetRole();
					      //   nlapiLogExecution('DEBUG', 'OrderRequisition', 'userRole:'+userRole);
				             ItemSublist.setLineItemValue('custpage_interid', i, results[i-1].getValue('internalid'));

							 ItemSublist.setLineItemValue('custpage_reqi', i, results[i-1].getValue('transactionnumber'));
				             
							 ItemSublist.setLineItemValue('custpage_item', i, results[i-1].getValue('item'));
							// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+results[i-1].getValue('item'));
							 
							 ItemSublist.setLineItemValue('custpage_qty', i, results[i-1].getValue('quantity'));
						//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+results[i-1].getValue('quantity'));
							 
							 ItemSublist.setLineItemValue('custpage_units', i, results[i-1].getValue('unit'));
				
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
			
			
			
			
		}
		
		else
		{
			   var user = nlapiGetUser();
				var form = nlapiCreateForm("Vadehra Builders Requisition");
				
				form.setScript('customscript_client_change_filter_requi');
				// ======= ADD FIELDS ========
				var requi = form.addField('custpage_requi', 'select', 'Requisition#');
				requi.addSelectOption('-1','');
				
			
			   	var filters = new Array();
				filters[filters.length] = new nlobjSearchFilter('custentity_vad_projectdirector', 'job', 'anyof', user);
			      var columns = new Array();
			  	
					 columns[0] = new nlobjSearchColumn("internalid",null,"GROUP"); 
					 columns[1] =  new nlobjSearchColumn("tranid",null,"GROUP");
				  var searchResults = nlapiSearchRecord('transaction','customsearch_trans_requi_name',filters,columns);

					nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults.length);

					for (result in searchResults)
				
			         	{	
						
						requi.addSelectOption(searchResults[result].getValue("internalid",null,"GROUP"), searchResults[result].getValue("transactionnumber",null,"GROUP"));
						reqIntId =searchResults[result].getValue("internalid",null,"GROUP")
				         nlapiLogExecution('debug','Search Values','requi := '+searchResults[result].getValue("internalid",null,"GROUP"));
				         nlapiLogExecution('debug','Search Values','requi := '+searchResults[result].getValue("transactionnumber",null,"GROUP"));
			              	}
				
					var RECID = request.getParameter('custpage_requi');
		      nlapiLogExecution('DEBUG','RECID', "RECID= "+RECID);
		      if(RECID == null || RECID == '')
		       {
		         RECID == reqIntId
		       }
		      nlapiLogExecution('DEBUG','RECID after null check', "RECID aftr null check= "+RECID);
			    nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in GET below Form= ");
			    
			    
					var projectid = form.addField('custpage_project', 'select', 'Project#');
				projectid.addSelectOption('-1','');
				
				
			  	var filters1 = new Array();
					filters1[filters1.length] = new nlobjSearchFilter('custentity_vad_projectdirector', null, 'anyof', user);
				      var columns1 = new Array();
				  	
						 columns1[0] = new nlobjSearchColumn("internalid"); 
						 columns1[1] =  new nlobjSearchColumn("altname");
					  var searchResults1 = nlapiSearchRecord('job','customsearch_user_proj_search',filters1,columns1);

						nlapiLogExecution('debug','Search Values','searchResults.length := '+searchResults1.length);

						for (result1 in searchResults1)
					
				         	{	
							
							projectid.addSelectOption(searchResults1[result1].getId(), searchResults1[result1].getValue('altname'));
							var proIntId =searchResults1[result1].getValue("internalid");
					       //  nlapiLogExecution('debug','Search Values','requi := '+requi);
					
				              	}
					
						var PROJID = request.getParameter('custpage_project');
					      nlapiLogExecution('DEBUG','RECID', "RECID= "+PROJID);
					      if(PROJID == null || PROJID == '')
					       {
					    	  PROJID == proIntId
					       }
					      nlapiLogExecution('DEBUG','RECID after null check', "RECID aftr null check= "+PROJID);
						    nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in GET below Form= ");
				
			/*	var locationField = form.addField('locationname', 'select', 'Location');
				locationField.addSelectOption('', ' ');
				populateLocationList(locationField);  */
				var user =nlapiGetUser();
						
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
				   ItemSublist.addField('custpage_interid','integer', 'InternalID').setDisplayType('hidden');
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
							 
					var filters = new Array();//RECID
					filters[0] = new nlobjSearchFilter('custentity_vad_projectdirector', 'job', 'is', user);
		      		if(RECID != null && RECID != '')
		            {
		              filters[1] = new nlobjSearchFilter('internalid', null, 'is', RECID);
		            }
		      		 if(PROJID != null && PROJID != '')
		            {
		              filters[1] = new nlobjSearchFilter('internalid', "customer", 'is', PROJID);
		            }
				//	filters[1] = new nlobjSearchFilter('internalid', null, 'is', requi);

			var results = GetSearchResults(filters,columns); 
			
			
				for (var i = 1; i <= results.length; i++) 
				{ 
					 //ItemSublist.setLineItemValue('custpage_chechbox', i,'F');
					
				             var userRole = nlapiGetRole();
					      //   nlapiLogExecution('DEBUG', 'OrderRequisition', 'userRole:'+userRole);
				             ItemSublist.setLineItemValue('custpage_interid', i, results[i-1].getValue('internalid'));

							 ItemSublist.setLineItemValue('custpage_reqi', i, results[i-1].getValue('transactionnumber'));
				             
							 ItemSublist.setLineItemValue('custpage_item', i, results[i-1].getValue('item'));
							// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+results[i-1].getValue('item'));
							 
							 ItemSublist.setLineItemValue('custpage_qty', i, results[i-1].getValue('quantity'));
						//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+results[i-1].getValue('quantity'));
							 
							 ItemSublist.setLineItemValue('custpage_units', i, results[i-1].getValue('unit'));
				
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
			
		}
		
	
		// ==== CALL A CLIENT SCRIPT ====
		form.setScript('customscript_client_suite_requi_redirect');

	   	form.addButton('custombutton', 'Reject', 'redirectSuiteForReject();' );
		
		form.addButton('custombutton1','Reset','refresh();');
		  //form.addResetButton('Reset')
	
	     var createPO=form.addSubmitButton('Approve'); 

	 	
      	response.writePage(form);
	}
	catch(e)
	{
		throw nlapiCreateError('SUITELET_ERROR',"There is No data Available for User Or Project Director..."+e, false); 
	}
      	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{

		
		//	var ID =request.getParameter('custpage_requi'); 
		//	nlapiLogExecution('DEBUG', 'IN the Post Method', 'Post'+ID);
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
		  var InterArr =new Array();
		  var customItemArr =new Array(); 
		  var remarkArr =new Array(); 
		  var cust_idArr = new Array();
		  var directArr = new Array();//
		  var tranidArr =new Array();
		  var lineNum =0;
		  var untArr =[];
		  for(var i=1; i< count+1; i++)
		  {
			  	
				   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
		
		   if(checkMark == 'T')
		   {
		     
		           var internalId = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_interid', i);
		           nlapiLogExecution('DEBUG', 'OrderRequisition', 'internalId :'+internalId);
		           InterArr.push(internalId);
		     
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
				 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Units :'+unt);
				 untArr.push(unt);
 				 
 				 
          	   }
			
		 
		  }
		
	      //   ID;
	         var line
	         var lineNum;
	         
	       //  for(var s=0;s<InterArr.length;s++)
	        {
	        /*	 var rec =InterArr[s];

	         var reqObj = nlapiLoadRecord('purchaserequisition',rec);
	         var reqLineCount = reqObj.getLineItemCount('item');
	         nlapiLogExecution('DEBUG', 'OrderRequisition', 'reqLineCount :'+reqLineCount);*/
	      //   if(reqLineCount)
	         {
	        	 for(var k=0;k<lineArr.length;k++)
	        	 {
	        		 var rec =InterArr[k];

	    	         var reqObj = nlapiLoadRecord('purchaserequisition',rec);
	    	         var reqLineCount = reqObj.getLineItemCount('item');
	    	         var flag='0';
	    	         
	    	         
		          for(var j=1;j<=reqLineCount;j++)
		         	{
		        	 line = reqObj.getLineItemValue('item','custcol_linenum',j);
		        	
		       		
		       	     nlapiLogExecution('DEBUG', 'OrderRequisition', 'line ==  :'+line +'lineArr[j-1] --'+ lineArr[k] );
	       		     nlapiLogExecution('DEBUG', 'OrderRequisition', 'user ==   :'+user +'directArr[j-1]--'+directArr[k] );
		       		 if(line == lineArr[k] &&  rec ==InterArr[k] )  // && 
		       		 {
		       			nlapiLogExecution('DEBUG', 'OrderRequisition', 'Inside IF condition :');
		       			flag =flag + parseInt(1);
		       			reqObj.setLineItemValue('item','custcol_vad_appstatus',j,'2');
                        reqObj.setLineItemValue('item','custcol_vbpl_status_approved',j,'1');
		       			reqObj.setLineItemValue('item','custcol_vad_apprby',j,user);
		       			reqObj.setLineItemValue('item','custcol_vat_apprdate',j,new Date()); 
		       			reqObj.setLineItemValue('item','custcol_line_remark',j,remarkArr[k]); //custcol_line_remark
		       		 }
		            }
		            
		          if(reqLineCount == flag)
		          {
		        	  reqObj.setFieldValue('approvalstatus',2);
		          }
		        
		          nlapiSubmitRecord(reqObj,true);
		        	}
	           }
	           
	     	//	  ApprovalCheckFunction(ID,lineArr,itemArr,quanArr,projNameArr,LocArr,amtArr,rateArr,directArr);
	     		  response.writePage( form );
	     		  response.sendRedirect('RECORD', 'purchaserequisition',rec, false,'view');
	        }
	       
		 }
	
	
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','vadehraRequisitionSuitelet', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}// END orderRequisitionSuitelet()


function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_vadehra_requisition_search', filters, columns);
	return results;
}

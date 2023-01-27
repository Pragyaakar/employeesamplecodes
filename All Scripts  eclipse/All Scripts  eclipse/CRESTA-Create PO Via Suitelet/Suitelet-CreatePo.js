var Date1 = new Date();

function suiteletToPurchaseOrder(request, response)
{

	if (request.getMethod() == 'GET') 
	{
		try{
	
			var subsiname =request.getParameter('cust_subsi'); 
			nlapiLogExecution('DEBUG', 'OrderRequisition FOR PO', 'subsiname :'+subsiname);
	
			var PR_ID = request.getParameter('cust_id'); 
			nlapiLogExecution('DEBUG', 'OrderRequisition FOR PO', 'PR_ID :'+PR_ID);
			
			var PR_trans = request.getParameter('cust_id'); 
			nlapiLogExecution('DEBUG', 'OrderRequisition FOR PO', 'PR_trans :'+PR_trans);

	   var form = nlapiCreateForm("Order Requisition");

	   form.setScript('customscript_client_location_acc_redirec');
	   
	   var sub= form.addField('custpage_subsidiary', 'text', 'subsidiary');
        	sub.setDefaultValue(subsiname);
	      sub.setDisplayType('inline');

	      var prIs = form.addField('custpage_prvalues', 'text', 'PRVALUES');
	          prIs.setDefaultValue(PR_ID);
      	      prIs.setDisplayType('hidden');
      	      
      	    var prtran = form.addField('custpage_prnums', 'text', 'Requisition');
      	      prtran.setDefaultValue(PR_trans);
      	      prtran.setDisplayType('inline');
	 
		var vendorName = form.addField('custpage_vendorname', 'select', 'Vendor','vendor');
		
	
		
           var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Items','custpage_sample_tab');
          
          ItemSublist.addField('custpage_chechbox','checkbox');  
             
           
		   //ItemSublist.addField('custpage_reqi', 'text', 'REQUISITION #')
		   ItemSublist.addField('custpage_item','select','Item','ITEM').setDisplayType('inline');
		   ItemSublist.addField('custpage_unit', 'text', 'UNIT');
		   ItemSublist.addField('custpage_descrip', 'text', 'Description');
		   ItemSublist.addField('custpage_type', 'text', 'TYPE').setDisplayType('hidden');
		   ItemSublist.addField('custpage_prquantity', 'text', 'QUANTITY').setDisplayType('entry');;
		   ItemSublist.addField('custpage_rate', 'float', 'RATE').setDisplayType('inline');
		   ItemSublist.addField('custpage_subsidiary','select', 'SUBSIDIARY','subsidiary').setDisplayType('inline');
		   ItemSublist.addField('custpage_location','select', 'LOCATION','location').setDisplayType('inline');
		   ItemSublist.addField('custpage_department','select', 'DEPARTMENT','department').setDisplayType('inline');
		   ItemSublist.addField('custpage_class','select', 'CLASS','classification').setDisplayType('inline');
		   ItemSublist.addField('custpage_internalid','integer', 'Internal id').setDisplayType('hidden');
	
			var filters = new Array();
			//filters[0] = new nlobjSearchFilter('subsidiary', null, 'is', subsidary);
            filters[0] = new nlobjSearchFilter('internalid', null, 'anyof',PR_ID);
        
		    var columns = new Array();
			
			 columns[0] = new nlobjSearchColumn("item"); 
			 columns[1] =  new nlobjSearchColumn("unitabbreviation");
			 columns[2] =   new nlobjSearchColumn("type"), 
		//	 columns[4] =  new nlobjSearchColumn("altname","vendor",null);
			 columns[3] = new nlobjSearchColumn("subsidiary"); 
			 columns[4] =  new nlobjSearchColumn("name","Currency",null);
			 columns[5] = new nlobjSearchColumn("custcol_remain_qty_for_pr"); 
			 columns[6] =  new nlobjSearchColumn("department"); 
			 columns[7] =  new nlobjSearchColumn("class"); 
			 columns[8] =  new nlobjSearchColumn("location"); 
			 columns[9] =  new nlobjSearchColumn("amount"); 
			 columns[10] =  new nlobjSearchColumn("tranid");
			 columns[11] = new nlobjSearchColumn("memo");
			 columns[12] = new nlobjSearchColumn("estimatedamount");
			 columns[13] = new nlobjSearchColumn('internalid');
	          var results = GetSearchResults(filters,columns); 
	
	
		for (var i = 1; i <= results.length; i++) 
		{ 
			 ItemSublist.setLineItemValue('custpage_chechbox', i,'T');
			
			 ItemSublist.setLineItemValue('custpage_item', i, results[i-1].getValue('item'));
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+results[i-1].getValue('item'));
			 
             var newPr =parseInt(results[i-1].getValue('custcol_remain_qty_for_pr'));
			 ItemSublist.setLineItemValue('custpage_prquantity', i, newPr);
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+results[i-1].getValue('quantity'));

			 
			 ItemSublist.setLineItemValue('custpage_subsidiary', i, results[i-1].getValue('subsidiary'));
			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+results[i-1].getValue('subsidiary'));
			 
			 ItemSublist.setLineItemValue('custpage_descrip', i, results[i-1].getValue('memo'));
			 
			 var purchaseLast = results[i-1].getValue("estimatedamount");
			 
			 if(purchaseLast != null && purchaseLast != ' ')
			 {
				 purchaseLast = results[i-1].getValue("estimatedamount");
				 ItemSublist.setLineItemValue('custpage_rate', i,purchaseLast);
			 }
			 else{
				 var zero ='0.00';
				 ItemSublist.setLineItemValue('custpage_rate', i,zero);
			 }
			
				
		
				 ItemSublist.setLineItemValue('custpage_class', i,results[i-1].getValue('class'));
			//	nlapiLogExecution('DEBUG', 'OrderRequisition', 'class :'+results[i-1].getValue('class'));

				 
				 ItemSublist.setLineItemValue('custpage_department', i,results[i-1].getValue('department'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'department :'+results[i-1].getValue('department'));

				 
				 ItemSublist.setLineItemValue('custpage_location', i, results[i-1].getValue('location'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'location :'+results[i-1].getValue('location'));

				 
				 ItemSublist.setLineItemValue('custpage_order_amount', i, results[i-1].getValue('amount'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'amount :'+results[i-1].getValue('amount'));
			 
				 ItemSublist.setLineItemValue('custpage_unit', i, results[i-1].getValue('unitabbreviation'));
			//	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'unit :'+results[i-1].getValue('unit'));
				

				 ItemSublist.setLineItemValue('custpage_internalid', i, results[i-1].getValue('internalid'));
	
			
		}
		
		//form.setScript('customscript_client_order_requisition');
		 
		var createPO=form.addSubmitButton('Create_PO');
		
		}
		catch(e)
		{
			throw nlapiCreateError('SUITELET_ERROR',"There is No data Available for PO creation...", false); 
		}
      	response.writePage(form);
	}
	else
	{
		if (request.getMethod() == 'POST') 
		{
		 var count = request.getLineItemCount('custpage_sig_req_sublist');
		 nlapiLogExecution('DEBUG', 'OrderRequisition', 'count :'+count);
		   
		  var num = 0;
           var lineNumArr = new Array();
		  var itemArr =new Array();
		  var quanArr =new Array();
		  var subsiArr =new Array();
		  var typeArr =new Array();
		  var classArr =new Array();
		  var departArr =new Array();
		  var LocArr =new Array();
		  var amtArr =new Array();
		  var unitArr =new Array();
		  var uniArr =new Array();
		  var tranidArr =new Array();
          var descripArr =new Array();
          var hsncodeArr = new Array();
          var lastPurchaseArr = new Array();//lastPurchaseArr

          var results1 = findTransaction();
		  
		  
		  var lineNum =0;
		  for(var i=1; i< count+1; i++)
		  {
		   
		   var checkMark = request.getLineItemValue('custpage_sig_req_sublist', 'custpage_chechbox', i);
		  
		   if(checkMark == 'T')
		   {
		   
			   lineNum = lineNum + parseInt(1);
			  // nlapiLogExecution('DEBUG', 'OrderRequisition', 'lineNum :'+lineNum);
			    
			   
		    var internalId = request.getLineItemValue('custpage_sig_req_sublist','custpage_internalid',i);
		    nlapiLogExecution('DEBUG', 'OrderRequisition', 'internalId :'+internalId);
		    
		    var recordType = request.getLineItemValue('custpage_sig_req_sublist', 'recordtype', i);
           
    			
    			
    			 var item =request.getLineItemValue('custpage_sig_req_sublist','custpage_item', i);
    			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'item :'+item);
    			 itemArr.push(item);
    			 
    			 var quantity = request.getLineItemValue('custpage_sig_req_sublist','custpage_prquantity', i);
    			// nlapiLogExecution('DEBUG', 'OrderRequisition', 'quantity :'+quantity);
    			 quanArr.push(quantity);
    			 
    		    	var subsidiary = request.getLineItemValue('custpage_sig_req_sublist','custpage_subsidiary', i);
    		    	// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+subsidiary);
    		    	 subsiArr.push(subsidiary);
    			
    		    	 var descrip = request.getLineItemValue('custpage_sig_req_sublist','custpage_descrip', i);
    		    	// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+subsidiary);
    		    	 descripArr.push(descrip);
    		    	 
    		    	 var lastPurchase = request.getLineItemValue('custpage_sig_req_sublist','custpage_rate', i);
    		    	// nlapiLogExecution('DEBUG', 'OrderRequisition', 'subsidiary :'+subsidiary);
    		    	 lastPurchaseArr.push(lastPurchase);
    				
    			  
    				 var class1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_class', i);
    				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'class :'+class1);
    				 classArr.push(class1);
    				 
    				 var department = request.getLineItemValue('custpage_sig_req_sublist','custpage_department', i);
    				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'department :'+department);
    				 departArr.push(department);
    				 
    				 var location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location', i);
    				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'location :'+location);
    				 LocArr.push(location);
    				 
    				 var amount = request.getLineItemValue('custpage_sig_req_sublist','custpage_order_amount', i);
    				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'amount :'+amount);
    				 amtArr.push(amount);
    				
    				 
    				 var unit = request.getLineItemValue('custpage_sig_req_sublist','custpage_unit', i);
    				// nlapiLogExecution('DEBUG', 'OrderRequisition', 'unit :'+unit);
    				 // unitArr.push(unit);
    				 
    				 for (var j = 1; j <= results1.length; j++) 
  					{ 
  						var id = results1[j-1].getValue('internalid');
  						var name = results1[j-1].getValue('abbreviation');//abbreviation
  						var abb = results1[j-1].getValue('pluralabbreviation');
  						 if(name == unit || abb == unit )
  						 {
 						   
  							unitArr.push(id);
  						 }
  					
  						 
  					}
    
    				 
    				 var tranid = request.getLineItemValue('custpage_sig_req_sublist','custpage_reqinternal',i);
    				  nlapiLogExecution('DEBUG', 'OrderRequisition', 'requi_num :'+tranid);
    				 tranidArr.push(tranid);
                   
		      }
		 
		  }
		   var vendorName1=request.getParameter('custpage_vendorname');
			 nlapiLogExecution('DEBUG', 'OrderRequisition', 'vendorName1 :'+vendorName1);
			 var Entity =vendorName1;
			 
		  createPurchaseOrderForPR(lineNum,Entity,amtArr,subsiArr,lastPurchaseArr,descripArr,classArr,departArr,LocArr,itemArr,quanArr,unitArr,tranidArr,internalId);
		  response.writePage( form );
		 }
	}
}



function createPurchaseOrderForPR(lineNum,Entity,amtArr,subsiArr,lastPurchaseArr,descripArr,classArr,departArr,LocArr,itemArr,quanArr,unitArr,tranidArr,internalId)
{	


	nlapiLogExecution('DEBUG', 'OrderRequisition', 'internalId :'+internalId);
	
	var record = nlapiCreateRecord('purchaseorder', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}); 
	
	
	 nlapiLogExecution('DEBUG', 'OrderRequisition', 'Entity :'+Entity);
	// nlapiLogExecution('DEBUG', 'OrderRequisition', 'lineNum :'+lineNum);
		
	 
	   if(Entity != '' && Entity != 'undefined' && Entity != null)
		{
			// To Set vendor Name
		   nlapiLogExecution("DEBUG","In Create Function","**To Set Vendor Name**");
			record.setFieldValue('entity',Entity);//vendor
		}

	   record.setFieldValue('custbody_aarialife_context','PR to PO creation for Null qty Available');
  /*		if(date != '' && date != 'undefined' && date != null)
		{
			record.setFieldValue('trandate',date);
		}

	*/   
    // for(var v = 0 ; v < 1 ; v++)
	{
	
    	 if(classArr != '' && classArr != 'undefined' && classArr != null)
		{
			// To Set vendor Name
		 //  nlapiLogExecution("DEBUG","In Create Function","**To Set Class Name**"+classArr);
			record.setFieldValue('class',classArr[0]);//vendor
		}

		
		if(departArr != '' && departArr != 'undefined' && departArr != null)
		{
      //    nlapiLogExecution("DEBUG","In Create Function","**To Set Department Name**"+departArr);
			record.setFieldValue('department',departArr[0]);
		}


	
		if(subsiArr != '' && subsiArr != 'undefined' && subsiArr != null)
		{
			// To Set Subsidiary
		 //	nlapiLogExecution("DEBUG","In Create Function","**To Set Subsidiary Name**"+subsiArr);
			record.setFieldValue('subsidiary',subsiArr[0]);
		}
	
		if(LocArr != '' && LocArr != 'undefined' && LocArr != null)
		{
			// To Set Subsidiary
			record.setFieldValue('location',LocArr[0]);
		}
	         
	}
	var price =-1;
	var rate =50;
	

	for(var l=1;l<=lineNum;l++)
	{
				// nlapiLogExecution("DEBUG","In Create Function","item in for loop=="+itemArr[l-1]);
				// nlapiLogExecution("DEBUG","In Create Function","qty in for loop=="+quanArr[l-1]);
				 nlapiLogExecution("DEBUG","In Create Function","lineNum=="+l);
			      
					var rate = lastPurchaseArr[l-1];
			      record.selectNewLineItem('item');
		
			      record.setCurrentLineItemValue('item','item',itemArr[l-1]);   
			     //  nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArr[l-1]);    
		    
			      
			      record.setCurrentLineItemValue('item', 'quantity', quanArr[l-1]);                              
			    //   nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+quanArr[l-1]);
      
                
                  record.setCurrentLineItemValue('item','location',LocArr[l-1]);
			      
			      record.setCurrentLineItemValue('item','rate',parseFloat(rate));
			     //  nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
			      
			     
				  var amt = parseFloat(rate) *  parseFloat(quanArr[l-1]);
				  
				 
				
			      record.setCurrentLineItemValue('item','amount',parseFloat(amt));
			    //   nlapiLogExecution("DEBUG","In Create Function","amount done=="+amtArr[l-1]);
			      
			      record.setCurrentLineItemValue('item','description',descripArr[l-1]);
			      nlapiLogExecution("DEBUG","In Create Function","description done==");
			      
			      record.setCurrentLineItemValue('item', 'location', LocArr[l-1]);
			    //   nlapiLogExecution("DEBUG","In Create Function","location done=="+LocArr[l-1]);
			      
			      record.setCurrentLineItemValue('item', 'department',departArr[l-1]); 
			    //  nlapiLogExecution("DEBUG","In Create Function","department done=="+departArr[l-1]);
			      
			      record.setCurrentLineItemValue('item', 'class', classArr[l-1]);
			    //  nlapiLogExecution("DEBUG","In Create Function","class done=="+classArr[l-1]);
			      
			      record.setCurrentLineItemValue('item', 'custcol_requisition_id', internalId);                                          
			      nlapiLogExecution("DEBUG","In Create Function","requisition ID done==");
			      
			    
			      record.commitLineItem('item');
			      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
			     
			}
	        var Submitdone = SetQtyAvailable(quanArr,internalId,itemArr);
	
			var SubmitIt=nlapiSubmitRecord(record,true);  
			nlapiLogExecution("DEBUG","In Create Function","SubmitIt done=="+SubmitIt);
			
			response.sendRedirect('RECORD', 'purchaseorder', SubmitIt, null,'view');
			
			
	}

function SetQtyAvailable(quanArr,internalId,itemArr)
{
	var loadRequisition = nlapiLoadRecord('purchaserequisition',internalId);
	nlapiLogExecution("DEBUG","In Create Function","loadRequisition =="+loadRequisition);
	
	var reqCount = loadRequisition.getLineItemCount('item');
	nlapiLogExecution("DEBUG","In Create Function","reqCount =="+reqCount);
	
	var ReqItemArr = [];
	var ReqQtyArr = [];
	
	for(var w =0;w<itemArr.length;w++)
	{
		for(var r=1;r<=reqCount;r++)
		{
			var ReqItem = loadRequisition.getLineItemValue('item','item',r);
			ReqItemArr.push(ReqItem);
			//nlapiLogExecution("DEBUG","In Create Function","ReqItem =="+ReqItem);
			
			var ReqQty = loadRequisition.getLineItemValue('item','quantity',r);
			ReqQtyArr.push(ReqQty);
			//nlapiLogExecution("DEBUG","In Create Function","ReqQty =="+ReqQty);
			var remainQTY  = loadRequisition.getLineItemValue('item','custcol_remain_qty_for_pr',r);
			
			if(remainQTY > 0)
			{
				var valueUpdate = parseFloat(remainQTY)-parseFloat(ReqQty);
			}
			else
			{
				var valueUpdate = remainQTY;
			}
			
			
			nlapiLogExecution("DEBUG","In Create Function","itemArr == ReqItemArr "+itemArr+"=="+ReqItem);
			if(itemArr == ReqItem)
			{
				loadRequisition.setLineItemValue('item','custcol_onlocation_available',r,ReqQtyArr[r-1]);
				loadRequisition.setLineItemValue('item','custcol_remain_qty_for_pr',r,valueUpdate);
				nlapiLogExecution("DEBUG","In Create Function","SetValue==");
			}
			
		}
		
	}
	var SubmitRequi = nlapiSubmitRecord(loadRequisition,true);  
	nlapiLogExecution("DEBUG","In Create Function","SubmitRequi done=="+SubmitRequi);
	
	
}

function GetSearchResults(filters,columns)
{
	var results = nlapiSearchRecord('transaction', 'customsearch_requi_trans_search', filters, columns);
	return results;
}




function findTransaction()
{
	var searchId ='customsearch252';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 // filters[0]=new nlobjSearchFilter('pluralabbreviation', null,'is',unit);
	// filters[1] = new nlobjSearchFilter('custrecord_item', null, 'anyof', SearchArr); //custrecord_vendor_name
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
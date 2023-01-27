/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Nov 2018     Priyanka Patil
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
var recIDForSO ;
function salesPersonInventroySuitelet(request, response)
{
	//nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
      var recId = request.getParameter('custpage_param1');
      recIDForSO = recId;
		//============== CREATE FORM ============
		//nlapiLogExecution('DEBUG','orderRequisitionSuitelet', "in GET = ");
	
		var form = nlapiCreateForm("Sales Person Inventory");
		
		var sub = form.addField('custpage_recid', 'text', 'Record ID');
		sub.setDefaultValue(recId);
		sub.setDisplayType('hidden');
		
		   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Item','custpage_sample_tab');
		   ItemSublist.addField('custpage_item','select','Item','ITEM').setDisplayType('disabled');
		   ItemSublist.addField('custpage_qty','integer','Quantity');
		   ItemSublist.addField('custpage_unit','text','UNIT');
      	   ItemSublist.addField('custpage_description','text','DESCRIPTION');
      	   ItemSublist.addField('custpage_location','select','LOCATION','location').setDisplayType('inline');
		   ItemSublist.addField('custpage_remain_qty', 'float', 'Remaining Quantity').setDisplayType('entry');
      	   // ItemSublist.addField('custpage_rate','float','RATE');
		   ItemSublist.addField('custpage_amount','float','AMOUNT');
		   ItemSublist.addField('custpage_litres', 'float', 'LITRES');
		   //ItemSublist.addField('custpage_po_rate', 'float', 'PO RATE');
		   // ItemSublist.addField('custpage_gross_amount', 'float', 'GROSS AMOUNT');
		   ItemSublist.addField('custpage_item_type', 'text', 'ITEM TYPE');
		   // ItemSublist.addField('custpage_invdetail', 'select','Inventory Detail','inventorydetail');
		   
		   var LoadSo =nlapiLoadRecord('salesorder',recId);
		   
		   var transactionSearch = nlapiSearchRecord("transaction","customsearch_salesorder_for_salesperson",
				   [
				      ["internalid","anyof",recId],
					   "AND",
					  ["mainline","is","F"], 
					  "AND", 
					  ["shipping","is","F"], 
					  "AND", 
					  ["taxline","is","F"], 
					  "AND", 
					  ["closed","is","F"]
				   ], 
				   [
					   new nlobjSearchColumn("item"), 
					   new nlobjSearchColumn("quantity"), 
					   new nlobjSearchColumn("unit"), 
					   new nlobjSearchColumn("amount"), 
					   new nlobjSearchColumn("custcol_litres"), 
					   new nlobjSearchColumn("porate"), 
					   new nlobjSearchColumn("entity"), 
					   new nlobjSearchColumn("salesdescription","item",null), 
					   new nlobjSearchColumn("location"), 
					   new nlobjSearchColumn("custcol_item_type"), 
					   new nlobjSearchColumn("fxamount"),
					   new nlobjSearchColumn("internalid","inventoryDetail",null)
					]
					);
		   
			nlapiLogExecution('debug','Search Values','transactionSearch.length := '+transactionSearch.length);
		
			
			 
		   for (var i = 1; i <= transactionSearch.length; i++) 
			{ 
				 ItemSublist.setLineItemValue('custpage_item', i, transactionSearch[i-1].getValue('item'));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'item :'+transactionSearch[i-1].getValue('item'));
				 
				 ItemSublist.setLineItemValue('custpage_qty', i, transactionSearch[i-1].getValue('quantity'));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'quantity :'+transactionSearch[i-1].getValue('quantity'));
				 
				 ItemSublist.setLineItemValue('custpage_unit', i, transactionSearch[i-1].getValue('unit'));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'unit :'+transactionSearch[i-1].getValue('unit'));
				 
				 //ItemSublist.setLineItemValue('custpage_description', i, transactionSearch[i-1].getValue('item'));
				// nlapiLogExecution('DEBUG', 'SalesPerson', 'item :'+results[i-1].getValue('item'));
				 
				 ItemSublist.setLineItemValue('custpage_amount', i, transactionSearch[i-1].getValue('fxamount'));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'amount :'+transactionSearch[i-1].getValue('fxamount'));
				 
				 ItemSublist.setLineItemValue('custpage_litres', i, transactionSearch[i-1].getValue('custcol_litres'));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'custcol_litres :'+transactionSearch[i-1].getValue('custcol_litres'));
				 
				 ItemSublist.setLineItemValue('custpage_po_rate', i, transactionSearch[i-1].getValue('porate'));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'porate :'+transactionSearch[i-1].getValue('porate'));
				 
				 ItemSublist.setLineItemValue('custpage_gross_amount', i, transactionSearch[i-1].getValue('grossamount'));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'grossamount :'+transactionSearch[i-1].getValue('grossamount'));
				 
				 ItemSublist.setLineItemValue('custpage_description', i, transactionSearch[i-1].getValue("salesdescription","item"));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'description :'+transactionSearch[i-1].getValue("salesdescription","item"));
				 
				 ItemSublist.setLineItemValue('custpage_location',i, transactionSearch[i-1].getValue("location"));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'location :'+transactionSearch[i-1].getValue("location"));
				 
				 ItemSublist.setLineItemValue('custpage_item_type', i, transactionSearch[i-1].getValue("custcol_item_type"));
				 nlapiLogExecution('DEBUG', 'SalesPerson', 'item type :'+transactionSearch[i-1].getValue("custcol_item_type"));
				 
				// ItemSublist.setLineItemValue('custpage_invdetail', i, transactionSearch[i-1].getValue("internalid","inventoryDetail"));
				// nlapiLogExecution('DEBUG', 'SalesPerson', 'inventory type :'+transactionSearch[i-1].getValue("internalid","inventoryDetail"));
				 
				
				 
			}
		   form.setScript('customscript_clt_validation_salesperson');
		  
			 

//========================== ADD A BUTTON ======================
		form.addSubmitButton('Submit');
		form.addButton('cancel','Cancel','window.close();');
		//form.addButton('custombutton', 'Reset', 'refresh();');
		response.writePage(form);
}// if(request.getMethod() == 'GET')
else if(request.getMethod() == 'POST')
 {
		 
		 nlapiLogExecution('DEBUG','SalesPerson in POST', "in POST   ");
		// var Rec = nlapiLoadRecord('salesorder',recIDForSO);
		 
		 var itemCount;
		 var remainQty;
		 var salesId;
		 
		
		 var suiteletCount = request.getLineItemCount('custpage_sig_req_sublist');
		 nlapiLogExecution('DEBUG','SalesPerson in POST', "suiteletCount   "+suiteletCount);
		 
		 salesId = request.getParameter('custpage_recid');
		 nlapiLogExecution('DEBUG','SalesPerson in POST', "salesId   "+salesId);
		 
		 var Rec = nlapiLoadRecord('salesorder',salesId);//, {recordmode: 'dynamic'}
		 nlapiLogExecution('DEBUG','SalesPerson in POST', "Rec   "+Rec);

//=========================================Sales Order Body Fields======================================
		 
		 var status = Rec.getFieldValue('orderstatus');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order status =='+status);

		 var salesOrder = Rec.getFieldValue('tranid');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order_Number =='+salesOrder);
			
		 var customer = Rec.getFieldValue('entity');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','Customer =='+customer);
			
		 var subsidiary = Rec.getFieldValue('subsidiary');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','subsidiary =='+subsidiary);
			
		 var department = Rec.getFieldValue('department');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','department =='+department);
			
		 var Sales_class = Rec.getFieldValue('class');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales_class =='+Sales_class);
			
		 var aaria_Context = Rec.getFieldValue('custbody_aarialife_context');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','aaria_Context =='+aaria_Context);
			
		 var sales_emp = Rec.getFieldValue('custbody_sales_employee');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','sales_emp =='+sales_emp);
			
		 var salesApproval_Status = Rec.getFieldValue('custbody_so_appr_status');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','salesApproval_Status =='+salesApproval_Status);
			
		 var customer_category = Rec.getFieldValue('custbody_sales_employee');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','customer_category =='+customer_category);
		 
		 var toLocation = Rec.getFieldValue('custbody_location');
		 nlapiLogExecution('DEBUG','SalesPerson Inventroy','toLocation =='+toLocation);
		 
		 
		 itemCount = Rec.getLineItemCount('item');
		 nlapiLogExecution('DEBUG','SalesPerson in POST', "itemCount   "+itemCount);
		 
		 var pushvalueInvNum;
		 var pushvalueQty;
		 var new_locationArray=[];
		 var filter_Loc=[];
		 var uniueLoc=[];
		 
				 for(var j1=1;j1<=suiteletCount;j1++)
				 {
					 var new_location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j1);
					 new_locationArray.push(new_location);
				 }
				 
		    filter_Loc = filter_array(new_locationArray);
			//nlapiLogExecution('DEBUG','SalesPerson Inventroy','filter_Loc =='+filter_Loc);
			
			uniueLoc = removeDuplicates(filter_Loc);
			//nlapiLogExecution('DEBUG','SalesPerson Inventroy','uniueLoc =='+uniueLoc);
			
	for(var un=0;un< uniueLoc.length;un++)
	  {	
		 var reamainingArray = new Array();
		 var SOQtyArray = new Array();
		 var SO_ItemArray = new Array();
		 var SO_LineLocationArray = new Array();
		 var descriptionArray = new Array();
		 var unitsArray = new Array();
		 var qtyArray = new Array();
		 var litersArray = new Array();
	
		 var invcountArr = new Array();
		 var invQtyTrans = new Array();
		 var invNumTrans = new Array();
		 var setLocFrom =uniueLoc[un];
					
				 for(var j=1;j<=suiteletCount;j++)
				 {
					 
					 var chk_location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
					 
					 if(uniueLoc[un] == chk_location)
					 {
						 
						 nlapiLogExecution('DEBUG', 'Acct', 'uniueLoc[un] == chk_location ' + uniueLoc[un] +'=='+ chk_location);
						 
					 var reamaining = request.getLineItemValue('custpage_sig_req_sublist','custpage_remain_qty',j);
					 reamainingArray.push(reamaining);
					 nlapiLogExecution('DEBUG', 'Acct', 'Remaining Qty = ' + reamaining);
					 
					 var SOQty = request.getLineItemValue('custpage_sig_req_sublist','custpage_qty',j);
					 SOQtyArray.push(SOQty);
					 nlapiLogExecution('DEBUG', 'Acct', 'SOQty = ' + SOQty);
					 
					
					 var minusQty = parseFloat(SOQty) - parseFloat(reamaining);
					 nlapiLogExecution('DEBUG', 'Acct', 'minusQty = ' + minusQty);
					 
					 
						var SO_Item =  request.getLineItemValue('custpage_sig_req_sublist','custpage_item',j);
						SO_ItemArray.push(SO_Item);
						nlapiLogExecution('DEBUG', 'Acct', 'SO_Item = ' + SO_Item);
						
						var SO_LineLocation =  request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
						SO_LineLocationArray.push(SO_LineLocation);
						nlapiLogExecution('DEBUG', 'Acct', 'SO_LineLocation = ' + SO_LineLocation);
						
						var description =  request.getLineItemValue('custpage_sig_req_sublist','custpage_description',j);
						descriptionArray.push(description);
						nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'description=' + description);
						
						var units =  request.getLineItemValue('custpage_sig_req_sublist','custpage_unit',j);
						unitsArray.push(units);
						nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'units=' + units);
						
						var qty = minusQty ;
						qtyArray.push(qty);
						nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'qty=' + qty);
						
						var liters = request.getLineItemValue('custpage_sig_req_sublist','custpage_litres',j);//custpage_litres
						litersArray.push(liters);
						nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'liters=' + liters);	
					 
				
					 var subrec = Rec.viewLineItemSubrecord('item','inventorydetail',j);
					 nlapiLogExecution('DEBUG', 'SalesPerson', 'subrec:'+subrec);
						 	
					 var invcount = subrec.getLineItemCount('inventoryassignment');
					 invcountArr.push(invcount);
					 
					 nlapiLogExecution('DEBUG','aftr submit',"rec  ==" +subrec+' invcount=='+invcount);
					 var subRem=0;
					 var totRem=0;
					 var count=0;
		       		 for(var x = 1; x <=invcount ; x++)
		       		 {
		       			  var InvNumQty =subrec.getLineItemValue('inventoryassignment', 'quantity',x);
		         		  nlapiLogExecution('DEBUG', 'aftr submit', "  InvNumQty  ==" +InvNumQty);
		         		    
		         		    var InvNum = subrec.getLineItemValue('inventoryassignment', 'issueinventorynumber',x);
		          		    nlapiLogExecution('DEBUG', 'aftr submit', "  InvNum  ==" + InvNum);
		          		    
		         		    
		         		       if(InvNumQty >= minusQty)
		         		    	{
		         		    	  invQtyTrans.push(minusQty);
		             		      invNumTrans.push(InvNum);
		         		    	      //pushvalueQty =minusQty;
		         		    	      //pushvalueInvNum =InvNum;
		             		    	 break;
		         		    	}
		         		       else if(InvNumQty < minusQty)
		         		    	{
		         		    	    totRem +=parseFloat(InvNumQty);
		         		    	    
		         		    	      invQtyTrans.push(InvNumQty);
			             		      invNumTrans.push(InvNum);
			         		    	   
		         		    	       if(totRem == qty)
		         		    	    	{
		         		    	        	break;
		         		    	    	}
		         		    	       else if(totRem > qty)
						   				{
		         		    	    	  invQtyTrans.pop(InvNumQty);
		         		    	    	 invNumTrans.pop(InvNum);
						   				 var rem = parseFloat(totRem)-parseFloat(qty);
						   				}
			         		    	 
			         		    }
		         		       else if(InvNumQty < minusQty)
		         		    	   {
		         		    	   
		         		    	   
		         		    	         if(count == 0)
		         		    	    	 {
		         		    	        	 invQtyTrans.push(InvNumQty);
		         	             		      invNumTrans.push(InvNum);
		         		    	        	    // pushvalueQty =subRem;
		         	         		    	    //  pushvalueInvNum =InvNum;
		         		    	    	   count++;
		         		    	    	 }
		         		    	          else if(count >=1)
		         		    	    	 {
		         		    	        	   subRem =parseFloat(minusQty)-parseFloat(InvNumQty);
		         		    	        	  
		         		    	        	 invQtyTrans.push(subRem);
		        	             		      invNumTrans.push(InvNum);
		         		    	        	
		     	                         }
		         		    	        
		         		    	}
		         		      
		         		 }
		       			
				 }
										 
		      }
				 var idOfIT= createInventoryTransfer(status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,salesApproval_Status,customer_category,toLocation,itemCount,SO_ItemArray,SO_LineLocationArray,descriptionArray,unitsArray,qtyArray,litersArray,subrec,invcountArr,invQtyTrans,invNumTrans,setLocFrom)
					
					
		     }
//=========================== To set It on SO ===========================================	
	
	
	//Rec.setFieldValue('custbody_inv_transaction_no',idOfIT);
	
	for(var p=1;p<=itemCount;p++)
	{
		var invQtyTrans1 =[];
		var invNumTrans1 =[];
		
		 var reamaining1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_remain_qty',p);
			// reamainingArray.push(reamaining);
			 nlapiLogExecution('DEBUG', 'Acct', 'Remaining Qty1 = ' + reamaining1);
			 
			 var SOQty1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_qty',p);
			 // SOQtyArray.push(SOQty);
			 nlapiLogExecution('DEBUG', 'Acct', 'SOQty1 = ' + SOQty1);
			 
			 var itmSo1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',p);
			// SOQtyArray.push(SOQty);
			 nlapiLogExecution('DEBUG', 'Acct', 'itmSo1 = ' + itmSo1);
			 
			 var subbrec = Rec.viewLineItemSubrecord('item','inventorydetail',p);
			 nlapiLogExecution('DEBUG', 'SalesPerson', 'subbrec:'+subbrec);
				 	
			 var invcountIS = subbrec.getLineItemCount('inventoryassignment');
			
			 
			 
			 var minusQty1 = parseFloat(SOQty1) - parseFloat(reamaining1);
			 nlapiLogExecution('DEBUG', 'Acct', 'minusQty1 = ' + minusQty1);
//===============================================================================================	
			 var counted=0;
			 for(var x1 = 1; x1 <=invcountIS ; x1++)
       		 {
       			  var InvNumQty1 =subbrec.getLineItemValue('inventoryassignment', 'quantity',x1);
         		  nlapiLogExecution('DEBUG', 'aftr submit', "  InvNumQty1  ==" +InvNumQty1);
         		    
         		    var InvNum1 = subbrec.getLineItemValue('inventoryassignment', 'issueinventorynumber',x1);
          		    nlapiLogExecution('DEBUG', 'aftr submit', "  InvNum1  ==" + InvNum1);
          		    
         		    
         		       if(InvNumQty1 >= minusQty1)
         		    	{
         		    	  invQtyTrans1.push(minusQty1);
             		      invNumTrans1.push(InvNum1);
         		    	 	 break;
         		    	}
         		       else if(counted == minusQty1 )
         		    	{
         		    	  break;
         		    	}
         		       else if(InvNumQty1 < minusQty1 && counted < minusQty1)
         		    	   {
         		    	     
         		    	        	 invQtyTrans1.push(InvNumQty1);
         	             		      invNumTrans1.push(InvNum1);
         		    	             counted += parseFloat(InvNumQty1);
         		    	       
         		    	   }
         		      
         		 }	
			 nlapiLogExecution('DEBUG', 'aftr submit', " full arr invQtyTrans1  ==" + invQtyTrans1);
			 
		
		     
			 
			 
			var countTo=0;
			var chekCond=0;
	//============================= remove inv Details ===================================================
			 
	    	 /*  var invDetailSubrecord = Rec.viewLineItemSubrecord('item','inventorydetail',p);
	    	   
	    	   nlapiLogExecution('DEBUG', 'aftr submit', " invDetailSubrecord ==" + invDetailSubrecord);
	    	   
	    	   if(invDetailSubrecord != null)
	    	   {
	    		   Rec.selectLineItem('item',p);
	    		   Rec.removeCurrentLineItemSubrecord('item', 'inventorydetail');
	    		   Rec.commitLineItem('item');
	    	   }
	    
			 
		*/
		
	//=======================================Set Line Item Values On SO =================================================================
				
				 Rec.selectLineItem('item',p);
				 
					
	  	    	 var subrec1 = Rec.editCurrentLineItemSubrecord('item','inventorydetail');
	  		  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec1);
	  		  	  
	  		  	var s= subrec1.getLineItemCount('inventoryassignment');
			     nlapiLogExecution('DEBUG', 'Acct', 'subrec for Lot Item inventory count= ' + s);
			   
			     if(s > 0 && chekCond ==0)
			     {
			    	 nlapiLogExecution('DEBUG', 'Acct', 'Inside the IsLotItemArr to remove subrec= ');
			    	   for(var i1 = 1; i1 <= s; i1++)
					     {  
			    		   subrec1.removeLineItem('inventoryassignment', i1);
					    	 chekCond++;
				          }
			     }
			     
				// Rec.setCurrentLineItemValue('item','location',toLocation);
	      		// nlapiLogExecution('DEBUG', 'Acct', 'toLocation Value to be set = '+toLocation);
				 
				// Rec.setCurrentLineItemValue('item','commitinventory','1');
				// nlapiLogExecution('DEBUG','Acct','Commited Value to be set = ');
				 
			
				 Rec.setCurrentLineItemValue('item','custcol_remaining_qty',reamaining1);
				 nlapiLogExecution('DEBUG', 'Acct', 'reamaining on so  = ' +reamaining1);
				 
				// Rec.setCurrentLineItemValue('item','quantity','10');
				// nlapiLogExecution('DEBUG', 'Acct', 'quantity set inSO qty = '+minusQty);
				 
				 
				 Rec.setCurrentLineItemValue('item','quantity',minusQty);
				 nlapiLogExecution('DEBUG', 'Acct', 'quantity set inSO qty = '+minusQty);
				 
				 Rec.setCurrentLineItemValue('item','custcol_sales_order_qty',SOQty1);
				 nlapiLogExecution('DEBUG', 'Acct', 'quantity set inSO qty = ' + SOQty1);
			
					
				
		  		  	  
		  		  	var AddIS =0;
		  		  	
		  		  	if(invQtyTrans1.length > 1)
		  		  	{
			  		  	for(var k=1 ;k<=invQtyTrans1.length;k++)
			  	    	  {
			  		  		 
			  		  	    nlapiLogExecution('DEBUG', 'Acct', 'subrec for invQtyTrans = ' + invQtyTrans1[k-1]);
			  		  	    nlapiLogExecution('DEBUG', 'Acct', 'subrec for invQtyTrans = ' + invNumTrans1[k-1]);
			  		  	      
			  		  	  
			  	    		  subrec1.selectNewLineItem('inventoryassignment');
			  		  		  subrec1.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',invNumTrans1[k-1]);
			  			  	  subrec1.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(invQtyTrans1[k-1]));
			  			  	  subrec1.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
		                      subrec1.commitLineItem('inventoryassignment');
		                
			  	    	  }
			  		   subrec1.commit();
		  		  	}
		  		  	else 
		  		    {

		  	    		  subrec1.selectNewLineItem('inventoryassignment');
		  		  		  subrec1.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',invNumTrans1[0]);
		  			  	  subrec1.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(invQtyTrans1[0]));
		  			  	  subrec1.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
	                      subrec1.commitLineItem('inventoryassignment');
	                      subrec1.commit();
		  		    }
		  		  	 
	  		  	    
		  		  
		  		 
	      		    Rec.commitLineItem('item');
	      		    
	      		
		}
	var submitID = nlapiSubmitRecord(Rec);
	
	
	
	 var updatedSO = nlapiLoadRecord('salesorder',submitID);
	 
	 var lineCount =updatedSO.getLineItemCount('item');
	 
	     for(var line=1;line<=lineCount;line++)
		 {
	    	 updatedSO.setLineItemValue('item','location',line,toLocation);
	    	 updatedSO.setLineItemValue('item','commitinventory',line,'1');
		 }
	
	     var submitID1 = nlapiSubmitRecord(updatedSO);
	response.sendRedirect('RECORD', 'salesorder', submitID1, false,'view');
//=============================== End to Set SO ============================================
	
	
}// END (POST method)

}


function createInventoryTransfer(status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,salesApproval_Status,customer_category,toLocation,itemCount,SO_ItemArray,SO_LineLocationArray,descriptionArray,unitsArray,qtyArray,litersArray,subrec,invcountArr,invQtyTrans,invNumTrans,setLocFrom)
{
	//nlapiLogExecution("DEBUG","In Create Function","recrdId=="+recrdId);
	
	nlapiLogExecution("DEBUG","In Create Function","createSalesOrderRecordFunction**************");
	nlapiLogExecution("DEBUG","In Create Function","invQtyTrans=="+invQtyTrans);
	nlapiLogExecution("DEBUG","In Create Function","invNumTrans=="+invNumTrans)	
	nlapiLogExecution("DEBUG","In Create Function","invcountArr=="+invcountArr);
	/*nlapiLogExecution("DEBUG","In Create Function","Sales_class=="+Sales_class);

	nlapiLogExecution("DEBUG","In Create Function","aaria_Context=="+aaria_Context);
	nlapiLogExecution("DEBUG","In Create Function","sales_emp=="+sales_emp);
	nlapiLogExecution("DEBUG","In Create Function","itemArray=="+itemArray);
	nlapiLogExecution("DEBUG","In Create Function","descriptionArray=="+descriptionArray);//subsidiary
	
	nlapiLogExecution("DEBUG","In Create Function","unitsArray=="+unitsArray);
	nlapiLogExecution("DEBUG","In Create Function","qtyArray=="+qtyArray);*/
	//nlapiLogExecution("DEBUG","In Create Function","IsLotItemArr=="+IsLotItemArr);
	//nlapiLogExecution("DEBUG","In Create Function","InvNumArr=="+InvNumArr);
	
	//var count = 0;
	var record = nlapiCreateRecord('inventorytransfer',{recordmode: 'dynamic'}); 
	
	record.setFieldValue('customform',241);
	
if(((status == 'A') || (status == 'B') || (status == 'C') ||(salesApproval_Status == '10')) && customer_category == '5')
{
	if(subsidiary != null && subsidiary != '' && subsidiary != undefined)
	{
		record.setFieldValue('subsidiary',subsidiary);
		//nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)
	}
	
	if(department != null && department != '' && department != undefined)
	{
		record.setFieldValue('department',department);
		//nlapiLogExecution("DEBUG","In Create Function","department=="+department)
	}
	
	if(Sales_class != null && Sales_class != '' && Sales_class != undefined)
	{
		record.setFieldValue('class',Sales_class);
	}
	
	if(aaria_Context != null && aaria_Context != '' && aaria_Context != undefined)
	{
		record.setFieldValue('custbody_aarialife_context',aaria_Context);
	}
	
	if(sales_emp != null && sales_emp != '' && sales_emp != undefined)
	{
		record.setFieldValue('custbody_sales_employee',sales_emp);
	}
	
	if(setLocFrom != null && setLocFrom != '' && setLocFrom != undefined)
	{
		record.setFieldValue('location',setLocFrom);
		//nlapiLogExecution("DEBUG","In Create Function","locationArray1=="+locationArray1)
	}
	
	if(toLocation != null && toLocation != '' && toLocation != undefined)
	{
		record.setFieldValue('transferlocation',toLocation);
		nlapiLogExecution("DEBUG","In Create Function","toLocation=="+toLocation)
	}
	
	var count =0;
	 
	for(x=1;x<=SO_ItemArray.length;x++)
	{
		//nlapiLogExecution("DEBUG","In Create Function","itemArray.length in inventory item=="+itemArray.length);
		 var Add =0;
		 record.selectNewLineItem('inventory');
	
		record.setCurrentLineItemValue('inventory','item',SO_ItemArray[x-1]);   
	    nlapiLogExecution("DEBUG","In Create Function","item done=="+SO_ItemArray[x-1]);
		
		record.setCurrentLineItemValue('inventory','description',descriptionArray[x-1]);
		nlapiLogExecution("DEBUG","In Create Function","description done=="+descriptionArray[x-1]);
		
		record.setCurrentLineItemValue('inventory','adjustqtyby',parseFloat(qtyArray[x-1]));                              
		nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+parseFloat(qtyArray[x-1]));
		
		record.setCurrentLineItemValue('inventory','custcol_litres',litersArray[x-1]);                                          
		nlapiLogExecution("DEBUG","In Create Function","custcol_litres done=="+litersArray[x-1]);
//=========================== Setting Inventory Details ===============================
		
		
		 var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
		  	  
		  	  
	  	   // for (var inv=0;inv<invcountArr.length;inv++)
	  		 {
	  	    	
	  
	  		  	 for(var k=1 ;k<=invcountArr[x-1];k++)
	  	    	  {
	  		  	      nlapiLogExecution('DEBUG', 'Acct', 'subrec for invQtyTrans = ' + invQtyTrans[count]);
	  		  	      nlapiLogExecution('DEBUG', 'Acct', 'subrec for invQtyTrans = ' + invNumTrans[count]);
	  		     	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for qtyArray[x-1] = ' +  qtyArray[x-1]);
	  		          nlapiLogExecution('DEBUG', 'Acct', 'subrec for parseFloat(Add)= ' + parseFloat(Add));
	  		  	      
		  		  	 if(parseFloat(qtyArray[x-1]) == parseFloat(Add))
		  	    	  {
		  		  		subrec.commit();
		  	    	    break;
		  	    	  }
		  		  	 
	  	    		  subrec.selectNewLineItem('inventoryassignment');
	  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',invNumTrans[count]);
	  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(invQtyTrans[count]));
	  			  	  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
                      subrec.commitLineItem('inventoryassignment');//	  
	  		  	      nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());
	  		  		  
	  		  	      count++;
	  		  	      
	  		  	      if(invQtyTrans[x-1] !=null && invQtyTrans[x-1]!='' && invQtyTrans[x-1] != undefined)
	  		  	      {
	  		  	    	Add+=parseFloat(invQtyTrans[x-1]);
		  		  	      
	  		  	      }
	  		  	       
			  		  	 
	  	    	  }
	  		   
	  		 subrec.commit(); 
	  		 }
		      
     }
//=================== End Of Inv Details Set=========================================================
		
		

		record.commitLineItem('inventory');
		nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
		
	}//End of for loop
	
 // var SubmitIt = nlapiSubmitRecord(record,true);  
 // nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
  
 // return SubmitIt;
}
	

function filter_array(test_array) 
{
	 var index = -1,
	 arr_length = test_array ? test_array.length : 0,
	 resIndex = -1,
	 result = [];

	 while (++index < arr_length) 
	 {
		 var value = test_array[index];
		 if(value)
		 {
			result[++resIndex] = value;
		  }
	 }
return result;
}



function removeDuplicates(num) 
{
	  var x,
		  len=num.length,
		  out=[],
		  obj={};
	 
	  for (x=0; x<len; x++) 
	  {
		obj[num[x]]=0;
	  }
	  for (x in obj) 
	  {
		out.push(x);
	  }
	  return out;
	}
		
	
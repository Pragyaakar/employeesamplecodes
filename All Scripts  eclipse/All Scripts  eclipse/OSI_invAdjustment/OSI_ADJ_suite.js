var todaydate = new Date();
var locationMap = {};

function InventoryAdjustmentSuitelet(request, response)
{
	var binMap = {};
 if ( request.getMethod() == 'GET' )
 {
   var id = request.getParameter('itemid');
   nlapiLogExecution('DEBUG', 'id', 'id = ' + id);
   var type = request.getParameter('itemtype');
   nlapiLogExecution('DEBUG', 'type', 'type = ' + type);
  
   
   if(type == 'serializedinventoryitem') 
   {
	   var Est_Cost = 0;
	   var lineId = 0;
	   var adjustqtySet = 0;
	   
	   var itemRecValues = nlapiLookupField(type,id, ['quantityavailable','usebins']);
	   var qtyonhand = itemRecValues['quantityavailable'];
	   var useBins = itemRecValues['usebins']
	   nlapiLogExecution('DEBUG', 'qtyonhand', 'qtyonhand = ' + qtyonhand);
	
	   var location;
	   var form = nlapiCreateForm('Inventory Adjustment');
	   var Date=form.addField('custpage_datefield','date', 'Date');
	  var itemIs= form.addField('custpage_itmid','text', 'ITEM').setDisplayType('hidden');
	  itemIs.setDefaultValue(id);
	   Date.setDefaultValue(nlapiDateToString(todaydate));
	   Date.setLayoutType('normal','startcol');
	   Date.setMandatory( true );
	   var msg = "In case to reduce inventory please tick the Reduce Inventory check box";
	   form.setScript('customscript_serial_num_serach');
	//   form.addField('custpage_subsidiary','select', 'Subsidiary','subsidiary');//.setDefaultValue(record.getValue('subsidiary'));
	   nlapiLogExecution('DEBUG', 'qtyonhand2', 'qtyonhand = ' + qtyonhand);
		  var itemtype = form.addField('custpage_itemtype','text','Item Type').setDefaultValue(type);
		  var binMapFld = form.addField('custpage_binmap','longtext','binmap');
		  binMapFld.setDisplayType('hidden');
		  form.getField('custpage_itemtype').setDisplayType('inline');
		  
		   form.addField('custpage_account','select', 'Adjustment Account','account').setMandatory( true );
		 
		 //  form.addField('custpage_checkbox','checkbox', 'Reduce Inventory');
		   form.addField('custpage_info','text',' ').setDefaultValue(msg);
		   form.getField('custpage_info').setDisplayType('inline');
		 
		   
          form.addField('custpage_adjsnote','textarea','Inventory Adjustment Note').setMandatory( true );
	   
	   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Item','custpage_sample_tab');
	   nlapiLogExecution('DEBUG', 'qtyonhand3', 'qtyonhand = ' + qtyonhand);
	   ItemSublist.addField('custpage_item','select','Item','item').setDisplayType('disabled');
	  var locationColumn = ItemSublist.addField('custpage_location', 'select', 'Location','location').setDisplayType('disabled');
	  
	  
	  var loc =  nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_location',1);
	 // nlapiLogExecution('DEBUG', 'qtyonhand', 'loc  = ' + loc);
	   
	   var binSelect=ItemSublist.addField('custpage_binnum', 'text', 'Bin Number');
	   ItemSublist.addField('custpage_binnumid', 'text', 'Bin Number1').setDisplayType('hidden');
	   
       form.setScript('customscript2526');
	 
	   ItemSublist.addField('custpage_onhandqty', 'float', 'On hand' ).setDisplayType('disabled');//
	   ItemSublist.addField('custpage_req_adjustqty', 'float', 'Adjust Quantity By').setDisplayType('disabled');
	   ItemSublist.addField('custpage_serialinvt','textarea', 'Serialized Inventory').setDisplayType('disabled');
	   ItemSublist.addField('custpage_req_estvalue', 'float', 'Estimated Value').setDisplayType('entry');
	   ItemSublist.addField('custpage_serial_vl', 'textarea', 'SerialVal').setDisplayType('hidden');
	 
	  
	   // Saved Search
	   if(useBins == 'T'){
		   
		   var qtyArr =[];
		   var Binarr =[];
		   var Bintextarr=[];
		   var invNum=[];
		   var invTextNum=[];
		   var loc=[];
		   var locText=[];
		   
		   
		   var UniqtyArr =[];
		   var UniBinarr =[];
		   var UniBintextarr=[];
		   var UniinvNum=[];
		   var UniinvTextNum=[];
		   var Uniloc=[];
		   var UnilocText=[];
		   
	   var serializedinventoryitemSearch = nlapiSearchRecord("serializedinventoryitem",'customsearch_serialized_with_bins',
			   [
			      ["internalid","is",id]
			   ], 
			   [
			      new nlobjSearchColumn("itemid").setSort(false), 
			      new nlobjSearchColumn("quantityavailable","inventoryNumberBinOnHand",null), 
			      new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null), 
			      new nlobjSearchColumn("inventorynumber","inventoryNumberBinOnHand",null), 
			      new nlobjSearchColumn("location","inventoryNumberBinOnHand",null)
			   ]
			   );
	   if(serializedinventoryitemSearch != null && serializedinventoryitemSearch != undefined && serializedinventoryitemSearch != ''){
		   var totalOnHand = 0;
		   var inventoryNumbers = [];
		   for (var serializedinventoryitemSearchIndex = 0; serializedinventoryitemSearchIndex < serializedinventoryitemSearch.length; serializedinventoryitemSearchIndex++) {
			   var qtyAvailable = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("quantityavailable","inventoryNumberBinOnHand",null));
			   var binNumber = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null));
			   var binNumberText = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null));
			   var binNumber = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null));
			   var inventoryNumber = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("inventorynumber","inventoryNumberBinOnHand",null));
			   var inventoryNumber_value = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("inventorynumber","inventoryNumberBinOnHand",null));
			   var location_ = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("location","inventoryNumberBinOnHand",null));
			   var location_Text = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("location","inventoryNumberBinOnHand",null));
			//   nlapiLogExecution('AUDIT', 'qtyAvailable:'+qtyAvailable+',binNumber:'+binNumber, 'binNumberText:'+binNumberText+',inventoryNumber:'+inventoryNumber+',location_:'+location_+',location_Text:'+location_Text);
			
			   qtyArr.push(qtyAvailable);
			   Binarr.push(binNumber);
			   Bintextarr.push(binNumberText);
			   invNum.push(inventoryNumber_value);
			   invTextNum.push(inventoryNumber);
			   loc.push(location_);
			   locText.push(location_Text);
			
			binMap[inventoryNumber_value] = binNumber;
		}
		 //  nlapiLogExecution('AUDIT', 'binMap:', JSON.stringify(binMap));
			 
		    UniqtyArr =removeDuplicates(qtyArr);
		     UniBinarr =removeDuplicates(Binarr);
		    UniBintextarr=removeDuplicates(Bintextarr);
		   UniinvNum=removeDuplicates(invNum);
		    UniinvTextNum=removeDuplicates(invTextNum);
		    Uniloc=removeDuplicates(loc);
		   UnilocText=removeDuplicates(locText);
		   
		//   nlapiLogExecution('AUDIT', 'qtyAvailable:'+UniqtyArr.length+',binNumber:'+UniBinarr, 'binNumberText:'+UniBintextarr+',inventoryNumber:'+UniinvNum+',location_:'+Uniloc+',location_Text:'+UnilocText);
			
		   //var newNum =UniinvNum.split("");
		      for(var ch=0;ch<Uniloc.length;ch++)
			   {
		    	    var add=0;
			  		var Serial=[];
			  		var SerialId=[];
		    	  for (var serializedinventoryitemSearchIndex = 0; serializedinventoryitemSearchIndex < serializedinventoryitemSearch.length; serializedinventoryitemSearchIndex++) {
					   var qtyAvailable = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("quantityavailable","inventoryNumberBinOnHand",null));
					   var binNumber = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null));
					   var binNumberText = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null));
					   var binNumber = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null));
					   var inventoryNumber = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("inventorynumber","inventoryNumberBinOnHand",null));
					   var inventoryNumber_value = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("inventorynumber","inventoryNumberBinOnHand",null));
					   var location_ = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("location","inventoryNumberBinOnHand",null));
					   var location_Text = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("location","inventoryNumberBinOnHand",null));
					//   nlapiLogExecution('AUDIT', 'qtyAvailable:'+qtyAvailable+',binNumber:'+binNumber, 'binNumberText:'+binNumberText+',inventoryNumber:'+inventoryNumber+',location_:'+location_+',location_Text:'+location_Text);
					
					   if(Uniloc==location_)
					   {
						   if(Uniloc[ch]==location_)
		     				  {
		     					 add+=parseFloat(qtyAvailable);
		     				     Serial.push(inventoryNumber);
		     				     SerialId.push(inventoryNumber_value);
		     				  }
					   }
		    	  
		    	  }
		    	  ItemSublist.setLineItemValue('custpage_item',ch+1,id);
		    	  ItemSublist.setLineItemValue('custpage_onhandqty',ch+1,parseFloat(add));
		    	  ItemSublist.setLineItemValue('custpage_req_adjustqty',ch+1,parseFloat(add));//
                  ItemSublist.setLineItemValue('custpage_serialinvt',ch+1,Serial.toString().split(""));
                  ItemSublist.setLineItemValue('custpage_location',ch+1,Uniloc[ch]);
                  ItemSublist.setLineItemValue('custpage_binnum',ch+1,UniBintextarr.toString().split(""));//custpage_req_estvalue
                  ItemSublist.setLineItemValue('custpage_binnumid',ch+1,UniBinarr.toString().split(""));
                  ItemSublist.setLineItemValue('custpage_serial_vl',ch+1,SerialId.toString().split(""));

			   }
	
	   
	   nlapiLogExecution('AUDIT', 'totalOnHand:'+totalOnHand, 'inventoryNumbers:'+inventoryNumbers)
	 
	   }
	   }
	   else if(useBins == 'F'){
		   var qtyArr =[];
		   var Binarr =[];
		   var Bintextarr=[];
		   var invNum=[];
		   var invTextNum=[];
		   var loc=[];
		   var locText=[];
		   
		   
		   var UniqtyArr =[];
		   var UniinvNum=[];
		   var UniinvTextNum=[];
		   var Uniloc=[];
		   var UnilocText=[];
		   var serializedinventoryitemSearch1 = nlapiSearchRecord("serializedinventoryitem",'customsearch_without_bins_item_search',
				   [
				      ["internalid","is",id]
				   ], 
				   [
				      new nlobjSearchColumn("itemid").setSort(false), 
				      new nlobjSearchColumn("quantityavailable","inventoryNumber",null), 
				      new nlobjSearchColumn("inventorynumber","inventoryNumber",null), 
				      new nlobjSearchColumn("location","inventoryNumber",null)
				   ]
				   );
		   if(serializedinventoryitemSearch1 != null && serializedinventoryitemSearch1 != undefined && serializedinventoryitemSearch1 != ''){
			   for (var serializedinventoryitemSearchIndex = 0; serializedinventoryitemSearchIndex < serializedinventoryitemSearch1.length; serializedinventoryitemSearchIndex++) {
				  var itemId =  serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("itemid"));
				   var availableQty = serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue( new nlobjSearchColumn("quantityavailable","inventoryNumber",null));
				   var inventoryNumber = serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("inventorynumber","inventoryNumber",null));
				   var inventoryNumberTxt = serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("inventorynumber","inventoryNumber",null));
				  var location_= serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("location","inventoryNumber",null));
		    
				  qtyArr.push(availableQty);
				  // Binarr.push(binNumber);
				  // Bintextarr.push(binNumberText);
				   invNum.push(inventoryNumber);
				   invTextNum.push(inventoryNumberTxt);
				   loc.push(location_);
				 //  locText.push(location_Text);
				
			}
			   
		   }
		   UniqtyArr =removeDuplicates(qtyArr);
		 //    UniBinarr =removeDuplicates(Binarr);
		 //   UniBintextarr=removeDuplicates(Bintextarr);
		   UniinvNum=removeDuplicates(invNum);
		   UniinvTextNum=removeDuplicates(invTextNum);
		    Uniloc=removeDuplicates(loc);
	
		      for(var ch=0;ch<Uniloc.length;ch++)
			   {
		  		var add=0;
		  		var Serial=[];
		  		var SerialId=[];
		    	   for (var serializedinventoryitemSearchIndex = 0; serializedinventoryitemSearchIndex < serializedinventoryitemSearch1.length; serializedinventoryitemSearchIndex++) {
     				  var itemId =  serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("itemid"));
     				   var availableQty = serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue( new nlobjSearchColumn("quantityavailable","inventoryNumber",null));
     				   var inventoryNumber = serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("inventorynumber","inventoryNumber",null));
     				  var inventoryNumberTxxt = serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("inventorynumber","inventoryNumber",null));
     				  
     				   var location_= serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("location","inventoryNumber",null));
     			   
     				  if(Uniloc[ch]==location_)
     				  {
     					 add+=parseFloat(availableQty);
     				     Serial.push(inventoryNumberTxxt);
     				    SerialId.push(inventoryNumber);
     				  }
     			   }
     			  ItemSublist.setLineItemValue('custpage_item',ch+1,id);
		    	  ItemSublist.setLineItemValue('custpage_onhandqty',ch+1,parseFloat(add));
		    	  ItemSublist.setLineItemValue('custpage_req_adjustqty',ch+1,parseFloat(add));
                  ItemSublist.setLineItemValue('custpage_serialinvt',ch+1,Serial.toString().split(""));
                  ItemSublist.setLineItemValue('custpage_serial_vl',ch+1,SerialId.toString().split(""));
                  ItemSublist.setLineItemValue('custpage_location',ch+1,Uniloc[ch]);
			   }
	   }
	   binMap = JSON.stringify(binMap);
	   
	   binMapFld.setDefaultValue(binMap)
	   form.addSubmitButton('Submit');
	   response.writePage(form);
   }
   //==================================== Changes made from here ===============================================================
   
   
   if(type == 'inventoryitem')
   {
	   var Est_Cost = 0;
	   var lineId = 0;
	   var adjustqtySet = 0;
	   
	   
	   var itemRecValues = nlapiLookupField(type,id, ['quantityavailable','usebins']);
	   var qtyonhand = itemRecValues['quantityavailable'];
	   var useBins = itemRecValues['usebins']
	   nlapiLogExecution('DEBUG', 'qtyonhand', 'qtyonhand = ' + qtyonhand);
	   nlapiLogExecution('DEBUG', 'useBins', 'useBins = ' + useBins);
	   
	
	   //var qtyonhand=record.getValue('quantityonhand');
	   var location;
	   var form = nlapiCreateForm('Inventory Adjustment');
	   var Date=form.addField('custpage_datefield','date', 'Date');
	   var itemIs= form.addField('custpage_itmid','text', 'ITEM').setDisplayType('hidden');
		  itemIs.setDefaultValue(id);
	   Date.setDefaultValue(nlapiDateToString(todaydate));
	   Date.setLayoutType('normal','startcol');
	   Date.setMandatory( true );
	   var msg = "In case to reduce inventory please tick the Reduce Inventory check box";
	   form.setScript('customscript_serial_num_serach');
	 //  form.addField('custpage_subsidiary','select', 'Subsidiary','subsidiary');//.setDefaultValue(record.getValue('subsidiary'));
	   //Subsidiary.setMandatory( true );
	   //var Account=
		  var itemtype = form.addField('custpage_itemtype','text','Item Type').setDefaultValue(type);
		  form.getField('custpage_itemtype').setDisplayType('inline');
		  
		   form.addField('custpage_account','select', 'Adjustment Account','account').setMandatory( true );
		   //form.addField('custpage_req_location','select','Location','location').setMandatory( true );
		  // form.addField('custpage_checkbox','checkbox', 'Reduce Inventory');
		   form.addField('custpage_info','text',' ').setDefaultValue(msg);
		   form.getField('custpage_info').setDisplayType('inline');
		 
          form.addField('custpage_adjsnote','textarea','Inventory Adjustment Note').setMandatory( true );
	   //Account.setMandatory( true );
	   //var ItemTab = form.addSubList('custpage_itemsublist', 'list', 'Items');
          
      if(useBins=='T')    
    	  {
				   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Item','custpage_sample_tab');
				   
				   ItemSublist.addField('custpage_item','select','Item','item').setDisplayType('disabled');//.setDisplayType('disabled');
				   ItemSublist.addField('custpage_location', 'select', 'Location','location');
				   
				   var binSelect=ItemSublist.addField('custpage_binnum', 'text', 'Bin Number');
				  
				   ItemSublist.addField('custpage_binnum_id', 'text', 'Bin Number').setDisplayType('hidden');
				   
				   ItemSublist.addField('custpage_onhandqty', 'float', 'On hand' ).setDisplayType('disabled');//
				   ItemSublist.addField('custpage_req_adjustqty', 'float', 'Adjust Quantity By').setDisplayType('disabled');
				 //  ItemSublist.addField('custpage_serialinvt','textarea', 'Serialized Inventory').setDisplayType('entry');
				   ItemSublist.addField('custpage_req_estvalue', 'float', 'Estimated Value').setDisplayType('entry');
				  
			      // form.setScript('customscript2526');//customscript2526
				

			       var searchresults = nlapiSearchRecord("inventoryitem",'customsearch_serialized_with_bins_2',
			    		   [
			    		      ["type","anyof","InvtPart"], 
			    		      "AND", 
			    		      ["isserialitem","is","F"], 
			    		      "AND", 
			    		      ["islotitem","is","F"], 
			    		      "AND", 
			    		      ["usebins","is","T"], 
			    		      "AND", 
			    		      ["binonhand.quantityavailable","greaterthan","0"],
			    		      "AND", 
							  ["internalid","anyof",id]
			    		   ], 
			    		   [
			    		      new nlobjSearchColumn("itemid").setSort(false), 
			    		      new nlobjSearchColumn("preferredbin"), 
			    		      new nlobjSearchColumn("quantityavailable","binOnHand",null), 
			    		      new nlobjSearchColumn("binnumber","binOnHand",null), 
			    		      new nlobjSearchColumn("location","binOnHand",null)
			    		   ]
			    		   );
					 
					// var searchresults = nlapiSearchRecord('item','customsearch_wmsse_inv_report',filters,columns);
					// alert('searchresults length'+searchresults.length);
					 if (searchresults != null)
					 {
						 for(var k=0;k<searchresults.length;k++)
							{	
								
								var itemId = id;
								
								var BinVal = searchresults[k].getText("binnumber","binOnHand",null);
								var BinValid = searchresults[k].getValue("binnumber","binOnHand",null);
								
								var Loc = searchresults[k].getValue("location","binOnHand",null);
								
								var Quant = searchresults[k].getValue("quantityavailable","binOnHand",null);
								
								
								   ItemSublist.setLineItemValue('custpage_item',k+1,itemId);
								   ItemSublist.setLineItemValue('custpage_onhandqty',k+1,Quant);
								   ItemSublist.setLineItemValue('custpage_location',k+1,Loc);
								   ItemSublist.setLineItemValue('custpage_binnum',k+1,BinVal);//custpage_binnum
								   ItemSublist.setLineItemValue('custpage_binnum_id',k+1,BinValid);//custpage_binnum
							   	   ItemSublist.setLineItemValue('custpage_estcost',k+1,Est_Cost);
							   	   ItemSublist.setLineItemValue('custpage_req_adjustqty',k+1,Quant);
							   	   //ItemSublist.setLineItemValue('custpage_lineid',i,lineId[i-1]);
							
							}
					 }
    	  }
      if(useBins=='F')    
	  {
			   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Item','custpage_sample_tab');
			   
			   ItemSublist.addField('custpage_item','select','Item','item').setDisplayType('disabled');//.setDisplayType('disabled');
			   ItemSublist.addField('custpage_location', 'select', 'Location','location').setDisplayType('disabled');
			   
			 //  var binSelect=ItemSublist.addField('custpage_binnum', 'text', 'Bin Number');
			  
			   ItemSublist.addField('custpage_onhandqty', 'float', 'On hand' ).setDisplayType('disabled');//
			   ItemSublist.addField('custpage_req_adjustqty', 'float', 'Adjust Quantity By').setDisplayType('disabled');
			 //  ItemSublist.addField('custpage_serialinvt','textarea', 'Serialized Inventory').setDisplayType('entry');
			   ItemSublist.addField('custpage_req_estvalue', 'float', 'Estimated Value').setDisplayType('entry');
			  
		      // form.setScript('customscript2526');//customscript2526
			
			   var searchresults = nlapiSearchRecord("inventoryitem","customsearch_serialized_with_bins_2_2",
					   [
					      ["type","anyof","InvtPart"], 
					      "AND", 
					      ["isserialitem","is","F"], 
					      "AND", 
					      ["locationquantityavailable","greaterthan","0"], 
					      "AND", 
					      ["inventorydetail.binnumber","anyof","@NONE@"],
					      "AND", 
						  ["internalid","anyof",id]
					   ], 
					   [
					      new nlobjSearchColumn("itemid",null,"GROUP").setSort(false), 
					      new nlobjSearchColumn("inventorylocation",null,"GROUP"), 
					      new nlobjSearchColumn("locationquantityavailable",null,"SUM")
					   ]
					   );
				 
				 
				// var searchresults = nlapiSearchRecord('item','customsearch_wmsse_inv_report',filters,columns);
				// alert('searchresults length'+searchresults.length);
			   nlapiLogExecution('DEBUG', 'useBins', 'searchresults.length :='+searchresults.length );
				 if (searchresults != null)
				 {
					 for(var k=0;k<searchresults.length;k++)
						{	
							
							var itemId = id;
							
							var Loc = searchresults[k].getValue("inventorylocation",null,"GROUP");
							
							var Quant = searchresults[k].getValue("locationquantityavailable",null,"SUM");
							
							   ItemSublist.setLineItemValue('custpage_item',k+1,itemId);
							   ItemSublist.setLineItemValue('custpage_onhandqty',k+1,Quant);
							   ItemSublist.setLineItemValue('custpage_location',k+1,Loc);
							
						   	   ItemSublist.setLineItemValue('custpage_estcost',k+1,Est_Cost);
						   	   ItemSublist.setLineItemValue('custpage_req_adjustqty',k+1,Quant);
						   	 
						
						}
				 }
	  }
      

      nlapiLogExecution('DEBUG', 'useBins', 'Outside IF use bins' );

	   form.addSubmitButton('Submit');
	   response.writePage(form);
   }
   
   
   // =================================== End OF changes here =================================================================
  }
 if (request.getMethod() == 'POST' ) 
 {
	var Date;
	//var Subsidary;
	var Account;
	var Location;
	var itemCount;
	var subs;
	var itemSet;
	var item_set = new Array();
	var qtySet;
	var qty_set = new Array();
	var adjustqtySet;
	var adjustqty_set = new Array();
	var estSet;
	var est_cost_set = new Array();
	var chk;
	var serializedinvSet;
	var serialinv_set = new Array();
	var type;
    var InvtAdjNote;
    var binNum;
    var binNumChkArr=[];
    var binNumArr=[];
    var lineArrSubsi =[];
	var UniqlineArrSubsi =[];
	var lineArrLoc =[];
   /* var locationArr = new Array();
    var subsidiaryArr = new Array();*/
	//----code to get the values
	
	var lineArrLocserial=[];
	var lineArrSubsiSerial=[];
	var UniqSubsiserial=[];
	var id = request.getParameter('custpage_itmid');
	  
	   
	   
    loc =  request.getParameter('custpage_location');
	nlapiLogExecution('DEBUG', 'Acct', 'location = ' + loc);
	
	type = request.getParameter('custpage_itemtype');
	nlapiLogExecution('DEBUG', 'Acct', 'itemtype = ' + type);
	
	Account = request.getParameter('custpage_account');
	nlapiLogExecution('DEBUG', 'Acct', 'Account = ' + Account);
    
	subs = request.getParameter('custpage_subsidiary');
    nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   subs= ' + subs);
    
	chk =request.getParameter('custpage_checkbox');
	nlapiLogExecution('DEBUG', 'Acct', 'chk = ' + chk);
	InvtAdjNote = request.getParameter('custpage_adjsnote');
   
	var itemRecValues = nlapiLookupField(type,id, ['quantityavailable','usebins']);
	   var qtyonhand = itemRecValues['quantityavailable'];
	   var useBins = itemRecValues['usebins']

	

	 //=====================================Start OF Serial With Bin ===========================
	if(type == 'serializedinventoryitem'  && useBins=='T')
	{
		 nlapiLogExecution('DEBUG', 'POST OF SERIALISE', 'serializedinventoryitem   && useBins==T');
		itemCount = request.getLineItemCount('custpage_sig_req_sublist');
		
		for(var j=1;j<=itemCount;j++)
		{
			Location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
	       //  nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
			 
		        lineArrLocserial.push(Location1);
		        
		         var subsiLine1 = nlapiLookupField('location',Location,'custrecord_esm_location_subsidiary');
				
		          lineArrSubsiSerial.push(subsiLine1);
		        
			//nlapiLogExecution('DEBUG', 'Acct', 'itemCount = ' + itemCount);
	           binNum = request.getLineItemValue('custpage_sig_req_sublist','custpage_binnumid',j);
	      //   nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   binNum= ' + binNum);
	           binNumChkArr.push(binNum);
			//chk = request.getLineItemValue('custpage_checkbox','custpage_checkbox',j);
			//nlapiLogExecution('DEBUG', 'Acct', 'chk = ' + chk);
				itemSet = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',j);
				// nlapiLogExecution('DEBUG', 'Acct', 'itemSet in for loop= ' + itemSet);
				item_set.push(itemSet);
				
				qtySet = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
				// nlapiLogExecution('DEBUG', 'Acct', 'onhandqty in for loop= ' + qtySet);
				qty_set.push(qtySet);
				
				adjustqtySet = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
				// nlapiLogExecution('DEBUG', 'Acct', 'adjustqtySet in for loop= ' + adjustqtySet);
				adjustqty_set.push(adjustqtySet);
				
				estSet = request.getLineItemValue('custpage_sig_req_sublist','custpage_req_estvalue',j);
			//	nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop= ' + parseFloat(estSet));
				est_cost_set.push(estSet);
				
			    serializedinvSet  = request.getLineItemValue('custpage_sig_req_sublist','custpage_serial_vl',j);
				// nlapiLogExecution('DEBUG', 'Acct', 'serializedinvSet in for loop = ' + serializedinvSet);
				serialinv_set.push(serializedinvSet);
			//	nlapiLogExecution('DEBUG', 'Acct', 'serialinv_set in for loop = ' + serialinv_set);
			
		}
		
		
		 UniqSubsiserial =removeDuplicates(lineArrSubsiSerial);
	
		 
		 if(UniqSubsiserial != null)
		 {
			 
			 
			  //=========== Negative AdjustMent ========================	
			 
			 for (var s1=0;s1<UniqSubsiserial.length;s1++)
			 {
				 var invAdj_obj = nlapiCreateRecord('inventoryadjustment',{recordmode: 'dynamic'});
				  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for inventoryitem = ' + invAdj_obj);
				 
				  invAdj_obj.setFieldValue('subsidiary',UniqSubsiserial[s1]);//custbody_createdfromtask
				  invAdj_obj.setFieldValue('account',Account);
				  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
	       
		      	for(var l1=1;l1<=itemCount;l1++)
		      	{
		      		  var Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',l1);
		              nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
		            
		              var subsiLine2 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
		            
		         
		               if(subsiLine2 == UniqSubsiserial[s1] )
		        	  {
		            	   nlapiLogExecution('DEBUG', 'Acct', 'subsiLine1 = ' + subsiLine2 +'UniqueLine:'+UniqSubsiserial[s1]);
		            	
		            	    invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'item_set for inventoryitem = ' + item_set[l1-1]);
					  		
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'location', Location1);
					  		nlapiLogExecution('DEBUG', 'Acct', 'Location for inventoryitem = ' +Location1);
					  		//invAdj_obj.setCurrentLineItemValue('inventory', 'quantityonhand', qtySet);
					  		
					  		invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNumChkArr[l1-1]);
					        nlapiLogExecution('DEBUG', 'Acct', 'binNum in else if loop binNum= ' + binNumChkArr);
					      
					    	
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', parseFloat(-adjustqty_set[l1-1]));
					  		nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for inventoryitem = ' + adjustqty_set[l1-1]);
					        
					        var subrec = invAdj_obj.createCurrentLineItemSubrecord('inventory','inventorydetail');
					  	      nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = ' + subrec);
				     	  	 var newT =serialinv_set[l1-1].toString();
					    	 var length1 =newT.split(',');
					    	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized =serV ' +length1.length );
						        var count=0;
						        var count=0;
					  	  for( var sub=0;sub<length1.length;sub++)
					  	  {
					  		 var a = parseFloat(adjustqty_set[l1-1]);
					  		 var b = parseFloat(adjustqty_set[l1-1]) - parseFloat(1);
					  		 
					  		 var serV = serialinv_set[l1-1];
					  		var setSer= serV.toString().split(',');
					  		 var Valto =parseFloat(a-b);
					  	
					  		 
					  		  subrec.selectNewLineItem('inventoryassignment');
		
					  		  subrec.setCurrentLineItemValue('inventoryassignment', 'quantity',parseFloat(0-Valto));
						  	 
						  	  subrec.setCurrentLineItemValue('inventoryassignment', 'issueinventorynumber',setSer[sub]);//receiptinventorynumber
						  	  
						  	  subrec.commitLineItem('inventoryassignment');//	     
						  	 
							 
					  	  }
					  	 subrec.commit();

					  	    invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for inventoryitem = ' + est_cost_set[l1-1]);
					  		invAdj_obj.commitLineItem('inventory'); //commit the line item
					  
		        	  }
		      	}  
		      	 var Id = nlapiSubmitRecord(invAdj_obj);
			 }
			  //=========== Positive AdjustMent ========================	
			 
			 for (var s1=0;s1<UniqSubsiserial.length;s1++)
			 {
				 var invAdj_obj = nlapiCreateRecord('inventoryadjustment',{recordmode: 'dynamic'});
				  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for inventoryitem = ' + invAdj_obj);
				 
				  invAdj_obj.setFieldValue('subsidiary',UniqSubsiserial[s1]);//custbody_createdfromtask
				  invAdj_obj.setFieldValue('account',Account);
				  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
				
		      	for(var l1=1;l1<=itemCount;l1++)
		      	{
		      		  var Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',l1);
		              nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
		            
		              var subsiLine2 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
		            
		         
		               if(subsiLine2 == UniqSubsiserial[s1] )
		        	  {
		            	   nlapiLogExecution('DEBUG', 'Acct', 'subsiLine1 = ' + subsiLine2 +'UniqueLine:'+UniqSubsiserial[s1]);
		            		invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'item_set for inventoryitem = ' + item_set[l1-1]);
					  		
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'location', Location1);
					  		nlapiLogExecution('DEBUG', 'Acct', 'Location for inventoryitem = ' + Location1);
					  		//invAdj_obj.setCurrentLineItemValue('inventory', 'quantityonhand', qtySet);
					  		
					  		invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNumChkArr[l1-1]);
					        nlapiLogExecution('DEBUG', 'Acct', 'binNum in else if loop binNum= ' + binNum);
					      
					    	
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', parseFloat(adjustqty_set[l1-1]));
					  		nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for inventoryitem = ' + adjustqty_set[l1-1]);
					        
					        var subrec = invAdj_obj.createCurrentLineItemSubrecord('inventory','inventorydetail');
					  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = ' + subrec);
					  	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized =serialinv_set[l1-1] ' + serialinv_set[l1-1]);
					  	
					  	 var newT =serialinv_set[l1-1].toString();
					  	 var length1 =newT.split(',');
					  	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized =serV ' +length1.length );
					        var count=0;
					  	  for( var sub=0;sub<length1.length;sub++)
					  	  {
					  		 var a = parseFloat(adjustqty_set[l1-1]);
					  		 var b = parseFloat(adjustqty_set[l1-1]) - parseFloat(1);
					  		 
					  		 var serV = serialinv_set[l1-1];
					  		 var setSer= serV.toString().split(',');
					  		 
					  		  subrec.selectNewLineItem('inventoryassignment');
						  	 // nlapiLogExecution('DEBUG', 'serializedinvSetIndex', serializedinvSetIndex);
					  		 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = QTY:-' + parseFloat(a-b) );
						  	  subrec.setCurrentLineItemValue('inventoryassignment', 'quantity',parseFloat(a-b) );
						  	  
						  	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = SerialNum:-' +setSer[sub]);
						  	  subrec.setCurrentLineItemValue('inventoryassignment', 'receiptinventorynumber', setSer[sub]);//receiptinventorynumber
						  	  
						  	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = BinNUm:-' +binNumChkArr[l1-1]);
						  	  subrec.setCurrentLineItemValue('inventoryassignment', 'binnumber', binNumChkArr[l1-1]);
						  
						  	  subrec.commitLineItem('inventoryassignment');//	     
						  	 
					  	  }
					  	   subrec.commit();	 
     
					  	    invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for inventoryitem = ' + est_cost_set[l1-1]);
					  		invAdj_obj.commitLineItem('inventory'); //commit the line item
					  
		        	  }
		      	}  
		      	 var Id = nlapiSubmitRecord(invAdj_obj);
			 }
			 response.sendRedirect('RECORD', 'inventoryadjustment', Id, false,'view');
		 }
	
	 }
	   //============================ Start Serial WithOut Bin ======================================================
	else if(type == 'serializedinventoryitem'  && useBins=='F')
		{
			 nlapiLogExecution('DEBUG', 'POST OF SERIALISE', 'serializedinventoryitem   && useBins==F');
			itemCount = request.getLineItemCount('custpage_sig_req_sublist');
			
			for(var j=1;j<=itemCount;j++)
			{
				Location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
		       //  nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
				 
			        lineArrLocserial.push(Location1);
			        
			         var subsiLine1 = nlapiLookupField('location',Location,'custrecord_esm_location_subsidiary');
					
			          lineArrSubsiSerial.push(subsiLine1);
			        
				//nlapiLogExecution('DEBUG', 'Acct', 'itemCount = ' + itemCount);
		       /*    binNum = request.getLineItemValue('custpage_sig_req_sublist','custpage_binnumid',j);
		      //   nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   binNum= ' + binNum);
		           binNumChkArr.push(binNum);*/
				//chk = request.getLineItemValue('custpage_checkbox','custpage_checkbox',j);
				//nlapiLogExecution('DEBUG', 'Acct', 'chk = ' + chk);
					itemSet = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',j);
					// nlapiLogExecution('DEBUG', 'Acct', 'itemSet in for loop= ' + itemSet);
					item_set.push(itemSet);
					
					qtySet = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
					// nlapiLogExecution('DEBUG', 'Acct', 'onhandqty in for loop= ' + qtySet);
					qty_set.push(qtySet);
					
					adjustqtySet = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
					// nlapiLogExecution('DEBUG', 'Acct', 'adjustqtySet in for loop= ' + adjustqtySet);
					adjustqty_set.push(adjustqtySet);
					
					estSet = request.getLineItemValue('custpage_sig_req_sublist','custpage_req_estvalue',j);
				//	nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop= ' + parseFloat(estSet));
					est_cost_set.push(estSet);
					
				    serializedinvSet  = request.getLineItemValue('custpage_sig_req_sublist','custpage_serial_vl',j);
					// nlapiLogExecution('DEBUG', 'Acct', 'serializedinvSet in for loop = ' + serializedinvSet);
					serialinv_set.push(serializedinvSet);
				//	nlapiLogExecution('DEBUG', 'Acct', 'serialinv_set in for loop = ' + serialinv_set);
				
			}
			
			
			 UniqSubsiserial =removeDuplicates(lineArrSubsiSerial);
			
			
			
			  
			 
			 if(UniqSubsiserial != null)
			 {
				 
				    //=========== Negative AdjustMent ========================		 
						 
						 
						 for (var s1=0;s1<UniqSubsiserial.length;s1++)
						 {
							 var invAdj_obj = nlapiCreateRecord('inventoryadjustment',{recordmode: 'dynamic'});
							  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for inventoryitem = ' + invAdj_obj);
							 
							  invAdj_obj.setFieldValue('subsidiary',UniqSubsiserial[s1]);//custbody_createdfromtask
							  invAdj_obj.setFieldValue('account',Account);
							  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
							  // invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
					          
					       
					      	for(var l1=1;l1<=itemCount;l1++)
					      	{
					      		  var Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',l1);
					              nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
					            
					              var subsiLine2 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
					            
					         
					               if(subsiLine2 == UniqSubsiserial[s1] )
					        	  {
					            	   nlapiLogExecution('DEBUG', 'Acct', 'subsiLine1 = ' + subsiLine2 +'UniqueLine:'+UniqSubsiserial[s1]);
					            		invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
								  		invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set[l1-1]);
								  		nlapiLogExecution('DEBUG', 'Acct', 'item_set for inventoryitem = ' + item_set[l1-1]);
								  		
								  		invAdj_obj.setCurrentLineItemValue('inventory', 'location', Location1);
								  		nlapiLogExecution('DEBUG', 'Acct', 'Location for inventoryitem = ' +Location1);
								  		//invAdj_obj.setCurrentLineItemValue('inventory', 'quantityonhand', qtySet);
								  		
								  	/*	invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNumChkArr[l1-1]);
								        nlapiLogExecution('DEBUG', 'Acct', 'binNum in else if loop binNum= ' + binNumChkArr);
								      */
								    	
								  		invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', parseFloat(-adjustqty_set[l1-1]));
								  		nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for inventoryitem = ' + adjustqty_set[l1-1]);
								        
								        var subrec = invAdj_obj.createCurrentLineItemSubrecord('inventory','inventorydetail');
								  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = ' + subrec);
								  	 var newT =serialinv_set[l1-1].toString();
								  	 var length1 =newT.split(',');
								  	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized =serV ' +length1.length );
								        var count=0;
								        var count=0;
								  	  for( var sub=0;sub<length1.length;sub++)
								  	  {
								  		 var a = parseFloat(adjustqty_set[l1-1]);
								  		 var b = parseFloat(adjustqty_set[l1-1]) - parseFloat(1);
								  		 
								  		 var serV = serialinv_set[l1-1];
								  		var setSer= serV.toString().split(',');
								  		 var Valto =parseFloat(a-b);
								  	
								  		 
								  		  subrec.selectNewLineItem('inventoryassignment');
									  	 // nlapiLogExecution('DEBUG', 'serializedinvSetIndex', serializedinvSetIndex);
									  
									  	  subrec.setCurrentLineItemValue('inventoryassignment', 'quantity',parseFloat(0-Valto));
									  	 
									  	  subrec.setCurrentLineItemValue('inventoryassignment', 'receiptinventorynumber',setSer[sub]);//receiptinventorynumber
									  	  
									  	 // subrec.setCurrentLineItemValue('inventoryassignment', 'binnumber', binNumArr[l1-1]);
									  
									  	  subrec.commitLineItem('inventoryassignment');//	     
									  	 
										 
								  	  }
								  	 subrec.commit();
										        
								        
								  	
								  		//invAdj_obj.setCurrentLineItemValue('inventory', 'serialized', serialinv_set);
								  		
								  		invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set[l1-1]);
								  		nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for inventoryitem = ' + est_cost_set[l1-1]);
								  		invAdj_obj.commitLineItem('inventory'); //commit the line item
								  
					        	  }
					      	}  
					      	 var Id = nlapiSubmitRecord(invAdj_obj);
						 }
					 
				  //=========== Positive AdjustMent ========================	
				 for (var s1=0;s1<UniqSubsiserial.length;s1++)
				 {
					 var invAdj_obj = nlapiCreateRecord('inventoryadjustment',{recordmode: 'dynamic'});
					  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for inventoryitem = ' + invAdj_obj);
					 
					  invAdj_obj.setFieldValue('subsidiary',UniqSubsiserial[s1]);//custbody_createdfromtask
					  invAdj_obj.setFieldValue('account',Account);
					  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
					  // invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
			          
			       
			      	for(var l1=1;l1<=itemCount;l1++)
			      	{
			      		  var Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',l1);
			              nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
			            
			              var subsiLine2 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
			            
			         
			               if(subsiLine2 == UniqSubsiserial[s1] )
			        	  {
			            	   nlapiLogExecution('DEBUG', 'Acct', 'subsiLine1 = ' + subsiLine2 +'UniqueLine:'+UniqSubsiserial[s1]);
			            		invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
						  		invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set[l1-1]);
						  		nlapiLogExecution('DEBUG', 'Acct', 'item_set for inventoryitem = ' + item_set[l1-1]);
						  		
						  		invAdj_obj.setCurrentLineItemValue('inventory', 'location', Location1);
						  		nlapiLogExecution('DEBUG', 'Acct', 'Location for inventoryitem = ' + Location1);
						  		//invAdj_obj.setCurrentLineItemValue('inventory', 'quantityonhand', qtySet);
						  		
						  	/*	invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNumChkArr[l1-1]);
						        nlapiLogExecution('DEBUG', 'Acct', 'binNum in else if loop binNum= ' + binNum);
						      
						    */	
						  		invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', parseFloat(adjustqty_set[l1-1]));
						  		nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for inventoryitem = ' + adjustqty_set[l1-1]);
						        
						        var subrec = invAdj_obj.createCurrentLineItemSubrecord('inventory','inventorydetail');
						  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = ' + subrec);
						  	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized =serialinv_set[l1-1] ' + serialinv_set[l1-1]);
						  	
						  	 var newT =serialinv_set[l1-1].toString();
						  	 var length1 =newT.split(',');
						  	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized =serV ' +length1.length );
						        var count=0;
						  	  for( var sub=0;sub<length1.length;sub++)
						  	  {
						  		 var a = parseFloat(adjustqty_set[l1-1]);
						  		 var b = parseFloat(adjustqty_set[l1-1]) - parseFloat(1);
						  		 
						  		 var serV = serialinv_set[l1-1];
						  		 var setSer= serV.toString().split(',');
						  		 
						  		  subrec.selectNewLineItem('inventoryassignment');
							  	 // nlapiLogExecution('DEBUG', 'serializedinvSetIndex', serializedinvSetIndex);
						  		 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = QTY:-' + parseFloat(a-b) );
							  	  subrec.setCurrentLineItemValue('inventoryassignment', 'quantity',parseFloat(a-b) );
							  	  
							  	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = SerialNum:-' +setSer[sub]);
							  	  subrec.setCurrentLineItemValue('inventoryassignment', 'receiptinventorynumber', setSer[sub]);//receiptinventorynumber
							 /* 	  
							  	 nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = BinNUm:-' +binNumChkArr[l1-1]);
							  	  subrec.setCurrentLineItemValue('inventoryassignment', 'binnumber', binNumChkArr[l1-1]);
							  */
							  	  subrec.commitLineItem('inventoryassignment');//	     
							  	 
								 
						  	  }
						  	 subrec.commit();	 
								        
						        
						  	
						  		//invAdj_obj.setCurrentLineItemValue('inventory', 'serialized', serialinv_set);
						  		
						  		invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set[l1-1]);
						  		nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for inventoryitem = ' + est_cost_set[l1-1]);
						  		invAdj_obj.commitLineItem('inventory'); //commit the line item
						  
			        	  }
			      	}  
			      	 var Id = nlapiSubmitRecord(invAdj_obj);
				 }
			 
				 response.sendRedirect('RECORD', 'inventoryadjustment', Id, false,'view');
			 }
			 
		 }
	   
	 //================================================ INVENTORY WIth-BIN =====================================================
	else if(type == 'inventoryitem' && useBins=='T')
	{
		 nlapiLogExecution('DEBUG', 'POST Method', 'type == inventoryitem... & useBins=T' );
		 
		    var itemSet1;
			var item_set1 = new Array();
			var qtySet1;
			var qty_set1 = new Array();
			var adjustqtySet1;
			var adjustqty_set1 = new Array();
			var estSet1;
			var est_cost_set1 = new Array();
			var chk;
			
		    var binNum1;
		    var binNumArr1=[];
		    var lineArrSubsi1 =[];
			var UniqlineArrSubsi =[];
			var lineArrLoc1 =[];
		var itemCount1 = request.getLineItemCount('custpage_sig_req_sublist');
			
			for(var j=1;j<=itemCount1;j++)
			{
				Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
		        nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location1);
		       
				//nlapiLogExecution('DEBUG', 'Acct', 'itemCount = ' + itemCount);
		        binNum1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_binnum_id',j);
		        nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   binNum= ' + binNum1);
		        binNumArr1.push(binNum1);
		        lineArrLoc1.push(Location1);
		        
		         var subsiLine1 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
				
		          lineArrSubsi1.push(subsiLine1);
		        
		            itemSet1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',j);
					nlapiLogExecution('DEBUG', 'Acct', 'itemSet in for loop= ' + itemSet1);
					item_set1.push(itemSet1);
					
					qtySet1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
					nlapiLogExecution('DEBUG', 'Acct', 'onhandqty in for loop= ' + qtySet1);
					qty_set.push(qtySet);
					
					adjustqtySet1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
					nlapiLogExecution('DEBUG', 'Acct', 'adjustqtySet in for loop= ' + adjustqtySet1);
					adjustqty_set1.push(adjustqtySet1);
					
					estSet1 = parseFloat(request.getLineItemValue('custpage_sig_req_sublist','custpage_req_estvalue',j));
					nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop= ' + estSet1);
					est_cost_set1.push(estSet1);
					
				 
					
			}
			
			UniqlineArrSubsi = removeDuplicates(lineArrSubsi1);
			//toCreate Adj Record
		  
		 
		 if(UniqlineArrSubsi != null)
		 {
			 
 // =================== Negative AdjustMent =================================================
			 
			 for (var s=0;s<UniqlineArrSubsi.length;s++)
			 {
				 var invAdj_obj = nlapiCreateRecord('inventoryadjustment');
				  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for inventoryitem = ' + invAdj_obj);
				//  var SubVl = nlapiLookupField('subsidiary',UniqlineArrSubsi[s],'internalid');
				  invAdj_obj.setFieldValue('subsidiary',UniqlineArrSubsi[s]);//custbody_createdfromtask
				  invAdj_obj.setFieldValue('account',Account);
				  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
				  // invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
		          
		       
		      	for(var j1=1;j1<=itemCount1;j1++)
		      	{
		      		  var Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j1);
		              nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location1);
		            
		              var subsiLine2 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
		            
		         
		               if(subsiLine2 == UniqlineArrSubsi[s] )
		        	  {
		            	   nlapiLogExecution('DEBUG', 'Acct', 'subsiLine1 = ' + subsiLine2 +'UniqueLine:'+UniqlineArrSubsi[s]);
		            		invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set1[j1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'item_set for inventoryitem = ' + item_set1[j1-1]);
					  		
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'location', Location1);
					  		nlapiLogExecution('DEBUG', 'Acct', 'Location for inventoryitem = ' + Location1);
					  		//invAdj_obj.setCurrentLineItemValue('inventory', 'quantityonhand', qtySet);
					  		
					  		invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNumArr1[j1-1]);
					        nlapiLogExecution('DEBUG', 'Acct', 'binNum in else if loop binNum= ' + binNumArr1[j1-1]);
					      
					    	
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', parseFloat(0-adjustqty_set1[j1-1]));
					  		nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for inventoryitem = ' + parseFloat(0-adjustqty_set1[j1-1]));
					        
					        var subrec = invAdj_obj.createCurrentLineItemSubrecord('inventory','inventorydetail');
					  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = ' + subrec);
					
					  	  subrec.selectNewLineItem('inventoryassignment');
					  	 // nlapiLogExecution('DEBUG', 'serializedinvSetIndex', serializedinvSetIndex);
					  
					  	  subrec.setCurrentLineItemValue('inventoryassignment', 'quantity', parseFloat(0-adjustqty_set1[j1-1]));
					  	 
					  	  //subrec.setCurrentLineItemValue('inventoryassignment', 'issueinventorynumber', SIMPLEARR[SIMPLE_INDEX++]);//receiptinventorynumber
					  	  
					  	  subrec.setCurrentLineItemValue('inventoryassignment', 'binnumber', binNumArr1[j1-1]);
					  
					  	  subrec.commitLineItem('inventoryassignment');//	     
					  	 
						  subrec.commit();
					        
					        
					  	
					  		//invAdj_obj.setCurrentLineItemValue('inventory', 'serialized', serialinv_set);
					  		
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set1[j1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for inventoryitem = ' + est_cost_set1[j1-1]);
					  		invAdj_obj.commitLineItem('inventory'); //commit the line item
					  
		        	  }
		      	}  
		      	 var Id = nlapiSubmitRecord(invAdj_obj);
			 }
			 
			 // ================================= Positive AdjustMent ==============================
			 for (var s1=0;s1<UniqlineArrSubsi.length;s1++)
			 {
				 var invAdj_obj = nlapiCreateRecord('inventoryadjustment');
				  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for inventoryitem = ' + invAdj_obj);
				 
				  invAdj_obj.setFieldValue('subsidiary',UniqlineArrSubsi[s1]);//custbody_createdfromtask
				  invAdj_obj.setFieldValue('account',Account);
				  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
				  // invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
		          
		       
		      	for(var l1=1;l1<=itemCount1;l1++)
		      	{
		      		  var Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',l1);
		              nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
		            
		              var subsiLine2 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
		            
		         
		               if(subsiLine2 == UniqlineArrSubsi[s1] )
		        	  {
		            	   nlapiLogExecution('DEBUG', 'Acct', 'subsiLine1 = ' + subsiLine2 +'UniqueLine:'+UniqlineArrSubsi[s1]);
		            		invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set1[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'item_set for inventoryitem = ' + item_set1[l1-1]);
					  		
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'location', lineArrLoc1[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'Location for inventoryitem = ' + lineArrLoc1[l1-1]);
					  		//invAdj_obj.setCurrentLineItemValue('inventory', 'quantityonhand', qtySet);
					  		
					  		invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNumArr1[l1-1]);
					        nlapiLogExecution('DEBUG', 'Acct', 'binNum in else if loop binNum= ' + binNum1);
					      
					    	
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', parseFloat(adjustqty_set1[l1-1]));
					  		nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for inventoryitem = ' + adjustqty_set1[l1-1]);
					        
					        var subrec = invAdj_obj.createCurrentLineItemSubrecord('inventory','inventorydetail');
					  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = ' + subrec);
					
					  	 	      subrec.selectNewLineItem('inventoryassignment');
							  	 // nlapiLogExecution('DEBUG', 'serializedinvSetIndex', serializedinvSetIndex);
							  
							  	  subrec.setCurrentLineItemValue('inventoryassignment', 'quantity', parseFloat(adjustqty_set1[l1-1]));
							  	 
							  	  
							  	  subrec.setCurrentLineItemValue('inventoryassignment', 'binnumber', binNumArr1[l1-1]);
							  
							  	  subrec.commitLineItem('inventoryassignment');//	     
						
						          subrec.commit();
					        
					        
					  	
					  		//invAdj_obj.setCurrentLineItemValue('inventory', 'serialized', serialinv_set);
					  		
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set1[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for inventoryitem = ' + est_cost_set1[l1-1]);
					  		invAdj_obj.commitLineItem('inventory'); //commit the line item
					  
		        	  }
		      	}  
		      	 var Id = nlapiSubmitRecord(invAdj_obj);
			 }
			 
			
			 response.sendRedirect('RECORD', 'inventoryadjustment', Id, false,'view');
		 }
	
		
	}
	 
	 //================================================ INVENTORY NON-BIN =====================================================
	
	else if(type == 'inventoryitem' && useBins=='F')
	{
		 nlapiLogExecution('DEBUG', 'POST Method', 'type == inventoryitem... & useBins==F ' );
		 
		    var itemSet1;
			var item_set1 = new Array();
			var qtySet1;
			var qty_set1 = new Array();
			var adjustqtySet1;
			var adjustqty_set1 = new Array();
			var estSet1;
			var est_cost_set1 = new Array();
			var chk;
			
		    var binNum1;
		    var binNumArr1=[];
		    var lineArrSubsi1 =[];
			var UniqlineArrSubsi =[];
			var lineArrLoc1 =[];
		var itemCount1 = request.getLineItemCount('custpage_sig_req_sublist');
			
			for(var j=1;j<=itemCount1;j++)
			{
				Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
		        nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location1);
		       
				//nlapiLogExecution('DEBUG', 'Acct', 'itemCount = ' + itemCount);
		        binNum1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_binnum_id',j);
		        nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   binNum= ' + binNum1);
		        binNumArr1.push(binNum1);
		        lineArrLoc1.push(Location1);
		        
		       var subsiLine1 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
				
		       lineArrSubsi1.push(subsiLine1);
		        
		            itemSet1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',j);
					nlapiLogExecution('DEBUG', 'Acct', 'itemSet in for loop= ' + itemSet1);
					item_set1.push(itemSet1);
					
					qtySet1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
					nlapiLogExecution('DEBUG', 'Acct', 'onhandqty in for loop= ' + qtySet1);
					qty_set.push(qtySet);
					
					adjustqtySet1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
					nlapiLogExecution('DEBUG', 'Acct', 'adjustqtySet in for loop= ' + adjustqtySet1);
					adjustqty_set1.push(adjustqtySet1);
					
					estSet1 = parseFloat(request.getLineItemValue('custpage_sig_req_sublist','custpage_req_estvalue',j));
					nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop= ' + estSet);
					est_cost_set1.push(estSet1);
					
				 
					
			}
			
			UniqlineArrSubsi = removeDuplicates(lineArrSubsi1);
			//toCreate Adj Record
		  
		 
		 if(UniqlineArrSubsi != null)
		 {
			 
			 // ================== Negative AdjustMent ===================================
			 for (var s=0;s<UniqlineArrSubsi.length;s++)
			 {
				 var invAdj_obj = nlapiCreateRecord('inventoryadjustment');
				  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for inventoryitem = ' + invAdj_obj);
				//  var SubVl = nlapiLookupField('subsidiary',UniqlineArrSubsi[s],'internalid');
				  invAdj_obj.setFieldValue('subsidiary',UniqlineArrSubsi[s]);//custbody_createdfromtask
				  invAdj_obj.setFieldValue('account',Account);
				  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
				  // invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
		          
		       
		      	for(var j1=1;j1<=itemCount1;j1++)
		      	{
		      		  var Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j1);
		              nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location1);
		            
		              var subsiLine2 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
		            
		         
		               if(subsiLine2 == UniqlineArrSubsi[s] )
		        	  {
		            	   nlapiLogExecution('DEBUG', 'Acct', 'subsiLine1 = ' + subsiLine2 +'UniqueLine:'+UniqlineArrSubsi[s]);
		            		invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set1[j1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'item_set for inventoryitem = ' + item_set1[j1-1]);
					  		
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'location', Location1);
					  		nlapiLogExecution('DEBUG', 'Acct', 'Location for inventoryitem = ' + Location1);
					  		//invAdj_obj.setCurrentLineItemValue('inventory', 'quantityonhand', qtySet);
					  		
					  		invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNumArr1[j1-1]);
					        nlapiLogExecution('DEBUG', 'Acct', 'binNum in else if loop binNum= ' + binNum1);
					      
					    	
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', parseFloat(0-adjustqty_set1[j1-1]));
					  		nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for inventoryitem = ' + adjustqty_set1[j1-1]);
					        
						
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set1[j1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for inventoryitem = ' + est_cost_set1[j1-1]);
					  		invAdj_obj.commitLineItem('inventory'); //commit the line item
					  
		        	  }
		      	}  
		      	 var Id = nlapiSubmitRecord(invAdj_obj);
			 }
			 
			 // ===================== PositiVe AdjustMent ============================================
			 for (var s1=0;s1<UniqlineArrSubsi.length;s1++)
			 {
				 var invAdj_obj = nlapiCreateRecord('inventoryadjustment');
				  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for inventoryitem = ' + invAdj_obj);
				 
				  invAdj_obj.setFieldValue('subsidiary',UniqlineArrSubsi[s1]);//custbody_createdfromtask
				  invAdj_obj.setFieldValue('account',Account);
				  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
				  // invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
		          
		       
		      	for(var l1=1;l1<=itemCount1;l1++)
		      	{
		      		  var Location1 = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',l1);
		              nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
		            
		              var subsiLine2 = nlapiLookupField('location',Location1,'custrecord_esm_location_subsidiary');
		            
		         
		               if(subsiLine2 == UniqlineArrSubsi[s1] )
		        	  {
		            	   nlapiLogExecution('DEBUG', 'Acct', 'subsiLine1 = ' + subsiLine2 +'UniqueLine:'+UniqlineArrSubsi[s1]);
		            		invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set1[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'item_set for inventoryitem = ' + item_set1[l1-1]);
					  		
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'location', lineArrLoc1[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'Location for inventoryitem = ' + lineArrLoc1[l1-1]);
					  		//invAdj_obj.setCurrentLineItemValue('inventory', 'quantityonhand', qtySet);
					  		
					  		invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNumArr1[l1-1]);
					        nlapiLogExecution('DEBUG', 'Acct', 'binNum in else if loop binNum= ' + binNum1);
					      
					    	
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', parseFloat(adjustqty_set1[l1-1]));
					  		nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for inventoryitem = ' + adjustqty_set1[l1-1]);
					    	
					  		invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set1[l1-1]);
					  		nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for inventoryitem = ' + est_cost_set1[l1-1]);
					  		invAdj_obj.commitLineItem('inventory'); //commit the line item
					  
		        	  }
		      	}  
		      	 var Id = nlapiSubmitRecord(invAdj_obj);
			 }
			 
			 response.sendRedirect('RECORD', 'inventoryadjustment', Id, false,'view');
			
		 }
	
		
	}
	 //======================================END NON-BIN INVENTORY===========================================================================================
 }
 url="https://system.netsuite.com/app/accounting/transactions/invadjst.nl?id='"+Id+"'";
 response.write('<html><body><script type="text/javascript"> window.onunload = function(e){window.opener.location.reload();}; window.close();</script></body></html>'); 
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
		
	
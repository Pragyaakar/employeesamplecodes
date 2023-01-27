var todaydate = new Date();
var locationMap = {};
function InventoryAdjustmentSuitelet(request, response)
{
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
	   Date.setDefaultValue(nlapiDateToString(todaydate));
	   Date.setLayoutType('normal','startcol');
	   Date.setMandatory( true );
	   var msg = "In case to reduce inventory please tick the Reduce Inventory check box";
	   form.setScript('customscript_serial_num_serach');
	   form.addField('custpage_subsidiary','select', 'Subsidiary','subsidiary').setMandatory( true );//.setDefaultValue(record.getValue('subsidiary'));
	   nlapiLogExecution('DEBUG', 'qtyonhand2', 'qtyonhand = ' + qtyonhand);
		  var itemtype = form.addField('custpage_itemtype','text','Item Type').setDefaultValue(type);
		  form.getField('custpage_itemtype').setDisplayType('inline');
		  
		   form.addField('custpage_account','select', 'Adjustment Account','account').setMandatory( true );
		 
		   form.addField('custpage_checkbox','checkbox', 'Reduce Inventory');
		   form.addField('custpage_info','text',' ').setDefaultValue(msg);
		   form.getField('custpage_info').setDisplayType('inline');
			
          form.addField('custpage_adjsnote','textarea','Inventory Adjustment Note').setMandatory( true );
	   
	   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Item','custpage_sample_tab');
	   nlapiLogExecution('DEBUG', 'qtyonhand3', 'qtyonhand = ' + qtyonhand);
	   ItemSublist.addField('custpage_item','select','Item','item').setDisplayType('disabled');
	  var locationColumn = ItemSublist.addField('custpage_location', 'select', 'Location','location');
	  
	  
	  var loc =  nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_location',1);
	  nlapiLogExecution('DEBUG', 'qtyonhand', 'loc  = ' + loc);
	   
	   var binSelect=ItemSublist.addField('custpage_binnum', 'select', 'Bin Number');
	   
       form.setScript('customscript2526');
	  
      /* var searchresults = nlapiSearchRecord("item",'customsearch_item_serial_num_search',
				 [
				    ["isspecialorderitem","is","F"], 
				    "AND", 
				    ["isinactive","is","F"], 
				    "AND", 
				    ["type","anyof","Group","Kit","InvtPart"], 
				    "AND", 
				    ["internalid","anyof",id]
				  
				 ], 
				 [
				    new nlobjSearchColumn("itemid",null,"GROUP").setSort(false), 
				    new nlobjSearchColumn("type",null,"GROUP"), 
				    new nlobjSearchColumn("binnumber","inventoryDetail","MAX"), 
				    new nlobjSearchColumn("inventorynumber","inventoryDetail","GROUP"), 
				    new nlobjSearchColumn("quantity","inventoryDetail","GROUP"), 
				    new nlobjSearchColumn("location","inventoryDetail","GROUP")
				 ]
				 );*/
		 /* alert('searchresults length'+searchresults.length);
		 if (searchresults != null)
		 {
			 for(var k=0;k<searchresults.length;k++)
				{	
					 binSelect.addSelectOption(searchresults[k].getValue('internalid'), searchresults[k].getValue("binnumber","inventoryDetail","MAX")) 
				}
		 }*/
	   ItemSublist.addField('custpage_onhandqty', 'float', 'On hand' ).setDisplayType('disabled');//
	   ItemSublist.addField('custpage_req_adjustqty', 'integer', 'Adjust Quantity By').setDisplayType('entry');
	   ItemSublist.addField('custpage_serialinvt','textarea', 'Serialized Inventory').setDisplayType('entry');
	   ItemSublist.addField('custpage_req_estvalue', 'float', 'Estimated Value').setDisplayType('entry');
	  
	   // Saved Search
	   if(useBins == 'T'){
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
		   for (var serializedinventoryitemSearchIndex = 0; serializedinventoryitemSearchIndex < serializedinventoryitemSearch.length; serializedinventoryitemSearchIndex++) 
		   {
				 
			   var qtyAvailable = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("quantityavailable","inventoryNumberBinOnHand",null));
				   var binNumber = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null));
				   var binNumberText = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null));
				   var binNumber = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("binnumber","inventoryNumberBinOnHand",null));
				   var inventoryNumber = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("inventorynumber","inventoryNumberBinOnHand",null));
				   var location_ = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("location","inventoryNumberBinOnHand",null));
				   var location_Text = serializedinventoryitemSearch[serializedinventoryitemSearchIndex].getText(new nlobjSearchColumn("location","inventoryNumberBinOnHand",null));
				   nlapiLogExecution('AUDIT', 'qtyAvailable:'+qtyAvailable+',binNumber:'+binNumber, 'binNumberText:'+binNumberText+',inventoryNumber:'+inventoryNumber+',location_:'+location_+',location_Text:'+location_Text);
				 
			   nlapiLogExecution('AUDIT', '1', '');
			   ItemSublist.setLineItemValue('custpage_item',serializedinventoryitemSearchIndex+1,id); nlapiLogExecution('AUDIT', '2', '');
			   ItemSublist.setLineItemValue('custpage_onhandqty',serializedinventoryitemSearchIndex+1,(qtyAvailable ? parseFloat(qtyAvailable) : qtyAvailable)); nlapiLogExecution('AUDIT', '3', '');
			ItemSublist.setLineItemValue('custpage_serialinvt',serializedinventoryitemSearchIndex+1,inventoryNumber); nlapiLogExecution('AUDIT', '4', '');
			
			ItemSublist.setLineItemValue('custpage_location',serializedinventoryitemSearchIndex+1,location_); nlapiLogExecution('AUDIT', '5', '');
			   ItemSublist.setLineItemValue('custpage_binnum',serializedinventoryitemSearchIndex+1,binNumber); nlapiLogExecution('AUDIT', '6', '');
			ItemSublist.setLineItemValue('custpage_serialinvt',serializedinventoryitemSearchIndex+1,inventoryNumber); nlapiLogExecution('AUDIT', '7', '');
		}
		   
	   
	   nlapiLogExecution('AUDIT', 'totalOnHand:'+totalOnHand, 'inventoryNumbers:'+inventoryNumbers)
	 
	   }
	   }
	   else if(useBins == 'F'){
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
				  var location_= serializedinventoryitemSearch1[serializedinventoryitemSearchIndex].getValue(new nlobjSearchColumn("location","inventoryNumber",null));
				  nlapiLogExecution('AUDIT', 'itemId:'+itemId+',availableQty:'+availableQty, 'inventoryNumber:'+inventoryNumber+',location_:'+location_);
				ItemSublist.setLineItemValue('custpage_item',serializedinventoryitemSearchIndex+1,id); nlapiLogExecution('AUDIT', '2', '');
				ItemSublist.setLineItemValue('custpage_onhandqty',serializedinventoryitemSearchIndex+1,(availableQty ? parseFloat(availableQty) : availableQty)); nlapiLogExecution('AUDIT', '3', '');
				ItemSublist.setLineItemValue('custpage_serialinvt',serializedinventoryitemSearchIndex+1,inventoryNumber); nlapiLogExecution('AUDIT', '4', '');
				ItemSublist.setLineItemValue('custpage_location',serializedinventoryitemSearchIndex+1,location_); nlapiLogExecution('AUDIT', '5', '');
				
				
			}
		   }
	   }
	   
	   form.addSubmitButton('Submit');
	   response.writePage(form);
   }
   //==================================== Changes made from here ===============================================================
   
   
   if(type == 'inventoryitem')
   {
	   var Est_Cost = 0;
	   var lineId = 0;
	   var adjustqtySet = 0;
	   
	   var qtyonhand = nlapiLookupField(type,id, 'quantityavailable');
	   nlapiLogExecution('DEBUG', 'qtyonhand', 'qtyonhand = ' + qtyonhand);
	   //var qtyonhand=record.getValue('quantityonhand');
	   var location;
	   var form = nlapiCreateForm('Inventory Adjustment');
	   var Date=form.addField('custpage_datefield','date', 'Date');
	   Date.setDefaultValue(nlapiDateToString(todaydate));
	   Date.setLayoutType('normal','startcol');
	   Date.setMandatory( true );
	   var msg = "In case to reduce inventory please tick the Reduce Inventory check box";
	   form.setScript('customscript_serial_num_serach');
	   form.addField('custpage_subsidiary','select', 'Subsidiary','subsidiary').setMandatory( true );//.setDefaultValue(record.getValue('subsidiary'));
	   //Subsidiary.setMandatory( true );
	   //var Account=
		  var itemtype = form.addField('custpage_itemtype','text','Item Type').setDefaultValue(type);
		  form.getField('custpage_itemtype').setDisplayType('inline');
		  
		   form.addField('custpage_account','select', 'Adjustment Account','account').setMandatory( true );
		   //form.addField('custpage_req_location','select','Location','location').setMandatory( true );
		   form.addField('custpage_checkbox','checkbox', 'Reduce Inventory');
		   form.addField('custpage_info','text',' ').setDefaultValue(msg);
		   form.getField('custpage_info').setDisplayType('inline');
			
          form.addField('custpage_adjsnote','textarea','Inventory Adjustment Note').setMandatory( true );
	   //Account.setMandatory( true );
	   //var ItemTab = form.addSubList('custpage_itemsublist', 'list', 'Items');
	   var ItemSublist = form.addSubList('custpage_sig_req_sublist','list', 'Item','custpage_sample_tab');
	   
	   ItemSublist.addField('custpage_item','select','Item','item').setDisplayType('disabled');//.setDisplayType('disabled');
	   ItemSublist.addField('custpage_location', 'select', 'Location','location');
	   
	   var binSelect=ItemSublist.addField('custpage_binnum', 'select', 'Bin Number');
	   binSelect.addSelectOption('','');
       form.setScript('customscript2526');//customscript2526
	  
       var searchresults = nlapiSearchRecord("item",'customsearch_item_serial_num_search',
				 [
				    ["isspecialorderitem","is","F"], 
				    "AND", 
				    ["isinactive","is","F"], 
				    "AND", 
				    ["type","anyof","Group","Kit","InvtPart"], 
				    "AND", 
				    ["internalid","anyof",id]
				  /*  "AND", 
				    ["inventorydetail.location","anyof",loc]*/
				 ], 
				 [
				    new nlobjSearchColumn("itemid",null,"GROUP").setSort(false), 
				    new nlobjSearchColumn("type",null,"GROUP"), 
				    new nlobjSearchColumn("binnumber","inventoryDetail","MAX"), 
				    new nlobjSearchColumn("inventorynumber","inventoryDetail","GROUP"), 
				    new nlobjSearchColumn("quantity","inventoryDetail","GROUP"), 
				    new nlobjSearchColumn("location","inventoryDetail","GROUP")
				 ]
				 );
		 
		 
		 
		 
		// var searchresults = nlapiSearchRecord('item','customsearch_wmsse_inv_report',filters,columns);
		 alert('searchresults length'+searchresults.length);
		 if (searchresults != null)
		 {
			 for(var k=0;k<searchresults.length;k++)
				{	
					//alert('searchresults length'+searchresults.length);
					//var serialNum;
					//serialNum = searchresults[k].getValue("inventorynumber","inventoryDetail","GROUP");
					//alert('serialNum in for loop = ' + serialNum);
					//InvNumber.push(serialNum);
				//	var s = InvNumber.toString();
					
					//binNum = searchresults[k].getValue("binnumber","inventoryDetail","GROUP");
					// alert('binNum in for loop = ' + binNum);
				//	nlapiAddSelectOption('custpage_sig_req_sublist', 'custpage_binnum',searchresults[k].getId(),searchresults[k].getValue("binnumber","inventoryDetail","GROUP"));
					//nlapiSetCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',binNum);
					 binSelect.addSelectOption(searchresults[k].getValue('internalid'), searchresults[k].getValue("binnumber","inventoryDetail","MAX")) 
					// nlapiInsertLineItemOption('custpage_sig_req_sublist', 'custpage_binnum',searchresults[k].getValue('internalid'),searchresults[k].getValue("binnumber","inventoryDetail","GROUP"));

				}
		 }
	   ItemSublist.addField('custpage_onhandqty', 'float', 'On hand' ).setDisplayType('disabled');//
	   ItemSublist.addField('custpage_req_adjustqty', 'integer', 'Adjust Quantity By').setDisplayType('entry');
	 //  ItemSublist.addField('custpage_serialinvt','textarea', 'Serialized Inventory').setDisplayType('entry');
	   ItemSublist.addField('custpage_req_estvalue', 'float', 'Estimated Value').setDisplayType('entry');
	  
	   for (var i = 1; i <= 1; i++) 
	   {
		   ItemSublist.setLineItemValue('custpage_item',i,id);
		   ItemSublist.setLineItemValue('custpage_onhandqty',i,qtyonhand);
	   	   ItemSublist.setLineItemValue('custpage_estcost',i,Est_Cost);
	   	   ItemSublist.setLineItemValue('custpage_adjustqty',i,adjustqtySet);
	   	   //ItemSublist.setLineItemValue('custpage_lineid',i,lineId[i-1]);
	   }
	   //var winopen = window.opener;
	   //window.opener.nlapiGetFieldValue('custpage_sig_req_sublist','custpage_location',1);
	   //nlapiLogExecution('Debug', 'winopen.'+winopen);
	   
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
   /* var locationArr = new Array();
    var subsidiaryArr = new Array();*/
	//----code to get the values
	
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
   
	itemCount = request.getLineItemCount('custpage_sig_req_sublist');
	var locationJSON = {};
	for(var j=1;j<=itemCount;j++)
	{
		Location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
        nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
       
		//nlapiLogExecution('DEBUG', 'Acct', 'itemCount = ' + itemCount);
        binNum = request.getLineItemValue('custpage_sig_req_sublist','custpage_binnum',j);
        nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   binNum= ' + binNum);
      
		//chk = request.getLineItemValue('custpage_checkbox','custpage_checkbox',j);
		//nlapiLogExecution('DEBUG', 'Acct', 'chk = ' + chk);
		/*if(chk == "T" || chk == null)
		{*/
			itemSet = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',j);
			nlapiLogExecution('DEBUG', 'Acct', 'itemSet in for loop= ' + itemSet);
			item_set.push(itemSet);
			
			qtySet = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
			nlapiLogExecution('DEBUG', 'Acct', 'onhandqty in for loop= ' + qtySet);
			qty_set.push(qtySet);
			
			adjustqtySet = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
			nlapiLogExecution('DEBUG', 'Acct', 'adjustqtySet in for loop= ' + adjustqtySet);
			adjustqty_set.push(adjustqtySet);
			
			estSet = parseFloat(request.getLineItemValue('custpage_sig_req_sublist','custpage_req_estvalue',j));
			nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop= ' + estSet);
			est_cost_set.push(estSet);
			
		    serializedinvSet  = request.getLineItemValue('custpage_sig_req_sublist','custpage_serialinvt',j);
			nlapiLogExecution('DEBUG', 'Acct', 'serializedinvSet in for loop = ' + serializedinvSet);
			serialinv_set.push(serializedinvSet);
			nlapiLogExecution('DEBUG', 'Acct', 'serialinv_set in for loop = ' + serialinv_set);
		//}
			 if(locationJSON[Location]){
		        	var temp={};
		        	temp = locationJSON[Location];
		        	temp['qtySet'] += parseFloat(qtySet);
		        	var seriallizeArr=  temp['serializedinvSet'];
		        	seriallizeArr.push(serializedinvSet);
		        	
		        	var binArr = temp['binNum'];
		        	binArr.push(binNum);
		        	
		        	var binQtyArr = temp['binQty'];
		        	binQtyArr.push(parseFloat(qtySet))
		        }
		        else{
		        	var temp={};
		        	temp['binNum'] = [binNum];
		        	temp['itemSet'] = itemSet;
		        	temp['qtySet'] = parseFloat(qtySet);
		        	temp['binQty'] = [parseFloat(qtySet)];
		        	temp['adjustqtySet'] = adjustqtySet;
		        	temp['estSet'] = estSet;
		        	temp['serializedinvSet'] = [serializedinvSet];
		        	locationJSON[Location]=temp;
		        }
			 nlapiLogExecution('DEBUG', 'locationJSON', JSON.stringify(locationJSON));
	}
	
	//toCreate Adj Record
  
	if(type == 'serializedinventoryitem')
	{
		getLocation1();
		var secondInvAdjustment=false;
		for(var adjustInvIndex=0;adjustInvIndex<=1;adjustInvIndex++){
			if(adjustInvIndex == 1)
				{
				secondInvAdjustment = true;
				}
	  nlapiLogExecution('DEBUG', 'Acct', 'type for serialized = ' + type);
	  
	  
	  var invAdj_obj = nlapiCreateRecord('inventoryadjustment',{recordmode: 'dynamic'});
	  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for serialized = ' + invAdj_obj);
	  
	  invAdj_obj.setFieldValue('subsidiary',subs);
	  invAdj_obj.setFieldValue('account',Account);
	  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
	  
	  //to set line item value
	 var locations = Object.keys(locationJSON);
	 for ( var locationsIndex in locations) {
		var tempLocation =  locations[locationsIndex];
		var temp = {};
		temp = locationJSON[tempLocation];
		var binNum = temp['binNum'];
		var itemSet = temp['itemSet'];
		var qtySet = temp['qtySet'];
		var adjustqtySet = temp['adjustqtySet'];
		var estSet = temp['estSet'];
		var binQty = temp['binQty'];
		 var serializedinvSet = temp['serializedinvSet'] 
	
	  invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
	  
	  invAdj_obj.setCurrentLineItemValue('inventory', 'item', itemSet);
	  nlapiLogExecution('DEBUG', 'Acct', 'item_set for serialized = ' + itemSet);
	  
	  invAdj_obj.setCurrentLineItemValue('inventory', 'location', tempLocation);
	  nlapiLogExecution('DEBUG', 'Acct', 'Location for serialized = ' + tempLocation);
	  
	  invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',j);
      nlapiLogExecution('DEBUG', 'Acct', 'binNum in for loop binNum= ' + binNum);
	  
	 // invAdj.setCurrentLineItemValue('inventoryassignment', 'quantityonhand', qtySet);
      
      if(secondInvAdjustment == false){
    	  adjustqtySet = 0-adjustqtySet;
      }
	  invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', adjustqtySet);
	  nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for serialized = ' + adjustqtySet);
	  
      var subrec = invAdj_obj.createCurrentLineItemSubrecord('inventory','inventorydetail');
	  //nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = ' + subrec);
	  
	  subrec.selectNewLineItem('inventoryassignment');
	  subrec.setCurrentLineItemValue('inventoryassignment', 'receiptinventorynumber', serializedinvSet);//receiptinventorynumber
	  subrec.setCurrentLineItemValue('inventoryassignment', 'quantity', adjustqtySet);
	  nlapiLogExecution('DEBUG', 'Acct', 'subrec serialinv_set for serialized = ' + serialinv_set);
	  subrec.commitLineItem('inventoryassignment');//	     
	  subrec.commit();
      
      
	 // invAdj.setCurrentLineItemValue('inventoryassignment', 'serialized', serialinv_set);
	  invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', estSet);
	  nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for serialized = ' + estSet);
	  
	
	  var subrec = nlapiCreateCurrentLineItemSubrecord('inventory','inventorydetail');
	  
	  for ( var serializedinvSetIndex in serializedinvSet) {
		  var serializedinvSetValue = serializedinvSet[serializedinvSetIndex];
		 var binQtyValue =  binQty[serializedinvSetIndex];
		 var binValue = binNum[serializedinvSetIndex]
	  subrec.selectNewLineItem('inventoryassignment');
	  subrec.setCurrentLineItemValue('inventoryassignment', 'receiptinventorynumber',serializedinvSetValue);
	  subrec.setCurrentLineItemValue('inventoryassignment', 'binnumber', binValue);
	  subrec.setCurrentLineItemValue('inventoryassignment', 'quantity', binQtyValue);
	  subrec.commitLine('inventoryassignment');
      createCurrentLineItemSubrecord('item', 'inventorydetail');
      
      
	    
	  invAdj_obj.commitLineItem('inventory'); //commit the line item
	  }
	 }
	  var Id = nlapiSubmitRecord(invAdj_obj);
		}
	 }
	else if(type == 'inventoryitem')
	{
		  var invAdj_obj = nlapiCreateRecord('inventoryadjustment');
		  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for inventoryitem = ' + invAdj_obj);
		  invAdj_obj.setFieldValue('subsidiary',subs);//custbody_createdfromtask
		  invAdj_obj.setFieldValue('account',Account);
          invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
		  //invAdj_obj.setFieldValue('location',Location);
		  //invAdj_obj.setFieldValue('serialized',serializedinvSet);
		  
		  //to set line item value
		  //for(var a=1;a<=item_set.length;a++)
			  
			  		invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
			  		invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set);
			  		nlapiLogExecution('DEBUG', 'Acct', 'item_set for inventoryitem = ' + item_set);
			  		
			  		invAdj_obj.setCurrentLineItemValue('inventory', 'location', Location);
			  		nlapiLogExecution('DEBUG', 'Acct', 'Location for inventoryitem = ' + Location);
			  		//invAdj_obj.setCurrentLineItemValue('inventory', 'quantityonhand', qtySet);
			  		
			  		invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',j);
			        nlapiLogExecution('DEBUG', 'Acct', 'binNum in else if loop binNum= ' + binNum);
			      
			  		
			  		invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', adjustqty_set);
			  		nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for inventoryitem = ' + adjustqty_set);
			  		//invAdj_obj.setCurrentLineItemValue('inventory', 'serialized', serialinv_set);
			  		
			  		invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set);
			  		nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for inventoryitem = ' + est_cost_set);
			  		invAdj_obj.commitLineItem('inventory'); //commit the line item
			  
		 var Id = nlapiSubmitRecord(invAdj_obj);
		
	}
 }
 url="https://system.netsuite.com/app/accounting/transactions/invadjst.nl?id='"+Id+"'";
 response.write('<html><body><script type="text/javascript"> window.onunload = function(e){window.opener.location.reload();}; window.close();</script></body></html>'); 
} 
function getLocation1(){

	var locationSearch = nlapiSearchRecord("location",null,
			[
			], 
			[
			   new nlobjSearchColumn("name").setSort(false), 
			   new nlobjSearchColumn("phone"), 
			   new nlobjSearchColumn("city"), 
			   new nlobjSearchColumn("state"), 
			   new nlobjSearchColumn("country"), 
			   new nlobjSearchColumn("subsidiary"), 
			   new nlobjSearchColumn("custrecord_esm_location_subsidiary"), 
			   new nlobjSearchColumn("custrecord_esm_virtual_inspection_wareho")
			]
			);
	if(locationSearch != null && locationSearch != undefined && locationSearch != ''){
		
		for (var locationSearchIndex = 0; locationSearchIndex < locationSearch.length; locationSearchIndex++) {
			var subsidiary_ = locationSearch[locationSearchIndex].getValue(new nlobjSearchColumn("subsidiary"));
			var locationId = locationSearch[locationSearchIndex].getId();
			
			locationMap[locationId]= subsidiary_;
		}
	}
}
function getLocation(locationId){
	return locationMap.locationId;
}
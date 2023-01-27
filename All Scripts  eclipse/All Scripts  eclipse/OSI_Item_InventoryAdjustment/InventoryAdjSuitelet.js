var todaydate = new Date();

function InventoryAdjustmentSuitelet(request, response)
{
 if ( request.getMethod() == 'GET' )
 {
   var id = request.getParameter('itemid');
   nlapiLogExecution('DEBUG', 'id', 'id = ' + id);
   var type = request.getParameter('itemtype');
   nlapiLogExecution('DEBUG', 'type', 'type = ' + type);
  
   
   if(type == 'inventoryitem' || type == 'serializedinventoryitem' || type == 'lotnumberedinventoryitem')
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
       form.setScript('customscript2526');//customscript2526
	  
		var filters =[];
		filters[0]= new nlobjSearchFilter('isinactive', null, 'is', 'F');
		//filters[1]= new nlobjSearchFilter('location', null, 'is', location);
		filters[1]= new nlobjSearchFilter('internalid', null, 'is', id);
		var binSearch = nlapiCreateSearch('item', filters, new nlobjSearchColumn('binnumber'));
		var binSearchResults = binSearch.runSearch();	
		var binResultIndex = 0; 
		var binResultStep = 1000; 
		var binResultSet; 
	    var binOption = new Array();
		do 
		{
			binResultSet = binSearchResults.getResults(binResultIndex, binResultIndex + binResultStep);
		
			binResultIndex = binResultIndex + binResultStep;
	        if(binResultSet.length>0)
	        	binOption = binOption.concat(binResultSet);
			
		} while (binResultSet.length > 0); 
		
		binSelect.addSelectOption('','');
		for(var i=0; i<binOption.length; i++)
        {
			var id = binOption[i].getId();
	        var name = binOption[i].getValue('binnumber');
          nlapiLogExecution('DEBUG','SaveSearch','Bin Name =='+name)
	        binSelect.addSelectOption(id,name);
		}
	   
	   ItemSublist.addField('custpage_onhandqty', 'float', 'On hand' ).setDisplayType('disabled');//
	   ItemSublist.addField('custpage_req_adjustqty', 'integer', 'Adjust Quantity By').setDisplayType('entry');
	   ItemSublist.addField('custpage_serialinvt','textarea', 'Serialized Inventory').setDisplayType('entry');
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
	for(var j=1;j<=itemCount;j++)
	{
		Location = request.getLineItemValue('custpage_sig_req_sublist','custpage_location',j);
        nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   Location= ' + Location);
        
		//nlapiLogExecution('DEBUG', 'Acct', 'itemCount = ' + itemCount);
        binNum = request.getLineItemValue('custpage_sig_req_sublist','custpage_binnum',j);
        nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop   binNum= ' + binNum);
      
		//chk = request.getLineItemValue('custpage_checkbox','custpage_checkbox',j);
		//nlapiLogExecution('DEBUG', 'Acct', 'chk = ' + chk);
		if(chk == "T" || chk == null)
		{
			itemSet = request.getLineItemValue('custpage_sig_req_sublist','custpage_item',j);
			nlapiLogExecution('DEBUG', 'Acct', 'itemSet in for loop= ' + itemSet);
			item_set.push(itemSet);
			
			qtySet = request.getLineItemValue('custpage_sig_req_sublist','custpage_onhandqty',j);
			nlapiLogExecution('DEBUG', 'Acct', 'onhandqty in for loop= ' + qtySet);
			qty_set.push(qtySet);
			
			adjustqtySet = request.getLineItemValue('custpage_sig_req_sublist','custpage_req_adjustqty',j);
			nlapiLogExecution('DEBUG', 'Acct', 'adjustqtySet in for loop= ' + adjustqtySet);
			adjustqty_set.push(adjustqtySet);
			
			estSet = parseFloat(request.getLineItemValue('custpage_sig_req_sublist','custpage_req_estvalue',j));
			nlapiLogExecution('DEBUG', 'Acct', 'estSet in for loop= ' + estSet);
			est_cost_set.push(estSet);
			
		    serializedinvSet  = request.getLineItemValue('custpage_sig_req_sublist','custpage_serialinvt',j);
			nlapiLogExecution('DEBUG', 'Acct', 'serializedinvSet in for loop = ' + serializedinvSet);
			serialinv_set.push(serializedinvSet);
			nlapiLogExecution('DEBUG', 'Acct', 'serialinv_set in for loop = ' + serialinv_set);
		}
		
	}
	
	//toCreate Adj Record
  
	if(type == 'serializedinventoryitem')
	{
	  
	  nlapiLogExecution('DEBUG', 'Acct', 'type for serialized = ' + type);
	  
	  
	  var invAdj_obj = nlapiCreateRecord('inventoryadjustment');
	  nlapiLogExecution('DEBUG', 'Acct', 'invAdj_obj for serialized = ' + invAdj_obj);
	  
	  invAdj_obj.setFieldValue('subsidiary',subs);
	  invAdj_obj.setFieldValue('account',Account);
	  invAdj_obj.setFieldValue('custbody_inventory_adjustment_note',InvtAdjNote);
	  
	  //to set line item value
	 
	  invAdj_obj.selectNewLineItem('inventory');//adjustqtyby item  unitcost location
	  invAdj_obj.setCurrentLineItemValue('inventory', 'item', item_set);
	  nlapiLogExecution('DEBUG', 'Acct', 'item_set for serialized = ' + item_set);
	  
	  invAdj_obj.setCurrentLineItemValue('inventory', 'location', Location);
	  nlapiLogExecution('DEBUG', 'Acct', 'Location for serialized = ' + Location);
	  
	  invAdj_obj.setCurrentLineItemValue('custpage_sig_req_sublist','custpage_binnum',j);
      nlapiLogExecution('DEBUG', 'Acct', 'binNum in for loop binNum= ' + binNum);
	  
	 // invAdj.setCurrentLineItemValue('inventoryassignment', 'quantityonhand', qtySet);
	  invAdj_obj.setCurrentLineItemValue('inventory', 'adjustqtyby', adjustqty_set);
	  nlapiLogExecution('DEBUG', 'Acct', 'adjustqty_set for serialized = ' + adjustqty_set);
	  
      var subrec = invAdj_obj.createCurrentLineItemSubrecord('inventory','inventorydetail');
	  //nlapiLogExecution('DEBUG', 'Acct', 'subrec for serialized = ' + subrec);
	  
	  subrec.selectNewLineItem('inventoryassignment');
	  subrec.setCurrentLineItemValue('inventoryassignment', 'receiptinventorynumber', serialinv_set);//receiptinventorynumber
	  subrec.setCurrentLineItemValue('inventoryassignment', 'quantity', adjustqty_set);
	  nlapiLogExecution('DEBUG', 'Acct', 'subrec serialinv_set for serialized = ' + serialinv_set);
	  subrec.commitLineItem('inventoryassignment');//	     
	  subrec.commit();
      
      
	 // invAdj.setCurrentLineItemValue('inventoryassignment', 'serialized', serialinv_set);
	  invAdj_obj.setCurrentLineItemValue('inventory', 'unitcost', est_cost_set);
	  nlapiLogExecution('DEBUG', 'Acct', 'est_cost_set for serialized = ' + est_cost_set);
	  
	
	/*  var subrec = nlapiCreateCurrentLineItemSubrecord('inventory','inventorydetail');
	  
	  subrec.selectNewLineItem('inventoryassignment');
	  subrec.setCurrentLineItemValue('inventoryassignment', 'receiptinventorynumber'+serialinv_set);
	 // subrec.setCurrentLineItemValue('inventoryassignment', 'serialized', serialinv_set);
	  //subrec.setCurrentLineItemValue('inventoryassignment', 'unitcost', est_cost_set);
	  subrec.commitLine('inventoryassignment');
      createCurrentLineItemSubrecord('item', 'inventorydetail');
      
      */
	    
	  invAdj_obj.commitLineItem('inventory'); //commit the line item
		  
	  var Id = nlapiSubmitRecord(invAdj_obj);
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
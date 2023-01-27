function suitelet_woToTrnafINV(request, response)
{
	if(request.getMethod() == 'GET')
	{
		var itemArr = new Array();
		var bomQtyArr = new Array();
		var QtyArr = new Array();
		var UnitsArr = new Array();
		var Balance_StoreQtyArr = new Array();
		var Balance_AssemblyQtyArr = new Array();
		var quantity_BackOrderArr = new Array();
		
		var recId = request.getParameter('wo_ID');
		var recType = request.getParameter('wo_type');
		
		var recObj = nlapiLoadRecord(recType,recId);
		nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + recId +" type :"+recType+" Record :"+recObj);
		
		var woCustomer = recObj.getFieldValue('entity');
		nlapiLogExecution('DEBUG', 'aftr submit', "  woCustomer  ==" + woCustomer);
		
		var woDate = recObj.getFieldValue('trandate');
		nlapiLogExecution('DEBUG', 'aftr submit', "  woDate  ==" + woDate);
		
		var woNum = recObj.getFieldValue('tranid');
		nlapiLogExecution('DEBUG', 'aftr submit', "  woNum  ==" + woNum);
		
		var wo_FromStore = recObj.getFieldValue('custbody_wo_from_store');
		nlapiLogExecution('DEBUG', 'aftr submit', "  wo_FromStore  ==" + wo_FromStore);
		
		var wo_ToStore = recObj.getFieldValue('custbody_wo_to_store');
		nlapiLogExecution('DEBUG', 'aftr submit', "  wo_ToStore  ==" + wo_ToStore);
		
		var subsidiary = recObj.getFieldValue('subsidiary');
		nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiary  ==" + subsidiary);
		
		var deparment = recObj.getFieldValue('department');
		nlapiLogExecution('DEBUG', 'aftr submit', "  deparment  ==" + deparment);
		
		var woClass = recObj.getFieldValue('class');
		nlapiLogExecution('DEBUG', 'aftr submit', "  woClass  ==" + woClass);
		
		var woLocation = recObj.getFieldValue('location');
		nlapiLogExecution('DEBUG', 'aftr submit', "  woLocation  ==" + woLocation);
		
		var WOLineCount = recObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG', 'aftr submit', "  WOLineCount  ==" + WOLineCount);
		
		for(var i=1;i<=WOLineCount;i++)
		{
			var item = recObj.getLineItemValue('item','item',i);
			itemArr.push(item);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  item  ==" + item);
        	
        	var BOM_Qty = recObj.getLineItemValue('item','bomquantity',i);
        	bomQtyArr.push(BOM_Qty);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  BOM_Qty  ==" + BOM_Qty);
        	
        	var Qty = recObj.getLineItemValue('item','quantity',i);
        	QtyArr.push(Qty);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  Qty  ==" + Qty);
        	
        	var Units = recObj.getLineItemValue('item','units',i);
        	UnitsArr.push(Units);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  Units  ==" + Units);
        	
        	var Balance_StoreQty = recObj.getLineItemValue('item','custcol_wo_balnce_store_qty',i);
        	Balance_StoreQtyArr.push(Balance_StoreQty);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  Balance_StoreQty  ==" + Balance_StoreQty);
        	
        	var Balance_AssemblyQty = recObj.getLineItemValue('item','custcol_wo_balance_assembly_qty',i);
        	Balance_AssemblyQtyArr.push(Balance_AssemblyQty);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  Balance_AssemblyQty  ==" + Balance_AssemblyQty);
        	
        	var quantity_BackOrder = recObj.getLineItemValue('item','quantitybackordered',i);
        	quantity_BackOrderArr.push(quantity_BackOrder);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity_BackOrder  ==" + quantity_BackOrder);
		}
		
		createInventoryTrnasfer(woLocation,subsidiary,recId,woCustomer,woDate,wo_FromStore,wo_ToStore,item,itemArr,BOM_Qty,Qty,QtyArr,Balance_StoreQty,Balance_StoreQtyArr,Balance_AssemblyQty,Balance_AssemblyQtyArr,UnitsArr,Units,quantity_BackOrderArr,quantity_BackOrder)
	}
}

function createInventoryTrnasfer(woLocation,subsidiary,recId,woCustomer,woDate,wo_FromStore,wo_ToStore,item,itemArr,BOM_Qty,Qty,QtyArr,Balance_StoreQty,Balance_StoreQtyArr,Balance_AssemblyQty,Balance_AssemblyQtyArr,UnitsArr,Units,quantity_BackOrderArr,quantity_BackOrder)
{
	nlapiLogExecution('DEBUG', 'Create Inventory Transfer', "************Enter In Function*************");
	nlapiLogExecution('DEBUG', 'Create Inventory Transfer', " wo_FromStore  ****** "+ wo_FromStore);
	nlapiLogExecution('DEBUG', 'Create Inventory Transfer', " wo_ToStore  ****** "+ wo_ToStore);
	nlapiLogExecution('DEBUG', 'Create Inventory Transfer', " QtyArr  ****** "+ QtyArr);
	nlapiLogExecution('DEBUG', 'Create Inventory Transfer', " Balance_AssemblyQtyArr  ****** "+ Balance_AssemblyQtyArr);
	nlapiLogExecution('DEBUG', 'Create Inventory Transfer', " Balance_StoreQtyArr  ****** "+ Balance_StoreQtyArr);
	nlapiLogExecution('DEBUG', 'Create Inventory Transfer', " quantity_BackOrderArr  ****** "+ quantity_BackOrderArr);
	
	var record = nlapiCreateRecord('inventorytransfer',{recordmode: 'dynamic'});
	
	//if(quantity_BackOrderArr > 0)
	{

		if(woDate != null && woDate != '' && woDate != undefined)
		{
			record.setFieldValue('trandate',woDate);
		}
		
		if(subsidiary != null && subsidiary != '' && subsidiary != undefined)
		{
			record.setFieldValue('subsidiary',subsidiary);
		}
		
		if(wo_ToStore != null && wo_ToStore != '' && wo_ToStore != undefined)
		{
			record.setFieldValue('location',wo_FromStore);
			nlapiLogExecution("DEBUG","Create Inventory Transfer","wo_ToStore to be set =="+ wo_ToStore);    
		}
		
		if(wo_FromStore != null && wo_FromStore != '' && wo_FromStore != undefined)
		{
			record.setFieldValue('transferlocation',wo_ToStore);
			nlapiLogExecution("DEBUG","Create Inventory Transfer","wo_FromStore to be set =="+ wo_FromStore);    
		}
		
		nlapiLogExecution("DEBUG","In Create Function","itemArr.length=="+ itemArr.length);
		for(var x=1;x<=itemArr.length;x++)
		{
			record.selectNewLineItem('inventory');
			
			record.setCurrentLineItemValue('inventory','item',itemArr[x-1]);   
		    nlapiLogExecution("DEBUG","Create Inventory Transfer","item done11=="+ itemArr[x-1]);    
	  
		    record.setCurrentLineItemValue('inventory','units',UnitsArr[x-1]);                              
		    nlapiLogExecution("DEBUG","Create Inventory Transfer"," units done=="+ UnitsArr[x-1]);
		    
		    record.setCurrentLineItemValue('inventory','adjustqtyby',QtyArr[x-1]);                              
		    nlapiLogExecution("DEBUG","Create Inventory Transfer"," quantity done=="+QtyArr[x-1]);
		    
		    var adjQty = parseFloat(QtyArr[x-1]);
		    
		    var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		    for(var x1=1;x1<=1;x1++)
			{
		    	nlapiLogExecution("DEBUG","Create Inventory Transfer","x1 =="+x1);
		    	
			    subrec.selectLineItem('inventoryassignment',x1);
			    subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
			    subrec.setCurrentLineItemValue('inventoryassignment','quantity',adjQty);
			    nlapiLogExecution("DEBUG","Create Inventory Transfer","adjQty done =="+adjQty);
			    subrec.commitLineItem('inventoryassignment');
			}
		    subrec.commit();
		    
		    record.commitLineItem('inventory');
		    nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
		}
	}
	var SubmitID = nlapiSubmitRecord(record);
	 
	nlapiLogExecution("DEBUG","In Create Function","SubmitID done=="+ SubmitID);
	nlapiSetRedirectURL('RECORD','inventorytransfer',SubmitID, true);
	//window.open('https://tstdrv1934275.app.netsuite.com/app/accounting/transactions/invtrnfr.nl?whence=')
}
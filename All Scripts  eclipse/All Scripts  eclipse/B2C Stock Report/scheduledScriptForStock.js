/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Dec 2018     Priyanka Patil
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */

function scheduleForRemainQty(type)
{
	var itemArray = new Array();
	
	var yestardaySO = nlapiSearchRecord("salesorder","customsearch_customer_qty",
			[
			   ["mainline","is","F"], 
			   "AND", 
			   ["taxline","is","F"], 
			   "AND", 
			   ["shipping","is","F"], 
			   "AND", 
			   ["type","anyof","SalesOrd"], 
			   "AND", 
			   ["trandate","on","yesterday"]
			], 
			[
			   new nlobjSearchColumn("item"), 
			   new nlobjSearchColumn("entity"), 
			   new nlobjSearchColumn("trandate"), 
			   new nlobjSearchColumn("quantity"), 
			   new nlobjSearchColumn("amount"), 
			   new nlobjSearchColumn("quantityshiprecv"), 
			   new nlobjSearchColumn("subsidiary")
			]
			);
	
	nlapiLogExecution('DEBUG','ScheduleScript','yestardaySO.length ='+yestardaySO.length);
	
	
	for(i=0;i<yestardaySO.length;i++)
	{
		var item = yestardaySO[i].getValue("item");
		itemArray.push(item);
		//nlapiLogExecution('DEBUG','ScheduleScript','item ='+item);
		
		var customer = yestardaySO[i].getValue("entity");
		//nlapiLogExecution('DEBUG','ScheduleScript','customer ='+customer);
		
		var date = yestardaySO[i].getValue("trandate");
		//nlapiLogExecution('DEBUG','ScheduleScript','trandate ='+date);
	
		var quantity = yestardaySO[i].getValue("quantity");
		//nlapiLogExecution('DEBUG','ScheduleScript','quantity ='+quantity);
		
		var fulfillQty = yestardaySO[i].getValue("quantityshiprecv");
		//nlapiLogExecution('DEBUG','ScheduleScript','fulfillQty ='+fulfillQty);
		
		var subsidiary = yestardaySO[i].getValue("subsidiary");
		//nlapiLogExecution('DEBUG','ScheduleScript','subsidiary ='+subsidiary);
		
		var Load_subsidiary = nlapiLoadRecord('subsidiary', subsidiary);
		//nlapiLogExecution('DEBUG','ScheduleScript','Load_subsidiary ='+Load_subsidiary);
		
        var timezone = Load_subsidiary.getFieldText('TIMEZONE');
        //nlapiLogExecution('DEBUG', 'ScheduleScript','Time Zone =='+timezone);
		
        var usaTime = new Date().toTimeString(timezone);
        //nlapiLogExecution('DEBUG','ScheduleScript','usaTime ='+usaTime);
		
		var remainQty = parseFloat(quantity) - parseFloat(fulfillQty);
		//nlapiLogExecution('DEBUG','ScheduleScript','remainQty ='+remainQty);
	}	
	
	var today_salesOrder = nlapiSearchRecord("transaction","customsearch_sales_order_search",
			[
			   ["type","anyof","SalesOrd"], 
			   "AND", 
			   ["mainline","is","F"], 
			   "AND", 
			   ["trandate","on","today"], 
			   "AND", 
			   ["taxline","is","F"], 
			   "AND", 
			   ["shipping","is","F"]
			], 
			[
			   new nlobjSearchColumn("entity"), 
			   new nlobjSearchColumn("trandate"), 
			   new nlobjSearchColumn("internalid"), 
			   new nlobjSearchColumn("quantity"), 
			   new nlobjSearchColumn("amount"), 
			   new nlobjSearchColumn("tranid"), 
			   new nlobjSearchColumn("item"),
			   new nlobjSearchColumn("subsidiary")
			]
			);
	
	nlapiLogExecution('DEBUG','ScheduleScript','today_salesOrder.length ='+today_salesOrder.length);

	for(q=0;q<today_salesOrder.length;q++)
	{
		
		var today_item = today_salesOrder[q].getValue("item");
		//nlapiLogExecution('DEBUG','ScheduleScript','todays item ='+item);
		
		var today_customer = today_salesOrder[q].getValue("entity");
		//nlapiLogExecution('DEBUG','ScheduleScript','todays customer ='+customer);
		
		var today_date = today_salesOrder[q].getValue("trandate");
		//nlapiLogExecution('DEBUG','ScheduleScript','todays trandate ='+today_date);
	
		var today_quantity = today_salesOrder[q].getValue("quantity");
		//nlapiLogExecution('DEBUG','ScheduleScript','todays quantity ='+quantity);
		
		var today_subsidiary = today_salesOrder[q].getValue("subsidiary");
		//nlapiLogExecution('DEBUG','ScheduleScript','subsidiary ='+subsidiary);
    }	

	//var qtySold = 0;

	nlapiLogExecution('DEBUG','ScheduleScript customrecord','today_date ='+today_date+'customer =='+customer);
	
	var total_Qty = parseFloat(remainQty) + parseFloat(today_quantity);
	
	nlapiLogExecution('DEBUG','ScheduleScript','today_date >  =='+today_date+'date  =='+date);
	nlapiLogExecution('DEBUG','ScheduleScript','item  =='+item+'today_item  =='+today_item);
	
if(date < today_date  && item == today_item && today_customer == customer)
{
	var createNewRecord = nlapiCreateRecord('customrecord_b2c_partner_stock_detail');//,{recordmode: 'dynamic'}
	
	createNewRecord.setFieldValue('custrecord_date',today_date);
	createNewRecord.setFieldValue('custrecord_b2c_partner_name',today_customer);
	
	
	for(p=1;p<=item.length;p++)
	{
			nlapiLogExecution('DEBUG','ScheduleScript','item.length in for loop='+item.length);
				
			createNewRecord.selectNewLineItem('recmachcustrecord2');
			createNewRecord.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',item);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + item);
			    
			createNewRecord.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',total_Qty);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "total_Qty done ==" + total_Qty);
			    
			/*createNewRecord.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain');
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "total_Qty done ==");
			  */ 
			createNewRecord.commitLineItem('recmachcustrecord2');
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
	}
		//var Submitrecord =  nlapiSubmitRecord(createNewRecord);
	   //nlapiLogExecution('Debug', 'record IS Created..', "Submitrecord id " + Submitrecord)
}

/*else if(item != today_item)
{		
			createNewRecord.selectNewLineItem('recmachcustrecord2');
			createNewRecord.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',item);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done in else==" + item);
			    
			createNewRecord.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',total_Qty);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "total_Qty done in else==" + total_Qty);
			    
			createNewRecord.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain');
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "total_Qty done ==");
			   
			createNewRecord.commitLineItem('recmachcustrecord2');
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item in else==");
	
		//var Submitrecord =  nlapiSubmitRecord(createNewRecord);
	   //nlapiLogExecution('Debug', 'record IS Created..', "Submitrecord id " + Submitrecord)
	
}*/
}
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Jul 2019     Priyanka Patil
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

function afterSubmitCloseSO(type)
{
	if(type == 'create' || type == 'edit')
	{ 

//======================================From IF Set Values in CustomRecord =============================

		var itemArray = new Array();
		var qtyArray = new Array();
		var remain_QtyArray = new Array();
		var on_HandArray = new Array();
		var remainingArray = new Array();
		var salesqtyArray = new Array();
		var qtyOnHandArray = new Array();
		
		var recId = nlapiGetRecordId();
		//nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check ', " recId " + recId)
			
		var recordType = nlapiGetRecordType()
		//nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " recordType " + recordType)
			
		var o_checkobj = nlapiLoadRecord(recordType,recId)
		
		var customer = o_checkobj.getFieldValue('entity');
		//nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " customer " + customer);
		
		var customer_Category = o_checkobj.getFieldValue('custbody_sales_employee');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " customer_Category "+customer_Category);
		
		var date1 = new Date(date);
	    //date1.setDate(date1.getDate()-1);
      
		var dateformat = date1.getDate() + '/' + (date1.getMonth()+1) + '/' + date1.getFullYear();
        //nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " dateformat " + dateformat);
		
	    var createdFrom = o_checkobj.getFieldValue('createdfrom');
		//nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " createdFrom " + createdFrom);
		
		var b2c_customer = o_checkobj.getFieldValue('custbody_b2c_customer');
		//nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " b2c_customer " + b2c_customer);
			
		var status = o_checkobj.getFieldValue('shipstatus');
		//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " status " + status);
		
		var date = o_checkobj.getFieldValue('trandate');
		//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " date " + date);
		
		var createRec = nlapiLoadRecord('salesorder',createdFrom);
		
		var salesDate = createRec.getFieldValue('trandate');
		//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " salesDate " + salesDate);
		
		var ActDate = salesDate.toString();
		var ActDate1 =ActDate.split('/');
		var ActDate2 =ActDate1[1]+'/'+ActDate1[0]+'/'+ActDate1[2];
		var FormDay =new Date(ActDate2);
		nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " FormDay " + FormDay);
		
		
		var today = new Date();
		var yesterday = today - 1000 * 60 * 60 * 24 * 1;   
		yesterday = new Date(yesterday);
		nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " yesterday " + yesterday);
			
		
		var lineCount = o_checkobj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','B2CStock',"lineCount  ==" + lineCount);
		
		if(lineCount != null && !isNaN(lineCount))		
		{
			for(var i=1;i<=lineCount;i++)
			{ 
		    	var item = o_checkobj.getLineItemValue('item','item',i);
		    	itemArray.push(item);
		    	nlapiLogExecution('DEBUG','B2CStock',"item  ==" + item);
				
		    	var qty = o_checkobj.getLineItemValue('item','quantity',i);
		    	qtyArray.push(qty);
		    	nlapiLogExecution('DEBUG','B2CStock',"item fulfillment qty  ==" + qty);
				
		    	var remain_Qty = o_checkobj.getLineItemValue('item','custcol_remaining_qty',i);
		    	remain_QtyArray.push(remain_Qty);
		    	//nlapiLogExecution('DEBUG','B2CStock',"remain_Qty  ==" + remain_Qty);
		    	
		    	var on_Hand = o_checkobj.getLineItemValue('item','onhand',i);
		    	on_HandArray.push(on_Hand);
		    	nlapiLogExecution('DEBUG','B2CStock',"on_Hand  ==" + on_Hand);
		    	
		    	
		    	var remaining = o_checkobj.getLineItemValue('item','quantityremaining',i);
		    	remainingArray.push(remaining);
		    	nlapiLogExecution('DEBUG','B2CStock',"remaining  ==" + remaining);
		    	
		    	for(x=1;x<=lineCount;x++)
		    	{
		    		var salesqty = createRec.getLineItemValue('item','quantity',x);
		    		salesqtyArray.push(salesqty);
			    	nlapiLogExecution('DEBUG','B2CStock',"sales order qty  ==" + salesqty);
			    	
			    	var qtyOnHand = createRec.getLineItemValue('item','quantityavailable',x);
			    	qtyOnHandArray.push(qtyOnHand);
			    	nlapiLogExecution('DEBUG','B2CStock',"qtyOnHand  ==" + qtyOnHand);
			    	
			    	
			    	var qtyDiff = parseFloat(salesqty) - parseFloat(qty);
			    	nlapiLogExecution('DEBUG','B2CStock',"qtyDiff  ==" + qtyDiff);
			    	
			    	//nlapiLogExecution('DEBUG','B2CStock',"FormDay  ==" + FormDay +"yesterday =="+yesterday);
		    		
			    	if(FormDay > yesterday)
			    	{
			    		//nlapiLogExecution('DEBUG','B2CStock',"FormDay  ==" + FormDay +"yesterday =="+yesterday);
			    		
				    	var new_qty = parseFloat(qtyDiff) + parseFloat(salesqty);
				    	nlapiLogExecution('DEBUG','B2CStock',"new_qty  ==" + new_qty);
			    	}
			    	
			    	var QtyRemain =  parseFloat(qtyOnHand) - parseFloat(qty);
			    	nlapiLogExecution('DEBUG','B2CStock',"QtyRemain  ==" + QtyRemain);
			    	
		    	if(status == 'C' && customer_Category == '6')
		    	{
		    		var o_b2cObj = nlapiCreateRecord('customrecord_b2c_partner_stock_detail',{recordmode: 'dynamic'});
		    		
		    		o_b2cObj.setFieldValue('custrecord_b2c_partner_name',customer);
		    		o_b2cObj.setFieldValue('custrecord_date',date);
		    		
		        	//nlapiLogExecution('DEBUG', 'set values in CustomRecord', "customer ==" + customer +"date "+date);
		        	
		        	//var item_LineCount = o_b2cObj.getLineItemCount(itemArray[i-1]);
		    		//nlapiLogExecution('DEBUG','B2CStock',"item_LineCount  for itemArray==" + item_LineCount);
		    		
		        	for(p=1;p<=itemArray.length;p++)
		        	{
		        		nlapiLogExecution('DEBUG','B2CStock',"itemArray  length==" + itemArray.length);
			    		
			        	o_b2cObj.selectNewLineItem('recmachcustrecord2');
			        	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',itemArray[p-1]);
			        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + itemArray[p-1]);
			        	    	
			        	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_sold',qtyArray[p-1]);
			        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty sold ==" + qtyArray[p-1]);
			        	
			        	
				        o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_on_hand',qtyOnHandArray[p-1]);
				        nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty on hand  ==" + qtyOnHandArray[p-1]);
			        
			        	
			        	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',remainingArray[p-1]);
			        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty Remaining  ==" + remainingArray[p-1]);
			        	
			        	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',new_qty);
			        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "opening stock ==" + new_qty);
			        	
			        	//o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',QtyRemain);
			        	//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "remaining qty ==" + QtyRemain);
			        	
			        	o_b2cObj.commitLineItem('recmachcustrecord2');
			        	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
		        	}
		        	
		           //var record =  nlapiSubmitRecord(o_b2cObj,true);
		           //nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)
			
		    	}
		    	}	
			}
		}
		
	}		
	
//========================================substract quantity set on SO and remove Fulfill button============================

	function userEventBeforeLoad(type)
	{
		//nlapiLogExecution('DEBUG','SalesPerson Invetory',"type  ==" + type);
		
		if(type == 'view')
	   {
			var createdFrom = nlapiGetFieldValue('createdfrom');
			nlapiLogExecution('DEBUG','SalesPerson Invetory',"createdFrom  ==" + createdFrom);
			
			var Customer_Category = nlapiGetFieldValue('custbody_sales_employee');
			nlapiLogExecution('DEBUG','SalesPerson Invetory',"Customer_Category  ==" + Customer_Category);
			
			var obj1 = nlapiLoadRecord('salesorder',createdFrom);
			
			var PRlinecount = obj1.getLineItemCount('item');
			nlapiLogExecution('DEBUG','SalesPerson Invetory',"PRlinecount  ==" + PRlinecount);
		
		if(Customer_Category == '5')
		{
			for(var i=1;i<=PRlinecount;i++)
			{ 
		    	var itemid = obj1.getLineItemValue('item','item',i);
		    		
		    	var qty = obj1.getLineItemValue('item','quantity',i);
		    	nlapiLogExecution('DEBUG','SalesPerson Invetory',"qty  ==" + qty);
				
		    	var remain_Qty = obj1.getLineItemValue('item','custcol_remaining_qty',i);
		    	nlapiLogExecution('DEBUG','SalesPerson Invetory',"remain_Qty  ==" + remain_Qty);
				
		    	var Qtyremain = qty - remain_Qty;
		    	//nlapiLogExecution('DEBUG','SalesPerson Invetory',"Qtyremain  ==" + Qtyremain);
				
		    	if(qty != null && qty != '' && qty != undefined && Customer_Category == '5')
		    	{
		    		//obj.setLineItemValue('item','quantity',i,Qtyremain);
		    		//obj.setLineItemValue('item','isclosed',i,'T');
		    		//form.removeButton('process');
		    		
		    	}
			}
			var submitID = nlapiSubmitRecord(obj1,true);
			//nlapiLogExecution('DEBUG', 'Acct', 'submitID = '+submitID);
		}
	}
	}
}


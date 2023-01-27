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
		var locArray = new Array();
		
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
		    	
		    	var lineLoc =o_checkobj.getLineItemValue('item','location',i);
		    	locArray.push(lineLoc);
		    	
		    	
		    	var remaining = o_checkobj.getLineItemValue('item','quantityremaining',i);
		    	remainingArray.push(remaining);
		    	nlapiLogExecution('DEBUG','B2CStock',"remaining  ==" + remaining);
		    	
		    	var transResult = findTransactionForAlready(itmid,customer)
		    	
		    	if(transResult !=null)
		    	{
		    		for(var m=0;m<transResult.length;m++)
		    		{
		    			var intId =transResult[m].getValue('internalid');
		    		}
		    		
					creatingTheCustRecordAlready(customer,intId,date,status,customer_Category,itemArray,qtyArray,remainingArray,on_HandArray,locArray,createdFrom)

		    	}
		    	else
		    	{
		    		
					creatingTheCustRecord(customer,date,status,customer_Category,itemArray,qtyArray,remainingArray,on_HandArray,locArray,createdFrom)

		    	}
			}
		}
	}
}


function creatingTheCustRecordAlready(customer,intId,date,status,customer_Category,itemArray,qtyArray,remainingArray,on_HandArray,locArray,createdFrom)
{
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Already Rec LOAD n SET=" );
	
	var o_b2cObj = nlapiLoadRecord('customrecord_b2c_partner_stock_detail',intId);
	
	o_b2cObj.setFieldValue('custrecord_b2c_partner_name',customer);
	o_b2cObj.setFieldValue('custrecord_date',date);
	
	//nlapiLogExecution('DEBUG', 'set values in CustomRecord', "customer ==" + customer +"date "+date);
	
	//var item_LineCount = o_b2cObj.getLineItemCount(itemArray[i-1]);
	//nlapiLogExecution('DEBUG','B2CStock',"item_LineCount  for itemArray==" + item_LineCount);
	var openStock =0;
	for(p=1;p<=itemArray.length;p++)
	{
		var  itmid=itemArray[p-1];
		var  Locid=locArray[p-1];
		
		var linetran = findTransaction(itmid,createdFrom,locL)
		
		if(linetran !=null)
		{
			for(p1=0;p1< linetran.length;p1++)
			{
				var soQty = linetran[p1].getValue('quantity');
				var fulfillQty = linetran[p1].getValue('quantity');
			}
		}
		
		var OnHand = parseFloat(soQty)- parseFloat(fulfillQty);
		var RemainQty = parseFloat(OnHand)- parseFloat(fulfillQty);
		
		
		
		nlapiLogExecution('DEBUG','B2CStock',"itemArray  length==" + itemArray.length);
		
		var alreadyStoc = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_item',p);
		
		var openStock =parseFloat(alreadyStoc)+parseFloat(soQty);
		
		
    	o_b2cObj.selectLineItem('recmachcustrecord2',p);
    	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',itemArray[p-1]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + itemArray[p-1]);
    	    	
    	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_sold',fulfillQty);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty sold ==" + fulfillQty);
    	
    	
        o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_on_hand',OnHand);
        nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty on hand  ==" + OnHand);
    
    	
    	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',RemainQty);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty Remaining  ==" + RemainQty);
    	
    	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',openStock);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "opening stock ==" + openStock);
    	
    	//o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',QtyRemain);
    	//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "remaining qty ==" + QtyRemain);
    	
    	o_b2cObj.commitLineItem('recmachcustrecord2');
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
	}
	
   //var record =  nlapiSubmitRecord(o_b2cObj,true);
   //nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)

}





function creatingTheCustRecord(customer,date,status,customer_Category,itemArray,qtyArray,remainingArray,on_HandArray,locArray,createdFrom)
{
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Create New REcord=" );
	
	var o_b2cObj = nlapiCreateRecord('customrecord_b2c_partner_stock_detail',{recordmode: 'dynamic'});
	
	o_b2cObj.setFieldValue('custrecord_b2c_partner_name',customer);
	o_b2cObj.setFieldValue('custrecord_date',date);
	
	//nlapiLogExecution('DEBUG', 'set values in CustomRecord', "customer ==" + customer +"date "+date);
	
	//var item_LineCount = o_b2cObj.getLineItemCount(itemArray[i-1]);
	//nlapiLogExecution('DEBUG','B2CStock',"item_LineCount  for itemArray==" + item_LineCount);
	
	for(p=1;p<=itemArray.length;p++)
	{
		var  itmid=itemArray[p-1];
		var  Locid=locArray[p-1];
		
		var linetran = findTransaction(itmid,createdFrom,Locid)
		
		if(linetran !=null)
		{
			for(p1=0;p1< linetran.length;p1++)
			{
				var soQty = linetran[p1].getValue('quantity');
				var fulfillQty = linetran[p1].getValue('quantity');
			}
		}
		
		var OnHand = parseFloat(soQty)- parseFloat(fulfillQty);
		var RemainQty = parseFloat(OnHand)- parseFloat(fulfillQty);
		
		var openStock = parseFloat(soQty);
		
		nlapiLogExecution('DEBUG','B2CStock',"itemArray  length==" + itemArray.length);
		
    	o_b2cObj.selectNewLineItem('recmachcustrecord2');
    	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',itemArray[p-1]);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + itemArray[p-1]);
    	    	
    	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_sold',fulfillQty);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty sold ==" + fulfillQty);
    	
    	
        o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_on_hand',OnHand);
        nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty on hand  ==" + OnHand);
    
    	
    	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',RemainQty);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty Remaining  ==" + RemainQty);
    	
    	o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',openStock);
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "opening stock ==" + openStock);
    	
    	//o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',QtyRemain);
    	//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "remaining qty ==" + QtyRemain);
    	
    	o_b2cObj.commitLineItem('recmachcustrecord2');
    	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
	}
	
   //var record =  nlapiSubmitRecord(o_b2cObj,true);
   //nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)

}

function findTransaction(itmid,createdFrom,locL)
{
	var searchId ='customsearch230';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',createdFrom);
	 filters[1]=new nlobjSearchFilter('location',null,'anyOf',locL);
	 filters[2]=new nlobjSearchFilter('item',null,'anyOf',itmid);
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

function findTransactionForAlready(itmid,customer)
{
	var searchId ='customsearch231';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_b2c_partner_name', null,'anyOf',customer);
	 filters[1]=new nlobjSearchFilter('custrecord_item','custrecord2','anyOf',itmid);
	// filters[1]=new nlobjSearchFilter('item',null,'anyOf',itmid);
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
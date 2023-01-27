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

//======================================From IF Set Values in CustomRecord SalesPerson Inventory=============================

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
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " customer " + customer);
		
		var customer_Category = o_checkobj.getFieldValue('custbody_sales_employee');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " customer_Category "+customer_Category);
		
		var date1 = new Date(date);
	    //date1.setDate(date1.getDate()-1);
      
		var dateformat = date1.getDate() + '/' + (date1.getMonth()+1) + '/' + date1.getFullYear();
        //nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " dateformat " + dateformat);
		
	    var createdFrom = o_checkobj.getFieldValue('createdfrom');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " createdFrom " + createdFrom);
		
		var b2c_customer = o_checkobj.getFieldValue('custbody_b2c_customer');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " b2c_customer " + b2c_customer);
			
		var status = o_checkobj.getFieldValue('shipstatus');
		nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " status " + status);
		
		var date = o_checkobj.getFieldValue('trandate');
		//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " date " + date);
		
		var lineCount = o_checkobj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','B2CStock',"lineCount  ==" + lineCount);
		
		var obj1 = nlapiLoadRecord('salesorder',createdFrom);
		nlapiLogExecution('DEBUG','B2CStock',"obj1  ==" + obj1);
		
//=================================Check SPF checkbox=========================
		
		/*if(customer_Category == '5')
		{
			obj1.setFieldValue('custbody_spe_checkbox','T');
		}*/
	
//==========================================================================
		
		var SOlineCount = obj1.getLineItemCount('item');
		if(SOlineCount != null && !isNaN(SOlineCount))		
		{
			for(var i1=1;i1<=SOlineCount;i1++)
			{ 
				var Soqty = obj1.getLineItemValue('item','quantity',i1);
				var Soitm = obj1.getLineItemValue('item','item',i1);
		
		
		if(lineCount != null && !isNaN(lineCount))		
		{
			for(var i=1;i<=lineCount;i++)
			{ 
		    	var item = o_checkobj.getLineItemValue('item','item',i);
		    	itemArray.push(item);
		    	nlapiLogExecution('DEBUG','B2CStock',"item  ==" + item);
		    	
		    	if(Soitm ==item)
				{
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
		    	
		   
		    	
		    	var transResult = findTransactionForAlready(item,customer)
		    	nlapiLogExecution('DEBUG','B2CStock',"transResult  ==" + transResult);
				
		    	if(status === 'C' && customer_Category === '6')
		    	{
		    	
			    	if(transResult != null && transResult != '' && transResult != undefined)
			    	{
			    		for(var m=0;m<transResult.length;m++)
			    		{
			    			var intId =transResult[m].getValue('id');
							nlapiLogExecution('DEBUG','B2CStock',"intId  ==" + intId);
			    		}
			    		
						creatingTheCustRecordAlready(customer,Soqty,intId,date,status,customer_Category,itemArray,qtyArray,remainingArray,on_HandArray,locArray,createdFrom)
	
			    	}
			    	else
			    	{
			    		
						creatingTheCustRecord(customer,Soqty,intId,date,status,customer_Category,itemArray,qtyArray,remainingArray,on_HandArray,locArray,createdFrom)
	
			    	}
		    	}
			}
			}
		}
			}
		}
	}
}


function creatingTheCustRecordAlready(customer,Soqty,intId,date,status,customer_Category,itemArray,qtyArray,remainingArray,on_HandArray,locArray,createdFrom)
{
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Already Rec LOAD n SET=" );
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Already Rec LOAD status =" +status);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Already Rec LOAD customer_Category=" +customer_Category);
	
	
	var o_b2cObj = nlapiLoadRecord('customrecord_b2c_partner_stock_detail',intId);
	
	
	
	if(status === 'C' && customer_Category === '6')
	{
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
			
			var linetran = findTransaction(itmid,createdFrom,Locid);
			
			if(linetran !=null && linetran !='' && linetran !=undefined)
			{
				for(p1=0;p1< linetran.length;p1++)
				{
					var soQty = Soqty;
					var fulfillQty = linetran[p1].getValue('quantity');
					
			/*		var CogsAmountCustom = linetran[p1].getValue("custrecord_fulfillment_price","CUSTRECORD2");
					nlapiLogExecution('DEBUG','B2CStock',"CogsAmountCustom==" + CogsAmountCustom);
					
					if(CogsAmountCustom < 0)
					{
						var negCOGSAmount = -(CogsAmountCustom);
					}*/
				}
			}
			
			var OnHand = parseFloat(soQty)- parseFloat(fulfillQty);
			var RemainQty = parseFloat(OnHand)- parseFloat(fulfillQty);
			
			nlapiLogExecution('DEBUG','B2CStock',"itemArray  length==" + itemArray.length);
			
			var alreadyStoc = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_opening_stock',p);
			if(alreadyStoc != null && alreadyStoc != '' && alreadyStoc != undefined)
			{
				var openStock = parseFloat(alreadyStoc)+parseFloat(soQty);
			}
			else
			{
				alreadyStoc = 0;
				var openStock =parseFloat(alreadyStoc)+parseFloat(soQty);
			}	
			
			var alreadyRemainQty = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_remain',p);
			if(alreadyRemainQty != null && alreadyRemainQty != '' && alreadyRemainQty != undefined)
			{
				var newRemainqty = parseFloat(alreadyRemainQty) + parseFloat(RemainQty);
				nlapiLogExecution('DEBUG','B2CStock',"newRemainqty  in if condition ==" +newRemainqty);
			}
			else
			{
				alreadyRemainQty = 0;
				var newRemainqty = parseFloat(alreadyRemainQty) + parseFloat(RemainQty);
				nlapiLogExecution('DEBUG','B2CStock',"newRemainqty in else condition==" +newRemainqty);
			}
			
			
			var CogsAmountCustom = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_fulfillment_price',p);
			if(CogsAmountCustom != null && CogsAmountCustom != '' && CogsAmountCustom != undefined && CogsAmountCustom > 0)
			{
				var newCogsAmountCustom = parseFloat(CogsAmountCustom);
			}
			else if(CogsAmountCustom != null && CogsAmountCustom != '' && CogsAmountCustom != undefined && CogsAmountCustom < 0)
			{
				var newCogsAmountCustom = parseFloat(-CogsAmountCustom);
			}
			else
			{
				var newCogsAmountCustom = 0;
			}
			
			var alreadyQtyOn_Hand = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_on_hand',p);
			if(alreadyQtyOn_Hand != null && alreadyQtyOn_Hand != '' && alreadyQtyOn_Hand != undefined)
			{
				var newQtyOn_Hand = parseFloat(alreadyQtyOn_Hand) + parseFloat(OnHand);
			}
			else
			{
				alreadyQtyOn_Hand = 0;
				var newQtyOn_Hand = parseFloat(alreadyQtyOn_Hand) + parseFloat(OnHand);
			}	
			
			
			o_b2cObj.selectLineItem('recmachcustrecord2',p);
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',itemArray[p-1]);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + itemArray[p-1]);
					
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_sold',fulfillQty);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty sold ==" + fulfillQty);
			
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_on_hand',newQtyOn_Hand);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty on hand  ==" + newQtyOn_Hand);
		
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_b2c_partner_name_line',customer);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Line level Customer  ==" + customer);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',newRemainqty);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty Remaining  ==" + newRemainqty);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',openStock);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "opening stock ==" + openStock);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_fulfillment_price',newCogsAmountCustom);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "CogsAmount ==" + newCogsAmountCustom);
			
			o_b2cObj.commitLineItem('recmachcustrecord2');
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
		}
		
	   var record =  nlapiSubmitRecord(o_b2cObj,true);
	   nlapiLogExecution('Debug', 'record IS Created..', "record id " + record);
	}
}




function creatingTheCustRecord(customer,Soqty,intId,date,status,customer_Category,itemArray,qtyArray,remainingArray,on_HandArray,locArray,createdFrom,CogsAmountCustom)
{
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Create New REcord=" );
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Create New REcord status  =" +status);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Create New REcord customer_Category  =" +customer_Category);
	
	
	if(status === 'C' && customer_Category === '6')
	{
		var o_b2cObj = nlapiCreateRecord('customrecord_b2c_partner_stock_detail',{recordmode: 'dynamic'});
		
		o_b2cObj.setFieldValue('custrecord_b2c_partner_name',customer);
		o_b2cObj.setFieldValue('custrecord_date',date);
		
		nlapiLogExecution('DEBUG', 'set values in CustomRecord', "customer ==" + customer +"date "+date);
		
		//var item_LineCount = o_b2cObj.getLineItemCount(itemArray[i-1]);
		//nlapiLogExecution('DEBUG','B2CStock',"item_LineCount  for itemArray==" + item_LineCount);
		
		for(p=1;p<=itemArray.length;p++)
		{
			var  itmid=itemArray[p-1];
			var  Locid=locArray[p-1];
			
			var linetran = findTransaction(itmid,createdFrom,Locid)
			nlapiLogExecution('DEBUG','B2CStock',"createdFrom==" + createdFrom);
			if(linetran !=null)
			{
				for(p1=0;p1< linetran.length;p1++)
				{
					//var CreatedFrom = linetran[p1].getValue('createdfrom');
					var soQty=Soqty;
					nlapiLogExecution('DEBUG','B2CStock',"soQty in creatingTheCustRecord==" +soQty);
					
					var fulfillQty = linetran[p1].getValue('quantity');
					nlapiLogExecution('DEBUG','B2CStock',"fulfillQty==" +fulfillQty);
					
					var CogsAmount = linetran[p1].getValue('cogsamount');
					nlapiLogExecution('DEBUG','B2CStock',"CogsAmount==" +CogsAmount);
					
					if(CogsAmountCustom < 0)
					{
						var negCOGSAmount = -(CogsAmountCustom);
					}
					
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
		
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_b2c_partner_name_line',customer);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Line level Customer  ==" + customer);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',RemainQty);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty Remaining  ==" + RemainQty);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',openStock);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "opening stock ==" + openStock);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_fulfillment_price',negCOGSAmount);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "CogsAmount ==" + negCOGSAmount);
			
			o_b2cObj.commitLineItem('recmachcustrecord2');
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
		}
		var record =  nlapiSubmitRecord(o_b2cObj,true);
	    nlapiLogExecution('Debug', 'record IS Created..', "record id " + record)
	}
}

function findTransaction(itmid,createdFrom,locL)
{
	var searchId ='customsearch230';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	
	// filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',createdFrom);
	 //filters[1]=new nlobjSearchFilter('location',null,'anyOf',locL);
	 filters[0]=new nlobjSearchFilter('item',null,'anyOf',itmid);
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
	    	   nlapiLogExecution('DEBUG','searchid','searchid for findTransaction'+searchid);
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
	    	   for (var rs in resultslice) 
		        {
		        	returnSearchResults.push(resultslice[rs]);
		            searchid++;
		        }
	    	   nlapiLogExecution('DEBUG','searchid','searchid For findTransactionForAlready'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;

} 



/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00      23 Jul 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function afterSubmitCloseSO(type)
{
	 try
	  {
		   var itemArray = new Array();
		 	var rateArray = new Array();
		 	var descriptionArray = new Array();
		 	var qtyArray = new Array();
		 	var unitArray = new Array();
		 	var locationArray = new Array();
		 	var line_chkArr=new Array();
		 	var salesArr=new Array();
		 	var custArr=new Array();
		 	var vendArr=new Array();
		 	var amtArr=new Array();
		 	var custNew=new Array();
		 	var typeItemArr =new Array();
	    	var BackOrderQtyArray =new Array();
	    	var IsLotItemArr=[];
	    	var useBinsArr=[];
	    	var InvNumArr=[];
	    	var InvQtyArr=[];
		
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var recObj = nlapiLoadRecord(recordType,recordId);
		nlapiLogExecution('DEBUG','Serach Value','irObj :'+recObj +'Type :'+recordType+'ID :'+recordId);
		
		
		var customer = recObj.getFieldValue('entity');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " customer " + customer);
		
		var customer_Category = recObj.getFieldValue('custbody_sales_employee');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " customer_Category "+customer_Category);
		
		var date1 = new Date(date);
	    //date1.setDate(date1.getDate()-1);
      
		var dateformat = date1.getDate() + '/' + (date1.getMonth()+1) + '/' + date1.getFullYear();
        //nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " dateformat " + dateformat);
		
	    var createdFrom = recObj.getFieldValue('createdfrom');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " createdFrom " + createdFrom);
		
		  var subsidiary = nlapiLookupField('salesorder',createdFrom,'subsidiary');
			nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " subsidiary " + subsidiary);
			
		
		var b2c_customer = recObj.getFieldValue('custbody_b2c_customer');
		nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " b2c_customer " + b2c_customer);
			
		var status = recObj.getFieldValue('shipstatus');
		nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " status " + status);
		
		var date = recObj.getFieldValue('trandate');
		//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " date " + date);
		
		if(status === 'C' && customer_Category === '6')
    	{
    	
	    
	
	      var PRlinecount=recObj.getLineItemCount('item');
		    nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
		  
		
			for(var i=1;i<=PRlinecount;i++)
			{
				
				var itemid =recObj.getLineItemValue('item','item',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
            	
            	var qty = recObj.getLineItemValue('item','quantity',i);
		    	//qtyArray.push(qty);
		    	nlapiLogExecution('DEBUG','B2CStock',"item fulfillment qty  ==" + qty);
				
    	    	var remain_Qty = recObj.getLineItemValue('item','custcol_remaining_qty',i);
		    	//remain_QtyArray.push(remain_Qty);
		    	//nlapiLogExecution('DEBUG','B2CStock',"remain_Qty  ==" + remain_Qty);
		    	
		    	var on_Hand = recObj.getLineItemValue('item','onhand',i);
		    	//on_HandArray.push(on_Hand);
		    	nlapiLogExecution('DEBUG','B2CStock',"on_Hand  ==" + on_Hand);
		    	
		    	var lineLoc =recObj.getLineItemValue('item','location',i);
		    	//locArray.push(lineLoc);
		    	
		    	
		    	var remaining = recObj.getLineItemValue('item','quantityremaining',i);
		    	// remainingArray.push(remaining);
		    	nlapiLogExecution('DEBUG','B2CStock',"remaining  ==" + remaining);
		    	
		   
		    	
		    	var transResult = findTransactionForAlready(itemid,customer,date)
		    	nlapiLogExecution('DEBUG','B2CStock',"transResult  ==" + transResult);
				
		    		if(transResult != null && transResult != '' && transResult != undefined)
			    	{
			    		for(var m=0;m<transResult.length;m++)
			    		{
			    			var intId =transResult[m].getValue('id');
							nlapiLogExecution('DEBUG','B2CStock',"intId  ==" + intId);
			    		}
			    		
						creatingTheCustRecordAlready(customer,intId,date,status,customer_Category,itemid,qty,remaining,on_Hand,lineLoc,createdFrom,subsidiary)
	
			    	}
			    	else
			    	{
			    		
						creatingTheCustRecord(customer,intId,date,status,customer_Category,itemid,qty,remaining,on_Hand,lineLoc,createdFrom,subsidiary)
	
			    	}
		    	}
	            	
	            	
	            	//===========================================================================
				}
			} 
	    
			

	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
}

function creatingTheCustRecordAlready(customer,intId,date,status,customer_Category,itemid,qty,remaining,on_Hand,lineLoc,createdFrom,subsidiary)
{
	//===================================================== START ============================
	

	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Already Rec LOAD n SET=" );
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Already Rec LOAD status =" +status);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Already Rec LOAD customer_Category=" +customer_Category);
	
	
	var o_b2cObj = nlapiLoadRecord('customrecord_b2c_partner_stock_detail',intId);
	
	var lineCount = o_b2cObj.getLineItemCount('recmachcustrecord2');
	
	
		o_b2cObj.setFieldValue('custrecord_b2c_partner_name',customer);
		o_b2cObj.setFieldValue('custrecord_date',date);//subsidiary
		o_b2cObj.setFieldValue('custrecord_subsidiary',subsidiary);//subsidiary

		for(var p=1;p<=lineCount;p++)
		{
			var alreadyStoc = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_opening_stock',p);
			
			if(alreadyStoc != null && alreadyStoc != '' && alreadyStoc != undefined)
			{
				var openStock = parseFloat(alreadyStoc);
			}
			else
			{
				alreadyStoc = 0;
				var openStock =parseFloat(alreadyStoc);
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
				var newQtyOn_Hand = parseFloat(alreadyQtyOn_Hand) + parseFloat(qty);
			}
			else
			{
				alreadyQtyOn_Hand = 0;
				var newQtyOn_Hand = parseFloat(alreadyQtyOn_Hand) + parseFloat(qty);
			}
			
			
			var QtyToSold = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_sold',p);
			if(QtyToSold != null && QtyToSold != '' && QtyToSold != undefined)
			{
				var QtyToSold = parseFloat(QtyToSold);
			}
			else
			{
				QtyToSold = 0;
			    parseFloat(QtyToSold)
			}	
			
			

			var alreadyRemainQty = o_b2cObj.getLineItemValue('recmachcustrecord2','custrecord_qty_remain',p);
			if(alreadyRemainQty != null && alreadyRemainQty != '' && alreadyRemainQty != undefined)
			{
				var newRemainqty = parseFloat(alreadyStoc) + parseFloat(newQtyOn_Hand) - parseFloat(QtyToSold);
				nlapiLogExecution('DEBUG','B2CStock',"newRemainqty  in if condition ==" +newRemainqty);
			}
			else
			{
				alreadyRemainQty = 0;
				var newRemainqty = parseFloat(alreadyStoc) + parseFloat(newQtyOn_Hand) - parseFloat(QtyToSold);
				nlapiLogExecution('DEBUG','B2CStock',"newRemainqty in else condition==" +newRemainqty);
			}
			
			o_b2cObj.selectLineItem('recmachcustrecord2',p);
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',itemid);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "item done ==" +itemid);
					
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_date_b2c',date);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Date done ==" +date);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_line_subsidiary',subsidiary);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "subsidiary done ==" +subsidiary);
					
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_sold',parseFloat(QtyToSold));
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty sold ==" + parseFloat(QtyToSold));
			
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_on_hand',parseFloat(newQtyOn_Hand));
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty on hand  ==" + newQtyOn_Hand);
		
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_b2c_partner_name_line',customer);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Line level Customer  ==" + customer);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_remain',parseFloat(newRemainqty));
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty Remaining  ==" + newRemainqty);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_opening_stock',parseFloat(openStock));
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "opening stock ==" + openStock);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_fulfillment_price',parseFloat(newCogsAmountCustom));
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "CogsAmount ==" + newCogsAmountCustom);
			
			o_b2cObj.commitLineItem('recmachcustrecord2');
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
		}
		
	 
 //================================== END ==============================================
	
		  var record =  nlapiSubmitRecord(o_b2cObj,true);
		   nlapiLogExecution('Debug', 'record IS Created..', "record id " + record);
		
}


function creatingTheCustRecord(customer,intId,date,status,customer_Category,itemid,qty,remaining,on_Hand,lineLoc,createdFrom,subsidiary)
{
	//===================================================== START ============================
	

	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "New REcord Creation" );
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "New REcord Creation status=" +status);
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "New REcord Creation customer_Category=" +customer_Category);
	
	
	var o_b2cObj = nlapiCreateRecord('customrecord_b2c_partner_stock_detail',{recordmode: 'dynamic'});
	
	var lineCount = o_b2cObj.getLineItemCount('recmachcustrecord2');
	
	
		o_b2cObj.setFieldValue('custrecord_b2c_partner_name',customer);
		o_b2cObj.setFieldValue('custrecord_date',date);
		o_b2cObj.setFieldValue('custrecord_subsidiary',subsidiary);//subsidiary
		

		var linetran = findTransaction(itemid,customer,date)
		nlapiLogExecution('DEBUG','B2CStock',"linetran==" + linetran);
		var negCOGSAmount =0;
		if(linetran !=null)
		{
			for(p1=0;p1< linetran.length;p1++)
			{
				
				var CogsAmount = linetran[p1].getValue('cogsamount');
				nlapiLogExecution('DEBUG','B2CStock',"CogsAmount==" +CogsAmount);
				
				if(CogsAmount < 0)
				{
					var Amtnew = -(CogsAmount);
					negCOGSAmount +=Amtnew;
				}
				else if(CogsAmountCustom > 0)
				{
					 negCOGSAmount += (CogsAmount);
				}
			}
		}
		
		

		for(var p=1;p<=1;p++)
		{
			var OnHand = parseFloat(qty);
			var RemainQty = parseFloat(qty);
			
			var openStock = parseFloat(0);
			var soldStock = parseFloat(0);
			
			nlapiLogExecution('DEBUG','B2CStock',"itemArray  length==" + itemid);
			
			o_b2cObj.selectNewLineItem('recmachcustrecord2');
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',itemid);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + itemid);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_date_b2c',date);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Date done ==" +date);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_line_subsidiary',subsidiary);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "subsidiary done ==" +subsidiary);
			
					
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_qty_sold',soldStock);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Qty sold ==" + soldStock);
			
			
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

function findTransaction(itemid,customer,date)
{
	var searchId ='customsearch230';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('item',null,'anyOf',itemid);
	 filters[1]=new nlobjSearchFilter('name', 'createdfrom','anyOf',customer);
	 filters[2]=new nlobjSearchFilter('trandate',null,'on',date);
	
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

function findTransactionForAlready(itemid,customer,date)
{
	var searchId ='customsearch231';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_b2c_partner_name', null,'anyOf',customer);
	 filters[1]=new nlobjSearchFilter('custrecord_item','custrecord2','anyOf',itemid);
	 filters[2]=new nlobjSearchFilter('custrecord_date_b2c','custrecord2','within',date,date);
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



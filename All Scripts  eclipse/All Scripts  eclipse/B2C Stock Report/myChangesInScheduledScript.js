/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       10 Jun 2019     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */




var date1 = new Date();
//date1.setDate(date1.getDate()-1);

var dateformat = date1.getDate() + '/' + (date1.getMonth()+1) + '/' + date1.getFullYear();
var time = date1.getHours() + ":" + date1.getMinutes() + ":" + date1.getSeconds();

function scheduleForRemainQty(type) 
{
	nlapiLogExecution('DEBUG','resultSet length','dateformat=='+dateformat+'::time=='+time);
  // if(time == '00:01:00')	
   {
	var searchId='customsearchbtoc_linelevel';
	resultSet = findTransaction(searchId);
	
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length=='+resultSet.length);	    
				for(var i=0;i<resultSet.length;i++)//resultSet.length
					{
						var columns = resultSet[i].getAllColumns();
						var datePrevious= resultSet[i].getValue(columns[0]);
						var customer= resultSet[i].getValue(columns[1]);
						var itemid= resultSet[i].getValue(columns[2]);
						var qtySold= resultSet[i].getValue(columns[3]);
						var OpeningQty= resultSet[i].getValue(columns[4]);
						var OnHandQty= resultSet[i].getValue(columns[5]);
						var RemainQty= resultSet[i].getValue(columns[6]);
						var PriceQty= resultSet[i].getValue(columns[7]);
						var partnerHeader= resultSet[i].getValue(columns[8]);
						var subsidiary= resultSet[i].getValue(columns[9]);
						
					//	var units= resultSet[i].getValue(columns[2]);
						nlapiLogExecution('DEBUG','internalId','datePrevious--'+datePrevious);
						nlapiLogExecution('DEBUG','internalId','subsidiary--'+subsidiary);
						nlapiLogExecution('DEBUG','internalId','customer--'+customer);
						nlapiLogExecution('DEBUG','internalId','itemid--'+itemid);
						nlapiLogExecution('DEBUG','internalId','qtySold--'+qtySold);
						nlapiLogExecution('DEBUG','internalId','OpeningQty--'+OpeningQty);
						nlapiLogExecution('DEBUG','internalId','OnHandQty--'+OnHandQty);
						nlapiLogExecution('DEBUG','internalId','RemainQty--'+RemainQty);
						nlapiLogExecution('DEBUG','internalId','PriceQty--'+PriceQty);
						nlapiLogExecution('DEBUG','internalId','partnerHeader--'+partnerHeader);
			
						 creatingTheCustRecord(customer,dateformat,subsidiary,itemid,qtySold,OpeningQty,OnHandQty,RemainQty,PriceQty,partnerHeader)

			         }
			 }
			
    }
}// END Function

function findTransaction(searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_date_b2c', null,'within',"yesterday");
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

function creatingTheCustRecord(customer,dateformat,subsidiary,itemid,qtySold,OpeningQty,OnHandQty,RemainQty,PriceQty,partnerHeader)
{
	//===================================================== START ============================
	

	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "New REcord Creation Via Schedule Script" );
	
	nlapiLogExecution('DEBUG', 'set values in CustomRecord', "New REcord Creation customer_Category=" +customer);
	
	
	var o_b2cObj = nlapiCreateRecord('customrecord_b2c_partner_stock_detail',{recordmode: 'dynamic'});
	
	var lineCount = o_b2cObj.getLineItemCount('recmachcustrecord2');
	
	
		o_b2cObj.setFieldValue('custrecord_b2c_partner_name',customer);
		o_b2cObj.setFieldValue('custrecord_date',dateformat);
		o_b2cObj.setFieldValue('custrecord_subsidiary',subsidiary);//subsidiary
		
		
		for(var p=1;p<=1;p++)
		{
			var OnHand = parseFloat(0);
			var RemainQty = parseFloat(RemainQty);
			
			var openStock = parseFloat(RemainQty);
			var soldStock = parseFloat(0);
			var negCOGSAmount = parseFloat(PriceQty);
			
			nlapiLogExecution('DEBUG','B2CStock',"itemArray  length==" + itemid);
			
			o_b2cObj.selectNewLineItem('recmachcustrecord2');
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_item',itemid);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "itemArray done ==" + itemid);
			
			o_b2cObj.setCurrentLineItemValue('recmachcustrecord2','custrecord_date_b2c',dateformat);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "Date done ==" +dateformat);
			
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
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Feb 2020     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */


var currntDate = new Date();
var Month = currntDate.getMonth();
Month = Month+1;
var Year = currntDate.getFullYear();
var day = currntDate.getDay();

if(Month == 1 || Month == 3 || Month == 5 || Month == 7 || Month == 8 || Month == 10 || Month == 12)
{
	var Day = 31;
	
}
else if(Month == 4 ||Month == 6 || Month == 9 ||Month == 11)
{
		var Day =30;
}
else if(Month == 2)
{
	if(Year % 4 == 0)
	{
		
		var Day = 29;
	}
	else
	{			
		var Day = 28;
		
	}
}

var TodayIs = Month+'/'+Day+'/'+Year;

function scheduled_to_CreateTransaction(type) 
{
	var recType ='salesorder';
	var recId;
	var searchId='customsearch_sales_order_tm';
	resultSet = findTransaction(searchId);
	
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
				for(var i=0;i<resultSet.length;i++)//resultSet.length
					{
						var columns = resultSet[i].getAllColumns();
						recId = resultSet[i].getValue(columns[0]);
						var docNo = resultSet[i].getValue(columns[1]);
						var status = resultSet[i].getValue(columns[2]);
						var date = resultSet[i].getValue(columns[3]);
						var Name = resultSet[i].getValue(columns[4]);
						var startDate = resultSet[i].getValue(columns[5]);
						var EndDate = resultSet[i].getValue(columns[6]);
						var SalesRep = resultSet[i].getValue(columns[7]);
						var SalesEffDate = resultSet[i].getValue(columns[8]);
						var subsidiary = resultSet[i].getValue(columns[9]);
						var Clss = resultSet[i].getValue(columns[10]);
						var Location = resultSet[i].getValue(columns[11]);
						
						var item = resultSet[i].getValue(columns[12]);
						var qty = resultSet[i].getValue(columns[13]);
						var LineID = resultSet[i].getValue(columns[14]);
						var itemRate = resultSet[i].getValue(columns[15]);
						var qtyBilled = resultSet[i].getValue(columns[16]);
						var qtyCommited = resultSet[i].getValue(columns[17]);
						var qtyFulfill = resultSet[i].getValue(columns[18]);
						var qtyTransUnit = resultSet[i].getValue(columns[19]);
						var unit = resultSet[i].getValue(columns[20]);
						
						var descrip = resultSet[i].getValue(columns[21]);
						var priceLvl = resultSet[i].getValue(columns[22]);
						var taxItem = resultSet[i].getValue(columns[23]);
						var shipCarrier = resultSet[i].getValue(columns[24]);
						var costEstType = resultSet[i].getValue(columns[25]);
						
					
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','recId=='+recId);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','docNo ='+docNo);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','status ='+status);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','date=='+date);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','Name ='+Name);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','startDate ='+startDate);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','EndDate =='+EndDate);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','SalesRep ='+SalesRep);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','SalesEffDate ='+SalesEffDate);
						
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','subsidiary =='+subsidiary);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','Clss ='+Clss);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','Location ='+Location);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','item =='+item);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','qty ='+qty);
						nlapiLogExecution('DEBUG','scheduled_to_CreateTransaction','LineID ='+LineID);
						
						createPurchaseOrderForPR(recType,recId,docNo,status,date,Name,startDate,EndDate,SalesRep,SalesEffDate,subsidiary,Clss,Location,
								item,qty,LineID,itemRate,qtyBilled,qtyCommited,qtyFulfill,qtyTransUnit,unit,descrip,priceLvl,taxItem,shipCarrier,costEstType)
			         }
			 }
			
	
}// END Function

function createPurchaseOrderForPR(recType,recId,vendorUniq,PRlinecount,vendor,lineArray,vendorname,amount,Class,Department,date,location,itemArray,qtyArray,units,descriptionArray,reqNo,prNum,recId,rateArray,hsn_codeArray,quantity,unitArray,customername,response)	
{	
	nlapiLogExecution("DEBUG","In Create Function","createPurchaseOrderRecordFunction**************");
	nlapiLogExecution("DEBUG","In Create Function","itemArray1=="+itemArray);
	nlapiLogExecution("DEBUG","In Create Function","customer=="+customername);
	/*nlapiLogExecution("DEBUG","In Create Function","PRlinecount=="+PRlinecount);
	nlapiLogExecution("DEBUG","In Create Function","date=="+date);
	nlapiLogExecution("DEBUG","In Create Function","location=="+location_line);
	nlapiLogExecution("DEBUG","In Create Function","Class=="+Class);
	nlapiLogExecution("DEBUG","In Create Function","Department=="+Department);
	
	nlapiLogExecution("DEBUG","In Create Function","itemid=="+itemid);
	nlapiLogExecution("DEBUG","In Create Function","quantity=="+quantity);
	nlapiLogExecution("DEBUG","In Create Function","units=="+units);
	nlapiLogExecution("DEBUG","In Create Function","description=="+description);//subsidiary
	nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)
	nlapiLogExecution("DEBUG","In Create Function","customer=="+customer);//subsidiary
	nlapiLogExecution("DEBUG","In Create Function","vendorname=="+vendorname)*/
	
	
	nlapiLogExecution("DEBUG","In Create Function","vendorUniq.length=="+vendorUniq.length);
	
	var record = nlapiCreateRecord('purchaseorder', {recordmode: 'dynamic'});
	
	/*if(vendorUniq != '' && vendorUniq != 'undefined' && vendorUniq != null)
	{
		// To Set Customer Name
	   nlapiLogExecution("DEBUG","In Create Function","**To Set vendorUniq Name**");
		record.setFieldValue('vendor',vendorUniq[k]);//customer
	}*/
	
	   if(Class != '' && Class != 'undefined' && Class != null)
		{
			// To Set vendor Name
		   nlapiLogExecution("DEBUG","In Create Function","**To Set Customer Name**");
			record.setFieldValue('class',Class);//vendor
		}
	   
		if(Department != '' && Department != 'undefined' && Department != null)
		{
			record.setFieldValue('department',Department);
		}
	
   if(vendor != '' && vendor != 'undefined' && vendor != null)
	{
		// To Set vendor Name
	   nlapiLogExecution("DEBUG","In Create Function","**To Set Customer Name**");
		record.setFieldValue('entity',vendor);//vendor
	}

	if(date != '' && date != 'undefined' && date != null)
	{
		record.setFieldValue('trandate',date);
	}

	if(location != '' && location != 'undefined' && location != null)
	{
		// To Set Subsidiary
		record.setFieldValue('location',location);
	}
	    
	if(reqNo != '' && reqNo != 'undefined' && reqNo != null)
	{
		record.setFieldValue('custbody_pr_number',reqNo);
	}
	
	if(recId != '' && recId != 'undefined' && recId != null)
	{
		record.setFieldValue('custbody_req_num',recId);
		nlapiDisableField('custbody_req_num',true);
	}
    //nexus  taxregoverride
	//record.setFieldValue('taxregoverride','T');
	//record.setFieldValue('nexus',229);
	
	var price =-1;
	//var rate =50;
	
	for(var j=1;j<=itemArray.length;j++)
	{
                                                  
	      record.selectNewLineItem('item');
          nlapiLogExecution("DEBUG","In Create Function","item done=="+ itemArray[j-1]);
	      record.setCurrentLineItemValue('item', 'item', itemArray[j-1]);   
	      nlapiLogExecution("DEBUG","In Create Function","item done11==");    
    
	      record.setCurrentLineItemValue('item','quantity', qtyArray[j-1]);                              
	      nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
	      
	      record.setCurrentLineItemValue('item','custcol_pr_quantity', qtyArray[j-1]);                              
	      nlapiLogExecution("DEBUG","In Create Function"," PR quantity done==");
	      
	      record.setCurrentLineItemValue('item', 'units', unitArray[j-1]);                                          
	      nlapiLogExecution("DEBUG","In Create Function","units done==");
	      
	      record.setCurrentLineItemValue('item', 'description',descriptionArray[j-1]); 
	      nlapiLogExecution("DEBUG","In Create Function","description done==");
	      
	      record.setCurrentLineItemValue('item', 'location', location);
	      nlapiLogExecution("DEBUG","In Create Function","location done==");
	      
	      record.setCurrentLineItemValue('item', 'department',Department); 
	      nlapiLogExecution("DEBUG","In Create Function","department done==");
	      
	      record.setCurrentLineItemValue('item', 'class', Class);
	      nlapiLogExecution("DEBUG","In Create Function","class done==");
	      
	      record.setCurrentLineItemValue('item', 'customer', customername);
	      nlapiLogExecution("DEBUG","In Create Function","customer done==");
	      
	      //record.setCurrentLineItemValue('item', 'povendor', 27);
	      //nlapiLogExecution("DEBUG","In Create Function","vendor done==");	      
	      
	      record.setCurrentLineItemValue('item', 'rate', rateArray[j-1]);
	      nlapiLogExecution("DEBUG","In Create Function","amount done==");
	            
	            
	      record.commitLineItem('item');
	      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
	       
	}

	var SubmitIt=nlapiSubmitRecord(record,true);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 
	 //nlapiLogExecution("DEBUG","In Create Function","Record Submit done=="+SubmitIt);
}

function findTransaction(searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	// filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',recordID);
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
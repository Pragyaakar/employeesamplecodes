	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       20 Feb 2020     Tushar More
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
	
	

function postFunction_createTrans_Netsuite(datain)
{	
 try
 {
	 var s_result;
	//var datain = JSON.stringify(datain);
	
	nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' Data In -->'+datain)
	
	for(var i =0;i<datain.length;i++)
	{
		var checkData =datain[i];
		
		var type=checkData['record_type'];
	
		if(type =='CustInvc')//SalesOrd ,CustInvc
		{
	 
	    var recId=checkData['record_id'];
		var tranDate = checkData['record_date'];
		var docNum = checkData['record_doc_num'];
		var customer= checkData['record_customer'];
		var department = checkData['record_department'];
		var location = checkData['record_loc'];
		var salesEffDate =checkData['record_sales_eff_date'];
		var shipDate = checkData['record_shipdate'];
		var shipCarrier = checkData['record_shipcarri'];
		var actulShipDate = checkData['record_ship_act_date'];
		var estGrossProfitPercent =	checkData['record_est_grs_profit_perc'];
		// var currency = checkData['record_currency'];
		var exchRate = checkData['record_exrate'];
		var estExtCost = checkData['record_est_extcost'];
		var estGrossProfit = checkData['record_est_grs_profit'];
		var itemArr= checkData['record_itmarr'];
		var qtyArr =checkData['record_qtyarr'];
		var qtyCommitArr = checkData['record_qty_comm_arr'];
		var qtyFulfillArr =	checkData['record_qty_fulfil_arr'];
			
		var qtyInvoicedArr =checkData['record_qty_inv_arr'];
		var qtyBackOrderArr= checkData['record_qty_back_arr'];
		var unitsArr=checkData['record_unit_arr'];
		var descripArr=checkData['record_descrp_arr'];
			
		var priceLvlArr =checkData['record_price_arr'];
		var rateArr=checkData['record_rate_arr'];
		var amtArr=checkData['record_amt_arr'];
        var costEstTypeArr =checkData['record_cest_type'];
        
        customer = FindCustomer(customer.toString());
       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' customer In -->'+customer)
        
        department = FindDepartment(department.toString());
       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
        
        location = FindLocation(location.toString());
       // nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
        
       
        
      //  itemArr  = FindItemSearch(itemArr);
      //  nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' itemArr In -->'+itemArr)
        
		/*	
        if(location != null)
        {
        	location=62;
        }
        
        
        if(customer==12)
        {
        	customer=9444;
        }
        else if(customer==15)
        {
        	customer=9449;
        }
        else if(customer==13)
        {
        	customer=9450;
        }
        
        subsi=36;
        
       */
        
        
/*        
        
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' docNum In -->'+docNum)
          
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' tranDate In -->'+tranDate)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' subsi In -->'+subsi)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' location In -->'+location)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' salesEffDate In -->'+salesEffDate)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' shipDate In -->'+shipDate)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' shipCarrier In -->'+shipCarrier)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' actulShipDate In -->'+actulShipDate)
            
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' currency In -->'+currency)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' exchRate In -->'+exchRate)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' estExtCost In -->'+estExtCost)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' estGrossProfit In -->'+estGrossProfit)
            
             nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' itemArr In -->'+itemArr)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' qtyArr In -->'+qtyArr)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' qtyCommitArr In -->'+qtyCommitArr)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' qtyFulfillArr In -->'+qtyFulfillArr)
            
             nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' qtyInvoicedArr In -->'+qtyInvoicedArr)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' qtyBackOrderArr In -->'+qtyBackOrderArr)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' unitsArr In -->'+unitsArr)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' descripArr In -->'+descripArr)
            
             nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' priceLvlArr In -->'+priceLvlArr)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' rateArr In -->'+rateArr)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' amtArr In -->'+amtArr)
            nlapiLogExecution('DEBUG','postFunction_SXP_Netsuite',' costEstTypeArr In -->'+costEstTypeArr)
		*/
            createSalesOrderFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr);
		}
			
	}
		
	
		s_result = ' Data has been successfully imported into netsuite.';
		
	return s_result;
  }
  catch(exception)
  {
	nlapiLogExecution('DEBUG','ERROR',' Exception Caught -->'+exception)						
  }
  
}

function createSalesOrderFunction(docNum,customer,tranDate,department,location,salesEffDate,shipDate,shipCarrier,actulShipDate,exchRate,estExtCost,estGrossProfit,estGrossProfitPercent,itemArr,qtyArr,qtyCommitArr,qtyFulfillArr,qtyInvoicedArr,qtyBackOrderArr,unitsArr,descripArr,priceLvlArr,rateArr,amtArr,costEstTypeArr)
{

	var record = nlapiCreateRecord('invoice', {recordmode: 'dynamic'}); //salesorder
	
	   record.setFieldValue('entity',customer);
       record.setFieldValue('tranid',docNum);
	   record.setFieldValue('trandate',new Date(tranDate));
	   record.setFieldValue('department',department);
	   record.setFieldValue('location',location);
	   record.setFieldValue('saleseffectivedate',new Date(salesEffDate));
	   record.setFieldValue('shipdate',new Date(shipDate));
	   record.setFieldValue('shipcarrier',shipCarrier);
	   record.setFieldValue('actualshipdate',new Date(actulShipDate));
	  // record.setFieldValue('currency',currency);
	   record.setFieldValue('exchangerate',exchRate);
	   record.setFieldValue('totalcostestimate',estExtCost);
	   record.setFieldValue('estgrossprofit',estGrossProfit);
	   record.setFieldValue('estgrossprofitpercent',estGrossProfitPercent);
	  
	 //  record.setFieldValue('custbody_atpl_placeofsupp',2); // Demo account mandatory field that is why taken
	   
	   nlapiLogExecution("DEBUG","In Create Function","itemArr =="+itemArr);
	    for( var l=0;l<itemArr.length;l++)
		{
	    	  nlapiLogExecution("DEBUG","In Create Function","itemArr.length =="+itemArr.length);
	    	  nlapiLogExecution("DEBUG","In Create Function","itemArr.length =="+qtyArr[l]);
	    	  
	         var itemSet  = FindItemSearch(itemArr[l]);
	    	  
	    	 record.selectNewLineItem('item');
		    
	    	 record.setCurrentLineItemValue('item','item',itemSet);
		    
		     record.setCurrentLineItemValue('item','quantity',qtyArr[l]);
		    
		     record.setCurrentLineItemValue('item','quantitycommitted',qtyCommitArr[l]);
		    
		     record.setCurrentLineItemValue('item','quantitybilled',qtyInvoicedArr[l]);
		   
		     record.setCurrentLineItemValue('item','quantityfulfilled',qtyFulfillArr[l]);
		    
		     record.setCurrentLineItemValue('item','quantitybackordered',qtyBackOrderArr[l]);
		    
		     record.setCurrentLineItemValue('item','units',unitsArr[l]);
		    
		     record.setCurrentLineItemValue('item','description',descripArr[l]);
		    
		     record.setCurrentLineItemValue('item','price',priceLvlArr[l]);
		    
		     record.setCurrentLineItemValue('item','rate',rateArr[l]);
		    
		     record.setCurrentLineItemValue('item','amount',amtArr[l]);
		    
		   //  record.setCurrentLineItemValue('item','costestimatetype',costEstTypeArr[l]);
		    
		     record.commitLineItem('item');
		}
	    
	    var SubmitIt=nlapiSubmitRecord(record,true);  
		
	    nlapiLogExecution("DEBUG","In Create Function","SO Created ID..=="+SubmitIt);
		 
	
	
}

function FindCustomer(customer)
{ 
	// nlapiLogExecution('DEBUG','FindCustomer Function',' customer IS -->'+customer)
    var filters=new Array();
	var columns = new Array();
	
	if(customer != null && customer != '')
    {
	 filters[0] = new nlobjSearchFilter('entityid', null,'contains',customer);
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('entityid');
	
	var searchResultItem = nlapiSearchRecord('customer', 'customsearch_integrated_customer_search', filters, columns);
	
	
		if (searchResultItem != null)
		{
			for(var j1=0;j1<searchResultItem.length;j1++)
			{
				var ID = searchResultItem[j1].getValue('internalid');
					
			}
			
		}


		return ID;
	}

function FindDepartment(department)
{ 
    var filters=new Array();
	var columns = new Array();
	
	// nlapiLogExecution('DEBUG','FindSubsidiary Function',' subsi IS -->'+subsi)
	
	if(subsi != null && subsi != '')
    {
	 filters[0] = new nlobjSearchFilter('name', null,'contains',department);
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	
	var searchResultItem = nlapiSearchRecord('department', 'customsearch_integrated_deptmnt_search', filters, columns);
	
	
		if (searchResultItem != null)
		{
			for(var j1=0;j1<searchResultItem.length;j1++)
			{
				var ID = searchResultItem[j1].getValue('internalid');
					
			}
			
		}


		return ID;
	}

function FindLocation(location)
{ 
    var filters=new Array();
	var columns = new Array();
	
	// nlapiLogExecution('DEBUG','FindLocation Function',' location IS -->'+location)
	
	if(location==='Wireless Next Location')
	{
		location ='Wireless Next';
	}
	
	if(location != null && location != '')
    {
	 filters[0] = new nlobjSearchFilter('name', null,'contains',location);
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	
	var searchResultItem = nlapiSearchRecord('location', 'customsearch_integr_location', filters, columns);
	
	
		if (searchResultItem != null)
		{
			for(var j1=0;j1<searchResultItem.length;j1++)
			{
				var ID = searchResultItem[j1].getValue('internalid');
					break;
			}
			
		}


		return ID;
	}

function FindItemSearch(item)
{ 
    var filters=new Array();
	var columns = new Array();
	
	// nlapiLogExecution('DEBUG','FindItemSearch Function',' item IS -->'+item)
	
	if(item != null && item != '')
    {
	 filters[0] = new nlobjSearchFilter('name', null,'contains',item);
	}
	
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('name');
	
	var searchResultItem = nlapiSearchRecord('item', 'customsearch_integrated_search', filters, columns);
	
	
		if (searchResultItem != null)
		{
			for(var j1=0;j1<searchResultItem.length;j1++)
			{
				var ID = searchResultItem[j1].getValue('internalid');
					
			}
			
		}


		return ID;
	}
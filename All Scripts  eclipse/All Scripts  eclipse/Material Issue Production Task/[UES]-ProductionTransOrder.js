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
function uesCreateTransOrderOnCompleted(type)
{
	try{
		   var itemArray = new Array();
		 	var rateArray = new Array();
		 	var descriptionArray = new Array();
		 	var qtyArray = new Array();
		 	var unitArray = new Array();
		 	var locationArray = new Array();
		 	
		 	 var itemArray1 = new Array();
			 	var rateArray1 = new Array();
			 	var descriptionArray1 = new Array();
			 	var qtyArray1 = new Array();
			 	var unitArray1 = new Array();
			 	var locationArray1 = new Array();
		 	var line_chkArr=new Array();
		 	var line_chkArr1=new Array();
		 	var salesArr=new Array();
		 	var custArr=new Array();
		 	var vendArr=new Array();
		 	var amtArr=new Array();
		 	var custNew=new Array();
		 	var typeItemArr =new Array();
		 	var typeItemArr1 =new Array();
	    	var BackOrderQtyArray =new Array();
	    	var IsLotItemArr=[];
	    	var IsLotItemArr1=[];
	    	var useBinsArr=[];
	    	var InvNumArr=[];
	    	var InvQtyArr=[];
		
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var recObj = nlapiLoadRecord(recordType,recordId);
		nlapiLogExecution('DEBUG','Serach Value','irObj :'+recObj +'Type :'+recordType+'ID :'+recordId);
		
		var Customer = recObj.getFieldValue('entity');  //entity
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  Customer  ==" + Customer);
	 	
	 	
	 	var Assembly = recObj.getFieldValue('assemblyitem');  //entity
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  Assembly  ==" + Assembly);
	 	
	 	var AssemblyQty = recObj.getFieldValue('quantity');  //entity
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  AssemblyQty  ==" + AssemblyQty);
	 	
	 	var WIP = recObj.getFieldValue('iswip');  //entity
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  WIP  ==" + WIP);
	 	
		var Routing = recObj.getFieldValue('manufacturingrouting');  //entity
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  Routing  ==" + Routing);
	 	
		
	 	
		var Department = recObj.getFieldValue('department');  //entity
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  Department  ==" + Department);
		 	
		 var Class = recObj.getFieldValue('class');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  class  ==" + Class);
		 	
		 var date = recObj.getFieldValue('trandate');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  date  ==" + date);
		 	
		 var Startdate = recObj.getFieldValue('startdate');
		    nlapiLogExecution('DEBUG', 'aftr submit', "  Startdate  ==" + Startdate);
			 	
		 var Enddate = recObj.getFieldValue('enddate');
		    nlapiLogExecution('DEBUG', 'aftr submit', "  Enddate  ==" + Enddate);
		 	
		 var subsidiary = recObj.getFieldValue('subsidiary');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiary  ==" + subsidiary);
		 	
        
        var orderstatus = recObj.getFieldValue('orderstatus');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  orderstatus  ==" +orderstatus);
		 	
        
		 var location = recObj.getFieldValue('location');
			nlapiLogExecution('DEBUG', 'aftr submit', "  location  ==" + location);
			
			var CreateFrom = recObj.getFieldValue('createdfrom');
			nlapiLogExecution('DEBUG', 'aftr submit', "  CreateFrom  ==" + CreateFrom);
			
			if(orderstatus=='H' &&(CreateFrom==null || CreateFrom== '' || CreateFrom== undefined))
				{
				  CreateTransferOrder(Customer,Department,Class,date,subsidiary,location,Assembly,AssemblyQty,recordId)
				}

	  }
	
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
	
}

function CreateTransferOrder(Customer,Department,Class,date,subsidiary,location,Assembly,AssemblyQty,recordId)
{
    var record = nlapiCreateRecord('transferorder', {recordmode: 'dynamic'}); 
   
    
    
 	if(date != '' && date != 'undefined' && date != null)
 	{
 		record.setFieldValue('trandate',date);
 	}

 	if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
 	{
 		// To Set Subsidiary
 		
 		record.setFieldValue('subsidiary',subsidiary);
 		
 		if(subsidiary =='30')
 		{
 			tranlocation='7';
 			record.setFieldValue('transferlocation',tranlocation);
 		
 		}
 		else 
 	 	{
 			var searchresults= findTransaction(subsidiary);
 			   if(searchresults != null)
	  	    	{
		  			for (var i = 0;  i < searchresults.length; i++) 
		  			{
		  			   var Loc_id = searchresults[i].getValue('internalid');
		  			   
		  			    var name = searchresults[i].getValue('name');
		                  
		  			    if(name.length =='12')
		  			    {
		  			    	tranlocation =Loc_id;
		  			    	break;
		  			    }
		  			 }
		  				
	  		    }	
 	 			
 	 			record.setFieldValue('transferlocation',tranlocation);
 	 		
 		}
 		
 	}
 	
 	if(location != '' && location != 'undefined' && location != null)
 	{
 		
        record.setFieldValue('location',location);
    
 	}
 	
 	


 	if(Department != '' && Department != 'undefined' && Department != null)
 	{
 		// To Set Subsidiary
 		record.setFieldValue('department',Department);
 	}
 	
 	if(Class != '' && Class != 'undefined' && Class != null)
 	{
 		// To Set Subsidiary
 		record.setFieldValue('class',Class);
 	}
 	
 	var usr =nlapiGetUser();
 	record.setFieldValue('employee',usr);//custbody_workorder_trans_id
 	
 	 record.setFieldValue('custbody_workorder_trans_id',recordId);
 	 
 	 var columns = new Array();
		 columns[0] = new nlobjSearchColumn('locationaveragecost');
	
		
		 var filters = new Array();
		 filters[0] = new nlobjSearchFilter ('internalid', null, 'anyof',Assembly);
		 filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
		 var searchresults1 = nlapiSearchRecord('item',null,filters,columns);//customsearch_item_search_so_po
		 
		// alert('searchresults='+searchresults)
		if(searchresults1 != null)
     	{
			for (var i1 = 0;  i1 < searchresults1.length; i1++) 
			{
			    avail_price = searchresults1[i1].getValue('locationaveragecost');
               //   alert('location avg Cost***************' +avail_price);
			 
			 }
				
	    }	
 	
 

 	for(var i=1;i<=1;i++)
 	{
 		
 		record.selectNewLineItem('item');

    record.setCurrentLineItemValue('item', 'item',Assembly);   
    nlapiLogExecution("DEBUG","In Create Function","item done=="+Assembly);
    
  
    record.setCurrentLineItemValue('item', 'quantity', AssemblyQty);                              
    nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
    
    record.setCurrentLineItemValue('item', 'rate', avail_price);                              
    nlapiLogExecution("DEBUG","In Create Function"," avail_price done==");
    
    
    
     record.commitLineItem('item');
    nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
    
 	}
  
 	 var SubmitIt = nlapiSubmitRecord(record);  
 	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
 	 
 	 return SubmitIt;

}

function findTransaction(subsidiary)
{
	var searchId ='customsearch_close_wo_trans_location';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('subsidiary', null,'anyOf',subsidiary);
	// filters[1]=new nlobjSearchFilter('location','inventorynumber','anyOf',locForm);
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





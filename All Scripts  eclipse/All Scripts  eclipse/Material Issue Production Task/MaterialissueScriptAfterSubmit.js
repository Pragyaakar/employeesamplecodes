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
function userEvntToCreateTransOrder(type)
{
	if(type =='create')// || type == 'edit'
	{
	 try
	  {
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
           if(location == null || location == '' || location == undefined)
            {
              location = 48;
            }
	 	
	      var PRlinecount=recObj.getLineItemCount('item');
		    nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
		  
		
			for(var i=1;i<=PRlinecount;i++)
			{
				
				var itemid =recObj.getLineItemValue('item','item',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
				
				var BackOrderQty =recObj.getLineItemValue('item','quantitybackordered',i);
	        	nlapiLogExecution('DEBUG', 'aftr submit', "  BackOrderQty  ==" + BackOrderQty);
	        	BackOrderQtyArray.push(BackOrderQty);
            	
                var typeItem =recObj.getLineItemValue('item','custcol_item_type',i);
	        	nlapiLogExecution('DEBUG', 'aftr submit', "  typeItem  ==" + typeItem);
				
				if((BackOrderQty != null && BackOrderQty != undefined && BackOrderQty != '' && BackOrderQty > 0) && (typeItem !='Assembly/Bill of Materials'))
				{
				
	            	itemArray.push(itemid);
	            	
	            	var quantity =recObj.getLineItemValue('item','quantitybackordered',i);
		        	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
	            	qtyArray.push(quantity);
	            	
	            
	            	
	            	var units =recObj.getLineItemValue('item','units',i);    
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  units  ==" + units);
	            	unitArray.push(units);
	            
	            	var line_chk =recObj.getLineItemValue('item','line',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  line_chk  ==" + line_chk);
	            	line_chkArr.push(line_chk);
	            	
	            	
	            	var typeItem =recObj.getLineItemValue('item','custcol_item_type',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  typeItem  ==" + typeItem);
	            	typeItemArr.push(typeItem);
	            	
	            	
	            	//============================= CHanges Are From Here ======================
	            	
	            	
	            	
	            	var IsLotItem =recObj.getLineItemValue('item','custcol_islot_item',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  IsLotItem  ==" + IsLotItem);
	            	IsLotItemArr.push(IsLotItem);
	            	
	            	if(typeItem =='Inventory Item' && IsLotItem =='F')
	            	{
	            		  var itemRecValues = nlapiLookupField('inventoryitem',itemid, ['quantityavailable','usebins']);
	            		   var qtyonhand = itemRecValues['quantityavailable'];
	            		   var useBins = itemRecValues['usebins'];
	            		   nlapiLogExecution('DEBUG', 'qtyonhand', 'qtyonhand = ' + qtyonhand);
	            		   nlapiLogExecution('DEBUG', 'useBins', 'useBins = ' + useBins);
	            		   useBinsArr.push(useBins);
	            		   
	            		   
	            	}
	            	
	            	//===========================================================================
				}
				
				else if((BackOrderQty != null && BackOrderQty != undefined && BackOrderQty != '' && BackOrderQty > 0) && (typeItem =='Assembly/Bill of Materials'))
				{
				
	            	itemArray1.push(itemid);
	            	
	            	var quantity1 =recObj.getLineItemValue('item','quantitybackordered',i);
		        	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity1  ==" + quantity1);
	            	qtyArray1.push(quantity1);
	            	
	            
	            	
	            	var units1 =recObj.getLineItemValue('item','units',i);    
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  units1  ==" + units1);
	            	unitArray.push(units1);
	            
	            	var line_chk1 =recObj.getLineItemValue('item','line',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  line_chk1  ==" + line_chk1);
	            	line_chkArr1.push(line_chk1);
	            	
	            	
	            	var typeItem1 =recObj.getLineItemValue('item','custcol_item_type',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  typeItem1  ==" + typeItem1);
	            	typeItemArr1.push(typeItem1);
	            	
	            	
	            	//============================= CHanges Are From Here ======================
	            	
	            	
	            	
	            	var IsLotItem1 =recObj.getLineItemValue('item','custcol_islot_item',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  IsLotItem1  ==" + IsLotItem1);
	            	IsLotItemArr1.push(IsLotItem1);
	            	
	            	if(typeItem =='Inventory Item' && IsLotItem =='F')
	            	{
	            		  var itemRecValues = nlapiLookupField('inventoryitem',itemid, ['quantityavailable','usebins']);
	            		   var qtyonhand = itemRecValues['quantityavailable'];
	            		   var useBins = itemRecValues['usebins'];
	            		   nlapiLogExecution('DEBUG', 'qtyonhand', 'qtyonhand = ' + qtyonhand);
	            		   nlapiLogExecution('DEBUG', 'useBins', 'useBins = ' + useBins);
	            		   useBinsArr.push(useBins);
	            		   
	            		   
	            	}
	            	
	            	//===========================================================================
				}
			} 
	    
			if(itemArray != null && itemArray != '' && itemArray != undefined && orderstatus == 'B')//&& orderstatus == 'B'
			{
			var transId = CreateTransferOrder(Customer,Department,Class,date,subsidiary,location,unitArray,itemArray,qtyArray,typeItemArr,IsLotItemArr,useBinsArr,recordId);
				
			  if(transId != null && transId !='' && transId !=undefined)
				{
					nlapiSubmitField(recordType,recordId,'custbody_material_issue_for_workorder',transId);
				}
			}
			
			if(itemArray1 != null && itemArray1 != '' && itemArray1 != undefined && orderstatus == 'B')
			{
				CreateWorkOrder(Routing,WIP,Assembly,Customer,Department,Class,date,subsidiary,location,unitArray1,itemArray1,qtyArray1,typeItemArr1,IsLotItemArr1,useBinsArr,recordId);
					
			}
			
			
	 
	  }
	
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
	}
}

function CreateTransferOrder(Customer,Department,Class,date,subsidiary,location,unitArray,itemArray,qtyArray,typeItemArr,IsLotItemArr,useBinsArr,recordId)
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
 	}
 	
 	if(location != '' && location != 'undefined' && location != null)
 	{
 		// To Set Subsidiary
 		 if(subsidiary==36)
        {
          location=40;
          record.setFieldValue('transferlocation',location);
        }
      else
      {
         location=53;
        record.setFieldValue('transferlocation',location);
      }
 		
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
 	
 	var locForm=53;
 	 var price =-1;
 	 var rate =100;
 	var InvNumArr=[];
	var InvNumQtyArr=[];

 	for(var i=1;i<=itemArray.length ;i++)
 	{
 		
 		record.selectNewLineItem('item');

    record.setCurrentLineItemValue('item', 'item', itemArray[i-1]);   
    nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArray[i-1]);
    
  
    record.setCurrentLineItemValue('item', 'quantity', qtyArray[i-1]);                              
    nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
    
    record.setCurrentLineItemValue('item', 'units', unitArray[i-1]);                                          
    nlapiLogExecution("DEBUG","In Create Function","units done==");
    
    
    record.setCurrentLineItemValue('item', 'price',price);
    nlapiLogExecution("DEBUG","In Create Function","price done==");
    
    record.setCurrentLineItemValue('item', 'rate', rate);                                          
    nlapiLogExecution("DEBUG","In Create Function","units done==");
    

	 record.setCurrentLineItemValue('item', 'amount',rate); 
    nlapiLogExecution("DEBUG","In Create Function"," amount done==");
    
    
    
     record.commitLineItem('item');
    nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
    
 	}
  
 	 var SubmitIt = nlapiSubmitRecord(record);  
 	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
 	 
 	 return SubmitIt;

}


function CreateWorkOrder(Routing,WIP,Assembly,Customer,Department,Class,date,subsidiary,location,unitArray1,itemArray1,qtyArray1,typeItemArr1,IsLotItemArr1,useBinsArr,recordId)
{
    var record = nlapiCreateRecord('workorder', {recordmode: 'dynamic'}); 
   
   
    if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
 	{
 		// To Set Subsidiary
 		
 		record.setFieldValue('subsidiary',subsidiary);
 	}
    
    if(Customer != '' && Customer != 'undefined' && Customer != null)
 	{
 		record.setFieldValue('entity',Customer);
 	}

    if(Assembly != '' && Assembly != 'undefined' && Assembly != null)
 	{
 		record.setFieldValue('assemblyitem',Assembly);
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
 	
 	if(WIP != '' && WIP != 'undefined' && WIP != null)
 	{
 		// To Set Subsidiary
 		if(WIP =='T')
 		{
 			record.setFieldValue('iswip',WIP);
 			record.setFieldValue('manufacturingrouting',Routing);
 		}
 	
 	}
 	
 	/*var usr =nlapiGetUser();
 	record.setFieldValue('employee',usr);//custbody_workorder_trans_id
 	
 	record.setFieldValue('custbody_workorder_trans_id',recordId);
 	*/
 	var locForm=53;
 	 var price =-1;
 	 var rate =100;
 	var InvNumArr=[];
	var InvNumQtyArr=[];

 	for(var i=1;i<=itemArray1.length ;i++)
 	{
 		
 		record.selectNewLineItem('item');

    record.setCurrentLineItemValue('item', 'item', itemArray1[i-1]);   
    nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArray1[i-1]);
    
  
    record.setCurrentLineItemValue('item', 'quantity', qtyArray1[i-1]);                              
    nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
    
   // record.setCurrentLineItemValue('item', 'units', unitArray1[i-1]);                                          
    nlapiLogExecution("DEBUG","In Create Function","units done==");
    
    /*
    record.setCurrentLineItemValue('item', 'price',price);
    nlapiLogExecution("DEBUG","In Create Function","price done==");
    
    record.setCurrentLineItemValue('item', 'rate', rate);                                          
    nlapiLogExecution("DEBUG","In Create Function","units done==");
    

	 record.setCurrentLineItemValue('item', 'amount',rate); 
    nlapiLogExecution("DEBUG","In Create Function"," amount done==");
    
    */
    
     record.commitLineItem('item');
    nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
    
 	}
  
 	 var SubmitIt = nlapiSubmitRecord(record);  
 	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
 	 
 	 return SubmitIt;

}

function findTransaction(itmid,locForm)
{
	var searchId ='customsearch_item_lot_n_serial_num';
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',itmid);
	 filters[1]=new nlobjSearchFilter('location','inventorynumber','anyOf',locForm);
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

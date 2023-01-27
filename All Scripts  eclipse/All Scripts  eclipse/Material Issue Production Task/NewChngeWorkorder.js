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
		
		var Customer = recObj.getFieldValue('entity');  //entity
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  Customer  ==" + Customer);
	 	
		
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
            	
				
				if(BackOrderQty != null && BackOrderQty != undefined && BackOrderQty != '' && BackOrderQty > 0)
				{
				
	            	itemArray.push(itemid);
	            	
	            	var quantity =recObj.getLineItemValue('item','quantitybackordered',i);
		        	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
	            	qtyArray.push(quantity);
	            	
	            
	            	
	            	var units =recObj.getLineItemValue('item','units',i);    
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  units  ==" + units);
	            	unitArray.push(units);
	            
	             /*	var amount =recObj.getLineItemValue('item','estimatedamount',i);    
	            	amtArr.push(amount);
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  amount  ==" + amount);//estimatedamount
	            	
	            	var rate =recObj.getLineItemValue('item','rate',i);    
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  rate  ==" + rate);
	            	rateArray.push(rate);
	            	
	            	var description =recObj.getLineItemValue('item','description',i);    
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  description  ==" + description);
	            	descriptionArray.push(description);
	            	*/
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
			} 
	    
			if(itemArray != null && itemArray != '' && itemArray != undefined && orderstatus == 'B')//&& orderstatus == 'B'
			{
			var transId = CreateTransferOrder(Customer,Department,Class,date,subsidiary,location,unitArray,itemArray,qtyArray,typeItemArr,IsLotItemArr,useBinsArr,recordId);
				
			}
			
			if(transId != null && transId !='' && transId !=undefined)
			{
				nlapiSubmitField(recordType,recordId,'custbody_material_issue_for_workorder',transId);
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
    
    
    
    //======================= Changes ======================================
    
	/*  if(IsLotItemArr[i-1] =='T')
      {
  		  var totQty=0;
  		  var itmid =itemArray[i-1];
  		  var qttty =qtyArray[i-1];
  		  var inventorydetailSearch = findTransaction(itmid,locForm);
  		  
  		 nlapiLogExecution("DEBUG","In Create Function"," inventorydetailSearch done=="+inventorydetailSearch.length);
  		  
  	  if( inventorydetailSearch !=null)
		   {
			   for(var m=0;m<inventorydetailSearch.length;m++)
			   {
   				   var invNumSerch =inventorydetailSearch[m].getValue("internalid","inventoryNumber");
   				   //"quantityavailable","inventoryNumber"
   				   var AvailQty =inventorydetailSearch[m].getValue("quantityavailable","inventoryNumber");
   				   
   				
   				   
   				   if(AvailQty <= qttty && totQty <= qttty)
   				   {
   					 totQty += parseFloat(AvailQty);
   					 
	   					InvNumArr.push(invNumSerch);
	   					InvNumQtyArr.push(AvailQty);
	   				 
		   				 if(totQty > qttty)
	   					 {
		   					InvNumArr.pop(invNumSerch);
		   					InvNumQtyArr.pop(AvailQty);
	   						var rem = parseFloat(totQty)-parseFloat(qttty);
	   					 }
		   				else if(totQty == qttty)
		  				{
		  						 break;
		  			    } 
	   					 
	   			   }
   				   else if(AvailQty <= rem && totQty <= qttty)
   				   {
	   					InvNumArr.push(invNumSerch);
	   					InvNumQtyArr.push(AvailQty);
   				   }
   				
  			
			   }
		   }
  	 nlapiLogExecution("DEBUG","In Create Function"," InvNumArr done=="+InvNumArr);
  	 nlapiLogExecution("DEBUG","In Create Function"," InvNumQtyArr done With Qty is=="+InvNumQtyArr+'='+totQty);
  		
  		  var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
	  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
	  	  
	  	 
		     var s= subrec.getLineItemCount('inventoryassignment');
		     nlapiLogExecution('DEBUG', 'Acct', 'subrec for Lot Item inventory count= ' + s);
		     if(s > 0)
		     {
		    	 nlapiLogExecution('DEBUG', 'Acct', 'Inside the IsLotItemArr to remove subrec= ');
		    	   for(var i1 = 1; i1 <= s; i1++)
				     {  
				    	 subrec.removeLineItem('inventoryassignment', i1);
				    	 count++;
			          }
		     }
		      if(InvNumArr.length > 1)
	  	      {
		    	  nlapiLogExecution('DEBUG', 'Acct', 'InvNumArr.length = '+InvNumArr.length );
	  	    	  for(var k=1 ;k<=InvNumArr.length;k++)
	  	    	  {
	  	    		  subrec.selectNewLineItem('inventoryassignment');
	  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InvNumArr[k-1]);
	  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(InvNumQtyArr[k-1]));
	  			  	  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
                      subrec.commitLineItem('inventoryassignment');//	  
	  		  	      nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());	  
	  	    	  }
	  	    	subrec.commit();
	  	      }
	  	      else
	  	      {
	  	    	 var totQty=0;
		  		  var itmid =itemArray[i-1];
		  		  var qttty =qtyArray[i-1];
		  		  var inventorydetailSearch = findTransaction(itmid,locForm);
		  		  
		  		 nlapiLogExecution("DEBUG","In Create Function"," inventorydetailSearch done=="+inventorydetailSearch.length);
		  		  
		  	  if( inventorydetailSearch !=null)
	   		   {
	   			   for(var m=0;m<inventorydetailSearch.length;m++)
	   			   {
		   				   var invNumSerch =inventorydetailSearch[m].getValue("internalid","inventoryNumber");
		   				   //"quantityavailable","inventoryNumber"
		   				   var AvailQty =inventorydetailSearch[m].getValue("quantityavailable","inventoryNumber");
		   				   
		   				
		   				   
		   				   if(AvailQty <= qttty && totQty <= qttty)
		   				   {
		   					 totQty += parseFloat(AvailQty);
		   					 
			   					InvNumArr.push(invNumSerch);
			   					InvNumQtyArr.push(AvailQty);
			   				 
				   				 if(totQty > qttty)
			   					 {
				   					InvNumArr.pop(invNumSerch);
				   					InvNumQtyArr.pop(AvailQty);
			   						var rem = parseFloat(totQty)-parseFloat(qttty);
			   					 }
				   				else if(totQty == qttty)
				  				{
				  						 break;
				  			    } 
			   					 
			   			   }
		   				   else if(AvailQty <= rem && totQty <= qttty)
		   				   {
			   					InvNumArr.push(invNumSerch);
			   					InvNumQtyArr.push(AvailQty);
		   				   }
		   				
		  			
	   			   }
	   		   }
	  	    	  
	  	    	  
	  	    	  
	  	      subrec.selectNewLineItem('inventoryassignment');
	  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InvNumArr);
	  		  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
		  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(InvNumQtyArr));
		  	 
		  	  nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]==');
		  	  subrec.commitLineItem('inventoryassignment');//	  
	  	      subrec.commit();
	  	      nlapiLogExecution('DEBUG', 'Acct', 'JSON.stringify() done= ' + JSON.stringify());	  
	  	      }	  
  	     
  	     
      }
    
    */
  //==========================================================================  
    
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


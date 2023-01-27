function PRdataLoadForInvAdjust(request,response)
{
 	nlapiLogExecution('DEBUG', 'aftr submit', "  Enter in Function" );
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
 	var InvNumArr=new Array();
 	var InvQtyArr=new Array();
 	var IsLotItemArr =new Array();
 	var typeItemArr =new Array();//custUniq
    var useBinsArr =new Array();
    var binnumberArr= new Array();
    var remainQtyArr= new Array();
    var remainQty =0;
 	var recId = request.getParameter('custscript_record'); 
	
    var locForm= request.getParameter('custscript_loc');
    var accForm= request.getParameter('custscript_acc');
    
  //  var searchId= 'item_location_search';
    
    recObj = nlapiLoadRecord('purchaserequisition',recId);
	 
 	nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + recId +" Record :"+recObj);
	
	 var Department = recObj.getFieldValue('department');
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  Department  ==" + Department);
	 	
	 var Class = recObj.getFieldValue('class');
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  class  ==" + Class);
	 	
	 var date = recObj.getFieldValue('trandate');
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  date  ==" + date);
	 	
	 var subsidiary = recObj.getFieldValue('subsidiary');
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiary  ==" + subsidiary);
	 	
	 	 var location = recObj.getFieldValue('location');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  location  ==" + location);
		 	
		 	var approveStat = recObj.getFieldValue('approvalstatus');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  approveStat  ==" + approveStat);
	 	
      var PRlinecount=recObj.getLineItemCount('item');
	  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
	  
	
		for(var i=1;i<=PRlinecount;i++)
		{
			var Availquantity =recObj.getLineItemValue('item','custcol_onlocation_available',i);
			
			if(Availquantity!=null && Availquantity!='' && Availquantity > 0)
			{
				var itemid =recObj.getLineItemValue('item','item',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
            	itemArray.push(itemid);
				
			    	var quantity =recObj.getLineItemValue('item','quantity',i);
	        	   nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
	        	   
	        	    if(Availquantity < quantity)
	        	    {
	        	    
	        	    	  qtyArray.push(Availquantity);
	        	    	
	        	    	  remainQty = parseFloat(quantity)-parseFloat(Availquantity);
	        	    	
	        	      remainQtyArr.push(remainQty);
	        	    }
	        	    else 
	        		{
	        		   qtyArray.push(quantity);
	        		}
	        	
	            	
	            	
	            	var units =recObj.getLineItemValue('item','units',i);    
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  units  ==" + units);
	            	
	            	var customer =recObj.getLineItemValue('item','customer',i);
	            	custArr.push(customer);
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  customer  ==" + customer);
	            	
	            	var vendorname =recObj.getLineItemValue('item','vendorname',i);
	            	vendArr.push(vendorname);
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  vendorname  ==" + vendorname);
	            	
	            	
	          
	            	var amount =recObj.getLineItemValue('item','estimatedamount',i);    
	            	amtArr.push(amount);
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  amount  ==" + amount);//estimatedamount
	            	
	            	var rate =recObj.getLineItemValue('item','rate',i);    
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  rate  ==" + rate);
	            	
	            	//rate1 = parseFloat(amount)/parseFloat(quantity);
	            	rateArray.push(rate);
	            	
	            	var description =recObj.getLineItemValue('item','description',i);    
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  description  ==" + description);
	            	descriptionArray.push(description);
	            	
	            	var line_chk =recObj.getLineItemValue('item','line',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  line_chk  ==" + line_chk);
	            	line_chkArr.push(line_chk);
	            	
	            	
	            	var typeItem =recObj.getLineItemValue('item','custcol_item_type',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  typeItem  ==" + typeItem);
	            	typeItemArr.push(typeItem);
	            	
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
	            /* 	else if(typeItem =='Inventory Item' && IsLotItem =='T')
	            	{
	            		 rec= recObj.viewLineItemSubrecord('item', 'inventorydetail',i);
	            		 invcount = rec.getLineItemCount('inventoryassignment');
	            		 nlapiLogExecution('DEBUG', 'aftr submit', "  rec  ==" + rec+' invcount=='+invcount);
	            		 for(var x = 1; x <=invcount ; x++)
	            		 {
	            			  
	            		    var InvNum = rec.getLineItemValue('inventoryassignment', 'receiptinventorynumber',x);
	            		    var InvNumText =rec.getLineItemValue('inventoryassignment', 'internalid',x);
	            		

	            		    var inventorydetailSearch = nlapiSearchRecord("inventorydetail","customsearch_invdetails_issuenumber",
	            		    		[
	            		    		   ["inventorynumber.inventorynumber","contains",InvNum]
	            		    		], 
	            		    		[
	            		    		   new nlobjSearchColumn("inventorynumber").setSort(false), 
	            		    		   new nlobjSearchColumn("binnumber"), 
	            		    		   new nlobjSearchColumn("status"), 
	            		    		   new nlobjSearchColumn("quantity")
	            		    		   //new nlobjSearchColumn("itemcount")
	            		    		]
	            		    		);
	            		   if( inventorydetailSearch !=null)
	            		   {
	            			   for(var m=0;m<inventorydetailSearch.length;m++)
	            			   {
	            				   var invNumSerch =inventorydetailSearch[m].getValue('inventorynumber');
	            			   }
	            		   }
	            		    nlapiLogExecution('DEBUG', 'aftr submit', "  InvNum  ==" + InvNum);
	            		    nlapiLogExecution('DEBUG', 'aftr submit', "  invNumSerch  ==" + invNumSerch);
	            		    InvNumArr.push(invNumSerch);
	            		    
	            		    var InvQty = rec.getLineItemValue('inventoryassignment', 'quantity',x);
	            		    nlapiLogExecution('DEBUG', 'aftr submit', "  InvQty  ==" + InvQty);
	            		    InvQtyArr.push(InvQty);
	            		 }
	            	}
	        
	            	*/
	           
	        
			}
        	
		}
		
		   if(itemArray !=null && itemArray !=''  && itemArray !=undefined )
			{
			 var adjustId =  createInvAdjustViaPR(recId,IsLotItemArr,PRlinecount,date,locForm,accForm,vendArr,amtArr,line_chkArr,Class,Department,location,rateArray,recId,itemArray,qtyArray,units,descriptionArray,subsidiary,typeItemArr,useBinsArr);
			    
				 for(var k=0;k<itemArray.length;k++)
				   {
					   for(var j=1;j<=PRlinecount;j++)
						{
						      var itemid =recObj.getLineItemValue('item','item',j);
						      var QtyPR =recObj.getLineItemValue('item','quantity',j);
						   
						      var numbOfLine =recObj.getLineItemValue('item','line',j);
						   
						      if(itemid ==itemArray[k] && numbOfLine == line_chkArr[k] ) //remainQtyArr
							   {
						    	  recObj.setLineItemValue('item','custcol_inventory_adjustment_id',j,adjustId);
						    	  
						    	  if(remainQtyArr[k] !='' && remainQtyArr[k]!=null)
						    	  {
						    		 var QtyRem =remainQtyArr[k]; 
						    		 //var qtyonPR =QtyPR;
						    	  }
						    	  else
						    	  {
						    		  var QtyRem =0; 
						    		 // var qtyonPR =QtyPR;
						    	  }
						    	  recObj.setLineItemValue('item','custcol_remain_qty_for_pr',j,QtyRem);//custcol_remain_qty_for_pr
							   }
						}
				   }
			}
		   
		   
	nlapiSubmitRecord(recObj,true)	  
		
}	
	

function createInvAdjustViaPR(recId,IsLotItemArr,PRlinecount,date,locForm,accForm,vendArr,amtArr,line_chkArr,Class,Department,location,rateArray,recId,itemArray,qtyArray,units,descriptionArray,subsidiary,typeItemArr,useBinsArr)
{	
	
	nlapiLogExecution("DEBUG","In Create Function","createSalesOrderRecordFunction**************");
	nlapiLogExecution("DEBUG","In Create Function","PRlinecount=="+PRlinecount);
	nlapiLogExecution("DEBUG","In Create Function","date=="+date);
	nlapiLogExecution("DEBUG","In Create Function","location=="+location);
    nlapiLogExecution("DEBUG","In Create Function","itemid=="+itemArray);
	nlapiLogExecution("DEBUG","In Create Function","quantity=="+qtyArray);
	nlapiLogExecution("DEBUG","In Create Function","line_chkArr=="+line_chkArr);
	nlapiLogExecution("DEBUG","In Create Function","description=="+descriptionArray);
	nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)
	nlapiLogExecution("DEBUG","In Create Function","typeItemArr=="+typeItemArr)
	// nlapiLogExecution("DEBUG","In Create Function","InvNumArr=="+InvNumArr)
	// nlapiLogExecution("DEBUG","In Create Function","InvQtyArr=="+InvQtyArr)
	
	var count=0;
	var Stat =parseFloat(1);
	
     var record = nlapiCreateRecord('inventoryadjustment', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}
		
   //  record.setFieldValue('customform',176);
	
	if(date != '' && date != 'undefined' && date != null)
	{
		record.setFieldValue('trandate',date);
	}

	if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
	{
		// To Set Subsidiary
		record.setFieldValue('subsidiary',subsidiary);
	}
	
	if(locForm != '' && locForm != 'undefined' && locForm != null)
	{
		// To Set Subsidiary
		record.setFieldValue('adjlocation',locForm);
	}
                                                   
	record.setFieldValue('account',accForm);  
	record.setFieldValue('custbody_from_requisition',recId);
    var price =-1;
	
	for(var i=1;i<=itemArray.length;i++)
	{
		 var InvNumArr =[];
		 var InvNumQtyArr =[];
		  var adjQty =parseFloat(0-qtyArray[i-1]);//parseFloat(0-qtyArray[i-1]);
	                                                         
	      record.selectNewLineItem('inventory');

	      record.setCurrentLineItemValue('inventory', 'item', itemArray[i-1]);   
	      nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArray[i-1]);
	      
	      record.setCurrentLineItemValue('inventory', 'location', locForm);
	      nlapiLogExecution("DEBUG","In Create Function","location done==");
	      
	      record.setCurrentLineItemValue('inventory', 'adjustqtyby',adjQty);                              
	      nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
	      
	    
	  	  if(IsLotItemArr[i-1] =='T')
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
	   				   else if(AvailQty > qttty)
	   				   {
		   					InvNumArr.push(invNumSerch);
		   					InvNumQtyArr.push(qttty);
		   					break;
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
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(0-InvNumQtyArr[k-1]));
		  			  	  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
                          subrec.commitLineItem('inventoryassignment');//	  
		  		  	      nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());	  
		  	    	  }
		  	    	subrec.commit();
		  	      }
		  	      else
		  	      {
		  	    	
		  	      subrec.selectNewLineItem('inventoryassignment');
		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',InvNumArr);
		  		  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(0-InvNumQtyArr));
			  	 
			  	  nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]==');
			  	  subrec.commitLineItem('inventoryassignment');//	  
		  	      subrec.commit();
		  	      nlapiLogExecution('DEBUG', 'Acct', 'JSON.stringify() done= ' + JSON.stringify());	  
		  	      }	  
	  	     
	  	     
	      }
	  	/*  else if(typeItemArr[i-1] =='Inventory Item' && useBinsArr[i-1] == 'T')
	  	  {
	  		
	  		  var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		  	  nlapiLogExecution('DEBUG', 'Acct', 'Inventory Item AND useBins True = ' + subrec);
		  	  
		  	 
			     var s= subrec.getLineItemCount('inventoryassignment');
			     nlapiLogExecution('DEBUG', 'Acct', 'subrec Not Lot item for inventory count= ' + s);
			     if(s > 0 )
			     {
			    	 nlapiLogExecution('DEBUG', 'Acct', 'Inside the else to remove subrec= ');
			    	   for(var i1 = 1; i1 <= s; i1++)
					     {  
					    	 subrec.removeLineItem('inventoryassignment', i1);
					    	 count++;
				          }
			     }
			     
			  
		  
	  		  subrec.selectNewLineItem('inventoryassignment');
	  	      subrec.setCurrentLineItemValue('inventoryassignment','quantity',adjQty);
	  	      subrec.setCurrentLineItemValue('inventoryassignment','binnumber','2');//'binnumber'
	  	      nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]=='+adjQty);
		  	  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
		  	  subrec.commitLineItem('inventoryassignment');
		  	  
	  	      subrec.commit();
	  	      nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());	
	  	  }
	  	  else if(typeItemArr[i-1] =='Inventory Item' && (useBinsArr[i-1] == 'F'|| useBinsArr[i-1] ==null ))
	  	  {
	  		
	  		  var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		  	  nlapiLogExecution('DEBUG', 'Acct', 'subrec for inventory = ' + subrec);
		  	  
		  	 
			     var s= subrec.getLineItemCount('inventoryassignment');
			     nlapiLogExecution('DEBUG', 'Acct', 'subrec Not Lot item for inventory count= ' + s);
			     if(s > 0 )
			     {
			    	 nlapiLogExecution('DEBUG', 'Acct', 'Inside the else to remove subrec= ');
			    	   for(var i1 = 1; i1 <= s; i1++)
					     {  
					    	 subrec.removeLineItem('inventoryassignment', i1);
					    	 count++;
				          }
			     }
			     
			  
		  
	  		  subrec.selectNewLineItem('inventoryassignment');
	  	      subrec.setCurrentLineItemValue('inventoryassignment','quantity',adjQty);
	  	      nlapiLogExecution('DEBUG','SubRecord', 'qtyArray[p-1]=='+adjQty);
		  	  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus',Stat);
		  	  subrec.commitLineItem('inventoryassignment');
		  	  
	  	      subrec.commit();
	  	      nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());	
	  	  }
	  	     */
	  	      record.setCurrentLineItemValue('inventory', 'unitcost', rateArray[i-1]);                                          
	  	      nlapiLogExecution("DEBUG","In Create Function","rate done==");
	      
	  	      record.setCurrentLineItemValue('inventory', 'description',descriptionArray[i-1]); 
	  	      nlapiLogExecution("DEBUG","In Create Function","description done==");
	      
	  	      record.commitLineItem('inventory');         
		      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
	     
	}
 
	 var SubmitIt = nlapiSubmitRecord(record);  
	 
	 
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 response.sendRedirect('RECORD', 'inventoryadjustment', SubmitIt, false,'view');
	 
	 return SubmitIt;
}

function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

function removeDuplicates(arr){
    var unique_array = []
    for(var i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array;
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

/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Nov 2018     Priyanka Patil
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
var recIDForSO ;
function uesAfterSubmit(request, response)
{
	var salesOrder;
		var customer;
		var subsidiary;
		var department;
		var Sales_class;
		var aaria_Context;
		var sales_emp;
		var item;
		var description;
		var units;
		var qty;
		var inventory_Detail;
		var liters;
		var location;
		

		var new_locationArray = new Array();
		var uniueLoc = new Array();
		var filter_Loc = new Array();
		
		var recrdId = nlapiGetRecordId();
		var recrdType = nlapiGetRecordType();	
		var InvRec = nlapiLoadRecord(nlapiGetRecordType(),nlapiGetRecordId());
		
		var status = InvRec.getFieldValue('orderstatus');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order status =='+status);
		
		salesOrder = InvRec.getFieldValue('tranid');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales Order_Number =='+salesOrder);
		
		customer = InvRec.getFieldValue('entity');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Customer =='+customer);
		
		subsidiary = InvRec.getFieldValue('subsidiary');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','subsidiary =='+subsidiary);
		
		department = InvRec.getFieldValue('department');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','department =='+department);
		
		Sales_class = InvRec.getFieldValue('class');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','Sales_class =='+Sales_class);
		
		aaria_Context = InvRec.getFieldValue('custbody_aarialife_context');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','aaria_Context =='+aaria_Context);
		
		sales_emp = InvRec.getFieldValue('custbody_sales_employee');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','sales_emp =='+sales_emp);
		
	 /*  var user = nlapiGetUser();
	   nlapiLogExecution('DEBUG','SalesPerson Inventroy','user =='+user);
	   
	   var empLoc = nlapiLookupField('employee',user,'location');
	   var fromLocation = empLoc;
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','fromLocation =='+fromLocation);
		
		*/
		
		var customer_category = InvRec.getFieldValue('custbody_sales_employee');
		nlapiLogExecution('DEBUG','SalesPerson Inventroy','customer_category =='+customer_category);
		
		var toLocation = InvRec.getFieldValue('custbody_location');
		//nlapiLogExecution('DEBUG','SalesPerson Inventroy','toLocation =='+toLocation);
		
		 if(customer_category == '5' )
		{ 
		 itemCount = InvRec.getLineItemCount('item');
		 nlapiLogExecution('DEBUG','SalesPerson in POST', "itemCount   "+itemCount);
		 
		 var pushvalueInvNum;
		 var pushvalueQty;
		 var new_locationArray=[];
		 var filter_Loc=[];
		 var uniueLoc=[];
		 
		 for(var j1=1;j1<=itemCount;j1++)
		 {
			 var new_location = InvRec.getLineItemValue('item','location',j1);
			 new_locationArray.push(new_location);
		 }
		    filter_Loc = filter_array(new_locationArray);
			//nlapiLogExecution('DEBUG','SalesPerson Inventroy','filter_Loc =='+filter_Loc);
			
			uniueLoc = removeDuplicates(filter_Loc);
			//nlapiLogExecution('DEBUG','SalesPerson Inventroy','uniueLoc =='+uniueLoc);
			
			
			
			
	for(var un=0;un< uniueLoc.length;un++)
	  {	
		 var reamainingArray = new Array();
		 var SOQtyArray = new Array();
		 var SO_ItemArray = new Array();
		 var SO_LineLocationArray = new Array();
		 var descriptionArray = new Array();
		 var unitsArray = new Array();
		 var qtyArray = new Array();
		 var litersArray = new Array();
	
		 var invcountArr = new Array();
		 var invQtyTrans = new Array();
		 var invNumTrans = new Array();
		 var setLocFrom =uniueLoc[un];
					
				 for(var j=1;j<=itemCount;j++)//suiteletCount
				 {
					 
					// var reamaining = InvRec.getLineItemValue('item','location',j);
					 //nlapiLogExecution('DEBUG', 'Acct', 'Remaining Qty before check = ' + reamaining);
					//if(reamaining != null && reamaining != '' && !isNaN(reamaining) && reamaining != undefined)
					{
						
						var SO_Item =  InvRec.getLineItemValue('item','item',j);
						SO_ItemArray.push(SO_Item);
						nlapiLogExecution('DEBUG', 'Acct', 'SO_Item = ' + SO_Item);
						
						var description =  InvRec.getLineItemValue('item','description',j);
						descriptionArray.push(description);
						//nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'description=' + description);
						
						var units =  InvRec.getLineItemValue('item','unit',j);
						unitsArray.push(units);
						//nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'units=' + units);
						
						var qty = InvRec.getLineItemValue('item','quantity',j);
						qtyArray.push(qty);
						nlapiLogExecution('DEBUG', 'after Submit Line Level Values', 'qty=' + qty);
						
						
						var chk_location = InvRec.getLineItemValue('item','location',j);
						 
						 if(uniueLoc[un] == chk_location)
						 {
							 
							 nlapiLogExecution('DEBUG', 'Acct', 'uniueLoc[un] == chk_location ' + uniueLoc[un] +'=='+ chk_location);
							 
							 
							var minusQty = 0;
							nlapiLogExecution('DEBUG', 'Acct', 'minusQty = ' + minusQty);
						
					
						 var subrec = InvRec.viewLineItemSubrecord('item','inventorydetail',j);
						 nlapiLogExecution('DEBUG', 'SalesPerson', 'subrec:'+subrec);
							 	
						 var invcount = subrec.getLineItemCount('inventoryassignment');
						 invcountArr.push(invcount);
						 
						 nlapiLogExecution('DEBUG','aftr submit',"rec  ==" +subrec+' invcount=='+invcount);
						 var subRem=0;
						 var totRem=0;
						 var count=0;
			       		 for(var x = 1; x <=invcount ; x++)
			       		 {
			       			  var InvNumQty =subrec.getLineItemValue('inventoryassignment', 'quantity',x);
			         		  nlapiLogExecution('DEBUG', 'aftr submit', "  InvNumQty  ==" +InvNumQty);
			         		    
			         		    var InvNum = subrec.getLineItemValue('inventoryassignment', 'issueinventorynumber',x);
			          		    nlapiLogExecution('DEBUG', 'aftr submit', "  InvNum  ==" + InvNum);
			          		    invQtyTrans.push(InvNumQty);
			          		    invNumTrans.push(InvNum);
			         		   /* 
			         		       if(InvNumQty >= minusQty)
			         		    	{
			         		    	  invQtyTrans.push(minusQty);
			             		      invNumTrans.push(InvNum);
			         		    	      //pushvalueQty =minusQty;
			         		    	      //pushvalueInvNum =InvNum;
			             		    	 break;
			         		    	}
			         		       else if(InvNumQty < minusQty)
			         		    	{
			         		    	    totRem +=parseFloat(InvNumQty);
			         		    	    
			         		    	      invQtyTrans.push(InvNumQty);
				             		      invNumTrans.push(InvNum);
				         		    	   
			         		    	       if(totRem == qty)
			         		    	    	{
			         		    	        	break;
			         		    	    	}
			         		    	       else if(totRem > qty)
							   				{
			         		    	    	  invQtyTrans.pop(InvNumQty);
			         		    	    	 invNumTrans.pop(InvNum);
							   				 var rem = parseFloat(totRem)-parseFloat(qty);
							   				}
				         		    	 
				         		    }
			         		       else if(InvNumQty < minusQty)
			         		    	   {
			         		    	   
			         		    	   
			         		    	         if(count == 0)
			         		    	    	 {
			         		    	        	 invQtyTrans.push(InvNumQty);
			         	             		      invNumTrans.push(InvNum);
			         		    	        	    // pushvalueQty =subRem;
			         	         		    	    //  pushvalueInvNum =InvNum;
			         		    	    	   count++;
			         		    	    	 }
			         		    	          else if(count >=1)
			         		    	    	 {
			         		    	        	   subRem =parseFloat(minusQty)-parseFloat(InvNumQty);
			         		    	        	  
			         		    	        	 invQtyTrans.push(subRem);
			        	             		      invNumTrans.push(InvNum);
			         		    	        	
			     	                         }
			         		    	        
			         		    	}*/
			         		      
			         		 }//End
			       			
					 }//End UniLoc
					
					}//remaining qty check
		      }
				 var idOfIT= createInventoryTransfer(status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,customer_category,toLocation,itemCount,SO_ItemArray,SO_LineLocationArray,descriptionArray,unitsArray,qtyArray,litersArray,subrec,invcountArr,invQtyTrans,invNumTrans,setLocFrom)
										
		     }
	
	//}//end of for loop for SO
	
	var transferInvent = InvRec.setFieldValue('custbody_inv_transaction_no',idOfIT)
	var submitID = nlapiSubmitRecord(InvRec);
	//response.sendRedirect('RECORD', 'salesorder', submitID, false,'view');
//=============================== End to Set SO ============================================
  }
}//End of function

function createInventoryTransfer(status,salesOrder,customer,subsidiary,department,Sales_class,aaria_Context,sales_emp,customer_category,toLocation,itemCount,SO_ItemArray,SO_LineLocationArray,descriptionArray,unitsArray,qtyArray,litersArray,subrec,invcountArr,invQtyTrans,invNumTrans,setLocFrom)
{
	nlapiLogExecution("DEBUG","In Create Function","SO_ItemArray=="+SO_ItemArray.length);
	
	nlapiLogExecution("DEBUG","In Create Transfer Function","createSalesOrderRecordFunction**************");
	nlapiLogExecution("DEBUG","In Create Transfer Function","invQtyTrans=="+invQtyTrans);
	nlapiLogExecution("DEBUG","In Create Transfer Function","invNumTrans=="+invNumTrans)	
	nlapiLogExecution("DEBUG","In Create Transfer Function","invcountArr=="+invcountArr);
	/*nlapiLogExecution("DEBUG","In Create Function","Sales_class=="+Sales_class);

	nlapiLogExecution("DEBUG","In Create Function","aaria_Context=="+aaria_Context);
	nlapiLogExecution("DEBUG","In Create Function","sales_emp=="+sales_emp);
	nlapiLogExecution("DEBUG","In Create Function","itemArray=="+itemArray);
	nlapiLogExecution("DEBUG","In Create Function","descriptionArray=="+descriptionArray);//subsidiary
	
	nlapiLogExecution("DEBUG","In Create Function","unitsArray=="+unitsArray);
	nlapiLogExecution("DEBUG","In Create Function","qtyArray=="+qtyArray);*/
	//nlapiLogExecution("DEBUG","In Create Function","IsLotItemArr=="+IsLotItemArr);
	//nlapiLogExecution("DEBUG","In Create Function","InvNumArr=="+InvNumArr);
	
	//var count = 0;
	var record = nlapiCreateRecord('inventorytransfer',{recordmode: 'dynamic'}); 
	
	record.setFieldValue('customform',241);
	
//if(((status == 'A') || (status == 'B') || (status == 'C') ||(salesApproval_Status == '10')) && customer_category == '5')
{
	if(subsidiary != null && subsidiary != '' && subsidiary != undefined)
	{
		record.setFieldValue('subsidiary',subsidiary);
		//nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)
	}
	
	if(department != null && department != '' && department != undefined)
	{
		record.setFieldValue('department',department);
		//nlapiLogExecution("DEBUG","In Create Function","department=="+department)
	}
	
	if(Sales_class != null && Sales_class != '' && Sales_class != undefined)
	{
		record.setFieldValue('class',Sales_class);
	}
	
	if(aaria_Context != null && aaria_Context != '' && aaria_Context != undefined)
	{
		record.setFieldValue('custbody_aarialife_context',aaria_Context);
	}
	
	if(sales_emp != null && sales_emp != '' && sales_emp != undefined)
	{
		record.setFieldValue('custbody_sales_employee',sales_emp);
	}
	
	if(setLocFrom != null && setLocFrom != '' && setLocFrom != undefined)
	{
		record.setFieldValue('location',setLocFrom);
		//nlapiLogExecution("DEBUG","In Create Function","locationArray1=="+locationArray1)
	}
	
	if(toLocation != null && toLocation != '' && toLocation != undefined)
	{
		record.setFieldValue('transferlocation',toLocation);
		nlapiLogExecution("DEBUG","In Create Function","toLocation=="+toLocation)
	}
	
	var count =0;
	for(x=1;x<=SO_ItemArray.length;x++)
	{
		//nlapiLogExecution("DEBUG","In Create Function","itemArray.length in inventory item=="+itemArray.length);
		
		 record.selectNewLineItem('inventory');
	
		record.setCurrentLineItemValue('inventory','item',SO_ItemArray[x-1]);   
	   // nlapiLogExecution("DEBUG","In Create Transfer Function","item done=="+SO_ItemArray[x-1]);
		
		record.setCurrentLineItemValue('inventory','description',descriptionArray[x-1]);
		//nlapiLogExecution("DEBUG","In Create Transfer Function","description done=="+descriptionArray[x-1]);
		
		record.setCurrentLineItemValue('inventory','adjustqtyby',parseFloat(qtyArray[x-1]));                              
		//nlapiLogExecution("DEBUG","In Create Transfer Function"," quantity done=="+parseFloat(qtyArray[x-1]));
		
		//record.setCurrentLineItemValue('inventory','custcol_litres',litersArray[x-1]);                                          
		//nlapiLogExecution("DEBUG","In Create Transfer Function","custcol_litres done=="+litersArray[x-1]);
		
		
//=========================== Setting Inventory Details ===============================
		
		
		 var subrec = record.createCurrentLineItemSubrecord('inventory','inventorydetail');
		 nlapiLogExecution('DEBUG', 'Acct', 'subrec for Transfer  inventory = ' + subrec);
		  	  
		  	  
	  	   // for (var inv=0;inv<invcountArr.length;inv++)
	  		 {
	  	    	
	  		  	  var Add =0;
	  		  	 for(var k=1 ;k<=invQtyTrans.length;k++)//invcountArr[x-1]
	  	    	  {
	  		  	    nlapiLogExecution('DEBUG', 'Acct', 'subrec for invQtyTrans = ' + invQtyTrans[k-1]);
	  		  	    nlapiLogExecution('DEBUG', 'Acct', 'subrec for invNumTrans = ' + invNumTrans[k-1]);
	  		  	      
		  	          
	  	    		  subrec.selectNewLineItem('inventoryassignment');
	  		  		  subrec.setCurrentLineItemValue('inventoryassignment','issueinventorynumber',invNumTrans[k-1]);
	  			  	  subrec.setCurrentLineItemValue('inventoryassignment','quantity',parseFloat(invQtyTrans[k-1]));//count
	  			  	  subrec.setCurrentLineItemValue('inventoryassignment','inventorystatus','1');
                      subrec.commitLineItem('inventoryassignment');//	  
	  		  	      nlapiLogExecution('DEBUG', 'Acct', ' JSON.stringify() done= ' + JSON.stringify());
	  		  		  
	  		  	      count++;
	  		  	      
	  		  	       Add+=parseFloat(invQtyTrans[count]);
	  		  	      
			  		  	  if(parseFloat(qtyArray[x-1]) == parseFloat(Add))
			  	    	  {
			  		  		//subrec.commit();
			  	    	    break;
			  	    	  }
			  		  	 
	  	    	  }
	  		   
	  		 subrec.commit(); 
	  		 }
		      
     }
//=================== End Of Inv Details Set=========================================================
		
		record.commitLineItem('inventory');
		nlapiLogExecution("DEBUG","In Create Transfer Function","commitLineItem done==");
		
		
		
	}//End of for loop

  	var SubmitIt = nlapiSubmitRecord(record,true);  
  	nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
  
  return SubmitIt;
}



function filter_array(test_array) 
{
	 var index = -1,
	 arr_length = test_array ? test_array.length : 0,
	 resIndex = -1,
	 result = [];

	 while (++index < arr_length) 
	 {
		 var value = test_array[index];
		 if(value)
		 {
			result[++resIndex] = value;
		  }
	 }
return result;
}



function removeDuplicates(num) 
{
	  var x,
		  len=num.length,
		  out=[],
		  obj={};
	 
	  for (x=0; x<len; x++) 
	  {
		obj[num[x]]=0;
	  }
	  for (x in obj) 
	  {
		out.push(x);
	  }
	  return out;
	}
		
	
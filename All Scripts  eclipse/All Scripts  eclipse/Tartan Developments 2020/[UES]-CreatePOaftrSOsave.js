/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 July 2020    Priyanka         Create PO of SO backorder qty items
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
function userEvntToCreatePurchaseOrder(type)
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
		 	var line_chkArr1=new Array();
		 	var salesArr=new Array();
		 	var custArr=new Array();
		 	var RateArr=new Array();
		 	var ClassArr=new Array();
		 	var DepartmentArr=new Array();
		 	var vendArr=new Array();
		 	var amtArr=new Array();
		 	var custNew=new Array();
		 	var typeItemArr =new Array();
		  var TaxCodeArr=[];
		
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
          
	 	
	      var PRlinecount=recObj.getLineItemCount('item');
		    nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
		  
		
			for(var i=1;i<=PRlinecount;i++)
			{
				
				var itemid =recObj.getLineItemValue('item','item',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
				
				var BackOrderQty =recObj.getLineItemValue('item','quantitybackordered',i);
     
				if((BackOrderQty != null && BackOrderQty != undefined && BackOrderQty != '' && BackOrderQty > 0))
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
	            	
	            	
	            	var line_rate =recObj.getLineItemValue('item','rate',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  line_rate  ==" + line_rate);
	            	RateArr.push(line_rate);
	            	
	            	var line_class =recObj.getLineItemValue('item','class',i);  
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  line_class  ==" + line_class);
	            	ClassArr.push(line_class);
	            	
	            	var line_dept =recObj.getLineItemValue('item','department',i);  //taxcode
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  line_dept  ==" + line_dept);
	            	DepartmentArr.push(line_dept);
	            	
	            	var line_taxCode =recObj.getLineItemValue('item','taxcode',i);  //taxcode
	            	nlapiLogExecution('DEBUG', 'aftr submit', "  line_taxCode  ==" + line_taxCode);
	            	TaxCodeArr.push(line_taxCode);
	            	
	            	//===========================================================================
				}
				
			} 
	    
			if(itemArray != null && itemArray != '' && itemArray != undefined )
			{
			var transId = CreatePurchaseOrder(Customer,Department,Class,date,subsidiary,location,unitArray,itemArray,qtyArray,recordId,RateArr,ClassArr,DepartmentArr,TaxCodeArr);
				
				if(transId != null && transId !='' && transId !=undefined)
				{
					nlapiSubmitField(recordType,recordId,'custbody_po_ref_on_so',transId);  
					
					nlapiSendRedirect('RECORD', 'purchaseorder', transId, false,'view');
					 
				}
			}
			
			
	  }
	
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
	}
}

function CreatePurchaseOrder(Customer,Department,Class,date,subsidiary,location,unitArray,itemArray,qtyArray,recordId,RateArr,ClassArr,DepartmentArr,TaxCodeArr)
{
    var record = nlapiCreateRecord('purchaseorder', {recordmode: 'dynamic'}); 
   
    
    
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
 	//record.setFieldValue('employee',usr);
 	
 	 record.setFieldValue('custbody_so_ref_on_po',recordId);
 	
 
 	for(var i=1;i<=itemArray.length ;i++)
 	{
 		
 		record.selectNewLineItem('item');

    record.setCurrentLineItemValue('item', 'item', itemArray[i-1]);   
    nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArray[i-1]);
    
  
    record.setCurrentLineItemValue('item', 'quantity', qtyArray[i-1]);                              
    nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
    
    record.setCurrentLineItemValue('item', 'units', unitArray[i-1]);                                          
    nlapiLogExecution("DEBUG","In Create Function","units done==");
 
    record.setCurrentLineItemValue('item', 'rate', RateArr[i-1]);                                          
    nlapiLogExecution("DEBUG","In Create Function","rate done==");
   
    record.setCurrentLineItemValue('item', 'taxcode',TaxCodeArr[i-1]); 
    nlapiLogExecution("DEBUG","In Create Function"," TaxCodeArr done==");//TaxCodeArr
    

	 record.setCurrentLineItemValue('item', 'department',DepartmentArr[i-1]); 
    nlapiLogExecution("DEBUG","In Create Function"," department done==");
    
    record.setCurrentLineItemValue('item', 'class',ClassArr[i-1]); 
    nlapiLogExecution("DEBUG","In Create Function"," class done==");//TaxCodeArr
    
    
     record.commitLineItem('item');
    nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
    
 	}
  
 	 var SubmitIt = nlapiSubmitRecord(record);  
 	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
 	 
 	 return SubmitIt;

}


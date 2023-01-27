/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       01 Apr 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInitBeforeLoadSet(type)
{

	try
	{
	
	var itemArray = new Array();
	var qtyArray = new Array();
	var unitArray = new Array();
	var rateArray = new Array();
	var departArray = new Array();
	var descriptionArray = new Array();
	var hsn_codeArray = new Array();
	var customer_Name = new Array();
 	var customerArray = new Array();
 	var customerUniq = new Array();
 	var customerArray = new Array();
 	var amountArray = new Array();
 	var ClassArray = new Array();
 	var locationArray = new Array();
 	var estimatedamountArray = new Array();
 	//var rate = '0.00';
 	var currentUrl=document.location.href; 
 	var url = new URL(currentUrl); 
 	var requisition_no = url.searchParams.get("custbody_requi_id_on_po");
 //	var requisition_no = nlapiGetFieldValue('custbody_requi_id');
	nlapiLogExecution('DEBUG','After Submit',"Requisition_no=="+requisition_no);
			
    var recObj = nlapiLoadRecord('purchaserequisition',requisition_no);
 
	var PRlinecount=recObj.getLineItemCount('item');
	nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
	
	var plceOfSupply =recObj.getFieldValue('custbody_in_gst_pos');
	

     for(var i=1;i<=PRlinecount;i++)
	 { 

			var appStat =recObj.getLineItemValue('item','custcol_vad_appstatus',i);
			 nlapiLogExecution('DEBUG', 'aftr submit', "  appStat  ==" + appStat);
			
     		//number.push(po_chk);
			if(appStat == '2' || appStat =='5')
			{
    	 
    	var itemid =recObj.getLineItemValue('item','item',i);
    	itemArray.push(itemid);
    	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
    
		var quantity =recObj.getLineItemValue('item','quantity',i);
		qtyArray.push(quantity);
    	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
    	
		
		nlapiLogExecution('DEBUG', 'aftr submit', "  itemArray in po_chk ==" + itemArray);
					
    	//var customer =recObj.getLineItemValue('item','customer',i);
    	nlapiLogExecution('DEBUG', 'aftr submit', "  qtyArray in po_chk  ==" + qtyArray);
    	
    	/*var vendorname =recObj.getLineItemValue('item','vendorname',i);
    	vendorArray.push(vendorname);
    	nlapiLogExecution('DEBUG', 'aftr submit', "  vendorname  ==" + vendorArray);*/
    	
    	var Class_name =recObj.getLineItemValue('item','class',i);
    	ClassArray.push(Class_name);
    	nlapiLogExecution('DEBUG', 'aftr submit', "  Class_name  ==" + Class_name);
    	
    	var customername1 =recObj.getLineItemValue('item','customer',i);
    	customerArray.push(customername1);
    	nlapiLogExecution('DEBUG', 'aftr submit', "  Customer Name 123==" + customername1);
    	
    	var units =recObj.getLineItemValue('item','units',i);
    	unitArray.push(units);
    	//nlapiLogExecution('DEBUG', 'aftr submit', "  unitArray  ==" + unitArray); //povendor
    	
    	var amount =recObj.getLineItemValue('item','amount',i); 
    	amountArray.push(amount);
    	//nlapiLogExecution('DEBUG', 'aftr submit', "  amount  ==" + amount); //povendo
    	
    	var rate =recObj.getLineItemValue('item','rate',i);    
    	//nlapiLogExecution('DEBUG', 'aftr submit', "  Estimated rate  ==" + rate);
    	rateArray.push(rate);
    	
    	var estimatedamount =recObj.getLineItemValue('item','estimatedamount',i);    
    	//nlapiLogExecution('DEBUG', 'aftr submit', " Estimated Amount  ==" + estimatedamount);
    	estimatedamountArray.push(estimatedamount);
    	
    	var depart =recObj.getLineItemValue('item','department',i); 
    	//getLineItemText
    	nlapiLogExecution('DEBUG', 'aftr submit', "  line  ==" + depart);
    	departArray.push(depart);
    	
         var prLinenum =recObj.getLineItemValue('item','custcol_linenum',i); 
   
    	var description =recObj.getLineItemValue('item','description',i);    
    	//nlapiLogExecution('DEBUG', 'aftr submit',"  description  ==" + description);
    	descriptionArray.push(description);
    	
    	var location =recObj.getLineItemValue('item','location',i);
    	locationArray.push(location);
    	//nlapiLogExecution('DEBUG', 'aftr submit', " SO customer  ==" + locationArray);
    	
    	var hsn_code =recObj.getLineItemValue('item','custcol_in_hsn_code',i);    
    	hsn_codeArray.push(hsn_code);
    	nlapiLogExecution('DEBUG', 'aftr submit', "  hsn_codeArray  ==" + hsn_codeArray); 
    	var classs ='1';
    	var dept ='10';
    	nlapiSetFieldValue('custbody_in_gst_pos',plceOfSupply);
        nlapiSetFieldValue('class',classs);
        nlapiSetFieldValue('department',dept);
           nlapiSetFieldValue('custbody_requi_id_on_po',requisition_no);
       	nlapiSelectNewLineItem('item');
    	nlapiSetCurrentLineItemValue('item','item',itemid,false,true);   
    	nlapiSetCurrentLineItemValue('item','quantity',quantity,false,true);   
    	nlapiSetCurrentLineItemValue('item','rate',rate,false,true); 
    	nlapiSetCurrentLineItemValue('item','amount',amount,false,true); 
    	nlapiSetCurrentLineItemValue('item','location',location,false,true); 
    	nlapiSetCurrentLineItemValue('item','custcol_in_hsn_code',hsn_code,false,true); 
    	nlapiSetCurrentLineItemValue('item','customer',customername1,false,true); 
    	nlapiSetCurrentLineItemValue('item','class',classs,false,true);
        nlapiSetCurrentLineItemValue('item','custcol_pr_linenum_on_po',prLinenum,false,true);
    	nlapiSetCurrentLineItemValue('item','department',dept,false,true); 
    	nlapiSetCurrentLineItemValue('item','custcol_in_nature_of_item','1',false,true); //custcol_in_nature_of_item  
    	nlapiCommitLineItem('item');
    	nlapiLogExecution('DEBUG', 'aftr submit', "  Execution completed ");
    	
    	/* 
    	 	nlapiSetLineItemValue('item','item',i,itemid);
    	nlapiSetLineItemValue('item','quantity',i,quantity);
    	nlapiSetLineItemValue('item','location',i,location);
    	nlapiSetLineItemValue('item','custcol_in_hsn_code',i,hsn_code);
    	nlapiSetLineItemValue('item','customer',i,customername1);
    	nlapiSetLineItemValue('item','class',i,classs);
    	nlapiSetLineItemValue('item','department',i,dept);
    	*/
			}
	 }
     
    
    	/*
    	for(var j=1;j<=PRlinecount;j++)
	    {
        	nlapiLogExecution('DEBUG', 'aftr submit', "Enter in  customername1 == customername function :=="+j); 

		 nlapiSelectNewLineItem('item');
         nlapiLogExecution("DEBUG","In Create Function","item done=="+ itemArray[j-1]);
         nlapiSetCurrentLineItemValue('item','item',itemArray[j-1],true,false);   
	     //nlapiLogExecution("DEBUG","In Create Function","item done11=="+itemArray[j-1]);    
    
	     //nlapiSetCurrentLineItemValue('item','quantity', qtyArray[j-1]);                              
	     nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+qtyArray[j-1]);
	      
	     //nlapiSetCurrentLineItemValue('item', 'units', unitArray[j-1]);                                          
	     //nlapiLogExecution("DEBUG","In Create Function","units done=="+unitArray[j-1]);
	      
	     //nlapiSetCurrentLineItemValue('item', 'description',descriptionArray[j-1]); 
	     nlapiLogExecution("DEBUG","In Create Function","description done=="+descriptionArray[j-1]);
	      
	      //nlapiSetCurrentLineItemValue('item','rate', rateArray[j-1]);
	      nlapiLogExecution("DEBUG","In Create Function","rate done=="+rateArray[j-1]);
	      
	      //nlapiSetCurrentLineItemValue('item','amount', amountArray[j-1]);
	      //nlapiLogExecution("DEBUG","In Create Function","amount done=="+amountArray[j-1]);
	                  
	      nlapiSetCurrentLineItemValue('item','department',departArray[j-1]); 
	      nlapiLogExecution("DEBUG","In Create Function","department done=="+departArray[j-1]);
	      
	      nlapiSetCurrentLineItemValue('item','class', ClassArray[j-1]);
	      nlapiLogExecution("DEBUG","In Create Function","class done=="+ClassArray[j-1]);
	      
          // nlapiSetCurrentLineItemValue('item','location', locationArray[j-1]);
	      nlapiLogExecution("DEBUG","In Create Function","location done=="+locationArray);
          
	      //nlapiSetCurrentLineItemValue('item','customer', customerArray[j-1]);
	      nlapiLogExecution("DEBUG","In Create Function","customer done=="+customerArray[j-1]);     
          
	     // nlapiSetCurrentLineItemValue('item','custcol_in_hsn_code', hsn_codeArray[j-1]);
	      nlapiLogExecution("DEBUG","In Create Function","HSN Code done==");
	            
	      nlapiCommitLineItem('item');
	      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");	      
	      
		}   */
  
   
	return true
	}
	catch (e) 
	{
		nlapiLogExecution('DEBUG','Error Code:'+e);
	 }
}
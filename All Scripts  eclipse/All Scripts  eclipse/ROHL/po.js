/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       06 Feb 2019     Priyanka Patil
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function PRdataLoadForPO(request,response)
{
	var itemArray = new Array();
 	var rateArray = new Array();
 	var descriptionArray = new Array();
 	var qtyArray = new Array();
 	var unitArray = new Array();
 	var locationArray = new Array();
 	nlapiLogExecution('DEBUG', 'aftr submit', "Enter in Function" );
 	var itmArr=new Array();
 	var reqNo = new Array();  
 	var hsn_codeArray = new Array(); 
 	var lineArray = new Array();
 	var number = new Array();///hsn_codeArray 
 	var recId = request.getParameter('id1'); 
	
    var recType= request.getParameter('type1');

  //  var searchId= 'item_location_search';
    
 	  recObj = nlapiLoadRecord(recType,recId);
	 
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + recId +" type :"+recType+" Record :"+recObj);
	 	
	 		 	
	 //	 var transItemSearch= findTransaction(recordID,searchId)
			 	
	
	 var date = recObj.getFieldValue('trandate');
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  date  ==" + date);
	 	
		 var Department = recObj.getFieldValue('department');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  Department  ==" + Department);
		 	
		 var Class = recObj.getFieldValue('class');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  class  ==" + Class);
	 	
	 var location = recObj.getFieldValue('location');
		nlapiLogExecution('DEBUG', 'aftr submit', "  location  ==" + location);
	 	
		 var reqNo = recObj.getFieldValue('custbody_pr_number');
			nlapiLogExecution('DEBUG', 'aftr submit', "  reqNo  ==" + reqNo);
		
		var prNum = recObj.getFieldValue('custbody_pr_number');
		nlapiLogExecution('DEBUG', 'aftr submit', "  prNum  ==" + prNum);
		 	
	  var PRlinecount=recObj.getLineItemCount('item');
	  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
	
		for(var i=1;i<=PRlinecount;i++)
		{

			
        		//number.push(po_chk);
        		var itemid =recObj.getLineItemValue('item','item',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
            
    			var quantity =recObj.getLineItemValue('item','quantity',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
            	
           			
        		itemArray.push(itemid);
        		nlapiLogExecution('DEBUG', 'aftr submit', "  itemArray  ==" + itemArray);
        		qtyArray.push(quantity);
            	//var customer =recObj.getLineItemValue('item','customer',i);
            	//nlapiLogExecution('DEBUG', 'aftr submit', "  customer  ==" + customer);
            	
            	var vendorname =recObj.getLineItemValue('item','vendorname',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  vendorname  ==" + vendorname);
            	
            	var units =recObj.getLineItemValue('item','units',i);    
            	nlapiLogExecution('DEBUG', 'aftr submit', "  units  ==" + units);   //povendor
            	
            	var amount =recObj.getLineItemValue('item','amount',i);    
            	nlapiLogExecution('DEBUG', 'aftr submit', "  amount  ==" + amount);   //povendo
            	
            	var rate =recObj.getLineItemValue('item','estimatedrate',i);    
            	nlapiLogExecution('DEBUG', 'aftr submit', "  rate  ==" + rate);
            	rateArray.push(rate);
            	
            	var line =recObj.getLineItemValue('item','line',i);    
            	nlapiLogExecution('DEBUG', 'aftr submit', "  line  ==" + rate);
            	lineArray.push(line);
            	
            	var description =recObj.getLineItemValue('item','description',i);    
            	nlapiLogExecution('DEBUG', 'aftr submit', "  description  ==" + description);
            	descriptionArray.push(description);
            	
            	var vendor =recObj.getLineItemValue('item','povendor',i);    
            	nlapiLogExecution('DEBUG', 'aftr submit', "  vendor  ==" + vendor); 
            	
            	var hsn_code =recObj.getLineItemValue('item','custcol_in_hsn_code',i);    
            	hsn_codeArray.push(hsn_code);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  hsn_code  ==" + hsn_code); 
            	
		 }  
		nlapiLogExecution('DEBUG', 'aftr submit', "  itemArray b4 fun ==" + itemArray);
		
		
			//nlapiLogExecution('DEBUG', 'aftr submit', "  number[s] ==" +number[s]);
		    createPurchaseOrderForPR(recType,recId,PRlinecount,vendor,lineArray,vendorname,amount,Class,Department,date,location,itemArray,qtyArray,units,descriptionArray,reqNo,prNum,recId,rateArray,hsn_codeArray,response);
			
		
}	
	
function createPurchaseOrderForPR(recType,recId,PRlinecount,vendor,lineArray,vendorname,amount,Class,Department,date,location,itemArray,qtyArray,units,descriptionArray,reqNo,prNum,recId,rateArray,hsn_codeArray,response)	
{	
	nlapiLogExecution("DEBUG","In Create Function","itemArray1=="+itemArray);
	nlapiLogExecution("DEBUG","In Create Function","createPurchaseOrderRecordFunction**************");
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
	
	
	var record = nlapiCreateRecord('purchaseorder'); //, {recordmode: 'dynamic'}
	
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

	/*if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
	{
		// To Set Subsidiary
		record.setFieldValue('subsidiary',subsidiary);
	}
*/
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
	record.setFieldValue('taxregoverride','T');
	record.setFieldValue('nexus',229);
	
	var price =-1;
	//var rate =50;
	

	for(var i=1;i<=PRlinecount;i++)
	{
	                                                         
	      record.selectNewLineItem('item');
          nlapiLogExecution("DEBUG","In Create Function","item done=="+ itemArray[i-1]);
	      record.setCurrentLineItemValue('item', 'item', itemArray[i-1]);   
	      nlapiLogExecution("DEBUG","In Create Function","item done1==");    
    
	      
	      record.setCurrentLineItemValue('item', 'quantity', qtyArray[i-1]);                              
	      nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
	      
	      record.setCurrentLineItemValue('item', 'units', units);                                          
	      nlapiLogExecution("DEBUG","In Create Function","units done==");
	      
	      record.setCurrentLineItemValue('item', 'description',descriptionArray[i-1]); 
	      nlapiLogExecution("DEBUG","In Create Function","description done==");
	      
	      record.setCurrentLineItemValue('item', 'location', location);
	      nlapiLogExecution("DEBUG","In Create Function","location done==");
	      
	      record.setCurrentLineItemValue('item', 'department',Department); 
	      nlapiLogExecution("DEBUG","In Create Function","department done==");
	      
	      record.setCurrentLineItemValue('item', 'class', Class);
	      nlapiLogExecution("DEBUG","In Create Function","class done==");
	      
	      record.setCurrentLineItemValue('item', 'vendorname', vendor);
	      nlapiLogExecution("DEBUG","In Create Function","vendor done==");	      
	      
	      record.setCurrentLineItemValue('item', 'rate', rateArray[i-1]);
	      nlapiLogExecution("DEBUG","In Create Function","amount done==");
	            
	      record.setCurrentLineItemValue('item', 'custcol_in_hsn_code', hsn_codeArray[i-1]);
	      nlapiLogExecution("DEBUG","In Create Function","amount done==");
	            
	      record.commitLineItem('item');
	      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
	     
	}
	 var SubmitIt=nlapiSubmitRecord(record,true);  	 
	 nlapiLogExecution("DEBUG","In Create Function","Record Submit done=="+SubmitIt);
	 
	 
	 response.sendRedirect('RECORD','purchaseorder',SubmitIt,true,null);
}
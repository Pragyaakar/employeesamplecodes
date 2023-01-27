/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Mar 2019     Tushar More
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
function userEventAfterItemReceiptSubmit(type)
{
	try
	{
		if(type == 'create')
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
 	var custUniq=new Array();
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();

  recObj = nlapiLoadRecord(recordType,recordId);
 
	nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + recordId +" type :"+recordType+" Record :"+recObj);
	
	 var Form = recObj.getFieldValue('customform');
	 nlapiLogExecution('DEBUG', 'aftr submit', "  Form  ==" + Form);

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
 	
  var PRlinecount=recObj.getLineItemCount('item');
  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
  

	for(var i=1;i<=PRlinecount;i++)
	{
    	var quantity =recObj.getLineItemValue('item','quantity',i);
    	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
    	
   
    		var itemid =recObj.getLineItemValue('item','item',i);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
        	itemArray.push(itemid);
        	qtyArray.push(quantity);
        	
        	var units =recObj.getLineItemValue('item','units',i);    
        	unitArray.push(units);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  units  ==" + units);
        	
        	var customer =recObj.getLineItemValue('item','customer',i);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  customer  ==" + customer);
        	
        	var vendorname =recObj.getLineItemValue('item','vendorname',i);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  vendorname  ==" + vendorname);
        	
        	
        	//var location_line =recObj.getLineItemValue('item','location',i);    
        	//nlapiLogExecution('DEBUG', 'aftr submit', "  location_line  ==" + location_line);
        	//locationArray.push(location_line);
        	
        	var amount =recObj.getLineItemValue('item','estimatedamount',i);    
        	nlapiLogExecution('DEBUG', 'aftr submit', "  amount  ==" + amount);//estimatedamount
        	
        	var rate =recObj.getLineItemValue('item','itemunitprice',i);    
        	nlapiLogExecution('DEBUG', 'aftr submit', "  rate  ==" + rate);
        	rateArray.push(rate);
        	
        	var description =recObj.getLineItemValue('item','description',i);    
        	nlapiLogExecution('DEBUG', 'aftr submit', "  description  ==" + description);
        	descriptionArray.push(description);
        	
        	var line_chk =recObj.getLineItemValue('item','custcol_line_number',i);  
        	line_chkArr.push(line_chk);
    	
    	
	 }
	if(Form == '104')
	{
	    createSalesOrderForPR(PRlinecount,date,customer,vendorname,line_chkArr,Class,Department,location,rateArray,recordId,itemArray,qtyArray,unitArray,descriptionArray,subsidiary);//amount,
	}
	}
	}
	catch(e)
	{
		throw nlapiCreateError('SUITELET_ERROR',"There is No Record Available for this Transaction..."+e, false); 
	}
}	


function createSalesOrderForPR(PRlinecount,date,customer,vendorname,Class,line_chkArr,Department,location,rateArray,recordId,itemArray,qtyArray,unitArray,descriptionArray,subsidiary)	
{	

nlapiLogExecution("DEBUG","In Create Function","createSalesOrderRecordFunction**************");
nlapiLogExecution("DEBUG","In Create Function","PRlinecount=="+PRlinecount);
nlapiLogExecution("DEBUG","In Create Function","date=="+date);
nlapiLogExecution("DEBUG","In Create Function","location=="+location);

nlapiLogExecution("DEBUG","In Create Function","itemid=="+itemArray);
nlapiLogExecution("DEBUG","In Create Function","quantity=="+qtyArray);
nlapiLogExecution("DEBUG","In Create Function","units=="+unitArray);
nlapiLogExecution("DEBUG","In Create Function","description=="+descriptionArray);//subsidiary
nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)

var record = nlapiCreateRecord('salesorder', {recordmode: 'dynamic'}); 



if(customer != '' && customer != 'undefined' && customer != null)
{
	// To Set Customer Name
   nlapiLogExecution("DEBUG","In Create Function","**To Set Customer Name**");
	record.setFieldValue('entity','81');//customer
}
record.setFieldValue('entity','81');//customer

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

//record.setFieldValue('nexus',229);         
                                                //nexus  taxregoverride
//record.setFieldValue('taxregoverride','T');  //	custbody_req_num

//record.setFieldValue('custbody_req_num',recId);
 var price =-1;
// var rate =100;
 
for(var i=1;i<=PRlinecount;i++)
{
                                                         
      record.selectNewLineItem('item');

      record.setCurrentLineItemValue('item', 'item', itemArray[i-1]);   
      nlapiLogExecution("DEBUG","In Create Function","item done==");
      
      record.setCurrentLineItemValue('item', 'location', location);
      nlapiLogExecution("DEBUG","In Create Function","location done==");
      
      record.setCurrentLineItemValue('item', 'quantity', qtyArray[i-1]);                              
      nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
      
      record.setCurrentLineItemValue('item', 'units', unitArray[i-1]);                                          
      nlapiLogExecution("DEBUG","In Create Function","units done==");
      
      
      record.setCurrentLineItemValue('item', 'price',price);
      nlapiLogExecution("DEBUG","In Create Function","price done==");
      
      record.setCurrentLineItemValue('item', 'rate', rateArray[i-1]);                                          
      nlapiLogExecution("DEBUG","In Create Function","units done==");
      

  	  //record.setCurrentLineItemValue('item', 'amount',amount); 
      //nlapiLogExecution("DEBUG","In Create Function"," amount done=="+amount);
      
      record.setCurrentLineItemValue('item', 'description',descriptionArray[i-1]); 
      nlapiLogExecution("DEBUG","In Create Function","description done==");
      
   
      
 //     record.setCurrentLineItemValue('item', 'department',Department); 
      nlapiLogExecution("DEBUG","In Create Function","department done==");
      
  //    record.setCurrentLineItemValue('item', 'class', Class);
      nlapiLogExecution("DEBUG","In Create Function","class done==");
      
 //     record.setCurrentLineItemValue('item', 'custcol_line_number',line_chkArr[i-1], 'T');
      
      record.commitLineItem('item');
      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
     
}
 var SubmitIt=nlapiSubmitRecord(record,true);  
 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
 
 if(SubmitIt != '' && SubmitIt != 'undefined' && SubmitIt != null)
{
 createItemFulfillmentForPR(SubmitIt,recordId,PRlinecount,date,location,customer,itemArray,qtyArray,unitArray,descriptionArray);
}
}

function createItemFulfillmentForPR(SubmitIt,recordId,PRlinecount,date,location,customer,itemArray,qtyArray,unitArray,descriptionArray)	
{	

nlapiLogExecution("DEBUG","In Create Function","This Function for createItemFulfillmentRecord**************");
/*nlapiLogExecution("DEBUG","In Create Function","PRlinecount=="+PRlinecount);
nlapiLogExecution("DEBUG","In Create Function","date=="+date);
nlapiLogExecution("DEBUG","In Create Function","location=="+location);
//nlapiLogExecution("DEBUG","In Create Function","entity=="+entity);
nlapiLogExecution("DEBUG","In Create Function","itemid=="+itemid);
nlapiLogExecution("DEBUG","In Create Function","quantity=="+quantity);
nlapiLogExecution("DEBUG","In Create Function","units=="+units);
nlapiLogExecution("DEBUG","In Create Function","description=="+description);//subsidiary
*/	

var record =  nlapiTransformRecord('salesorder', SubmitIt, 'itemfulfillment');                   


if(customer != '' && customer != 'undefined' && customer != null)
{
	// To Set vendor Name
   nlapiLogExecution("DEBUG","In Create Function","**To Set Customer Name**");
	record.setFieldValue('entity','81');//customer
}
record.setFieldValue('entity','81');//customer

if(SubmitIt != '' && SubmitIt != 'undefined' && SubmitIt != null)
{
	// To Set vendor Name
   nlapiLogExecution("DEBUG","In Create Function","**To Set Created from**");
	record.setFieldValue('createdfrom',SubmitIt);//vendor
}


if(date != '' && date != 'undefined' && date != null)
{
	record.setFieldValue('trandate',date);
}

record.setFieldValue('custbody_req_num',recordId);

var price=-1;

for(var i=1;i<=PRlinecount;i++)
{
                                                         
      //record.selectNewLineItem('item');
	record.selectLineItem('item', i);
	//record.setCurrentLineItemValue('item', 'location', i);
    record.setCurrentLineItemValue('item', 'item', itemArray[i-1]);   
      //nlapiLogExecution("DEBUG","In Create Function","item done==");
	/*ifRec.commitLineItem('item'); 
      record.setCurrentLineItemValue('item', 'quantity', quantity);                              
      nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
      
      record.setCurrentLineItemValue('item', 'location', location);
      nlapiLogExecution("DEBUG","In Create Function","location done==");
      
      record.setCurrentLineItemValue('item', 'price', price);
      nlapiLogExecution("DEBUG","In Create Function","price done==");
      
      record.setCurrentLineItemValue('item', 'units', units);                                          
      nlapiLogExecution("DEBUG","In Create Function","units done==");
      
      record.setCurrentLineItemValue('item', 'description',description); 
      nlapiLogExecution("DEBUG","In Create Function","description done==");
      
    */
      record.commitLineItem('item');
      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
     
}
 var SubmitIt1=nlapiSubmitRecord(record,true);  
  nlapiLogExecution("DEBUG","In Create Function","Record Submit done=="+SubmitIt1);

  nlapiSetRedirectURL('RECORD', 'itemfulfillment', SubmitIt1,false);
}




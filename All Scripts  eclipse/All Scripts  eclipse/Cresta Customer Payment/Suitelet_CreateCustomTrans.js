function INvoiceLoadToCreateTransAction(request,response)
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
 
 	var recId = request.getParameter('cust_id');
	
   
  var  recObj = nlapiLoadRecord('invoice',recId);
	 
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
		 	
	 var customerBody = recObj.getFieldValue('entity');
		 nlapiLogExecution('DEBUG', 'aftr submit', "  customerBody  ==" + customerBody);
	 	
      var PRlinecount=recObj.getLineItemCount('item');
	  nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
	  
	  var totalAMount=recObj.getFieldValue('total');
	  nlapiLogExecution('DEBUG', 'aftr submit', "  totalAMount  ==" + totalAMount);
	  
	  
		for(var i=1;i<=PRlinecount;i++)
		{
        	var quantity =recObj.getLineItemValue('item','quantity',i);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
        	
        		var itemid =recObj.getLineItemValue('item','item',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
            	itemArray.push(itemid);
            	qtyArray.push(quantity);
            	
            	var units =recObj.getLineItemValue('item','units',i);    
            	nlapiLogExecution('DEBUG', 'aftr submit', "  units  ==" + units);
            	
            	var customer =recObj.getLineItemValue('item','customer',i);
            	custArr.push(customer);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  customer  ==" + customer);
            	
            	var vendorname =recObj.getLineItemValue('item','vendorname',i);
            	vendArr.push(vendorname);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  vendorname  ==" + vendorname);
            	
            	
          
            	var amount =recObj.getLineItemValue('item','amount',i);    
            	amtArr.push(amount);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  amount  ==" + amount);//estimatedamount
            	
            	var rate =recObj.getLineItemValue('item','rate',i);    
            	nlapiLogExecution('DEBUG', 'aftr submit', "  rate  ==" + rate);
            	
            	//rate1 = parseFloat(amount)/parseFloat(quantity);
            	rateArray.push(rate);
            	
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
           
		}
		createInvAdjustViaPR(PRlinecount,recId,customerBody,date,location,vendArr,amtArr,line_chkArr,Class,Department,location,rateArray,recId,itemArray,qtyArray,units,descriptionArray,subsidiary,typeItemArr);
		
}	
	

function createInvAdjustViaPR(PRlinecount,recId,customerBody,date,location,vendArr,amtArr,line_chkArr,Class,Department,location,rateArray,recId,itemArray,qtyArray,units,descriptionArray,subsidiary,typeItemArr)
{	
	
	nlapiLogExecution("DEBUG","In Create Function","createCustomTransactionFunction**************");
	
     var record = nlapiCreateRecord('customtransaction_custom_customer_paymen', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}
		
  
	if(date != '' && date != 'undefined' && date != null)
	{
		record.setFieldValue('trandate',date);
	}

	if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
	{
		// To Set Subsidiary
		record.setFieldValue('subsidiary',subsidiary);
	}
	
	
	if(Class != '' && Class != 'undefined' && Class != null)
	{
		// To Set Subsidiary
		record.setFieldValue('class',Class);
	}
	
	if(Department != '' && Department != 'undefined' && Department != null)
	{
		// To Set Subsidiary
		record.setFieldValue('department',Department);
	}
	
	
	if(location != '' && location != 'undefined' && location != null)
	{
		// To Set Subsidiary
		record.setFieldValue('location',location);
	}
	
	record.setFieldValue('custbody_invoice_num',recId);
	
	var memo ='CustomTransactionCreated';
	
	record.selectNewLineItem('line');
	record.setCurrentLineItemValue('line', 'account', 1033);
	record.setCurrentLineItemValue('line', 'debit', amtArr);
	record.setCurrentLineItemValue('line', 'entity', customerBody);
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');
	
	
	record.selectNewLineItem('line');
	record.setCurrentLineItemValue('line', 'account', 1034);
	record.setCurrentLineItemValue('line', 'credit', amtArr);
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');

	
	 var SubmitIt = nlapiSubmitRecord(record);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 
	  nlapiSubmitField('invoice', recId, 'custbody_custom_trans_rec', SubmitIt);
	  
	 response.sendRedirect('RECORD', 'customtransaction_custom_customer_paymen', SubmitIt, false,'view');
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
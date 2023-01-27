function PRdataLoadForSO(request,response)
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
 	var custUniq=new Array();//custUniq
 	var recId = request.getParameter('id'); 
	
    var recType= request.getParameter('type');
    
  //  var searchId= 'item_location_search';
    
    recObj = nlapiLoadRecord(recType,recId);
	 
 	nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + recId +" type :"+recType+" Record :"+recObj);
	
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
        	var quantity =recObj.getLineItemValue('item','quantity',i);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
        	
        	var avail_qaunt =recObj.getLineItemValue('item','custcol_avail_quantity',i);    
        	nlapiLogExecution('DEBUG', 'aftr submit', "  location_line  ==" + avail_qaunt);
        	       	
        	var sale_line =recObj.getLineItemValue('item','custcol_line_sales_generate',i);   
        	nlapiLogExecution('DEBUG', 'aftr submit', "  sale_line  ==" + sale_line);
        	
        	if( sale_line !='T' && approveStat =='2' )
        	{
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
            	
            	
            	
            //	salesArr.push(sale_line)
            	//nlapiLogExecution('DEBUG', 'aftr submit', "  location_line  ==" + location_line);
            	//locationArray.push(location_line);
            	
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
            	
            
            	
        	}
        	nlapiLogExecution('DEBUG', 'aftr submit', "  CUstArr B4 ==" + custArr);
        	 custNew =filter_array(custArr);
        	 custUniq =removeDuplicates(custNew);
        	nlapiLogExecution('DEBUG', 'aftr submit', "  CUstArr after custUniq ==" + custUniq);
		 }
		createSalesOrderForPR(PRlinecount,date,custUniq,vendArr,amtArr,line_chkArr,Class,Department,location,rateArray,recId,itemArray,qtyArray,units,descriptionArray,subsidiary,recId,recType);//amount,
		
}	
	
	
function createSalesOrderForPR(PRlinecount,date,custUniq,vendArr,amtArr,line_chkArr,Class,Department,location,rateArray,recId,itemArray,qtyArray,units,descriptionArray,subsidiary,recId,recType)	
{	
	
	nlapiLogExecution("DEBUG","In Create Function","createSalesOrderRecordFunction**************");
	nlapiLogExecution("DEBUG","In Create Function","PRlinecount=="+PRlinecount);
	nlapiLogExecution("DEBUG","In Create Function","date=="+date);
	nlapiLogExecution("DEBUG","In Create Function","location=="+location);

	nlapiLogExecution("DEBUG","In Create Function","itemid=="+itemArray);
	nlapiLogExecution("DEBUG","In Create Function","quantity=="+qtyArray);
	nlapiLogExecution("DEBUG","In Create Function","line_chkArr=="+line_chkArr);
	nlapiLogExecution("DEBUG","In Create Function","description=="+descriptionArray);//subsidiary
	nlapiLogExecution("DEBUG","In Create Function","subsidiary=="+subsidiary)
	

	
	nlapiLogExecution("DEBUG","In Create Function","custUniq.length=="+custUniq.length);
  for(var k=0;k < custUniq.length;k++)
  {
	
		var record = nlapiCreateRecord('salesorder', {recordmode: 'dynamic'}); 
		
   if(custUniq != '' && custUniq != 'undefined' && custUniq != null)
	{
		// To Set Customer Name
	   nlapiLogExecution("DEBUG","In Create Function","**To Set Customer Name**");
		record.setFieldValue('entity',custUniq[k]);//customer
	}
 
	
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
    
	record.setFieldValue('orderstatus','B');         
	                                                //nexus  taxregoverride
//	record.setFieldValue('taxregoverride','T');  //	custbody_req_num

//	record.setFieldValue('custbody_req_num',recId);
	 var price =-1;
	// var rate =100;
	 
	for(var i=1;i<=line_chkArr.length;i++)
	{
	                                                         
	      record.selectNewLineItem('item');

	      record.setCurrentLineItemValue('item', 'item', itemArray[i-1]);   
	      nlapiLogExecution("DEBUG","In Create Function","item done=="+itemArray[i-1]);
	      
	      record.setCurrentLineItemValue('item', 'location', location);
	      nlapiLogExecution("DEBUG","In Create Function","location done==");
	      
	      record.setCurrentLineItemValue('item', 'quantity', qtyArray[i-1]);                              
	      nlapiLogExecution("DEBUG","In Create Function"," quantity done==");
	      
	      record.setCurrentLineItemValue('item', 'units', units);                                          
	      nlapiLogExecution("DEBUG","In Create Function","units done==");
	      
	      
	      record.setCurrentLineItemValue('item', 'price',price);
	      nlapiLogExecution("DEBUG","In Create Function","price done==");
	      
	      record.setCurrentLineItemValue('item', 'rate', rateArray[i-1]);                                          
	      nlapiLogExecution("DEBUG","In Create Function","units done==");
	      
	
      	  //record.setCurrentLineItemValue('item', 'amount',amount); 
	      //nlapiLogExecution("DEBUG","In Create Function"," amount done=="+amount);
	      
	      record.setCurrentLineItemValue('item', 'description',descriptionArray[i-1]); 
	      nlapiLogExecution("DEBUG","In Create Function","description done==");
	      
	   
	      
	  //   record.setCurrentLineItemValue('item', 'custcol_line_sales_generate','T'); 
	      nlapiLogExecution("DEBUG","In Create Function","department done==");
	      
	  //    record.setCurrentLineItemValue('item', 'class', Class);
	      nlapiLogExecution("DEBUG","In Create Function","class done==");
	      
	 //     record.setCurrentLineItemValue('item', 'custcol_line_number',line_chkArr[i-1], 'T');
	      
	      record.commitLineItem('item');
	      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
	     
	}
 
	 var SubmitIt=nlapiSubmitRecord(record,true);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 
	 var obj =nlapiLoadRecord(recType,recId);
	  nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + recId +" type :"+recType+" Record :"+obj);

	  var check= obj.getFieldValue('custbody_sales_order_num');
	  nlapiLogExecution("DEBUG","In Create Function","check value FOr SalesORder=="+check +" line_chkArr:"+line_chkArr);
	  if(check == 'F')
	  {
	    obj.setFieldValue('custbody_sales_order_num','T');
	  }
	
	
	 for (var j=1;j<= line_chkArr.length ;j++ )
	 {
		 nlapiLogExecution("DEBUG","In Create Function","check value j ==" + j+"line_chkArr[j-1]=="+line_chkArr[j-1]);
		     if(j == line_chkArr[j-1] )
			 {
		    	//  nlapiLogExecution("DEBUG","In Create Function","check value j ==" + j+"line_chkArr[j-1]=="+line_chkArr[j-1]);
		         obj.setLineItemValue('item','custcol_line_sales_generate',line_chkArr[j-1],'T');
			 }
	 }
	   nlapiSubmitRecord(obj,true);
	  
  }
    
 
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
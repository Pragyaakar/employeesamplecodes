/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */

 define(["N/record", "N/runtime", "N/url", "N/https"], function (record, runtime, url, https ) {
	function saveRecord(context) {

	//load current transaction record
	  var currentRecord = context.currentRecord;
  
	  var itemCount = currentRecord.getLineCount({
		sublistId: "item",
	  });

	  //array to store selected items in salesorder
	  var array_item = [];
	 
	  for (var j = 0; j < itemCount; j++) {
		var item_type = currentRecord.getSublistValue({
		  sublistId: "item",
		  fieldId: "itemtype",
		  line: j,
		});

		
		if (item_type == "InvtPart") {
		  var sublist_item = currentRecord.getSublistValue({
			sublistId: "item",
			fieldId: "item",
			line: j,
		  });
  
		  array_item.push(sublist_item);
		}
	  }
  
	  //convert array to JSON string to send it to suitelet for processing
	  array_item = JSON.stringify(array_item);
  
	  alert("array_item==>" + array_item);
  
	  //get URL of suitelet using its script  ID
	  var suiteletURL = url.resolveScript({
		scriptId: "customscript_slitem_quantity_validation",
		deploymentId: "customdeploy1",
		params: {
			'array_item':array_item
		}
	  });
  
	  suiteletURL = "https://4245635-sb1.app.netsuite.com" + "" + suiteletURL;
	  
  
	  //send https request to suitelet and get the value of flag
	  var myresponse = https.request({
		method: https.Method.GET,
		url: suiteletURL,
	  });
	  

	  var responseFlag = JSON.parse(myresponse.body);
	  
	  //Check the value of flag. The transaction will not be saved and an alert will be displayed if it is false.
	  if(responseFlag != true)
	  {  
		  alert('On hand quantity for selected item/s is zero');
		  return false;
	  }
  
	  return true;
	}
  
	return {
	  saveRecord: saveRecord,
	};
  });
  
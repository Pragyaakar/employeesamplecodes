/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       26 Apr 2019     Nileshkumar
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
var itemMap={};
var JUMP_TO_VALIDATE_LINE = true;
function fillMapPageInit(type){debugger;

 //var locationField = nlapiGetLineItemField('item', 'location');
//locationField.setMandatory(false);

var itemcount = nlapiGetLineItemCount('item');
   for(var lineIndex = 1 ;lineIndex <= itemcount ; lineIndex++){
	   var item = nlapiGetLineItemValue('item', 'item', lineIndex);
	   if(item){
		   if(itemMap[item]){
			   alert('Item is duplicated in line:'+lineIndex);
		   }else{
		   itemMap[item]=lineIndex;
		   }
		   
	   }
   }
}
/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function checkForDuplicateValidateLine(type){debugger;
if(JUMP_TO_VALIDATE_LINE == true){
	var item = nlapiGetCurrentLineItemValue('item', 'item');
	if(itemMap[item]){
		var lineIndex = nlapiGetCurrentLineItemIndex('item');
		if(itemMap[item] != lineIndex){
			alert('Item is duplicated');
			return false;
		}
	}
	
}	
    return true;

}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function checkForDuplicateSaveRecord(){
var lineCount = nlapiGetLineItemCount('item');
var itemMap2={};
for (var lineIndex = 1; lineIndex <= lineCount; lineIndex++) {
	
	var item = nlapiGetLineItemValue('item', 'item', lineIndex);
	  if(item){
		   if(itemMap2[item]){
			   alert('Item is duplicated in line:'+lineIndex);
			   nlapiSelectLineItem('item', lineIndex);
			   return false;
		   }else{
			   itemMap2[item]=lineIndex;
		   }
		   
	   }
}

    return true;
}


	function setLocation(){
		try {
		debugger;
		var lineCount = nlapiGetLineItemCount('item');
		var subsidiary = nlapiGetFieldValue('subsidiary'); 
		var form =   nlapiGetFieldValue('customform');
		for (var lineNum = 1; lineNum <= lineCount; lineNum++) {
			var location = nlapiGetLineItemValue('item','location',lineNum);
			if(location == null || location == undefined || location == ''){
				var prefLocation = nlapiGetLineItemValue('item','custcol_pref_loc_name',lineNum);
				JUMP_TO_VALIDATE_LINE=false;
				nlapiSelectLineItem('item', lineNum);
				
				debugger;
				
				
				if(subsidiary == null || subsidiary == undefined || subsidiary == ''){
					alert('Please Enter Subsidiary');JUMP_TO_VALIDATE_LINE = true; return;}
				var filters = [];
				filters.push(new nlobjSearchFilter('custrecord_pref_loc_name', null, 'anyof', prefLocation));
				filters.push(new nlobjSearchFilter('subsidiary', null, 'anyof', subsidiary));
				var searchResult = nlapiSearchRecord('location',null,filters);
				if(searchResult){
					
					var locationId = searchResult[0].getId();
					if(locationId != null && locationId != undefined && locationId != '')
						nlapiSetCurrentLineItemValue('item','location',locationId,true,true);
					//nlapiSetLineItemValue('item','location',locationId,lineNum);
				}
				
				//=================== CHaanges Are Here ==========================
				

				
				// nlapiLogExecution('DEBUG', 'item', 'item in if loop = ' + item);
				 var columns1 = new Array();
				 columns1[0] = new nlobjSearchColumn('custrecord_subsidiary_name');
				 columns1[1] = new nlobjSearchColumn('custrecord_cust_name');
				 columns1[2] = new nlobjSearchColumn('custrecord_store_indent_int_id');
				
				
				 var filters1 = new Array();
				 filters1[0] = new nlobjSearchFilter ('custrecord_subsidiary_name', null, 'anyof',subsidiary);
				// filters[1] = new nlobjSearchFilter ('inventorylocation', null, 'anyof',location);
					 var searchresults1 = nlapiSearchRecord('customrecord_store_indent_internal_cust',null,filters1,columns1);//customsearch_item_search_so_po
					 
					if(searchresults1 != null)
				   {
					for (var i = 0;  i < searchresults1.length; i++) 
					{
						var custName = searchresults1[i].getValue('custrecord_cust_name');
			           // alert('Customer***************' +custName);
			            
			            var CustForm = searchresults1[i].getValue('custrecord_store_indent_int_id');
			           // alert('CustForm***************' +CustForm);
			            
			            if(CustForm == form)
					     {    				
						  nlapiSetCurrentLineItemValue('item','customer',custName);
					     }
					}
						
				   }	
				
			     //======================End Here ===============================
				
			}
		}
		
		
		JUMP_TO_VALIDATE_LINE = true;
	} catch (e) {
		alert('Error: '+e.message);
	}
}
function hidebtn(){
  
   var approvalStatus = nlapiGetFieldValue('approvalstatus');

if(approvalStatus == '2'){
	document.getElementById('tbl_edit').style.display = "none";
}
}
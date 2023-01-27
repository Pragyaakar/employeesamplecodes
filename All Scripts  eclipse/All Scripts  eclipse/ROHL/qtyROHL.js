/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       07 Jun 2019     Shivraj
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
var flag = true;
function clientPageInit(type){
	
	flag= true;
	return flag;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord()
{
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	var o_checkobj = nlapiLoadRecord(recordType, recordId);
	
	var flag;
	
	var vendorName = o_checkobj.getFieldValue('entity');
	alert('vendorName >> ' +vendorName);
	if (o_checkobj != null && o_checkobj != '' && o_checkobj != undefined) 
			{
				var itm_LineCount = o_checkobj.getLineItemCount('item');
				alert('itm_LineCount >> ' +itm_LineCount);
				if(itm_LineCount != null && !isNaN(itm_LineCount))		
				{ 
					for (var i = 1; i <= itm_LineCount; i++) 
					{	var itemName = o_checkobj.getLineItemValue('item', 'item', i);
						alert('itemName >> '+itemName);
						var itemQty  = o_checkobj.getLineItemValue('item', 'quantity', i);
						alert('itemQty >> '+itemQty);
						var filters = new Array();
					    filters[0] = new nlobjSearchFilter( 'entity', null, 'anyof', entity);
					    filters[1] = new nlobjSearchFilter( 'item', null, 'anyof', itemName);
					    var column = new Array();
						columns[0] = new nlobjSearchColumn('quantity');   
						var searchresults = nlapiSearchRecord('purchaserequisition',null, filters, column);
						     
							for ( var j = 0; searchresults != null && j < searchresults.length; j++ )   
						       { alert('in For >> ');
						    	 var qtyPR = searchresults[i].getValue('quantity');
						       }  
						    	   if( itemQty > qtyPR)
						    		   {    
						    		     alert('Purchase Order Item Quantity Should be minimum from PR quantity');
						    		   		flag = false;
						    		   } 
					}  
				} 
			}
    return flag;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum){
 
}

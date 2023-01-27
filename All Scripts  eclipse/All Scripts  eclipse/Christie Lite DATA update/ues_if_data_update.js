/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       28 Aug 2019     AMOL ATPL
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
function userEventAfterSubmit(type)
{
	 var Id = nlapiGetRecordId();
	 var RecType = nlapiGetRecordType();
	 IFOBJ = nlapiLoadRecord(RecType,Id);
	 var ifIntId = IFOBJ.getFieldValue('custrecord_if_internalid');
	 //nlapiLogExecution('DEBUG', 'After Submit value of ifIntId', "  ifIntId ==" + ifIntId);
	 var lneId = IFOBJ.getFieldValue('custrecord_if_line_id');
	 //nlapiLogExecution('DEBUG', 'After Submit value of lneId', "  lneId ==" + lneId);
	 var strng = lneId.toString();
	 var str = strng.split(',');
	 var blnk = '';
	 nlapiLogExecution('DEBUG', 'After Submit value of str', "  str ==" + str.length);
	 if(ifIntId != null)
	 {
		 var ifObj = nlapiLoadRecord('itemfulfillment',ifIntId);
		 
	 
		 var createFrom = ifObj.getFieldValue('createdfrom');
			nlapiLogExecution('DEBUG','Serach Value','createFrom:'+createFrom);
			
			var cust_fields = ['entity','tranid'];
			
			if(createFrom !=null && createFrom !='' && createFrom != undefined)
			{
				var poObj = nlapiLookupField('salesorder',createFrom,cust_fields);
				 
				var entityName = poObj.entity;
		        
				var transNum = poObj.tranid;
				
			}
			
			
			nlapiLogExecution('DEBUG','Serach Value','entityName :'+entityName);
			nlapiLogExecution('DEBUG','Serach Value','transNum :'+transNum);
		
		 var lineCount = ifObj.getLineItemCount('item')
		 if(lineCount != null && lineCount != undefined)
		 {
			 for(var j=1 ; j<=lineCount; j++)
		     {
				 var lineId = ifObj.getLineItemValue('item','line',j);
				 //nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  lineId ==" +lineId);
				 for(k=0;k<str.length;k++)
				 {
					 if(lineId === str[k])
					 {
						 ifObj.setLineItemValue('item','custcol_cls_bill_order',j,createFrom);
						 ifObj.setLineItemValue('item','custcol_entity_name',j,entityName);
						 ifObj.setLineItemValue('item','custcol_order_number',j,transNum);
						 //nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  in strcompare ==" +lineId);
					 }
				 }
		     }
		 }
       ifObj.setFieldValue('custbody_data_set','T');
		 nlapiSubmitRecord(ifObj);
	 }
	 IFOBJ.setFieldValue('custrecord_vvalue_updt','T');
	 nlapiSubmitRecord(IFOBJ);
}

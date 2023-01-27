/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       28 Aug 2019     Tushar
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
	try
	{
		
	
	 var Id = nlapiGetRecordId();
	 var RecType = nlapiGetRecordType();
	 POobj = nlapiLoadRecord(RecType,Id);
	 
	 var createFrom = POobj.getFieldValue('createdfrom');
		nlapiLogExecution('DEBUG','Serach Value','createFrom:'+createFrom);
		
		var cust_fields = ['entity','tranid'];
		
		 var createFromTxt = POobj.getFieldText('createdfrom');
		 
			var blank ='';
		 
		if(createFrom !=null && createFrom !='' && createFrom != undefined)
		{
			if(createFromTxt.substr(0,11) =='Sales Order')
			{
				var poObj = nlapiLookupField('salesorder',createFrom,cust_fields);
				 
				var entityName = poObj.entity;
		        
				var transNum = poObj.tranid;
				
			}
		}
		
		
		
		nlapiLogExecution('DEBUG','Serach Value','entityName :'+entityName);
		nlapiLogExecution('DEBUG','Serach Value','transNum :'+transNum);
		//====================================================
		
		var filters=new Array();
		var columns = new Array();

	    var POMap ={};
	    var POMap1 ={};
		filters[0] = new nlobjSearchFilter('internalid', null,'anyof',Id);
		
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('appliedtolinktype');
		columns[2] = new nlobjSearchColumn("type","item",null);
		columns[3] = new nlobjSearchColumn('line');
		
		var searchResultItem = nlapiSearchRecord('purchaseorder', 'customsearch_po_values_update_using_sear', filters, columns);
	   
		if (searchResultItem != null)
		{
			for(var j=0;j<searchResultItem.length;j++)
			{
				var LinkType = searchResultItem[j].getValue('appliedtolinktype');
				var ItemType = searchResultItem[j].getValue("type","item");
				var LineId = searchResultItem[j].getValue('line');
				var intId = searchResultItem[j].getValue('internalid');
				
				POMap1[LineId]=LinkType;
				POMap[LineId]=ItemType;
				
			}
		}
		
		//====================================================
		
		nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  JSON.stringify(POMap1) ==" +JSON.stringify(POMap1));
		nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  JSON.stringify(POMap) ==" +JSON.stringify(POMap));
		
		
		
	 var lineCount = POobj.getLineItemCount('item')
	 if(lineCount != null && lineCount != undefined)
	 {
		 for (var LineId in POMap)
 	    {
			 for(var j=1 ; j<=lineCount; j++)
		     {
				 if(createFrom !=null && createFrom !='' && createFrom != undefined)
					{
						if(createFromTxt.substr(0,11) =='Sales Order')
						{
						     var lineId = POobj.getLineItemValue('item','line',j);
						    //nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  lineId ==" +lineId);
						     
							 if(lineId === LineId && POMap1[LineId] =='DropShip')
							 {
								 POobj.setLineItemValue('item','custcol_cls_bill_order',j,createFrom);
								 POobj.setLineItemValue('item','custcol_entity_name',j,entityName);
								 POobj.setLineItemValue('item','custcol_order_number',j,transNum);
								 //nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  in strcompare ==" +lineId);
							 }
							 else if(lineId === LineId && POMap[LineId] =='NonInvtPart' && POMap1[LineId] =='SpecOrd')
							 {
								 POobj.setLineItemValue('item','custcol_cls_bill_order',j,createFrom);
								 POobj.setLineItemValue('item','custcol_entity_name',j,entityName);
								 POobj.setLineItemValue('item','custcol_order_number',j,transNum);
							   //nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  in strcompare ==" +lineId);
							 }
							
						}
					}
			 }
	     }
	 }
     
	
	 nlapiSubmitRecord(POobj);
	 
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  Error ==" +e);
		
	}
	 
}
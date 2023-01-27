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
function userEventIFfieldsUpdateNew(type)
{
	try
	{
		
	
	 var Id = nlapiGetRecordId();
	 var RecType = nlapiGetRecordType();
	 POobj = nlapiLoadRecord(RecType,Id);
	 
	 var createFrom = POobj.getFieldValue('createdfrom');
		nlapiLogExecution('DEBUG','Serach Value','createFrom:'+createFrom);
		
		 var createFromTxt = POobj.getFieldText('createdfrom');
		
		var cust_fields = ['entity','tranid'];
		
		var blank ='';
		
		if((createFrom !=null && createFrom !='' && createFrom != undefined))
		{
			
			if(createFromTxt.substr(0,11) =='Sales Order')
			{
				var poObj = nlapiLookupField('salesorder',createFrom,cust_fields);
				 
				var entityName = poObj.entity;
		        
				var transNum = poObj.tranid;
				
				
				
				//====================================================
				
				var filters=new Array();
				var columns = new Array();

			    var POMap ={};
			    var POMap1 ={};
				filters[0] = new nlobjSearchFilter('internalid', null,'anyof',createFrom);
				
				columns[0] = new nlobjSearchColumn('internalid');
				columns[1] = new nlobjSearchColumn("appliedtolinktype","purchaseOrder",null);
				columns[2] = new nlobjSearchColumn("type","item",null);
				columns[3] = new nlobjSearchColumn('item');
				
				var searchResultItem = nlapiSearchRecord('salesorder', 'customsearch657', filters, columns);
			   
				if (searchResultItem != null)
				{
					for(var i=0;i<searchResultItem.length;i++)
					{
						var LinkType = searchResultItem[i].getValue("appliedtolinktype","purchaseOrder");
						var ItemType = searchResultItem[i].getValue("type","item");
						var item = searchResultItem[i].getValue('item');
						var intId = searchResultItem[i].getValue('internalid');
						
						POMap1[item]=LinkType;
						POMap[item]=ItemType;
						
					}
				}
				
				//====================================================
				
				
				
				
			}
			
		}
		
		
		nlapiLogExecution('DEBUG','Serach Value','entityName :'+entityName);
		nlapiLogExecution('DEBUG','Serach Value','transNum :'+transNum);
	
		nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  JSON.stringify(POMap1) ==" +JSON.stringify(POMap1));
		nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  JSON.stringify(POMap) ==" +JSON.stringify(POMap));
		
		
		
	 var lineCount = POobj.getLineItemCount('item')
	 if(lineCount != null && lineCount != undefined)
	 {
			 for(var j=1 ; j<=lineCount; j++)
		     {
				 
				 if((createFrom !=null && createFrom !='' && createFrom != undefined))
					{
						if(createFromTxt.substr(0,11) =='Sales Order')
						{
							var lineItem = POobj.getLineItemValue('item','item',j);
							nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  POMap1[lineItem]  ==" +POMap1[lineItem]);
							nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  POMap[lineItem]  ==" +POMap[lineItem]);
							if(POMap1[lineItem] == 'SpecOrd' && POMap[lineItem] =='InvtPart')
							{
								nlapiLogExecution('DEBUG', 'Condition 1', "  Special order n InvPart" );
								
								 POobj.setLineItemValue('item','custcol_cls_bill_order',j,createFrom);
								 POobj.setLineItemValue('item','custcol_entity_name',j,entityName);
								 POobj.setLineItemValue('item','custcol_order_number',j,transNum);
							}
							else if(POMap1[lineItem] == 'DropShip')
							{
								nlapiLogExecution('DEBUG', 'Condition 2', "  DropShip" );
								 POobj.setLineItemValue('item','custcol_cls_bill_order',j,blank);
								 POobj.setLineItemValue('item','custcol_entity_name',j,blank);
								 POobj.setLineItemValue('item','custcol_order_number',j,blank);
						
							}
							else if(POMap[lineItem] =='InvtPart' && POMap1[lineItem] != 'DropShip')
							{
								nlapiLogExecution('DEBUG', 'Condition 3', "  InvPart" );

								 POobj.setLineItemValue('item','custcol_cls_bill_order',j,createFrom);
								 POobj.setLineItemValue('item','custcol_entity_name',j,entityName);
								 POobj.setLineItemValue('item','custcol_order_number',j,transNum);
						
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
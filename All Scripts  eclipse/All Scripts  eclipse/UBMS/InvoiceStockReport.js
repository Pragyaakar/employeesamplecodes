/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Dec 2018     cwarkhad
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
var qtyAvailableUpdate=0;
var newquantity=0;
function InvoiceAfterFulfillmentSubmit(type){
  try
  {
	if(type=='create' || type=='edit')
	{
		var ifrec=nlapiLoadRecord('invoice',nlapiGetRecordId());
		
		var createdFrom=ifrec.getFieldValue('createdfrom');
		// var name=ifrec.getFieldValue('entity');
	
				
		if(createdFrom == null || createdFrom == undefined)  
		{
			var iflinecount=ifrec.getLineItemCount('item');
			var itemArray=[];
			for(var i=1;i<=iflinecount;i++)
			{
				var itemid =ifrec.getLineItemValue('item','item',i);
	          	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
				var type =nlapiLookupField('item',itemid,'recordType')
				if(type=='serializedinventoryitem')	
				{
	              	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  == I am in serial item");
					ifrec.selectLineItem('item',i);
					var invDetail = ifrec.viewLineItemSubrecord('item','inventorydetail',i);
					//invDetail.selectLineItem('inventoryassignment',i);
					var invDetailCount =invDetail.getLineItemCount('inventoryassignment');
					for (var k=1; k<=invDetailCount; k++)
					{
						invDetail.selectLineItem('inventoryassignment', k);
						var serialNum=invDetail.getCurrentLineItemText('inventoryassignment', 'issueinventorynumber');
	                  	nlapiLogExecution('DEBUG', 'aftr submit', "  serialNum  ==" + serialNum);
						var quantity=invDetail.getCurrentLineItemValue('inventoryassignment', 'quantity');
	                  	nlapiLogExecution('DEBUG', 'aftr submit', "  quantity  ==" + quantity);
						//searchcustomRecord(itemid, quantity, serialNo);
						checkandupdateCustomRecordforSerial(quantity,itemid,serialNum,qtyAvailableUpdate);
					}
				} 
				if(type=='inventoryitem')
				{
					var quantity1=ifrec.getLineItemValue('item','quantity',i);
					checkandupdateCustomRecordforInventory(quantity1,itemid,newquantity);

				}
			}
		}
		
		
	}
  }
  catch(e)
  {
     nlapiLogExecution('ERROR', 'ERROR IS', "  DESCRIPTION = " + e); 
  }
}
function checkandupdateCustomRecordforSerial(quantity,itemid,serialNum,qtyAvailableUpdate)
{    var remainingQty = 0;
	var filter=[];
	var FieldsArray=[];
	filter[0]=new nlobjSearchFilter('custrecord_invntry_detail_item', null,'anyOf',itemid); 
	// filter[1]=new nlobjSearchFilter('createdfrom', null,'is',null); 
	var itemSearch =nlapiSearchRecord('customrecord_inventory_report_details',null,filter,null);
	if(itemSearch)
	{
		for(j in itemSearch)
		{
			var tempQty=0;
			var custRecID = itemSearch[j].getId();
		
		    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  custRecID = " + custRecID);   //5327875
			FieldsArray[0] = "custrecord_invntry_detail_qty_avlbl";
	        FieldsArray[1] = "custrecord_invntry_detail_srno";  
			var custRecValues = nlapiLookupField('customrecord_inventory_report_details',custRecID,FieldsArray);
			var serialNo = custRecValues.custrecord_invntry_detail_srno;
		    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialNo = " + serialNo);
			var serialarray= serialNo.split(',');
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray = " + serialarray);
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray length = " + serialarray.length);
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray 0 = " + serialarray[0]);
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialarray 1 = " + serialarray[1]);
			if(serialarray.length > 0)
			{
				for(l in serialarray)
				{
					if(serialNum == serialarray[l])
					{
						var quantityinCR=custRecValues.custrecord_invntry_detail_qty_avlbl;
						nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  quantityinCR = " + quantityinCR);
						serialarray.splice(l,1);
						var newSerialNo = serialarray.toString();
						//var newquantity=Number(quantityinCR)-Number(quantity);
						nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial - after splicing', "  newSerialNo = " + newSerialNo);
						if(remainingQty != 0)
						{
						   tempQty = quantityinCR - remainingQty;
						   qtyAvailableUpdate = tempQty;
						}
						else if(quantityinCR > quantity)
						{
						   tempQty = quantityinCR - quantity;
						   qtyAvailableUpdate = tempQty;
						}
						else if(quantityinCR < quantity)
						{
							tempQty = quantity - quantityinCR;
							qtyAvailableUpdate = 0;
							remainingQty  = tempQty;
						}  
					    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  qtyAvailableUpdate = " + qtyAvailableUpdate);
						if(qtyAvailableUpdate == 0)
						   nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','custrecord_invntry_detail_srno','isinactive'],[qtyAvailableUpdate,newSerialNo,'T']);
					    else
						  nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','custrecord_invntry_detail_srno'],[qtyAvailableUpdate,newSerialNo]);
					}
				}
			}
			
     
		}

	}
}
function checkandupdateCustomRecordforInventory(quantity,itemid,newquantity)
{   
    var remainingQty = 0;
    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  itemid = " + itemid);
	nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  quantity = " + quantity);
	var filter=[];
	filter[0]=new nlobjSearchFilter('custrecord_invntry_detail_item', null,'anyOf',itemid);
	filter[1]=new nlobjSearchFilter('isinactive', null,'is','F');
//	filter[2]=new nlobjSearchFilter('createdfrom', null,'is',null); 
	
	var columns = []; 
	columns[0] = new nlobjSearchColumn('custrecord_invntry_detail_qty_avlbl');
	var itemSearch =nlapiSearchRecord('customrecord_inventory_report_details',null,filter,columns);
	if(itemSearch)
	{
		for(var j =0;j < itemSearch.length ; j++)
		{

			var quantityinCR=itemSearch[j].getValue('custrecord_invntry_detail_qty_avlbl');		
			nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  quantityinCR = " + quantityinCR);
			if(remainingQty != 0)
			{
			   tempQty = Number(quantityinCR) - Number(remainingQty);
			   newquantity = tempQty;
			   nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory - remainingQty is not 0');
			}
			else if(Number(quantityinCR) > (quantity))
			{
			   tempQty = Number(quantityinCR) - Number(quantity);
			   newquantity = tempQty;
			   		    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory - QTYCR > qty');
			}
			else if(Number(quantityinCR) < Number(quantity))
			{
				tempQty = Number(quantity)- Number(quantityinCR);
				newquantity = 0;
				remainingQty  = tempQty;
                nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory - QTYCR < qty');
			}  
    		
		    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  newquantity = " + newquantity);
            if(newquantity == 0)
			   nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','isinactive'],[newquantity,'T']);
			else
		     	nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),'custrecord_invntry_detail_qty_avlbl',newquantity)
		}
	}
}


/*function searchcustomRecord(itemid, quantity, serialNo)
{
    var remainingQty = 0;
    var searchFilters = new Array();
    searchFilters [0] = new nlobjSearchFilter('custrecord_invntry_detail_item', null,'is',itemid);

    var searchResult = nlapiSearchRecord('customrecord_inventory_report_details','customsearch_inv_report_search', searchFilters, null);
 
    for (var i = 0; i < searchResult.length; i++)
    {
        var tempQty=0;
        var qtyAvailableUpdate=0;
        var newQtyAvailableUpdate=0;
	var serialNumber = searchResult[i].getValue('custrecord_invntry_detail_snno');
        nlapiLogExecution('DEBUG', 'Search custom Record', "  serialNumber = " + serialNumber);
	var qtyAvailable = searchResult[i].getValue('custrecord_invntry_detail_qty_avlbl', null, 'sum');
	//var newQtyAvailable= searchResult[i].getValue('custrecord_invntry_detail_newqty_avlbl', null, 'sum');
        if(remainingQty != 0)
        {
           tempQty = qtyAvailable - remainingQty;
           qtyAvailableUpdate = tempQty;
        }
        else if(qtyAvailable > quantity)
        {
           tempQty = qtyAvailable - quantity;
           qtyAvailableUpdate = tempQty;
        }
        else if(qtyAvailable < quantity)
        {
            tempQty = quantity - qtyAvailable;
            qtyAvailableUpdate = 0;
            remainingQty  = tempQty;
        }  

        var serialNumArray=serialNumber.toString().split(',');
	if(serialNumArray.length > 0)
	{
             //if(serialNumArray.includes(serialNo))
             for(l in serialNumArray)
	     {
                 if(serialNo==serialNumArray[l])
                       serialNumArray[l].splice(l,1);
             }
             var newSerialNo = JSON.stringify(serialNumArray);
             nlapiLogExecution('DEBUG', 'Search custom Record', "  newSerialNo = " + newSerialNo);
        }
        nlapiLogExecution('DEBUG', 'Search custom Record', "qtyAvailableUpdate = " + qtyAvailableUpdate);
        nlapiLogExecution('DEBUG', 'Search custom Record', "newQtyAvailableUpdate = " + newQtyAvailableUpdate);
        nlapiSubmitFieldField('customrecord_inventory_report_details',searchResult[i].getId(),['custrecord_invntry_detail_qty_avlbl',custrecord_invntry_detail_newqty_avlbl, 'custrecord_invntry_detail_snno'],[qtyAvailableUpdate, newQtyAvailableUpdate, newSerialNo]);
    
        if(qtyAvailableUpdate == 0 )
               nlapiSubmitFieldField('customrecord_inventory_report_details',searchResult[i].getId(),'isinactive','T');
      }
}
*/
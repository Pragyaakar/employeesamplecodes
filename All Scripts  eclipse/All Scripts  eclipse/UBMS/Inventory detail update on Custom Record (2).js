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
function userEventAfterSubmit(type)
{

	if(type=='create'|| type=='edit')// || type=='edit'
	{
		try
		{
			var itemid;
			var count =1;
			var recordID = nlapiGetRecordId();
			var searchId= 'customsearch_itemfulfill_trans_search';
			nlapiLogExecution('DEBUG', 'aftr submit', "  recordID  ==" + recordID);
			var ifrec=nlapiLoadRecord('itemfulfillment',nlapiGetRecordId());
			nlapiLogExecution('DEBUG', 'aftr submit', "  searchId  ==" + searchId);
			
			nlapiLogExecution('DEBUG', 'aftr submit', "  ifrec  ==" + ifrec);
			var type= nlapiGetRecordType();
	        var type = ' itemfulfillment';
			var ialinecount=ifrec.getLineItemCount('item');
			tranDate = ifrec.getFieldValue('trandate');
	        nlapiLogExecution('DEBUG', 'aftr submit', "  tranDate  ==" + tranDate);
	        var jsonArray=[];
	        
	        var transItemSearch= findTransaction(recordID,searchId);
	
	        if(transItemSearch)
			{
				nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch length  ==" + transItemSearch.length);
				for(var i=0;i<transItemSearch.length;i++)
			    {
					var jsonObj = {
							'item' :  transItemSearch[i].getValue('item',null, 'group'),
							'location' :  transItemSearch[i].getValue('location',null, 'group'),
							'quantity' :  transItemSearch[i].getValue('quantity',null, 'sum'),
							'trandate' :  transItemSearch[i].getValue('trandate',null, 'group'),
						    'validity' :  transItemSearch[i].getValue('custcol_itm_valdty',null, 'group'),
							'serialNumbers' :  transItemSearch[i].getValue('serialnumbers',null, 'group')
					    };
						jsonArray.push(jsonObj);
						
				}
				
			}
			    //var itemArray = [];
			    var sorted_arr= [];
			   
			    for(var l=0;l<jsonArray.length;l++)
			    {
			   
			    	sorted_arr.push(jsonArray[l].item)
			    	
			    }
			    
			    nlapiLogExecution('DEBUG', 'aftr submit', "  sorted_arr  ==" + sorted_arr);
			    nlapiLogExecution('DEBUG', 'aftr submit', "  sorted_arr.length  ==" + sorted_arr.length);
			    var itemArray  = sorted_arr.filter(function(item, pos){
			    	  return sorted_arr.indexOf(item)== pos; 
			    });
			    nlapiLogExecution('DEBUG', 'aftr submit', "  itemArray b4 looping  ==" + itemArray);
			    nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray  ==" + jsonArray.length);
				
				for(var k=0;k<itemArray.length;k++)
				{			
					var tranItemNw = itemArray[k];
				    nlapiLogExecution('DEBUG', 'aftr submit', "  tranItemNw in compare item k ==" + tranItemNw);
				    quantity =0;
				    tempserialNumbers=' ';
					serialNumbers1 = '';
	                allSerialNumbers = '';
			           for(var j = 0 ; j < jsonArray.length ;j++)
					   { 	        	   
			        	  if(jsonArray[j].item == itemArray[k])  // && itemArray[k].item!='undefined'
							{
			        		    itemid = jsonArray[j].item;
							    nlapiLogExecution('DEBUG', 'aftr submit', "  tranItem in compare item ==" + itemid);
								transLocation = jsonArray[j].location;
								//nlapiLogExecution('DEBUG', 'aftr submit', "  transLocation in compare item ==" + transLocation);
								var quantity = jsonArray[j].quantity;
								//nlapiLogExecution('DEBUG', 'aftr submit', "  value of qty ==" + qty);	
							//	quantity =  parseFloat(quantity) + parseFloat(qty);
								nlapiLogExecution('DEBUG', 'aftr submit', "  value of j ==" + j);		
								nlapiLogExecution('DEBUG', 'aftr submit', "  quantity of item ==" + quantity);					
								trandate =  jsonArray[j].trandate;
								validity =  jsonArray[j].validity;
								nlapiLogExecution('DEBUG', 'aftr submit', "  validity in for==" + validity);
								 
			        		  
			        		  
								//	var itemid =ifrec.getLineItemValue('item','item',j);
						        //  	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
									var type =nlapiLookupField('item',tranItemNw,'recordType')
									if(type=='serializedinventoryitem')	
									{

										if(tempserialNumbers == ' ')
										{
											
											var serialNum = jsonArray[j].serialNumbers;
										    nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers when tempserialnum blank  ==" + serialNum.trim());
											if(serialNum.trim() != '- None -')
											{
												nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers when blank ==" + tempserialNumbers);
												tempserialNumbers = serialNum.replace(/(\r\n|\n|\r)/gm,",");//replace(/(\r\n|\n|\r)/gm,"");//   /(\r\n|\n|\r)/gm     /\r?\n|\r/
												nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers when temp serial blank ==" + tempserialNumbers);
												allSerialNumbers = tempserialNumbers;
											}									
											else
											{
												allSerialNumbers = '';
											}
											//searchcustomRecord(itemid, quantity, serialNo);
										}
										var serialNumArray= allSerialNumbers.split(',');
									
										for(var l =0; l< serialNumArray.length ;l++)
										{
										//	nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers when temp serial blank ==" + serialNumArray[l]);
											var quant = parseInt(1);
											checkandupdateCustomRecordforSerial(quant,itemid,serialNumArray[l],qtyAvailableUpdate);
										}
										
									} 
									if(type=='inventoryitem')
									{
										var quantity1=jsonArray[j].quantity;
										checkandupdateCustomRecordforInventory(quantity1,itemid,newquantity);

									} 
						      }
					   }
			     
			       
			}
		}
		catch(e)
		{
			nlapiLogExecution('DEBUG', 'validityDate_CR', "  expression caught = " + e);
		}
		
	}
	
	
	/*
	if(type=='create')// || type=='edit'
	{
	
		
		try
		{
			var ifrec=nlapiLoadRecord('itemfulfillment',nlapiGetRecordId());
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
		}//end of try
		catch(e)
		{
			nlapiLogExecution('DEBUG', 'validityDate_CR', "  expression caught = " + e);
		}
		
	}//end of type check
	
	*/
}
function checkandupdateCustomRecordforSerial(quant,itemid,serialNum,qtyAvailableUpdate)
{    
	var remainingQty = 0;
var filter=[];
var FieldsArray=[];
filter[0]=new nlobjSearchFilter('custrecord_invntry_detail_item', null,'anyOf',itemid); 
filter[1]=new nlobjSearchFilter('isinactive', null,'is','F'); 
var itemSearch =nlapiSearchRecord('customrecord_inventory_report_details',null,filter,null);
if(itemSearch !=null)
{
	for(j in itemSearch)
	{
		var tempQty=0;
		var custRecID = itemSearch[j].getId();
	
	    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  custRecID = " + custRecID);
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
		nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  serialNum = " + serialNum);
		nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  quantity = " + quant);
		if(serialarray.length > 0)
		{
			for(l in serialarray)
			{
				if(serialNum == serialarray[l])
				{
					var quantityinCR=custRecValues.custrecord_invntry_detail_qty_avlbl;
					nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  quantityinCR = " + quantityinCR+" quantity :"+quant);
					serialarray.splice(l,1);
					var newSerialNo = serialarray.toString();
					//var newquantity=Number(quantityinCR)-Number(quantity);
					nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial - after splicing', "  newSerialNo = " + newSerialNo);
					if(remainingQty != 0)
					{
					   tempQty = parseInt(quantityinCR) - parseInt(remainingQty);
					   qtyAvailableUpdate = tempQty;
					}
					else if(parseInt( quantityinCR ) > parseInt( quant))
					{
					   tempQty =parseInt( quantityinCR )-parseInt( quant);
					   qtyAvailableUpdate = tempQty;
					}
					else if(parseInt( quantityinCR ) < parseInt( quant))
					{
						tempQty = parseInt( quant ) - parseInt( quantityinCR );
						qtyAvailableUpdate = 0;
						remainingQty  = tempQty;
					}  
				    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforSerial', "  qtyAvailableUpdate = " + qtyAvailableUpdate);
					if(qtyAvailableUpdate == 0)
					   {
						nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','custrecord_invntry_detail_srno','isinactive'],[qtyAvailableUpdate,newSerialNo,'T']);
					   }
						else
						{	
					      nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','custrecord_invntry_detail_srno'],[qtyAvailableUpdate,newSerialNo]);
						}	
				}
			}
		}
		
 
	}

}
}
function checkandupdateCustomRecordforInventory(quantity,itemid,newquantity)
{   
    var remainingQty = 0;
  nlapiLogExecution('DEBUG', 'validityDate_CR', "  I am in inventry fun of CR = ");
    nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  itemid = " + itemid);
	nlapiLogExecution('DEBUG', 'checkandupdateCustomRecordforInventory', "  quantity = " + quantity);
	var filter=[];
	filter[0]=new nlobjSearchFilter('custrecord_invntry_detail_item', null,'anyOf',itemid);
	filter[1]=new nlobjSearchFilter('isinactive', null,'is','F');
	
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
            {
			 nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),['custrecord_invntry_detail_qty_avlbl','isinactive'],[newquantity,'T']);
            }
			 else
			 {
		     	nlapiSubmitField('customrecord_inventory_report_details',itemSearch[j].getId(),'custrecord_invntry_detail_qty_avlbl',newquantity)
			 }
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


function findTransaction(recordID,searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	var filters=new Array();
	filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',recordID);

	savedSearch.addFilters(filters);
	   
	    var resultset = savedSearch.runSearch();
		var returnSearchResults = [];
	    var searchid = 0;
	    do {
    	
	        var resultslice = resultset.getResults(searchid, searchid + 1000);
	        if(resultslice!= null)
	        {
	    	   for ( var rs in resultslice) 
		        {
		        	returnSearchResults.push(resultslice[rs]);
		            searchid++;
		        }
	    	   nlapiLogExecution('DEBUG','searchid','searchid'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;
}
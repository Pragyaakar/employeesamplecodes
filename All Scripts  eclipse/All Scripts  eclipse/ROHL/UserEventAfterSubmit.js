/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       02 Mar 2019     Priyanka Patil
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
function userAfterSubmitPO(type)
{
  try
  {
	var item;
	var vendor;
	var itemType;
	var itemArray = new Array();
	var number = new Array();
	var lineArray = new Array();
	var qtyArray = new Array();
	var PRqtyArray = new Array();
	var remainArr = new Array();//remainArr
	
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	
    var irObj = nlapiLoadRecord(recordType,recordId);
	nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
  
	var req_id = irObj.getFieldValue('custbody_req_num');
	nlapiLogExecution('DEBUG','Serach Value','lineCount req_id:'+req_id);
	
	var lineCount = irObj.getLineItemCount('item');
	nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
    for(i=1;i<=lineCount;i++)
    {
		nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
			
		var po_chk = irObj.getLineItemValue('item','custcol_po_created',i);
        nlapiLogExecution('DEBUG', 'aftr submit', "po_chk  ==" + po_chk);
        	
        if( po_chk == 'F')
        {
            nlapiLogExecution('DEBUG', 'aftr submit', "po_chk  in if loop==" + po_chk);

        	number.push(po_chk);
        	var itemid =irObj.getLineItemText('item','item',i);
            nlapiLogExecution('DEBUG', 'aftr submit', "itemid  ==" + itemid);
            
            itemArray.push(itemid);
        	nlapiLogExecution('DEBUG', 'aftr submit', "itemArray  ==" + itemArray);
        	
        	var qty =irObj.getLineItemValue('item','quantity',i);
            //nlapiLogExecution('DEBUG', 'aftr submit', "quantity  ==" + qty);
            qtyArray.push(qty);
        	nlapiLogExecution('DEBUG', 'aftr submit', "qtyArray  ==" + qtyArray);
        	
        	var PRqty = irObj.getLineItemValue('item','custcol_pr_quantity',i);
           // nlapiLogExecution('DEBUG', 'aftr submit', "PRqty  ==" + qty);        
            PRqtyArray.push(PRqty);
        	nlapiLogExecution('DEBUG', 'aftr submit', "PRqtyArray  ==" + PRqtyArray);
      
        	if(parseInt(PRqty) > parseInt(qty))
        	{
        		nlapiLogExecution('DEBUG', 'aftr submit', "PRqtyArray  ==" + PRqtyArray +"qtyArray == "+qtyArray);
        		var remain = parseInt(PRqty) - parseInt(qty);
        		remainArr.push(remain);
        		nlapiLogExecution('DEBUG', 'aftr submit', "Remaining Quantity  ==" + remainArr);
        	}	
        	else
        	{
        		nlapiLogExecution('DEBUG', 'aftr submit', "PRqtyArray  ==" + PRqtyArray +"qtyArray == "+qtyArray);
        		var remain = parseInt(PRqty) - parseInt(qty);
        		remainArr.push(remain);
        		nlapiLogExecution('DEBUG', 'aftr submit', "Else Remaining Quantity  ==" + remainArr);

        	}  
        	var line =irObj.getLineItemValue('item','line',i);    
        	nlapiLogExecution('DEBUG', 'aftr submit', "line  ==" + line);
        	lineArray.push(line);
        }//End of for  loop
	 }//End of if linecount	 
    
   
    var obj =nlapiLoadRecord('purchaserequisition',req_id);
	nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + req_id +" Record :"+obj);


    var num = '';
	for (var j=1;j<= lineArray.length ;j++ )
	{ 
		var line_value= obj.getLineItemValue('item','custcol_po_created',j);
		 nlapiLogExecution("DEBUG","In Create Function","check value line_value =="+line_value );
		 
			var requiQty= obj.getLineItemValue('item','quantity',j);
			 nlapiLogExecution("DEBUG","In Create Function","check value requiQty="+requiQty );
			 
		 
		 if(line_value !='T')
		 {
		
		 //	 num = parseInt(requiQty)-parseInt(qtyArray[j-1]);
		 //	 nlapiLogExecution("DEBUG","In Create Function","PR- PO quantity=="+num );
			
			 obj.setLineItemValue('item','quantity',lineArray[j-1],remainArr[j-1]);
			 obj.setLineItemValue('item','custcol_pr_quantity',lineArray[j-1],remainArr[j-1]);
			if(remainArr[j-1] =='0')
			{
	         obj.setLineItemValue('item','custcol_po_created',lineArray[j-1],'T');
			}
		 }
    }
	
	nlapiSubmitRecord(obj,true);
  }
  catch(e)
  {
    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
  }
}


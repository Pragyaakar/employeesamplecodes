/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       03 Apr 2019     Tushar More
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
function userEventAfterSubmitPOvadhera(type)
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
	  
		var req_id = irObj.getFieldValue('custbody_requi_id_on_po');
		nlapiLogExecution('DEBUG','Serach Value','lineCount req_id:'+req_id);
		
		var lineCount = irObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
	    for(i=1;i<=lineCount;i++)
	    {
			nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
				
			var po_Line = irObj.getLineItemValue('item','custcol_pr_linenum_on_po',i);
	        nlapiLogExecution('DEBUG', 'aftr submit', "po_Line  ==" + po_Line);
	        	
	     //   if( po_chk == 'F')
	        {
	            nlapiLogExecution('DEBUG', 'aftr submit', "po_chk  in if loop==" + po_Line);

	        	number.push(po_Line);
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
	       	/*
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
	        	lineArray.push(line); */
	        }//End of for  loop
		 }//End of if linecount	 
	    
	   
	    var obj =nlapiLoadRecord('purchaserequisition',req_id);
		nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + req_id +" Record :"+obj);
     
		var lineCount = irObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);

	    var num = '';
		for (var j=1;j<= number.length ;j++ )
		{ 
			for (var k=1;k<=lineCount ;k++ )
			{ 
			var line_value= obj.getLineItemValue('item','custcol_linenum',k);
			 nlapiLogExecution("DEBUG","In Create Function","check value line_value =="+line_value );
			 
				 var requiQty= obj.getLineItemValue('item','quantity',k);
				// nlapiLogExecution("DEBUG","In Create Function","check value requiQty="+requiQty );
				 
				 nlapiLogExecution("DEBUG","In Create Function","check value number[j-1]="+number[j-1] +':recordId=='+recordId);
			 
			 if(line_value ==number[j-1])
			 {
				 obj.setLineItemValue('item','custcol_vbpl_req_poqty',line_value,qtyArray[j-1]);//qtyArray
			     obj.setLineItemValue('item','linkedorder',line_value,recordId);
				
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

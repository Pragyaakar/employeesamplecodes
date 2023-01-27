/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Mar 2019     Tushar More
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function scheduled(type) 
{
	var item;
	var vendor;
	var itemType;
	var itemArray = new Array();
	var number = new Array();
	var lineArray = new Array();
	var qtyArray = new Array();
	var po_reqIDArray = new Array();
	var remainArr = new Array();//remainArr
	
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	
    var irObj = nlapiLoadRecord(recordType,recordId);
	nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
  
	
	
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
        	nlapiLogExecution('DEBUG', 'aftr submit', "qtyArray  ==" + qtyArray);  //custcol_requi_id
        	
        	var po_reqID =irObj.getLineItemValue('item','custcol_requi_id',i);
        	po_reqIDArray.push(po_reqID);
        	
        	var line =irObj.getLineItemValue('item','line',i);    
        	nlapiLogExecution('DEBUG', 'aftr submit', "line  ==" + line);
        	lineArray.push(line);
        }//End of for  loop
	 }//End of if linecount	 
    
      loadAndSUbmitPOCheck(po_reqIDArray,itemArray,qtyArray,lineArray);
}

function  loadAndSUbmitPOCheck(po_reqIDArray,itemArray,qtyArray,lineArray)
{

	   
		for (var j=1;j<= lineArray.length ;j++ )
		{ 

			  var obj =nlapiLoadRecord('purchaserequisition',po_reqIDArray[j-1]);
				nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + req_id +" Record :"+obj);

		    	var line_value= obj.getLineItemValue('item','custcol_po_created',j);
		    	 nlapiLogExecution("DEBUG","In Create Function","check value line_value =="+line_value );
			 
				var requiQty= obj.getLineItemValue('item','quantity',j);
				 nlapiLogExecution("DEBUG","In Create Function","check value requiQty="+requiQty );
				 
			 
			   if(line_value !='T')
			   {
			
	             obj.setLineItemValue('item','custcol_po_created',lineArray[j-1],'T');
				
			   }
				nlapiSubmitRecord(obj,true);
	       }
		
	
}
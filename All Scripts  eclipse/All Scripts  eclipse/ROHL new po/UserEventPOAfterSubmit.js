/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       29 Mar 2019     Tushar More
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
function userEventAfterSubmitPO(type)
{
  if(type =='edit')
  {
	try
	  {
		var item;
		var vendor;
		var itemType;
		var req_id1;
		var rateArr = new Array();
		var itemArray = new Array();
		var number = new Array();
		var lineArray = new Array();
		var qtyArray = new Array();
		var PRqtyArray = new Array();
		var remainArr = new Array();
		var ReqIdArray = new Array();
		var itemlinenumArray = new Array();//UniqIdArray
		
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var irObj = nlapiLoadRecord(recordType,recordId);
		nlapiLogExecution('DEBUG','Serach Value','Type :='+recordType+'ID :='+recordId);
	  
		var req_id = irObj.getFieldValue('custbody_req_num');
		nlapiLogExecution('DEBUG','Serach Value','lineCount req_id:'+req_id);
		
		var lineCount = irObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
	    for(i=1;i<=lineCount;i++)
	    {
			nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
				
			var po_chk = irObj.getLineItemValue('item','custcol_po_created',i);
	        nlapiLogExecution('DEBUG', 'aftr submit', "po_chk  ==" + po_chk);
	        	
	        if( po_chk != 'T')
	        {
	            nlapiLogExecution('DEBUG', 'aftr submit', "po_chk  in if loop==" + po_chk);

	        	number.push(po_chk);
	        	var itemid =irObj.getLineItemText('item','item',i);
	            //nlapiLogExecution('DEBUG', 'aftr submit', "itemid  ==" + itemid);
	            
	            itemArray.push(itemid);
	        	nlapiLogExecution('DEBUG', 'aftr submit', "itemArray  ==" + itemArray);
	        	
	        	var rate =irObj.getLineItemValue('item','rate',i);
	        	rateArr.push(rate);
	        	
	        	var qty =irObj.getLineItemValue('item','quantity',i);
	            //nlapiLogExecution('DEBUG', 'aftr submit', "quantity  ==" + qty);
	            qtyArray.push(qty);
	        	nlapiLogExecution('DEBUG', 'aftr submit', "qtyArray  ==" + qtyArray);
	        	
	        	var ReqId =irObj.getLineItemValue('item','custcol_requi_id',i);
	        	ReqIdArray.push(ReqId);
	        	
	        	var itemlinenum =irObj.getLineItemValue('item','custcol_item_line_num',i);
	        	itemlinenumArray.push(itemlinenum);
	        	
	        	
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
	    
	  
	    for (var s=0;s<ReqIdArray.length;s++)
	   	{
	    	var fine =ReqIdArray[s];

	    	
	    	nlapiLogExecution('DEBUG', 'aftr submit', "  ReqIdArray[s]  ==" + fine);
	    var obj =nlapiLoadRecord('purchaserequisition',fine);
		nlapiLogExecution('DEBUG', 'aftr submit', "  recObj  ==" + ReqIdArray[s] +" Record :"+obj);

		var count = obj.getLineItemCount('item');
		
		var value ='0';
	    var num = '';
	    for (var k=1;k<=itemlinenumArray.length;k++)
	    {
	    	for (var j=1;j<= count ;j++ )
			{ 
				var line_value= obj.getLineItemValue('item','custcol_po_created',j);
				 nlapiLogExecution("DEBUG","In Create Function","check value line_value =="+line_value );
				 
					var requiQty= obj.getLineItemValue('item','quantity',j);
					 nlapiLogExecution("DEBUG","In Create Function","check value requiQty="+requiQty );
					 
					 var UniqId =obj.getLineItemValue('item','custcol_item_line_num',j);
			        	
	                  
					 nlapiLogExecution("DEBUG","In Create Function","check value FOr po == -UniqId:"+UniqId);
					 
					 nlapiLogExecution("DEBUG","In Create Function","check value FOr po == -itemlinenumArray[k-1]:"+itemlinenumArray[k-1]);
					 var amt = parseInt(remainArr[k-1]) * parseFloat(rateArr[k-1]);
					 
				 if(line_value !='T' && UniqId ==itemlinenumArray[k-1]  )
				 {
					 nlapiLogExecution("DEBUG","In Create Function","COndition TO set--UniqId"+UniqId);
					 
					 nlapiLogExecution("DEBUG","In Create Function","COndition TO set FOr po == -itemlinenumArray[k-1]:"+itemlinenumArray[k-1]);
					 
					 obj.setLineItemValue('item','estimatedamount',j,amt);
					 obj.setLineItemValue('item','quantity',j,remainArr[k-1]);
					 obj.setLineItemValue('item','custcol_pr_quantity',j,remainArr[k-1]);
					 
					if(remainArr[k-1] =='0')
					{
			         obj.setLineItemValue('item','custcol_po_created',j,'T');
					}
				 }
	             
				
				 
				 if(line_value =='T')
				 {
					 value = parseInt(value) + parseInt(1); 
				 }
		    }
			
	    }
		
		
		var check= obj.getFieldValue('custbody_po_created');
		nlapiLogExecution("DEBUG","In Create Function","check value FOr po == -checkr:"+check);
	   
		
		
		nlapiSubmitRecord(obj,true);
	   	}
	  }
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
  }
}
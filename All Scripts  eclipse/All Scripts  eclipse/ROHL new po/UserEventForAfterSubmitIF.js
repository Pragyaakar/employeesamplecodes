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
function userEventAfterSubmitIF(type)
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

		
		var lineCount = irObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
	    for(i=1;i<=lineCount;i++)
	    {
			nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
				
			
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
	        	
	        	var ReqId =irObj.getLineItemValue('item','custcol_pr_id',i);
	        	nlapiLogExecution('DEBUG','Serach Value','lineCount req_id:'+ReqId);
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
	       
		 }//End of if linecount	 
	    
	  
	  
	    var obj =nlapiLoadRecord('purchaserequisition',ReqId);
		nlapiLogExecution('DEBUG', 'aftr submit', "  ReqId  =="+ReqId );

		var count = obj.getLineItemCount('item');
		
		var value ='0';
	    var num = '';
		for (var j=1;j<= count ;j++ )
		{ 
			
				var requiQty= obj.getLineItemValue('item','quantity',j);
				 nlapiLogExecution("DEBUG","In Create Function","check value requiQty="+requiQty );
				 
				 var UniqId =irObj.getLineItemValue('item','custcol_item_line_num',i);
		        	
                  
				
				 
				 nlapiLogExecution("DEBUG","In Create Function","check value FOr po == -itemlinenumArray[j-1]:"+itemlinenumArray[j-1]);
				 var amt = parseInt(remainArr[j-1]) * parseFloat(rateArr[j-1]);
				 
			 
				 
				 nlapiLogExecution("DEBUG","In Create Function","check value FOr po == -itemlinenumArray[j-1]:"+itemlinenumArray[j-1]);
				 
				 obj.setLineItemValue('item','estimatedamount',j,amt);
				 obj.setLineItemValue('item','quantity',j,remainArr[j-1]);
				 obj.setLineItemValue('item','custcol_pr_quantity',j,remainArr[j-1]);
				 
				if(remainArr[j-1] =='0')
				{
		         // obj.setLineItemValue('item','custcol_po_created',j,'T');
				}
			
		}
			 
		
	   
		
		
		nlapiSubmitRecord(obj,true);
	   	
	  }
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
}

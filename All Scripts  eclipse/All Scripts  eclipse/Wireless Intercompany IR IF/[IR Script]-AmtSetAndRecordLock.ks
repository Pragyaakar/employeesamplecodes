/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       28 Aug 2019     ATPL
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
function IRSubmit_totset(type)
{
  try
  {
    
	 var Id = nlapiGetRecordId();
	 var RecType = nlapiGetRecordType();
	 var irobj = nlapiLoadRecord(RecType,Id);
	 
		
		 var lineCount = irobj.getLineItemCount('item');

		 var invItemTot =0.00;
		 var nonInvItemTot=0.00;

		 if(lineCount != null && lineCount != undefined)
		 {
			 for(var j=1 ; j<=lineCount; j++)
		     {
				var ItemType = irobj.getLineItemValue('item','custcol_cls_item_type',j);

				var ItemRate = irobj.getLineItemValue('item','custcol_cls_item_rate',j);
               
                var qty = irobj.getLineItemValue('item','quantity',j);
               
               var amtRate =parseFloat(qty)*parseFloat(ItemRate);

				if(ItemType =='InvtPart' && (amtRate !=null && amtRate !='' && amtRate != undefined))
				{
                     invItemTot+=parseFloat(amtRate);
				}

				if(ItemType =='NonInvtPart' && (amtRate !=null && amtRate !='' && amtRate != undefined))
				{
                     nonInvItemTot+=parseFloat(amtRate);
				}
		     }
		 }
        
        if(invItemTot != null && invItemTot != undefined && invItemTot !='')
        {
          irobj.setFieldValue('custbody_tot_inv_item',parseFloat(invItemTot).toFixed(5)); 
        }
		
       if(nonInvItemTot != null && nonInvItemTot != undefined && nonInvItemTot !='')
        {
		irobj.setFieldValue('custbody_tot_non_inv_item',parseFloat(nonInvItemTot).toFixed(5)); 
        }
    
		nlapiSubmitRecord(irobj,true);
	}

	catch(e)
	{
	    nlapiLogExecution('DEBUG', 'After Submit value of lineId', " Error ==" +e);
	}
}

function BeforeLoadIRlock(type, form, request)
{
//
	
	if(type=='edit'|| type=='xedit')
	{ 
		 
		   
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var irObj = nlapiLoadRecord(recordType,recordId); 
	    var brokAmt =irObj.getFieldValue('landedcostamount1');
         var freightAmt =irObj.getFieldValue('landedcostamount3');

	       if((freightAmt !=null && freightAmt !='')||(brokAmt !=null && brokAmt !=''))
	       {
              throw nlapiCreateError('ERROR',"You are not allowed to Edit the Record ...", false); 
	       }
    }

}
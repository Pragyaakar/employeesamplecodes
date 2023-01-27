 /**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       23 Oct 2019     Tushar
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */


function QtyAdjustMentpostSource(type,name,linenum)
{
	// alert('type ='+type)
	// alert('name ='+name)
	  
  if((type =='inventory' && name =='item'))
  {
	  var AdjQty = nlapiGetCurrentLineItemValue('inventory','adjustqtyby');
	  var QtyAftr  = nlapiGetCurrentLineItemValue('inventory','newquantity');
	  var  QtyBfor = nlapiGetCurrentLineItemValue('inventory','quantityonhand');
			
	   //   alert('AdjQty ='+AdjQty)
	  //	  alert('QtyAftr ='+QtyAftr)
	  //	 alert('QtyBfor ='+QtyBfor)
			
	  if(AdjQty != null && AdjQty != undefined && AdjQty != '')
	  {
			 nlapiSetCurrentLineItemValue('inventory','custcol_adjust_qty',AdjQty);
	  }
    else if(AdjQty == null || AdjQty == undefined || AdjQty == '')
            {
             nlapiSetCurrentLineItemValue('inventory','custcol_adjust_qty','0.00');
            }
	  
	  if(QtyBfor != null && QtyBfor != undefined && QtyBfor != '')
	  {
			 nlapiSetCurrentLineItemValue('inventory','custcol_qty_before',QtyBfor);
	  }	
     else if(QtyBfor == null || QtyBfor == undefined || QtyBfor == '')
            {
             nlapiSetCurrentLineItemValue('inventory','custcol_qty_before','0.00');
            }
		
	  if(QtyAftr != null && QtyAftr != undefined && QtyAftr != '')
	  {
			 nlapiSetCurrentLineItemValue('inventory','custcol_qty_after',QtyAftr);
	  }	
     else if(QtyAftr == null || QtyAftr == undefined || QtyAftr == '')
            {
             nlapiSetCurrentLineItemValue('inventory','custcol_qty_after','0.00');
            }
  }

  
	 return true;
}



function QtyAdjustMentFieldChange(type,name,linenum)
{
	
  
  if(type =='inventory' && name =='adjustqtyby')
  {
      var AdjQty = nlapiGetCurrentLineItemValue('inventory','adjustqtyby');
	  var QtyAftr  = nlapiGetCurrentLineItemValue('inventory','newquantity');
	  var  QtyBfor = nlapiGetCurrentLineItemValue('inventory','quantityonhand');
			
	     // alert('AdjQty ='+AdjQty)
	  	 // alert('QtyAftr ='+QtyAftr)
	  	// alert('QtyBfor ='+QtyBfor)
			
	  if(AdjQty != null && AdjQty != undefined && AdjQty != '')
	  {
			 nlapiSetCurrentLineItemValue('inventory','custcol_adjust_qty',AdjQty);
	  }
    else if(AdjQty == null || AdjQty == undefined || AdjQty == '')
            {
             nlapiSetCurrentLineItemValue('inventory','custcol_adjust_qty','0.00');
            }
	  
	  if(QtyBfor != null && QtyBfor != undefined && QtyBfor != '')
	  {
			 nlapiSetCurrentLineItemValue('inventory','custcol_qty_before',QtyBfor);
	  }	
     else if(QtyBfor == null || QtyBfor == undefined || QtyBfor == '')
            {
             nlapiSetCurrentLineItemValue('inventory','custcol_qty_before','0.00');
            }
		
	  if(QtyAftr != null && QtyAftr != undefined && QtyAftr != '')
	  {
			 nlapiSetCurrentLineItemValue('inventory','custcol_qty_after',QtyAftr);
	  }	
     else if(QtyAftr == null || QtyAftr == undefined || QtyAftr == '')
            {
             nlapiSetCurrentLineItemValue('inventory','custcol_qty_after','0.00');
            }
  }
  
	 return true;
}
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00      23 Jul 2019     Tushar More
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
function userEvntToSetVAT_RATEnVAT_AMT(type)
{
	 try
	  {
		   var itemArray = new Array();
		 	var rateArray = new Array();
		 	var descriptionArray = new Array();
		 	var qtyArray = new Array();
		 	var unitArray = new Array();
		 	var locationArray = new Array();
		 	var line_chkArr=new Array();
		 	var salesArr=new Array();
		 	var custArr=new Array();
		 	var vendArr=new Array();
		 	var amtArr=new Array();
		 	var custNew=new Array();
		 	var typeItemArr =new Array();
	    	var BackOrderQtyArray =new Array();
		
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var recObj = nlapiLoadRecord(recordType,recordId);
		nlapiLogExecution('DEBUG','Serach Value','irObj :'+recObj +'Type :'+recordType+'ID :'+recordId);
		
		
		 var RateApply = recObj.getFieldValue('discountrate');
			nlapiLogExecution('DEBUG', 'aftr submit', "  RateApply  ==" + RateApply);
	 	
	      var PRlinecount=recObj.getLineItemCount('item');
		    nlapiLogExecution('DEBUG', 'aftr submit', "  PRlinecount  ==" + PRlinecount);
		  
		    var VAT_RATE=0;
		    var VAT_AMT =0;
			for(var i=1;i<=PRlinecount;i++)
			{
				
				var itemid =recObj.getLineItemValue('item','item',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  itemid  ==" + itemid);
				
				var unitRate =recObj.getLineItemValue('item','rate',i);
	        	nlapiLogExecution('DEBUG', 'aftr submit', "  unitRate  ==" + unitRate);
	        	
	        	var totalRate =recObj.getLineItemValue('item','amount',i);
	        	nlapiLogExecution('DEBUG', 'aftr submit', "  totalRate  ==" + totalRate);
	        	
	            var Discount=  parseFloat(totalRate)*(parseFloat(RateApply)/100);
		        nlapiLogExecution('DEBUG', 'aftr submit', "  Discount  ==" + Discount);
		        
		        var taxRate =recObj.getLineItemValue('item','taxrate1',i);
            	nlapiLogExecution('DEBUG', 'aftr submit', "  taxRate  ==" + taxRate);
				
	           	
		        if(taxRate !=null && Discount!=null && unitRate!=null && totalRate!=null)
		        {
		        	   if(parseFloat(Discount) > 0)
		        		{
		        		   var chkAmt = parseFloat(totalRate)-parseFloat(Discount);
		        		}
		        	  else if(parseFloat(Discount) < 0)
		        	   {
		        		  var chkAmt = parseFloat(totalRate)+parseFloat(Discount);
		        	   }
		           
		         
		             VAT_RATE = parseFloat(chkAmt) * (parseFloat(taxRate)/100);
		       
		            nlapiLogExecution('DEBUG', 'aftr submit', "  VAT_RATE  ==" + parseFloat(VAT_RATE).toFixed(2));
		           
		            VAT_AMT =  parseFloat(unitRate)+parseFloat(VAT_RATE)-parseFloat(Discount);
		            
		            nlapiLogExecution('DEBUG', 'aftr submit', "  VAT_AMT  ==" + parseFloat(VAT_AMT).toFixed(2));
		            
		            recObj.setLineItemValue('item','custcol_custinv_vat_rate',i,parseFloat(VAT_RATE).toFixed(2));
		            recObj.setLineItemValue('item','custcol_custinv_vat_amount',i,parseFloat(VAT_AMT).toFixed(2));
		        }
		      
		      
	       
			} 
			nlapiSubmitRecord(recObj);
		
	  }
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
}
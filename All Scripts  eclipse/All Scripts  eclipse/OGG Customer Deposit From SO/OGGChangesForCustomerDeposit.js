/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Jan 2020     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function CustomerDepositFromSO(type)
{
	if (type == 'create') 
	{
      try{
        
    	  var BufferPay;
		var neewRec =nlapiGetNewRecord();
		
		var RecType = nlapiGetRecordType();
		var RecID = nlapiGetRecordId();
		
		var loadRec =nlapiLoadRecord(RecType,RecID);
		
		var Customer = loadRec.getFieldValue('entity');

		var SOAmount = loadRec.getFieldValue('total');
		
		var etailChannel = loadRec.getFieldValue('custbody_celigo_etail_channel');
		
		var payMethod = loadRec.getFieldValue('paymentmethod');
		
		var OrderStatus = loadRec.getFieldValue('orderstatus');
      
        var brainTreeId = loadRec.getFieldValue('custbody_braintree_id');
        
        var branch = loadRec.getFieldValue('department');
        
        var MerchandId = loadRec.getFieldValue('custbody_merchant_account_id');
        
        var etailOrderId = loadRec.getFieldValue('custbody_celigo_etail_order_id');
        
        var bgcStore = loadRec.getFieldValue('custbody_celigo_bgc_store');
        
        var brainTreeCharge = loadRec.getFieldValue('custbody_braintree_charged');

		nlapiLogExecution('DEBUG','CustomerDepositFromSO', " := etailChannel:-  "+etailChannel);
		nlapiLogExecution('DEBUG','CustomerDepositFromSO', " := payMethod:-  "+payMethod);
		nlapiLogExecution('DEBUG','CustomerDepositFromSO', " := RecID:-  "+RecID);
		nlapiLogExecution('DEBUG','CustomerDepositFromSO', " := OrderStatus:-  "+OrderStatus);
      nlapiLogExecution('DEBUG','CustomerDepositFromSO', " := brainTreeId:-  "+brainTreeId);
		
       BufferPay = payMethod;

       loadRec.setFieldValue('paymentmethod','');
       
       nlapiSubmitRecord(loadRec);
       
		  if((OrderStatus =='B') && (etailChannel =='1') && (BufferPay =='11' || BufferPay =='10'))
		  {
			  nlapiLogExecution('DEBUG','CustomerDepositFromSO', " :=Inside TO Create CustomerDeposite:- ");
			
				var CustomrDepositrecord = nlapiCreateRecord('customerdeposit');
				

				if(RecID !=null && RecID !='' && RecID !=undefined)
			    {
				CustomrDepositrecord.setFieldValue('salesorder',RecID);
			    }
				
				if(Customer !=null && Customer !='' && Customer !=undefined)
			    {
				CustomrDepositrecord.setFieldValue('customer',Customer);
			    }
				
				if(BufferPay !=null && BufferPay !='' && BufferPay !=undefined)
			    {
				CustomrDepositrecord.setFieldValue('paymentmethod',BufferPay);
			    }
				
				if(SOAmount !=null && SOAmount !='' && SOAmount !=undefined)
			    {
				CustomrDepositrecord.setFieldValue('payment',SOAmount);
			    }
				
				if(brainTreeId !=null && brainTreeId !='' && brainTreeId !=undefined)
			    {
				CustomrDepositrecord.setFieldValue('custbody_braintree_id',brainTreeId);
			    }	
				
				if(brainTreeCharge !=null && brainTreeCharge !='' && brainTreeCharge !=undefined)
			    {
				CustomrDepositrecord.setFieldValue('custbody_braintree_charged',brainTreeCharge);
			    }
				
				if(bgcStore !=null && bgcStore !='' && bgcStore !=undefined)
			    {
				CustomrDepositrecord.setFieldValue('custbody_celigo_bgc_store',bgcStore);
			    }
				
				if(branch !=null && branch !='' && branch !=undefined)
			    {
				CustomrDepositrecord.setFieldValue('department',branch);
			    }
				
				if(etailOrderId !=null && etailOrderId !='' && etailOrderId !=undefined)
			    {
				CustomrDepositrecord.setFieldValue('custbody_celigo_etail_order_id',etailOrderId);
			    }
				
				if(MerchandId !=null && MerchandId !='' && MerchandId !=undefined)
			    {
				   CustomrDepositrecord.setFieldValue('custbody_merchant_account_id',MerchandId);
			    }
			
				var SubmitID = nlapiSubmitRecord(CustomrDepositrecord);
				
				 nlapiLogExecution('DEBUG','CustomerDepositFromSO', " :=CustomerDeposite is:- "+SubmitID);
					
				 
				nlapiSubmitField('salesorder',RecID,'paymentmethod',BufferPay);
		 }
         }
      catch(e){
         nlapiLogExecution('DEBUG','CustomerDepositFromSO', " := ERROR:-  "+e);
      }
	}
 
}
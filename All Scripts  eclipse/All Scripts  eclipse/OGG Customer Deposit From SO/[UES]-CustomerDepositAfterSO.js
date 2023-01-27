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
				

				CustomrDepositrecord.setFieldValue('salesorder',RecID);
				
				 CustomrDepositrecord.setFieldValue('custbody_braintree_id',brainTreeId);
				
				
				CustomrDepositrecord.setFieldValue('paymentmethod',BufferPay);
		
				CustomrDepositrecord.setFieldValue('customer',Customer);
		
				CustomrDepositrecord.setFieldValue('payment',SOAmount);
		
				
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
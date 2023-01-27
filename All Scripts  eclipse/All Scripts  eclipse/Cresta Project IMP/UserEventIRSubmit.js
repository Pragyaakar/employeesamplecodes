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
function userEventAfterSubmitIR(type)
{
	try
	  {
		
		
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		nlapiLogExecution('DEBUG','Serach Value','Type :='+recordType);
		if(recordType == 'itemreceipt')
		{
		    var irObj = nlapiLoadRecord(recordType,recordId);
			nlapiLogExecution('DEBUG','Serach Value','Type :='+recordType+'ID :='+recordId);

			var createFrom = irObj.getFieldValue('createdfrom');
			nlapiLogExecution('DEBUG','Serach Value','createFrom :='+createFrom);
		
			var createFromTxt = irObj.getFieldText('createdfrom');
			nlapiLogExecution('DEBUG','Serach Value','createFromTxt :='+createFromTxt);
			
			nlapiLogExecution('DEBUG','Serach Value','createFromTxt.substr(0,14):='+createFromTxt.substr(0,14));
			
			 if(createFromTxt.substr(0,14) == 'Purchase Order')   
		     {
				 var obj =nlapiLoadRecord('purchaseorder',createFrom);
				 var status  = obj.getFieldValue('status');
				 nlapiLogExecution('DEBUG', 'obj aftr submit', "  status  =="+status );
				 
				 
					   if(status=='Pending Bill' || status=='Pending Receipt' || status=='Partially Received' || status=='Approved by Supervisor/Pending Bill' || status=='Pending Billing/Partially Received')
				    	{
						   obj.setFieldValue('custbody_po_status',1);
				    	}
				    	else if(status=='Fully Billed' || status=='Closed' )
				    	{
				    		obj.setFieldValue('custbody_po_status',2);
				    	}
				    	else  if(status=='Pending Approval' || status=='Rejected')
				    	{
				    		obj.setFieldValue('custbody_po_status',3);
				    	}
				    	else  
				    	{
				    		obj.setFieldValue('custbody_po_status',3);
				    	}
						
					   nlapiSubmitRecord(obj,true);
				 
		     }
		}
		if(recordType == 'purchaseorder')
		{
			 var obj = nlapiLoadRecord(recordType,recordId);
			// var obj =nlapiLoadRecord('purchaseorder',createFrom);
			 var status  = obj.getFieldValue('status');
			 nlapiLogExecution('DEBUG', 'obj aftr submit', "  status  =="+status );
			 
				nlapiLogExecution('DEBUG','Serach Value','Type :='+recordType+'ID :='+recordId);
				
				  if(status=='Pending Bill' || status=='Pending Receipt' || status =='Approved by Supervisor/Pending Receipt'|| status=='Partially Received' || status=='Approved by Supervisor/Pending Bill' || status=='Pending Billing/Partially Received')
			    	{
					   obj.setFieldValue('custbody_po_status',1);
			    	}
			    	else if(status=='Fully Billed' || status=='Closed' )
			    	{
			    		obj.setFieldValue('custbody_po_status',2);
			    	}
			    	else  if(status=='Pending Approval' || status=='Rejected')
			    	{
			    		obj.setFieldValue('custbody_po_status',3);
			    	}
			    	else  
			    	{
			    		obj.setFieldValue('custbody_po_status',3);
			    	}
					
				   nlapiSubmitRecord(obj,true);

		}
		else if(recordType == 'vendorbill')
		{
			  var irObj = nlapiLoadRecord(recordType,recordId);
				nlapiLogExecution('DEBUG','Serach Value','Type :='+recordType+'ID :='+recordId);

			var vendorbillSearch = nlapiSearchRecord("vendorbill","customsearch_po_status_update_from_bill",
					[
					   ["type","anyof","VendBill"], 
					   "AND", 
					   ["mainline","is","T"], 
					   "AND", 
					   ["internalid","anyof",recordId]
					], 
					[
					   new nlobjSearchColumn("internalid"), 
					   new nlobjSearchColumn("createdfrom"), 
					   new nlobjSearchColumn("tranid"), 
					   new nlobjSearchColumn("internalid","createdFrom",null), 
					   new nlobjSearchColumn("statusref","createdFrom",null)
					]
					);
			if(vendorbillSearch != null)
			{
				for(var len=0 ;len < vendorbillSearch.length ;len++)
				{
					var createFromBill =vendorbillSearch[len].getValue("createdfrom");
					var createFromBillTxt =vendorbillSearch[len].getText("createdfrom");
					var poID =vendorbillSearch[len].getValue("statusref","createdFrom",null);
					
					if(createFromBill != null && createFromBill != '' && createFromBill != undefined)
						{
   						 if(createFromBillTxt.substr(0,14) == 'Purchase Order')   
							{

								 var obj =nlapiLoadRecord('purchaseorder',createFromBill);
								 
								 nlapiLogExecution('DEBUG', 'obj aftr submit', "  createFromBill  =="+createFromBill );
								 
								 var status  = obj.getFieldValue('status');
								 nlapiLogExecution('DEBUG', 'obj aftr submit', " createFromBill status  =="+status );
								 
								 
									   if(status=='Pending Bill' || status=='Pending Receipt' || status=='Partially Received' || status=='Approved by Supervisor/Pending Bill' || status=='Pending Billing/Partially Received')
								    	{
										   obj.setFieldValue('custbody_po_status',1);
								    	}
								    	else if(status=='Fully Billed' || status=='Closed' )
								    	{
								    		obj.setFieldValue('custbody_po_status',2);
								    	}
								    	else  if(status=='Pending Approval' || status=='Rejected')
								    	{
								    		obj.setFieldValue('custbody_po_status',3);
								    	}
								    	else  
								    	{
								    		obj.setFieldValue('custbody_po_status',3);
								    	}
										
									   nlapiSubmitRecord(obj,true);
								 
						     
							}
						}
					
				}
			}
		}
	

	  }
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
}

/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00      9 Jan 2020       TM
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
function afterSubmitIFtoInvoiceCreation(type)
{
	 try
	  {
		if(type == 'create' || type == 'edit') 
		{ 		
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		
	    var recObj = nlapiLoadRecord(recordType,recordId);
		//nlapiLogExecution('DEBUG','Serach Value','irObj :'+recObj +'Type :'+recordType+'ID :'+recordId);
		
		var customer = recObj.getFieldValue('entity');
		
		var ifDocNo = recObj.getFieldValue('tranid');
		//nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " customer " + customer);
		
		var date1 = new Date(date);
	    //date1.setDate(date1.getDate()-1);
      
		var dateformat = date1.getDate() + '/' + (date1.getMonth()+1) + '/' + date1.getFullYear();
        //nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " dateformat " + dateformat);
		
	    var createdFrom = recObj.getFieldValue('createdfrom');
		//nlapiLogExecution('DEBUG', 'B2CStock afterSubmitRecord check', " createdFrom " + createdFrom);
		
			
		var status = recObj.getFieldValue('shipstatus');
		//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " status " + status);
       
      
       
		var date = recObj.getFieldValue('trandate');
		//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " date " + date);
		
		if(status === 'C')
    	{
			if(createdFrom !=null && createdFrom != undefined && createdFrom !='')
			{
				var itemArr =[];
				var qtyArr =[];
				var rateArr =[];
				var locArr =[];
				var SoLoad = nlapiLoadRecord('salesorder',createdFrom);
				var custEntiy = SoLoad.getFieldValue('entity');

				   nlapiLogExecution('DEBUG','Search Value','custEntiy :'+custEntiy);
				   
				  var customerRecord = nlapiLoadRecord('customer',custEntiy);
				  
				  var CustomerName = customerRecord.getFieldValue('firstname');
					
				   nlapiLogExecution('DEBUG','Search Value','CustomerName :'+CustomerName);
				   
				var paymentmethod =SoLoad.getFieldValue('paymentmethod');
				nlapiLogExecution('DEBUG','Search Value','paymentmethod :'+paymentmethod);
				
				var bodyLoc = SoLoad.getFieldValue('location');
				
				var bodyDepartment = SoLoad.getFieldValue('department'); 
				
				var emailRecipient = SoLoad.getFieldValue('email'); //email
				nlapiLogExecution('DEBUG','Search Value','emailRecipient :'+emailRecipient);
				
				
				var ShippMethod = SoLoad.getFieldValue('shipmethod'); //email
				nlapiLogExecution('DEBUG','Search Value','ShippMethod :'+ShippMethod);
				
				var ShippCost = SoLoad.getFieldValue('shippingcost'); //email
				nlapiLogExecution('DEBUG','Search Value','ShippCost :'+ShippCost);
				
				var ShippAddress = SoLoad.getFieldValue('shipaddress'); //email
				nlapiLogExecution('DEBUG','Search Value','ShippAddress :'+ShippAddress);
				
				
				var lineCount = SoLoad.getLineItemCount('item');
				nlapiLogExecution('DEBUG','Search Value','lineCount :'+lineCount);
				   
				for(i=1;i<=lineCount;i++)
			    {
					var fulfilled =SoLoad.getLineItemValue('item','quantityfulfilled',i);
					
					var invoiced =SoLoad.getLineItemValue('item','quantitybilled',i);
					
					nlapiLogExecution('DEBUG','Search Value','fulfilled :'+fulfilled+' invoiced :'+invoiced);
					
					if((fulfilled !=null && fulfilled !='' && fulfilled > 0) && (invoiced == 0))
					{
						var itemid = SoLoad.getLineItemValue('item','item',i);
		            	itemArr.push(itemid);
						
					    var quantity = SoLoad.getLineItemValue('item','quantity',i);
			        	qtyArr.push(quantity);
			        	
			        	var rate = SoLoad.getLineItemValue('item','rate',i);
				        rateArr.push(rate);
				        
				        var loc = SoLoad.getLineItemValue('item','location',i);
				        locArr.push(loc);
					}
				}//End of if linecount	 
				
				nlapiLogExecution('DEBUG', 'aftr submit', "  itemArr  ==" + itemArr);
				nlapiLogExecution('DEBUG', 'aftr submit', "  qtyArr  ==" + qtyArr);
				nlapiLogExecution('DEBUG', 'aftr submit', "  rateArr  ==" + rateArr);
				
				
				var TrackNoArr =[];
				var lineCount1 = recObj.getLineItemCount('package');
				nlapiLogExecution('DEBUG','Search Value',' Track no lineCount1 :'+lineCount1);
				   
				for(i1=1;i1<=lineCount1;i1++)
			    {
					var tracNo =recObj.getLineItemValue('package','packagetrackingnumber',i1);
					
					 if(tracNo != '' && tracNo != 'undefined' && tracNo != null)
		                {
					      TrackNoArr.push(tracNo);
		                }
			    }
				nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " TrackNoArr " + TrackNoArr);
				
				
				var invVal = recObj.getFieldValue('custbody_linked_transaction'); 
				
				if((paymentmethod != null && paymentmethod !='' && paymentmethod != undefined) &&(paymentmethod == 5))//
				{
					var linksCount = SoLoad.getLineItemCount('links');
					nlapiLogExecution('DEBUG','Search Value','linksCount :'+linksCount);
					   
					for(j=1;j<=linksCount;j++)
				    {
						var cashSaletype =recObj.getLineItemValue('links','type',j);

                        if(cashSaletype =='Cash Sale')
                        {
                        	var cashSaleid =recObj.getLineItemValue('links','id',j);
                        }
				    }
					
					nlapiLogExecution('DEBUG','Search Value','cashSaleid :'+cashSaleid);
					
				   if(cashSaleid !=null && cashSaleid !=undefined)
				   {
						var loadCash = nlapiLoadRecord('cashsale',cashSaleid);
                     if(TrackNoArr != '' && TrackNoArr != 'undefined' && TrackNoArr != null)
	                {
						loadCash.setFieldValue('custbody_if_track_numbers',TrackNoArr);
                    }
						nlapiLogExecution('DEBUG','Setting Tracking No on Cash Sale','TrackNoArr :'+TrackNoArr);
					if(recordId != '' && recordId != 'undefined' && recordId != null)
	                {
		
	                        nlapiLogExecution("DEBUG","In Create Function","**To Set IF internal ID**");
		                     loadCash.setFieldValue('custbody_linked_transaction',recordId);
                  	}	
                     
						var invoiceID =nlapiSubmitRecord(loadCash,true);  
				   }
				}
				else
				{
				    var invoiceID = createInvoiceFunction(customer,recordId,ifDocNo,date,itemArr,qtyArr,rateArr,TrackNoArr,locArr,bodyLoc,createdFrom,invVal,ShippMethod,ShippCost,ShippAddress);
				}
				 // nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " invoiceID " + invoiceID);
			}
			
          if(type == 'edit'){
           // var invoiceID =recObj.getFieldValue('custbody_linked_transaction');
          }
			// 
			
		   recObj.setFieldValue('custbody_linked_transaction',invoiceID);
		  //recObj.setFieldValue('custbody_inv_track_no',TrackNoArr);
		  }
		
		 var file = nlapiPrintRecord('TRANSACTION',invoiceID, 'PDF', null); //internal id of transaction (e.g IInvoice)
		// Send email
		 
		// var recipientLook = nlapiLookupField('invoice',invoiceID,'email');
		 
		 if((emailRecipient !=null && emailRecipient !='' && emailRecipient!=undefined) && (TrackNoArr !=null && TrackNoArr !='' && TrackNoArr !=undefined))
		 {
			 var deptmLoad = nlapiLoadRecord('department',bodyDepartment);
			 
			 var Logo =deptmLoad.getFieldValue('custrecord_branch_logo');
			 var Name =deptmLoad.getFieldValue('name');
			 
	         var sender = deptmLoad.getFieldValue('custrecord_from_email_addr'); // nlapiGetUser();
	         
             var recipient = emailRecipient;   //simon.ede@oggsolutions.com,emailRecipient
	        
             var subject = "Brandnet Invoice Email";
	         
	         if(CustomerName !=null && CustomerName !=undefined && CustomerName !='')
	     	  {
	        	 CustomerName=CustomerName;
	     	  }
	         else{
	        	 CustomerName ='';
	         }
	         
	         if(Name !=null && Name !=undefined && Name !='')
	    	  {
	        	 Name=Name;
	    	  }
	        else{
	        	Name ='';
	        }
	         
	         var trckingNoLink ='https://auspost.com.au/mypost/track/#/';
	         var body ="<!DOCTYPE html><html><body><img src='"+Logo+"' width='180' height='120'><br>"+" Dear "+CustomerName+", <br><br>"+"Your order has been processed and is on its way to you. <br><br> Please track the progress of your order here "+trckingNoLink+".<br><br>Tracking # "+TrackNoArr+" <br><br>Thank you for shopping with "+Name+".<br><br><br> Best Regards,<br>"+Name+" Team.<br></body></html>";
	         var records=[];
	         records['transaction'] = invoiceID;
	       	var checkEmail=nlapiSendEmail(sender, recipient, subject, body, null, null,records, file);
	      	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " checkEmail " + checkEmail);
		 }
		
      	var IfSubmitID =nlapiSubmitRecord(recObj,true);  
	  }
	} 
	    
			

	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e);
	  }
}


function createInvoiceFunction(customer,recordId,ifDocNo,date,itemArr,qtyArr,rateArr,TrackNoArr,locArr,bodyLoc,createdFrom,invVal,ShippMethod,ShippCost,ShippAddress)
{

	nlapiLogExecution("DEBUG","In Create Function","In Create Invoice fun call");
	
	var record = nlapiTransformRecord('salesorder',createdFrom,'invoice');
	
	if(customer != '' && customer != 'undefined' && customer != null)
	{
		// To Set vendor Name
	   nlapiLogExecution("DEBUG","In Create Function","**To Set Customer Name**");
		record.setFieldValue('entity',customer);//customer
	}
	
	if(bodyLoc != '' && bodyLoc != 'undefined' && bodyLoc != null)
	{
		record.setFieldValue('location',bodyLoc);//location
	}

	if(recordId != '' && recordId != 'undefined' && recordId != null)
	{
		// To Set vendor Name
	   nlapiLogExecution("DEBUG","In Create Function","**To Set IF internal ID**");
		record.setFieldValue('custbody_linked_transaction',recordId);
	}

	if(TrackNoArr !=null && TrackNoArr != '' && TrackNoArr != undefined )
	{
	 	record.setFieldValue('custbody_if_track_numbers',TrackNoArr);
	}
	

	if(date != '' && date != 'undefined' && date != null)
	{
		record.setFieldValue('trandate',date);
	}
	
	if(ShippMethod != '' && ShippMethod != 'undefined' && ShippMethod != null)
	{
		record.setFieldValue('shipmethod',ShippMethod);
	}
	
	if(ShippCost != '' && ShippCost != 'undefined' && ShippCost != null)
	{
		record.setFieldValue('shippingcost',ShippCost);
	}

	if(ShippAddress != '' && ShippAddress != 'undefined' && ShippAddress != null)
	{
		record.setFieldValue('shipaddress',ShippAddress);
	}

	
  var lineCount = record.getLineItemCount('item');
  
	if(lineCount!= null)
	{
			for(var h=lineCount;h>=1;h--)
			{
				item = record.getLineItemValue('item','item',h);
				nlapiLogExecution('DEBUG', 'After Submit item', "  item==" + item);
				
				var ValueIs = inArray(item,itemArr);
				
				if(ValueIs == false)
				{
					//invObj.selectLineItem('item',h);
					record.removeLineItem('item',h);
				}
			}
		
	}
	
 
   var finInvoice =nlapiSubmitRecord(record,false,false)
   
   nlapiLogExecution("DEBUG","In Create Function","Invoice Record Submit done=="+finInvoice);
   
   
  return finInvoice;
}

function inArray(item,itemArr)
{
    var count=itemArr.length;
    for(var i=0;i<count;i++)
    {
        if(itemArr[i]===item){return true;}
    }
    return false;
}
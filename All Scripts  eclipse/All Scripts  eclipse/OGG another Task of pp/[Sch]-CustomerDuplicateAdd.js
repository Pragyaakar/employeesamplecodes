function customerAddressDuplicacyChk(type)
{
	var searchId = 'customsearch_remove_address_search';
	resultSet = findCustomerAddress(null,searchId,null);
	
	if(resultSet != null && resultSet != '' && resultSet != undefined)
	{
		var context = nlapiGetContext();
		
		 var PinCounter = '';
		 PinCounter = context.getSetting('SCRIPT', 'custscript_pincounter');
			
			if (PinCounter != null && PinCounter != '' && PinCounter != 'undefined') 
			{
				PinCounter =PinCounter;
			}
			else 
			{
				PinCounter =0;
			}
			
		for(var i=PinCounter ; i<resultSet.length; i++ ) //resultSet.length
		{
			var id = resultSet[i].getValue('internalid');
			var custID = resultSet[i].getValue('custrecord_customer_internal_id');
			var custAddID = resultSet[i].getValue('custrecord_address_internal_id');
			var removeCutAdd = resultSet[i].getValue('custrecord_address_removed');
			
		    if(custID != null && custID != '' && custID != undefined)
		    {
		    	var loadCust = nlapiLoadRecord('customer',custID);
		    	
		    	var numberOfAddress = loadCust.getLineItemCount('addressbook');
				var addressID;
			
				for (var x = 1; x <= numberOfAddress; x++)
				{
				    addressID = loadCust.getLineItemValue('addressbook','internalid',x);
				    nlapiLogExecution('DEBUG','Update Status','addressID = ' + addressID);	
				    
				    if(custAddID == addressID)
				    {
				    	nlapiLogExecution('DEBUG','Update Status','custAddID =  '  +  custAddID  + ' addressID  = ' + addressID);
				    	loadCust.removeLineItem('addressbook',x);
				    }
				 }
				nlapiSubmitRecord(loadCust,true);
		    }
		    nlapiSubmitField('customrecord_customer_duplicate_address',id,'custrecord_address_removed','T');
		
		
		    UsageEnd = context.getRemainingUsage();
			
			 nlapiLogExecution('DEBUG', 'schedulerFunction', 'Usage At End [' + i + '] -->' + UsageEnd);
			
			  if (UsageEnd < 900) 
				{
					Schedulescriptafterusageexceeded(i);
					break;
				}
		}
	}
}

function findCustomerAddress(recType, searchId, filters)
{
    var aSearchResults = [];
    var iRscnt = 1000, min = 0, max = 1000;
    var search = {};
    if (searchId) 
    {
        var search = nlapiLoadSearch(recType, searchId);
        if (filters) 
        {
            search.addFilters(filters);
        }
    }
    

    var rs = search.runSearch();
    try 
    {
        while (iRscnt == 1000) 
        {
            var resultSet = rs.getResults(min, max);
            aSearchResults = aSearchResults.concat(resultSet);
            min = max;
            max += 1000;
            iRscnt = resultSet.length;
        }
    }
    catch (e) 
    {
        nlapiLogExecution('DEBUG', 'getAllResults --> exception', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    }

 //   nlapiLogExecution('DEBUG', 'getAllResults --> Success', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    return aSearchResults;
}

function Schedulescriptafterusageexceeded(i)
{
	//Define all parameters to schedule the script for voucher generation.
	 var params=new Array();
	 // params['status']='scheduled';
 	 // params['runasadmin']='T';
	 params['custscript_pincounter']=i;
	 
	 var startDate = new Date();
 	// params['startdate']=startDate.toUTCString();
	
	 var status=nlapiScheduleScript(nlapiGetContext().getScriptId(), nlapiGetContext().getDeploymentId(),params);
	 nlapiLogExecution('DEBUG','After Scheduling','Script Scheduled Status-->'+ status);
	 
	 //If Script Is Scheduled Successfuly Then Check for Status = Queued
	 if (status == 'QUEUED') 
 	 {
		nlapiLogExecution('DEBUG', 'RESCHEDULED', '******************** Script Is Rescheduled For Record ************'+i);
 	 }
}//fun close
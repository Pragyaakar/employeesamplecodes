// BEGIN SCHEDULED FUNCTION =============================================

function sch_transDelete(type)
{
   
			var context = nlapiGetContext();
			 var PinCounter = '';
			 PinCounter = context.getSetting('SCRIPT', 'custscript_pin_counter');
				
				if (PinCounter != null && PinCounter != '' && PinCounter != 'undefined') 
				{
					PinCounter =PinCounter;
				}
				else 
				{
					PinCounter =0;
				}
				
			var filters = new Array();
		   
			var column= new Array();

		    column[0]= new nlobjSearchColumn("internalid",null,"GROUP")
		    column[1]= new nlobjSearchColumn("type",null,"GROUP")
		    column[2]= new nlobjSearchColumn("recordtype",null,"GROUP")

		    
            var results = getSavedSearchResult(null, 'customsearch_todays_transaction', null);
		    if(results!=null)
		    {
			    for(var j=0;j<results.length;j++)
			   // for(var j=0;j<12;j++)
		    	{
			        itemid=results[j].getValue("internalid",null,"GROUP")
			    	nlapiLogExecution('DEBUG', 'transaction', 'itemid 1= '+itemid);
			    	var  type=results[j].getValue("type",null,"GROUP")
			    	nlapiLogExecution('DEBUG', 'transaction', 'type1 = '+type);

			    	var  baserecordtype=results[j].getValue("recordtype",null,"GROUP")
			    	nlapiLogExecution('DEBUG', 'transaction', 'baserecordtype1 = '+baserecordtype);

			    	//var itemRec=nlapiLoadRecord('item',itemid)
				    try
				    {
				      var id = nlapiDeleteRecord(baserecordtype, itemid);
				       //var id = nlapiDeleteRecord('opportunity', itemid);

		              nlapiLogExecution('DEBUG', 'transaction', 'Deleted id  = '+id );
				    }
				    catch (e )
				    {
				    	//nlapiLogExecution('DEBUG', 'transaction', 'e.getCode()  = '+e.getCode() );
				    	if (e instanceof nlobjError)
				    	{

				    		//nlapiLogExecution('DEBUG', 'transaction', 'e.getCode()  = '+e.getCode() );
				    		if(e.getCode()=='That record does not exist')
				    		{
				    			//j++
				    		}
				    	}
				    }
					
					 UsageEnd = context.getRemainingUsage();
					
				 nlapiLogExecution('DEBUG', 'schedulerFunction', 'Usage At End [' + j + '] -->' + UsageEnd);
				
				  if (UsageEnd < 500) 
					{
						Schedulescriptafterusageexceeded(j);
						break;
					}
				
		       }
			   
			 
			   
			   
		   }


}

// END SCHEDULED FUNCTION ===============================================



function getSavedSearchResult(recType, searchId, filters)
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


// BEGIN FUNCTION ===================================================
{
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


}
// END FUNCTION =====================================================
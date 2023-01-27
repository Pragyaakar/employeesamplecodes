/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Sep 2019     Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */

var currntDate = new Date();
var Month = currntDate.getMonth();
Month = Month+1;
var Year = currntDate.getFullYear();
var day = currntDate.getDay();
var time = currntDate.getHours() + ":" + currntDate.getMinutes();

function invoiceIssueResolve(type) {
	
	try
	{
		var searchId='customsearch3002';
      var filters =[];
     // filters[0]=new nlobjSearchFilter('custrecord_sv_pgd_productgrp_itm', null,'anyof',"107");
       filters[0]=new nlobjSearchFilter('custrecord_sv_quantity', null,'equalto',"10");
		resultSet = getSavedSearchResult(null, searchId, filters);
		
				if(resultSet!='' && resultSet!= null && resultSet !='undefined')
				{
					
					 var context = nlapiGetContext();
					 var PinCounter = '';
					 PinCounter = context.getSetting('SCRIPT', 'custscript_pincounter1');
						
						if (PinCounter != null && PinCounter != '' && PinCounter != 'undefined') 
						{
							PinCounter =PinCounter;
						}
						else 
						{
							PinCounter =0;
						}
					nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
					for(var i=PinCounter;i<resultSet.length;i++)//resultSet.length
						{
							var columns = resultSet[i].getAllColumns();
							
							recId = resultSet[i].getValue(columns[10]);
														
							var loadSo = nlapiLoadRecord('customrecord_sv_supplier_qty_break',recId);
							
							var DATA =nlapiSubmitRecord(loadSo,true);
							//nlapiLogExecution('DEBUG','searchid','DATA=='+i);
							//nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);
							 var UsageEnd = context.getRemainingUsage();
								
								 nlapiLogExecution('DEBUG', 'schedulerFunction', 'Usage At End [' + i + '] -->' + UsageEnd);
								
								  if (UsageEnd < 1000) 
									{
										Schedulescriptafterusageexceeded(i);
										break;
									}
			
						}
				}
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','searchid','Error=='+e);
	}
}

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

function Schedulescriptafterusageexceeded(i)
{
	//Define all parameters to schedule the script for voucher generation.
	 var params=new Array();
	 // params['status']='scheduled';
 	 // params['runasadmin']='T';
	 params['custscript_pincounter1']=i;
	 
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
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 July 2020    Tushar
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */

var UpdateMap={};
function CR_for_IRcreate(type)
{
	 try{
	
	var recId;
	var itemArr;
	var qtyArr;
	var locArr;
	var serialNumArr=[];
	var searchId='customsearch_main_serial_num_rec';
	
	 recId = nlapiGetContext().getSetting('SCRIPT','custscript_ir_save_rec_id');
	 
	  nlapiLogExecution("DEBUG","Rec Available","recId ="+recId);
	  
	 exeType = nlapiGetContext().getSetting('SCRIPT','custscript_type');
	  nlapiLogExecution("DEBUG","Rec Available","exeType="+exeType);
	  
	  
    var resultRec = findTransaction(searchId,recId);
   // nlapiLogExecution("DEBUG","Rec Available","resultRec Check b4 ="+resultRec);
	 if((resultRec !=null && resultRec != undefined && resultRec !='')||( resultRec !=null && resultRec != undefined && resultRec !='' && exeType =='delete'))
	 {
		 nlapiLogExecution("DEBUG","Rec Available","resultRec.length ="+resultRec.length);
		 for(var i=0;i<resultRec.length;i++)
		 {
			var delId = resultRec[i].getValue('internalid');
			
			// nlapiLogExecution("DEBUG","Rec Available","deletedId=="+delId);
		   nlapiDeleteRecord('customrecord_intercompany', delId);
		   
		   var context = nlapiGetContext();
			var UsageEnd = context.getRemainingUsage();
			
			    if (UsageEnd < 600) 
				{
				  nlapiYieldScript();
				}
		 }
		 nlapiLogExecution("DEBUG","Rec Available","UsageEnd"+UsageEnd);
	 }
	
	 if(exeType !='delete')
	 {
		 var loadRec = nlapiLoadRecord('itemreceipt',recId);
		 
		 var linecount = loadRec.getLineItemCount('item');
		 
		 var creatFrom =loadRec.getFieldValue('createdfrom');
		 
		 var JsonArr =[];
		 
		for (var m1=1;m1<=linecount;m1++)
		{
			
			var item = loadRec.getLineItemValue('item','item',m1);
			var location = loadRec.getLineItemValue('item','location',m1);
			var sr_list = loadRec.getLineItemValue('item','serialnumbers',m1);
			
			var serialNum = String(sr_list).split(/\s+/);
			//var serialNum = (res.toString()).replace("", ",");
			createCustomRecord(item,location,creatFrom,serialNum,recId);
		}
		//nlapiLogExecution("DEBUG","Rec Available","serialNum->"+typeof(serialNum));
		//nlapiLogExecution("DEBUG","Rec Available","serialNum->"+serialNum);
		//nlapiLogExecution("DEBUG","Rec Available","serialNum.length"+serialNum.length);
		
	 }
	 
}
catch(e)
{
	nlapiLogExecution("DEBUG","In Create Function","ERROR ="+e);
}

}


function createCustomRecord(item,location,creatFrom,serialNum,recId)
{
	
	if(serialNum != null && serialNum != undefined)
	{
		var serialNumCheck = serialNum.toString().split(',');
		
		for(var j=0;j<serialNumCheck.length;j++)
		{
			var recObj = nlapiCreateRecord('customrecord_intercompany',{recordmode: 'dynamic'});	
			recObj.setFieldValue('custrecord_itercomp_item',item);
			recObj.setFieldValue('custrecord_itercomp_loc',location);
			recObj.setFieldValue('custrecord_itercomp_srno',serialNumCheck[j].toString());
			recObj.setFieldValue('custrecord_itercomp_ref',creatFrom);
			recObj.setFieldValue('custrecord_createdby_recid_ir',recId);
			var submitID = nlapiSubmitRecord(recObj,true,false);
			nlapiLogExecution('DEBUG','createCustomRecord','CustomRecID = ' + submitID);
			
			    var context = nlapiGetContext();
				var UsageEnd = context.getRemainingUsage();
				
				    if (UsageEnd < 600) 
					{
					  nlapiYieldScript();
					}
		}
	}
	
}



function findTransaction(searchId,irID)
{
	
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_createdby_recid_ir', null,'anyOf',irID);
	
	 var recType= null;
	 
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
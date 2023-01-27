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
function SCH_IF_serial_manualUpdate(type)
{
	 try{
	
	var recId;
	var itemArr;
	var qtyArr;
	var locArr;
	var serialNumArr=[];
	var searchId='customsearch_main_serial_num_rec';
	
	 recId = nlapiGetContext().getSetting('SCRIPT','custscript_if_rec_id');

	 exeType = nlapiGetContext().getSetting('SCRIPT','custscript_type1');
	  nlapiLogExecution("DEBUG","Rec Available","exeType="+exeType);
	  
	  
   var resultRec = findTransaction1(searchId,recId);
   nlapiLogExecution("DEBUG","Rec Available","recId="+recId);
	  
   nlapiLogExecution("DEBUG","Rec Available","resultRec Check b4 ="+resultRec);
	 if((resultRec !=null && resultRec != undefined && resultRec !='' && exeType !='delete')||( resultRec !=null && resultRec != undefined && resultRec !='' && exeType =='delete'))
	 {
		 nlapiLogExecution("DEBUG","Rec Available","resultRec.length ="+resultRec.length);
		 for(var i=0;i<resultRec.length;i++)
		 {
			var delId = resultRec[i].getValue('internalid');
			var serialVl = resultRec[i].getValue('custrecord_if_ref');
			
			
			var fieldArr1=[];
			fieldArr1[0]='custrecord_itercomp_srno';
			fieldArr1[1]='custrecord_if_ref';
			fieldArr1[2]='custrecord_intercomp_if_rec';
			fieldArr1[3]='custrecord_intcom_so_ref';
			fieldArr1[4]='custrecord_if_done';
			fieldArr1[5]='custrecord_test_check';
			fieldArr1[6]='custrecord_not_shipp';
			fieldArr1[7]='custrecord_inter_if_id';
			
			var valueArr1=[];
			valueArr1[0]=serialVl.toString();
			valueArr1[1]='';
			valueArr1[2]='';
			valueArr1[3]='';
			valueArr1[4]='F';
			valueArr1[5]='F';
			valueArr1[6]='F';
			valueArr1[7]='';
			
			nlapiSubmitField('customrecord_intercompany',delId,fieldArr1,valueArr1);
			
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
	 var loadRec = nlapiLoadRecord('itemfulfillment',recId);
	 
	 var linecount = loadRec.getLineItemCount('item');
	 
	 var creatFrom =loadRec.getFieldValue('createdfrom');
	 
	 var ifStatus =loadRec.getFieldValue('shipstatus');
	 
	//	custrecord_not_shipp
	for (var m1=1;m1<=linecount;m1++)
	{
		var sr_list = loadRec.getLineItemValue('item','serialnumbers',m1);
		
		var serialNum = String(sr_list).split(/\s+/);
		//var serialNum = (res.toString()).replace(/\s+,|\s+/, ",");
		
		if(String(serialNum).split(",").length > 1)
		{
			serialNumArr.push(serialNum);
		}
		else
		{
			var serialNum = String(sr_list).split('');
			serialNumArr.push(serialNum);
		}
		
		//nlapiLogExecution('DEBUG','sut_intercom_Post','serialNumArr = '+serpostArr);
	}
	
	nlapiLogExecution('DEBUG','sut_intercom_Post','serialNumArr = '+serialNumArr);
	
	var serialLine =serialNumArr.toString().split(",");
	nlapiLogExecution('DEBUG','sut_intercom_Post','serialLine = '+serialLine.length);
	
	
	
		for(var p=0;p<serialLine.length;p++)
		{
			var customrecord_intercompanySearch = nlapiSearchRecord("customrecord_intercompany",null,
					[
					   ["isinactive","is","F"], 
					   "AND", 
					   ["custrecord_itercomp_srno","is",serialLine[p]],
					   "AND", 
					   ["custrecord_if_done","is","F"]	
					], 
					[
					   new nlobjSearchColumn("internalid")			   
					]
					);
				if(customrecord_intercompanySearch!=null&&customrecord_intercompanySearch!=''&&customrecord_intercompanySearch!=undefined)
				{	
					var recintId =customrecord_intercompanySearch[0].getValue(new nlobjSearchColumn("internalid"));
					if(recintId!=null&&recintId!=''&&recintId!=undefined)
					{
						// nlapiLogExecution('DEBUG','updateCustRecDetails','noOfserial['+p+'] = '+noOfserial[p]);
						//nlapiLogExecution('DEBUG','updateCustRecDetails','sernoserach = '+sernoserach);
						//nlapiLogExecution('DEBUG','updateCustRecDetails','recId = '+recId);
					
						var fieldArr=[];
						fieldArr[0]='custrecord_itercomp_srno';
						fieldArr[1]='custrecord_if_ref';
						fieldArr[2]='custrecord_intercomp_if_rec';
						fieldArr[3]='custrecord_intcom_so_ref';
						fieldArr[4]='custrecord_if_done';
						fieldArr[5]='custrecord_test_check';
						fieldArr[6]='custrecord_not_shipp';
						fieldArr[7]='custrecord_inter_if_id';
						
						var valueArr=[];
						valueArr[0]='';
						valueArr[1]=serialLine[p].toString();
						valueArr[2]=recId;
						valueArr[3]=creatFrom;
						valueArr[4]='T';
						valueArr[5]='T';
						
						if(ifStatus !='C')
						{
							valueArr[6]='T';
						}
						else
						{
							valueArr[6]='F';
						}
						valueArr[7]=recId;
						
						nlapiSubmitField('customrecord_intercompany',recintId,fieldArr,valueArr);
					}	
				}
				 var context = nlapiGetContext();
				var UsageEnd = context.getRemainingUsage();
				
				// nlapiLogExecution('DEBUG', 'schedulerFunction', 'Usage At End [' + p + '] -->' + UsageEnd);
				
				  if (UsageEnd < 600) 
					{
					  nlapiYieldScript()
					}
				//  break;
		}
       nlapiLogExecution('DEBUG', 'schedulerFunction', 'Usage At End [' + p + '] -->' + UsageEnd);
	 }
}
catch(e)
{
	nlapiLogExecution("DEBUG","In Create Function","ERROR ="+e);
}

}



function findTransaction1(searchId,recId)
{
	nlapiLogExecution("DEBUG","In findTransaction1 Fun","recId ="+recId);
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_inter_if_id', null,'equalto',recId);//custrecord_intcom_so_ref
	
	 filters[1]=new nlobjSearchFilter('custrecord_if_done', null,'is','T');//custrecord_intcom_so_ref
		
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
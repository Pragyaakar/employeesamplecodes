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
function SCH_IR_serial_manualUpdate(type)
{
	 try{
	
	var recId;
	var itemArr;
	var qtyArr;
	var locArr;
	var serialNumArr=[];
	var searchId='customsearch_main_serial_num_rec_2';
	
	 recId = nlapiGetContext().getSetting('SCRIPT','custscript_ir_rec_id');
	
	 exeType = nlapiGetContext().getSetting('SCRIPT','custscript_type2');
	  nlapiLogExecution("DEBUG","Rec Available","exeType="+exeType+" recId ="+recId);
	  
	    
	  var resultRec = findTransaction1(recId);
	  nlapiLogExecution("DEBUG","Rec Available","resultRec Check b4 ="+resultRec);
	  
	 if((resultRec !=null && resultRec != undefined && resultRec !='' && exeType !='delete')||(resultRec !=null && resultRec != undefined && resultRec !='' && exeType =='delete'))
	 {
		 nlapiLogExecution("DEBUG","Rec Available","resultRec.length ="+resultRec.length);
		 for(var i=0;i<resultRec.length;i++)
		 {
			var delId = resultRec[i].getValue('internalid');
			var SerialVal = resultRec[i].getValue('custrecord_ir_ref');
			
			var fieldArr1=[];
			fieldArr1[0]='custrecord_if_ref';
			fieldArr1[1]='custrecord_ir_ref';
			fieldArr1[2]='custrecord_ic_po_ref';
			fieldArr1[3]='custrecord_ir_done';
			fieldArr1[4]='custrecord_intercomp_ir_rec';
			fieldArr1[5]='isinactive';
			fieldArr1[6]='custrecord_inter_ir_id';
          
			var valueArr1=[];
			valueArr1[0]= SerialVal.toString();
			valueArr1[1]= '';
			valueArr1[2]= '';
			valueArr1[3]= 'F';
			valueArr1[4]= '';
			valueArr1[5]= 'F';
			valueArr1[6]= '';
	
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
	 var loadRec = nlapiLoadRecord('itemreceipt',recId);
	 
	 var linecount = loadRec.getLineItemCount('item');
	 
	 var creatFrom =loadRec.getFieldValue('createdfrom');
	 
	 var so_ref_main='';
	 
	 if(creatFrom != null && creatFrom !='' && creatFrom!=undefined)
		{	
			so_ref_main =nlapiLookupField('purchaseorder',creatFrom,'intercotransaction');
			nlapiLogExecution('DEBUG','sut_intercom_if','so_ref_main = '+so_ref_main);
		}
	 
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
	 
		for(var p=0;p<serialLine.length;p++)
		{
			var customrecord_intercompanySearch = nlapiSearchRecord("customrecord_intercompany",null,
					[
					   ["isinactive","is","F"], 
					   "AND", 
					   ["custrecord_if_ref","is",serialLine[p]],
					   "AND", 
					   ["custrecord_ir_done","is","F"], 
					   "AND", 
					   ["custrecord_intcom_so_ref","anyof",so_ref_main]
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
						fieldArr[0]='custrecord_if_ref';
						fieldArr[1]='custrecord_ir_ref';
						fieldArr[2]='custrecord_ic_po_ref';
						fieldArr[3]='custrecord_ir_done';
						fieldArr[4]='custrecord_intercomp_ir_rec';
                        fieldArr[5]='isinactive';
                        fieldArr[6]='custrecord_inter_ir_id';
                        
						var valueArr=[];
						valueArr[0]='';
						valueArr[1]=serialLine[p].toString();
						valueArr[2]=creatFrom;
						valueArr[3]='T';
                        valueArr[4]=recId;
                        valueArr[5]='T';
                        valueArr[6]=recId;
				
						nlapiSubmitField('customrecord_intercompany',recintId,fieldArr,valueArr);
					}	
				}
				 var context = nlapiGetContext();
				var UsageEnd = context.getRemainingUsage();
				
				// nlapiLogExecution('DEBUG', 'schedulerFunction', 'Usage At End [' + i + '] -->' + UsageEnd);
				
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


function findTransaction1(recId)
{
	 
	var searchId='customsearch_main_serial_num_rec_2';
	
	nlapiLogExecution("DEBUG","In findTransaction1","recId ="+recId);	
	
	var filters=new Array();
	//filters[0]=new nlobjSearchFilter('custrecord_ir_done', null,'is','T');
	filters[0]=new nlobjSearchFilter('custrecord_inter_ir_id', null,'equalto',recId);
	
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

    nlapiLogExecution("DEBUG","In findTransaction1","aSearchResults ="+aSearchResults);	
	
 //   nlapiLogExecution('DEBUG', 'getAllResults --> Success', 'Rec Type--> ' + recType + ' Results Count--> ' + aSearchResults.length);
    return aSearchResults;
}
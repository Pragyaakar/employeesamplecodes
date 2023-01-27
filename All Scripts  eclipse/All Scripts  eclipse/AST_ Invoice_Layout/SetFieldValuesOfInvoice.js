/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Dec 2018     Priyanka Patil
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function setValuesAfterSubmit()
{
	var description;
	var splitArray = new Array();
	
	var recId = nlapiGetRecordId(); 
	var recObj = nlapiLoadRecord('invoice', recId);
	
	var lineCount = recObj.getLineItemCount('item');
	nlapiLogExecution('DEBUG','Get Values','Line Count =='+lineCount);
	
	for(var i=1; i < lineCount; i++)
	{
		
			description = recObj.getLineItemValue('item','description',i);
			nlapiLogExecution('DEBUG','Get Values','description =='+description);
			if(description != null)
			{
				/*var splitDes = description.slice(description.toString().indexOf(":") + 1);
				nlapiLogExecution('DEBUG','Get Values','splitDes =='+splitDes);*/
				
				var p = description.indexOf(':');
				 // var p1 = description.indexOf('Project');
				  var p2 = description.indexOf('Date');
				//  var p3 = description.indexOf('Task');
				  var p4= description.indexOf('Hours');
				  var p5 = description.indexOf('Minutes');
				//  var p6 = description.indexOf('Minutes');
				  var p7 = description.indexOf('Rate');
				  var p8 = description.indexOf('Notes');
				  var p9 = description.indexOf('Amount');
				//  var p10 = description.indexOf('Amount');
				 
				 
				 var res = description.substring(p+1, p2);  
				 var res1 = description.substring(p2+5, p4);
				 var res2 = description.substring(p4+6, p7);
				 var res3 = description.substring(p7+5, p8);
				 var res4 ;//= description.substring(p5+8, p7); 
				 var res5 ;//= description.substring(p8+5, p9);
				 var res6 = description.substring(p9+7, description.length);
				 
				 nlapiLogExecution('DEBUG','Get Values','res =='+res);
				 nlapiLogExecution('DEBUG','Get Values','res1 =='+res1);
				 var dateSplit =  nlapiStringToDate(res1);
				 nlapiLogExecution('DEBUG','Get Values','dateSplit =='+dateSplit);
				 var dateSplit1 =  new Date(res1);
				 nlapiLogExecution('DEBUG','Get Values','dateSplit1 =='+dateSplit1);
				 /*var dateSplit = res1.indexOf('-');
				 var dateSplit1 = res1.lastIndexOf('-');
				 
				 var dateSub = res1.substring(0, dateSplit);
				 var dateSub1 = res1.substring(dateSplit1+1, res1.length);
				 var dateSub2 = res1.substring(dateSplit+1, dateSplit1);
				 var d1 = dateSub1 +"-" + dateSub2+ "-" + dateSub;
				 
				 nlapiLogExecution('DEBUG','Get Values','dateSub =='+dateSub);
				 nlapiLogExecution('DEBUG','Get Values','dateSub1 =='+dateSub1);
				 nlapiLogExecution('DEBUG','Get Values','dateSub2 =='+dateSub2);*/
				 
				 /*var month1 = dateSplit.getMonth() + 1;
					var day1 = dateSplit.getDate();
					var year1 = dateSplit.getFullYear();
					var d1 = year1 +"-" + month1+ "-" + day1;
					nlapiLogExecution('DEBUG','Get Values','d1 =='+d1);*/
					
				 nlapiLogExecution('DEBUG','Get Values','res2 =='+res2);
				 nlapiLogExecution('DEBUG','Get Values','res3 =='+res3);
				// nlapiLogExecution('DEBUG','Get Values','res4 =='+res4);
				// nlapiLogExecution('DEBUG','Get Values','res5 =='+res5);
				 nlapiLogExecution('DEBUG','Get Values','res6 =='+res6);
				 
				    recObj.setLineItemValue('item','custcol_oa_user_description',i,res);
					recObj.setLineItemValue('item','custcol_oa_date_description',i,res1);
				//	recObj.setLineItemValue('item','custcol_oa_task_description',i,res2);
					recObj.setLineItemValue('item','custcol_oa_hours_description',i,res2);
				//	recObj.setLineItemValue('item','custcol_oa_minutes_description',i,res4);
					recObj.setLineItemValue('item','custcol_oa_rate_description',i,res3);
					recObj.setLineItemValue('item','custcol_oa_amount_description',i,res6);	
					
			}
			
			
	}
	nlapiSubmitRecord(recObj,false);
}
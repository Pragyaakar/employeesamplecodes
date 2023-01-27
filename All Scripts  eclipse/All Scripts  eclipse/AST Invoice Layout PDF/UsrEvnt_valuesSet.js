/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Mar 2019     Tushar More
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
function userEventAutoDateSet(type)
{
	try
	{
  if(type == 'create' || type == 'edit')
  {
    
	var description;
		
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	
    var irObj = nlapiLoadRecord(recordType,recordId);
	nlapiLogExecution('DEBUG','Serach Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
  
	
	var lineCount = irObj.getLineItemCount('item');
	
	nlapiLogExecution('DEBUG','Serach Value','lineCount :'+lineCount);
    for(i=1;i<=lineCount;i++)
    {
		nlapiLogExecution('DEBUG','Serach Value','lineCount in for loop');
		var date1 = irObj.getLineItemValue('item','custcol_oa_date_description',i);	
		
		description = irObj.getLineItemValue('item','description',i);
		nlapiLogExecution('DEBUG','Get Values','description =='+description);
		
		if(date1!=null)
		{
			nlapiLogExecution('DEBUG','Get Values','description and date loop==');
			 var OAdate1 =date1.toString();
				
				var parts =OAdate1.split('-');
				var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
				nlapiLogExecution('DEBUG','Get Values','mydate=='+mydate);
				
			irObj.setLineItemValue('item','custcol_cust_date',i,mydate);
		}	
		//-----------------------------------Set Field Values----------------------------	
			
			
		else if(description != null)//
			{
			var p = description.indexOf(':');
			  var p1 = description.indexOf('Project');
			  var p2 = description.indexOf('Date');
			  var p3 = description.indexOf('Task');
			  var p4= description.indexOf('Hours');
			  var p5 = description.indexOf('Minutes');
			  var p6 = description.indexOf('Minutes');
			  var p7 = description.indexOf('Currency');
			  var p8 = description.indexOf('Rate');
			  var p9 = description.indexOf('Amount');
			  var p10 = description.indexOf('Amount');
			  var p11 = description.indexOf('Service');
			 
			 
			 var res = description.substring(p+1, p1);  
			 var res1 = description.substring(p2+5, p3);
			 var res2 = description.substring(p3+5, p4);
			 var res3 = description.substring(p4+6, p5);
			 var res4 = description.substring(p5+8, p7); 
			 var res5 = description.substring(p8+5, p9);
			 var res6 = description.substring(p9+7, description.length);
			 var res7 = description.substring(p11+8, p2);
			 
			 /*var dateSplit = res1.indexOf('-');
			 var dateSplit1 = res1.lastIndexOf('-');
			 
			 var dateSub = res1.substring(0, dateSplit);
			 var dateSub1 = res1.substring(dateSplit1+1, res1.length);
			 var dateSub2 = res1.substring(dateSplit+1, dateSplit1);
			 var d1 = dateSub1+"-"+dateSub2+"-"+dateSub;*/
			 
			 var OAdate2 =res1.toString();
	         nlapiLogExecution('DEBUG','OAdate2 Values','OAdate2=='+OAdate2);
					
			 var parts1 =OAdate2.split('-');
			 var mydate1 = new Date(parts1[0], parts1[1] - 1, parts1[2]);
			 nlapiLogExecution('DEBUG','Get Values','mydate1=='+mydate1);
			 
			 /*nlapiLogExecution('DEBUG','Get Values','dateSub =='+dateSub);
			 nlapiLogExecution('DEBUG','Get Values','dateSub1 =='+dateSub1);
			 nlapiLogExecution('DEBUG','Get Values','dateSub2 =='+dateSub2);*/
			 nlapiLogExecution('DEBUG','Get Values','mydate1 =='+mydate1);
				
				
			 nlapiLogExecution('DEBUG','Get Values','res =='+res);
			 nlapiLogExecution('DEBUG','Get Values','res1 =='+res1);
			 nlapiLogExecution('DEBUG','Get Values','res2 =='+res2);
			 nlapiLogExecution('DEBUG','Get Values','res3 =='+res3);
			 nlapiLogExecution('DEBUG','Get Values','res4 =='+res4);
			 nlapiLogExecution('DEBUG','Get Values','res5 =='+res5);
			 nlapiLogExecution('DEBUG','Get Values','res6 =='+res6);
			 nlapiLogExecution('DEBUG','Get Values','res7 =='+res7);
			 
			 irObj.setLineItemValue('item','custcol_oa_user_description',i,res);
			 irObj.setLineItemValue('item','custcol_oa_date_description',i,res1);
			 irObj.setLineItemValue('item','custcol_oa_task_description',i,res2);
			 irObj.setLineItemValue('item','custcol_oa_hours_description',i,res3);
			 irObj.setLineItemValue('item','custcol_oa_minutes_description',i,res4);
			 irObj.setLineItemValue('item','custcol_oa_rate_description',i,res5);
			 irObj.setLineItemValue('item','custcol_oa_amount_description',i,res6);
			 irObj.setLineItemValue('item','custcol_oa_service_description',i,res7);
			 irObj.setLineItemValue('item','custcol_cust_date',i,nlapiDateToString(mydate1));	
			}	 
			
		}//End of if linecount
    nlapiSubmitRecord(irObj,true);
  }
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG','Error','LogError ='+e);
	}
}

//-------------------------------------Logic To Set Field Values------------------------------------

	
	
	/*var recId = nlapiGetRecordId(); 
	var recObj = nlapiLoadRecord('invoice', recId);
	
	var lineCount = recObj.getLineItemCount('item');
	nlapiLogExecution('DEBUG','Get Values','Line Count =='+lineCount);
	
	for(var i=1; i <= lineCount; i++)
	{
		nlapiLogExecution('DEBUG','Get Values','Line Count in for loop=='+lineCount);
			description = recObj.getLineItemValue('item','description',i);
			nlapiLogExecution('DEBUG','Get Values','description =='+description);
			if(description != null)
			{
				var splitDes = description.slice(description.toString().indexOf(":") + 1);
				nlapiLogExecution('DEBUG','Get Values','splitDes =='+splitDes);
				
				var p = description.indexOf(':');
				  var p1 = description.indexOf('Project');
				  var p2 = description.indexOf('Date');
				  var p3 = description.indexOf('Task');
				  var p4= description.indexOf('Hours');
				  var p5 = description.indexOf('Minutes');
				  var p6 = description.indexOf('Minutes');
				  var p7 = description.indexOf('Currency');
				  var p8 = description.indexOf('Rate');
				  var p9 = description.indexOf('Amount');
				  var p10 = description.indexOf('Amount');
				 
				 
				 var res = description.substring(p+1, p1);  
				 var res1 = description.substring(p2+5, p3);
				 var res2 = description.substring(p3+5, p4);
				 var res3 = description.substring(p4+6, p5);
				 var res4 = description.substring(p5+8, p7); 
				 var res5 = description.substring(p8+5, p9);
				 var res6 = description.substring(p9+7, description.length);
				 
				 nlapiLogExecution('DEBUG','Get Values','res =='+res);
				 nlapiLogExecution('DEBUG','Get Values','res1 =='+res1);
				 
				 var dateSplit = res1.indexOf('-');
				 var dateSplit1 = res1.lastIndexOf('-');
				 
				 var dateSub = res1.substring(0, dateSplit);
				 var dateSub1 = res1.substring(dateSplit1+1, res1.length);
				 var dateSub2 = res1.substring(dateSplit+1, dateSplit1);
				 var d1 = dateSub1 +"-" + dateSub2+ "-" + dateSub;
				 
				 nlapiLogExecution('DEBUG','Get Values','dateSub =='+dateSub);
				 nlapiLogExecution('DEBUG','Get Values','dateSub1 =='+dateSub1);
				 nlapiLogExecution('DEBUG','Get Values','dateSub2 =='+dateSub2);
				 
				 var month1 = dateSplit.getMonth() + 1;
					var day1 = dateSplit.getDate();
					var year1 = dateSplit.getFullYear();
					var d1 = year1 +"-" + month1+ "-" + day1;
					nlapiLogExecution('DEBUG','Get Values','d1 =='+d1);
					
				 nlapiLogExecution('DEBUG','Get Values','res2 =='+res2);
				 nlapiLogExecution('DEBUG','Get Values','res3 =='+res3);
				 nlapiLogExecution('DEBUG','Get Values','res4 =='+res4);
				 nlapiLogExecution('DEBUG','Get Values','res5 =='+res5);
				 nlapiLogExecution('DEBUG','Get Values','res6 =='+res6);
				 
				 recObj.setLineItemValue('item','custcol_oa_user_description',i,res);
					recObj.setLineItemValue('item','custcol_oa_date_description',i,res1);
					recObj.setLineItemValue('item','custcol_oa_task_description',i,res2);
					recObj.setLineItemValue('item','custcol_oa_hours_description',i,res3);
					recObj.setLineItemValue('item','custcol_oa_minutes_description',i,res4);
					recObj.setLineItemValue('item','custcol_oa_rate_description',i,res5);
					recObj.setLineItemValue('item','custcol_oa_amount_description',i,res6);	
					
			}
			
			
	}
	nlapiSubmitRecord(recObj,false);
}*/
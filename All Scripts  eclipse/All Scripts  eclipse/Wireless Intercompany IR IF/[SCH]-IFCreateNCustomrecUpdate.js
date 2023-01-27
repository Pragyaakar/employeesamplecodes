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

var UpdateMap={};
function SCH_IF_createIntercompany(type)
{
	 try{
	
	var recId;
	var itemArr;
	var qtyArr;
	var locArr;
	var serialNumArr=[];
	var searchId='customsearch_main_serial_num_rec';
	
	 recId = nlapiGetContext().getSetting('SCRIPT','custscript_recid');
	 itemArr = nlapiGetContext().getSetting('SCRIPT','custscript_item');
	 qtyArr = nlapiGetContext().getSetting('SCRIPT','custscript_qty');
	 locArr = nlapiGetContext().getSetting('SCRIPT','custscript_loc');
	
	 itemArr=itemArr.split("");
	 qtyArr=qtyArr.split("");
	 locArr=locArr.split("");
	 
	 nlapiLogExecution('DEBUG','sut_intercom_Post','recId = '+recId);
	 nlapiLogExecution('DEBUG','sut_intercom_Post','itemArr = '+itemArr+' len ='+itemArr.length);
	 nlapiLogExecution('DEBUG','sut_intercom_Post','qtyArr = '+qtyArr+' len ='+qtyArr.length);
	 nlapiLogExecution('DEBUG','sut_intercom_Post','locArr = '+locArr+' len ='+locArr.length);
	
	 
	 var poid = 301874;
	 
	for (var m1=0;m1<itemArr.length;m1++)
	{
		/*var customrecord_intercompanySearch = nlapiSearchRecord("customrecord_intercompany",null,
				[
				   ["custrecord_itercomp_item","anyof",itemArr[m1]], 
				   "AND", 
				   ["custrecord_itercomp_loc","anyof",locArr[m1]], 
				   "AND", 
				   ["isinactive","is","F"],
				   "AND", 
				   ["custrecord_if_done","is","F"],
				   "AND", 
				   ["custrecord_itercomp_ref","anyof","301874"]
				], 
				[
				   new nlobjSearchColumn("internalid"), 
				   new nlobjSearchColumn("custrecord_itercomp_item"), 
				   new nlobjSearchColumn("custrecord_itercomp_srno"), 
				   new nlobjSearchColumn("custrecord_itercomp_loc")
				]
				);*/
		
		var customrecord_intercompanySearch  = findTransaction(searchId,itemArr[m1],locArr[m1]);
		
		
		if(customrecord_intercompanySearch!=null && customrecord_intercompanySearch!=''&&customrecord_intercompanySearch!=undefined)
		{ 
			var serpostArr=[];
			for(var i = 1; i<=qtyArr[m1];i++)
		    {
				var serchserialno =customrecord_intercompanySearch[i-1].getValue('custrecord_itercomp_srno');
				serpostArr.push(serchserialno);
		    }
		}
		
		serialNumArr.push(serpostArr);
		//nlapiLogExecution('DEBUG','sut_intercom_Post','serialNumArr = '+serpostArr);
	}
	
	
	
	
    
	
	// nlapiLogExecution('DEBUG','sut_intercom_Post','serialNumArr = '+serialNumArr);
	
	if(recId != null && recId !='')
	{
		var record = nlapiTransformRecord('salesorder', recId, 'itemfulfillment');
		
		record.setFieldValue('shipstatus','C');
		
		var count = record.getLineItemCount('item');
   	 
	   	 for(var ch2=1;ch2<=count;ch2++)
	   	 {
	   		 var CheckBox = record.getLineItemValue('item','itemreceive',ch2);
	   		 
	   		 record.setLineItemValue('item','itemreceive',ch2,'F')
	   			
	   	 }
		
	   	 var newItemArr=[];
	   	 var newQtyArr =[];
	   	 var newlocArr=[];
	   	 var newSerialArr=[];
	  
	   	 var serialUpdate=[];
	   	 
		if(itemArr != null && itemArr != '')
		{
			for (var m=0;m<itemArr.length;m++)
	    	 {
	    		 
	    		 loop2 : for(var ch=1;ch<=count;ch++)
		    	 {
		    		 var ItemLine = record.getLineItemValue('item','item',ch);
		    		
		    		 var qtty = record.getLineItemValue('item','quantity',ch);
		    		
		    		 var LocationLine = record.getLineItemValue('item','location',ch);
		    		 
		    		 var setValue = record.getLineItemValue('item','custcol_set_value',ch);
		            
		    		 if(itemArr.indexOf(ItemLine) != -1)
		    		  {
		    			 if((ItemLine == itemArr[m])&& (setValue != 'T')) 
				    	 {
				    						
				    			
				    			 
				    			 if(qtyArr[m] > 200)
				    			 {
				    				 
				    				// nlapiLogExecution('DEBUG','sut_intercom_Post','qty > 200  = '+qtyArr[m]);
				    				 record.setLineItemValue('item','quantity',ch,200);
					    			 record.setLineItemValue('item','itemreceive',ch,'T');
					    			 record.setLineItemValue('item','custcol_set_value',ch,'T');
					    			 
					    			 if(LocationLine != locArr[m])
					    			 {
					    				 record.setLineItemValue('item','location',ch,locArr[m]);
					    			 }
					    			
					    			 var setIFSer = serialNumArr[m].toString().split(',').splice(0, 200);
					    			 
					    			 record.setLineItemValue('item','serialnumbers',ch,setIFSer);
					    			 
					    			// nlapiLogExecution('DEBUG','sut_intercom_Post','qty > 200  = '+serialNumArr[m].toString().split(',').splice(0, 200));
					    			 
					    			 var chQty= parseFloat(qtyArr[m])-parseFloat(200);
					    			 
					    			 var td = serialNumArr[m].toString().split(',').splice(200, serialNumArr[m].length);
					    			 
					    			// nlapiLogExecution('DEBUG','sut_intercom_Post','qty > 200 td = '+td);
					    			 
					    			 
					    			 newItemArr.push(itemArr[m]);
					    			 newQtyArr.push(chQty);
					    			 newlocArr.push(locArr[m]);
					    			 newSerialArr.push(td);
					    			 serialUpdate.push(serialNumArr[m].toString().split(',').splice(0, 200));
					    			 break loop2;
				    			 }
				    			 else 
				    			 {
				    				 record.setLineItemValue('item','quantity',ch,qtyArr[m]);
					    			 record.setLineItemValue('item','itemreceive',ch,'T');
					    			 record.setLineItemValue('item','custcol_set_value',ch,'T');
					    			 
					    			 if(LocationLine != locArr[m])
					    			 {
					    				 record.setLineItemValue('item','location',ch,locArr[m]);
					    			 }
					    			
					    			 record.setLineItemValue('item','serialnumbers',ch,serialNumArr[m]);
					    			
					    			 serialUpdate.push(serialNumArr[m]);
					    			 break loop2;
				    			 }
				    			 
				    	 }
		    			 
		    		  
		    		  }
		          }
		
	         }
	
		}
		
		 var SubmitIt=nlapiSubmitRecord(record,true);  
			
	 nlapiLogExecution("DEBUG","In Create Function","IF Created ID..=="+SubmitIt);
	
	 UpdateMap[SubmitIt]=serialUpdate;
	 
			if(newItemArr != null && newItemArr !='' && newItemArr !=undefined)
			{
				callReccurenceToIFcreate(recId,newItemArr,newQtyArr,newlocArr,newSerialArr);
			}
			 
			
	}
	
	var chk = Object.keys(UpdateMap)
	
	nlapiLogExecution("DEBUG","In Create Function","The Final Log="+chk);
	
	for (var key in UpdateMap)
	{
		nlapiLogExecution("DEBUG","In Create Function","key="+key+' CheckLne='+UpdateMap[key]);
		
		var noOfserial = UpdateMap[key].toString().split(',');
		nlapiLogExecution("DEBUG","In Create Function","noOfserial len"+noOfserial.length);
		for(var p=0;p<noOfserial.length;p++)
		{
			var customrecord_intercompanySearch = nlapiSearchRecord("customrecord_intercompany",null,
					[
					   ["isinactive","is","F"], 
					   "AND", 
					   ["custrecord_itercomp_srno","is",noOfserial[p]],
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
						
						var valueArr=[];
						valueArr[0]='';
						valueArr[1]=noOfserial[p].toString();
						valueArr[2]=key;
						valueArr[3]=recId;
						valueArr[4]='T';
						valueArr[5]='T';
					/*	
						var custRecObj = nlapiLoadRecord('customrecord_intercompany',recintId);
						custRecObj.setFieldValue('custrecord_itercomp_srno',' ');
						custRecObj.setFieldValue('custrecord_if_ref',noOfserial[p].toString());
						custRecObj.setFieldValue('custrecord_intercomp_if_rec',key);
						custRecObj.setFieldValue('custrecord_intcom_so_ref',recId);
						custRecObj.setFieldValue('custrecord_if_done','T');
						var custID = nlapiSubmitRecord(custRecObj,true);
					*/
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
				
		//break;
	}
	
	var userEmail = nlapiLookupField('employee',nlapiGetUser(),'email');
	
	if(userEmail != null &&  userEmail !=undefined)
	{
		userEmail =userEmail;
		 nlapiLogExecution('DEBUG', 'schedulerFunction', 'userEmail -->' + userEmail);
			
	}
	else
	{
		userEmail='ams@aarialife.com';
	}
	 var CheckVal='0';
     if(chk !=null)
     {
   	  CheckVal =chk.length;
     }
     
	  var subject = 'Intercompany Item Fulfillments';
      var body ="<!DOCTYPE html><html><body> Hi, <br><br>"+"Your Fulfillment orders and custom records are updated. <br><br> Now you can proceed for the Receive orders.<br><br>Thank you for your patience.<br><br>The total IF created :"+CheckVal+"<br><br>Best Regards,</body></html>";
      var records=[];
      records['transaction'] = chk;
     
     
     var checkEmail=nlapiSendEmail(nlapiGetUser(), userEmail , subject, body, null, null,records, null);
   	nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " checkEmail " + checkEmail);
}
catch(e)
{
	nlapiLogExecution("DEBUG","In Create Function","ERROR ="+e);
}

}


function callReccurenceToIFcreate(recId,itemArr,qtyArr,locArr,serialNumArr)
{

	var record = nlapiTransformRecord('salesorder', recId, 'itemfulfillment');
	
	 record.setFieldValue('shipstatus','C');
	
	var count = record.getLineItemCount('item');
	 
   	 for(var ch2=1;ch2<=count;ch2++)
   	 {
   		 var CheckBox = record.getLineItemValue('item','itemreceive',ch2);
   		 
   		 record.setLineItemValue('item','itemreceive',ch2,'F')
   			
   	 }
	
   	 var newItemArr=[];
   	 var newQtyArr =[];
   	 var newlocArr=[];
   	 var newSerialArr=[];
  
   	 var serialUpdate=[];
   	 
	if(itemArr != null && itemArr != '')
	{
		for (var m=0;m<itemArr.length;m++)
    	 {
    		 
    		 loop2 : for(var ch=1;ch<=count;ch++)
	    	 {
	    		 var ItemLine = record.getLineItemValue('item','item',ch);
	    		
	    		 var qtty = record.getLineItemValue('item','quantity',ch);
	    		
	    		 var LocationLine = record.getLineItemValue('item','location',ch);
	    		 
	    		 var setValue = record.getLineItemValue('item','custcol_set_value',ch);
	            
	    		 if(itemArr.indexOf(ItemLine) != -1)
	    		  {
	    			 if((ItemLine == itemArr[m])&& (setValue != 'T')) 
			    	 {
			    						
			    			
			    			 
			    			 if(qtyArr[m] > 200)
			    			 {
			    				 
			    				// nlapiLogExecution('DEBUG','sut_intercom_Post','qty > 200  = '+qtyArr[m]);
			    				 record.setLineItemValue('item','quantity',ch,200);
				    			 record.setLineItemValue('item','itemreceive',ch,'T');
				    			 record.setLineItemValue('item','custcol_set_value',ch,'T');
				    			 
				    			 if(LocationLine != locArr[m])
				    			 {
				    				 record.setLineItemValue('item','location',ch,locArr[m]);
				    			 }
				    			
				    			 record.setLineItemValue('item','serialnumbers',ch,serialNumArr[m].toString().split(',').splice(0, 200));
				    			 
				    			// nlapiLogExecution('DEBUG','sut_intercom_Post','qty > 200  = '+serialNumArr[m].toString().split(',').splice(0, 200));
				    			 
				    			 var chQty= parseFloat(qtyArr[m])-parseFloat(200);
				    			 
				    			 var td = serialNumArr[m].toString().split(',').splice(200, serialNumArr[m].length);
				    			 
				    			// nlapiLogExecution('DEBUG','sut_intercom_Post','qty > 200 td = '+td);
				    			 
				    			 
				    			 newItemArr.push(itemArr[m]);
				    			 newQtyArr.push(chQty);
				    			 newlocArr.push(locArr[m]);
				    			 newSerialArr.push(td);
				    			 serialUpdate.push(serialNumArr[m].toString().split(',').splice(0, 200));
					    			
				    			 break loop2;
			    			 }
			    			 else 
			    			 {
			    				 record.setLineItemValue('item','quantity',ch,qtyArr[m]);
				    			 record.setLineItemValue('item','itemreceive',ch,'T');
				    			 record.setLineItemValue('item','custcol_set_value',ch,'T');
				    			 
				    			 if(LocationLine != locArr[m])
				    			 {
				    				 record.setLineItemValue('item','location',ch,locArr[m]);
				    			 }
				    			
				    			 record.setLineItemValue('item','serialnumbers',ch,serialNumArr[m]);
				    			 serialUpdate.push(serialNumArr[m]);
				    			 break loop2;
			    			 }
			    			 
			    	 }
	    			 
	    		  
	    		  }
	          }
	
         }

	}
	
	 var SubmitIt=nlapiSubmitRecord(record,true);  
		
nlapiLogExecution("DEBUG","In Create Function","IF Created ID..=="+SubmitIt);

UpdateMap[SubmitIt]=serialUpdate;

		if(newItemArr != null && newItemArr !='' && newItemArr !=undefined)
		{
			callReccurenceToIFcreate1(recId,newItemArr,newQtyArr,newlocArr,newSerialArr);
		}
		 

}


function callReccurenceToIFcreate1(recId,itemArr,qtyArr,locArr,serialNumArr)
{

	var record = nlapiTransformRecord('salesorder', recId, 'itemfulfillment');
	
	record.setFieldValue('shipstatus','C');
	
	var count = record.getLineItemCount('item');
	 
   	 for(var ch2=1;ch2<=count;ch2++)
   	 {
   		 var CheckBox = record.getLineItemValue('item','itemreceive',ch2);
   		 
   		 record.setLineItemValue('item','itemreceive',ch2,'F')
   			
   	 }
	
   	 var newItemArr=[];
   	 var newQtyArr =[];
   	 var newlocArr=[];
   	 var newSerialArr=[];
   	 var serialUpdate=[];
  
	if(itemArr != null && itemArr != '')
	{
		for (var m=0;m<itemArr.length;m++)
    	 {
    		 
    		 loop2 : for(var ch=1;ch<=count;ch++)
	    	 {
	    		 var ItemLine = record.getLineItemValue('item','item',ch);
	    		
	    		 var qtty = record.getLineItemValue('item','quantity',ch);
	    		
	    		 var LocationLine = record.getLineItemValue('item','location',ch);
	    		 
	    		 var setValue = record.getLineItemValue('item','custcol_set_value',ch);
	            
	    		 if(itemArr.indexOf(ItemLine) != -1)
	    		  {
	    			 if((ItemLine == itemArr[m])&& (setValue != 'T')) 
			    	 {
			    						
			    			
			    			 
			    			 if(qtyArr[m] > 200)
			    			 {
			    				 
			    				// nlapiLogExecution('DEBUG','sut_intercom_Post','qty > 200  = '+qtyArr[m]);
			    				 record.setLineItemValue('item','quantity',ch,200);
				    			 record.setLineItemValue('item','itemreceive',ch,'T');
				    			 record.setLineItemValue('item','custcol_set_value',ch,'T');
				    			 
				    			 if(LocationLine != locArr[m])
				    			 {
				    				 record.setLineItemValue('item','location',ch,locArr[m]);
				    			 }
				    			
				    			 record.setLineItemValue('item','serialnumbers',ch,serialNumArr[m].toString().split(',').splice(0, 200));
				    			 
				    			// nlapiLogExecution('DEBUG','sut_intercom_Post','qty > 200  = '+serialNumArr[m].toString().split(',').splice(0, 200));
				    			 
				    			 var chQty= parseFloat(qtyArr[m])-parseFloat(200);
				    			 
				    			 var td = serialNumArr[m].toString().split(',').splice(200, serialNumArr[m].length);
				    			 
				    			// nlapiLogExecution('DEBUG','sut_intercom_Post','qty > 200 td = '+td);
				    			 
				    			 
				    			 newItemArr.push(itemArr[m]);
				    			 newQtyArr.push(chQty);
				    			 newlocArr.push(locArr[m]);
				    			 newSerialArr.push(td);
				    			 serialUpdate.push(serialNumArr[m].toString().split(',').splice(0, 200));
					    			
				    			 break loop2;
			    			 }
			    			 else 
			    			 {
			    				 record.setLineItemValue('item','quantity',ch,qtyArr[m]);
				    			 record.setLineItemValue('item','itemreceive',ch,'T');
				    			 record.setLineItemValue('item','custcol_set_value',ch,'T');
				    			 
				    			 if(LocationLine != locArr[m])
				    			 {
				    				 record.setLineItemValue('item','location',ch,locArr[m]);
				    			 }
				    			
				    			 record.setLineItemValue('item','serialnumbers',ch,serialNumArr[m]);
				    			 serialUpdate.push(serialNumArr[m]);
				    			 break loop2;
			    			 }
			    			 
			    	 }
	    			 
	    		  
	    		  }
	          }
	
         }

	}
	
	 var SubmitIt=nlapiSubmitRecord(record,true);  
		
 nlapiLogExecution("DEBUG","In Create Function","IF Created ID..=="+SubmitIt);

 UpdateMap[SubmitIt]=serialUpdate;

		if(newItemArr != null && newItemArr !='' && newItemArr !=undefined)
		{
			callReccurenceToIFcreate(recId,newItemArr,newQtyArr,newlocArr,newSerialArr);
		}
		 

}

/*
function findTransaction(searchId,item,loc)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_itercomp_item', null,'anyOf',item);
	 filters[1]=new nlobjSearchFilter('custrecord_itercomp_loc', null,'anyOf',loc);
	 filters[2]=new nlobjSearchFilter('isinactive', null,'is','F');
	 filters[3]=new nlobjSearchFilter('custrecord_if_done', null,'is','F');
	 filters[4]=new nlobjSearchFilter('custrecord_itercomp_ref', null,'anyOf','301874');
	 
	savedSearch.addFilters(filters);
	   
	    var resultset = savedSearch.runSearch();
		var returnSearchResults = [];
	    var searchid = 0;
	    do {
    	
	        var resultslice = resultset.getResults(searchid, searchid + 1000);
	        if(resultslice!= null)
	        {
	    	   for ( var rs in resultslice) 
		        {
		        	returnSearchResults.push(resultslice[rs]);
		            searchid++;
		        }
	    	   nlapiLogExecution('DEBUG','searchid','searchid'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;

} */

function findTransaction(searchId,item,loc)
{
	
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('custrecord_itercomp_item', null,'anyOf',item);
	 filters[1]=new nlobjSearchFilter('custrecord_itercomp_loc', null,'anyOf',loc);
	 filters[2]=new nlobjSearchFilter('isinactive', null,'is','F');
	 filters[3]=new nlobjSearchFilter('custrecord_if_done', null,'is','F');
	// filters[4]=new nlobjSearchFilter('custrecord_itercomp_ref', null,'anyOf','301874');
	
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
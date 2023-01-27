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
function SCH_IR_createIntercompany(type)
{
	 try{
	
	var recId;
	var itemArr;
	var qtyArr;
	var locArr;
	var serialNumArr=[];
	var searchId='customsearch_main_serial_num_rec';
	
	 recId = nlapiGetContext().getSetting('SCRIPT','custscript_recid_po');
	 itemArr = nlapiGetContext().getSetting('SCRIPT','custscript_item_po');
	 qtyArr = nlapiGetContext().getSetting('SCRIPT','custscript_qty_po');
	 locArr = nlapiGetContext().getSetting('SCRIPT','custscript_loc_po');
	
	 itemArr=itemArr.split("");
	 qtyArr=qtyArr.split("");
	 locArr=locArr.split("");
	 
	 if(recId!= null && recId !='' && recId!=undefined)
		{	
			var so_ref_main =nlapiLookupField('purchaseorder',recId,'intercotransaction');
			nlapiLogExecution('DEBUG','sut_intercom_if','so_ref_main = '+so_ref_main);
		}
		
	 nlapiLogExecution('DEBUG','sut_intercom_Post','recId = '+recId);
	 nlapiLogExecution('DEBUG','sut_intercom_Post','itemArr = '+itemArr+' len ='+itemArr.length);
	 nlapiLogExecution('DEBUG','sut_intercom_Post','qtyArr = '+qtyArr+' len ='+qtyArr.length);
	 nlapiLogExecution('DEBUG','sut_intercom_Post','locArr = '+locArr+' len ='+locArr.length);
	
	 
	 var poid = 301874;
	 
	for (var m1=0;m1<itemArr.length;m1++)
	{

		var customrecord_intercompanySearch =findTransaction(searchId,itemArr[m1],so_ref_main);
		
		if(customrecord_intercompanySearch!=null && customrecord_intercompanySearch!=''&&customrecord_intercompanySearch!=undefined)
		{ 
			var serpostArr=[];
			for(var i = 1; i<=qtyArr[m1];i++)
		    {
				var serchserialno =customrecord_intercompanySearch[i-1].getValue('custrecord_if_ref');
				serpostArr.push(serchserialno);
		    }
		}
		
		serialNumArr.push(serpostArr);
		//nlapiLogExecution('DEBUG','sut_intercom_Post','serialNumArr = '+serpostArr);
	}
	
	
	
	
    
	
	// nlapiLogExecution('DEBUG','sut_intercom_Post','serialNumArr = '+serialNumArr);
	
	if(recId != null && recId !='')
	{
		var record = nlapiTransformRecord('purchaseorder', recId, 'itemreceipt');
		
		//record.setFieldValue('shipstatus','C');
		
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
			
	    nlapiLogExecution("DEBUG","In Create Function","IR Created ID..=="+SubmitIt);
	
	     UpdateMap[SubmitIt]=serialUpdate;
	 
			if(newItemArr != null && newItemArr !='' && newItemArr !=undefined)
			{
				callReccurenceToIRcreate(recId,newItemArr,newQtyArr,newlocArr,newSerialArr);
			}
			 
			
	}
	
	var chk = Object.keys(UpdateMap)
	
	nlapiLogExecution("DEBUG","In Create Function","The Final Log="+chk);
	
	for (var key in UpdateMap)
	{
		// nlapiLogExecution("DEBUG","In Create Function","key="+key+' CheckLne='+UpdateMap[key]);
		
		var noOfserial = UpdateMap[key].toString().split(',');
		nlapiLogExecution("DEBUG","In Create Function","noOfserial len"+noOfserial.length);
		for(var p=0;p<noOfserial.length;p++)
		{
			var customrecord_intercompanySearch = nlapiSearchRecord("customrecord_intercompany",null,
					[
					   ["isinactive","is","F"], 
					   "AND", 
					   ["custrecord_if_ref","is",noOfserial[p]],
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
					//	fieldArr[2]='custrecord_intercomp_ir_rec';
						fieldArr[2]='custrecord_ic_po_ref';
						fieldArr[3]='custrecord_ir_done';
						fieldArr[4]='custrecord_intercomp_ir_rec';
                        fieldArr[5]='isinactive';
                      
						var valueArr=[];
						valueArr[0]='';
						valueArr[1]=noOfserial[p].toString();
					//	valueArr[2]=key;
						valueArr[2]=recId;
						valueArr[3]='T';
                        valueArr[4]=key;
                        valueArr[5]='T';
					/*	
						
						var custRecObj = nlapiLoadRecord('customrecord_intercompany',recintId);
						custRecObj.setFieldValue('custrecord_if_ref',' ');
						custRecObj.setFieldValue('custrecord_ir_ref',serachserval.toString());
						custRecObj.setFieldValue('custrecord_ic_po_ref',recId);
						custRecObj.setFieldValue('custrecord_intercomp_ir_location',location);
						custRecObj.setFieldValue('custrecord_ir_done','T');
						var custID = nlapiSubmitRecord(custRecObj,true);
					*/
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
     
	  var subject = 'Intercompany Item Receipt';
      var body ="<!DOCTYPE html><html><body> Hi, <br><br>"+"Your Receipt orders and custom records are updated.<br><br>Thank you for your patience.<br><br>The total IR created :"+CheckVal+"<br><br>Best Regards,</body></html>";
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


function callReccurenceToIRcreate(recId,itemArr,qtyArr,locArr,serialNumArr)
{

	var record = nlapiTransformRecord('purchaseorder', recId, 'itemreceipt');
	
	// record.setFieldValue('shipstatus','C');
	
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
		
nlapiLogExecution("DEBUG","In Create Function","IR Created ID..=="+SubmitIt);

UpdateMap[SubmitIt]=serialUpdate;

		if(newItemArr != null && newItemArr !='' && newItemArr !=undefined)
		{
			callReccurenceToIRcreate1(recId,newItemArr,newQtyArr,newlocArr,newSerialArr);
		}
		 

}


function callReccurenceToIRcreate1(recId,itemArr,qtyArr,locArr,serialNumArr)
{

	var record = nlapiTransformRecord('purchaseorder', recId, 'itemreceipt');
	
	//record.setFieldValue('shipstatus','C');
	
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
		
 nlapiLogExecution("DEBUG","In Create Function","IR Created ID..=="+SubmitIt);

 UpdateMap[SubmitIt]=serialUpdate;

		if(newItemArr != null && newItemArr !='' && newItemArr !=undefined)
		{
			callReccurenceToIRcreate(recId,newItemArr,newQtyArr,newlocArr,newSerialArr);
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
	 filters[1]=new nlobjSearchFilter('internalidnumber','custrecord_intcom_so_ref','equalto',loc);
	 filters[2]=new nlobjSearchFilter('isinactive', null,'is','F');
	 filters[3]=new nlobjSearchFilter('custrecord_ir_done', null,'is','F');
	 filters[4]=new nlobjSearchFilter('mainline', 'custrecord_intcom_so_ref','is','T');
	 
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

}*/

function findTransaction(searchId,item,loc)
{
	
	var filters=new Array();
	filters[0]=new nlobjSearchFilter('custrecord_itercomp_item', null,'anyOf',item);
	 filters[1]=new nlobjSearchFilter('internalidnumber','custrecord_intcom_so_ref','equalto',loc);
	 filters[2]=new nlobjSearchFilter('isinactive', null,'is','F');
	 filters[3]=new nlobjSearchFilter('custrecord_ir_done', null,'is','F');
	 filters[4]=new nlobjSearchFilter('mainline', 'custrecord_intcom_so_ref','is','T');
	 
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
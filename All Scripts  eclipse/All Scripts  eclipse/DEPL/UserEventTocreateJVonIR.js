var date = new Date();
var idArr=[];
function userEventIRtoJVAfterSubmit(type)
{
	if(type == 'create' || type == 'edit')
	{
		var internalId = nlapiGetRecordId();
		var recType = nlapiGetRecordType();
		var amount;
		var account;
		var ipAcc;
		var accArr1 =new Array();
		var subsidiary;
		var amount_total=0.00;
		var amtArr =new Array();
		var amtArr1 = new Array();
		var accArr =new Array();
		
		var iarec=nlapiLoadRecord(recType,internalId);
		var count = iarec.getLineItemCount('item');
		var createdFrom=iarec.getFieldValue('createdfrom');
		
		var name=iarec.getFieldValue('entity');
		
       var createfromtxt = iarec.getFieldText('createdfrom');
		
		if(createdFrom != null || createdFrom != undefined)  
		{
		    nlapiLogExecution('DEBUG', 'aftr submit', "  createdFrom  ==" + createdFrom);
	    	nlapiLogExecution('DEBUG', 'before substring if', "createfromtxt  ==" + createfromtxt);
	     	if (createfromtxt.substr(0,20)== 'Return Authorization')
	    	{
	     		var form1 ='returnauthorization';
	     		var custForm = nlapiLookupField(form1,createdFrom,'customform');
	    		nlapiLogExecution('DEBUG', 'aftr submit', "  custForm  ==" + custForm);
	    	}
		}
		
		var clasArr=[];
		var deptArr =[];
		var routeArr=[];
		var locArr=[];
		
	//	if(custForm =='102')
		{

		for(var i=1;i<=count;i++)
	    {
			var itemType = nlapiLookupField('item', iarec.getLineItemValue('item', 'item', i), 'type');
			
			nlapiLogExecution('DEBUG','amount','itemType---'+itemType);
			
			if(itemType == 'InvtPart')
			{
			var projCategory =iarec.getLineItemValue('item','custcol_prj_categry',i); //	custcol_prj_categry
		
					  if(projCategory == '1')
						{
						var qty = iarec.getLineItemValue('item','quantity',i);
						
						var amount=iarec.getLineItemValue('item','custcol_itm_avg_cost_n',i);
						
						var amt= parseInt(qty) * parseFloat(amount);
					
						amtArr.push(amt);
						accArr.push(2098);
						
						
						var dept =iarec.getLineItemValue('item','department',i);
						var clas =iarec.getLineItemValue('item','class',i);
						var route =iarec.getLineItemValue('item','cseg1',i);
						var loc =iarec.getLineItemValue('item','location',i);
						
					    clasArr.push(clas);
					    deptArr.push(dept);
					    routeArr.push(route);
						locArr.push(loc);
						}
					  else
					  {
						    var qty = iarec.getLineItemValue('item','quantity',i);
							
							var amount=iarec.getLineItemValue('item','custcol_itm_avg_cost_n',i);
							
							var amt= parseInt(qty) * parseFloat(amount);
					    	//	var amt =150;
							amtArr1.push(amt);
							accArr1.push(2099);
							
							
							var dept =iarec.getLineItemValue('item','department',i);
							var clas =iarec.getLineItemValue('item','class',i);
							var route =iarec.getLineItemValue('item','cseg1',i);
							var loc =iarec.getLineItemValue('item','location',i);
							
						    clasArr.push(clas);
						    deptArr.push(dept);
						    routeArr.push(route);
						    locArr.push(loc);
					  }
			
			
			}	
	    }
		nlapiLogExecution('DEBUG','amount','accArr----'+accArr);
		nlapiLogExecution('DEBUG','amount','invConsumeAcc---'+accArr1);
		nlapiLogExecution('DEBUG','amount','amtArr---'+amtArr);
		nlapiLogExecution('DEBUG','amount','amtArr1---'+amtArr1);
		
		  var id = generateTransaction(internalId,amtArr,amtArr1,date,createdFrom,accArr,accArr1,clasArr,deptArr,routeArr,name,locArr);
		  idArr.push(id);
		
			if(idArr!= null && idArr != '' && idArr != undefined)
			{
				//nlapiSubmitField('itemfulfillment',internalId,'custbody_journal_no',ID);
				var IFObj = nlapiLoadRecord('itemreceipt',internalId);
				//jvArray[0]=ID;
				IFObj.setFieldValues('custbody_journal_no',idArr);
			
				nlapiSubmitRecord(IFObj,false,false);
			}
			
			var createfromtxt = iarec.getFieldText('createdfrom');
		
			if(createdFrom != null || createdFrom != undefined)  
			{
			    nlapiLogExecution('DEBUG', 'aftr submit', "  createdFrom  ==" + createdFrom);
		    	nlapiLogExecution('DEBUG', 'before substring if', "createfromtxt  ==" + createfromtxt);
		     	if (createfromtxt.substr(0,20)== 'Return Authorization')
		    	{
				var soObj = nlapiLoadRecord('returnauthorization',createdFrom);
				soObj.setFieldValues('custbody_journal_no',idArr);
				
				nlapiSubmitRecord(soObj,false,false);
		    	}	
			}
		}
	}//end of type create
	
	
}
function findIFDetails(searchId,internalId)
{
	var resultSet = nlapiLoadSearch('transaction', searchId); 
	var filters=new Array();
	var columns = new Array();
	filters[0] = new nlobjSearchFilter('internalid',null,'anyof',internalId);
	//filters[1] = new nlobjSearchFilter('custrecord_year_frm_parnt_recrd',null,'is',Year.toString());
	resultSet.addFilters(filters);
	var resultset = resultSet.runSearch();
	nlapiLogExecution('DEBUG', 'resultset in findEmpForQuotaDetails', 'resultset: '+resultset);
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
   return returnSearchResults;
}

function generateTransaction(internalId,amtArr,amtArr1,date,createdFrom,accArr,accArr1,clasArr,deptArr,routeArr,name,locArr)
{
 var finArr =[];
 var memo ='Cost Of Sales';
     if(accArr.length > 0)
	  {
	var jvArray = new Array();
	var jeRec = nlapiCreateRecord('journalentry');
	jeRec.setFieldValue('trandate',nlapiDateToString(date));
	//jeRec.setFieldValue('reversaldate',nlapiDateToString(activityDate));
	//jeRec.setFieldValue('subsidiary',subsidiary);
	jeRec.setFieldValue('custbody_if_num_on_je',createdFrom);
	// debit line
	jeRec.setFieldValue('custbody6','2');
	

	for(var k=1;k<=accArr.length;k++)
	{
		if(accArr[k-1] !=null && accArr[k-1] != undefined && accArr[k-1] !='' && accArr[k-1] =='2098')  // && ipAcc=='116'
		  {

			jeRec.selectNewLineItem('line');
			jeRec.setCurrentLineItemValue('line', 'account', 116 );
			jeRec.setCurrentLineItemValue('line', 'debit', amtArr[k-1]);
			if(clasArr[k-1] !=null && clasArr[k-1] != undefined && clasArr[k-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'class',  clasArr[k-1]);
			}
			
			if(deptArr[k-1] !=null && deptArr[k-1] != undefined && deptArr[k-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'department', deptArr[k-1]);
			}
			
			if(routeArr[k-1] !=null && routeArr[k-1] != undefined && routeArr[k-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'cseg1',  routeArr[k-1]);
			}
			
			if(name !=null && name != undefined && name !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'entity', name);//locArr
			}
			
			if( locArr[k-1] !=null &&  locArr[k-1] != undefined &&  locArr[k-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'location', locArr[k-1]);//locArr
			}
			
			jeRec.commitLineItem('line');

			// credit line
			jeRec.selectNewLineItem('line');
			jeRec.setCurrentLineItemValue('line', 'account',accArr[k-1]);
			jeRec.setCurrentLineItemValue('line', 'credit', amtArr[k-1]);
			if(clasArr[k-1] !=null && clasArr[k-1] != undefined && clasArr[k-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'class',  clasArr[k-1]);
			}
			
			if(deptArr[k-1] !=null && deptArr[k-1] != undefined && deptArr[k-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'department', deptArr[k-1]);
			}
			
			if(routeArr[k-1] !=null && routeArr[k-1] != undefined && routeArr[k-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'cseg1',  routeArr[k-1]);
			}
			
			if(name !=null && name != undefined && name !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'entity', name);//locArr
			}
			
			if( locArr[k-1] !=null &&  locArr[k-1] != undefined &&  locArr[k-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'location', locArr[k-1]);//locArr
			}
			
			jeRec.commitLineItem('line');
		  }
	
	}
	
	var ID = nlapiSubmitRecord(jeRec);	
	
	  finArr.push(ID);
	  }
   
     
     if(accArr1.length > 0)
	  {
	var jvArray = new Array();
	var jeRec = nlapiCreateRecord('journalentry');
	jeRec.setFieldValue('trandate',nlapiDateToString(date));
	//jeRec.setFieldValue('reversaldate',nlapiDateToString(activityDate));
	//jeRec.setFieldValue('subsidiary',subsidiary);
	jeRec.setFieldValue('custbody_if_num_on_je',createdFrom);
	// debit line
	jeRec.setFieldValue('custbody6','2');
	for(var m=1;m<=accArr1.length;m++)
	{
		if(accArr1[m-1] !=null && accArr1[m-1] != undefined && accArr1[m-1] !='' )  // && ipAcc=='116'
		  {

			jeRec.selectNewLineItem('line');
			jeRec.setCurrentLineItemValue('line', 'account',116);
			jeRec.setCurrentLineItemValue('line', 'debit',amtArr1[m-1]);
			if(clasArr[m-1] !=null && clasArr[m-1] != undefined && clasArr[m-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'class',  clasArr[m-1]);
			}
			
			if(deptArr[m-1] !=null && deptArr[m-1] != undefined && deptArr[m-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'department', deptArr[m-1]);
			}
			
			if(routeArr[m-1] !=null && routeArr[m-1] != undefined && routeArr[m-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'cseg1',  routeArr[m-1]);
			}
			
			if(name !=null && name != undefined && name !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'entity', name);//locArr
			}
			
			if( locArr[m-1] !=null &&  locArr[m-1] != undefined &&  locArr[m-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'location', locArr[m-1]);//locArr
			}
			
			jeRec.commitLineItem('line');

			// credit line
			jeRec.selectNewLineItem('line');
			jeRec.setCurrentLineItemValue('line', 'account', accArr1[m-1]);
			jeRec.setCurrentLineItemValue('line', 'credit', amtArr1[m-1]);
			if(clasArr[m-1] !=null && clasArr[m-1] != undefined && clasArr[m-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'class',  clasArr[m-1]);
			}
			
			if(deptArr[m-1] !=null && deptArr[m-1] != undefined && deptArr[m-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'department', deptArr[m-1]);
			}
			
			if(routeArr[m-1] !=null && routeArr[m-1] != undefined && routeArr[m-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'cseg1',  routeArr[m-1]);
			}
			
			if(name !=null && name != undefined && name !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'entity', name);//locArr
			}
			
			if( locArr[m-1] !=null &&  locArr[m-1] != undefined &&  locArr[m-1] !='') 
			{
				jeRec.setCurrentLineItemValue('line', 'location', locArr[m-1]);//locArr
			}
			
			jeRec.commitLineItem('line');
		  }
		
	}
	
	var ID1 = nlapiSubmitRecord(jeRec);	
	 finArr.push(ID1);
	  }
	
 return finArr;	
}

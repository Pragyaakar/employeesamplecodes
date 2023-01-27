/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 May 2019     AMOL ATPL
 *
 */

/**
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
var AUTHOR = '9';
var currntDate = new Date();
var Month = currntDate.getMonth();
Month = Month+1;
var Year = currntDate.getFullYear();
var day = currntDate.getDay();
var YearNow;// = currntDate.getFullYear();
var MonthNow;
var altSaleAmt = 0.00;	
var quota_cf=0.00;




if(Month == 1 || Month == 3 || Month == 5 || Month == 7 || Month == 8 || Month == 10 || Month == 12)
{
	var Day = 31;
	
}
else if(Month == 4 ||Month == 6 || Month == 9 ||Month == 11)
{
		var Day =30;
}
else if(Month == 2)
{
	if(Year % 4 == 0)
	{
		
		var Day = 29;
	}
	else
	{			
		var Day = 28;
		
	}
}
function empQtaFrmSutlet(type) 
{
	try {
	nlapiLogExecution('DEBUG', 'empQtaFrmSutlet', 'INSIDE empQtaFrmSutlet fun');
	var transItemSearchlength;
	var saleRep;
	var Start_year;
	var Start_month;
	var scrhObjCr;
	var transItemSearch;
	var jsonArray=[];
	var userId;
	
	salesRep = nlapiGetContext().getSetting('SCRIPT', 'custscript_sales_rep');
	//nlapiLogExecution('DEBUG', 'aftr submit', "  salesRep ==" + salesRep);
	
	scrhObjCr = nlapiGetContext().getSetting('SCRIPT','custscript_qtaid');
	//nlapiLogExecution('DEBUG', 'aftr submit', "  scrhObjCr  ==" + scrhObjCr);
	
	Start_year = nlapiGetContext().getSetting('SCRIPT','custscript_strt_year');	
	//nlapiLogExecution('DEBUG', 'aftr submit', "  strtYear  ==" + Start_year);
	
	Start_month = nlapiGetContext().getSetting('SCRIPT','custscript_mnth');	
	//nlapiLogExecution('DEBUG', 'aftr submit', "  Start_month  ==" + Start_month);
	
	userId = nlapiGetContext().getSetting('SCRIPT','custscript_user_id');	
	//nlapiLogExecution('DEBUG', 'userId', userId);
	
	var userName = nlapiLookupField('employee', userId, 'firstname');
	//nlapiLogExecution('DEBUG', 'userName', userName);
	
	var ParentQuotaChk =  nlapiGetContext().getSetting('SCRIPT','custscript_quotaamt');
	//nlapiLogExecution('DEBUG', 'ParentQuotaChk', ParentQuotaChk);
	
	var prQtaMain =ParentQuotaChk;
	
	var searchId = 'customsearch1926_2';
	transItemSearch = findTransaction(searchId,salesRep,Start_year,Start_month);
	//nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch length  ==" + transItemSearch.length);
	
	STartmonth=Start_month;
	
	if(transItemSearch)
	{
	
	   
		// nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch length  ==" + transItemSearch.length);
		
		for(var i=0;i<transItemSearch.length;i++)
	    {
			var jsonObj = {
					'date' :  transItemSearch[i].getValue("trandate","billingTransaction"),
					'saleAmt' : transItemSearch[i].getValue('altsalesamount'),
					'slsRep' :  transItemSearch[i].getValue('salesteammember'),
					'contri' :  transItemSearch[i].getValue('contribution'),
					'transactionnumber' :  transItemSearch[i].getValue('transactionnumber'),
					'period' :  transItemSearch[i].getText('postingperiod'), 
              		'recType' :  transItemSearch[i].getValue('type')
			    };
				jsonArray.push(jsonObj);
				
		}
		// nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray.length  ==" + jsonArray.length);
		var sorted_arr= [];
		 var amount=0;  
	    for(var l=0;l<jsonArray.length;l++)
	    {
	    	 
	    		var s = nlapiStringToDate(jsonArray[l].date);
	    		var mnth = s.getMonth() + 1 ;
	    	    
	     //   nlapiLogExecution('DEBUG', 'aftr submit', "  mnthNow  ==" + mnth);
	    	sorted_arr.push(mnth);
	    	//nlapiLogExecution('DEBUG', 'aftr submit', "  sorted_arr  ==" + sorted_arr);
	    //	nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray[l].period  ==" + jsonArray[l].period);
	    //	nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray[l].RecordType  ==" + jsonArray[l].recType);
	    //	nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray[l].slsRep  ==" + jsonArray[l].slsRep);
	    //	nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray[l].saleAmt  ==" +jsonArray[l].saleAmt );
	    
	      //
	    }
		 var itemArray  = sorted_arr.filter(function(item, pos){
	    	  return sorted_arr.indexOf(item)== pos; 
	    });
	    nlapiLogExecution('DEBUG', 'aftr submit', "  itemArray b4 looping  ==" + itemArray);
	    
	}//end of transacn search
	
	
	
	for(var mj1=0;mj1<itemArray.length;mj1++)
		{
		var fields1 = new Array();
		var values1 = new Array();
		fields1[0] = "custrecord10";
		fields1[1] = "custrecord12";
		
		fields1[2] = "custrecord9";
		fields1[3] = "custrecord11";
		
		
			for(var mj=Start_month-1;mj<12;mj++)
			{
				 var mon1 = parseFloat(mj) + parseFloat(1);
				
				 var idToupdate = findInternalID(scrhObjCr,mon1,Start_year);
				 // nlapiLogExecution('AUDIT','empQtaFrmSutlet','itemArray[mj1]=='+ itemArray[mj1]+'  mon1='+mon1);
					     var ValueToAdd =0;
					     
					     var dividMonth =parseFloat(12) - parseFloat(mj);
					    var NextMonthquota= parseFloat(prQtaMain)/parseFloat(dividMonth);
					     
			
					     if(mon1 <= itemArray[0])
					        {
					    	 
					    	    values1[0]= 0.00; // GP
					        	values1[1]= prQtaMain;//cryFwdBal
					        	values1[2]= NextMonthquota;
					        	values1[3]= NextMonthquota;
					        }
					        else 
					        {
					        	values1[0]= 0.00; // GP
					        	values1[1]= '';//cryFwdBal
					        	//values1[1]= ;
					        }
					  
					     nlapiSubmitField('customrecord449',idToupdate,fields1,values1);
							
				}
			
		}
	
	
 
	 nlapiLogExecution('AUDIT','empQtaFrmSutlet','First GP set to Zero');
	for(var k=0;k<itemArray.length;k++)
	 {
		 	altSaleAmt =0;
		    tempserialNumbers=' ';
			serialNumbers1 = '';
			allSerialNumbers = '';
			 var chk_mon;
			var contr ;
			 ValueToAdd=0;
			var FinValueToAdd=0;
			// nlapiLogExecution('AUDIT','empQtaFrmSutlet', 'jsonArray'+ jsonArray.length);
	           for(var j = 0 ; j < jsonArray.length ;j++)
			   { 	   
	        	   var remainingUsage = nlapiGetContext().getRemainingUsage();
       			if (remainingUsage < 500) {
       				nlapiYieldScript();
       			}
	        	   nlapiLogExecution('EMERGENCY', 'J', j);
	        	   var m1 =  nlapiStringToDate(jsonArray[j].date);
      		       var mon1 = m1.getMonth() + 1 ;
	        	 //  nlapiLogExecution('DEBUG', 'aftr submit', "  chk_mon  ==" + chk_mon);
				 
				// nlapiLogExecution('DEBUG', 'aftr submit', "  mon1  ==" + mon1 + " itemArray[k] =="+ itemArray[k]); 
				 
				 
				   if( mon1 == itemArray[k])
	        	   {
	        		   altSaleAmt+=parseFloat(jsonArray[j].saleAmt);
	        		
	        		   contr =parseFloat(jsonArray[j].contri);
	        		   
	        		   ValueToAdd = contr /100 * parseFloat(altSaleAmt)
	        		   
	        		  // FinValueToAdd =  parseFloat(FinValueToAdd) + parseFloat(ValueToAdd);
	        		   findEmpQuotaDetails(scrhObjCr,mon1,currntDate,ValueToAdd,Start_year,k,quota_cf,Start_month);
	        		   
	        		  /* var remainingUsage = nlapiGetContext().getRemainingUsage();
	        			if (remainingUsage < 500) {
	        				nlapiYieldScript();
	        			}*/
	        	   }
	        	  
			   }//inner for loop closed
	           //  nlapiLogExecution('DEBUG', 'aftr submit', "  mon1  ==" + mon1);
	          
	      
	 }//outer for loop closed
	
		//nlapiSendEmail(AUTHOR, AUTHOR, 'Employee Quota Process-Notification', 'Dear '+userName+',<br/>Employee Quota Process has been Completed. Please Verify.<br/>Thanks.');
} catch (e) {
	nlapiLogExecution('ERROR', 'Error Occured', e.message);
	//nlapiSendEmail(AUTHOR, AUTHOR, 'Employee Quota Process-Notification', 'Dear '+userName+',<br/>Error occurred in Employee Quota Process.</br>'+e.message+' <br/>Please Verify.<br/>Thanks.');
}
 
}
function findTransaction(searchId,salesRep,Start_year,Start_month)
{

	nlapiLogExecution('DEBUG', 'findTransaction', 'INSIDE findTransaction fun');
	
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	// nlapiLogExecution('DEBUG','searchid','searchId:'+searchId);
	//var salesRep ='2938';
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	
	var startDate = ''+Start_month+'/1/'+Start_year+'';
	var EndDate= '12/'+Day+'/'+Start_year+'';
    
	 nlapiLogExecution('DEBUG','searchid','startDate:'+startDate);
	 nlapiLogExecution('DEBUG','searchid','EndDate:'+EndDate);
		
		var filters=new Array();
		filters[0]=new nlobjSearchFilter('salesteammember', null,'anyof',salesRep);
		 nlapiLogExecution('DEBUG','searchid','salesRep:'+salesRep);
		filters[1] = new nlobjSearchFilter('trandate', 'billingTransaction', 'onorbefore', EndDate);//trandate
		filters[2] = new nlobjSearchFilter('trandate', 'billingTransaction', 'onorafter',startDate);//trandate
		savedSearch.addFilters(filters);
		   
		    var resultset = savedSearch.runSearch();
			var returnSearchResults = [];
		    var searchid = 0;
		    //nlapiLogExecution('AUDIT', 'findTransaction', 'resultslice.length:'+resultslice.length);
		    do {
		    	var lastLimit = searchid + 1000;
		        var resultslice = resultset.getResults(searchid, lastLimit);
		        if(resultslice!= null)
		        {
		        	nlapiLogExecution('AUDIT', 'resultslice', resultslice.length);
		    	   for ( var rs in resultslice) 
			        {
			        	returnSearchResults.push(resultslice[rs]);
			            searchid = lastLimit;
			        }
		    	//   nlapiLogExecution('DEBUG','searchid','searchid:'+searchid);
		        }
		        
		    } while (resultslice.length >= 1000);//while (resultslice!=null && resultslice>0);
		   // nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
		  
		    return returnSearchResults;
}

function findCR(salesRep,Start_year)
{
	nlapiLogExecution('DEBUG', 'findCR', 'INSIDE findCR fun');
	var filters=new Array();
	var columns = new Array();
	var recrddID;
 // 	nlapiLogExecution('DEBUG', 'After Submit value of salesRep', "  value of salesRep ==" + salesRep);
//	nlapiLogExecution('DEBUG', 'After Submit value of Year', "  value of year ==" + Start_year);
	filters[0] = new nlobjSearchFilter('custrecord_employee',null,'anyof',salesRep);
	filters[1] = new nlobjSearchFilter('custrecord_year_text', null,'is',Start_year.toString());
	//filters[2] = new nlobjSearchFilter('custrecord_osi_emp_qta_status', null, 'anyof',2); 
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_employee');
	var searchResultItem = nlapiSearchRecord('customrecord445', null, filters, columns);
   
	if (searchResultItem != null)
	{
		for(var j=0;j<searchResultItem.length;j++)
		{
			recrddID = searchResultItem[j].getValue('internalid');
       //   nlapiLogExecution('DEBUG', 'After Submit value of recrddID', "  value of recrddID ==" + recrddID);
         /*
           var remainingUsage = nlapiGetContext().getRemainingUsage();
		  		if (remainingUsage < 500) 
		  		{
		  			nlapiYieldScript();
		  		}
		 */
		}
	}
	return recrddID;
}

function findEmpPrevQuotaDetails(scrhObjCr,oldMonth,Start_year)
{
	nlapiLogExecution('DEBUG', 'findEmpPrevQuotaDetails', 'INSIDE findEmpPrevQuotaDetails fun');
  var filters=new Array();
	var columns = new Array();
  filters[0] = new nlobjSearchFilter('custrecord7',null,'anyof',scrhObjCr);
	filters[1] = new nlobjSearchFilter('custrecord8',null,'anyof',oldMonth);
	filters[2] = new nlobjSearchFilter('custrecord_year_frm_parnt_recrd',null,'is',Start_year.toString());
  columns[0] = new nlobjSearchColumn('custrecord12');
  columns[1] = new nlobjSearchColumn('internalid');
  var searchResultItem = nlapiSearchRecord('customrecord449', null, filters, columns);
	//nlapiLogExecution('DEBUG', 'After Submit value of intrnalId', "  searchResultItem.len ==" + searchResultItem.length);
	var new_carry =0.00;
	var CFBal;
	if (searchResultItem != null)
	{
		// nlapiLogExecution('AUDIT', 'findEmpPrevQuotaDetails', 'searchResultItem.length:'+searchResultItem.length);
		for(var k=0;k<searchResultItem.length;k++)
		{	
			intrnalId = searchResultItem[k].getValue('internalid');
		// nlapiLogExecution('DEBUG', 'After Submit value of intrnalId', "  intrnalId ==" + intrnalId);
			 CFBal = searchResultItem[k].getValue('custrecord12');
			
			/* var remainingUsage = nlapiGetContext().getRemainingUsage();
				if (remainingUsage < 500) {
					nlapiYieldScript();
				}*/
        }
		nlapiLogExecution('DEBUG', 'After Submit value of currntDate', " intrnalId==" + intrnalId);
		nlapiLogExecution('DEBUG', 'After Submit value of currntDate', " oldMonth==" + oldMonth);
		nlapiLogExecution('DEBUG', 'After Submit value of currntDate', " CFBal==" + CFBal);
		 return CFBal;
    }
	
	
}


function findEmpQuotaDetails(scrhObjCr,mon,currntDate,amount,Start_year,k,quota_cf,Start_month)
{

	nlapiLogExecution('DEBUG', 'findEmpQuotaDetails', 'INSIDE findEmpQuotaDetails fun');
  
//	 nlapiLogExecution('DEBUG', 'After Submit value of recrddID', "  value of EmpQuotaID in totalMnth is ==" + totalMnth);
//	nlapiLogExecution('DEBUG', 'After Submit value of recrddID', "  value of EmpQuotaID in function is k ==" + k);
 //   nlapiLogExecution('DEBUG', 'After Submit value of recrddID', "  value of EmpQuotaID in function is ==" + mon);
//	nlapiLogExecution('DEBUG', 'After Submit value of Month', "  value of Month in function is ==" + mon);
	//nlapiLogExecution('DEBUG', 'After Submit value of currntDate', "  value of amount is ==" + amount);
	// nlapiLogExecution('DEBUG', 'After Submit value of currntDate', "  value of scrhObjCr is ==" + scrhObjCr);
 
	var oldMonth= parseInt(mon) - parseInt(1);
	var old_cf_bal = findEmpPrevQuotaDetails(scrhObjCr,oldMonth,Start_year);
	
	  if(old_cf_bal=='' || old_cf_bal=='' || old_cf_bal=='' )
		{
		   for (var jm =0;jm < oldMonth;jm++)
		    {
			     oldMonth--;
			  
			        	 old_cf_bal = findEmpPrevQuotaDetails(scrhObjCr,oldMonth,Start_year);
						 
					     if(old_cf_bal != undefined && old_cf_bal !='' && old_cf_bal != null)
						 {
						   break;
						 }  
		    }
		}
 
	   nlapiLogExecution('DEBUG', 'After Submit value of Month', "  value of Month in function is old month ==" + oldMonth);
	   nlapiLogExecution('DEBUG', 'After Submit value of currntDate', "  findEmpPrevQuotaDetails value of old_cf_bal is ==" + old_cf_bal);
		
	   
    var filters=new Array();
	var columns = new Array();
	var totalMnth=12;
	var balance=0.0;
	var quotaAmt;
	var qout;
	var GP=0.0;
	var intrnalId;	
	var count =0;
	var carry_arr=[];
	var fields = new Array();
	var values = new Array();
	fields[0] = "custrecord10";
	fields[1] = "custrecord11";
	fields[2] = "custrecord12";
	//fields[3] = "custrecord10";
	
	filters[0] = new nlobjSearchFilter('custrecord7',null,'anyof',scrhObjCr);
	filters[1] = new nlobjSearchFilter('custrecord8',null,'anyof',mon);
	filters[2] = new nlobjSearchFilter('custrecord_year_frm_parnt_recrd',null,'is',Start_year.toString());

	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord8');
	columns[2] = new nlobjSearchColumn('custrecord9');
	columns[3] = new nlobjSearchColumn('custrecord11');
	columns[4] = new nlobjSearchColumn('custrecord13');
	columns[5] = new nlobjSearchColumn('custrecord10');
	columns[6] = new nlobjSearchColumn('custrecord_parnt_quota');
	columns[7] = new nlobjSearchColumn('custrecord12');
	columns[8] = new nlobjSearchColumn('custrecord7');
	
	var searchResultItem = nlapiSearchRecord('customrecord449', null, filters, columns);
	// nlapiLogExecution('DEBUG', 'After Submit value of intrnalId', "  searchResultItem.len ==" + searchResultItem.length);
	
	var new_carry =0.00;
	if (searchResultItem != null)
	{
		//nlapiLogExecution('AUDIT', 'findEmpQuotaDetails', 'searchResultItem:'+JSON.stringify(searchResultItem));
		//nlapiLogExecution('AUDIT', 'findEmpQuotaDetails', 'searchResultItem.length:'+searchResultItem.length);
		for(var k=0;k<searchResultItem.length;k++)
		{	
			intrnalId = searchResultItem[k].getValue('internalid');
		
		//	nlapiLogExecution('DEBUG', 'After Submit value of intrnalId', "  intrnalId ==" + intrnalId);
			GP = searchResultItem[k].getValue('custrecord10');
		//	nlapiLogExecution('DEBUG', 'After Submit value of GP', "  GP ==" + GP);
			quotaAmt = searchResultItem[k].getValue('custrecord9');
		//	nlapiLogExecution('DEBUG', 'After Submit value of quotaAmt', "  quotaAmt ==" + quotaAmt);
			var QuotaPrnt = searchResultItem[k].getValue('custrecord7');
		//	nlapiLogExecution('DEBUG', 'After Submit value of QuotaPrnt', "  QuotaPrnt ==" + QuotaPrnt);
			
			var quota_cf = old_cf_bal;
			var par_quota =searchResultItem[k].getValue('custrecord_parnt_quota');
		//	nlapiLogExecution('DEBUG', 'After Submit value of quota_cf', "  quota_cf ==" + quota_cf);
		//	nlapiLogExecution('DEBUG', 'After Submit value of quota_cf', "  GP ==" + GP);
			
		var GP1=nlapiLookupField('customrecord449',intrnalId,fields);
		 var chk_gp =GP1.custrecord10;
		
			//  nlapiLogExecution('DEBUG', 'After Submit value of quota_cf', "***GP1==" + chk_gp);
		
		
				if(GP == null || GP == '' || GP == 'undefined')
				{
					GP=0.00
					GP = parseFloat(GP)+parseFloat(amount);
				}
				
				if(GP != null && quotaAmt != null)
				{
					GP=parseFloat(amount);
					balance = parseFloat(quotaAmt) - parseFloat(GP);
				}
				
				
			}//end of for loop
			
		if(chk_gp != GP)
		
		{

			//Code to verify in case the Balance is greater than the Monthly Quota value
		  if(GP > quotaAmt || GP < quotaAmt || GP == quotaAmt)
			{
				balance = quotaAmt - GP;
				//qout =quotaAmt - balance;
				
				
			//	nlapiLogExecution('DEBUG', 'balance', 'balance : '+balance);
			       
				if(Start_month == mon)
				{
					cryFwdBal = parseFloat(par_quota)- parseFloat(GP);
					// nlapiLogExecution('DEBUG', 'cryFwdBal', 'cryFwdBal : '+cryFwdBal);
				}
				else
				{
					var rmng = totalMnth - mon + parseInt(1);
					// nlapiLogExecution('DEBUG', 'After Submit value of quota_cf', "  quota_cf ==" + quota_cf);
					// nlapiLogExecution('DEBUG', 'After Submit value of quota_cf', "  GP ==" + GP);
					cryFwdBal = parseFloat(quota_cf)- parseFloat(GP);
					// nlapiLogExecution('DEBUG', 'cryFwdBal', 'cryFwdBal : '+cryFwdBal);	
					
					// nlapiLogExecution('DEBUG', 'cryFwdBal', 'quota_cf : '+quota_cf);	
					// nlapiLogExecution('DEBUG', 'cryFwdBal', 'rmngMnth'+rmng);	
					var chk =  parseFloat(quota_cf) / rmng;
					// nlapiLogExecution('DEBUG', 'cryFwdBal', 'chk'+chk);	
					
					balance = parseFloat(chk) - parseFloat(GP);
					// nlapiLogExecution('DEBUG', 'cryFwdBal', 'balance '+balance );	
					
					 nlapiSubmitField('customrecord449',intrnalId,'custrecord11',balance);
					nlapiSubmitField('customrecord449',intrnalId,'custrecord9',chk);
					
				}
				
				rmngMnth = totalMnth - mon;
			//	nlapiLogExecution('DEBUG', 'rmngMnth', 'rmngMnth : '+rmngMnth);
				rmngMnthValue = parseFloat(cryFwdBal)/rmngMnth;
				//value to be set in the remaining month logic
			
				var nextMonth = mon + 1;
				filAmtinRemnMnth(rmngMnth,rmngMnthValue,QuotaPrnt,nextMonth,cryFwdBal,GP);
			}
		
		    values[0]= GP;
			values[1]= balance;
			values[2]= cryFwdBal;
			
	    	nlapiSubmitField('customrecord449',intrnalId,fields,values);
	    	/*var remainingUsage = nlapiGetContext().getRemainingUsage();
			if (remainingUsage < 500) 
			{
				nlapiYieldScript();
			}*/
		
		}
	
	}//end of search length
	
}
function filAmtinRemnMnth(rmngMnth,rmngMnthValue,QuotaPrnt,nextMonth,cryFwdBal,GP)
{
	nlapiLogExecution('DEBUG', 'filAmtinRemnMnth', 'INSIDE filAmtinRemnMnth fun')
/*	nlapiLogExecution('DEBUG', 'filAmtinRemnMnth', 'rmngMnth : '+rmngMnth);
	nlapiLogExecution('DEBUG', 'filAmtinRemnMnth', 'rmngMnthValue : '+rmngMnthValue);
	nlapiLogExecution('DEBUG', 'filAmtinRemnMnth', 'QuotaPrnt : '+QuotaPrnt);
	nlapiLogExecution('DEBUG', 'filAmtinRemnMnth', 'nextMonth : '+nextMonth);
	nlapiLogExecution('DEBUG', 'filAmtinRemnMnth', 'cryFwdBal : '+cryFwdBal);*/
	var mnthTotal = 12;
	if(rmngMnth <= mnthTotal)
	{
		var filters=new Array();
		var columns = new Array();
		var intrnalId;
		var month_srch;
		var balance=0.0;
		var quotaAmt;
		var GP=0.0;
		var intrnalId;	
		var fields = new Array();
		var values = new Array();
		
		fields[0] = "custrecord10";
		fields[1] = "custrecord11";
		fields[2] = "custrecord13";
		
		// nlapiLogExecution('AUDIT', 'filAmtinRemnMnth', 'mnthTotal:'+mnthTotal);
		for(var g=nextMonth;g<=mnthTotal;g++)
		{
			filters[0] = new nlobjSearchFilter('custrecord7',null,'anyof',QuotaPrnt);
			filters[1] = new nlobjSearchFilter('custrecord8',null,'anyof',nextMonth);
			columns[0] = new nlobjSearchColumn('internalid');
			columns[1] = new nlobjSearchColumn('custrecord8');
			columns[2] = new nlobjSearchColumn('custrecord9');
			columns[3] = new nlobjSearchColumn('custrecord12');
			
			var searchResultItem = nlapiSearchRecord('customrecord449', null, filters, columns);
			if (searchResultItem != null)
			{
				var newcarry_fw=0.00;
				//nlapiLogExecution('AUDIT', 'filAmtinRemnMnth', 'searchResultItem.length:'+searchResultItem.length);
				for(var k=0;k<searchResultItem.length;k++)
				{
					//var rm_value=0.00;
					intrnalId = searchResultItem[k].getValue('internalid');
					// nlapiLogExecution('DEBUG','intrnalId','intrnalId in filamtinremmnth'+intrnalId);
					month_srch = searchResultItem[k].getValue('custrecord8');
				// 	nlapiLogExecution('DEBUG','month_srch','month_srch in filamtinremmnth'+month_srch);
					var cur_mon_qouta =searchResultItem[k].getValue('custrecord9');
				//	nlapiLogExecution('DEBUG','month_srch','month_srch in cur_mon_qouta'+cur_mon_qouta);
					
					var cfval =searchResultItem[k].getValue('custrecord12');
				
					if(month_srch == nextMonth)
					{
						//rm_value=parseFloat(rmngMnthValue)+parseFloat(cur_mon_qouta);
						nlapiSubmitField('customrecord449',intrnalId,'custrecord9',rmngMnthValue);
				       if(GP ==null ||GP=='')
				       {
						var bal=parseFloat(rmngMnthValue);
						nlapiSubmitField('customrecord449',intrnalId,'custrecord11',bal);
				       }
					}
					/*else
					{
						rmngMnthValue = parseFloat(cfval)/rmngMnth;
						nlapiSubmitField('customrecord449',intrnalId,'custrecord9',rmngMnthValue);
					}*/
					/*var remainingUsage = nlapiGetContext().getRemainingUsage();
					if (remainingUsage < 500) {
						nlapiYieldScript();
					}*/
				}//end of for
			}//serch reslt end
			nextMonth = nextMonth +1;
		}//end of for loop
	
	}
}

//============================= My change to fill cf n GP for prev ======
function findInternalID(scrhObjCr,oldMonth,Start_year)
{
	// nlapiLogExecution('DEBUG', 'findEmpPrevQuotaDetails', 'INSIDE findEmpPrevQuotaDetails fun');
  var filters=new Array();
	var columns = new Array();
  filters[0] = new nlobjSearchFilter('custrecord7',null,'anyof',scrhObjCr);
	filters[1] = new nlobjSearchFilter('custrecord8',null,'anyof',oldMonth);
	filters[2] = new nlobjSearchFilter('custrecord_year_frm_parnt_recrd',null,'is',Start_year.toString());
  columns[0] = new nlobjSearchColumn('custrecord12');
  columns[1] = new nlobjSearchColumn('internalid');
  var searchResultItem = nlapiSearchRecord('customrecord449', null, filters, columns);
	//nlapiLogExecution('DEBUG', 'After Submit value of intrnalId', "  searchResultItem.len ==" + searchResultItem.length);
	var new_carry =0.00;
	var CFBal;
	if (searchResultItem != null)
	{
		// nlapiLogExecution('AUDIT', 'findEmpPrevQuotaDetails', 'searchResultItem.length:'+searchResultItem.length);
		for(var k=0;k<searchResultItem.length;k++)
		{	
			intrnalId = searchResultItem[k].getValue('internalid');
		// nlapiLogExecution('DEBUG', 'After Submit value of intrnalId', "  intrnalId ==" + intrnalId);
			 CFBal = searchResultItem[k].getValue('custrecord12');
			
			/* var remainingUsage = nlapiGetContext().getRemainingUsage();
				if (remainingUsage < 500) {
					nlapiYieldScript();
				}*/
        }
		// nlapiLogExecution('DEBUG', 'After Submit value of currntDate', " CFBal==" + CFBal);
		 return intrnalId;
    }
	
	
}

//=============================================================================
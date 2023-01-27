/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       30 Oct 2018     User
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
var currntDate = new Date();
var Month = currntDate.getMonth();

function CreateQuotauserEventAfterSubmit(type)
{
  var recId;
  var recType;
  var recObj;
  var month;
  var noOfMonths = 12;
  var QuotainErlermonth =0.0;
  var Quota_to_beset;
  var employee;
  var status;
  var Quota;
  var monthCalculated;
  var year;
  var parntYear;
  var i;
  // To check the status and create the Quota Details
  recId = nlapiGetRecordId();
  recType = nlapiGetRecordType();
  
  recObj = nlapiLoadRecord(recType,recId);
  
  employee = recObj.getFieldValue('custrecord_employee');
  nlapiLogExecution('DEBUG', 'After Submit', "  employee ==" + employee);
  
  status = recObj.getFieldValue('custrecord_osi_emp_qta_status');
  nlapiLogExecution('DEBUG', 'After Submit', "  status ==" + status);
  
  month = recObj.getFieldValue('custrecord_osi_emp_qta_strt_mnth');
  nlapiLogExecution('DEBUG', 'After Submit', "  month ==" + month);
  
  Quota= recObj.getFieldValue('custrecord_quota');
  nlapiLogExecution('DEBUG', 'After Submit', "  Quota ==" + Quota);
  
  year= recObj.getFieldValue('custrecord_year');
  nlapiLogExecution('DEBUG', 'After Submit', "  year ==" + year);
  
  var yearTxt = recObj.getFieldText('custrecord_year');
  nlapiLogExecution('DEBUG', 'After Submit', "  yearTxt ==" + yearTxt);
  if(yearTxt)
   {
     recObj.setFieldValue('custrecord_year_text',yearTxt)
   }
   parntYear= recObj.getFieldText('custrecord_year');
  nlapiLogExecution('DEBUG', 'After Submit', "  parntYear ==" + parntYear);
  
  if(status == 2)
  {
	  var getResult = findRecordAvailable(employee,month,year);
	  nlapiLogExecution('DEBUG', 'After Submit', "  getResult ==" + getResult);
	  if(getResult ==1)
	  {
		 var serchRslt = findRecordAvailableInEmpQtaDetail(recId);
		  
	  }	   
	  if(serchRslt == 0)
	  {
		  nlapiLogExecution('DEBUG', 'After Submit', "  monthCalculated ==" + noOfMonths);
		  if(month)
		  monthCalculated = noOfMonths - month; 
		  nlapiLogExecution('DEBUG', 'After Submit', "  monthCalculated ==" + monthCalculated);
		  
		  if(monthCalculated == 0)
		  {
			  i=0;
			  createEmpQotaDetailRec(month,Quota,recId,currntDate,year,employee,Quota,parntYear);
			  
		  }
		  else
		  {
			  i=monthCalculated;
			  createEmpQotaDetailRec(i,month,Quota,recId,currntDate,year,employee,Quota,parntYear);
            //createEmpQotaDetailRec(k,Quota,recId,currntDate,year,employee,Quota,parntYear)

		  }
	  }
	  
  }//end of status chk
  
}
function findRecordAvailable(employee,month,year)
{
	var filters=new Array();
	var columns = new Array();
	
	filters[0] = new nlobjSearchFilter('custrecord_employee',null,'anyof',employee);
	filters[1] = new nlobjSearchFilter('custrecord_osi_emp_qta_strt_mnth', null, 'anyof',month); 
	filters[2] = new nlobjSearchFilter('custrecord_year', null, 'anyof',year); 
	columns[0] = new nlobjSearchColumn('internalid'); 
	var searchResultItem = nlapiSearchRecord('customrecord445', null, filters, columns);
	nlapiLogExecution('DEBUG', 'After Submit', "  searchResultItem ==" + searchResultItem);
	if (searchResultItem != null)
	{
		return 1;	
	}	
	else
	{
		return 0
	}
}
function findRecordAvailableInEmpQtaDetail(recId)
{
	var filters=new Array();
	var columns = new Array();
	
       filters[0] = new nlobjSearchFilter('custrecord7',null,'anyof',recId);
	////filters[0] = new nlobjSearchFilter('custrecord_sales_rep',null,'anyof',employee);	custrecord7
	//filters[1] = new nlobjSearchFilter('custrecord8', null, 'anyof',month); 
	//	filters[2] = new nlobjSearchFilter('custrecord_year_parnt_year', null, 'anyof',year); 
	columns[0] = new nlobjSearchColumn('internalid'); 
	var searchResultItem = nlapiSearchRecord('customrecord449', null, filters, columns);
	nlapiLogExecution('DEBUG', 'After Submit', "  searchResultItem ==" + searchResultItem);
	if(searchResultItem ==null)
		return 0;

}
function createEmpQotaDetailRec(k,month,Quota,recId,currntDate,year,employee,Quota,parntYear)
{
	var bal=0;
	var GP=0;
	if(k==0)
	{
		n=1;
	}
	else
	{
		n=month;
	}
	var QuotaCalc=0.0;
		if(Quota)
		{
          var tmnth = parseInt(k)+parseInt(1);
			QuotaCalc = parseFloat(Quota)/tmnth;//.toFixed(2)
			bal = QuotaCalc - GP;
		}
		nlapiLogExecution('DEBUG', 'After Submit', "  value of n ==" + n);
        nlapiLogExecution('DEBUG', 'After Submit', "  value of Year ==" + parntYear);
		var recEmpQutObj;
  var flag =1;
		for(var j=n;j<=12;j++)
		{
			if(j==n)
			{
				recEmpQutObj = nlapiCreateRecord('customrecord449');
				recEmpQutObj.setFieldValue('custrecord8',j);
				recEmpQutObj.setFieldValue('custrecord9',QuotaCalc.toFixed(2));
				recEmpQutObj.setFieldValue('custrecord7',recId);
				recEmpQutObj.setFieldValue('custrecord11',QuotaCalc.toFixed(2));
				recEmpQutObj.setFieldValue('custrecord_year_frm_parnt_recrd',parntYear);
                recEmpQutObj.setFieldValue('custrecord_year_parnt_year',year);
				recEmpQutObj.setFieldValue('custrecord_sales_rep',employee);
				recEmpQutObj.setFieldValue('custrecord_parnt_quota',Quota);
				recEmpQutObj.setFieldValue('custrecord13',nlapiDateToString(currntDate));
              if(flag ==1)
               {
                 recEmpQutObj.setFieldValue('custrecord12',Quota);
                 flag =0;
               }
				n++;
			}
			else
			{
				recEmpQutObj = nlapiCreateRecord('customrecord449');
				recEmpQutObj.setFieldValue('custrecord8',j);
				recEmpQutObj.setFieldValue('custrecord9',0.0);
				recEmpQutObj.setFieldValue('custrecord7',recId);
				recEmpQutObj.setFieldValue('custrecord11',QuotaCalc.toFixed(2));
				recEmpQutObj.setFieldValue('custrecord_year_frm_parnt_recrd',parntYear);
                recEmpQutObj.setFieldValue('custrecord_year_parnt_year',year);
				recEmpQutObj.setFieldValue('custrecord_sales_rep',employee);
				recEmpQutObj.setFieldValue('custrecord_parnt_quota',Quota);
				recEmpQutObj.setFieldValue('custrecord13',nlapiDateToString(currntDate));
			}
			nlapiSubmitRecord(recEmpQutObj,true,true);
		}//end of for loop
	
}
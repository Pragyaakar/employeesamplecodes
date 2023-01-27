	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       24 Sep 2019     Priyanka Patil
	 *
	 */
	
	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType 
	 * 
	 * @param {String} type Access mode: create, copy, edit
	 * @returns {Void}
	 */
	
	function afterSubmit_SalesReporting()
	{
		try
		{
			var wonYTD_TotalArray = [];
			var won_DateArray = [];
			var won_CurrenyArray = [];
			var wonYTD_InternalIDArray = [];
			var new_WeekArray = [];
			var weekNumberArray = [];
			var getFullYrArray = [];
			
			var recordId = nlapiGetRecordId();
			var recordType = nlapiGetRecordType();
			
		    var recObj = nlapiLoadRecord(recordType,recordId);
			nlapiLogExecution('DEBUG','Serach Value','irObj :'+recObj +'Type :'+recordType+'ID :'+recordId);
			
			var WonYTD_Search = nlapiSearchRecord("opportunity","customsearch_won_opportnty_ytd",
					[
					   ["closedate","within","thisyear"], 
					   "AND", 
					   ["entitystatus","anyof","14","13","15"]
					], 
					[
					   new nlobjSearchColumn("trandate",null,"GROUP").setSort(false), 
					   new nlobjSearchColumn("foreignprojectedamount",null,"SUM"), 
					   new nlobjSearchColumn("currency",null,"GROUP"), 
					   new nlobjSearchColumn("internalid",null,"GROUP")
					]
					);
			
			nlapiLogExecution('DEBUG','Weighted Pipeline Search','WonYTD_Search.length '+WonYTD_Search.length);
			
			
			for (var i = 0;  i < WonYTD_Search.length; i++) 
			{
				var wonYTD_InternalID  = WonYTD_Search[i].getValue("internalid",null,"GROUP");
				wonYTD_InternalIDArray.push(wonYTD_InternalID);
				nlapiLogExecution('DEBUG','Weighted Pipeline Search','wonYTD_InternalID '+wonYTD_InternalID);
				
				var newInterID = serachInternalID(wonYTD_InternalID);
				nlapiLogExecution('DEBUG','Weighted Pipeline Search','newInterID '+newInterID);
				
				if(newInterID != null && newInterID != '')
				{
					nlapiLogExecution('DEBUG','Weighted Pipeline Search','newInterID in if'+newInterID);
				}
				
				var wonYTD_Total  = WonYTD_Search[i].getValue("foreignprojectedamount",null,"SUM");
				wonYTD_TotalArray.push(wonYTD_Total);
				//nlapiLogExecution('DEBUG','Weighted Pipeline Search','wonYTD_Total '+wonYTD_Total);
				
				var won_Date  = WonYTD_Search[i].getValue("trandate",null,"GROUP");
				won_DateArray.push(won_Date);
				//nlapiLogExecution('DEBUG','Weighted Pipeline Search','won_Date '+won_Date);
				
				var findWeek = nlapiStringToDate(won_Date);
				//nlapiLogExecution('DEBUG','Weighted Pipeline Search','findWeek '+findWeek);
				
				var firstDate = new Date(findWeek.getFullYear(),findWeek.getMonth(),1);
				var firstDay = firstDate.getDay();
				//nlapiLogExecution('DEBUG','Search Result','firstDay is :='+firstDay);
				
				var getFullYr = findWeek.getFullYear();
				getFullYrArray.push(getFullYr);
				//nlapiLogExecution('DEBUG','Search Result','getFullYr is :='+getFullYr);
				
				var weekNumber = Math.ceil((findWeek.getDate() + firstDay) / 7);
				weekNumberArray.push(weekNumber);
				
				//nlapiLogExecution('DEBUG','Search Result','weekNumber is :='+weekNumber);
				
				var new_Week = weekNumber +' Week '+ getFullYr +' Year';
				new_WeekArray.push(new_Week);
				
				var won_Curreny  = WonYTD_Search[i].getValue("currency",null,"GROUP");
				won_CurrenyArray.push(won_Curreny);
				//nlapiLogExecution('DEBUG','Weighted Pipeline Search','won_Curreny '+won_Curreny);
			}
			createSalesReportingRecord(wonYTD_InternalIDArray,wonYTD_TotalArray,won_DateArray,won_CurrenyArray,weekNumberArray,getFullYrArray)
			//createSalesReportingRecord(wonYTD_Total,won_Date,won_Curreny)
		}
		catch(e)
		{
			nlapiLogExecution('DEBUG','ErrorLog','Exeption '+e);
		}
	}
	
	function createSalesReportingRecord(wonYTD_InternalIDArray,wonYTD_TotalArray,won_DateArray,won_CurrenyArray,weekNumberArray,getFullYrArray)
	{
		try
		{
			nlapiLogExecution('DEBUG', 'set values in CustomRecord', "Create Custom Record For Sales Reporting************" );
			nlapiLogExecution('DEBUG','Weighted Pipeline Search','wonYTD_TotalArray in function'+wonYTD_TotalArray);
			
			var o_b2cObj = nlapiCreateRecord('customrecord354',{recordmode: 'dynamic'});
			
			var lineCount = o_b2cObj.getLineItemCount('recmachcustrecord_sale_reprt_details_head');
			//nlapiLogExecution('DEBUG','Weighted Pipeline Search','lineCount in function'+lineCount);
			
				for(var p=1;p<=wonYTD_TotalArray.length;p++)
				{
					nlapiLogExecution('DEBUG','Weighted Pipeline Search','wonYTD_TotalArray.length in function'+wonYTD_TotalArray.length);
					
					o_b2cObj.selectLineItem('recmachcustrecord_sale_reprt_details_head',p);
					
					o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecordsales_reporting_internal_id',wonYTD_InternalIDArray[p-1]);
					//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "wonYTD_InternalIDArray done ==" +wonYTD_InternalIDArray[p-1]);
					
					o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_salesreporting_wonytd',wonYTD_TotalArray[p-1]);
					//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "weighted_Total done ==" +wonYTD_TotalArray[p-1]);
					
					o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_salesreporting_date',won_DateArray[p-1]);
					//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "won_DateArray done ==" +won_DateArray[p-1]);
					
					o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_salesreporting_week',parseInt(weekNumberArray[p-1]));
					//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "weekNumber done ==" +weekNumberArray[p-1]);
					
					o_b2cObj.setCurrentLineItemValue('recmachcustrecord_sale_reprt_details_head','custrecord_year',parseInt(getFullYrArray[p-1]));
					//nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "weighted_Total done ==" +getFullYrArray[p-1]);
					
					o_b2cObj.commitLineItem('recmachcustrecord_sale_reprt_details_head');
					nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "commit LineLevel Item ==");
				}
			
			var record =  nlapiSubmitRecord(o_b2cObj,true);
			nlapiLogExecution('Debug', 'record IS Created..', "record id " + record);
			
		}
		catch(e)
		{
			nlapiLogExecution('DEBUG','ErrorLog','Exeption in Create Record'+e);
		}
	}
	
	function serachInternalID(wonYTD_InternalID)
	{
		nlapiLogExecution('DEBUG','ErrorLog','wonYTD_InternalIDArray in new function'+wonYTD_InternalID);
		
		var customrecord354Search = nlapiSearchRecord("customrecord354","customsearch678",
				[
					["custrecord_sale_reprt_details_head.custrecordsales_reporting_internal_id","anyof",wonYTD_InternalID]
				], 
				[
				   new nlobjSearchColumn("scriptid"), 
				   new nlobjSearchColumn("custrecord_salesreporting_annual_target"), 
				   new nlobjSearchColumn("custrecord_salesreporting_fullpipeline"), 
				   new nlobjSearchColumn("custrecord_salesreporting_date","CUSTRECORD_SALE_REPRT_DETAILS_HEAD",null), 
				   new nlobjSearchColumn("custrecordsales_reporting_internal_id","CUSTRECORD_SALE_REPRT_DETAILS_HEAD",null)
				]
				);
		    return customrecord354Search;
	} 
	
	function getWeekOfMonth(s) 
	{
		var startWeekDayIndex = 1; 
		// 1 MonthDay 0 Sundays
		var firstDate = new Date(findWeek.getFullYear(),findWeek.getMonth(),1);
		var firstDay = firstDate.getDay();
		nlapiLogExecution('DEBUG','Search Result','firstDay is :='+firstDay);
		
		var getFullYr = findWeek.getFullYear();
		nlapiLogExecution('DEBUG','Search Result','getFullYr is :='+getFullYr);
		
		var weekNumber = Math.ceil((findWeek.getDate() + firstDay) / 7);
		nlapiLogExecution('DEBUG','Search Result','weekNumber is :='+weekNumber);
		
		if (startWeekDayIndex == 1) 
		{ 
			if (s.getDay() == 0 && s.getDate() > 1) 
			{ 
				weekNumber -= 1;
				nlapiLogExecution('DEBUG','Search Result','weekNumber is A*************:='+weekNumber);
			} 
			if (firstDate.getDate() == 1 && firstDay == 0 && s.getDate() > 1) 
			{ 
				weekNumber += 1; 
				nlapiLogExecution('DEBUG','Search Result','weekNumber is B*************:='+weekNumber);
			}
		}
		return weekNumber;
	}
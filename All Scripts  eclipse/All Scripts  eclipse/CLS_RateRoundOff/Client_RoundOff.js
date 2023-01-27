/**
 * 
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */
define(

function(require)
{

	var SSEntryPoint = (typeof SSEntryPoint === 'undefined') ? {} : SSEntryPoint;
	var record = require('N/record');
	/**
	 * Function to be executed after page is initialized.
	 *
	 * @param {Object} scriptContext
	 * @param {Record} scriptContext.currentRecord - Current form record
	 * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
	 *
	 * @since 2015.2
	 */
	SSEntryPoint.pageInit = function(scriptContext)
	{
		try
		{
			var stTitleLog = 'SSEntryPoint.pageInit';
			console.log(stTitleLog, '**** START ****');

			var currentRec = scriptContext.currentRecord;
			var strSublistId = scriptContext.sublistId

			var strRecId = currentRec.id;
			var strRecType = currentRec.type;
		}
		catch (e)
		{
			var stErrorTitle = stTitleLog;
			console.log(stErrorTitle, 'ERROR', JSON.stringify(e));

		}

		console.log(stTitleLog, '**** END ****');
	}

	/**
	 * Function to be executed when field is changed.
	 *
	 * @param {Object} scriptContext
	 * @param {Record} scriptContext.currentRecord - Current form record
	 * @param {string} scriptContext.sublistId - Sublist name
	 * @param {string} scriptContext.fieldId - Field name
	 * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
	 * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
	 *
	 * @since 2015.2
	 */
	SSEntryPoint.fieldChanged = function(scriptContext)
	{
		try
		{
			var stTitleLog = 'SSEntryPoint.fieldChanged';
			console.log(stTitleLog, '**** START ****');

			var currentRec = scriptContext.currentRecord;
			var strSublistId = scriptContext.sublistId
			var strFieldId = scriptContext.fieldId
			var strLine = scriptContext.line

			var strRecId = currentRec.id;
			var strRecType = currentRec.type;

			var strSalesRep = '';
			if (strFieldId == 'custbody_sales_rep_exp' || strFieldId == 'salesrep')
			{
				if (strRecType == record.Type.VENDOR_BILL || strRecType == record.Type.PURCHASE_ORDER || strRecType == record.Type.SALES_ORDER)
				{
					strSalesRep = currentRec.getText({ fieldId : strFieldId });
					currentRec.setValue({ fieldId : 'custbody_commission_sales_rep', value : strSalesRep });
				}
			}
		}
		catch (e)
		{
			var stErrorTitle = stTitleLog;
			console.log(stErrorTitle, 'ERROR', JSON.stringify(e));

		}
		console.log(stTitleLog, '**** END ****');

	}

	/**
	 * Validation function to be executed when sublist line is committed.
	 *
	 * @param {Object} scriptContext
	 * @param {Record} scriptContext.currentRecord - Current form record
	 * @param {string} scriptContext.sublistId - Sublist name
	 *
	 * @returns {boolean} Return true if sublist line is valid
	 *
	 * @since 2015.2
	 */
	SSEntryPoint.validateLine = function(scriptContext)
	{
		try
		{ 
			//var userObj = runtime.getCurrentUser();
			var stTitleLog = 'SSEntryPoint.validateLine';
			console.log(stTitleLog, '**** START ****');

			var currentRec = scriptContext.currentRecord;
			var strSublistId = scriptContext.sublistId

			var strRecId = currentRec.id;
			var strRecType = currentRec.type;

			if (strRecType == record.Type.VENDOR_BILL || strRecType == record.Type.PURCHASE_ORDER) return true;

			var strRateeFieldId = 'rate';
			var strCostEstimateFieldId = 'costestimate';
			var strCostPecentageFieldId = 'custcol_item_cost_percentage';

			var strRate = currentRec.getCurrentSublistValue({ sublistId : strSublistId, fieldId : strRateeFieldId });
			var strCostEstimate = currentRec.getCurrentSublistValue({ sublistId : strSublistId, fieldId : strCostEstimateFieldId });
			var strCostPercentage = currentRec.getCurrentSublistValue({ sublistId : strSublistId, fieldId : strCostPecentageFieldId });

			console.log('strCostEstimate', strCostEstimate, 'strCostPercentage', strCostPercentage);

			if (strRate && strRate != '') return true;
			if (!strCostEstimate || strCostEstimate == '') return true;
			if (!strCostPercentage || strCostPercentage == '') return true;

			var strItemCost = (strCostEstimate * strCostPercentage) / 100;
			strItemCost = parseFloat(strCostEstimate) + parseFloat(strItemCost);
            
		//	if(userObj == '12729')
			{
				var RoundRate = parseFloat(strItemCost).toFixed(2);
				console.log('RoundRate', RoundRate);
			
			}
			
			alert('RoundRate ='+RoundRate);
			console.log('strItemCost', strItemCost);
			currentRec.setCurrentSublistValue({ sublistId : strSublistId, fieldId : 'rate', value : RoundRate });

			return true;
		}
		catch (e)
		{
			var stErrorTitle = stTitleLog;
			console.log(stErrorTitle, 'ERROR', JSON.stringify(e));

		}
		console.log(stTitleLog, '**** END ****');
	}

	function getUrlValue(strVarSearch)
	{
		var strSearchString = window.location.search.substring(1);
		var arrVariableArray = strSearchString.split('&');
		for (var i = 0; i < arrVariableArray.length; i++)
		{
			var strKeyValuePair = arrVariableArray[i].split('=');
			if (strKeyValuePair[0] == strVarSearch)
			{
				return strKeyValuePair[1];

			}
		}
		return '';
	}

	return SSEntryPoint;

});

/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       08 Aug 2019     AMOL ATPL
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit
 *                      approve, reject, cancel (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF)
 *                      markcomplete (Call, Task)
 *                      reassign (Case)
 *                      editforecast (Opp, Estimate)
 * @returns {Void}
 */
function FAuserEventBeforeSubmit(type)
{
	var assetParent;
	var project;
	var depreciationActive='2';
	//TO get the details from the Asset Record
	assetParent = nlapiGetFieldValue('custrecord_assetparent');
	if(assetParent!=null && assetParent != '' && assetParent != undefined)
	{
		project = nlapiGetFieldValue('custrecord_assetproject');
		if(project!=null && project != '' && project != undefined)
		{
			nlapiSetFieldValue('custrecord_assetdepractive',depreciationActive);
		}
	}
	return true;
}

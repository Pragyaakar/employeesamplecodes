/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 May 2019     Shivraj
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type)
{
	if(type == 'edit')
	{
	var vapInternalId = nlapiGetFieldValue('custbody_custom_trans_id');
	// alert('vapInternalId ' +vapInternalId);
	var advPreApplied;
	}
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord(){

    return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientAdvancePaidFC(type, name, linenum)
{
  if (name=='usertotal')
	{
	var advancePaid = nlapiGetFieldValue('usertotal');
	//alert('value ' +advancePaid);
	nlapiSetFieldValue('custbody_advance_amount',advancePaid,null,true);
	}
}

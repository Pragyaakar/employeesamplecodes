/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Jun 2019     Tushar
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

var Flag;
function saveRecsetBlankValue()
{
	if (confirm("Please Confirm with the Exchange Rate!")) {
		Flag=true;
	  } else {
		  Flag=false;
	  }
 return  Flag;
}
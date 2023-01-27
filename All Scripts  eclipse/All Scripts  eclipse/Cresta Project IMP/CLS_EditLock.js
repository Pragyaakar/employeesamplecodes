/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 Jun 2019     AMOL ATPL
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
var flag;
var flagType;
function setFieldonPageInit(type)
{
	flag = type;
   if(type == 'edit')
   {
	   var recId = nlapiGetRecordId();
	   var fields = new Array();
	   var values = new Array();
	   
	   fields[0]='custbody_user_on_edit';	   
	   fields[1] = 'custbody_edit_on';
	      
	   var user = nlapiGetFieldValue('custbody_user_on_edit');
	 //  alert('user is'+user);
	   var editon = nlapiGetFieldValue('custbody_edit_on');
	 //  alert('editon is'+editon);
	   if((user == '' || user == undefined || user == null)&&(editon == null ||editon == 'F' ))
		{
		   values[0] = nlapiGetUser();
		   values[1] = "T";
		 //  alert('I am in check')
		  //   alert('USer IS :='+nlapiGetUser())
		   //nlapiSetFieldValue('custbody_user_on_edit',nlapiGetUser());
		   //nlapiSetFieldValue('custbody_edit_on','T');
		   nlapiSubmitField('salesorder', recId, fields, values);
		   
		}
	   flagType=type;
   }
   return true;
}
function saveRecsetBlankValue()
{
	// alert('flag =='+flagType)
   if(flagType == 'edit')
   {
	   var recId = nlapiGetRecordId();
	   var fields = new Array();
	   var values = new Array();
	   
	   fields[0]='custbody_user_on_edit';	   
	   fields[1] = 'custbody_edit_on';
	      
	   var user = nlapiGetFieldValue('custbody_user_on_edit');
	  // alert('user is'+user);
	   var editon = nlapiGetFieldValue('custbody_edit_on');
	 //  alert('editon is'+editon);
	 //  if((user != '' || user != undefined || user != null)&&(editon != null ||editon != 'F' ))
		{
		   values[0] = null;
		   values[1] = "F";
		//   alert('I am in check')
		   //nlapiSetFieldValue('custbody_user_on_edit',nlapiGetUser());
		   //nlapiSetFieldValue('custbody_edit_on','T');
		   nlapiSubmitField('salesorder', recId, fields, values);
		   
		}
   }
   return true;
}

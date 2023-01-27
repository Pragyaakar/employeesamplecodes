/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       10 Dec 2019     Tushar
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
function nonDistributorsFieldDisable(type, form, request)
{
	try
	{
		 if(type=='create' || type == 'edit' || type=='view')
      	{ 
            
             nlapiLogExecution('DEBUG', 'In '+type+'mode ', "  Field Disabled  ==");
            
                 var BodyField = nlapiGetField('category');
                 BodyField.setDisplayType('disabled'); 
     	                      
                 var BodyField1 = nlapiGetField('printoncheckas');   
                 BodyField1.setDisplayType('disabled'); 
               
                  var BodyField2 =nlapiGetField('image');     
                  BodyField2.setDisplayType('disabled'); 
                  
          /*        var BodyField3 =nlapiGetField('url');     
                  BodyField3.setDisplayType('disabled'); 
                 
                  var BodyField4 =nlapiGetField('taxidnum');     
                  BodyField4.setDisplayType('disabled'); 
     		*/
          }
	}
	catch(e)
	{
		nlapiLogExecution('DEBUG', 'After Submit value of lineId', "  Error ==" +e);
		
	}
	 
}
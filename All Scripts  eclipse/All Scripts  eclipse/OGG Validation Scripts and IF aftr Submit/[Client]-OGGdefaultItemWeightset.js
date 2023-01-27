		/**
		 * Module Description
		 * 
		 * Version    Date            Author           Remarks
		 * 1.00       11 Mar 2020    Tushar
		 *
		 */
		
		/**
		 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
		 * @appliedtorecord recordType 
		 * 
		 * @param {String} type Access mode: create, copy, edit
		 * @returns {Void}
		 */

function pageInit_itemWeight(type)
		{
		   
		   if(type == 'create')
		   {
			   var user = nlapiGetUser(); 
			 //  if(user==1972)
			   {
			  
			      nlapiLogExecution('DEBUG','BeforeSubmitEmailValidate()', "user = "+user);
			     
			    
				     nlapiSetFieldValue('weightunit',3);
				   }
			  
		   }
		} 
		
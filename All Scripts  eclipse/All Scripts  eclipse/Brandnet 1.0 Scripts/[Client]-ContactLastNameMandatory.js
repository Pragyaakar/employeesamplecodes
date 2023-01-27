	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       3 Mar 2020     Tushar More
	 *
	 */
	
	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType
	 * 
	 * @param {String} type Sublist internal id
	 * @param {String} name Field internal id
	 * @param {Number} linenum Optional line item number, starts from 1
	 * @returns {Void}
	 */
	
	
		
	function onSaveValidation(type)
	{
		var flag = true;
		var lastNameField = nlapiGetFieldValue('lastname');
	    
	    if (lastNameField == null || lastNameField == '' || lastNameField == undefined)
	    {
	    	alert('Please Enter the Last Name..');
	    	flag =false;
	    	
	    }
	    
	    return flag;
	}
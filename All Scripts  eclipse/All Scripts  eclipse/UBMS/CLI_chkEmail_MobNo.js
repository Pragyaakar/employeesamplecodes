/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       23 Oct 2018     User
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Boolean} True to continue changing field value, false to abort value change
 */

var flag = true;
var typeFlag;
function validEMailMobCheckPageInit(type)
{
	typeFlag = type;
}
function validEmail_Mob()
{	
    return flag;
    
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
function clientFieldChanged(type, name, linenum)
{
	 if(name == 'custentity_cntry')
	    {
			var phneArray1;
	    	var MobArray1;
	    	var filters =new Array();
		    var columns  = new Array();
		    var MobCode2 = new Array();
			var phneCode2 = new Array();
			
	       	var country = nlapiGetFieldValue('custentity_cntry');
	       	if(country)
	       	{
	       		var Id = nlapiLookupField('customrecord_country_list',country,'custrecord_cntry_name');
	       		//alert('country Id is--'+Id);
	       		if(Id != 'KZ')
	       		{
	       			
	       			var fgl = findPhoneAndMobileDetailsforCountry(Id);
	       			typeFlag = fgl;
	   		
	   	         //var mobNo = nlapiGetFieldText('custentity_mobile');
	   	    	var mobNo = nlapiGetFieldValue('custentity_mobile');
	   	    	mobstrnlength = mobNo.toString().length;
				
				var phneCodeCapturd2;
				var moblCode2;
				var alwdcde2;
				var allowdnoOfDigits2 = new Array();
				filters [0] = new nlobjSearchFilter('custrecord_country_id',null,'is',Id);
				columns [0] = new nlobjSearchColumn('custrecord_international_code');
				columns[1] = new nlobjSearchColumn('custrecord_mobile_prefix');
				columns [2] = new nlobjSearchColumn('custrecord_allowd_digits');
				var searchResultItem2 = nlapiSearchRecord('customrecord_phone_validation', null, filters, columns);
			   if (searchResultItem2 != null)
			   {
				for(var k=0;k<searchResultItem2.length;k++)
				{
					moblCode2 = searchResultItem2[k].getValue('custrecord_international_code');
					MobCode2.push(moblCode2);
					//nlapiLogExecution('DEBUG','MobCode','MobCode in filamtinremmnth'+MobCode);
		            phneCodeCapturd2 = searchResultItem2[k].getValue('custrecord_mobile_prefix');
					phneCode2.push(phneCodeCapturd2);
					alwdcde2 = searchResultItem2[k].getValue('custrecord_allowd_digits');
					allowdnoOfDigits2.push(alwdcde2);
					//nlapiLogExecution('DEBUG','alwdCode','alwdCode in filamtinremmnth'+alwdCode);
					
					
				  }
				
			  }
			
				var concat="+"+MobCode2[0];
				nlapiSetFieldValue('custentity_mobile',concat,false,false);
				//alert('MobCodes:--'+phneCode2);
				nlapiSetFieldValue('custentity_allw_mobnumcode',phneCode2.toString(),false,false);
				return flag;
	       		}
	       		else
	       		{
	       			flag = false;
	       			return flag;
	       		}
	       	}
	    }
	 
    if(name == 'email')
    {
		var country = nlapiGetFieldValue('custentity_cntry');
		var Id = nlapiLookupField('customrecord_country_list',country,'custrecord_cntry_name');
   		//alert('country Id is--'+Id);
   		
   		if(Id != 'KZ')
   		{
    	var emailExst;
    	var email = nlapiGetFieldValue('email'); 
    	//alert('email is--'+email);
    	//to get the value after @
    	if(email)
    	{

    		emailExst = checkEmailinCustomer(email);
    		if(emailExst == 1)
    		{
    			alert('There is already an email ID associated with an existing customer. Please enter new email address');
    			typeFlag = false;
    		}
    		else if(emailExst == 0)
    	       {
    	           var valueAftrat = email.indexOf('@');
    	           var n =valueAftrat+parseInt(1);
    		    	//alert('valueAftrat is--'+n);
    		    	var totalLengthOfString = email.toString().length;    
    		    	
    		  //  alert('totalLengthOfString is--'+totalLengthOfString);
    		    	var emailToValidate = email.substring(n , totalLengthOfString);
    		    //	alert('emailToValidate is--'+emailToValidate  );
    		    	//to check if the entered email is valid or not
    		    	var getEmailChek = findEmail(emailToValidate);
    		    	if(getEmailChek == '0')
    		    	{
    		    		var cnfrm = confirm("Do you want to add the email to Record Y / N");
    		        	if (cnfrm == true)
    		        	{
    		        		var recObj = nlapiCreateRecord('customrecord_email_validation')
    		        		recObj.setFieldValue('custrecord_value_aftr_atrate',emailToValidate);
    		        		nlapiSubmitRecord(recObj,true,false);
    		        	//	alert('Email added in the Repository')
    		        		typeFlag = true;
    		        	}
    		        	else 
    		        	{
    		              alert('Enter the valid email Address in order to save the record');
    		              nlapiSetFieldValue('email',"");
    		            
    		              typeFlag = false;
    		        	}//end of else
    		    	}//end of email chk
    	      }//end of email valid chk   
    	}    	
   		}
   		else{
   			return false;
   		}
    }//end of name = email check
 /*   if(name == 'phone')
    {
    	var country = nlapiGetFieldValue('custentity_cntry');
		var Id = nlapiLookupField('customrecord_country_list',country,'custrecord_cntry_name');
   		// alert('country Id is--'+Id);
   		
   		if(Id != 'KZ')
   		{
    	var phneArray;
    	var MobArray;
    	var filters =new Array();
	    var columns  = new Array();
	    var MobCode1 = new Array();
		var phneCode1 = new Array();
    	var country = nlapiGetFieldValue('custentity_cntry');
    	if(country)
    	{
    		var Id = nlapiLookupField('customrecord_country_list',country,'custrecord_cntry_name');
    	  //	alert('country Id is--'+Id);
    		if(Id)
    		{
				var fgl = findPhoneAndMobileDetailsforCountry(Id);
				typeFlag = fgl;
    			
			var phone = nlapiGetFieldValue('phone');
			var phoneLngth = phone.toString().length;
			
			
			var phneCodeCapturd1;
			var moblCode1;
			var alwdcde1;
			var allowdnoOfDigits1 = new Array();
			filters [0] = new nlobjSearchFilter('custrecord_country_id',null,'is',Id);
			columns [0] = new nlobjSearchColumn('custrecord_international_code');
			columns[1] = new nlobjSearchColumn('custrecord_mobile_prefix');
			columns [2] = new nlobjSearchColumn('custrecord_allowd_digits');
			var searchResultItem1 = nlapiSearchRecord('customrecord_phone_validation', null, filters, columns);
		if (searchResultItem1 != null)
		{
			for(var k=0;k<searchResultItem1.length;k++)
			{
				moblCode1 = searchResultItem1[k].getValue('custrecord_international_code');
				MobCode1.push(moblCode1);
				//nlapiLogExecution('DEBUG','MobCode','MobCode in filamtinremmnth'+MobCode);
	            phneCodeCapturd1 = searchResultItem1[k].getValue('custrecord_mobile_prefix');
				phneCode1.push(phneCodeCapturd1);
				alwdcde1 = searchResultItem1[k].getValue('custrecord_allowd_digits');
				allowdnoOfDigits1.push(alwdcde1);
				//nlapiLogExecution('DEBUG','alwdCode','alwdCode in filamtinremmnth'+alwdCode);
				
				
			}
			
		}
			
			var d=parseInt(allowdnoOfDigits1[0]);
			var e =parseInt(moblCode1[0].length);
	        var f = parseInt(phneCode1[0].length);
		    
			var concat="+"+MobCode1[0]+phneCode1[0];
			nlapiSetFieldValue('phone',concat,false,false);
			
			var p = d+e+f+parseInt(1);
			if(phoneLngth!=p)
			{
				alert('NOT allowed...... You have entered Invalid Length which is : '+phoneLngth+'....Please Enter Allowed Phone Length for Your country Is: '+p+' ..Do not delete the country code...Give the proper Area code like:'+concat+','+"+"+MobCode1[1]+phneCode1[1]);
			}
			else
			{
    		if(phone)
    		{   
    			var mobNo;
    			var phnxst = findIfPhoneExist(Id,phone,mobNo);
    			if(phnxst == 1)
    			{
    				alert('There is already an phone number associated with an existing customer. Please enter new phone number')
    				
    			}
    			else
    			{ 
    				if(Id != 'CA')
    				{
	    				var phoneId=['AF','AR','AU','AT','BE','BR','IC','CL','CX','CC','CO','CU','DK','EG','FR','DE','GR','GG','HU','IN','ID','IM','IT','JP','JE','MY','MX','MM','NL','NZ','NO','PK','PE','PH','PL','RO','SG','ZA','ES','LK','SE','CH','TH','TR','GB','VE','VN',];
	    				var countryId = phoneId.includes(Id);
	    				//alert('countryId is'+countryId);
	    				if(countryId == true)
	    				{
	    					var phoneCode = phone.substring(1,3);
	    				}	
	    				else 
	   					{ 
	    					var phoneCode = phone.substring(1,4);
	   					}
    				}
    				else 
    					{
    						var phoneCode = phone.substring(0,1);
    					}
   						
   				}
    				
    				var phneDetails= findMatchforMobandPhone(Id,phoneCode,phoneLngth);
    			}
    	    	
    		else
    		{
    			if(Id)
        		{
    				var fgl = findPhoneAndMobileDetailsforCountry(Id);
    				typeFlag = fgl;
        		}
    		}
    	}
			
		}//end of else when phone number==10digits
    		
    	}
    	else{
    		return false;
    	}
    }//end of name chk phone
	
    }
   */
    if(name == 'custentity_mobile')
    {

    	var country = nlapiGetFieldValue('custentity_cntry');
		var Id = nlapiLookupField('customrecord_country_list',country,'custrecord_cntry_name');
   	//	alert('country Id is--'+Id);
   		
   		if(Id != 'KZ')
   		{
		var phneArray1;
    	var MobArray1;
    	var filters =new Array();
	    var columns  = new Array();
	    var MobCode2 = new Array();
		var phneCode2 = new Array();
		
       	var country = nlapiGetFieldValue('custentity_cntry');
       	if(country)
       	{
       		var Id = nlapiLookupField('customrecord_country_list',country,'custrecord_cntry_name');
       	//	alert('country Id is--'+Id);
       		if(Id)
       		{
       			
       			var fgl = findPhoneAndMobileDetailsforCountry(Id);
       			typeFlag = fgl;
   		
   	         //var mobNo = nlapiGetFieldText('custentity_mobile');
   	    	var mobNo = nlapiGetFieldValue('custentity_mobile');
   	    	mobstrnlength = mobNo.toString().length;
			
			var phneCodeCapturd2;
			var moblCode2;
			var alwdcde2;
			var allowdnoOfDigits2 = new Array();
			filters [0] = new nlobjSearchFilter('custrecord_country_id',null,'is',Id);
			columns [0] = new nlobjSearchColumn('custrecord_international_code');
			columns[1] = new nlobjSearchColumn('custrecord_mobile_prefix');
			columns [2] = new nlobjSearchColumn('custrecord_allowd_digits');
			var searchResultItem2 = nlapiSearchRecord('customrecord_phone_validation', null, filters, columns);
		if (searchResultItem2 != null)
		{
			for(var k=0;k<searchResultItem2.length;k++)
			{
				moblCode2 = searchResultItem2[k].getValue('custrecord_international_code');
				MobCode2.push(moblCode2);
				//nlapiLogExecution('DEBUG','MobCode','MobCode in filamtinremmnth'+MobCode);
	            phneCodeCapturd2 = searchResultItem2[k].getValue('custrecord_mobile_prefix');
				phneCode2.push(phneCodeCapturd2);
				alwdcde2 = searchResultItem2[k].getValue('custrecord_allowd_digits');
				allowdnoOfDigits2.push(alwdcde2);
				//nlapiLogExecution('DEBUG','alwdCode','alwdCode in filamtinremmnth'+alwdCode);
			}
			
		}
			
			var d1 = parseInt(allowdnoOfDigits2[0]);
			var e1 = parseInt(MobCode2[0].length);
			var f1 = parseInt(phneCode2[0].length);
		    
			var concat="+"+MobCode2[0];
			nlapiSetFieldValue('custentity_mobile',concat,false,false);
			nlapiSetFieldValue('custentity_allw_mobnumcode',phneCode2.toString(),false,false);//custentity_allw_mobnumcode
			
				var result = mobNo.replace(/[- )(]/g,'');
			
		//	alert('Result  --'+result);
			
			var p1 = d1+e1+parseInt(1);
			var lengthOfResult =result.length;
			if(lengthOfResult != p1 )
			{
				alert('NOT allowed ... You have entered Invalid Length which is: '+lengthOfResult+' ..Please Enter Allowed Mobile Length for your country Is : '+p1+' ..Do not delete the country code...Give the proper Area code like:'+concat);
				nlapiSetFieldValue('custentity_mobile',mobNo,false,false);
				flag = false
				return flag;
			}
			else{
   	    	//alert('mobNo is'+mobNo);
   	    	if(mobNo)
   	    	{
   	    		var mobexst = findIfPhoneExist(Id,phone,mobNo);
   	    		if(mobexst == 1)
   				{
   					alert('There is already an phone number associated with an existing customer. Please enter new phone number')
   					flag = false
   					return flag;
   				}
   				else
   				{
   					if(Id != 'CA')
   					{
   						var mobileId=['AF','AR','AU','AT','BE','BR','IC','CL','CX','CC','CO','CU','DK','EG','FR','DE','GR','GG','HU','IN','ID','IM','IT','JP','JE','MY','MX','MM','NL','NZ','NO','PK','PE','PH','PL','RO','SG','SY','ZA','ES','LK','SE','CH','TH','TR','GB','VE','VN',];
   						var country_Id = mobileId.includes(Id)
   						//alert('countryId is'+country_Id);
   						if(country_Id == true)
   						{
   							var mobPhneCode = mobNo.substring(1,3);
   						}
   						else 
   						{
   							var mobPhneCode = mobNo.substring(1,4);
   						}
   					}
   					else  
   					{
						var mobPhneCode = mobNo.substring(1,2);
					}
   				}
   				
   					//var mobPhnestrng = mobNo.toString();
   					//mobPhneCode = mobNo.substring(1,4);		
   	              //  alert('mobPhneCode is'+mobPhneCode);
   					
   					var mobDetails= findMatchforMobandPhone(Id,mobPhneCode,mobstrnlength,mobNo,concat);
   					typeFlag = mobDetails;
   				}
   	    	}//end of code for mobno
   	   }//end of iD chk
   	   else
   	   {
   				if(Id)
   	    		{
   	    			var fgl = findPhoneAndMobileDetailsforCountry(Id);
   	    			typeFlag = fgl;
   	    		}
   	    }
		}//end of else length chek
   		}
   		else
   		{
   			flag = false
			return flag;
   		}
   	 }//end of name chk mobile
      return typeFlag;
    
 }
 

function findMatchforMobandPhone(Id,code,length,mobNo,concat)
{
	var filters=new Array();
	var columns = new Array();
	filters[0] = new nlobjSearchFilter('custrecord_country_id',null,'is',Id.toString());
	if(code.length == 1 || code.length == 2 || code.length == 3)
	{
		filters[1] = new nlobjSearchFilter('custrecord_international_code',null,'is',code);
	}
	else
	{
		filters[1] = new nlobjSearchFilter('custrecord_mobile_prefix',null,'is',code);
	}
	//filters[2] = new nlobjSearchFilter('custrecord_allowd_digits',null,'equalto',length);
	var searchResultItem = nlapiSearchRecord('customrecord_phone_validation', null, filters, columns);
	if (searchResultItem != null)
	{
		
		//alert(' Mobile Number is Valid ...')
		nlapiSetFieldValue('custentity_mobile',mobNo,false,false);
		return true;
	}
	else
	{
		alert('Invalid Mobile Number....Please Enter Valid Mobile Number')
		nlapiSetFieldValue('custentity_mobile',mobNo,false,false);
		return false;
	}
}
function findPhoneAndMobileDetailsforCountry(Id)
{
	var filters=new Array();
	var columns = new Array();
	var MobCode = new Array();
	var phneCode = new Array();
	var moblCode;
	var phneCodeCapturd;
	var alwdcde;
	var allowdnoOfDigits = new Array();
		filters[0] = new nlobjSearchFilter('custrecord_country_id',null,'is',Id);
		columns[0] = new nlobjSearchColumn('internalid');
		columns[1] = new nlobjSearchColumn('custrecord_international_code');
		columns[2] = new nlobjSearchColumn('custrecord_mobile_prefix');
		columns[3] = new nlobjSearchColumn('custrecord_allowd_digits');
		var searchResultItem = nlapiSearchRecord('customrecord_phone_validation', null, filters, columns);
		if (searchResultItem != null)
		{
			for(var k=0;k<searchResultItem.length;k++)
			{
				moblCode = searchResultItem[k].getValue('custrecord_international_code');
				MobCode.push(moblCode);
				//nlapiLogExecution('DEBUG','MobCode','MobCode in filamtinremmnth'+MobCode);
				phneCodeCapturd = searchResultItem[k].getValue('custrecord_mobile_prefix');
				phneCode.push(phneCodeCapturd);
				//nlapiLogExecution('DEBUG','phoneCode','phoneCode in filamtinremmnth'+phneCode);
				alwdcde = searchResultItem[k].getValue('custrecord_allowd_digits');
				allowdnoOfDigits.push(alwdcde);
				//nlapiLogExecution('DEBUG','alwdCode','alwdCode in filamtinremmnth'+alwdCode);	
			}
			
			//alert('Following are the allowed Mobile Code Phone Code and Allowed no of Digits '+MobCode'+ Phone code related Info'phneCode'+ allowd no digit for the country'allowdnoOfDigits);
			//alert('Allowed Mobile Code for the selected country is='+MobCode[0]+'\n Allowed Phone Code for the selected country is='+phneCode+'\n Allowd no digit for the selected country is='+allowdnoOfDigits[0]);
		}
		
}
function findEmail(emailToValidate)
{
	var filters=new Array();
	var columns = new Array();
	filters[0] = new nlobjSearchFilter('custrecord_value_aftr_atrate',null,'is',emailToValidate);
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_value_aftr_atrate');
	var searchResultItem = nlapiSearchRecord('customrecord_email_validation', null, filters, columns);
	if (searchResultItem != null)
	{
		for(var k=0;k<searchResultItem.length;k++)
		{
			intrnalId = searchResultItem[k].getValue('internalid');
			nlapiLogExecution('DEBUG','intrnalId','intrnalId in filamtinremmnth'+intrnalId);
			return 1;
		}
	}
	else
	{
		return 0;
	}
}
function findIfPhoneExist(Id,phone,mobNo)
{
  //alert('mobile no is'+mobNo);
	var filters=new Array();
	var columns = new Array();
	if(phone!= null && phone !='' && phone !='undefined')
	{
		filters[0] = new nlobjSearchFilter('phone',null,'is',phone);
	}
	if(mobNo!= null && mobNo !='')
	{
		filters[0] = new nlobjSearchFilter('custentity_mobile',null,'is',mobNo);
	}
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('email');
	
	var searchResultItem = nlapiSearchRecord('customer', null, filters, columns);
 // alert('searchResultItem is'+searchResultItem);
	if (searchResultItem != null)
	{
		return 1
	}
	else
	{
		return 0;
	}
}
function findPhoneAndMobile(country,phoneCode,mobPhneCode,phoneLngth,mobstrnlength,mobNo,phone)
{
	var filters=new Array();
	var columns = new Array();
	var phoneArray = new Array();
	var mobcnt =0;
	var phnecnt = 0;
	var mobStrng =0;
	var phnStrng =0;
	
	filters[0] = new nlobjSearchFilter('custrecord_country_id',null,'is',country);
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('custrecord_international_code');
	columns[2] = new nlobjSearchColumn('custrecord_mobile_prefix');
	columns[3] = new nlobjSearchColumn('custrecord_allowd_digits');
	var searchResultItem = nlapiSearchRecord('customrecord_phone_validation', null, filters, columns);
	if (searchResultItem != null)
	{
		for(var k=0;k<searchResultItem.length;k++)
		{
			var intrnalId = searchResultItem[k].getValue('internalid');
			nlapiLogExecution('DEBUG','intrnalId','intrnalId in filamtinremmnth'+intrnalId);
			var MobCode = searchResultItem[k].getValue('custrecord_international_code');
			nlapiLogExecution('DEBUG','MobCode','MobCode in filamtinremmnth'+MobCode);
			var phneCode = searchResultItem[k].getValue('custrecord_mobile_prefix');
			nlapiLogExecution('DEBUG','phoneCode','phoneCode in filamtinremmnth'+phneCode);
			var alwdCode = searchResultItem[k].getValue('custrecord_allowd_digits');
			nlapiLogExecution('DEBUG','alwdCode','alwdCode in filamtinremmnth'+alwdCode);
			if(mobNo)
			{
				if(MobCode == mobPhneCode)
				{
					mobcnt =0;
				}
				else
				{
					mobcnt = mobcnt + 1;
				}
				if(alwdCode == mobstrnlength)
				{
					mobStrng =0;
				}
				else
				{
					mobStrng = mobStrng + 1;
				}
			}//end of mob no chk
			else
			{
				nlapiSetFieldValue('custentity_mobile',mobNo);
			}
			if(phone)
			{
				if(phneCode == phoneCode)
				{
					phnecnt =0;
				}
				else
				{
					phnecnt = phnecnt + 1;
				}
				if(alwdCode == phoneLngth)
				{
					phnStrng =0;
				}
				else
				{
					phnStrng = phnStrng + 1;
				}
			}//end of phone check
			else
			{
				nlapiSetFieldValue('phone',phneCode);
			}
			
		}
		if((mobcnt == 0 && mobStrng == 0)||(phnecnt == 0) && (phnStrng ==0))
		{
			return true;
		}
		else
		{
			if(mobcnt >0)
			{
				alert('The Mobile code entered is Invalid')
			}
			else if(phnecnt > 0)
			{
				alert('The Phone code entered is Invalid')
			}
			else if(mobStrng > 0)
			{
				alert('The no of Digits entered is greater than-->'+alwdCode);
			}
			else if(phnStrng > 0)
			{
				alert('The no of Digits entered is greater than-->'+alwdCode);
			}
			return false;
		}
	}
}
function checkEmailinCustomer(email)
{
	var filters=new Array();
	var columns = new Array();
	filters[0] = new nlobjSearchFilter('email',null,'is',email.toString());
	columns[0] = new nlobjSearchColumn('internalid');
	columns[1] = new nlobjSearchColumn('email');
	
	var searchResultItem = nlapiSearchRecord('customer', null, filters, columns);
	if (searchResultItem != null)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}
    


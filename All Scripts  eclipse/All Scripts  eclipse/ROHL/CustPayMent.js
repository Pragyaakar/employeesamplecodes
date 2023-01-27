	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       12 Jun 2019     Shivraj
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
	flag = true;
	function clientPageInit(type){
	   return flag;
	}
	
	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType
	 *   
	 * @returns {Boolean} True to continue save, false to abort save
	 */
	function clientSaveRecord(){
	
		alert('flag >> '+flag);
		if(flag == false)
		{
			
			alert("Enter minimum TDS amount than Invoice amount");
		}
	    return flag;
	    
	}
	
	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType
	 *   
	 * @param {String} type Sublist internal id
	 * @param {String} name Field internal id
	 * @param {Number} linenum Optional line item number, starts from 1
	 * @returns {Boolean} True to continue changing field value, false to abort value change
	 */
	function clientValidateField(type, name, linenum){
	   
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
	function cltFieldChange(type, name, linenum)
	{
		if (type == 'custpage_sig_req_sublist' && name =='custpage_apply')
			{
			alert('Inside Chnge..')
					var linecount = nlapiGetLineItemCount('custpage_sig_req_sublist');
					//alert('linecount >> '+linecount);
					
					var ref_NoArray = [];
					var amt_dueArray = [];
					var paymentArray =[];
					var tdsArray =[];
					var paidamtArray=[];
					
					/*for( i=1 ; i<=linecount; i++)
					{*/
						var i = linenum;
							var tdsValue = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_tds_amt',i);
							//alert('tdsValue >>'+tdsValue)
							tdsArray.push(tdsValue);
					
							var ref_No = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_ref_no',i);
							alert("ref_No  ==" +ref_No);
							ref_NoArray.push(ref_No);
							
							var amt_due = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_amt_due',i);
							
							var paidamt = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_payment',i);
							//alert("paidamt  ==" +paidamt);
							paidamtArray.push(paidamt);
							
							var count = nlapiGetLineItemCount('apply');
							alert("count  ==" +count);
							var ref_No1Array =[];
							
							for(j=1;j<=count;j++)
							{
								var ref_No1 = nlapiGetLineItemValue('apply','refnum',j);
								//alert("ref_No1  ==" +ref_No1);
								ref_No1Array.push(ref_No1);
								
								var amt_due1 = nlapiGetLineItemValue('apply','due',j);
							//alert('ref_No1[j] >> >> '+ref_No1[j]);
							/*	alert('ref_No[] >> >> '+ref_No[i]);
								alert('tdsValue >> >> '+tdsValue);*/
								
							//	alert('ref_No1 >> >> '+ref_No1);
							//alert('ref_No[i] >> >> '+ref_No[i]);
								
								
								if (ref_No === ref_No1 && amt_due1 === amt_due)
								{
									alert('ref_No;'+ref_No+', ref_No1:'+ref_No1);
										nlapiSetLineItemValue('apply','apply', j ,'T');
										nlapiSetLineItemValue('apply','amount', j ,tdsValue);	
										flag = true;
								
								}
								
								
					
							}
							
							
							if(tdsValue !=null && tdsValue !='')
							 {
								
								
								nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_appy', i ,'T');
								var applySample = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_appy',i);
								
								var tdsValue1= parseFloat(tdsValue);
								var paidamt1 = parseFloat(paidamt);
								if(tdsValue1 > paidamt1 )
									{
										alert("TDS amount should be less than Invoice Amount");
										flag = false;
								//		alert(''+flag);
									
									}
								
								
							 } //END If statement
					//} // END : for 
					
			} //END :  if Statement
		return flag;			
		} // END : Function
	
							
			
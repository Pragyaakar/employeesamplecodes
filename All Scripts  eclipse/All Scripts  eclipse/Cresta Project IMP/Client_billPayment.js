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
function clientFieldChange(type,name,linenum)
{
	// alert('Enter in function');
	//alert('type =='+type+'name =='+name+',linenum=='+linenum);
	if(name == 'apply' && type == 'apply')
	{
		
		var refNum;
		var origAmount;
		
		var count = nlapiGetLineItemCount('apply');
		alert('count =='+count);
		
		var apply = nlapiGetCurrentLineItemValue('apply','apply');
		alert('apply =='+apply);
		
		origAmount = nlapiGetLineItemValue('apply','total',linenum);
		alert('origAmount =='+origAmount);
		
		if(apply == 'T')
		{
			for(i=1; i<=count; i++)
			{
				refNum = nlapiGetLineItemValue('apply','refnum',i);
				var n = refNum.startsWith("VAP");
				//alert('n =='+n);
					
				var amount = nlapiGetLineItemValue('apply','total',i);
				//alert('amount =='+amount);
					
				if(n == true && parseFloat(origAmount) > parseFloat(amount))
				{
					alert('condition true =')
					alert('parseFloat(origAmount) =='+parseFloat(origAmount)+"parseFloat(amount) ="+parseFloat(amount))
					nlapiSetLineItemValue('apply','apply',i,'T');
					nlapiSetLineItemValue('apply','amount',i,amount);
				}
			}
		}
	}
}

/*function clientPostSource(type,name)
{
	alert('Enter in function');
	alert('type =='+type+'name =='+name+',linenum=='+linenum);
	if(type == 'apply' && name == 'apply')
	{
		
		var refNum;
		var origAmount;
		
		var count = nlapiGetLineItemCount('apply');
		alert('count =='+count);
		
		var apply = nlapiGetCurrentLineItemValue('apply','apply');
		alert('apply =='+apply);
		
		origAmount = nlapiGetLineItemValue('apply','total');
		alert('origAmount =='+origAmount);
		
		if(apply == 'T')
		{
			for(i=1; i<=count; i++)
			{
				refNum = nlapiGetLineItemValue('apply','refnum',i);
				var n = refNum.startsWith("VAP");
				//alert('n =='+n);
					
				var amount = nlapiGetLineItemValue('apply','total',i);
				//alert('amount =='+amount);
					
				if(n == true && parseFloat(origAmount) > parseFloat(amount))
				{
					alert('condition true =')
					alert('parseFloat(origAmount) =='+parseFloat(origAmount)+"parseFloat(amount) ="+parseFloat(amount))
					nlapiSetLineItemValue('apply','apply',i,'T');
					nlapiSetLineItemValue('apply','amount',i,amount);
				}
			}
		}
	}
}*/
var trueAmount = 0;

function cltPageInit(type)
{
	//alert('type in pageInit = '+type)
	if(type == 'create' || type == 'edit')
	{ 
		var TrueArr =[];
		var Payee = nlapiGetFieldValue('entity');
		alert('Payee =='+Payee);
		
		var count1 = nlapiGetLineItemCount('apply');//entity
		alert('count =='+count1);
		
		if(Payee != null)
		{
			for(p=1; p <= count1; p++)
			{
				var apply1 = nlapiGetLineItemValue('apply','apply',p);
				//alert('apply =='+apply1);
				
				origAmount1 = nlapiGetLineItemValue('apply','total',p);
				//alert('origAmount =='+origAmount1);
				
				if(apply1 == 'T')
				{
					origAmount1 = nlapiGetLineItemValue('apply','total',p);
					alert('origAmount =='+origAmount1);
					TrueArr.push(origAmount1);
					trueAmount += parseFloat(origAmount1);
					alert('trueAmount =='+trueAmount);
				}

			}
			alert('TrueArr =='+TrueArr)
			
			for(k=1; k<=count1; k++)
			{
				var apply1 = nlapiGetLineItemValue('apply','apply',k);
				//alert('apply =='+apply1);
				
				origAmount1 = nlapiGetLineItemValue('apply','total',k);
				//alert('origAmount =='+origAmount1);
				
				//alert('count in k');
				if(apply1 == 'T')
				{
					var refNum1 = nlapiGetLineItemValue('apply','refnum',k);
					var n1 = refNum1.startsWith("VAP");
					//alert('n =='+n);
						
					var amount1 = nlapiGetLineItemValue('apply','total',k);
				   alert('amount =='+amount1);
						
					if(n1 == true && parseFloat(origAmount1) > parseFloat(amount1))
					{
						alert('condition true =')
						alert('parseFloat(origAmount) =='+parseFloat(origAmount1)+"parseFloat(amount) ="+parseFloat(amount1))
						nlapiSetLineItemValue('apply','apply',k,'T');
						nlapiSetLineItemValue('apply','amount',k,amount1);
					}
				}
			}
			
			
			
			
			
		}
		

	}
}
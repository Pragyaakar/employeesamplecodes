/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       20 Mar 2019     Tushar More
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
function clientFieldChangedToFilterDate(type, name, linenum)
{
	if(name == 'custpage_date') 
    {
		var customer = nlapiGetFieldValue('custpage_customer');//custpage_date
		// alert('customer  is:-'+customer)
		
		var date = nlapiGetFieldValue('custpage_date');//custpage_date
		// alert('date  is:-'+date)
		
		
	     	var ActDate = date.toString();
				var ActDate1 =ActDate.split('/');
				var ActDate2 =ActDate1[1]+'/'+ActDate1[0]+'/'+ActDate1[2];
				
				var setDate = ActDate1[0]+'/'+ActDate1[1]+'/'+ActDate1[2];
				
				var FormDay =new Date(ActDate2);
				
				// alert('FormDay=='+setDate)
				var today = new Date();
				// alert('today=='+today)
				
				var beforeFiveDay = today - 1000 * 60 * 60 * 24 * 5;   
				beforeFiveDay = new Date(beforeFiveDay);
				// alert('beforeFiveDay=='+beforeFiveDay)
				
			    if(FormDay < beforeFiveDay)
				{
					alert("Please enter todays Date or in between 5 days upto below todays date");
					nlapiSetFieldValue('custpage_date','',false,true);
				}
				else if(FormDay > today)
				{
					alert("You cannot enter the Future Date");
					nlapiSetFieldValue('custpage_date','',false,true);
				}
				else
				{
					nlapiSetFieldValue('custpage_date',setDate,false,true);
					var isValid ='valid';
				}
		
		
		
		
		if(isValid =='valid')
        {
			  var rowCount = nlapiGetFieldValue('custpage_date');
			  var url = window.location.search;
			  
			 // alert('url  is:-'+url)
			  
			  if (url.indexOf('&custpage_date') > 0) 
			  {
			   // Remove the previous value of the parameter: param_rowCount
			   url = url.substring(0, url.indexOf('&custpage_date'));
			  }
			  // The code below refreshes the page and passes the value of the dropdown
			  // in the URL as a parameter
			  window.location.search = url + '&custpage_date=' + rowCount;

        }
		
	}
	
	if(type=='custpage_sig_req_sublist' && name == 'custpage_qtysold') 
    {
		var line =linenum;
		var Available = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_avail',line) //custpage_date
		 // alert('Available  is:-'+Available)
		
		var ValueSold = nlapiGetLineItemValue('custpage_sig_req_sublist','custpage_qtysold',line) //custpage_date
		// alert('ValueSold  is:-'+ValueSold)
		
		if(parseFloat(ValueSold) > parseFloat(Available))
		{
			alert('You can not select sold Quantity more than Available Quantity')
			nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_qtysold',line,'')
		}
		else if(parseFloat(ValueSold) < 0)
		{
			alert('Please Enter Positive value')
			nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_qtysold',line,'')
		}
		else if(Number.isInteger(ValueSold) == true && (parseFloat(ValueSold) < 0|| parseFloat(ValueSold) > 0))
		{
			alert('Please Enter positive Integer value')
			nlapiSetLineItemValue('custpage_sig_req_sublist','custpage_qtysold',line,'')
		}
    }
	
}

function isDecimal(num) {
	  return (num ^ 0) !== num;
	}
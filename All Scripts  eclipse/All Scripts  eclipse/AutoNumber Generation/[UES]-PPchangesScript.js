
function autoNumberingAfterSubmit(type)
{
	//nlapiLogExecution('DEBUG', 'Type', type);
	if(type == 'create')
	{
		var checkType;
		
		var recType = nlapiGetRecordType();
		var recID = nlapiGetRecordId();
		
		var transObj = nlapiLoadRecord(recType,recID);
		
		if(transObj != null && transObj != undefined && transObj != '')
		{
			var loc = nlapiGetFieldValue('location');
			nlapiLogExecution('DEBUG','AutoNumbering','loc =='+ loc);
			
		   var location = nlapiGetFieldText('location');
		   nlapiLogExecution('DEBUG','AutoNumbering','Location =='+ location);
		
		   var lookupLoc = nlapiLoadRecord('location',loc);
		   nlapiLogExecution('DEBUG','AutoNumbering','lookupLoc =='+ lookupLoc);
		   
		   var locParent = lookupLoc.getFieldValue('parent');
		   nlapiLogExecution('DEBUG','AutoNumbering','locParent =='+ locParent);
		   
		   var initials = location.match(/\b\w/g) || [];
		   initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
		   nlapiLogExecution('DEBUG','AutoNumbering','initials =='+ initials);
		   
		   /*var autoNumber_digitNo = nlapiLookupField('customrecord_auto_number_record', 1, ['custrecord1537','custrecord_number','custrecord_transaction_is']);
		   
		   var autoNumber = autoNumber_digitNo['custrecord1537'];
		   var minDigit = autoNumber_digitNo['custrecord_number'];
		   var abbreviation  = autoNumber_digitNo['custrecord_transaction_is'];
		   var digitLength='';*/
		   
		   if(recType =='purchaseorder')
			{
				checkType='Purchase Order';
			}
			else if(recType =='salesorder')
			{
				checkType='Sales Order';
			}
			else if(recType =='invoice')
			{
				checkType='Invoice';
			}
			else if(recType =='vendorbill')
			{
				checkType='Bill';
			}
			
		   var filters=new Array();
		   filters[0] = new nlobjSearchFilter("custrecord_tran_type",null,"contains",checkType);
			
		    var columns=new Array();
		    columns[0]= new nlobjSearchColumn('id');
			columns[1]= new nlobjSearchColumn('custrecord_tran_type');
			columns[2]= new nlobjSearchColumn('custrecord_transaction_is');
			columns[3]= new nlobjSearchColumn('custrecord_number');
			columns[4]= new nlobjSearchColumn('custrecord1537');
		
			var searchresults = nlapiSearchRecord('customrecord_auto_number_record','customsearch_autonumber_searc',filters,columns);
			
			if(searchresults != null)
			{
				for (var i = 0;  i < searchresults.length; i++) 
				{
					TransType = searchresults[i].getValue('custrecord_tran_type');
					nlapiLogExecution('DEBUG', 'tranprefix', 'TransType***************' +TransType);
				
					abbreviation = searchresults[i].getValue('custrecord_transaction_is');
					nlapiLogExecution('DEBUG', 'abbreviation', 'abbreviation***************' +abbreviation);
				
					var prefix = abbreviation;
					var minDigit = searchresults[i].getValue('custrecord_number');
					nlapiLogExecution('DEBUG', 'minDigit', 'minDigit***************' +minDigit);
					
					var internalid = searchresults[i].getValue('id');
					nlapiLogExecution('DEBUG', 'internalid', 'internalid***************' +internalid);
					
					var autoNumber = searchresults[i].getValue('custrecord1537');
					nlapiLogExecution('DEBUG', 'autoNumber', 'autoNumber***************' +autoNumber);
				}
			}
			var digitLength='';
		   minDigit = parseInt(minDigit,10)
		
		   if(minDigit)
		   {
			   for (var index = 0; index < minDigit; index++) 
			   {
				   digitLength = digitLength+'0';
			   }
		    }
		 
		  if(abbreviation != null && abbreviation != undefined && abbreviation != '')
		  {
			  var value = initials +'-'+'-'+autoNumber+'-'+abbreviation ;
			  nlapiLogExecution('DEBUG', 'value', value);
			  
			  nlapiSubmitField('purchaseorder', recID, 'tranid', value);
			  var incrementvalue = (+autoNumber) + 1;
		
			  // insert leading zeroes with a negative slice
			  incrementvalue = (digitLength + incrementvalue).slice(minDigit-(minDigit*2));
			 
			  nlapiLogExecution('DEBUG', 'autoNumber', incrementvalue);
			  nlapiSubmitField('customrecord_auto_number_record', 1, 'custrecord1537', incrementvalue)
		  }
	   }
	}
}
/**
* @NApiVersion 2.x
* @NScriptType ClientScript
*/
define(['N/ui/dialog','N/record'],
	function(dialog,record){
	function saveRecord(context)
	{	
		try{

		var newObj = context.currentRecord;
		log.debug('debug for newObj', newObj);

		var today = new Date();
		log.debug('debug for today', today);
	
		var date = newObj.getValue({
    	fieldId: 'trandate'
		});
		log.debug('debug for date', date);
		
		var thisMonth = today.getMonth()+1;
		log.debug('debug for thisMonth', thisMonth);
		
		var nextMonth = date.getMonth()+1;
		log.debug('debug for nextMonth', nextMonth);

		var thisYear = today.getFullYear();
		log.debug('debug for thisYear', thisYear);

		var nextYear = date.getFullYear();
		log.debug('debug for nextYear', nextYear);

		//alert('thisMonth '+ thisMonth + ' nextMonth ' + nextMonth);
		//alert('thisYear '+ thisYear + ' nextYear ' + nextYear);
		
		var actualDate = new Date(today); // convert to actual date
		var newMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, actualDate.getDate());
		//alert('newMonth '+ newMonth);

		var year = newMonth.getFullYear();
		var month = newMonth.getMonth()+1;
		var dt = newMonth.getDate();

		if (dt < 10) {
		  dt = dt;
		}
		if (month < 10) {
		  month = month;
		}

		//alert('nextMonth '+ nextMonth + ' month ' + month);

		//if(((nextMonth>thisMonth) && (nextYear>=thisYear)) || ((nextMonth>=thisMonth) && (nextYear>thisYear)) || ((thisMonth>nextMonth) && (nextYear>thisYear)))
		if(((nextMonth > month) && (nextYear>=thisYear))||((nextMonth>=thisMonth) && (nextYear>thisYear)) || ((thisMonth>nextMonth) && (nextYear>thisYear)))
		{
			alert("The date you entered is more than 1 month in the future. Please correct the date before proceeding.");
			return false;
		}

			return true;
	  }
		catch(e){
			log.debug('There is an error in saveRecord function',e);
		}
	}
	
	return{
		saveRecord : saveRecord
	};
	});

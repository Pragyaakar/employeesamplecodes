function AfterSubmitCLvalueSet(type,form,request)
	{
		try
		{
			var recordId = nlapiGetRecordId();
			var recordType = nlapiGetRecordType();
			
			var reservationID =[];
			var nameArr =[];
			var firstDate =[];
			var secondDate =[];
			var DateRange =[];
			
		   // var irObj = nlapiLoadRecord(recordType,recordId);
		   // nlapiLogExecution('DEBUG','Serach Value',' irObj:=='+irObj);
		    
		    var stringIS ='12345-Mr. A Mishra-20190501-20190503; 12345-Mrs. Priya Mishra-20190501-20190503; 12346-Dr. Bhuwesh Chaturvedi-20190501-20190503; 12346-Capt. Ashoke Kumar-20190501-20190503; 12347-Atul-20190501-20190502; 12347-Soni Singh-20190501-20190502';
		    var res = stringIS.split(";");
		    for(var i=0;i<res.length;i++)
		    {
		    //	nlapiLogExecution('DEBUG','SPlitted String is:'+res[i]);
		    	
		    	var newStrings = res[i].split('-');
		    	 for(var j=0;j<newStrings.length;j++)
		    	 {
		    		// nlapiLogExecution('DEBUG','SPlitted String is:'+newStrings[j]);
		    		 
		    		 if(j == 0)
		    		 {
		    			 reservationID.push(newStrings[j]);
		    		 }
		    		 if(j == 1)
		    		 {
		    			 nameArr.push(newStrings[j]);
		    		 }
		    		 if(j == 2)
		    		 {
		    			 firstDate.push(newStrings[j]);
		    		 }
		    		 if(j == 3)
		    		 {
		    			 secondDate.push(newStrings[j]);
		    		 }
		    		 
		    	 }
		    	
		    }
		    for(var k=0;k<firstDate.length;k++)
		    {
		    	var pushThisRnge =firstDate[k]+'-'+secondDate[k];
		    	DateRange.push(pushThisRnge);
		    }
	  
		    nlapiLogExecution('DEBUG','reservationID is:'+reservationID);
		    nlapiLogExecution('DEBUG','nameArr is:'+nameArr);
		    nlapiLogExecution('DEBUG','DateRange is:'+DateRange);
		   // nlapiLogExecution('DEBUG','secondDate is:'+secondDate);
		}
		catch (e) 
		{
			nlapiLogExecution('DEBUG','Error Code:'+e);
		 }
	}

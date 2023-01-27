
function BeforeLoadBillPayment(type)
{
    /*  On after submit:

          - PURPOSE
		-

	FIELDS USED:

          --Field Name--				--ID--


    */


	//  LOCAL VARIABLES



	//  AFTER SUBMIT CODE BODY
		
	try
	{
		
	
	
		if (type == 'create') //create
		{
			var checkid = nlapiGetRecordId()
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check ', " checkid -- " + checkid)
			
			var recordType = nlapiGetRecordType()
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " recordType-- " + recordType)
			
		/*	var o_checkobj = nlapiLoadRecord(recordType, checkid);
			nlapiLogExecution('DEBUG', 'afterSubmitRecord check', " o_checkobj " + o_checkobj)*/
			var blcrdt;
			var itemArrayItm = new Array();
			var qtyArrayItm =  new Array();
			var rateArrayItm = new Array();
			var taxArrayItm =  new Array();
			var item;
			var qty;
			var rate;
			var acct;
			var tax;
			var date;
            var dept;
            var clas;
            var project;
            var type;
			var acctArrayExp = new Array();
            var deptArrayExp = new Array();
          	var classArrayExp = new Array();
          	var projectArrayExp = new Array();
          	
          	 var deptArrayItm = new Array();
           	var classArrayItm = new Array();
           	var locationArrayExp = new Array();
        	var locationArrayItem = new Array();
           	var projectArrayItm = new Array();
           	
			var rateArrayExp = new Array();
			var taxArrayExp =  new Array();
			var Account;
			var subsidiary;
			var date;
			var payee;
			var totalAmount= 0.00;
			var expAmt = 0.00;
			var itemAmt = 0.00;
			var amt ;
			var amt1 ;
			var tdsPayAcc;
			var sectionCode;
			
		//	if (o_checkobj != null && o_checkobj != '' && o_checkobj != undefined) 
			{
				var exp_linecount = nlapiGetLineItemCount('apply');
			
						if(exp_linecount != null && !isNaN(exp_linecount))		
						{
							for (var i = 1; i <= exp_linecount; i++) 
							{
								
								type = nlapiGetLineItemValue('apply', 'type', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "type" + type)
								//acctArrayExp.push(acct);
								
                              	amt = nlapiGetLineItemValue('apply', 'total', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "amt :==" + amt)
								//deptArrayItm.push(dept);
                              
                              if(type == 'Bill')
                              {
                            	  amtTotal = parseFloat(amtTotal) + parseFloat(amt);
                              }
								
							}
							
						}
						
						if(exp_linecount != null && !isNaN(exp_linecount))		
						{
							for (var i = 1; i <= exp_linecount; i++) 
							{
								
								type = nlapiGetLineItemValue('apply', 'type', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "type" + type)
								//acctArrayExp.push(acct);
								
                              	amt1 = nlapiGetLineItemValue('apply', 'total', i)
								nlapiLogExecution('DEBUG', 'afterSubmitRecord check', "amt1 :==" + amt1)
								//deptArrayItm.push(dept);
                              
                              if(type == 'customtransaction102' && itemAmt < amtTotal)
                              {
                            	  itemAmt = parseFloat(itemAmt) + parseFloat(amt1);
                            	  nlapiSetCurrentLineItemValue('apply', 'apply','T');
                              }
								
							}
							
						}
						
						
			
				}
			
		//	nlapiSubmitRecord(o_checkobj,true);
		}//End if(o_checkobj != null)
	}
	catch(e)
	{
		nlapiLogExecution('ERROR', 'ERROR IS', "DESCRIPTION " + e)
	}
}

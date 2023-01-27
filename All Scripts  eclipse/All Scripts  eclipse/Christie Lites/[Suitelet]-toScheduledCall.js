	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       02 Aug 2019     Nileshkumar
	 *
	 */
	
	/**
	 * @param {nlobjRequest} request Request object
	 * @param {nlobjResponse} response Response object
	 * @returns {Void} Any output is written via response object
	 */
	function scheduledscriptCall(request, response)
	{
	
		var startDate =request.getParameter('stdt');
		var endDate = request.getParameter('eddt');
		var salesRep = request.getParameter('srep');
		var customer = request.getParameter('cus');
		var salesOrder = request.getParameter('so');
		var isExcel = request.getParameter('exl');
		
		var emailSubj = request.getParameter('emsub');
		var emailRecip = request.getParameter('emrecp');
		var emailMsg = request.getParameter('emsg');
	
		var params = new Array();
		params['custscript_strt_date']=startDate;
		params['custscript_end_cpr_date']=endDate;
		params['custscript_sale_rep']=salesRep;
		params['custscript_sale_customer']=customer;
		params['custscript_sale_order']=salesOrder;
		
		params['custscript_email_subject']=emailSubj;
		params['custscript_email_id']=emailRecip;
		params['custscript_email_mesg']=emailMsg;
		params['custscript_check_id']='T';
			
		nlapiScheduleScript('customscript_cust_schd_rept_n_email','customdeploy_cust_schd_rept_n_email',params);
		nlapiSetRedirectURL("EXTERNAL","https://929055.app.netsuite.com/app/site/hosting/scriptlet.nl?script=469&deploy=1&whence=",false);
	}
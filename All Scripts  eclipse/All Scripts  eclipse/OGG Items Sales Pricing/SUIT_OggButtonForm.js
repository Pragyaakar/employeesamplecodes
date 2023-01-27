function ItemSalesPricingSuitelet(request, response)
{
	nlapiLogExecution('DEBUG','ItemSalesPricingSuitelet', "Request Method = " +request.getMethod());

	if(request.getMethod() == 'GET')
	{
		//============== CREATE FORM ============
		nlapiLogExecution('DEBUG','ItemSalesPricingSuitelet', "in GET = ");
	
		
		var form = nlapiCreateForm("Item Sales Pricing");
		
		form.setScript('');
		// ======= ADD FIELDS ========
		var Date = form.addField('custpage_date', 'date', 'Date');
		Date.setMandatory(true);
		
		//var Items = form.addField('custpage_items', 'select', 'Items','item');
		//Items.setMandatory(true);
		
		//var Name = form.addField('custpage_name', 'select', 'Names','customlist488');
		//Name.setMandatory(true);
		
		var PoductCategoryName = form.addField('custpage_prod_category', 'select', 'Product Category','classification');
		PoductCategoryName.setMandatory(true);
		
		
		var ProcessCalc=form.addSubmitButton('Process');
		
      	response.writePage(form);

      	
		

	}// if(request.getMethod() == 'GET')
	else if(request.getMethod() == 'POST')
	{
		 nlapiLogExecution('DEBUG','ItemSalesPricingSuitelet', "in POST   ");
		 
		 var Date=request.getParameter('custpage_date');
		 var ItemsNames=request.getParameter('custpage_items');
		 var Names=request.getParameter('custpage_name');
		 var ProdCategories=request.getParameter('custpage_prod_category');
		 
			var myParams = [];
					
			myParams.custscript_date = Date;
			myParams.custscript_items = ItemsNames;
			myParams.custscript_names = Names;
			myParams.custscript_product_cat = ProdCategories;
			nlapiScheduleScript("customscript_sch_item_sales_price_calc","customdeploy_sch_item_sales_price_calc", myParams);
			//nlapiSetRedirectURL('RECORD', 'item', ItemsNames, false);
			response.sendRedirect('RECORD', 'inventoryitem', '4084', false,'view');
	} 
	else
	{
	    //===WRITE A RESPONSE ======
		nlapiLogExecution('DEBUG','ItemSalesPricingSuitelet', "in POST else   ");
		
		var pageNotFound = '<html><body>404-Page Not Found</body></html>';
	    response.write(pageNotFound);
	} // END else
}// END orderRequisitionSuitelet()



// BEGIN OBJECT CALLED/INVOKING FUNCTION ===================================================

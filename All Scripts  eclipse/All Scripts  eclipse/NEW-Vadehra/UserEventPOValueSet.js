/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       01 Apr 2019     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function userEventPoValueSet(type, form, request)
{
//  try
	//  {
	var requisition_no = request.getParameter('custbody_req_num');
    nlapiLogExecution('DEBUG','After Submit',"Requisition_no=="+requisition_no);
 	

    
    recObj = nlapiLoadRecord('purchaserequisition',requisition_no);

   
         nlapiSetFieldValue('custbody_requi_id', requisition_no);
	/*		  var item;
			var quantity;
			var class_name;
			var customer_name;
			var units;
			var amount;
			var estimatedrate;
		    var estimatedamount;
			var aval_qty;
			var description;
			var vendor;
			var hsn_code;
			var Vendor;
			
			var vendor_Name = new Array();
		 	var vendorArray = new Array();
		 	var vendorUniq = new Array();
		 	var jsonArray1 = new Array();
		 	var itemArr = new Array();
		 	var VendorArr = new Array();
		 	var quantityArr = new Array();
		 	var class_nameArr = new Array();
			var depart_nameArr = new Array();
		 	var customer_nameArr = new Array();
		 	var unitsArr = new Array();
		 	var amountArr = new Array();
		 	var estimatedrateArr = new Array();
		 	var estimatedamountArr = new Array();
		 	var aval_qtyArr = new Array();
		 	var descriptionArr = new Array();
		 	var vendorArr = new Array();
		 	var hsn_codeArr = new Array();
		 	var vendornameArr = new Array();
		 	var loc_nameArr = new Array();
		 	
		 	var requisition_no = request.getParameter('custbody_req_num');
		    nlapiLogExecution('DEBUG','After Submit',"Requisition_no=="+requisition_no);
		 	
		
		    
		    recObj = nlapiLoadRecord('purchaserequisition',requisition_no);
		
		   
		    
		    var PRlinecount=recObj.getLineItemCount('item');
			//alert('Line Count'+PRlinecount);
			
		
			
			for(var i=1;i<=PRlinecount;i++)
			{
			   
			var jsonObj = {
					'item': [recObj.getLineItemValue('item','item',i)],
					'Vendor': [recObj.getLineItemValue('item','povendor',i)],
				    'quantity':[recObj.getLineItemValue('item','quantity',i)],
					'class_name':[recObj.getLineItemValue('item','class',i)],
					'loc_name':[recObj.getLineItemValue('item','location',i)],
					'depart_name':[recObj.getLineItemValue('item','department',i)],
					'customer_name':[recObj.getLineItemValue('item','customer',i)],
					'units':[recObj.getLineItemValue('item','units',i)],
					'amount':[recObj.getLineItemValue('item','amount',i)],
					'rate':[recObj.getLineItemValue('item','rate',i)],
					'estimatedrate':[recObj.getLineItemValue('item','rate',i)],
			        'estimatedamount':[recObj.getLineItemValue('item','estimatedamount',i)],
					'description':[recObj.getLineItemValue('item','description',i)],
					'vendor':[recObj.getLineItemValue('item','vendor',i)],
					'hsn_code':[recObj.getLineItemValue('item','custcol_in_hsn_code',i)]
				};
				jsonArray1.push(jsonObj);
			}//End for PRlinecount end
			
				for(var l=0;l<jsonArray1.length;l++)
				{
					itemArr.push(jsonArray1[l].item);
					//alert('item is =='+itemArr);
					
					VendorArr.push(jsonArray1[l].Vendor);
					//alert('PO vendor is =='+VendorArr);
					
					quantityArr.push(jsonArray1[l].quantity);
					//alert('quantity is =='+quantityArr);
					
					depart_nameArr.push(jsonArray1[l].depart_name);
					//alert('class name is =='+class_nameArr);
					
					class_nameArr.push(jsonArray1[l].class_name);
					
					customer_nameArr.push(jsonArray1[l].customer_name);
					//alert('customer is =='+customer_nameArr);
					
					unitsArr.push(jsonArray1[l].units);
					//alert('unit is =='+unitsArr);
					
					amountArr.push(jsonArray1[l].amount);
					//alert('amount is =='+amountArr);
					
					estimatedrateArr.push(jsonArray1[l].estimatedrate);
					//alert('estimated rate is =='+estimatedrateArr);
					
					estimatedamountArr.push(jsonArray1[l].amount);
					//alert('estimated amount is =='+estimatedamountArr);
					
				
					descriptionArr.push(jsonArray1[l].description);
					//alert('description is =='+descriptionArr);
					
					vendorArr.push(jsonArray1[l].vendor);
					//alert('vendor is =='+VendorArr);
					
					hsn_codeArr.push(jsonArray1[l].hsn_code);
					//alert('HSN Code is =='+hsn_codeArr);
				}
					
				
				
			for(var j=1;j<=jsonArray1.length;j++)
				{
					 nlapiSelectNewLineItem('item');
			         nlapiLogExecution("DEBUG","In Create Function","item done=="+ itemArr[j-1]);
			         nlapiSetCurrentLineItemValue('item', 'item', itemArr[j-1]);   
				     nlapiLogExecution("DEBUG","In Create Function","item done11==");    
			    
				     nlapiSetCurrentLineItemValue('item','quantity', quantityArr[j-1]);                              
				     nlapiLogExecution("DEBUG","In Create Function"," quantity done=="+quantityArr[j-1]);
				      

				      nlapiLogExecution("DEBUG","In Create Function","rate done=="+ estimatedrateArr[j-1]);
				      nlapiSetCurrentLineItemValue('item','rate', estimatedrateArr[j-1]);
				      nlapiLogExecution("DEBUG","In Create Function","rate done=="+ estimatedrateArr[j-1]);
				      
				      nlapiSetCurrentLineItemValue('item','amount', estimatedamountArr[j-1]);
				      nlapiLogExecution("DEBUG","In Create Function","amount done=="+estimatedamountArr[j-1]);
				            
				      
				      nlapiSetCurrentLineItemValue('item', 'units', unitsArr[j-1]);                                          
				     nlapiLogExecution("DEBUG","In Create Function","units done=="+unitsArr[j-1]);
				      
				     nlapiSetCurrentLineItemValue('item', 'description',descriptionArr[j-1]); 
				     nlapiLogExecution("DEBUG","In Create Function","description done=="+descriptionArr[j-1]);
				      
				     nlapiSetCurrentLineItemValue('item', 'location', loc_nameArr[j-1]);
				     nlapiLogExecution("DEBUG","In Create Function","location done==");
				      
				     nlapiSetCurrentLineItemValue('item', 'department',depart_nameArr[j-1]); 
				      nlapiLogExecution("DEBUG","In Create Function","department done=="+depart_nameArr);
				      
				      nlapiSetCurrentLineItemValue('item', 'class', class_nameArr[j-1]);
				      nlapiLogExecution("DEBUG","In Create Function","class done=="+class_nameArr[j-1]);
				      
				      nlapiSetCurrentLineItemValue('item', 'customer', customer_nameArr[j-1]);
				      nlapiLogExecution("DEBUG","In Create Function","customer done=="+customer_nameArr[j-1]);
				   
				      nlapiSetCurrentLineItemValue('item', 'custcol_in_hsn_code', hsn_codeArr[j-1]);
				      nlapiLogExecution("DEBUG","In Create Function","HSN Code done==");
				            
				      nlapiCommitLineItem('item');
				      nlapiLogExecution("DEBUG","In Create Function","commitLineItem done==");
				}
				 
	  }
	//   catch(e)
	//   {
	//	   nlapiLogExecution('DEBUG','Error Code:'+e);
	//   }
	   */
}

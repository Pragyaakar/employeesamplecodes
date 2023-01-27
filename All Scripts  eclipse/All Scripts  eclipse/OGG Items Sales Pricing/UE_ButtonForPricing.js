/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       14 Sep 2019     Tushar More
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
function BeforeLoadMaterialIssueButton(type, form, request)
{
//
	
	if(type=='view' )
	{ 
		    var recordId = nlapiGetRecordId();
		     var recordType = nlapiGetRecordType();
		
	    
				  form.setScript('customscript_client_location_acc_redirec');
			 	  form.addButton('custpage_pricecalc','Sale Pricing','SalesPricingFunction();');
			  	  
			 
			
	}
 
}
/*


				if(type=='OthCharge')//
				{
					var itemObj=nlapiLoadRecord('otherchargeitem',itemId)
	      			var linecount=itemObj.getLineItemCount('price1')
	  				//alert('Line item count is'+linecount);
					for (var y = 1; y <= linecount; y++)
					{
						var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
						//alert('priceLevel'+priceLevel)
						if (priceLevel == 7)
						{
							var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
							if (specialPrice != null && specialPrice != '')
							{
								var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
								nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
								var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;

								var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
								nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
							}
							return FinalAmt
					   }

				    }
				}
				else if(type=='InvtPart')
				{
							var isSerial = searcItemSerialLot(itemId);
							nlapiLogExecution('DEBUG','After Submit', "  In calling function==" + isSerial);
							if(isSerial == 'serializedinventoryitem')
							{
								var itemObj=nlapiLoadRecord('serializedinventoryitem',itemId)
		      					var linecount=itemObj.getLineItemCount('price1')
	  							//alert('Line item count is'+linecount);
								for (var y = 1; y <= linecount; y++)
								{
									var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
									//alert('priceLevel'+priceLevel)
									if (priceLevel == 7)
									{
										var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
										if (specialPrice != null && specialPrice != '')
										{
											var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
											nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
											var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;
			
											var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
											nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
										}
										return FinalAmt
								   }

				   				 }//end of for loop
							}
							else if(isSerial == 'lotnumberedinventoryitem')
							{
								var itemObj=nlapiLoadRecord('lotnumberedinventoryitem',itemId)
		      					var linecount=itemObj.getLineItemCount('price1')
	  							//alert('Line item count is'+linecount);
								for (var y = 1; y <= linecount; y++)
								{
									var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
									//alert('priceLevel'+priceLevel)
									if (priceLevel == 7)
									{
										var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
										if (specialPrice != null && specialPrice != '')
										{
											var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
											nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
											var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;
			
											var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
											nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
										}
										return FinalAmt
								   }

				   				 }//end of for loop
							}
							else
							{
								var itemObj=nlapiLoadRecord('inventoryitem',itemId)
		      					var linecount=itemObj.getLineItemCount('price1')
	  							//alert('Line item count is'+linecount);
								for (var y = 1; y <= linecount; y++)
								{
									var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
									//alert('priceLevel'+priceLevel)
									if (priceLevel == 7)
									{
										var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
										if (specialPrice != null && specialPrice != '')
										{
											var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
											nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
											var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;
			
											var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
											nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
										}
										return FinalAmt
								   }

				   				 }//end of for loop
							}
				}//end of else if
			
				else if(type=='Kit')
				{
					var itemObj=nlapiLoadRecord('kititem',itemId)
	      			var linecount=itemObj.getLineItemCount('price1')
	  				//alert('Line item count is'+linecount);
					for (var y = 1; y <= linecount; y++)
					{
						var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
						//alert('priceLevel'+priceLevel)
						if (priceLevel == 7)
						{
							var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
							if (specialPrice != null && specialPrice != '')
							{
								var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
								nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
								var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;

								var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
								nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
							}
							return FinalAmt
					   }

				    }
				 }
				 
				 
				 else if(type=='NonInvtPart')
				{
							var isSerial = searcItemSerialLot(itemId);
							nlapiLogExecution('DEBUG','After Submit', "  In calling function==" + isSerial);
							if(isSerial == 'serializedinventoryitem')
							{
								var itemObj=nlapiLoadRecord('serializedinventoryitem',itemId)
		      					var linecount=itemObj.getLineItemCount('price1')
	  							//alert('Line item count is'+linecount);
								for (var y = 1; y <= linecount; y++)
								{
									var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
									//alert('priceLevel'+priceLevel)
									if (priceLevel == 7)
									{
										var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
										if (specialPrice != null && specialPrice != '')
										{
											var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
											nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
											var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;
			
											var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
											nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
										}
										return FinalAmt
								   }

				   				 }//end of for loop
							}
							else if(isSerial == 'lotnumberedinventoryitem')
							{
								var itemObj=nlapiLoadRecord('lotnumberedinventoryitem',itemId)
		      					var linecount=itemObj.getLineItemCount('price1')
	  							//alert('Line item count is'+linecount);
								for (var y = 1; y <= linecount; y++)
								{
									var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
									//alert('priceLevel'+priceLevel)
									if (priceLevel == 7)
									{
										var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
										if (specialPrice != null && specialPrice != '')
										{
											var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
											nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
											var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;
			
											var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
											nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
										}
										return FinalAmt
								   }

				   				 }//end of for loop
							}
							else if(isSerial == 'inventoryitem')
							{
								var itemObj=nlapiLoadRecord('inventoryitem',itemId)
		      					var linecount=itemObj.getLineItemCount('price1')
	  							//alert('Line item count is'+linecount);
								for (var y = 1; y <= linecount; y++)
								{
									var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
									//alert('priceLevel'+priceLevel)
									if (priceLevel == 7)
									{
										var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
										if (specialPrice != null && specialPrice != '')
										{
											var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
											nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
											var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;
			
											var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
											nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
										}
										return FinalAmt
								   }

				   				 }//end of for loop
							}
							else
							{
								var itemObj=nlapiLoadRecord('noninventoryitem',itemId)
	      						var linecount=itemObj.getLineItemCount('price1')
	  							//alert('Line item count is'+linecount);
								for (var y = 1; y <= linecount; y++)
								{
									var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
									//alert('priceLevel'+priceLevel)
									if (priceLevel == 7)
									{
										var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
										if (specialPrice != null && specialPrice != '')
										{
											var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
											nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
											var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;
			
											var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
											nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
										}
										return FinalAmt
								   }

				   				 }//end of for loop
							}//end of else check
					
				 }//end of else if non invnt part
				 else if(type=='Service')
				{
					var itemObj=nlapiLoadRecord('serviceitem',itemId)
	      			var linecount=itemObj.getLineItemCount('price1')
	  				//alert('Line item count is'+linecount);
					for (var y = 1; y <= linecount; y++)
					{
						var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
						//alert('priceLevel'+priceLevel)
						if (priceLevel == 7)
						{
							var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
							if (specialPrice != null && specialPrice != '')
							{
								percent_of_pricelevelB = parseFloat(specialPrice)/100;
								var FinalAmt = parseFloat(specialPrice) - parseFloat(percent_of_pricelevelB);
								nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
							}
							return FinalAmt


					   }

				    }
				 }
				 else if(type=='Discount')
				{
					var itemObj=nlapiLoadRecord('discountitem',itemId)

							var specialPrice = itemObj.getFieldValue('rate');
							//alert('specialPrice is'+specialPrice);
							if (specialPrice != null && specialPrice != '')
							{
								nlapiSetCurrentLineItemValue('item', 'price', priceLevel, false, true);
								//nlapiSetLineItemValue('item', 'price', priceLevel,y);
								nlapiCommitLineItem('item');
							}
							priceFlag = 1;

				 }

				 else if(type=='Markup')
				{
					var itemObj=nlapiLoadRecord('markupitem',itemId)
	      			//var linecount=itemObj.getLineItemCount('price1')
	  				//alert('Line item count is'+linecount);

						//var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
						//alert('priceLevel'+priceLevel)
						// alert('priceLevel is'+priceLevel);
							var specialPrice = itemObj.getFieldValue('rate');
							//alert('specialPrice is'+specialPrice);
							if (specialPrice != null && specialPrice != '')
							{
								nlapiSetCurrentLineItemValue('item', 'price', priceLevel, false, true);
								//nlapiSetLineItemValue('item', 'price', priceLevel,y);
								nlapiCommitLineItem('item');
							}
							priceFlag = 1;
			     }

				 else
				 {
				 		var itemObj=nlapiLoadRecord('assemblyitem',itemId)
	      				var linecount=itemObj.getLineItemCount('price1')
	  					//alert('Line item count is'+linecount);
						for (var y = 1; y <= linecount; y++)
						{
							var priceLevel = itemObj.getLineItemValue('price1', 'pricelevel', y);
							//alert('priceLevel'+priceLevel)
							if (priceLevel == 7)
							{
								var specialPrice = itemObj.getLineItemValue('price1', 'price_1_', y);
								if (specialPrice != null && specialPrice != '')
								{
									var percent_of_pricelevelB = parseFloat(specialPrice)* qty;
									nlapiLogExecution('DEBUG', 'after Submit', 'percent_of_pricelevelB->=' + percent_of_pricelevelB);
									var new_spclPrice = parseFloat(percent_of_pricelevelB)/100;

									var FinalAmt = parseFloat(percent_of_pricelevelB) - parseFloat(new_spclPrice);
									nlapiLogExecution('DEBUG','After Submit', "  FinalAmt==" + FinalAmt);
								}
								return FinalAmt
						   }

				    	}
				 }
*/
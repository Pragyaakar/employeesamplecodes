/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       18 Dec 2018     Tushar More
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
var qtyAvailableUpdate=0;
var newquantity=0;
var tranDate;
var transLocation;
var validity;
var serialNumbers1;
var allSerialNumbers;
var tempserialNumbers = ' ';
var quantity = 0;	
function userEventVendorBillsAfterSubmit(type)
{
  try
  {
	if(type=='create' || type=='edit')
	{
		var tranItem;
		var count =1;
		var recordID = nlapiGetRecordId();
		var searchId= 'customsearch_vndrbill_widout_po';
		var iarec=nlapiLoadRecord('vendorbill',nlapiGetRecordId());
		var type= nlapiGetRecordType();
        var type = ' vendorbill';
        
        var createdFrom=iarec.getFieldValue('createdfrom');
				
	//	if(createdFrom == null || createdFrom == undefined)  
		{
			var ialinecount=iarec.getLineItemCount('item');
			tranDate = iarec.getFieldValue('trandate');
	        nlapiLogExecution('DEBUG', 'aftr submit', "  tranDate  ==" + tranDate);
	        var jsonArray=[];
	        
	        var transItemSearch= findTransaction(recordID,searchId)
			/*var getSearch = nlapiLoadSearch(null, 'customsearch_trans_item_group_search'); 
			//savedsearch.addColumns(column);	
			getSearch.addFilters(filter);

	        var resultset = getSearch.runSearch();
			var transItemSearch = findTransaction(resultset);*/
	        if(transItemSearch)
			{
				nlapiLogExecution('DEBUG', 'aftr submit', "  transItemSearch length  ==" + transItemSearch.length);
				for(var i=0;i<transItemSearch.length;i++)
			    {
					var jsonObj = {
							'item' :  transItemSearch[i].getValue('item',null, 'group'),
							'location' :  transItemSearch[i].getValue('location',null, 'group'),
							'quantity' :  transItemSearch[i].getValue('quantity',null, 'sum'),
							'trandate' :  transItemSearch[i].getValue('trandate',null, 'group'),
						    'validity' :  transItemSearch[i].getValue('custcol_itm_valdty',null, 'group'),
							'serialNumbers' :  transItemSearch[i].getValue('serialnumbers',null, 'group')
					    };
						jsonArray.push(jsonObj);
				}
				 
			}
			    //var itemArray = [];
			    var sorted_arr= [];
			    for(var l=0;l<jsonArray.length;l++)
			    {
			       nlapiLogExecution('DEBUG', 'aftr submit', " l ==" + l);
			       sorted_arr.push(jsonArray[l].item)
			    }
			    
			    nlapiLogExecution('DEBUG', 'aftr submit', "  sorted_arr  ==" + sorted_arr);
			    nlapiLogExecution('DEBUG', 'aftr submit', "  sorted_arr.length  ==" + sorted_arr.length);
			    var itemArray  = sorted_arr.filter(function(item, pos){
			    	  return sorted_arr.indexOf(item)== pos; 
			    });
			    nlapiLogExecution('DEBUG', 'aftr submit', "  itemArray b4 looping  ==" + itemArray);
			    nlapiLogExecution('DEBUG', 'aftr submit', "  jsonArray  ==" + jsonArray.length);
				
				for(var k=0;k<itemArray.length;k++)
				{			
					var tranItemNw = itemArray[k];
				    nlapiLogExecution('DEBUG', 'aftr submit', "  tranItemNw in compare item k ==" + tranItemNw);
				    quantity =0;
				    tempserialNumbers=' ';
					serialNumbers1 = '';
	                allSerialNumbers = '';
			           for(var j = 0 ; j < jsonArray.length ;j++)
					   { 	        	   
			        	  if(jsonArray[j].item == itemArray[k])  // && itemArray[k].item!='undefined'
							{
								    tranItem = jsonArray[j].item;
								    nlapiLogExecution('DEBUG', 'aftr submit', "  tranItem in compare item ==" + tranItem);
									transLocation = jsonArray[j].location;
									//nlapiLogExecution('DEBUG', 'aftr submit', "  transLocation in compare item ==" + transLocation);
									var qty = jsonArray[j].quantity;
									nlapiLogExecution('DEBUG', 'aftr submit', "  value of qty ==" + qty);	
									quantity =  parseFloat(quantity) + parseFloat(qty);
									nlapiLogExecution('DEBUG', 'aftr submit', "  value of j ==" + j);		
									nlapiLogExecution('DEBUG', 'aftr submit', "  quantity of item ==" + quantity);					
									trandate =  jsonArray[j].trandate;
									validity =  jsonArray[j].validity;
									nlapiLogExecution('DEBUG', 'aftr submit', "  validity in for==" + validity);
									
									
									if(tempserialNumbers == ' ')
									{
										
										var srno = jsonArray[j].serialNumbers;
									//	nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers  ==" + srno);
										if(srno.trim() != '- None -')
										{
											nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers when blank ==" + tempserialNumbers);
											tempserialNumbers = srno.replace(/(\r\n|\n|\r)/gm," ");
											nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers when blank ==" + tempserialNumbers);
											allSerialNumbers = tempserialNumbers;
										}									
										else
										{
											allSerialNumbers = '';
										}
											
									}
									else
									{
										//nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers of else 2,1 ==" + serialNumbers);
										var srno = jsonArray[j].serialNumbers;
										if(srno != '-None-')
										{
											//nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers of else 2,2 ==" + srno);
											serialNumbers1 = tempserialNumbers + ','+ srno.replace(/(\r\n|\n|\r)/gm,",");
											nlapiLogExecution('DEBUG', 'aftr submit', "  serialNumbers1 when not blank  ==" + serialNumbers1);
											allSerialNumbers = serialNumbers1;
											//allSerialNumbers = tempserialNumbers.concat(serialNumbers1);
									     	//nlapiLogExecution('DEBUG', 'aftr submit', " if_else allSerialNumbers fin 2,3==" + allSerialNumbers);
										}
										else
										{
											allSerialNumbers = ' ';
											
										}
										
									} 
						      }
					   }
			     
			           if(allSerialNumbers != null)
				       {
						  createCustomRecord(tranItem,transLocation,quantity,allSerialNumbers,validity,tranDate);
				       }
					   else
					   {
						  createCustomRecordforInvItem(tranItem,transLocation,quantity,validity,tranDate);
					   }
			}
		}
		
	}
  }
  catch(e)
  {
    		nlapiLogExecution('ERROR', 'ERROR IS', "  DESCRIPTION = " + e);
  }
}


function createCustomRecord(itemid,location,adjustqtyby,serialArr,valdty,tranDate)
{
	var recObj = nlapiCreateRecord('customrecord_inventory_report_details')
	var dateformat = 'DD-Mon-YYYY'
	//var date = findDateFormat(nlapiStringToDate(tranDate),dateformat);
	if(valdty != null && valdty != '')
	{
		var validityDate_CR = nlapiAddMonths(nlapiStringToDate(tranDate),valdty);
		nlapiLogExecution('DEBUG', 'validityDate_CR', "  validityDate_CR = " + validityDate_CR);
	}
	else
	{
		valdty='';
	}
	//validityDate_CR = nlapiAddDays(nlapiStringToDate(date),valdty);
	recObj.setFieldValue('custrecord_invntry_detail_item',itemid);
	recObj.setFieldValue('custrecord_invntry_detail_ir_date',tranDate);
	nlapiLogExecution('DEBUG', 'validity  in CR', "  valdty = " + valdty);
	recObj.setFieldValue('custrecord_invntry_detail_item_validty',valdty);
	nlapiLogExecution('DEBUG', 'validity in CR', "  valdty = " + valdty);
	recObj.setFieldValue('custrecord_invntry_detail_qty_avlbl',adjustqtyby);
	recObj.setFieldValue('custrecord_invntry_detail_valid_date',validityDate_CR);//custrecord_invntry_detail_snno
	if(serialArr != null && serialArr != '')
	recObj.setFieldValue('custrecord_invntry_detail_snno',serialArr.replace(/[ ,]+/g, ","));
	recObj.setFieldValue('custrecord_invntry_detail_location',location);
	
	nlapiSubmitRecord(recObj,true,false);
}

function  createCustomRecordforInvItem(itemid,location,adjustqtyby,valdty,tranDate)
{
	var recObj = nlapiCreateRecord('customrecord_inventory_report_details')
	var dateformat = 'DD-Mon-YYYY'
	//var date = findDateFormat(tranDate,dateformat);
	if(valdty != null && valdty != '')
	{
		var validityDate_CR = nlapiAddMonths(nlapiStringToDate(tranDate),valdty);
		nlapiLogExecution('DEBUG', 'validityDate_CRin invntry', "  validityDate_CR = " + validityDate_CR);
	}
	else
	{
		valdty='';
	}
	//validityDate_CR = nlapiAddDays(nlapiStringToDate(date),valdty);
	recObj.setFieldValue('custrecord_invntry_detail_item',itemid);
	recObj.setFieldValue('custrecord_invntry_detail_ir_date',tranDate);
	nlapiLogExecution('DEBUG', 'validity in CR', "  valdty = " + valdty);
	recObj.setFieldValue('custrecord_invntry_detail_item_validty',valdty);
	nlapiLogExecution('DEBUG', 'validity in CR', "  valdty = " + valdty);
	recObj.setFieldValue('custrecord_invntry_detail_qty_avlbl',adjustqtyby);
	recObj.setFieldValue('custrecord_invntry_detail_valid_date',validityDate_CR);//custrecord_invntry_detail_snno
	recObj.setFieldValue('custrecord_invntry_detail_location',location);
	nlapiSubmitRecord(recObj,true,false);
}


function findTransaction(recordID,searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	var filters=new Array();
	filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',recordID);
	savedSearch.addFilters(filters);
	   
	    var resultset = savedSearch.runSearch();
		var returnSearchResults = [];
	    var searchid = 0;
	    do {
    	
	        var resultslice = resultset.getResults(searchid, searchid + 1000);
	        if(resultslice!= null)
	        {
	    	   for ( var rs in resultslice) 
		        {
		        	returnSearchResults.push(resultslice[rs]);
		            searchid++;
		        }
	    	   nlapiLogExecution('DEBUG','searchid','searchid'+searchid);
	        }
	        
	    } while (resultslice!=null && resultslice>0);
	    //nlapiLogExecution('DEBUG', "Search Results", "returnSearchResults"+returnSearchResults.length);
	  
	    return returnSearchResults;
}
/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       6 Nov 2019     Tushar
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

function userEventIRLineDataBlank(type)
{
	
	try
	{
		
	
	var recordId = nlapiGetRecordId();
	var recordType = nlapiGetRecordType();
	

		var irObj = nlapiLoadRecord(recordType,recordId);
		nlapiLogExecution('DEBUG','Search Value','irObj :'+irObj +'Type :'+recordType+'ID :'+recordId);
	  
		
			
		
		
		
		var blank ='';
		var lineCount = irObj.getLineItemCount('item');
		nlapiLogExecution('DEBUG','Search Value','lineCount :'+lineCount);
		
		var searchId ='customsearch666';
		var resultSet = findTransaction(searchId,recordId);
		
		var lineNumArr=[];
		
		var UsrChk = nlapiGetUser();
		
		
			if(resultSet)
			{
				
				for(i1=0;i1<resultSet.length;i1++)
			    {
					var fromCreat =  resultSet[i1].getValue('createdfrom');
					var fromCreatTxt =  resultSet[i1].getText('createdfrom');
					var FromOffromCreat =  resultSet[i1].getValue("createdfrom","createdFrom");
					var FromOffromCreatTxt =  resultSet[i1].getText("createdfrom","createdFrom");
					
					nlapiLogExecution('DEBUG','Search Value','fromCreatTxt :'+fromCreatTxt);
					
					if(fromCreatTxt.substr(0,11) =='Sales Order')
					{
						createFrom = fromCreat;
					}
					else if(FromOffromCreatTxt.substr(0,11) =='Sales Order')
					{
						createFrom = FromOffromCreat;
					}
					else
					{
						createFrom =null;
					}
					
					var lineNos =  resultSet[i1].getValue("line","applyingTransaction");
					lineNumArr.push(lineNos);
				}//End of if linecount	 
				
				
				
	             var cust_fields = ['entity','tranid'];
				
				if(createFrom !=null && createFrom !='' && createFrom != undefined)
				{
					var poObj = nlapiLookupField('salesorder',createFrom,cust_fields);
					 
					var entityName = poObj.entity;
			        
					var transNum = poObj.tranid;
					
				}
				
				nlapiLogExecution('DEBUG','Search Value','createFrom :'+createFrom);
				nlapiLogExecution('DEBUG','Search Value','entityName :'+entityName);
				nlapiLogExecution('DEBUG','Search Value','transNum :'+transNum);
				
				for(m=0;m<lineNumArr.length;m++)
				{
					for(i=1;i<=lineCount;i++)
				    {
						    nlapiLogExecution('DEBUG','Search Value','lineCount in for loop');
						    
						    var lineid = irObj.getLineItemValue('item','line',i);
						    
						       if(lineid == lineNumArr[m] )
						    	{
						    	     irObj.setLineItemValue('item','custcol_cls_bill_order',i,createFrom);
									 irObj.setLineItemValue('item','custcol_entity_name',i,entityName);
									 irObj.setLineItemValue('item','custcol_order_number',i,transNum);
							
						    	}
							
					 } 
				}
				
			}
			else
			{
				for(i=1;i<=lineCount;i++)
			    {
					    nlapiLogExecution('DEBUG','Search Value','lineCount in for loop');
						 irObj.setLineItemValue('item','custcol_cls_bill_order',i,blank);
						
					    irObj.setLineItemValue('item','custcol_entity_name',i,blank);
						irObj.setLineItemValue('item','custcol_order_number',i,blank);
				
				 }//End of if linecount	 
			}
		   
		
		nlapiSubmitRecord(irObj,true);
	
	 }
	catch(e)
	{
		nlapiLogExecution('DEBUG','Search Value','Error :'+e);	
	}
	}

function findTransaction(searchId,recordId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('internalid','applyingtransaction','anyOf',recordId);
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
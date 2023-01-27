/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00      8 Aug 2019     Tushar More
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
function userEvntToCreateCustTransaction(type)
{
	if(type == 'create')
	{
	 try
	  {
		  // var custTransArr =[];
		   var itemArray = new Array();
		 	var rateArray = new Array();
		 	var jsonArray3= [];
		 	var descriptionArray = new Array();
		 	var qtyArray = new Array();
		 	var unitArray = new Array();
		 	var locationArray = new Array();
		 	var line_chkArr=new Array();
		 	var salesArr=new Array();
		 	var custArr=new Array();
		 	var vendArr=new Array();
		 	var amtArr=new Array();
		 	var custNew=new Array();
		 	var typeItemArr =new Array();
	    	var BackOrderQtyArray =new Array();
		
		var recordId = nlapiGetRecordId();
		var recordType = nlapiGetRecordType();
		  
		var recObj = nlapiLoadRecord(recordType,recordId);
			nlapiLogExecution('DEBUG','Serach Value','irObj :'+recObj +'Type :'+recordType+'ID :'+recordId);
			
		
		   var ParentTransaction = recObj.getFieldValue('custrecord_assetsourcetrn');
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  ParentTransaction  ==" + ParentTransaction);
		 	
		 	var AssetDescription = recObj.getFieldValue('custrecord_assetdescr');  //entity
		 	nlapiLogExecution('DEBUG', 'b4 submit', "  AssetDescription  ==" + AssetDescription);
		 	
		 	var AssetProject = recObj.getFieldValue('custrecord_assetproject');  //custrecord_assetsourcetrnline
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  AssetProject  ==" + AssetProject);
		 	
		
		 	var parenttransLine = recObj.getFieldValue('custrecord_assetsourcetrnline');  //custrecord_assetsourcetrnline
		 	nlapiLogExecution('DEBUG', 'aftr submit', "  parenttransLine  ==" + parenttransLine);
		 	
		
//================= Set Parent Asset =========================		
		
		
		
		var Obj =nlapiLoadRecord('vendorbill',ParentTransaction);
		
		var tranResultSet1 =Obj.getLineItemCount('item');
		nlapiLogExecution('DEBUG', 'b4 submit', "  OObj  ==" + Obj+' tranResultSet1'+tranResultSet1);
		 
			var tranResultSet2 =Obj.getLineItemCount('expense');
		nlapiLogExecution('DEBUG', 'b4 submit', "  OObj  ==" + Obj+' tranResultSet2'+tranResultSet2);
		 
		
		
		
		 	if(tranResultSet1 > 0)
		 	{
		 		
		     	for(var i=1;i<=tranResultSet1;i++)
					{
			 			var customer = Obj.getLineItemValue('item','customer',i);
			 			nlapiLogExecution('DEBUG', 'b4 submit', "  customer  ==" + customer);
			 			
			 			var relatedAsset = Obj.getLineItemValue('item','custcol_far_trn_relatedasset',i);
			 			nlapiLogExecution('DEBUG', 'b4 submit', "  relatedAsset  ==" + relatedAsset);
			 		
			 			if(customer == AssetProject && AssetProject!=null && ParentTransaction!=null )
		 				{
			 				nlapiLogExecution('DEBUG', 'b4 submit', "  relatedAsset  Setting==");
			 			
							 nlapiSubmitField(recordType,recordId,'custrecord_assetdepractive','2');
			 				 nlapiSubmitField(recordType,recordId,'custrecord_assetparent',relatedAsset);
			 				break;
		 				}
					} 
		 			
		    	}	
		       		 	else if(tranResultSet2 >0)
		 	{
		 		
		     	for(var j=1;j<=tranResultSet2;j++)
					{
			 			var customer1 = Obj.getLineItemValue('expense','customer',j);
			 			nlapiLogExecution('DEBUG', 'b4 submit', " expense customer  ==" + customer1);
			 			
			 			var relatedAsset1 = Obj.getLineItemValue('expense','custcol_far_trn_relatedasset',j);
			 			nlapiLogExecution('DEBUG', 'b4 submit', " expense relatedAsset  ==" + relatedAsset1);
			 		
			 			if(customer1 == AssetProject && AssetProject!=null && ParentTransaction!=null )
		 				{
			 				nlapiLogExecution('DEBUG', 'b4 submit', "  relatedAsset  Setting==");
			 			
							 nlapiSubmitField(recordType,recordId,'custrecord_assetdepractive','2');
			 				 nlapiSubmitField(recordType,recordId,'custrecord_assetparent',relatedAsset1);
			 				break;
		 				}
					} 
		 			
		    	}	
		
		
		
		
//====================== ENd ===============================		
	  
        if(relatedAsset !=null && relatedAsset !=undefined && relatedAsset !='')
        {
          var ParentAsset = relatedAsset;  
        }
        else if(relatedAsset1 !=null && relatedAsset1 !=undefined && relatedAsset1 !='')
		{
           var ParentAsset = relatedAsset1;  
        }
	 	nlapiLogExecution('DEBUG', 'aftr submit', "  ParentAsset  ==" + ParentAsset);
	 	
		
		
		 	
		
		 	if(ParentAsset != null && AssetProject!=null && ParentTransaction!=null)
	        {
		 		nlapiLogExecution('DEBUG', 'aftr submit', "  INSIDE TRans created Search call  ==" );
		 	 	
			 	var searchId='customsearch_asset_with_cwip';
			 	var tranResultSet =findTransaction(searchId,ParentTransaction);
			 	var AccArray=[];
			 	
			 	var totAmt =0;
			 	
			 	if(tranResultSet!=null && tranResultSet!='' && tranResultSet!=undefined)
			 	{
			 		var custTransArr =[];
			 		
			 			for(var i=0;i<tranResultSet.length;i++)
						{
				 			var subsidiary = tranResultSet[i].getValue('subsidiary');
				 			nlapiLogExecution('DEBUG', 'aftr submit', "  subsidiary  ==" + subsidiary);
				 			
				 			var currency = tranResultSet[i].getValue('currency');
				 			nlapiLogExecution('DEBUG', 'aftr submit', "  currency  ==" + currency);
				 			
				 			var CWIP_Acc = tranResultSet[i].getValue("custrecord_cwip_account","account",null);
				 			nlapiLogExecution('DEBUG', 'aftr submit', "  CWIP_Acc  ==" + CWIP_Acc);
				 			
				 			var AssetAcc = tranResultSet[i].getValue('account');
				 			nlapiLogExecution('DEBUG', 'aftr submit', "  AssetAcc  ==" + AssetAcc);
				 			
				 			var AmtFor = tranResultSet[i].getValue('custcol_gross_amount');
				 			nlapiLogExecution('DEBUG', 'aftr submit', "  AmtFor  ==" + AmtFor);
				 			
				 			if(AmtFor !=null && AmtFor !='' && AmtFor!=undefined)
				 			{
				 				AmtFor=AmtFor;
				 			}else
				 			{
				 				AmtFor=0;
				 			}
			 		    		totAmt += parseFloat(AmtFor);
			 				
				 			var date  = tranResultSet[i].getValue('trandate');
				 			nlapiLogExecution('DEBUG', 'aftr submit', "  date  ==" + date);
				 			
				 			
						} 
                       
                        	var SubmitValue = createCustTransFromAsset(ParentAsset,AssetProject,ParentTransaction,date,subsidiary,currency,CWIP_Acc,AssetAcc,totAmt);
				 		
                            custTransArr.push(SubmitValue);
                            nlapiLogExecution('DEBUG', 'aftr submit', "  totAmt  ==" + totAmt);
			 			
                         
			 		
			 	}
			
			  var RecordIDs =Obj.getFieldValues('custbody_cust_tran_id_for_asset');
				nlapiLogExecution('DEBUG', 'aftr submit', "  RecordIDs  ==" + RecordIDs);
				nlapiLogExecution('DEBUG', 'aftr submit', "  SubmitValue  ==" + SubmitValue);
			 	
              if((RecordIDs != null && RecordIDs != '' && RecordIDs != undefined)&&(SubmitValue != null && SubmitValue != '' && SubmitValue != undefined))
              {
				   nlapiSubmitField('vendorbill',ParentTransaction,'custbody_cust_tran_id_for_asset',RecordIDs.concat(custTransArr));	
				   
              }
              else if((SubmitValue != null && SubmitValue != '' && SubmitValue != undefined)&&(RecordIDs == null || RecordIDs == ''|| RecordIDs == undefined) )
              {
				 nlapiSubmitField('vendorbill',ParentTransaction,'custbody_cust_tran_id_for_asset',custTransArr);	
				    	 
              }
              
			 nlapiSubmitField(recordType,recordId,'custrecord_assetdepractive','2');
				   
	        }
		 	
	    
	  }
	  catch(e)
	  {
	    nlapiLogExecution("DEBUG","In Create Function","ERROR =="+e );
	  }
}
}


function createCustTransFromAsset(ParentAsset,AssetProject,ParentTransaction,date,subsidiary,currency,CWIP_Acc,AssetAcc,totAmt)
{	
	
	nlapiLogExecution("DEBUG","In Create Function","createCustomTransactionFunction**************");
	
     var record = nlapiCreateRecord('customtransaction_asset_with_cwip', {recordmode: 'dynamic'}); //, {recordmode: 'dynamic'}
		
  
	if(date != '' && date != 'undefined' && date != null)
	{
		
		record.setFieldValue('trandate',date);
	}

	if(subsidiary != '' && subsidiary != 'undefined' && subsidiary != null)
	{
		// To Set Subsidiary
		record.setFieldValue('subsidiary',subsidiary);
	}
	
	
	record.setFieldValue('custbody_cust_asset',ParentAsset);
	
	record.setFieldValue('custbody_from_transaction',ParentTransaction);
	

	
	var memo ='CustomTransactionCreated';
	
	record.selectNewLineItem('line');
	record.setCurrentLineItemValue('line', 'account', CWIP_Acc);
	record.setCurrentLineItemValue('line', 'debit', totAmt);
	record.setCurrentLineItemValue('line', 'entity', AssetProject);
	record.setCurrentLineItemValue('line', 'custcol_cwip_line_acc', AssetAcc);//custcol_cwip_line_acc
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');
	
	
	record.selectNewLineItem('line');
	record.setCurrentLineItemValue('line', 'account', AssetAcc);
	record.setCurrentLineItemValue('line', 'credit', totAmt);
	record.setCurrentLineItemValue('line', 'memo', memo);
	record.commitLineItem('line');

	
	 var SubmitIt = nlapiSubmitRecord(record);  
	 nlapiLogExecution("DEBUG","In Create Function","Submit done=="+SubmitIt);
	 
	return  SubmitIt;
}




function findTransaction(searchId,ParentTransaction)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);"line","equalto","2"
	// var recordID =6042;
	var filters=new Array();
	 filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',ParentTransaction);
	// filters[1]=new nlobjSearchFilter('line', null,'equalto',parenttransLine);
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

function removeDuplicate(jsonArray3, prop)
{
	var new_arr = [];
	var lookup = {};
	for (var i in jsonArray3) {
	    lookup[jsonArray3[i][prop]] = jsonArray3[i];
	}
	for (i in lookup) {
	    new_arr.push(lookup[i]);
	}
	return new_arr;
	}
	
	
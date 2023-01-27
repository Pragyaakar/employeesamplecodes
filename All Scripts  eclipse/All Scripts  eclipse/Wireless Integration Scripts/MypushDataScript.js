	/**
	 * Module Description
	 * 
	 * Version    Date            Author           Remarks
	 * 1.00       20 Feb 2020  2020     Tushar More
	 *
	 */
	
	/**
	 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
	 * @appliedtorecord recordType
	 * 
	 * @param {String} type Sublist internal id
	 * @param {String} name Field internal id
	 * @param {Number} linenum Optional line item number, starts from 1
	 * @returns {Void}
	 */
	
	

function schedulePushData(type) 
{	
    var s_restlet_URL = "https://tstdrv1941155.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=2694&deploy=1";	
	var s_consumer_key    = "814ab1dd27312a324f049d00e7387bf871e9d70946f5e19c7ee4d3c0aa19788b";
	var s_consumer_secret = "a2de42e7eb2d266675d7f75c542d63db7b722455ef2c12b9832020b0e3c14c5d";
	var s_token_secret    = "b4c8f53493d4dd61795c50af91eed6c6d08c46dd07177cf33736598e7b9a8103";
	var s_token_key       =	"65a9115d8b1d6e1392b732d14bf756ca911634f1b4b30745469a0a4e3f547a07"; 
	var i_accountID = 'TSTDRV1941155';	
						
	var signatureKeyParam  =  get_OAuth_Signature();
	//JSON DATA
	
	//===============================================================================================
	
	var s_JSON_Data =[];
	var searchId='customsearch_tm_trans_for_integration';
	resultSet = findTransaction(searchId);
	
			if(resultSet!='' && resultSet!= null && resultSet !='undefined')
			{
				nlapiLogExecution('DEBUG','resultSet length','resultSet length'+resultSet.length);	    
				for(var i=0;i<40;i++)//resultSet.length
					{
						try
						{

							
						    var transMap={};
							var columns = resultSet[i].getAllColumns();
							recId = resultSet[i].getValue(columns[0]);
							var docNo = resultSet[i].getValue(columns[1]);
							
							//var status = resultSet[i].getValue(columns[2]);
							var type = resultSet[i].getValue(columns[2]);
							var date = resultSet[i].getValue(columns[3]);
							
					//===============================================================		
						    if(type =='SalesOrd')
							{
						    	
						      var itemArr =[];
						      var qtyArr =[];
						      var qtyCommitArr=[];
						      var qtyFulfillArr=[];
						      var qtyInvoicedArr=[];
						      var qtyBackOrderArr=[];
						      var unitsArr=[];
						      var descripArr=[];
						      var priceLvlArr=[];
						      var rateArr=[];
						      var amtArr=[];
						      var costEstTypeArr=[];
						    	
							  var loadRec = nlapiLoadRecord('salesorder',recId);
							  
							  if(loadRec != null && loadRec != '' && loadRec !=undefined)
							  {
								  nlapiLogExecution("DEBUG","In Create Function","loadRec =="+loadRec);
								  
								  var docNum = loadRec.getFieldValue('tranid');
								  var customer = loadRec.getFieldText('entity');
								  var tranDate = loadRec.getFieldValue('trandate');
								  var subsi = loadRec.getFieldText('subsidiary');
								  var location = loadRec.getFieldText('location');
								  var salesEffDate = loadRec.getFieldValue('saleseffectivedate');
								  var shipDate = loadRec.getFieldValue('shipdate');
								  var createdFrom = loadRec.getFieldValue('createdfrom');
								  var shipCarrier = loadRec.getFieldValue('shipcarrier');
								  var actulShipDate = loadRec.getFieldValue('actualshipdate');
								  
								  var currency = loadRec.getFieldValue('currency');
								  var exchRate = loadRec.getFieldValue('exchangerate');
								  var estExtCost = loadRec.getFieldValue('totalcostestimate');
								  var estGrossProfit = loadRec.getFieldValue('estgrossprofit');
								  var estGrossProfitPercent = loadRec.getFieldValue('estgrossprofitpercent');
								  
								 /* nlapiLogExecution("DEBUG","In Create Function","customer =="+customer);
								    nlapiLogExecution("DEBUG","In Create Function","docNum =="+docNum);
								    nlapiLogExecution("DEBUG","In Create Function","subsi =="+subsi);
								    nlapiLogExecution("DEBUG","In Create Function","location =="+location);
								  */
								  
								  var lineCount = loadRec.getLineItemCount('item');
								  
								    for( var l=1;l<=lineCount;l++)
									{
									    var item = loadRec.getLineItemText('item','item',l);
									  /*  
									    if(item==15){
									    	item==6421;
								        }
								        else if(item==10){
								        	item=6422;
								        }
								        else if(item==12){
								        	item=6423;
								        }*/
									    
									    var qty = loadRec.getLineItemValue('item','quantity',l);
									    
									    var qtyComm = loadRec.getLineItemValue('item','quantitycommitted',l);
									    
									    var qtyInv = loadRec.getLineItemValue('item','quantitybilled',l);
									   
									    var qtyFulfill = loadRec.getLineItemValue('item','quantityfulfilled',l);
									    
									    var qtyBckOrd= loadRec.getLineItemValue('item','quantitybackordered',l);
									    
									    var unit = loadRec.getLineItemValue('item','units',l);
									    
									    var descr = loadRec.getLineItemValue('item','description',l);
									    
					                     var priclvl = loadRec.getLineItemValue('item','price',l);
									    
									    var Rate = loadRec.getLineItemValue('item','rate',l);
									    
									    var amount = loadRec.getLineItemValue('item','amount',l);
									    
									    
									    var costEstType = loadRec.getLineItemValue('item','costestimatetype',l);
									    
									    itemArr.push(item);
									    qtyArr.push(qty);
									    qtyCommitArr.push(qtyComm);
									    qtyFulfillArr.push(qtyFulfill);
									    qtyInvoicedArr.push(qtyInv);
									    qtyBackOrderArr.push(qtyBckOrd);
									    unitsArr.push(unit);
									    descripArr.push(descr);
									    priceLvlArr.push(priclvl);
									    rateArr.push(Rate);
									    amtArr.push(amount);
									    costEstTypeArr.push(costEstType);
									    
									}
								  
								  /*  nlapiLogExecution("DEBUG","In Create Function","itemArr =="+itemArr);
								    nlapiLogExecution("DEBUG","In Create Function","qtyArr =="+qtyArr);
								    nlapiLogExecution("DEBUG","In Create Function","rateArr =="+rateArr);
								    nlapiLogExecution("DEBUG","In Create Function","costEstTypeArr =="+costEstTypeArr);
								    */
								    transMap['record_id']=recId;
									transMap['record_type']=type;
									transMap['record_date']=tranDate;
									transMap['record_doc_num']=docNum;
									transMap['record_customer']=customer;
									transMap['record_subsi']=subsi;
									transMap['record_loc']=location;
									transMap['record_sales_eff_date']=salesEffDate;
									transMap['record_shipdate']=shipDate;
									transMap['record_createdfrom']=createdFrom;
									
									transMap['record_shipcarri']=shipCarrier;
									transMap['record_ship_act_date']=actulShipDate;
									transMap['record_est_grs_profit_perc']=estGrossProfitPercent;
									transMap['record_currency']=currency;
									transMap['record_exrate']=exchRate;
									transMap['record_est_extcost']=estExtCost;
									transMap['record_est_grs_profit']=estGrossProfit;
									transMap['record_itmarr']=itemArr;
									transMap['record_qtyarr']=qtyArr;
									transMap['record_qty_comm_arr']=qtyCommitArr;
									transMap['record_qty_fulfil_arr']=qtyFulfillArr;
									
									transMap['record_qty_inv_arr']=qtyInvoicedArr;
									transMap['record_qty_back_arr']=qtyBackOrderArr;
									transMap['record_unit_arr']=unitsArr;
									transMap['record_descrp_arr']=descripArr;
									
									transMap['record_price_arr']=priceLvlArr;
									transMap['record_rate_arr']=rateArr;
									transMap['record_amt_arr']=amtArr;
									transMap['record_cest_type']=costEstTypeArr;
									
								
								 
							  }		
							
					//==================================================================
							
							s_JSON_Data.push(transMap);
						}
				 
						}
						catch(e)
						{
							nlapiLogExecution('DEBUG','resultSet length','Error =='+e);	
							
						}
					}
				nlapiLogExecution('DEBUG','resultSet length','s_JSON_Data =='+JSON.stringify(s_JSON_Data));	
			}
			
	
	//========================================================================================================
/*	var s_JSON_Data = [{"categoryid": "WDAY","employeeid":"101XSPEC02X01","locationid":"10_205_24303_","type" : "testtype1","units":"12.00","rate":"26.0000","timein":"28/12/2016 18:00","timeout":"29/12/2016 06:00","comments":"This is comment1"},
	{"categoryid": "WDAY","employeeid":"101XSPEC02X02","locationid":"10_205_24404_","type" : "testtype2","units":"24.00","rate":"28.9900","timein":"29/12/2016 18:00","timeout":"30/12/2016 06:00","comments":"This is comment2"},{"categoryid": "WDAY","employeeid":"101XSPEC02X02","locationid":"10_205_24404_","type" : "testtype3","units":"24.00","rate":"28.9900","timein":"29/12/2016 18:00","timeout":"30/12/2016 06:00","comments":"This is comment3"}]
*/
	var s_JSON_String = JSON.stringify(s_JSON_Data);
	
	nlapiLogExecution('DEBUG', 'suiteletFunction', 'normalizedParameters=' + signatureKeyParam[0].toString());
	nlapiLogExecution('DEBUG', 'suiteletFunction', 'signatureBaseString=' + signatureKeyParam[1].toString());
	nlapiLogExecution('DEBUG', 'suiteletFunction', 'signature=' + signatureKeyParam[2].toString());
	
	var header        = signatureKeyParam[3];			
	var headerVal     = header.Authorization;	
	var signatureKey  = signatureKeyParam[2];
	
	if(signatureKey.indexOf("+") != -1)
	{
		signatureKey.replace("+","%2B");
	}
	
	signatureKey	=	encodeURIComponent(signatureKey);	
    var nonce  		= 	signatureKeyParam[4];
	var timestamp   = 	signatureKeyParam[5];
	var accountID   = 	signatureKeyParam[6];
	nlapiLogExecution('DEBUG', 'suiteletFunction', 'accountID=' + accountID);
			   
    var  header = "OAuth ";
    header += "oauth_signature=\"" + signatureKey + "\",";
    header += "oauth_version=\"1.0\",";
    header += "oauth_nonce=\"" + nonce + "\",";
    header += "oauth_signature_method=\"HMAC-SHA1\",";
    header += "oauth_consumer_key=\"" + s_consumer_key + "\",";
    header += "oauth_token=\"" + s_token_key + "\",";
    header += "oauth_timestamp=\"" + timestamp+ "\",";
    header += "realm=\"" + accountID+ "\"";

	nlapiLogExecution('DEBUG', 'suiteletFunction', 'AuthorizationHeader=' + header);
	
	var header_request             = new Array();
	header_request['Action']       = 'POST';
	header_request['Content-Type'] = 'application/json';
	header_request['Authorization']= header;
	 
	var s_response = nlapiRequestURL(s_restlet_URL, s_JSON_String , header_request, null, "POST");
	nlapiLogExecution('DEBUG', 'suiteletFunction', 'Code=' + s_response.getCode())			
	/*			
    var html = 'Calling: ' +
    s_restlet_URL +
	'<br><br>' +
	'Generated OAuth header:<br>' +
	header +
	'<br><br>' +
	'Response:<br>' +
	s_response.getBody() + ' <br>'+
	' Response Code:'+
	s_response.getCode()	
	response.write(html);*/
}
function get_OAuth_Signature() 
{	
	 var s_restlet_URL = "https://tstdrv1941155.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=2694&deploy=1";	
		var s_consumer_key    = "814ab1dd27312a324f049d00e7387bf871e9d70946f5e19c7ee4d3c0aa19788b";
		var s_consumer_secret = "a2de42e7eb2d266675d7f75c542d63db7b722455ef2c12b9832020b0e3c14c5d";
		var s_token_secret    = "b4c8f53493d4dd61795c50af91eed6c6d08c46dd07177cf33736598e7b9a8103";
		var s_token_key       =	"65a9115d8b1d6e1392b732d14bf756ca911634f1b4b30745469a0a4e3f547a07"; 
		var i_accountID = 'TSTDRV1941155';	
			
	var param = '';        		
    var accessor = { consumerSecret: s_consumer_secret
                   , tokenSecret   : s_token_secret
				   };				   
    var message = { method: 'POST'
                  , action: s_restlet_URL
                  , parameters: OAuth.decodeForm(param)
                  }; 	
	var timeStamp 		 =	OAuth.timestamp();
	var nonce 			 =	OAuth.nonce(11);	
	message.parameters.push(['oauth_consumer_key', s_consumer_key]);
	message.parameters.push(['oauth_nonce', nonce]);	
	message.parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
	message.parameters.push(['oauth_timestamp',timeStamp]);		
	message.parameters.push(['oauth_token', s_token_key]);
	message.parameters.push(['oauth_version', '1.0']);	
    OAuth.SignatureMethod.sign(message, accessor);
    var arrSign	=  [];	
    arrSign [0] =  OAuth.SignatureMethod.normalizeParameters(message.parameters);
    arrSign [1] =  OAuth.SignatureMethod.getBaseString(message);
    arrSign [2] =  OAuth.getParameter(message.parameters, "oauth_signature");
    arrSign [3] =  OAuth.getAuthorizationHeader(i_accountID, message.parameters);
	arrSign [4] =  nonce;
	arrSign [5] =  timeStamp;
	arrSign [6] =  i_accountID;
	return arrSign;
}



function findTransaction(searchId)
{
	var savedSearch = nlapiLoadSearch(null,searchId); 
	
	//var filterExpr = savedSearch.getFilterExpression();
	//savedSearch.setFilterExpression(filterExpression);
	// var recordID =6042;
	var filters=new Array();
	// filters[0]=new nlobjSearchFilter('internalid', null,'anyOf',recordID);
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
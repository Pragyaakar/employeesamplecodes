function suiteletFunction(request,response) 
{	
    var s_restlet_URL = "https://rest.na2.netsuite.com/app/site/hosting/restlet.nl?script=131&deploy=1";	
	var s_consumer_key    = "5ad823b24c174c623b8e014fca2848ef9af1c15235d8c3c6ac1edb81c94187e1";
	var s_consumer_secret = "2c477097628c5b7e7002fe4fb92941584d7384c30483cf5786a2f1067f3f954d";
	var s_token_secret    = "45c598d97c1c2deeef126a425f618154123985fb023780e266e7afaa36100787";
	var s_token_key       =	"38dba6fcb48cf263849e94947f42fb004f9d9a8ba8cbd93b2091a61db1a5a3ef"; 
	var i_accountID = '4665082';	
						
	var signatureKeyParam  =  get_OAuth_Signature();
	//JSON DATA
	var s_JSON_Data = [{"categoryid": "WDAY","employeeid":"101XSPEC02X01","locationid":"10_205_24303_","type" : "testtype1","units":"12.00","rate":"26.0000","timein":"28/12/2016 18:00","timeout":"29/12/2016 06:00","comments":"This is comment1"},
	{"categoryid": "WDAY","employeeid":"101XSPEC02X02","locationid":"10_205_24404_","type" : "testtype2","units":"24.00","rate":"28.9900","timein":"29/12/2016 18:00","timeout":"30/12/2016 06:00","comments":"This is comment2"},{"categoryid": "WDAY","employeeid":"101XSPEC02X02","locationid":"10_205_24404_","type" : "testtype3","units":"24.00","rate":"28.9900","timein":"29/12/2016 18:00","timeout":"30/12/2016 06:00","comments":"This is comment3"}]

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
	response.write(html);
}
function get_OAuth_Signature() 
{	
	var restletUrl = "https://rest.na2.netsuite.com/app/site/hosting/restlet.nl?script=131&deploy=1";	
	var s_consumer_key    = "5ad823b24c174c623b8e014fca2848ef9af1c15235d8c3c6ac1edb81c94187e1";
	var s_consumer_secret = "2c477097628c5b7e7002fe4fb92941584d7384c30483cf5786a2f1067f3f954d";
	var s_token_secret    = "45c598d97c1c2deeef126a425f618154123985fb023780e266e7afaa36100787";
	var s_token_key       =	"38dba6fcb48cf263849e94947f42fb004f9d9a8ba8cbd93b2091a61db1a5a3ef"; 
	var i_accountID       = '4665082';	
	var param = '';        		
    var accessor = { consumerSecret: s_consumer_secret
                   , tokenSecret   : s_token_secret
				   };				   
    var message = { method: 'POST'
                  , action: restletUrl
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

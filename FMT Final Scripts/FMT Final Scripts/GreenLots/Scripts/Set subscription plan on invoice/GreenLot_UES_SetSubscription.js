/**
*@NApiVersion 2.x
*@NScriptType UserEventScript
*/
define(['N/record','N/search','N/log','N/ui/serverWidget','N/runtime'],
  function(record,search,log,serverWidget,runtime) {
    function afterSubmit(context) {
    	try
    	{
    		var rec_id = context.newRecord.id; 
	        var rec_type = context.newRecord.type;

	        var recObj =  record.load({
		        type: rec_type,
		        id: rec_id,
		        isDynamic: false,
	        });

	        var soLineCount = recObj.getLineCount({
				sublistId: 'item'
			});
	        log.audit('soLineCount',soLineCount);

	        var subscriptionArr = [];

	        for(var q = 0; q < soLineCount; q++)
			{
				var inv_Subscription = recObj.getSublistValue({sublistId: 'item', fieldId: 'subscription', line: q});
				subscriptionArr.push(inv_Subscription);
			}

			log.audit('subscriptionArr',subscriptionArr);

			var callSearch = subscriptionSearch(subscriptionArr);
			log.audit('callSearch',callSearch);

			for(var w = 0; w < soLineCount; w++)
			{
				var subscriptionVal = recObj.getSublistValue({sublistId: 'item', fieldId: 'subscription', line: w});
				
				if(callSearch)
				{
					recObj.setSublistValue({
						sublistId: 'item',
						fieldId: 'custcol_fmt_subscription_plan',
						line: w,
						value: callSearch[subscriptionVal]
					});
				}
			}

			var recordId = recObj.save({enableSourcing: true,ignoreMandatoryFields: true});
			log.audit('recordId',recordId);
	    }
    	catch(e)
    	{
    		log.audit('Error',e);
    	}
	}

	function subscriptionSearch(subscriptionArr)
	{
		log.audit('Welcome in Subscription Search');
		log.audit('subscriptionArr Inside Search',subscriptionArr);

		var searchObj = search.create({
			type: "subscription",
			filters:
			[
				["internalid","anyof",subscriptionArr]
			],
			columns:
			[
				search.createColumn({
			         name: "internalid",
			         sort: search.Sort.ASC,
			         label: "Internal ID"
			    }),
			    search.createColumn({name: "subscriptionplan", label: "Subscription Plan"})
			]
		});

		var firstResult = searchAll(searchObj.run()); 
		log.audit('firstResult',firstResult.length);

		var subMap = {};

		for(var i2 = 0; i2 < firstResult.length; i2++) 
		{
			var internalID = firstResult[i2].getValue({name: "internalid",sort: search.Sort.ASC,label: "Internal ID"});
			log.audit('internalID',internalID);

			var subscriptionType = firstResult[i2].getValue({name: "subscriptionplan", label: "Subscription Plan"});
			log.audit('subscriptionType',subscriptionType);
			
			//if(subMap[internalID])
			{
				subMap[internalID] = subscriptionType;
			}
		}

		log.audit('subMap',subMap);

		return subMap;
	}

	function searchAll(resultset) 
	{
		var allResults = [];
		var startIndex = 0;
		var RANGECOUNT = 1000;

		do 
		{
			var pagedResults = resultset.getRange({
				start: parseInt(startIndex),
				end: parseInt(startIndex + RANGECOUNT)
			});

			allResults = allResults.concat(pagedResults);
			//log.debug({title: '199',details: allResults});

			var pagedResultsCount = pagedResults != null ? pagedResults.length : 0;
			startIndex += pagedResultsCount;

			var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
			//log.debug({title: '207', details: remainingUsage});
		}

		while (pagedResultsCount == RANGECOUNT);
		var remainingUsage = runtime.getCurrentScript().getRemainingUsage();
		//log.debug({title: '213', details: remainingUsage});

		return allResults;
	}

	return{
		afterSubmit: afterSubmit
	};
});

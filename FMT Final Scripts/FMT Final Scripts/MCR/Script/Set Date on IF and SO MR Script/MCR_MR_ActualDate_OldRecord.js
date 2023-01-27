/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 */


 define(['N/search', 'N/record','N/error', 'N/runtime',],
 function(search,record,error,runtime)
 {
 	function getInputData(context)
 	{
 		try
 		{
 			var currentScript = runtime.getCurrentScript();

 			var iFSearch = currentScript.getParameter({name: 'custscript_mcr_update_oldrec'});
			
			var savedSearch = search.load({
	            id: iFSearch, 
	        });

			/*var resultSet = savedSearch.run();
			var firstResult = resultSet.getRange({start: 0,end: 1000});*/

			var firstResult = searchAll(savedSearch.run());

		    if(firstResult) 
		    {
		    	var lineMap = [];

		    	log.debug('firstResult.length', firstResult.length);

		    	for (var k = 0; k < firstResult.length; k++) 
				{
					var tranID = firstResult[k].getValue({name: "internalid",sort: search.Sort.ASC,label: "Internal ID"});
					var tranDate = firstResult[k].getValue({name: "trandate",label: "Date"});

					lineMap.push({
						'id': tranID,
						'date_val': tranDate
					})
				}
		    }

		    return lineMap;    
 		}
 		catch(ex)
 		{
 			log.error('Error Occures', ex.toString());
 		}
 	}
 	function map(context)
 	{
 		try
 		{
 			var searchResult = JSON.parse(context.value); // Capture all values from getInputData function
 		log.debug('search result', searchResult);

 		var IF_id = searchResult.id;
 		var dateSet = searchResult.date_val;

 		log.debug('IF_id', IF_id);
		log.debug('dateSet', dateSet);

 		var tranObj = record.load({    // Load customer record to capture required values 						
			type: record.Type.ITEM_FULFILLMENT, //from customer record
	    	id: IF_id,
	    	isDynamic: false
		});
		log.debug('tranObj == ',tranObj);


 		var createdFrom = tranObj.getValue({fieldId: 'createdfrom'});
		log.debug('createdFrom == ',createdFrom);

		var IF_status = tranObj.getValue({fieldId: 'shipstatus'});
		log.debug('IF_status == ',IF_status);

		var lineArr = [];

		if(IF_status == 'C')
		{
			var IF_LineCount = tranObj.getLineCount({'sublistId': 'item'});
			log.debug('IF_LineCount == ',IF_LineCount);

	
			for(var i=0; i<IF_LineCount; i++)
			{
				var IF_Line = tranObj.getSublistValue({sublistId: 'item', fieldId: 'custcol_line_num', line: i});
						
				var IF_check = tranObj.getSublistValue({sublistId: 'item', fieldId: 'itemreceive', line: i});
				log.debug('IF_check ',IF_check);
	                  
				if(IF_check == true)
				{
					log.debug('Enter in condition');
	                  
					lineArr.push(IF_Line);

					log.debug('dateSet ',dateSet.toString().split(' ')[0]);
							
					var setDate = new Date(dateSet.toString().split(' ')[0]);
					log.debug('setDate ',setDate);
							
					tranObj.setSublistValue({
						sublistId: 'item',
						fieldId: 'custcol_actual_ship_date',
						line:i,
						value: setDate
					});
							
					log.debug('dateSet ',dateSet);
				}
			}
		}
	          
	    tranObj.setValue({
	        fieldId: 'custbody_mcr_if_updated',
	        value: true
	    });
          
		var recordId = tranObj.save({
			enableSourcing: true,
			ignoreMandatoryFields: true
		});

		log.audit('recordId', recordId);

		setDateonSO(createdFrom,lineArr,dateSet);
 		}
 		catch(e)
 		{
 			log.error('Error Occures in Map', e.toString());
 		}
 		
 	}

 	function setDateonSO(createdFrom,lineArr,dateSet)
	{
		try
		{
			var soObj = record.load({
			    type: record.Type.SALES_ORDER,
			    id: createdFrom,
			    isDynamic: false,
			});

			var SO_LineCount = soObj.getLineCount({'sublistId': 'item'});
			log.debug('SO_LineCount',SO_LineCount);

			for(var q=0;q<SO_LineCount;q++)
			{
				var SO_Line = soObj.getSublistValue({sublistId: 'item', fieldId: 'custcol_line_num', line: q});
				//log.debug('SO_Line ',SO_Line);

				var setDate = new Date();
				//log.debug('setDate ',setDate);

				if(lineArr.indexOf(SO_Line) != -1)
				{
					log.debug('Set Line ',SO_Line);

					soObj.setSublistValue({
					    sublistId: 'item',
					    fieldId: 'custcol_actual_ship_date',
					    line: q,
					    value: new Date(dateSet.toString().split(' ')[0])
					});
					
				}
			}
			var recordId = soObj.save({
			    enableSourcing: true,
			    ignoreMandatoryFields: true
			});

			return true;
		}
		catch(e)
		{
			log.debug('Error ',e.toString());
		}
	}

	 function searchAll(resultset) {
            var allResults = [];
            var startIndex = 0;
            var RANGECOUNT = 1000;

            do {
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

 	return {
	    getInputData: getInputData,
	    map: map,
	}
 });
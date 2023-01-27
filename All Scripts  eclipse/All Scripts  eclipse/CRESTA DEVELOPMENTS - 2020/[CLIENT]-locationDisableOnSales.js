/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       7 Apr 2020      Tushar
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */

function disabledFieldLineInit(type)
{
	 var subsiID = nlapiGetFieldValue('subsidiary');
	 
		if((subsiID =='30' || subsiID == '31'))
		{
			 nlapiDisableLineItemField('item', 'location', true);
			 
			 var LocationMap = LocationMapValues();
			 
			var LineCount = nlapiGetLineItemCount('item');
			 var subsi = nlapiGetFieldText('subsidiary');
			
			if(LineCount > 0)
			{
				for(var i=1;i<=LineCount;i++)
				{
					nlapiSetLineItemDisabled('item','location',true,i);
					if(subsi !=null && subsi != undefined)
					{
						//alert('subsi ='+subsi)
						//alert('LocationMap[subsi] ='+LocationMap[subsi])
						nlapiSetLineItemValue('item','location',i,LocationMap[subsi]);
					}
				}
			}
		}
  return true;
}


function disabledFieldFieldChange(type,name,linenum)
{
   	if(type=='item' && name =='item')
		{
   		    var LocationMap = LocationMapValues();
   		    
   		 var subsi = nlapiGetFieldText('subsidiary');
   		    
   		    var subsi = nlapiGetFieldText('subsidiary');
			var item =nlapiGetCurrentLineItemValue('item','item');
			
			 var subsiID = nlapiGetFieldValue('subsidiary');
			 
			if((item !=null ) && (subsiID =='30' || subsiID == '31'))
			{
				 //alert('JSON ='+JSON.stringify(LocationMap))
				if(subsi !=null && subsi != undefined)
				{
					//alert('subsi ='+subsi)
					//alert('LocationMap[subsi] ='+LocationMap[subsi])
					nlapiSetCurrentLineItemValue('item','location',LocationMap[subsi]);
				}
				
				nlapiDisableLineItemField('item', 'location', true);
			
			}
		}
		return true;
	
}

function disabledFieldOnPostSource(type,name,linenum)
{
     if(type=='item' && name =='item')
		{
			var item =nlapiGetCurrentLineItemValue('item','item');
			
			 var subsiID = nlapiGetFieldValue('subsidiary');
			
			if((item !=null ) && (subsiID =='30' || subsiID == '31'))
			{
				nlapiDisableLineItemField('item', 'location', true);
			
			}
		}
		return true;
	
}

function disabledFieldPageInit(type)
{
	
	 var subsiID = nlapiGetFieldValue('subsidiary');
		
		if((subsiID =='30' || subsiID == '31'))
		{
			nlapiDisableLineItemField('item', 'location', true);
			
			var LineCount = nlapiGetLineItemCount('item');
			
			if(LineCount > 0)
			{
				for(var i=1;i<=LineCount;i++)
				{
					nlapiSetLineItemDisabled('item','location',true,i);
					
				}
			}
		}
  return true;
}


function LocationMapValues()
{
	var ValueLocMap={};
	var locationSearch = nlapiSearchRecord("location","customsearch_setlocation_and_disable",
			[
			   ["name","contains","-STORE-FG"], 
			   "AND", 
			   ["name","doesnotcontain","-STORE-FG-TRADED"]
			], 
			[
			   new nlobjSearchColumn("internalid"), 
			   new nlobjSearchColumn("name").setSort(false), 
			   new nlobjSearchColumn("country"), 
			   new nlobjSearchColumn("subsidiary")
			]
			);

	if(locationSearch != null && locationSearch != undefined && locationSearch !='')
	{
		for(var val=0;val<locationSearch.length;val++)
		{
			var subsidiary = locationSearch[val].getValue('subsidiary');
			var loc = locationSearch[val].getValue('internalid');
			
			ValueLocMap[subsidiary]=loc;
		}
	}
	
	return ValueLocMap;
}
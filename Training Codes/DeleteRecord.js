function executeSavedSearch()
{
  
        var searchresults = nlapiSearchRecord('transaction', 'customsearch1801', null, null);
        nlapiLogExecution("DEBUG", "Before Submit", "executeSavedSearch " + executeSavedSearch);

        nlapiLogExecution("DEBUG", "executeSavedSearch", "searchresults length" + searchresults.length);

        for(var i = 0; searchresults != null && i < searchresults.length; i++)
        {
            var recType = searchresults[i].getValue('recordtype');
            var id = searchresults[i].getValue('internalid');

            nlapiDeleteRecord(recType, id);

            nlapiLogExecution("DEBUG", "executeSavedSearch", "Delete Record");
        }
}
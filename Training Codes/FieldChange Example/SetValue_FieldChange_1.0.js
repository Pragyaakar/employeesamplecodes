function fieldChanged(type, name, index) 
{
    if (name == 'entity') 
    {
        var custName = nlapiGetFieldValue('entity');

        var salesRepEmail = nlapiLookupField('customer', custName, 'email');

        nlapiSetFieldValue('memo', salesRepEmail);
    }
}
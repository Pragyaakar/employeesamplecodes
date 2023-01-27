function postSourcingExp(type, name)
{
    if(type == 'item' && name == 'item')
    {
        var qty = nlapiGetCurrentLineItemValue('item', 'quantity');
        nlapiLogExecution('DEBUG','Quntity Amount',qty);

        if(qty < 200)
        {
            nlapiSetCurrentLineItemValue('item', 'quantity', 20);
        }
    }
}
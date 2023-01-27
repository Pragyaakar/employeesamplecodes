function beforeSubmit(type)
{
    var phone = nlapiGetFieldValue('phone');
    nlapiLogExecution('DEBUG','phone',phone);

    if(phone.length > 13)
    {
        throw nlapiCreateError("Phone Validation", "Not Valid Customer Number", true);
    }
}
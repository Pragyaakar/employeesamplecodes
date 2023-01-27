function validateFieldForceUppercase(type,name)
{
    if(name == 'title')
    {
        var upperCase = nlapiGetFieldValue('title').toUpperCase();

        if (upperCase != nlapiGetFieldValue('title'))
        {
            nlapiSetFieldValue('title', upperCase, false);
        }
        return true ;
    }
}
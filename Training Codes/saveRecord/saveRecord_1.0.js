function saveRecord()
{
    var flag = true;

    var comments = nlapiGetFieldValue('comments');
    nlapiLogExecution('DEBUG','comments',comments);

    if(!comments)
    {
        alert("Please put a comments for a customer");
        flag = false;
    }
    else
    {
        return flag;
    }
}
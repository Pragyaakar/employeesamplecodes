function clientValidateLine(type){

    if (type == 'item') {                   

		var isLot = nlapiGetCurrentLineItemValue('item', 'custcol_islot_item');

	  var rec =	nlapiViewCurrentLineItemSubrecord('item', 'inventorydetail');
	 // alert('Sub record =='+rec);
		
				if (isLot == "T" && (rec==null ||rec=='' ||rec==undefined)) 
				{					 

					alert('Please fill up the Inventory Details'); 

					return false;

				}                               

			}                               

    return true;

} 
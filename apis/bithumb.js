var endpoint = 'https://api.bithumb.com/public/ticker/ALL';
function initialize() {

	exchangeList['Bithumb'] = new Object();
	exchangeList['Bithumb']['KRW'] = new Object();
	exchangeList['Bithumb']['KRW'].fee = 0.6;
	exchangeList['Bithumb']['KRW'].records = {};
}

function readData() { 

	// read JSON array
	
	$.get(endpoint, function(data, status){ 
		if (status != 'success'|| data === undefined) return;
		// jsonData = JSON.parse(data);
		try {
			if (data['status'] == '0000') {
				var row = exchangeList['Bithumb']['KRW'].records;

				for (var k in data.data) { // k is currency such as 'BTC'

					if (k == 'date') continue; // the API returns date
						
					if (row[k] == undefined || row[k] == null) {

						row[k] = 
						{
							tag: k,
							unit: 'KRW',
							reverse: true,
							refs:[]
						};

						markerTable.push({stat: 0, elem: row[k]});
						row[k].index = markerTable.length -1;

					}
					
					row[k].price = data.data[k].buy_price;
				}
			}
				
		} catch(err) {
			// display error message
		}
	
	});
	//$.ajax({
	//  url: endpoint,
	//  data: data,
	//  success: function() {

	//  dataType: dataType
	//});
}

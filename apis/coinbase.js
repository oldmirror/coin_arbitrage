//var endpoint = 'https://api.coinbase.com/v2/prices/BTC-USD/buy';
function initializeCB() {         
    
    exchangeList['Coinbase'] = new Object();
    exchangeList['Coinbase']['USD'] = new Object();
    exchangeList['Coinbase']['USD'].fee = 0.6;
    exchangeList['Coinbase']['USD'].records = {};
} 
var l = ['BTC', 'ETH', 'LTC', 'BCH'];

function readDataCB() { 
// example:
//{"data":{"base":"BTC","currency":"USD","amount":"15350.36"}}

	for (var coin in l) {
	$.get('https://api.coinbase.com/v2/prices/' + l[coin] + '-USD/buy', function(data, status){ 
		if (status != 'success'|| data === undefined) return;

		try {
			var k = data.data.base; // base currency such as 'BTC'
			var row = exchangeList['Coinbase']['USD'].records;

			if (row[k] == undefined || row[k] == null) {

				row[k] = 
				{
					tag: k,
					exchange: 'coinbase',
					unit: 'USD',
					reverse: true,
					refs:[]
				};

				markerTable.push({stat: 0, elem: row[k]});
				row[k].index = markerTable.length -1;

			}
			
			row[k].price = data.data.amount;
				
		} catch(err) {
			// display error message
		}
	
	});
	}

}


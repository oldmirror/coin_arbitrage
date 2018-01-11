var pnEndpoint = 'https://poloniex.com/public?command=returnTicker'

function initializePN() {
	exchangeList['Poloniex'] = new Object();
	exchangeList['Poloniex'].fee = 0.6
	exchangeList['Poloniex']['BTC'] = new Object();
	exchangeList['Poloniex']['BTC'].records = {};

	exchangeList['Poloniex']['ETH'] = new Object();
	exchangeList['Poloniex']['ETH'].records = {};

	exchangeList['Poloniex']['XMR'] =  new Object();
	exchangeList['Poloniex']['XMR'].records = {};
}

function readDataPN() {
	$.get(pnEndpoint, function(data, status) {
		if (status != 'success' || data == undefined) return;

		for (var pair in data) {
			var cur = pair.substr(0, 3);
			var dest = pair.substr(4);
	
			if (cur == 'BTC' || cur == 'XMR' || cur == 'ETH') {

				var row = exchangeList['Poloniex'][cur].records;

				if (row[dest] == undefined || row[dest] == null) {
					row[dest] = 
					{
						tag: dest,
						exchange: 'poloniex',
						unit: cur,
						reverse: false,
						refs:[]
					};

					markerTable.push({stat: 0, elem: row[dest]});
					row[dest].index = markerTable.length -1;
				}

				row[dest].price = data[pair].last;

			}
		}

	});
}

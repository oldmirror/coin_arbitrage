Poloniex = {
	endpoint: 'https://poloniex.com/public?command=returnTicker',

	initialize: function() {
		this.fee = 0.6;
	},

	readData: function() {
		$.get(this.endpoint, function(data, status) {
			if (status != 'success' || data == undefined) return;
	
			for (var pair in data) {
				var cur = pair.substr(0, 3);
				var dest = pair.substr(4);
		
				// save
				if (this[cur] == undefined) {
					this[cur] = new Object();
					this[cur].records = {};
				}
				var row = this[cur].records;
				
				// create the entry only if it doesn't exist.
				if (row[dest] == undefined || row[dest] == null) {
					row[dest] = 
					{
						tag: dest,
						exchange: 'Poloniex',
						unit: cur,
						reverse: true,
						refs:[]
					};

					markerTable.push({stat: 0, elem: row[dest]});
					row[dest].index = markerTable.length -1;
				}

				// update the price
				row[dest].price = data[pair].lowestAsk;
				row[dest].reverse_price = data[pair].highestBid;
				//TODO: update result data structure
			}
	
		});
	}
}


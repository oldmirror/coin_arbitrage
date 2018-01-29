Binance = { 
	endpoint: "https://api.binance.com/api/v1/ticker/allPrices",
	
	
	initialize: function() {
		this.fee = 0;
	},

	readData: function() {
		$.get("https://cors-anywhere.herokuapp.com/" + this.endpoint, function(data, status) {
			if (status != 'success' || data == undefined) return;
	
			for (var i=0; i<data.length; i++) {
				var record = data[i];

				if (record['symbol'].length != 6) return; //TODO: fix this

				var dest= record['symbol'].substr(0, 3);
				var cur = record['symbol'].substr(3);
		
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
						exchange: 'Binance',
						unit: cur,
						reverse: true,
						refs:[]
					};

					markerTable.push({stat: 0, elem: row[dest]});
					row[dest].index = markerTable.length -1;
				}

				// update the price
				row[dest].price = 1/data[i]['price'];
				row[dest].reverse_price = data[i]['price'];
				//TODO: update result data structure
			}
	
		});
	}
}

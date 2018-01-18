Bitfinex = {
	endpoint: 'https://api.bitfinex.com/v1/pubticker/',
	list: ["btcusd","ltcusd","ltcbtc","ethusd","ethbtc","etcbtc","etcusd","zecusd","zecbtc","xmrusd","xmrbtc","dshusd","dshbtc"],
//,"btceur","xrpusd","xrpbtc","iotusd","iotbtc","ioteth","eosusd","eosbtc","eoseth","sanusd","sanbtc","saneth"],
//,"omgusd","omgbtc","omgeth","bchusd","bchbtc","bcheth","neousd","neobtc","neoeth","etpusd","etpbtc","etpeth","qtmusd","qtmbtc","qtmeth","avtusd","avtbtc","avteth","edousd","edobtc","edoeth","btgusd","btgbtc","datusd","datbtc","dateth","qshusd","qshbtc","qsheth","yywusd","yywbtc","yyweth","gntusd","gntbtc","gnteth","sntusd","sntbtc","snteth","ioteur","batusd","batbtc","bateth","mnausd","mnabtc","mnaeth","funusd","funbtc","funeth","zrxusd","zrxbtc","zrxeth","tnbusd","tnbbtc","tnbeth","spkusd","spkbtc","spketh"],

	initialize: function() {
		this.fee = 0.6;
	},

	m: {'dsh': 'dash'},

	readData: function() {
		for (var i =0; i < this.list.length; i++) {
			$.ajax({
		  		url: "https://cors-anywhere.herokuapp.com/" + this.endpoint + this.list[i],
		  		type: 'GET',
				index: i,
		  		crossDomain: true,
		  		error: function (xhr, str, error) {
					alert("string" + eval(str));
				},
		  		success: function (data, stat, xhr) {
					if (data == undefined) return;
			
				
					var cur = Bitfinex.m[Bitfinex.list[this.index].substr(3)];
					if (!cur) 
						cur = Bitfinex.list[this.index].substr(3)
					cur = cur.toUpperCase();

					var dest = Bitfinex.m[Bitfinex.list[this.index].substr(0, 3)]

					if (!dest)
						dest = Bitfinex.list[this.index].substr(0, 3);
					dest = dest.toUpperCase();
			
					// save
					if (Bitfinex[cur] == undefined) {
						Bitfinex[cur] = new Object();
						Bitfinex[cur].records = {};
					}
					var row = Bitfinex[cur].records;
					
					// create the entry only if it doesn't exist.
					if (row[dest] == undefined || row[dest] == null) {
						row[dest] = 
						{
							tag: dest,
							exchange: 'Bitfinex',
							unit: cur,
							reverse: true,
							refs:[]
						};

						markerTable.push({stat: 0, elem: row[dest]});
						row[dest].index = markerTable.length -1;
					}

					// update the price
					row[dest].price = data.ask;
					row[dest].reverse_price = data.bid;
					//TODO: update result data structure
			
				}
			}); //end of ajax
		} //end of for
	}
}

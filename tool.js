// sample data structure
var exchangeList = {};
var row = {};


// Read from currency exchange
exchangeList['WON-DOLLOR'].currency = 'USD';
exchangeList['WON-DOLLOR'].fee= 0.6;
exchangeList['WON-DOLLOR'].records = row;

row['KRW'] = 
{
	index: 0,
	price: 1061,
	unit: 'USD',
	reverse: true,
	refs:[]
};


// Read data from Coinbase
var row = {};

exchangeList['Coinbase'].endpoint ='';
exchangeList['Coinbase'].['USD'].fee = 0.6;
exchangeList['Coinbase'].['USD'].records = row;

row['BTC'] = {
	index: 1, // increment 
	price: 14330.24,
	unit :'USD'
	reverse: true,
	refs: []
	
};

markerTable.push(new Object() {
this.stat = 0;
this.elem = row['BTC'];
});


// Read data from Bithumb
row = {};

row['BTC'] = 
{
	index: 2,
	price: 19000000.0,
	unit: 'KRW',
	reverse: true,
	refs:[]
};

markerTable.push(new Object() {
this.stat = 0;
this.elem = row['BTC'];
});

row['RP'] = 
{
	index: 3,
	price: 3000.0,
	unit: 'KRW',
	reverse: true,
	refs:[]
};

markerTable.push(new Object() {
this.stat = 0;
this.elem = row['RP'];
});

exchangeList['Bithum'].endpoint = '';
exchangeList['Bithum']['KRW'].fee = 0.6;
exchangeList['Bithum']['KRW'].records = row;

// read from Poloniex
//row = {};
//
//row['USD'] =
//{
//	price: ,
//	fee: 0.6,
//	refs:[]
//};
//
//
//row['KRW'] =
//{
//	price: ,
//	fee: 0.6,
//	refs:[]
//};
//
//exchangeList['BTC'] = row;
//
//row = {};
//
//row['USD'] =
//{
//	price: ,
//	fee: 0.6,
//	refs:[]
//};
//
//
//row['KRW'] =
//{
//	price: ,
//	fee: 0.6,
//	refs:[]
//};



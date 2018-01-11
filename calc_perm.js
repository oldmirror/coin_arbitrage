function calc_perm_begin(input) {
	marker = markerTable;
	result = new Array();
	resultArray = new Array();
	calc_perm();
}

resultList = new Array();

function printResult(n) {
	// sort the resultList by price
	resultList.sort(function(a, b) {
		return b.val - a.val;
	});
		
	var contentDiv = document.getElementById('content');

	pStr = '';
	for (var i =0; (i<n && i<resultList.length); i++) {
		pStr += '<p>';
		pStr += resultList[i].str +  ' <b>Profit' + resultList[i].val + '</b>';
		pStr += '</p>';
	}
	contentDiv.innerHTML += pStr;
	
}

var f = function condition(o) {
	return true;
}

function calc_perm() {

	if (result.length > 5 ) return; //TODO

	// All length permutation. Valid if it draws cycle. Once cycle is found, terminate the search.
	if ((result.length > 0) && result[result.length-1].end == result[0].start) { 
		if (result.length >= 3) { // only consider longer than 3 
	
			var e = new Object();
			var listStr= '';
			var ratio= 1;
			var amtCur = gCurList[result[0].start];
			if (amtCur == undefined) alert('error');

			for (var i = 0; i < result.length; i++) {
				ratio /= result[i].price;
				var temp = ' with ' + amtCur  + ' ' + result[i].start +' at ' + result[i].exchange;
				listStr += 'Buy ' + (amtCur = amtCur * (1/result[i].price)) + ' of ' + result[i].end + temp + '<br/>'
			}
			
			//listStr += result[i-1].end;
			e.str = listStr;
			e.val = (ratio -1) * 100 ;

			resultList.push(e);
		}
		return;
	}

	var next = 0;

	if ((next = nextElemAfter(next, f)) < 0)
		return;

	do {
		var nextIdx = Math.floor(next);
		var nextStat = (next * 10) % 10;

		if (marker[nextIdx].stat >0) { // cycle found. skip
			continue;
		}
		marker[nextIdx].stat += nextStat;

		//create reocrd to put in to the result
		var rec = new Object();

		if (nextStat & 1 > 0) { 
			rec.start = marker[nextIdx].elem.unit;
			rec.end = marker[nextIdx].elem.tag;
			rec.price = marker[nextIdx].elem.price;
			rec.exchange = marker[nextIdx].elem.exchange;

		} else if (marker[nextIdx].elem.reverse && (nextStat & 2) > 0) { // reverse case
			rec.start = marker[nextIdx].elem.tag;
			rec.end = marker[nextIdx].elem.unit;
			rec.price = 1/marker[nextIdx].elem.price;
			rec.exchange = marker[nextIdx].elem.exchange;

		} else {
			//TODO: handle invalid state
		}

		result.push(rec);

		calc_perm();

		result.pop();
		marker[nextIdx].stat -= nextStat;
	} while ((next = nextElemAfter(next, f)) >= 0) ;
}

function nextElemAfter(idx, isTrue) {

	var i = Math.floor(idx);
	var minor = (idx*10)%10

	for (; i< markerTable.length; i++) {

		if ((marker[i].stat & 1) == 0 && (minor < 1)) { // regular not set
			if (
				(result.length ==0 && gCurList[marker[i].elem.unit] != undefined) // first one and found in cur list selected on UI.
				|| (result.length != 0 &&result[result.length-1].end == marker[i].elem.unit)
				) // link found
				return i + 0.1;
		}

		if ((marker[i].stat & 2) == 0 && (minor < 2)) { // reverse not set
			if (marker[i].elem.reverse 
					&& (
					(result.length == 0 && gCurList[marker[i].elem.tag] != undefined)
					|| (result.length != 0 && result[result.length-1].end == marker[i].elem.tag)
					)
				) 
				return i + 0.2;
			
		} 
		minor = 0;
	}
	return -1;
}

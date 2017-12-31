var markerTable = new Array();
function calc_perm_begin(input) {
	marker = new Array(input.length);
	result = new Array();
	calc_perm(input);
}

var f = function condition(o) {
	return true;
}

function permCond() {
	return result.length == input.legnth;
}

function calc_perm(input) {

	if (permCond()) {
		alert(result);
		return;
	}
	
	var next = 0;

	while ((next = nextElemAfter(next, f, input)) >= 0) {
		marker[next] = 1;
		result.push(input[next]);
		calc_perm(input);
		result = result.slice(0, result.length -1);
		marker[next] = undefined;
		next++;
	}
}

function nextElemAfter(idx, isTrue, input) {
	for (var i = idx; i< input.length; i++) {
		if ( marker[i] == undefined && isTrue(input[i])) {
			return i;
		}
	}
	return -1;
}

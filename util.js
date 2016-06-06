var Util = {};

Util.random = function(min, max) {
	return Math.random() * (max - min) + min;
}

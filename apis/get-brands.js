var result = require('./data/result');
var brands = require('./data/brands');

module.exports = function(){

	return result({
		success : true,
		data 	:brands
	});

};

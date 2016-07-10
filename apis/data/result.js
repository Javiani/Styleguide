module.exports = function( data ){

	var result = {
		message 	:'',
		exception 	:'',
		success 	:false,
		data		:{}
	};

	return Object.assign({}, result, data);
};

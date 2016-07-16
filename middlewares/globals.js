var path = require('path');

module.exports = function( app, config ){

	var env = config.env;

	return function( req, res, next ){

		global.get = function( url ){
			var module;
			try{
				module = require( '../'+ path.normalize( config.folder + '/'+ url) )
			}catch(e){
				console.log(e);
			}
			return module;
		};

		global.request = req;
		global.response = res;

		env.addGlobal('console', console);
		env.addGlobal('request', global.request);
		env.addGlobal('response', global.response);
		env.addGlobal('get', global.get);

		next();
	};

}

var path = require('path');

module.exports = function( app, config ){

	config = config || {};

	return function( req, res, next ){

		var url = path.resolve( req.path );
		render( url );

		function render( url ){

			res.render( url.replace(/^\//, ''), function( err, content ){
				var name = path.basename( url );
				if( err ){
					if( name != 'index' ){
						render( path.resolve( url, 'index') );
					}else if( err.message.match(/template not found/) ){
						res.render('404');
					}else{
						next( err );
					}
				}else{
					res.send( content );
				}
			});
		}
	};
};

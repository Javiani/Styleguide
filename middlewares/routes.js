var path = require('path');

module.exports = function( app, env ){

	//Globals
	var globals = require('./globals');
	app.use( globals(app, { folder:'apis', env :env }) );

	//Api's
	var api = require('./api');
	app.get(/\bservice\b/, api(app, { folder: 'apis'}) );

	var markdown = require('./markdown');
	app.get('*.md', markdown(app));
	app.get('/docs/', markdown(app, '/docs/index.md'));

	var css = require('./css');
	app.get('/css/*', css(app));

	var js = require('./js');
	app.get('/js/*', js(app));

	//Default routes
	app.get('*', function( req, res, next ){

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
	});
};

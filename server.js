var jerrymice = require('jerrymice'),
	markdown = require('./routes/markdown'),
	css = require('./routes/css'),
	js = require('./routes/js');

jerrymice.run({

	baseUrl		:__dirname,
	port		:3000,
	services 	:/services/

}, function( app, render ){

	global.url = function(url){
		return __dirname + '/www/views/' + url + '.htm';
	};

	app.get('*.md', markdown(app, render));
	app.get('/css/*', css(app, render));
	app.get('/js/*', js(app, render));

	app.get('/', function( req, res ){
		res.redirect('/docs/index.md');
	});

});

/*
	@Server
	Express + Nunjucks
*/
var	nunjucks  = require('nunjucks'),
	express   = require('express'),
	app       = express(),
	port	  = 3000,
	env;

env = nunjucks.configure('www/views', {
	express   : app,
	autoescape: true,
	watch	  : true
});

/* @Middlewares */

app.use( express.static('www') );
app.set( 'view engine', 'njk' );

//Globals
var globals = require('./middlewares/globals');
app.use( globals(app, { folder:'apis', env :env }) );

//Api's
var api = require('./middlewares/api');
app.get( /service/, api(app, { folder: 'api'}) );

var markdown = require('./middlewares/markdown');
app.get('*.md', markdown(app));
app.get('/docs/', markdown(app, '/docs/index.md'));

var css = require('./middlewares/css');
app.get('/css/*', css(app));

var js = require('./middlewares/js');
app.get('/js/*', js(app));

var routes = require('./middlewares/routes');
app.get('*', routes(app));

app.listen( port );

welcome();

function welcome(){
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
	console.log(' \x1b[32m%s\x1b[0m Jerry Mice \x1b[32m%s\x1b[0m', '☁', '☁' );
	console.log(' \x1b[36m%s\x1b[0m :Express.js + Nunjucks', '@Powered by');
	console.log(' \x1b[36m%s\x1b[0m :\x1b[32m%s\x1b[0m', '@Served at', 'http://localhost:'+port+'/');
	console.log(' \x1b[36m%s\x1b[0m : Hit ctrl+c to shutdown server', '@Quit');
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
}

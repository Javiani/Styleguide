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
	autoescape: false,
	watch	  : true
});

app.use( express.static('www') );
app.set( 'view engine', 'njk' );

/* @Middlewares */
require('./middlewares/routes')( app, env );
require('./nunjucks/filters')( app, env );

app.listen( port );

console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
console.log(' \x1b[32m%s\x1b[0m StyleGuide \x1b[32m%s\x1b[0m', '☁', '☁' );
console.log(' \x1b[36m%s\x1b[0m :Express.js + Nunjucks', '@Powered by');
console.log(' \x1b[36m%s\x1b[0m :\x1b[32m%s\x1b[0m', '@Served at', 'http://localhost:'+port+'/');
console.log(' \x1b[36m%s\x1b[0m : Hit ctrl+c to shutdown server', '@Quit');
console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');

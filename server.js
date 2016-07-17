/*
	@Server
	Express + Nunjucks
*/

import nunjucks from 'nunjucks'
import express from 'express'
import filters from './nunjucks/filters'
import globals from './middlewares/globals'
import routes from './middlewares/routes'

let app  = express()
let port = 3000
let env

env = nunjucks.configure('www/views', {
	express   : app,
	autoescape: false,
	watch	  : true
})

app.use( express.static('www') )
app.set( 'view engine', 'njk' )

//Globals
app.use( globals( app, { __dirname: __dirname, env }) )

/* @Middlewares */
routes( app, env )
filters( app, env )

app.listen( port )

console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+')
console.log(' \x1b[32m%s\x1b[0m StyleGuide \x1b[32m%s\x1b[0m', '☁', '☁' )
console.log(' \x1b[36m%s\x1b[0m :Express.js + Nunjucks', '@Powered by')
console.log(' \x1b[36m%s\x1b[0m :\x1b[32m%s\x1b[0m', '@Served at', 'http://localhost:'+port+'/')
console.log(' \x1b[36m%s\x1b[0m : Hit ctrl+c to shutdown server', '@Quit')
console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+')

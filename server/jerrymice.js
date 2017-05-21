import express from 'express'
import glob from 'glob'
import path from 'path'
import config from '../package.json'

let app 	 = express()
let ignore 	 = /start|output|constructor/

let settings = Object.assign({
	express, app,
	port :3000,
	middlewares: `${__dirname}/middlewares`
}, config.jerrymice)

export default class JerryMice{

	constructor( config ){
		this.settings = Object.assign( {}, settings, config )
		this.middleware = middlewares()
	}

	start(){
		this.settings.app.listen( this.settings.port )
		this.output()
	}

	output(){
		output( this.settings )
	}
}

JerryMice.bootstrap = ( Class, options )=>{
	let instance = new Class( options )
	run( instance )
	instance.start()
}

let run = ( instance )=>{

	let app = instance.settings.app
	let prototype = Object.getPrototypeOf( instance )
	let properties = Object.getOwnPropertyNames( prototype )

	properties.forEach( name => {
		if( instance[ name ].call && !name.match( ignore ) ){
			instance[ name ].call( instance, app, express )
		}
	})
}

let middlewares = ()=> glob.sync(`${settings.middlewares}/**/*.js`)
		.reduce( ( acc, file ) => {
			let middleware = require( file ).default
			acc[ path.basename( file, '.js') ] = middleware
			return acc
		}, {})

let output = ( config )=>{
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
	console.log(' \x1b[32m%s\x1b[0m Jerry Mice \x1b[32m%s\x1b[0m', '☁', '☁' );
	console.log(' \x1b[36m%s\x1b[0m :Express.js', '@Powered by');
	console.log(' \x1b[36m%s\x1b[0m :\x1b[32m%s\x1b[0m', '@Served at', 'http://localhost:'+config.port+'/');
	console.log(' \x1b[36m%s\x1b[0m : Hit ctrl+c to shutdown server', '@Quit');
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
}

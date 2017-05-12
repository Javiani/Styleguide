import glob from 'glob'
import path from 'path'

export default ( app ) => {

	return ( req, res, next ) =>{

		let data 	 = glob.sync('./server/mock/models/**/*.js').reduce( reduce(req, res), {} )
		let services = glob.sync('./server/mock/services/**/*.js').reduce( reduce(req, res), { app } )

		app.locals.mock = { data, services }
		next()
	}
}

let reduce = (req, res) => ( acc, file ) =>{

	let module = path.resolve( file )
	let name   = path.basename( file, '.js' )
	let _class = require( module ).default

	name = name.replace(/\-/g, '_')
	acc[ name ] = new _class( req, res )

	return acc
}

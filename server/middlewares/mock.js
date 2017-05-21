import glob from 'glob'
import path from 'path'

export default ( app ) => {

	return ( req, res, next ) =>{

		let model 	= glob.sync('./server/mock/models/**/*.js').reduce( reduce(req, res), {} )
		let service = glob.sync('./server/mock/services/**/*.js').reduce( reduce(req, res), { app } )

		app.locals.mock = { model, service }
		next()
	}
}

let reduce = (req, res) => ( acc, file ) =>{

	let module = path.resolve( file )
	let name   = path.basename( file, '.js' )
	let _class = require( module ).default

	name = name.replace(/\-/g, '_')
	acc[ name ] = function(a, b, c, d){ return new _class(a, b, c, d) }

	return acc
}

import path from 'path'

export default ( app, config ) =>{

	return function( req, res ){

		let response, url

		url = path.normalize( global.root + '/server/' + req.path )

		try{

			response = require( url )
			response = response.call? response.call() :response

			if( req.query.callback )
				res.jsonp( response )
			else
				res.send( response )

		}catch( error ){
			res.status(500).send({ error })
		}
	}
}

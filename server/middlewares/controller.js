let path = '../mock/controllers/'

export default app =>{

	return ( req, res, next )=>{

		let Controller = require( path + req.params.controller ).default

		if( Controller ){
			let instance = new Controller( req, res )
			let result
			let params = Object.assign({}, req.params, req.query)

			if( req.params.action in instance ){
				result = instance[req.params.action]( params, {req, res, app} ) || {}
			}else{
				result = instance.index( params, {req, res, app} ) || {}
			}

			switch( result.constructor )
			{
			case 'String':return res.send( result )
			default 	 :return res.jsonp( result )
			}
		}
	}
}

let path = './../server/mock/controllers/'

export default app =>{

	return ( req, res, next )=>{

		let Controller = require( path + req.params.controller ).default

		if( Controller ){

			let instance = new Controller( app )
			let result

			if( req.params.action in instance ){
				result = instance[req.params.action]( req, res )
			}else{
				result = instance.index( req, res )
			}

			switch( result.constructor ){
				case 'String':return res.send( result )
				default 	 :return res.jsonp( result )
			}

		}
	}
}

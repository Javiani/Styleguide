import path from 'path'

export default ( app, config ) => {

	let env = config.env
	global.root = config.__dirname

	env.addGlobal('console', console)
	env.addGlobal('root', global.root)
	env.addGlobal('require', ( url ) =>{
		return require( path.resolve( config.__dirname, url ))
	})

	return ( req, res, next ) =>{

		global.request = req
		global.response = res

		env.addGlobal('request', global.request)
		env.addGlobal('response', global.response)

		next()
	}
}

import path from 'path'
import markdown from './markdown'
import service from './service'

export default ( app, env )=>{

	//Services
	app.get('/mock/*', service( app, {
		__dirname: path.resolve( __dirname, 'server', 'mock' )
	}))

	// Handle Markdown files
	app.get('*.md', markdown(app))
	app.get('/docs/', markdown(app, '/docs/index.md'))

	//Default routes
	app.get('*', ( req, res, next )=>{

		let url = path.resolve( req.path )
		render( url )

		function render( url ){
			res.render( url.replace(/^\//, ''), function( err, content ){

				let name = path.basename( url )
				if( err ){
					if( name != 'index' )
						render( path.resolve( url, 'index') )
					else if( err.message.match(/template not found/) )
						res.render('404')
					else
						next( err )
				}else{
					res.send( content )
				}
			})
		}
	})
}

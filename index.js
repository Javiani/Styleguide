import JerryMice from './jerrymice'
import nunjucks from 'nunjucks'

class Application extends JerryMice{

	constructor(){
		super()
	}

	engine( app ){

		app.set('view engine', 'njk')
		app.set('views', './client')

		this.env = nunjucks.configure(['client'], {
			express   : app,
			autoescape: false,
			watch	  : true
		})
	}

	middlewares( app, express ){

		app.use( express.static('assets/dist') )
		app.use( this.middleware.variables( app, this.env ) )
		app.use( this.middleware.mock( app ) )
		app.use( this.middleware.markdown( app, this.env ) )

		app.use( '/service/:controller/:action', this.middleware.controller( app ) )
		app.use( '/service/:controller', this.middleware.controller( app ) )

	}

	routes( app ){
		app.get('/*.md', (req, res) => res.render('layouts/docs') )
		app.get('/docs/', (req, res) => res.redirect('/docs/index.md'))
		app.get( '/', ( req, res) => res.redirect('/pages/guideline/home'))
		app.get( '*', this.middleware.routes({ 404 :'pages/404' }))
	}
}

JerryMice.bootstrap( Application, {} )

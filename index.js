import JerryMice from './jerrymice'
import nunjucks from 'nunjucks'

class Application extends JerryMice{

	constructor(){
		super()
	}

	engine( app ){

		app.set('view engine', 'njk')
		app.set('views', './front')

		this.env = nunjucks.configure(['front'], {
			express   : app,
			autoescape: false,
			watch	  : true
		})
	}

	middlewares( app, express ){

		app.use( express.static('dist') )
		app.use( this.middleware.variables( app, this.env ) )
		app.use( this.middleware.mock( app ) )
		app.use( this.middleware.markdown( app, this.env ) )

		app.use( '/service/:controller/:action', this.middleware.controller( app ) )
		app.use( '/service/:controller', this.middleware.controller( app ) )

	}

	routes( app ){
		app.get('/*.md', (req, res) => res.render('guideline/pages/docs') )
		app.get('/docs/', (req, res) => res.redirect('/docs/index.md'))
		app.get( '/', ( req, res) => res.redirect('/guideline/pages/home'))
		app.get( '*', this.middleware.routes({ 404 :'guideline/pages/404' }))
	}
}

JerryMice.bootstrap( Application, {} )

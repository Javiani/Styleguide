import JerryMice from './jerrymice'
import nunjucks from 'nunjucks'

export default
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

		app.use( express.static('dist') )
		app.use( this.middleware.variables( app, this.env ) )
		app.use( this.middleware.mock( app ) )
		app.use( this.middleware.markdown( app, this.env ) )
	}

	routes( app ){

		app.get('/mock/*', this.middleware.services())
		app.get('/*.md', (req, res) => res.render('layouts/docs') )
		app.get('/docs/', (req, res) => res.redirect('/docs/index.md'))
        app.get( '/', ( req, res) => res.redirect('/pages/guideline/home'))
		app.get( '*', this.middleware.routes({ 404 :'pages/404' }))
	}
}

JerryMice.bootstrap( Application, {} )

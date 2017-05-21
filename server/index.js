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
		app.use( express.static('assets') )

		app.use( this.middleware.variables( app, this.env ) )
		app.use( this.middleware.mock( app ) )
		app.use( this.middleware.markdown( app, this.env ) )
	}

	routes( app ){

		app.get('/*.md', (req, res) => res.render('guideline/pages/docs/index') )
		app.get('/docs/', (req, res) => res.redirect('/docs/index.md'))
		app.get( '/', (req, res) => res.redirect('/guideline/pages/home'))

		app.get( '/service/:controller/:action', this.middleware.controller( app ) )
		app.get( '/service/:controller', this.middleware.controller( app ) )

		app.get('/:folder/pages/:page', (req, res, next) =>{
			const {folder, page} = req.params
			res.render(`${folder}/pages/${page}/index`, (err, html) =>{
				if( err )
					res.render('guideline/pages/404/index')
				else res.send( html )
			})
		})
	}
}

JerryMice.bootstrap( Application, {} )

import fs from 'fs'
import showdown from 'showdown'

export default ( app, redirect )=>{

	let converter = new showdown.Converter()

	return function( req, res, next ){

		if( redirect ){
			res.redirect( redirect )
			return
		}

		let file = req.params[0],
			text  = fs.readFileSync( `./www/views${file}.md`, 'utf8')

		res.render('markdown.njk', { markdown :converter.makeHtml( text ) })
	}
}

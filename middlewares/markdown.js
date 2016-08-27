import fs from 'fs'
import showdown from 'showdown'

let converter = new showdown.Converter({
	extensions :[ tags ],
	tables :true
})

export default ( app, env ) =>{

	return ( req, res, next ) =>{

		// Adicionando filtros no Nunjucks
		env.addFilter('markdown', ( text ) =>{
			text = text.trim()
			return converter.makeHtml( text )
		})

		// Adicionando propriedade contendo markdown de um arquivo
		env.addGlobal('markdown', markdown( req ) )

		next()
	}
}

function tags(){

	let hs, p, list, image, link,
		hr, bold, em, pre, quote

	hs 	  = { type: 'output', regex: /\<h(\d)\b/g, replace: '<h$1 class="gl"' }
	p 	  = { type: 'output', regex: /\<p\b/g, replace: '<p class="gl"' }
	list  = { type: 'output', regex: /\<(u|o)l\>/g, replace: '<$1l class="gl">' }
	image = { type: 'output', regex: /\<img\b/g, replace: '<img class="gl"' }
	link  = { type: 'output', regex: /\<a\b/g, replace: '<a class="gl"' }
	hr 	  = { type: 'output', regex: /\<hr\b/g, replace: '<hr class="gl"' }
	bold  = { type: 'output', regex: /\<strong\b/g, replace: '<strong class="gl"' }
	em    = { type: 'output', regex: /\<em\b/g, replace: '<em class="gl"' }
	pre   = { type: 'output', regex: /\<pre\b/g, replace: '<pre class="gl"' }
	quote = { type: 'output', regex: /\<blockquote\b/g, replace: '<blockquote class="gl"' }

	return [ hs, p, list, image, link, hr, bold, em, quote, pre ]
}

function markdown( req ){

	let file = req.path
	if( !file.match(/\.md/) ) return ''

	let text  = fs.readFileSync( `./client/${file}`, 'utf8')
	return converter.makeHtml( text )
}

import showdown from 'showdown'

export default ( app, env ) =>{

	let converter = new showdown.Converter({
		extensions :[ tags ]
	})

	converter.setOption('tables', true)

	env.addFilter('markdown', ( text ) =>{
		text = text.trim()
		text = text.replace(/^\t*/gm, '')
		return converter.makeHtml( text )
	})

}

function tags(){

	let hs, p, list, image, link,
		hr, bold, em, pre, quote

	hs 	  = { type: 'output', regex: /\<h(\d)\b/g, replace: '<h$1 class="g"' }
	p 	  = { type: 'output', regex: /\<p\b/g, replace: '<p class="g"' }
	list  = { type: 'output', regex: /\<(u|o)l\>/g, replace: '<$1l class="g">' }
	image = { type: 'output', regex: /\<img\b/g, replace: '<img class="g"' }
	link  = { type: 'output', regex: /\<a\b/g, replace: '<a class="g"' }
	hr 	  = { type: 'output', regex: /\<hr\b/g, replace: '<hr class="g"' }
	bold  = { type: 'output', regex: /\<strong\b/g, replace: '<strong class="g"' }
	em    = { type: 'output', regex: /\<em\b/g, replace: '<em class="g"' }
	pre   = { type: 'output', regex: /\<pre\b/g, replace: '<pre class="g"' }
	quote = { type: 'output', regex: /\<blockquote\b/g, replace: '<blockquote class="g"' }

	return [ hs, p, list, image, link, hr, bold, em, quote, pre ]
}

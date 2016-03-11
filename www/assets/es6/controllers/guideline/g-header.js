import jails from 'jails'
import 'comps/litemodal/litemodal'

jails.controller('g-header', function( html, data ){

	let textarea, body, modal

	this.init = ()=>{

		body = $('iframe').contents().find('body')
		textarea = $(html).find('textarea')
		modal = this.x('.litemodal')

		this.on('click', '.g-link-source', open_source)
	}

	let open_source =()=>{

		let code = textarea[0]
		textarea.text( body.html().trim() )

		modal('open')

		textarea.css('height', code.scrollHeight)
	}

})

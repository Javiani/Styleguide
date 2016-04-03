import jails from 'jails'
import 'comps/litemodal/litemodal'

jails.controller('g-header', function( html, data ){

	let textarea, body, modal, iframe

	this.init = ()=>{

		iframe = $('iframe')
		textarea = $(html).find('textarea')
		modal = this.x('.litemodal')

		iframe.on('load', set)
		this.on('click', '.g-link-source', open_source)
	}

	let set = ()=>{
		body = iframe.contents().find('body')
	}

	let open_source =()=>{

		let code = textarea[0]
		textarea.text( body.html().trim() )

		modal('open')
		textarea.css('height', code.scrollHeight)
	}

})

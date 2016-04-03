import jails from 'jails'
import logger from 'mods/logger/logger'
import scriptjs from 'scriptjs'
import adapter from 'mods/jquery.adapter/jquery.adapter'

let jquery = 'node_modules/jquery/dist/jquery.min.js'
let jquerycdn = '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'
let app = document.getElementById('main-script').getAttribute('data-application')
let dependencies = [app]

scriptjs( jquerycdn, ()=>{

	if( !window.jQuery ){
		dependencies.unshift( jquery )
	}

	scriptjs(dependencies, ()=>{
		jails.events = adapter( jQuery )
		logger()
		jails.start()
	})
})

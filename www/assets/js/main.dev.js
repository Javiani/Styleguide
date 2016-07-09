import jails from 'jails'
import scriptjs from 'scriptjs'
import logger from 'mods/logger/logger'

let jquery = 'node_modules/jquery/dist/jquery.min.js'
let jquerycdn = '//ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js'
let app = document.getElementById('main-script').getAttribute('data-application')
let dependencies = [app]

scriptjs( jquerycdn, ()=>{

	if( !window.jQuery ){
		dependencies.unshift( jquery )
	}

	scriptjs(dependencies, ()=>{
		logger()
		jails.start()
	})
})

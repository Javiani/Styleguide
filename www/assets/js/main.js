import jails from 'jails'
import scriptjs from 'scriptjs'

let jquery = 'node_modules/jquery/dist/jquery.min.js'
let jquerycdn = '//code.jquery.com/jquery-3.1.0.min.js'
let app = document.getElementById('main-script').getAttribute('data-application')
let dependencies = [app]

scriptjs( jquerycdn, ()=>{

	if( !window.jQuery ){
		dependencies.unshift( jquery )
	}

	scriptjs(dependencies, ()=>{
		jails.start()
	})
})

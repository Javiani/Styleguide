import jails from 'jails-js'
import scriptjs from 'scriptjs'
import logger from 'jails.packages/logger'
import thirdparty from 'modules/third-party'

let jquery 	= '//code.jquery.com/jquery-3.1.0.min.js'
let app     = document.getElementById('main-script').getAttribute('data-application')

scriptjs( [jquery, app], ()=>{
	jails.use( logger() ).start()
	thirdparty.load()
})

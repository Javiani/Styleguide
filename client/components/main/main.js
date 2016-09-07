import jails from 'jails'
import scriptjs from 'scriptjs'
import logger from 'mods/logger/logger'
import thirdparty from 'modules/third-party'

let jquery 	= '//code.jquery.com/jquery-3.1.0.min.js'
let app     = document.getElementById('main-script').getAttribute('data-application')

scriptjs( [jquery, app], ()=>{
	logger()
	jails.start()
	thirdparty.load()
})

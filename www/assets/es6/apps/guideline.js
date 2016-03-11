import '../controllers/guideline/g-sidebar'
import '../controllers/guideline/g-resize'
import '../controllers/guideline/g-header'

import {app} from 'jails'

app('guideline', function( html, data ){

	this.init = ()=>{
		console.log('You\'re at Guideline!')
	}

})

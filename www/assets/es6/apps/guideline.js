import '../controllers/guideline/g-sidebar'
import '../controllers/guideline/g-resize'
import '../controllers/guideline/g-header'

import jails from 'jails'

jails.app('guideline', function( html, data ){

	this.init = ()=>{
		console.log('You\'re at Guideline!')
	}

})

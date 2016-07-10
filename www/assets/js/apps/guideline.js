import '../components/guideline/g-sidebar'
import '../components/guideline/g-resize'

import '../controllers/guideline/g-header'

import jails from 'jails'

jails.app('guideline', function( html, data ){

	this.init = ()=>{
		console.log('You\'re at Guideline!')
	}

})

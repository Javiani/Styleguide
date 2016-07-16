import '../components/guideline/g-sidebar'
import '../controllers/stick-menu'

import jails from 'jails'

jails.app('guideline', function( html, data ){

	this.init = ()=>{
		console.log('You\'re at Guideline!')
	}

})

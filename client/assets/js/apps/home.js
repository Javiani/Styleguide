import jails from 'jails'

jails('home', function( component, html, data ){

	component.init = ()=>{
		console.log('You\'re at Home!')
	}

})

import jails from 'jails'

jails('home', ( component, html, data )=>{

	component.init = ()=>{
		console.log('You\'re at Home!')
		jails.subscribe('third-party:facebook', log)
	}

	const log = ( script, tag )=>{
		console.info(`[third-party/${script.name}] is loaded`)
	}
})

import jails from 'jails-js'

jails('home', ( {init, subscribe} )=>{

	init(()=>{
		console.log('You\'re at Home!')
		subscribe('third-party:facebook', log)
	})

	const log = ( script, tag )=>
		console.info(`[third-party/${script.name}] is loaded`)

})

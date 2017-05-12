import jails from 'jails-js'

jails('button', ( {init, on} ) =>{

	init(()=>{
		on('click', log)
	})

	let log = ()=>{
		alert('Button was clicked!')
	}

})

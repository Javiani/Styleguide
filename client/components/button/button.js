import jails from 'jails'

jails('button', ( component, html, data ) =>{

	component.init = ()=>{
		component.on('click', log)
	}

	let log = ()=>{
		alert('Button was clicked!')
	}

})

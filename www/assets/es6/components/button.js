import jails from 'jails'

jails.component('button', function( html, data ){

	this.init = ()=>{
		this.on('click', click)
	}

	let click = (e)=>{
		this.emit('click', e.target.innerHTML)
	}

})

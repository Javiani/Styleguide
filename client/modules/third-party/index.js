import jails from 'jails'
import scriptjs from 'scriptjs'

export default {
	load( at = 'script[type="text/third-party"]' ){
		let scripts = Array.from( document.querySelectorAll( at ) )
		scripts.forEach( item => execute( item ) )
	}
}

const execute = ( item )=>{
	let name = item.getAttribute('name')
	if( item.src ){
		scriptjs([ item.src ], ()=> jails.publish( `third-party:${name}`, { name, item } ))
	}else{
		try{
			new Function( item.text )()
			jails.publish( `third-party:${name}`, { name, item } )
		}
		catch(e){ console.error( e, item ) }
	}
}

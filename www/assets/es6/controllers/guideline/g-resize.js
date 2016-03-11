import jails from 'jails'

jails.controller('g-resize', function( html, data ){

	let device, buttons

	this.init = ()=>{

		device = $( html ).find('.g-device')
		buttons = $(html).find('.item a')

		this.on('click', '.item a', select)
	}

	let select = (e)=>{

		var link = $(e.target),
			clss = link.data('value')

		buttons.removeClass('-active')
		link.addClass('-active')
		device.removeClass().addClass('g-device '+ clss )
	}

})

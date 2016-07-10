import jails from 'jails'

jails.component('g-sidebar', function( html, data ){

	let sidebar = $( html )

	this.init = ()=>{

        this.on('click', 'li > .g-js', toggle_submenu)
		this.on('click', '.g-sidebar-button', toggle)
	}

	this.open = ()=>{
		sidebar.addClass('open')
	}

	this.close = ()=>{
		sidebar.removeClass('open')
	}

	this.is_opened = ()=>{
		return sidebar.hasClass('open')
	}

	let toggle = (e)=>{

		if( this.is_opened() )
			sidebar.removeClass('open')
		else
			sidebar.addClass('open')

		e.preventDefault()
	}

    let toggle_submenu = (e)=>{

        let li = $(e.target).parents('li')

        if( li.hasClass('active') )
            li.removeClass('active')
        else
            li.addClass('active')

		e.preventDefault()
    }
})

import path from 'path'
import glob from 'glob'

export default (()=>{

	let menu = [],
		files = glob.sync('./www/views/docs/**/*.md')

	files.forEach(function( file ){

		let name = path.basename( file, '.md' ),
			url  = file.split(/views/).pop(),
			href = path.dirname( url )

		menu.push({
			name,
			link :path.resolve( href, `${name}.md` )
		})
	})

	return menu

})()

import path from 'path'
import glob from 'glob'

export default ( folder, blank ) =>{

	let menu = [],
		files = glob.sync(`./www/views/${folder}/**/*.njk`)

	files.forEach(function( file ){

		let name = path.basename( file, '.njk' ),
			url  = file.split(/views/).pop(),
			href = path.dirname( url )

		menu.push({
			name,
			link	:path.resolve( href, name ),
			target  :blank? '_blank' : null
		})
	})

	return menu
}

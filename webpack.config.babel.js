import path from 'path'
import glob from 'glob'
import webpack from 'webpack'

let optimize = webpack.optimize
let dev	 	 = !!process.argv.filter((item)=>item == '--dev').length

let config = {
	js	 :'./www/assets/js',
	dist :__dirname + '/www/assets/dist/js'
}

export default {

	devtool :'source-map',

	entry : glob.sync( `${config.js}/apps/**/*.js`).reduce( entries, {
		main:[ `${config.js}/main${(dev?'.dev':'')}` ]
	}),

	output: {
		path: config.dist,
		filename: '[name].min.js'
	},

	resolve:{
		root  :config.js,
		alias :{
			jails :'jails-js/source/jails.js',
			mods  :'jails-modules',
			comps :'jails-components'
		}
	},

	plugins :[
		new optimize.CommonsChunkPlugin('main', 'main.min.js')
	].concat(
		dev? [] :new optimize.UglifyJsPlugin({
			compress :{ warnings:false },
			minimize :true
		})
	),

	module: {
		loaders: [{
			loader	: 'babel',
			test	: /\.js$/,
			exclude	: /node_modules/,
			query	:{ presets:['es2015'] }
		}]
	}
}


function entries( acc, file ){

	let filename  = path.basename(file, '.js'),
		directory = path.dirname(file),
		dir = directory.split(/\//).pop()

	filename = dir == 'apps' ? filename : `${dir}/${filename}`
	acc[filename] = `./${file}`

	return acc
}

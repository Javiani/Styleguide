import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

let optimize = webpack.optimize
let dev	 	 = process.env.NODE_ENV != 'production'

let config = {
	client	   :'./client',
	dist	   :__dirname + '/assets/'
}

export default {

	devtool :'source-map',

	entry : glob.sync( `${config.client}/pages/**/*{.js,.css}`).reduce( entries, {
		main:[
			`${config.client}/components/main/main.js`,
			`${config.client}/components/main/main.css`
		]
	}),

	output: {
		path: config.dist,
		filename: 'dist/[name]/[name].min.js'
	},

	resolve:{
		root :[ path.resolve(config.client) ],
		alias :{
			jails :'jails-js/source/jails.js',
			mods  :'jails-modules',
			comps :'jails-components'
		}
	},

	plugins :[
		new optimize.CommonsChunkPlugin('main', 'dist/main/main.min.js')
	].concat(
		dev? [] :new optimize.UglifyJsPlugin({
			compress :{ warnings:false },
			minimize :true
		}),
		new ExtractTextPlugin('dist/[name]/[name].css', {allChunks: false})
	),

	module: {
		loaders: [
			{
				loader	: 'babel',
				test	: /\.js$/,
				exclude	: /node_modules/,
				query	:{ presets:['es2015'] }
			},
			{
				test:   /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			}
		]
	}
}


function entries( acc, file ){

	let filename  = file.replace(path.extname(file), '')
	filename = filename.replace( `${config.client}/pages/`, '')
	filename = path.basename(filename)

	acc[filename]? acc[filename].push(file) : acc[filename] = [file]

	return acc
}

import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

let optimize = webpack.optimize
let dev	 	 = !!process.argv.filter((item)=>item == '--dev').length

let config = {
	main :'./assets/js',
	js	 :'./client',
	dist :__dirname + '/dist/',
	publicPath :'./dist/js/'
}

export default {

	devtool :'source-map',

	entry : glob.sync( `${config.js}/apps/**/*.js`).reduce( entries, {
		main:[ './assets/main/main.js', './assets/main/main.css' ],
		home:[
			`${config.js}/pages/home/home.js`,
			`${config.js}/pages/home/home.css`
		],
		guideline:[
			`${config.js}/pages/guideline/guideline.js`,
			`${config.js}/pages/guideline/guideline.css`
		],
        buttons :[
            `${config.js}/guideline/buttons/buttons.js`,
			`${config.js}/guideline/buttons/buttons.css`
        ]
	}),

	output: {
		path: config.dist,
		filename: '[name]/[name].min.js',
		publicPath: config.publicPath
	},

	resolve:{
		root :[ path.resolve(config.js) ],
		alias :{
			jails :'jails-js/source/jails.js',
			mods  :'jails-modules',
			comps :'jails-components'
		}
	},

	plugins :[
		new optimize.CommonsChunkPlugin('main', 'main/main.min.js')
	].concat(
		dev? [] :new optimize.UglifyJsPlugin({
			compress :{ warnings:false },
			minimize :true
		}),
		new ExtractTextPlugin('[name]/[name].css', {allChunks: false})
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

	let filename  = path.basename(file, '.js'),
		directory = path.dirname(file),
		dir = directory.split(/\//).pop()

	filename = dir == 'apps' ? filename : `${dir}/${filename}`
	acc[filename] = `./${file}`

	return acc
}

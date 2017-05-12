import path from 'path'
import glob from 'glob'
import {optimize} from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const config = {
	src	: './front',
	dist: `${__dirname}/dist/`,
	publicPath :'./dist/'
}

const guideline = glob.sync( `${config.src}/guideline/pages/**/index{.js,.styl}` ).reduce( entries('guideline'), {})
const site = glob.sync( `${config.src}/site/pages/**/index{.js,.styl}` ).reduce( entries('site'), {})
const entry = Object.assign({  main :[`${config.src}/main`] }, guideline, site)

export default {

	devtool: 'source-map',

	entry,

	output: {
		path: config.dist,
		filename: '[name]/index.js',
		publicPath: config.publicPath
	},

	resolve:{
		root  :[ path.resolve(config.src), path.resolve(config.dist) ]
	},

	plugins :[
		new optimize.CommonsChunkPlugin('main', 'main.js')
	].concat(
		new optimize.UglifyJsPlugin({ compress :{ warnings:false }, minimize :true }),
		new ExtractTextPlugin('[name]/index.css', {allChunks: false})
	),

	module: {
		loaders: [{
			loader: 'babel',
			test: /\.js$/,
			exclude: /node_modules/,
			query:{
				presets:['es2015']
			}
		},
		{
			test:   /\.styl$/,
			loader: ExtractTextPlugin.extract('css-loader!stylus-loader?paths[]=node_modules&paths[]=front')
		}]
	}
}

function entries(area){
	return function( acc, file ){
		let dir 	 = path.dirname(file).split(/\//).pop()
		acc[ `${area}/${dir}`] = (acc[dir] || []).concat(file)
		return acc
	}
}

var path, glob, webpack, uglify, dev, optimize;

path	 = require('path');
glob	 = require('glob');
webpack  = require('webpack');
optimize = webpack.optimize;
uglify   = optimize.UglifyJsPlugin;

dev	 = !!process.argv.filter(function(item){
	return item == '--dev';
}).length;

module.exports = {

	devtool : 'source-map',

	entry : glob.sync('./www/assets/es6/apps/**/*.js')
		.reduce( entries, {
			main:[ 'jails', 'scriptjs', './www/assets/es6/main'+ (dev?'.dev':'') ]
		}),

	output: {
		path: __dirname + '/www/assets/dist/js',
        filename: '[name].min.js'
	},

	resolve:{
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
			minimize :true}
		)
	),

	module: {
		loaders: [{
			loader: 'babel',
			test: /\.js$/,
			exclude: /node_modules/,
			query:{ presets:['es2015']}
		}]
	}
};

function entries(acc, file){

	var filename  = path.basename(file, '.js'),
		directory = path.dirname(file),
		dir = directory.split(/\//).pop();

	filename = dir == 'apps' ? filename : dir+'/'+filename ;
	acc[filename] = './' + file;

	return acc;
}

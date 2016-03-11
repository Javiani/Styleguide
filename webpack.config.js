var path, glob, webpack, uglify, dev;

path    = require('path');
glob    = require('glob');
webpack = require('webpack');
uglify  = webpack.optimize.UglifyJsPlugin;
dev     = process.argv.filter(function(item){
    return item == '--dev';
});

module.exports = {

	devtool:'source-map',

    output: {
        filename: './www/assets/dist/js/[name].min.js'
    },

	resolve:{
		alias :{
			jails :'jails-js/source/jails.js',
			mods  :'jails-modules',
			comps :'jails-components'
		}
	},

	plugins :dev? null :[
		new uglify({ compress :{ warnings:false }, minimize :true })
	],

    module: {
        loaders: [{
			loader: 'babel',
			test: /\.js$/,
			exclude: /node_modules/,
			query:{ presets:['es2015']}
		}]
    },

    entry: glob.sync('./www/assets/es6/apps/**/*.js')
        .reduce(function(acc, file){
            var filename  = path.basename(file, '.js'),
                directory = path.dirname(file),
                dir = directory.split(/\//).pop();

            filename = dir == 'apps' ? filename : dir+'/'+filename ;
            acc[filename] = ['./'+file, './www/assets/es6/main' + (dev.length?'.dev':'')];
            return acc;
        }, {})
};

/*
    @Routes
*/
module.exports = function( app ){

    var fs = require('fs');
	var optimize = require('webpack').optimize;
	var config = require('../webpack.config');

    return function(req, res, next){

        var webpack = require('webpack'),
            assets  = './www/assets/js/',
            url     = req.params[0],
            string  = '',
            compiler;

        res.setHeader('Content-Type', 'text/javascript');

        compiler = webpack({
            entry :{
				temp:[ 'jails', 'scriptjs', './www/assets/js/main.dev', assets + url ],
			},
            output: {
				path: './www/assets/dist/js',
		        filename: 'temp.js'
			},
            module: config.module,
            resolve:config.resolve
        });

        compiler.run(function(error, stats){
            string = fs.readFileSync('./www/assets/dist/js/temp.js', 'utf-8');
            fs.unlink('./www/assets/dist/js/temp.js');
            res.send( string );
        });
    }
};

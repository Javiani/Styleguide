/*
    @Routes
*/
module.exports = function( app, render ){

    var fs = require('fs');

    return function(req, res, next){

        var webpack = require('webpack'),
            assets  = './www/assets/es6/',
            url     = req.params[0],
            string  = '',
            compiler;

        res.setHeader('Content-Type', 'text/js');

        compiler = webpack({
            entry : [assets + url , assets + 'main.dev'],
            output: { filename: './www/assets/dist/js/temp.js' },
            module: {
                loaders: [{ loader: 'babel', test: /\.js$/, query:{ presets:['es2015']} }]
            },
            resolve:{
                alias :{
                    jails :'jails-js/source/jails.js',
                    mods  :'jails-modules',
                    comps :'jails-components'
                }
            }
        });

        compiler.run(function(error, stats){
            string = fs.readFileSync('./www/assets/dist/js/temp.js', 'utf-8');
            fs.unlink('./www/assets/dist/js/temp.js');
            res.send( string );
        });
    }
};

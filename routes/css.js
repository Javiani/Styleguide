/*
    @Routes
*/
module.exports = function( app, render ){

    var fs = require('fs');

    return function(req, res, next){

		var stylus = require('stylus'),
		    jeet = require('jeet'),
            url, assets, string, stream, path;

	    res.setHeader('Content-Type', 'text/css');

	    url = request.params[0];
	    assets = './www/assets/styl/';
	    string = fs.readFileSync( assets + url, 'utf8' );

	    path = url.split(/\//);
	    path.pop();

	    stylus( string )
	        .set('paths', [ assets + path.join('/') ])
	        .use( jeet() )
	        .render(function( err, css ){
	            res.send(css);
	            if( err )
	                console.log( err );
	        });
	}
};

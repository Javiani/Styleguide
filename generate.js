var glob = require('glob');
var http = require('http');
var path = require('path');
var fs   = require('fs');
var pkg  = require('./package.json');
var exec = require('child_process' ).exec;

var config = {
	src : pkg.generate.src || 'pages',
	out : pkg.generate.out || '_site'
};

exec('rm -rf '+ config.out, function(){
	fs.mkdir( config.out, function(){
		fs.mkdir( config.out + '/assets');
		exec('cp -rf www/assets/dist ' + config.out + '/assets/dist' );
	});
});

glob.sync( './www/views/'+ config.src +'/**/*' ).map(get);

function get( url ){
	var file = path.basename( url, '.htm' );
	http.get({
		path: 'http://localhost/' + config.src + '/' + file,
		port: 3000
	}, create(file));
}

function create( file ){
	return function( res ){
		var body = '';
		res.on('data', function(d) { body += d; });
		res.on('end', function() {
			fs.writeFile( config.out + '/' + file + '.htm', body, function(err){
				if( err ) console.log( err );
			})
		});
	};
}

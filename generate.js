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

console.log('Running build...')
exec('npm run build', function(){
	console.log('Cleaning output directories');
	exec('rm -rf '+ config.out, function(){
		console.log('Creating new directories');
		fs.mkdir( config.out, function(){
			console.log('Copying assets...');
			fs.mkdir( config.out + '/assets', function(){
				console.log('Generating html files');
				exec('cp -rf www/assets/dist ' + config.out + '/assets/dist', function(){
					glob.sync( './www/views/'+ config.src +'/**/*' ).map(get);
				});
			});
		});
	});
});

function get( url ){
	var file = path.basename( url, '.njk' );
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
			body = body.replace(/\/assets/g, 'assets');
			fs.writeFile( config.out + '/' + file + '.htm', body, function(err){
				if( err ) console.log( err );
				else console.log('Finished.');
			})
		});
	};
}

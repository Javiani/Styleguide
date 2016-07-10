var glob = require('glob'),
    fs = require('fs'),
    showdown = require('showdown'),
    converter = new showdown.Converter(),
    path = require('path');

module.exports = function(){

    var files = glob.sync('./www/views/components/**/*.njk'),
    menu = [];

    files = files.forEach(function( file ){
        if(!(!!file.match(/guideline/))){
            var text = fs.readFileSync(file, 'utf8');
            var o = {};
                o.url = file.split(/views\//).pop();
                o.url = o.url.split(/\./).shift();
                o.name = path.basename(o.url);
                o.link = '/components?url=' + o.url;
            menu.push( o );
        }
    });

	return menu;
};

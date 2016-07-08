var path = require('path'),
    glob = require('glob');

module.exports = function(){

    var menu = [],
        files = glob.sync('./www/views/pages/**/*.njk');

    files.forEach(function( file ){

        var name = path.basename( file, '.njk' ),
            url  = file.split(/views/).pop(),
            href = path.dirname( url );

        menu.push({
            name    :name,
            link    :path.resolve( href, name ),
            target  :'_blank'
        });
    });

	return menu;
};

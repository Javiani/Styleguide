var path = require('path'),
    glob = require('glob');

module.exports = function( folder, blank ){

    var menu = [],
        files = glob.sync('./www/views/'+folder+'/**/*.njk');

    files.forEach(function( file ){

        var name = path.basename( file, '.njk' ),
            url  = file.split(/views/).pop(),
            href = path.dirname( url );

        menu.push({
            name    :name,
            link    :path.resolve( href, name ),
            target  :blank? '_blank' : null
        });
    });

	return menu;
};

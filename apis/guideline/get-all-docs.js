var path = require('path'),
    glob = require('glob');

module.exports = (function(){

    var menu = [],
        files = glob.sync('./www/views/docs/**/*.md');

    files.forEach(function( file ){

        var name = path.basename( file, '.md' ),
            url  = file.split(/views/).pop(),
            href = path.dirname( url );

        menu.push({
            name :name,
            link :path.resolve( href, name +'.md' )
        });
    });

	return menu;
})();

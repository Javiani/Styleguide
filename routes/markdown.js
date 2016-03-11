/*
    @Routes
*/
module.exports = function( app, render ){

    var fs = require('fs');

    return function( req, res, next ){

		var showdown  = require('showdown'),
			converter = new showdown.Converter();

		var file = req.params[0],
			url   = './www/views',
			text  = fs.readFileSync(url + file + '.md', 'utf8');

        global.site.markdown = converter.makeHtml( text );
		render('views/markdown.htm', req, res, next );
	}
};

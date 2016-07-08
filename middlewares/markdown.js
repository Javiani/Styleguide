/*
    @Routes
*/
module.exports = function( app ){

    var fs = require('fs');

    return function( req, res, next ){

		var showdown  = require('showdown'),
			converter = new showdown.Converter();

		var file = req.params[0],
			url   = './www/views',
			text  = fs.readFileSync(url + file + '.md', 'utf8');

		res.render('markdown.njk', { markdown :converter.makeHtml( text ) });
	}
};

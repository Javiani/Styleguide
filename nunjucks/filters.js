var showdown  = require('showdown'),
	converter = new showdown.Converter();

module.exports = function( app, env ){

	//Markdown
	env.addFilter('markdown', function( text ){
		return converter.makeHtml( text.trim() );
	});
};

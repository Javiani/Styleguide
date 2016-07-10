module.exports = function( app, env ){

	//Markdown
	env.addFilter('markdown', function( text ){
		var showdown  = require('showdown'),
			converter = new showdown.Converter();
		return converter.makeHtml( text.trim() );
	});
};

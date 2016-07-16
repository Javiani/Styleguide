var path = require('path'),
    glob = require('glob'),
	docs 		= get('guideline/get-all-docs'),
	pages 		= get('guideline/get-all-pages')('pages', true),
	guideline 	= get('guideline/get-all-pages')('guideline')

module.exports = (function(){

    return [
        {
            section :'Docs',
            icon    :'fa-file-text-o',
            items   :docs
        },
		{
            section :'Guideline',
            icon    :'fa-book',
            items   :guideline
        },
		{
            section :'Pages',
            icon    :'fa-files-o',
            items   :pages
        }
    ];
})();

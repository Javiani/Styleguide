var path = require('path'),
    glob = require('glob');

module.exports = function(){

    return [
        {
            section :'Docs',
            icon    :'fa-file-text-o',
            items   :api('guideline/get-all-docs')
        },
        {
            section :'Components',
            icon    :'fa-th-large',
            items   :api('guideline/get-all-components')
        },
        {
            section :'Pages',
            icon    :'fa-files-o',
            items   :api('guideline/get-all-pages')
        }
    ];
};

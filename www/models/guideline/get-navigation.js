var path = require('path'),
    glob = require('glob');

module.exports = function(){

    return [
        {
            section :'Docs',
            icon    :'fa-file-text-o',
            items   :model('guideline/get-all-docs')
        },
        {
            section :'Components',
            icon    :'fa-th-large',
            items   :model('guideline/get-all-components')
        },
        {
            section :'Pages',
            icon    :'fa-files-o',
            items   :model('guideline/get-all-pages')
        }
    ];
};

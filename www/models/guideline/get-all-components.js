var glob = require('glob'),
    fs = require('fs'),
    showdown = require('showdown'),
    converter = new showdown.Converter(),
    path = require('path');

module.exports = function(){

    var files = glob.sync('./www/views/components/**/*.htm'),
    menu = [];

    files = files.forEach(function( file ){
        if(!(!!file.match(/guideline/))){
            var text = fs.readFileSync(file, 'utf8');
            var o = get_data(text);
                o.url = file.split(/views\//).pop();
                o.url = o.url.split(/\./).shift();
                o.name = path.basename(o.url);
                o.link = '/components?url=' + o.url;
            menu.push( o );
        }
    });

    function get_data( string ){

        var comment = string.substring(0, 1000).match(/\/\*([^|])*\*\//g);
        var markd;
        if(comment && comment.length){
            comment = comment[0].replace(/\/\*/, '').replace(/\*\//, '');
            comment = comment.replace(/(^\s{4})*/gm, '');
            markd = converter.makeHtml(comment.trim());
            return { doc :markd  };
        }
        return {};
    }

	return menu;
};

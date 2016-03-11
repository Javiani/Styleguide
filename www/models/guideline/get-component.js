var path = require('path');

module.exports = function(){

    return function(url){

        var name = path.basename(url);
        component = model('guideline/get-all-components');
    
        return component.filter(function(item){
    		return item.name == name;
    	})[0];
    };
}

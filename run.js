var server = require('./server');
var database = require('./database');

function init(){
    
    database.connect(function(){
        
        require('./models/product');
        require('./models/project');
        
        server.start();
        
    });
    
}

init();
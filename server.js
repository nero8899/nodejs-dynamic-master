var express     = require('express');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var app         = express();

exports.start = function(){
    
    app.set('view engine', 'ejs');
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded()); 
    
    var router = require('./router');
    router(app);
    
    app.listen(3000, function(err){
        
        console.log('Server running');
        
    });
    
};







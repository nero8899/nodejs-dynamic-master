var mongoose = require('mongoose');

exports.connect = function(cb){
  
    mongoose.connect('mongodb://localhost/wdd16sample');
    
    mongoose.connection.on('error', function(err){
        
        console.log(err);
        
    });
    
    mongoose.connection.once('open', function(){
       
        if(cb){
            cb();
        }
        console.log('Connection successful');
        
    });
    
    
};
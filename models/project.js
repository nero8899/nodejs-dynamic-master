var mongoose = require('mongoose');

var schema = mongoose.Schema({
    title           : { type:String, required:true },
    description     : String,
    postedOnDate    : { type:Date, default:Date.now },
    lastModified    : { type:Date, default:Date.now }
});

mongoose.model('Project', schema);
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name : { type:String, required:true },
    price : Number,
    postedOnDate : Date,
    description : String,
    color : String,
    lastModified : { type:Date, default:Date.now },
    tags : [{ type:String }]
});

mongoose.model('Product', schema);
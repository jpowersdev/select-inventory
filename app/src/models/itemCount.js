//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemCountSchema = new Schema({
    code: {type: String, required: true},
    held: {type: Number, required: true},
    date: {type: Date, default: Date.now}
});

exports.module = mongoose.model('ItemCount', ItemCountSchema);
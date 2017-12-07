//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var ItemSchema = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    // usage: {type: Number, required: false},
    // unit: {type: Number, required: false},
    par: {type: Number, requred: true},
    price: {type: Number, required: false},
    date: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}
});

ItemSchema.methods.findSimilarTypes = function(cb) {
    return this.model('Item').find({ type: this.type }, cb);
};

//export our module to use in server.js
module.exports = mongoose.model('Item', ItemSchema);
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemPurchaseSchema = new Schema({
    code: {type: String, required: true},
    quantity: {type: Number, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ItemPurchase', ItemPurchaseSchema);
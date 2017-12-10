//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemPurchaseSchema = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    date: {type: Date, default: Date.now}
});

// ItemPurchaseSchema.query.getDates = function() {
//     return this.find(); //.select('date').filter((v, i, a) => a.indexOf(v) === i);
// };

module.exports = mongoose.model('ItemPurchase', ItemPurchaseSchema);
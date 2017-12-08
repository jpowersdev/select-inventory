var mongoose = require('mongoose');

var Item = require('./app/src/models/item');
var ItemCount = require('./app/src/models/itemCount');
var ItemPurchase = require('./app/src/models/itemPurchase');

const DB = {
    getItems (event) {
        mongoose.connect('localhost:27017/select-inventory');
        
        Item.find(function(err, items) {
            if (err)
                console.log(err);
                event.sender.send('error', err);
            //responds with a json object of our database items.
            event.sender.send('data', items);
        });
    }
}

module.exports = DB;
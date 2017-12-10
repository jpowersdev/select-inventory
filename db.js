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
    },

    postItemPurchase (event, data, date) {
        mongoose.connect('localhost:27017/select-inventory');

        var itemList = [];
        
        itemList.push(
            data[0].map((v) => {
                return new ItemPurchase({
                    code: v.Code,
                    name: v.Name,
                    quantity: v.Quantity,
                    date: date
                });
            })
        );

        itemList.push(
            data[1].map((v) => {
                return new ItemPurchase({
                    code: v.Code,
                    name: v.Name,
                    quantity: v.Quantity,
                    date: date
                });
            })
        );

        itemList.push(
            data[2].map((v) => {
                return new ItemPurchase({
                    code: v.Code,
                    name: v.Name,
                    quantity: v.Quantity,
                    date: date
                });
            })
        );

        itemList.push(
            data[3].map((v) => {
                return new ItemPurchase({
                    code: v.Code,
                    name: v.Name,
                    quantity: v.Quantity,
                    date: date
                });
            })
        );

        var final = [].concat.apply([],itemList);
        console.log(final);
        
        // ItemPurchase.collection.insertMany(final)
        //     .then(function(docs) {
        //         res.json(docs);
        //     }).catch(function(err) {
        //         res.send(err);
        //     });

        // console.log(final);

        // ItemPurchase.collection.insertMany(final)
        // .then(function(docs) {
        //     res.json(docs);
        // }).catch(function(err) {
        //     res.send(err);
        // });
    }
}

module.exports = DB;
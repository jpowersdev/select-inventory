var mongoose = require('mongoose');

var Item = require('./app/src/models/item');
var ItemCount = require('./app/src/models/itemCount');
var ItemPurchase = require('./app/src/models/itemPurchase');

function isInDateArray(array, value) {
    return !!array.find(item => {return item.getTime() == value.getTime()});
  }

const DB = {
    getItems (event) {
        mongoose.connect('localhost:27017/select-inventory');
        
        Item.find(function(err, items) {
            if (err) {
                console.log(err);
                event.sender.send('error', err);
            } else {
                event.sender.send('itemList', items);
            }
        });
    },

    getItemPurchases (event) {
        mongoose.connect('localhost:27017/select-inventory');
        
        ItemPurchase.find(function(err, items) {
            if (err) {
                console.log(err);
                event.sender.send('error', err);
            } else {
                event.sender.send('itemPurchaseList', items);
            }
        });
    },

    getOrderDates (event) {
        mongoose.connect('localhost:27017/select-inventory');
        
        ItemPurchase.find(function(err, purchases) {
            if (err) {
                console.log(err);
                event.sender.send('error', err);
            } else {
                var dateList = [];
                purchases.map(p => {
                    if (!isInDateArray(dateList, p.date)){
                        dateList.push(p.date);
                    } 
                })
                event.sender.send('dateList', dateList); //.filter((v, i, a) => a.indexOf(v) === i));
            }
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
        
        ItemPurchase.collection.insertMany(final)
            .then(function(docs) {
                event.sender.send(docs);
            }).catch(function(err) {
                event.sender.send(err);
            });
    }
}

module.exports = DB;
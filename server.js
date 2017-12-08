'use strict'
var path = require('path');
var express = require('express');
// first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001
// var port = process.env.API_PORT || 3001;
const port = process.env.PORT || 8080;

mongoose.connect('localhost:27017/select-inventory');
//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent items
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

var Item = require('./app/src/models/item');
var ItemCount = require('./app/src/models/itemCount');
var ItemPurchase = require('./app/src/models/itemPurchase');
//adding the /items route to our /api router

router.route('/items')
//retrieve all items from the database
    .get(function(req, res) {
        //looks at our Item Schema
        Item.find(function(err, items) {
            if (err)
                res.send(err);
            //responds with a json object of our database items.
            res.json(items)
        });
    })
    //post new item to the database
    .post(function(req, res) {
        var itemList = [];

        itemList.push(
            req.body.frozen.map((v) => {
                return new Item({
                    code: v.Code,
                    name: v.Name,
                    type: "frozen",
                    par: v.Par,
                    price: v.Price
                });
            })
        );

        itemList.push(
            req.body.refrigerated.map((v) => {
                return new Item({
                    code: v.Code,
                    name: v.Name,
                    type: "refrigerated",
                    par: v.Par,
                    price: v.Price
                });
            })
        );

        itemList.push(
            req.body.dry.map((v) => {
                return new Item({
                    code: v.Code,
                    name: v.Name,
                    type: "dry",
                    par: v.Par,
                    price: v.Price
                });
            })
        );

        itemList.push(
            req.body.paper.map((v) => {
                return new Item({
                    code: v.Code,
                    name: v.Name,
                    type: "paper",
                    par: v.Par,
                    price: v.Price
                });
            })
        );

        var final = [].concat.apply([],itemList);
        console.log(final);
        
        Item.collection.insertMany(final)
            .then(function(docs) {
                res.json(docs);
            }).catch(function(err) {
                res.send(err);
            });
    });

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function(err) {
    if (err) {
        return console.error(err);
    }
    console.log(`Listening at http://localhost:${port}/`);
})
var express = require('express');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

//list of orders ( chicken-index.ejs )
router.get('/', function (req, res) {
  console.log(global.db)
  var collection = global.db.collection('pizzaOrder');
  collection.find().toArray(function (err, orders) {
    var formattedOrders = orders.map(function (order) {
      return {
        //return is passing to the view
        _id: order._id,
        name: order.name,
        qty: order.qty,
        size: order.size,
        style: order.style,
        toppings: order.toppings,
        createdAt: moment(order._id.getTimestamp()).fromNow(),
      }
    });

    res.render('templates/pizza-index', {orders: formattedOrders});
  });
});

//order form
router.get('/order', function (req, res) {
  res.render('templates/pizza-new');
});

//saves order to db
router.post('/order', function (req, res) {
  var collection = global.db.collection('pizzaOrder');

  collection.save(req.body, function(){
    res.redirect('/pizza');
  });
});

router.post('/order/:id/complete', function (req, res) {

  var collection = global.db.collection('pizza');

  collection.update(
    {_id: ObjectID(req.params.id)},
    {$set: {complete:true}},
    function(){
      res.redirect('/pizza');
    });
});

module.exports = router;

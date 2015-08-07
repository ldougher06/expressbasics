var express = require('express');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

//list of orders ( chicken-index.ejs )
router.get('/', function (req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.find().toArray(function (err, orders) {
    var formattedOrders = orders.map(function (order) {
      return {
        //return is passing to the view
        _id: order._id,
        name: order.name,
        flavor: order.style,
        qty: order.qty,
        createdAt: moment(order._id.getTimestamp()).fromNow()
      }
    });

    res.render('templates/chicken-index', {orders: formattedOrders});
  });
});

//order form
router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});

//saves order to db
router.post('/order', function (req, res) {

  var collection = global.db.collection('chickenNuggets');

  collection.save(req.body, function(){
    res.redirect('/chickennuggets');
  });
});

router.post('/order/:id/complete', function (req, res) {

  var collection = global.db.collection('chickenNuggets');

  collection.update(
    {_id: ObjectID(req.params.id)},
    {$set: {complete:true}},
    function(){
      res.redirect('/chickennuggets');
    });
});

module.exports = router;

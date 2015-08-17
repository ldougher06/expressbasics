var express = require('express');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();
var ChickenNuggets = require('../models/ChickenNuggets');
//list of orders ( chicken-index.ejs )
/*router.get('/', function (req, res) {
  ChickenNuggets.findAllOrders(function (err, orders) {
    res.render('templates/chicken-index')
  })
  function formatAllOrders (orders) {
    return orders.map(function (order) {
      order.flavor = order.style;
      //order.createdAt: moment(order._id.getTimestamp()).fromNow();
      delete order.style;
      return order;
    });
  };
}*/

//order form
router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});

//saves order to db
router.post('/order', function (req, res) {
  var order = new Order(req.body);
  order.save(function () {
    res.redirect('/chickennuggets');
  });

  // Order.save(req.body, function () {
  //   res.redirect('/chickennuggets');
  // });

  // var collection = global.db.collection('chickenNuggets');

  // collection.save(req.body, function(){
  //   res.redirect('/chickennuggets');
  // });
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

var express = require('express');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;
var Order = require('../models/ChickenNuggets');
var router = express.Router();

//list of orders ( chicken-index.ejs )
router.get('/', function (req, res) {
  var id = req.session.user._id;

  Order.findAllByUserId(id, function (err, orders) {
    res.render('templates/chicken-index', {orders: formatAllOrders(orders)});
  });

  function formatAllOrders(orders) {
    return orders.map(function (order) {
      order.flavor = order.style;
      order.createdAt = moment(order._id.getTimestamp()).fromNow();
      delete order.style;
      return order;
    });
  }
});

//order form
router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});

//saves order to db
router.post('/order', function (req, res) {
  var o = req.body;
  o.userId = req.session.user._id;

  Order.create(o, function () {
    res.redirect('/chickennuggets');
  });
});

router.post('/order/:id/complete', function (req, res) {
  Order.findById(req.params.id, function (err, order) {
    order.complete(function () {
      res.redirect('/chickennuggets');
    });
  });
});

module.exports = router;

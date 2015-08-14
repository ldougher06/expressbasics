//var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;

function Order(o) {
  this.name = o.name;
  this.style = o.style;
  this.qty = o.qty;
  this.createdAt = new Date();
  this.complete = false;
  this.cost = this.qty * 0.25;
}

// Order.collection = global.db.collection('chickenNuggets');
Object.defineProperty(Order, 'collection', {
  get: function () {
    return global.db.collection('chickenNuggets');
  }
});

Order.prototype.save = function (cb) {
  Order.collection.save(this, cb);
}

Order.prototype.complete = function (cb) {
  Order.collection.update(
    {_id: this._id},
    {$set: {complete: true}}
  , cb);
}

Order.findById = function (id, cb) {
  Order.collection.find({_id: ObjectID(id)}, function (err, order) {
    cb(err, setPrototype(order));
  });
};

Order.findAll = function (cb) {
  Order.collection.find().toArray(function (err, orders) {
    var prototypedOrders = orders.map(function (order) {
      return setPrototype(order);
    });

    cb(err, prototypedOrders);
  });
};

module.exports = Order;

function setPrototype(pojo) {
  return _.create(Order.prototype, pojo);
}

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  listing:{type:String},
  otype:{type:String},
  seller:{type:Number},
  buyer:{type:Number},
  qty:{type:mongoose.Types.Decimal128},
  notif:{type:String},
  accept:{type:Boolean},
  status:{type:Boolean},
  logistics:{type:Number}
});

module.exports = mongoose.model('Order',OrderSchema);
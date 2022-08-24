const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  listing:{type:String},
  otype:{type:String},
  seller:{type:Number},
  buyer:{type:Number},
  qty:{type:mongoose.Types.Decimal128},
  notif:{type:String},
  accept:{type:Boolean},
  status:{type:Number},
  logistics:{type:Number},
  lat:{type:mongoose.Types.Decimal128},
  lon:{type:mongoose.Types.Decimal128}
});

module.exports = mongoose.model('Order',OrderSchema);
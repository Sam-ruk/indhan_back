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
  logistics:{type:Number},
  slat:{type:mongoose.Types.Decimal128},
  slon:{type:mongoose.Types.Decimal128},
  blat:{type:mongoose.Types.Decimal128},
  blon:{type:mongoose.Types.Decimal128},
  llat:{type:mongoose.Types.Decimal128},
  llon:{type:mongoose.Types.Decimal128}
});

module.exports = mongoose.model('Order',OrderSchema);
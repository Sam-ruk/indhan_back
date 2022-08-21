const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  listing:{type:String},
  seller:{type:String},
  buyer:{type:String},
  qty:{type:mongoose.Types.Decimal128},
  notes:{type:String},
  status:{type:Boolean},
  logistics:{type:String}
});

module.exports = mongoose.model('Order',OrderSchema);
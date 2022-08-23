const mongoose = require('mongoose');

const LogisticSchema = new mongoose.Schema({
  type:{type:String},
  lat:{type:mongoose.Types.Decimal128},
  lon:{type:mongoose.Types.Decimal128},
  cost:{type:mongoose.Types.Decimal128},
  qty:{type:mongoose.Types.Decimal128},
  unit:{type:String}
});

module.exports = mongoose.model('Logistic',LogisticSchema);

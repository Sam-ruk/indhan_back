const mongoose = require('mongoose');

const CLocSchema = new mongoose.Schema({
  username:
  { type:String },
  lat: {
    type:mongoose.Types.Decimal128
  },
  long: {
    type:mongoose.Types.Decimal128
  },
});

module.exports = mongoose.model('CLoc',CLocSchema);

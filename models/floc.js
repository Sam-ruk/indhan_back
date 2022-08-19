const mongoose = require('mongoose');

const FLocSchema = new mongoose.Schema({
  username:
  { type:String },
  lat: {
    type:mongoose.Types.Decimal128
  },
  long: {
    type:mongoose.Types.Decimal128
  },
});

module.exports = mongoose.model('FLoc',FLocSchema);

const mongoose = require('mongoose');

const MLocSchema = new mongoose.Schema({
  username:
  { type:String },
  lat: {
    type:mongoose.Types.Decimal128
  },
  long: {
    type:mongoose.Types.Decimal128
  },
});

module.exports = mongoose.model('MLoc',MLocSchema);

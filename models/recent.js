const mongoose = require('mongoose');

const RecentSchema = new mongoose.Schema({
  username:
  { type:String },
  who:{
    type:String,
  },
  what:{
    type:String,
  }
  qty:{
    type:Number,
  }
  price:{
    type:String,
  }
  contractId:
  {
    type:String,
  }
});

module.exports = mongoose.model('Recent',RecentSchema);

const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  name:{
    type:String
  },
  desc:{
    type:String
  },
  type: {
    type: String,
  },
  qty:{
    type:Number
  },
  cluster{
    type: String,
  },
  img1{
    type: String
  },
  img2{
    type:String
  }
});

module.exports = mongoose.model('Listing',ListingSchema);

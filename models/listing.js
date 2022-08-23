const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  img1:{type:String},
  img2:{type:String},
  name:{type:String},
  desc:{type:String},
  type:{type:String},
  min:{type:mongoose.Types.Decimal128},
  price:{type:mongoose.Types.Decimal128},
  unit:{type:String},
  properties:{type:String},
  phone:{type:Number},
  sadd:{type:String}, 
  scity:{type:String}, 
  sstate:{type:String}
});

module.exports = mongoose.model('Listing',ListingSchema);

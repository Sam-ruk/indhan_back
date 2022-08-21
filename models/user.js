const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:{type:String},
  phone:{type: Number},
  pass:{type:String}, 
  type:{type:String}, 
  comp:{type:String}, 
  num:{type:String},
  addr:{type:String}, 
  city:{type:String},
  pin:{type:Number},
  state:{type:String}
});

module.exports = mongoose.model('User',UserSchema);

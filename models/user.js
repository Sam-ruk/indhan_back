const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  state: {
    type: String,
  },
  aadhar: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  img1:{
    type:String
  },
  img2:{
    type:String
  }
});

module.exports = mongoose.model('User',UserSchema);

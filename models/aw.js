const mongoose = require('mongoose');

const AWSchema = new mongoose.Schema({
  username:{
    type:String
  },
  animal:{
    type:String
  },
  schedule:{
    type:String
  }
});

module.exports = mongoose.model('AW',AWSchema);

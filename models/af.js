const mongoose = require('mongoose');

const AHSchema = new mongoose.Schema({
  username:{
    type:String
  },
  type:{
    type:String
  },
  schedule:{
    type:String
  }
});

module.exports = mongoose.model('AH',AHSchema);

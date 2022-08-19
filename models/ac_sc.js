const mongoose = require('mongoose');

const AC_SCSchema = new mongoose.Schema({
  username:{
    type:String
  },
  climate:{
    type:String
  },
  fschedule:{
    type:String
  },
  iSchedule:{
    type:String
  },
  pSchedule:{
    type:String
  },
  seeds:{
    type:String
  },
  sun:{
    type:Number
  },
  soil:{
    type:String
  },
});

module.exports = mongoose.model('AC_SC',AC_SCSchema);

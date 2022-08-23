const mongoose = require('mongoose');

const NotifSchema = new mongoose.Schema({
  sender:{type:Number},
  senderType:{type:String},
  receiver:{type:Number},
  msg:{type:String},
  read:{type:Boolean}
});

module.exports = mongoose.model('Notif',NotifSchema);
const express = require('express');
const userModel = require('../models/user.js');
const CLocModel = require('../models/cloc.js');
const MLocModel = require('../models/mloc.js');
const WLocModel = require('../models/wloc.js');
const DLocModel = require('../models/dloc.js');
const FLocModel = require('../models/floc.js');
const spawn = require('child_process').spawn;
const app = express();

app.get('/loc', async (req, res) => {
  var dataToSend = '';
  const ls = spawn('python', ['predict.py',req.query.points, req.query.num]);
  ls.stdout.on('data', (data) => {
  dataToSend = data.toString();
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(dataToSend);
  });
});

app.get('/users/:id', async (req, res) => {
    const users = await userModel.countDocuments({_id: userID}, 
                                                  function (err, count){ 
    if(count>0){
        res.send("User Already Exists");
    }
  }); 
});

app.post('/users', async (req, res) => {
      const user = new userModel(req.body);
      try{
        await user.save();
        res.send(user);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/flocs', async (req, res) => {
      const floc = new FLocModel(req.body);
      try{
        await floc.save();
        res.send(floc);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/clocs', async (req, res) => {
      const cloc = new CLocModel(req.body);
      try{
        await cloc.save();
        res.send(cloc);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/ilocs', async (req, res) => {
      const iloc = new ILocModel(req.body);
      try{
        await iloc.save();
        res.send(iloc);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/dlocs', async (req, res) => {
      const dloc = new DLocModel(req.body);
      try{
        await dloc.save();
        res.send(dloc);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/mlocs', async (req, res) => {
      const nloc = new MLocModel(req.body);
      try{
        await mloc.save();
        res.send(mloc);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/listings', async (req, res) => {
      const listing = new ListingModel(req.body);
      try{
        await listing.save();
        res.send(listing);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/afs', async (req, res) => {
      const af = new AFModel(req.body);
      try{
        await af.save();
        res.send(af);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/aws', async (req, res) => {
      const aw = new AWModel(req.body);
      try{
        await aw.save();
        res.send(aw);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/ac_scs', async (req, res) => {
      const acsc = new AS_SCModel(req.body);
      try{
        await acsc.save();
        res.send(acsc);
      }
      catch(err) {
        res.send(err);
      }
  });

app.post('/wlocs', async (req, res) => {
      const wloc = new WLocModel(req.body);
      try{
        await wloc.save();
        res.send(wloc);
      }
      catch(err) {
        res.send(err);
      }
  });

app.get('/users', async (req, res) => {
    const users = await userModel.find({});
    try{ 
      res.send(users);}
      catch(e){
        console.log(e);
      }
    });

app.patch("/users/:id", async (req, res) => {
    await userModel.findOneAndUpdate({_id: req.params.id}, 
          {$set:{'name': req.body.name}}, 
          {new: true, useFindAndModify: false}, 
          (err, doc) => {
    if (err) {
        console.log(err);
    }
    res.send(doc);
});
});

app.delete("/users/:id", async (req, res) => {
  await userModel.findOneAndDelete({_id: req.params.id},
          (err, doc) => {
    if (err) {
        console.log(err);
    }
    res.send(doc);
  });
});

module.exports = app;
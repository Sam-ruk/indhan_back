const express = require('express');
const userModel = require('../models/user.js');
const listingModel = require('../models/listing.js');
const spawn = require('child_process').spawn;
const app = express();

//User Routes
app.post('/users', async (req, res) => {
      const user = new userModel(req.body);
      try{
        await user.save();
        res.send(JSON.stringify({"status":true}));
      }
      catch(err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
      }
  });

app.get('/users/:phone', async (req, res) => {
    const users = await userModel.countDocuments({phone: req.params.phone}, 
    function (err, count){
    if(count>0)
      res.send(JSON.stringify({"status":false}));
    else
      res.send(JSON.stringify({"status":true}));
  }); 
});

app.get('/users/:phone/:pass', async (req, res) => {
    const users = await userModel.countDocuments({phone: req.params.phone,pass: req.params.pass}, 
    function (err, count){
    if(count>0)
      res.send(JSON.stringify({"status":true}));
    else
      res.send(JSON.stringify({"status":false}));
  }); 
});

app.patch("/users/:phone", async (req, res) => {
    await userModel.findOneAndUpdate({phone: req.params.phone}, 
          {$set:req.body}, 
          {new: true, useFindAndModify: false}, 
          (err, doc) => {
    if (err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
    }
    else
      res.send(JSON.stringify({"status":true}));
});
});

app.delete("/users/:phone", async (req, res) => {
  await userModel.findOneAndDelete({phone: req.params.phone},
          (err, doc) => {
    if (err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
    }
    else
      res.send(JSON.stringify({"status":true}));
  });
});

//Seller Routes
app.post('/listings', async (req, res) => {
      const user = new listingModel(req.body);
      try{
        await user.save();
        res.send(JSON.stringify({"status":true}));
      }
      catch(err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
      }
  });

app.get('/listings/:phone', async (req, res) => {
    const users = await listingModel.find({phone:req.params.phone},
      function (err, docs) {
        if(err)
          res.send(JSON.stringify({"status":false}));
        else
          res.send(docs);
      });
});

app.patch("/listings/:id", async (req, res) => {
    await listingModel.findOneAndUpdate({_id: req.params.id}, 
          {$set:req.body}, 
          {new: true, useFindAndModify: false}, 
          (err, doc) => {
    if (err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
    }
    else
      res.send(JSON.stringify({"status":true}));
});
});

app.delete("/listings/:id", async (req, res) => {
    await listingModel.findOneAndDelete({_id: req.params.id}, 
          (err, doc) => {
    if (err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
    }
    else
      res.send(JSON.stringify({"status":true}));
});
});

//Display For Buyer
app.get('/listings', async (req, res) => {
    const users = await listingModel.find({},
      function (err, docs) {
        if(err)
          res.send(JSON.stringify({"status":false}));
        else
          res.send(docs);
      });
});


//Buyer Routes
//Logistics Routes
module.exports = app;

// app.get('/loc', async (req, res) => {
//   var dataToSend = '';
//   const ls = spawn('python', ['predict.py',req.query.points, req.query.num]);
//   ls.stdout.on('data', (data) => {
//   dataToSend = data.toString();
//   });

//   ls.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
//   });

//   ls.on('close', (code) => {
//     console.log(`Child process exited with code ${code}`);
//     res.send(dataToSend);
//   });
// });
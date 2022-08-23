const express = require('express');
const userModel = require('../models/user.js');
const orderModel = require('../models/order.js');
const listingModel = require('../models/listing.js');
const logisticModel = require('../models/logistic.js');
const notifModel = require('../models/notif.js');
// const spawn = require('child_process').spawn;
const app = express();

//Post New User
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

//Current User Details
app.get('/users/get/:phone', async (req, res) => {
    await userModel.find({phone:req.params.phone},
      function (err, docs) {
        if(err)
          res.send(JSON.stringify({"status":false}));
        else
          res.send(docs);
      });
});

//User Exists or not
app.get('/users/:phone', async (req, res) => {
    const users = await userModel.countDocuments({phone: req.params.phone}, 
    function (err, count){
    if(count>0)
      res.send(JSON.stringify({"status":false}));
    else
      res.send(JSON.stringify({"status":true}));
  }); 
});

//Check Login Credentials
app.get('/users/:phone/:pass', async (req, res) => {
    const users = await userModel.countDocuments({phone: req.params.phone,pass: req.params.pass}, 
    function (err, count){
    if(count>0)
      res.send(JSON.stringify({"status":true}));
    else
      res.send(JSON.stringify({"status":false}));
  }); 
});

//Update User Details
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

//Delete User
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

//Post New Listing
app.post('/listings', async (req, res) => {
      const listing = new listingModel(req.body);
      try{
        await listing.save();
        res.send(JSON.stringify({"status":true}));
      }
      catch(err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
      }
  });

//Get Current User's Listings
app.get('/listings/:phone', async (req, res) => {
    await listingModel.find({phone:req.params.phone},
      function (err, docs) {
        if(err)
          res.send(JSON.stringify({"status":false}));
        else
          res.send(docs);
      });
});

//Update A Listing
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

//Delete a Listing Item
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

//Search Filters For Buyers
app.get('/filter/:type/:search/:price/:min/:loc', async (req, res) => {
    var query1 = {
    };

    if (req.params.type!=="-") {
        query1.type = new RegExp(req.params.type, "i");
    }
    if (req.params.search!=="-") {
        query1.name = new RegExp(req.params.search, "i");
    }
    var query2={},query3={},query4={};

    if (req.params.loc!=="-") {
        query2.sadd = new RegExp(req.params.loc, "i");
        query3.scity = new RegExp(req.params.loc, "i");
        query4.sstate = new RegExp(req.params.loc, "i");
    }
    await listingModel.find({
      $and:[
      query1,
      {$or: [query2,query3,query4]},
      ]
    })
    .sort([['price', req.params.price==="L"?1:-1], ['min', req.params.price==="L"?1:-1]])
    .exec(function(err, docs) {res.send(docs);});
});

//Display Supply Map - Landing
app.get('/supply', async (req, res) => {
  var dict={};
  await userModel.countDocuments({type:"Man",state:"AP"}, function (err, count){dict["AP"]=count;});await userModel.countDocuments({type:"Man",state:"AD"}, function (err, count){dict["AD"]=count;});await userModel.countDocuments({type:"Man",state:"AN"}, function (err, count){dict["AN"]=count;});await userModel.countDocuments({type:"Man",state:"AS"}, function (err, count){dict["AS"]=count;});await userModel.countDocuments({type:"Man",state:"BH"}, function (err, count){dict["BH"]=count;});await userModel.countDocuments({type:"Man",state:"CH"}, function (err, count){dict["CH"]=count;});await userModel.countDocuments({type:"Man",state:"CG"}, function (err, count){dict["CG"]=count;});await userModel.countDocuments({type:"Man",state:"DN"}, function (err, count){dict["DN"]=count;});await userModel.countDocuments({type:"Man",state:"DD"}, function (err, count){dict["DD"]=count;});await userModel.countDocuments({type:"Man",state:"DE"}, function (err, count){dict["DE"]=count;});await userModel.countDocuments({type:"Man",state:"LD"}, function (err, count){dict["LD"]=count;});await userModel.countDocuments({type:"Man",state:"PU"}, function (err, count){dict["PU"]=count;});await userModel.countDocuments({type:"Man",state:"GO"}, function (err, count){dict["GO"]=count;});await userModel.countDocuments({type:"Man",state:"GJ"}, function (err, count){dict["GJ"]=count;});await userModel.countDocuments({type:"Man",state:"HY"}, function (err, count){dict["HY"]=count;});await userModel.countDocuments({type:"Man",state:"HP"}, function (err, count){dict["HP"]=count;});await userModel.countDocuments({type:"Man",state:"JK"}, function (err, count){dict["JK"]=count;});await userModel.countDocuments({type:"Man",state:"JH"}, function (err, count){dict["JH"]=count;});await userModel.countDocuments({type:"Man",state:"KR"}, function (err, count){dict["KR"]=count;});await userModel.countDocuments({type:"Man",state:"KE"}, function (err, count){dict["KE"]=count;});await userModel.countDocuments({type:"Man",state:"MP"}, function (err, count){dict["MP"]=count;});await userModel.countDocuments({type:"Man",state:"MH"}, function (err, count){dict["MH"]=count;});await userModel.countDocuments({type:"Man",state:"MN"}, function (err, count){dict["MN"]=count;});await userModel.countDocuments({type:"Man",state:"MG"}, function (err, count){dict["MG"]=count;});await userModel.countDocuments({type:"Man",state:"MZ"}, function (err, count){dict["MZ"]=count;});await userModel.countDocuments({type:"Man",state:"NG"}, function (err, count){dict["NG"]=count;});await userModel.countDocuments({type:"Man",state:"OD"}, function (err, count){dict["OD"]=count;});await userModel.countDocuments({type:"Man",state:"PJ"}, function (err, count){dict["PJ"]=count;});await userModel.countDocuments({type:"Man",state:"RJ"}, function (err, count){dict["RJ"]=count;});await userModel.countDocuments({type:"Man",state:"SK"}, function (err, count){dict["SK"]=count;});await userModel.countDocuments({type:"Man",state:"TN"}, function (err, count){dict["TN"]=count;});await userModel.countDocuments({type:"Man",state:"TG"}, function (err, count){dict["TG"]=count;});await userModel.countDocuments({type:"Man",state:"TP"}, function (err, count){dict["TP"]=count;});await userModel.countDocuments({type:"Man",state:"UP"}, function (err, count){dict["UP"]=count;});await userModel.countDocuments({type:"Man",state:"UK"}, function (err, count){dict["UK"]=count;});await userModel.countDocuments({type:"Man",state:"WB"}, function (err, count){dict["WB"]=count;});
  res.send(JSON.stringify(dict));
});

//Display Demand Map - Landing
app.get('/demand', async (req, res) => {
  var dict={};
  await userModel.countDocuments({type:"Con",state:"AP"}, function (err, count){dict["AP"]=count;});await userModel.countDocuments({type:"Con",state:"AD"}, function (err, count){dict["AD"]=count;});await userModel.countDocuments({type:"Con",state:"AN"}, function (err, count){dict["AN"]=count;});await userModel.countDocuments({type:"Con",state:"AS"}, function (err, count){dict["AS"]=count;});await userModel.countDocuments({type:"Con",state:"BH"}, function (err, count){dict["BH"]=count;});await userModel.countDocuments({type:"Con",state:"CH"}, function (err, count){dict["CH"]=count;});await userModel.countDocuments({type:"Con",state:"CG"}, function (err, count){dict["CG"]=count;});await userModel.countDocuments({type:"Con",state:"DN"}, function (err, count){dict["DN"]=count;});await userModel.countDocuments({type:"Con",state:"DD"}, function (err, count){dict["DD"]=count;});await userModel.countDocuments({type:"Con",state:"DE"}, function (err, count){dict["DE"]=count;});await userModel.countDocuments({type:"Con",state:"LD"}, function (err, count){dict["LD"]=count;});await userModel.countDocuments({type:"Con",state:"PU"}, function (err, count){dict["PU"]=count;});await userModel.countDocuments({type:"Con",state:"GO"}, function (err, count){dict["GO"]=count;});await userModel.countDocuments({type:"Con",state:"GJ"}, function (err, count){dict["GJ"]=count;});await userModel.countDocuments({type:"Con",state:"HY"}, function (err, count){dict["HY"]=count;});await userModel.countDocuments({type:"Con",state:"HP"}, function (err, count){dict["HP"]=count;});await userModel.countDocuments({type:"Con",state:"JK"}, function (err, count){dict["JK"]=count;});await userModel.countDocuments({type:"Con",state:"JH"}, function (err, count){dict["JH"]=count;});await userModel.countDocuments({type:"Con",state:"KR"}, function (err, count){dict["KR"]=count;});await userModel.countDocuments({type:"Con",state:"KE"}, function (err, count){dict["KE"]=count;});await userModel.countDocuments({type:"Con",state:"MP"}, function (err, count){dict["MP"]=count;});await userModel.countDocuments({type:"Con",state:"MH"}, function (err, count){dict["MH"]=count;});await userModel.countDocuments({type:"Con",state:"MN"}, function (err, count){dict["MN"]=count;});await userModel.countDocuments({type:"Con",state:"MG"}, function (err, count){dict["MG"]=count;});await userModel.countDocuments({type:"Con",state:"MZ"}, function (err, count){dict["MZ"]=count;});await userModel.countDocuments({type:"Con",state:"NG"}, function (err, count){dict["NG"]=count;});await userModel.countDocuments({type:"Con",state:"OD"}, function (err, count){dict["OD"]=count;});await userModel.countDocuments({type:"Con",state:"PJ"}, function (err, count){dict["PJ"]=count;});await userModel.countDocuments({type:"Con",state:"RJ"}, function (err, count){dict["RJ"]=count;});await userModel.countDocuments({type:"Con",state:"SK"}, function (err, count){dict["SK"]=count;});await userModel.countDocuments({type:"Con",state:"TN"}, function (err, count){dict["TN"]=count;});await userModel.countDocuments({type:"Con",state:"TG"}, function (err, count){dict["TG"]=count;});await userModel.countDocuments({type:"Con",state:"TP"}, function (err, count){dict["TP"]=count;});await userModel.countDocuments({type:"Con",state:"UP"}, function (err, count){dict["UP"]=count;});await userModel.countDocuments({type:"Con",state:"UK"}, function (err, count){dict["UK"]=count;});await userModel.countDocuments({type:"Con",state:"WB"}, function (err, count){dict["WB"]=count;});res.send(JSON.stringify(dict));
});

//Display Buyers Stats - Landing
app.get('/buyers', async (req, res) => {
  await userModel.countDocuments({type:"Con"}, 
    function (err, count){
      res.send(JSON.stringify({"count":count}));
    });
});

//Display Sellers Stats - Landing
app.get('/sellers', async (req, res) => {
  await userModel.countDocuments({type:"Man"}, 
    function (err, count){
      res.send(JSON.stringify({"count":count}));
    });
});

//Get Pending Orders for Seller
app.get('/orders/sell/:phone', async (req, res) => {
  await orderModel.find({"seller":req.params.phone,"status":false})
  .sort("_id").exec(function(err, docs) {res.send(docs);});
});

//Get Pending Orders for Buyer
app.get('/orders/buy/:phone', async (req, res) => {
  await orderModel.find({"buyer":req.params.phone,"status":false})
  .sort("_id").exec(function(err, docs) {res.send(docs);});
});

//Get Pending Orders for Logistics
app.get('/orders/log/:phone', async (req, res) => {
  await orderModel.find({"logistics":req.params.phone,"status":false})
  .sort("_id").exec(function(err, docs) {res.send(docs);});
});

//Get Recent i.e. Executed Orders for Seller
app.get('/orders/rsell/:phone', async (req, res) => {
  await orderModel.find({"seller":req.params.phone,"status":true})
  .sort("_id").exec(function(err, docs) {res.send(docs);});
});

//Get Recent i.e. Executed Orders for Buyer
app.get('/orders/rbuy/:phone', async (req, res) => {
  await orderModel.find({"buyer":req.params.phone,"status":true})
  .sort("_id").exec(function(err, docs) {res.send(docs);});
});

//Get Recent i.e. Executed Orders for Logistics
app.get('/orders/rlog/:phone', async (req, res) => {
  await orderModel.find({"logistics":req.params.phone,"status":true})
  .sort("_id").exec(function(err, docs) {res.send(docs);});
});

//Post Order
app.post('/orders', async (req, res) => {
      const order = new orderModel(req.body);
      try{
        await order.save();
        res.send(JSON.stringify({"status":true}));
      }
      catch(err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
      }
  });

//Update Order Status
app.patch("/orders/:id", async (req, res) => {
    await orderModel.findOneAndUpdate({_id: req.params.id}, 
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

//Delete Order
app.delete("/orders/:id", async (req, res) => {
  await orderModel.findOneAndDelete({_id: req.params.id},
          (err, doc) => {
    if (err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
    }
    else
      res.send(JSON.stringify({"status":true}));
  });
});

//Display Ethanol Stats
app.get('/ethanol', async (req, res) => {
  var i = 0;
  await orderModel.find({otype:"Bio-Ethanol"}, 
    function (err, docs){
      for(var j=0;i<docs.length;j++)
        i+=docs[j].qty;
      res.send(JSON.stringify({"count":i}));
    });
});

//Display Diesel Stats
app.get('/diesel', async (req, res) => {
  var i = 0;
  await orderModel.find({otype:"Bio-Diesel"}, 
    function (err, docs){
      for(var j=0;i<docs.length;j++)
        i+=docs[j].qty;
      res.send(JSON.stringify({"count":i}));    
    });
});

//Display CNG Stats
app.get('/cng', async (req, res) => {
  var i = 0;
  await orderModel.find({otype:"Bio-CNG"}, 
    function (err, docs){
      for(var j=0;i<docs.length;j++)
        i+=docs[j].qty;
      res.send(JSON.stringify({"count":i}));
    });
});

//Post New Logistics Details
app.post('/logistics', async (req, res) => {
      const logistic = new logisticModel(req.body);
      try{
        await logistic.save();
        res.send(JSON.stringify({"status":true}));
      }
      catch(err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
      }
  });

//Get Logistics Details for Seller/Buyer
app.get('/logistics/:phone', async (req, res) => {
    await logisticModel.find({phone:req.params.phone},
      function (err, docs) {
        if(err)
          res.send(JSON.stringify({"status":false}));
        else
          res.send(docs);
      });
});

//Update Logistics Details
app.patch("/logistics/:id", async (req, res) => {
    await logisticModel.findOneAndUpdate({_id: req.params.id}, 
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

//Delete Logistics
app.delete("/logistics/:id", async (req, res) => {
  await logisticModel.findOneAndDelete({_id: req.params.id},
          (err, doc) => {
    if (err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
    }
    else
      res.send(JSON.stringify({"status":true}));
  });
});

//Get Notifs for any User
app.get('/notifs/:phone', async (req, res) => {
    await notifModel.find({receiver:req.params.phone},   
          function (err, docs) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify({"status":false}));
        }
        else
          res.send(JSON.stringify(docs));
      });
});

//Read Notifs for any User
app.patch("/notifs/:phone", async (req, res) => {
    await notifModel.updateMany({receiver: req.params.phone}, 
          {$set:{read:true}},function (err, docs) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify({"status":false}));
        }
        else
          res.send(JSON.stringify(docs));
      });
});

//Post Notifs for any User
app.post('/notifs', async (req, res) => {
      const notif = new notifModel(req.body);
      try{
        await notif.save();
        res.send(JSON.stringify({"status":true}));
      }
      catch(err) {
        console.log(err);
        res.send(JSON.stringify({"status":false}));
      }
  });

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
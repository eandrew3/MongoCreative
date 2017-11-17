var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/itemDB', { useMongoClient: true }); //Connects to a mongo database called "commentDB"

var itemSchema = mongoose.Schema({ //Defines the Schema for this database
Name: String,
Item: String,
Due: String
});

var Item = mongoose.model('Item', itemSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');
});


/* GET comments from database */
router.get('/item', function(req, res, next) {
console.log("In the GET route?");
Item.find(function(err,itemList) { //Calls the find() method on your database
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(itemList); //Otherwise console log the comments you found
    res.json(itemList); 
    
  }
})
});

router.post('/item', function(req, res, next) {
  console.log("POST item route");
  console.log(req.body);
  var newitem = new Item(req.body); //[3]
console.log(newitem); //[3]
newitem.save(function(err, post) { //[4]
  if (err) return console.error(err);
  console.log(post);
  res.sendStatus(200);
});
});

router.delete('/item', function(req, res, next) {
  console.log("delete in routes called");
  Item.remove(function(err) {
    if (err) return console.error(err);
    else {
      console.log("removeed");
      res.sendStatus(200);
    }
  });
});

router.delete('/one', function(req, res, next) {
  console.log("got in delete one");
  Item.findByIdAndRemove(req.params.id, function(err) {
    if (err) return console.error(err);
    else {
      console.log("removed uno");
      res.sendStatus(200);
      }
   });
});

module.exports = router;

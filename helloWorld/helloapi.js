var express = require('express');
var app = express();

//API ENDPOINT FOR HTTP (GET)- CALLS
app.get('/', function (req, res) {
  //WHEN REQUEST CONTAINS A "NAME"

  if(req.query.name){
      res.send(`Hello ${req.query.name}!`);
  }else{
    res.send('Hello World!');
  }
});

//SERVER LISTENS ON PORT 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

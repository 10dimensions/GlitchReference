
var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// --> 7)  Mount the Logger middleware here
 app.use(express.static(__dirname + "/public"));

// --> 11)  Mount the body-parser middleware  here
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json())

/** 1) Meet the node console. */
console.log("Hello World");


/** 2) A first working Express Server */


/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.get('/rootlog',
  (req, res, next) => {
    var _method = req.method;
    var _path = req.path;
    var _ip = req.ip;
    console.log(_method + " " + _path + " - " + _ip);
    res.send(_method + " " + _path + " - " + _ip);
    next();
}
);


/** 3) Serve an HTML file */
app.get('/', function (req, res) {
  var path = __dirname + '/views/index.html';
  res.sendFile(path);
})



/** 4) Serve static assets  */
app.get('/getweb', function (req, res) {
  var path = __dirname + '/views/index.html';
  res.sendFile(path);
})

/** 5) serve JSON on a specific route */
app.get('/json-b',function(req,res){
  var jobj = {"message": "hello json"};  
  res.json(jobj);
});

/** 6) Use the .env file to configure the app */
 app.get('/json',function(req,res){
   
  var jobj = {"message": "Hello json"};
   
  if(process.env.MESSAGE_STYLE==='uppercase'){
    jobj.message = jobj.message.toUpperCase();
  }
  
  res.json(jobj);
});
 

/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next) => {
    req.time= new Date().toString();
    next();
},
        (req, res, next) => {
    res.json({"time": req.time});
} );

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", function(req, res) {
  console.log(req.params);
  res.json({"echo":req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res)=>{
  res.json({"name": req.query.first + " " + req.query.last});
  
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post('/name', (req, res)=>{
  res.json({"name": req.body.first + " " + req.body.last});
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

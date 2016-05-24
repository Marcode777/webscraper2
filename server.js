var express = require("express");
var app = express();
var PORT = 7000;
var expressHandlebars = require("express-handlebars");
var cheerio = require("cheerio");
var request = require("request");
var bodyParser = require("body-parser");

app.use(express.static(__dirname+ "/assets")); //is saying all the static files you're serving is in the assets folder so main.handlebars just automatics knows to look in the assets folder

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//2nd start of jeffshapiro's suggestions
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));
//to support url encoded bodies
// app.use(bodyParser.text({ inflated:true})); //this is my own injection
//finish of 2nd start of jeffshapiro's suggestions

// app.get("/", function (req, res){
//   res.render("home");
// });

// app.get("/data", function (req, res){
//   var dataToSendToClient = [];
//   request("http://bloomberg.com", function(error, response, body){
//     if(!error && response.statusCode == 200){
//       $ = cheerio.load(body);
//       $("h1").each(function(i, elem){
//         dataToSendToClient.push($(this).text());
//       })
//       res.send({data: dataToSendToClient});
//     };
//   })
// })

// begin albert's suggestions
app.post("/data", function(req, res){
  // console.log(req.body.url)
  //made this requested data into a variable to place 
  var address = '';
  var dataToSendToClient = [];
  // console.log(address);
  address += req.body.url;
  request(address, function(error, response, body){
    // console.log('it works');
    if(!error && response.statusCode == 200){
      $ = cheerio.load(body);
      // div can be changed and should become a variable that comes from the user input from the webpage just like how the url address is input by the user
      $("div").each(function(i, elem){
        dataToSendToClient.push($(this).text());
        console.log(elem);
      })
    console.log(body);
      var data = {
        datas: dataToSendToClient
      }
      res.render("home", data);
      console.log(data);
    }
  })
});
// //finish of albert's suggestions

//begin jeffshapiro's suggestions
// app.post("/data", function(req, res){
//   console.log(req.body.htmlTag)
//   var dataToSendToClient = [];
//   request("http://bloomberg.com", function(error, response, body){
//     if(!error && response.StatusCode == 200){
//       $ = cheerio.load(body);
//       //h1 becomes a variable with a value that comes from the web page
//       $(req.body.htmlTag).each(function(i, elem){
//         dataToSendToClient.push($(this).text());
//       })
//       var data = {
//         datas: dataToSendToClient
//       }
//       console.log(data);
//     }
//   })
// })

//changed to app.get from app.post via albert's suggestion
app.get("/", function (req, res){
  var dataToSendToClient = [];
  request("http://bloomberg.com", function(error, response, body){
    if(!error && response.statusCode == 200){
      $ = cheerio.load(body);
      //h1 become a variable that comes from the user input from the webpage, and yes, it does work!
      $("div").each(function(i, elem){
        dataToSendToClient.push($(this).text());
      })
      var data = {
        datas: dataToSendToClient
      }
      res.render("home", data);
      console.log(data);
    };
  })
})

//will be using this to get the element data from user on second form
// app.get("/", function (req, res){
//   var elements = [];
//   request("http://bloomberg.com", function(error, response, body){
//     if(!error && response.statusCode == 200){
//       $ = cheerio.load(body);
//       //h1 become a variable that comes from the user input from the webpage
//       var input = $("string").each(function(i, elem){
//         elements.push($(this).text());
//       })
//       var data = {
//         datas: elements
//       }
//       res.render("home", data);
//       console.log(data);
//     };
//   })
// })




//Connect to PORT
console.log("this works");
app.listen(PORT, function(){
  console.log("listening on PORT" + PORT)
});
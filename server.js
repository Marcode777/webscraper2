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



app.use(bodyParser.urlencoded({ extended: true}));
//to support url encoded bodies
app.use(bodyParser.json());
//to support JSON bodies



// changed to app.get from app.post via albert's suggestion
app.get("/", function (req, res){
  var dataToSendToClient = [];
  request("http://bloomberg.com", function(error, response, body){
    if(!error && response.statusCode == 200){
      $ = cheerio.load(body);
      //h1 becomes a variable that comes from the user input from the webpage, and yes, it does work!
      //also whatever is inside the parentheses also has to be in between quotations
      $("h1").each(function(i, elem){
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

// begin albert's suggestions
app.post("/data", function(req, res){
  // console.log(req.body.url)
  //made this requested data into a variable to place 
  var address = '';
  var element = '';
  var dataToSendToClient = [];
  // console.log(address);
  address += req.body.url;
  element += req.body.elementz;
  request(address, function(error, response, body){
    // console.log('it works');
    if(!error && response.statusCode == 200){
      $ = cheerio.load(body);
      // h1 can be changed and should become a variable that comes from the user input from the webpage just like how the url address is input by the user
      // remember, that it has to be in quotation marks
      $(element).each(function(i, elem){
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
//finish of albert's suggestions

//this will be used for the second form
//this route was changed to dataTransform by Nate
// ***remember there can only be 1 post route, and express will only check the first one***

// app.post("/data", function(req, res){
//   // console.log(req.body.url)
//   //made this requested data into a variable to place 
//   var element = '';
//   var dataToSendToClient = [];
//   // console.log(address);
//   element += req.body.elementz;
//   request(element, function(error, response, body){
//     // console.log('it works');
//     if(!error && response.statusCode == 200){
//       $ = cheerio.load(body);
//       // element is a variable that comes from the user input from the webpage just like how the url address is input by the user
//       //substitute what is in between the parentheses as element div from the user input that the user wants
//       $("h2").each(function(i, elem){
//         dataToSendToClient.push($(this).text());
//         console.log(elem);
//       })
//     console.log(body);
//       var nice = {
//         datas: dataToSendToClient
//       }
//       res.render("home", nice);
//       console.log(nice);
//     }
//   })
// });


//Connect to PORT
console.log("this works");
app.listen(PORT, function(){
  console.log("listening on PORT" + PORT)
});
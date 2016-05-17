var express = require("express");
var app = express();
var PORT = 7000;
var expressHandlebars = require("express-handlebars");
var cheerio = require("cheerio");
var request = require("request");
var bodyParser = require("body-parser")

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.get("/", function (req, res){
  res.render("home");
});

app.post("/data", function (req, res){
  var dataToSendToClient = [];
  request("http://bloomberg.com", function(error, response, body){
    if(!error && response.statusCode == 200){
      $ = cheerio.load(body);
      $("h1").each(function(i, elem){
        dataToSendToClient.push($(this).text());
      })
      res.send({data: dataToSendToClient});
    };
  })
})

//Connect to PORT
console.log("this works");
app.listen(PORT, function(){
  console.log("listening on PORT" + PORT)
});
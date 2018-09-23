const express = require("express");
const mongojs = require("mongojs");
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const app = express();
const post_controller = require("./controller/posts_controller")
const PORT = process.env.PORT || 8080;



app.use(express.static("public"))

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(post_controller)




app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});






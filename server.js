// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const routes = require('./controllers/burgersController.js');
const nodemon = require('nodemon');
// Sets up express App
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/public"));
// Sets up delete method
app.use(methodOverride("_method"));
// Sets up express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

app.listen(PORT, function() {
	console.log("Listening on port: " + PORT);
});
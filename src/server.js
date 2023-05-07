//Initialization
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

//Database
require("./database");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static('public'));
app.use(express.json());

//Routes
app.use(require('./routes/index.routes'));

module.exports = app;

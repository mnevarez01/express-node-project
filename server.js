var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();

app.use(express.static("html"));


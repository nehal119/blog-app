const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expessSanitizer = require("express-sanitizer");
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/blog_app";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expessSanitizer());
app.use(methodOverride("_method"));

const blogRouter = require('./routes/routes');
app.use(blogRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



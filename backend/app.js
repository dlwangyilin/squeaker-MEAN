require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts");

const app = express();
mongoose.set("debug", true);
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.aceuo.mongodb.net/post?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected to Mongo Atlas");
    })
    .catch(() => {
        console.log("Connection failed");
    });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/posts", postsRoutes);
module.exports = app;

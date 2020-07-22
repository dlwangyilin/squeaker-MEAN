require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

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

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
        .then((result) => {
            res.status(201).json({
                message: "post added successfully",
                postId: result._id
            });
        })
        .catch(() => {
            console.log("save fails");
        });
});

app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then((documents) => {
            res.status(200).json({
                messages: 'Posts fetched successfully',
                posts: documents
            });
        });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: `Post ${req.params.id} is deleted!`
            });
        });

})
module.exports = app;

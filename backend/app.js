const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: "post added successfully"
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 'fasdae',
            title: 'Dummy code',
            content: 'afsasc'
        },
        {
            id: 'adsasd',
            title: 'Dummqweqw2qy code',
            content: 'gasc'
        }
    ];
    res.status(200).json({
        messages: 'Posts fetched successfully',
        posts: posts
    });
})
module.exports = app;

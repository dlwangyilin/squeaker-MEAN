const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
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

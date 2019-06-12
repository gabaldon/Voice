const express = require('express')
const router = express.Router()

const Post = require('../models/post-model')

router.post('/post', (req, res) => {
    // const newPost = {
    //     type: req.body.type,
    //     features: req.body.features
    // }
    // console.log(req.body)

    console.log(req.body)
    Post.create(req.body)
        .then(data => res.json(data))
       .catch(err => console.log('Error:', err))
})

router.get('/getAllPosts', (req, res) => {
    Post.find()
        .then(data => res.json(data))
        .catch(err => console.log('Error:', err))
})

module.exports = router


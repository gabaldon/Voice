const express = require('express');
const router = express.Router();


const uploader = require('../configs/cloudinary.config');



router.post('/upload', (req, res, next) => {

    console.log(req.body)
    // uploader.single()

    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    console.log(req.file.secure_url)
    res.json({ secure_url: req.file.secure_url });
})

module.exports = router;
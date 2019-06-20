const express = require('express');
const cloudinary = require('cloudinary');
const router = express.Router();
const uploader = require('../configs/cloudinary.config');
router.post('/upload', uploader.single("blob"), async (req, res, next) => {
    console.log(req.file)

    let r = await cloudinary.v2.uploader.upload(req.file.path,{resource_type:"raw"}).catch(e => console.log(e));
    console.log(r);

    res.json(r);
})

module.exports = router;
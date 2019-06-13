const multer = require('multer');

const uploader = multer({ dest:"uploads" });
module.exports = uploader;
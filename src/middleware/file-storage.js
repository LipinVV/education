const multer = require('multer');
const { v4: uuid } = require('uuid');
const { dictionary } = require('../../constants');
const { uploadDirectory } = dictionary;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename(req, file, cb) {
        cb(null, `${uuid()}-${file.originalname}`);
    }
});

module.exports = multer({ storage });

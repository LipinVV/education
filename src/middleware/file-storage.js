const multer = require('multer');
const fs = require("fs");
const { v4: uuid } = require('uuid');

const uploadDirectory = 'uploads';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename(req, file, cb) {
        cb(null, `${uuid()}-${file.originalname}`);
    }
});

module.exports = multer({ storage });

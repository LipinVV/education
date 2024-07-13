const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file-storage');
const fs = require("fs");
const { dictionary, urlRoutes } = require('../../constants');
const { uploadDirectory } = dictionary;
const { allBooksRoute } = urlRoutes;

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

router.post(allBooksRoute,
    fileMulter.single('book'),
    (req, res) => {
        if(req.file){
            const { path } = req.file;
            res.json({ path });
        }
        res.json();
    })

module.exports = router;

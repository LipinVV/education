const express = require('express');
const router = express.Router();
const path = require("path");
const {urlRoutes} = require("../../constants");
const { downloadBookRoute } = urlRoutes;

router.get(downloadBookRoute, function (req, res) {
    const fileStoragePath = '../../../upload';
    const filePath = path.join(__dirname + fileStoragePath);
    const file = filePath + '/' + req.params.id;
    res.download(file);
});

module.exports = router;

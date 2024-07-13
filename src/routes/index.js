const express = require('express');
const router = express.Router();

// назначение пока не определено
router.get('/', (req, res) => {
    const { url } = req;
    res.json({ url });
})

module.exports = router;

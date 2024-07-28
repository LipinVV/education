const express = require('express');
const { incrementCounter, getCounter } = require('./counter');
const APP = express();
APP.use(express.json());

APP.post('/counter/:bookId/incr', (req, res) => {
    const { bookId } = req.params;
    const newCount = incrementCounter(bookId);
    res.json({ count: newCount });
});

APP.get('/counter/:bookId', (req, res) => {
    const { bookId } = req.params;
    const count = getCounter(bookId);
    res.json({ count });
});

const PORT = process.env.PORT || 3003;
APP.listen(PORT, () => {
    console.log(`Counter app listening on port ${PORT}`);
});

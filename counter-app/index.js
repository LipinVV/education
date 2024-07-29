const express = require('express');
const { incrementCounter, getCounter } = require('./counter');
const APP = express();
APP.use(express.json());

APP.post('/counter/:bookId/incr', (req, res) => {
    const { bookId } = req.params;
    incrementCounter(bookId).then(response => res.json(response));
});

APP.get('/counter/:bookId', (req, res) => {
    const { bookId } = req.params;
    getCounter(bookId).then(response => res.json(response));
});

const PORT = process.env.PORT || 3003;
APP.listen(PORT, () => {
    console.log(`Counter app listening on port ${PORT}`);
});

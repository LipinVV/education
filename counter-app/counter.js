const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://storage'
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

(async () => {
    await client.connect();
})();

const incrementCounter = async (bookId) => {
    const inc = await client.incr(bookId);
    return { bookId: bookId, inc: inc };
};

const getCounter = async (bookId) => {
    const counter = await client.get(bookId);
    return { bookId: bookId, counter: counter };
};

module.exports = {
    incrementCounter,
    getCounter,
};

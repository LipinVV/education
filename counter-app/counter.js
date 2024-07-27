const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'counter-data.json');

const getCounters = () => {
    if (!fs.existsSync(dataFile)) {
        return {};
    }
    const data = fs.readFileSync(dataFile);
    return JSON.parse(data);
};

const saveCounters = (counters) => {
    fs.writeFileSync(dataFile, JSON.stringify(counters));
};

const incrementCounter = (bookId) => {
    const counters = getCounters();
    if (!counters[bookId]) {
        counters[bookId] = 0;
    }
    counters[bookId]++;
    saveCounters(counters);
    return counters[bookId];
};

const getCounter = (bookId) => {
    const counters = getCounters();
    return counters[bookId] || 0;
};

module.exports = {
    incrementCounter,
    getCounter,
};

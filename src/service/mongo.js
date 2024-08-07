const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/books-store';

const connectDB = async () => {
    try {
        console.log('MongoDB starting to connect');
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;

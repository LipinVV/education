const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('MongoDB starting to connect');
        await mongoose.connect('mongodb://mongo:27017/books-store');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;

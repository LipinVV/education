const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: { type: String, required: true },
    favourite: { type: Boolean, default: false },
    id: { type: String, required: true, unique: true },
    fileCover: { type: String, required: false, unique: true },
    fileName: { type: String, required: false, unique: true },
});

module.exports = mongoose.model('Book', bookSchema);

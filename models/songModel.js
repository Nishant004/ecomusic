const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    duration: { 
        type: Number,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('songs', songSchema);
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    playlists: {
        type: Array,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}
    , { timestamps: true });
module.exports = mongoose.model('User', userSchema);
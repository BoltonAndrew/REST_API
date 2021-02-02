const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = {
    Post
};
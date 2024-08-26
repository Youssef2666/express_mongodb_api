const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});
const Post = mongoose.model('Post', PostSchema)
module.exports = Post
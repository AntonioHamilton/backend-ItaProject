const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: {
        updatedAt: true,
        createdAt: true,
    },
});

module.exports = mongoose.model('Post', PostSchema);
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    likes: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Post", PostSchema)
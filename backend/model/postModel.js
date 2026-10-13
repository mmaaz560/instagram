import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    media: {
        type: String,
        required: false,
    },
    caption: {
        type: String,
        required: false,
    },
    filter: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
})




export const Post = mongoose.model('Post', postSchema)
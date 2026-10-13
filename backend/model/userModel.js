import mongoose from "mongoose";
const userschema = mongoose.Schema({
    m_mail: {
        type: String,
        requried: true,
    },
    password: {
        type: String,
        requried: true,
    },
    name: {
        type: String,
        requried: true,
    },
    b_day: {
        type: Date,
        requried: true,
    },
    username: {
        type: String,
        requride: true,
    },
}, {
    timestamps: true
})

export const User = mongoose.model('User', userschema)
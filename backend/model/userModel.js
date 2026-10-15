import mongoose from "mongoose";
const userschema = mongoose.Schema({
    m_mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    b_day: {
        type: Date,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
})

export const User = mongoose.model('User', userschema)
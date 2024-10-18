import mongoose from "mongoose";

const testimonySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
}, { timestamps: true });


export const Testimony = mongoose.model('Testimony', testimonySchema);
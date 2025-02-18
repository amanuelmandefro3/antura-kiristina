import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    role: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Team = mongoose.model('Team', teamSchema); 
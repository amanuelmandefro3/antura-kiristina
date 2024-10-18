import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
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
    },
    tags: {
        type: [String],  
        required: false
    }
}, { timestamps: true });


blogSchema.index({ title: 'text', content: 'text' });

export const Blog = mongoose.model('Blog', blogSchema);

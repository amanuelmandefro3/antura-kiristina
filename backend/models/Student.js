import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true,
        min: 12,
        max: 18
    },
    phoneNumber: {
        type: String,
        required: false,
        minlength: 10,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    churchName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    },
    familyMemberName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    familyPhoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    q1: {
        type: String,
        required: true,
        maxlength: 1000
    },
    q2: {
        type: String,
        required: true,
        maxlength: 1000
    },
    q3: {
        type: String,
        required: true,
        maxlength: 1000
    },
    q4: {
        type: String,
        required: true,
        maxlength: 1000
    },
    q5: {
        type: String,
        required: true,
        maxlength: 1000
    },
    q6: {
        type: String,
        required: true,
        maxlength: 1000
    },
    q7: {
        type: String,
        required: true,
        maxlength: 1000
    },
    q8: {
        type: String,
        required: true,
        maxlength: 1000
    },
    q9: {
        type: String,
        required: true,
        maxlength: 1000
    }
}, {timestamps: true});

export const Student = mongoose.model('Student', studentSchema);

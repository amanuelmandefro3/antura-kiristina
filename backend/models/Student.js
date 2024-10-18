import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
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
    phoneNum: {
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
    familyMembersName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    familyMembersPhoneNum: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

export const Student = mongoose.model('Student', studentSchema);
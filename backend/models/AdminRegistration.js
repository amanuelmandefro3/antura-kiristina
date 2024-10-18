import mongoose from 'mongoose';

const AdminRegistrationSchema = new mongoose.Schema({
    name: {
        type: String,String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true 
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    churchName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true 
    }
});

export const AdminRegistration = mongoose.model('AdminRegistration', AdminRegistrationSchema);


import mongoose from 'mongoose';

const VolunteerRegistrationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    residentialAddress: {
        type: String,
        required: true
    },
    educationLevel: {
        type: String,
        required: true
    },
    employmentStatus: {
        type: String,
        required: true
    },
    church: {
        type: String,
        required: true
    },
    serviceAreas: {
        type: String,
        enum: ['Social Media', 'Teaching', 'Counseling', 'Mentoring', 'Fundraising', 'Where I am assigned','Event Planning', 'Other'],
        required: true
    },
    socialMedia: {
        type: String
    },
    availabilityFrequency: {
        type: String,
        enum: ['onceAWeek', 'twiceAWeek', 'asNeeded'],
        required: true
    }
}, { timestamps: true });

export const VolunteerRegistration = mongoose.model('VolunteerRegistration', VolunteerRegistrationSchema);

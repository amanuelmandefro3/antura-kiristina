import { VolunteerRegistration } from '../models/Volunteer.js';
import { z } from 'zod';

const volunteerRegistrationSchema = z.object({
    fullName: z.string().min(5).max(100),
    age: z.number().int().min(20).max(30),
    address: z.string().min(5).max(100),
    phoneNumber: z.string().min(10).max(15),
    email: z.string().email(),
    residentialAddress: z.string().min(5).max(100),
    educationLevel: z.string().min(2).max(50),
    employmentStatus: z.string().min(2).max(50),
    church: z.string().min(5).max(100),
    serviceAreas: z.enum(['Social Media', 'Teaching', 'Counseling', 'Mentoring', 'Fundraising', 'Where I am assigned','Event Planning', 'Other']),
    socialMedia: z.string().optional(),
    availabilityFrequency: z.enum(['onceAWeek', 'twiceAWeek', 'asNeeded']),
});

export const registerVolunteer = async (req, res) => {
    try {
        volunteerRegistrationSchema.parse(req.body);
        const volunteer = new VolunteerRegistration(req.body);
        await volunteer.save();
        res.status(201).json({ success: true, volunteer });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: error.message });
    }
};

export const getAllVolunteers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    
    try {
        const totalVolunteers = await VolunteerRegistration.countDocuments();
        const totalPages = Math.ceil(totalVolunteers / size);
        const volunteers = await VolunteerRegistration.find()
            .limit(size)
            .skip(size * (page - 1));

        res.status(200).json({
            success: true,
            data: volunteers,
            totalPages,
            currentPage: page,
            totalVolunteers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: error.message });
    }
};

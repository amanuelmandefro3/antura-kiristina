import {AdminRegistration} from '../models/AdminRegistration.js';
import {z} from 'zod';

const adminRegistrationSchema = z.object({
    name: z.string().min(5).max(100),
    email: z.string().email(),
    age: z.number().int().min(18),
    PhoneNumber: z.string().min(10).max(15),
    churchName: z.string().min(5).max(100),
    address: z.string().min(5).max(100),
});

export const registerAdmin = async (req, res) => {
    try {
        adminRegistrationSchema.parse(req.body);
        const admin = new AdminRegistration(req.body);
        await admin.save();
        res.status(201).json({ success: true, admin });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: error.message });
    }
}


export const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminRegistration.find();
        res.status(200).json({ success: true, admins });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: error.message
        });
    }

}

